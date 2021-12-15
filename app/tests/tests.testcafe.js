import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listMenuItems } from './listmenuitems.page';
import { listMenuItemsVendors } from './listmenuitemsvendors.page';
import { listVendors } from './listvendors.page';
import { listVendorsAdmin } from './listvendorsadmin.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'user@foo.com', password: 'changeme' };
const vendorCredentials = { username: 'panda@foo.com', password: 'changeme' };
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

test('Test the ListMenuItems page and that it lists at least two menu items', async (testController) => {
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

test('Test the Admin Home page and that the table has at least two cells', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminHomePage(testController);
  await navBar.gotoListVendorsAdminPage(testController);
  await listVendorsAdmin.gotoEditVendor(testController);
});

test('Test the edit vendors page exists and edit a vendor', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoListVendorsAdminPage(testController);
  await listVendorsAdmin.gotoEditVendor(testController);
});

test('Test the List Vendors page and that at least two vendors are present', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorsPage(testController);
  await listVendors.hasDefaultVendors(testController);
});

test('Test the EditMenuItem page exists and edit a menu item', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, vendorCredentials.username, vendorCredentials.password);
  await navBar.gotoListMenuItemsVendorsPage(testController);
  await listMenuItemsVendors.gotoEditMenuItemPage(testController);
});

test('Test the AdminListMenuItems page and that at least two menu items are listed', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoMenuItemsPage(testController);
  await listMenuItems.hasDefaultItems(testController);
});

test('Test the AddReview page exists and add a review', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorsPage(testController);
  await listVendors.gotoAddReviewPage(testController);
});

test('Test the List review page exists and lists the test review', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorsPage(testController);
  await listMenuItems.hasDefaultItems(testController);
});

test('Test the VendorMenu page and that there are at least 2 menuItems for default vendors', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorsPage(testController);
  await listVendors.gotoVendorMenu(testController);
});
