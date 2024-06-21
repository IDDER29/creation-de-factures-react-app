import React, { Component } from "react";

class ArticleTableRow extends Component {
  state = {
    products: this.props.products.map((product) => ({
      id: product.id,
      name: product.name,
      unitPrice: product.unitPrice,
      quantity: product.quantity,
      discounts: product.discounts,
    })),
    selectedProduct: null,
    quantity: 1,
  };

  handleArticleChange = (event) => {
    const articleId = parseInt(event.target.value, 10);
    const article = this.state.products.find((item) => item.id == articleId);
    this.setState({ selectedProduct: article });
    this.props.selectedProducts.push({
      id: article.id,
      name: article.name,
      unitPrice: article.unitPrice,
      quantity: this.state.quantity,
    });
  };

  handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    this.setState({ quantity });
    this.props.selectedProducts.forEach((item) => {
      if (item.id === this.state.selectedProduct.id) {
        item.quantity = quantity;
      }
    });
  };
  calculateTotal = () => {
    const { selectedProduct, quantity } = this.state;
    if (!selectedProduct) return 0;
    const { unitPrice } = selectedProduct;
    const discount = this.getDescount();
    const price = unitPrice;
    const discountedPrice = price - price * discount;
    return discountedPrice * quantity;
  };
  getDescount = () => {
    const { selectedProduct, quantity } = this.state;
    if (!selectedProduct) return 0;
    const { discounts } = selectedProduct;
    const discount = discounts.find((discount) => {
      if (discount.maxQuantity) {
        return (
          discount.minQuantity <= quantity && discount.maxQuantity >= quantity
        );
      } else {
        return true;
      }
    });

    this.props.selectedProducts.forEach((item) => {
      if (item.id === this.state.selectedProduct.id) {
        item.discount = discount.discount;
      }
    });

    return discount.discount;
  };

  render() {
    const { products, selectedProduct, quantity } = this.state;

    return (
      <div className="table-row">
        <div>
          <select className="select" onChange={this.handleArticleChange}>
            <option value="">Select an article</option>
            {products.map((article) => (
              <option key={article.id} value={article.id}>
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
            ? `${(this.getDescount() * 100).toFixed(0)}%`
            : "N/A"}
        </div>
        <div>
          {selectedProduct ? `${this.calculateTotal().toFixed(2)}` : "N/A"}
        </div>
      </div>
    );
  }
}

export default ArticleTableRow;
