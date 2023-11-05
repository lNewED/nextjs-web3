import { CardContent } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { parseUnits } from 'ethers';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import { _ethers } from "ethers";
import { formatEther ,parseUnits} from "@ethersproject/units";
import { ethers } from "ethers";
import abi from '../abi.json'
import { MetaMask } from "@web3-react/metamask";
import { initializeConnector } from "@web3-react/core";


// import { Balance } from '@mui/icons-material';

// const [NewValue,setNewValue] = useState (0);
const contractAddress = "0x67F6D236A48a0e500cbaA588E20ffADe6E17e77a";

const  Card = ( {balance,accounts,provider,}) => {
    const [newValue, setNewValue] = useState(0);
    
const handleBuy = event =>{
    setNewValue(event.target.value);
};

const NewBuy = async()=>{
    try{
        if(newValue<=0){
            return;
        }
        const signer = provider.getSigner();
        const smartContract = new ethers.Contract(contractAddress, abi, signer);
        const buyValue = parseUnits(newValue.toString(),"ether")
        const tx= await smartContract.buy({
            value:buyValue.toString(),
        });
        console.log("Transaction",tx.hash);
       }catch(err){
        console.log(err);
       }
};

  return (
    <div className='container '>
        <div className='card'>
            
            <CardContent>
                <h1>My wallet balance</h1>
                <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
        
        <TextField id="standard-basic" label="Address" variant="standard" value={accounts} />
        <TextField id="standard-basic" label="Newbalance" variant="standard" value={balance} />
        <h2> New Buy</h2>
        <TextField id="standard-basic" label="Buy" variant="standard" value={newValue} onChange={handleBuy} />
        <Stack direction="row" spacing={2} >
        <Button variant="contained" onClick={NewBuy}>ConFirm</Button>
        </Stack>
    </Box>
            </CardContent>
        </div>
    </div>
  )
}
export default Card;
