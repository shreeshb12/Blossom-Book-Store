import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import AddBook from './AddBook';
import Books from "./books";
const App=()=>{
    return(
        <React.Fragment>
        <header>
            <Header/>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<Home/>} exact/>
                <Route path="/add" element={<AddBook/>} exact/>
                <Route path="/books" element={<Books/>} exact/>
            </Routes>
        </main>
        </React.Fragment>
    )
}
export default App;