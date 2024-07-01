using AutoMapper;
using DataBase.Data.Entities;
using Web.Models;

namespace Web.Mapper
{
	public class DogProfile:Profile
	{
		public DogProfile()
		{
			CreateMap<Dog, DogViewModel>().ReverseMap();
		}
	}
}
