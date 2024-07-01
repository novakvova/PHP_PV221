using Bogus;
using DataBase;
using DataBase.Data.Entities;

namespace Web.Extensions
{
	public static class DBbSeader
	{
		public static void SeedData(this IApplicationBuilder app)
		{
			using var scope = app.ApplicationServices
				 .GetRequiredService<IServiceScopeFactory>().CreateScope();
			var context = scope.ServiceProvider.GetRequiredService<DogsDBContext>();
			if(!context.Dogs.Any())
		{
				var facker = new Faker<Dog>("uk")
					.RuleFor(x => x.Name, f => f.Name.FirstName())
					.RuleFor(x => x.Image, f => f.Image.PicsumUrl(640,480));
				var items = facker.Generate(5);
				context.Dogs.AddRange(items);
				context.SaveChanges();
			}

		}
	}
}
