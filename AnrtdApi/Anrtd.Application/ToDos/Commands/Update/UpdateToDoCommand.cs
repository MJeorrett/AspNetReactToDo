using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Requests;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.ToDos.Commands.Edit
{
    public record UpdateToDoCommand : IAppRequest, IMapTo<ToDoEntity>
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public ToDoStatus Status { get; init; }
        public TShirtSize? TShirtSize { get; init; }
        public DateTime? DueDate { get; init; }
        public List<string> Tags { get; init; }

        public UpdateToDoCommand()
        {
            Tags = new List<string>();
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateToDoCommand, ToDoEntity>()
                .ForMember(x => x.Tags, x => x.Ignore())
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
                .Include(x => x.Tags)
                .SingleOrDefaultAsync(toDo => toDo.Id == request.Id, cancellationToken);

            if (toDo == default) return NotFound();

            _mapper.Map(request, toDo);

            await toDo.UpdateTags(request.Tags, GetOrCreateTags);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success();
        }

        private async Task<List<ToDoTagEntity>> GetOrCreateTags(List<string> tagIds)
        {
            var allTags = await _dbContext.ToDoTags.ToListAsync();

            var result = new List<ToDoTagEntity>();

            foreach (var tagId in tagIds)
            {
                var existingTag = allTags.SingleOrDefault(t => t.Id == tagId);
                var tagToReturn = existingTag == default ?
                    new ToDoTagEntity() { Id = tagId } :
                    existingTag;

                result.Add(tagToReturn);
            }

            return result;
        }
    }
}
