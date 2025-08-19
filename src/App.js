import logo from './logo.svg';
import './App.css';
import Demo from './components/Demo';
import Catalog from './components/Catalog';
function App() {
  const sv1 = {
    name: "Nguyen Van A",
    tel: "12345651515789",
    email: "abc@gmail.com",
    address: "123 Street, City"
  }
  const sv2 = {
    name: "Nguyen Van B",
    tel: "987654321",
    email: "asdw@gmail.com",
    address: "456 Avenue, City"
  }
  const cats = [
    { name: "Fashion", count: 10 },
    { name: "Watch", count: 20 },
    { name: "Food", count: 30 }
  ];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        

        {
          cats.map((cat, index) => (
            <Catalog key={index} data={cat} />
          ))
        }
      </header>
    </div>
  );
}

export default App;
