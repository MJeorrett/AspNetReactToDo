using Anrtd.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Anrtd.Infrastructure.Persistence.EntityConfigurations
{
    public class ToDoListEntityConfiguration : IEntityTypeConfiguration<ToDoListEntity>
    {
        public void Configure(EntityTypeBuilder<ToDoListEntity> builder)
        {
            builder.HasQueryFilter(_ => !_.IsSoftDeleted);
        }
    }
}
