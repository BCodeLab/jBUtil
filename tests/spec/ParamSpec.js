describe("jB.param", function () {

    it("should work as expected", function () {
        var inParam = {
            a : 1
        };
        var outParam = 'a=1';
        
        expect(jB.param(inParam)).toEqual(outParam);
        
        inParam = {
            a : 1, // number
            b : 'string', // string
            c : [1,2], //array
            d : null // null
        };
        outParam = 'a=1&b=string&c=1%2C2&d=null';
        
        expect(jB.param(inParam)).toEqual(outParam);
    });
});