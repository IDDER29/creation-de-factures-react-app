import React, { Component } from "react";
import InputId from "./id-input";
import InputDate from "./date-input";
import SelectClient from "./select-client";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: props.isDisabled,
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
        <form onSubmit={(e) => this.hundelSubmit(e)}>
          <div class="form-row">
            <InputId />
            <InputDate />
            <SelectClient />
            <button type="submit" disabled={this.state.isDisabled}>
              Add Facture
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default Form;
