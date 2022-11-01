import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@windmill/react-ui";
import logo from "../../assets/img/scrt_logo.png"; // with import
import { setupKeplr } from "../CryptoComponents/client";
import axios from "axios";

import "../../main.css";
function PoolCard({
  title,
  value,
  children: icon,
  setViewStatus,
  end_time,
  duration,
}) {
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
  let [endTime, setEndTime] = useState(Date.now() / 1000);
  let [wallet, setWallet] = useState({ secretjs: null, address: null });
  let [currentRewards, setCurrentRewards] = useState("$ 0");

  useEffect(() => {
    let isMounted = true;
    if (wallet.secretjs == null || wallet.address == null) {
      if (isMounted) {
        setupKeplrfun();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [wallet]);

  useEffect(() => {
    let isMounted = true;

    if (wallet.secretjs != null || wallet.address != null) {
      if (isMounted) {
        calculatePrize();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [duration]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchTimer();
    }
    return () => {
      isMounted = false;
    };
  }, [end_time]);

  function fetchTimer() {
    let date_now = parseInt(new Date() / 1000);

    if (date_now < end_time) {
      let date_future = end_time;
      // get total seconds between the times
      var delta = Math.abs(date_future - date_now);

      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      let day1 = Math.floor(days / 10);
      let day2 = Math.floor(days % 10);

      delta -= days * 86400;

      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      let hour1 = Math.floor(hours / 10);
      let hour2 = Math.floor(hours % 10);
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      let min1 = Math.floor(minutes / 10);
      let min2 = Math.floor(minutes % 10);
      delta -= minutes * 60;

      // what's left is seconds
      var seconds = delta % 60;
      let sec1 = Math.floor(seconds / 10);
      let sec2 = Math.floor(seconds % 10);
      let timer = {
        day1,
        day2,
        hour1,
        hour2,
        min1,
        min2,
        sec1,
        sec2,
      };

      setTimer(timer);
    }
    setTimeout(() => {
      fetchTimer();
    }, 1 * 1000);
  }

  async function setupKeplrfun() {
    const { secretjs, address } = await setupKeplr();
    setWallet({ secretjs, address });
  }

  async function calculatePrize() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    // now fetch the balance here lol
    let current_rewards = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        current_rewards: {},
      },
    });
    // current_rewards.amount = 4000;

    let date_now = parseInt(new Date() / 1000);
    let price;

    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=secret&vs_currencies=usd"
      )
      .then((response) => (price = response.data["secret"].usd));

    if (date_now < end_time) {
      let time_spend = duration - (end_time - date_now);

      let prize = Math.ceil(
        (((current_rewards.rewards / 1e6) * duration) / time_spend) * price
      );
      setCurrentRewards(`$ ${prize}`);
    } else {
      let prize = Math.ceil((current_rewards.rewards / 1e6) * price);

      setCurrentRewards(`$ ${prize}`);
    }
  }

  return (
    <Card
      onClick={(event) => setViewStatus("scrt")}
      className="btn"
      style={{ cursor: "pointer" }}
    >
      <CardBody className=" flex flex-row items-center justify-between dark:bg-primary2 ">
        <div className="flex flex-row ">
          <img src={logo} alt="LOGO Image" className="img-fluid logo-size" />
          <p className="text-sm  flex items-center font-semibold text-gray-600 dark:text-white">
            SCRT
          </p>
        </div>
        <div className="flex flex-col items-center justify-between ">
          <div className="mb-2 prize_amount  ">{currentRewards}</div>
          <div className="text-lg font-semibold text-gray-700 dark:text-white">
            {title}
          </div>
        </div>
        <div>
          <div className="flex flex-row  justify-between">
            <div className="flex flex-col justify-center">
              <div className="p-2">
                <span className="p-2 m-1 date_digit">{timer.day1}</span>
                <span className="p-2 m-1 date_digit">{timer.day2}</span>
              </div>
              <div className="flex justify-center">
                <span className="date_title">DAY</span>
              </div>
            </div>
            <div className="flex flex-col item-center justify-start">
              <div className="p-2">
                <span className="colon">:</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-2">
                <span className="p-2 m-1 date_digit">{timer.hour1}</span>
                <span className="p-2 m-1 date_digit">{timer.hour2}</span>
              </div>
              <div className="flex justify-center">
                <span className="date_title">HR</span>
              </div>
            </div>

            <div className="flex flex-col item-center justify-start">
              <div className="p-2">
                <span className="colon">:</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-2">
                <span className="p-2 m-1 date_digit">{timer.min1}</span>
                <span className="p-2 m-1 date_digit">{timer.min2}</span>
              </div>
              <div className="flex justify-center">
                <span className="date_title">MIN</span>
              </div>
            </div>

            <div className="flex flex-col item-center justify-start">
              <div className="p-2">
                <span className="colon">:</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-2">
                <span className="p-2 m-1 date_digit">{timer.sec1}</span>
                <span className="p-2 m-1 date_digit">{timer.sec2}</span>
              </div>
              <div className="flex justify-center">
                <span className="date_title">SEC</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PoolCard;
