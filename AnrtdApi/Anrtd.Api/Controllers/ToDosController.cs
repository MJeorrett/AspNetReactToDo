using Anrtd.Application.ToDos.Commands;
using Anrtd.Application.ToDos.Commands.Create;
using Anrtd.Application.ToDos.Commands.Update;
using Anrtd.Application.ToDos.Queries.GetById;
using Anrtd.Application.ToDos.Queries.GetPaginated;
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

            if (result.IsBadRequest) return BadRequest(result.ValidationFailures);

            return Ok(result.Content);
        }

        [HttpGet("{toDoId}")]
        public async Task<ActionResult<ToDoDetailsDto>> GetById(int toDoId)
        {
            var query = new GetToDoByIdQuery(toDoId);
            var result = await _mediator.Send(query);

            if (result.IsNotFound) return NotFound();

            return Ok(result.Content);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateToDo([FromBody] CreateToDoCommand command)
        {
            var result = await _mediator.Send(command);

            if (result.IsBadRequest) return BadRequest(result.ValidationFailures);

            return StatusCode(201, result.Content);
        }

        [HttpPut]
        public async Task<ActionResult<int>> UpdateToDo([FromBody] UpdateToDoCommand command)
        {
            var result = await _mediator.Send(command);

            if (result.IsBadRequest) return BadRequest(result.ValidationFailures);
            if (result.IsNotFound) return NotFound();

            return Ok();
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
