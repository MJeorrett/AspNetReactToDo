using Anrtd.Application.Common.Interfaces;
using Anrtd.Application.Common.Requests;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.XXENTITY_NAMEXXs.Queries.GetById
{
    public record GetXXENTITY_NAMEXXByIdQuery(int XXENTITY_NAMEXXId) : IAppRequest<XXENTITY_NAMEXXDetailsDto>
    {
    }

    public class GetXXENTITY_NAMEXXByIdQueryHandler : AppRequestHandler<GetXXENTITY_NAMEXXByIdQuery, XXENTITY_NAMEXXDetailsDto>
    {
        private readonly IPlaceholderApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetXXENTITY_NAMEXXByIdQueryHandler(IPlaceholderApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public override async Task<AppRequestResult<XXENTITY_NAMEXXDetailsDto>> Handle(GetXXENTITY_NAMEXXByIdQuery request, CancellationToken cancellationToken)
        {
            var xXENTITY_NAMEXXEntity = await _dbContext.XXENTITY_NAMEXXs.SingleOrDefaultAsync(xXENTITY_NAMEXX => xXENTITY_NAMEXX.Id == request.XXENTITY_NAMEXXId, cancellationToken);

            if (xXENTITY_NAMEXXEntity == default) return NotFound();

            var xXENTITY_NAMEXXDto = _mapper.Map<XXENTITY_NAMEXXDetailsDto>(xXENTITY_NAMEXXEntity);
            return Success(xXENTITY_NAMEXXDto);
        }
    }
}
