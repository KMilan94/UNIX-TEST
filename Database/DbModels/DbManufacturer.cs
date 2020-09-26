namespace Unix.Database.DbModels
{
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Manufacturer")]
    public class DbManufacturer
    {
        public DbManufacturer()
        {

        }

        public DbManufacturer(string Name) {
            this.Name = Name;
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public string Name { get; set; }
    }
}
