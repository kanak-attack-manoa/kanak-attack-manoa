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

  /** Goes to the EditMenuItem page. */
  async gotoEditMenuItemPage(testController) {
    await testController.click('#edit-menu-item-vendor');
  }

  /** Checks at least two menuItems are listed. */
  async hasDefaultItems(testController) {
    const cardCount = Selector('#menu-items-admin').count;
    await testController.expect(cardCount).gte(2);
  }
}

export const listMenuItemsVendors = new ListMenuItemsVendorsPage();
