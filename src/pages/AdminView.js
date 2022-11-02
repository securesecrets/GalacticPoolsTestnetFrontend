import React, { useState, useEffect } from "react";
import { setupKeplr } from "../components/CryptoComponents/client";
import Notifications from "../utils/demo/notifications.js";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";
import { HeartIcon, TrashIcon } from "../icons";
function AdminView() {
  let [wallet, setWallet] = useState({ secretjs: null, address: null });
  let [sponsorRequest, setSponsorRequest] = useState([]);

  async function setupKeplrfun() {
    const { secretjs, address } = await setupKeplr();
    setWallet({ secretjs, address });
  }
  useEffect(() => {
    if (wallet.secretjs == null || wallet.address == null) {
      setupKeplrfun();
    }

    if (wallet.secretjs != null || wallet.address != null) {
      fetchSponsorMessageRequests();
    }
  }, [wallet]);

  async function sponsorRequestDecider(sponsor, i, type) {
    let newArray = [...sponsorRequest];
    sponsor.status = type;
    newArray[i] = sponsor;
    setSponsorRequest(newArray);
  }

  async function fetchSponsorMessageRequests() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;

    let sponsor_message_request_check =
      await secretjs.query.compute.queryContract({
        contractAddress: contract_address,
        codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
        query: {
          sponsor_message_request_check: {},
        },
      });
    setSponsorRequest(sponsor_message_request_check.vec);

    let sponsors = await secretjs.query.compute.queryContract({
      contractAddress: contract_address,
      codeHash: process.env.REACT_APP_POOL_CONTRACT_HASH, // optional but way faster
      query: {
        sponsors: {},
      },
    });
    console.log(sponsors);
  }

  async function SendTxn() {
    const { secretjs, address } = wallet;

    let contract_address = process.env.REACT_APP_POOL_CONTRACT_ADDRESS;
    let codeHash = process.env.REACT_APP_POOL_CONTRACT_HASH;

    let review = [];

    for (let i = 0; i < sponsorRequest.length; i++) {
      let r = sponsorRequest[i];
      if (r.status) {
        if (r.status == "accepted") {
          review.push({ index: r.index, is_accepted: true });
        }
        if (r.status == "rejected") {
          review.push({ index: r.index, is_accepted: false });
        }
      }
    }
    try {
      let tx = await secretjs.tx.compute.executeContract(
        {
          sender: address,
          contractAddress: contract_address,
          codeHash: codeHash, // optional but way faster
          msg: {
            review_sponsors: { decisions: review },
          },
          sentFunds: [], // optional{}
        },
        {
          gasLimit: 240297,
        }
      );

      if (tx.jsonLog) {
        Notifications(
          "success",
          "Review submitted successfully!",
          ` \n 
        Txhash: ${tx.transactionHash}`
        );
      } else {
        Notifications("error", "ERROR", tx.rawLog);
      }
    } catch (err) {
      Notifications("error", "ERROR", err);
    }
    await fetchSponsorMessageRequests();
  }

  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const resultsPerPage = 10;
  useEffect(() => {
    setDataTable2(
      sponsorRequest.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2, sponsorRequest]);

  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  return (
    <div>
      <div>
        <div className="Panel mt-8">
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Address</TableCell>
                  <TableCell>Index</TableCell>

                  <TableCell>Title</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable2.map((sponsor, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm"> {sponsor.addr}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm"> {sponsor.index}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{sponsor.title}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm"> {sponsor.message}</span>
                    </TableCell>
                    <TableCell>
                      {sponsor.status ? (
                        sponsor.status == "rejected" ? (
                          <Badge type="danger">{sponsor.status}</Badge>
                        ) : (
                          <Badge type="success">{sponsor.status}</Badge>
                        )
                      ) : (
                        <Badge type="primary">pending</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                          onClick={() => {
                            sponsorRequestDecider(sponsor, i, "accepted");
                          }}
                        >
                          <HeartIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Delete"
                          onClick={() => {
                            sponsorRequestDecider(sponsor, i, "rejected");
                          }}
                        >
                          <TrashIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={sponsorRequest ? sponsorRequest.length : 0}
                resultsPerPage={resultsPerPage}
                onChange={onPageChangeTable2}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
          <div className="flex justify-end pr-3">
            <Button onClick={() => SendTxn()}>Send txn</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// const DataTable = ({ sponsorRequest }) => (
//   <TableContainer className="mb-8">
//     <Table>
//       <TableHeader>
//         <tr>
//           <TableCell>Title</TableCell>
//           <TableCell>Message</TableCell>
//           <TableCell>Status</TableCell>
//           <TableCell>Actions</TableCell>
//         </tr>
//       </TableHeader>
//       <TableBody>
//         {dataTable2.map((sponsor, i) => (
//           <TableRow key={i}>
//             <TableCell>
//               <div className="flex items-center text-sm">
//                 <div>
//                   <p className="font-semibold">{sponsor.title}</p>
//                   <p className="text-xs text-gray-600 dark:text-gray-400">
//                     {sponsor.job}
//                   </p>
//                 </div>
//               </div>
//             </TableCell>
//             <TableCell>
//               <span className="text-sm">$ {sponsor.message}</span>
//             </TableCell>
//             <TableCell>
//               <Badge type="primary">LOL</Badge>
//             </TableCell>

//             <TableCell>
//               <div className="flex items-center space-x-4">
//                 <Button layout="link" size="icon" aria-label="Edit">
//                   <EditIcon className="w-5 h-5" aria-hidden="true" />
//                 </Button>
//                 <Button layout="link" size="icon" aria-label="Delete">
//                   <TrashIcon className="w-5 h-5" aria-hidden="true" />
//                 </Button>
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//     <TableFooter>
//       <Pagination
//         totalResults={sponsorRequest.len}
//         resultsPerPage={resultsPerPage}
//         onChange={onPageChangeTable2}
//         label="Table navigation"
//       />
//     </TableFooter>
//   </TableContainer>
// );
export default AdminView;
