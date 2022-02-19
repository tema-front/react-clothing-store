import { Provider } from 'react-redux'
import './styles/css/style.css';
import { ReactRouter } from './components/ReactRouter';
import { Store } from './store';

function App() {
  return (
    <Provider store={Store}> 
      <ReactRouter />
    </Provider>
  );
}

export default App;