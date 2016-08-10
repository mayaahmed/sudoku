var i=0;
// numberDeletedCells=5;
var text_box;

function getTextBox(i,j){
  text_box= document.getElementById("input"+i+j);
}



var button =new Array(9);
for(i=1;i<10;i++)
  button[i]=new Array(9);

for(i=1;i<10;i++){for(j=1;j<10;j++)
    button[i][j]=document.getElementById('input'+i+j);}

var soduku = new Array(9);
for(i=0;i<9;i++)
soduku[i]=new Array(9);

//initializing soduku
for(i=0;i<9;i++){
 for(j=0;j<9;j++){
   soduku[i][j]=0;}}
 
var Dsoduku = new Array(9);
for(i=0;i<9;i++)
Dsoduku[i]=new Array(9);

//initializing Dsoduku
for(i=0;i<9;i++){
 for(j=0;j<9;j++){
   Dsoduku[i][j]=0;}}


var sodukuUser = new Array(9);
for(i=0;i<9;i++)
sodukuUser[i]=new Array(9);
//initializing sodukuUser
for(i=0;i<9;i++){
 for(j=0;j<9;j++){
   sodukuUser[i][j]=0;}}

/*
function changeNumberOfCellsToDelete(numCells){
  numberDeletedCells = numCells;
} 
*/

function generate(){

  var i; var j;

  /* Construct a starting sudoku */
 
//top three row entries

//first row
for(j=0;j<9;j++)
soduku[0][j]=j+1;

// prefer permuted first row 3,7,5,9,4,2,8,1,6
soduku[0][0]=3; soduku[0][1]=7; soduku[0][2]=5;
soduku[0][3]=9; soduku[0][4]=4; soduku[0][5]=2;
soduku[0][6]=8; soduku[0][7]=1; soduku[0][8]=6;


//secod row
for(j=0;j<6;j++)
soduku[1][j]=soduku[0][j+3];
for(j=6;j<9;j++)
soduku[1][j]=soduku[0][j-6];

//third row
for(j=0;j<6;j++)
soduku[2][j]=soduku[1][j+3];
for(j=6;j<9;j++)
soduku[2][j]=soduku[1][j-6];

// columns:

for(i=0;i<3;i++){
for(j=0;j<3;j++){
soduku[3+j][0+3*i]=soduku[j][1+3*i];
soduku[3+j][1+3*i]=soduku[j][2+3*i];
soduku[3+j][2+3*i]=soduku[j][0+3*i];
}

for(j=0;j<3;j++){
soduku[6+j][0+3*i]=soduku[j+3][1+3*i];
soduku[6+j][1+3*i]=soduku[j+3][2+3*i];
soduku[6+j][2+3*i]=soduku[j+3][0+3*i];
}
}

/* now permute this sudoku to get a new one */


soduku = columnPermuteVector(soduku,1,2, 9);
soduku = columnPermuteVector(soduku,7,8, 9);
soduku = rowPermuteVector(soduku,0,2, 9);
soduku = rowPermuteVector(soduku,3,4, 9);
soduku = rowPermuteVector(soduku,7,8, 9);



/* permute randomly for new game */
for(i=0; i<5; i++){
soduku= premuteRowsRandomly(soduku);
soduku= premuteColumnsRandomly(soduku);}


for(z=0; z<10; z++){
soduku = swapElements(soduku);}

for(z=0; z<20; z++)
soduku = SwapOneElement(soduku);

for(z=0; z<10; z++){
soduku = swapElements(soduku);}


//Copying Dsoduku
for(i=0;i<9;i++){
 for(j=0;j<9;j++){
   Dsoduku[i][j]=soduku[i][j];}}

Dsoduku = deleteEntries(Dsoduku);

/*
//print soduku
for(i=0;i<9;i++){
 for(j=0;j<9;j++){
document.write(soduku[i][j]+" ");
}document.write("<br/>"); }
*/


} // end of function generate


function columnPermuteVector(a, col1, col2, n){
/* n is the size of the square */

//create new square
   permuted = new Array(n);
   for(i=0;i<n;i++)
     permuted[i]=new Array(n);

   for(i=0; i < n ; i++){
     for(j=0; j < n ; j++){
        if(j != col1){
             if(j != col2){
         permuted[i][j] = a[i][j];
}

if(j == col2){
 permuted[i][j] = a[i][col1];
}}

if (j == col1)
 permuted[i][j] = a[i][col2];
}}
return permuted;

}/* end of columnPermuteVector function */

function rowPermuteVector(a, row1, row2, n){
/* n is the size of the square */

//create new square
   permuted = new Array(n);
   for(i=0;i<n;i++)
     permuted[i]=new Array(n);

   for(i=0; i < n ; i++){
     for(j=0; j < n ; j++){
        if(i != row1){
             if(i != row2){
         permuted[i][j] = a[i][j];
}

if(i == row2){
 permuted[i][j] = a[row1][j];
}}

if (i == row1)
 permuted[i][j] = a[row2][j];
}}
return permuted;

}/* end of rowPermuteVector function */


function deleteEntries(a){
 var i=0;  var k=0;
 var r=Math.random();
  for(k=0;k<9;k++){
   for(i=0;i<numberDeletedCells;i++){
     r=Math.random();
      if(r<0.1) a[k][0]=0;
      else if (r<0.2) a[k][1]=0;
      else if (r<0.3) a[k][2]=0;
      else if (r<0.4) a[k][3]=0;
      else if (r<0.5) a[k][4]=0;
      else if (r<0.6) a[k][5]=0;
      else if (r<0.7) a[k][6]=0;
      else if (r<0.8) a[k][7]=0;
      else if (r<1)    a[k][8]=0;
     }
    }
return a;
}//end of fn







function premuteRowsRandomly(a){
 var r=Math.random(); var s=Math.random();
   if(s<0.3 && r<0.5)
     rowPermuteVector(a, 0, 1, 9);
   else if(s<0.3 && r<1)
     rowPermuteVector(a, 0, 2, 9);
   else if(s<0.6 && r<0.5)
     rowPermuteVector(a, 3, 4, 9);
   else if(s<0.6 && r<1)
     rowPermuteVector(a, 3, 5, 9);
   else if(s<1 && r<0.5)
     rowPermuteVector(a, 6, 7, 9);
   else if(s<1 && r<1)
     rowPermuteVector(a, 6, 8, 9);
return a;

}//end of fn


function premuteColumnsRandomly(a){
 var r=Math.random(); var s=Math.random();
   if(s<0.3 && r<0.5)
     columnPermuteVector(a, 0, 1, 9);
   else if(s<0.3 && r<1)
     columnPermuteVector(a, 0, 2, 9);
   else if(s<0.6 && r<0.5)
     columnPermuteVector(a, 3, 4, 9);
   else if(s<0.6 && r<1)
     columnPermuteVector(a, 3, 5, 9);
   else if(s<1 && r<0.5)
     columnPermuteVector(a, 6, 7, 9);
   else if(s<1 && r<1)
     columnPermuteVector(a, 6, 8, 9);
return a;

}//end of fn




function makeStringOfArray(array){
  var string='';
    for(i=0;i<9;i++){
      for(j=0;j<9;j++){
        string= string+array[i][j]+ ' '; } 
      string = string +'\n';
    }
    return string;
}//end of function





function checkIsSoduku(a){
  sum=0;   count=0;
  for(i=0;i<9;i++){
   for(j=0;j<9;j++)
     sum=sum+a[i][j];
   if(sum != 45)  count=count+1; 
   sum=0;
  }
return count;
}



function initial(){
  //make soduku   
  generate();

  //copy soduku to new array for user input
     for(i=0;i<9;i++){
      for(j=0;j<9;j++){
        sodukuUser[i][j]=Dsoduku[i][j];}}
  
     //copy initial soduku to screen buttons   
     for(i=1;i<10;i++){
      for(j=1;j<10;j++){
        if(sodukuUser[i-1][j-1] != 0){
          button[i][j].value=sodukuUser[i-1][j-1];
          button[i][j].disabled=true;
         }
      }}
} //end of function

initial();

function run(){
  var i=1; var j=1;
  var inputInt;
  var errorCheck=1;
  
  var errorArray= new Array(9);
  for(i=0; i<9; i++) 
    errorArray[i]= new Array(9);
  for(i=0;i<9;i++){
    for(j=0;j<9;j++){
      errorArray[i][j]='0';}}
 


  for(i=1;i<10;i++){
    for(j=1;j<10;j++){
      if(!button[i][j].disabled){
        inputInt =parseInt(document.getElementById("input"+i+j).value, 10);
        if (isNaN (inputInt)){
         errorArray[i-1][j-1]= 'The input in row ' + i +' and column ' + j+' is not a number. ';
         
         errorCheck = 0;
        }
        else if (inputInt < 1){
             errorArray[i-1][j-1]='The input in row ' + i +' and column '  + j+' is less than One. ';
                      errorCheck = 0;}

        else if (inputInt > 9){
            errorArray[i-1][j-1] ='The input in row ' + i +' and column ' + j+' is greater than Nine. ';
            errorCheck=0;}           
        else sodukuUser[i-1][j-1]=inputInt;
      }
    }}
 
  var sodukuString = makeStringOfArray(soduku);
  //alert(sodukuString);

  if(errorCheck==0){
    var errorString  = 'Your input errors are \n';
    for(i=0;i<9;i++){
      for(j=0;j<9;j++){
        if(errorArray[i][j]!='0')
          errorString= errorString+errorArray[i][j]+'\n';
      }
    }
  alert(errorString);
  } 


  // No errors in input
  else{
    var noOfErrors = checkIsSoduku(sodukuUser); //check for errors in user's solution
    if(noOfErrors!=0)
      alert('Sorry: '+noOfErrors+ ' rows  have wrong entries. \n \n'+ 'One solution to this puzzle is: \n \n'+ sodukuString);
    else alert('Cogratulations! You made it.');  
  }
  
} // end of function



function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}




/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}




function number_write(x)
{
  
  if(x>=0 && x<=9)
  {
    text_box.style.color= "maroon";
    if(isNaN(text_box.value))
   text_box.value = 0;
 text_box.value = (text_box.value * 10)+x;
  }
}

function number_c()
{
 
  var num = text_box.value;
  var num1 = num%10;
  num -= num1;
  num /= 10;
  if(num==0)
    text_box.value = "";
else  text_box.value = num;
}


var field = document.createElement('input');
field.setAttribute('type', 'text');
document.body.appendChild(field);

setTimeout(function() {
    field.focus();
    setTimeout(function() {
        field.setAttribute('style', 'display:none;');
    }, 50);
}, 50);


function swapElements(a){
  var u; var v;   var t=100; var u; var v;
var p=Math.random(); 
var q=Math.random(); 

      if(p<0.1) u=1;
      else if(p<0.2) u=2; 
      else if(p<0.3) u=3; 
      else if(p<0.4) u=4; 
      else if(p<0.5)  u=5; 
      else if(p<0.6)  u=6; 
      else if(p<0.7) u=7;
      else if(p<0.8) u=8;
      else u=9;


     if(q<0.1) v=1;
      else if(q<0.2) v=2; 
      else if(q<0.3) v=3; 
      else if(q<0.4) v=4; 
      else if(q<0.5)  v=5; 
      else if(q<0.6)  v=6; 
      else if(q<0.7) v=7;
      else if(q<0.8) v=8;
      else v=9;

for(i=0; i<9; i++){
for(j=0; j<9; j++){
if(a[i][j]==u) a[i][j]=t;}}

for(i=0; i<9; i++){
for(j=0; j<9; j++){
if(a[i][j]==v) a[i][j]=u;}}

for(i=0; i<9; i++){
for(j=0; j<9; j++){
if(a[i][j]==t) a[i][j]=v;}}

return a;
}

 function SwapOneElement(a){
var r1=Math.random(); var r2=Math.random(); var s=Math.random(); 
var c=Math.random();
var row1; var row2; var col; var t1; var t2; var section;
var p; var q;

if(s<0.3) section=0; 
  else if(s<0.6) section=3; 
  else  section=6; 
     
if(r1<0.3) row1=0; 
  else if(r1<0.6) row1=1; 
  else row1=2; 

if(r2<0.3) row2=0; 
  else if(r2<0.6) row2=1; 
  else row2=2; 

if(c<0.3) col =0; 
  else if(c<0.6) col =1; 
  else col=2; 



if(row1==row2){
     if(row1<2) row2=row1+1;
     else row2=row1-1;
}

t1= a[section+row1][col] ; 
t2= a[section+row2][col] ; 



     
 for(p=0; p<3; p++){
               for(q=0; q<9; q++){
                        if(a[section+p][q]== t1) a[section+p][q] = 100;
                        if(a[section+p][q]== t2)   a[section+p][q] = t1; } }   

for(p=0; p<3; p++){
               for(q=0; q<9; q++){
                        if(a[section+p][q]== 100) a[section+p][q] = t2; }}




return a;
}








