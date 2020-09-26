namespace Unix.Database.DbModels
{
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Car")]
    public class DbCar
    {
        public DbCar()
        {

        }

        public DbCar(int ManufacturerID, int CarDetailID) {
            this.ManufacturerID = ManufacturerID;
            this.CarDetailID = CarDetailID;
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [ForeignKey("Manufacturer")]
        public int ManufacturerID { get; set; }

        [ForeignKey("CarDetail")]
        public int CarDetailID { get; set; }

    }
}
