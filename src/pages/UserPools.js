import React from "react";

import PageTitle from "../components/Typography/PageTitle";
import PoolCard from "../components/Cards/PoolCard";
import RoundIcon from "../components/RoundIcon";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import UserPoolDetails from "./UserPoolDetails";
import logo from "../assets/img/scrt_logo.png"; // with import

class UserPools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pool_id: null,
    };
    this.setViewStatus = this.setViewStatus.bind(this);
  }
  setViewStatus = (param) => {
    this.setState({ pool_id: param });
  };

  render() {
    return (
      <div>
        {!this.state.pool_id ? (
          <div
            className="grid gap-6 mt-8 mb-8 md:grid-cols-1 xl:grid-cols-1"
            onClick={(event) => this.setViewStatus("scrt")}
          >
            <PoolCard
              title="Prize"
              value="$50,000"
              setViewStatus={this.setViewStatus}
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
            <UserPoolDetails setViewStatus={this.setViewStatus} />
          </div>
        )}
      </div>
    );
  }
}

export default UserPools;
