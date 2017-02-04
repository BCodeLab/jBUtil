describe("jB.parseDate", function () {
    it("should be able to retrieve the right date", function () {
        // 21/08/1991 10:47
        var dateAndTime = new Date(1991, 7, 21, 10, 47, 00, 00);
        //test dd/mm/yyyy hh:ii:ss
        expect(jB.parseDate('21/08/1991 10:47:00').getTime()).toEqual(dateAndTime.getTime());

        var dateOnly = new Date(1991, 7, 21);
        // test dd/mm/yyyy
        expect(jB.parseDate('21/08/1991').getTime()).toEqual(dateOnly.getTime());
        // test yyyy-mm-dd
        expect(jB.parseDate('1991-08-21').getTime()).toEqual(dateOnly.getTime());

        var dateYearMonth = new Date(1991, 7, 1);
        // test dd/yyyy

        expect(jB.parseDate('08/1991').getTime()).toEqual(dateYearMonth.getTime());

    });


});