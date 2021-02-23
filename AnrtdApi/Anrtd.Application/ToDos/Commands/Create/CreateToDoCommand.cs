using Anrtd.Application.Common.Mapping;
using Anrtd.Domain.Entities;
using AutoMapper;
using StageRaceFantasy.Application.Common.Interfaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Commands.Create
{
    public record CreateToDoCommand : IAppRequest<int>, IMapTo<ToDoEntity>
    {
        public string Title { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateToDoCommand, ToDoEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateToDoCommandHandler : AppRequestHandler<CreateToDoCommand, int>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CreateToDoCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult<int>> Handle(CreateToDoCommand request, CancellationToken cancellationToken)
        {
            var toDo = _mapper.Map<ToDoEntity>(request);
            _dbContext.ToDos.Add(toDo);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success(toDo.Id);
        }
    }
}
