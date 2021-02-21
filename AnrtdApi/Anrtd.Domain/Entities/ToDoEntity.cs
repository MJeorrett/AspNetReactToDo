using Anrtd.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain.Entities
{
    [Table("ToDo")]
    public class ToDoEntity
    {
        [Column("ToDoId")]
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }

        [Required]
        public ToDoStatus Status { get; set; }
    }
}
