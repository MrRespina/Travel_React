import './css/App.css';
import { Component } from 'react';
import GetAir from './components/GetAir';
import Flight from './components/BookAFlight';
import SearchPage from './components/SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,Routes} from 'react-router-dom';

class App extends Component {
  render(){
    return(
      <div>

        <Routes>
          <Route path="/node/search" element={<SearchPage/>}></Route>
          <Route path='/node/getAir' element={<GetAir/>}></Route>
          <Route path='/' element={<Flight/>}></Route>
          
        </Routes>
        
      </div>

    );
  }

}

export default App;
