import React, { Component } from "react";
import ArticleTableRow from "./article-table-row";

class AddArticle extends Component {
  state = {
    articles: [],
    products: this.props.products,
    selectedProducts: this.props.selectedProducts,
    totalPrice: 0,
  };

  handleProductChange = (selectedProducts) => {
    this.setState({ selectedProducts }, this.updateTotalPrice);
    this.props.onSelectProduct(selectedProducts);
  };

  handleAddArticle = () => {
    const newArticle = {
      id: this.state.articles.length + 1,
      name: `Article ${this.state.articles.length + 1}`,
    };
    this.setState(
      (prevState) => ({
        articles: [...prevState.articles, newArticle],
      }),
      () => {
        // this.updatedTotalPrice();
        // this.handleProductChange(selectedProducts);
      }
    );
  };

  handleDeleteArticle = (id) => {
    this.setState(
      (prevState) => {
        const updatedArticles = prevState.articles.filter(
          (article) => article.id !== id
        );
        const updatedSelectedProducts = prevState.selectedProducts.filter(
          (product) => product.id !== id
        );
        return {
          articles: updatedArticles,
          selectedProducts: updatedSelectedProducts,
        };
      },
      () => {
        // this.updatedTotalPrice();
        //this.handleProductChange(selectedProducts);
      }
    );
  };

  updatedTotalPrice = () => {
    const total = this.state.selectedProducts.reduce(
      (sum, { price, discount }) => sum + price * (1 - discount),
      0
    );
    this.setState({ totalPrice: total.toFixed(2) });
  };

  render() {
    const { articles, products, totalPrice } = this.state;
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
        {articles.map((article) => (
          <ArticleTableRow
            key={article.id}
            products={products}
            selectedProducts={this.state.selectedProducts}
            onSelectProduct={this.handleProductChange}
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
            if (this.state.articles.length > 0) {
              const lastArticleId =
                this.state.articles[this.state.articles.length - 1].id;
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
