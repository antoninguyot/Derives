import {StyleSheet} from "react-native";

export const groupStyleSheet = {
    styleAccueil:StyleSheet.create({
        welcomeText: {
            fontSize: 28,
            textAlign: "center",
            marginBottom: 50,
        },
        buttonGo: {
            paddingTop:20,
            paddingLeft:20,
            paddingRight:20,
            paddingBottom:20,
            textAlign:'center',
            borderRadius: 10,
            borderWidth: 0,
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            padding: 10,
        },
        buttonText: {
            fontSize: 28,
            textAlign: "center",
        }
    }),
    styleCCamera:StyleSheet.create({
        mainContainer: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
        },
        preview: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
    }),
    styleCredits:StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-evenly',
            flexDirection: 'column',
            alignItems:'center',
            alignContent:'center',
            padding: 10,
        },
        scrollView: {
            marginLeft:50
        },
        text: {
            fontSize: 28,
            padding: 10,
        },
        textTitle:{
            fontSize: 28,
            padding: 10,
            fontWeight:'bold'
        },
        photo:{
            width: 250,
            height: 250,
            borderRadius:150,
            resizeMode: 'stretch',
        },
        retourMenu:{
            paddingTop:20,
            paddingLeft:20,
            paddingRight:20,
            paddingBottom:20,
            textAlign:'center',
            borderRadius: 10,
            borderWidth: 0,
        }
    }),
    styleMenu:StyleSheet.create({
        textStyle: {
            fontSize: 28,
            textAlign: "center",
            padding: 10,

        },
        buttonStyle: {
            paddingTop:20,
            paddingLeft:20,
            paddingRight:20,
            paddingBottom:20,
            textAlign:'center',
            borderRadius: 10,
            borderWidth: 0,
        },
        flexContainer: {
            flex: 1,
            justifyContent: 'space-evenly',
            flexDirection: 'column',
            alignItems:'center',
            padding: 10,
        },
    }),
    styleOptionsModal:StyleSheet.create({
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
    }),
    stylePermissionsC:StyleSheet.create({
        row: {
            flexDirection: "row",
            paddingTop: 14,
        },
        text: {
            flex: 1,
            fontSize: 16,
            textAlign: "center",
            marginBottom: 50,
        },
        button: {
            flex: 2,
            textAlign: "center"
        }
    }),
    styleSas:StyleSheet.create({
        mainContainer: {
            flex: 10,
            justifyContent: 'center',
        },
        cameraContener: {
            flex: 9
        }
    }),
    styleTexte:StyleSheet.create({
        mainContainer: {
            flex: 10,
            justifyContent: 'center',
        },
        cameraContener: {
            flex: 9
        },
        textContainer: {
            flex: 1,
            position: 'absolute',
            alignSelf: 'center'
        },
        textOver: {
            fontSize: 40,
            textAlign: 'center',
            color: 'white',
            textShadowColor: 'black',
            textShadowRadius: 10
        },
        containerCaptors: {
            flex: 1,
            position: 'absolute',
            bottom: '10%',
        },
        textCaptors: {
            fontSize: 12,
            color: 'white',
            textShadowColor: 'black',
            textShadowRadius: 10
        }
    })
}
