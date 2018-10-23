using System.Web.Http;
using System.Security.Cryptography;
using System.Text;
using O = final.ORM;
using M = final.Models;
using System.Linq;

namespace final
{
    public class UserController : ApiController
    {
        private O.BDEatNowEntities BD = new O.BDEatNowEntities();

        public string[] Get(string username, string password)
        {
            string[] data = new string[4];

            var result = from u in BD.Users
                         where (u.Username == username)
                         select new { u.Password, u.Name, u.LastName, u.Phone, u.Avatar};

            try
            {
                if (result != null)
                {
                    var result1 = result.ToArray()[0];

                    var hash = SHA256Encrypt(password);
                    if (result1.Password == SHA256Encrypt(password))
                    {
                        data[0] = result1.Name;
                        data[1] = result1.LastName;
                        data[2] = result1.Phone.ToString();
                        data[3] = result1.Avatar;
                    }
                }
            }

            catch
            {
                data[0] = "N";
                data[1] = "N";
                data[2] = "N";
                data[3] = "N";
            }
          
            return data;
        }

        public bool Post(M.User entrada)
        {
            bool state;
            string CriptoPassword = SHA256Encrypt(entrada.Password);
            entrada.Password = CriptoPassword;

            try
            {
                #pragma warning disable CS0618 // El tipo o el miembro están obsoletos
                AutoMapper.Mapper.CreateMap<M.User, O.User>();
                #pragma warning restore CS0618 // El tipo o el miembro están obsoletos
                O.User BDUser = AutoMapper.Mapper.Map<O.User>(entrada);
                BD.Users.Add(BDUser);
                BD.SaveChanges();
                state = true;
            }

            catch
            {
                state = false;
            }
            
            return state; 
        }

        private string SHA256Encrypt(string input)
        {
            SHA256CryptoServiceProvider provider = new SHA256CryptoServiceProvider();

            byte[] inputBytes = Encoding.UTF8.GetBytes(input);
            byte[] hashedBytes = provider.ComputeHash(inputBytes);

            StringBuilder output = new StringBuilder();

            for (int i = 0; i < hashedBytes.Length; i++)
                output.Append(hashedBytes[i].ToString("x2").ToLower());

            return output.ToString();
        }
    }
}