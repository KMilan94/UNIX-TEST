namespace Unix.Database.DbModels
{
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Manufacturer")]
    public class DbManufacturer
    {
        public DbManufacturer()
        {

        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public string Name { get; set; }
    }
}
