// import React from 'react';
// import Navigation from "./Navigation/Navigation";

// export default function App() {
//   return (
//     <Navigation/>
//   );
// };

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Pedometer} from 'expo-sensors';

export default class AppSteps extends React.Component {
    state = {
        currentStepCount: 0,
        startDate: Date.now() / 1000,
        pastSeconds: 0,
        averageSteps: 0,
    };

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps,
            });
            this._setAverageSteps();
        });
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    _setAverageSteps() {
        this.setState({
            pastSeconds: ((Date.now() / 1000) - this.state.startDate).toFixed(2),

        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Pas depuis l'ouverture: {this.state.currentStepCount}</Text>
                <Text>Secondes depuis l'ouverture : {this.state.pastSeconds}</Text>
                <Text>Pas par seconde: {this.state.averageSteps}</Text>
                <Text>State: {this.state.averageSteps}</Text>
            </View>
        );
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
});