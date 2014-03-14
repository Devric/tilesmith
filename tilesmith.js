/**
 *  Building tiles
 *
 *  @param {String} el   : container of the tile
 *  @param {Object} data : 
 *
 *  return @method init(props)   :
 *  return @method prepend(data) :
 *  return @method append(data)  :
 */
;var tilesmith = function(el, data){ 

    // where to get data from dom or object
    // build props
    // build column
        // append nodes column
    // append column

    // onResize
    // rebuild props
    // if props condition 
        // change rebuild column
        // append nodes to column
        // append column

    var tilesmith = this

    var buildProps = function() {
        tilesmith.ctn       = document.querySelector(el)
        tilesmith.list      = data ? data : slice(tilesmith.ctn.querySelectorAll('.item'))
        tilesmith.tempCount = 0

        tilesmith.margin    = 0
        tilesmith.colWidth  = 0
        tilesmith.colCount  = 0
    }

    var colBuilder = function(prop) {
        
    }

    var init = function(props) {
        buildProps()
        console.log(tilesmith.list)
    }

    var add = function(data, position) {
        
    }
    
    return {
        init : init
      , append  : add(data, 'append')
      , prepend : add(data, 'prepend')
    }

    // helpers
    function slice(obj){
        return Array.prototype.slice.call(obj)
    }

    function get_type(thing){
        if(thing===null)return "[object Null]"; // special case
        return Object.prototype.toString.call(thing);
    }

    function is(obj, type) {
        var klass 	= Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && klass === type; 
    }
}

/*
var el = document.querySelectorAll('.item');
var c = document.querySelector('#c');
var b = document.querySelector('#b');
var a = document.querySelector('#a');

var list = [];

elList = Array.prototype.slice.call(el);

elList.forEach(function(node){
  list.push(node);
  node.parentNode.removeChild(node)
});

var cols = [a,b,c];

var tempCount = 0;
list.forEach(function(node){
  if (tempCount > 2) {console.log('--'); tempCount=0;}
  console.log(node);
  cols[tempCount].appendChild(node);
  tempCount ++;
});
*/

tilesmith('#container').init({ 

});
