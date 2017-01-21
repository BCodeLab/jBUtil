describe("jB.count", function () {
    it("should be able to count Objects", function () {
        var testOB = {
            foo1: 1,
            foo2: 2
        };
        expect(jB.count(testOB)).toEqual(2);
        delete testOB.foo1;
        expect(jB.count(testOB)).toEqual(1);
        testOB.foo3 = 1;
        testOB.foo4 = null;
        expect(jB.count(testOB)).toEqual(3);
    });
    it("should be able to count Arrays", function () {
        var testArr = [];
        expect(jB.count(testArr)).toEqual(0);
        testArr.push('fooel1');
                expect(jB.count(testArr)).toEqual(1);

    });
    it("should be able to count Strings", function () {
        var testStr = '123';
        expect(jB.count(testStr)).toEqual(3);
        testStr += '4';
                expect(jB.count(testStr)).toEqual(4);

    });
    
    
});