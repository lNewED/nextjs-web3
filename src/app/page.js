"use client";
// import * from 'react';
import React, { useState, useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import Navbar from "./components/Navbar";
import Card from "./components/Card";

import { _ethers } from "ethers";
import { formatEther } from "@ethersproject/units";

import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units";
import abi from "./abi.json";

const [metamask, hooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;
const contractChain = 11155111;
const contractAddress = "0x67F6D236A48a0e500cbaA588E20ffADe6E17e77a";
export default function Home() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const IsActive = useIsActive();

  const provider = useProvider();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    void metamask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  const [balance, setBalance] = useState("");
  useEffect(() => {
    const fetchBalance = async () => {
      const signer = provider.getSigner();
      const smartContract = new ethers.Contract(contractAddress, abi, signer);
      const myBalance = await smartContract.balanceOf(accounts[0])
      console.log(formatEther(myBalance));
      setBalance(formatEther(myBalance));
    };
    if(IsActive){
      fetchBalance();
    }
  },[IsActive]);


  const handleConnect = () => {
    metamask.activate(contractChain);
  };

  const handleDisconnect = () => {
    metamask.resetState();
  };

  return (
    <div>
      <Navbar
        IsActive={IsActive}
        onClick={handleConnect}
        onDisconnect={handleDisconnect}
        accounts={accounts}
        />
      {/* {IsActive && <div>balance = {balance}  </div>} */}
      <Card IsActive={IsActive} accounts={accounts} balance={balance} provider={provider} />
      {/* <div className="card  ">
         <div className="card-content margin: 0 auto">
          <p>chainId: {contractChain}</p>
          <p>isActive: {IsActive.toString()}</p> 
          <p>accounts: {accounts ? accounts[0] : ""}</p>
          {IsActive ? (
            <input type="button" onClick={handleDisconnect} value={"Disconnect"}/>
            ) : (
              <input type="button" onClick={handleConnect} value={"Connect"} />
              )}
        
        </div>
      </div> */}
    </div>
  );
}
