using Anrtd.Domain.Common;
using Anrtd.Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain.Entities
{
    [Table("ToDo")]
    public class ToDoEntity : AuditableEntity
    {
        [Column("ToDoId")]
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }

        [Required]
        public ToDoStatus Status { get; set; }

        public ToDoStatusEntity StatusEntity { get; set; }

        public TShirtSize? TShirtSize { get; set; }

        public TShirtSizeEntity TShirtSizeEntity { get; set; }

        public DateTime? DueDate { get; set; }

        public bool IsSoftDeleted { get; set; }
    }
}
