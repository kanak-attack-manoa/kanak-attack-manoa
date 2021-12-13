import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  /** Goes to the SignIn page. */
  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  /** Goes to the MenuItems page. */
  async gotoMenuItemsPage(testController) {
    await testController.click('#navbar-list-menu-items');
  }

  /** Goes to the AddMenuItem page. */
  async gotoAddMenuItemPage(testController) {
    await testController.click('#navbar-add-menu-item');
  }

  /** Goes to the AdminHome page. */
  async gotoAdminHomePage(testController) {
    await testController.click('#navbar-admin-home');
  }

  /** Goes to the ListVendors page. */
  async gotoListVendorsPage(testController) {
    await testController.click('#navbar-vendors');
  }

  /** Goes to the ListVendors to edit page. */
  async gotoListVendorsAdminPage(testController) {
    await testController.click('#navbar-admin-vendors');
  }

  /** Goes to the ListMenuItems page specific to vendor for editing. */
  async gotoListMenuItemsVendorsPage(testController) {
    await testController.click('#navbar-list-menu-items-vendor');
  }
}

export const navBar = new NavBar();
