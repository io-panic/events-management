# FeatherJS

This is a small project initialized to demonstrate featherjs functionnalities

**Manually** start the project :

> npm init --yes  
> npm install @feathersjs/feathers --save  
> npm install @feathersjs/socketio @feathersjs/express --save

[Use ES6 Syntax](https://santanusahoo.medium.com/feathersjs-with-es6-import-export-9bdad4a1f110)

> npm install --save-dev @babel/core @babel/node @babel/preset-env cjs-to-es6

### Use alias for path (instead of relative)

[babel-plugin-root-import](https://github.com/entwicklerstube/babel-plugin-root-import)

> npm install --save-dev babel-plugin-root-import

See options in package.json ("babel" | "plugins")

Use **automation** :

> npm install @feathersjs/cli -g  
> feathers generate app

**Add a service** :

> feathers generate service

### Jest

> npm install --save-dev jest  
> npm install --save-dev babel-jest @babel/core @babel/preset-env

and then run tests using

> npm test

### Run project

If not already executed :

> npm install

Then (for development, auto reload) :

> npm run dev

Or start server conventional wayn:

> npm start

### Linter | Prettier configuration ready to run

> npm run lint  
> npm run prettier
