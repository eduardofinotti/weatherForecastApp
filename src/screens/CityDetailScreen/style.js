import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
    flex: 1,
  },

  header:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#00aaf2',
    paddingVertical: 20
  },

  headerTitleText:{
    color: '#fff',
    fontSize: 20,
    marginLeft: 10
  },

  pageTitleContent: {
    alignItems: 'center',
    padding: 10
  },

  pageTitleText: {
    color: '#000',
    fontSize: 14,
    letterSpacing: 0.4
  }
  
});
