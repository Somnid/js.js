QUnit.module("Js.evaluate");
test("Js parses single expression", function(){
  var js = Js.create("1");
  js.evaluate();
  equal(js.currentCode, "SET:V0,1\n");
});
test("Js parses single expression, with error", function(){
  var js = Js.create("A");
  throws(function(){
    js.evaluate();
  });
});
test("Js parses simple expression (adds)", function(){
  var js = Js.create("1+2");
  js.evaluate();
  equal(js.currentCode, "SET:V0,1\nSTACK_PUSH:V0\nSET:V0,2\nADD:STACK_POP,V0\n");
});
test("Js parses simple expression (mixed adds and subtracts)", function(){
  var js = Js.create("1+2-3+4-1");
  js.evaluate();
  equal(js.currentCode, "SET:V0,1\nSTACK_PUSH:V0\nSET:V0,2\nADD:STACK_POP,V0\nSTACK_PUSH:V0\nSET:V0,3\nSUB:STACK_POP,V0\nSTACK_PUSH:V0\nSET:V0,4\nADD:STACK_POP,V0\nSTACK_PUSH:V0\nSET:V0,1\nSUB:STACK_POP,V0\n");
});
test("Js parses simple multiplication expression", function(){
  var js = Js.create("1*2");
  js.evaluate();
  equal(js.currentCode, "SET:V0,1\nSTACK_PUSH:V0\nSET:V0,2\nMULT:STACK_POP,V0\n");
});
test("Js parses slightly complex multiplication expression (with adds)", function(){
  var js = Js.create("3+1*2");
  js.evaluate();
  equal(js.currentCode, "SET:V0,3\nSTACK_PUSH:V0\nSET:V0,1\nSTACK_PUSH:V0\nSET:V0,2\nMULT:STACK_POP,V0\nADD:STACK_POP,V0\n");
});
test("Js parses slightly complex multiplication expression (with parens)", function(){
  var js = Js.create("(3+1)*2");
  js.evaluate();
  equal(js.currentCode, "SET:V0,3\nSTACK_PUSH:V0\nSET:V0,1\nADD:STACK_POP,V0\nSTACK_PUSH:V0\nSET:V0,2\nMULT:STACK_POP,V0\n");
});
test("Js parses unary operators (minus)", function(){
  var js = Js.create("-(2+1)");
  js.evaluate();
  equal(js.currentCode, "SET:V0,0\nSTACK_PUSH:V0\nSET:V0,2\nSTACK_PUSH:V0\nSET:V0,1\nADD:STACK_POP,V0\nSUB:STACK_POP,V0\n");
});
test("Js parses unary operators (plus)", function(){
  var js = Js.create("+(2+1)");
  js.evaluate();
  equal(js.currentCode, "SET:V0,0\nSTACK_PUSH:V0\nSET:V0,2\nSTACK_PUSH:V0\nSET:V0,1\nADD:STACK_POP,V0\nADD:STACK_POP,V0\n");
});