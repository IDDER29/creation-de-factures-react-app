import React, { Component } from 'react';
import Form from './components/form';
import AddArticle from "./components/add-article.jsx";
import TableOfData from "./components/table-of-data.jsx";
import mainData, { saveMainData } from "./components/main-data.jsx";
import './styles/App.css';


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
        const [id, date, clientId] = [event.target.elements[0].value, event.target.elements[1].value, event.target.elements[2].value];

        // Ensure mainData is up-to-date
        const { mainData } = this.state;
        const client = mainData.clients.find((client) => client.id == clientId);

        if (!client) {
            console.error("Client not found!");
            return;
        }

        const { totalHT, TVA, totalTTC } = this.calculateTotalPrice();
        const details = this.state.selectedProducts.map(product => ({
            productId: product.id,
            productName: product.name,
            quantity: product.quantity,
            unitPrice: product.unitPrice,
            discount: product.discount,
            price: product.unitPrice * product.quantity,
            totalHT: product.totalAmount,
        }));

        const invoice = {
            id: `INV${id}`,
            clientName: client.fullName,
            clientId,
            totalHT,
            TVA,
            totalTTC,
            details,
        };

        mainData.invoices = [...mainData.invoices, invoice];
        saveMainData(mainData);

        this.setState({ mainData }, () => {
            console.log("mainData updated", mainData);
        });

        console.log("invoice object", invoice);
    }

    render() {
        return (
            <>
                <Form isDisabled={this.state.isDisabled} handleSubmitFacture={this.handleSubmitFacture} />
                <AddArticle products={this.state.products} selectedProducts={this.state.selectedProducts} onSelectProduct={this.handleSelectProduct} />
                <TableOfData invoices={this.state.mainData.invoices} />

            </>
        );
    }
}

export default App;
