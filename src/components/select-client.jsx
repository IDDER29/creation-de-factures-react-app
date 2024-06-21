import React, { Component, useState } from "react";
import AddNewClientModal from "./add-new-client";
import mainData from "./main-data";

class SelectClient extends Component {
  state = {
    showModal: false,
    clientOptions: mainData.clients.map((client) => client.fullName),
  };

  handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "Add New Client") {
      this.setState({ showModal: true });
    }
  };

  render() {
    const { showModal, clientOptions } = this.state;

    return (
      <div>
        <label htmlFor="client-options">Client Options:</label>
        <select id="client-options" onChange={this.handleOptionChange} required>
          <option value="">Select Option</option>
          {clientOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value="Add New Client">Add New Client</option>
        </select>
        {showModal && (
          <AddNewClientModal
            clientOptions={this.state.clientOptions}
            onClose={() => this.setState({ showModal: false })}
          />
        )}
      </div>
    );
  }
}

export default SelectClient;
