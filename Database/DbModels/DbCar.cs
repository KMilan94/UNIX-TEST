namespace Unix.Database.DbModels
{
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Car")]
    public class DbCar
    {
        public DbCar()
        {

        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [ForeignKey("Manufacturer")]
        public string ManufacturerID { get; set; }

    }
}
