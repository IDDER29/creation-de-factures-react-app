import React, { Component } from "react";
import DetailsTable from "./details-table";
import mainData from "./main-data";

class TableOfData extends Component {
  state = {
    invoices: mainData.invoices.map((invoice) => invoice),
  };

  showDetails = (index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { invoices, selectedIndex } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Client Name</th>
            <th>Montant HT</th>
            <th>TVA</th>
            <th>Montant TTC</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.clientName}</td>
              <td>{invoice.totalHT}</td>
              <td>{invoice.TVA}</td>
              <td>{invoice.totalTTC}</td>
              <td>
                <button onClick={() => this.showDetails(index)}>Show</button>
                {selectedIndex === index && (
                  <DetailsTable invoiceDetails={invoice.details} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TableOfData;
