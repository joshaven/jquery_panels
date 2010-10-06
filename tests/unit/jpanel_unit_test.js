$(document).ready(function(){
  // initialization tests
  test("jPanel().options()", function() {
    same( $('#container').jPanel().options(), 
      {order: "maintain", width: "maintain", infer: true }, 
      'Should infer defaults' );
    
    same( $('#container').jPanel({order: 'auto'}).options(), 
      {order: 'auto', width: 'maintain', infer: true }, 
      'Should overwrite defaults with given properities' );
    
    same( $('#container').jPanel().options(), 
      {order: 'auto', width: 'maintain', infer: true }, 
      'Should maintain prior options');
  });

  test("jPanel Object Initialization", function() {
    // $('#container').append('<div id="d1"></div>');
    $('#container').append('<div id="d1"></div>');
    same( $('#container').jPanel().panels(), ['d1'], "Should infer children as panels on initialization" );
    
    // ensure that initialized jPanels are not re-initialized
    $('#container').append('<div></div>');
    same( $('#container').jPanel().panels(), ['d1'], "Should no infer children as panels after initialization" );
  });
  
  // panel tests
  test("jPanel().panels()", function() {
    same( $('#container').jPanel().panels(), [], 'Should return an array, even when empty');
    equals( $('#container').data('panels'), 
            $('#container').jPanel().panels(), 
            'Should return the data("panels") object');
    $('#container').append('<div id="d1"></div><div id="d2"></div>').jPanel().addPanel();  
    same( $('#container').jPanel().panels('d1'), 'd1', 'Should be able to ask for an instance of the panels' );
  });
  
  test("jPanel().addPanel()", function() {
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
  });
  
  test("jPanel().removePanel()", function() {
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
 
  // toggle tests 
  test("jPanel().toggles()", function() {
    same( $('#container').jPanel().toggles(), {}, 'Should return an array, even when empty');
    equals( $(document.body).data('jPanelToggles'), 
            $('#container').jPanel().toggles(), 
            'the panels() method should return the data("toggles") object');

    $('#container').jPanel().addToggle({one:1, two:2});

    same( $('#container').jPanel().toggles('one'), 1, 'Should be able to ask for a properity of the toggle' );
    $(document.body).data('jPanelToggles', {});   // reset manually added toggles
  });
  
  test("jPanel().addToggle()", function() {
    $('#buttons').append('<input id="d1Toggle" type="button" />');
    $('#container').append('<div id="d1"></div>');
    same( $('#container').jPanel().addToggle(), {'d1Toggle': 'd1'},
          'Should be able to infer toggles when named properly');
          
    // same( typeof($.data($('#d1Toggle').get(0)).events), 'object', 'Should add click callback to button' );
    // same( typeof($.data($('#d1Toggle').get(0)).events.click), 'object', 'Should add click callback to button' );
          
    $('#buttons').append('<input id="d2Button" type="button" />');
    $('#container').append('<div id="d2"></div>');
    same( $('#container').jPanel().addToggle(), {'d1Toggle': 'd1'},
          'Should not infer anything with undetectable name');
          
    same( $('#container').jPanel().addToggle({d2Button: 'd2'}), {'d1Toggle': 'd1', 'd2Button': 'd2'},
          'Should add when undetectable name is specified');
    $(document.body).data('jPanelToggles', {});   // reset manually added toggles
  });
  
  test("jPanel().removeToggle()", function() {
    $('#buttons').append('<input id="d1Toggle" type="button" /><input id="d2Toggle" type="button" /><input id="d3Toggle" type="button" />');
    $('#container').append('<div id="d1"></div><div id="d2"></div><div id="d3"></div>');
    $('#container').jPanel().addToggle(); // infer toggles
    same( $('#container').jPanel().removeToggle('d2Toggle'), {'d1Toggle':'d1', 'd3Toggle':'d3'},
          'Should setup test');

    $('#buttons')[0].innerHTML = '<input id="d1Toggle" type="button" /><input id="d2Toggle" type="button" /><input id="d3Toggle" type="button" />';
    $('#container')[0].innerHTML = '<div id="d1"></div><div id="d2"></div><div id="d3"></div>';
    same( $('#container').jPanel().addToggle(), {'d1Toggle':'d1', 'd2Toggle':'d2', 'd3Toggle':'d3'}, "Setup toggle test");
    $('#d1Toggle').replaceWith(''); // Remove d1Toggle element manually
    $('#d3').replaceWith(''); // Remove target d3 element manually
    same( $('#container').jPanel().removeToggle(), {'d2Toggle': 'd2'}, "Should remove any toggles that don't have both target and toggle" );
  });

}); // end of document ready function