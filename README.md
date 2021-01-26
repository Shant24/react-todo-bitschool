# ToDo App

This application was created while learning `React.js` at [Bitschool](https://bitschool.am/).
It uses technologies like `React`, `Redux`, `Redux Thunk`, `SASS` and `React Bootstrap`.

See [Demo](https://nervous-perlman-4b274d.netlify.app) page.

### How to use it

---
## Requirements

You will need install `Node.js`, `npm` and `MongoDB`  in your environnement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer. 
Also, be sure to have `git` available in your PATH, `npm` or `yarn` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v13.12.0

    $ npm --version
    6.14.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### MongoDB
 Install MongoDb [Guide](https://docs.mongodb.com/manual/administration/install-community/)

## Project installation and usage

If you use `npm`

    $ git clone https://github.com/Shant24/react-todo-bitschool.git
    $ cd react-todo-bitschool
    $ npm install

If you use `yarn`

    $ git clone https://github.com/Shant24/react-todo-bitschool.git
    $ cd react-todo-bitschool
    $ yarn install

Remove `.sample` extension from configuration files located in direct folder
    ```
    .env.sample -> .env
    ```

## Running the project

    $ npm start
    or
    $ yarn start

## Application capabilities

- Create tasks
- Set a deadline for your task
- Mark the ՝status՝ of your task as ՝Done՝ or ՝active՝
- Edit task
- Delete task
- Delete multiple tasks at once
- Search tasks
- Searching a task using filtering
  - Filtering by `Status`
    -  Done
    -  Active
  - Filtering by `Sort`
    - A-Z
    - Z-A
    - Creation date oldest
    - Creation date newest
    - Completion date oldest
    - Completion date newest
  - Filtering by `Date`
    - Creation before
    - Creation after
    - Completion before
    - Completion after
- Change User information such as `Name`, `Surname` and `Password`