using Anrtd.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Anrtd.Infrastructure.Persistence
{
    public class ApplicationDbInitialiser
    {
        public static async Task EnsureDatabasesCreatedAndMigrated(IServiceProvider services)
        {
            var logger = services.GetRequiredService<ILogger<ApplicationDbInitialiser>>();
            
            try
            {
                logger.LogInformation("Migrating schema database.");

                var dbContext = services.GetRequiredService<ApplicationDbContext>();

                dbContext.Database.Migrate();

                await SeedToDoStatuses(dbContext, logger);

                logger.LogInformation("Schema database migration done.");
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "Unhandled exception trying to ensure schema database created and migrated.");
            }

        }

        private static async Task SeedToDoStatuses(ApplicationDbContext dbContext, ILogger logger)
        {
            logger.LogInformation("Creating to do status entities if required.");

            var existingDbStatuses = await dbContext.ToDoStatuses.ToListAsync();

            var statusesInCode = Enum.GetValues<ToDoStatus>()
                .Select(status => new ToDoStatusEntity()
                {
                    Id = status,
                    Name = status.ToString(),
                });

            foreach (var statusInCode in statusesInCode)
            {
                var existingDbStatus = existingDbStatuses.FirstOrDefault(s => s.Id == statusInCode.Id);

                if (existingDbStatus != null && statusInCode.Name != existingDbStatus.Name)
                {
                    throw new Exception("Missmatch between ToDo status in code and db:\n" +
                        $"Id: {statusInCode.Id}\n" +
                        $"Name in code: {statusInCode.Name}\n" +
                        $"Name in db: {existingDbStatus.Name}");
                }

                if (existingDbStatus is null)
                {
                    logger.LogInformation("Status found in code {StatusName} does not exist in db so creating it.", statusInCode.Name);
                    dbContext.ToDoStatuses.Add(statusInCode);
                }
            }

            await dbContext.SaveChangesAsync();

            logger.LogInformation("Finished creating toDo status entities.");
        }
    }
}
