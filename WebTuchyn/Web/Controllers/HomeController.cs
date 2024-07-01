using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataBase;
using DataBase.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Web.Models;

namespace Web.Controllers
{
	public class HomeController(DogsDBContext context,IMapper mapper) : Controller
	{
		public async Task<IActionResult> Index()
		{
			var dogs = await context.Dogs.ProjectTo<DogViewModel>(mapper.ConfigurationProvider).ToArrayAsync();
			return View(dogs);
		}

        public async Task<IActionResult> Delete(int id)
        {
            var dog = await context.Dogs.FirstOrDefaultAsync(x => x.Id == id);
            if (dog != null)
                return View(mapper.Map<DogViewModel>(dog));
            else
                return  RedirectToAction("Error");
        }

        public async Task<IActionResult> Edit(int id)
        {
            var dog = await context.Dogs.FirstOrDefaultAsync(x => x.Id == id);
            if (dog != null)
                return View(mapper.Map<DogViewModel>(dog));
            else
                return RedirectToAction("Error");
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(DogViewModel dog)
        {
            await context.Dogs.AddAsync(mapper.Map<Dog>(dog));
            await context.SaveChangesAsync();
            return RedirectToAction("Index");
        }


        [HttpPost]
        public async Task<IActionResult> EditItem(DogViewModel dog)
        {
			context.Update(mapper.Map<Dog>(dog));
			await context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> DeleteItem(int Id)
        {
			var dog = await context.Dogs.FirstOrDefaultAsync(x => x.Id == Id);
			if (dog != null) 
			{
                context.Remove(dog);
				await context.SaveChangesAsync();
            }
			else  RedirectToAction("Error");
            return  RedirectToAction("Index");
        }



        public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
