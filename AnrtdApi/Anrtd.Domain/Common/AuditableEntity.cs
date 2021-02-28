using System;

namespace Anrtd.Domain.Common
{
    public abstract class AuditableEntity
    {
        public DateTime CreatedDate { get; set; }

        public DateTime? LastModifiedDate { get; set; }
    }
}
