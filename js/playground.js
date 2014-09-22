var Playground = (function(){
  function create(){
    var playground = {};
    playground.dom = {};
    bind(playground);
    return playground;
  }
  function bind(playground){
    playground.gatherSelectors = gatherSelectors.bind(playground);
    playground.attachEvents = attachEvents.bind(playground);
    playground.evaluate = evaluate.bind(playground);
  }
  function gatherSelectors(){
    this.dom.console = document.getElementById("console");
    this.dom.evaluateButton = document.getElementById("evaluate");
  }
  function attachEvents(){
    this.dom.evaluateButton.addEventListener("click", this.evaluate);
  }
  function evaluate(){
    var text = this.dom.console.value;
  }
  return {
    create : create
  };
})();

document.addEventListener("DOMContentLoaded", function(){
  Playground.create();
});