import React, { Component } from "react";
import "../add-new-client-modal.css";

class AddNewClientModal extends Component {
  state = {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
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
    console.log(this.state);
    const isExist = this.props.clientOptions.includes(this.state.fullName);
    if (isExist) return alert("Client already exist");
    this.props.clientOptions.push(this.state.fullName);
    this.setState({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      address: "",
      city: "",
      country: "",
      stateProvince: "",
      zipCode: "",
    });
  };

  render() {
    return (
      <div className="modal">
        <form onSubmit={(event) => this.handleSubmitClientForm(event)}>
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
              <label htmlFor="emailAddress">Email Address:</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={this.state.emailAddress}
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
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={this.state.address}
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

          <button type="submit">Add Client</button>
        </form>
      </div>
    );
  }
}

export default AddNewClientModal;
