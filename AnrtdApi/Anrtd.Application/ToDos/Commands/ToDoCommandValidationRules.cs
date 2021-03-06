using Anrtd.Domain.Enums;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

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

        public static IRuleBuilder<T, string> ToDoTagRules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            ruleBuilder
                .Matches(new Regex("^[a-z0-9-_]*$"))
                    .WithMessage("Tags can only contain letters, numbers, dashes and underscores.");

            return ruleBuilder;
        }
    }
}
