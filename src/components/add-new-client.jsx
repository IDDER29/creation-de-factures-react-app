import React, { Component } from "react";
import "../add-new-client-modal.css";
import mainData from "./main-data"; // Correctly import mainData

class AddNewClientModal extends Component {
  state = {
    fullName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    stateProvince: "",
    zipCode: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmitClientForm = (event) => {
    event.preventDefault();
    const isExist = this.props.clientOptions.some(
      (element) => element.value === this.state.fullName
    );
    if (isExist) return alert("Client already exists");

    const {
      fullName,
      email,
      phoneNumber,
      street,
      city,
      country,
      stateProvince,
      zipCode,
    } = this.state;
    const id = mainData.clients.length + 1;
    const newClient = {
      id,
      fullName,
      email,
      phoneNumber,
      address: {
        street,
        city,
        country,
        stateProvince,
        zipCode,
      },
    };

    mainData.clients = [...mainData.clients, newClient];
    this.props.updateClientOptions(newClient.fullName, id);

    this.setState({
      fullName: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
      country: "",
      stateProvince: "",
      zipCode: "",
    });

    this.props.onClose();
  };

  render() {
    return (
      <div className="modal">
        <form>
          <div className="close-icon" onClick={this.props.onClose}>
            &times;
          </div>
          <div className="modal-field">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={this.state.fullName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="flex">
            <div className="modal-field">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="modal-field">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="modal-field">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={this.state.street}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="modal-field">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="modal-field">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={this.state.country}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="modal-field">
              <label htmlFor="stateProvince">State/Province:</label>
              <input
                type="text"
                id="stateProvince"
                name="stateProvince"
                value={this.state.stateProvince}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="modal-field">
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={this.state.zipCode}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <button type="button" onClick={this.handleSubmitClientForm}>
            Add Client
          </button>
        </form>
      </div>
    );
  }
}

export default AddNewClientModal;
