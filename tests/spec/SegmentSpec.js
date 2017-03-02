describe("jB.segment", function () {



    beforeEach(function () {
        jB.clearConfig();
        jB.setConfig('segmentSiteRoot', 'tests');
        jB.setConfig('segmentIgnoreBaseRoot', 'tests');
    });

    it("should be return null when index is out of the range", function () {
        // retrieve  the string of segments manually

        var windowsSegments = window.location.href.replace(jB.baseUrl()+'/', "");

        // the number of segment is equal to the number of spltted chunks 
        var segmentCount = (windowsSegments.split("/").length);


        var maxIndex = 0;
        var cSegment;
        // count the segments
        while ((cSegment = jB.segment(++maxIndex)) !== null) {}

        expect(segmentCount).toEqual(maxIndex - 1);
    });

    it("should be able to retrieve right data - positive index", function () {
        // retrieve  the string of segments manually
        var windowsSegments = window.location.href.replace(jB.baseUrl() + '/', "").replace('?', "");


        var cSegment, manualUrl = [];
        var maxIndex = 1;
        while ((cSegment = jB.segment(maxIndex++)) !== null) {
            // store segments
            manualUrl.push(cSegment);
        }


        expect(manualUrl.join('/')).toEqual(windowsSegments);
    });
    
    it("should be able to retrieve right data - negative index", function () {
        // retrieve  the string of segments manually
        var windowsSegments = window.location.href.replace(jB.baseUrl() + '/', "").replace('?', "");
        
        var cSegment, manualUrl = [];
        var maxIndex = 1;
        while ((cSegment = jB.segment(maxIndex++ * -1)) !== null) {
            // store segments
            manualUrl.unshift(cSegment);
        }


        expect(manualUrl.join('/')).toEqual(windowsSegments);
    });


});