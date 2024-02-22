import React, { useEffect, useState } from "react";

import Wrapper from "../../routes/Wrapper";
import { ArrowDownIcon2 } from "../../assets/Icons";
import axios from "axios";
import moment from "moment";

import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { cont_address,du_Address,usdt_Address,cont_abi,token_abi } from "../../components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

const KycApprovals = () => {
  
  const [orderHistory, set_orderHistory] = useState([]);
  const [owner, set_owner] = useState(0);

  const [choosed_order, set_choosed_order] = useState(0);
  const [decision, set_decision] = useState(0);
  const [index_no, set_index_no] = useState(-1);

  const { chain } = useNetwork()

  const { address, isConnecting ,isDisconnected} = useAccount()


  let count1=0;
  const CHAIN_ID=56;

  
  
  useEffect(()=>{
    if((count1==0))
    {
      count1++;
  
      console.log("hello sec box"+count1);
      get_Data();
    }
  
  },[address])
  



  // const { config:respond_to_request } = usePrepareContractWrite({
  //   address: cont_address,
  //   abi: cont_abi,
  //   functionName: 'respond_to_request',
  //   args: [choosed_order,decision,index_no],
  // })

    const { data:Result_respond_to_request, isLoading2_respond_to_request1, isSuccess2_respond_to_request1, write:respond_to_request1 } = useContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'respond_to_request',
      args: [choosed_order,decision,index_no],
})


const waitForTransaction_buy = useWaitForTransaction({
  hash: Result_respond_to_request?.hash,
  onSuccess(data) {
    get_Data?.();
    console.log("Success", data);
  },
});


   const {switchNetwork:respond_to_request_switch } =
    useSwitchNetwork({
    chainId: CHAIN_ID,
    onSuccess(){
      console.log("objectifyft");
      respond_to_request1?.();
    }
  
    
  
  })

  useEffect(()=>{
    console.log("LKNLJN BIUBN "+index_no)
    if(index_no != -1)
    {   
      if(CHAIN_ID==chain.id)
      {

        respond_to_request1?.();
      }
      else
      {
        respond_to_request_switch();
      }
    }
  
  },[decision])

   function action(_orderNo,_decision,_index)
   {


    set_choosed_order(_orderNo);
    set_decision(_decision);
    set_index_no(_index)
    console.log(" decision" +decision);
    if(_decision==decision)
    {
      if(CHAIN_ID==chain.id)
      {
        respond_to_request1?.();
      }
      else
      {
        respond_to_request_switch();
      }
    }


  }

  async function get_Data(){
    // setLoader(true)
    const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com"));
  
              
   const balance =await  web3.eth.getBalance(address)
    const contract=new web3.eth.Contract(cont_abi,cont_address);
    const usdt_contract=new web3.eth.Contract(token_abi,usdt_Address);
    const Du_contract=new web3.eth.Contract(token_abi,du_Address);



    // let usdt_Balance = await usdt_contract.methods.balanceOf(address).call();  

    
    let owner = await contract.methods.owner().call();  
    let orderHistory = await contract.methods.get_All_PendingSwaps().call({from : address});  

    set_orderHistory(orderHistory)
    set_owner(owner)
  }


  const count = (time) => {
    const now = new Date(time*1000);  
    const t=moment(now).format('D MMM YYYY');
    return t;
    
  };




  return (
    <Wrapper>
      <div className="kyc-approvals-page">
        <div className="wrap wrapWidth flex">
          <div className="dashboard-box">
            <div className="dashboard-header flex items-center justify-between gap-3">
              <h1 className="heading">Swap Approval</h1>
            </div>
            <hr class="w-full border-black" />

            <div className="table-block overflow-auto py-10 px-10">
              <table className="table-auto w-full">
                <thead className="table-head ">
                  <tr>
                    <th className="px-4 py-2">Sr.No</th>
                    <th className="px-4 py-2">User Address</th>
                    <th className="px-4 py-2">Order No</th>
                    <th className="px-4 py-2">IN Amount</th>
                    <th className="px-4 py-2">OUT Amount</th>
                    <th className="px-4 py-2">Place Time</th>
                    {/* <th className="px-4 py-2">Decision Time</th> */}
                    <th className="px-4 py-2">Status</th>


                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((item, index) => (
                    <tr key={index} className="table-body">
                      {/* <td className="border px-4 py-2">
                        {(index + 1).toString().padStart(2, "0")}
                      </td> */}
                      <td className="border px-4 py-2">{index}</td>
                      <td className="border px-4 py-2">{item[0].slice(0,4)}....{item[0].slice(38,42)}</td>
                      <td className="border px-4 py-2">0xdu{item[1]}</td>
                      <td className="border px-4 py-2">{(Number(item[3])/10**18).toFixed(2)} {Number(item[2])==du_Address ? ("DU"):("USDT") }</td>
                      <td className="border px-4 py-2">{(Number(item[4])/10**18).toFixed(2)}  {Number(item[2])!=du_Address ? ("DU"):("USDT") }</td>

                      <td className="border px-4 py-2">{count(Number(item[5]))}</td>
                      {/* <td className="border px-4 py-2">{Number(item[7])==0?(""):(count(Number(item[7])))}</td> */}

                      <td className="border px-4 py-2">
                        <div className="flex items-center justify-center gap-3">
                          <button className="btn" onClick={()=> action(item[1],2,item[7])}>Decline</button>
                          <button className="btn" onClick={()=>action(item[1],1,item[7])}>Approve</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default KycApprovals;
