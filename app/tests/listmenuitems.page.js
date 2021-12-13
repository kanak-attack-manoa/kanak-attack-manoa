import { Selector } from 'testcafe';

class ListMenuItemsPage {
  constructor() {
    this.pageId = '#list-menu-items';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks at least 2 menuItems are displayed. */
  async hasDefaultItems(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(2);
  }
}

export const listMenuItems = new ListMenuItemsPage();
