import './App.css';
function App() {

  async function mint(){
    // todo: Log referral here
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
