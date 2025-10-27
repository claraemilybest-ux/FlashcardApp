const { JSDOM } = require('jsdom');

beforeAll(() => {
  const dom = new JSDOM('<!doctype html><html><body><div id="trivia"></div></body></html>');
  global.window = dom.window;
  global.document = dom.window.document;
  global.HTMLElement = dom.window.HTMLElement;
  global.Node = dom.window.Node;
});

afterAll(() => {
  delete global.window;
  delete global.document;
});
