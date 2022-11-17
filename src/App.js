import './App.css';
import { useState } from 'react';

function App() {

  const [wallet,setWallet] = useState('');

  async function mint(){
    // todo: Log referral here    
    console.log(wallet);
  }

  return (
    <div className="App">
      <div>
        Input Wallet Address
      </div>
      <input
        type={'text'}
        placeholder={'0x...'}
        onChange={(e) => {
          setWallet(e.target.value.trim());
        }}
      />
      <button
        onClick={()=> mint()}
      >
        MINT
      </button>
    
    </div>
  );
}

export default App;
