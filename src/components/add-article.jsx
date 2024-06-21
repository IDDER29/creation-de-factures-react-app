import React, { Component } from "react";
import ArticleTableRow from "./article-table-row";

class AddArticle extends Component {
  state = {
    products: this.props.products,
    selectedProducts: [],
    totalPrice: 0,
    articleKeys: [], // Array to store unique keys for articles
  };

  handleProductChange = (updatedProduct) => {
    this.setState((prevState) => {
      const selectedProducts = [...prevState.selectedProducts];
      const existingIndex = selectedProducts.findIndex(
        (product) => product.id === updatedProduct.id
      );

      if (existingIndex !== -1) {
        selectedProducts[existingIndex] = updatedProduct;
      } else {
        selectedProducts.push(updatedProduct);
      }

      return { selectedProducts };
    }, this.updateTotalPrice);
  };

  handleAddArticle = () => {
    const newKey = new Date().getTime(); // Unique key for the new article
    this.setState((prevState) => ({
      articleKeys: [...prevState.articleKeys, newKey],
    }));
  };

  handleDeleteArticle = (key, index) => {
    this.setState((prevState) => {
      const updatedArticleKeys = prevState.articleKeys.filter((k) => k !== key);
      const updatedSelectedProducts = prevState.selectedProducts.filter(
        (product, i) => i !== index
      );
      return {
        selectedProducts: updatedSelectedProducts,
        articleKeys: updatedArticleKeys,
      };
    });
  };

  updateTotalPrice = () => {
    const total = this.state.selectedProducts.reduce((sum, product) => {
      const selectedProduct = this.state.products.find(
        (p) => p.id === product.id
      );
      if (selectedProduct) {
        const { unitPrice } = selectedProduct;
        const discount = this.getDiscount(selectedProduct, product.quantity);
        return sum + unitPrice * (1 - discount) * product.quantity;
      }
      return sum;
    }, 0);
    this.setState({ totalPrice: total.toFixed(2) });
  };

  getDiscount = (product, quantity) => {
    const discount = product.discounts.find((discount) =>
      discount.maxQuantity
        ? discount.minQuantity <= quantity && discount.maxQuantity >= quantity
        : discount.minQuantity <= quantity
    );
    return discount ? discount.discount : 0;
  };

  render() {
    const { products, selectedProducts, totalPrice, articleKeys } = this.state;
    return (
      <div className="container">
        <button onClick={this.handleAddArticle}>+ Add Article</button>
        <h1 className="title">Article Table</h1>
        <div className="table-header">
          <div>Article</div>
          <div>Quantity</div>
          <div>Price per Item</div>
          <div>Discount</div>
          <div>Total Amount</div>
        </div>
        {articleKeys.map((key, index) => (
          <ArticleTableRow
            key={key}
            products={products}
            selectedProducts={selectedProducts}
            onSelectProductChange={this.handleProductChange}
            onDelete={() => this.handleDeleteArticle(key, index)}
          />
        ))}
        <div className="table-row">
          <div>Total Price</div>
          <div>---</div>
          <div>---</div>
          <div>---</div>
          <div>{totalPrice}</div>
        </div>
        <button
          onClick={() => {
            if (articleKeys.length > 0) {
              this.handleDeleteArticle(articleKeys[articleKeys.length - 1]);
            }
          }}
        >
          Delete last article
        </button>
        <button
          onClick={() => {
            console.log(this.state.selectedProducts);
          }}
        >
          Show the selected articles
        </button>
      </div>
    );
  }
}

export default AddArticle;
