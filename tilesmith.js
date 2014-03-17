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
    ;

    // defaut variables
    var tilesmith   = new function tilesmith() {return this}
      , resizeTimer = null
      , opts        = {
            width  : 0
          , margin : 0
          , lock   : false  // no col/item resizing
        }
    ;

    /**
     *  Build properties
     */
    var buildProps = function() {
        tilesmith.ctn      = document.querySelector(el)
        tilesmith.ctnWidth = parseInt(getStyle(tilesmith.ctn).width)
        tilesmith.list     = data ? data : slice(tilesmith.ctn.querySelectorAll('.item'))

        // create fake data
        var faker = document.createElement('div')
            faker.className = 'item hidden'
            tilesmith.ctn.appendChild(faker)
            var  elStyle = getStyle(faker)

        tilesmith.margin   = parseInt(elStyle.marginRight)
        tilesmith.colWidth = parseInt(elStyle.width)
        tilesmith.colCount = Math.floor(tilesmith.ctnWidth / tilesmith.colWidth)

        tilesmith.computeWidth    = tilesmith.ctnWidth / tilesmith.colCount
        tilesmith.computeColWidth = tilesmith.computeWidth - (tilesmith.margin * (tilesmith.colCount - 1) / tilesmith.colCount) + 'px'

        // remove faker
        tilesmith.ctn.removeChild(faker)
    }

    /**
     *  Build columns
     */
    var colBuilder = function(prop) {

        var cols = []
        ;

        // create col DOM el
        var i =0
        for (; i<tilesmith.colCount; i++) {
            var col             = document.createElement('div')
                col.className   = 'tilesmith-col'
                col.style.width = tilesmith.computeColWidth
                col.style.float = 'left'
                col.setAttribute('data-id', i)

                col.style.marginRight = tilesmith.margin + 'px'
                if (i === tilesmith.colCount - 1) { col.style.marginRight = 0 }
                cols.push(col)
        }

        // put nodes into columns
        var count = 0
        tilesmith.list.forEach(function(node){
            node.style.width = '100%'
            if (count > tilesmith.colCount - 1) {count=0;}
            cols[count].appendChild(node);
            count ++;
        })

        // put into dom
        tilesmith.ctn.innerHTML = null
        cols.forEach(function(col){
            tilesmith.ctn.appendChild(col)
        })
    }

    /**
     *  If no column changes adjust width
     */
    var colAdjust = function() {
        var cols = tilesmith.ctn.querySelectorAll('.tilesmith-col')

        slice(cols).forEach(function(col){
            col.style.width = tilesmith.computeColWidth
        })
        relocate()
    }

    /**
     *  Balance the tallest and shortest
     */
    function relocate() {
        var cols = document.querySelectorAll('.tilesmith-col')
          , cols = slice(cols)

        var shortestEl = cols.reduce(function(a,b){
            return ( parseInt(getStyle(a).height) < parseInt(getStyle(b).height) ? a : b )
        })
        var tallestEl = cols.reduce(function(a,b){
            return ( parseInt(getStyle(a).height) > parseInt(getStyle(b).height) ? a : b )
        })

        var tallest  = parseInt(getStyle(tallestEl).height)
          , shortest = parseInt(getStyle(shortestEl).height)
          , lastEl   = parseInt(getStyle(tallestEl.lastChild).height)

        if (( shortest + lastEl ) < tallest) {
            shortestEl.appendChild(tallestEl.lastChild)
            relocate()
        }
    }

    var resizing = function() {
        var oldColCount = tilesmith.colCount

        resizeTimer && clearTimeout(resizeTimer)
        resizeTimer = null
        buildProps()

        oldColCount !== tilesmith.colCount ? colBuilder() : colAdjust()

        relocate()

        oldColCount = null
    }

    var init = function(props) {
        buildProps(props)
        colBuilder()
        relocate()

        window.onresize = function(){
            resizeTimer && clearTimeout(resizeTimer)
            resizeTimer = setTimeout(resizing, 100)
        }
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

