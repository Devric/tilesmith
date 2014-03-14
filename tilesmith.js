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
    // helper methods
    var getStyle = window.getComputedStyle
      , slice = Function.prototype.call.bind(Array.prototype.slice)

    // defaut prop
    var tilesmith = this

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

    var buildProps = function() {
        tilesmith.ctn       = document.querySelector(el)
        tilesmith.list      = data ? data : slice(tilesmith.ctn.querySelectorAll('.item'))

        tilesmith.margin    = 0
        tilesmith.colWidth  = 0
        tilesmith.colCount  = 0
    }

    var colBuilder = function(prop) {
        
    }

    var init = function(props) {
        buildProps()
        console.log(tilesmith.list)

        var list = tilesmith.list[0]
        console.log(getStyle(list).height)
    }

    var add = function(data, position) {
        
    }
    
    return {
        init : init
      , append  : add(data, 'append')
      , prepend : add(data, 'prepend')
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
