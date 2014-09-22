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
    js.parseTerm = parseTerm.bind(js);
    js.parseExpression = parseExpression.bind(js);
    js.getNumber = getNumber.bind(js);
    js.readChar = readChar.bind(js);
    js.add = add.bind(js);
    js.subtract = subtract.bind(js);
  }
  function setOps(){
    this.ops = {
      "+" : this.add,
      "-" : this.subtract
    };
  }
  function evaluate(text){
    this.readChar();
    this.parseExpression();
  }
  function parseExpression(){
    this.parseTerm();
    while(Object.keys(this.ops).indexOf(this.currentChar) != -1){
      this.currentCode += "SET:V1,V0\n"
      map(this.ops, this.currentChar);
    }
  }
  function parseTerm(){
    this.currentCode += "SET:V0," + this.getNumber() + "\n";
  }
  function add(){
    this.readChar();
    this.parseTerm();
    this.currentCode += "ADD:V1,V0\n";
  }
  function subtract(){
    this.readChar();
    this.parseTerm();
    this.currentCode += "SUB:V1,V0\n";
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
  function isNumber(str){
    return !isNaN(str);
  }
  function map(map, value){
    if(map[value]){
      return map[value]();
    }else{
      throw "Expected " + Object.keys(map).join(",") + " but got: " + value;
    }
  }
  return {
    create : create
  };
})();