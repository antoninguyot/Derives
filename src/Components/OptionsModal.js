import {StyleSheet, Text, View, SectionList, Button} from 'react-native';
import React from 'react'

const OptionsModal = ({
                          latitude,
                          longitude,
                          localityDensity,
                          localityType,
                          speed,
                          activity,
                          temperature,
                          weather,
                          saison,
                          moment
                      }) => {
    return (
        <View>
            <Text style={{paddingHorizontal: 10}}>Ces paramètres sont pris en compte pour modifier votre expérience de l'application. Essayez de les
                faire varier!</Text>
            <SectionList
                sections={[
                    {
                        title: 'Localisation', data: [
                            {key: 'Latitude', value: latitude},
                            {key: 'Longitude', value: longitude},
                            {key: 'Densité de population', value: localityDensity},
                            {key: 'Milieu', value: localityType},
                        ]
                    },
                    {
                        title: 'Mouvement', data: [
                            {key: 'Vitesse', value: speed},
                            {key: 'Activité', value: activity},
                        ]
                    },
                    {
                        title: 'Météo', data: [
                            {key: 'Température', value: temperature},
                            {key: 'Météo', value: weather},
                        ]
                    },
                    {
                        title: 'Date & heure', data: [
                            {key: 'Date', value: (new Date).toLocaleDateString('fr-FR')},
                            {key: 'Saison', value: saison},
                            {key: 'Période', value: moment},
                        ]
                    },
                ]}
                renderItem={({item}) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listKey}>{item.key}</Text>
                        <Text style={styles.listValue}>{item.value}</Text>
                    </View>
                )}
                renderSectionHeader={({section}) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignContent: 'space-between',
        backgroundColor: 'white',
    },
    listKey: {
        flex: 1,
        fontWeight: '400'
    },
    listValue: {
        flex: 1,
        textAlign: 'right',
        color: 'grey'
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 15,
        // backgroundColor: 'white'
    }
})

export default OptionsModal