using Anrtd.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Anrtd.Infrastructure.Persistence.EntityConfigurations
{
    public class TShirtSizeEntityConfiguration : IEntityTypeConfiguration<TShirtSizeEntity>
    {
        public void Configure(EntityTypeBuilder<TShirtSizeEntity> builder)
        {
            builder.Property(x => x.Id)
                .HasConversion<int>();
        }
    }
}
