Alpha release - mostly functional.

# Web Panels built with jQuery
Web content panels that can be hidden, moved, resized, added to, or removed.  An 
attempt to make dynamic content placement more like playing with Legos.

## Demo
Live example: <http://joshaven.com/jPanel/>

## Usage / API

$(container).jPanel(options)

* Input: Run on a "container" jQuery object with an optional key pair object.  
* Process: Effects the display of an elements direct child elements
* Return: returns a jQuery object with extra 'public' methods
 
### Example:                         
    <!-- A menu example -->
    <!-- With the content snippet: -->
       <div id="menuOptions">...</div>
       <div id="menuContent">...</div>
    <!-- Use the JavaScript: -->
       $('#menuContent').jPanel({                                                                               
         float: true,
         panel: {multiple:false, glue:{left:'left', top:'bottom'}}
       });
    
### Options: 
 
   * __width__ (auto, maintain, {unit}) - width of the container [defaults to auto]  
        auto: width of container is maintained by script  
        maintain: width container is left alone  
        {unit}: width is set to specified... ie: {width: '100px'} or {width: '50%'}  
        
   * __height__  (auto, maintain, {unit}) - Height of the container [defaults to auto]  
              auto: height of container is maintained by script (auto fit to panels)  
              maintain: height container is left alone  
              {unit}: height is set to specified... ie: {width: '100px'} or {width: '50%'}  
   * __infer__   true/false - defaults to true - inference of panels & toggles for container  
   * __float__   true/false - defaults to false - when true the elements float over the content, useful for menus.  
   * __toggles__ {'link\_id': 'panel\_id'} Both key & value being jQuery lookup Strings.  
              To make toggle information inferable, the toggle link/button must be named
              in accordance with the panel name.  For example with "accountDisp", if an element
              with an id of "accountDispToggle" is found, it will be inferred as the toggle when 
              the panel is added to the container, otherwise you will have to specify the toggle
              with this option.  
              Example use:  $(container).jPanel({toggles: {'#btn1':'#panel1' '#lnk2':'#panel2'}});
   * __panels__  ['panel\_id\_1', 'panel\_id\_2'] This can be reliably inferred as long as infer is set to true.  
              Optional, a jQuery Array of elements or lookup(s) which can be converted into a jQuery 
              Array of elements.  If you want to specify the panels, you will likely also want to set infer 
              to false, otherwise the panel option will have to be specified each time jPanel is called to 
              skip panel inference.  
              Example use: $(container).jPanel({panels: ['#panel1', '#panel2'], infer: false });
   * __panel__ {opts} - universal settings for individual panel's  
      - __order__     (auto, maintain) - Ordering of panels within a container [defaults to maintain]  
                      auto: Panels are appended to the visible panels whenever a panels is added or made visible  
                      maintain: Auto positioned when added, prior position is maintained when toggled on & off  
      - __height__     (auto, maintain) - [defaults to maintain]  
                      auto: Panels are resized to ideal height  
                      maintain: Panel height is left alone  
                      {unit}: height is set to specified... ie: {width: '100px'} or {width: '50%'}  
      - __width__     (auto, maintain) - [defaults to maintain]  
                      auto: Panels are resized to give equal space: 1/2 to each, 1/3 to three, etc.  
                      maintain: Panels are given equal space unless changed which fixes a panels's width  
                      {unit}: height is set to specified... ie: {width: '100px'} or {width: '50%'}  
      - __show__      (["panel_ids"]) - Panels visible after initialization, referenced by element id [defaults to showing all panels]  
      - __multiple__  true/false [true] - showing one hides the others when multiple is set to false  
      - __glue__      false/{panel_side: toggle_side} - attaches panel to toggle [default is not to glue, rather to toggle within it's container]  
                      accepts sides named: top, right, bottom, left)  
                      ie: {top: 'bottom', left: 'left'} top of panel is attached to bottom of toggle and left sides are in alignment  



### Notes
* The class of "selected" is added or removed from toggles based upon the panels visability
* Options are stored in the container so they don't need to be given unless a change 
  is desirable.  
* Options are not retained between page reloads.  
* Options will update the options given at a prior time, if given.  Theirfor you can change a 
  single option by calling the jPanel() method with specifying the new options at any time.  
  An example would be calling container.jPanel() without options, letting jPanel infer the 
  panels and calling jPanel again and setting container.jPanel({infer:false}) to freeze 
  panel & toggel inference.


## Installing
The only file needed for use is "jquery_panel.js".  
The pack or min versions of this file (when available) are preferred for production use.  
Pack or min versions will not be made for Alpha releases

Include jquery_panel.js file in your project file structure and include it where desirable.

All other files are supportive in nature: examples, tests, licenses, etc.

## License
MIT-License please refer to LICENSE.md
