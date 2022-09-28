import './App.css';
import logo from './assets/logo.svg'
import { ApiForm } from './components/ApiForm';

function App() {

  return (
    <div className="App bg-darkBg2 h-full w-full">
      <header className="h-min justify-center flex-col py-5">
        <img src={logo} className="w-min justify-center mx-auto" alt="logo" />
        <p className='text-white'>
          Example Refmint Calls
        </p>
      </header>
      <ApiForm />
    </div>
  );
}

export default App;
