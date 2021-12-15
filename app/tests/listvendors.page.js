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

  /** Checks at least 2 vendors are listed. */
  async hasDefaultVendors(testController) {
    const cardCount = Selector('#vendor-card').count;
    await testController.expect(cardCount).gte(2);
  }

  /** Goes to the AddReview page. */
  async gotoAddReviewPage(testController) {
    await testController.click('#add-review');
  }

  /** Goes to the ListReviews page. */
  async gotoListReviews(testController) {
    await testController.click('#list-reviews');
  }

  /** Goes to the ListMenuItemsVendor page. */
  async gotoVendorMenu(testController) {
    await testController.click('#vendor-menu');
  }
}

export const listVendors = new ListVendorsPage();
