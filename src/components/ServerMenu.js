import React from 'react'
import { useNavigate } from 'react-router-dom';
import ServerDishChoiceButton from "./ServerDishChoiceButton";
import ServerDishChoiceCurrentOrder from "./ServerDishChoiceCurrentOrder";
import TotalPrice from './TotalPrice';
import PandaLogo from './panda-logo.png';
import '../index2.css';

/**
 * Landing page for the Customer Kiosk Display
 * @constructor
 */
const ServerMenu = () => {
  let navigate = useNavigate();

  /**
   * Creates a bowl item, displays change on order display, and navigates to the Items screen for item selection
   * Utilizes local storage
   * @function
   */
  const createBowl = () => {
    var orderArray = [];
    
    var dishArray = ["bowl"];
    var entreeArray = [];
    var sidesArray = [];
    var appetizers = [];
    orderArray.push(dishArray, entreeArray, sidesArray, appetizers);
    var mylistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));
    mylistoforders.push(orderArray);
    localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    navigate("/ServerMenu/OrderSelect")
  }
  /**
   * Creates a plate item, displays change on order display, and navigates to the Items screen for item selection
   * Utilizes local storage
   * @function
   */
  const createPlate = () => {
    var orderArray = [];
    
    var dishArray = ["plate"];
    var entreeArray = [];
    var sidesArray = [];
    var appetizers = [];
    orderArray.push(dishArray, entreeArray, sidesArray, appetizers);
    var mylistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));
    mylistoforders.push(orderArray);
    localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    navigate("/ServerMenu/OrderSelect")
  }
  /**
   * Creates a bigger plate item, displays change on order display, and navigates to the Items screen for item selection
   * Utilizes local storage
   * @function
   */
  const createBiggerPlate = () => {
    var orderArray = [];
    
    var dishArray = ["bigger plate"];
    var entreeArray = [];
    var sidesArray = [];
    var appetizers = [];
    orderArray.push(dishArray, entreeArray, sidesArray, appetizers);
    var mylistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));
    mylistoforders.push(orderArray);
    localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    navigate("/ServerMenu/OrderSelect")
  }

  return (

    <div class = "ServerMenuGrid">
        <img class = "GoHome" src={PandaLogo} onClick={() => {navigate("/View")}}/>
        <div class = "ServerMenuDishChoiceButton" id = "BowlScreen" onClick={() => {createBowl()}}><ServerDishChoiceButton Name = "Bowl"/></div>
        <div class = "ServerMenuDishChoiceButton" id = "PlateScreen" onClick={() => {createPlate()}}><ServerDishChoiceButton Name = "Plate"/></div>
        <div class = "ServerMenuDishChoiceButton" id = "BiggerPlateScreen" onClick={() => {createBiggerPlate()}}><ServerDishChoiceButton Name = "Bigger Plate"/></div>
        <div class = "CheckoutButton" id = "ServerCheckoutScreen" onClick={() => {navigate("/ServerMenu/Checkout")}}><ServerDishChoiceButton Name = "Checkout"/></div>
        <div class = "ServerMenuCurrentOrder">
            <ServerDishChoiceCurrentOrder />
            <div id = "ServerMenuPrice" onClick={() => {window.location.reload()}}><TotalPrice /></div>
        </div>
    </div>
    
  )
}

export default ServerMenu
