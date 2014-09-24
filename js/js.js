var Js = (function(){
  function create(text){
    var js = {};
    js.textReader = TextReader.create(text);
    js.currentChar = "";
    js.currentCode = "";
    bind(js);
    js.setOps();
    return js;
  }
  function bind(js){
    js.setOps = setOps.bind(js);
    js.evaluate = evaluate.bind(js);
    js.parseIdentifier = parseIdentifier.bind(js);
    js.parseTerm = parseTerm.bind(js);
    js.parseFactor = parseFactor.bind(js);
    js.parseExpression = parseExpression.bind(js);
    js.getNumber = getNumber.bind(js);
    js.getName = getName.bind(js);
    js.readChar = readChar.bind(js);
    js.validateChar = validateChar.bind(js);
    js.add = add.bind(js);
    js.subtract = subtract.bind(js);
    js.multiply = multiply.bind(js);
    js.divide = divide.bind(js);
    js.isAddOp = isAddOp.bind(js);
  }
  function setOps(){
    this.factorOps = {
      "+" : this.add,
      "-" : this.subtract
    };
    this.termOps = {
      "*" : this.multiply,
      "/" : this.divide
    };
  }
  function evaluate(text){
    this.readChar();
    this.parseExpression();
  }
  function parseExpression(){ //add operations
    if(this.isAddOp(this.currentChar)){
      this.currentCode += "SET:V0,0\n";
    }else{
      this.parseTerm();
    }
    while(this.isAddOp(this.currentChar)){
      this.currentCode += "STACK_PUSH:V0\n"
      map(this.factorOps, this.currentChar);
    }
  }
  function parseFactor(){
    if(this.currentChar == "("){
      this.validateChar("(");
      this.parseExpression();
      this.validateChar(")");
    }else if(isAlpha(this.currentChar)){
      this.parseIdentifier();
    }else{
      this.currentCode += "SET:V0," + this.getNumber() + "\n";
    }
  }
  function parseTerm(){ //multiply operations
    this.parseFactor();
    while(Object.keys(this.termOps).indexOf(this.currentChar) != -1){
      this.currentCode += "STACK_PUSH:V0\n";
      map(this.termOps, this.currentChar);
    }
  }
  function parseIdentifier(){
    var name = this.getName();
    if(this.currentChar = "("){
      this.validateChar("(");
      this.validateChar(")");
      this.currentCode += "CALL:#" + name + "\n";
    }else{
      this.currentCode += "SET:V0,#" + name + "\n";
    }
  }
  function readChar(){
    this.currentChar = this.textReader.readChar();
  }
  function getNumber(){
    if(!isNumber(this.currentChar)){
      throw "expected number but got: " + this.currentChar;
    }
    var thisNum = this.currentChar;
    this.readChar();
    return thisNum;
  }
  function getName(){
    if(!isAlpha(this.currentChar)){
      throw "expected variable but got: " + this.currentChar;
    }
    var thisName = this.currentChar;
    this.readChar();
    return thisName;
  }
  function validateChar(value){
    if(this.currentChar != value){
      throw "Expected: " + value + " but got: " + this.currentChar;
    }else{
      this.readChar();
    }
  }
  function isNumber(str){
    return !isNaN(str);
  }
  function isAlpha(str){
    return /^[a-zA-Z]+$/.test(str);
  }
  function map(map, value){
    if(map[value]){
      return map[value]();
    }else{
      if(Object.keys(map).indexOf(value) == -1){
        throw "Expected " + Object.keys(map).join(",") + " but got: " + value;
      }else{
        throw "No operation exists for value: " + value;
      }
    }
  }
  function isAddOp(value){
    return Object.keys(this.factorOps).indexOf(value) != -1;
  }
  //OPS
  function add(){
    this.readChar();
    this.parseTerm();
    this.currentCode += "ADD:STACK_POP,V0\n";
  }
  function subtract(){
    this.readChar();
    this.parseTerm();
    this.currentCode += "SUB:STACK_POP,V0\n";
  }
  function multiply(){
    this.readChar();
    this.parseFactor();
    this.currentCode += "MULT:STACK_POP,V0\n"
  }
  function divide(){
    this.readChar();
    this.parseFactor();
    this.currentCode += "DIV:STACK_POP,V0\n"
  }
  return {
    create : create
  };
})();