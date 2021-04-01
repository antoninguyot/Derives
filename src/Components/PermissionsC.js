import React, {useEffect} from 'react'
import {StyleSheet, Button, Text, View} from "react-native";
import * as Permissions from 'expo-permissions';
import {usePermissions} from "expo-permissions";
import {groupStyleSheet} from "../../Appcss";

const PermissionsC = ({navigation}) => {
    const [locationPermission, askLocationPermission] = usePermissions(Permissions.LOCATION);
    const [cameraPermission, askCameraPermission] = usePermissions(Permissions.CAMERA);

    useEffect(() => {
        if (locationPermission?.status === 'granted' && cameraPermission?.status === 'granted') {
            navigation.replace('Accueil')
        }
    }, [locationPermission, cameraPermission]);

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.text}>
                    Nous avons besoin de votre position
                </Text>
                {(!locationPermission || locationPermission.status !== 'granted') &&
                <Button title="Autoriser" style={styles.button} onPress={askLocationPermission}></Button> ||
                <Button title="Autorisé" style={styles.button} disabled></Button>
                }

            </View>
            <View style={styles.row}>
                <Text style={styles.text}>
                    Nous avons besoin de votre caméra
                </Text>
                {(!cameraPermission || cameraPermission.status !== 'granted') &&
                <Button title="Autoriser" style={styles.button} onPress={askCameraPermission}></Button> ||
                <Button title="Autorisé" style={styles.button} disabled></Button>
                }
            </View>

            <View>
                {locationPermission?.status === 'granted' && cameraPermission?.status === 'granted' &&
                <Button title="Continuer" onPress={() => {
                    navigation.replace('Accueil')
                }}></Button> ||
                <Button title="Continuer" disabled></Button>
                }
            </View>
        </View>
    )
}

const styles = groupStyleSheet.stylePermissionsC

export default PermissionsC
