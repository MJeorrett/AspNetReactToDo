using Anrtd.Application.Common.Mapping;
using Anrtd.Domain.Entities;

namespace Anrtd.Application.ToDoLists.Queries.GetPaginated
{
    public record ToDoListSummaryDto() : IMapFrom<ToDoListEntity>
    {
        public int Id { get; init; }

        public string Title { get; set; }
    }
}
