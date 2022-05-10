import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from './context/context';
import { SpeechProvider } from '@speechly/react-client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SpeechProvider appId='a0886fee-cba4-458c-8ca4-a45ed1adf0b3' language='en-US'>
      <Provider>
        <App />
      </Provider>
    </SpeechProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
