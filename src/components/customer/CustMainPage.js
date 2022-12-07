/*
 * @param {Array} orders - The React component holding the user's current order.
 * @param {double} price - React component for the current price.
 * @param {Function} updateOrderCallback - Recat function called when the user selects something and an current order screen needs to be updated.
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CustMainPage.css";

import CustomerViewBtn from "../CustomerViewBtn";

import Logo from './pandaLogo.png';
import Text from 'react-text';
import FoodBackground from './pandaFood.jpeg';
import axios from 'axios'
import LanguageSettings from '../LanguageSettings'
import { useState, useEffect } from "react";

/**
 * Main page for the screen the Public can access
 * @constructor
 * @param {Component} props - React props passed in, contains a 3 dimensional array holding current order, a double holding the current price, and a function to update the current order so the display is correct when the user selects an item.
 */
const CustMainPage = (props) => {

  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState(null);
  const [translations, setTranslations] = useState ([
    {translatedText: "Submit"},
    {translatedText: "Back"},
    {translatedText: "Find Resturaunt"},
    {translatedText: "View Menu"},
    {translatedText: "Welcome to Panda Express"},
    {translatedText: "We are a fast food restaurant chain that serves American Chinese cuisine. You can view our menu here on our site. Then, once you're ready to head to a store to place an order, click on 'Find Restaraunt' to get directions to one of our 2,000 locations. Hope to see you soon!"},
  ])

  let navigate = useNavigate();

    const getLanguages = () => {
    const options = {
      method: 'GET',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
      params: {target: 'en'},
      headers: {
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '8fbc873fd8msh5d43e6022f22f64p15f17ejsnbb456384ba17',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      }
  };

    axios.request(options).then(function (response) {
      const allLanguages = response.data.data.languages
      setLanguages(allLanguages)
      // console.log("allLanguages: ", allLanguages[0].language)
      //console.log("allLanguages[0]: ", allLanguages[0])

    }).catch(function (error) {
        console.error(error);
    });
  }

  const changeText = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (localStorage.getItem("language") == null) {
      localStorage.setItem("language", JSON.stringify("en"));
    }
    console.log(localStorage.getItem("language"))
    if (localStorage.getItem("language") != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Submit"); // translations[0].translatedText
      encodedParams.append("q", "Back");// translations[1].translatedText
      encodedParams.append("q", "Find Restaraunt");
      encodedParams.append("q", "View Menu");
      encodedParams.append("q", "Welcome to Panda Express");
      encodedParams.append("q", "We are a fast food restaurant chain that serves American Chinese cuisine. You can view our menu here on our site. Then, once you're ready to head to a store to place an order, click on 'Find Restaraunt' to get directions to one of our 2,000 locations. Hope to see you soon!");
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
          console.log("HERE", response.data);

          const translatedArray = response.data.data.translations
          setTranslations(translatedArray)
          // console.log("the result from the call is", translations)
      
      }).catch(function (error) {
          console.error(error);
      });
    }
    else {
      console.log("english")
    }
}


  useEffect(() => {
    console.log("use effect here")
    getLanguages()
    if (localStorage.getItem("language") == null) {
      localStorage.setItem("language", JSON.stringify("en"));
      console.log("made it to change text")
      changeText()
      window.location.reload(false)
    }
    else {
      changeText()
    }

  }, [setTranslations])

  const changeLanguage = () => {
    var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    setLanguage(selected)
    localStorage.setItem("language", JSON.stringify(selected));
    window.dispatchEvent(new Event("storage"));
    const rawLanguage = localStorage.getItem("language");
    const language = JSON.parse(rawLanguage);
    console.log("LOCAL STORAGE: ", language);
  }


  return (

    <div className="CustMainPage">

      <div className="header">

        <img src={Logo} className="img" width="25%" />

        <div className="options">
                <button className="addToCart" onClick={() => {navigate("/")}}>{ translations[1].translatedText } </button>
        </div>  

        <div className="CustOptions">
      
          <div class = "CustomerViewBtn" id = "FindRestaraunt" onClick={() => {navigate("/CustMainPage/StoreFinder")}}> <CustomerViewBtn Name = {translations[2].translatedText} /></div>
          <div class = "CustomerViewBtn" id = "ViewMenu" onClick={() => {navigate("/CustMainPage/PublicMenu")}}> <CustomerViewBtn Name = {translations[3].translatedText} /></div>

        </div>

      </div>

      <div className = "background">

         <img className = "backgroundImg" src={FoodBackground} />
         <h1 className = "backgroundText"> {translations[4].translatedText} </h1> <br/> <br/> 
         <p className = "backgroundText2">
         {translations[5].translatedText} </p>


          <LanguageSettings className="LanguageBox" languageList={languages} />

        <button className="SubmitLanguageBox" onClick={() => changeLanguage()}>{translations[0].translatedText}</button>

      </div>

    </div>
  )

}

export default CustMainPage




