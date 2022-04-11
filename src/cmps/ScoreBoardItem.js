import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScoreBoardItem = ({ player, index }) => {
    return (
        <View style={[styles.container, index === 0 && { backgroundColor: 'tomato' }]}>
            <Text style={styles.fontSize}>{index + 1} </Text>
            <Text style={styles.fontSize}>{player.name} </Text>
            <Text style={styles.fontSize}>{player.score}</Text>
        </View>
    )
}

export default ScoreBoardItem
const styles = StyleSheet.create({
    container: {
        borderBottomColor: 'teal',
        borderWidth: 3,
        borderRadius: 30,
        marginVertical: 10,
        marginHorizontal: 40,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: 'lightcyan',
        justifyContent: 'space-between',
    },
    fontSize: {
        fontSize: 25,
    },
})