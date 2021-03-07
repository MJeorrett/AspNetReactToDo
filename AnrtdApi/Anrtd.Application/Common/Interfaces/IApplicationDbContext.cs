using Anrtd.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<ToDoListEntity> ToDoLists { get; set; }
        DbSet<ToDoEntity> ToDos { get; set; }
        DbSet<ToDoTagEntity> ToDoTags { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
