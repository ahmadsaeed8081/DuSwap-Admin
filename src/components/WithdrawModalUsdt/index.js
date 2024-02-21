import React from "react";

const WithdrawModal_usdt = (props) => {
  return (
    <div className="with-draw-modal-popup flex flex-col">
      <div className="model-hdr">Withdrawal USDT</div>
      <div className="model-body flex flex-col">
        <div className="body-title flex items-center justify-between">
          <h1 className="b-title">Withdrawal Payment</h1>
          <img src="/images/rocket.svg" className="icon" />
        </div>
        {/* <div className="input-field flex flex-col mb-4">
          <h1 className="lbl mb-2">My Balance</h1>
          <input type="text" className="txt" />
        </div> */}
        <div className="input-field flex flex-col mb-4">
          <h1 className="lbl mb-2">Amount:</h1>
          <input type="number"
           className="txt"
           min={1}
           value={props.usdt_withdraw_amount}
           onChange={(e) => props.set_usdt_withdraw_amount(e.target.value)}

           
           
           />
        </div>
        <button className="btn-width button mt-2" onClick={props.withdraw_Contract_usdt}>Withdraw Payment</button>
      </div>
    </div>
  );
};

export default WithdrawModal_usdt;
