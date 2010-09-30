$(document).ready(function(){

  test("jPanel object", function() {
    ok( true, $('#container').jPanel() );
  });
  
  test("jPanel().pannels", function() {
    same( $('#container').jPanel().panels(), [] );
  });
  
  test("jPanel().addPanel", function() {
    // need to ensure elements without id's get a calculated id like: 'jPanelAutoID'+self.panels().length
    // and that existing id's are not overwritten
    // and that all children are represented by id in the containers 'panels' data array
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