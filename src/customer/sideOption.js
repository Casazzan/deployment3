import React from 'react';
import Header from "./header";
import Sides from "./sides";
import "./menuContainer.css";

/**
* Display sides page in menu
* @function
*/

const sideOption = () => {
    return (
        <>
            <div className="container">
                <Header />
                <Sides />
            </div></>
    )
}

export default sideOption