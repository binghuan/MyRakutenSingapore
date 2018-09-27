
/* Concept. 

1. Allocate Seat Map for Meeting Room by Width and Height
2. Take number of seats by checking the Neighbor, less is better. 
3. Try 2 solutions for taking seat. 
	Solution [1]: Taking seat from first. 
	Solution [2]: Taking seat from last. 

Do the comparison between solution [1] and solution [2]. 

Get the min. result for answer. 

*/

const DBG = false;

let seatMap = [];
let seats = {};

let getSeatStateAfterTaking = function (x, y, width, height) {
    let seat = seats[x + "," + y];

    if(DBG)console.log("#seatMap:", seatMap);
    let numberOfNeighbor = 0;
    // check neighbor
    if (x - 1 >= 0) {
        if (seatMap[x - 1][y]) {
            if(DBG)console.log("!Left");
            numberOfNeighbor += 1;
        }
    }

    if (x + 1 < width) {
        if (seatMap[x + 1][y]) {
            if(DBG)console.log("!Right", seatMap[x + 1, y]);
            numberOfNeighbor += 1;
        }
    }

    if (y - 1 >= 0) {
        if (seatMap[x][y - 1]) {
            if(DBG)console.log("!Up");
            numberOfNeighbor += 1;
        }
    }

    if (y + 1 < height) {
        if (seatMap[x][y + 1]) {
            if(DBG)console.log("!Down");
            numberOfNeighbor += 1;
        }
    }

    if(DBG)console.log(">> getSeatStateAfterTaking: ", numberOfNeighbor);
    return numberOfNeighbor;
}

let emptySeatMap = function (width, height) {
    // 1st initialize seets . 
    seatMap = [];
    seats = {};
    for (let i = 0; i < width; i++) {
        seatMap[i] = [];
        for (let j = 0; j < height; j++) {
            let coordinate = String(i).concat("," + String(j))
            seats[coordinate] = {
                neighbor: 0,
                x: i,
                y: j
            }

            seatMap[i][j] = 0;
        }
    }
}

let arrangeMeetingRoom = function (inputData, isTrial) {

    let width = inputData[0];
    let height = inputData[1];
    let numberOfUsers = inputData[2];
    if(DBG)console.log("## INPUT: ", width, height, numberOfUsers);
    emptySeatMap(width, height);
    if(DBG)console.log("seatMap: ", seatMap);
    if(DBG)console.log("seats: ", seats);

    let minNumberOfNeighbor = 5;
    let posX = -1;
    let posY = -1;
    let checkingCounter = 0;
    for (let k = 0; k < numberOfUsers; k++) {
        minNumberOfNeighbor = 5;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let coordinate = String(i).concat("," + String(j))
                if (seatMap[i][j] == 0) {
                    checkingCounter += 1;
                    let newNumberOfNeighbor = getSeatStateAfterTaking(i, j, width, height);
                    if(DBG)console.log("_check seat[", i, ",", j, "]", newNumberOfNeighbor, minNumberOfNeighbor);
                    if (isTrial && (checkingCounter % 2 == 1) && newNumberOfNeighbor == minNumberOfNeighbor || newNumberOfNeighbor < minNumberOfNeighbor) {
                        minNumberOfNeighbor = newNumberOfNeighbor;
                        posX = i;
                        posY = j;
                        if(DBG)console.log("--> new seat: ", posX, posY);
                    }
                }
            }
        }

        seatMap[posX][posY] = 1;
        seats[posX + "," + posY].neighbor = minNumberOfNeighbor;

        if(DBG)console.log("########### Seat [", posX, ",", posY, "] has been taken.");
    }

    if(DBG)console.log("## INPUT: ", width, height, numberOfUsers);
    if(DBG)console.log("@@ANSWER: ");
    if(DBG)console.log("seatMap: ", seatMap);
    //console.log("seats: ", seats);

    // Final Step: Check Neighbor
    let count = 0;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (j + 1 < height && seatMap[i][j] && seatMap[i][j + 1]) {
                count += 1;
            }
        }
    }

    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            if (i + 1 < width && seatMap[i][j] && seatMap[i + 1][j]) {
                count += 1;
            }
        }
    }

    if(DBG)console.log("count = ", count);
    return count;
}

let testData = "[5,2,8]-> 7 [3,5,14]-> 18 [1,16,1]-> 0 [3,5,1]-> 0 [8,2,12]-> 10 [16,1,1]-> 0 [3,3,6]-> 3 [2,6,12]-> 16 [15,1,0]-> 0 [5,3,7]-> 0 [4,3,5]-> 0 [3,5,11]-> 8 [7,2,13]-> 16 [15,1,6]-> 0 [15,1,15]-> 14 [4,4,9]-> 2 [5,3,8]-> 0 [3,5,6]-> 0 [16,1,7]-> 0 [1,15,7]-> 0 [4,3,12]-> 17 [5,3,13]-> 14 [2,4,5]-> 2 [5,3,5]-> 0 [16,1,16]-> 15 [2,5,8]-> 7 [5,3,4]-> 0 [5,3,10]-> 6 [4,4,7]-> 0 [3,5,9]-> 3 [4,2,2]-> 0 [4,4,15]-> 20 [2,2,4]-> 4 [5,3,11]-> 8 [4,4,8]-> 0 [1,16,9]-> 1 [4,4,16]-> 24 [1,15,6]-> 0 [15,1,8]-> 0 [5,3,6]-> 0 [16,1,9]-> 1 [3,5,15]-> 22 [1,15,1]-> 0 [1,15,0]-> 0 [2,5,9]-> 10 [3,5,10]-> 6 [1,15,15]-> 14 [3,2,0]-> 0 [5,3,2]-> 0 [5,3,1]-> 0 [5,2,4]-> 0 [3,5,4]-> 0 [2,7,13]-> 16 [3,3,0]-> 0 [7,2,11]-> 10 [4,4,0]-> 0 [1,1,0]-> 0 [2,6,9]-> 7 [3,5,3]-> 0 [5,3,15]-> 22 [5,2,6]-> 2 [3,4,12]-> 17 [2,3,6]-> 7 [1,1,1]-> 0 [15,1,1]-> 0 [1,16,16]-> 15 [2,2,2]-> 0 [3,3,9]-> 12 [16,1,8]-> 0 [9,1,6]-> 2 [5,3,12]-> 11 [2,2,3]-> 2 [3,5,7]-> 0 [7,2,0]-> 0 [4,3,6]-> 0 [2,3,4]-> 2 [1,15,8]-> 0 [16,1,0]-> 0 [5,3,9]-> 3 [15,1,7]-> 0 [2,4,6]-> 4 [1,16,7]-> 0 [3,5,12]-> 11 [1,16,8]-> 0 [4,4,1]-> 0 [3,5,0]-> 0 [3,5,8]-> 0 [1,16,0]-> 0 [5,3,3]-> 0 [5,3,0]-> 0 [1,13,9]-> 4 [3,5,2]-> 0 [1,9,6]-> 2 [6,2,12]-> 16 [4,3,8]-> 4 [3,5,5]-> 0 [5,3,14]-> 18 [4,3,7]-> 2 [6,2,4]-> 0 [3,5,1]-> 0";
let testItems = testData.split(" ");
let totalTestCases = testItems.length / 2;
let counter = 1;
let target = -1;
for (let i = 0; i < testItems.length; i++) {
    // if(counter != -1 || counter != target) {
    //     ++i;
    //     counter+=1;
    //     continue;
    // }
    let expectedAnswer = parseInt(testItems[i + 1]);
    let answer1 = arrangeMeetingRoom(JSON.parse(testItems[i].split("->")[0]), false);
    let answer2 = arrangeMeetingRoom(JSON.parse(testItems[i].split("->")[0]), true);
    let answer = answer1;
    if (answer2 < answer1) {
        answer = answer2;
    }
    console.log("<!-- RUN TEST CASE #", counter, "/", totalTestCases, "--------------------------->");
    console.log("@@@@@ Data for Testing: ", testItems[i], testItems[i + 1]);
    if (expectedAnswer != answer) {
        console.log("X_X Wrong Answer, expectedAnswer:", expectedAnswer, ", But Your Answer is: ", answer1, answer2);
        break;
    } else {
        console.log("^_^b ! ~ OK");
    }
    ++i;

    counter += 1;
}
