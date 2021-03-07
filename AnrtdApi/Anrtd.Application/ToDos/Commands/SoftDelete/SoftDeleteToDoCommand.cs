using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Requests;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Commands.SoftDelete
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
            var toDo = await _dbContext.ToDos.SingleOrDefaultAsync(td => td.Id == request.ToDoId, cancellationToken);

            if (toDo == default)
            {
                return NotFound();
            }

            toDo.IsSoftDeleted = true;
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success();
        }
    }
}
