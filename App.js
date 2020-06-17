import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  YellowBox,
} from 'react-native';
import {decode, encode} from 'base-64';
import firebase from './src/utils/firebase';
import 'firebase/auth';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';

!global.btoa && (global.btoa = encode);
!global.atob && (global.atob = decode);

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      firebase.auth().onAuthStateChanged(res => {
        res ? setUser(res) : setUser(null);
      });
    };
    fetchData();
  }, [user]);

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#15242B" />
      <SafeAreaView style={styles.background}>
        {user ? <ListBirthday user={user} logout={logout} /> : <Auth />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15242B',
    height: '100%',
  },
});

export default App;
