using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using Anrtd.Infrastructure.Persistence.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Interfaces;

namespace Anrtd.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<ToDoEntity> ToDos { get; set; }
        public DbSet<ToDoStatusEntity> ToDoStatuses { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
            base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ToDoEntityConfiguration).Assembly);
        }
    }
}
