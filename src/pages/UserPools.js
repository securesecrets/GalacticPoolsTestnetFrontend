import React, { useState, useEffect } from "react";

import PoolCard from "../components/Cards/PoolCard";
import RoundIcon from "../components/RoundIcon";
import { MoneyIcon } from "../icons";
import UserPoolDetails from "./UserPoolDetails";
import { setupKeplr } from "../components/CryptoComponents/client";

function UserPools() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     pool_id: null,
  //     timer: {
  //       days: "-",
  //       hours: "-",
  //       mins: "-",
  //     },
  //     wallet: { secretjs: null, address: null },
  //   };
  //   this.setViewStatus = this.setViewStatus.bind(this);
  // }
  // setViewStatus = (param) => {
  //   this.setState({ pool_id: param });
  // };
  const [timer, setTimer] = useState({
    day1: 0,
    day2: 0,
    hour1: 0,
    hour2: 0,
    min1: 0,
    min2: 0,
    sec1: 0,
    sec2: 0,
  });
  let [wallet, setWallet] = useState({ secretjs: null, address: null });
  let [poolId, setPoolId] = useState(null);
  let [lotteryInfo, setLotteryInfo] = useState(null);

  async function setupKeplrfun() {
    const { secretjs, address } = await setupKeplr();
    setWallet({ secretjs, address });
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

    // lottery_info.end_time = parseInt(new Date() / 1000) + 590;

    setLotteryInfo(lottery_info);
  }
  useEffect(() => {
    if (wallet.secretjs == null || wallet.address == null) {
      setupKeplrfun();
    }

    if (wallet.secretjs != null || wallet.address != null) {
      fetchTimer();
    }
  }, [wallet]);
  return (
    <div>
      {!poolId ? (
        <div
          className="grid gap-6 mt-8 mb-8 md:grid-cols-1 xl:grid-cols-1"
          onClick={() => setPoolId("scrt")}
        >
          <PoolCard
            title="Approximate Prize"
            value="$50,000"
            setViewStatus={setPoolId}
            end_time={lotteryInfo ? lotteryInfo.end_time : Date.now() / 1000}
            duration={lotteryInfo ? lotteryInfo.duration : 0}
          >
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-purple-100 dark:bg-purple-500"
              className="mr-4"
            />
          </PoolCard>
        </div>
      ) : (
        <div>
          <UserPoolDetails setViewStatus={setPoolId} />
        </div>
      )}
    </div>
  );
}

export default UserPools;
