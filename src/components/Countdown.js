import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {colors} from '../utils/colors';
import {spacing, fontSizes} from '../utils/size'

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}`: time;

export const Countdown = ({
  minutes = .1, 
  isPaused,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);

  const countDown = () => {
      setMillis((time) => {
        //WHEN COUNTDOWN IS FINISHED
        if (time === 0) {
          //Clean Up work
          clearInterval(interval.current);
          return time;
        }

        const timeLeft = time - 1000;
        return timeLeft;
      })
  }

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes))
    if (millis === 0) {
      onEnd();
    }
  }, [millis])
  
  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])
  // useEffect(() => {
  //   console.log(millis)
  // }, [millis])

  useEffect(() => {
    if (isPaused) {
      //MORE SAFETY....BEST PRACTICE...CLEAN UP REFERENCES WE USE
      if (interval.current) clearInterval(interval.current);
      return;
    }
    
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused])
  

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return(
    <Text style = {Styles.text}>{formatTime(minute)}:{formatTime(second)}</Text>
  )
}

const Styles = StyleSheet.create({
  text: { 
    color: colors.white, 
    fontWeight: 'bold',
    padding: spacing.lg,
    fontSize: fontSizes.xxxl,
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  }
})