using System.Web.Http;
using O = final.ORM;
using M = final.Models;
using System.Linq;

namespace final
{
    public class RestaurantController : ApiController
    {
        private O.BDEatNowEntities BD = new O.BDEatNowEntities();

        public string[][] Get()
        {
            var result = from r in BD.Restaurants
                         where (true)
                         select new { r.Id, r.Name, r.Phone, r.Background, r.Address, r.City, r.Avatar};

            string[][] data = null;

            try
            {
                data = new string[result.ToArray().Length][];

                for (int i = 0; i < data.Length; i++)
                {
                    var registro = result.ToArray()[i];
                    string[] registroArr = new string[7];

                    registroArr[0] = registro.Id.ToString(); //
                    registroArr[1] = registro.Name; //
                    registroArr[2] = registro.Phone.ToString();
                    registroArr[3] = registro.Background; //
                    registroArr[4] = registro.Address; //
                    registroArr[5] = registro.City;//
                    registroArr[6] = registro.Avatar;//

                    data[i] = registroArr;
                }
            }

            catch
            {
                
            }
            
            return data;
        }

        public string[][] Get(int idOwner)
        {
            var result = from r in BD.Restaurants
                         where (r.IdOwner == idOwner)
                         select new {r.Id, r.Name, r.Background};

            string[][] data = null;

            try
            {
                data = new string[result.ToArray().Length][];

                for (int i = 0; i < data.Length; i++)
                {
                    var registro = result.ToArray()[i];
                    string[] registroArr = new string[3];

                    registroArr[0] = registro.Id.ToString();
                    registroArr[1] = registro.Name; 
                    registroArr[2] = registro.Background;

                    data[i] = registroArr;
                }
            }

            catch
            {

            }

            return data;
        }

        public bool Post(M.Restaurante entrada)
        {
            bool result;

            try
            {
                #pragma warning disable CS0618 // El tipo o el miembro están obsoletos
                AutoMapper.Mapper.CreateMap<M.Restaurante, O.Restaurant>();
                #pragma warning restore CS0618 // El tipo o el miembro están obsoletos
                O.Restaurant BDRestaurante = AutoMapper.Mapper.Map<O.Restaurant>(entrada);
                BD.Restaurants.Add(BDRestaurante);
                BD.SaveChanges();

                result = true;
            }

            catch
            {
                result = false;
            }

            return result;
        }
    }
}