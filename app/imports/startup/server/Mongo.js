import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { MenuItems } from '../../api/menuitem/MenuItems.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addItem(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  MenuItems.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (MenuItems.collection.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default data.');
    Meteor.settings.defaultItems.map(data => addItem(data));
  }
}
