import './App.scss';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import Main from './Pages/Routes/main';
import Sidebar from './Component/Sidebar/sidebar';
import "bootstrap/dist/js/bootstrap.bundle"
function App() {
  return (
    <div style={{height:"100vh" }} className='backRGB'>
      
    <Main/>
    </div>
  );
}

export default App;
