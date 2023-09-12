import React from 'react';
import { View } from 'react-native';
import styles from "@/styles/styles";
import BottomNavigator from "@/components/BottomNavigator";


const ShareLayout = ({children}:any) => {
  return (
    <View style={styles.container}>
      {children}
      <BottomNavigator now='share'/>
    </View>
  )
}

export default ShareLayout;
