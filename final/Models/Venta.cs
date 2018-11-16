namespace final.Models
{
    public class Venta
    {
        public long IdUser { get; set; }
        public int IdFood1 { get; set; }
        public int IdFood2 { get; set; }
        public int IdFood3 { get; set; }
        public string HashVenta { get; set; }
        public bool Received { get; set; }
        public bool Start { get; set; }
        public int TimeWait { get; set; }
        public int IdRestaurant { get; set; }
    }
}