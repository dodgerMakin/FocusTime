import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import {TextInput} from "react-native-paper";
import {RoundedButton} from '../../components/roundedButton'; 
import { useFonts } from 'expo-font';
import {fontSizes, spacing} from '../../utils/size';
import {colors} from '../../utils/colors';
import {gugi} from '../../utils/fonts/Gugi-Regular.ttf'


export const Focus =({addSubject})=> {
  const [tmpItem, setTmpItem] = useState (null);
  return (
    <View style={styles.container}>
        <View style = {styles.titleContainer} >
            <Text style = {styles.title}>What would you like to focus on??</Text>
            <View style = {styles.inputContainer} >
                <TextInput style = {{flex:1, marginRight:20}}  
                    onSubmitEditing = {({nativeEvent}) => {
                      addSubject(nativeEvent.text);
                      // setTmpItem(nativeEvent.text);
                    }}
                    // value={tmpItem}
                    // onSubmitEditing={({ nativeEvent: { text } }) => setTmpItem(text)}
                />
                
                <RoundedButton style = {styles.button} size = {48} title = "+" onPress = {() => {
                  addSubject(tmpItem);
                }} />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: gugi,
    backgroundColor: '#0047AB'
  },
  titleContainer :{
    flex:.5,
    padding:spacing.md,
    justifyContent: "center"
  },
  title: {
    color:colors.white,
    width: 350,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBoldItalic'
  }, 
  inputContainer: {
    paddingTop:spacing.md,
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    paddingRight: 3
  }
});
