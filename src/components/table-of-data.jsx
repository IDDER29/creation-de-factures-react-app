import React, { Component } from "react";
import DetailsTable from "./details-table";
class TableOfData extends Component {
  state = {
    invoices: [
      {
        id: 1,
        clientName: "John Doe",
        amountHT: 100,
        VAT: 20,
        amountTTC: 120,
        details: [
          { description: "Item 1", quantity: 2, price: 50 },
          { description: "Item 2", quantity: 1, price: 60 },
        ],
      },
      {
        id: 2,
        clientName: "Jane Smith",
        amountHT: 50,
        VAT: 10,
        amountTTC: 60,
        details: [
          { description: "Item 3", quantity: 1, price: 10 },
          { description: "Item 4", quantity: 2, price: 20 },
        ],
      },
    ],
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
              <td>{invoice.amountHT}</td>
              <td>{invoice.VAT}</td>
              <td>{invoice.amountTTC}</td>
              <td>
                <button onClick={() => this.showDetails(index)}>Show</button>
                {selectedIndex === index && <DetailsTable invoice={invoice} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TableOfData;
