using Anrtd.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Interfaces;

namespace Anrtd.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<ToDoEntity> ToDos { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
            base(options)
        {

        }
    }
}
