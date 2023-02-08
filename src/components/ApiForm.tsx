import React from 'react';
import { useState } from "react";
import Refmint from "refmint-sdk";
import { InputSection } from "./InputSection";
import { useLocation } from "react-router-dom";
import { BaseURLOptions } from 'refmint-sdk';

export function ApiForm() {

  const search = useLocation().search;
  const new_referral_link = new URLSearchParams(search).get('r');

  async function logReferral() {

    let urlOption;

    if (base_url === 'http://localhost:3000') {
      urlOption = BaseURLOptions.LOCAL;
    } else if (base_url === 'https://test.refmint.xyz') {
      urlOption = BaseURLOptions.TESTNET;
    } else if (base_url === 'https://app.refmint.xyz') {
      urlOption = BaseURLOptions.MAINNET;
    } else {
      set_sdk_response('INVALID BASE_URL');
    }

    var refmintCaller = new Refmint({
      apiKey: api_key,
      baseUrlOption: urlOption
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

  async function logView() {

    let urlOption;

    if (base_url === 'http://localhost:3000') {
      urlOption = BaseURLOptions.LOCAL;
    } else if (base_url === 'https://test.refmint.xyz') {
      urlOption = BaseURLOptions.TESTNET;
    } else if (base_url === 'https://app.refmint.xyz') {
      urlOption = BaseURLOptions.MAINNET;
    } else {
      set_sdk_response('INVALID BASE_URL');
    }

    var refmintCaller = new Refmint({
      apiKey: api_key,
      baseUrlOption: urlOption
    });
    
    refmintCaller.logView(
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

    let urlOption;

    if (base_url === 'http://localhost:3000') {
      urlOption = BaseURLOptions.LOCAL;
    } else if (base_url === 'https://test.refmint.xyz') {
      urlOption = BaseURLOptions.TESTNET;
    } else if (base_url === 'https://app.refmint.xyz') {
      urlOption = BaseURLOptions.MAINNET;
    } else {
      set_sdk_response('INVALID BASE_URL');
    }

    var refmintCaller = new Refmint({
      apiKey: api_key,
      baseUrlOption: urlOption
    });
    
    refmintCaller.isAffiliate(
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

  const [custom_url,set_custom_url] = useState<string>('refmintsdk');
  const [wallet_address,set_wallet_address] = useState<string>('');
  const [link_id,set_link_id] = useState<string>(new_referral_link ? new_referral_link : 'fqOm45Jv');
  const [email_address,set_email_address] = useState<string>('');
  const [phone_number,set_phone_number] = useState<string>('');
  const [sdk_response,set_sdk_response] = useState<string>('');
  const [base_url,set_base_url] = useState<string>('https://test.refmint.xyz');
  const [api_key,set_api_key] = useState<string>('kLJfpVvWZ0ERxnMofhP9iRJTxwDapndo8941KuxK76XOOvsyMVsXjihnRTA0R06y');

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
      <div className='flex flex-row space-x-3 mx-auto'>
        <button
          className='w-min px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap'
          onClick={()=>logView()}
        >
          LogView
        </button>
        <button
          className='w-min px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap'
          onClick={()=>logReferral()}
        >
          Log Referral
        </button>
        <button
          className='w-min px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap'
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
  );

}