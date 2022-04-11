
import firestore from '@react-native-firebase/firestore';

// a service to save a player(name,score) to firestore DB
const saveRecord = async (player) => {
    await firestore().collection('Scores').add
        ({
            name: player.name,
            score: player.score,
        })
}

// get the top 5 records from firestoreDB 
const getRecordList = async () => {
    const scoresRef = await firestore().collection('Scores').get()
    let scores;
    if (scoresRef.size > 0) {
        scores = scoresRef.docs.map(doc => {
            let fullDoc = doc.data()
            return { ...fullDoc, id: doc.id }
        })
        scores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        if (scores.length >= 5) {
            scores = scores.slice(0, 5)
            return scores
        } else {
            return scores
        }
    }
}

// service for checking if a score should go to highscore table 
const checkRecord = async (score) => {
    const scoresRef = await firestore().collection('Scores').get()
    let scores;
    if (scoresRef.size > 0) {
        scores = scoresRef.docs.map(doc => doc.data())
        scores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        if (scores.length >= 5) {
            scores = scores.slice(0, 5)
            let minPlayer = scores.reduce((prev, curr) => prev.score < curr.score ? prev : curr)
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



const firestoreService = { checkRecord, saveRecord, getRecordList }

export default firestoreService




