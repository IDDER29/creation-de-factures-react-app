import React, { Component } from "react";
import AddNewClientModal from "./add-new-client";
import mainData from "./main-data"; // Correctly import mainData

class SelectClient extends Component {
  state = {
    showModal: false,
    clientOptions: mainData.clients.map((client) => {
      return { value: client.fullName, id: client.id };
    }),
    selectedClient: "",
  };

  handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "Add New Client") {
      this.setState({ showModal: true });
    } else {
      this.setState({
        selectedClient: selectedOption,
      });
    }
  };

  updateClientOptions = (newClientName, id) => {
    const newClient = { value: newClientName, id };
    this.setState((prevState) => ({
      clientOptions: [...prevState.clientOptions, newClient],
      selectedClient: id,
    }));
  };

  render() {
    const { showModal, clientOptions } = this.state;

    return (
      <div>
        <label htmlFor="client-options">Client Options:</label>
        <select
          id="client-options"
          value={this.state.selectedClient}
          onChange={this.handleOptionChange}
          required
        >
          <option value="">Select Option</option>
          {clientOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          ))}
          <option value="Add New Client">Add New Client</option>
        </select>
        {showModal && (
          <AddNewClientModal
            clientOptions={clientOptions}
            onClose={() => this.setState({ showModal: false })}
            updateClientOptions={this.updateClientOptions}
          />
        )}
      </div>
    );
  }
}

export default SelectClient;
