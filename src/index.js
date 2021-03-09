import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "./config/client-graphql";
import Dashboard from "./Dashboard";
ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <Dashboard />
      <ToastContainer />
    </ApolloProvider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
