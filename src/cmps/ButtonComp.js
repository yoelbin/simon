import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonComp = ({ label, onPress, color = '#95D1CC' }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.textContainer, { backgroundColor: color }]}>
            <Text style={[styles.text]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default ButtonComp

const styles = StyleSheet.create({
    textContainer: {
        alignItems: "center",
        margin: 10,
        marginHorizontal: 25,
        borderRadius: 40,
    },
    text: {
        fontSize: 30,
        fontWeight: '500',
        width: 200,
        color: '#EFFFFD',
        padding: 15,
        textAlign: 'center'
    }
})