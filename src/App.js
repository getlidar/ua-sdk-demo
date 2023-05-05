import React from 'react';
import { useState } from "react";
import Refmint, { BaseURLOptions } from "refmint-sdk";

import {useLocation} from "react-router-dom";
import InputSection from './components/InputSection';

export default function App() {


  const search = useLocation().search;
  const new_referral_link = new URLSearchParams(search).get('r');

  async function logReferral() {

    var refmintCaller = new Refmint.NFT({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
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

    var refmintCaller = new Refmint.NFT({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
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

    var refmintCaller = new Refmint.NFT({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
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

  async function affiliateLink() {

    var refmintCaller = new Refmint.NFT({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
    });
    
    refmintCaller.affiliateLink(
      custom_url,
      wallet_address
    ).then((resp) => {
      if (!resp) set_sdk_response('API failed.')
      set_sdk_response(JSON.stringify(resp));
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.response.data.message);
    });
  }

  async function rewards() {

    var refmintCaller = new Refmint.Game({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
    });
    
    refmintCaller.rewards(
      custom_url,
      campaign_url,
      wallet_address
    ).then((resp) => {
      if (!resp) set_sdk_response('API failed.')
      set_sdk_response(JSON.stringify(resp));
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.response.data.message);
    });
  }

  async function rewardConditions() {

    var refmintCaller = new Refmint.Game({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
    });
    
    refmintCaller.rewardConditions(
      custom_url,
      campaign_url
    ).then((resp) => {
      if (!resp) set_sdk_response('API failed.')
      set_sdk_response(JSON.stringify(resp));
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.response.data.message);
    });
  }

  async function userRewards() {

    var refmintCaller = new Refmint.Game({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
    });
    
    refmintCaller.userRewards(
      custom_url,
      campaign_url,
      wallet_address
    ).then((resp) => {
      if (!resp) set_sdk_response('API failed.')
      set_sdk_response(JSON.stringify(resp));
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.response.data.message);
    });
  }

  async function addTagToUser() {

    var refmintCaller = new Refmint.Game({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
    });
    
    refmintCaller.addTagToUser(
      custom_url,
      wallet_address,
      tag
    ).then(() => {
      set_sdk_response(`added tag ${phone_number}`);
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.response.data.message);
    });
  }

  async function removeTagFromUser() {

    var refmintCaller = new Refmint.Game({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
    });
    console.log(Refmint)
    refmintCaller.removeTagFromUser(
      custom_url,
      wallet_address,
      tag
    ).then(() => {
      set_sdk_response(`added tag ${phone_number}`);
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.response.data.message);
    });
  }

  async function getWalletsFromtag() {

    var refmintCaller = new Refmint.Game({
      apiKey: api_key,
      baseUrlOption: BaseURLOptions.LOCAL
    });
    refmintCaller.getWalletsFromTags(
      custom_url,
      tag.split(',')
    ).then((resp) => {
      set_sdk_response(`wallets: ${JSON.stringify(resp)}`);
    }).catch(e => {
      console.log(e);
      set_sdk_response(e.response.data.message);
    });
  }

  const [custom_url,set_custom_url] = useState('refmintsdk');
  const [wallet_address,set_wallet_address] = useState('');
  const [link_id,set_link_id] = useState(new_referral_link ? new_referral_link : 'fqOm45Jv');
  const [email_address,set_email_address] = useState('');
  const [phone_number,set_phone_number] = useState('');
  const [campaign_url,set_campaign_url] = useState('');
  const [sdk_response,set_sdk_response] = useState('');
  const [base_url,set_base_url] = useState('https://test.refmint.xyz');
  const [tag,setTag] = useState('');
  const [api_key,set_api_key] = useState('kLJfpVvWZ0ERxnMofhP9iRJTxwDapndo8941KuxK76XOOvsyMVsXjihnRTA0R06y');

  return(
    <div className='gap-y-2 px-5 h-min my-20 mx-auto flex flex-col max-w-[95%] min-w-[50rem] md:max-w-[calc(min(70%,1200px))]'>
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
          title='Campaign URL'
          passwordField={false}
          value={campaign_url}
          setValue={set_campaign_url}
          hint={'Campaign URL of your Refmint Campaign'}
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
      <div className="w-full flex flex-row justify-center">
      <InputSection
        title='Tag'
        passwordField={false}
        value={tag}
        setValue={setTag}
        hint={'Tag to add, remove, or search for'}
        isTextField={false}
      />
      </div>
      <div className='grid grid-cols-4 gap-x-3 mx-auto text-center'>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>logView()}
        >
          LogView
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>logReferral()}
        >
          Log Referral
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>isAffiliate()}
        >
          IsAffiliate
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>affiliateLink()}
        >
          affiliateLink
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>removeTagFromUser()}
        >
          removeTagFromUser
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>addTagToUser()}
        >
          addTagToUser
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>getWalletsFromtag()}
        >
          getWalletsFromtag
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>rewards()}
        >
          rewards
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>rewardConditions()}
        >
          rewardConditions
        </button>
        <button
          className='w-full px-3 mt-5 bg-referralMintColor rounded-lg whitespace-nowrap mx-auto border rounded border-black'
          onClick={()=>userRewards()}
        >
          userRewards
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