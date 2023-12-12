import './App.css';
import { UserProvider } from './Helpers/UserContext';
import Routing from './routes/Routing';

function App() {
  return (
    <UserProvider>
      <Routing />
    </UserProvider>
  );
}

export default App;
