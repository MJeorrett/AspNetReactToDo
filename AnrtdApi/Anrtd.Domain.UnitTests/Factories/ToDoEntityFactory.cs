using Anrtd.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Anrtd.Domain.UnitTests.Factories
{
    public static class ToDoEntityFactory
    {
        public static ToDoEntity CreateWithTags(List<string> tags)
        {
            return new ToDoEntity()
            {
                Tags = tags
                    .Select(tag => new ToDoTagEntity() { Id = tag })
                    .ToList()
            };
        }
    }
}
