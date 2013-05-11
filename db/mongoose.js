// mongodb storage

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('mongodb connected! Wohh ha!');
});


var kittySchema = mongoose.Schema({
});

kittySchema.methods.speak = function () {
    var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";

    console.log(greeting);
};


var Kitten = mongoose.model('Kitten', kittySchema);


var silence = new Kitten({
    name: 'Silence'
});

silence.speak();


var fluffy = new Kitten({name: ' fluffy_02'});
fluffy.speak();

fluffy.save(function (err, fluffy) {
    if (err) {

    }
    console.log(fluffy);


});