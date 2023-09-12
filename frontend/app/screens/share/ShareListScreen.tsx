import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from "@/styles/styles";
import {SvgXml} from "react-native-svg";
import BottomNavigator from "@/components/BottomNavigator";


const ShareListScreen = ({navigation}:any) => {
  const test: string = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="80" viewBox="0 0 24 24" fill="#ffffff" color="#ffffff">
  <path d="M23.1213 9.06887L15.5363 1.48287C14.5975 0.546856 13.3259 0.0212402 12.0003 0.0212402C10.6746 0.0212402 9.40301 0.546856 8.46426 1.48287L0.879256 9.06887C0.599682 9.34665 0.378026 9.67717 0.227139 10.0413C0.0762514 10.4053 -0.00086626 10.7958 0.00025622 11.1899V21.0069C0.00025622 21.8025 0.316327 22.5656 0.878936 23.1282C1.44155 23.6908 2.20461 24.0069 3.00026 24.0069H21.0003C21.7959 24.0069 22.559 23.6908 23.1216 23.1282C23.6842 22.5656 24.0003 21.8025 24.0003 21.0069V11.1899C24.0014 10.7958 23.9243 10.4053 23.7734 10.0413C23.6225 9.67717 23.4008 9.34665 23.1213 9.06887V9.06887ZM15.0003 22.0069H9.00026V18.0729C9.00026 17.2772 9.31633 16.5142 9.87894 15.9515C10.4415 15.3889 11.2046 15.0729 12.0003 15.0729C12.7959 15.0729 13.559 15.3889 14.1216 15.9515C14.6842 16.5142 15.0003 17.2772 15.0003 18.0729V22.0069ZM22.0003 21.0069C22.0003 21.2721 21.8949 21.5264 21.7074 21.714C21.5198 21.9015 21.2655 22.0069 21.0003 22.0069H17.0003V18.0729C17.0003 16.7468 16.4735 15.475 15.5358 14.5373C14.5981 13.5997 13.3263 13.0729 12.0003 13.0729C10.6742 13.0729 9.40241 13.5997 8.46472 14.5373C7.52704 15.475 7.00026 16.7468 7.00026 18.0729V22.0069H3.00026C2.73504 22.0069 2.48069 21.9015 2.29315 21.714C2.10561 21.5264 2.00026 21.2721 2.00026 21.0069V11.1899C2.00118 10.9248 2.10645 10.6709 2.29326 10.4829L9.87826 2.89987C10.442 2.3388 11.2049 2.02381 12.0003 2.02381C12.7956 2.02381 13.5586 2.3388 14.1223 2.89987L21.7073 10.4859C21.8933 10.6731 21.9985 10.9259 22.0003 11.1899V21.0069Z" fill="#9BA5B7"/>
    </svg>`;
  return (
    <View style={styles.container}>
      <Text>ShareListScreen</Text>
      <BottomNavigator now='share'/>
    </View>
  );
};

export default ShareListScreen;
