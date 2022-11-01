import React from "react";

import SponsorPoolCard from "../components/Cards/SponsorPoolCard";
import RoundIcon from "../components/RoundIcon";
import { MoneyIcon } from "../icons";
import SponsorPoolDetails from "./SponsorPoolDetails";

class SponsorPools extends React.Component {
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
            <SponsorPoolCard
              title="Total Sponsored "
              setViewStatus={this.setViewStatus}
            >
              <RoundIcon
                icon={MoneyIcon}
                iconColorClass="text-blue-500 dark:text-blue-100"
                bgColorClass="bg-purple-100 dark:bg-purple-500"
                className="mr-4"
              />
            </SponsorPoolCard>
          </div>
        ) : (
          <div>
            <SponsorPoolDetails setViewStatus={this.setViewStatus} />
          </div>
        )}
      </div>
    );
  }
}

export default SponsorPools;
