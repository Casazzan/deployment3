import React from "react";
import Logo from './pandaLogo.png';
import "./header.css";
import "./menuContainer.css";
//import { useNavigate, Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'


function Header(props) {

  const [translations, setTranslations] = useState([
    { translatedText: "Back" }, 
    { translatedText: "Entrees" }, 
    { translatedText: "Sides" }, 
    { translatedText: "Appetizers" }, 
  ])

  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      console.log("sent query")
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Back");
      encodedParams.append("q", "Entrees");
      encodedParams.append("q", "Sides");
      encodedParams.append("q", "Appetizers");
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
          // console.log("Within OrderHistory Display: ", response.data.data.translations)
          // console.log("Specific Element: ", translations[0].translatedText)
          setTranslations(translatedArray)
          // console.log("Test", translations)
          
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
    //console.log("Test", translations)
  }, [setTranslations]);

  return (
    <>
    <div className="header">

        <img src={Logo} className="img" width="25%" />
        
        <div className="options">
                <button className="addToCart" onClick={() => props.goBack()}> {translations[0].translatedText} </button>;
                <button className="optionBtn" onClick={() => props.callback("entrees")}> {translations[1].translatedText} </button>
                <button className="optionBtn" onClick={() => props.callback("sides")}> {translations[2].translatedText} </button>
                <button className="optionBtn" onClick={() => props.callback("apps")}> {translations[3].translatedText} </button>
        </div>  

    </div>
    </>
  );
}

export default Header;