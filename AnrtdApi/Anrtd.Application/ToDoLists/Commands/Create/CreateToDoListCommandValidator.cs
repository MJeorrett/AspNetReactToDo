using FluentValidation;

namespace Anrtd.Application.ToDoLists.Commands.Create
{
    public class CreateToDoListCommandValidator : AbstractValidator<CreateToDoListCommand>
    {
        public CreateToDoListCommandValidator()
        {
        }
    }
}
