import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComp from './ButtonComp'

const LostGame = ({ modalOff, modalVisible, resetGame }) => {

    return (


        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    modalOff();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>You Lost!</Text>
                        <ButtonComp color='red' label='Close' onPress={() => {
                            modalOff()
                            resetGame()
                        }} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default LostGame

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
    title: {
        fontSize: 40,
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
        backgroundColor: "#EEEEEE",
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