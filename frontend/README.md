# Vue 3 + Vite + Bootstrap 5

This is a small project initialized with all the bells and whistles to start something that could eventually grow into something bigger

## IDE Setup

- [VSCode] Install Volar, Docker plugins (see below)
- [VSCode with VueJS tutorial](https://code.visualstudio.com/docs/nodejs/vuejs-tutorial)

Git (for portable bin) : the "git.path" must be setup in the settings.json from the user space and not project

### Plugins

- Docker
- prettier
- IntelliSense for CSS
- Vue Language Features (Volar)
- Thunder Client (API Rest testing)

---

### Jest

Get more info on [Jest Documentation](https://jestjs.io/docs/getting-started)

> npm install --save-dev jest  
> npm install --save-dev babel-jest @babel/core @babel/preset-env  
> npm install --save-dev babel-preset-vite

and then run tests using

> npm test

### Run project

If not already executed :

> npm install

Then :

> npm run dev

Once ready to package :

> npm run build

Files will be available in the 'dist' folder

### Linter | Prettier configuration ready to run

> npm run lint
> npm run prettier

### Some useful **Firefox** configuration that may needs to be modified

> about:config

network.websocket.allowInsecureFromHTTPS=true  
privacy_file_unique_origin=false  
security.fileuri.strict_origin_policy=false

allow specific ports if they are blocked;  
network.security.ports.banned.override=10080
