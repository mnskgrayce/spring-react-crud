import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StudentPage } from "./pages/StudentPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div id="page-body">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/student/:id" component={StudentPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
