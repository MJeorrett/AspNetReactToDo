using Anrtd.Domain.Common;
using Anrtd.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain.Entities
{
    [Table("ToDoList")]
    public class ToDoListEntity : AuditableEntity
    {
        [Column("ToDoListId")]
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public List<ToDoEntity> ToDos { get; set; }

        public bool IsSoftDeleted { get; set; }

        public ToDoListEntity()
        {
            ToDos = new List<ToDoEntity>();
        }
    }
}
