import { StyleSheet, Text } from 'react-native'
import React from 'react'

const Header = ({ title }) => {
    return (
        <Text style={styles.header}>{title}</Text>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: 'center'
    }
})