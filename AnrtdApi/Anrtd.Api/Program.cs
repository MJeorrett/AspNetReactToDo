using Anrtd.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Anrtd.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            EnsureDbMigratedIfDevEnv(host);

            host.Run();
        }

        private static void EnsureDbMigratedIfDevEnv(IHost host)
        {
            var scope = host.Services.CreateScope();

            var hostEnvironment = scope.ServiceProvider.GetRequiredService<IHostEnvironment>();

            if (hostEnvironment.IsDevelopment())
            {
                DbInitialiser.EnsureDatabasesCreatedAndMigrated(scope.ServiceProvider);
            }
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
