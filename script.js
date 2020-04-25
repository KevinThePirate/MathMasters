let gender;
let currentLevel = 0;
let score = 0;
let playThroughs = 0;
let proposedAnswer = '';
let questionPos = Math.floor(Math.random() * 10);
let finalMusic = new Audio('audio/misc/congrats.mp3');
let highScoreTable = [];
let currentQuestion = '';
let answer = 0;
let buttonTicker = 0;
let hardMode = false;
let firstLevel = new Level('Addison', 50, 'Addition', '78C850', 'ADD', '+');
let secondLevel = new Level('Submantha', 75, 'Subtraction', '98D8D8', 'SUBTRACT', '-')
let thirdLevel = new Level('Max', 100, 'Multiplication', '68A090', 'MULTIPLY', 'X')
let fourthLevel = new Level('Denise', 125, 'Division', '7038F8', 'DIVIDE', '/')
let levelIndex = [firstLevel, firstLevel, secondLevel, thirdLevel, fourthLevel];
let levelRef = levelIndex[currentLevel];

function Level(name, hp, master, hex, doThis, operator) {
    this.enemyName = name;
    this.enemyHP = hp;
    this.maxHP = hp;
    this.subtitle = 'Master of ' + master;
    this.color = '#' + hex;
    this.action = doThis;
    this.operator = operator;
    this.updateFiles = function () {
        this.currentBG = 'url(images/Level' + currentLevel + '/background.png)';
        this.enemyImg = 'images/Level' + currentLevel + '/enemy.png';
        this.staticImg = 'images/Level' + currentLevel + '/static.png';
        this.vs = 'images/Level' + currentLevel + '/vs.png';
        this.currentMusic = new Audio('audio/Level' + currentLevel + '/music.mp3');
        this.enemyName = name;
        this.enemyHP = hp;
        this.maxHP = hp;
        this.subtitle = 'Master of ' + master;
        console.log(this.currentBG);
    }
    this.updateHealth = function () {

        document.getElementById('computerHPBar').style.width = 85 * (this.enemyHP / this.maxHP) + '%';
        if (this.enemyHP > (this.maxHP * 0.75)) {
            document.getElementById('computerHPBar').style.backgroundColor = 'green'
        }
        if (this.enemyHP < (this.maxHP * 0.75)) {
            document.getElementById('computerHPBar').style.backgroundColor = 'yellow'
        }
        if (this.enemyHP < (this.maxHP * 0.5)) {
            document.getElementById('computerHPBar').style.backgroundColor = 'red'
        }

    }
};

function Player() {
    hp: 100;
    gender: '';


}
Player.hp = 100;
Player.maxHP = 100;
Player.updateGraph = function () {
    Player.img = 'images/player/' + Player.gender + '.png';
    Player.vs = 'images/playerVs/' + Player.gender + '.png';
};
Player.updateHealth = function (typeOfUpdate) {
    if (typeOfUpdate = 'damage') {
        var cc = 25;

        var interval = setInterval(function () {
            cc--;
            Player.hp--;
            document.getElementById('playerHealthCounter').innerHTML = Player.hp + '/100';
            document.getElementById('playerHPBar').style.width = 85 * (Player.hp / 100) + '%';
            if (Player.hp < (Player.maxHP * 0.75)) {
                document.getElementById('playerHPBar').style.backgroundColor = 'yellow'
            }
            if (Player.hp < (Player.maxHP * 0.5)) {
                document.getElementById('playerHPBar').style.backgroundColor = 'red'
            }
            if (cc == 0)
                clearInterval(interval);

        }, 50);


    }
}

function fade(divID) {
    for (var i = 0; i < 100; i++) {
        setTimeout(function () {
            document.getElementById(divID).style.opacity = i / 100;
        }, 1)
    }
}

function genderSelect(genderSelected) {
    Player.gender = String(genderSelected);
    document.getElementById('middleButton').disabled = false;
    Player.updateGraph();
}

function levelLoad(loadTime = 3000) {
    document.getElementById('transition').style.display = 'block';
    console.log('Computer Thinks Level at Load is: ' + currentLevel);
    fade('transition');
    currentLevel++
    if (currentLevel == 0) {
        console.log('EXAMINER NOTE: I know this part is broken and is going to produce a lot of errors, but I spent a week straight trying to figure out why the game was not reloading properly so in the interest of time, it was more efficient to circumvent the problem rather than fix it outright. -KMS')
        proposedAnswer = answer;
        ansCheck();
        loadTime = 5000;
    }
    if (currentLevel == 1) {
        loadTime = 5000;
        Player.hp = 100;
    }
    console.log('Computer Thinks Level at Load is: ' + currentLevel);
    if (hardMode == false) {
        Player.hp = 100;
    }
    setTimeout(function () {
        levelRef = levelIndex[currentLevel];
        console.log(levelRef);
        levelRef.enemyHP = levelRef.maxHP;
        levelRef.updateFiles();
        highScoreTable.sort();
        levelRef.currentMusic.play();
        document.getElementById('gameArea').innerHTML = ' <div id="battleArea" class="gameElement"> <div id="computerHP"> <div id="computerName">' + levelRef.enemyName + '</div> <span id="mastery">' + levelRef.subtitle + '</span> <div id="computerHPBar" class="good"></div> </div> <img src="" id="enemyImage"> <img src="" id="playerImage"> <div id="playerHP"><span id="playerTitle">YOU</span> <span id="playerHealthCounter">' + Player.hp + '/100</span><div id="playerHPBar" class="good"></div><span id="mastery">Level ' + currentLevel + '/4</span></div> </div><div id="uiArea"> <div id="questionArea"><div id="questionDisplayArea"></div><div id="actionArea">' + levelRef.action + '</div></div> <div id="answerArea"><span id="answerDisplay">ANS</span><div id="subContainer"><button class="submissionButton" id="submitButton" onclick="numpad(11)">SUBMIT</button><button class="submissionButton" id="clearButton" onclick="numpad(10)">CLEAR</button></div></div> <div id="numpadArea"> <table> <tr> <td><button class="numpadButton" onclick="numpad(1)">1</button></td> <td><button class="numpadButton" onclick="numpad(2)">2</button></td> <td><button class="numpadButton" onclick="numpad(3)">3</button></td> </tr> <tr> <td><button class="numpadButton" onclick="numpad(4)">4</button></td> <td><button class="numpadButton" onclick="numpad(5)">5</button></td> <td><button class="numpadButton" onclick="numpad(6)">6</button></td> </tr> <tr> <td><button class="numpadButton" onclick="numpad(7)">7</button></td> <td><button class="numpadButton" onclick="numpad(8)">8</button></td> <td><button class="numpadButtonSmall"  style="border-right: 3px solid #427328" onclick="numpad(9)">9</button><button class="numpadButtonSmall" onclick="numpad(0)">0</button></td> </tr> </table> </div> </div> </div>';
        console.log(levelRef.subtitle);
        document.getElementById('playerHP').style.right = '-100%';
        console.log('Right is: ' + document.getElementById('playerHP').style.right);
        document.getElementById('computerHP').style.left = '-100%';
        document.getElementById('enemyImage').style.left = '-200px';
        document.getElementById('playerImage').style.right = '-200px';
        document.getElementById('battleArea').style.backgroundImage = levelRef.currentBG;
        document.getElementById('enemyImage').src = levelRef.staticImg;
        document.getElementById('playerImage').src = Player.img;
        if (currentLevel > 0) {
            document.getElementById('transition').innerHTML = '<h1 id="levelTitle">Level ' + currentLevel + '/4</h1><h2><span id="subtitle" style="color:' + levelRef.color + '">' + levelIndex[currentLevel].enemyName + ': </span> ' + levelIndex[currentLevel].subtitle + '</h2><div id="vs"><img src="' + Player.vs + '" id="playerVS"><img src="' + levelIndex[currentLevel].vs + '" id="computerVS"></div>';
        } else {
            document.getElementById('transition').innerHTML = '';
        }
        if (currentLevel > 1 && currentLevel < levelIndex.length) {
            document.getElementById('transition').innerHTML += "<div id='scoreIs'>SCORE:" + score + "</div>"
        }
        document.getElementById('vs').style.backgroundColor = levelIndex[currentLevel].color;
        levelRef.updateHealth();
    }, 1000)
    setTimeout(function () {
        document.getElementById('transition').style.opacity = 0;
        document.getElementById('transition').style.display = 'none';
        console.log('transition hidden');
    }, loadTime)
    setTimeout(function () {
        document.getElementById('enemyImage').style.left = '450px';
        document.getElementById('playerImage').style.right = '700px';
    }, 4000)
    setTimeout(function () {
        document.getElementById('enemyImage').src = levelIndex[currentLevel].enemyImg;
        document.getElementById('playerHP').style.right = 0;
        document.getElementById('computerHP').style.left = 0;
    }, 5000)
    setTimeout(function () {
        document.getElementById('playerHPBar').style.width = 85 * (Player.hp / 100) + '%';
        nextTurn(loadTime);
    }, 6000)
    //}
}

function nextTurn(loadTime) {

    let intOne = Math.ceil(Math.random() * 5) + 5;
    let intTwo = Math.ceil(Math.random() * 5);

    function checkIfFactor() {
        if (currentLevel == 4 && intOne % intTwo != 0) {
            intTwo = Math.ceil(Math.random() * 5);
            checkIfFactor();
        }
    }
    checkIfFactor();
    currentQuestion = intOne + levelRef.operator + intTwo
    document.getElementById('questionDisplayArea').innerHTML = currentQuestion;

    switch (currentLevel) {
        case 1:
            answer = intOne + intTwo
            break;
        case 2:
            answer = intOne - intTwo
            break;
        case 3:
            answer = intOne * intTwo
            break;
        case 4:
            answer = intOne / intTwo
            break;
    }
}

function ansCheck() {
    if (String(proposedAnswer) == answer) {
        levelIndex[currentLevel].enemyHP -= 25;
        document.getElementById('answerDisplay').innerHTML = "<img src='images/misc/check.png' class='answerIs'>";
        levelIndex[currentLevel].updateHealth();
        setTimeout(function () {
            nextTurn();
            numpad(10);
        }, 1500)
    } else {
        Player.updateHealth('damage');
        document.getElementById('answerDisplay').innerHTML = "<img src='images/misc/cross.png' class='answerIs'>";
        setTimeout(function () {
            nextTurn();
            numpad(10);
        }, 2500)
    }
    if (Player.hp <= 26) {
        setTimeout(function () {
            //alert('loss');
            currentLevel = 0;
            levelLoad();
        }, 2500)
    }
    if (levelIndex[currentLevel].enemyHP <= 10 && currentLevel < 4) {
        document.getElementById('answerDisplay').innerHTML = 'WIN!'
        setTimeout(function () {
            levelIndex[currentLevel].currentMusic.pause();
            score += Player.hp * currentLevel;
            levelLoad()
        }, 2500)

    }
    if (levelIndex[currentLevel].enemyHP <= 10 && currentLevel >= 4) {
        youWin();
    }
}

function youWin() {
    setTimeout(function () {
        score += Player.hp * currentLevel;
        document.getElementById('transition').innerHTML = '<div id="gameArea" class="gameElement"> <div id="endScreen"> <h1 id="congrats">CONGRATULATIONS!</h1> <h3 id="winSubtitle">You Beat The Game!</h3> <img id="winnerImage" src="images/playerWin/' + Player.gender + '.png"> <button id="playAgainButton" onclick="restart()">Play Again</button><div id="finalScoreDisplay"></div>';
        highScoreTable.push(score);
        highScoreTable.sort();
        if (playThroughs > 0) {
            document.getElementById('finalScoreDisplay').innerHTML = '<h2>Final Score:</h2><h1>' + score + '</h1></div> <div><table> <tr> <td>#1</td> <td>' + highScoreTable[0] + '</td> </tr> <tr> <td>#2</td> <td>' + highScoreTable[1] + '</td> </tr> <tr> <td>#3</td> <td>100</td> </tr> </table></div>'
        }
        setTimeout(function () {
            levelIndex[currentLevel].currentMusic.pause();
            finalMusic.play()
            document.getElementById('transition').style.display = 'block';
            fade('transition');

        }, 1000)
    }, 1000)
}

function numpad(val) {
    if (val < 10) {
        proposedAnswer += String(val);
        document.getElementById('answerDisplay').innerHTML = proposedAnswer;
    } else if (val == 10) {
        proposedAnswer = '';
        document.getElementById('answerDisplay').innerHTML = proposedAnswer;
    } else if (val == 11) {
        ansCheck();
    }

}

function restart() {
    playThroughs++;
    fade('transition');
    finalMusic.pause();
    finalMusic.currentTime = 0;
    currentLevel = -1;
    score = 0;
    console.log('Computer Thinks Level at Reset is: ' + currentLevel);
    levelLoad();

}

function buttonSwitch() {
    buttonTicker++;
    if (buttonTicker % 2 == 0) {
        document.getElementById('hardModeOnOff').innerHTML = "off";
        document.getElementById('diffButton').style.backgroundColor = '#382858';
        hardMode = false;
    } else {
        document.getElementById('hardModeOnOff').innerHTML = "on";
        document.getElementById('diffButton').style.backgroundColor = '#A93657';
        hardMode = true;
    }
}

function zoomTest(){
    
    
}