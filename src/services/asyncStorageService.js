// not used
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

const checkRecord = async (score) => {
    console.log("work");
    let players = await getData()
    console.log(players);
    if (players) {
        if (players.length === 5) {
            let minPlayer = players.reduce((prev, curr) => prev.score < curr.score ? prev : curr)
            console.log("min", minPlayer.score);
            console.log("score", score);
            if (minPlayer.score < score) {
                //full scoreboard but replace
                console.log(true);
                return true
            } else {
                //full scoreboard

                console.log(false);
                return false
            }
        } else {
            //less than 5
            console.log(true);
            if (score > 0) return true
        }
    } else {
        //no array
        if (score > 0) return true
    }
}


const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('players')
        // return jsonValue != null ? JSON.parse(jsonValue) : null;
        return JSON.parse(jsonValue)
    } catch (e) {
        console.log("error loading from storage", e);
    }
}

const saveRecord = async (pl) => {
    let id = uuid.v4()
    let player = { ...pl, id }
    //check if score is highrt
    console.log(player);
    let players;
    try {
        players = await getData()

    } catch (e) { console.log(e); }

    if (players) {
        console.log(players);

        if (players.length === 5) {
            console.log("a");
            let minPlayer = players.reduce((prev, curr) => prev.score < curr.score ? prev : curr)
            console.log(minPlayer);
            if (minPlayer.score < player.score) {
                console.log(true);
                let index = players.findIndex(pl => pl.name === minPlayer.name && pl.score === minPlayer.score)
                players[index] = player
                console.log(players);
                await AsyncStorage.setItem('players', JSON.stringify(players))
                return 'Saved'

            } else {
                console.log(false);
                return 'Not enough score'
            }
        } else {
            console.log(true);
            players.push(player)
            console.log(players);
            await AsyncStorage.setItem('players', JSON.stringify(players))
            return 'Saved'
        }
    } else {
        players = []
        //no players -> save
        console.log('no players -> save');
        players.push(player)

        await AsyncStorage.setItem('players', JSON.stringify(players))
        return 'Saved'
    }


}


//helpers for debugging AsyncStorage
const resetStorage = async () => {
    try {
        await AsyncStorage.clear();
        let players = await getData()
        console.log(players);
    } catch (error) {
        console.log(error);
    }
};

const logStorage = async () => {
    const storage = await getData()
    console.log(storage);
}

const addToStorage = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('players', JSON.stringify([{ name: "Avi", score: 1, id: uuid.v4() }, { name: "Dan", score: 3, id: uuid.v4() }, { name: "Alex", score: 5, id: uuid.v4() }, { name: "Aharon", score: 2, id: uuid.v4() }, { name: "Yaakov", score: 4, id: uuid.v4() },]))
    let players = await getData()
    console.log(players);
}




const storage = { storeData, getData, saveRecord, checkRecord, resetStorage, logStorage, addToStorage }

export default storage