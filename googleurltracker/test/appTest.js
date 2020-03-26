const { assert } = require('chai');
const URLProcessor = require('../app/googleurl.js');

describe('URLProcessor', () => {
  it('urlChecker should return a URL', () => URLProcessor.urlChecker('l6MS').then((result) => {
    assert.equal(
      result,
      'https://googleblog.blogspot.com/2009/12/making-urls-shorter-for-google-toolbar.html',
    );
  }));
});
describe('repeatCheck', () => {
  it('repeatCheck should return as repeated', () => URLProcessor.repeatCheck('l6MS').then((result) => {
    assert.equal(result, true);
  }));
});
describe('logUrlObj', () => {
  it('logUrlObj should update json', () => {
    const resUrl =
      'https://googleblog.blogspot.com/2009/12/making-urls-shorter-for-google-toolbar.html';
    return URLProcessor.logUrlObj('l6MS', resUrl).then((result) => {
      assert.equal(result, 'Update Complete');
    });
  });
  it('logUrlObj should create a new log', () => {
    const randString = URLProcessor.generateRandomString();
    const resUrl = URLProcessor.urlChecker(randString).then((result) => result.toString());
    return URLProcessor.logUrlObj(randString, resUrl).then((result) => {
      assert.equal(result, 'New link made');
    });
  });
});
describe('run', () => {
  it('Should return round complete', () => {
    assert.equal(URLProcessor.run(), 'Round Complete');
  });
});
