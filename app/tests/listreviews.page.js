import { Selector } from 'testcafe';

class ListReviewsPage {
  constructor() {
    this.pageId = '#list-reviews';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks the created review is listed. */
  async hasDefaultItems(testController) {
    const cardCount = Selector('#vendor-review').count;
    await testController.expect(cardCount).gte(1);
  }

  async listVendorReviews(testController) {
    await testController.click('#list-reviews');
  }
}

export const listReviews = new ListReviewsPage();
