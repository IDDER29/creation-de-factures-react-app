import React, { Component } from "react";
import InputId from "./id-input";
import InputDate from "./date-input";
import SelectClient from "./select-client";
import AddArticle from "./add-article.jsx";
import TableOfData from "./table-of-data.jsx";

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
        <AddArticle />
        <TableOfData />
      </>
    );
  }
}

export default Form;
