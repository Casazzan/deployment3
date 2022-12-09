import React, { useState } from "react";
import EmployeeTabs from "../components/EmployeeTabs";
import { Component } from "react";
import Sidebar from "../components/Sidebar";
import logo from "../team52.png";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  getSummary = () => {
    fetch("https://panda-express-deployment-3.onrender.com/roster?id=2")
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
          <EmployeeTabs />
        </div>
      </div>
    );
  }
}

export default Employee;
