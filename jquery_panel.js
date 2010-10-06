/**
 * jquery_panel - jQuery JavaScript Panel UI Effects Library v0.0.1
 * http://github.com/joshaven/jquery_panels/
 *
 * Released under the MIT license by Joshaven Potter 
 *
 * Copyright 2010, Joshaven
 * Licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
**/


   
(function($){
  /**  $(container).jPanel(options)  **
   *
   * Input: Run on a "container" jQuery object with an optional key pair object.  
   *   order:   (auto, maintain) - defaults to maintain
   *              auto: Panels are appended to the visable pannels whenever a panels is added or made visable
   *              maintain: Auto positioned when added, prior position is maintained when toggled on & off
   *   width:   (auto, maintain) - defaults to maintain
   *              auto: Panels are resized to give equal space: 1/2 to each, 1/3 to three, etc.
   *              maintain: Panels are given equal space unless changed which fixes a panels's width
   *   infer:   true/false - defaults to true
   *   toggles: {link_reference: child_reference} Both key & value being jQuery lookup Strings.
   *              To make toggle information inferable, the toggle link/button must be named
   *              in accordance with the panel name.  For exmaple with "accountDisp", if an element
   *              with an id of "accountDispToggle" is found, it will be infered as the toggle when 
   *              the panel is added to the container, otherwise you will have to specify the toggle
   *              with this option.  
   *              Example use:  $(container).jPanel({toggles: {'#btn1':'#panel1' '#lnk2':'#panel2'}});
   *   panels:  [ref, ref] This can be reliabely infered as long as infer is set to true.
   *              Optional, a jQuery Array of elements or lookup(s) which can be
   *              converted into a jQuery Array of elements.  If you want to specify the panels,
   *              you will likely also want to set infer to false, otherwise the panel option will have 
   *              to be specified each time jPanel is called to skip panel inference. 
   *              Example use: $(container).jPanel({panels: ['#panel1', '#panel2'], infer: false });
   *
   * Process: Effects the display of an elements direct child elements
   * 
   * Return: returns a jQuery object with extra 'public' methods
   * 
   * Example:                                    
   *   With the content snippet:    
   *      <div id="container">...</div>
   *   Use the JavaScript:          
   *      $('#container').jPanel({                                                                               
   *        order: 'auto',
   *        toggle: {'#accountBtn': '#accountsDisp', '#productsBtn': '#productsDisp'}
   *      });
   *
   * Notes: Options are stored in the container so they don't need to be given unless a change 
   * is desirable.  Options are not retained between page reloads.  Options will update
   * the options given at a prior time, if given.  Theirfor you can change a single option by
   * calling the jPanel() method with specifying the new options at any time.  An example would be
   * calling without options, letting jPanel infer the panels and calling jPanel again and setting
   * infer to false to freeze the panels inference.
  **/
  $.fn.jPanel = function(options) {
  // Private methods & variables
    var self = this,
        toggleData = $(document.body).data('jPanelToggles'),
        panelData = self.data('panels')
        init = function() {
          if ( self.options('infer') ) {  // infer panels and toggles if inference is enabled
            if( !panelData ) {
              self.data('panels', []); 
              self.addPanel();            // panel inferance
            };
            
            if( !toggleData ) {
              $(document.body).data('jPanelToggles', {});
              self.addToggle();                           // toggle inference depends on panel inference
            }; 
          };
          
          return self; // return self, which is the 'this' of the jPanel object, an jQuery object.
        };
    
    
  // Public Methods
    // Expects object or nil for setter OR string for getter; returns all options or value of getter
    this.options = function(params) {
      if( typeof(params) == 'string' ) { // support self.options('key') over self.options().key
        return self.options()[params];
      } else {
        if( !self.data('options') ) self.data('options', {}); // ensure data('options')
        if( typeof(params) != 'object' )
          params = typeof(options)=='object' ? options : {};  // ensure params as an object
      
        var opts = self.data('options');                          // shortcut variable
        for (key in params) { opts[key] = params[key]; }          // import any options from specified options object
        if( !opts.order ) opts.order = 'maintain';                // set default
        if( !opts.width ) opts.width = 'maintain';                // set default
        if( !opts.infer ) opts.infer = true;                      // set default
      
        return opts;
      };
    };
  
    this.panels = function(instance) {
      return instance ? self.data('panels')[self.data('panels').indexOf(instance)] : self.data('panels');
    };

    // Expects an element proper that is to be added to panels or nothing to infer panels. Returns panels.
    this.addPanel = function(el) {
      if(el) { 
        // ensure element has an id
        if (!el.id) el.id = 'jPanelAutoID' + self.panels().length;
        // add unique id's to panels
        if(self.panels().indexOf(el.id)<0) self.panels()[self.panels().length] = el.id;
      } else if( self.options('infer') ) { // no element given - try infer by calling addPanel on each child.
        self.children().each(function(i,el) { self.addPanel(el); });
      };
      return self.panels();
    };

    // Expects an element proper that is to be removed from panels. Returns panels.
    this.removePanel = function(el) {
      if(el){
        self.panels().splice( self.panels().indexOf(el), 1 );        
      } else if( self.options('infer') ) { // no element given - try infer
        // collect id's of child elements
        var ids = [];
        self.children().each(function(i,el) { if(el.id) ids[ids.length]=el.id; }); 
        
        for ( i in self.panels() ) { // Remove any panel elements that are missing in the DOM
          if( ids.indexOf(self.panels()[i]) < 0 ) self.panels().splice(i,1);
        }
      };
      return self.panels();
    };


    // Returns toggles, if key is provided it returns the requested instance of the toggles object
    // if key and setValue is specified the value for the key will be set and returned
    this.toggles = function(key, setValue) {
      if (key && setValue) toggleData[key] = setValue;
      return key ? toggleData[key] : toggleData;
    };

    // Expects an object containing toggle id and panel id pairs ie: {'d1Toggle':'d1', 'd2Toggle':'d2'}
    this.addToggle = function(toggleAndElementPairs) {
      if( typeof(toggleAndElementPairs) == 'object' ) { // set each toggle panel pair
        $.each(toggleAndElementPairs, function(t,el) {
          self.toggles(t,el);                           // add {toggle: element} pair to toggles
          $('#'+t).click(function() { alert('toggeling '+el); }); // add onclick event to toggle
          });
      } else if( self.options('infer') ) { // no element given - try infer
        $.each(self.panels(), function(i,val) { // look for an element with ('idOfPanel' + 'Toggle')
          if( $('#'+val+'Toggle').length > 0 ) {
            $('#'+val+'Toggle').click(function() { alert('toggeling '+this.id); });  // add onclick event to toggle
            self.toggles(val+'Toggle', val);                              // add {toggle: element} pair to toggles
          };
        });
      };
      return self.toggles();
    };
    
    // Expects an element proper that is to be removed from toggles. Returns toggles.
    this.removeToggle = function(toggle) {
      if( toggle ) {
        if( self.toggles(toggle) ) { delete self.toggles()[toggle]; };
      } else if( self.options('infer') ) { 
        // iterate through toggles removing any that don't have matching elements
        $.each(self.toggles(), function(toggleId, panelId) {
          if( ($('#'+toggleId).length < 1) || ($('#'+panelId).length < 1) ) delete self.toggles()[toggleId];
        });
      }
      return self.toggles();
    };
    

    // Object code
    return init();
  };  
})(jQuery);