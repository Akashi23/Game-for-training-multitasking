var body = document.getElementsByTagName('body')[0];
var a = document.createElement('a');
a.setAttribute('href', '/game');
a.setAttribute('class', 'button');

for (var i = 0; i < 100; i++) {
    var newA = a.cloneNode();
    newA.textContent = 'Play';
    
    body.appendChild(newA);
}