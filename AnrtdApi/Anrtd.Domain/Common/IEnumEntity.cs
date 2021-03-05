using System;

namespace Anrtd.Domain.Common
{
    public interface IEnumEntity<TEnum>
        where TEnum : struct, Enum
    {
        public TEnum Id { get; set; }
        public string Name { get; set; }
    }
}
