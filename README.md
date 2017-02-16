# U235 Control Room

Administration for Reactor U235 Core

## Development

### Dependencies

Docker can be used to run dependencies for the application. At the time of writing u235core will be exposed on the localhost at port 8000

```bash
# build and run containers
$ docker-compose up -d

# run existing containers
$ docker-compose start

# attach to core to run commands
$ docker exec -it u235ctrl_u235core_1 /bin/bash

```


```bash
$ nvm i
$ npm i
$ npm start
```

This will start a server and a number of other watchers for compiling JavaScript, Sass, copying images into place, and linting.

On file change watchers will respond and you will see recompilation in `stdout` of the terminal running the process.

Refer to the `gulpfile` for specifics on tasks and watchers running.

## Project Structure

Source code is located in the `src/` directory. Built files are located in the `build/` directory. The entry point to project initialization is located in `src/main.js`. The `src/index.html` file is copied into the build directory by webpack and the necessary script and style tags are injected into the file during compilation.

The routing structure is composed to allow on-demand download of code for specific routes. On initial page load, the minimal amount of necessary functionality should be loaded and route functionality loaded on-demand when the user navigates to the route. React Router and Webpack allow code-splitting and on-demand loading to be relatively easy compared to other solutions.

```
├── build - Compiled/built/copied code
├── src - Source code
│	├── images
│	├── lib - Code shared between routes
│	├── routes - Code specific to a page/route
│	└── styles - Sass/CSS project styles
├── ... - Project admin and config files
├── ...
├── ...
└── package.json
```

## Tools in place

### [React](https://facebook.github.io/react/)

React is used for view rendering.

### [React Router](https://github.com/reactjs/react-router)

React Router is used to route URLs to rendering specific views defined by the routing configuration.

### [Redux](http://redux.js.org/)

Redux is used for managing application state in one place.

### [React Redux](https://github.com/reactjs/react-redux)

"Offical React bindings for Redux"

React Redux is used to connect React components a Redux store in a loosely coupled way.

### [Gulp](http://gulpjs.com/)

Gulp is used as a task runner used for building, linting, and general project administration.

Review the file `gulpfile.js` in the root of the repo for more details.

### [Webpack](http://webpack.github.io/docs/)

The project uses webpack for compilation to bundle together modules in a CommonJS format. The projects configuration of webpack leverages the `babel-loader` module for compiling ES2015 syntax to ES5 syntax that can be run in older browsers like IE10-11. When building the project with `gulp build` the project uses the configuration specified in `webpack.config.js` in the root of the repo. When running `npm start` or `gulp build:watch` the [`webpack-dev-server`](https://webpack.github.io/docs/webpack-dev-server.html) uses configuration specified in `webpack.config.js` and a few other fields specific to running a watch mode.

### [ESLint](http://eslint.org/)

ESlint is available for general code style and checks and finding simple mistakes.

### [Stylelint](http://stylelint.io/)

Stylelint performs the same function for Sass/CSS as ESlint performs for JavaScript, it checks for simple mistakes and code style conformity.

### [Autoprefixer](https://github.com/postcss/autoprefixer)

Autoprefixer is used to automatically include the necessary css vendor prefixes for browser runtimes supported by the project.

### [Jest](https://facebook.github.io/jest/)

Jest is used as the test runner for the project. Jest offers the `describe/it` structure and `expect` assertions of Jasmine but also offers a number of other tools including automatic mocks, module mocking, and timer mocks.

### [Enzyme](http://airbnb.io/enzyme/)

Enzyme offers test helpers for shallow rendering and for making assertions on React views.
