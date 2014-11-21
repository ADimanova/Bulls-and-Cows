define([], function () {
    'use strict';
    var Score = (function () {
        var Score = (function (name, score) {
            this.name = name;
            this.score = score;
        });

        return Score;
    }());
    return Score;
});
