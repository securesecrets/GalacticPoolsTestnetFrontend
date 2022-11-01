import React, { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UserView from "./UserView";
function UserPoolDetails(props) {
  const [value, setValue] = useState(0);

  return (
    <div>
      <div>
        <button
          onClick={(event) => props.setViewStatus(null)}
          className="text-white hover:text-gray-400"
        >
          Go Back
        </button>

        <div className="Panel">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <UserView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPoolDetails;
