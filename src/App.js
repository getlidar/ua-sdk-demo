import './App.css';
import Refmint from "refmint-sdk"
import {useLocation} from "react-router-dom";
function App() {

  var refmintClient = new Refmint({
    apiKey: 'v8uESVxMDfTgdZ7YGNiz76u9GuZn1c8hFGG6GxkqsW5F3J1vRdpe9Md41HV6EDPj',
    baseUrl: "https://test.refmint.xyz"
  });

  const search = useLocation().search;
  const new_referral_link = new URLSearchParams(search).get('r');

  const custom_url = "refmintsdk";
  const wallet_address = "0xE7bb679Fa033517393001e1E43b3d326016E0A0c";
  // const email_address = "example@gmail.com";
  // const phone_number = "1234567890";

  async function mint(){
    refmintClient.logReferral(custom_url, new_referral_link, wallet_address, null, null).then(resp => {
      console.log(resp);

      //! initiate NFT mint here
    })
  }

  return (
      <div className="App">
        <div>
          Input Wallet Address
        </div>
        <input
          type={'text'}
          placeholder={'0x...'}
        />
        <button
          onClick={()=> mint}
        >
          MINT
        </button>
      
      </div>
  );
}

export default App;
