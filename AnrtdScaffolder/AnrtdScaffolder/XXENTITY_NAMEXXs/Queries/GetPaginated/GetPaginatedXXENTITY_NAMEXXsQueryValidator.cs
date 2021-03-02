using FluentValidation;
using System;
using System.Linq;

namespace Anrtd.Application.XXENTITY_NAMEXXs.Queries.GetPaginated
{
    public class GetPaginatedXXENTITY_NAMEXXsQueryValidator : AbstractValidator<GetPaginatedXXENTITY_NAMEXXsQuery>
    {
        public GetPaginatedXXENTITY_NAMEXXsQueryValidator()
        {
            RuleFor(x => x.PageNumber)
                .NotNull()
                .GreaterThanOrEqualTo(1);

            RuleFor(x => x.PageSize)
                .NotNull()
                .GreaterThanOrEqualTo(1);
        }
    }
}
