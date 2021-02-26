using Anrtd.Application.Common.Interfaces;
using System;

namespace Anrtd.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
