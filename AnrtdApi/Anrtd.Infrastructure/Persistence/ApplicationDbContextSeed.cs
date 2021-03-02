using Anrtd.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Anrtd.Infrastructure.Persistence
{
    public class ApplicationDbContextSeed
    {
        public static async Task SeedToDos(IServiceProvider services)
        {
            var logger = services.GetRequiredService<ILogger<ApplicationDbContextSeed>>();
            var dbContext = services.GetRequiredService<ApplicationDbContext>();

            await DoSeedToDos(logger, dbContext);
        }

        private static async Task DoSeedToDos(ILogger<ApplicationDbContextSeed> logger, ApplicationDbContext dbContext)
        {
            logger.LogInformation("Seeding ToDos.");

            var existingToDoCount = await dbContext.ToDos.CountAsync();

            for (var i = existingToDoCount; i < 25; i++)
            {
                dbContext.ToDos.Add(new ToDoEntity()
                {
                    Title = $"Seed ToDo {i}",
                });
            }

            await dbContext.SaveChangesAsync();

            logger.LogInformation("Finished seeding ToDos.");
        }
    }
}
