import { Selector } from 'testcafe';

class ListVendorsPage {
  constructor() {
    this.pageId = '#list-vendors';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasDefaultVendors(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(2);
  }
}

export const listVendors = new ListVendorsPage();
