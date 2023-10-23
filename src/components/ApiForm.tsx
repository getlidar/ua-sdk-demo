import React from 'react';
import { useState } from "react";
import Helika, { UABaseURL } from "helika-sdk";
import { InputSection } from "./InputSection";
import { Link, useLocation } from "react-router-dom";

export function ApiForm() {

  const search = useLocation().search;
  const new_referral_link = new URLSearchParams(search).get('r');

  const [custom_url,set_custom_url] = useState<string>('refmintsdk');
  const [wallet_address,set_wallet_address] = useState<string>('');
  const [link_id,set_link_id] = useState<string>(new_referral_link ? new_referral_link : 'fqOm45Jv');
  const [email_address,set_email_address] = useState<string>('');
  const [phone_number,set_phone_number] = useState<string>('');
  const [sdk_response,set_sdk_response] = useState<string>('');
  const [api_key,set_api_key] = useState<string>('kLJfpVvWZ0ERxnMofhP9iRJTxwDapndo8941KuxK76XOOvsyMVsXjihnRTA0R06y');

  async function logReferral() {

    const helikaSDK = new Helika.UA(api_key,UABaseURL.UA_DEV);
    
    helikaSDK.logReferral(
      wallet_address,
      custom_url,
      link_id,
      email_address,
      phone_number
    ).then((resp) => {
      if (!resp) set_sdk_response('API failed.')
      set_sdk_response(JSON.stringify(resp));
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.message)
    });
  }

  async function logView() {

    const helikaSDK = new Helika.UA(api_key,UABaseURL.UA_DEV);

    
    helikaSDK.logView(
      custom_url,
      link_id
    ).then((resp) => {
      if (!resp) set_sdk_response('API failed.')
      set_sdk_response(JSON.stringify(resp));
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.message)
    });
  }

  async function isAffiliate() {

    const helikaSDK = new Helika.UA(api_key,UABaseURL.UA_DEV);
    
    helikaSDK.isAmbassador(
      custom_url,
      wallet_address
    ).then((resp) => {
      if (!resp) set_sdk_response('API failed.')
      set_sdk_response(JSON.stringify(resp));
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.message)
    });
  }

  return(
    <div className="w-full max-w-[calc(min(50%,1200px))] py-10 m-auto">
      <header className="h-min justify-center flex-col py-5">
        <p className='text-white text-[2em] helikaGradient px-10'>
          EXAMPLE USER ACQUISITION USE CASE
        </p>
      </header>

      <div
        className='w-full flexrow mb-5'
      >
        <Link
          to={'http://localhost:3001'}
        >
          <button className='helikaButtonClass px-10'>
            Back
          </button>
        </Link>
      </div>
      <div className='mx-auto flex flex-col gap-y-2'>
        <div className="w-full flex flex-row justify-center">
          <InputSection
            title='API Key'
            passwordField={false}
            value={api_key}
            setValue={set_api_key}
            hint={'Your API Key'}
            isTextField={false}
          />
        </div>
        <div className="w-full flex flex-row justify-center">
          <InputSection
            title='Custom URL'
            passwordField={false}
            value={custom_url}
            setValue={set_custom_url}
            hint={'Custom URL of your Helika project'}
            isTextField={false}
          />
        </div>
        <div className="w-full flex flex-row justify-center">
        <InputSection
          title='Link ID'
          passwordField={false}
          value={link_id}
          setValue={set_link_id}
          hint={'Ambassador Referral ID'}
          isTextField={false}
        />
        </div>
        <div className="w-full flex flex-row justify-center">
        <InputSection
          title='Wallet Address'
          passwordField={false}
          value={wallet_address}
          setValue={set_wallet_address}
          hint={'Wallet Address of the Referrer User'}
          isTextField={false}
        />
        </div>
        <div className="w-full flex flex-row justify-center">
        <InputSection
          title='Email Address'
          passwordField={false}
          value={email_address}
          setValue={set_email_address}
          hint={'Email Address of the referred User'}
          isTextField={false}
        />
        </div>
        <div className="w-full flex flex-row justify-center">
        <InputSection
          title='Phone Number'
          passwordField={false}
          value={phone_number}
          setValue={set_phone_number}
          hint={'Phone number of the referred User'}
          isTextField={false}
        />
        </div>
        <div className='flex flex-row flex-wrap mx-auto text-black my-5 gap-5'>
          <button
            className='helikaButtonClass px-5'
            onClick={()=>logView()}
          >
            LogView
          </button>
          <button
            className='helikaButtonClass px-5'
            onClick={()=>logReferral()}
          >
            Log Referral
          </button>
          <button
            className='helikaButtonClass px-5'
            onClick={()=>isAffiliate()}
          >
            IsAffiliate
          </button>
          </div>
        <div className="w-full flex flex-row justify-center">
          <InputSection
            title='Response'
            passwordField={false}
            value={sdk_response}
            setValue={set_sdk_response}
            hint={'Response from API'}
            isTextField={false}
          />
        </div>
      </div>
    </div>
  );

}