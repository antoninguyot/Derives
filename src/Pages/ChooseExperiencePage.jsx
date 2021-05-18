import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../App.css';
import AsyncStorage from "@react-native-async-storage/async-storage";

const presentationText = "Choix du mode de l'expérience : "
const lectureMode = "Mode Lecture"
const AudioMode = "Mode écoute"


const ChooseExperiencePage = ({ navigation }) => {
    return(
        <View style={[styles.containerWelcomeScreens, {flexDirection: 'column', justifyContent: 'space-around'}]}>
            <Text style={styles.textTitleW}>{presentationText}</Text>
            <View style={styles.containerRow}>
                <View>
                    <TouchableOpacity
                        style={[styles.buttonStyle, {backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
                        onPress={() => {
                            navigation.replace('ChooseMode');
                        }}>
                        <Ionicons name="camera-outline" size={48} color="white" style={{textAlign: 'center'}}/>
                        <Text style={[styles.textTitleW, {textAlign: 'center'}]}>
                            {lectureMode}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerRow}>
                <View>
                    <TouchableOpacity
                        style={[styles.buttonStyle, {backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
                        onPress={() => {
                            navigation.replace('ChooseMode', {mode: 'audio'});
                        }}>
                        <Ionicons name="headset-outline" size={48} color="white" style={{textAlign: 'center'}}/>
                        <Text style={[styles.textTitleW, {textAlign: 'center'}]}>
                            {AudioMode}
                        </Text>
                    </TouchableOpacity>
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
