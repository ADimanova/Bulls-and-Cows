define(['score', 'score-functions'], function (Score, scoreList) {
    'use strict';
    var GameEngine = (function () {
        function GameEngine() {
        }

        GameEngine.prototype.getHiddenNumber = function getHiddenNumber() {
            var generatedDigit,
                numberArray = [];
            for (var i = 0, len = 4; i < len; i += 1) {
                //First numbers must not be zero.
                if (i === 0) {
                    generatedDigit = getRandomInt(1, 9);
                }
                else {
                    generatedDigit = getRandomInt(0, 9);
                    //In the original game repeated numbers are not allowed
                    //Cheating becomes easy because you can check for 1111, 2222, ...
                    while (numberArray.indexOf(generatedDigit) !== -1) {
                        generatedDigit = getRandomInt(0, 9);
                    }
                }

                numberArray.push(generatedDigit);
            }

            return numberArray;
        };

        GameEngine.prototype.getPlayerNumber = function getPlayerNumber() {
            var inputNumber,
                digit,
                numberArray = [];
            inputNumber = document.querySelector('#number-input-field').value;
            if (!validateNumberInput(inputNumber)) {
                return -1;
            }
            else {
                for (var i = 0, len = inputNumber.length; i < len; i += 1) {
                    digit = parseInt(inputNumber[i]);
                    numberArray.push(digit);
                }

                return numberArray;
            }
        };

        GameEngine.prototype.enterPlayerInScoreList = function enterPlayerInScoreList(list, score) {
            var username;
            username = document.querySelector('#number-input-field').value;

            scoreList.enterScoreInScoreList(list, new Score(username, score));
        };

        GameEngine.prototype.compareNumbers = function compareNumbers(generatedNumber, playerNumber) {
            var bullsAndCows,
                areSame = true;
            for (var i = 0, len = 4; i < len; i += 1) {
                if (generatedNumber[i] !== playerNumber[i]) {
                    areSame = false;
                }
            }

            bullsAndCows = checkBullsAndCows(generatedNumber, playerNumber);

            return bullsAndCows;
        };

        function checkBullsAndCows(generatedNumber, playerNumber) {
            var bullsAndCows = {
                bulls: 0,
                cows: 0
            };

            for (var i = 0, len = 4; i < len; i += 1) {
                for (var j = 0; j < len; j += 1) {
                    if(i === j && generatedNumber[i] === playerNumber[j]) {
                        bullsAndCows.bulls++;
                    }
                    if (i !== j && generatedNumber[i] === playerNumber[j]) {
                        bullsAndCows.cows++;
                    }
                }
            }

            return bullsAndCows;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function validateNumberInput(number) {
            if (number === '' || number.length !== 4) {
                return false;
            }

            for (var i = 0, len = 4; i < len; i += 1) {
                if (isNaN(number[i])) {
                    return false;
                }
            }
			
			for (var i = 0; i < len; i += 1) {
                for (var j = i + 1; j < len; j += 1) {
					if(number[i] === number[j]) {				
						return false;
					}					
				}
            }

            return true;
        }

        return GameEngine;
    }());

    return GameEngine;
});

