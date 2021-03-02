using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Requests;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.XXENTITY_NAMEXXs.Commands.SoftDelete
{
    public record SoftDeleteXXENTITY_NAMEXXCommand(int XXENTITY_NAMEXXId) : IAppRequest
    {
    }

    public class SoftDeleteXXENTITY_NAMEXXCommandHandler : AppRequestHandler<SoftDeleteXXENTITY_NAMEXXCommand>
    {
        private readonly IPlaceholderApplicationDbContext _dbContext;

        public SoftDeleteXXENTITY_NAMEXXCommandHandler(IPlaceholderApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task<AppRequestResult> Handle(SoftDeleteXXENTITY_NAMEXXCommand request, CancellationToken cancellationToken)
        {
            var xXENTITY_NAMEXX = await _dbContext.XXENTITY_NAMEXXs.SingleAsync(xXENTITY_NAMEXX => xXENTITY_NAMEXX.Id == request.XXENTITY_NAMEXXId, cancellationToken);

            if (xXENTITY_NAMEXX is null)
            {
                return NotFound();
            }

            xXENTITY_NAMEXX.IsSoftDeleted = true;
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success();
        }
    }
}
