var Vcpu = (function(){
  function create(){
    var vcpu = {};
    vcpu.registers = [];
    vcpu.stack = [];
    bind(vcpu);
    vcpu.bindInstruction();
    return vcpu;
  }
  function bind(vcpu){
    vcpu.run = run.bind(vcpu);
    vcpu.do = do.bind(vcpu);
    vcpu.bindInstructions = bindInstructions.bind(vcpu);
  }
  function bindInstructions(){
    this.instructionSet = {
      ADD : this.add,
      SUB : this.subtract,
      MULT : this.multiply,
      DIV : this.divide,
      SET : this.set
    };
  }
  function run(byteCode){
    var ops = byteCode.split("\n");
    for(var i = 0; i < ops.length; i++){
      do(ops[i]);
    }
  }
  function do(opText){
    var instructionSplit = opText.split(":");
    var instruction = instructionSplit[0];
    var params = instructionSplit[1].split(",");

  }
  function getValue(loc){
    if(loc = "STACK_POP"){//stack
      return this.stack.pop();
    }else if(string.startsWith("V")){ //register
      var registerName = loc.substr(1);
      return this.registers[registerName];
    }else{ //value
      return loc;
    }
  }
  function setValue(loc, val){
    if(loc = "STACK_PUSH"){//stack
      this.stack.push(val);
    }else if(string.startsWith("V")){ //register
      var registerName = loc.substr(1);
      this.registers[registerName] = val;
  }
  //ops
  function add(termA, termB){
    var a = this.getValue(termA);
    var b = this.getValue(termB);
    this.setValue(termA, a + b);
  }
  function subtract(termA, termB){
    var a = this.getValue(termA);
    var b = this.getValue(termB);
    this.setValue(termA, a - b);
  }
  function multiply(termA, termB){
    var a = this.getValue(termA);
    var b = this.getValue(termB);
    this.setValue(termA, a * b);
  }
  function divide(termA, termB){
    var a = this.getValue(termA);
    var b = this.getValue(termB);
    this.setValue(termA, a / b);
  }
  function set(location, value){
    var value = this.getValue(value);
    this.setValue(location, value);
  }
  return {
    create : create
  };
})();