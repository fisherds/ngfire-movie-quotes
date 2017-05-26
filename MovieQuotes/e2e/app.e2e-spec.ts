import { MovieQuotesPage } from './app.po';

describe('movie-quotes App', () => {
  let page: MovieQuotesPage;

  beforeEach(() => {
    page = new MovieQuotesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
