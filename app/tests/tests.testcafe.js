import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listMenuItems } from './listmenuitems.page';
import { listMenuItemsVendors } from './listmenuitemsvendors.page';
import { listVendors } from './listvendors.page';
import { listVendorsAdmin } from './listvendorsadmin.page';
import { adminHomePage } from './adminhome.page';
import { makeProfilePage } from './vendorprofile.page';
import { listReviews } from './listreviews.page';
import { addReview } from './addreview.page';
import { listVendorMenu } from './vendormenu.page';
import MenuItemsAdmin from '../imports/ui/components/MenuItemsAdmin';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'user@foo.com', password: 'changeme' };
const vendorCredentials = { username: 'panda@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const testUserCredentials = { username: 'test-user@foo.com', password: 'changeme' };

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

test('Test the Admin Home page and that the table has at least two cells and that edit vendor has at least two vendors', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminHomePage(testController);
  await adminHomePage.hasTable(testController);
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

test('Test the AddReview page exists and add a review. Check list reviews that the created review exists.', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorsPage(testController);
  await listVendors.gotoAddReviewPage(testController);
  await addReview.addReview(testController);
  await navBar.gotoListVendorsPage(testController);
  await listReviews.listVendorReviews(testController);
  await listReviews.hasDefaultItems(testController);
});

test('Test the VendorMenu page and that there are at least 2 menuItems for default vendors', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorsPage(testController);
  await listVendors.gotoVendorMenu(testController);
});

test('Giving a user the vendor role and create a vendor profile using new role.', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminHomePage(testController);
  await adminHomePage.makeVendor(testController);
  await navBar.ensureLogout(testController);
  await signoutPage.isDisplayed(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, testUserCredentials.username, testUserCredentials.password);
  await navBar.gotoVendorProfilePage(testController);
  await makeProfilePage.addProfile(testController);
});
