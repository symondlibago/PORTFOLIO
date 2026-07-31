import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <div className="App">
      <SmoothScroll>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </div>
  );
}

export default App;