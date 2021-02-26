using FluentValidation;

namespace Anrtd.Application.ToDos.Commands.Create
{
    public class CreateToDoCommandValidator : AbstractValidator<CreateToDoCommand>
    {
        public CreateToDoCommandValidator()
        {
            RuleFor(x => x.Title).ToDoTitleRules();
        }
    }
}
