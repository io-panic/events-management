# FeatherJS

This is a small project initialized to demonstrate featherjs functionnalities

**Manually** start the project :

> npm init --yes  
> npm install @feathersjs/feathers --save  
> npm install @feathersjs/socketio @feathersjs/express --save

Use **automation** :

> npm install @feathersjs/cli -g  
> feathers generate app

**Add a service** :

> feathers generate service

### Jest

> npm install --save-dev jest  
> npm install --save-dev babel-jest @babel/core @babel/preset-env  
> npm install --save-dev babel-preset-vite

and then run tests using

> npm test

### Run project

If not already executed :

> npm install

Then (for development, auto reload) :

> npm run dev

Or start server conventional wayn:

> npm start

Files will be available in the 'dist' folder

### Linter | Prettier configuration ready to run

> npm run lint
> npm run prettier
