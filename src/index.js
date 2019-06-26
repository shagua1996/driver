import React from "react";
import ReactDOM from "react-dom";
import App from "./views/app/app";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { Provider } from "react-redux";
import store from "./store/index";
import { LocaleProvider } from "antd";
let Pro = (
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>
);
ReactDOM.render(Pro, document.getElementById("root"));
