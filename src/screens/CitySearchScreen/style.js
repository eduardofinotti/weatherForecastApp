import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },

  header:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#00aaf2',
    paddingVertical: 20,
  },

  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    color: '#fff',
    flex: 1
  },

  emptyContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },

  emptyText:{
    color: '#000',
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
    letterSpacing: 0.6
  },

  resultContent: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingBottom: 20,
    paddingHorizontal: 15
  }
  
});
