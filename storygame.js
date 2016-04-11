/*global localStorage*/
/*global cards*/

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var storygame = {
    run: function() {
        var mainDiv = document.getElementById('app');
        
        var card = localStorage.getItem('cardIndex');
        
        if (card) {
            if (card > cards.length - 1) {
                this.currentCard = 0;    
            } else {
                this.currentCard = card;   
            }
        } else {
            this.currentCard = 0;
        }
        
        this.showCard(mainDiv, card);
    },
    
    createContainer: function(div, title) {
        var container = document.createElement('div');
        
        if (this.direction === 'previous') {
            container.className = 'container slideInPrevious';
        } else {
            container.className = 'container slideIn';
        }
        
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
        
        if (title) {
            var self = this;
            document.body.onclick = function(e) {
                self.clickGoNext(div, container);
                document.body.onclick = null;
                self.noBubble(e);
            }
        }
        
        return container;
    },
    
    clickGoNext: function(div, container) {
        container.className = 'container slideOut';
        container.addEventListener('animationend', function(e) {
            div.removeChild(container);
        });
        
        this.goNext(div);
    },
    
    clickGoPrevious: function(div, container) {
        if (this.currentCard > 0) {
            container.className = 'container slideOutPrevious';
            container.addEventListener('animationend', function(e) {
                div.removeChild(container); 
            });
            
            this.goPrevious(div, container);
        }
    },
    
    goNext: function(div) {
        if (this.currentCard < cards.length - 1) {
            this.currentCard++;
        } else {
            this.currentCard = 0;
        }
        
        this.direction = 'next';
        this.navigate(div);    
    },
    
    goPrevious: function(div, container) {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.direction = 'previous';
            this.navigate(div);
        }
    },
    
    navigate: function(div) {
        localStorage.setItem('cardIndex', this.currentCard);
        this.showCard(div);    
    },
    
    showCard: function(div) {
        var container = this.createContainer(div, this.currentCard == 0);
        if (this.currentCard > 0) {
            this.createHeader(container);    
        }
        
        this.createBody(container);
        
        if (this.currentCard > 0) {
            this.createFooter(div, container);   
        }
    },
    
    createHeader: function(container) {
        var header = document.createElement('div');
        header.className = 'header';
        container.appendChild(header);
    },
    
    createBody: function(container) {
        var html = cards[this.currentCard]();
        var body = this.divBody(html);
        container.appendChild(body);
    },
    
    createFooter: function(div, container) {
        var self = this;
        var footer = document.createElement('div');
        footer.className = 'footer';
        container.appendChild(footer);
        
        var divPrevious = document.createElement('div');
        divPrevious.innerHTML = '<=';
        divPrevious.className = 'button previous';
        footer.appendChild(divPrevious);
        
        divPrevious.onclick = function(e) {
            self.clickGoPrevious(div, container);
            self.noBubble(e);
        }
        
        var divNext = document.createElement('div');
        divNext.innerHTML = '=>';
        divNext.className = 'button next';
        footer.appendChild(divNext);
        
        divNext.onclick = function(e) {
            self.clickGoNext(div, container);
            self.noBubble(e);
        }
    },
    
    divBody: function(htmlIn) {
        var html = '<div id="bodyText">';
        html += htmlIn;
        html += '</div>';
        
        var div = document.createElement('div');
        div.innerHTML = html;
        return div;
    },
      
    noBubble: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            e.cancelBubble = true;
        }
    }
};

ready(function() {
   storygame.run(); 
});