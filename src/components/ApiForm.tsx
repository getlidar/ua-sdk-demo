import React from 'react';
import { useState } from "react";
import Refmint from "refmint-sdk";
import { InputSection } from "./InputSection";

export function ApiForm() {

  async function logReferral() {

    var refmintCaller = new Refmint({
      apiKey: api_key,
      baseUrl: (base_url.trim() !== '' ? base_url : "https://test.refmint.xyz")
    });
    
    refmintCaller.logReferral(
      custom_url,
      wallet_address,
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

  const [custom_url,set_custom_url] = useState<string>('');
  const [wallet_address,set_wallet_address] = useState<string>('');
  const [link_id,set_link_id] = useState<string>('');
  const [email_address,set_email_address] = useState<string>('');
  const [phone_number,set_phone_number] = useState<string>('');
  const [sdk_response,set_sdk_response] = useState<string>('');
  const [base_url,set_base_url] = useState<string>('');
  const [api_key,set_api_key] = useState<string>('');

  return(
    <div className='mx-auto flex flex-col max-w-[calc(min(50%,1200px))]'>
      <div className="w-full flex flex-row justify-center">
        <InputSection
          title='Base URL'
          passwordField={false}
          value={base_url}
          setValue={set_base_url}
          hint={'Defaults to testnet if empty'}
          isTextField={false}
        />
      </div>
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
          hint={'Custom URL of your Refmint project'}
          isTextField={false}
        />
      </div>
      <div className="w-full flex flex-row justify-center">
      <InputSection
        title='Link ID'
        passwordField={false}
        value={link_id}
        setValue={set_link_id}
        hint={'Affiliate Referral ID'}
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
      <button
        className='w-min mx-auto px-3 mt-5 bg-referralMintColor rounded-lg'
        onClick={()=>logReferral()}
      >
        Submit
      </button>
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
  );

}