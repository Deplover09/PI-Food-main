import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import landingPage from './Components/LandingPage/LandingPage.jsx';
import Home from './Components/Home/home.jsx';
import IDCard from './Components/id Card/idCard.jsx'
import createRecipe from './Components/CreateRecipe/CreateRecipe.jsx';
import About from './Components/NavBar/About/index.js';

function App() {
  return(
  <BrowserRouter>
  <div className='app'>
  <Switch>
     <Route exact path="/" component={landingPage} />
     <Route exact path="/Home" component={Home}/>
     <Route exact path="/CreateRecipe" component={createRecipe }/>
     <Route exact path="/Home/:id" component={IDCard} />
     <Route exact path="/About" component={About} />  
   </Switch>
  </div>
 </BrowserRouter>
  )
 
}

export default App;

