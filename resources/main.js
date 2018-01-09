'use strict';

//generate random numbers from range
var a = Math.floor(Math.random() * (9 - 6 + 1)) + 6;
var sum = Math.floor(Math.random() * (14 - 11 + 1)) + 11;
var b = sum - a;

//set expression string
document.getElementById("a").innerHTML = a;
document.getElementById("b").innerHTML = b;

//prepare graphic area and calculate coordinates
var graphic = document.getElementById("graphicArea");
var ctx = graphic.getContext("2d");
var halfSegment = 19.49;
var firstArcCenter = halfSegment * a;
var midPoint = firstArcCenter * 2;
var secondArcRadius = halfSegment * b;
var endPoint = midPoint + secondArcRadius * 2;
var secondArcCenter = midPoint + secondArcRadius;
var arcHeightA = 155 - halfSegment * a * 0.5;
var arcHeightB = 155 - halfSegment * b * 0.5;

//main code
drawArc(0,midPoint,firstArcCenter,200,a); //draw first arc
createInput("a-input",firstArcCenter - 12,arcHeightA,1); //create a input
var aInput = document.getElementById("a-input");
aInput.oninput = function(){
  if (aInput.value != a){ //check equality
    markWrong(aInput,"a"); //and mark as wrong if not equal
  }
  else{
    unmarkRight(aInput,"a","a-caption",firstArcCenter - 12,arcHeightA - 20,a); //or unmark and transform to caption
    drawArc(midPoint,endPoint,secondArcCenter,200,b); //and draw second arc
    createInput("b-input",secondArcCenter - 12,arcHeightB,1); //with second input
    var bInput = document.getElementById("b-input");
    bInput.oninput = function(){
      if (bInput.value != b){ //again check
        markWrong(bInput,"b"); //mark if wrong
      }
      else{
        unmarkRight(bInput,"b","b-caption",secondArcCenter - 12,arcHeightB - 20,b); //or unmark and transform to caption
        document.getElementById("sum").style.display = 'none'; //hide "?" in expression
        document.getElementById("sum-input").style.display = 'inline'; //and show input for result
        var sumInput = document.getElementById("sum-input");
        sumInput.oninput = function(){
          if (sumInput.value != sum){ //check
            sumInput.classList.add('wrong-input'); //mark if wrong
          }
          else{
            sumInput.classList.remove('wrong-input') //or unmark
            document.getElementById("sum-input").style.display = 'none'; //hide input
            document.getElementById("sum").style.display = 'inline'; //show back text
            document.getElementById("sum").innerHTML = sum; //and change "?" symbol to result
          }
        }
      }
    }
  }
}

//functions section

//arc drawing function
function drawArc(start,end,mid,vertical,num){
  ctx.beginPath();
  ctx.strokeStyle = "#990099"
  ctx.lineWidth = 2;
  ctx.moveTo(start, vertical);
  ctx.quadraticCurveTo(mid, vertical - (num * 80) / 4, end, vertical);
  ctx.lineTo(end - 10, vertical - 16);
  ctx.moveTo(end, vertical);
  ctx.lineTo(end - 16, vertical - 8);
  ctx.stroke();
}

//create input function
function createInput(id,x,y,length){
  var input = document.createElement('input');
  input.setAttribute("type", "text");
  input.setAttribute("maxlength", length);
  input.setAttribute("id", id);
  input.classList.add('number-input');
  container.appendChild(input);
  input.style.left = x + 'px';
  input.style.top = y + 'px';
}

//marking wrong input value function
function markWrong(input,exp_element){
  input.classList.add('wrong-input');
  document.getElementById(exp_element).classList.add("wrong-exp");
}

//unmarking and change input to caption function
function unmarkRight(input,exp_element,id,x,y,num){
  input.classList.remove('wrong-input');
  document.getElementById(exp_element).classList.remove("wrong-exp");
  input.remove();
  var capt = document.createElement("p");
  var t = document.createTextNode(num);
  capt.classList.add("caption");
  capt.setAttribute("id", id);
  capt.appendChild(t);
  container.appendChild(capt);
  capt.style.left = x + 'px';
  capt.style.top = y + 'px';
}
