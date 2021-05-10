import {StyleSheet, StatusBar} from "react-native";

export const styles = StyleSheet.create({
  //TEXT STYLES
  textTitleW: {
    color: '#bfbfbf',
    fontFamily: 'Antonio',
    fontSize: 34,
    textAlign: 'center',
  },
  textW: {
    color: '#bfbfbf',
    fontFamily: 'Antonio',
    fontSize: 24,
    padding : 10,
  },
  textLittleW: {
    color:'#bfbfbf',
    fontSize: 14,
    padding: 0,
  },
  textB: {
    color: 'black',
    fontFamily: 'Antonio',
    fontSize: 24,
    padding : 10,
  },
  textLittleB: {
    color:'black',
    fontSize: 14,
    textAlign:'center' // Button "Credits" From Choose Params
  },
  textVers: {
    fontFamily: 'Antonio',
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10
  },
  textCaptorsTest: {
    fontSize: 12,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10
  },

  // CONTAINER STYLES
  containerWelcomeScreens: {
    flex: 1,
    justifyContent:'center',
    padding: 10,
    backgroundColor: 'black',
  },
  containerCredits: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  containerCaptorsTest: {
    flex: 1,
    position: 'absolute',
    bottom: '10%',
  },
  containerPreviewCamera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerCamera: {
    flex: 10,
    justifyContent: 'center',
  },
  containerText: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center'
  },
  containerRow: {
    flexDirection: "row",
    paddingTop: 14,
  },
  containerChooseMode: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'black',
    padding: 10,
  },
  containerButtonCredits: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10,
    backgroundColor:'black'
  },

  //BUTTON STYLE
  buttonStyle: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'white',
    backgroundColor:'black',

  },
  buttonCreditsStyle: {
    paddingTop: 5,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 5,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'white',
    backgroundColor:'black',
  },

  //IMAGE STYLE
  photo: {
    width: 250,
    height: 250,
    borderRadius: 150,
    resizeMode: 'stretch',
  },
})
