# Stellar Burgers 
### customise and order a delicious burger on our space station

This application was created as a Yandex.Praktikum React-dev course study project

Demo: https://ev-shamko.github.io/react-stellar-burgers

## Functionality

* use drag and drop to create your own delicios burger 
* you can get the list of ingridients from API and post an order
* get the updating list of last 50 orders and their current status through WebSocket connection
* you can create an account, authorise or restore password
* quick and comfortable single page routing

## Technologies
React CRA, Redux, TypeScript, WebSocket, Cypress, Jest, Webpack, React DND, React Router DOM <br>
This application is connected to public API. If API seems not working (no ingridients data, authorisation fails) please inform me.

## Installation
`git clone`<br>
`npm i`<br>
For guaranteed result use NPM v6.14.* and Node v14.17.* <br>
However more resent versions of npm and node probably should do fine.

## How to run the app

### `npm start`
Runs the app in the development mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Testing

### Redux testing: 
Redux store can be tested with Jest
`npm run test`

### To run Cypress UI-tests: 
Functionality of creating order and authorisation proсess can be tested with Cypress. It is really usefull, important for drag and drop automatic testing, also it looks very cool.

1) Open two terminals
2) In first terminal: `npm start`  (then wait a bit)
3) In second terminal: `npm run cypress:open`