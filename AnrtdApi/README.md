# AnrtdApi
This is the back end of the [Asp.Net Core React ToDo](../README.md) project.
It demonstrates the typical setup I use for Asp.Net Core projects using EF Core.
It is heavily inspired by Jason Taylor's [Clean Architecture](https://github.com/jasontaylordev/CleanArchitecture) project.

Most of the ideas are from Jason's project so I highly recommend viewing his videos to learn more about that.
However I have introduced the following ideas:
- Mapping enums in code to a db table - based on [this gist](https://gist.github.com/paolofulgoni/825bef5cd6cd92c4f9bbf33f603af4ff).
- Response errors without throwing exceptions.
- Soft deletion - DELETE method on endpoint rational is that soft delete is internal to api.
- Sharing validation rules between models.
- TODO: Validating enum values using Fluent Validation - inspiration taken from here https://benfoster.io/blog/binding-validating-enums-aspnet-core/
- Predicate builder pattern - taken from this article http://www.albahari.com/nutshell/predicatebuilder.aspx
- Pagination
  - Note that page number is 1-indexed as this is preferred by client so makes everything easier.