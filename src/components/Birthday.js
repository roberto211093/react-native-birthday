import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Birthday = props => {
  const {birthday, deleteBirthday} = props;
  const inactive = birthday.days > 0;

  const detail = () => {
    if (birthday.days === 0) {
      return <Text style={styles.userName}>¡Hoy es su Cumpleaños!</Text>;
    } else {
      const {days} = birthday;
      return (
        <View style={styles.detail}>
          <Text style={styles.detailColor}>{-days} </Text>
          <Text style={styles.detailColor}>{days === 1 ? 'Dia' : 'Dias'}</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        inactive
          ? styles.inactive
          : birthday.days === 0
          ? styles.today
          : styles.active,
      ]}
      onPress={() => deleteBirthday(birthday)}>
      <Text style={styles.userName}>
        {birthday.name} {birthday.lastname}
      </Text>
      {inactive ? <Text style={styles.userName}>Pasado</Text> : detail()}
    </TouchableOpacity>
  );
};

export default Birthday;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  inactive: {
    backgroundColor: '#820000',
  },
  today: {
    backgroundColor: '#559204',
  },
  active: {
    backgroundColor: '#1EA1F2',
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
  },
  detailColor: {
    color: '#000',
    fontSize: 16,
  },
  detail: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
