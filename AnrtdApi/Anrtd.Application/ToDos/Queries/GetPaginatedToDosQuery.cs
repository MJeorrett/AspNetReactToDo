using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using StageRaceFantasy.Application.Common.Interfaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Queries
{
    public record GetPaginatedToDosQuery : IAppRequest<PaginatedList<ToDoSummaryDto>>
    {
        public int PageNumber { get; init; }
        public int PageSize { get; init; }
    }

    public class GetPaginatedToDosQueryHandler : AppRequestHandler<GetPaginatedToDosQuery, PaginatedList<ToDoSummaryDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IConfigurationProvider _configurationProvider;

        public GetPaginatedToDosQueryHandler(IApplicationDbContext dbContext, IConfigurationProvider configurationProvider)
        {
            _dbContext = dbContext;
            _configurationProvider = configurationProvider;
        }

        public override async Task<AppRequestResult<PaginatedList<ToDoSummaryDto>>> Handle(GetPaginatedToDosQuery request, CancellationToken cancellationToken)
        {
            var toDoSummaries = await _dbContext.ToDos
                .OrderByDescending(toDo => toDo.Id)
                .ProjectTo<ToDoSummaryDto>(_configurationProvider, cancellationToken)
                .PaginatedListAsync(request.PageNumber, request.PageSize);

            return Success(toDoSummaries);
        }
    }
}
