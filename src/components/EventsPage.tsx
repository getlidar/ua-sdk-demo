import { Link } from "react-router-dom";
import Helika, { DisableDataSettings, EventsBaseURL } from "helika-sdk";
import { useState } from "react";
import { InputSection } from "./InputSection";
import { createAbandonMatch, createAiInspector, createJoinMatch, createLeaderboard, createOnDownload, createOnPageLand, createOnPurchase, createOnRegister, createSessionStart, createSimulation, createTraining, createTutorial, randomize } from "../data-generation/GenerateData";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { toast } from "react-toastify";

export function EventsPage() {

  const [sdk, setSdk] = useState<any>();
  const [apiKey, setApiKey] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [eventsSent, setEventsSet] = useState<any[]>([]);

  async function initiateSdk() {
    try {
      if (!apiKey || apiKey.trim()?.length < 10) {
        toast.error('Must have valid API Key');
        return;
      }
      const helikaSDK = new Helika.EVENTS(apiKey, EventsBaseURL.EVENTS_DEV);
      helikaSDK.setDataSettings(DisableDataSettings.None);
      await helikaSDK.startSession();
      setSdk(helikaSDK);
      toast.success('SDK initiated');
    } catch (e: any) {
      toast.error(e?.message);
    }
  }

  //async function sendEvent() {

  //  try {
  //    if (!sdk) {
  //      toast.error('You must initiate the sdk first');
  //      return;
  //    }

  //    let events = [{
  //      game_id: 'SDK Example Project',
  //      event_type: 'Test',
  //      event: {
  //        id: 2,
  //        info: 'From Example Project, send event button'
  //      }
  //    }];

  //    await sdk.createEvent(events);
  //    toast.success('Event sent')
  //  } catch(e:any){
  //    toast.error(e);
  //  }
  //}

  //async function sendUAEvent() {

  //  if (!sdk) {
  //    toast.error('You must initiate the sdk first');
  //    return;
  //  }
  //  sdk.createEvent(events);
  //}

  //async function sendUAEvent() {
  //  if (!sdk) {
  //    console.error('You must initiate the sdk first');
  //    return;
  //  }

  //  try {
  //    let events = [{
  //      game_id: 'SDK Example Project',
  //      event_type: 'Test',
  //      event: {
  //        id: 3,
  //        info: 'From Example Project, send ua event button'
  //      }
  //    }];

  //    await sdk.createUAEvent(events);
  //    toast.success('Event sent')
  //  } catch(e:any){
  //    toast.error(e);
  //  }

  //}

  async function generateFakeData() {

    try {
      if (!walletAddress || walletAddress.trim()?.length !== 42) {
        toast.error('Must have a wallet address');
        return;
      }
      if (!sdk) {
        toast.error('You must initiate the sdk first');
        return;
      }

      let events: any = [];
      const providers = ["helika-link", "discord", "twitter"];
      let providerId = randomize(0, 2);
      let provider = providers[providerId];

      // website user info
      let code = "EARLY_ACCESS";
      let wallet = walletAddress;
      let email = `${walletAddress}@gmail.com`;

      // generate Website events 
      let websiteDiceRoll = randomize(0, 10000);
      let onPageLandEvent = createOnPageLand(code, provider);
      events.push(onPageLandEvent)

      if (websiteDiceRoll < 8000) {
        let event = createOnRegister(wallet, email, provider);
        events.push(event)
      }

      if (websiteDiceRoll < 4000) {
        let nftId = randomize(0, 1000000);
        let event = createOnPurchase(wallet, nftId, provider);
        events.push(event)
      }

      if (websiteDiceRoll < 6500) {
        let event = createOnDownload(provider);
        events.push(event)
      }

      if (websiteDiceRoll < 6000) {
        // in-game user info
        let identifier = randomize(194000000000000000, 195000000000000000).toString();
        let session_append = randomize(1697000000000, 1700000000000);
        let sessionId = `194905965047316480-${session_append}`;
        let timestamp = randomize(new Date('2022-10-20').getTime(), new Date('2022-10-27').getTime());
        let ingameDiceRoll = randomize(0, 10000);

        // generate In-game events 
        let sessionStartEvent = createSessionStart(identifier, wallet, sessionId, provider, timestamp);
        events.push(sessionStartEvent);

        // Only 75% of users check the leaderboard
        if (randomize(0, 10000) < 7500) {
          timestamp += 15000;
          let event = createLeaderboard(identifier, provider);
          events.push(event);
        }

        // Only 70% of users play the Tutorial
        if (ingameDiceRoll < 7000) {
          timestamp += 15000;
          let tutorialEvent = createTutorial(identifier, sessionId, provider, timestamp);
          events.push(tutorialEvent);

          if (randomize(0, 10000) < 7000) {
            timestamp += 15000;
            let aiInstructorEvent = createAiInspector(identifier, provider);
            events.push(aiInstructorEvent);

            timestamp += 15000;
            let simulationEvent = createSimulation(identifier, provider);
            events.push(simulationEvent);
          }

          if (randomize(0, 10000) < 5000) {
            timestamp += 15000;
            let trainingEvent = createTraining(identifier, provider, timestamp);
            events.push(trainingEvent);
          }
        }

        // Only 35% of users play a Ranked Match
        if (ingameDiceRoll < 3500) {
          timestamp += 15000;
          let fighterId1 = randomize(0, 5000);
          let joinMatchEvent = createJoinMatch(identifier, fighterId1, provider);
          events.push(joinMatchEvent);

          if (randomize(0, 10000) < 2000) {
            timestamp += 15000;
            let event = createAbandonMatch(identifier, fighterId1, provider);
            events.push(event);
          }
        }
      }

      events = events.map((event: any) => {
        event.game_id = "AIArena demo"
        return event;
      })

      console.log(events);

      setEventsSet(events);
      sdk.createEvent(events);
    } catch (e: any) {
      toast.error(e);
    }
  }

  return (
    <div>
      <div className="h-screen flexcol justify-center  overflow-auto">
        <div className="w-full justify-center flexrow mb-10">
          <Link
            to={'/'}
          >
            <div className="helikaButtonClass px-10">
              Back
            </div>
          </Link>
        </div>
        <div className="flexcol spaceAround max-w-[70vw] mx-auto gap-5">
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
          {/*<button
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
          </button>*/}

          <InputSection
            title='Wallet Address'
            passwordField={false}
            value={walletAddress}
            setValue={setWalletAddress}
            hint={'Wallet Address of User'}
            isTextField={false}
          />
          <button
            className="helikaButtonClass px-10"
            onClick={generateFakeData}
          >
            Generate In Game Events
          </button>
          <div>
            {resultsTable(eventsSent)}
          </div>
        </div>
      </div>
    </div>
  );
}

function resultsTable(events: any[]) {
  return (
    <TableContainer component={Paper} className="max-h-[50vh]">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>No#</TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            events.map((event: any, index: number) =>
              <TableRow key={index}>
                <TableCell align="center">{index}</TableCell>
                {/*<TableCell align="left"><pre className='preStyle'>{JSON.stringify(event, null, 2)}</pre></TableCell>*/}
                <TableCell align="center"><pre className='preStyle'>{event.event_type}</pre></TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}