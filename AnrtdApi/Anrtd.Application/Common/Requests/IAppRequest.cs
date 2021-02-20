using MediatR;

namespace StageRaceFantasy.Application.Common.Requests
{
    public interface IAppRequest<T> : IRequest<AppRequestResult<T>>
    {
    }

    public interface IAppRequest : IRequest<AppRequestResult>
    {
    }
}
