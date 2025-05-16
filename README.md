# Applications Challenge - Client

This is the frontend application for the Applications Challenge project. It was built with [Angular](https://angular.dev/) version 19.2 and provides a user interface for managing applications.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

## Installation

To install the project dependencies, run:

```bash
npm install
```

This will install all the required dependencies listed in the package.json file, including:
- Angular core packages
- Bootstrap for styling
- SignalR for real-time communications
- RxJS for reactive programming

## Development server

To start a local development server, run:

```bash
npm start
```

Or alternatively:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project for production, run:

```bash
npm run build
```

Or alternatively:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm test
```

Or alternatively:

```bash
ng test
```

## Running end-to-end tests

To set up and run end-to-end tests (Cypress is recommended for Angular 19+):

```bash
npm run e2e
```

Note: You may need to configure an e2e testing solution as it's not included by default in Angular CLI.

## Project Structure

The application is organized with the following structure:

```
src/
  app/
    Applications/            # Feature module for application management
      models/                # Data models for applications
      Pages/                 # Components for application pages
        application-form/    # Form for creating/editing applications
        applications-list/   # List view of applications
      services/              # Services for data fetching and state management
    components/              # Shared components
    interceptors/            # HTTP interceptors for authentication
    pages/                   # Main application pages
  environments/              # Environment configuration files
```

## Features

- User authentication and authorization
- Application listing and filtering
- Application creation and editing
- Responsive design with Bootstrap

## Technologies

This project uses:

- Angular 19.2.x
- TypeScript 5.7.x
- Bootstrap 5.3.x
- RxJS 7.8.x
- SignalR for real-time communication

## Additional Resources

- [Angular Documentation](https://angular.dev/docs)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [RxJS Documentation](https://rxjs.dev/guide/overview)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
