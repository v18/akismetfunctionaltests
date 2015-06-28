var client = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'phantomjs'
    },
    port: 4444
});

var expect = require('chai').expect;
var config = require('./config.js');

describe('Logging in to akismet.com', function(done) {
  before(function() {
    client
      .init()
      .url('http://www.akismet.com', done);
  });

  it('should be able to click log in button', function(done) {
    client
      .waitFor('#wpcc-sign-in .button', 2000, function(err) {
        expect(err).to.equal(undefined);
      })
      .click('#wpcc-sign-in .button', function(err) {
        expect(err).to.equal(undefined);
      });
      done();
  });

  it('should be able to enter username and password and log in', function(done) {
    client
      .waitFor('#username', 2000, function(err) {
        expect(err).to.equal(undefined);
      })
      .waitFor('#password', 2000, function(err) {
        expect(err).to.equal(undefined);
      })
      .waitFor('.action-buttons .signin', 2000, function(err) {
        expect(err).to.equal(undefined);
      })
      .addValue('#username', config.username)
      .addValue('#password' , config.password)
      .submitForm('authorize')
      .waitFor('.signed-in', 2000, function(err) {
        expect(err).to.equal(undefined);
      });
    done();
  });

  after(function(done) {
    client.end();
    done();
  });
});
