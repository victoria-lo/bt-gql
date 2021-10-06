import React, { useState } from "react";
import "../App.css";
import { useLazyQuery } from "@apollo/client";
import { ID_FROM_LEGACY, NODE_SEARCH } from "../gql/Query";

export default function Search() {
  const [legacyId, setLegacyId] = useState("");
  const [legacyIdType, setLegacyIdType] = useState("CUSTOMER");
  const [graphQLId, setGraphQLId] = useState("");
  const [searchData, setSearchData] = useState(null);

  const [getIDFromLegacy, { loading, error, data }] = useLazyQuery(
    ID_FROM_LEGACY,
    {
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
        alert(error);
      }
    }
  );

  const [searchByID] = useLazyQuery(
    NODE_SEARCH,
    {
      onCompleted: (data) => {
        console.log(data);
        setSearchData(data);
      },
      onError: (error) => {
        console.log(error);
        alert(error);
      }
    }
  );

  return (
    <div style={{ marginTop: "2em" }}>
      <p>Queries</p>
      <div className="search-div">
        <div className="center">
          <p style={{ marginBottom: 0 }}>Get ID from LegacyId</p>
          <div className="input-div">
            <label htmlFor="amount" style={{ width: "174px" }}>
              <span className="input-label">LegacyId</span>
              <div>
                <input
                  type="tel"
                  value={legacyId}
                  onChange={(e) => setLegacyId(e.target.value)}
                />
              </div>
            </label>
          </div>
          <label htmlFor="amount" style={{ width: "174px", marginTop: "20px" }}>
            <span className="input-label">LegacyType</span>
            <select
              className="select"
              onChange={(e) => setLegacyIdType(e.target.value)}
              value={legacyIdType}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="TRANSACTION">Transaction</option>
              <option value="PAYMENT_METHOD">Payment Method</option>
            </select>
          </label>
          <button
            className="css-button"
            style={{ marginTop: "2rem" }}
            onClick={() => {
              getIDFromLegacy({
                variables: {
                  legacyId: legacyId,
                  legacyIdType: legacyIdType,
                },
              });
            }}
          >
            Get ID
          </button>
          {data ? <p>Result: {data.idFromLegacyId}</p> : null}
        </div>

        <div className="center">
          <p style={{ marginBottom: 0 }}>Search Data by (GraphQL) ID</p>
          <div className="input-div">
            <label htmlFor="amount" style={{ width: "174px" }}>
              <span className="input-label">GraphQL ID</span>
              <div>
                <input
                  type="tel"
                  value={graphQLId}
                  onChange={(e) => setGraphQLId(e.target.value)}
                />
              </div>
            </label>
          </div>
          <button
            className="css-button"
            style={{ marginTop: "2rem" }}
            onClick={() => {
              searchByID({
                variables: {
                  input: graphQLId,
                },
              });
            }}
          >
            Get Data
          </button>
          {searchData ? (
            <>
              <p>Result:</p>
              <pre style={{ textAlign: "left" }}>
                {JSON.stringify(searchData.node, null, 2)}
              </pre>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
