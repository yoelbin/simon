Hi Guys!
this is the 'readme' file for all my notes for you

* The approach for the solution was to handle two main scenarios - 
'User Click Turn' and 'Play new Sequance' , 
the other scenarios is in the beginnig, when the user has not started the game
and at the end, when user has clicked a wrong pad

there are two arrays that are being managed:
pattern, that increases by selecting a random pad to be pushed, in the beggining and after every success sequance by the user
clicks, that is matched to pattern, but every click pops the last pad.

* There are 2 dependencies that are not in use
    AsyncStorage - "@react-native-async-storage/async-storage": "^1.17.3",
    UUID - "react-native-uuid": "^2.0.1",

    I used both to manage data on device, than I integrated the app with firebase and used firestore as persist layer.
