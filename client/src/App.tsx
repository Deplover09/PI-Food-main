import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LandingPage from "./Components/LandingPage/LandingPage.tsx";
import Home from "./Components/Home/Home.tsx";
// import CreateRecipe from "./Components/CreateRecipe/CreateRecipe.tsx";
// import IDCard from "./Components/id Card/idCard.tsx";
// import About from "./Components/NavBar/About/index.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Home" element={<Home />} />
            <Route path="/CreateRecipe" element={<CreateRecipe />} />
            <Route path="/Home/:id" element={<IDCard />} />
            <Route path="/About" element={<About />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
