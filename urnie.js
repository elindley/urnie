/*
  urnie.js - A persistant random non-repeating picker
  Jack A Perkins, 2011 - released under GPLv2
  Inspired by Max/MSP's [urn] object
  
  Create a new Urn() and then call urn.grab(['some','array','here'])
  to be given a random member of the array. Urn removes the item from
  an internal list so that future calls to grab will not pick it again
  until all other items have been grabbed and the urn has been refreshed.
  
  Urn is keyed with the value of the array that is passed in, an urn can
  therefor manage memebers for any number of unique arrays. Remember that
  urn keeps a reference of the array as a key, so you must call remove(key)
  if you wish to allow garbage collection to clean up.
  
  !! Use urns on STATIC arrays or take Great caution !!
  Changing the members in your array inbetween calls to grab will produce
  different results than you may be expecting as JS treats each array
  as a different key. Check out the demo.html for an example.
  
  Urn currently doesn't have a feature to prevent repeating elements between
  the last and first calls of seperate replenishments.
*/

function Urn()
{
  this.urns = new Array();
}
 
Urn.prototype.grab = function(key)
{
  /*our key is actually an array of items.
  We clone a copy of the items into the value, and randomly remove when grabbed
  */
  if(this.urns[key]==undefined || this.urns[key].length==0) {
    //if it's our first time asking with this key or we've grabbed every member
    this.reset(key);
  }
  
  var which = Math.floor(this.urns[key].length*Math.random());
  return(this.urns[key].splice(which,1)[0]);
}

Urn.prototype.reset = function(key)
{
  this.urns[key] = key.slice(0);
}

Urn.prototype.remove = function(key)
{
  this.urns[key] = undefined;
}

Urn.prototype.list = function()
{
  for(f in this.urns){
    console.log("Key "+f+" currently contains "+this.urns[f]);
  }
}

Urn.prototype.nuke = function(){ //blow away all our keys
  this.urns = new Array();
}