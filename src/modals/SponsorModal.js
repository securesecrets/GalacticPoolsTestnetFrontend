import React, { useState, useEffect, useCallback } from "react";
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
    width: "35%",
    height: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0f4d4a",
    borderRadius: "1%",
    // padding: "2%",
  },
};

const DepositModal = ({
  isShowing,
  hide,
  clearfields,
  balance,
  inputBalance,
  onInputchangeBalance,
  setinputBalance,
  Label: InputText,

  isSponsoring,
  isSponsorButtonEnabled,
  sponsor,
  onInputchangeMessage,
  inputMessage,
  onInputchangeTitle,
  inputTitle,
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Modal
            isOpen={isShowing}
            onRequestClose={clearfields}
            contentLabel="Example Modal"
            style={customStyles}
            ariaHideApp={false}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-row justify-between items-center">
                <div className="">
                  <span className="deposit-modal-heading">Sponsor</span>
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
                      alt="LOGO "
                      className="img-fluid mini-logo-size"
                    />
                  </div>
                  <div className="ps-1 pool_past_prizes m-1">
                    {balance / 1e6} SCRT
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
                    onChange={onInputchangeBalance}
                  />
                </div>
                <div className="deposit-modal-deposit-field-tokens">SCRT</div>
              </div>
              <div className="flex flex-row mt-4 items-center justify-between text-white ">
                <div
                  className="deposit-modal-amount-percentage px-5 "
                  onClick={() => {
                    setinputBalance(((balance / 1e6) * 0.25).toFixed(2));
                  }}
                >
                  <button>25%</button>
                </div>
                <div
                  className="deposit-modal-amount-percentage  px-5"
                  onClick={() => {
                    setinputBalance(((balance / 1e6) * 0.5).toFixed(2));
                  }}
                >
                  <button>50%</button>
                </div>
                <div
                  className="deposit-modal-amount-percentage px-5 "
                  onClick={() => {
                    setinputBalance(((balance / 1e6) * 0.75).toFixed(2));
                  }}
                >
                  <button>75%</button>
                </div>
                <div
                  className="deposit-modal-amount-percentage  px-5"
                  onClick={() => {
                    setinputBalance(balance / 1e6);
                  }}
                >
                  <button>100%</button>
                </div>
              </div>
              <div className="flex flex-row  justify-between items-center mt-4">
                <div className="">
                  <span className="deposit-modal-available text-m">
                    Sponsorship Title
                  </span>
                </div>
                <div className="flex flex-row ">
                  <div className="d-flex align-items-center m-1">
                    <form>
                      <InputText
                        text={inputTitle}
                        onChange={onInputchangeTitle}
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  justify-between items-center mt-4">
                <div className="">
                  <span className="deposit-modal-available text-m">
                    Sponsorship Message
                  </span>
                </div>
                <div className="flex flex-row ">
                  <div className="d-flex align-items-center m-1">
                    <InputText
                      text={inputMessage}
                      onChange={onInputchangeMessage}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-4 items-center justify-between ">
                <Button
                  className="btn account_deposit_button text-white self-center"
                  onClick={() => sponsor()}
                  disabled={!isSponsorButtonEnabled}
                >
                  {isSponsoring ? (
                    <div className="loader-1 center">
                      <span></span>
                    </div>
                  ) : (
                    <div>Sponsor</div>
                  )}
                </Button>
              </div>
            </div>
          </Modal>
        </React.Fragment>,
        document.body
      )
    : null;

function SponsorModal(props) {
  //fetch the balance
  //create a state where you fetch secretjs once + the address
  //

  let [balance, setBalance] = useState(null);
  let [inputBalance, setinputBalance] = useState(0);
  let [inputTitle, setinputTitle] = useState("");
  let [inputMessage, setinputMessage] = useState("");

  let [isSponsorButtonEnabled, SetIsSponsorButtonEnabled] = useState(false);
  let [isSponsoring, setIsSponsoring] = useState(false);

  let [wallet, setWallet] = useState({ secretjs: null, address: null });

  async function setupKeplrfun() {
    const { secretjs, address } = await setupKeplr();
    setWallet({ secretjs, address });
  }

  async function fetchBalance() {
    // To create a readonly secret.js client, just pass in a gRPC-web endpoint
    const { secretjs, address } = wallet;

    const {
      balance: { amount },
    } = await secretjs.query.bank.balance({
      address: address,
      denom: "uscrt",
    });
    setBalance(amount);
  }

  async function sponsor() {
    setIsSponsoring(true);
    // To create a readonly secret.js client, just pass in a gRPC-web endpoint
    const { secretjs, address } = wallet;

    let amount = String(inputBalance * 1e6);
    let contractAddress = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;
    let codeHash = process.env.REACT_APP_POOL_CONTRACT_HASH;
    try {
      let message = {
        sponsor: {},
      };

      if (inputTitle !== "" || inputMessage !== "") {
        message = {
          sponsor: {
            title: inputTitle,
            message: inputMessage,
          },
        };
      }
      let tx = await secretjs.tx.compute.executeContract(
        {
          sender: address,
          contractAddress: contractAddress,
          codeHash: codeHash, // optional but way faster
          msg: {
            sponsor: {
              title: inputTitle,
              message: inputMessage,
            },
          },
          sentFunds: [{ amount: amount, denom: "uscrt" }], // optional{}
        },
        {
          gasLimit: 240297,
        }
      );

      if (tx.jsonLog) {
        Notifications(
          "success",
          "Transaction sent!",
          `Successfully sponsored: ${inputBalance} SCRT \n 
        Txhash: ${tx.transactionHash}`
        );
      } else {
        Notifications("error", "ERROR", tx.rawLog);
      }
    } catch (err) {
      Notifications("error", "ERROR", err);
    }

    const {
      balance: { amount: am },
    } = await secretjs.query.bank.balance({
      address: address,
      denom: "uscrt",
    });
    setBalance(am);

    // } catch (e) {
    //   Notifications("error", "ERROR", e);
    // }

    await clearfields();
  }

  useEffect(() => {
    if (wallet.secretjs == null || wallet.address == null) {
      setupKeplrfun();
    }

    if (wallet.secretjs != null || wallet.address != null) {
      fetchBalance();
    }

    if (inputBalance !== 0) {
      SetIsSponsorButtonEnabled(true);
    } else {
      SetIsSponsorButtonEnabled(false);
    }

    if (inputBalance * 1e6 > balance) {
      SetIsSponsorButtonEnabled(false);
    }
  }, [wallet, inputBalance, balance, fetchBalance]);

  async function onInputchangeBalance(e) {
    setinputBalance(e.target.value);
  }

  async function onInputchangeTitle(e) {
    setinputTitle(e.target.value);
  }

  async function onInputchangeMessage(e) {
    setinputMessage(e.target.value);
  }

  async function clearfields() {
    await props.callback();
    props.hide();
    setinputBalance(0);
    setinputTitle(undefined);
    setinputMessage(undefined);

    setIsSponsoring(false);
  }

  const Label = useCallback(
    ({ text, onChange }) => (
      <input
        className="deposit-modal-deposit-field text-white w-full"
        type="text"
        placeholder="Optional"
        placeholder-default="white"
        value={text}
        onChange={(e) => onChange(e)}
      />
    ),
    []
  );

  return (
    <DepositModal
      isShowing={props.isShowing}
      hide={props.hide}
      clearfields={clearfields}
      balance={balance}
      inputBalance={inputBalance}
      onInputchangeBalance={onInputchangeBalance}
      setinputBalance={setinputBalance}
      Label={Label}
      isSponsoring={isSponsoring}
      isSponsorButtonEnabled={isSponsorButtonEnabled}
      sponsor={sponsor}
      onInputchangeMessage={onInputchangeMessage}
      inputMessage={inputMessage}
      onInputchangeTitle={onInputchangeTitle}
      inputTitle={inputTitle}
    />
  );
}

export default SponsorModal;
