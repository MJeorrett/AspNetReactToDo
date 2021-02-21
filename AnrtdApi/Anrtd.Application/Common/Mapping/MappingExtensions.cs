using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Anrtd.Application.Common.Mapping
{
    public static class MappingExtensions
    {
        public static Task<List<TDestination>> ProjectToListAsync<TDestination>(
            this IQueryable queryable,
            IConfigurationProvider configuration,
            CancellationToken cancellationToken)
        {
            return queryable.ProjectTo<TDestination>(configuration).ToListAsync(cancellationToken);
        }
    }
}
