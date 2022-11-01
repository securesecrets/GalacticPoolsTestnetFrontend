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
  let [wallet, setWallet] = useState({ secretjs: null, address: null });
  let [currentAmountSponsored, setCurrentAmountSponsored] = useState("$ 0");

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
        calculateAmountSponsored();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [wallet]);

  async function setupKeplrfun() {
    const { secretjs, address } = await setupKeplr();
    setWallet({ secretjs, address });
  }

  async function calculateAmountSponsored() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    // now fetch the balance here lol
    let pool_state = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        pool_state: {},
      },
    });

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
        (((pool_state.total_sponsored / 1e6) * duration) / time_spend) * price
      );

      setCurrentAmountSponsored(`$ ${prize}`);
    } else {
      let prize = Math.ceil((pool_state.total_sponsored / 1e6) * price);

      setCurrentAmountSponsored(`$ ${prize}`);
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
        <div className="flex flex-col items-center justify-around ">
          <div className="mb-2 prize_amount  ">{currentAmountSponsored}</div>
          <div className="text-lg font-semibold text-gray-700 dark:text-white">
            {title}
          </div>
        </div>
        <div className="flex flex-col items-center justify-around "></div>
      </CardBody>
    </Card>
  );
}

export default PoolCard;
