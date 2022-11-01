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
import WinningRecordModal from "../modals/WinningRecordModal.js";
const DepositModal = lazy(() => import("../modals/DepositModal"));
const UnbondingModal = lazy(() => import("../modals/UnbondingModal"));
const WithdrawableModal = lazy(() => import("../modals/WithdrawableModal"));

function UserView() {
  const { isShowing: isDepositModalShowing, toggle: depositToggle } =
    useModal();
  const { isShowing: isUnbondModalShowing, toggle: unbondToggle } = useModal();
  const { isShowing: isWithdrawModalShowing, toggle: withdrawToggle } =
    useModal();
  const { isShowing: isWinningRecordsShowing, toggle: winningRecordsToggle } =
    useModal();

  const [isPermit, setisPermit] = useState(false);
  const [delegated, setDelegated] = useState(null);
  const [withdrawable, setWithdrawable] = useState(null);
  const [unbondings, setUnbondings] = useState([]);
  const [userInfo, setuserInfo] = useState(null);

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
      if (timer.days === "-") {
        fetchTimer();
        fetchLotteryInfo();
      }
    }
  }, [wallet]);

  useEffect(() => {
    if (isPermit) {
      fetchDelegated();
      fetchUnbondings();
      fetchWithdrawable();
      fetchLiquidity();
      fetchUserWinningRecords();
    }
  }, [isPermit]);

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

  async function fetchDelegated() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = JSON.parse(localStorage.getItem(permitName));

    // now fetch the balance here lol
    let delegated = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            delegated: {},
          },
        },
      },
    });

    if (delegated.amount != null) {
      const balance = delegated.amount;
      setDelegated(balance);
    } else {
      setDelegated(0);
    }
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
            unbondings: {},
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

  async function fetchLiquidity() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = JSON.parse(localStorage.getItem(permitName));

    let user_info = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            user_info: {},
          },
        },
      },
    });

    setuserInfo(user_info);

    let start;
    let end;
    let lottery_info = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        round: {},
      },
    });
    setLotteryInfo(lottery_info);

    let current_liquidity = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            liquidity: { round_index: lottery_info.current_round_index },
          },
        },
      },
    });

    setLiquidity(current_liquidity);

    if (user_info.last_claim_rewards_round) {
      start = user_info.last_claim_rewards_round + 1;
    } else {
      if (user_info.starting_round) {
        start = user_info.starting_round;
      } else {
        start = lottery_info.current_round_index;
      }
    }

    end = lottery_info.current_round_index;

    let unclaimed_round_info = [];
    for (let i = start; i < end; i++) {
      let liquidity = await secretjs.query.compute.queryContract({
        contractAddress: contract_address,
        codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
        query: {
          with_permit: {
            permit,
            query: {
              liquidity: { round_index: i },
            },
          },
        },
      });

      liquidity.round_index = i;
      let date_now = parseInt(new Date() / 1000);

      liquidity.is_reward_expired =
        liquidity.expiry_date < date_now ? true : false;

      unclaimed_round_info.push(liquidity);
    }

    // let unclaimed_round = [];

    // for (let i = 0; i < 20; i++) {
    //   unclaimed_round.push({ round_index: i });
    // }

    setUnclaimedRoundsLiq(unclaimed_round_info);
  }

  async function fetchUserStats() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = JSON.parse(localStorage.getItem(permitName));

    let user_info = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            user_info: {},
          },
        },
      },
    });

    setuserInfo(user_info);
    let lottery_info = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        round: {},
      },
    });

    let current_liquidity = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            liquidity: { round_index: lottery_info.current_round_index },
          },
        },
      },
    });
    setLiquidity(current_liquidity);
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
            withdrawable: {},
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

  async function fetchUserWinningRecords() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let permitName = `Query_Permit_${contract_address}_${address}`;

    let permit = JSON.parse(localStorage.getItem(permitName));

    // now fetch the balance here lol
    let records = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        with_permit: {
          permit,
          query: {
            records: {},
          },
        },
      },
    });

    //fetching last 10 records only
    let page_number;
    let page_size = 5;
    if (records.len > page_size) {
      let extra = records.len % page_size;
      let start_page = parseInt(records.len / page_size) - 1;
      let end_page;
      if (extra > 0) {
        end_page = start_page + 1;
      } else {
        end_page = start_page;
      }

      let result_vec = [];
      for (let i = start_page; i <= end_page; i++) {
        let rec = await secretjs.query.compute.queryContract({
          contractAddress: contract_address,
          codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
          query: {
            with_permit: {
              permit,
              query: {
                records: { start_page: i, page_size },
              },
            },
          },
        });
        result_vec = result_vec.concat(rec.vec);
        setWinningRecords(result_vec.reverse());
      }

      // setWinningRecords(result_vec.reverse());
    } else {
      setWinningRecords(records.vec.reverse());
    }
  }

  async function claim_rewards() {
    const { secretjs, address } = wallet;

    let contractAddress = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;
    let codeHash = process.env.REACT_APP_POOL_CONTRACT_HASH;

    // let gasLimit =

    try {
      const tx = await secretjs.tx.compute.executeContract(
        {
          sender: address,
          contractAddress: contractAddress,
          codeHash: codeHash, // optional but way faster
          msg: {
            claim_rewards: {},
          },
        },
        {
          gasLimit: 4240297,
        }
      );

      if (tx.jsonLog) {
        Notifications(
          "success",
          "Transaction sent!",
          `Successfully claim rewards
        Txhash: ${tx.transactionHash}`
        );
      } else {
        Notifications("error", "ERROR", tx.rawLog);
      }
    } catch (e) {
      Notifications("error", "ERROR", e);
    }

    await claimRewardsCallback();
  }

  async function fetchTimer() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    // now fetch the balance here lol
    let lottery_info = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        round: {},
      },
    });

    setLotteryInfo(lottery_info);

    let date_now = parseInt(new Date() / 1000);

    if (date_now < lottery_info.end_time) {
      let date_future = lottery_info.end_time;
      // get total seconds between the times
      var delta = Math.abs(date_future - date_now);

      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      // var seconds = delta % 60;

      let timer = { days: days, hours: hours, mins: minutes };

      setTimer(timer);
    } else {
      let timer = { days: 0, hours: 0, mins: 0 };

      setTimer(timer);
    }
    setTimeout(() => {
      fetchTimer();
    }, 60 * 1000);
  }

  async function depositCallback() {
    await fetchDelegated();
    await fetchUserStats();
  }

  async function unbondingCallback() {
    await fetchDelegated();
    await fetchUnbondings();
  }

  async function withdrawCallback() {
    await fetchWithdrawable();
    await fetchUnbondings();
  }

  async function claimRewardsCallback() {
    await fetchLiquidity();
    await fetchUserWinningRecords();
  }

  function winningRecordsCallback(record) {
    winningRecordsToggle();
    setSelectedWinningRecord(record);
  }

  const [pageTable1, setPageTable1] = useState(1);
  const [pageTable2, setPageTable2] = useState(1);
  const [pageTable3, setPageTable3] = useState(1);

  // pagination setup
  const resultsPerPage = 5;

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);
  const [dataTable3, setDataTable3] = useState([]);

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  function onPageChangeTable3(p) {
    setPageTable3(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(
      unclaimedRoundsLiq.slice(
        (pageTable1 - 1) * resultsPerPage,
        pageTable1 * resultsPerPage
      )
    );
  }, [pageTable1, unclaimedRoundsLiq]);

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(
      winningRecords.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2, winningRecords]);

  useEffect(() => {
    setDataTable3(
      unbondings.slice(
        (pageTable3 - 1) * resultsPerPage,
        pageTable3 * resultsPerPage
      )
    );
  }, [pageTable3, unbondings]);

  return (
    <div>
      <div className=" grid grid-cols-7 mt-4 grid-parent ">
        <div
          className="col-span-2 p-4 account_deposit_card mr-1"
          style={{ background: "linear-gradient(to right,#9A47B9, #4D2D9F)" }}
        >
          <div className="flex flex-row  account_deposit_title">Deposits</div>
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
              {delegated == null ? (
                <div>Loading...</div>
              ) : (
                <div className="flex flex-row justify-start items-end">
                  <span className="account_deposit_amount mr-1">
                    {(delegated / 1e6).toFixed(2)}
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

            <div className="flex flex-col w-full items-end justify-between ">
              <div>
                <div className="flex flex-row items-center justify-start ">
                  <span className="">
                    <img
                      src={gift}
                      alt="LOGO Image"
                      className="img-fluid logo-size"
                    />
                  </span>

                  <span className=" ml-4 ">
                    <div className="account_time_font">
                      in {timer.days}d ,{timer.hours}h ,{timer.mins}m{" "}
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex flex-row w-full items-center justify-center">
                <div className="btn account_reduce_stakes_withdraw_button   m-1 self-center">
                  <Button
                    className="btn account_reduce_stakes_withdraw_button  self-center"
                    onClick={claim_rewards}
                  >
                    Claim Rewards
                  </Button>
                </div>
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
                    type={"user"}
                  />
                </div>
                <div className="btn account_reduce_stakes_withdraw_button   m-1">
                  <Button
                    className="btn account_reduce_stakes_withdraw_button  self-center"
                    onClick={unbondToggle}
                    disabled={
                      delegated == null || delegated == 0 ? true : false
                    }
                  >
                    Unbond
                  </Button>
                  <UnbondingModal
                    isShowing={isUnbondModalShowing}
                    hide={unbondToggle}
                    callback={unbondingCallback}
                    delegated={delegated}
                    type={"user"}
                  />
                </div>
                <div className="btn account_reduce_stakes_withdraw_button   m-1">
                  <Button
                    className="btn account_deposit_button  self-center"
                    onClick={depositToggle}
                  >
                    Deposit
                  </Button>
                  <DepositModal
                    isShowing={isDepositModalShowing}
                    hide={depositToggle}
                    callback={depositCallback}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-6 p-6 bg-primary2 text-white account_deposit_card">
        <div className=" text-2xl ">User Stats</div>
        <div className=" border"></div>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow className="bg-primary2">
                <TableCell>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold ml-2">
                      Amount Withdrawable
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm justify-self-end">
                    {(withdrawable / 1e6).toFixed(2)} SCRT
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="bg-primary2">
                <TableCell>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold ml-2">Ticket Price</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm justify-self-end">
                    {lotteryInfo
                      ? (lotteryInfo.ticket_price / 1e6).toFixed(2)
                      : 0}{" "}
                    SCRT
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="bg-primary2">
                <TableCell>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold ml-2">
                      User Tickets / Total Tickets
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm justify-self-end">
                    {liquidity ? liquidity.user_tickets : 0} /{" "}
                    {liquidity ? liquidity.total_tickets : 0} {" ("}
                    {liquidity
                      ? (
                          ((liquidity.user_tickets
                            ? liquidity.user_tickets
                            : 0) /
                            (liquidity.total_tickets != 0
                              ? liquidity.total_tickets
                              : 1)) *
                          100
                        ).toFixed(2)
                      : 0}
                    %{") "}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="bg-primary2">
                <TableCell>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold ml-2">
                      Last round claimed
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm justify-self-end">
                    {userInfo
                      ? userInfo.last_claim_rewards_round
                        ? userInfo.last_claim_rewards_round
                        : "-"
                      : 0}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="bg-primary2">
                <TableCell>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold ml-2">Current Round</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm justify-self-end">
                    {lotteryInfo ? lotteryInfo.current_round_index : 0}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="flex flex-col mt-6 p-6 bg-primary2 text-white account_deposit_card">
        <div className=" text-2xl ">User Liquidity</div>
        <div className=" border"></div>
        <div className="flex flex-row justify-between">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow className="bg-primary2 items-center justify-center text-white">
                  <TableCell>Round</TableCell>
                  <TableCell>Total Tickets</TableCell>
                  <TableCell>Tickets Used</TableCell>
                  <TableCell>Rewards Expired ?</TableCell>
                  <TableCell>Total Rewards</TableCell>
                  <TableCell>Unclaimed Rewards</TableCell>
                </TableRow>
              </TableHeader>
              {unclaimedRoundsLiq ? (
                <TableBody>
                  {dataTable1.map((value, index) => {
                    return (
                      <TableRow key={index} className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">{value.round_index}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="font-semibold ml-2">
                              {value.user_tickets}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="font-semibold ml-2">
                              {value.tickets_used}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center text-sm">
                            {value.is_reward_expired ? (
                              <Badge type="success">Yes</Badge>
                            ) : (
                              <Badge type="danger">NO</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="font-semibold ml-2">
                              {(value.total_rewards / 1e6).toFixed(6)} SCRT
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="font-semibold ml-2">
                              {(value.unclaimed_rewards / 1e6).toFixed(6)} SCRT
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
            <TableFooter>
              <Pagination
                totalResults={unclaimedRoundsLiq.length}
                resultsPerPage={5}
                onChange={onPageChangeTable1}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
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
            <TableFooter>
              <Pagination
                totalResults={unbondings.length}
                resultsPerPage={5}
                onChange={onPageChangeTable2}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </div>
      </div>
      <div className="flex flex-col mt-6 p-6 bg-primary2 text-white account_deposit_card">
        <div className=" text-2xl ">User Winnings</div>
        <div className=" border"></div>
        <div className="flex flex-row justify-between">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow className="bg-primary2 items-center justify-center text-white">
                  <TableCell>Round</TableCell>
                  <TableCell>Total Winnings</TableCell>
                  <TableCell>Tikcets</TableCell>
                  <TableCell>Ticket Price</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHeader>
              {winningRecords ? (
                <TableBody>
                  {dataTable2.map((value, index) => {
                    return (
                      <TableRow key={index} className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">{value.round}</span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {(value.total_amount_won / 1e6).toFixed(2)} SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{value.tickets}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(value.ticket_price / 1e6).toFixed(2)} SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            className="btn account_reduce_stakes_withdraw_button  self-center"
                            onClick={() =>
                              winningRecordsCallback(value.rewards_per_tier)
                            }
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {isWinningRecordsShowing ? (
                    <WinningRecordModal
                      isShowing={isWinningRecordsShowing}
                      hide={winningRecordsToggle}
                      rewardsPerTier={selectedWinningRecord}
                    />
                  ) : null}
                </TableBody>
              ) : (
                <TableBody></TableBody>
              )}
            </Table>
            <TableFooter>
              <Pagination
                totalResults={winningRecords ? winningRecords.length : 0}
                resultsPerPage={5}
                onChange={onPageChangeTable2}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default UserView;
