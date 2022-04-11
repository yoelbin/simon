import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScoreBoardItem from '../cmps/ScoreBoardItem';
import ButtonComp from '../cmps/ButtonComp';
import firestoreService from '../services/firestoreService';



const HighScoreScreen = ({ navigation }) => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async () => {
            let players = await firestoreService.getRecordList()
            setPlayers(players);
        }
        getPlayers()
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.header}>High Scores</Text>
            <View style={styles.leaderboardContainer}>
                <View style={styles.scoreHeaderContainer}>
                    <Text style={styles.headerFS}>Pos.</Text>
                    <Text style={styles.headerFS}>Name</Text>
                    <Text style={styles.headerFS}>Score</Text>
                </View>
                <SafeAreaView style={styles.boardContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={players}
                        keyExtractor={player => player.id}
                        renderItem={({ item, index }) => (
                            <ScoreBoardItem index={index} player={item} />
                        )}
                    />
                </SafeAreaView>
            </View>
            <ButtonComp label='Back' onPress={() => navigation.goBack()} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EEEEEE'
    },
    leaderboardContainer: {
        flex: 3
    },
    scoreHeaderContainer: {
        borderWidth: 3,
        borderRadius: 30,
        marginHorizontal: 30,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: 'blue',
        backgroundColor: 'cyan',
        justifyContent: 'space-between',
    },
    headerFS: {
        fontSize: 30,
    },
    header: {
        flex: 1,
        fontSize: 50,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '600'
    },
    backBtn: {
        borderWidth: 3,
        fontSize: 30,
        fontWeight: '600'
    }
})

export default HighScoreScreen
