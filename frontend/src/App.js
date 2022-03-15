import { Route } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home}/>
      <Route exact path='/chats' component={Chat}/>
    </div>
  );
}

export default App;
