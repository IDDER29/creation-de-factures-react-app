import React, { Component } from "react";
class DetailsTable extends Component {
  render() {
    const { invoice } = this.props;

    const totalHT = invoice.details.reduce(
      (sum, detail) =>
        sum + detail.quantity * (detail.price * (1 - detail.discount)),
      0
    );

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price per Unit</th>
              <th>Discount</th>
              <th>Price</th>
              <th>Total H.T.</th>
            </tr>
          </thead>
          <tbody>
            {invoice.details.map((detail) => (
              <tr key={detail.description}>
                <td>{detail.description}</td>
                <td>{detail.quantity}</td>
                <td>{detail.price}</td>
                <td>{detail.discount * 100}%</td>
                <td>
                  {(
                    detail.price *
                    (1 - detail.discount) *
                    detail.quantity
                  ).toFixed(2)}
                </td>
                <td>
                  {(
                    detail.quantity *
                    detail.price *
                    (1 - detail.discount)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total H.T.: {totalHT.toFixed(2)}</p>
      </div>
    );
  }
}

export default DetailsTable;
