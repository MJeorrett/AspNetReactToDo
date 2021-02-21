using Anrtd.Application.Common.Mapping;
using Anrtd.Domain.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Interfaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Queries
{
    public record GetAllToDosQuery : IAppRequest<List<ToDoSummaryDto>>
    {
    }

    public class GetAllToDosQueryHandler : AppRequestHandler<GetAllToDosQuery, List<ToDoSummaryDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IConfigurationProvider _configurationProvider;

        public GetAllToDosQueryHandler(IApplicationDbContext dbContext, IConfigurationProvider configurationProvider)
        {
            _dbContext = dbContext;
            _configurationProvider = configurationProvider;
        }

        public override async Task<AppRequestResult<List<ToDoSummaryDto>>> Handle(GetAllToDosQuery request, CancellationToken cancellationToken)
        {
            var toDoSummaries = await _dbContext.ToDos
                .ProjectToListAsync<ToDoSummaryDto>(_configurationProvider, cancellationToken);

            return Success(toDoSummaries);
        }
    }
}
