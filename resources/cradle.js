//program Cradle;
var TAB = "\t";
var Look;   //Lookahead Character

//Read New Character From Input Stream
function GetChar(){
   Read(Look);
}

//Report an Error

procedure Error(s: string);
begin
   WriteLn;
   WriteLn(^G, 'Error: ', s, '.');
end;


//Report Error and Halt

procedure Abort(s: string);
begin
   Error(s);
   Halt;
end;

//Report What Was Expected

procedure Expected(s: string);
begin
   Abort(s + ' Expected');
end;

//Match a Specific Input Character

procedure Match(x: char);
begin
   if Look = x then GetChar
   else Expected('''' + x + '''');
end;

//Recognize an Alpha Character

function IsAlpha(c: char): boolean;
begin
   IsAlpha := upcase(c) in ['A'..'Z'];
end;

//Recognize a Decimal Digit
function IsDigit(char){
   IsDigit := char in ['0'..'9'];
}

//Get an Identifier
function GetName(){
   if(!IsAlpha(Look)){
     Expected('Name');
   }
   GetName = UpCase(Look);
   GetChar();
}

//Get a Number
function GetNum(){
   if !IsDigit(Look){
     Expected('Integer');
   }
   GetNum = Look;
   GetChar();
}

//Output a String with Tab
function Emit(str){
   Write(TAB, s);
}

function EmitLn(str){
   Emit(str);
   WriteLn();
}

//Initialize
function Init(){
   GetChar();
}

//Main Program
Init();