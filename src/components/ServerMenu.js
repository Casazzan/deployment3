import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
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

  const [translations, setTranslations] = useState([
    { translatedText: "Bowl" },
    { translatedText: "Plate" },
    { translatedText: "Bigger Plate" },
    { translatedText: "Checkout" }
  ])

  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      console.log("sent query")
      const encodedParams = new URLSearchParams();

      encodedParams.append("q", "Bowl");
      encodedParams.append("q", "Plate");
      encodedParams.append("q", "Bigger Plate");
      encodedParams.append("q", "Checkout");

      encodedParams.append("target", JSON.parse(localStorage.getItem("language")));  
      encodedParams.append("source", "en");

      const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '8fbc873fd8msh5d43e6022f22f64p15f17ejsnbb456384ba17',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams
      };

      axios.request(options).then(function (response) {
          const translatedArray = response.data.data.translations
          setTranslations(translatedArray)
      }).catch(function (error) {
          console.error(error);
      });
    }
    else {
      console.log("english")
    }
  }

  useEffect(() => {    
    changeLanguage()
    console.log("Test", translations)
  }, [setTranslations]);

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
        <div class = "ServerMenuDishChoiceButton" id = "BowlScreen" onClick={() => {createBowl()}}><ServerDishChoiceButton Name = {translations[0].translatedText}/></div>
        <div class = "ServerMenuDishChoiceButton" id = "PlateScreen" onClick={() => {createPlate()}}><ServerDishChoiceButton Name = {translations[1].translatedText}/></div>
        <div class = "ServerMenuDishChoiceButton" id = "BiggerPlateScreen" onClick={() => {createBiggerPlate()}}><ServerDishChoiceButton Name = {translations[2].translatedText}/></div>
        <div class = "CheckoutButton" id = "ServerCheckoutScreen" onClick={() => {navigate("/ServerMenu/Checkout")}}><ServerDishChoiceButton Name = {translations[3].translatedText}/></div>
        <div class = "ServerMenuCurrentOrder">
            <ServerDishChoiceCurrentOrder />
            <div id = "ServerMenuPrice" onClick={() => {window.location.reload()}}><TotalPrice /></div>
        </div>
    </div>
    
  )
}

export default ServerMenu
