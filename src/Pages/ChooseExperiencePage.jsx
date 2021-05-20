import PropTypes from 'prop-types';
import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../App.css';
import Button from '../Components/Button'


const presentationText = "Choix du mode de l'expérience : "
const lectureMode = "Mode Lecture"
const AudioMode = "Mode écoute"


const ChooseExperiencePage = ({ navigation }) => {
    return(
        <View style={[styles.containerWelcomeScreens, {flexDirection: 'column', justifyContent: 'space-around'}]}>
            <Text style={styles.textTitleW}>{presentationText}</Text>
            <View style={styles.containerRow}>
                <View>
                    <Button navigation={navigation} destination='ChooseMode' icon='camera-outline' text={lectureMode} param ={{mode: "read"}}/>
                </View>
            </View>
            <View style={styles.containerRow}>
                <View>
                    <Button navigation={navigation} destination='ChooseMode' icon='headset-outline' text={AudioMode} param={{mode: "listen"}}/>
                </View>
            </View>
        </View>
    );
};

ChooseExperiencePage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default ChooseExperiencePage;
