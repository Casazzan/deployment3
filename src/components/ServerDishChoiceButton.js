import React from 'react'
/**
 * Button for the landing page of server, allows selection of dish type (bowl, plate, bigger plate)
 * @function
 * @param {string} Name - The name the React component is going to display.
 * @returns {Component} A React component displaying the name object passed in.
 */
const ServerDishChoiceButton = ( { Name }) => {
  return (
    <div id = "ServerDishChoiceButton">
      <h1>{Name}</h1>
    </div>
  )
}



export default ServerDishChoiceButton
