using Anrtd.Application.Common.Mapping;
using Anrtd.Domain.Entities;

namespace Anrtd.Application.ToDoLists.Queries.GetById
{
    public class ToDoListDetailsDto : IMapFrom<ToDoListEntity>
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";
    }
}
