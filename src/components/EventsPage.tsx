import { Link } from "react-router-dom";
import Helika from "helika-sdk";
import { BaseURLOptions } from 'helika-sdk';
import { useState } from "react";
import { InputSection } from "./InputSection";

export function EventsPage() {

  const [sdk,setSdk] = useState<any>();
  const [apiKey,setApiKey] = useState<string>('');

  async function initiateSdk(){
    if (!apiKey || apiKey.trim()?.length < 10) {
      console.error('Must have valid API Key');
      return;
    }
    const helikaSDK = new Helika.EVENTS({
      apiKey: apiKey,
      baseUrlOption: BaseURLOptions.EVENTS_DEV
    });
    setSdk(helikaSDK);
  }

  async function sendEvent(){

    if (!sdk) {
      console.error('You must initiate the sdk first');
      return;
    }

    let events = [{
      game_id: 'SDK Example Project',
      event_type: 'Test',
      event: {
        id: 1,
        info: 'From Example Project, send event button'
      }
    }];

    sdk.createEvent('321',events);
  }

  async function sendUAEvent(){
    if (!sdk) {
      console.error('You must initiate the sdk first');
      return;
    }
    sdk.createUAEvent('123',[{
      event_type: 'Test UA Event Button',
      event: {
        type: 'Button 3'
      }
    }])
  }

  async function generateFakeData(){
  }


  return(
    <div>
      <div className="h-screen flexcol justify-center">
        <div className="w-full justify-center flexrow mb-10">
          <Link
            to={'http://localhost:3001'}
          >
            <div className="helikaButtonClass px-10">
              Back
            </div>
          </Link>
        </div>
        <div className="flexcol spaceAround max-w-[20em] mx-auto gap-5">
          <InputSection
            title='API Key'
            passwordField={false}
            value={apiKey}
            setValue={setApiKey}
            hint={'Use the API Key given to you by Helika'}
            isTextField={false}
          />
          <button
            className="helikaButtonClass px-10"
            onClick={initiateSdk}
          >
            Initiate SDK Instance
          </button>
          <button
            className="helikaButtonClass px-10"
            onClick={sendEvent}
          >
            Send Event
          </button>
          <button
            className="helikaButtonClass px-10"
            onClick={sendUAEvent}
          >
            Send UA Event
          </button>
          <button
            className="helikaButtonClass px-10"
            onClick={generateFakeData}
          >
            Generate In Game Events
          </button>
        </div>
      </div>
    </div>
  );
}