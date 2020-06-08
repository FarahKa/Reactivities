using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")] //[first part of controller name]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        //injecting the databace context so we can query it through entity
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            this._context = context;

        }

        // GET api/values fron database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> Get() //was: public <ActionResult<IEnumerable<Value>> Get()
        {
            //getting all values through the context
            //convention is to make database queries asynchronously
            var values = await _context.Values.ToListAsync(); // was: var values =_context.Values.ToList();
            //returns 200 & values
            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Value>> Get(int id)
        {
            //will return either null or a Value
            var value = await _context.Values.FindAsync(id);
            //or :             var value = await _context.Values.SingleOrDefaultAsync([condition])
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
