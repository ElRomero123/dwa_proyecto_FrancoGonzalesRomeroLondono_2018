namespace final.Models
{
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string TypeDocument { get; set; }
        public long NumDocument { get; set; }
        public long Phone { get; set; }
        public string Address { get; set; }
        public int Reputation { get; set; }
        public string Avatar { get; set; }
    }
}