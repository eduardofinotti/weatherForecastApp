import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fafafa'
    },
  
    header:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#00aaf2',
      paddingVertical: 20
    },
  
    headerTitleText:{
      color: '#fff',
      fontSize: 20
    },
  
    dataContent: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 50
    },
  
    emptyTitle: {
      color: '#000',
      fontSize: 20,
      textAlign: 'center',
      width: '80%',
      fontWeight: 'bold',
      letterSpacing: 0.01
    },
  
    emptySubtitle: {
      color: '#000',
      opacity: 0.5,
      fontSize: 16,
      textAlign: 'center',
      width: '80%',
      marginTop: 20,
      letterSpacing: 0.01
    },
    
    resultContent: {
      flex: 1,
      backgroundColor: '#fafafa',
      paddingBottom: 20,
      paddingHorizontal: 15
    }
  
   });
