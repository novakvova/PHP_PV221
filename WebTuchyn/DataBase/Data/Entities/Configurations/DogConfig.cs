using DataBase.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataBase.Data.Entities.Configurations
{
	internal class DogConfig : IEntityTypeConfiguration<Dog>
	{
		public void Configure(EntityTypeBuilder<Dog> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x=>x.Name).IsRequired().HasMaxLength(128);
			builder.Property(x => x.Image).IsRequired().HasMaxLength(512);
		}
	}
}