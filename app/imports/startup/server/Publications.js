import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { MenuItem } from '../../api/menuitem/MenuItem';
import { Vendors } from '../../api/vendor/Vendor';
import { Review } from '../../api/vendorreview/Review';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// User-level publication for MenuItems
// all users should be able to see all possible menu items in the database
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(MenuItem.userPublicationName, function () {
  if (this.userId) {
    return MenuItem.collection.find();
  }
  return this.ready();
});

Meteor.publish(MenuItem.vendorPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    if (Roles.userIsInRole(this.userId, 'vendor')) {
      return MenuItem.collection.find({ owner: username });
    }
    return MenuItem.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(MenuItem.adminPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return MenuItem.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vendors.collection.find({ owner: username });
  }
  return this.ready();
});

// List Users for Admin
Meteor.publish(Meteor.users.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// User-level publication.
// Users should be able to see all of the available vendors in the database
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Vendors.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Vendors.collection.find();
  }
  return this.ready();
});

Meteor.publish(Review.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Review.collection.find();
  }
  return this.ready();
});
