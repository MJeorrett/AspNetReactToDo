using Anrtd.Domain.UnitTests.Factories;
using Anrtd.Domain.UnitTests.Moqs;
using NUnit.Framework;
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

                var getTagEntitiesMock = new GetToDoEntitiesMoq();

                await toDo.UpdateTags(
                    new List<string>() { "tag2", "tag4" },
                    getTagEntitiesMock.Object);

                var actual = toDo.Tags.Select(tag => tag.Id).ToList();
                var expected = new List<string>() { "tag2", "tag4" };

                CollectionAssert.AreEqual(expected, actual);
                getTagEntitiesMock.VerifyNoOtherCalls();
            }

            [Test]
            public async Task ShouldAddTagsInNewListNotInExsitingTags()
            {
                var toDo = ToDoEntityFactory.CreateWithTags(new List<string>()
                {
                    "tag1", "tag2"
                });

                var getTagEntitiesMock = new GetToDoEntitiesMoq();

                await toDo.UpdateTags(
                    new List<string>() { "tag1", "tag2", "tag3", "tag4" },
                    getTagEntitiesMock.Object);

                var actual = toDo.Tags.Select(tag => tag.Id).ToList();

                var expected = new List<string>() { "tag1", "tag2", "tag3", "tag4" };

                CollectionAssert.AreEqual(expected, actual);
                getTagEntitiesMock.VerifyWasCalledWithTagIds(new List<string> { "tag3", "tag4" });
            }
        }
    }
}
