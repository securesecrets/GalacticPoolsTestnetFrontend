import React, { lazy } from "react";

import PageTitle from "../components/Typography/PageTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
const UserPools = lazy(() => import("./UserPools"));

class Pools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  setValue = (index) => {
    this.setState({
      value: index,
    });
  };
  render() {
    return (
      <div>
        <PageTitle>Pools</PageTitle>
        <Tabs
          selectedIndex={this.state.value}
          onSelect={(index) => console.log(index)}
        >
          <div className="dropMenu flex justify-end">
            <select
              className=" tabSelect  w-1/4 text-center h-10 text-m dark:text-gray-200 focus:outline-none focus:border-blue-400 dark:border-gray-600 dark:bg-gray-700 focus:shadow-outline-purple dark:focus:shadow-outline-gray dark:focus:border-gray-600 form-number leading-5"
              style={{
                border: "2px solid #ac94fa ",
                borderRadius: "5px",
                marginBottom: "2px",
              }}
              onChange={(e) => {
                this.setValue(e.target.selectedIndex);
              }}
            >
              <option value={1}>USER</option>
              <option value={2}>SPONSOR</option>
              <option value={3}>ADMIN</option>
            </select>
          </div>

          <TabList className="">
            <Tab onClick={() => this.setValue(0)}></Tab>
            <Tab onClick={() => this.setValue(1)}></Tab>
            <Tab onClick={() => this.setValue(2)}></Tab>
          </TabList>

          <div className="Panel">
            <TabPanel>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <UserPools />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                SPONSOR
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ADMIN
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Pools;
