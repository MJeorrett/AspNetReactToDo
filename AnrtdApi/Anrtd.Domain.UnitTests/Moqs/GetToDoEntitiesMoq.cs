using Anrtd.Domain.Entities;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Anrtd.Domain.UnitTests.Moqs
{
    public class GetToDoEntitiesMoq : Mock<ToDoEntity.GetTagEntities>
    {
        public GetToDoEntitiesMoq()
        {
            Setup(mock => mock(It.IsAny<List<string>>()))
                .Returns((List<string> tagIds) => GetTagEntities(tagIds));
        }

        public void VerifyWasCalledWithTagIds(List<string> tagIds)
        {
            Verify(_ => _(It.Is<List<string>>(arg =>
                    arg.OrderBy(x => x)
                       .SequenceEqual(tagIds.OrderBy(x => x)))),
                Times.Once());
        }

        public void VerifyWasNotCalled()
        {
            Verify(_ => _(It.IsAny<List<string>>()), Times.Never());
        }

        private static Task<List<ToDoTagEntity>> GetTagEntities(List<string> tagIds)
        {
            return Task.FromResult(tagIds
                .Select(tagId => new ToDoTagEntity() { Id = tagId })
                .ToList());
        }
    }
}
