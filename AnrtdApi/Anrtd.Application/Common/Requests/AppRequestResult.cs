using System.Collections.Generic;

namespace Anrtd.Application.Common.Requests
{
    public record AppRequestResult<T>
    {
        public T? Content { get; init; }
        public bool IsBadRequest { get; init; }
        public bool IsNotFound { get; init; }
        public Dictionary<string, string[]> ValidationFailures { get; init; }

        public AppRequestResult()
        {
            ValidationFailures = new Dictionary<string, string[]>();
        }

        public AppRequestResult(T content) : this()
        {
            Content = content;
        }

        // This constructor is required by ValidationBehaviour which uses reflection.
        public AppRequestResult(Dictionary<string, string[]> validationFailures)
        {
            IsBadRequest = true;
            ValidationFailures = validationFailures;
        }
    }



    public record AppRequestResult
    {
        public bool IsBadRequest { get; init; }
        public bool IsNotFound { get; init; }
        public Dictionary<string, string[]> ValidationFailures { get; init; }

        public AppRequestResult()
        {
            ValidationFailures = new Dictionary<string, string[]>();
        }

        // This constructor is required by ValidationBehaviour which uses reflection.
        public AppRequestResult(Dictionary<string, string[]> validationFailures)
        {
            IsBadRequest = true;
            ValidationFailures = validationFailures;
        }

        public static AppRequestResult<T> Success<T>(T content)
        {
            return new AppRequestResult<T>(content);
        }

        public static AppRequestResult Success()
        {
            return new AppRequestResult();
        }

        public static AppRequestResult<T> BadRequest<T>(Dictionary<string, string[]> validationFailures)
        {
            return new AppRequestResult<T>()
            {
                IsBadRequest = true,
                ValidationFailures = validationFailures,
            };
        }

        public static AppRequestResult<T> BadRequest<T>()
        {
            return new AppRequestResult<T>()
            {
                IsBadRequest = true,
            };
        }

        public static AppRequestResult BadRequest()
        {
            return new AppRequestResult()
            {
                IsBadRequest = true,
            };
        }

        public static AppRequestResult<T> NotFound<T>()
        {
            return new AppRequestResult<T>()
            {
                IsNotFound = true,
            };
        }

        public static AppRequestResult NotFound()
        {
            return new AppRequestResult()
            {
                IsNotFound = true,
            };
        }
    }
}
