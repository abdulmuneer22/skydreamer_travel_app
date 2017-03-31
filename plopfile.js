'use strict';

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a new stateless component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of the new component?',
        validate: (value) => {
          if (/.+/.test(value.trim())) { return true }
          return 'Component name is required.'
        }
      },
      {
        type: 'input',
        name: 'folder',
        message: 'Where should I save the new component? ./src/*',
        validate: (value) => {
          if (/.+/.test(value.trim())) {
          	return true
          }
          return 'Directory position is required.'
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{folder}}/{{pascalCase componentName}}.js',
        templateFile: 'templates/component.js.hbs',
        abortOnFail: true,
      },
    ],
  }),
  plop.setGenerator('class', {
    description: 'Generate a new class component',
    prompts: [
      {
        type: 'input',
        name: 'className',
        message: 'What is the name of the new class?',
        validate: (value) => {
          if (/.+/.test(value.trim())) { return true }
          return 'Class name is required.'
        }
      },
      {
        type: 'input',
        name: 'folder',
        message: 'Where should I save the new class? ./src/*',
        validate: (value) => {
          if (/.+/.test(value.trim())) {
          	return true
          }
          return 'Directory position is required.'
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{folder}}/{{pascalCase className}}.js',
        templateFile: 'templates/class.js.hbs',
        abortOnFail: true,
      },
    ],
  }),
  plop.setGenerator('reduxClass', {
    description: 'Generate a new redux connected class component',
    prompts: [
      {
        type: 'input',
        name: 'className',
        message: 'What is the name of the new redux connected class?',
        validate: (value) => {
          if (/.+/.test(value.trim())) { return true }
          return 'Class name is required.'
        }
      },
      {
        type: 'input',
        name: 'folder',
        message: 'Where should I save the new class? ./src/*',
        validate: (value) => {
          if (/.+/.test(value.trim())) {
          	return true
          }
          return 'Directory position is required.'
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{folder}}/{{pascalCase className}}.js',
        templateFile: 'templates/reduxClass.js.hbs',
        abortOnFail: true,
      },
    ],
  })
}
