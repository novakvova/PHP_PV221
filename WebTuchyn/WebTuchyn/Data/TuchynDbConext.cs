using Microsoft.EntityFrameworkCore;

namespace WebTuchyn.Data
{
    public class TuchynDbConext : DbContext
    {
        public TuchynDbConext(DbContextOptions<TuchynDbConext> options) : base(options)
        { }

        public DbSet<DogEntity> Dogs { get; set; }
    }
}
