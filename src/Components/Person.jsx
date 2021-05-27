import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../App.css';

const Person = ({ image, name, description }) => (
  <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
    <Image
      style={{
        width: 125, height: 125, borderRadius: 75, resizeMode: 'contain',
      }}
      source={image}
    />
    <View style={{ paddingHorizontal: 15, flexDirection: 'column', justifyContent: 'space-around' }}>
      <Text style={[styles.textTitleW, { fontSize: 24, textAlign: 'left' }]}>{name}</Text>
      <Text style={styles.textLittleW}>{description}</Text>
    </View>
  </View>
);

Person.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired,
};

export default Person;
