﻿using System.Web.Http;
using O = final.ORM;
using M = final.Models;
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
                         select new {f.Id, f.Nombre, f.Description, f.Price, f.Avatar};

            string[][] data = null;

            try
            {
                data = new string[result.ToArray().Length][];

                for (int i = 0; i < data.Length; i++)
                {
                    var registro = result.ToArray()[i];
                    string[] registroArr = new string[5];

                    registroArr[0] = registro.Id.ToString(); 
                    registroArr[1] = registro.Nombre;
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

        public string[][] Get(int id)
        {
            var result = from f in BD.Foods
                         where (f.Id == id)
                         select new {f.Nombre, f.Description, f.Price};

            string[][] data = null;

            try
            {
                data = new string[result.ToArray().Length][];

                for (int i = 0; i < data.Length; i++)
                {
                    var registro = result.ToArray()[i];
                    string[] registroArr = new string[3];

                    registroArr[0] = registro.Nombre;
                    registroArr[1] = registro.Description;
                    registroArr[2] = registro.Price.ToString();

                    data[i] = registroArr;
                }
            }

            catch
            {

            }

            return data;
        }

        public bool Post(M.Food entrada)
        {
            bool result;

            try
            {
                #pragma warning disable CS0618 // El tipo o el miembro están obsoletos
                AutoMapper.Mapper.CreateMap<M.Food, O.Food>();
                #pragma warning restore CS0618 // El tipo o el miembro están obsoletos
                O.Food BDFood = AutoMapper.Mapper.Map<O.Food>(entrada);
                BD.Foods.Add(BDFood);
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