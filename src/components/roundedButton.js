import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native";


export const RoundedButton = ({
  style = {},
  textStyle = {}, 
  size = 120,
  ...props
}) => {
  return(
    <TouchableOpacity style = {[styles(size).radius, style]}>
        <Text style = {[ styles(size).text, textStyle]} > {props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = (size) =>
StyleSheet.create({
  radius: {
    borderRadius: size/2,
    width:size,
    height:size,
    borderColor: "white",
    borderWidth: 2,
    alignContent: 'center',
    justifyContent: 'center'
  },

  text: {
    color:"white",
    fontSize:20,
    textAlign: 'center',
    paddingBottom: 5,
    paddingRight: 3
  }
})