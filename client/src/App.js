import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import landingPage from './Components/LandingPage/LandingPage.jsx';
import Home from './Components/Home/home.jsx';
import IDCard from './Components/id Card/idCard.jsx'
import createRecipe from './Components/CreateRecipe/CreateRecipe.jsx';

function App() {
  return(
  <BrowserRouter>
  <div className='app'>
  <Switch>
     <Route exact path="/" component={landingPage} />
     <Route exact path="/Home" component={Home}/>
     <Route exact path="/CreatePokemon" component={createRecipe }/>
     <Route exact path="/Home/:id" component={IDCard} /> 
   </Switch>
  </div>
 </BrowserRouter>
  )
 
}

export default App;
