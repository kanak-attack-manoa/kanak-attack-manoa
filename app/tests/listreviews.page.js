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

  async hasDefaultItems(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(1);
  }
}

export const listReviews = new ListReviewsPage();
