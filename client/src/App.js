import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';

const theme = createTheme({
  palette: {
    primary: {
      light: '#A8DADC',
      main: '#457B9D',
      dark: '#1D3557'
    },
    secondary: {
      main: '#E63946'
    },
    tertiary: {
      main: '#F1FAEE'
    },
    contrastThreshold: 3
  }
});

function App(){
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/"><Home/></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
