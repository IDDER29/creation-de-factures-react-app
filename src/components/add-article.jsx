import React, { Component } from "react";
import ArticleTableRow from "./article-table-row";

class AddArticle extends Component {
  state = {
    products: this.props.products,
    selectedProducts: this.props.selectedProducts,
    totalPrice: 0,
  };

  handleProductChange = (selectedProducts) => {
    this.setState({ selectedProducts }, this.updateTotalPrice);
    this.props.onSelectProduct(selectedProducts);
  };

  handleAddArticle = () => {
    const newArticleId = this.state.selectedProducts.length
      ? this.state.selectedProducts[this.state.selectedProducts.length - 1].id +
        1
      : 1;
    const newArticle = {
      id: newArticleId,
    };
    this.setState(
      (prevState) => ({
        selectedProducts: [...prevState.selectedProducts, newArticle],
      }),
      this.updateTotalPrice
    );
  };

  handleDeleteArticle = (id) => {
    this.setState((prevState) => {
      const updatedSelectedProducts = prevState.selectedProducts.filter(
        (product) => product.id !== id
      );
      return {
        selectedProducts: updatedSelectedProducts,
      };
    }, this.updateTotalPrice);
  };

  updateTotalPrice = () => {
    const total = this.state.selectedProducts.reduce((sum, product) => {
      const selectedProduct = this.state.products.find(
        (p) => p.id === product.id
      );
      if (selectedProduct) {
        const { unitPrice, discount } = selectedProduct;
        return sum + unitPrice * (1 - discount) * product.quantity;
      }
      return sum;
    }, 0);
    this.setState({ totalPrice: total.toFixed(2) });
  };

  render() {
    const { products, selectedProducts, totalPrice } = this.state;
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
        {selectedProducts.map((article) => (
          <ArticleTableRow
            key={article.id}
            productId={article.id}
            products={products}
            selectedProducts={this.state.selectedProducts}
            onSelectProductChange={this.handleProductChange}
            onDelete={() => this.handleDeleteArticle(article.id)}
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
            if (this.state.selectedProducts.length > 0) {
              const lastArticleId =
                this.state.selectedProducts[
                  this.state.selectedProducts.length - 1
                ].id;
              this.handleDeleteArticle(lastArticleId);
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
