describe("jB.parseNum", function () {


    it("should be able to extract the right number", function () {

        expect(jB.parseNum('91')).toEqual(91);

        expect(jB.parseNum(' aa 1000')).toEqual(1000);

        expect(jB.parseNum('1000.22')).toEqual(1000.22);

        expect(jB.parseNum('1000,22')).toEqual(1000.22);
        expect(jB.parseNum('1.000,22')).toEqual(1000.22);

        expect(jB.parseNum('1.00022')).toEqual(1.00022);
        
        expect(jB.parseNum('-1.00022')).toEqual(-1.00022);
        
        expect(jB.parseNum('- aa 1.00022')).toEqual(1.00022);
        expect(jB.parseNum('+ 1.00022')).toEqual(1.00022);
        
        expect(jB.parseNum('1.00022sssss')).toEqual(1.00022);
    });

    it("should fail if the param doesn't contain a number", function () {

        expect(jB.parseNum("I'm not a number")).toBe(false);

        expect(jB.parseNum("")).toBe(false);
    });

    it("should extract first number if more candidates are available", function () {
        expect(jB.parseNum("100.33 44")).toEqual(100.33);
    });

});