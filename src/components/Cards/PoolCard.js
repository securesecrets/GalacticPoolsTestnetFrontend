import React from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import logo from "../../assets/img/scrt_logo.png"; // with import

import "../../main.css";
function PoolCard({ title, value, children: icon, setViewStatus }) {
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
          <div className="mb-2 prize_amount  ">{value}</div>
          <div className="text-lg font-semibold text-gray-700 dark:text-white">
            {title}
          </div>
        </div>
        <div>
          <div className="flex flex-row  justify-between">
            <div className="flex flex-col justify-center">
              <div className="p-2">
                <span className="p-2 m-1 date_digit">0</span>
                <span className="p-2 m-1 date_digit">0</span>
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
                <span className="p-2 m-1 date_digit">0</span>
                <span className="p-2 m-1 date_digit">0</span>
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
                <span className="p-2 m-1 date_digit">0</span>
                <span className="p-2 m-1 date_digit">0</span>
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
                <span className="p-2 m-1 date_digit">5</span>
                <span className="p-2 m-1 date_digit">0</span>
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
