using FluentValidation;
using System;
using System.Linq;

namespace Anrtd.Application.ToDoLists.Queries.GetPaginated
{
    public class GetPaginatedToDoListsQueryValidator : AbstractValidator<GetPaginatedToDoListsQuery>
    {
        public GetPaginatedToDoListsQueryValidator()
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
