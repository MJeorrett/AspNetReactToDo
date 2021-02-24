using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.Common.Requests
{
    public abstract class AppRequestHandler<TRequest, TResponse> : IRequestHandler<TRequest, AppRequestResult<TResponse>>
        where TRequest : IRequest<AppRequestResult<TResponse>>
    {
        public abstract Task<AppRequestResult<TResponse>> Handle(TRequest request, CancellationToken cancellationToken);

        protected AppRequestResult<TResponse> Success(TResponse response)
        {
            return AppRequestResult.Success(response);
        }

        protected AppRequestResult<TResponse> BadRequest()
        {
            return AppRequestResult.BadRequest<TResponse>();
        }

        protected AppRequestResult<TResponse> NotFound()
        {
            return AppRequestResult.NotFound<TResponse>();
        }
    }

    public abstract class AppRequestHandler<TRequest> : IRequestHandler<TRequest, AppRequestResult>
        where TRequest : IRequest<AppRequestResult>
    {
        public abstract Task<AppRequestResult> Handle(TRequest request, CancellationToken cancellationToken);

        protected AppRequestResult Success()
        {
            return AppRequestResult.Success();
        }

        protected AppRequestResult BadRequest()
        {
            return AppRequestResult.BadRequest();
        }

        protected AppRequestResult NotFound()
        {
            return AppRequestResult.NotFound();
        }
    }
}
