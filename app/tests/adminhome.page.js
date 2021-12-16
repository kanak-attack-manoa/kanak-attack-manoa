import { Selector } from 'testcafe';

class AdminHomePage {
  constructor() {
    this.pageId = '#admin-home';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Makes sure the admin table contains at least two rows */
  async hasTable(testController) {
    const rowCount = Selector('#user-row').count;
    await testController.expect(rowCount).gte(2);
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async makeVendor(testController) {
    const makeVendor = Selector('#make-vendor').nth(1);
    await testController.click(makeVendor);
    await testController.click(Selector('.swal-button--confirm'));
  }

}

export const adminHomePage = new AdminHomePage();
