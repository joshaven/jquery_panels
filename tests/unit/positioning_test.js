$(document).ready(function(){

  module('Positioning before calling jPanel()');
  test("Should position elements normally", function() {    
    var container = $('#container').append('<div>Hello</div><div>World</div><div>!</div>'),
        ch = container.children();
    
    equals( $(ch[1]).position().left, $(ch[0]).position().left, 'Should align left sides of children.');
    ok( $(ch[0]).position().top < $(ch[1]).position().top, 'Should position first child above second.')
  });

  module('Positioning after calling jPanel()');
  test("Should reposition elements", function() {    
    var container = $('#container').append('<div>Hello</div><div>World</div><div>!</div>').jPanel(),
        ch = container.children();
    
    equals( $(ch[1]).position().top, $(ch[0]).position().top, 'Should align top sides of children.');
    ok( $(ch[0]).position().left < $(ch[1]).position().left, 'Should position first child left of second.')
  });
  
  test('Should position in empty container', function() {
    var container = $('#container').jPanel(),
        ch = container.children();
    
    same( container.position(), {top:0, left:0}, 'should setup with a position of 0,0' );
    equals( container.children().length, 0, 'Should setup without children elements' );
    // equals('creating an element in the container, reading position & removing the element');
  });
  
}); // end of document ready function