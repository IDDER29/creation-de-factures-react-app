import React, { Component } from "react";
import ArticleTableRow from "./article-table-row";
import mainData from "./main-data";

class AddArticle extends Component {
  state = {
    articles: [],
    products: mainData.products,
    totalPrice: 0,
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
      this.updatedTotalPrice
    );
  };

  handleDeleteArticle = (id) => {
    this.setState((prevState) => {
      const updatedArticles = prevState.articles.filter(
        (article) => article.id !== id
      );
      return {
        articles: updatedArticles,
      };
    }, this.updatedTotalPrice);
  };

  updatedTotalPrice = () => {
    const { articles } = this.state;
    const total = articles.reduce(
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
              this.setState(
                (prevState) => ({
                  articles: prevState.articles.slice(0, -1),
                }),
                this.updatedTotalPrice
              );
            }
          }}
        >
          Delete last article
        </button>
      </div>
    );
  }
}

export default AddArticle;
