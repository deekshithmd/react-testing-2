import './App.css';
import { Login } from './components/Login/Login';

function App() {
  let a = 5, b = 6;
  return (
    <div className="App">
      <h1 data-testid="mytestid">React</h1>
      <span title='sum'>{a + b}</span>
      <ul>
        <li>first</li>
        <li>second</li>
        <li>third</li>
      </ul>
      <Login />
    </div>
  );
}

export default App;
