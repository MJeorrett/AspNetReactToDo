using Anrtd.Domain.Common;
using Anrtd.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Anrtd.Domain.Entities
{
    [Table("ToDo")]
    public class ToDoEntity : AuditableEntity
    {
        public delegate Task<List<ToDoTagEntity>> GetTagEntities(List<string> toDoIds);

        [Column("ToDoId")]
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }

        [Required]
        public ToDoStatus Status { get; set; }

        public ToDoStatusEntity StatusEntity { get; set; }

        public TShirtSize? TShirtSize { get; set; }

        public TShirtSizeEntity TShirtSizeEntity { get; set; }

        public DateTime? DueDate { get; set; }

        public List<ToDoTagEntity> Tags { get; set; }

        public int? ListId { get; set; }
        public ToDoListEntity List { get; set; }

        public bool IsSoftDeleted { get; set; }

        public async Task UpdateTags(List<string> newTagList, GetTagEntities getTagEntities)
        {
            await AddTagsNotInList(newTagList, getTagEntities);
            RemoveTagsNotInList(newTagList);
        }

        private async Task AddTagsNotInList(List<string> tags, GetTagEntities getTagEntities)
        {
            var tagsToAdd = new List<string>();

            foreach (var newTag in tags)
            {
                if (!Tags.Any(tag => tag.Id == newTag))
                {
                    tagsToAdd.Add(newTag);
                }
            }

            if (!tagsToAdd.Any()) return;

            Tags.AddRange(await getTagEntities(tagsToAdd));
        }

        private void RemoveTagsNotInList(List<string> tags)
        {
            foreach (var existingTag in Tags.ToList())
            {
                if (!tags.Contains(existingTag.Id))
                {
                    Tags.Remove(existingTag);
                }
            }
        }
    }
}
