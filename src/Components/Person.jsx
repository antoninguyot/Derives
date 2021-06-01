import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const Person = ({ image, name, description }) => (
  <View style={styles.container}>
    <View width="40%">
      <Image source={image} style={styles.image}/>
    </View>
    <View width="60%">
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    borderBottomColor: 'white',
    borderBottomWidth: 0.2,
    borderRadius: 200,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  item: {
    width: '50%', // is 50% of container width
  },
  name: {
    color: '#bfbfbf',
    // fontFamily: 'Antonio',
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    color: '#bfbfbf',
    fontSize: 14,
    padding: 0,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 75,
  },
});

Person.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired,
};

export default Person;
