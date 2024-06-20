import React, { Component } from "react";

class ArticleTableRow extends Component {
  state = {
    articles: [
      { id: 1, name: "Article 1", price: 10, discount: 0.1 },
      { id: 2, name: "Article 2", price: 20, discount: 0.15 },
      { id: 3, name: "Article 3", price: 30, discount: 0.2 },
    ],
    selectedArticle: null,
    quantity: 1,
  };

  handleArticleChange = (event) => {
    const articleId = parseInt(event.target.value, 10);
    const article = this.state.articles.find((item) => item.id === articleId);
    this.setState({ selectedArticle: article });
  };

  handleQuantityChange = (event) => {
    this.setState({
      quantity: parseInt(event.target.value, 10),
    });
  };

  calculateTotal = () => {
    const { selectedArticle, quantity } = this.state;
    if (!selectedArticle) return 0;
    const { price, discount } = selectedArticle;
    const discountedPrice = price - price * discount;
    return discountedPrice * quantity;
  };

  render() {
    const { articles, selectedArticle, quantity } = this.state;

    return (
      <div className="table-row">
        <div>
          <select className="select" onChange={this.handleArticleChange}>
            <option value="">Select an article</option>
            {articles.map((article) => (
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
          {selectedArticle ? `${selectedArticle.price.toFixed(2)}` : "N/A"}
        </div>
        <div>
          {selectedArticle
            ? `${(selectedArticle.discount * 100).toFixed(0)}%`
            : "N/A"}
        </div>
        <div>
          {selectedArticle ? `${this.calculateTotal().toFixed(2)}` : "N/A"}
        </div>
      </div>
    );
  }
}

export default ArticleTableRow;
