using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Requests;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDoLists.Queries.GetById
{
    public record GetToDoListByIdQuery(int ToDoListId) : IAppRequest<ToDoListDetailsDto>
    {
    }

    public class GetToDoListByIdQueryHandler : AppRequestHandler<GetToDoListByIdQuery, ToDoListDetailsDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetToDoListByIdQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult<ToDoListDetailsDto>> Handle(GetToDoListByIdQuery request, CancellationToken cancellationToken)
        {
            var toDoListEntity = await _dbContext.ToDoLists.SingleOrDefaultAsync(toDoList => toDoList.Id == request.ToDoListId, cancellationToken);

            if (toDoListEntity == default) return NotFound();

            var toDoListDto = _mapper.Map<ToDoListDetailsDto>(toDoListEntity);
            return Success(toDoListDto);
        }
    }
}
