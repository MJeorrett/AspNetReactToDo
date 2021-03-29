using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain.Entities
{
    [Table("ToDoTag")]
    public class ToDoTagEntity
    {
        [Column("ToDoTagId")]
        public string Id { get; set; }

        public List<ToDoEntity> ToDos { get; set; } = new List<ToDoEntity>();

        public ToDoTagEntity(string id)
        {
            Id = id;
        }

        public override string ToString()
        {
            return Id;
        }
    }
}
