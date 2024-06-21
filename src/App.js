
import React, { Component } from 'react';
import Form from './components/form';
import AddArticle from "./components/add-article.jsx";
import TableOfData from "./components/table-of-data.jsx";

import mainData from "./components/main-data.jsx";

class App extends Component {
    state = {
        products: mainData.products,
        selectedProducts: [],
        isDisabled: true,
    }

    // Method to update isDisabled based on selectedProducts
    updateIsDisabled = () => {
        this.setState({ isDisabled: this.state.selectedProducts.length === 0 });
        console.log(this.state.selectedProducts)
        console.log("is disibled new state : ", this.state.isDisabled)
    }
    // Method to handle selection of products
    handleSelectProduct = (selectedProducts) => {
        this.setState({ selectedProducts }, this.updateIsDisabled);
    }

    hundelSubmitFacture(event) {
        event.preventDefault();
    }
    render() {
        return (
            <>
                <Form isDisabled={this.state.isDisabled} hundelSubmitFacture={this.hundelSubmitFacture} />
                <AddArticle products={this.state.products} selectedProducts={this.state.selectedProducts} onSelectProduct={this.handleSelectProduct} />
                <TableOfData />
            </>);
    }
}

export default App;