import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

import {Focus} from './src/features/focus/focus';
import {FocusHistory} from './src/features/focus/FocusHistory';
import {Timer} from './src/features/Timer/timer'
import {RoundedButton} from './src/components/roundedButton';

import {colors} from './src/utils/colors';
import {spacing} from './src/utils/size'

const STATUSES = {
  COMPLETE: 1, 
  CANCELLED: 0
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState('');//Change Page State
  const [focusHistory, setFocusHistory] = useState([]);

//SETTING HISTORY WITH COMPLETION STATE
const addFocusHistorySubjectWithState = (subject, status) => {
  setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1), subject, status}])
}

console.log(focusHistory)

const onClear = () => { 
  setFocusHistory([])
}
//STORING ITEMS IN ASYNC STORAGE
const saveFocusHistory = async () => {
  try{
    await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory ));
  } catch(e) {
    console.log(e);
  }
};

const loadFocusHistory = async () => {
  try{ 
    const history = await AsyncStorage.getItem('focusHistory');

    if (history && JSON.parse(history).length) {
      setFocusHistory(JSON.parse(history));
    }
  } catch(e) {
    console.log(e);
  }
}

useEffect(() => {
  loadFocusHistory();
}, [])

useEffect(() => {
  saveFocusHistory();
}, [focusHistory])

//END OF STORING ITEMS IN LOCALSTORAGE
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject = {focusSubject} 
        onTimerEnd = {() => {
          addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
          setFocusSubject(null);
        }}
        clearSubject = {() => {
          addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
          setFocusSubject(null)
          }}
        />
      ) : (
        <>
          <Focus addSubject = {setFocusSubject} />
          <FocusHistory focusHistory = {focusHistory} onClear = {onClear}/>
        </>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? spacing.xl: spacing.lg,
    flex: 1,
    backgroundColor: '#0047AB',
  },

});
