$(document).ready(function(){
  module('Panel tests jPanel()');
  test(".panels()", function() {
    same( $('#container').jPanel().panels(), [], 'Should return an array, even when empty');
    equals( $('#container').data('panels'), 
            $('#container').jPanel().panels(), 
            'Should return the data("panels") object');
    $('#container').append('<div id="d1"></div><div id="d2"></div>').jPanel().addPanel();  
    same( $('#container').jPanel().panels('d1'), 'd1', 'Should be able to ask for an instance of the panels' );
  });
  
  test(".addPanel()", function() {
    $('#container').append('<div id="d1"></div>');
    same( $('#container').jPanel().addPanel(), ['d1'], 'Should add all child elements of the container' );
    
    // addPanel() should only change panels for new elements
    same( $('#container').jPanel().addPanel(), ['d1'], 'Should not modify panels, no new children' );
    $('#container').append('<div id="d2"></div>');
    same( $('#container').jPanel().addPanel(), ['d1', 'd2'], 'Should add new element' );
    
    $('#container').append('<div></div>');
    var autoid = 'jPanelAutoID'+$('#container').jPanel().panels().length;
    same( $('#container').jPanel().addPanel(),
          ['d1', 'd2', autoid], 
          "Should give element without id's an auto-id" );
    
    equals( $('#container').children().length, 
            $('#container').jPanel().panels().length, 'Should be the same lenght as child elements');
    
    equals( $('#'+$('#container').jPanel().panels()[0]).data('original').order, 0, 'Should record the order of panels' );
    equals( $('#'+$('#container').jPanel().panels()[1]).data('original').order, 1, 'Should record the order of panels' );
  });
  
  test(".removePanel()", function() {
    same( $('#container').append('<div id="d1"></div><div id="d2"></div><div id="d3"></div><div id="d4"></div><div id="d5"></div>').jPanel().panels(), 
          ['d1','d2','d3','d4','d5'], 'Should setup test' );
    
    same( $('#container').jPanel().removePanel(), ['d1','d2','d3','d4','d5'], 
          'Should not remove anything when nothing to do' );

    // remove element, ensure it doesn't dissapear until removePanel() is called 
    $('#d3').replaceWith('');
    same( $('#container').jPanel().panels(), ['d1','d2','d3','d4','d5'], 
          'Should not remove anything without a call to removePanel()' );
          
    same( $('#container').jPanel().removePanel(), ['d1','d2','d4','d5'], 
          'Should remove non-existant panel "d3" with call to removePanel()' ); 
    
    same( $('#container').jPanel().removePanel('d2'), ['d1','d4','d5'], 
          'Should remove element by id' ); 
  });
 
  test(".panel inference on multiple objects", function() {
    $('#container').append('<div id="d1"></div><div id="d2"></div>');
    $('#container2').append('<div id="d3"></div><div id="d4"></div>');
    same($('#container').jPanel().panels(), ['d1', 'd2'], 'Should infer first two div elements');
    same($('#container2').jPanel().panels(), ['d3', 'd4'], 'Should infer last two div elements');
  });
}); // end of document ready function