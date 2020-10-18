using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        private readonly IContentRepository _contentRepository;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repository, IContentRepository contentRepository, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repository = repository;
            _contentRepository = contentRepository;
        }


        // [HttpPost("register")]
        // public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        // {
        //     userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

        //     if (await _repository.UserExists(userForRegisterDto.UserName))
        //         return BadRequest("Użytkownik o takiej nazwie już istnieje");

        //     var userToCreate = _mapper.Map<User>(userForRegisterDto);
        //     var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);
        //     var userToReturn = _mapper.Map<UserForDetailsDto>(createdUser);


        //     return CreatedAtRoute("GetUser",  new {controller = "Users", id =createdUser.Id},userToReturn);
        // }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repository.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            //create token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(12),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            UserForDetailsDto user = _mapper.Map<UserForDetailsDto>(userFromRepo);

            return Ok(new { token = tokenHandler.WriteToken(token), user });

        }




        [HttpPost("loginAvailable")]
        public async Task<bool> loginAvailable(UserForLoginDto userForRegisterDto)
        {
            if (!await _repository.UserExists(userForRegisterDto.UserName))
                return true;
            else
                return false;
        }


        [HttpDelete("{userId}/removeAccount")]
        public async Task<bool> removeAccount(long userId)
        {

            var courses = await _contentRepository.GetUserLearningSets(userId);
            foreach (var course in courses)
            {
                await _contentRepository.ResetProgress(userId, course.Id);
            }


            var myCourses = await _contentRepository.GetUserCoursesCollection(userId);
            foreach (var course in myCourses)
            {
                await _contentRepository.RemoveAllItemsForCourse(userId, course.Id);
                await _contentRepository.RemoveCourse(userId, course.Id);
            }


            return await _repository.RemoveAccount(userId);


        }

        [HttpPut("{userId}/changePassword")]
        public async Task<bool> changePassword(long userId, [FromQuery] string newPassword)
        {

            return await _repository.ChangePassword(userId, newPassword);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForLoginDto userForRegisterDto)
        {
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

            if (await _repository.UserExists(userForRegisterDto.UserName))
                return BadRequest("Użytkownik o takiej nazwie już istnieje");

            var userToCreate = new User() { UserName = userForRegisterDto.UserName };
            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);
            return Ok();
        }
    }
}