/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

      // allFeeds defined
        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // URL availability & isn't empty

         it('urls are defined', function () {
             for (var i = 0; i < allFeeds.length; i++) {
                 expect(allFeeds[i].url).toBeDefined();
                 expect(allFeeds[i].url.length).not.toBe(0);
             }
         });


        // allFeeds has a name & isn't empty
         it('names are defined', function () {
             for (var i = 0; i < allFeeds.length; i++) {
                 expect(allFeeds[i].name).toBeDefined();
                 expect(allFeeds[i].name.length).not.toBe(0);
             }
         });
    });


    // The Menu test
    describe('The Menu', function () {
        // If menu-hidden is true then it's hidden.
         it('menu element is hidden', function () {
             expect($('body').hasClass('menu-hidden')).toEqual(true);
         });

         // Click event
          it('working toggle on click event', function () {
              // Calls the class of 'menu-icon-link'
              $('.menu-icon-link').trigger('click');
              expect($('body').hasClass('menu-hidden')).toBe(false);
              $('.menu-icon-link').trigger('click');
              expect($('body').hasClass('menu-hidden')).toBe(true);
          });
      });

    // Initial Entries test
    describe('Initial Entries', function () {

        // Asynchronous request
         beforeEach(function (done) {
             loadFeed(0, function () {
                 done();
             });
         });
        // If '.entry' exists within '.feed'
         it('define if feed has at least a single entry', function () {
             expect($('.feed .entry').length).toBeGreaterThan(0);
         });
     });


    // New Feed Selection test

    describe('New Feed Selection', function() {
      var firstFeed, secondFeed;

        // Loading the loadFeed using the function
        // Loading first feed & check, afterwards testing if the second feed is also loaded

         beforeEach(function(done) {
                  loadFeed(1, function() {
                    console.log('First feed loaded!')
                    firstFeed = $('.feed').html();
                    loadFeed(2, function() {
                      console.log('Second feed loaded!')
                      done();
                  });
              });
           });

      afterEach(function() {
              loadFeed(0);
          });

          // Whether two feeds are differen't or not
      it('checks if two feeds are different', function() {
                  secondFeed = $('.feed').html();
                  expect(firstFeed).not.toEqual(secondFeed);
              });
        });
}());
