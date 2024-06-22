import React, { Component } from "react";

class InputDate extends Component {
  state = {};

  render() {
    return (
      <div>
        <label for="date">Date:</label>
        <input type="date" id="date" required></input>
      </div>
    );
  }
}

export default InputDate;
