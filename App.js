/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  InteractionManager,
  SafeAreaView,
} from 'react-native';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  Permissions,
} from 'react-native-fbsdk';

import RNBootSplash from 'react-native-bootsplash';
import LoginButton from './LoginButton';

const App = () => {
  const [myData, setData] = useState([]);
  const [pictureURL, setPictureURL] = useState(null);

  //Splash Screen
  useEffect(() => {
    RNBootSplash.hide({fade: true});
    console.log('Bootsplash has been hidden successfully');
  }, []);

  // const ResponseData = [
  //   {
  //     id: 'lorem',
  //     name: 'lorem',
  //     picture: {
  //       data: {
  //         height: 200,
  //         is_silhouette: false,
  //         url: 'lorem',
  //         width: 200,
  //       },
  //     },
  //   },
  // ];

  // const TokenData = [
  //   {
  //     accessToken: 'lorem',
  //     accessTokenSource: 'CHROME_CUSTOM_TAB',
  //     applicationID: 'lorem',
  //     dataAccessExpirationTime: 'lorem',
  //     declinedPermissions: [],
  //     expirationTime: 'lorem',
  //     expiredPermissions: [],
  //     lastRefreshTime: 'lorem',
  //     permissions: ['public_profile'],
  //     userID: 'lorem',
  //   },
  // ];

  const getData = async () => {
    const data = await AccessToken.getCurrentAccessToken();
    try {
      console.log('Response get token', data);

      //Filter access token only from response
      const {accessToken} = data;
      let graphRequest = new GraphRequest(
        '/me',
        {
          accessToken,
          parameters: {
            fields: {
              string: 'picture.type(large),name',
            },
          },
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            setData(result);
            setPictureURL(result.picture.data.url);
            console.log('Response from GraphApi', result);
          }
        },
      );
      const graphRequestManager = new GraphRequestManager();
      graphRequestManager.addRequest(graphRequest).start();
    } catch (err) {
      console.error(err);
    }
  };

  let DummyImage = {
    uri:
      'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png',
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          {pictureURL && (
            <Image
              style={{height: 200, resizeMode: 'contain', margin: 5}}
              source={{uri: pictureURL}}
            />
          )}
          {!pictureURL && (
            <Image
              source={DummyImage}
              style={{height: 200, resizeMode: 'contain', margin: 5}}
            />
          )}
          {/* <Text>{myData.id}</Text> */}
          <Text style={styles.text}>{myData.name}</Text>
          {/* <View>
          <Text>{pictureURL}</Text>
        </View> */}
        </View>
        <View>
          <LoginButton
            getData={getData}
            setData={setData}
            setPictureURL={setPictureURL}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    backgroundColor: '#000000',
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    marginBottom: 10,
  },
  text: {alignSelf: 'center', marginVertical: 20},
});
export default App;
