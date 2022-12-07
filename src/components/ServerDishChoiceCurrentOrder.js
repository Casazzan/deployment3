import '../index.css';
import { useState, useEffect } from "react";
import Settings from './Settings';
import axios from 'axios';

var test = [[[""]]];

var databaseName = ['honey_seasame_chicken','orange_chicken','black_pepper_angus_steak','string_bean_chicken_breast','sweetfire_chicken_breast','kung_pao_chicken','black_pepper_chicken','grilled_teriyaki_chicken','broccoli_beef','bejing_beef','honey_walnut_shrimp','mushroom_chicken','eggplant_tofu','mixed_vegetables','chow_mein','fried_rice','white_steamed_rice','brown_steamed_rice','chicken_egg_roll','crispy_shrimp'];
var displayName = ['Honey Seasame Chicken', 'Orange Chicken', 'Black Pepper Angus Steak', 'String Bean Chicken Breast', 'Sweetfire Chicken Breast', 'Kung Pao Chicken', 'Black Pepper Chicken', 'Grilled Teriyaki Chicken', 'Broccoli Beef', 'Bejing Beef', 'Honey Walnut Shrimp','Mushroom Chicken', 'Eggplant Tofu', 'Mixed Vegetables', 'Chow Mein', 'Fried Rice', 'White Steamed Rice', 'Brown Steamed Rice', 'Chicken Egg Roll', 'Crispy Shrimp'];
  
  /**
   * Object containing the current order display for utilization on other pages
   * @constructor
   */
  const ServerDishChoiceCurrentOrder = () => {
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
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>Bowl</h3></span> )
                      } 
                      else if (subsubItems == "plate") {
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>Plate</h3></span> )
                      } 
                      else if (subsubItems == "bigger plate") {
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>Bigger Plate</h3></span> )
                      }
                      else if (subsubItems == "") {
                        return ( <span></span> ) //return nothing
                      } 
                      else {
                        return (
                          <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><li>{databaseName.indexOf(subsubItems) == -1 ? subsubItems : displayName[databaseName.indexOf(subsubItems)]}</li></span>
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
