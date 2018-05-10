
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOv97mxHIyPhg0OrZ475YePcTWqyf9Dnw",
    authDomain: "train-schedule-e5c38.firebaseapp.com",
    databaseURL: "https://train-schedule-e5c38.firebaseio.com",
    projectId: "train-schedule-e5c38",
    storageBucket: "",
    messagingSenderId: "534629841935"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-button").on("click", function(event) {
    event.preventDefault();

    // Get user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        dest: destination,
        first: firstTrain,
        freq: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var firstTrainPretty = moment(firstTrain).format("hh:mm a");
    console.log(firstTrainPretty);

    var nextTrain = 
    // calculate what time the train started and dispaly when the next train will arrive
    // calculate how many minutes until the next train arrives and display
    

}), function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
}
