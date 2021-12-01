import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listMenuItems } from './listmenuitems.page';
import { listVendors } from './listvendors.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const vendorCredentials = { username: 'vendor@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('kanak-attack-manoa localhost test with default db')
  .page('http://localhost:3000/#/');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the ListMenuItems page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMenuItemsPage(testController);
  await listMenuItems.hasDefaultItems(testController);
});

test('Test the AddMenuItem page and add menu item', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, vendorCredentials.username, vendorCredentials.password);
  await navBar.gotoAddMenuItemPage(testController);
});

test('Test the Admin Home page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminHomePage(testController);
});

test('Test the List Vendors page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorsPage(testController);
  await listVendors.hasDefaultVendors(testController);
});

test('Test the EditMenuItem page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, vendorCredentials.username, vendorCredentials.password);
  await navBar.gotoMenuItemsPage(testController);
  await navBar.gotoEditMenuItemPage(testController);
});

test('Test the AdminListMenuItems page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoMenuItemsPage(testController);
  await listMenuItems.hasDefaultItems(testController);
});
