import React, { Component } from "react";
import '../index2.css';
import HomePageNavButton from './HomePageNavButton';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

/**
 * Main screen that allows navigation to the other views
 */
const HomePage = () => {

    const [translations, setTranslations] = useState([
        { translatedText: "Customer View" },
        { translatedText: "Server View" },
        { translatedText: "Manager View" }
      ])
    
      const changeLanguage = () => {
        // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
        if (JSON.parse(localStorage.getItem("language")) != "en") {
          console.log("sent query")
          const encodedParams = new URLSearchParams();
    
          encodedParams.append("q", "Customer View");
          encodedParams.append("q", "Server View");
          encodedParams.append("q", "Manager View");
          
    
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
      <div class = "HomePageScreen">
          <div class = "homeLogo"></div>
          <div class = "HomePageButton" id = "Customer" onClick={() => {navigate("/CustomerMenu")}}><HomePageNavButton Name = {translations[0].translatedText} /></div>
          <div class = "HomePageButton" id = "Server" onClick={() => {navigate("/ServerMenu")}}><HomePageNavButton Name = {translations[1].translatedText} /></div>
          <div class = "HomePageButton" id = "Manager" onClick={() => {navigate("/Manager")}}><HomePageNavButton Name = {translations[2].translatedText} /></div>
      </div>
      )
  }
  
  export default HomePage
