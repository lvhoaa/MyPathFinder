var wall="rgb(255, 0, 0)";//red
var original="rgb(0, 0, 204)";
var begin="rgb(0, 255, 0)";//yellow
var finish="rgb(255, 255, 0)";//green
var path="rgb(212, 108, 201)";//pink path color
var beginnode, finishnode;
var len=10;
var luutrace =[];
var truoc=[];
for(let i=0;i<101;++i){
    truoc.push(0);
}

function getval(){
    beginnode=document.getElementById("beginin").value;
    finishnode=document.getElementById("finishin").value;
}
function setup1(){
    getval();
    var maze_container=document.getElementById("maze_container");
    for(var i=0;i<10;++i){
        var row=document.createElement('div');
        row.className="row row" + (i+1);
        row.id="row"+(i+1);
        for(var j=0;j<10;++j){
            var node=document.createElement('div');
            node.className="node node" +((i*10)+j+1);
            node.id="node"+ ((i*10)+j+1); 
            
            if(node.id !="node"+beginnode && node.id!= "node"+finishnode){
                node.style.backgroundColor=original;
                node.onclick=function(){
                    clicked(this.id);
                }
            }
            else{
                if(node.id!="node" +beginnode)
                    node.style.backgroundColor=begin;
                else{
                    node.style.backgroundColor=finish;
                }
            }
            row.appendChild(node);
        }
        maze_container.appendChild(row);
    }
}
function clicked(elementid){
    var node=document.getElementById(elementid);
    if(node.style.backgroundColor===wall){
        node.style.backgroundColor=original;
    }
    else{
        node.style.backgroundColor=wall;
    }
}


function isValid(vis, row, col)
{
    if (row < 0 || col < 0
        || row >= ROW || col >= COL)
        return false;
    if (vis[row][col])
        return false;
    var nodeso=row*10+col+1;

    var tuong=document.getElementById("node"+nodeso);
    if(tuong.style.backgroundColor==wall)
        return false;
    return true;
}

    var ROW = 10;
    var COL = 10;

    
    var dRow = [-1, 0, 1, 0 ];
    var dCol = [0, 1, 0, -1 ];
    
function BFS( vis,row, col)
{
    var q = [];
    q.push([row, col]);
    vis[row][col] = true;
    

    while (q.length!=0) {
        var cell = q[0];
        var x = cell[0];
        var y = cell[1];
    
        q.shift();
    
        for (var i = 0; i < 4; i++) {
    
            var adjx = x + dRow[i];
            var adjy = y + dCol[i];
            if (isValid(vis, adjx, adjy)===true) {
                q.push([adjx, adjy ]);
                console.log("pushed");
                var adjnode=adjx*10+adjy+1;
                console.log(adjnode);
                var nodecu=x*10+y+1;
                
                truoc[adjnode]=nodecu;
                vis[adjx][adjy] = true;
            }            
        }
    }
}
function trace(nodedau,nodecuoi){
    console.log("luuduong");
    while(nodecuoi!=nodedau){
        luutrace.push(nodecuoi);
        nodecuoi=truoc[nodecuoi];
    }
    luutrace.push(nodedau);


    console.log(luutrace);
    topath();
    console.log("xongtrace");
}
function topath(){
    for(let i=0;i<luutrace.length;++i){
        document.getElementById("node"+luutrace[i]).style.backgroundColor=path;
    }
}
function comparecolor(id,color){
    var colorid=document.getElementById(id).style.backgroundColor;
    if(colorid==color)
        return true;
    return false;
}
function solve(){
    console.log(document.getElementById("node"+90).style.backgroundColor);
    console.log(wall);
    console.log(comparecolor("node90",wall));

    var vis = Array.from(Array(ROW), ()=> Array(COL).fill(false));
    var b = beginnode%10;
    var a=(beginnode-b)/10;
    
    if(b!==0){
        --b;
    }
    if(b===0 && a!==0){
        --a;
        b=9;
    }
    BFS( vis, a, b);
    trace(beginnode,finishnode);
}
