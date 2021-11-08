/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import "./App.css";
import {
  HashRouter as RouterElectron,
  BrowserRouter as RouterReact,
  Switch,
  Route,
} from "react-router-dom";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Update from "./pages/Update";

const App = () => {
  //typescript-eslint\no-unused-vars
  const appElectron = () => {
    return (
      <div className="App">
        <RouterElectron>
          <Switch>
            <Route exact path="/">
              {<Home />}
            </Route>

            <Route path="/add">
              <Add />
            </Route>

            <Route exact path="/update">
              <Update />
            </Route>
          </Switch>
        </RouterElectron>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const appReactJS = () => {
    return (
      <div className="App">
        <RouterReact>
          <Switch>
            <Route exact path="/">
              {<Home />}
            </Route>

            <Route path="/add">
              <Add />
            </Route>

            <Route exact path="/update">
              <Update />
            </Route>
          </Switch>
        </RouterReact>
      </div>
    );
  };

  return (
    <>
      {
        appElectron()
        //appReactJS()
      }
    </>
  );
};
export default App;
