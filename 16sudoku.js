
N=16; F=4; var i=0; 

var button =new Array(N);
for(i=0;i<N;i++)
    button[i]=new Array(N);

// numberDeletedCells=5;
var text_box;
ErrorRowArray=new Array(N);
for(i=0; i<N; i++)
    ErrorRowArray[i]=0;

function getTextBox(i,j){
    text_box= document.getElementById('input'+i+'_'+j);
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

    var i; var z; var j;
    //top three row entries

    /*
    //first row
    for(j=0;j<N;j++)
    soduku[0][j]=j+1;
    */


    // prefer permuted first row 3,13,7,5,16,4,10,12,2,8,15,1,6,11,14,9
    soduku[0][0]=3; soduku[0][1]=13; soduku[0][2]=7;
    soduku[0][3]=5; soduku[0][4]=16; soduku[0][5]=4;
    soduku[0][6]=10; soduku[0][7]=12; soduku[0][8]=2;
    soduku[0][9]=8; soduku[0][10]=15; soduku[0][11]=1;
    soduku[0][12]=6; soduku[0][13]=11; soduku[0][14]=14;
    soduku[0][15]=9; 



    //secod row
    for(j=0;j<12;j++)
	soduku[1][j]=soduku[0][j+F];
    for(j=12;j<N;j++)
	soduku[1][j]=soduku[0][j-12];

    //third row
    for(j=0;j<12;j++)
	soduku[2][j]=soduku[1][j+F];
    for(j=12;j<N;j++)
	soduku[2][j]=soduku[1][j-12];


    //fourth row
    for(j=0;j<12;j++)
	soduku[3][j]=soduku[2][j+F];
    for(j=12;j<N;j++)
	soduku[3][j]=soduku[2][j-12];


    // columns:

    for(i=1; i<4; i++){


	for(k=0;k<F;k++){
	    for(j=0;j<F;j++){
		soduku[F*i+j ][0+F*k]=soduku[F*(i-1)+j][1+F*k];
		soduku[F*i+j ][1+F*k]=soduku[F*(i-1)+j][2+F*k];
		soduku[F*i+j ][2+F*k]=soduku[F*(i-1)+j][3+F*k];
		soduku[F*i+j ][3+F*k]=soduku[F*(i-1)+j][0+F*k];
	    }}}


    // permute a few rows and columns
    soduku = columnPermuteVector(soduku,1,2, N);
    soduku = columnPermuteVector(soduku,8,11, N);
    soduku = columnPermuteVector(soduku,12,15, N);
    soduku = columnPermuteVector(soduku,5,7, N);
    soduku = rowPermuteVector(soduku,0,2, N);
    soduku = rowPermuteVector(soduku,4,6, N);
    soduku = rowPermuteVector(soduku,8,10, N);

    /* permute randomly for new game */

    for(i=0; i<5; i++){
	soduku= premuteRowsRandomly(soduku);}
    // soduku= premuteColumnsRandomly(soduku);


    for(z=0; z<10; z++){
	soduku = swapElements(soduku);}

    for(z=0; z<20; z++)
	soduku = SwapOneElement(soduku);

    for(z=0; z<10; z++){
	soduku = swapElements(soduku);}



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
	    
	    if (r<0.06) a[k][0]=0;
	    else if (r<0.12) a[k][1]=0;
	    else if (r<0.18) a[k][2]=0;
	    else if (r<0.24) a[k][3]=0;
	    else if (r<0.3)  a[k][4]=0;
	    else if (r<0.36) a[k][5]=0;
	    else if (r<0.42) a[k][6]=0;
	    else if (r<0.48) a[7][7]=0;
	    else if (r<0.54) a[k][8]=0;
	    else if (r<0.6)  a[k][9]=0;
	    else if (r<0.66) a[k][10]=0;
	    else if (r<0.72) a[k][11]=0;
	    else if (r<0.8)  a[k][12]=0;
	    else if (r<0.86) a[k][13]=0;
	    else if (r<0.92) a[k][14]=0;
	    else if (r<0.1)  a[k][15]=0;
	}
    }
    return a;
}//end of fn


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


	else {alert('Cogratulations! You made it.');  
	      applaud(); 
	     }
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

function swapElements(a){
    var u; var v;   var t=100; var u; var v;
    var p=Math.random(); 
    var q=Math.random(); 

    if(p<0.06) u=1;
    else if(p<0.12) u=2; 
    else if(p<0.18) u=3; 
    else if(p<0.24) u=4; 
    else if(p<0.3)  u=5; 
    else if(p<0.36)  u=6; 
    else if(p<0.42) u=7;
    else if(p<0.48) u=8;
    else if(p<0.54) u=9; 
    else if(p<0.6) u=10; 
    else if(p<0.68) u=11; 
    else if(p<0.74)  u=12; 
    else if(p<0.8)  u=13; 
    else if(p<0.86) u=14;
    else if(p<0.82) u=15;
    else u=16;


    if(q<0.06) v=1;
    else if(q<0.12) v=2; 
    else if(q<0.18) v=3; 
    else if(q<0.24) v=4; 
    else if(q<0.3)  v=5; 
    else if(q<0.36)  v=6; 
    else if(q<0.42) v=7;
    else if(q<0.48) v=8;
    else if(q<0.54) v=9; 
    else if(q<0.6) v=10; 
    else if(q<0.68) v=11; 
    else if(q<0.74)  v=12; 
    else if(q<0.8)  v=13; 
    else if(q<0.86) v=14;
    else if(q<0.82) v=15;
    else v=16;

    if(u==v){
	if(u<15) v=u+1;
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

    if(s<0.25) section=0; 
    else if(s<0.5) section=4; 
    else if(s<0.75) section=8; 
    else  section=12; 
    

    if(r1<0.25) row1=0; 
    else if(r1<0.5) row1=1; 
    else if(r1<0.75) row1=2; 
    else  row1=3; 
    

    if(r2<0.25) row2=0; 
    else if(r2<0.5) row2=1; 
    else if(r2<0.75) row2=2; 
    else  row2=3; 
    
    if(c<0.25) col=0; 
    else if(c<0.5) col=1; 
    else if(c<0.75) col=2; 
    else  col=3; 
    



    if(row1==row2){
	if(row1<2) row2=row1+1;
	else row2=row1-1;
    }

    t1= a[section+row1][col] ; 
    t2= a[section+row2][col] ; 

    for(p=0; p<4; p++){
        for(q=0; q<N; q++){
            if(a[section+p][q]== t1) a[section+p][q] = 100;
            if(a[section+p][q]== t2)   a[section+p][q] = t1; } }   

    for(p=0; p<4; p++){
        for(q=0; q<N; q++){
            if(a[section+p][q]== 100) a[section+p][q] = t2; }}

    return a;
}


function premuteRowsRandomly(a){
    var r=Math.random(); var s=Math.random();
    if(s<0.25 && r<0.25)
	rowPermuteVector(a, 0, 1, N);
    else if(s<0.5 && r<0.25)
	rowPermuteVector(a, 0, 2, N);
    else if(s<0.75 && r<0.25)
	rowPermuteVector(a, 0, 3, N);
    else if(s<1 && r<0.25)
	rowPermuteVector(a, 2, 3, N);
    else if(s<0.25 && r<0.5)
	rowPermuteVector(a, 1, 2, N);
    else if(s<0.5 && r<0.5)
	rowPermuteVector(a, 4, 5, N);
    else if(s<0.75 && r<0.5)
	rowPermuteVector(a, 4, 6, N);
    else if(s<1 && r<0.5)
	rowPermuteVector(a, 4, 7, N);
    else if(s<0.25 && r<0.75)
	rowPermuteVector(a, 4, 8, N);
    else if(s<0.5 && r<0.75)
	rowPermuteVector(a, 5, 6, N);
    else if(s<0.75 && r<0.75)
	rowPermuteVector(a, 5, 8, N);
    else if(s<1 && r<0.75)
	rowPermuteVector(a, 7, 8, N);
    else if(s<0.25 && r<1)
	rowPermuteVector(a, 9, 10, N);
    else if(s<0.5 && r<1)
	rowPermuteVector(a, 9, 11, N);
    else if(s<0.75 && r<1)
	rowPermuteVector(a, 11, 12, N);
    else if(s<1 && r<1)
	rowPermuteVector(a, 11, 13, N);

    return a;

}//end of fn


// virtual keyboard

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


function applaud(){
    var audio = new Audio('applause.mp3');
    audio.play();

}


