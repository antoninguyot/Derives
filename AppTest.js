import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import BackCamera from "./src/components/BackCamera";

export default class AppTest extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <BackCamera/>
                <Text>Pas depuis l'ouverture: 15</Text>
                <Text>State: Lol</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: 20 //this amount should be equal to the header height so that any items displayed inside the container will start after the absolute positioned header
    },
    textContainer: {
        textColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    }
});