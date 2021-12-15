import { Selector } from 'testcafe';

class ListVendorMenuPage {
  constructor() {
    this.pageId = '#list-vendor-menu';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks at least two vendor specific menuItems are listed. */
  async hasDefaultItems(testController) {
    const cardCount = Selector('#menu-item').count;
    await testController.expect(cardCount).gte(2);
  }
}

export const listVendorMenu = new ListVendorMenuPage();
