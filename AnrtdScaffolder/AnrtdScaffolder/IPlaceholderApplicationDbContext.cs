using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd
{
    public interface IPlaceholderApplicationDbContext
    {
        DbSet<XXENTITY_NAMEXXEntity> XXENTITY_NAMEXXs { get; set; }

        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
