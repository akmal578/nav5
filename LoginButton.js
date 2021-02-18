import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, View, Image, Text} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';

function LoginButton({getData, setData, setPictureURL}) {
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    LoginManager.logInWithPermissions(['public_profile']).then((result) => {
      if (result.error) {
        console.log('Error: ', result.error);
      } else {
        if (result.isCancelled) {
          console.log('Login is cancelled');
        } else {
          setLoggedIn(true);
          getData();
          console.log('Logged in: ', result);
        }
      }
    });
  }

  function logout() {
    LoginManager.logOut();
    setLoggedIn(false);
    setData([]);
    setPictureURL(null);
    console.log('Logout');
  }

  return (
    <View>
      {loggedIn ? (
        <View>
          <Button title="Logout Facebook" onPress={logout} />
        </View>
      ) : (
        <View>
          <Button title="Login with Facebook" onPress={login} />
        </View>
      )}
    </View>
  );
}

export default LoginButton;
