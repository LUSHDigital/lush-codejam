var gridHeight = 100;
var gridWidth = 100;
var size = 1;
var ticks = 1;

const colours1 = ["#ee42f4", "#f9f154", "#b9e7ea"];
const colours2 = ["#f7f9a4","#ede8c7","#ffad42", "#87d7e5"];
const pinks = ["#e539ac","#e539ac","#a54a87","#fcb0e3"];
const honey = ["#EF6215","#e2c712","#FCDC0A"];
const marsh = ["#f99df6","#8400b5","#F9BB18","#dbdacb"];
var colours = marsh;

let method = "lonely";

/*var audio = new Audio();
audio.src = "hello.mp3";
audio.autoplay = true;*/

class GridCell {
    constructor(is_alive, living_colour, dead_colour) {
        this.is_alive = is_alive;
        this.living_color = living_colour;
        this.dead_colour = dead_colour;

    }
}

var theGrid = null;


function tick() {
    drawGrid();
    updateGrid();
    }


//Creates the nxn array which represents the cells
function initGrid(gridWidth, gridHeight) {
    console.log("Loading grid")
    let grid = [];
    for (let i = 0; i < gridHeight; i++) {
        console.log("row")
        let row = [];
        for (let j = 0; j < gridWidth; j++) {
            if (method==="line") {
                let c = new GridCell(false, colours[Math.floor(Math.random() * colours.length)], "#0000ff");

                if (j === Math.round(gridHeight/2) || i=== Math.round(gridHeight/2)+1) {
                    c.is_alive = true
                }
                if (i === Math.round(gridHeight/2)+1 && j === Math.round(gridWidth/2)) {
                    c.is_alive = true
                }

                row.push(c)
            }
            if (method==="random") {
                let c = new GridCell(Math.random() > .62, colours[Math.floor(Math.random() * colours.length)], "#0000ff");
                row.push(c)
            }
            if (method==="lonely") {
                let c = new GridCell(false, colours[Math.floor(Math.random() * colours.length)], "#0000ff");
                let centreX = Math.round(gridHeight/2);
                let centreY = Math.round(gridWidth/2);
                let arrOfFun = [[centreX,centreY],[centreX+1,centreY],[centreX-1,centreY]];
                for (let k = 0; k < arrOfFun.length; k++) {
                    let a = arrOfFun[k][0];
                    let b = arrOfFun[k][1];
                    if(a===i && b===j) {c.is_alive = true}
                }
                row.push(c)

            }
        }
        grid.push(row)
    }
    return grid
}

function updateGrid() {
    //let new_grid = theGrid.slice();
    var new_grid = JSON.parse(JSON.stringify( theGrid ));

    for (let i = 0; i < theGrid.length; i++) {
        for (let j = 0; j < theGrid[0].length; j++) {
            let neighbours = 0;
            let os_arr = [[0, 1], [0, -1], [1, 0], [1, 1],  [1, -1], [-1, 0],  [-1, -1], [-1, 1]];
            //console.log("Focus", i,j)
            for (let k = 0; k < os_arr.length; k++) {
                let x = os_arr[k][0];
                let y = os_arr[k][1];

                if ((i + x )>= 0 && (i + x) < theGrid.length && (j + y) >= 0 && (j + y) < theGrid[0].length) {
                    //console.log((i+x),(j+y));
                    if (theGrid[i + x][j + y].is_alive) {

                        neighbours++
                    }
                }
            }

            if (theGrid[i][j].is_alive) {
                //console.log("living cell's neighbours", neighbours);
                if (neighbours < 2 || neighbours > 3) {
                    //console.log("died");
                    new_grid[i][j].is_alive = false;
                }
            }
            if(!theGrid[i][j].is_alive) {
                //if (neighbours>0) {console.log("dead cell's neighbours", neighbours)}

                if (neighbours === 3) {
                    //console.log("birth");

                    new_grid[i][j].is_alive = true;
                }
            }

        }
    }


    theGrid = new_grid.slice();
}


function drawGrid() { //draw the contents of the grid onto a canvas
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 5000, 5000); //this should clear the canvas ahead of each redraw
    for (var j = 1; j < gridHeight; j ++) { //iterate through rows
        for (var k = 1; k < gridWidth; k ++) { //iterate through column
            //console.log(j,k)
            if (theGrid[j][k].is_alive) {
                ctx.fillStyle = theGrid[j][k].living_color;
				ctx.shadowBlur =  50;
				ctx.shadowColor = "grey";
                ctx.beginPath();
                let radius = document.getElementById("setSize").value;
                //console.log(radius)
                let gap = document.getElementById("setGap").value
                ctx.arc(j*gap, k*gap, radius, 0, 6, false);
                ctx.fill()
            } else {

            }
        }
    }
}

function setCol(col) {
	colours = col;
    for (let i = 0; i < theGrid.length; i++) {
        for (let j = 0; j < theGrid[0].length; j++) {
            theGrid[i][j].living_color = col[Math.floor(Math.random()*col.length)]
        }
    }
}
function insertFunction(type) {
    console.log(type)
    gridWidth = document.getElementById("setHeight").value
    gridHeight = document.getElementById("setWidth").value
    method = type;
    theGrid = initGrid(gridWidth, gridHeight);
    setInterval(tick,   document.getElementById("setSpeed").value);

}

