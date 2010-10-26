# jPanels

## TODO
* confirm: addPanel(element) should append the container if the element is not part of the container
* confirm: hidden elements can be added as panels
* implement moving of panels with the mouse

## BUGS
* When the position of the toggle moves the glued panels don't move.  Example, changing the 
  height of a object above the toggle changes from 100px to 0...  Either a callback on the 
  document or a positioning loop is needed
* Odd error when the toggle id is the same as the panel id... related to no data in panel... 
  should detect and fix or gracefully fail 
  
## Ideas for next version
- panels & toggles should be objects, responding to methods... rather then id's