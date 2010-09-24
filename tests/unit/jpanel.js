$(document).ready(function(){

  test("jPanel object", function() {
    ok( true, $('#container').jPanel() );
  });
  
  test("jPanel().pannels", function() {
    same( $('#container').jPanel().panels(), [] );
  });
  
  test("jPanel().addPanel", function() {
    same( $('#container').jPanel().addPanel(), [] );
  });
  
  test("jPanel().removePanel", function() {
    same( $('#container').jPanel().removePanel(), [] );
  });
  
  test("jPanel().toggles", function() {
    same( $('#container').jPanel().toggles(), [] );
  });
  
  test("jPanel().addToggle", function() {
    same( $('#container').jPanel().addToggle(), [] );
  });
  
  test("jPanel().removeToggle", function() {
    same( $('#container').jPanel().removeToggle(), [] );
  });

}); // end of document ready function