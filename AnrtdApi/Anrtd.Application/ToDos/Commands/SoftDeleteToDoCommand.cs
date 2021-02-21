using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Interfaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Commands
{
    public record SoftDeleteToDoCommand(int ToDoId) : IAppRequest
    {
    }

    public class SoftDeleteToDoCommandHandler : AppRequestHandler<SoftDeleteToDoCommand>
    {
        private readonly IApplicationDbContext _dbContext;

        public SoftDeleteToDoCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task<AppRequestResult> Handle(SoftDeleteToDoCommand request, CancellationToken cancellationToken)
        {
            var toDo = await _dbContext.ToDos.SingleAsync(td => td.Id == request.ToDoId, cancellationToken);

            if (toDo is null)
            {
                return NotFound();
            }

            toDo.IsSoftDeleted = true;
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success();
        }
    }
}
