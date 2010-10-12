$(document).ready(function(){

  module('Positioning before calling jPanel()');
  test("Should position elements normally", function() {
    var container = $('#container').append('<div>Hello</div><div>World</div><div>!</div>'),
        ch = container.children();
    
    equals( $(ch[1]).position().left, $(ch[0]).position().left, 'Should align left sides of children.');
    ok( $(ch[0]).position().top < $(ch[1]).position().top, 'Should position first child above second.');
  });

  module('Positioning after calling jPanel()');
  test("Should reposition elements", function() {
    $(document.body).append('<div id="container3"></div>');
    var container = $('#container3').append('<div>Hello</div><div>World</div><div>!</div>').jPanel(),
        ch = container.children();
    
    equals( $(ch[1]).position().top, $(ch[0]).position().top, 'Should align top sides of children.');
    ok( $(ch[0]).position().left < $(ch[1]).position().left, 'Should position first child left of second.');
    container.remove();
  });
  
  test('Should maintain width', function() {
    $(document.body).append('<div id="container3"></div>');
    
    var container = $('#container3').append('<div id="c3d0">.</div><div id="c3d1">Hello World</div>'),
        div0 = $('#c3d0').width(),
        div1 = $('#c3d1').width();
    container.jPanel();
    
// FIXME: should pass... the div is full width and is being resized to min-width when jPanel is called
    
    ok( container.width()>100, 'Should have a reasonable width for container' );
    equals( $(container.children()[0]).width(), div0, 'Should maintain div width' );
    equals( $(container.children()[1]).width(), div1, 'Should maintain div width' );
    container.remove();
  });
  
  test('Should respond to auto width', function() {
    $(document.body).append('<div id="container3"></div>');
    
    var container = $('#container3').append('<div></div><div></div>').jPanel({width:'auto'});
    
    ok( container.width()>100, 'Should have a reasonable width for container' );
    same( $(container.children()[0]).width(), parseInt(container.width()/2, 10), 'Should have a width of half of the container' );
    container.remove();
  });
  
  test('Should respond to auto order', function() {
    $('#container').append('<input id="d1Toggle" type="button" /><input id="d2Toggle" type="button" /><input id="d3Toggle" type="button" /><input id="d4Toggle" type="button" />');
    $(document.body).append('<div id="container3"><div id="d1"></div><div id="d2"></div><div id="d3"></div><div id="d4"></div></div>');
    var container = $("#container3").jPanel({order:'auto'});

    $('#d1Toggle').click(); // Click to hide first div; div should be shifted to the end
    $('#d1Toggle').click(); // Click to show first div
    same( container.panels(), ['d2','d3','d4','d1'], 'Should have an adjusted order' );
    
    $('#d3Toggle').click(); // Click to hide d3 div; should be shifted to the end
    $('#d3Toggle').click(); // Click to show first div
    same( container.panels(), ['d2','d4','d1','d3'], 'Should have an adjusted order' );
    
    $('#d2Toggle').click(); // turn d2 off shifting it into the invisable divs
    same( container.panels(), ['d4','d1','d3',   'd2'], 'Should have an adjusted order' );
    $('#d4Toggle').click(); // turn d4 off shifting it into the invisable divs
    same( container.panels(), ['d1','d3',   'd4','d2'], 'Should have an adjusted order' );
    $('#d1Toggle').click(); // turn d1 off shifting it into the invisable divs
    same( container.panels(), ['d3',   'd1','d4','d2'], 'Should have an adjusted order' );
    
    container.remove(); // cleanup visable 
  });
  
}); // end of document ready function