using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Anrtd.Application.Common.Models
{
    public record PaginatedList<T>(
        List<T> Items,
        int TotalCount,
        int TotalPages,
        int PageNumber,
        int PageSize)
    {
        public bool HasPreviousPage => PageNumber > 1;

        public bool HasNextPage => PageNumber < TotalPages;

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var totalCount = await source.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            var flooredPageNumber = Math.Min(pageNumber, totalPages);
            var items = await source.Skip((flooredPageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PaginatedList<T>(items, totalCount, totalCount, flooredPageNumber, pageSize);
        }
    }
}
