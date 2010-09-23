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
   *              Optional, a jQuery Array of block elements or lookup(s) which can be
   *              converted into a jQuery Array of block elements.  If you want to specify the panels,
   *              you will likely also want to set infer to false, otherwise the panel option will have 
   *              to be specified each time jPanel is called to skip panel inference. 
   *              Example use: $(container).jPanel({panels: ['#panel1', '#panel2']});
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
  $.fn.jPanel = function(options){
    // Public Methods
    this.panels = function(){};
    this.addPanel = function(){};
    this.removePanel = function(){};

    this.toggles = function(){};
    this.addToggle = function(){};
    this.removeToggle = function(){};
    
    // Private methods & variables
    var init = function(self) {
          return self;
        };

    // Object code
    return init(this);
  };  
})(jQuery);