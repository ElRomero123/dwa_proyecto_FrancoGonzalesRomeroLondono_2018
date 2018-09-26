using System.Collections.Generic;
using System.Web.Http;
using System.Security.Cryptography;
using System.Text;
using O = final.ORM;
using System.Linq;

namespace final
{
    public class LoginController : ApiController
    {
        private O.BDEatNowEntities BD = new O.BDEatNowEntities();

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string[] Get(string username, string password)
        {
            string[] data = new string[3];

            var result = from u in BD.Users
                         where (u.Username == username)
                         select new { u.Password, u.Name, u.LastName, u.Phone };

            data[0] = "No found";
            data[1] = "No found";
            data[2] = "No found";

            if (result != null)
            {
                var result1 = result.ToArray()[0];

                var hash = SHA256Encrypt(password);
                if (result1.Password == SHA256Encrypt(password))
                {
                    data[0] = result1.Name;
                    data[1] = result1.LastName;
                    data[2] = result1.Phone.ToString();
                }
            }
            
            return data;
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
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