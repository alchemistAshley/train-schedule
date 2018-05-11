
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

    var now = parseFloat(moment().format("X"));
    console.log("Now: " + now);

    var trainTimeYest = firstTrain + " " + moment().add(-1, 'days').format("MM/DD/YYYY");
    console.log("Train Time Yest: " + trainTimeYest);

    var convertedTime = parseFloat(moment(firstTrain, "HH:mm MM/DD/YYYY").format("X"));
    console.log("Converted Time: " + convertedTime);

    var convertedFreq = parseFloat(frequency) * 60; 
    console.log("Converted Freq: " + convertedFreq);
    
    var nextTrain = Math.ceil((now-convertedTime)/convertedFreq);
    console.log("Next Train: " + nextTrain);
   
    var arrivalTimeUnix = convertedTime + (convertedFreq * nextTrain);
    console.log("Arrival Time Unix: " + arrivalTimeUnix);

    var arrivalTime = moment(arrivalTimeUnix, "X").format("HH:mm");

    var minsAway = Math.round((arrivalTimeUnix - now) / 60); 

    console.log("Arrival Time: " + arrivalTime);
    console.log("Mins Away: " + minsAway);


    // append data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" 
    + arrivalTime + "</td><td>" + minsAway + " mins" + "</td><td>" + frequency  + " mins" + "</td></tr>");
    

}), function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
}
