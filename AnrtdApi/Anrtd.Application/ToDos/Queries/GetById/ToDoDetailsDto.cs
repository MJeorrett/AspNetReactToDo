using Anrtd.Application.Common.Mapping;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Anrtd.Application.ToDos.Queries.GetById
{
    public record ToDoDetailsDto : IMapFrom<ToDoEntity>
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public ToDoStatus Status { get; init; }
        public TShirtSize? TShirtSize { get; init; }
        public DateTime? DueDate { get; init; }
        public List<string> Tags { get; init; }
        public DateTime CreatedDate { get; init; }
        public DateTime? LastModifiedDate { get; init; }

        public ToDoDetailsDto()
        {
            Tags = new List<string>();
        }
    }
}
