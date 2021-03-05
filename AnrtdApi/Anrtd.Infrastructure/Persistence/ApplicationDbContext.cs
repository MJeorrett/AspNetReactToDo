using Anrtd.Application.Common.Interfaces;
using Anrtd.Domain.Common;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using Anrtd.Infrastructure.Persistence.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<ToDoEntity> ToDos { get; set; }
        public DbSet<ToDoStatusEntity> ToDoStatuses { get; set; }
        public DbSet<TShirtSizeEntity> TShirtSizes { get; set; }

        private readonly IDateTime _dateTime;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IDateTime dateTime) :
            base(options)
        {
            _dateTime = dateTime;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ToDoEntityConfiguration).Assembly);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = _dateTime.Now;
                        break;

                    case EntityState.Modified:
                        entry.Entity.LastModifiedDate = _dateTime.Now;
                        break;
                }
            }

            var result = await base.SaveChangesAsync(cancellationToken);

            return result;
        }
    }
}
