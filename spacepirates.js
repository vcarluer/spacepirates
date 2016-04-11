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
    
    createContainer: function(div, next) {
        var container = document.createElement('div');
        container.className = 'container slideIn';
        if (!this.containerWidth) {
            var bodyStyle = window.getComputedStyle(document.body);
            var currentWidth = parseInt(bodyStyle.width); // removes the "px" at the end
            var currentHeight = parseInt(bodyStyle.height); // removes the "px" at the end
            this.containerWidth = Math.min(800, currentWidth);
            this.containerHeight = currentHeight - (5 + 1) * 2; // margin and border
            this.containerMargeLeft = Math.max(0, (currentWidth - this.containerWidth) / 2);
        }
        
        container.style.width = this.containerWidth + 'px';
        container.style.height = this.containerHeight + 'px';
        container.style.marginLeft = this.containerMargeLeft + 'px';
        div.appendChild(container);
        
        if (next) {
            var self = this;
            document.body.onclick = function() {
                container.className += ' slideOut';
                container.addEventListener('animationend', function(e) {
                    div.removeChild(container); 
                });
                
                self.showCard(div, next);
            }
        }
        
        return container;
    },
    
    showTitle: function(div) {
        var container = this.createContainer(div, 'intro');
        var titleDiv = document.createElement('div');
        titleDiv.innerHTML = 'Space pirates';
        titleDiv.className = 'title';
        container.appendChild(titleDiv);
        var subTitleDiv = document.createElement('div');
        subTitleDiv.innerHTML = "All aboard!";
        subTitleDiv.className = 'title';
        container.appendChild(subTitleDiv);
    },
    
    showCard: function(div, cardName) {
        var container = this.createContainer(div);
        container.innerHTML = 'hoho';
    }
};

ready(function() {
   spacepirates.run(); 
});