import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import Container from './components/Container';
import store from './store/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';





ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
document.getElementById('root')
);
registerServiceWorker();



// import React from 'react'
// import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
// import store from './store'
// import Routes from './routes'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// // establishes socket connection
// import './socket'

// ReactDOM.render(
//   <Provider store={store}>
//     <MuiThemeProvider>
//       <Routes />
//     </MuiThemeProvider>
//   </Provider>,
//   document.getElementById('app')
// )
