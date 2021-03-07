using Anrtd.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Anrtd.Infrastructure.Persistence.EntityConfigurations
{
    public class ToDoEntityConfiguration : IEntityTypeConfiguration<ToDoEntity>
    {
        public void Configure(EntityTypeBuilder<ToDoEntity> builder)
        {
            builder.Property(_ => _.Status)
                .HasConversion<int>();

            builder.HasOne(_ => _.StatusEntity)
                .WithMany(_ => _.ToDos)
                .HasForeignKey(_ => _.Status);

            builder.HasOne(_ => _.List)
                .WithMany(_ => _.ToDos)
                .HasForeignKey(_ => _.ListId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasQueryFilter(_ => !_.IsSoftDeleted);
        }
    }
}
