import React, { useState, useEffect, componentDidUpdate } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';

import { RoundedButton } from '../../components/roundedButton';
import { Timing } from './Timing';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/size';
import { Countdown } from '../../components/Countdown';

const MINUTES = {
  COMPLETE: .1,
};

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(MINUTES.COMPLETE);
  const [isStarted, setIsStarted] = useState(true); //Start Timer
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      //FOR APPLE IOS
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      //FOR ANDROID
      Vibration.vibrate(1000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(MINUTES.COMPLETE);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    console.log(min);
  };

  // const handleClick =()=> {
  //   componentDidUpdate(!isStarted)
  //   }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: spacing.lg }}>
        <View style={styles.countdown}>
          <Countdown
            minutes={minutes}
            isPaused={!isStarted}
            onProgress={onProgress}
            onEnd={onEnd}
          />
        </View>
        <View style={{ paddingTop: spacing.xxxl, paddingBottom: spacing.md }}>
          <Text style={styles.title}>Focusing on :</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>

        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10, marginBottom: spacing.md }}
        />

        <View style={styles.buttonWrapper}>
          <Timing onChangeTime={changeTime} />
        </View>

        <View style={styles.buttonWrapper}>
          {isStarted ? (
            <RoundedButton
              style={styles.start}
              title="Pause"
              size={130}
              onPress={() => setIsStarted(false)}
            />
          ) : (
            <RoundedButton
              style={styles.start}
              title="Start"
              size={130}
              onPress={() => setIsStarted(true)}
              // onPress={() => {
              //   alert('You tapped the button!');
              // }}
              // title="Press Me"
            />
          )}
        </View>

        <View style={styles.clearSubject}>
          <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
