define([], function () {
    'use strict';
    var scoreList = (function () {
        function setLocalStorageList(storageList) {
            var storageValue = '[';
            for (var i = 0, len = storageList.length; i < len; i += 1) {
                storageValue += JSON.stringify(storageList[i]);
                if (i < storageList.length - 1) {
                    storageValue += ', ';
                }
            }
            storageValue += ']';

            localStorage['High Score'] = storageValue;
        }

        function getLocalStorageList() {
            var storageList = [];
            if (!localStorage.getItem('High Score')) {
                return storageList;
            }

            storageList = JSON.parse(localStorage.getItem('High Score'));

            storageList.sort(function (a, b) {
                return b.score - a.score;
            });

            //Last one will be pushed out even if he has the same score as the previous.
            //Could be better done with an array for each score that matches, but
            //the display logic will get more complicated.
            if (storageList.length > 5) {
                storageList.splice(5);
            }

            return storageList;
        }

        function enterScoreInScoreList(scoreList, item) {
            var itemPlace = -1;
            for (var i = 0, len = scoreList.length; i < len; i += 1) {
                if (scoreList[i].name === item.name) {
                    itemPlace = i;
                }
            }
            if (itemPlace !== -1) {
                scoreList[itemPlace] = item;
            }
            else {
                scoreList.push(item);
            }
        }

        return {
            getLocalStorageList: getLocalStorageList,
            setLocalStorageList: setLocalStorageList,
            enterScoreInScoreList: enterScoreInScoreList
        };
    }());

    return scoreList;
});