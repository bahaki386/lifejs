var gen=1;
var pixin;
var canvas=document.getElementById('LIFE');
var flag_start=false;
var flag_stop=true;
var t;
var mouseX,mouseY;

var next=function (){
	getNext();
	draw();
}

var resetByZero=function(){
	var pix = prompt("フィールドのサイズを入力してください(1~128)","");
	pixin = Number(pix);
	while((!(pixin>0))||pixin<0||pixin>128){
		pix = prompt("フィールドのサイズを入力してください(1~128)","");
		pixin = Number(pix);
	}
	life = new Array(pixin);
	var i=0;
	var j=0;
	for (i = 0; i < pixin; i++) {
		life[i] = new Array(pixin);
	}
	i=0;
	for(i=0;i<pixin;i++){
		for(j=0;j<pixin;j++){
			life[i][j]=0;
		}
	}
	gen=1;
	draw();
}
var reset = function (){
	var pix;
	pix = prompt("フィールドのサイズを入力してください(1~128)","");
	pixin = Number(pix);
	while((!(pixin>0))||pixin<0||pixin>128){
		pix = prompt("フィールドのサイズを入力してください(1~128)","");
		pixin = Number(pix);
	}
	life = new Array(pixin);
	var i=0;
	var j=0;
	for (i = 0; i < pixin; i++) {
		life[i] = new Array(pixin);
	}
	i=0;
	for(i=0;i<pixin;i++){
		for(j=0;j<pixin;j++){
			life[i][j]=0;
		}
	}
	var x=0;
	var y=0;
	for(i=0;i<(Math.ceil((pixin*pixin)/2.5));i++){
		x=Math.round(Math.random()*(pixin-1));
		y=Math.round(Math.random()*(pixin-1));
		life[x][y]=1;
	}
	gen=1;
	draw();
}
window.onload=function (){
	canvas = document.getElementById('LIFE');
		/* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
	if ( ! canvas || ! canvas.getContext ) {
		return false;
	}
	var hbn=document.getElementById('next');
	var hbr=document.getElementById('zero');
	var hbrz=document.getElementById('reset');
	var hbs=document.getElementById('start');
	var hbst=document.getElementById('stop');
	hbr.addEventListener('click', function(evt) { resetByZero(); });
	hbn.addEventListener('click', function(evt) { next(); });
	hbrz.addEventListener('click', function(evt) { reset(); });
	hbs.addEventListener('click', function(evt) { hbst.disabled=false;t=setInterval("next()",100); hbs.disabled=true;});
	hbst.addEventListener('click', function(evt) { hbst.disabled=true;clearInterval(t); t=null; hbs.disabled=false});
	hbst.addEventListener('click', function(evt) { hbst.disabled=true;clearInterval(t); t=null; hbs.disabled=false});
	hbn.addEventListener('click', function(evt) { hbst.disabled=true;clearInterval(t); t=null; hbs.disabled=false});
	hbr.addEventListener('click', function(evt) { hbst.disabled=true;clearInterval(t); t=null; hbs.disabled=false});
	hbrz.addEventListener('click', function(evt) { hbst.disabled=true;clearInterval(t); t=null; hbs.disabled=false});
	document.getElementById('exit').addEventListener('click', function(evt) { document.location = "index.html"; });
	reset();
}

canvas.onmousedown=HndMouse;
function HndMouse(e){
	adjustXY(e);
	if(mouseY<640){
		var posX=Math.floor(mouseX/s);
		var posY=Math.floor(mouseY/s);
		if(life[posX][posY]==1){
			life[posX][posY]=0;
		}
		else{
			life[posX][posY]=1;
		}
	}
	draw(pixin);
}

function adjustXY(e) {
	var rect = e.target.getBoundingClientRect();
	mouseX = e.clientX - rect.left;
	mouseY = e.clientY - rect.top;
}

function getNext(){
	nLife = new Array(pixin);
	var i=0;
	var j=0;
	for(i=0;i<pixin;i++){
		nLife[i]=new Array(pixin);
		for(j=0;j<pixin;j++){
			nLife[i][j]=life[i][j];
		}
	}
	var tmp=0;
	for(j=0;j<pixin;j++){
		for(i=0;i<pixin;i++){
			if(j==0){
				if(i==0){
					tmp=life[i+1][j]+life[i][j+1]+life[i+1][j+1];
				}
				else if(i==(pixin-1)){
					tmp=life[i-1][j]+life[i-1][j+1]+life[i][j+1];
				}
				else{
					tmp=life[i-1][j]+life[i+1][j]+life[i-1][j+1]+life[i][j+1]+life[i+1][j+1];
				}
			}
			else if(j==(pixin-1)){
				if(i==0){
					tmp=life[i][j-1]+life[i+1][j-1]+life[i+1][j];
				}
				else if(i==(pixin-1)){
					tmp=life[i-1][j-1]+life[i][j-1]+life[i-1][j];
				}
				else{
					tmp=life[i-1][j-1]+life[i][j-1]+life[i+1][j-1]+life[i-1][j]+life[i+1][j];
				}
			}
			else{
				if(i==0){
					tmp=life[i][j-1]+life[i+1][j-1]+life[i+1][j]+life[i][j+1]+life[i+1][j+1];
				}
				else if(i==(pixin-1)){
					tmp=life[i-1][j-1]+life[i][j-1]+life[i-1][j]+life[i-1][j+1]+life[i][j+1];
				}
				else{
					tmp=life[i-1][j-1]+life[i][j-1]+life[i+1][j-1]+life[i-1][j]+life[i+1][j]+life[i-1][j+1]+life[i][j+1]+life[i+1][j+1];
				}
			}
			if(tmp<2){
				nLife[i][j]=0;
			}
			else if(tmp>3){
				nLife[i][j]=0;
			}
			else if(tmp==3){
				nLife[i][j]=1;
			}

		}
	}
	for(j=0;j<pixin;j++){
		for(i=0;i<pixin;i++){
			if(nLife[i][j]==0){
				life[i][j]=0;
			}
			else{
				life[i][j]=1;
			}
		}
	}
	gen++;
}

function draw() {
	s=640/pixin;
	var ctx = canvas.getContext('2d');
	/* セルを描く */
	ctx.fillStyle='rgb(0,0,0)';
	ctx.fillRect(0,0,640,670);
	ctx.strokeStyle='rgb(0,255,0)';
	ctx.fillStyle='rgb(0,255,0)';
	var i=0;
	var j=0;
	for(j=0;j<pixin;j++){
		for(i=0;i<pixin;i++){
			if(life[i][j]==1){
				ctx.fillRect(i*s,j*s,s,s);
			}
			else{
				ctx.strokeRect(i*s,j*s,s,s);
			}
		}
	}
	ctx.font = "bold 25px mplus-2m-regular";
	ctx.fillText("世代:"+gen,525,665);
}
