import React, { useState,useEffect } from "react";

import Modal from "../../components/Modal";
import Wrapper from "../../routes/Wrapper";
import { CopyIcon } from "../../assets/Icons";
import WithdrawModal from "../../components/WithdrawModal";
import SendModal from "../../components/SendModal";

import WithdrawModal_usdt from "../../components/WithdrawModalUsdt";
import SendModal_usdt from "../../components/SendModalUsdt";

import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { cont_address,du_Address,usdt_Address,cont_abi,token_abi } from "../../components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


const Main = () => {
  const [open, setOpen] = useState(false);
  const [openSend, setOpenSend] = useState(false);

  const [open_usdt, setOpen_usdt] = useState(false);
  const [openSend_usdt, setOpenSend_usdt] = useState(false);

  const [totalwithdraw, set_totalwithdraw] = useState(0);
  const [contract_DuBalance, set_contract_DuBalance] = useState(0);
  const [contract_usdtBalance, set_contract_usdtBalance] = useState(0);

  const [owner_DuBalance, set_owner_DuBalance] = useState(0);
  const [total_users, set_total_users] = useState(0);
  const [TotalStaked, set_TotalStaked] = useState(0);
  const [withdraw_amount, set_withdraw_amount] = useState(0);
  const [send_amount, set_send_amount] = useState(0);

  const [usdt_send_amount, set_usdt_send_amount] = useState(0);
  const [usdt_withdraw_amount, set_usdt_withdraw_amount] = useState(0);

  const [owner, set_owner] = useState("");

  const { address,isConnected, isConnecting ,isDisconnected} = useAccount()
  let count=0



  useEffect(()=>{
    if((count==0 ))
    {
      count++;
  
        test();
    }
  
  },[address,contract_DuBalance])
  
  const { config:withdrawFunds } = usePrepareContractWrite({
    address: cont_address,
    abi: cont_abi,
    functionName: 'withdrawdu',
    args: [Number(withdraw_amount)*10**18],
  
  
  })
  const { config:sendFunds } = usePrepareContractWrite({
    address: du_Address,
    abi: token_abi,
    functionName: 'transfer',
    args: [cont_address,Number(send_amount)*10**18],
  
  })

    const { data:Result_withdrawFunds, isLoading2_withdrawFunds1, isSuccess2_withdrawFunds1, write:withdrawFunds1 } = useContractWrite(withdrawFunds)
    const { data:Result_sendFunds, isLoading2_sendFunds, isSuccess2_sendFunds, write:sendFunds1 } = useContractWrite(sendFunds)



    const { config:withdrawUsdt } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'withdrawUsdt',
      args: [Number(usdt_withdraw_amount)*10**18],
    
    
    })
    const { config:usdt_sendFunds } = usePrepareContractWrite({
      address: usdt_Address,
      abi: token_abi,
      functionName: 'transfer',
      args: [cont_address,Number(usdt_send_amount)*10**18],
    
    })
    
      const { data:Result_usdt_withdrawFunds, isLoading2_usdt_withdrawFunds1, isSuccess2_usdt_withdrawFunds1, write:usdt_withdrawFunds1 } = useContractWrite(withdrawUsdt)
      const { data:Result_usdt_sendFunds, isLoading2_usdt_sendFunds, isSuccess2_usdt_sendFunds, write:usdt_sendFunds1 } = useContractWrite(usdt_sendFunds)


  
    async function test(){
      const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/Xr86iyHzmF6-yzBAqV5rd_PW7ds7QKlh"));
    
                
     const balance =await  web3.eth.getBalance(address)
      const contract=new web3.eth.Contract(cont_abi,cont_address);
      const du_contract=new web3.eth.Contract(token_abi,du_Address);
      const usdt_contract=new web3.eth.Contract(token_abi,usdt_Address);
  
      let contract_DuBalance = await du_contract.methods.balanceOf(cont_address).call();    
      let contract_usdtBalance = await usdt_contract.methods.balanceOf(cont_address).call();    

      let TotalStaked = await contract.methods.total_orders().call();  

      let totalusers = await contract.methods.total_users().call();      
      let owner = await contract.methods.owner().call();      

      let owner_DuBalance = await du_contract.methods.balanceOf(address).call();    
      set_TotalStaked(TotalStaked)
      set_total_users(totalusers)
      set_owner_DuBalance(owner_DuBalance/10**18)
      set_contract_DuBalance(contract_DuBalance/10**18)
      set_contract_usdtBalance(contract_usdtBalance/10**18)

      set_owner(owner)
      // set_totalwithdraw(Totalwithdraw/10**18)
  
  
  console.log("object done");
    }  
   
  
  function check1()
  {
    if(!isConnected)
    {
      alert("kindly connect your owner wallet")
      return;
    }
    
    if(owner.toLowerCase()!=address.toLowerCase())
    {
      alert("only owner can withdraw the funds")
      return;
    }
    if(withdraw_amount==0 || withdraw_amount=="")
    {
      alert("kindly write amount")
      return;
    }
    withdrawFunds1?.()

  }
  function check()
  {

    if(!isConnected)
    {
      alert("kindly connect your owner wallet")
      return;
    }
    if(owner_DuBalance<send_amount)
    {
      alert("you have insufficient funds")
      return;
    }
    if(owner.toLowerCase()!=address.toLowerCase())
    {
      alert("only owner can send the funds")
      return;
    }
    if(send_amount==0 || send_amount=="")
    {
      alert("kindly write amount to send")
      return;
    }
    sendFunds1?.()

  }

  function withdraw_Contract_usdt()
  {
    if(!isConnected)
    {
      alert("kindly connect your owner wallet")
      return;
    }
    
    if(owner.toLowerCase()!=address.toLowerCase())
    {
      alert("only owner can withdraw the funds")
      return;
    }
    if(usdt_withdraw_amount==0 || usdt_withdraw_amount=="")
    {
      alert("kindly write amount")
      return;
    }
    usdt_withdrawFunds1?.()

  }
  function Send_Contract_usdt()
  {

    if(!isConnected)
    {
      alert("kindly connect your owner wallet")
      return;
    }
    if(owner_DuBalance<usdt_send_amount)
    {
      alert("you have insufficient funds")
      return;
    }
    if(owner.toLowerCase()!=address.toLowerCase())
    {
      alert("only owner can send the funds")
      return;
    }
    if(usdt_send_amount==0 || usdt_send_amount=="")
    {
      alert("kindly write amount to send")
      return;
    }
    usdt_sendFunds1?.()

  }

  const dashboardList = [
    {
      img: "../images/briefcase.png",
      title: "Total Orders",
      price: Number(TotalStaked).toFixed(2),
    },
    {
      img: "../images/proof-of-stake.png",
      title: "Total Withdraw",
      price: Number(totalwithdraw).toFixed(2),
    },
    {
      img: "../images/compensation.png",
      title: "Contract Du Balance",
      price: Number(contract_DuBalance).toFixed(2),
    },
    {
      img: "../images/compensation.png",
      title: "Contract usdt Balance",
      price: Number(contract_usdtBalance).toFixed(2),
    },
    {
      img: "../images/cash-withdrawal1.png",
      title: "Total Users",
      price: total_users,
    },
    {
      img: "../images/wallet-img.png",
      title: "My Balance",
      price: Number(owner_DuBalance).toFixed(2),
    },

  ];
  return (
    <Wrapper>
      <div className="lading-page relative">
        <div className="wrap wrapWidth flex">
          <div className="dashboard-box">
            <div className="dashboard-header flex items-center justify-between gap-3">
              <h1 className="heading">Dashboard</h1>
            </div>
            <hr class="w-full border-black" />

            <div className="d-list flex ">
              <div className="flex flex-col items-center w-full">
                <div className="grid-wrap w-full grid lg:grid-cols-3 max-md:grid-cols-2 gap-5 max-md:gap-4">
                  {dashboardList.map((item, index) => (
                    <div
                      key={index}
                      className="d-box flex flex-col justify-center items-center "
                    >
                      <div className="action flex flex-col items-end  w-full gap-2">
                        <button
                          className={`btn-withdraw button ${
                            item.title === "Contract Du Balance"  ? "show" : ""
                          }`}
                          onClick={(e) => setOpen(true)}
                        >
                          Withdraw
                        </button>
                        <button
                          className={`btn-withdraw button ${
                            item.title === "Contract Du Balance"  ? "show" : ""
                          }`}
                          onClick={(e) => setOpenSend(true)}
                        >
                          Send
                        </button>
                      </div>

                      <div className="action flex flex-col items-end  w-full gap-2">
                        <button
                          className={`btn-withdraw button ${
                             item.title === "Contract usdt Balance" ? "show" : ""
                          }`}
                          onClick={(e) => setOpen_usdt(true)}
                        >
                          Withdraw
                        </button>
                        <button
                          className={`btn-withdraw button ${
                           item.title === "Contract usdt Balance" ? "show" : ""
                          }`}
                          onClick={(e) => setOpenSend_usdt(true)}
                        >
                          Send
                        </button>
                      </div>
                      
                      <img className="d-img" src={item.img} alt={item.title} />
                      <h2 className="d-heading">{item.title}</h2>
                      <p className="d-par">{item.price}</p>
                    </div>
                  ))}
                </div>
                {/* <div className="flex items-start">
                  <div className="d-link mt-10">
                    <p className="d-par">Referral Link : JQiwougLM2309A5</p>
                    <div
                      className="Icon"
                      onClick={() =>
                        navigator.clipboard.writeText("JQiwougLM2309A5")
                      }
                    >
                      <CopyIcon />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open}  onClose={() => setOpen(false)}>
        <WithdrawModal check1={check1} withdraw_amount={withdraw_amount} set_withdraw_amount={set_withdraw_amount}/>
      </Modal>
      <Modal open={openSend} onClose={() => setOpenSend(false)}>
        <SendModal check={check} send_amount={send_amount} set_send_amount={set_send_amount}/>
      </Modal>

      <Modal open={open_usdt}  onClose={() => setOpen_usdt(false)}>
        <WithdrawModal_usdt withdraw_Contract_usdt={withdraw_Contract_usdt} usdt_withdraw_amount={usdt_withdraw_amount} set_usdt_withdraw_amount={set_usdt_withdraw_amount}/>
      </Modal>
      <Modal open={openSend_usdt} onClose={() => setOpenSend_usdt(false)}>
        <SendModal_usdt Send_Contract_usdt={Send_Contract_usdt} usdt_send_amount={usdt_send_amount} set_usdt_send_amount={set_usdt_send_amount}/>
      </Modal>

    </Wrapper>
  );
};

export default Main;
