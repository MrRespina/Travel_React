import './css/App.css';
import { Component } from 'react';
import GetDB from './components/GetDB';
import GetAir from './components/GetAir';
import Flight from './components/BookAFlight';
import { Route,Routes} from 'react-router-dom';

class App extends Component {
  render(){
    return(
      <div>

        <Routes>
          <Route path='/node/2' element={<GetDB/>}></Route>
          <Route path='/node/1' element={<GetAir/>}></Route>
          <Route path='/' element={<Flight/>}></Route>
        </Routes>
        
      </div>

    );
  }

}

export default App;
