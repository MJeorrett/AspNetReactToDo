using Anrtd.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace Anrtd.Api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            var scope = host.Services.CreateScope();

            var hostEnvironment = scope.ServiceProvider.GetRequiredService<IHostEnvironment>();

            if (hostEnvironment.IsDevelopment())
            {
                await EnsureDbMigratedAndSeeded(scope.ServiceProvider);
            }

            await host.RunAsync();
        }

        private static async Task EnsureDbMigratedAndSeeded(IServiceProvider services)
        {
            await ApplicationDbInitialiser.EnsureDatabasesCreatedAndMigrated(services);
            await ApplicationDbContextSeed.SeedToDos(services);
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
