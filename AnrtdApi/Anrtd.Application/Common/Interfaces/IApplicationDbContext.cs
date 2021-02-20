using Anrtd.Domain;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<ToDoEntity> ToDos { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
