import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@windmill/react-ui";
import logo from "../assets/img/scrt_logo.png"; // with import
import { setupKeplr } from "../components/CryptoComponents/client";
import ReactDOM from "react-dom";
import Notifications from "../utils/demo/notifications.js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "40%",
    height: "60%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0f4d4a",
    borderRadius: "1%",
    padding: "2%",
  },
};

function UnbondingModal(props) {
  //fetch the balance
  //create a state where you fetch secretjs once + the address
  //

  let [inputBalance, setinputBalance] = useState(0);
  let [isUnbondButtonEnabled, SetIsUnbondButtonEnabled] = useState(false);
  let [isUnbonding, setIsUnbonding] = useState(false);

  let [wallet, setWallet] = useState({ secretjs: null, address: null });

  async function setupKeplrfun() {
    const { secretjs, address } = await setupKeplr();
    setWallet({ secretjs, address });
  }

  async function unbond() {
    setIsUnbonding(true);
    // To create a readonly secret.js client, just pass in a gRPC-web endpoint
    const { secretjs, address } = wallet;

    let amount = String(parseInt(inputBalance * 1e6));
    let contractAddress = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;
    let codeHash = process.env.REACT_APP_POOL_CONTRACT_HASH;

    try {
      const tx = await secretjs.tx.compute.executeContract(
        {
          sender: address,
          contractAddress: contractAddress,
          codeHash: codeHash, // optional but way faster
          msg: {
            request_withdraw: { amount: amount },
          },
        },
        {
          gasLimit: 240297,
        }
      );

      // fetchDelegated();
      Notifications(
        "success",
        "Transaction sent!",
        `Successfully Unbonded: ${inputBalance} SCRT \n 
        Txhash: ${tx.transactionHash}`
      );
    } catch (e) {
      Notifications("error", "ERROR", e);
    }

    await clearfields();
  }

  useEffect(() => {
    if (wallet.secretjs == null || wallet.address == null) {
      setupKeplrfun();
    }

    if (inputBalance != 0) {
      SetIsUnbondButtonEnabled(true);
    } else {
      SetIsUnbondButtonEnabled(false);
    }

    if (inputBalance * 1e6 > props.delegated) {
      SetIsUnbondButtonEnabled(false);
    }
  }, [wallet, inputBalance, props.delegated]);

  async function onInputchange(e) {
    setinputBalance(e.target.value);
  }

  async function clearfields() {
    await props.callback();
    props.hide();
    setinputBalance(0);
    setIsUnbonding(false);
  }

  const UM = ({ isShowing, hide }) =>
    isShowing
      ? ReactDOM.createPortal(
          <React.Fragment>
            <Modal
              isOpen={isShowing}
              onRequestClose={hide}
              contentLabel="Example Modal"
              style={customStyles}
              ariaHideApp={false}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="">
                      <span className="deposit-modal-heading">Unbond</span>
                    </div>
                    <div className="btn-close white">
                      <button
                        type="Button"
                        className="btn-close white"
                        aria-label="Close"
                        onClick={clearfields}
                      ></button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center   text-white font-light">
                  <span className="text-white font-light">
                    This will remove your SCRT tokens from the rewards contract.
                    You will have to withdraw your SCRT to see it in your wallet
                  </span>
                </div>

                <div className="flex flex-row items-center   text-white p-4 border mt-4">
                  <div className="flex flex-col d mr-4">
                    <span className="deposit-modal-heading">&#9888;</span>
                  </div>
                  <div className="">
                    <div className="ul">
                      Once the unbonding period begins you will:
                      <div className="li">
                        - not be able to cancel the unbonding
                      </div>
                      <div className="li">
                        - need to wait 21 days for the amount to be liquid
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row  justify-between items-center mt-4">
                  <div className="">
                    <span className="deposit-modal-available text-m">
                      Available
                    </span>
                  </div>
                  <div className="flex flex-row ">
                    <div className="d-flex align-items-center m-1">
                      <img
                        src={logo}
                        alt="LOGO Image"
                        className="img-fluid mini-logo-size"
                      />
                    </div>
                    <div className="ps-1 pool_past_prizes m-1">
                      {props.delegated / 1e6} SCRT
                    </div>
                  </div>
                </div>

                <div
                  className="flex flex-row  justify-between items-center  p-2
              mt-2 deposit-modal-deposit-field deposit-modal-deposit-field-shape "
                >
                  <div>
                    <input
                      className="deposit-modal-deposit-field text-white w-full"
                      type="number"
                      min="0"
                      placeholder="0.00"
                      placeholder-default="white"
                      name="inputBalance"
                      value={inputBalance}
                      onChange={onInputchange}
                    />
                  </div>
                  <div className="deposit-modal-deposit-field-tokens">SCRT</div>
                </div>
                <div className="flex flex-row mt-4 items-center justify-between text-white ">
                  <div
                    className="deposit-modal-amount-percentage px-5 "
                    onClick={() => {
                      setinputBalance(
                        ((props.delegated / 1e6) * 0.25).toFixed(2)
                      );
                    }}
                  >
                    <button>25%</button>
                  </div>
                  <div
                    className="deposit-modal-amount-percentage  px-5"
                    onClick={() => {
                      setinputBalance(
                        ((props.delegated / 1e6) * 0.5).toFixed(2)
                      );
                    }}
                  >
                    <button>50%</button>
                  </div>
                  <div
                    className="deposit-modal-amount-percentage px-5 "
                    onClick={() => {
                      setinputBalance(
                        ((props.delegated / 1e6) * 0.75).toFixed(2)
                      );
                    }}
                  >
                    <button>75%</button>
                  </div>
                  <div
                    className="deposit-modal-amount-percentage  px-5"
                    onClick={() => {
                      setinputBalance((props.delegated / 1e6).toFixed(6));
                    }}
                  >
                    <button>100%</button>
                  </div>
                </div>
                <div className="btn    ">
                  <Button
                    className="btn account_deposit_button text-white self-center"
                    onClick={() => unbond()}
                    disabled={!isUnbondButtonEnabled}
                  >
                    {isUnbonding ? (
                      <div className="loader-1 center">
                        <span>.</span>
                      </div>
                    ) : (
                      <div>Unbond</div>
                    )}
                  </Button>
                </div>
              </div>
            </Modal>
          </React.Fragment>,
          document.body
        )
      : null;
  return <UM isShowing={props.isShowing} hide={props.hide} />;
}

export default UnbondingModal;
