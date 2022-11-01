import React, { useState } from "react";
import SponsorView from "./SponsorView";
function SponsorPoolDetails(props) {
  return (
    <div>
      <div>
        <button
          onClick={(event) => props.setViewStatus(null)}
          className="text-white hover:text-gray-400"
        >
          Go Back
        </button>
        <SponsorView />
      </div>
    </div>
  );
}

export default SponsorPoolDetails;
