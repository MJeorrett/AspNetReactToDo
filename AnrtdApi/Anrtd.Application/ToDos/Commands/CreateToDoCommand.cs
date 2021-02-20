using Anrtd.Domain;
using StageRaceFantasy.Application.Common.Interfaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Commands
{
    public record CreateToDoCommand : IAppRequest<int>
    {
        public string Title { get; set; }
    }

    public class CreateToDoCommandHandler : AppRequestHandler<CreateToDoCommand, int>
    {
        private readonly IApplicationDbContext _dbContext;

        public CreateToDoCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task<AppRequestResult<int>> Handle(CreateToDoCommand request, CancellationToken cancellationToken)
        {
            var toDo = new ToDoEntity()
            {
                Title = request.Title,
            };

            _dbContext.ToDos.Add(toDo);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success(toDo.Id);
        }
    }
}
