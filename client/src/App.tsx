import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage.tsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/Home" element={<Home />} />
          <Route path="/CreateRecipe" element={<createRecipe />} />
          <Route path="/Home/:id" element={<IDCard />} />
          <Route path="/About" element={<About />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
