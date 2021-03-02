using Anrtd.Application.Common.Mapping;
using Anrtd.Domain.Entities;

namespace Anrtd.Application.XXENTITY_NAMEXXs.Queries.GetPaginated
{
    public record XXENTITY_NAMEXXSummaryDto() : IMapFrom<XXENTITY_NAMEXXEntity>
    {
        public int Id { get; init; }
    }
}
