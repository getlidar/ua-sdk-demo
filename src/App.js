import './App.css';
import { useState } from 'react';
import Refmint from "refmint-sdk";
import { BaseURLOptions } from 'refmint-sdk';
import {useLocation} from "react-router-dom";

function App() {

  let urlOption;
  const base_url = 'https://test.refmint.xyz';

  if (base_url === 'http://localhost:3000') {
    urlOption = BaseURLOptions.LOCAL;
  } else if (base_url === 'https://test.refmint.xyz') {
    urlOption = BaseURLOptions.TESTNET;
  } else if (base_url === 'https://app.refmint.xyz') {
    urlOption = BaseURLOptions.MAINNET;
  }

  var refmintCaller = new Refmint({
    apiKey: process.env.REACT_APP_API_KEY,
    baseUrlOption: urlOption
  });

  const [wallet,setWallet] = useState('');

  const search = useLocation().search;
  const referral_link = new URLSearchParams(search).get('r');

  async function logReferral() {
    
    refmintCaller.logReferral(
      'refmintsdk', //example custom url of project on testnet
      wallet, // example wallet address
      referral_link, // example link id for user on testnet // optional
      // email_address, // email address of refeee // optional
      // phone_number // phone number of refeee // optional
    ).then((resp) => {

      console.log(resp);
      //! initiate NFT mint here

    }).catch(e => {
      console.error(e);
    });
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
        onClick={()=> logReferral()}
      >
        MINT
      </button>
    
    </div>
  );
}

export default App;
