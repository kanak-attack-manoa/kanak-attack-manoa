import { Selector } from 'testcafe';

class ListMenuItemsVendorsPage {
  constructor() {
    this.pageId = '#list-menu-items-vendor';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEditMenuItemPage(testController) {
    await testController.click('#edit-menu-item-vendor');
  }

  async hasDefaultItems(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(2);
  }
}

export const listMenuItemsVendors = new ListMenuItemsVendorsPage();
