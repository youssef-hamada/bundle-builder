import logo from "./logo.svg";
import "./App.css";
import Steps from "./components/steps/Steps";
import Review from "./components/review/Review";

function App() {
  return (
    <div className="App">
      <div className="section-steps">
        <Steps />
      </div>

      <div className="section-review">
        <Review />
      </div>
    </div>
  );
}

export default App;
