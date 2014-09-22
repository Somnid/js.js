QUnit.module("Js.evaluate");
test("Js parses single expression", function(){
  var js = Js.create("1");
  js.evaluate();
  equal(js.currentCode, "SET:V0,1");
});
test("Js parses single expression, with error", function(){
  var js = Js.create("A");
  throws(function(){
    js.evaluate();
  });
});
test("Js parses simple expression", function(){
  var js = Js.create("1+2");
  js.evaluate();
  equal(js.currentCode, "SET:V0,1\nSET:V1,V0\nSET:V0,2\nADD:V1,V0\n");
});

