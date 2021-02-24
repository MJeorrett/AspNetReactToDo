using MediatR;

namespace Anrtd.Application.Common.Requests
{
    public interface IAppRequest<T> : IRequest<AppRequestResult<T>>, IValidatedAppRequest
    {
    }

    public interface IAppRequest : IRequest<AppRequestResult>, IValidatedAppRequest
    {
    }

    public interface IValidatedAppRequest { }
}
