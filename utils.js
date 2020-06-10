let Utils = (function () {
    return {
        parseMoney: function (value) {
            return parseInt(value.replaceAll(/[$,.]/g, ''));
        },
    }
}());