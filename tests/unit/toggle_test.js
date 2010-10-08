$(document).ready(function(){
  module('Toggle tests jPanel()')
  test(".toggles()", function() {
    same( $('#container').jPanel().toggles(), {}, 'Should return an array, even when empty');
    equals( $(document.body).data('jPanelToggles'), 
            $('#container').jPanel().toggles(), 
            'the panels() method should return the data("toggles") object');

    $('#container').jPanel().addToggle({one:1, two:2});

    same( $('#container').jPanel().toggles('one'), 1, 'Should be able to ask for a properity of the toggle' );
    $(document.body).data('jPanelToggles', {});   // reset manually added toggles
  });

  test(".addToggle()", function() {
    $('#buttons').append('<input id="d1Toggle" type="button" />');
    $('#container').append('<div id="d1"></div>');
    same( $('#container').jPanel().addToggle(), {'d1Toggle': 'd1'},
          'Should be able to infer toggles when named properly');
        
    same( typeof($.data($('#d1Toggle').get(0)).events.click), 'object', 'Should add click callback to button' );
        
    $('#buttons').append('<input id="d2Button" type="button" />');
    $('#container').append('<div id="d2"></div>');
    same( $('#container').jPanel().addToggle(), {'d1Toggle': 'd1'},
          'Should not infer anything with undetectable name');
        
    same( $('#container').jPanel().addToggle({d2Button: 'd2'}), {'d1Toggle': 'd1', 'd2Button': 'd2'},
          'Should add when undetectable name is specified');
    $(document.body).data('jPanelToggles', {});   // reset manually added toggles
  });

  test(".removeToggle()", function() {
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

  test("toggle inference on multiple objects", function() {
    $('#buttons').append('<input id="d1Toggle" type="button" /><input id="d2Toggle" type="button" /><input id="d3Toggle" type="button" /><input id="d4Toggle" type="button" />');     
    $('#container').append('<div id="d1"></div><div id="d2"></div>').jPanel();
    $('#container2').append('<div id="d3"></div><div id="d4"></div>').jPanel();
    same($('#container').jPanel().toggles(), {'d1Toggle':'d1', 'd2Toggle':'d2', 'd3Toggle':'d3', 'd4Toggle':'d4'}, 'Should infer toggles for all div elements');
  });
});