using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using API.Data;
using AutoMapper.Configuration;
using AutoMapper;


namespace API.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/{userId}/[controller]")]
    public class ItemsController : ControllerBase
    {

        private readonly IContentRepository _repository;

        public ItemsController(IContentRepository repository)
        {
            _repository = repository;
        }


    }
}