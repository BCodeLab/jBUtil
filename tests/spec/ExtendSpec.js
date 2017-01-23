/* global expect */

describe("jB.extend", function () {

    describe("Deep mode not enabled", function () {
        it("should be able to extend 2 (or more) Objects", function () {
            var Obj1 = {
                a1: 1,
                b1: 2
            };

            var Obj2 = {
                a2: 1,
                b2: 2
            };
            // base test, check if everything is ok
            var extObj = jB.extend({}, Obj1, Obj2);

            for (var index in Obj1) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj1[index]);
            }
            for (var index in Obj2) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj2[index]);
            }

            expect(jB.count(extObj)).toEqual(jB.count(Obj1) + jB.count(Obj2));

            var Obj3 = {
                a3: 1,
                b3: 2,
                c3: 4 //break redundancy!!
            };

            var Obj4 = {
                d6: [1, 2, 3, 4]
            };
            // test with more object and different attributes
            extObj = jB.extend({}, Obj1, Obj2, Obj3, Obj4);

            for (var index in Obj1) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj1[index]);
            }
            for (var index in Obj2) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj2[index]);
            }
            for (var index in Obj3) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj3[index]);
            }
            // ensure the deep mode has not been used
            expect(extObj.d6).toBeDefined();
            expect(extObj.d6).toEqual(Obj4.d6);
            expect(Object.is(extObj.d6, Obj4.d6)).toBe(true);

            expect(jB.count(extObj)).toEqual(jB.count(Obj1) + jB.count(Obj2) + jB.count(Obj3) + jB.count(Obj4));
        });


        it("should be able to manage function", function () {
            var Obj1 = {
                a2: function () {
                    return;
                }
            };
            // base test, check if everything is ok
            var extObj = jB.extend( {a1: 1}, Obj1);
            expect(extObj.a2).toBeDefined();
            expect(typeof extObj.a2).toEqual('function');

        });
        
        it("should overwrite attribute in the right order", function () {
            var Obj1 = {
                a1: function () {
                    return;
                }
            };
            var Obj2 = {
                a2: true
            };
            // base test, check if everything is ok
            var extObj = jB.extend({a1: 1, a2 : 0}, Obj1, Obj2);
            expect(extObj.a1).toBeDefined();
            expect(typeof extObj.a1).toEqual('function');
            expect(extObj.a2).toBeDefined();
            expect(extObj.a2).toBe(true);

        });
    });

    describe("Deep mode enabled", function () {
        it("should be able to extend 2 (or more) Objects", function () {
            var Obj1 = {
                a1: 1,
                b1: 2
            };

            var Obj2 = {
                a2: 1,
                b2: 2
            };
            // base test, check if everything is ok
            var extObj = jB.extend(true, {}, Obj1, Obj2);

            for (var index in Obj1) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj1[index]);
            }
            for (var index in Obj2) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj2[index]);
            }

            expect(jB.count(extObj)).toEqual(jB.count(Obj1) + jB.count(Obj2));

            var Obj3 = {
                a3: 1,
                b3: 2,
                c3: 4 //break redundancy!!

            };

            var Obj4 = {
                d6: [1, 2, 3, 4]
            };
            // test with more object and different attributes
            extObj = jB.extend(true, {}, Obj1, Obj2, Obj3, Obj4);

            for (var index in Obj1) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj1[index]);
            }
            for (var index in Obj2) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj2[index]);
            }
            for (var index in Obj3) {
                expect(extObj[index]).toBeDefined();
                expect(extObj[index]).toEqual(Obj3[index]);
            }

            // ensure the deep mode has not been used
            expect(extObj.d6).toBeDefined();
            expect(extObj.d6).toEqual(Obj4.d6);
            expect(Object.is(extObj.d6, Obj4.d6)).toBe(false);

            expect(jB.count(extObj)).toEqual(jB.count(Obj1) + jB.count(Obj2) + jB.count(Obj3) + jB.count(Obj4));
        });
        
        it("should be able to manage function", function () {
            var Obj1 = {
                a2: function () {
                    return;
                }
            };
            var extObj = jB.extend(true, {a1: 1}, Obj1);
            expect(extObj.a2).toBeDefined();
            expect(typeof extObj.a2).toEqual('function');

        });
        
        it("should overwrite attribute in the right order", function () {
            var Obj1 = {
                a1: function () {
                    return;
                }
            };
            var Obj2 = {
                a2: true
            };
            var extObj = jB.extend(true, {a1: 1, a2 : 0}, Obj1, Obj2);
            expect(extObj.a1).toBeDefined();
            expect(typeof extObj.a1).toEqual('function');
            expect(extObj.a2).toBeDefined();
            expect(extObj.a2).toBe(true);

        });



    });
});