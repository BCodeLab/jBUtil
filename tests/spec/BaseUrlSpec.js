describe("jB.baseUrl", function () {

    var dynUrlRegexp = /(.*)\/tests.*/g;
    var match = dynUrlRegexp.exec(window.location.href);

    beforeEach(function () {
        jB.setConfig('segmentIgnoreBaseRoot', 'tests');
    });


    it("should be able to retrieve right base url", function () {
        expect(jB.baseUrl()).toEqual(match[1]);
    });

    it("should be able to return right base url", function () {
        expect(jB.baseUrl('fooResource')).toEqual(match[1] + '/fooResource');
    });

    it("should be able to return right base url according to \"ignore\" parameter", function () {
        jB.setConfig('segmentIgnoreBaseRoot', 'SpecRunner.html');

        expect(jB.baseUrl('fooPage')).toEqual(match[1] + '/tests/fooPage');

    });

    it("should be able to return right base url according to \"include\" parameter", function () {
        jB.setConfig('segmentIgnoreBaseRoot', null);
        jB.setConfig('segmentBaseRoot', 'SpecRunner.html');

        expect(jB.baseUrl('fooPage')).toEqual(match[1] + '/tests/SpecRunner.html/fooPage');

    });





});