import './App.css';
import { useState } from 'react';
import Refmint from "refmint-sdk";
import { BaseURLOptions } from 'refmint-sdk';
import { useLocation } from "react-router-dom";

function App() {

  var refmint = new Refmint.NFT({
    apiKey: process.env.REACT_APP_API_KEY,
    baseUrlOption: BaseURLOptions.TESTNET
  });
  const [wallet,setWallet] = useState('');

  const search = useLocation().search;
  const referral_link = new URLSearchParams(search).get('r');

  async function mint(){
    // logReferral( custom_url, wallet_address, link_id, email_address, phone_number)
    refmint.logReferral("demo", wallet, referral_link, null, null)
        .then(resp => {
            console.log(resp);
            //! initiate NFT mint here
        }
    );

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
