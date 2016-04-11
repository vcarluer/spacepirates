function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var spacepirates = {
    run: function() {
        this.mainDiv = document.getElementById('app');
        this.mainDiv.innerHTML = 'Hello pirate!';
    }
};

ready(function() {
   spacepirates.run(); 
});