namespace Unix.Database.DbModels
{
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("CarDetail")]
    public class DbCarDetail
    {
        public DbCarDetail()
        {

        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public string Model { get; set; }

        public string Color { get; set; }

        [ForeignKey("Manufacturer")]
        public string ManufacturerID { get; set; }

        [ForeignKey("Car")]
        public string CarID { get; set; }

    }
}
