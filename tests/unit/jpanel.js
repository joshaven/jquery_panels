$(document).ready(function(){

  test("jPanel object", function() {
    ok( true, $('#container').jPanel() );
  });
  
  test("jPanel().pannels", function() {
    equals( $('#container').jPanel().panels(), [] );
  });
  
  test("jPanel().addPanel", function() {
    equals( $('#container').jPanel().addPanel(), [] );
  });
  
  test("jPanel().removePanel", function() {
    equals( $('#container').jPanel().removePanel(), [] );
  });
  
  test("jPanel().toggles", function() {
    equals( $('#container').jPanel().toggles(), [] );
  });
  
  test("jPanel().addToggle", function() {
    equals( $('#container').jPanel().addToggle(), [] );
  });
  
  test("jPanel().removeToggle", function() {
    equals( $('#container').jPanel().removeToggle(), [] );
  });

}); // end of document ready function