import React from "react";
import "./app.css";
import { Tabs } from "antd";
import {
  Redirect,
  Link,
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import K1 from "../kemu1/k1";
import K4 from "../kemu4/K4";

const { TabPane } = Tabs;
//标题
function Header(props) {
  return (
    <div>
      <h2 className="title">驾考宝典</h2>
    </div>
  );
}
//选项卡
function callback(key) {}

function DriverTab() {
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane
        tab={
          <Link className="kemu_tab" to="kemu1">
            科目一
          </Link>
        }
        key="kemu1"
      />
      <TabPane
        tab={
          <Link className="kemu_tab" to="kemu4">
            科目四
          </Link>
        }
        key="kemu4"
      />
    </Tabs>
  );
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          {/* <Link to="kemu1">科目一</Link>
          <Link to="kemu4">科目四</Link> */}
          <DriverTab />
          <Switch>
            <Route path="/kemu1" component={K1} />
            <Route path="/kemu4" component={K4} />
            <Redirect exact from="/" to="kemu1" />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
