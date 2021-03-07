using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain.Entities
{
    [Table("ToDoList")]
    public class ToDoListEntity
    {
        [Column("ToDoListId")]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public List<ToDoEntity> ToDos { get; set; }

        public bool IsSoftDeleted { get; set; }

        public ToDoListEntity()
        {
            ToDos = new List<ToDoEntity>();
        }
    }
}
