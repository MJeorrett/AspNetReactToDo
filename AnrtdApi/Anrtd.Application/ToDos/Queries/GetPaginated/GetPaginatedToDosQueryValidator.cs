using Anrtd.Domain.Enums;
using FluentValidation;
using System;
using System.Linq;

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

            RuleFor(x => x.StatusIds)
                .Must(BeAllValidStatusIds)
                    .WithMessage("Provided status ids must all be valid.");
        }

        private static bool BeAllValidStatusIds(string toDoStatuses)
        {
            if (string.IsNullOrEmpty(toDoStatuses)) return true;

            return toDoStatuses
                .Split(",")
                .Select(toDoStatusString => toDoStatusString.Trim())
                .All(toDoStatusString =>
                {
                    var parseSuccess = int.TryParse(toDoStatusString, out var toDoStatus);
                    if (!parseSuccess) return false;
                    return Enum.IsDefined(typeof(ToDoStatus), toDoStatus);
                });
        }
    }
}
