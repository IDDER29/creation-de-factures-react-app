
import React, { Component } from 'react';
import Form from './components/form';
import AddArticle from "./components/add-article.jsx";
import TableOfData from "./components/table-of-data.jsx";
import Fo from 'flowbite-datepicker/locales/fo';


class App extends Component {
    state = {}
    render() {
        return (
            <>
                <Form />
                <AddArticle />
                <TableOfData />
            </>);
    }
}

export default App;