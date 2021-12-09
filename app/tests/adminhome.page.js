import { Selector } from 'testcafe';

class AdminHomePage {
  constructor() {
    this.pageId = '#admin-home';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(2);
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

}

export const adminHomePage = new AdminHomePage();
