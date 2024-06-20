import React, { Component } from "react";

class InputId extends Component {
  state = {};

  render() {
    return (
      <>
        <label for="factureId">Facture ID:</label>
        <input
          type="number"
          id="factureId"
          placeholder="Facture ID"
          required
        ></input>
      </>
    );
  }
}

export default InputId;
