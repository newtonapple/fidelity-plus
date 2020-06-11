let Utils = (function () {
    return {
        parseMoney: function (value) {
            return parseInt(value.replaceAll(/[$,.]/g, ''));
        },

        fmtMoney: function (cents) {
            return (cents > 0 ? '$' + (cents / 100) : '-$' + (cents / -100));
        }
    }
}());