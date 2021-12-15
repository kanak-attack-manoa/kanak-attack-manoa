import { Selector } from 'testcafe';

class ListVendorsAdminPage {
  constructor() {
    this.pageId = '#list-vendors-admin';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Goes to the EditVendor page. */
  async gotoEditVendor(testController) {
    await testController.click('#edit-vendor');
  }

  async gotoListVendorMenu(testController) {
    await testController.click('#edit-vendor');
  }

  async hasVendors(testController) {
    const cardCount = Selector('#vendor-admin').count;
    await testController.expect(cardCount).gte(2);
  }
}

export const listVendorsAdmin = new ListVendorsAdminPage();
