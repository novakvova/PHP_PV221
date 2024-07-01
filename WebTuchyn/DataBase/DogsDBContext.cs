using DataBase.Data.Entities;
using DataBase.Data.Entities.Configurations;
using Microsoft.EntityFrameworkCore;

namespace DataBase
{
	public class DogsDBContext : DbContext
	{
		public DogsDBContext(DbContextOptions options) : base(options)
		{
			Database.Migrate();
		}
		public DbSet<Dog> Dogs { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration<Dog>(new DogConfig());
		}

	}
}
