using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Requests;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDoLists.Commands.Update
{
    public record UpdateToDoListCommand : IAppRequest, IMapTo<ToDoListEntity>
    {
        public int Id { get; init; }

        public string Title { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateToDoListCommand, ToDoListEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class UpdateToDoListCommandHandler : AppRequestHandler<UpdateToDoListCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UpdateToDoListCommandHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult> Handle(UpdateToDoListCommand request, CancellationToken cancellationToken)
        {
            var toDoList = await _dbContext.ToDoLists
                .SingleOrDefaultAsync(toDoList => toDoList.Id == request.Id, cancellationToken);

            if (toDoList == default) return NotFound();

            _mapper.Map(request, toDoList);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success();
        }
    }
}
