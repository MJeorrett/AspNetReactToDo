using Anrtd.Domain;
using Microsoft.EntityFrameworkCore;

namespace Anrtd.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<ToDoEntity> ToDos { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
            base(options)
        {

        }
    }
}
