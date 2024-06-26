import React, { Component } from "react";
import "../styles/ProductRow.css";

class ArticleTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      selectedProduct: null,
      quantity: 1,
    };
  }

  handleArticleChange = (event) => {
    const productId = parseInt(event.target.value, 10);
    const product = this.state.products.find((item) => item.id === productId);
    this.setState({ selectedProduct: product }, () => {
      this.updateParentState(); // Move the state update callback here to ensure it happens after the state is set
    });
  };

  handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    this.setState({ quantity }, this.updateParentState);
  };

  updateParentState = () => {
    const { selectedProduct, quantity } = this.state;
    const productIndex = this.props.productIndex;
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        quantity,
        discount: this.getDiscount(selectedProduct, quantity),
        totalAmount: this.calculateTotal(),
      };

      this.props.onSelectProductChange(updatedProduct, productIndex);
    }
  };

  getDiscount = (product, quantity) => {
    const discount = product.discounts.find((discount) =>
      discount.maxQuantity
        ? discount.minQuantity <= quantity && discount.maxQuantity >= quantity
        : discount.minQuantity <= quantity
    );
    return discount ? discount.discount : 0;
  };

  calculateTotal = () => {
    const { selectedProduct, quantity } = this.state;
    if (!selectedProduct) return 0;
    const { unitPrice } = selectedProduct;
    const discount = this.getDiscount(selectedProduct, quantity);
    const discountedPrice = unitPrice - unitPrice * discount;
    return discountedPrice * quantity;
  };

  render() {
    const { products, selectedProduct, quantity } = this.state;
    const { selectedProducts } = this.props;

    return (
      <div className="table-row">
        <div>
          <select
            className="select"
            onChange={this.handleArticleChange}
            value={selectedProduct ? selectedProduct.id : ""}
          >
            <option value="">Select an article</option>
            {products.map((article) => (
              <option
                key={article.id}
                value={article.id}
                disabled={selectedProducts.some((p) => p.id === article.id)}
              >
                {article.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="number"
            className="input"
            value={quantity}
            onChange={this.handleQuantityChange}
            min="1"
          />
        </div>
        <div>
          {selectedProduct ? `${selectedProduct.unitPrice.toFixed(2)}` : "N/A"}
        </div>
        <div>
          {selectedProduct
            ? `${(this.getDiscount(selectedProduct, quantity) * 100).toFixed(
                0
              )}%`
            : "N/A"}
        </div>
        <div>
          {selectedProduct ? `${this.calculateTotal().toFixed(2)}` : "N/A"}
        </div>
        <div>
          <button onClick={this.props.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

export default ArticleTableRow;
