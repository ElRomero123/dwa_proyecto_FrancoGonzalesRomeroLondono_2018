using System.Web.Http;
using System.Security.Cryptography;
using System.Text;
using O = final.ORM;
using M = final.Models;

namespace final
{
    public class VentaController : ApiController
    {
        private O.BDEatNowEntities BD = new O.BDEatNowEntities();

        public bool Post(M.Venta entrada)
        {
            entrada.HashVenta = SHA256Encrypt(entrada.IdUser + "" + entrada.IdFood1 + "" + entrada.IdFood2 + "" + entrada.IdFood3);

            bool state;

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