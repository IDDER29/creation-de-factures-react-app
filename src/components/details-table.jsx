import React, { Component } from "react";
import "../styles/InvoiceDetails.css";

class DetailsTable extends Component {
  invoiceDetails = this.props.invoiceDetails;
  totalHT = this.props.totalTTC;

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price per Unit</th>
              <th>Discount</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {this.invoiceDetails.map((detail) => (
              <tr key={detail.description}>
                <td>{detail.productName}</td>
                <td>{detail.quantity}</td>
                <td>{detail.unitPrice}</td>
                <td>{(detail.discount * 100).toFixed(2)}%</td>
                <td>{detail.totalHT.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total H.T.: {this.totalHT}</p>
      </div>
    );
  }
}

export default DetailsTable;
