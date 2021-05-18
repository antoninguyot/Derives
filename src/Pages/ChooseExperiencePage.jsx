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
    const [isNew, setIsNew] = useState();

    /**
     * Navigue soit
     * - jusqu'à l'expérience dans le mode souhaité (première expérience)
     * - jusqu'au choix du mode (immersif, manuel) sinon
     * @returns {Promise<void>}
     */
    const setIsNewUser = async () => {
        try {
            const value = await AsyncStorage.getItem('firstConnexionDate')
            if(value !== null) {
                setIsNew(false)
            } else {
                const jsonValue = JSON.stringify(new Date)
                await AsyncStorage.setItem('firstConnexionDate', jsonValue)
                setIsNew(true)
            }
        } catch(e) {
            console.log("erreur", e)
        }
    };

    useEffect(() => {
        setIsNewUser().then(() => {
            console.log(isNew)
        });
    },[])

    return(
        <View style={[styles.containerWelcomeScreens, {flexDirection: 'column', justifyContent: 'space-around'}]}>
            <Text style={styles.textTitleW}>{presentationText}</Text>
            <View style={styles.containerRow}>
                <View>
                    {/*Mode Visuel, dépend si l'utilisateur est nouveau ou non*/}
                    {isNew
                    && (
                        <TouchableOpacity
                            style={[styles.buttonStyle, {backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
                            onPress={() => {
                                navigation.replace('TextGenerator', {mode: 'hybrid'});
                            }}
                        >
                            <Ionicons name="camera-outline" size={48} color="white" style={{textAlign: 'center'}}/>
                            <Text style={[styles.textTitleW, {textAlign: 'center'}]}>
                                {lectureMode}
                            </Text>
                        </TouchableOpacity>
                    )
                    || <TouchableOpacity
                        style={[styles.buttonStyle, {backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
                        onPress={() => {
                            navigation.replace('ChooseMode');
                        }}>
                        <Ionicons name="camera-outline" size={48} color="white" style={{textAlign: 'center'}}/>
                        <Text style={[styles.textTitleW, {textAlign: 'center'}]}>
                            {lectureMode}
                        </Text>
                       </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={styles.containerRow}>
                <View>
                    {/*Mode Audio, dépend si l'utilisateur est nouveau ou non*/}
                    {isNew
                    && (
                        <TouchableOpacity
                            style={[styles.buttonStyle, {backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
                            onPress={() => {
                                navigation.replace('AudioPage', {mode: 'audio'});
                            }}
                        >
                            <Ionicons name="headset-outline" size={48} color="white" style={{textAlign: 'center'}}/>
                            <Text style={[styles.textTitleW, {textAlign: 'center'}]}>
                                {AudioMode}
                            </Text>
                        </TouchableOpacity>
                    )
                    || <TouchableOpacity
                        style={[styles.buttonStyle, {backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
                        onPress={() => {
                            navigation.replace('ChooseMode', {mode: 'audio'});
                        }}
                    >
                        <Ionicons name="headset-outline" size={48} color="white" style={{textAlign: 'center'}}/>
                        <Text style={[styles.textTitleW, {textAlign: 'center'}]}>
                            {AudioMode}
                        </Text>
                    </TouchableOpacity>
                    }
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
