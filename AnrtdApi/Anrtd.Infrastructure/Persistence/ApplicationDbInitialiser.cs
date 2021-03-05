using Anrtd.Domain.Common;
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

                logger.LogInformation("Creating ToDoStatus enum entities if required.");
                await SeedToDoStatuses<ToDoStatusEntity, ToDoStatus>(dbContext, logger);
                logger.LogInformation("Finished creating ToDoStatus enum entities.");

                logger.LogInformation("Creating TShirtSize enum entities if required.");
                await SeedToDoStatuses<TShirtSizeEntity, TShirtSize>(dbContext, logger);
                logger.LogInformation("Finished creating TShirtSize enum entities.");

                logger.LogInformation("Schema database migration done.");
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "Unhandled exception trying to ensure schema database created and migrated.");
            }

        }

        private static async Task SeedToDoStatuses<TEnumEntity, TEnum>(ApplicationDbContext dbContext, ILogger logger)
            where TEnumEntity : class, IEnumEntity<TEnum>, new()
            where TEnum : struct, Enum
        {
            var existingDbEtities = await dbContext.Set<TEnumEntity>().ToListAsync();

            var enumEntitiesInCode = Enum.GetValues<TEnum>()
                .Select(enumValue => new TEnumEntity()
                {
                    Id = enumValue,
                    Name = enumValue.ToString(),
                });

            foreach (var enumEntity in enumEntitiesInCode)
            {
                var existingDbEntity = existingDbEtities.FirstOrDefault(s => s.Id.Equals(enumEntity.Id));

                if (existingDbEntity != null && enumEntity.Name != existingDbEntity.Name)
                {
                    throw new Exception("Missmatch between enum in code and db:\n" +
                        $"Id: {enumEntity.Id}\n" +
                        $"Name in code: {enumEntity.Name}\n" +
                        $"Name in db: {existingDbEntity.Name}");
                }

                if (existingDbEntity is null)
                {
                    logger.LogInformation("Enum found in code {EnumName} does not exist in db so creating it.", enumEntity.Name);
                    dbContext.Add(enumEntity);
                }
            }

            await dbContext.SaveChangesAsync();
        }
    }
}
