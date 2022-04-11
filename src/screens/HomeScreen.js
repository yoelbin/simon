import { Text, View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import ButtonComp from '../cmps/ButtonComp';



const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Simon</Text>
            </View>
            <ButtonComp label="Play Simon" onPress={() => navigation.navigate('Game')} />
            <ButtonComp label="High Scores" onPress={() => navigation.navigate('HighScore')} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 25
    },
    headerContainer: {
        margin: 50,
    },
    header: {
        fontSize: 50,
        alignSelf: 'center',
        fontWeight: '600'
    },
})

export default HomeScreen
