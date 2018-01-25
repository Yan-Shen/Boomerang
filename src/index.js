import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {teal500, teal400, teal300, grey600} from 'material-ui/styles/colors';
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import Container from './components/Container';
import store from './store/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import config from './config'




const muiTheme = getMuiTheme({
  palette: {

		primary1Color: teal500,
    primary2Color: teal400,
    primary3Color: teal300,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
		textColor: grey600,
    //alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
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
