using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        //api only sends request to the mediator (command) and receives what it has to send back
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(){
            return await _mediator.Send(new List.Query());
        }

        //Api get request with specific ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id){
            return await _mediator.Send(new Details.Query{Id = id});
        }
    }
}