using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebTuchyn.Data;
using WebTuchyn.Models;

namespace WebTuchyn.Controllers
{
    public class HomeController(ILogger<HomeController> logger, 
        TuchynDbConext tuchynDbConext, IMapper mapper) : Controller
    {


        public IActionResult Index()
        {
            //List<DogItemViewModel> dogItems = new List<DogItemViewModel>
            //{
            //    new DogItemViewModel
            //    {
            //        Id = 1,
            //        Name = "Тузік",
            //        Image = "https://pereiaslav.city/upload/article/o_1e3mdfgt343m190f1ah4ffk6mb2h.jpg"
            //    },
            //    new DogItemViewModel
            //    {
            //        Id = 2,
            //        Name = "MiniPig",
            //        Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpUSONmGeV2apHfPoUJ5Q8E9VN7bkhml-ww&s"
            //    },
            //};
            //return View(dogItems);
            var model = tuchynDbConext.Dogs
                .ProjectTo<DogItemViewModel>(mapper.ConfigurationProvider)
                .ToList();
            return View(model);
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
