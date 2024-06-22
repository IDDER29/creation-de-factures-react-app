import React, { Component } from 'react';
import Form from './components/form';
import AddArticle from "./components/add-article.jsx";
import TableOfData from "./components/table-of-data.jsx";
import mainData from "./components/main-data.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: mainData.products,
            selectedProducts: [],
            isDisabled: true,
            mainData: mainData,
        };

        // Bind methods
        this.updateIsDisabled = this.updateIsDisabled.bind(this);
        this.handleSelectProduct = this.handleSelectProduct.bind(this);
        this.handleSubmitFacture = this.handleSubmitFacture.bind(this);
    }

    updateIsDisabled() {
        this.setState({ isDisabled: this.state.selectedProducts.length === 0 });
        console.log(this.state.selectedProducts);
        console.log("isDisabled new state:", this.state.isDisabled);
    }

    handleSelectProduct(selectedProducts) {
        this.setState({ selectedProducts }, this.updateIsDisabled);
    }

    calculateTotalPrice() {
        const totalHT = this.state.selectedProducts.reduce((total, product) => total + product.totalAmount, 0);
        const TVA = totalHT * 20 / 100;
        const totalTTC = totalHT + TVA;
        return { totalHT, TVA, totalTTC };
    }

    handleSubmitFacture(event) {
        event.preventDefault();
        console.log("Form submitted!");
        console.log("selected products are:", this.state.selectedProducts);
        const [id, date, clientId] = [event.target.elements[0].value, event.target.elements[1].value, event.target.elements[2].value];
        const { totalHT, TVA, totalTTC } = this.calculateTotalPrice();
        const clientName = mainData.clients.find((client) => client.id == clientId).fullName;
        const details = this.state.selectedProducts.map(product => ({
            productId: product.id,
            productName: product.name,
            quantity: product.quantity,
            unitPrice: product.unitPrice,
            discount: product.discount,
            price: product.unitPrice,
            totalHT: product.totalAmount,
        }));
        const invoice = {
            id: `INV${id}`,
            clientName,
            clientId,
            totalHT,
            TVA,
            totalTTC,
            details,
        }
        mainData.invoices = [...mainData.invoices, invoice];
        this.setState({ mainData });
        console.log("mainData", mainData);

        console.log("invoice object", invoice);
    }

    render() {
        return (
            <>
                <Form isDisabled={this.state.isDisabled} handleSubmitFacture={this.handleSubmitFacture} />
                <AddArticle products={this.state.products} selectedProducts={this.state.selectedProducts} onSelectProduct={this.handleSelectProduct} />
                <TableOfData invoices={this.state.mainData.invoices} />
                <button onClick={() => console.log(mainData)}>click</button>
            </>
        );
    }
}

export default App;
