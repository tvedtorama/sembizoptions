/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var circulator = require('./itemCirculator')

var main = new UI.Card({
  title: 'Start',
  icon: 'images/menu_icon.png',
  subtitle: 'Digital Value Network',
  body: '',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

// var availability = ['Dont disturb', 'Internally available', 'Externally available'];
var availability = ["Don't disturb", 'Available', 'Publish location'];


var menuFunc = function(e) {
  var items = [{
        title: 'Availability',
        icon: 'images/menu_icon.png',
        subtitle: 'Click to update'
      }, {
        title: 'Internal',
        subtitle: availability[0]
      }, {
        title: 'External',
        subtitle: availability[0]
      }];
  var menu = new UI.Menu({
    sections: [{
      items: items
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    if (e.itemIndex > 0) {
      items[e.itemIndex].subtitle = circulator(items[e.itemIndex].subtitle, availability);
      menu.items(0, items);      
    }
    // menu.show();
  });
  menu.show();
};


main.on('click', 'up', menuFunc);

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
  wind.on('click', 'select', menuFunc);
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});