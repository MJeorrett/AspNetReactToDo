using Anrtd.Application.Common.Mapping;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using System;

namespace Anrtd.Application.ToDos.Queries.GetPaginated
{
    public record ToDoDetailsDto() : IMapFrom<ToDoEntity>
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public ToDoStatus Status { get; init; }
        public DateTime Created { get; init; }
        public DateTime? LastModified { get; set; }
    }
}
