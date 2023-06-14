import "./App.css";
import Resume from "./components/Resume/Resume";

function App() {
  return (
    <div className="App">
      <h1>Select your sections</h1>
      <Resume />
      <button className="save-next-btn">Save and Next</button>
    </div>
  );
}

export default App;
