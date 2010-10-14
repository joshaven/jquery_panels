# jPanels

## TODO
* confirm: addPanel(element) should append the container if the element is not part of the container
* should have a feature for overlaying panels... interfacing like tabs
* should be able to overlay partially... like menus
* confirm: hidden elements can be added as panels


## BUGS
* When two (or more) containers are on a page and the top container changes size, 
  the panels from the lower containers do not move with the page.
* Odd error when the toggle id is the same as the panel id... related to no data in panel... 
  should detect and fix or gracefully fail 