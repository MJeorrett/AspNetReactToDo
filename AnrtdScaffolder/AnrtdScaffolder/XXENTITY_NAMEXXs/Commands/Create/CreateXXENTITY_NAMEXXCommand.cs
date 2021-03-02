using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Requests;
using Anrtd.Domain.Entities;
using AutoMapper;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.XXENTITY_NAMEXXs.Commands.Create
{
    public record CreateXXENTITY_NAMEXXCommand : IAppRequest<int>, IMapTo<XXENTITY_NAMEXXEntity>
    {
        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateXXENTITY_NAMEXXCommand, XXENTITY_NAMEXXEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateXXENTITY_NAMEXXCommandHandler : AppRequestHandler<CreateXXENTITY_NAMEXXCommand, int>
    {
        private readonly IPlaceholderApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CreateXXENTITY_NAMEXXCommandHandler(IPlaceholderApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult<int>> Handle(CreateXXENTITY_NAMEXXCommand request, CancellationToken cancellationToken)
        {
            var xXENTITY_NAMEXX = _mapper.Map<XXENTITY_NAMEXXEntity>(request);
            _dbContext.XXENTITY_NAMEXXs.Add(xXENTITY_NAMEXX);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success(xXENTITY_NAMEXX.Id);
        }
    }
}
