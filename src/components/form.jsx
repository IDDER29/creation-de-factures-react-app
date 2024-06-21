import React, { Component } from "react";
import InputId from "./id-input";
import InputDate from "./date-input";
import SelectClient from "./select-client";

class Form extends Component {
  state = {};

  hundelSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <>
        <form onSubmit={(e) => this.hundelSubmit(e)}>
          <div class="form-row">
            <InputId />
            <InputDate />
            <SelectClient />
            <button type="submit">Add Facture</button>
          </div>
        </form>
      </>
    );
  }
}

export default Form;
