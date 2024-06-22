import React, { Component } from "react";

class InputId extends Component {
  state = {};

  render() {
    return (
      <div>
        <label for="factureId">Facture ID:</label>
        <input
          type="number"
          id="factureId"
          placeholder="Facture ID"
          required
        ></input>
      </div>
    );
  }
}

export default InputId;
