using Anrtd.Application.Common;
using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Models;
using Anrtd.Application.Common.Requests;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Queries.GetPaginated
{
    public record GetPaginatedToDosQuery : IAppRequest<PaginatedList<ToDoSummaryDto>>
    {
        public int PageNumber { get; init; }
        public int PageSize { get; init; }
        public string StatusIds { get; init; }
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
            var toDoStatuses = ParseToDoStatuses(request.StatusIds);

            var predicate = toDoStatuses.Any() ?
                PredicateBuilder.False<ToDoEntity>().Or(toDo => toDoStatuses.Contains(toDo.Status)) :
                PredicateBuilder.True<ToDoEntity>();

            var toDoSummaries = await _dbContext.ToDos
                .Where(predicate)
                .OrderByDescending(toDo => toDo.Id)
                .ProjectTo<ToDoSummaryDto>(_configurationProvider, cancellationToken)
                .PaginatedListAsync(request.PageNumber, request.PageSize);

            return Success(toDoSummaries);
        }

        private List<ToDoStatus> ParseToDoStatuses(string toDoStatusesString)
        {
            if (string.IsNullOrEmpty(toDoStatusesString)) return new List<ToDoStatus>();

            return toDoStatusesString
                .Split(",")
                .Select(toDoStatus => (ToDoStatus)int.Parse(toDoStatus))
                .ToList();
        }
    }
}
