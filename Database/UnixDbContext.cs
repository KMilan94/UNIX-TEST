namespace Unix.Database
{
    using Microsoft.EntityFrameworkCore;
    using Database.DbModels;

    public class UnixDbContext : DbContext
    {
        public UnixDbContext(DbContextOptions<UnixDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        public DbSet<DbManufacturer> Manufacturer { get; set; }

        public DbSet<DbCar> Car { get; set; }

        public DbSet<DbCarDetail> CarDetail { get; set; }
    }
}