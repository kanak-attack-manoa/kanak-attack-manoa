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

  async hasDefaultItems(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(2);
  }
}

export const listVendorMenu = new ListVendorMenuPage();