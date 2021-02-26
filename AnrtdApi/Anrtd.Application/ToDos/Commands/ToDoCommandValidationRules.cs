using FluentValidation;

namespace Anrtd.Application.ToDos.Commands
{
    public static class ToDoCommandValidationRules
    {
        public static IRuleBuilder<T, string> ToDoTitleRules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            ruleBuilder.NotEmpty();

            return ruleBuilder;
        }
    }
}
