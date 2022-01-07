import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' exact element={<>
            <Banner />
            <Movies />
          </>} />
        <Route path='/favourites' element={<Favourite/>} />
      </Routes>
    </Router>
  );
}

export default App;