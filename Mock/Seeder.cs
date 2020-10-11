using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Unix.Database;
using Unix.Database.DbModels;

namespace Unix.Mock
{
    // Seed the database with predefined records

    public class Seeder : ISeeder
    {
        private readonly UnixDbContext unixDbContext;

        public Seeder(UnixDbContext unixDbContext)
        {
            this.unixDbContext = unixDbContext;
        }

        private void Insert(DbManufacturer manufacturer, DbCarDetail carDetail) {
            unixDbContext.Manufacturer.Add(manufacturer);
            unixDbContext.CarDetail.Add(carDetail);
            unixDbContext.SaveChanges();
            unixDbContext.Car.Add(new DbCar(manufacturer.ID, carDetail.ID));
            unixDbContext.SaveChanges();
        }

        public void Seed()
        {
            if (unixDbContext.Database.EnsureCreated() && unixDbContext.Car.ToList().Count() != 0) {
                Insert(new DbManufacturer("Skoda"), new DbCarDetail("Octavia", "Green", "Gasoline"));
                Insert(new DbManufacturer("Lada"), new DbCarDetail("Granta", "White", "Gasoline"));
                Insert(new DbManufacturer("Aston Martin"), new DbCarDetail("Rapide", "Brown", "Gasoline"));
            }
        }
    }
}
