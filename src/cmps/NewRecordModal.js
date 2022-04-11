import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ButtonComp from './ButtonComp'
import firestoreService from '../services/firestoreService'

const NewRecord = ({ score, modalOff, modalVisible, resetGame }) => {
    const [name, setName] = useState('')
    const finishSave = async () => {
        await firestoreService.saveRecord({ name: name, score: score })
        modalOff()
    }
    return (

        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    modalOff();
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.mainHeader}>New Record</Text>
                        <Text style={styles.scoreText}>Your Score is {score} </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Name"
                            onChangeText={newInput => setName(newInput)}
                        />
                        <ButtonComp label='Save' onPress={() => {
                            finishSave()
                            resetGame()
                        }} />
                        <ButtonComp color='red' label='Dont Save' onPress={() => {
                            modalOff()
                            resetGame()
                        }} />

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default NewRecord

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',

    }, input: {
        fontSize: 25,
        backgroundColor: 'white',
        height: 80,
        borderRadius: 40,
        textAlign: 'center',
    },
    mainHeader: {
        fontSize: 40,
        fontWeight: '900',
        color: '#6FB2D2',
        textAlign: 'center'
    },
    scoreText: {
        fontSize: 30,
        fontWeight: '900',
        color: 'tomato',
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
})