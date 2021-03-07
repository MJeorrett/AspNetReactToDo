using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Requests;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDoLists.Commands.SoftDelete
{
    public record SoftDeleteToDoListCommand(int ToDoListId) : IAppRequest
    {
    }

    public class SoftDeleteToDoListCommandHandler : AppRequestHandler<SoftDeleteToDoListCommand>
    {
        private readonly IApplicationDbContext _dbContext;

        public SoftDeleteToDoListCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task<AppRequestResult> Handle(SoftDeleteToDoListCommand request, CancellationToken cancellationToken)
        {
            var toDoList = await _dbContext.ToDoLists.SingleOrDefaultAsync(toDoList => toDoList.Id == request.ToDoListId, cancellationToken);

            if (toDoList == default)
            {
                return NotFound();
            }

            toDoList.IsSoftDeleted = true;
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success();
        }
    }
}
