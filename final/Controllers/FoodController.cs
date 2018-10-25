
using System.Web.Http;
using O = final.ORM;
using System.Linq;

namespace final
{
    public class FoodController : ApiController
    {
        private O.BDEatNowEntities BD = new O.BDEatNowEntities();

        public string[][] Get(int idRestaurant, int type)
        {
            var result = from f in BD.Foods
                         where (f.IdRestaurant == idRestaurant && f.Kind == type)
                         select new {f.Id, f.Name, f.Description, f.Price, f.Avatar};

            string[][] data = null;

            try
            {
                data = new string[result.ToArray().Length][];

                for (int i = 0; i < data.Length; i++)
                {
                    var registro = result.ToArray()[i];
                    string[] registroArr = new string[5];

                    registroArr[0] = registro.Id.ToString(); 
                    registroArr[1] = registro.Name;
                    registroArr[2] = registro.Description;
                    registroArr[3] = registro.Price.ToString();
                    registroArr[4] = registro.Avatar;

                    data[i] = registroArr;
                }
            }

            catch
            {
                
            }
            
            return data;
        }
    }
}