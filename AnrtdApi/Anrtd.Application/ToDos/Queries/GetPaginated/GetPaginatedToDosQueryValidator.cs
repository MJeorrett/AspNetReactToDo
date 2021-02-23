using FluentValidation;

namespace Anrtd.Application.ToDos.Queries.GetPaginated
{
    public class GetPaginatedToDosQueryValidator : AbstractValidator<GetPaginatedToDosQuery>
    {
        public GetPaginatedToDosQueryValidator()
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
