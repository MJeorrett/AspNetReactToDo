using Anrtd.Application.ToDos.Commands;
using Anrtd.Application.ToDos.Queries;
using Anrtd.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Anrtd.Api.Controllers
{
    [ApiController]
    [Route("api/todos")]
    public class ToDosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ToDosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoEntity>>> GetPaginatedToDos(
            [FromQuery] GetPaginatedToDosQuery query)
        {
            var result = await _mediator.Send(query);

            return Ok(result.Content);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateToDo([FromBody] CreateToDoCommand command)
        {
            var result = await _mediator.Send(command);

            return StatusCode(201, result.Content);
        }

        [HttpDelete("{toDoId}")]
        public async Task<ActionResult> DeleteToDo(int toDoId)
        {
            var command = new SoftDeleteToDoCommand(toDoId);
            var result = await _mediator.Send(command);

            if (result.IsNotFound) return NotFound();

            return Ok();
        } 
    }
}
