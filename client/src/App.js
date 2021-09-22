import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    primary: {main:'#457B9D'},
    secondary: {main:'#E63946'},
    tertiary: {main:'#F1FAEE'},
    lightBlue: {main:'#A8DADC'},
    darkBlue: {main:'#1D3557'},
    contrastThreshold: 1
  }
});

function App(){
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header/>

        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register"component={Register}></Route>
        </Switch>

        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
