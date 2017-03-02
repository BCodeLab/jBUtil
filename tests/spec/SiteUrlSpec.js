describe("jB.siteUrl", function () {

    var dynUrlRegexp = /(.*\/tests).*/g;
    var match = dynUrlRegexp.exec(window.location.href);

    beforeEach(function () {
        jB.clearConfig();
        jB.setConfig('segmentSiteRoot', 'tests');
    });


    it("should be able to retrieve right site url", function () {
        expect(jB.siteUrl()).toEqual(match[1]);
    });

    it("should be able to return right site url", function () {
        expect(jB.siteUrl('fooPage')).toEqual(match[1] + '/fooPage');
    });

    it("should be able to return right site url according to  parameter", function () {
        jB.setConfig('segmentSiteRoot', 'tests/SpecRunner.html');

        expect(jB.siteUrl('fooPage')).toEqual(match[1] + '/SpecRunner.html' + '/fooPage');

    });





});