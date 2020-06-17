import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import Birthday from './Birthday';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import moment from 'moment';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

const ListBirthday = props => {
  const {user, logout} = props;
  const [showList, setShowList] = useState(true);
  const [birthdayActive, setBirthdayActive] = useState([]);
  const [birthdayInactive, setBirthdayInactive] = useState([]);
  const [reloadList, setReloadList] = useState(false);

  const formatData = items => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const arrayActiveTemp = [];
    const arrayInactiveTemp = [];

    items.forEach(item => {
      const dateBirth = new Date(item.birthday.seconds * 1000); //obtenemos la fecha actual del cumple que nos llega
      const dateBirthday = moment(dateBirth); // Creamos el objeto Fecha
      const currentYear = moment().get('year'); // Obtenemos el año actual para facilitar la comparacion futura
      dateBirthday.set({year: currentYear});

      const diffDate = currentDate.diff(dateBirthday, 'days'); //Dias restantes para el cumple
      const itemTemp = item;
      itemTemp.dateBirth = dateBirthday;
      itemTemp.days = diffDate;
      console.log(itemTemp.days, 'itemTemp.days ');
      if (diffDate <= 0) {
        arrayActiveTemp.push(itemTemp);
      } else {
        arrayInactiveTemp.push(itemTemp);
      }
    });

    setBirthdayActive(arrayActiveTemp);
    setBirthdayInactive(arrayInactiveTemp);
  };

  const deleteBirthday = birthday => {
    const {name, lastname, id} = birthday;
    Alert.alert(
      'Eliminar cumpleaños',
      `¿Estas seguro de eliminar el cumpleaños de ${name} ${lastname}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            console.log('cancel');
            db.collection(user.uid)
              .doc(id)
              .delete()
              .then(() => {
                setReloadList(true);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsArray = [];
        const res = await db
          .collection(user.uid)
          .orderBy('birthday', 'asc')
          .get();
        res.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        formatData(itemsArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setReloadList(false);
  }, [reloadList]);

  return (
    <View style={styles.container}>
      {showList ? (
        <>
          <ScrollView
            style={styles.scrollView}
            contentInsetAdjustmentBehavior="automatic">
            {birthdayActive.map((item, index) => (
              <Birthday
                key={'a' + (index + 1)}
                birthday={item}
                deleteBirthday={deleteBirthday}
              />
            ))}
            {birthdayInactive.map((item, index) => (
              <Birthday
                key={'i' + (index + 1)}
                birthday={item}
                deleteBirthday={deleteBirthday}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <AddBirthday
          user={user}
          setShowList={setShowList}
          setReloadList={setReloadList}
        />
      )}
      <ActionBar
        logout={logout}
        showList={showList}
        setShowList={setShowList}
      />
    </View>
  );
};

export default ListBirthday;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  scrollView: {
    marginBottom: 50,
    width: '100%',
  },
});
