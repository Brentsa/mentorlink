import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Conversation from './pages/Conversation';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const theme = createTheme({
  palette: {
    primary: {main:'#457B9D'},
    secondary: {main:'#E63946'},
    tertiary: {main:'#F1FAEE'},
    lightBlue: {main:'#A8DADC'},
    darkBlue: {main:'#1D3557'},
    contrastText: {main: '#FFF'},
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
});

function App(){

  const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql'});

  //The server can use the authorization header and attach it to GraphQL context
  //This allows resolvers to validate and modify behaviour based on a member's roles and permissions
  const authLink = setContext((_, {headers}) => {
    //get the auth tokenfrom local storage
    const token = localStorage.getItem('token');
    
    //return the headers to the context so httpLink can read them
    return{
      headers:{
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <Header/>
            <Container maxWidth="xl" sx={{flex: '1 1 auto', mb: 4}}>
              <Box sx={{width: "100%", display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/register"component={Register}></Route>
                  <Route exact path="/dashboard/:username" component={Dashboard}></Route>
                  <Route exact path="/conversation" component={Conversation}></Route>
                </Switch>
              </Box>
            </Container>
            <Footer/>
          </Box>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
