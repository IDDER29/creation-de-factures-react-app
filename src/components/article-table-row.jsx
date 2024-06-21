import React, { Component } from "react";

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
    this.setState({ selectedProduct: product }, this.updateParentState);
  };

  handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    this.setState({ quantity }, this.updateParentState);
  };

  updateParentState = () => {
    const { selectedProduct, quantity } = this.state;
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        quantity,
        discount: this.getDiscount(selectedProduct, quantity),
      };

      const updatedSelectedProducts = this.props.selectedProducts.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      );

      if (
        updatedSelectedProducts.every((item) => item.id !== updatedProduct.id)
      ) {
        updatedSelectedProducts.push(updatedProduct);
      }

      this.props.onSelectProduct(updatedSelectedProducts);
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
