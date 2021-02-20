using Anrtd.Domain;
using Anrtd.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Anrtd.Api.Controllers
{
    [ApiController]
    [Route("api/todos")]
    public class ToDosController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ToDosController(ApplicationDbContext dbContext)
        {
            _applicationDbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoEntity>>> GetAllToDos()
        {
            var toDos = await _applicationDbContext.ToDos.ToListAsync();

            return Ok(toDos);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateToDo([FromBody] ToDoEntity toDo)
        {
            _applicationDbContext.ToDos.Add(toDo);
            await _applicationDbContext.SaveChangesAsync();

            return StatusCode(201, toDo.Id);
        }
    }
}
