import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/es.js';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

const initData = {
  name: '',
  lastname: '',
  birthday: null,
};
const AddBirthday = props => {
  const {user, setShowList, setReloadList} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dataForm, setDataForm] = useState(initData);
  const [formError, setFormError] = useState({});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDataForm({...dataForm, birthday: date});
    hideDatePicker();
  };

  const sendData = async () => {
    const {name, lastname, birthday} = dataForm;
    let errors = {};
    setFormError(errors);
    if (!name || !lastname || !birthday) {
      !name && (errors.name = true);
      !lastname && (errors.lastname = true);
      !birthday && (errors.birthday = true);
      return;
    }
    const data = dataForm;
    data.birthday.setYear(0);
    try {
      const response = await db.collection(user.uid).add(data);
      if (!response) {
        errors.name = true;
        errors.lastname = true;
        errors.birthday = true;
        setFormError(errors);
        return;
      }
      setShowList(true);
      setReloadList(true);
    } catch (error) {
      errors.name = true;
      errors.lastname = true;
      errors.birthday = true;
      setFormError(errors);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.name && styles.error]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={e => setDataForm({...dataForm, name: e.nativeEvent.text})}
        />
        <TextInput
          style={[styles.input, formError.lastname && styles.error]}
          placeholder="Apellido"
          placeholderTextColor="#969696"
          onChange={e =>
            setDataForm({...dataForm, lastname: e.nativeEvent.text})
          }
        />
        <View
          style={[
            styles.input,
            styles.datepicker,
            formError.birthday && styles.error,
          ]}>
          <Text
            style={{
              fontSize: 18,
              color: dataForm.birthday ? '#FFF' : '#969696',
            }}
            onPress={() => showDatePicker()}>
            {dataForm.birthday
              ? `${moment(dataForm.birthday).format('LL')}`
              : 'Fecha de Nacimiento'}
          </Text>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity onPress={() => sendData()}>
          <Text style={styles.addButton}>Crear Cumpleaños</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddBirthday;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#FFF',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1E3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1E3040',
  },
  datepicker: {
    justifyContent: 'center',
  },
  addButton: {
    fontSize: 18,
    color: '#FFF',
  },
  error: {
    borderColor: '#940C0C',
  },
});
