using Anrtd.Domain.Entities;
using Anrtd.Domain.UnitTests.Factories;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Anrtd.Domain.UnitTests.Entities
{
    public class ToDoEntityTests
    {
        public class UpdateTags
        {
            [Test]
            public async Task ShouldRemoveExistingTagsNotInNewList()
            {
                var toDo = ToDoEntityFactory.CreateWithTags(new List<string>()
                {
                    "tag1", "tag2", "tag3", "tag4", "tag5"
                });

                await toDo.UpdateTags(
                    new List<string>() { "tag2", "tag4" },
                    GetTagEntities);

                var actual = toDo.Tags.Select(tag => tag.Id).ToList();
                var expected = new List<string>() { "tag2", "tag4" };

                CollectionAssert.AreEqual(expected, actual);
            }

            [Test]
            public async Task ShouldAddTagsInNewListNotInExsitingTags()
            {
                var toDo = ToDoEntityFactory.CreateWithTags(new List<string>()
                {
                    "tag1", "tag2"
                });

                var getTagEntitiesMock = new Mock<Func<List<string>, Task<List<ToDoTagEntity>>>>();
                getTagEntitiesMock
                    .Setup(mock => mock(It.IsAny<List<string>>()))
                    .Returns((List<string> tagIds) => GetTagEntities(tagIds));

                await toDo.UpdateTags(
                    new List<string>() { "tag1", "tag2", "tag3", "tag4" },
                    getTagEntitiesMock.Object);

                var actual = toDo.Tags.Select(tag => tag.Id).ToList();

                var expected = new List<string>() { "tag1", "tag2", "tag3", "tag4" };

                CollectionAssert.AreEqual(expected, actual);

                getTagEntitiesMock.Verify(getTagEntities =>
                    getTagEntities(It.Is<List<string>>(l => l.Contains("tag3"))),
                    Times.Once());

                getTagEntitiesMock.Verify(getTagEntities =>
                   getTagEntities(It.Is<List<string>>(l => l.Contains("tag4"))),
                   Times.Once());
            }

            private static Task<List<ToDoTagEntity>> GetTagEntities(List<string> tagIds)
            {
                return Task.FromResult(tagIds
                    .Select(tagId => new ToDoTagEntity() { Id = tagId })
                    .ToList());
            }
        }
    }
}
