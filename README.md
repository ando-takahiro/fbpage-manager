
Features
====

- FB login, logout
- browse multiple pages
- create new post(published/unpublished)
- browse posts in each pages

Components
====

Application

 - [react.js](https://github.com/facebook/react)
 - [Essence](https://github.com/Evo-Forge/Essence), UI framework on react

Development Environment

 - Content pipeline
   - [babel](https://github.com/babel/babel)
   - [webpack](https://github.com/webpack/webpack)
   - [node.js](https://github.com/nodejs/node)
     - [I am in author list :smile:](https://github.com/nodejs/node/blob/c161849bfa6eba42fcc7c09d06d47eaebf37f2e3/AUTHORS#L325)
 - Test
   - [mocha](https://github.com/mochajs/mocha), testing framework
   - [enzyme](https://github.com/airbnb/enzyme), mock library for react.js
   - [sinon.js](https://github.com/sinonjs/sinon), general mock library


Design
====

UI Components
----

This is my first react.js application.  I tried to understand basic ideas of react.js state management.

[App](./app/scripts/components/App.jsx)

It manages login, logout states by traditional FSM style.  There are following states.

![App state diagram](./docs/app-states.png)

[LoginWindow](app/scripts/components/LoginWindow.jsx)

It shows FB login button with message.

[PageWindow](app/scripts/components/PageWindow.jsx)

It is the root component of manager.

- switch page
- show new posts after sending

[Post](app/scripts/components/Post.jsx)

It expands and collapses post content.

[PostComposer](app/scripts/components/PostComposer.jsx)

- send a new post
- show effects to help users

[SpinnerWindow.jsx](app/scripts/components/SpinnerWindow.jsx)

It shows spin with message.

[TitleBar](app/scripts/components/TitleBar.jsx)

It provides 2 menus.

- page list
- setting menu(logout)

Automated Tests
----

There are 2 types of tests in `tests/` directory.

- unit test: test for utility functions using mocha and sinon
- integration test: test for components using mocha, enzyme and sinon
    - make sure login, logout flow

Usage
====

- install node v5.11.1
- git clone [this repo]
- npm install -d
- npm run build
- npm run prod
- open http://localtest.me:8000

and test

- npm run test:serv
- open http://localtest.me:8001