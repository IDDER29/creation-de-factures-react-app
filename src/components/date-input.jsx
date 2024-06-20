import React, { Component } from "react";

class InputDate extends Component {
  state = {};

  render() {
    return (
      <>
        <label for="date">Date:</label>
        <input type="date" id="date" required></input>
      </>
    );
  }
}

export default InputDate;
