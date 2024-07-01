using DataBase;
using Microsoft.EntityFrameworkCore;
using Web.Extensions;

namespace Web
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddDbContext<DogsDBContext>(opt=>
		        	opt.UseNpgsql(builder.Configuration.GetConnectionString("AwsPostageContainer")));

			builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

			// Add services to the container.
			builder.Services.AddControllersWithViews();

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (!app.Environment.IsDevelopment())
			{
				app.UseExceptionHandler("/Home/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();

			app.UseRouting();

			app.UseAuthorization();

			app.MapControllerRoute(
				name: "default",
				pattern: "{controller=Home}/{action=Index}/{id?}");

			app.SeedData();

			app.Run();
		}
	}
}
