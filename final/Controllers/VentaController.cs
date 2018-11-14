using System.Web.Http;
using System.Security.Cryptography;
using System.Text;
using O = final.ORM;
using M = final.Models;
using System;
using System.Linq;

namespace final
{
    public class VentaController : ApiController
    {
        private O.BDEatNowEntities BD = new O.BDEatNowEntities();

        public string Post(M.Venta entrada)
        {
            Random N = new Random();
            string result = null;

            try
            {
                entrada.HashVenta = SHA256Encrypt(SHA256Encrypt(entrada.IdUser + "" + entrada.IdFood1 + "" + entrada.IdFood2 + "" + entrada.IdFood3) + N.Next(1462282825));
                #pragma warning disable CS0618 // El tipo o el miembro están obsoletos
                AutoMapper.Mapper.CreateMap<M.Venta, O.Venta>();
                #pragma warning restore CS0618 // El tipo o el miembro están obsoletos
                O.Venta BDVenta = AutoMapper.Mapper.Map<O.Venta>(entrada);
                BD.Ventas.Add(BDVenta);
                BD.SaveChanges();
                result = entrada.HashVenta;
            }

            catch
            {
                result = null;
            }
            
            return result; 
        }

        public string[][] Get(int idRestaurant)
        {
            var result = from v in BD.Ventas
                         where (v.IdRestaurant == idRestaurant)
                         select new {v.HashVenta, v.IdFood1, v.IdFood2, v.IdFood3};

            string[][] data = null;

            //
            data = new string[result.ToArray().Length][];

            for (int i = 0; i < data.Length; i++)
            {
                var registro = result.ToArray()[i];
                string[] registroArr = new string[4];

                registroArr[0] = registro.HashVenta;
                registroArr[1] = registro.IdFood1.ToString();
                registroArr[2] = registro.IdFood2.ToString();
                registroArr[3] = registro.IdFood3.ToString();

                data[i] = registroArr;
            }
            //

            return data;
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