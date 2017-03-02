describe("jB.setConfig", function () {

    beforeEach(function () {
        jB.clearConfig();
        jB.setConfig({
            segmentBaseRoot: "hereMyBaseRoot",
            segmentIgnoreBaseRoot: "",
            segmentSiteRoot: "fooSegment",
            sessionExpiredUrl: "myFooSegm",
            silentMode: false
        });
    });

    it("should be able to set the data (key:value)", function () {
        // some existing keys
        var keyToTest = ['segmentBaseRoot', 'segmentIgnoreBaseRoot', 'segmentSiteRoot', 'sessionExpiredUrl', 'silentMode'];
        var valueToTest = [1, null, 'fooSegmentSiteRoot', 'fooSessionExpiredUrl', false];
        // test we set what we're looking for
        for (var cfg in keyToTest) {
            jB.setConfig(keyToTest[cfg], valueToTest[cfg]);
            expect(jB.getConfig(keyToTest[cfg])).toEqual(valueToTest[cfg]);
        }
    });

    it("should be able to set the data (object)", function () {
        // some existing keys
        var keyValueToTest = {
            segmentBaseRoot: 1,
            segmentIgnoreBaseRoot: 'fooSegmentIgnoreBaseRoot',
            segmentSiteRoot: 'fooSegmentSiteRoot',
            sessionExpiredUrl: '',
            silentMode: true
        };
        jB.setConfig(keyValueToTest);

        // test we set what we're looking for
        for (var cfg in keyValueToTest) {
            expect(jB.getConfig(cfg)).toEqual(keyValueToTest[cfg]);
        }
    });


});