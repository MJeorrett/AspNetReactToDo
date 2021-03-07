using Anrtd.Application.ToDoLists.Commands.Create;
using Anrtd.Application.ToDoLists.Commands.SoftDelete;
using Anrtd.Application.ToDoLists.Commands.Update;
using Anrtd.Application.ToDoLists.Queries.GetById;
using Anrtd.Application.ToDoLists.Queries.GetPaginated;
using Anrtd.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Anrtd.Api.Controllers
{
    [ApiController]
    [Route("api/todo-lists")]
    public class ToDoListsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ToDoListsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoListEntity>>> GetPaginatedToDoLists(
            [FromQuery] GetPaginatedToDoListsQuery query)
        {
            var result = await _mediator.Send(query);

            if (result.IsBadRequest) return BadRequest(result.ValidationFailures);

            return Ok(result.Content);
        }

        [HttpGet("{toDoListId}")]
        public async Task<ActionResult<ToDoListDetailsDto>> GetById(int toDoListId)
        {
            var query = new GetToDoListByIdQuery(toDoListId);
            var result = await _mediator.Send(query);

            if (result.IsNotFound) return NotFound();

            return Ok(result.Content);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateToDoList([FromBody] CreateToDoListCommand command)
        {
            var result = await _mediator.Send(command);

            if (result.IsBadRequest) return BadRequest(result.ValidationFailures);

            return StatusCode(201, result.Content);
        }

        [HttpPut]
        public async Task<ActionResult<int>> UpdateToDoList([FromBody] UpdateToDoListCommand command)
        {
            var result = await _mediator.Send(command);

            if (result.IsBadRequest) return BadRequest(result.ValidationFailures);
            if (result.IsNotFound) return NotFound();

            return Ok();
        }

        [HttpDelete("{toDoListId}")]
        public async Task<ActionResult> DeleteToDoList(int toDoListId)
        {
            var command = new SoftDeleteToDoListCommand(toDoListId);
            var result = await _mediator.Send(command);

            if (result.IsNotFound) return NotFound();

            return Ok();
        }
    }
}
