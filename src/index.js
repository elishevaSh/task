import React from "react";
import ReactDOM from "react-dom";
import DemoApp from "./DemoApp";
import "react-virtualized/styles.css"; // only needs to be imported once
import "./app1.css";
import "./styles.css";
import { Provider } from 'react-redux';
import store from './Store/Store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DemoApp/>
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
