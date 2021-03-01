using Anrtd.Domain.Enums;
using FluentValidation;
using System;

namespace Anrtd.Application.ToDos.Commands
{
    public static class ToDoCommandValidationRules
    {
        public static IRuleBuilder<T, string> ToDoTitleRules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            ruleBuilder.NotEmpty();

            return ruleBuilder;
        }

        public static IRuleBuilder<T, ToDoStatus> ToDoStatusRules<T>(this IRuleBuilder<T, ToDoStatus> ruleBuilder)
        {
            ruleBuilder
                .Must(value => Enum.IsDefined(typeof(ToDoStatus), value))
                    .WithMessage("You must provide a valid status.");

            return ruleBuilder;
        }
    }
}
