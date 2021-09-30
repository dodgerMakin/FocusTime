import React from 'react';
import {View, StyleSheet} from 'react-native';
import {spacing}  from '../../utils/size'

import {RoundedButton} from '../../components/roundedButton';

export const Timing = ({onChangeTime}) => {
  return(
    <View style = {styles.timeContainer}>
      <View styles = {styles.timeButton}>
        <RoundedButton size = {75} title = "10" onPress = {() => onChangeTime(10)}/>
      </View>

      <View styles = {styles.timeButton}>
        <RoundedButton size = {75} title = "15" onPress = {() => onChangeTime(15)}/>
      </View>

      <View styles = {styles.timeButton}>
        <RoundedButton size = {75} title = "20" onPress = {() => onChangeTime(20)}/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  timeButton: {
     flex: 1,
    alignItems:'center',
  },
  timeContainer: {
    flex : 1,
    padding : 15,
    flexDirection : 'row',
    justifyContent : "center",
  }
}) 