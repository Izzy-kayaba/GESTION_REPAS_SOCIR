import './App.css';
import { UserProvider } from './helpers/UserContext';
import Routing from './routes/Routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <UserProvider>
        <Routing />
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
