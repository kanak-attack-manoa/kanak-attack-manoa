import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  addUserRoleVendor: function (userId) {
    Roles.createRole('vendor', { unlessExists: true });
    Roles.addUsersToRoles(userId, 'vendor');
  },
});

/*
Meteor.methods({
  addUserRoleVendor: function () {
    if (!this.userId) throw new Meteor.Error('403', 'Access Denied', 'You must be logged in');
    Roles.addUsersToRoles(this.userId, 'vendor');
  },
});

Meteor.methods({
  'addUserRoleVendor'({ userId }) {
    Roles.addUsersToRoles(userId, 'vendor');
  },
});

const addRoleVendor = 'addUserRoleVendor';

Meteor.methods({
  'addUserRoleVendor'({ userId }) {
    Roles.addUsersToRoles(userId, 'vendor');
  },
});

export { addRoleVendor };
 */
