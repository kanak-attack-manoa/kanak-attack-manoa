import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendor/Vendor';
import { MenuItem } from '../../api/menuitem/MenuItem';

// Initialize the database with a default data document.
function addVendor(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Vendors.collection.insert(data);
}

function addItem(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  MenuItem.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default Vendors.');
    Meteor.settings.defaultVendors.map(data => addVendor(data));
  }
}

if (MenuItem.collection.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default data.');
    Meteor.settings.defaultItems.map(data => addItem(data));
  }
}
