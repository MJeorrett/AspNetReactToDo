using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain
{
    [Table("ToDo")]
    public class ToDoEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}
