using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain.Entities
{
    [Table("ToDoTag")]
    public class ToDoTagEntity
    {
        [Column("ToDoTagId")]
        public string Id { get; set; }

        public List<ToDoEntity> ToDos { get; set; }

        public override string ToString()
        {
            return Id;
        }
    }
}
