using Anrtd.Domain.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain.Enums
{
    public enum ToDoStatus
    {
        New = 0,
        Complete = 1,
        Cancelled = 2,
    }

    public class ToDoStatusEntity
    {
        [Column("ToDoStatusId")]
        public ToDoStatus Id { get; set; }
        public string Name { get; set; }
    }
}
