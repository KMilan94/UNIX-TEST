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
            this.unixDbContext.Manufacturer.Add(manufacturer);
            this.unixDbContext.CarDetail.Add(carDetail);
            this.unixDbContext.SaveChanges();
            this.unixDbContext.Car.Add(new DbCar(manufacturer.ID, carDetail.ID));
            this.unixDbContext.SaveChanges();
        }

        public void Seed()
        {
            this.unixDbContext.Database.EnsureCreated();

            if (this.unixDbContext.Car.ToList().Count() != 0) return;

            this.Insert(new DbManufacturer("Skoda"), new DbCarDetail("Octavia", "Green", "Gasoline"));
            this.Insert(new DbManufacturer("Lada"), new DbCarDetail("Granta", "White", "Gasoline"));
            this.Insert(new DbManufacturer("Aston Martin"), new DbCarDetail("Rapide", "Brown", "Gasoline"));
        }


    }
}
