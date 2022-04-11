import { SafeAreaView, View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import GamePad from '../cmps/GamePad';
import ButtonComp from '../cmps/ButtonComp';

import redSoundFile from '../assets/sounds/red.mp3';
import blueSoundFile from '../assets/sounds/blue.mp3';
import greenSoundFile from '../assets/sounds/green.mp3';
import yellowSoundFile from '../assets/sounds/yellow.mp3';
import wrongSoundFile from '../assets/sounds/wrong.mp3';



import helpers from '../helpers/helpers'


import firestoreService from '../services/firestoreService';
import NewRecord from '../cmps/NewRecordModal';
import LostGame from '../cmps/LostGameModal';




// sounds variables
const Sound = require('react-native-sound');

Sound.setCategory('Ambient');


const redSound = new Sound(redSoundFile);
const blueSound = new Sound(blueSoundFile);
const greenSound = new Sound(greenSoundFile);
const yellowSound = new Sound(yellowSoundFile);
const wrongSound = new Sound(wrongSoundFile);



// game pads data
const pads = [{
    color: 'red',
    play: () => redSound.play(),
    sound: new Sound(redSoundFile)
},
{
    color: 'blue',
    play: () => blueSound.play(),
    sound: new Sound(blueSoundFile)
},
{
    color: 'green',
    play: () => greenSound.play(),
    sound: new Sound(greenSoundFile)
}, {
    color: 'yellow',
    play: () => yellowSound.play(),
    sound: new Sound(yellowSoundFile)
}]


const initialGameState = {
    isPlayingSequence: false,
    gamePattern: [],
    level: 0,
    isUserTurn: false,
    userClicksPattern: [],
}

const GameScreen = ({ navigation }) => {

    const [isGamePlaying, setIsGamePlaying] = useState(false)
    const [gameState, setGameState] = useState(initialGameState)
    const [padToActivate, setPadToActivate] = useState('');
    const [isNewRecordModalShow, setIsNewRecordModalShow] = useState(false)
    const [isLostGameModalShow, setIsLostGameModalShow] = useState(false)


    const handleStart = () => {
        setIsGamePlaying(true)
    }

    const resetGame = () => {
        setIsGamePlaying(false)
        setGameState({ ...initialGameState })

    }

    // set to play squence if game just started or set initail state if game just ended
    useEffect(() => {
        let isMounted = true;
        if (isGamePlaying) {
            if (isMounted) setGameState(prevState => ({ ...prevState, isPlayingSequence: true }))
        } else {
            if (isMounted) setGameState(initialGameState)
        }
        return () => { isMounted = false };
    }, [isGamePlaying])


    // when set to play squence generate random color (next pad) add it to game pattern array
    useEffect(() => {
        let isMounted = true;
        if (isGamePlaying && gameState.isPlayingSequence) {
            let randIndex = helpers.getRandom(pads.length)
            let newColor = pads[randIndex].color
            if (isMounted)
                setGameState(prevState => ({
                    ...prevState,
                    gamePattern: [...prevState.gamePattern, newColor],
                    level: prevState.gamePattern.length
                }))
        }
        return () => { isMounted = false };

    }, [isGamePlaying, gameState.isPlayingSequence])

    //when game pattern array change (got extra pad) play the sequence
    useEffect(() => {
        let isMounted = true;
        if (isGamePlaying && gameState.isPlayingSequence && gameState.gamePattern.length) {
            if (isMounted)
                playSequence()
        }
        return () => { isMounted = false };

    }, [isGamePlaying, gameState.isPlayingSequence, gameState.gamePattern.length])


    useEffect(() => {
        if (isNewRecordModalShow || isLostGameModalShow) {
            wrongSound.play()
        }

    }, [isNewRecordModalShow, isLostGameModalShow])


    //function to handle click on pad
    const handlePadClick = async (colorClicked, playColorSound) => {
        if (!gameState.isPlayingSequence && gameState.isUserTurn) {
            // play sound
            playColorSound()
            // set pad to activate
            setPadToActivate(colorClicked)
            await helpers.wait(150)
            // set pad to deactivate 
            setPadToActivate('')

            //extract next pad to click (from begin of arr with shift) 
            const tempUserClicksPattern = [...gameState.userClicksPattern]
            const lastPad = tempUserClicksPattern.shift()

            if (colorClicked === lastPad) {
                //correct pad clicked
                if (tempUserClicksPattern.length) {
                    // still playing
                    setGameState({
                        ...gameState,
                        userClicksPattern: tempUserClicksPattern
                    })
                } else {
                    // completed sequence successfully
                    await helpers.wait(250)

                    //set the state of game to 'Playing new sequence'  
                    setGameState(prevState => ({
                        ...prevState,
                        isPlayingSequence: true,
                        userClicksPattern: [],
                        level: prevState.gamePattern.length,
                        isUserTurn: false,
                    }))
                }
            } else {
                // wrong pad clicked - (lost game)
                //check if user broke a record (top 5)
                let isHighScore = await firestoreService.checkRecord(gameState.level)
                if (isHighScore) {
                    //show save record modal
                    setIsNewRecordModalShow(true)
                } else {
                    //show lost modal
                    setIsLostGameModalShow(true)
                }

                setGameState(prevState => ({
                    ...initialGameState,
                    level: prevState.gamePattern.length
                }))
            }
        }
    }



    // function when executed, plays the sequence in gamePattern
    const playSequence = async () => {
        // 'for every' pad in pattern
        for (let i = 0; i < gameState.gamePattern.length; i++) {
            // play pad sound
            pads.forEach(pad => { if (pad.color === gameState.gamePattern[i]) pad.play() })
            await helpers.wait(200)
            // set pad to activate
            setPadToActivate(gameState.gamePattern[i])
            await helpers.wait(200)
            // set pad to deactivate 
            setPadToActivate('')

            // after activating last pad in pattern
            if (i === gameState.gamePattern.length - 1) {

                //set the state of game to 'User Turn' with new 'userClicksPattern' 
                setGameState(prevState => ({
                    ...prevState,
                    isPlayingSequence: false,
                    isUserTurn: true,
                    userClicksPattern: prevState.gamePattern
                }))
            }
        }
    }



    return (
        <View style={styles.mainContainer} >
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Simon</Text>
            </View>

            {<SafeAreaView style={styles.boardContainer}>
                <FlatList
                    contentContainerStyle={{ alignSelf: 'center' }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={pads}
                    keyExtractor={pad => pad.color}
                    renderItem={({ item }) => (
                        <GamePad
                            color={item.color}
                            activated={padToActivate === item.color ? padToActivate : ''}
                            onPress={() => handlePadClick(item.color, item.play)}
                            sound={item.play}
                        />
                    )}
                />
            </SafeAreaView>}





            {isGamePlaying &&
                (<View style={styles.levelContainer}>
                    <Text >score: {gameState.level}</Text>
                </View>)}

            {isNewRecordModalShow &&
                (<NewRecord
                    score={gameState.level}
                    resetGame={resetGame}
                    modalOff={() => setIsNewRecordModalShow(false)}
                    modalVisible={isNewRecordModalShow} />)}

            {isGamePlaying && !gameState.isPlayingSequence && !gameState.isUserTurn && gameState.level > 0 &&
                (<>
                    <LostGame
                        resetGame={resetGame}
                        modalOff={() => setIsLostGameModalShow(false)}
                        modalVisible={isLostGameModalShow} />
                </>
                )}


            {!isGamePlaying && !gameState.level &&
                <ButtonComp label="Start Game" onPress={handleStart} />
            }
            <ButtonComp label='Back' onPress={() => navigation.goBack()} />
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 3,
        backgroundColor: '#EEEEEE',
    },
    headerContainer: {
        margin: 10,
    },
    header: {
        fontSize: 50,
        alignSelf: 'center',
        fontWeight: '600'
    },
    boardContainer: {
        flex: 1,
    },
})

export default GameScreen