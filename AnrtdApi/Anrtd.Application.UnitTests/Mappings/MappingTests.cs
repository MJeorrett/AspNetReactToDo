using Anrtd.Application.Common.Mapping;
using Anrtd.Application.ToDos.Commands.Create;
using Anrtd.Application.ToDos.Commands.Edit;
using Anrtd.Application.ToDos.Queries.GetById;
using Anrtd.Application.ToDos.Queries.GetPaginated;
using Anrtd.Domain.Entities;
using AutoMapper;
using NUnit.Framework;
using System;
using System.Runtime.Serialization;

namespace Anrtd.Application.UnitTests.Mappings
{
    public class MappingTests
    {
        private readonly IConfigurationProvider _configuration;
        private readonly IMapper _mapper;

        public MappingTests()
        {
            _configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            _mapper = _configuration.CreateMapper();
        }

        [Test]
        public void ShouldHaveValidConfiguration()
        {
            _configuration.AssertConfigurationIsValid();
        }

        [Test]
        [TestCase(typeof(ToDoEntity), typeof(ToDoSummaryDto))]
        [TestCase(typeof(ToDoEntity), typeof(ToDoDetailsDto))]
        [TestCase(typeof(CreateToDoCommand), typeof(ToDoEntity))]
        [TestCase(typeof(UpdateToDoCommand), typeof(ToDoEntity))]
        public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
        {
            var instance = GetInstanceOf(source);

            _mapper.Map(instance, source, destination);
        }

        private object? GetInstanceOf(Type type)
        {
            if (type.GetConstructor(Type.EmptyTypes) != null)
                return Activator.CreateInstance(type);

            // Type without parameterless constructor
            return FormatterServices.GetUninitializedObject(type);
        }
    }
}
