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
    // Initialize DOM data storage for body & container
    if( !$(document.body).data('jPanelToggles') ) 
      $(document.body).data('jPanelToggles', {});
    if( !this.data('panels') )
      this.data('panels', []);
    if( !this.data('options') ) 
      this.data('options', {});
    if( !this.data('panelOrder') ) 
      this.data('panelOrder', []);
    

    // Private methods & variables
    var self = this,
        toggleData = $(document.body).data('jPanelToggles'),
        panelData = this.data('panels'),
        init = function() {
          if( self.length == 0 ) return false; // bail out gracefully if the container object doesn't exist.
          
          if( !self.data('jPanel') ) {  // initialize jPanel only if it has not been run on this container element
            self.data('jPanel', true);  // that this is a jPanel container element
            self.addPanel();            // attempt panel inferance
            self.addToggle();           // attempt toggle inference... must be after panel inference
          }
          
          return self;                  // return self: 'this' of the jPanel object, a jQuery object.
        },
        toggleFunction = function() {
          $('#'+$(document.body).data('jPanelToggles')[this.id]).toggle();
          repositionPanels();
        },
        visablePanels = function() { // returns an array of panel jquery dom objects
          var visable = [];
          $.each(self.panels(), function(i,panelID) {
            var panel = $('#'+panelID);
            if(panel.is(':visible')) visable.push(panel);
          });
          return visable;
        },
        invisablePanels = function() { // returns an array of panel jquery dom objects
          var visableIDs = [],
              invisable = [];
          
          // collect visable id's
          $.each(visablePanels(), function(i,v) { visableIDs.push(v[0].id); });
              
          $.each(self.panels(), function(i,id) {
            if( visableIDs.indexOf(id) < 0 ) { invisable.push($('#'+id)); }
          });
          return invisable;
        },
        insidePositionFor = function(container) { // retuns an object: .position() of first element inside container
          container = $(container); // work with jQuery object
          
          var firstVisableChild = $.each(container, function(i,el) {
            el = $(el);
            if( el.is(":visible") ) return el;
          });
        
          if( container.children().length < 1 ) { // if container is empty, create a temporary inside element & measure it
            container.append('<div id="TestElementRemoveMe">&nbsp;</div>');
            var visableChild = $('#TestElementRemoveMe'),
                myReturn = visableChild.position();
            visableChild.remove();
            return myReturn;
          } else { // return measured first element
            return firstVisableChild.position();
          };
        },
        reorderPanels = function() {
          if( self.options('order') == 'auto' ) {
            var panelObjects = visablePanels().concat(invisablePanels()),
                panelIDs = [];
                
            // collect id's from panel objects
            $.each(panelObjects, function(i,p) { panelIDs.push(p[0].id); });
            self.data('panels', panelIDs);
          };
          return self.data('panels');
        },
        repositionPanels = function() {
          var nextPosition    = insidePositionFor(self),
              vPanels         = visablePanels(),
              targetWidth     = self.width() / visablePanels().length;
              maxPanelHeight  = 0;
          
          $.each(vPanels, function(i, panel) {  // position each visablePanel
            // Grow the container height as needed
            if (self.height() < panel.height()) self.height(panel.height());
            // Record MAX panel height
            if (panel.height() > maxPanelHeight ) maxPanelHeight = panel.height();
            
            var css = {position:'absolute', top:nextPosition.top, left:nextPosition.left}; 

            switch (self.options('width')) {
            case 'auto': // adjust rendered size to desired size
              // Object for css changes
              css.width = targetWidth;
              panel.css(css);
              // Calculate width after appliation and adjust for margin differences, etc.
              css.width = css.width-(panel.outerWidth()-targetWidth);
              panel.css(css);
              break;
            case 'maintain':
              css.width = panel.data('original').width;
              panel.css(css);
              break;
            };
            // set next starting position
            nextPosition.left = nextPosition.left + panel.outerWidth();
          });
          self.height(maxPanelHeight);
          reorderPanels();
        };
    
    
  // Public Methods
    // Expects object or nil for setter 
    // Alternatively supply a string for getter
    // Returns all options or value of getter
    this.options = function(params) {
      if( typeof(params) == 'string' ) { // support self.options('key') over self.options().key
        return self.options()[params];
      } else {
        if( typeof(params) != 'object' )
          params = typeof(options)=='object' ? options : {};  // ensure params as an object
      
        var opts = self.data('options');                      // shortcut variable
        if( typeof(opts) == 'undefined' ) {
        }
        for (key in params) { opts[key] = params[key]; }      // copy any options from params
        // opts.order = opts.order || 'maintain';                // set default
        if ( !opts.order ) {opts.order = 'maintain';} 
        if ( !opts.width ) {opts.width = 'maintain';}                // set default
        if ( !opts.infer ) {opts.infer = true;}                      // set default
      
        return opts;
      };
    };
  
    this.panels = function(instance) {
      return instance ? self.data('panels')[self.data('panels').indexOf(instance)] : self.data('panels');
    };

    // Expects an element proper that is to be added to panels or nothing to infer panels. Returns panels.
    this.addPanel = function(el) {
      if(el) { 
        try { // protects against trying to add non-positional elements
          $(el).position(); // this will bomb if the element is not positional, tripping the catch
          
          // ensure element has an id
          if( !el.id ) el.id = 'jPanelAutoID' + self.panels().length;
          // add unique id's to panels
          if( self.panels().indexOf(el.id)<0 ) 
            self.panels().push(el.id);

          // backup original order, position, width, & height
          el = $(el);
          el.data('original',{});
          var original = el.data('original');
          original.position = el.position();
          original.height = el.height();
          original.width = el.width();
          original.order = self.panels().indexOf(el[0].id);
          
        } catch(err) {}
        
      } else if( self.options('infer') ) { // no element given - try infer by calling addPanel on each child.
        self.children().each(function(i,el) { self.addPanel(el); });
      };
      
      repositionPanels();
      return self.panels();
    };
    // Expects an element proper that is to be removed from panels. Returns panels.
    this.removePanel = function(el) {
      if(el){
        self.panels().splice( self.panels().indexOf(el), 1 );        
      } else if( self.options('infer') ) { // no element given - try infer
        // collect id's of child elements
        var ids = [];
        self.children().each(function(i,el) { if(el.id) ids.push(el.id); }); 
        
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
          $('#'+t).click(toggleFunction);               // add onclick event to toggle
        });
      } else if( self.options('infer') ) {              // no element given - try infer
        $.each(self.panels(), function(i,val) {         // look for an element with ('idOfPanel' + 'Toggle')
          if( $('#'+val+'Toggle').length > 0 ) {
            $('#'+val+'Toggle').click(toggleFunction);  // add onclick event to toggle
            self.toggles(val+'Toggle', val);            // add {toggle: element} pair to toggles
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