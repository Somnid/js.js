var Js = (function(){
  function create(text){
    var js = {};
    js.textReader = TextReader.create(text);
    js.currentChar = "";
    js.currentCode = "";
    bind(js);
    return js;
  }
  function bind(js){
    js.evaluate = evaluate.bind(js);
    js.parseTerm = parseTerm.bind(js);
    js.parseExpression = parseExpression.bind(js);
    js.getNumber = getNumber.bind(js);
    js.readChar = readChar.bind(js);
    js.parseOperation = parseOperation.bind(js);
    js.add = add.bind(js);
    js.subtract = subtract.bind(js);
  }
  function evaluate(text){
    this.readChar();
    this.parseExpression();
  }
  function parseExpression(){
    this.parseTerm();
    this.currentCode += "SET:V1,V0\n"
    this.parseOperation();
  }
  function parseTerm(){
    this.currentCode += "SET:V0," + this.getNumber() + "\n";
  }
  function parseOperation(){
    map({
      "+" : this.add,
      "-" : this.subtract
    }, this.currentChar);
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