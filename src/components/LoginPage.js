import React, { useEffect } from "react";
import '../index2.css';
import HomePageNavButton from './HomePageNavButton';

import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
const clientId = '569817754455-gefflnacglb4mubcrlp94bqknusirsld.apps.googleusercontent.com';

var wasSuccessful = false;


const onFailure = (err) => {
    console.log('failed:', err);
    wasSuccessful = false;
};

// const HomePage = () => {
//     let navigate = useNavigate();
//     useEffect(() => {
//         const initClient = () => {
//               gapi.client.init({
//               clientId: clientId,
//               scope: 'email'
//             });
//          };
//          gapi.load('client:auth2', initClient);
//      });
//     return (
//       <div class = "HomePageScreen">
//             <div class = "homeLogo"></div>
//             <GoogleLogin
//             clientId={clientId}
//             render={renderProps => (
//             <button class = "HomePageButton" id = "customer" onClick={renderProps.onClick}>Manager Settings</button>
//             )}
//             buttonText="Manager Settings"
//             // onSuccess={onSuccess}
//             onSuccess={() => {navigate("/CustomerMenu")}}
//             onFailure={onFailure}
//             cookiePolicy={'none'}
//             />
//           {/* <div class = "HomePageButton" id = "Customer" onClick={() => {navigate("/CustomerMenu")}}><HomePageNavButton Name = "Customer View" /></div>
//           <div class = "HomePageButton" id = "Server" onClick={() => {navigate("/ServerMenu")}}><HomePageNavButton Name = "Server View" /></div>
//           <div class = "HomePageButton" id = "Manager" onClick={() => {navigate("/Manager")}}><HomePageNavButton Name = "Manager View" /></div> */}
//           <div class = "HomePageButton" id = "Public" onClick={() => {navigate("/CustMainPage")}}><HomePageNavButton Name = "Public View" /></div>
//       </div>
//       )
//   }
const LoginPage = () => {
    let navigate = useNavigate();
    const onSuccess = (res) => {
        console.log('success:', res);
        wasSuccessful = true;
        navigate("/View")
        var auth2 = gapi.auth2.getAuthInstance();
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log("NAME-->"+profile.getName());
        console.log("Email-->"+profile.getEmail());
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.disconnect();
    };
    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: 'email'
            });
         };
         gapi.load('client:auth2', initClient);
         
     });
    return (
      <div class = "HomePageScreen">
            <div class = "homeLogo"></div>
            <GoogleLogin
            clientId={clientId}
            render={renderProps => (
            <button class = "HomePageButton" id = "customer" onClick={renderProps.onClick}>Login</button>
            )}
            buttonText="Manager Settings"
            // onSuccess={onSuccess}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'none'}
            />
          {/* <div class = "HomePageButton" id = "Login" onClick={() => {navigate("/View")}}><HomePageNavButton Name = "Login" /></div> */}
          <div class = "HomePageButton" id = "Public" onClick={() => {navigate("/CustMainPage")}}><HomePageNavButton Name = "Public View" /></div>
      </div>
      )
  }
  
  export default LoginPage