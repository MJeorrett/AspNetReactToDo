using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Mapping;
using Anrtd.Application.Common.Requests;
using Anrtd.Domain.Entities;
using Anrtd.Domain.Enums;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.XXENTITY_NAMEXXs.Commands.Update
{
    public record UpdateXXENTITY_NAMEXXCommand : IAppRequest, IMapTo<XXENTITY_NAMEXXEntity>
    {
        public int XXENTITY_NAMEXXId { get; init; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateXXENTITY_NAMEXXCommand, XXENTITY_NAMEXXEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class UpdateXXENTITY_NAMEXXCommandHandler : AppRequestHandler<UpdateXXENTITY_NAMEXXCommand>
    {
        private readonly IPlaceholderApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UpdateXXENTITY_NAMEXXCommandHandler(IPlaceholderApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult> Handle(UpdateXXENTITY_NAMEXXCommand request, CancellationToken cancellationToken)
        {
            var xXENTITY_NAMEXX = await _dbContext.XXENTITY_NAMEXXs
                .SingleOrDefaultAsync(xXENTITY_NAMEXX => xXENTITY_NAMEXX.Id == request.XXENTITY_NAMEXXId, cancellationToken);

            if (xXENTITY_NAMEXX == default) return NotFound();

            _mapper.Map(request, xXENTITY_NAMEXX);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Success();
        }
    }
}
