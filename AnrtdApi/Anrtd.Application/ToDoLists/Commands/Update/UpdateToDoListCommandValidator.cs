using FluentValidation;

namespace Anrtd.Application.ToDoLists.Commands.Update
{
    public class UpdateToDoListCommandValidator : AbstractValidator<UpdateToDoListCommand>
    {
        public UpdateToDoListCommandValidator()
        {
        }
    }
}
