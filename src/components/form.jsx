import React, { Component } from "react";
import InputId from "./id-input";
import InputDate from "./date-input";
import SelectClient from "./select-client";

import "../styles/Form.css";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: props.isDisabled,
      handleSubmitFacture: props.handleSubmitFacture,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isDisabled !== this.props.isDisabled) {
      this.setState({ isDisabled: this.props.isDisabled });
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.state.handleSubmitFacture}>
          <div className="form-row">
            <InputId />
            <InputDate />
            <SelectClient />
            <div>
              {" "}
              <button type="submit" disabled={this.state.isDisabled}>
                Add Facture
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Form;
