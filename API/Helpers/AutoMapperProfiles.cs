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
          
        }
    }
}