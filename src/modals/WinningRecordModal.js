import React from "react";
import Modal from "react-modal";

import ReactDOM from "react-dom";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@windmill/react-ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "35%",
    height: "40%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0f4d4a",
    borderRadius: "1%",
    // padding: "2%",
  },
};

function WinningRecordModal(props) {
  async function clearfields() {
    props.hide();
  }
  const WinningModal = ({ isShowing, hide, rewardsPerTier }) =>
    isShowing
      ? ReactDOM.createPortal(
          <React.Fragment>
            <Modal
              isOpen={isShowing}
              onRequestClose={hide}
              contentLabel="Example Modal"
              style={customStyles}
              ariaHideApp={false}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="">
                      <span className="deposit-modal-heading">
                        Winning Record
                      </span>
                    </div>
                    <div className="btn-close white">
                      <button
                        type="Button"
                        className="btn-close white"
                        aria-label="Close"
                        onClick={clearfields}
                      ></button>
                    </div>
                  </div>
                </div>
                <TableContainer>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary2 items-center justify-between text-white">
                        <TableCell>Tier</TableCell>
                        <TableCell>Total Winnings</TableCell>
                        <TableCell>Winnings Per Match</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">0</span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_0.num_of_rewards_claimed / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_0.reward_per_match / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">1</span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_1.num_of_rewards_claimed / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_1.reward_per_match / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">2</span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_2.num_of_rewards_claimed / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_2.reward_per_match / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">3</span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_3.num_of_rewards_claimed / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_3.reward_per_match / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">4</span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_4.num_of_rewards_claimed / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_4.reward_per_match / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-primary2">
                        <TableCell>
                          <span className="text-sm">5</span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_5.num_of_rewards_claimed / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(
                              rewardsPerTier.tier_5.reward_per_match / 1e6
                            ).toFixed(6)}{" "}
                            SCRT
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Modal>
          </React.Fragment>,
          document.body
        )
      : null;
  return (
    <WinningModal
      isShowing={props.isShowing}
      hide={props.hide}
      rewardsPerTier={props.rewardsPerTier}
    />
  );
}

export default WinningRecordModal;
