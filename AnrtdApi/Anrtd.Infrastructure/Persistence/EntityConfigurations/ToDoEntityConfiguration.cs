using Anrtd.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Anrtd.Infrastructure.Persistence.EntityConfigurations
{
    public class ToDoEntityConfiguration : IEntityTypeConfiguration<ToDoEntity>
    {
        public void Configure(EntityTypeBuilder<ToDoEntity> builder)
        {
            builder.Property(toDo => toDo.Status)
                .HasConversion<int>();

            builder.HasQueryFilter(toDo => !toDo.IsSoftDeleted);
        }
    }
}
