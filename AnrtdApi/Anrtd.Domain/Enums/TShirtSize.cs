using Anrtd.Domain.Common;
using Anrtd.Domain.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Anrtd.Domain.Enums
{
    public enum TShirtSize
    {
        Small = 0,
        Medium = 1,
        Large = 2,
    }

    public class TShirtSizeEntity : IEnumEntity<TShirtSize>
    {
        [Column("TShirtSizeId")]
        public TShirtSize Id { get; set; }

        public string Name { get; set; }

        public List<ToDoEntity> ToDos { get; set; }

        public TShirtSizeEntity()
        {
            ToDos = new List<ToDoEntity>();
        }
    }
}
