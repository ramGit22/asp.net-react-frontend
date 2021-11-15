import "./App.css";
import { Employee } from "./Employee";
import { Navigation } from "./Navigation";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          Miragel Full-Stack Task
        </h3>

        <Navigation />

        <Switch>
          <Route path="/employee" component={Employee} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
