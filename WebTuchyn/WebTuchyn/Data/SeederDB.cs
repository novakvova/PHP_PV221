using Bogus;

namespace WebTuchyn.Data;

public static class SeederDB
{
    public static void SeedData(this IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices
            .GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<TuchynDbConext>();

            if (!context.Dogs.Any())
            {
                var facker = new Faker<DogEntity>("uk")
                    .RuleFor(x => x.Name, f => f.Name.FullName())
                    .RuleFor(x => x.Image, f => f.Image.PicsumUrl());
                var items = facker.Generate(10);
                context.Dogs.AddRange(items);
                context.SaveChanges();
            }
        }
    }
}
