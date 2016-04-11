var gameTitle = 'SPACE PIRATE';

var cards = [
    {
        getHtml: function() {
            return '<div class="title">Space pirates</div><div class="title">All aboard!</div>';
        }
    },
    {
        getHtml: function() {
            var html = 'Space pirates is a story game you can play with your friends in 15 - 45 minutes.<br />';
            html += 'Take a pen and some sheets of paper, follow this simple rules and have fun!<br />';
            html += 'No loot, no problem';
            return html;
        },
        
        getNext: function() {
            return 'Create player';
        }
    },
    {
        getHtml: function() {
            var html = 'card3';
            return html;
        }
    }
];