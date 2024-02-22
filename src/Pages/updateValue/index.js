import React, { useState,useEffect } from "react";
import Wrapper from "../../routes/Wrapper";
import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { cont_address,du_Address,usdt_Address,cont_abi,token_abi } from "../../components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

const UpdateValue = () => {


  const [minimum_investment, set_minimum_investment] = useState(0);
  const [Minimum_withdraw_limit, set_Minimum_withdraw_limit] = useState(0);
  const [minimum_withdraw_reward_limit, set_minimum_withdraw_reward_limit] = useState(0);
  const [swapfee, set_swapfee] = useState(0);
  const [RefPercentage, set_RefPercentage] = useState(0);
  const [owner, set_owner] = useState("");

  const [du_price, set_du_price] = useState("");

  const [baseVal_usdt_to_du, set_baseVal_usdt_to_du] = useState("");
  const [baseVal_du_to_usdt, set_baseVal_du_to_usdt] = useState("");


  const { address, isConnecting ,isDisconnected} = useAccount()
  let count=0
  
  
  
  useEffect(()=>{
    if((count==0))
    {
      count++;
  
      console.log("hello sec box"+count);
        get_Data();
    }
  
  },[address])
  
  
  
  
  
  
    async function get_Data(){
      const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com"));
    
                
      const contract=new web3.eth.Contract(cont_abi,cont_address);
   
      let owner = await contract.methods.owner().call();  
  
      let Minimum_withdraw_limit = await contract.methods.Minimum_withdraw_limit().call();
      Minimum_withdraw_limit= web3.utils.fromWei(Minimum_withdraw_limit.toString(),"ether")  
      
  
      let swapfee = await contract.methods.fee().call();  
      swapfee= web3.utils.fromWei(swapfee.toString(),"ether")    

      let Du_price_in_usdt = await contract.methods.Du_price_in_usdt().call();  
      Du_price_in_usdt= web3.utils.fromWei(Du_price_in_usdt.toString(),"ether")    

      let baseVal_du_to_usdt = await contract.methods.baseVal_du_to_usdt().call();  
      baseVal_du_to_usdt= web3.utils.fromWei(baseVal_du_to_usdt.toString(),"ether")    

      let baseVal_usdt_to_du = await contract.methods.baseVal_usdt_to_du().call();  
      baseVal_usdt_to_du= web3.utils.fromWei(baseVal_usdt_to_du.toString(),"ether")    
  
      let RefPercentage = await contract.methods.ref_percentage().call();  
      RefPercentage= web3.utils.fromWei(RefPercentage.toString(),"ether")  
  
      set_baseVal_usdt_to_du(baseVal_usdt_to_du);
      set_baseVal_du_to_usdt(baseVal_du_to_usdt);
      set_du_price(Du_price_in_usdt)
      set_owner(owner)
      set_swapfee(swapfee)
      set_minimum_withdraw_reward_limit(Minimum_withdraw_limit)
      set_minimum_investment(minimum_investment)
      set_RefPercentage(RefPercentage)
  
  
  console.log("object done");
    }  
  
  
  const data = [


    {
      Title: "Min Withdraw",
      value: minimum_withdraw_reward_limit,
      functionName: "0.00",
    },
    {
      Title: "Referral percentage",
      value: RefPercentage,
      functionName: "0.00",
    },
    {
      Title: "Swap Fee",
      value: swapfee,
      functionName: "0.00",
    },
    {
      Title: "DU Price",
      value: du_price,
      functionName: "0.00",
    },
    {
      Title: "Base DU->USDT Price",
      value: baseVal_du_to_usdt,
      functionName: "0.00",
    },
    {
      Title: "Base USDT->DU Price",
      value: baseVal_usdt_to_du,
      functionName: "0.00",
    },
  
  ];
  
  
  
  
  
  
  
  




  const Card = ({ index, item }) => 
  {

      const [editInput, setEditInput] = useState(false);
      const [numb, setNumb] = useState(item.value);
      const { address, isConnecting ,isConnected,isDisconnected} = useAccount()

      const { chain } = useNetwork()

    

    const { config:update_minimum_withdraw_reward_limit } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_Minimum_withdraw_limit',
      args: [Number(numb)*10**18],
    
    
    })

    const { config:update_RefPercentage } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_ref_percentage',
      args: [Number(numb)*10**18],
    
    
    })
    const { config:update_swapfee } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_fee',
      args: [Number(numb)*10**18],
    
    
    })

    const { config:update_Du_Price } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_Du_Price',
      args: [Number(numb)*10**18],
    
    
    })

    const { config:update_baseVal_usdt_to_du } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_baseVal_usdt_to_du',
      args: [Number(numb)*10**18],
    
    
    })
    const { config:update_baseVal_du_to_usdt } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_update_baseVal_du_to_usdt',
      args: [Number(numb)*10**18],
    
    
    })
      
      const { data:Result_update_minimum_withdraw_reward_limit, isLoading2_update_minimum_withdraw_reward_limit, isSuccess2_update_minimum_withdraw_reward_limit, write:update_minimum_withdraw_reward_limit1 } = useContractWrite(update_minimum_withdraw_reward_limit)

      const { data:Resultupdate_RefPercentage, isLoading2update_RefPercentage, isSuccess2update_RefPercentage, write:update_RefPercentage1 } = useContractWrite(update_RefPercentage)

      const { data:Result_update_swapfee, isLoading2_update_swapfee, isSuccess2_update_swapfee, write:update_swapfee1 } = useContractWrite(update_swapfee)
    

      const { data:Result_update_Du_Price, isLoading2_update_Du_Price, isSuccess2_update_Du_Price, write:update_Du_Price1 } = useContractWrite(update_Du_Price)

      const { data:Resultupdate_baseVal_usdt_to_du, isLoading2update_baseVal_usdt_to_du, isSuccess2update_baseVal_usdt_to_du, write:update_baseVal_usdt_to_du1 } = useContractWrite(update_baseVal_usdt_to_du)

      const { data:Result_update_baseVal_du_to_usdt, isLoading2_update_baseVal_du_to_usdt, isSuccess2_update_baseVal_du_to_usdt, write:update_baseVal_du_to_usdt1 } = useContractWrite(update_baseVal_du_to_usdt)

      const waitForTransaction1 = useWaitForTransaction({
        hash: Result_update_minimum_withdraw_reward_limit?.hash || Result_update_Du_Price?.hash || Resultupdate_baseVal_usdt_to_du?.hash ||Result_update_baseVal_du_to_usdt?.hash ,
        onSuccess(data) {
          get_Data?.();
          console.log("Success", data);
        },
      });  
      
      
      const waitForTransaction2 = useWaitForTransaction({
        hash: Resultupdate_RefPercentage?.hash,
        onSuccess(data) {
          get_Data?.();
          console.log("Success", data);
        },
      });


      const waitForTransaction3 = useWaitForTransaction({
        hash: Result_update_swapfee?.hash,
        onSuccess(data) {
          get_Data?.();
          console.log("Success", data);
        },
      });
    const networkId=56;
    
    

    
      const { chains, error, isLoading, pendingChainId, switchNetwork:reward_switch } =
      useSwitchNetwork({
        chainId: networkId,
        // throwForSwitchChainNotSupported: true,
        onSuccess(){
    
          update_value?.()
        }
    
      })
      async function update_value()
      {
        if(!isConnected)
        {
          alert("kindly connect your owner wallet")
          return;
        }
        
        if(owner.toLowerCase()!=address.toLowerCase())
        {
          alert("only owner can update these values")
          return;
        }


      if(index==0)
        {
          update_minimum_withdraw_reward_limit1?.()
        }

        else if(index==1)
        {
          update_RefPercentage1?.()
        }
        else if(index==2)
        {
          update_swapfee1?.()
        }
        else if(index==3)
        {
          update_Du_Price1?.()
        }
        else if(index==4)
        {
          update_baseVal_du_to_usdt1?.()
        }
        else if(index==5)
        {
          update_baseVal_usdt_to_du1?.()
        }

      } 


    return (
      <div key={index} className="re-box flex flex-col">
        <h1 className="title mb-4">{item.Title}</h1>
        <div className="flex items-center justify-between gap-3 max-md:flex-col">
          <input
            type="text"
            value={numb}
            onChange={(e) => setNumb(e.target.value)}
            disabled={!editInput}
            className={`numb py-1 px-2 rounded-lg w-36 text-black border border-solid ${
              editInput ? "border-black" : "border-transparent"
            } `}
          />
          <button
            className="button btn-edit rounded-xl !py-2 !px-7 !text-[#1C0057]"
            onClick={(e) => 
              {
                if(editInput)
                {
                  update_value?.()

                }
                else{
                  setEditInput(!editInput)

                }
              
              }}
          >
            {editInput ? "Update" : "Edit"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="Reward-page ">
        <div className="wrap wrapWidth flex">
          <div className="Reward-box">
            <div className="Reward-header items-center justify-between gap-3">
              <h1 className="heading">Update Value</h1>
            </div>
            <hr class="w-full border-black mt-4 p-0" />
            <div className="flex flex-col items-center w-full">
              <div className="wrap-block grid lg:grid-cols-3 max-md:grid-cols-2 gap-5 my-8 px-5 max-md:overflow-y-auto max-md:max-h-[500px] max-md:px-0 max-md:gap-2">
                {data.map((item, index) => (
                  <Card item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdateValue;
