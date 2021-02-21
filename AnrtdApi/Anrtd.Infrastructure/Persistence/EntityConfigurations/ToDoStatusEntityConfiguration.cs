using Anrtd.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Anrtd.Infrastructure.Persistence.EntityConfigurations
{
    public class ToDoStatusEntityConfiguration : IEntityTypeConfiguration<ToDoStatusEntity>
    {
        public void Configure(EntityTypeBuilder<ToDoStatusEntity> builder)
        {
            builder.Property(status => status.Id)
                .HasConversion<int>();
        }
    }
}
