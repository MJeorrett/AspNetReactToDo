using Anrtd.Application.Common.Mapping;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using System;

namespace Anrtd.Application.ToDos.Queries.GetById
{
    public record ToDoDetailsDto() : IMapFrom<ToDoEntity>
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public ToDoStatus Status { get; init; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedDate { get; init; }
        public DateTime? LastModifiedDate { get; set; }
    }
}
