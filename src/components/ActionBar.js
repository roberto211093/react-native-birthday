import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ActionBar = props => {
  const {logout, showList, setShowList} = props;

  const newBirthday = () => {
    setShowList(!showList);
  };

  return (
    <View style={styles.viewFooter}>
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => logout()}>
          <Text style={styles.btnText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newBirthday}>
        <TouchableOpacity onPress={() => newBirthday()}>
          <Text style={styles.btnText}>
            {showList ? 'Nueva Fecha' : 'Cancelar Fecha'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionBar;

const styles = StyleSheet.create({
  viewFooter: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  logout: {
    backgroundColor: '#820000',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  newBirthday: {
    backgroundColor: '#1EA1F2',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
