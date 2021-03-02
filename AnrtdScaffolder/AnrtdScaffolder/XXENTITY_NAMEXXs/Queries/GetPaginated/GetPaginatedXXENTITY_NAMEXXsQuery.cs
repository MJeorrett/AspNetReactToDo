using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Models;
using Anrtd.Application.Common.Requests;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.XXENTITY_NAMEXXs.Queries.GetPaginated
{
    public record GetPaginatedXXENTITY_NAMEXXsQuery : IAppRequest<PaginatedList<XXENTITY_NAMEXXSummaryDto>>
    {
        public int PageNumber { get; init; }
        public int PageSize { get; init; }
    }

    public class GetPaginatedXXENTITY_NAMEXXsQueryHandler : AppRequestHandler<GetPaginatedXXENTITY_NAMEXXsQuery, PaginatedList<XXENTITY_NAMEXXSummaryDto>>
    {
        private readonly IPlaceholderApplicationDbContext _dbContext;
        private readonly IConfigurationProvider _configurationProvider;

        public GetPaginatedXXENTITY_NAMEXXsQueryHandler(IPlaceholderApplicationDbContext dbContext, IConfigurationProvider configurationProvider)
        {
            _dbContext = dbContext;
            _configurationProvider = configurationProvider;
        }

        public override async Task<AppRequestResult<PaginatedList<XXENTITY_NAMEXXSummaryDto>>> Handle(GetPaginatedXXENTITY_NAMEXXsQuery request, CancellationToken cancellationToken)
        {
            var xXENTITY_NAMEXXSummaries = await _dbContext.XXENTITY_NAMEXXs
                .OrderByDescending(xXENTITY_NAMEXX => xXENTITY_NAMEXX.Id)
                .ProjectTo<XXENTITY_NAMEXXSummaryDto>(_configurationProvider, cancellationToken)
                .PaginatedListAsync(request.PageNumber, request.PageSize);

            return Success(xXENTITY_NAMEXXSummaries);
        }
    }
}
