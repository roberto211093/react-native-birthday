import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

const initData = {
  email: '',
  password: '',
  repeatPassword: '',
};
const RegisterForm = props => {
  const {changeForm} = props;
  const [formData, setFormData] = useState(initData);
  const [formError, setFormError] = useState({});

  const sendData = async () => {
    const {email, password, repeatPassword} = formData;
    let errors = {};
    setFormError(errors);
    if (!email || !password || !repeatPassword) {
      !email && (errors.email = true);
      !password && (errors.password = true);
      !repeatPassword && (errors.repeatPassword = true);
      setFormError(errors);
      return;
    }
    if (!validateEmail(email)) {
      errors.email = true;
      setFormError(errors);
      return;
    }
    if (password.length < 6) {
      errors.password = true;
      setFormError(errors);
      return;
    }
    if (password !== repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
      setFormError(errors);
      return;
    }
    let e = email.toLowerCase();
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(e, password);
      if (!response) {
        errors.email = true;
        errors.password = true;
        setFormError(errors);
      }
    } catch (error) {
      errors.email = true;
      errors.password = true;
      setFormError(errors);
    }
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Email"
        placeholderTextColor="#969696"
        onChange={e => setFormData({...formData, email: e.nativeEvent.text})}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Password"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={e => setFormData({...formData, password: e.nativeEvent.text})}
      />
      <TextInput
        style={[styles.input, formError.repeatPassword && styles.error]}
        placeholder="Repeat Password"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={e =>
          setFormData({...formData, repeatPassword: e.nativeEvent.text})
        }
      />
      <TouchableOpacity onPress={() => sendData()}>
        <Text style={styles.btnText}>Registrarse</Text>
      </TouchableOpacity>

      <View style={styles.changeView}>
        <TouchableOpacity onPress={() => changeForm()}>
          <Text style={styles.btnText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
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
  btnText: {
    color: '#FFF',
    fontSize: 18,
  },
  changeView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  error: {
    borderColor: '#940C0C',
  },
});
