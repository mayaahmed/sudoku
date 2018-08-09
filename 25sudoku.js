
N=25; F=5; var i=0; 

var button =new Array(N);
for(i=0;i<N;i++)
  button[i]=new Array(N);

// numberDeletedCells=5;
var text_box;
ErrorRowArray=new Array(N);
for(i=0; i<N; i++)
  ErrorRowArray[i]=0;

function getTextBox(i,j){
  text_box= document.getElementById("input"+i+'_'+j);
}



for(i=1;i<N+1;i++){for(j=1;j<N+1;j++)
    button[i-1][j-1]=document.getElementById('input'+i+'_'+j);}
/*
for(i=0;i<N;i++){
  for(j=0;j<N;j++){
    button[i][j].value=0;}
}
*/

var soduku = new Array(N);
for(i=0;i<N;i++)
soduku[i]=new Array(N);

//initializing soduku
for(i=0;i<N;i++){
 for(j=0;j<N;j++){
   soduku[i][j]=0;}}
 
var Dsoduku = new Array(N);
for(i=0;i<N;i++)
Dsoduku[i]=new Array(N);

//initializing Dsoduku
for(i=0;i<N;i++){
 for(j=0;j<N;j++){
   Dsoduku[i][j]=0;}}


var sodukuUser = new Array(N);
for(i=0;i<N;i++)
sodukuUser[i]=new Array(N);

//initializing sodukuUser
for(i=0;i<N;i++){
 for(j=0;j<N;j++){
   sodukuUser[i][j]=0;}}

function generate(){

  var i; var j; var z;
//top three row entries

/*
//first row
for(j=0;j<N;j++)
soduku[0][j]=j+1;
*/

/*  prefer permuted first row 3, 15,21, 1, 7, 
                            2, 5, 19,16, 4,
                            18, 13, 22,10,12, 
                            23, 8, 24, 6, 25, 
                            11, 14, 9, 17,20 
*/
soduku[0][0]=3; soduku[0][1]=15; soduku[0][2]=21; soduku[0][3]=1; soduku[0][4]=7; 
soduku[0][5]=2; soduku[0][6]=5; soduku[0][7]=19; soduku[0][8]=16; soduku[0][9]=4; 
soduku[0][10]=18; soduku[0][11]=13; soduku[0][12]=22; soduku[0][13]=10; soduku[0][14]=12; 
soduku[0][15]=23; soduku[0][16]=8; soduku[0][17]=24; soduku[0][18]=6; soduku[0][19]=25; 
soduku[0][20]=11; soduku[0][21]=14; soduku[0][22]=9; soduku[0][23]=17; soduku[0][24]=20; 



//secod row
for(j=0;j<N-F;j++)
soduku[1][j]=soduku[0][j+F];
for(j=N-F;j<N;j++)
soduku[1][j]=soduku[0][j-N+F];

//third row
for(j=0;j<N-F;j++)
soduku[2][j]=soduku[1][j+F];
for(j=N-F;j<N;j++)
soduku[2][j]=soduku[1][j-N+F];


//fourth row
for(j=0;j<N-F;j++)
soduku[3][j]=soduku[2][j+F];
for(j=N-F;j<N;j++)
soduku[3][j]=soduku[2][j-N+F];

//fifth row
for(j=0;j<N-F;j++)
soduku[4][j]=soduku[3][j+F];
for(j=N-F;j<N;j++)
soduku[4][j]=soduku[3][j-N+F];


// columns:

for(i=1; i<F; i++){


for(k=0;k<F;k++){
for(j=0;j<F;j++){
soduku[F*i+j ][0+F*k]=soduku[F*(i-1)+j][1+F*k];
soduku[F*i+j ][1+F*k]=soduku[F*(i-1)+j][2+F*k];
soduku[F*i+j ][2+F*k]=soduku[F*(i-1)+j][3+F*k];
soduku[F*i+j ][3+F*k]=soduku[F*(i-1)+j][4+F*k];
soduku[F*i+j ][4+F*k]=soduku[F*(i-1)+j][0+F*k];
}}}

for(z=0; z<10; z++){
soduku = swapElements(soduku);}

for(z=0; z<20; z++)
soduku = SwapOneElement(soduku);

for(z=0; z<10; z++){
soduku = swapElements(soduku);}


// permute a few rows and columns
soduku = columnPermuteVector(soduku,1,2, N);
soduku = columnPermuteVector(soduku,6,8, N);
soduku = columnPermuteVector(soduku,11,14, N);
soduku = columnPermuteVector(soduku,5,7, N);
soduku = rowPermuteVector(soduku,0,2, N);
soduku = rowPermuteVector(soduku,3,4, N);
soduku = rowPermuteVector(soduku,21,23, N);

/* permute randomly for new game */


for(i=0; i<5; i++){
  soduku= premuteRowsRandomly(soduku);}

//Copying Dsoduku
for(i=0;i<N;i++){
 for(j=0;j<N;j++){
   Dsoduku[i][j]=soduku[i][j];}}


 Dsoduku = deleteEntries(Dsoduku);




/*
//print soduku
for(i=0;i<N;i++){
 for(j=0;j<N;j++){
document.write(soduku[i][j]+" ");
}document.write("<br/>"); }
*/

} // end of function generate



function initial(){
  //make soduku   
  generate();

  //copy soduku to new array for user input
     for(i=0;i<N;i++){
      for(j=0;j<N;j++){
        sodukuUser[i][j]=Dsoduku[i][j];}}
  
     //copy initial soduku to screen buttons   
     for(i=0;i<N;i++){
      for(j=0;j<N;j++){
        if(sodukuUser[i][j] != 0){
          button[i][j].value=sodukuUser[i][j];
          button[i][j].disabled=true;
         }
      }}
} //end of function


initial();



function deleteEntries(a){
 var i=0;  var k=0;
 var r=Math.random();
  for(k=0;k<N;k++){
   for(i=0;i<5;i++){
     r=Math.random();
     
      if (r<0.04) a[k][0]=0;
      else if (r<0.08) a[k][1]=0;
      else if (r<0.12) a[k][2]=0;
      else if (r<0.16) a[k][3]=0;
      else if (r<0.2)  a[k][4]=0;
      else if (r<0.24) a[k][5]=0;
      else if (r<0.28) a[k][6]=0;
      else if (r<0.32) a[7][7]=0;
      else if (r<0.36) a[k][8]=0;
      else if (r<0.4)  a[k][9]=0;
      else if (r<0.44) a[k][10]=0;
      else if (r<0.48) a[k][11]=0;
      else if (r<0.52)  a[k][12]=0;
      else if (r<0.56) a[k][13]=0;
      else if (r<0.6) a[k][14]=0;
      else if (r<0.64)  a[k][15]=0;
      else if (r<0.68) a[k][16]=0;
      else if (r<0.72)  a[k][17]=0;
      else if (r<0.76) a[k][18]=0;
      else if (r<0.82) a[k][19]=0;
      else if (r<0.86)  a[k][20]=0;
      else if (r<0.9) a[k][21]=0;
      else if (r<0.94) a[k][22]=0;
      else if (r<0.96)  a[k][23]=0;
      else if (r<1)  a[k][24]=0;

     }
    }
return a;
}//end of fn



function swapElements(a){
  var u; var v;   var t=100; var u; var v;
var p=Math.random(); 
var q=Math.random(); 

      if(p<0.04) u=1;
      else if(p<0.08) u=2; 
      else if(p<0.12) u=3; 
      else if(p<0.16) u=4; 
      else if(p<0.2)  u=5; 
      else if(p<0.24)  u=6; 
      else if(p<0.28) u=7;
      else if(p<0.32) u=8;
      else if(p<0.36) u=9; 
      else if(p<0.4) u=10; 
      else if(p<0.44) u=11; 
      else if(p<0.48)  u=12; 
      else if(p<0.52)  u=13; 
      else if(p<0.56) u=14;
      else if(p<0.6) u=15;
      else if(p<0.64) u=16; 
      else if(p<0.68) u=17; 
      else if(p<0.72)  u=18; 
      else if(p<0.76)  u=19; 
      else if(p<0.8) u=20;
      else if(p<0.84) u=21;
      else if(p<0.88) u=22; 
      else if(p<0.92) u=23; 
      else if(p<0.96)  u=24; 
      else u=25;

if(q<0.04) v=1;
      else if(q<0.08) v=2; 
      else if(q<0.12) v=3; 
      else if(q<0.16) v=4; 
      else if(q<0.2)  v=5; 
      else if(q<0.24)  v=6; 
      else if(q<0.28) v=7;
      else if(q<0.32) v=8;
      else if(q<0.36) v=9; 
      else if(q<0.4) v=10; 
      else if(q<0.44) v=11; 
      else if(q<0.48)  v=12; 
      else if(q<0.52)  v=13; 
      else if(q<0.56) v=14;
      else if(q<0.6) v=15;
      else if(q<0.64) v=16; 
      else if(q<0.68) v=17; 
      else if(q<0.72)  v=18; 
      else if(q<0.76)  v=19; 
      else if(q<0.8) v=20;
      else if(q<0.84) v=21;
      else if(q<0.88) v=22; 
      else if(q<0.92) v=23; 
      else if(q<0.96)  v=24; 
      else v=25;




if(u==v){
     if(u<25) v=u+1;
     else v=u-1;
}

for(i=0; i<N; i++){
for(j=0; j<N; j++){
if(a[i][j]==u) a[i][j]=t;}}

for(i=0; i<N; i++){for(j=0; j<N; j++){
if(a[i][j]==v) a[i][j]=u;}}

for(i=0; i<N; i++){
for(j=0; j<N; j++){
if(a[i][j]==t) a[i][j]=v;}}

return a;
}


function SwapOneElement(a){
var r1=Math.random(); var r2=Math.random(); var s=Math.random(); 
var c=Math.random();
var row1; var row2; var col; var t1; var t2; var section;
var p; var q;

if(s<0.2) section=0; 
  else if(s<0.4) section=5; 
  else if(s<0.6) section=10; 
  else if(s<0.8) section=15; 
  else  section=20; 
    

if(r1<0.2) row1=0; 
  else if(r1<0.4) row1=1; 
  else if(r1<0.6) row1=2; 
  else if(r1<0.8) row1=3; 
  else  row1=4; 
     

if(r2<0.2) row2=0; 
  else if(r2<0.4) row2=1; 
  else if(r2<0.6) row2=2;
  else if(r2<0.8) row2=3;
  else  row2=4; 
     
if(c<0.2) col=0; 
  else if(c<0.4) col=1; 
  else if(c<0.6) col=2;
  else if(c<0.8) col=3; 
  else  col=4; 

     if(row1==row2){
     if(row1<2) row2=row1+1;
     else row2=row1-1;
}

t1= a[section+row1][col] ; 
t2= a[section+row2][col] ; 

for(p=0; p<F; p++){
               for(q=0; q<N; q++){
                        if(a[section+p][q]== t1) a[section+p][q] = 100;
                        if(a[section+p][q]== t2)   a[section+p][q] = t1; } }   

for(p=0; p<F; p++){
               for(q=0; q<N; q++){
                        if(a[section+p][q]== 100) a[section+p][q] = t2; }}

return a;
}



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

function premuteRowsRandomly(a){
 var r=Math.random(); var s=Math.random();
   if(s<0.2 && r<0.2)
     rowPermuteVector(a, 0, 1, N);
   else if(s<0.4 && r<0.2)
     rowPermuteVector(a, 0, 2, N);
   else if(s<0.6 && r<0.2)
     rowPermuteVector(a, 0, 3, N);
   else if(s<0.8 && r<0.2)
     rowPermuteVector(a, 0, 4, N);
   else if(s<1 && r<0.2)
     rowPermuteVector(a, 1, 2, N);
   else if(s<0.2 && r<0.4)
     rowPermuteVector(a, 1, 3, N);
   else if(s<0.4 && r<0.4)
     rowPermuteVector(a, 1, 4, N);
   else if(s<0.6 && r<0.4)
     rowPermuteVector(a, 2, 3, N);
   else if(s<0.8 && r<0.4)
     rowPermuteVector(a, 2, 4, N);
   else if(s<1 && r<0.4)
     rowPermuteVector(a, 3, 4, N);
   else if(s<0.2 && r<0.6)
     rowPermuteVector(a, 5, 6, N);
   else if(s<0.4 && r<0.6)
     rowPermuteVector(a, 5, 7, N);
   else if(s<0.6 && r<0.6)
     rowPermuteVector(a, 5, 8, N);
   else if(s<0.8 && r<0.6)
     rowPermuteVector(a, 7, 8, N);
   else if(s<1 && r<0.6)
     rowPermuteVector(a, 6, 8, N);
   else if(s<0.2 && r<0.8)
     rowPermuteVector(a, 10, 11, N);
   else if(s<0.4 && r<0.8)
     rowPermuteVector(a, 10, 12, N);
   else if(s<0.6 && r<0.8)
     rowPermuteVector(a, 10, 13, N);
   else if(s<0.8 && r<0.8)
     rowPermuteVector(a, 11, 13, N);
   else if(s<1 && r<0.8)
     rowPermuteVector(a, 13, 14, N);
   else if(s<0.2 && r<1)
     rowPermuteVector(a, 21, 22, N);
   else if(s<0.4 && r<1)
     rowPermuteVector(a, 21, 23, N);
   else if(s<0.6 && r<1)
     rowPermuteVector(a, 21, 24, N);
   else if(s<0.8 && r<1)
     rowPermuteVector(a, 22, 23, N);
   else if(s<1 && r<1)
     rowPermuteVector(a, 23, 24, N);
return a;

}//end of fn

function run(){
  var i=1; var j=1;
  var inputInt;
  var errorCheck=1;  var errorRowString="-"; var t;
  
  var errorArray= new Array(N);
  for(i=0; i<N; i++) 
    errorArray[i]= new Array(N);
  for(i=0;i<N;i++){
    for(j=0;j<N;j++){
      errorArray[i][j]='0';}}

  for(i=1;i<N+1;i++){
    for(j=1;j<N+1;j++){
      if(!button[i-1][j-1].disabled){
        inputInt =parseInt(document.getElementById("input"+i+'_'+j).value, 10);
        if (isNaN (inputInt)){
         errorArray[i-1][j-1]= 'The input in row ' + i +' and column ' + j+' is not a number. ';
         
         errorCheck = 0;
        }
        else if (inputInt < 1){
             errorArray[i-1][j-1]='The input in row ' + i +' and column '  + j+' is less than One. ';
                      errorCheck = 0;}


else if (inputInt > N){
            errorArray[i-1][j-1] ='The input in row ' + i +' and column ' + j+' is greater than ' + N +'.';
            errorCheck=0;}           
        else sodukuUser[i-1][j-1]=inputInt;
      }
    }}
  var sodukuString = makeStringOfArray(soduku);
  //alert(sodukuString);

  if(errorCheck==0){
    var errorString  = 'Your input errors are \n';
    for(i=0;i<N;i++){
      for(j=0;j<N;j++){
        if(errorArray[i][j]!='0')
          errorString= errorString+errorArray[i][j]+'\n';
      }
    }
  alert(errorString + ' \n You can correct the errors and submit again. \n');
  } 

// No errors in input
  else{
    var noOfErrors = checkIsSoduku(sodukuUser); //check for errors in user's solution
    if(noOfErrors!=0){
      for(i=0;i<N;i++){
        if(ErrorRowArray[i]>0){ t=i+1;
          errorRowString = errorRowString+'-'+t;}
     }

 alert('Sorry: The number of errors is '+ noOfErrors+  '. \n ' + 'Rows '+  errorRowString + ' have wrong entries. \n \n'+ 'You can correct the errors and submit again. \n' +'One solution to this puzzle is: \n \n'+ sodukuString);
    }


   else alert('Cogratulations! You made it.');  
  }
  } // end of function


function makeStringOfArray(array){
  var string='';
    for(i=0;i<N;i++){
      for(j=0;j<N;j++){
        string= string+array[i][j]+ ' '; } 
      string = string +'\n';
    }
    return string;
}//end of function

function checkIsSoduku(a){


  sum=0;   count=0;
  for(i=0;i<N;i++){
   for(j=0;j<N;j++)
     sum=sum+a[i][j];
   if(sum != N*(N+1)/2){
     ErrorRowArray[i]=i+1;
  count=count+1; 
   }
   sum=0;
  }
return count;
}




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
  
  if(x>=0 && x<=N)
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













