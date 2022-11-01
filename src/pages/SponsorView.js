import React, { useState, useEffect, lazy } from "react";
import { Button } from "@windmill/react-ui";
import Notifications from "../utils/demo/notifications.js";
import logo from "../assets/img/scrt_logo.png"; // with import
import useModal from "../utils/demo/useModals.js";
import gift from "../assets/img/gift.png";
import { setupKeplr } from "../components/CryptoComponents/client";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Pagination,
  Badge,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../icons";

const SponsorModal = lazy(() => import("../modals/SponsorModal"));
const UnbondingModal = lazy(() => import("../modals/UnbondingModal"));
const WithdrawableModal = lazy(() => import("../modals/WithdrawableModal"));

function SponsorView() {
  const { isShowing: isSponsorModalShowing, toggle: sponsorToggle } =
    useModal();
  const { isShowing: isUnbondModalShowing, toggle: unbondToggle } = useModal();
  const { isShowing: isWithdrawModalShowing, toggle: withdrawToggle } =
    useModal();
  const { isShowing: isWinningRecordsShowing, toggle: winningRecordsToggle } =
    useModal();

  const [isPermit, setisPermit] = useState(false);
  const [withdrawable, setWithdrawable] = useState(null);
  const [unbondings, setUnbondings] = useState([]);
  const [sponsorInfo, setSponsorInfo] = useState(null);

  const [lotteryInfo, setLotteryInfo] = useState(null);
  const [liquidity, setLiquidity] = useState(null);
  const [unclaimedRoundsLiq, setUnclaimedRoundsLiq] = useState([]);
  const [winningRecords, setWinningRecords] = useState([]);
  const [selectedWinningRecord, setSelectedWinningRecord] = useState(null);

  const [timer, setTimer] = useState({
    days: "-",
    hours: "-",
    mins: "-",
  });
  let [wallet, setWallet] = useState({ secretjs: null, address: null });

  async function setupKeplrfun() {
    const { secretjs, address } = await setupKeplr();
    setWallet({ secretjs, address });
  }

  useEffect(() => {
    if (wallet.secretjs == null || wallet.address == null) {
      setupKeplrfun();
    }

    if (wallet.secretjs != null || wallet.address != null) {
      if (!isPermit) {
        checkPermit();
      }
      fetchSponsored();
    }
  }, [wallet]);

  useEffect(() => {
    if (isPermit) {
      fetchUnbondings();
      fetchWithdrawable();
    }
  }, [isPermit]);

  async function fetchSponsored() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = JSON.parse(localStorage.getItem(permitName));

    // now fetch the balance here lol
    let sponsor_info = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            sponsor_info: {},
          },
        },
      },
    });

    let sponsor_message_request_check =
      await secretjs.query.compute.queryContract({
        contractAddress: contract_address,
        codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
        query: {
          sponsor_message_request_check: {},
        },
      });

    console.log(sponsor_info);
    console.log(sponsor_message_request_check);

    setSponsorInfo(sponsor_info);
  }

  async function checkPermit() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = localStorage.getItem(permitName);

    if (permit != null) {
      setisPermit(true);
    }
  }

  async function setPermit() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    const allowedTokens = [contract_address];
    const permissions = ["owner"];
    const chainId = process.env.REACT_APP_SECRET_CHAIN_ID;

    let permit = await secretjs.utils.accessControl.permit.sign(
      address,
      chainId,
      permitName,
      allowedTokens,
      permissions,
      true
    );
    localStorage.setItem(permitName, JSON.stringify(permit));

    setisPermit(true);
  }

  async function fetchUnbondings() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = JSON.parse(localStorage.getItem(permitName));

    // now fetch the balance here lol
    let unbondings = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            sponsor_unbondings: {},
          },
        },
      },
    });

    const now = new Date();
    if (unbondings.len != 0) {
      for (let i = 0; i < unbondings.vec.length; i++) {
        if (unbondings.vec[i].next_batch_unbonding_time != null) {
          let date = new Date(
            unbondings.vec[i].next_batch_unbonding_time * 1000
          );
          unbondings.vec[i].next_batch_unbonding_time = `${date
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")} UTC`;
        }
        if (unbondings.vec[i].unbonding_time != null) {
          if (now / 1000 >= unbondings.vec[i].unbonding_time) {
            unbondings.vec[i].isClaimable = true;
          } else {
            unbondings.vec[i].isClaimable = false;
          }
          let date = new Date(unbondings.vec[i].unbonding_time * 1000);
          unbondings.vec[i].unbonding_time = `${date
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")} UTC`;
        }
      }
      setUnbondings(unbondings.vec);
    } else {
      setUnbondings([]);
    }
  }

  async function fetchWithdrawable() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = JSON.parse(localStorage.getItem(permitName));

    // now fetch the balance here lol
    let withdrawable = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            sponsor_withdrawable: {},
          },
        },
      },
    });

    setWithdrawable(withdrawable.amount);
  }

  async function fetchLotteryInfo() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = JSON.parse(localStorage.getItem(permitName));

    // now fetch the balance here lol
    let lottery_info = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        round: {},
      },
    });

    setLotteryInfo(lottery_info);
  }

  async function editMessage() {
    // To create a readonly secret.js client, just pass in a gRPC-web endpoint
    const { secretjs, address } = wallet;

    let contractAddress = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;
    let codeHash = process.env.REACT_APP_POOL_CONTRACT_HASH;

    let sponsor_message = {
      sponsor_message_edit: {},
    };

    if (inputTitle) {
      sponsor_message.sponsor_message_edit.title = inputTitle;
    }
    if (inputMessage) {
      sponsor_message.sponsor_message_edit.message = inputMessage;
    }

    console.log(sponsor_message);

    try {
      let tx = await secretjs.tx.compute.executeContract(
        {
          sender: address,
          contractAddress: contractAddress,
          codeHash: codeHash, // optional but way faster
          msg: sponsor_message,
          sentFunds: [], // optional{}
        },
        {
          gasLimit: 240297,
        }
      );
      console.log(tx);

      if (tx.jsonLog) {
        Notifications(
          "success",
          "Transaction sent!",
          `
        Txhash: ${tx.transactionHash}`
        );
      } else {
        Notifications("error", "ERROR", tx.rawLog);
      }
    } catch (err) {
      Notifications("error", "ERROR", err);
    }

    await fetchSponsored();
  }

  async function sponsorCallback() {
    await fetchSponsored();
  }

  async function unbondingCallback() {
    await fetchSponsored();
    await fetchUnbondings();
  }

  async function withdrawCallback() {
    await fetchWithdrawable();
    await fetchUnbondings();
  }

  let [isSettingTitle, setIsSettingTitle] = useState(false);
  let [isSettingMessage, setIsSettingMessage] = useState(false);

  let [inputTitle, setinputTitle] = useState("");
  let [inputMessage, setinputMessage] = useState("");
  async function onInputchangeTitle(e) {
    setinputTitle(e.target.value);
  }

  async function onInputchangeMessage(e) {
    setinputMessage(e.target.value);
  }

  return (
    <div>
      <div className=" grid grid-cols-7 mt-4 grid-parent ">
        <div
          className="col-span-2 p-4 account_deposit_card mr-1"
          style={{ background: "linear-gradient(to right,#9A47B9, #4D2D9F)" }}
        >
          <div className="flex flex-row  account_deposit_title">Sponsored</div>
          {!isPermit ? (
            <div
              className="flex flex-row p-3 items-center justify-start"
              style={{ cursor: "pointer" }}
              onClick={setPermit}
            >
              <span style={{ fontSize: "20px" }}>&#128269;</span>

              <span className="createViewingKey p-4">
                CREATE VIEWING PERMIT
              </span>
            </div>
          ) : (
            <div>
              {" "}
              {sponsorInfo == null ? (
                <div>Loading...</div>
              ) : (
                <div className="flex flex-row justify-start items-end">
                  <span className="account_deposit_amount mr-1">
                    {(sponsorInfo.amount_sponsored / 1e6).toFixed(2)}
                    <span className="account_deposit_denom  ">SCRT</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="col-span-5 bg-primary2 account_deposit_card  gap-4 p-4">
          <div className="flex flex-row h-full w-full justify-between ">
            <div className="flex flex-row items-center justify-center ">
              <span className=" align-self-center d-flex justify-content-end">
                <img
                  src={logo}
                  alt="LOGO Image"
                  className="img-fluid logo-size"
                />
              </span>

              <span className=" ml-4 ">
                <div className="account_token_title">SCRT</div>
              </span>
            </div>

            <div className="flex flex-col w-full items-center justify-center ">
              <div className="flex flex-row w-full items-center justify-center">
                <div className="btn account_reduce_stakes_withdraw_button   m-1">
                  <Button
                    className="btn account_reduce_stakes_withdraw_button  self-center"
                    disabled={
                      withdrawable == null || withdrawable == 0 ? true : false
                    }
                    onClick={withdrawToggle}
                  >
                    Withdraw
                  </Button>
                  <WithdrawableModal
                    isShowing={isWithdrawModalShowing}
                    hide={withdrawToggle}
                    callback={withdrawCallback}
                    withdrawable={withdrawable}
                    type={"sponsor"}
                  />
                </div>
                <div className="btn account_reduce_stakes_withdraw_button   m-1">
                  <Button
                    className="btn account_reduce_stakes_withdraw_button  self-center"
                    onClick={unbondToggle}
                    disabled={
                      sponsorInfo == null || sponsorInfo.amount_sponsored == 0
                        ? true
                        : false
                    }
                  >
                    Unbond
                  </Button>
                  <UnbondingModal
                    isShowing={isUnbondModalShowing}
                    hide={unbondToggle}
                    callback={unbondingCallback}
                    delegated={sponsorInfo ? sponsorInfo.amount_sponsored : 0}
                    type={"sponsor"}
                  />
                </div>
                <div className="btn account_reduce_stakes_withdraw_button   m-1">
                  <Button
                    className="btn account_deposit_button  self-center"
                    onClick={sponsorToggle}
                  >
                    Sponsor
                  </Button>
                  <SponsorModal
                    isShowing={isSponsorModalShowing}
                    hide={sponsorToggle}
                    callback={sponsorCallback}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-6 p-6 bg-primary2 text-white account_deposit_card">
        <div className=" text-2xl ">Sponsor Stats</div>
        <div className=" border"></div>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow className="bg-primary2">
                <TableCell>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold ml-2">Title</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-row">
                    {sponsorInfo ? (
                      <div>
                        {isSettingTitle ? (
                          <input
                            className="deposit-modal-deposit-field text-white w-full"
                            type="text"
                            placeholder={sponsorInfo.title}
                            placeholder-default="white"
                            name="inputTitle"
                            value={inputTitle}
                            onChange={onInputchangeTitle}
                          />
                        ) : (
                          <span className="text-sm justify-self-end">
                            {sponsorInfo.title}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm justify-self-end">-</span>
                    )}

                    <div className="ml-3">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => {
                          setIsSettingTitle(true);
                        }}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => {
                          setIsSettingTitle(false);
                        }}
                      >
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className="bg-primary2">
                <TableCell>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold ml-2">Message</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row">
                    <div>
                      {sponsorInfo ? (
                        <div>
                          {isSettingMessage ? (
                            <input
                              className="deposit-modal-deposit-field text-white w-full"
                              type="text"
                              placeholder={sponsorInfo.title}
                              placeholder-default="white"
                              name="inputMessage"
                              value={inputMessage}
                              onChange={onInputchangeMessage}
                            />
                          ) : (
                            <span className="text-sm justify-self-end">
                              {sponsorInfo.message}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm justify-self-end">-</span>
                      )}
                    </div>

                    <div className="ml-3">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => {
                          setIsSettingMessage(true);
                        }}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => {
                          setIsSettingMessage(false);
                        }}
                      >
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex  mt-4 items-center justify-between ">
          <Button
            className="btn account_deposit_button text-white self-center"
            onClick={() => editMessage()}
            disabled={!inputTitle && !inputMessage}
          >
            Submit Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col mt-6 p-6 bg-primary2 text-white account_deposit_card">
        <div className=" text-2xl ">Unbondings</div>
        <div className=" border"></div>
        <div className="flex flex-row justify-between">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow className="bg-primary2 items-center justify-center text-white">
                  <TableCell>Amount</TableCell>
                  <TableCell>Unbonding Batch Index</TableCell>
                  <TableCell>Claimable ?</TableCell>
                  <TableCell>Batch Unbond Time</TableCell>
                  <TableCell>Unbonding Time</TableCell>
                </TableRow>
              </TableHeader>
              {unbondings ? (
                <TableBody>
                  {unbondings.map((value, index) => {
                    return (
                      <TableRow key={index} className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">
                            {(value.amount / 1e6).toFixed(2)} SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="font-semibold ml-2">
                              {value.batch_index}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center text-sm">
                            {value.isClaimable ? (
                              <Badge type="success">Yes</Badge>
                            ) : (
                              <Badge type="danger">NO</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="font-semibold ml-2">
                              {value.next_batch_unbonding_time
                                ? value.next_batch_unbonding_time
                                : "Already Unbonded"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="font-semibold ml-2">
                              {value.unbonding_time
                                ? value.unbonding_time
                                : "-"}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              ) : (
                <TableBody></TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default SponsorView;
