using System;
using System.Collections.Generic;
using System.IO;

namespace AnrtdScaffolder
{
    class Program
    {
        static void Main(string[] args)
        {
            const string entityName = "ToDoList";
            const string apiApplicationProjectRoot = @"C:\git\github\mjeorrett\AspNetReactToDo\AnrtdApi\Anrtd.Application";

            var sourceFilePaths = new List<string>() {
                @".\XXENTITY_NAMEXXs\Queries\GetById\GetXXENTITY_NAMEXXByIdQuery.cs",
                @".\XXENTITY_NAMEXXs\Queries\GetById\XXENTITY_NAMEXXDetailsDto.cs",
                @".\XXENTITY_NAMEXXs\Queries\GetPaginated\GetPaginatedXXENTITY_NAMEXXsQuery.cs",
                @".\XXENTITY_NAMEXXs\Queries\GetPaginated\GetPaginatedXXENTITY_NAMEXXsQueryValidator.cs",
                @".\XXENTITY_NAMEXXs\Queries\GetPaginated\XXENTITY_NAMEXXSummaryDto.cs",
                @".\XXENTITY_NAMEXXs\Commands\Create\CreateXXENTITY_NAMEXXCommand.cs",
                @".\XXENTITY_NAMEXXs\Commands\Create\CreateXXENTITY_NAMEXXCommandValidator.cs",
                @".\XXENTITY_NAMEXXs\Commands\SoftDelete\SoftDeleteXXENTITY_NAMEXXCommand.cs",
                @".\XXENTITY_NAMEXXs\Commands\Update\UpdateXXENTITY_NAMEXXCommand.cs",
                @".\XXENTITY_NAMEXXs\Commands\Update\UpdateXXENTITY_NAMEXXCommandValidator.cs",
            };

            foreach (var sourceFilePath in sourceFilePaths)
            {
                ScaffoldSource(entityName, apiApplicationProjectRoot, sourceFilePath);
            }
        }

        private static void ScaffoldSource(string entityName, string apiApplicationProjectRoot, string sourceFilePath)
        {
            string lowerCaseEntityName = char.ToLower(entityName[0]) + entityName.Substring(1);

            var destinationFilePathTemplate = Path.Join(apiApplicationProjectRoot, sourceFilePath);
            var destinationFilePath = destinationFilePathTemplate.Replace("XXENTITY_NAMEXX", entityName);

            var source = File.ReadAllText(sourceFilePath)
                .Replace("XXENTITY_NAMEXX", entityName)
                .Replace("xXENTITY_NAMEXX", lowerCaseEntityName)
                .Replace("IPlaceholderApplicationDbContext", "IApplicationDbContext");

            var directoryToCreate = Path.GetDirectoryName(destinationFilePath);
            Console.WriteLine($"Creating directory '{directoryToCreate}'.");
            Directory.CreateDirectory(directoryToCreate);
            File.WriteAllTextAsync(destinationFilePath, source);
        }
    }
}
