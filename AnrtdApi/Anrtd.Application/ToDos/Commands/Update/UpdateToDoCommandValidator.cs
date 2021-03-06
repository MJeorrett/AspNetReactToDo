﻿using Anrtd.Application.ToDos.Commands.Edit;
using FluentValidation;

namespace Anrtd.Application.ToDos.Commands.Update
{
    public class UpdateToDoCommandValidator : AbstractValidator<UpdateToDoCommand>
    {
        public UpdateToDoCommandValidator()
        {
            RuleFor(x => x.Title).ToDoTitleRules();
            RuleFor(x => x.Status).ToDoStatusRules();
            RuleForEach(x => x.Tags).ToDoTagRules();
        }
    }
}
