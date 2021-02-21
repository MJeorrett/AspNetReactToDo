using FluentValidation;

namespace Anrtd.Application.ToDos.Commands
{
    public class CreateToDoCommandValidator : AbstractValidator<CreateToDoCommand>
    {
        public CreateToDoCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty();
        }
    }
}
