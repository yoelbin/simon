import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'


const Sound = require('react-native-sound');

Sound.setCategory('Ambient');

const GamePad = ({ color, onPress, activated }) => {

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <View style={
                [styles.gamePad,
                { backgroundColor: `${color}` },
                activated ? { opacity: 0.25 } : '']
            }>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    gamePad: {
        margin: 5,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 3,
        borderStyle: 'solid',

    }
})
export default GamePad