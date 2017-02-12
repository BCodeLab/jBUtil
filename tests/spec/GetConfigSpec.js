describe("jB.getConfig", function () {

    beforeEach(function () {
        jB.config = {
            segmentBaseRoot: "hereMyBaseRoot",
            segmentIgnoreBaseRoot: "",
            segmentSiteRoot: "fooSegment",
            sessionExpiredUrl: "myFooSegm",
            silentMode: false
        };
    });

    it("should be able to retrieve the right data", function () {
        // some existing keys
        var keyToTest = ['segmentBaseRoot', 'segmentIgnoreBaseRoot', 'segmentSiteRoot', 'sessionExpiredUrl', 'silentMode'];
        // test we get what we're looking for
        for (var cfg in keyToTest) {
            expect(jB.getConfig(keyToTest[cfg])).toEqual(jB.config[ keyToTest[cfg]]);
        }
    });
    
    it("should return null if key is not valid", function () {
        // some existing keys
        var keyToTest = ['segmentBaseRoot1', '', 1, null, undefined];
        // test we get what we're looking for
        for (var cfg in keyToTest) {
            expect(jB.getConfig(keyToTest[cfg])).toEqual(null);
        }
    });


});