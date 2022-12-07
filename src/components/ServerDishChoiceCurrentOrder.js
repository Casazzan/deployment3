import '../index.css';
import { useState, useEffect } from "react";
import axios from 'axios';

var test = [[[""]]];

var databaseName = ['honey_seasame_chicken','orange_chicken','black_pepper_angus_steak','string_bean_chicken_breast','sweetfire_chicken_breast','kung_pao_chicken','black_pepper_chicken','grilled_teriyaki_chicken','broccoli_beef','bejing_beef','honey_walnut_shrimp','mushroom_chicken','eggplant_tofu','mixed_vegetables','chow_mein','fried_rice','white_steamed_rice','brown_steamed_rice','chicken_egg_roll','crispy_shrimp'];
var displayName = ['Honey Seasame Chicken', 'Orange Chicken', 'Black Pepper Angus Steak', 'String Bean Chicken Breast', 'Sweetfire Chicken Breast', 'Kung Pao Chicken', 'Black Pepper Chicken', 'Grilled Teriyaki Chicken', 'Broccoli Beef', 'Bejing Beef', 'Honey Walnut Shrimp','Mushroom Chicken', 'Eggplant Tofu', 'Mixed Vegetables', 'Chow Mein', 'Fried Rice', 'White Steamed Rice', 'Brown Steamed Rice', 'Chicken Egg Roll', 'Crispy Shrimp'];
  
  /**
   * Object containing the current order display for utilization on other pages
   * @constructor
   */
  const ServerDishChoiceCurrentOrder = () => {

    const [translations, setTranslations] = useState([
      { translatedText: "Honey Sesame Chicken" }, 
      { translatedText: "Orange Chicken" }, 
      { translatedText: "Black Pepper Angus Steak" }, 
      { translatedText: "String Bean Chicken Breast" }, 
      { translatedText: "Sweetfire Chicken Breast" }, 
      { translatedText: "Kung Pao Chicken" }, 
      { translatedText: "Black Pepper Chicken" }, 
      { translatedText: "Grilled Teriyaki Chicken" }, 
      { translatedText: "Broccoli Beef" }, 
      { translatedText: "Bejing Beef" }, 
      { translatedText: "Honey Walnut Shrimp" }, 
      { translatedText: "Mushroom Chicken" }, 
      { translatedText: "Eggplant Tofu" }, 

      { translatedText: "Mixed Vegetables" },
      { translatedText: "Chow Mein" },
      { translatedText: "Fried Rice" },
      { translatedText: "White Steamed Rice" },
      { translatedText: "Brown Steamed Rice" },

      { translatedText: "Chicken Egg Roll" },
      { translatedText: "Crispy Shrimp" },

      { translatedText: "Bowl" },
      { translatedText: "Plate" },
      { translatedText: "Bigger Plate" },
    ])

    const changeLanguage = () => {
      // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
      if (JSON.parse(localStorage.getItem("language")) != "en") {
        console.log("sent query")
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", "Honey Sesame Chicken");
        encodedParams.append("q", "Orange Chicken");
        encodedParams.append("q", "Black Pepper Angus Steak");
        encodedParams.append("q", "String Bean Chicken Breast");
        encodedParams.append("q", "Sweetfire Chicken Breast");
        encodedParams.append("q", "Kung Pao Chicken");
        encodedParams.append("q", "Black Pepper Chicken");
        encodedParams.append("q", "Grilled Teriyaki Chicken");
        encodedParams.append("q", "Broccoli Beef");
        encodedParams.append("q", "Bejing Beef");
        encodedParams.append("q", "Honey Walnut Shrimp");
        encodedParams.append("q", "Mushroom Chicken");
        encodedParams.append("q", "Eggplant Tofu");
        
        encodedParams.append("q", "Mixed Vegetables");
        encodedParams.append("q", "Chow Mein");
        encodedParams.append("q", "Fried Rice");
        encodedParams.append("q", "White Steamed Rice");
        encodedParams.append("q", "Brown Steamed Rice");

        encodedParams.append("q", "Chicken Egg Roll");
        encodedParams.append("q", "Crispy Shrimp");
        
        encodedParams.append("q", "Bowl");
        encodedParams.append("q", "Plate");
        encodedParams.append("q", "Bigger Plate");

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

    var [orders, setOrders] = useState([]);
    var mylistoforders2 = JSON.parse(localStorage.getItem('CurrentOrder'));
      
    // localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    //if the orders don't exist
    if (mylistoforders2 == null) {
      console.log("mylistoforders2 doesn't exist");
      localStorage.setItem('CurrentOrder', JSON.stringify(test));
      // localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    }
    /**
     * Handles when a user deletes an item, if it is the whole entree it deletes the entire item, if not it deletes the singular item.
     * @param {int} index - Position in the first array of the order.
     * @param {int} subIndex - Position in the second array of the order.
     * @param {int} subsubIndex - Position in the third array of the order.
     */
    const handlechange = (index, subIndex, subsubIndex) => {
      const mynewlistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));
      //If if is a whole order, delete everything inside
      if (mynewlistoforders[index][subIndex][subsubIndex] === 'bowl' || mynewlistoforders[index][subIndex][subsubIndex] === 'plate' || mynewlistoforders[index][subIndex][subsubIndex] === 'bigger plate'){
        mynewlistoforders.splice(index, 1);
      }
      else{
        // mynewlistoforders[index][subIndex][subsubIndex] = '';
        mynewlistoforders[index][subIndex].splice(subsubIndex, 1);
      }
      setOrders(mynewlistoforders);
      localStorage.setItem('CurrentOrder', JSON.stringify(mynewlistoforders));
    };

    return (
      <div>
        {mylistoforders2.map((items, index) => {
          return (
            <div>
              {items.map((subItems, subIndex) => {
                return(
                  <div>
                    {subItems.map((subsubItems, subsubIndex) => {

                      //------------------------------------------
                      if (subItems == "bowl") {
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>{translations[20].translatedText}</h3></span> )
                      } 
                      else if (subsubItems == "plate") {
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>{translations[21].translatedText}</h3></span> )
                      } 
                      else if (subsubItems == "bigger plate") {
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>{translations[22].translatedText}</h3></span> )
                      }
                      else if (subsubItems == "") {
                        return ( <span></span> ) //return nothing
                      } 
                      else {
                        return (
                          <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><li>{databaseName.indexOf(subsubItems) == -1 ? subsubItems : translations[databaseName.indexOf(subsubItems)].translatedText}</li></span>
                        )
                      }
                      //--------------------------------------------
                    })}
                  </div>
                )
              })}
            </div>
          );
        })}
      </div>
    );
}
  
  
  
  export default ServerDishChoiceCurrentOrder
