using System;

namespace Anrtd.Domain.Common
{
    public abstract class AuditableEntity
    {
        public DateTime Created { get; set; }

        public DateTime? LastModified { get; set; }
    }
}
