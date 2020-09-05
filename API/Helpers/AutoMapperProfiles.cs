using API.Dto;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {

            CreateMap<User, UserForDetailsDto>();
            CreateMap<User, UserForLoginDto>();
            CreateMap<LearningSet, CourseDto>().ForMember(x=>x.Author,y=>y.MapFrom(z=>z.Author.UserName));
        }
    }
}