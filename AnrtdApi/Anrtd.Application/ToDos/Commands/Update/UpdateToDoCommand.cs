using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Requests;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Commands.Edit
{
    public record UpdateToDoCommand : IAppRequest, IMapTo<ToDoEntity>
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public ToDoStatus Status { get; init; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateToDoCommand, ToDoEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class UpdateToDoCommandHandler : AppRequestHandler<UpdateToDoCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UpdateToDoCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult> Handle(UpdateToDoCommand request, CancellationToken cancellationToken)
        {
            var toDo = await _dbContext.ToDos
                .SingleOrDefaultAsync(toDo => toDo.Id == request.Id, cancellationToken);

            if (toDo == default) return NotFound();

            _mapper.Map(request, toDo);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success();
        }
    }
}
