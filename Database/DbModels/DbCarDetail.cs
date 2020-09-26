namespace Unix.Database.DbModels
{
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("CarDetail")]
    public class DbCarDetail
    {
        public DbCarDetail()
        {

        }

        public DbCarDetail(string Model, string Color, string Fuel) {
            this.Model = Model;
            this.Color = Color;
            this.Fuel = Fuel;
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public string Model { get; set; }

        public string Color { get; set; }

        public string Fuel { get; set; }
    }
}
