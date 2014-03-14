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
    var getStyle = function getStyle(el, prop) {
            return el.currentStyle ?
		   el.currentStyle : // IE
		   document.defaultView.getComputedStyle(el, "");
        }
      , slice = Function.prototype.call.bind(Array.prototype.slice)
      , fragment = document.createDocumentFragment

    // defaut prop
    var tilesmith = this

    var buildProps = function() {
        tilesmith.ctn      = document.querySelector(el)
        tilesmith.ctnWidth = parseInt(getStyle(tilesmith.ctn).width)
        tilesmith.list     = data ? data : slice(tilesmith.ctn.querySelectorAll('.item'))

        // create fake data
        var faker = document.createElement('div')
        faker.className = 'item hidden'
        document.body.appendChild(faker)
        var  elStyle = getStyle(faker)

        tilesmith.margin    = parseInt(elStyle.marginRight)
        tilesmith.colWidth  = parseInt(elStyle.width)
        tilesmith.colCount  = Math.floor(tilesmith.ctnWidth / tilesmith.colWidth)

        tilesmith.computeWidth = tilesmith.ctnWidth / tilesmith.colCount

        // remove faker
        document.body.removeChild(faker)
    }

    var colBuilder = function(prop) {

        var cols = []
        ;

        // create col DOM el
        var i =0
        for (; i<tilesmith.colCount; i++) {
        var div             = document.createElement('div')
            div.className   = 'tilesmith-col'
            div.style.width = tilesmith.computeWidth + 'px'
            div.style.float = 'left'
            cols.push(div)
        }

        // put nodes into columns
        var count = 0
        tilesmith.list.forEach(function(node){
            if (count > tilesmith.colCount - 1) {count=0;}
            cols[count].appendChild(node);
            count ++;
        })

        // put into dom
        tilesmith.ctn.innerHTML = null
        cols.forEach(function(col){
            tilesmith.ctn.appendChild(col)
        })
        /*
        */
    }

    function relocate() {
        var cols = document.querySelectorAll('.tilesmith-col')
          , cols = slice(cols)
          , tallest , shortest

        var tallestEl = cols.reduce(function(a,b){
            return ( getStyle(a).height > getStyle(b).height ? a : b )
        })
        var shortestEl = cols.reduce(function(a,b){
            return ( getStyle(a).height < getStyle(b).height ? a : b )
        })

        var tallest  = getStyle(tallestEl).height
          , shortest = getStyle(shortestEl).height

        console.log(tallest)
        console.log(shortest)
    }

    var init = function(props) {
        buildProps()
        colBuilder()
        relocate()
    }

    // onResize
    // rebuild props
    // if props condition 
        // change rebuild column
        // append nodes to column
        // append column
    var add = function(data, position) {}
    
    return {
        init : init
      , append  : add(data, 'append')
      , prepend : add(data, 'prepend')
    }

}

tilesmith('#container').init({ 

});

