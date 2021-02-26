# anrtd-client
This is the front end of the [Asp.Net Core React ToDo](../README.md) project.

It demonstrates the typical set up I use for react projects including:
- Api calls using axios.
- Api error handling.
- Handy hook for making http requests.
- Anti-corruption layer between api and app models to allow the two to change independently.
- Material UI.
- Redux store built using @reduxjs/toolkit.
- Forms using formik including validation.
- Routing using react-router.
- Configuration.

### Component layers
The components in the app, i.e. the files containing code that actually renders something, are divided into three layers:
- Core - any of the components in [./src/components](./src/components)
  - Generally small and simple.
  - Highly re-usable.
  - Not specific to any particular domain model.
- Domain Model Specific - e.g. any of the components in [./src/components-todos](./src/components-todos)
  - Generally larger and more complex.
  - Compose multiple core components + custom jsx.
  - Somewhat re-usable but often only used in one or two places.
  - Specific to one domain model.
- Pages - any of the components in [./src/pages](./src/pages)
  - Map directly 1 to 1 with routes in the app.
  - Determine what appears on each page and layout.
  - Compose Core & Domain Model Specific components + minimal custom jsx.
  - Only used in one place i.e. [AppRoutes.tsx](./src/AppRoutes.tsx).