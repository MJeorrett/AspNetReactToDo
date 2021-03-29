using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Requests;
using Anrtd.Domain.Entities;
using AutoMapper;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDoLists.Commands.Create
{
    public record CreateToDoListCommand : IAppRequest<int>, IMapTo<ToDoListEntity>
    {
        public string Title { get; set; } = "";

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateToDoListCommand, ToDoListEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateToDoListCommandHandler : AppRequestHandler<CreateToDoListCommand, int>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CreateToDoListCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult<int>> Handle(CreateToDoListCommand request, CancellationToken cancellationToken)
        {
            var toDoList = _mapper.Map<ToDoListEntity>(request);
            _dbContext.ToDoLists.Add(toDoList);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success(toDoList.Id);
        }
    }
}
