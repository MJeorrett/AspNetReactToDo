using Anrtd.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Interfaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Queries
{
    public record GetAllToDosQuery : IAppRequest<List<ToDoEntity>>
    {
    }

    public class GetAllToDosQueryHandler : AppRequestHandler<GetAllToDosQuery, List<ToDoEntity>>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetAllToDosQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task<AppRequestResult<List<ToDoEntity>>> Handle(GetAllToDosQuery request, CancellationToken cancellationToken)
        {
            var toDos = await _dbContext.ToDos.ToListAsync(cancellationToken);

            return Success(toDos);
        }
    }
}
