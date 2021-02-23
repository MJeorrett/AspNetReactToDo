using Anrtd.Application.ToDos.Queries.GetPaginated;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Interfaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Queries.GetById
{
    public record GetToDoByIdQuery(int ToDoId) : IAppRequest<ToDoDetailsDto>
    {
    }

    public class GetToDoByIdQueryHandler : AppRequestHandler<GetToDoByIdQuery, ToDoDetailsDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetToDoByIdQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult<ToDoDetailsDto>> Handle(GetToDoByIdQuery request, CancellationToken cancellationToken)
        {
            var toDoEntity = await _dbContext.ToDos.SingleOrDefaultAsync(toDo => toDo.Id == request.ToDoId, cancellationToken);

            if (toDoEntity == default) return NotFound();

            var toDoDto = _mapper.Map<ToDoDetailsDto>(toDoEntity);
            return Success(toDoDto);
        }
    }
}
