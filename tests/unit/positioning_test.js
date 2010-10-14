$(document).ready(function(){

  module('Positioning before calling jPanel()');
  test("Should position elements normally", function() {
    var container = $('#container').append('<div>Hello</div><div>World</div><div>!</div>'),
        ch = container.children();
    
    equals( $(ch[1]).position().left, $(ch[0]).position().left, 'Should align left sides of children.');
    ok( $(ch[0]).position().top < $(ch[1]).position().top, 'Should position first child above second.');
  });

  // test('Should position container normally', function() {
  //   ok(false, 'Should FAIL - need to write tests');
  // });

  module('Positioning after calling jPanel()');
  test("Should reposition elements", function() {
    $(document.body).append('<div id="container3"></div>');
    var container = $('#container3').append('<div>Hello</div><div>World</div><div>!</div>').jPanel(),
        ch = container.children();
    
    equals( $(ch[1]).position().top, $(ch[0]).position().top, 'Should align top sides of children.');
    ok( $(ch[0]).position().left < $(ch[1]).position().left, 'Should position first child left of second.');
    container.remove();
  });
  
  test('Should maintain panelWidth', function() {
    $(document.body).append('<div id="container3"></div>');
    
    var container = $('#container3').append('<div id="c3d0">.</div><div id="c3d1">Hello World</div>'),
        div0width = $('#c3d0').width(),
        div1width = $('#c3d1').width();
    container.jPanel();
    ok( container.width()>100, 'Should have a reasonable width for container' );
    equals( $(container.children()[0]).width(), div0width, 'Should maintain div width' );
    equals( $(container.children()[1]).width(), div1width, 'Should maintain div width' );
    container.remove();
  });

  // test('Should maintain panelHeight', function() {
  //   ok(false, 'Should FAIL - need to write tests');
  // });

  test('Should respond to auto panel: {width: "auto"}', function() {
    $(document.body).append('<div id="container3"></div>');
    
    var container = $('#container3').append('<div></div><div></div>').jPanel({panel:{width:'auto'}});
    
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
  
  // test('Should respond to width for container', function() {
  //   ok(false, 'Should FAIL - need to write tests');
  // });
  
  // test('Should respond to height for container', function() {
  //   ok(false, 'Should FAIL - need to write tests');
  // });
  
  test('Should be able to glue panels to toggels', function() {
    $(document.body).append('<span id="container3_Panel0_AutoIDToggle"></span><span id="container3_Panel1_AutoIDToggle"></span>');
    $(document.body).append('<div id="container3"> <div>.</div> <div>.</div> </div>');
    var container       = $('#container3').jPanel( {panel:{ glue:{top: 'bottom', left: 'left'} }} ),
        toggle1         = $('#container3_Panel0_AutoID'),
        toggle2         = $('#container3_Panel0_AutoID');
        topOfPanel1     = parseInt($(container.children()[0]).position().top, 10),
        bottomOfToggle1 = parseInt(toggle1.position().top+toggle1.height(), 10),
        topOfPanel2     = parseInt($(container.children()[1]).position().top, 10),
        bottomOfToggle2 = parseInt(toggle2.position().top+toggle2.height(), 10),
        leftOfPanel1    = parseInt($(container.children()[0]).position().left, 10),
        leftOfPanel2    = parseInt($(container.children()[1]).position().left, 10),
        leftOfToggle1   = parseInt(toggle1.position().left, 10),
        leftOfToggle2   = parseInt(toggle2.position().left, 10);
    
    equals( topOfPanel1, bottomOfToggle1+1, 'Should position top of panel at bottom edge of toggle' );
    equals( topOfPanel2, bottomOfToggle2+1, 'Should position top of panel at bottom edge of toggle' );
    
    equals( leftOfPanel1, leftOfToggle1, 'Should position left of panel even with left of toggle' );
    equals( leftOfPanel2, leftOfToggle2, 'Should position left of panel even with left of toggle' );
    container.remove();
  });
  
});