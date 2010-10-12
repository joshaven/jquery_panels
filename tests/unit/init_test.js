$(document).ready(function(){
  module('Initialization Tests jPanel()');
  test("Graceful failure when the target container does not exist", function() {
    ok( $('#notReal').jPanel() == false );
  });

  test(".options()", function() {
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

  test("Object Initialization", function() {
    // $('#container').append('<div id="d1"></div>');
    $('#container').append('<div id="d1"></div>');
    same( $('#container').jPanel().panels(), ['d1'], "Should infer children as panels on initialization" );
    
    // ensure that initialized jPanels are not re-initialized
    $('#container').append('<div></div>');
    same( $('#container').jPanel().panels(), ['d1'], "Should no infer children as panels after initialization" );
  });
}); // end of document ready function