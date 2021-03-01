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

            builder.HasOne(toDo => toDo.StatusEntity)
                .WithMany(status => status.ToDos)
                .HasForeignKey(toDo => toDo.Status);

            builder.HasQueryFilter(toDo => !toDo.IsSoftDeleted);
        }
    }
}
