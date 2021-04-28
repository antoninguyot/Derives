import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  title: {
    fontFamily: 'Antonio',
    fontSize: 34,
    textAlign: 'center',
    color: '#bfbfbf',
  },
  text: {
    color: '#bfbfbf',
    padding : 10,
    fontSize: 28,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'black'
  },
  row: {
    flexDirection: "row",
    paddingTop: 14,
  },
  button: {
    flex: 2,
    textAlign: "center",
    padding: 20
  },

  welcomeText: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 50,
  },
  buttonGo: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 0,
  },
  //mainContainer: {
  //  flex: 1,
  //  justifyContent: 'center',
  //  padding: 10,
  //},
  buttonText: {
    fontSize: 28,
    textAlign: "center",
  },
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
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
  },
  scrollView: {
    marginLeft: 50,
    marginRight:50
  },
  //text: {
  //  fontSize: 28,
  //  padding: 10,
  //},
  textTitle: {
    fontSize: 28,
    padding: 10,
    fontWeight: 'bold',
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 150,
    resizeMode: 'stretch',
  },
  retourMenu: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 0,
  },

  textStyle: {
    fontSize: 28,
    textAlign: "center",
    padding: 10,
    color:'black',
    fontFamily:'Antonio'
  },
  textCreditsStyle: {
    fontSize: 14,
    textAlign: "center",
    padding: 0,
    fontFamily:'Antonio',
    color:'black'
  },
  buttonStyle: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor:'white'
  },
  buttonCreditsStyle: {
    paddingTop: 5,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 5,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor:'white'
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'black',
    padding: 10,

  },
  flexCreditsContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingLeft:320,
    padding: 10,
    backgroundColor:'black'
  },
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
  },
  //row: {
  //  flexDirection: "row",
  //  paddingTop: 14,
  //},
  //text: {
  //  flex: 1,
  //  fontSize: 16,
  //  textAlign: "center",
  //  marginBottom: 50,
  //},
  //button: {
  //  flex: 2,
  //  textAlign: "center"
  //},
  mainContainerCamera: {
    flex: 10,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 9
  },
  //mainContainer: {
  //  flex: 10,
  //  justifyContent: 'center',
  //},
  //cameraContener: {
  //  flex:  9
  //},
  textContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center'
  },
  textOver: {
    fontFamily: 'Antonio',
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
