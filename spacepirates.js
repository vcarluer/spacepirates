function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var spacepirates = {
    run: function() {
        var mainDiv = document.getElementById('app');
        this.showTitle(mainDiv)
    },
    
    showTitle: function(div) {
        var container = document.createElement('container');
        container.className = 'container';
        div.appendChild(container);
        
        var titleDiv = document.createElement('div');
        titleDiv.innerHTML = 'Space pirates';
        titleDiv.className = 'title';
        container.appendChild(titleDiv);
        var subTitleDiv = document.createElement('div');
        subTitleDiv.innerHTML = "All aboard!";
        subTitleDiv.className = 'title';
        container.appendChild(subTitleDiv);
        
        var self = this;
        document.body.onclick = function() {
            div.removeChild(container);
            self.showCard(div, 'Intro');
        }
    },
    
    showCard: function(div, cardName) {
        var container = document.createElement('container');
        container.className = 'container';
        div.appendChild(container);
        
        container.innerHTML = 'hoho';
    }
};

ready(function() {
   spacepirates.run(); 
});