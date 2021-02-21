using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace Anrtd.Infrastructure.Persistence
{
    public class ApplicationDbInitialiser
    {
        public static void EnsureDatabasesCreatedAndMigrated(IServiceProvider services)
        {
            var logger = services.GetRequiredService<ILogger<ApplicationDbInitialiser>>();
            
            try
            {
                logger.LogInformation("Migrating schema database.");

                var schemaDbContext = services.GetRequiredService<ApplicationDbContext>();

                schemaDbContext.Database.Migrate();

                logger.LogInformation("Schema database migration done.");
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "Unhandled exception trying to ensure schema database created and migrated.");
            }

        }
    }
}
