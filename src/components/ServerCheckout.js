import React from 'react'
import ServerDishChoiceCurrentOrder from "./ServerDishChoiceCurrentOrder";
import '../index2.css';
import ServerDishChoiceButton from './ServerDishChoiceButton';
import { useNavigate } from 'react-router-dom';
import TotalPrice from './TotalPrice';
import ServerCheckoutButton from './ServerCheckoutButton';
import PandaLogo from './panda-logo.png';
import { useState, useEffect } from "react";
import axios from 'axios';

 /**
 * Server side checkout screen component
 * @function - generates navigation buttons, order display, and current order price
 */
const ServerCheckout = () => {

  const [translations, setTranslations] = useState([
    { translatedText: "Go Back" },
    //{ translatedText: "Price: " }
  ])

  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      console.log("sent query")
      const encodedParams = new URLSearchParams();

      encodedParams.append("q", "Go Back");
      //encodedParams.append("q", "Price: ");

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
  return (
    <div class = "CheckoutScreen">
        <img class = "GoHome" id = "gohomeCheckout" src={PandaLogo} onClick={() => {navigate("/ServerMenu")}}/>
        <div class = "ServerCheckoutOrder"><ServerDishChoiceCurrentOrder /></div>
        <div id = "ServerCheckout" Name = "Checkout"><ServerCheckoutButton /></div>
        <div class = "ServerCheckoutButton" id = "ServerGoBack" onClick={() => {navigate("/ServerMenu")}}><ServerDishChoiceButton Name = {translations[0].translatedText} /></div>
        <div id = "ServerPrice" onClick={() => {window.location.reload()}}><TotalPrice /></div>
    </div>
    )
}

export default ServerCheckout
