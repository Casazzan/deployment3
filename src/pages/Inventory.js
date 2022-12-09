import React, { useState } from "react";
import InventoryTabs from "../components/InventoryTabs";
import { Component } from "react";
import Sidebar from "../components/Sidebar";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  getSummary = () => {
    fetch("https://panda-express-deployment-3.onrender.com/inventory/summary")
      .then((res) => res.text())
      .then((res) =>
        this.setState({ apiResponse: res }, () => console.log(res))
      );
  };
  getItemPrice = () => {
    fetch("https://panda-express-deployment-3.onrender.com/inventory/summary")
      .then((res) => res.text())
      .then((res) =>
        this.setState({ apiResponse: res }, () => console.log(res))
      );
  };
  render() {
    return (
      <div>
        <Sidebar />
        <div className="Right">
          <InventoryTabs />
          <p className="App-intro">{this.state.apiResponse}</p>
        </div>
      </div>
    );
  }
}

export default Inventory;
