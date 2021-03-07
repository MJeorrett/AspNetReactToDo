using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Models;
using Anrtd.Application.Common.Requests;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDoLists.Queries.GetPaginated
{
    public record GetPaginatedToDoListsQuery : IAppRequest<PaginatedList<ToDoListSummaryDto>>
    {
        public int PageNumber { get; init; }
        public int PageSize { get; init; }
    }

    public class GetPaginatedToDoListsQueryHandler : AppRequestHandler<GetPaginatedToDoListsQuery, PaginatedList<ToDoListSummaryDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IConfigurationProvider _configurationProvider;

        public GetPaginatedToDoListsQueryHandler(IApplicationDbContext dbContext, IConfigurationProvider configurationProvider)
        {
            _dbContext = dbContext;
            _configurationProvider = configurationProvider;
        }

        public override async Task<AppRequestResult<PaginatedList<ToDoListSummaryDto>>> Handle(GetPaginatedToDoListsQuery request, CancellationToken cancellationToken)
        {
            var toDoListSummaries = await _dbContext.ToDoLists
                .OrderByDescending(toDoList => toDoList.Id)
                .ProjectTo<ToDoListSummaryDto>(_configurationProvider, cancellationToken)
                .PaginatedListAsync(request.PageNumber, request.PageSize);

            return Success(toDoListSummaries);
        }
    }
}
