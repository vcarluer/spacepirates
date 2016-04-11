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
                if (!self.animated) {
                    document.body.onclick = null;
                    self.clickGoNext(div, container);   
                }
                
                self.noBubble(e);
            }
        }
        
        return container;
    },
    
    clickGoNext: function(div, container) {
        if (!this.animated) {
            var self = this;
            this.animated = true;
            container.className = 'container slideOut';
            container.addEventListener('animationend', function(e) {
                div.removeChild(container);
                self.animated = false;
            });
            
            this.goNext(div);   
        }
    },
    
    clickGoPrevious: function(div, container) {
        if (!this.animated) {
            var self = this;
            this.animated = true;
            if (this.currentCard > 0) {
                container.className = 'container slideOutPrevious';
                container.addEventListener('animationend', function(e) {
                    div.removeChild(container);
                    self.animated = false;
                });
                
                this.goPrevious(div, container);
            }
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
        var card = cards[this.currentCard];
        if (this.currentCard > 0) {
            this.createHeader(card, container);    
        }
        
        this.createBody(card, container);
        
        if (this.currentCard > 0) {
            this.createFooter(card, div, container);   
        }
    },
    
    createHeader: function(card, container) {
        var header = document.createElement('div');
        header.className = 'header';
        container.appendChild(header);
        
        if (gameTitle) {
            header.innerHTML = gameTitle;
        }
    },
    
    createBody: function(card, container) {
        if (card.getHtml) {
            var html = card.getHtml();
            var body = this.divBody(html);
            container.appendChild(body);
        }
    },
    
    createFooter: function(card, div, container) {
        var self = this;
        var footer = document.createElement('div');
        footer.className = 'footer';
        container.appendChild(footer);
        
        var divPrevious = document.createElement('div');
        divPrevious.innerHTML = '<=';
        divPrevious.className = 'button previous noselect';
        footer.appendChild(divPrevious);
        
        divPrevious.onclick = function(e) {
            self.clickGoPrevious(div, container);
            self.noBubble(e);
        }
        
        var divNext = document.createElement('div');
        if (this.currentCard === cards.length - 1 ) {
            divNext.innerHTML = 'RESTART';
        } else {
            divNext.innerHTML = '=>';
            if (card.getNext) {
                divNext.innerHTML += ' ' + card.getNext();
            }    
        }
        
        divNext.className = 'button next noselect';
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