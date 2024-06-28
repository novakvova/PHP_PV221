using AutoMapper;
using WebTuchyn.Data;
using WebTuchyn.Models;

namespace WebTuchyn.Mapper;

public class AppMapProfile : Profile
{
    public AppMapProfile()
    {
        CreateMap<DogEntity, DogItemViewModel>();
            //.ForMember(x=>x.Image, opt=>opt.Ignore());
    }
}
