
var MoveToElement = 0;
var LineToElement = 1;
var CurveToElement = 2;
var CurveToDataElement = 3;

//function Misc(){
    var Misc = {}
    Misc.Pen = function(c, w, s){
        this.color = 'black';
        this.width = 1.0;
        this.style = 'solid';

        this.toString = function(){
            return '[color:' + this.color + ', width:' + this.width + ', style:'+ this.style +']';
        }

        if(typeof(s)!=="undefined")
            this.style = s;
        if(typeof(w)!=="undefined")
            this.width = w;
        if(typeof(c)!=="undefined")
            this.color = c;

        this.isEqual = function(otherPen){
            if(this.color==otherPen.color &&
                this.style==otherPen.style &&
                this.width==otherPen.width) return true

            return false
        }
    }

    Misc.Brush = function(type){
        this.color = Static.NoBrush;
        if(typeof(type)!=="undefined" && typeof(type)=="string")
            this.color = type;

        this.toString = function(){
            return '[Brush: ' + this.color + ']'
        }

        this.isEqual = function(otherBrush){
            if(this.color==otherBrush.color ) return true
            return false
        }

    }

    Misc.Line = function(point1, point2){
        var m_p1 = point1;
        var m_p2 = point2
        this.p1 = function(){
            return m_p1
        }
        this.p2 = function(){
            return m_p2
        }
        this.x1 = function(){
            return m_p1.x
        }
        this.x2 = function(){
            return m_p2.x
        }
        this.y1 = function(){
            return m_p1.y
        }
        this.y2 = function(){
            return m_p2.y
        }

        this.length = function(){
            return Math.sqrt((m_p2.x-m_p1.x)**2 + (m_p2.y-m_p1.y)**2)
        }
        this.x2 = function(){
            return m_p2.x
        }

    }

    Misc.Size = function(w, h){
        this.width = 0.0;
        this.height = 0.0;
        if(typeof(h)!=="undefined"){
            this.width = w;
            this.height = h;
        }

        this.isValid = function(){
            if(this.width < 0 || this.height < 0)
                return false;
            return true;
        }

        this.isEqual = function(size){
            if((this.width == size.width) && (this.height == size.height))
                return true;
            return false;
        }
        
        /*Returns a size holding the maximum width and height of this size and the given otherSize.*/
        this.expandedTo = function(otherSize) {
            return new Misc.Size(Math.max(this.width, otherSize.width), Math.max(this.height, otherSize.height))
        }

        this.toString = function(){
            return '[' + this.width + ', ' + this.height  + ']'
        }
    }

    Misc.Point = function(x, y){
        this.x = 0.0;
        this.y = 0.0;
        if(typeof(y)!== "undefined"){
            this.y = y;
        }
        if(typeof(x)!== "undefined"){
            this.x = x;
        }

        this.toString = function(){
            return '(' + this.x + ', ' + this.y + ')'
        }

        this.isEqual = function(pt){
            return (this.x === pt.x && this.y === pt.y)
        }
    }

    Misc.Rect = function(param1, param2, param3, param4){
        var m_left = 0.0;
        var m_top = 0.0;
        var m_right = -1.0;
        var m_bottom = -1.0;
        var m_width = -1.0;
        var m_height = -1;
        if(typeof(param4)!=="undefined"){
            m_left = param1;
            m_top = param2;
            m_width = param3;
            m_height = param4;
            m_right = m_left + m_width;
            m_bottom = m_top + m_height;
        }
        else if(typeof(param3)!=="undefined"){
            m_left = param1.x;
            m_top = param1.y;
            m_width = param2;
            m_height = param3;
            m_right = m_left + m_width;
            m_bottom = m_top + m_height;
        }
        else if(typeof(param2)!=="undefined"){
            m_left = param1.x;
            m_top = param1.y;
            if(typeof(param2.x)!=="undefined"){
                m_right = param2.x;
                m_bottom = param2.y;
                m_width = m_right - m_left;
                m_height = m_bottom - m_top;
            }
            else{
                m_width = param2.width;
                m_height = param2.height;
                m_right = m_left + m_width;
                m_bottom = m_top + m_height;
            }
        }

        this.size = function(){
            return new Misc.Size(this.width(), this.height());
        }
        
        this.setSize = function(sz){
            this.setWidth(sz.width)
            this.setHeight(sz.height)
            //return new Misc.Size(this.width(), this.height());
        }

        this.setRect = function( x, y, width, height){
            m_left = x;
            m_top = y;
            m_width = width;
            m_height = height;
            m_right = m_left + m_width;
            m_bottom = m_top + m_height;
        }

        this.left = function(){
            return m_left;
        }
        //Sets the left edge of the rectangle to the given x coordinate.
        //May change the width, but will never change the right edge of the rectangle.
        this.setLeft = function(val){
            if(m_left === val)
                return;
            m_left = val
            m_width = m_right - m_left;
        }

        this.top = function(){
            return m_top;
        }
        //Sets the top edge of the rectangle to the given y coordinate.
        //May change the height, but will never change the bottom edge of the rectangle.
        this.setTop = function(val){
            if(m_top === val)
                return;
            m_top = val
            m_height = m_bottom - m_top;
        }

        this.right = function(){
            return m_right;
        }
        //Sets the right edge of the rectangle to the given x coordinate.
        //May change the width, but will never change the leftt edge of the rectangle.
        this.setRight = function(val){
            if(m_right === val)
                return;
            m_right = val
            m_width = m_right - m_left;
        }
        this.bottom = function(){
            return m_bottom;
        }
        //Sets the bottom edge of the rectangle to the given y coordinate.
        //May change the height, but will never change the top edge of the rectangle.
        this.setBottom = function(val){
            if(m_bottom === val)
                return;
            m_bottom = val
            m_height = m_bottom - m_top;
        }
        this.width = function(){
            return m_width;
        }
        //Sets the width of the rectangle to the given width.
        //The right edge is changed, but not the left one.
        this.setWidth = function(val){
            if(m_width === val)
                return;
            m_width = val;
            m_right = m_left + m_width;
        }

        this.height = function(){
            return m_height;
        }
        //Sets the height of the rectangle to the given height.
        //The bottom edge is changed, but not the top one.
        this.setHeight = function(val){
            if(m_height === val)
                return;
            m_height = val
            m_bottom = m_top + m_height

        }

        this.united = function(rect){
            return new Misc.Rect(Math.min(m_left, rect.left()),
                            Math.min(m_top, rect.top()),
                            Math.max(m_right, rect.right()) - Math.min(m_left, rect.left()),
                            Math.max(m_bottom, rect.bottom()) - Math.min(m_top, rect.top()))
        }

        this.normalized = function(){
            //normalize the rect.
            var rc = new Misc.Rect(m_left, m_top, m_width, m_height);
            if(rc.width() < 0){
                var temp = rc.right();
                rc.setRight(rc.left());
                rc.setLeft(temp);
            }
            if(m_height < 0){
                var temp = rc.bottom();
                rc.setBottom(rc.top());
                rc.setTop(temp);
            }
            return rc;
        }

        this.center = function(){
            return new Misc.Point(0.5*(m_left+m_right), 0.5*(m_top+m_bottom));
        }

        //Moves the rectangle, leaving the top-left corner at
        //the given position. The rectangle's size is unchanged.
        this.moveTopLeft = function(pt ){
            m_left = pt.x;
            m_top = pt.y;
            m_right = pt.x+m_width;
            m_bottom = pt.y+m_height;
        }

        this.moveBottomRight = function( pt ){
            m_right = pt.x;
            m_bottom = pt.y;
            m_left = pt.x-m_width
            m_top = pt.y-m_height;
        }

        this.moveCenter = function(pt ){
            m_right = pt.x + 0.5*m_width;
            m_bottom = pt.y+0.5*m_height;
            m_left = pt.x-0.5*m_width;
            m_top = pt.y-0.5*m_height;
        }

        //Returns true if this rectangle intersects with the given
        //rectangle (i.e., there is at least one pixel that is within both
        //rectangles), otherwise returns false.
        this.intersects = function(rect){
//            var bres = this.contains(rect.leftTop() ) || this.contains(rect.rightTop() ) ||
//                    this.contains(rect.leftBottom() ) || this.contains(rect.rightBottom() );
//            var bres1 = rect.contains(this.leftTop() ) || rect.contains(this.rightTop() ) ||
//                    rect.contains(this.leftBottom() ) || rect.contains(this.rightBottom() );
//            return bres || bres1;

            var xmin = Math.max(this.left(), rect.left());
            var xmax1 = this.left() + this.width();
            var xmax2 = rect.left() + rect.width();
            var xmax = Math.min(xmax1, xmax2);
            if (xmax > xmin) {
                var ymin = Math.max(this.top(), rect.top());
                var ymax1 = this.top() + this.height();
                var ymax2 = rect.top() + rect.height();
                var ymax = Math.min(ymax1, ymax2);
                if (ymax > ymin) {
                        return true;
                    }
             }
             return false;
        }

        //Returns a new rectangle with dx1, dy1, dx2 and dy2 added
        //respectively to the existing coordinates of this rectangle.
        this.adjusted = function(left, top, right, bottom ){
            var pt1 = new Misc.Point(m_left+left, m_top+top);
            var pt2 = new Misc.Point(m_right+right, m_bottom+bottom);
            return new Misc.Rect(pt1, pt2);
        }
        //Returns true if the given point is inside or on the edge of the rectangle, otherwise
        //returns false. If proper is true, this function only returns true if the given point is
        //inside the rectangle (i.e., not on the edge).
        this.contains = function(pt, proper){
            if(typeof(proper)==="undefined" || proper===true)
                return pt.x > this.left() && pt.y > this.top() && pt.x < this.right() && pt.y < this.bottom();
            else
                return pt.x >= this.left() && pt.y >= this.top() && pt.x <= this.right() && pt.y <= this.bottom();
        }

        this.isEqual = function(other) {
            //console.log(r1)
            return this.left() == other.left() && this.right() == other.right() && 
              this.top() == other.top() && this.bottom() == other.bottom();
        }

        this.leftTop = function(){
            return new Misc.Point(m_left, m_top);
        }

        this.topLeft = function(){
            return this.leftTop();
        }

        this.rightTop = function(){
            return new Misc.Point(m_right, m_top);
        }

        this.leftBottom = function(){
            return new Misc.Point(m_left, m_bottom);
        }

        this.rightBottom = function(){
            return new Misc.Point(m_right, m_bottom);
        }

        this.bottomRight = function(){
            return this.rightBottom();
        }

        this.toString = function(){
            return '[' + m_left + ', ' + m_top + ', ' + m_width + ', ' + m_height + ']'
        }
    }

    Misc.Font = function(th, name, style, weight, color){
        if(typeof(th)=='object'){
            this.th = th.th;
            this.name = th.name
            this.style = th.style; //normal italic or oblique
            this.weight = th.weight; //normal lighter or bold or 100, 200, ...900
            this.fontColor = th.fontColor;
        }else{
            this.th = 12;
            this.name = "Arial";
            this.style = "normal"; //normal italic or oblique
            this.weight = "normal"; //normal lighter or bold or 100, 200, ...900
            this.fontColor = "black";
        }
        if(typeof(th)!='object'){
            if(typeof(color)!=="undefined")
                this.fontColor = color;
            if(typeof(weight)!=="undefined")
                this.weight = weight;
            if(typeof(style)!=="undefined")
                this.style = style;
            if(typeof(name)!=="undefined")
                this.name = name;
            if(typeof(th)!=="undefined")
                this.th = th;
        }

        this.textSize = function (str){
            if(str=="" || typeof(str)=="undefined")
                return new Misc.Size(0, 0);
            var canvas = $('<canvas />')
            var context = canvas[0].getContext("2d");
            //context.save()
            context.font = this.weight + " " + this.style + " " + this.th + "px " + this.name;
            
            var w = context.measureText(str).width * 1.16;
            var h = context.measureText("M").width;
            //var w = str.width('this.weight + " " + this.style + " " + this.th + "px " + this.name')
            //context.restore()
            canvas.remove()
            return new Misc.Size(w, h);
        }

        this.toString = function(){
            return '[th:' + this.th + ', name:' + this.name + ', style:'+ this.style + ', weight:'+ this.weight + ', color:'+ this.fontColor + ']';
        }
    }



    Misc.MPath = function(){
        var MPathElement = function(elementType, xVal, yVal){
            this.type = MoveToElement;
            this.x = 0.0;
            this.y = 0.0;            
            if(typeof(xVal)!=="undefined")
                this.x = xVal;
            if(typeof(yVal)!=="undefined")
                this.y = yVal;
            if(typeof(elementType)!=="undefined")
                this.type = elementType;
            this.toString = function(){
                return '[MPathElement: type(' + this.type + '), point'+ new Misc.Point(this.x, this.y) + ']';
            }
        }

        var m_elements = [];
        this.data = {};//useful for passing any data in path


        this.elementCount = function(){
            return m_elements.length;
        }

        this.elementAt = function(index){
            if(index < 0 || index >= m_elements.length)
                return null;
            return m_elements[index];
        }

        this.moveTo = function( x, y ){
            m_elements.push(new MPathElement(MoveToElement, x, y))
        }

        this.lineTo = function( x, y ){
            m_elements.push(new MPathElement(LineToElement, x, y))
        }

        this.cubicTo = function( x, y, x1, y1, x2, y2 ){
            m_elements.push(new MPathElement(CurveToElement, x, y))
            m_elements.push(new MPathElement(CurveToElement, x1, y1))
            m_elements.push(new MPathElement(CurveToElement, x2, y2))
        }

        this.toString = function(){
            var s = '[MPath: elementCount = '+ m_elements.length +']';
            return s;
        }

        this.isEmpty = function(){
            return m_elements.length == 0 ? true : false;
        }

        this.addRect = function(rect){
            m_elements.push(new MPathElement(MoveToElement, rect.left(), rect.top()));
            m_elements.push(new MPathElement(LineToElement, rect.right(), rect.top()));
            m_elements.push(new MPathElement(LineToElement, rect.right(), rect.bottom()));
            m_elements.push(new MPathElement(LineToElement, rect.left(), rect.bottom()));
            m_elements.push(new MPathElement(LineToElement, rect.left(), rect.top()));
        }

        this.addPolygon = function(polygon){
            m_elements.push(new MPathElement(MoveToElement, polygon[0].x, polygon[0].y));
            for(var i = 1; i<polygon.length; ++i){
                m_elements.push(new MPathElement(LineToElement, polygon[i].x, polygon[i].y));
            }
        }


        this.boundingRect = function(){
            var pts = [];

            var left = 0;
            var top = 0;
            var right = 0;
            var bottom = 0;
            var firstPass = false;

            for ( var i = 0; i < m_elements.length; i++ )
            {
                var element = m_elements[i];

                switch( element.type )
                {
                    case LineToElement:
                    case MoveToElement:
                    case CurveToElement:
                    {
                        if(!firstPass){
                            left = element.x;
                            top = element.y;
                            right = element.x;
                            bottom = element.y;
                            firstPass = true;
                        }
                        left = Math.min(left, element.x);
                        right = Math.max(right, element.x);
                        top = Math.min(top, element.y);
                        bottom = Math.max(bottom, element.y);
                        break;
                    }
                    case CurveToDataElement:
                    {
                        break;
                    }
                }
            }
            return new Misc.Rect(left, top, right-left, bottom-top);
        }
    }
//}
//Misc()











;
define("miscObjects", function(){});

/**
* @license
*
* Regression.JS - Regression functions for javascript
* http://tom-alexander.github.com/regression-js/
*
* copyright(c) 2013 Tom Alexander
* Licensed under the MIT license.
*
* @module regression - Least-squares regression functions for JavaScript
**/

/* global define */
(function _umd(global, factory) {
  var returned;
  // UMD Format for exports. Works with all module systems: AMD/RequireJS, CommonJS, and global
  // AMD
  if (typeof define === 'function' && define.amd) {
    returned = define('regression', factory);
  } else if (typeof module !== 'undefined') {
    returned = module.exports = factory();
  } else {
    returned = global.regression = factory();
  }
  return returned;
})(this, function _regressionUmdFactory() {
  'use strict';
  var exports;

  /**
   * Determine the coefficient of determination (r^2) of a fit from the observations and predictions.
   *
   * @param {Array<Array<number>>} observations - Pairs of observed x-y values
   * @param {Array<Array<number>>} predictions - Pairs of observed predicted x-y values
   *
   * @return {number} - The r^2 value, or NaN if one cannot be calculated.
   */
  function determinationCoefficient(observations, predictions) {
    var sum = observations.reduce(function (accum, observation) { return accum + observation[1]; }, 0);
    var mean = sum / observations.length;

    // Sum of squares of differences from the mean in the dependent variable
    var ssyy = observations.reduce(function (accum, observation) {
      var diff = observation[1] - mean;
      return accum + diff * diff;
    }, 0);

    // Sum of squares of resudulals
    var sse = observations.reduce(function (accum, observation, ix) {
      var prediction = predictions[ix];
      var resid = observation[1] - prediction[1];
      return accum + resid * resid;
    }, 0);

    // If ssyy is zero, r^2 is meaningless, so NaN is an appropriate answer.
    return 1 - (sse / ssyy);
  }

  /**
   * Determine the solution of a system of linear equations A * x = b using Gaussian elimination.
   *
   * @param {Array<Array<number>>} matrix - A 2-d matrix of data in row-major form [ A | b ]
   * @param {number} order - How many degrees to solve for
   *
   * @return {Array<number>} - Vector of normalized solution coefficients matrix (x)
   */
  function gaussianElimination(matrix, order) {
    var i = 0;
    var j = 0;
    var k = 0;
    var maxrow = 0;
    var tmp = 0;
    var n = matrix.length - 1;
    var coefficients = new Array(order);

    for (i = 0; i < n; i++) {
      maxrow = i;
      for (j = i + 1; j < n; j++) {
        if (Math.abs(matrix[i][j]) > Math.abs(matrix[i][maxrow])) {
          maxrow = j;
        }
      }

      for (k = i; k < n + 1; k++) {
        tmp = matrix[k][i];
        matrix[k][i] = matrix[k][maxrow];
        matrix[k][maxrow] = tmp;
      }

      for (j = i + 1; j < n; j++) {
        for (k = n; k >= i; k--) {
          matrix[k][j] -= matrix[k][i] * matrix[i][j] / matrix[i][i];
        }
      }
    }

    for (j = n - 1; j >= 0; j--) {
      tmp = 0;
      for (k = j + 1; k < n; k++) {
        tmp += matrix[k][j] * coefficients[k];
      }

      coefficients[j] = (matrix[n][j] - tmp) / matrix[j][j];
    }

    return coefficients;
  }

  /** Precision to use when displaying string form of equation */
  var _DEFAULT_PRECISION = 2;

  /**
   * Round a number to a precision, specificed in number of decimal places
   *
   * @param {number} number - The number to round
   * @param {number} precision - The number of decimal places to round to:
   *                             > 0 means decimals, < 0 means powers of 10
   *
   *
   * @return {numbr} - The number, rounded
   */
  function _round(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  /**
   * The set of all fitting methods
   *
   * @namespace
   */
  var methods = {
    linear: function (data, _order, options) {
      var sum = [0, 0, 0, 0, 0];
      var results;
      var gradient;
      var intercept;
      var len = data.length;

      for (var n = 0; n < len; n++) {
        if (data[n][1] !== null) {
          sum[0] += data[n][0];
          sum[1] += data[n][1];
          sum[2] += data[n][0] * data[n][0];
          sum[3] += data[n][0] * data[n][1];
          sum[4] += data[n][1] * data[n][1];
        }
      }

      gradient = (len * sum[3] - sum[0] * sum[1]) / (len  * sum[2] - sum[0] * sum[0]);
      intercept = (sum[1] / len) - (gradient * sum[0]) / len;

      results = data.map(function (xyPair) {
        var x = xyPair[0];
        return [x, gradient * x + intercept];
      });

      return {
        r2: determinationCoefficient(data, results),
        equation: [gradient, intercept],
        points: results,
        string: 'y = ' + _round(gradient, options.precision) + 'x + ' + _round(intercept, options.precision),
      };
    },

    linearthroughorigin: function (data, _order, options) {
      var sum = [0, 0];
      var gradient;
      var results;

      for (var n = 0; n < data.length; n++) {
        if (data[n][1] !== null) {
          sum[0] += data[n][0] * data[n][0]; // sumSqX
          sum[1] += data[n][0] * data[n][1]; // sumXY
        }
      }

      gradient = sum[1] / sum[0];

      results = data.map(function (xyPair) {
        var x = xyPair[0];
        return [x, gradient * x];
      });

      return {
        r2: determinationCoefficient(data, results),
        equation: [gradient],
        points: results,
        string: 'y = ' + _round(gradient, options.precision) + 'x',
      };
    },

    exponential: function (data, _order, options) {
      var sum = [0, 0, 0, 0, 0, 0];
      var denominator;
      var coeffA;
      var coeffB;
      var results;

      for (var n = 0; n < data.length; n++) {
        if (data[n][1] !== null) {
          sum[0] += data[n][0];
          sum[1] += data[n][1];
          sum[2] += data[n][0] * data[n][0] * data[n][1];
          sum[3] += data[n][1] * Math.log(data[n][1]);
          sum[4] += data[n][0] * data[n][1] * Math.log(data[n][1]);
          sum[5] += data[n][0] * data[n][1];
        }
      }

      denominator = (sum[1] * sum[2] - sum[5] * sum[5]);
      coeffA = Math.exp((sum[2] * sum[3] - sum[5] * sum[4]) / denominator);
      coeffB = (sum[1] * sum[4] - sum[5] * sum[3]) / denominator;

      results = data.map(function (xyPair) {
        var x = xyPair[0];
        return [x, coeffA * Math.exp(coeffB * x)];
      });

      return {
        r2: determinationCoefficient(data, results),
        equation: [coeffA, coeffB],
        points: results,
        string: 'y = ' + _round(coeffA, options.precision) + 'e^(' + _round(coeffB, options.precision) + 'x)',
      };
    },

    logarithmic: function (data, _order, options) {
      var sum = [0, 0, 0, 0];
      var coeffA;
      var coeffB;
      var results;
      var len = data.length;

      for (var n = 0; n < len; n++) {
        if (data[n][1] !== null) {
          sum[0] += Math.log(data[n][0]);
          sum[1] += data[n][1] * Math.log(data[n][0]);
          sum[2] += data[n][1];
          sum[3] += Math.pow(Math.log(data[n][0]), 2);
        }
      }

      coeffB = (len * sum[1] - sum[2] * sum[0]) / (len * sum[3] - sum[0] * sum[0]);
      coeffA = (sum[2] - coeffB * sum[0]) / len;

      results = data.map(function (xyPair) {
        var x = xyPair[0];
        return [x, coeffA + coeffB * Math.log(x)];
      });

      return {
        r2: determinationCoefficient(data, results),
        equation: [coeffA, coeffB],
        points: results,
        string: 'y = ' + _round(coeffA, options.precision) + ' + ' + _round(coeffB, options.precision) + ' ln(x)',
      };
    },

    power: function (data, _order, options) {
      var sum = [0, 0, 0, 0];
      var coeffA;
      var coeffB;
      var results;
      var len = data.length;

      for (var n = 0; n < len; n++) {
        if (data[n][1] !== null) {
          sum[0] += Math.log(data[n][0]);
          sum[1] += Math.log(data[n][1]) * Math.log(data[n][0]);
          sum[2] += Math.log(data[n][1]);
          sum[3] += Math.pow(Math.log(data[n][0]), 2);
        }
      }

      coeffB = (len * sum[1] - sum[2] * sum[0]) / (len * sum[3] - sum[0] * sum[0]);
      coeffA = Math.exp((sum[2] - coeffB * sum[0]) / len);

      results = data.map(function (xyPair) {
        var x = xyPair[0];
        return [x, coeffA * Math.pow(x, coeffB)];
      });

      return {
        r2: determinationCoefficient(data, results),
        equation: [coeffA, coeffB],
        points: results,
        string: 'y = ' + _round(coeffA, options.precision) + 'x^' + _round(coeffB, options.precision),
      };
    },

    polynomial: function (data, order, options) {
      var lhs = [];
      var rhs = [];
      var a = 0;
      var b = 0;
      var c;
      var k;

      var i;
      var j;
      var l;
      var len = data.length;

      var results;
      var equation;
      var string;

      if (typeof order === 'undefined') {
        k = 3;
      } else {
        k = order + 1;
      }

      for (i = 0; i < k; i++) {
        for (l = 0; l < len; l++) {
          if (data[l][1] !== null) {
            a += Math.pow(data[l][0], i) * data[l][1];
          }
        }

        lhs.push(a);
        a = 0;

        c = [];
        for (j = 0; j < k; j++) {
          for (l = 0; l < len; l++) {
            if (data[l][1] !== null) {
              b += Math.pow(data[l][0], i + j);
            }
          }
          c.push(b);
          b = 0;
        }
        rhs.push(c);
      }
      rhs.push(lhs);

      equation = gaussianElimination(rhs, k);

      results = data.map(function (xyPair) {
        var x = xyPair[0];

        var answer = equation.reduce(function (sum, coeff, power) {
          return sum + coeff * Math.pow(x, power);
        }, 0);

        return [x, answer];
      });

      string = 'y = ';
      for (i = equation.length - 1; i >= 0; i--) {
        if (i > 1) {
          string += _round(equation[i], options.precision)  + 'x^' + i + ' + ';
        } else if (i === 1) {
          string += _round(equation[i], options.precision) + 'x' + ' + ';
        } else {
          string += _round(equation[i], options.precision);
        }
      }

      return {
        r2: determinationCoefficient(data, results),
        equation: equation,
        points: results,
        string: string,
      };
    },

    lastvalue: function (data, _order, options) {
      var results = [];
      var lastvalue = null;

      for (var i = 0; i < data.length; i++) {
        if (data[i][1] !== null && isFinite(data[i][1])) {
          lastvalue = data[i][1];
          results.push([data[i][0], data[i][1]]);
        } else {
          results.push([data[i][0], lastvalue]);
        }
      }

      return {
        r2: determinationCoefficient(data, results),
        equation: [lastvalue],
        points: results,
        string: '' + _round(lastvalue, options.precision),
      };
    },
  };

  exports = function regression(method, data, order, options) {
    var methodOptions = (
      ((typeof order === 'object') && (typeof options === 'undefined'))
        ? order
        : options || {}
    );

    if (!methodOptions.precision) {
      methodOptions.precision = _DEFAULT_PRECISION;
    }

    if (typeof method === 'string') {
      return methods[method.toLowerCase()](data, order, methodOptions);
    }
    return null;
  };

  

  // Since we are redefining the "exports" object to a new function, we must return it here.
  return exports;
});


var Static = {};


Function.prototype.inheritsFrom = function (ParentClassOrObject) {
	if (ParentClassOrObject.constructor === Function) { //Normal Inheritance
		this.prototype = new ParentClassOrObject();
		this.prototype.constructor = this;
		this.prototype.parent = ParentClassOrObject.prototype;
	} else { //Pure Virtual Inheritance
		this.prototype = ParentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = ParentClassOrObject;
	}
	return this;
}

Static.qBound = function(min, val, max){
     return Math.max(min, Math.min(val, max));
}

Static.linearEquationFromPoints = function(p1, p2){
                //f(x) = mx+c 
                //m = (y2 - y1)/(x2 - x1)
                //when x = 0, f(x) = c
                //(y-y1)/(x-x1) = m
                //(y-y1) = m(x-x1)
                //(y-y1) = mx-mx1
                //y = mx-mx1 +y1
                
                var m = (p2.y - p1.y)/(p2.x - p1.x)
                var c = -m*p1.x +p1.y //m*p2.x;
                var fn = m.toString()
                fn += "x+"
                fn += c.toString()
                return fn
            }


Array.prototype.resize = function(newSize) {
    var self = this
    self = []
    while(newSize > self.length)
        self.push(undefined);
    //self.length = newSize;
}

Static.Rtti_PlotItem = 0; //Unspecific value, that can be used, when it doesn't matter.
Static.Rtti_PlotGrid = 1; //For QwtPlotGrid.
Static.Rtti_PlotScale = 2; //For QwtPlotScaleItem.
Static.Rtti_PlotLegend = 3; //For QwtPlotLegendItem.
Static.Rtti_PlotMarker = 4; //For QwtPlotMarker.
Static.Rtti_PlotCurve = 5; //For QwtPlotCurve.
Static.Rtti_PlotSpectroCurve = 6; //For QwtPlotSpectroCurve.
Static.Rtti_PlotIntervalCurve = 7; //For QwtPlotIntervalCurve.
Static.Rtti_PlotHistogram = 8; //For QwtPlotHistogram.
Static.Rtti_PlotSpectrogram = 9; //For QwtPlotSpectrogram.
Static.Rtti_PlotSVG = 10; //For QwtPlotSvgItem.
Static.Rtti_PlotTradingCurve = 11; //For QwtPlotTradingCurve.
Static.Rtti_PlotBarChart = 12; //For QwtPlotBarChart.
Static.Rtti_PlotMultiBarChart = 13; //For QwtPlotMultiBarChart.
Static.Rtti_PlotShape = 14; //For QwtPlotShapeItem.
Static.Rtti_PlotTextLabel = 15; //For QwtPlotTextLabel.
Static.Rtti_PlotZone = 16; //For QwtPlotZoneItem.
Static.Rtti_PlotUserItem = 1000; //Values >= Rtti_PlotUserItem are reserved for plot items not implemented in the Qwt library.

Static.MagnifierEnabled = 1
Static.ZoomEnabled = 2
Static.PanEnabled = 4
Static.Locked = 8
Static.LeftButtonDown = 16
Static.DragCursor = 32
Static.PanningInProgress = 64
Static.MagnifierSearch = 128
Static.ZoomerSearch = 256
Static.PannerSearch = 512
Static.NoRuler = 1024

/*Static.MagnifierEnabled = 0x1
Static.ZoomEnabled = 0x2
Static.PanEnabled = 0x4
Static.Locked = 0x8
Static.LeftButtonDown = 0x10
Static.DragCursor = 0x20
Static.PanningInProgress = 0x40
Static.MagnifierSearch = 0x80
Static.ZoomerSearch = 0x100
Static.PannerSearch = 0x200
Static.NoRuler = 0x400 */
Static.Left = 0 
Static.Right = 1
Static.Bottom = 2
Static.Top = 3
Static.LeftAndRight = 0x12800 
Static.BottomAndTop = 0x25600

Static.NoTrackingText = 0
Static.FullTrackingText = 1
Static.PartialTrackingText = 2

//! Mode defining how a legend entry interacts

//! The legend item is not interactive, like a label
Static.ReadOnly = 0;

//! The legend item is clickable, like a push button
Static.Clickable = 1;

//! The legend item is checkable, like a checkable button
Static.Checkable = 2;

//! Identifier how to interprete a QVariant

// The value is a Mode
Static.ModeRole = 0,

// The value is a title
Static.TitleRole = 1,

// The value is an icon
Static.IconRole = 2,

// Values < UserRole are reserved for internal use
Static.UserRole = 32;

//! No rubberband.
Static.NoRubberBand = 0;

//! A horizontal line ( only for QwtPickerMachine::PointSelection )
Static.HLineRubberBand = 1;

//! A vertical line ( only for QwtPickerMachine::PointSelection )
Static.VLineRubberBand = 2;

//! A crosshair ( only for QwtPickerMachine::PointSelection )
Static.CrossRubberBand = 3;

//! A rectangle ( only for QwtPickerMachine::RectSelection )
Static.RectRubberBand = 4;

//! An ellipse ( only for QwtPickerMachine::RectSelection )
Static.EllipseRubberBand = 5;

//! A polygon ( only for QwtPickerMachine::PolygonSelection )
Static.PolygonRubberBand = 6;

/*!
Values >= UserRubberBand can be used to define additional
rubber bands.
 */
Static.UserRubberBand = 100;

//! The state machine not usable for any type of selection.
Static.NoSelection = -1;

//! The state machine is for selecting a single point.
Static.PointSelection = 0;

//! The state machine is for selecting a rectangle (2 points).
Static.RectSelection = 1;

//! The state machine is for selecting a polygon (many points).
Static.PolygonSelection = 2;

//! Display never
Static.AlwaysOff = 0;

//! Display always
Static.AlwaysOn = 1;

//! Display only when the selection is active
Static.ActiveOnly = 2;

//var NoPen = -1;
//var NoBrush = -1;

Static.NoPen = "noPen";
Static.NoBrush = "noBrush";

var _eps = 1.0e-6; //
var NoTick = -1;
var MinorTick = 0;
var MediumTick = 1;
var MajorTick = 2;
var NTickTypes = 3;

//! The scale is below
var BottomScale = 0;
//! The scale is above
var TopScale = 1;
//! The scale is left
var LeftScale = 2;
//! The scale is right
var RightScale = 3;

var Horizontal = 1;
var Vertical = 2;

//! Backbone = the line where the ticks are located
var Backbone = 0x01;
//! Ticks
var Ticks = 0x02;
//! Labels
var Labels = 0x04;

var ScaleInterest = 0x01;

//Interval flags
var IncludeBorders = 0x00;
// Min value is not included in the interval
var ExcludeMinimum = 0x01;
// Max value is not included in the interval
var ExcludeMaximum = 0x02;
// Min/Max values are not included in the interval
var ExcludeBorders = 0x03;

//Y axis left of the canvas
var yLeft = 0;
//Y axis right of the canvas
var yRight = 1;
// X axis below the canvas
var xBottom = 2;
// X axis above the canvas
var xTop = 3;
// Number of axes
var axisCnt = 4;

//! The item is represented on the legend.
var Legend = 0x01;

/*!
The boundingRect() of the item is included in the
autoscaling calculation as long as its width or height
is >= 0.0.
 */
var AutoScale = 0x02;

/*!
The item needs extra space to display something outside
its bounding rectangle.
\sa getCanvasMarginHint()
 */
var Margins = 0x04;

/*!
Don't draw a curve. Note: This doesn't affect the symbols.
 */
var NoCurve = -1;

/*!
Connect the points with straight lines. The lines might
be interpolated depending on the 'Fitted' attribute. Curve
fitting can be configured using setCurveFitter().
 */
var Lines = 0;

/*!
Draw vertical or horizontal sticks ( depending on the
orientation() ) from a baseline which is defined by setBaseline().
 */
var Sticks = 1;

/*!
Connect the points with a step function. The step function
is drawn from the left to the right or vice versa,
depending on the QwtPlotCurve::Inverted attribute.
 */
var Steps = 2;

/*!
Draw dots at the locations of the data points. Note:
This is different from a dotted line (see setPen()), and faster
as a curve in QwtPlotCurve::NoStyle style and a symbol
painting a point.
 */
var Dots = 3;

/*!
Styles >= QwtPlotCurve::UserCurve are reserved for derived
classes of QwtPlotCurve that overload drawCurve() with
additional application specific curve types.
 */
var UserCurve = 100;

/*!
For QwtPlotCurve::Steps only.
Draws a step function from the right to the left.
 */
var Inverted = 0x01;

/*!
Only in combination with QwtPlotCurve::Lines
A QwtCurveFitter tries to
interpolate/smooth the curve, before it is painted.

\note Curve fitting requires temporary memory
for calculating coefficients and additional points.
If painting in QwtPlotCurve::Fitted mode is slow it might be better
to fit the points, before they are passed to QwtPlotCurve.
 */
var Fitted = 0x02;

//! Round points to integer values
var RoundPoints = 0x01;

/*!
Try to remove points, that are translated to the
same position.
 */
var WeedOutPoints = 0x02;

/*!
Tries to reduce the data that has to be painted, by sorting out
duplicates, or paintings outside the visible area. Might have a
notable impact on curves with many close points.
Only a couple of very basic filtering algorithms are implemented.
 */
var FilterPoints = 0x01;

/*!
Minimize memory usage that is temporarily needed for the
translated points, before they get painted.
This might slow down the performance of painting
 */
var MinimizeMemory = 0x02;

/*!
Line styles.
\sa setLineStyle(), lineStyle()
 */
//enum LineStyle
//{
//! No line
var NoLine = 0;

//! A horizontal line
//var HLine = 1;


//! A vertical line
//var VLine = 2;

//! A crosshair
//var Cross = 3;
//};


//! No Style. The symbol cannot be drawn.
var NoSymbol = -1;

//! Ellipse or circle
var Ellipse = 0;

//! Rectangle
var MRect = 2;

//!  Diamond
var Diamond = 3;

//! Triangle pointing upwards
var Triangle = 4;

//! Triangle pointing downwards
var DTriangle = 5;

//! Triangle pointing upwards
var UTriangle = 6;

//! Triangle pointing left
var LTriangle = 7;

//! Triangle pointing right
var RTriangle = 8;

//! Cross (+)
var Cross = 9;

//! Diagonal cross (X)
var XCross = 10;

//! Horizontal line
var HLine = 11;

//! Vertical line
var VLine = 12;

//! X combined with +
var Star1 = 13;

//! Six-pointed star
var Star2 = 14;

//! Hexagon
var Hexagon = 15;

/*!
The symbol is represented by a painter path, where the
origin ( 0, 0 ) of the path coordinate system is mapped to
the position of the symbol.

\sa setPath(), path()
 */
var Path = 16;

/*!
The symbol is represented by a pixmap. The pixmap is centered
or aligned to its pin point.

\sa setPinPoint()
 */
var Pixmap = 17;

/*!
The symbol is represented by a graphic. The graphic is centered
or aligned to its pin point.

\sa setPinPoint()
 */
var MGraphic = 18;

/*!
The symbol is represented by a SVG graphic. The graphic is centered
or aligned to its pin point.

\sa setPinPoint()
 */
var SvgDocument = 19;

/*!
Styles >= QwtSymbol::UserSymbol are reserved for derived
classes of QwtSymbol that overload drawSymbols() with
additional application specific symbol types.
 */
var UserStyle = 1000



Static.NoButton = -1;
Static.LeftButton = 0;
Static.MiddleButton = 1;
Static.MidButton = 1;
Static.RightButton = 2;

//Static.NoModifier = 0;

Static.Key_Escape = 27 //0x01000000;
Static.Key_Plus = 107 //0x02000000;
Static.Key_Minus = 109 //0x03000000;
Static.Key_Ctrl = 17
Static.Key_Shift = 16
Static.Key_Return = 13
Static.Key_Space = 32

Static.Key_Left = 37
Static.Key_Right = 39
Static.Key_Up = 38
Static.Key_Down = 40

Static.Key_Undo = 90
Static.Key_Redo = 89
Static.Key_Home = 36

Static.Key_unknown = -1



//Static.ControlModifier = 17
//Static.ShiftModifier = 16
//Static.AltModifier = 18

Static.NoModifier = 0x00000000  //No modifier key is pressed.
Static.ShiftModifier = 0x02000000  //A Shift key on the keyboard is pressed.
Static.ControlModifier = 0x04000000  //A Ctrl key on the keyboard is pressed.
Static.AltModifier = 0x08000000  //An Alt key on the keyboard is pressed.


Static.AlignRight = 1;
Static.AlignLeft = 2;
Static.AlignBottom = 4;
Static.AlignTop = 8;
Static.AlignCenter = 16;

var RGB = 0
var INDEXED = 1
var ScaledColors = 0
var FixedColors = 1

Static.adjustForDecimalPlaces = function(number, places = 5) {
	var multiplier = Math.pow(10, places);
	return Math.round(number * multiplier) / multiplier;
}

Static.mFuzzyCompare = function(a, b) {
	var diff = Math.abs(a - b);
	if (diff < _eps) {
		return true;
	}
	return false;
}

Static.m3FuzzyCompare = function(value1, value2, intervalSize) {
	var eps = Math.abs(1.0e-6 * intervalSize);

	if (value2 - value1 > eps)
		return -1;

	if (value1 - value2 > eps)
		return 1;

	return 0;
}

/*
    example of passing data
    Static.trigger('myTest', [45, 50])

    Static.bind('myTest', function(e, data1, data2){
        console.log(data1+data2)
    })

*/

Static.bind = function(sig, data, cb){
	$(window).bind(sig, data, cb)
}

Static.trigger = function(sig, param) {
	$(window).trigger(sig, param)
}



Static.invert = function(rgb) {
	rgb = [].slice.call(arguments).join(",").replace(/rgb\(|\)|rgba\(|\)|\s/gi, '').split(',');
	for (var i = 0; i < rgb.length; i++)
		rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
	return "rgb(" + rgb.join(", ") + ")";
}

Static.RGB2HTML = function(red, green, blue)
{
    if(typeof(red)=="string"){
        var str = red
        //console.log(red)
        str = str.replace("rgb(", '')
        red = parseInt(str)
        str = str.replace(',', '')
        str = str.replace(red, '')
        green = parseInt(str)
        str = str.replace(',', '')
        str = str.replace(green, '')
        blue = parseInt(str)        
    }
	if(red.r !== undefined){
		var temp = red
		red = red.r
		green = temp.g
		blue = temp.b
	}
    var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    return '#'+decColor.toString(16).substr(1);
}

Static.HTMLToRGB = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

Static.mRgb = function(red, green, blue){
   return {r:red, g:green, b:blue}
}

Static.colorNameToHex = function(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if(colour[0]=='#')
        return colour;

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return "#000000";
}


Static.sqr = function(value){
   return Math.pow(value, 2)
}

Static.setElementIndex = function (element, index) {
            var Children = $(element).parent().children();
            var target = Children[index];

            if ($(element).index() > index) {
                if (target == null) {
                    target = Children[0];
                }
                if (target != element && target != null) {
                    $(target).before(element);
                }
            } else {
                if (target == null) {
                    target = Children[Children.length - 1];
                }
                if (target != element && target != null) {
                    $(target).after(element);
                }

            }
        }


Static.elementsFromPoint = function(x, y, elem) {
				var until = elem[0];

				var parents = [];
				var current;

				do {
					current = document.elementFromPoint(x, y);
					if (current !== until) {
						//console.log("current",current);
						parents.push(current);
						current.style.pointerEvents = 'none';
					} else {
						current = false;
					}
				} while (current);

				parents.forEach(function (parent) {
					return parent.style.pointerEvents = 'all';
				});
				return $(parents);
			}

Static.stopkeyPressPropagation = function(element){
    element.keydown(function (event) { 
        event.stopPropagation();        
    });
}


//var mediaQueryList = window.matchMedia('print');
window.matchMedia('print').addListener(function(mql) {
    if (mql.matches) {
        Static.trigger('beforePrint');        
    } else {
        Static.trigger('afterPrint');
    }
})

window.onbeforeprint = function(mql) {
    
    Static.trigger('beforePrint');    
}

window.onafterprint = function(mql) {    
        Static.trigger('afterPrint');    
}

Static.Cancel = 0
Static.No = 1
Static.Yes = 2


Static.alertDlg = function(){
var dlg =  $('<div class="modal fade" id="alert_Modal" role="dialog">\
    <div id="dlg" class="modal-dialog">\
      <!-- Modal content-->\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4 class="modal-title"><b>Alert</b></h4>\
        </div>\
        <div class="modal-body">\
          <p id="msg"></p>\
        </div>\
        <div id="alertDlgFooter1" class="modal-footer">\
          <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>\
        </div>\
        <div id="alertDlgFooter2" class="modal-footer">\
          <button id="yes" type="button" class="btn btn-default">Yes</button>\
          <button id="no" type="button" class="btn btn-default">No</button>\
          <button id="cancel" type="button" class="btn btn-default">Cancel</button>\
        </div>\
      </div>\
    </div>\
  </div>')

 //console.log(dlg)
 $("body").append(dlg);

 dlg.css('z-index', 1000000000)//ensure dialog is not covered

 this.alert = function(msg, type){
        $("#alertDlgFooter2").hide()
        $("#alertDlgFooter1").show()
                $("#msg").text(msg)
                if(type == "small"){
                    $("#dlg").addClass("modal-sm")
                }else{
                    $("#dlg").removeClass("modal-sm")
                }
                dlg.modal({backdrop: "static"});
                //dlg.modal();
            }

var self = this


this.alertYesNo = function(msg, cb, type){
        $(".close").hide()
        this.alertYesCb = cb
        $("#alertDlgFooter1").hide()
        $("#alertDlgFooter2").show()
                $("#msg").text(msg)
                if(type == "small"){
                    $("#dlg").addClass("modal-sm")
                }else{
                    $("#dlg").removeClass("modal-sm")
                }
                dlg.modal({backdrop: "static"});
                //dlg.modal();
            }

        $("#yes").click(function(){
            $(".close").click();
            self.alertYesCb(Static.Yes)
            
        })

        $("#no").click(function(){
            $(".close").click();
            self.alertYesCb(Static.No)
        })

        $("#cancel").click(function(){
            $(".close").click();
            self.alertYesCb(Static.Cancel)
        })

}

        



Static.alert = function(msg, type){
    if(Static.alertObj == undefined){
        Static.alertObj = new Static.alertDlg()
    }
    Static.alertObj.alert(msg, type)

}

Static.alertYesNo = function(msg, cb, type){
    if(Static.alertObj == undefined){
        Static.alertObj = new Static.alertDlg()
    }
    Static.alertObj.alertYesNo(msg, cb, type)
    

}

//Static.alert("hello\nWorld")

Static.promptDlg = function(){
var prompt_dlg =  $('<div class="modal fade" id="promptModal" role="dialog">\
    <div id="prompt_dlg" class="modal-dialog">\
      <!-- Modal content-->\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4 class="modal-title" id="prompt_title">Alert</h4>\
        </div>\
        <div class="modal-body">\
          <input id="prompt_msg" style="width:100%" autofocus />\
        </div>\
        <div class="modal-footer">\
          <button id="prompt_ok" type="button" class="btn btn-default">Ok</button>\
        </div>\
      </div>\
    </div>\
  </div>')

 //console.log(dlg)
 $("body").append(prompt_dlg);

 var self = this


 this.prompt = function(title, defaultMsg, cb, type){
                if(type == "small"){
                    $("#prompt_dlg").addClass("modal-sm")
                }
                $("#prompt_title").text(title)
                $("#prompt_msg").val(defaultMsg)
                $("#prompt_msg").select()
                this.cb = cb
                prompt_dlg.modal({backdrop: "static"});
            }


    $("#prompt_ok").on('click', function(){
        if(self.cb($("#prompt_msg").val())){
            $(".close").click();
        }else{
            $("#prompt_msg").select()
        }
    })
}

Static.prompt = function(msg, defaultMsg, cb, type){
    if(Static.promptObj == undefined){
        Static.promptObj = new Static.promptDlg()
    }
    Static.promptObj.prompt(msg, defaultMsg, cb, type)
}

/*Static.prompt("Enter a new name for", "AAAA", function(str){
    console.log(str)
    //return false
    return true
})*/


Static.isMobile = function(){
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4)))
}

function EvaluateExp(expStr){
    var m_expStr = expStr;
    var f ;
    var simplified;
    this.error = false

    function init(){
        try {
            f = math.parse(m_expStr);
            simplified = math.simplify(f);
        }
        catch(err) {
            Static.alert(err.message);
            this.error = true
        }
    }

    if(m_expStr !== undefined){
        init()
    }

    this.setExpString = function(s){
        m_expStr = s
        init()
    }

    this.getExpString = function(){
        return m_expStr
    }

    this.eval = function(obj){
        this.error = false
        try {
            return simplified.eval(obj)
        }       
        catch(err) {
            //console.log(55)
            //Static.alert(err.message);
            this.errorMessage = err.message
            this.error = true
            return 0;
        }
        
    }

}

function findIndepVar(fx) {
        var alphas = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var i = 0;
        while (i < fx.length) {
            var c = fx.charAt(i);
            //alert(c)
            var str = "";
            //if(alphas.indexOf(c) != -1){
            while (alphas.indexOf(c) != -1 && i < fx.length) {
                str += c;
                ++i;
                c = fx.charAt(i);
            }
            //alert(str)
            if (str.length === 1) {
                //alert(str)
                return str
            }
            ++i;

        }
        return undefined;
    }

function makeSamples(obj) {
        //console.log(99)
        //Static.alert("this.message");
        //return

        var fx = obj.fx
        var lowerX = obj.lowerX
        var upperX = obj.upperX
        var numOfSamples = obj.numOfSamples
        var indepVarIsDegree = obj.indepVarIsDegree

        if (typeof numOfSamples === 'undefined')
            numOfSamples = _numOfSamples;
        var indepVar = findIndepVar(fx);
        if (indepVar !== "x") {
            while (fx.indexOf(indepVar) != -1)
                fx = fx.replace(indepVar, "x")
        }



        var samples = [];
        var parser = new EvaluateExp(fx)

        if(parser.error){
            Static.alert(parser.errorMessage);
            return null
        }
                
        var step = (upperX - lowerX) / (numOfSamples-1);

        for (var i = 0; i <= numOfSamples-1; ++i) {
            var xVal = lowerX + i * step;
            var yVal = parser.eval({x: xVal})
            if(parser.error){
                Static.alert(parser.errorMessage);
                return null
            }
            samples.push(new Misc.Point(xVal, yVal))
        }
        //console.log(samples)
        return samples;
    }

define('static',['regression'], function(regression){
    Static.regression = regression
})


function regress(curve, type, order, throughOrigin){
    if(type=="linear" && throughOrigin){
        type = "linearthroughorigin"        
    }
    //if(!curve.fitType){
        //curve.fitType = type
    //}
    var samples = curve.data().samples()
    var points = []
    var point = [0, 0]
    for(var i=0; i<samples.length; ++i){
        points.push([samples[i].x, samples[i].y])
    }
    return Static.regression(type, points, order); 
}

//Called by LegendMenu and CurveSettings
/*var curveFitInfoCb = function(curve){
    var info = ""
    if(curve.fitType == "natural"){
        info += "Fit type:Natural Spline"
    }
    if(curve.fitType == "periodic"){
        info += "Fit type:Periodic Spline"
    }
    if(curve.fitType == "polynomial"){
        info += "Fit type:Polynomial"
        info += "; Equation:"+curve.equation
    }
    if(curve.fitType == "linear"){
        if(curve.origin){
            info += "Fit type:Linear Through Origin"
        }else{
            info += "Fit type:Linear"
        }
        info += "; Equation:"+curve.equation
    }   
    return info
}*/

///Prevent default right click menu
$('body').on("contextmenu", function(e){        
    e.preventDefault();        
});

/**
 * The expression parser of math.js has support for letting functions
 * parse and evaluate arguments themselves, instead of calling them with
 * evaluated arguments.
 *
 * By adding a property `raw` with value true to a function, the function
 * will be invoked with unevaluated arguments, allowing the function
 * to process the arguments in a customized way.
 */
//var math = require('../../index');

/**
 * Calculate the numeric integration of a function
 * @param {Function} f
 * @param {number} start
 * @param {number} end
 * @param {number} [step=0.01]
 */
function integrate(f, start, end, volumeX, step) {
    Static.total_area = 0;
    Static.total_volume = 0;
    //step = step || 0.000007;
    step = step || (end - start)/30000
    volumeX = volumeX || false
    for (var x = start; x < end; x += step) {
        var _x = x + step / 2
        if(_x > end)
            step = step -(_x-end)
        var y = f(x + step / 2)
        if(volumeX)
            Static.total_volume += y * step * y * Math.PI;
        else
            Static.total_area += y * step;
    }
    if(volumeX)
        return Static.adjustForDecimalPlaces(Static.total_volume, 5);   
    return Static.adjustForDecimalPlaces(Static.total_area, 5); 
}


/**
 * A transformation for the integrate function. This transformation will be
 * invoked when the function is used via the expression parser of math.js.
 *
 * Syntax:
 *
 *     integrate(integrand, variable, start, end)
 *     integrate(integrand, variable, start, end, step)
 *
 * Usage:
 *
 *     math.eval('integrate(2*x, x, 0, 2)')
 *     math.eval('integrate(2*x, x, 0, 2, 0.01)')
 *
 * @param {Array.<math.expression.node.Node>} args
 *            Expects the following arguments: [f, x, start, end, step]
 * @param {Object} math
 * @param {Object} [scope]
 */
integrate.transform = function (args, math, scope) {
  // determine the variable name
  if (args[1] instanceof math.expression.node.SymbolNode) {
    var variable = args[1].name;
  }
  else {
    throw new Error('Second argument must be a symbol');
  }

  // evaluate start, end, and step
  var start = args[2].compile().eval(scope);
  var end   = args[3].compile().eval(scope);
  var volumeX  = args[4] && args[4].compile().eval(scope); // volumeX is optional
  var step  = args[5] && args[5].compile().eval(scope); // step is optional

  // create a new scope, linked to the provided scope. We use this new scope
  // to apply the variable.
  var fnScope = Object.create(scope);

  // construct a function which evaluates the first parameter f after applying
  // a value for parameter x.
  var fnCode = args[0].compile();
  var f = function (x) {
    fnScope[variable] = x;
    return fnCode.eval(fnScope);
  };

  
  // execute the integration
  return integrate(f, start, end, volumeX, step);
};

// mark the transform function with a "rawArgs" property, so it will be called
// with uncompiled, unevaluated arguments.
integrate.transform.rawArgs = true;

// import the function into math.js. Raw functions must be imported in the
// math namespace, they can't be used via `eval(scope)`.
math.import({
  integrate: integrate
});

// use the function in JavaScript
// function f(x) {
//   return math.pow(x, 0.5);
// }
// console.log(math.integrate(f, 0, 1));                       // outputs 0.6667254718034714

// use the function via the expression parser
//console.log(math.eval('integrate(x^2, x, -10, 10)'));        // outputs 0.6667254718034714

// use the function via the expression parser (2)
// var scope = {};
// math.eval('f(x) = 2 * x', scope);
// console.log(math.eval('integrate(f(x), x, 0, 2)', scope));  // outputs 4.000000000000003

Static.isAlpha = function(ch){
  /*return typeof ch === "string" && ch.length === 1
         && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");*/
    ch = ch.toLowerCase().charCodeAt(0)
   return (ch>96 && ch<122)
}

/*Static.insertProductSign = function(str){
    var result = "";
    result += str[0]
    for(var i=1; i<str.length; ++i){
        if(Static.isAlpha(str[i-1]) && Static.isAlpha(str[i])){
            result += '*';
        }
        result += str[i];        
    }
    return result;
}*/;

function PaintUtil(){
    function ContextPainter(ctx){
        var m_ctx = ctx;
        var penStyle = "";
        var m_font = null;
    
        this.textSize = function (str){
            m_ctx.save()
            m_ctx.font = m_font.weight + " " + m_font.style + " " + m_font.th + "px " + m_font.name;
            var w = m_ctx.measureText(str).width;
            var h = m_ctx.measureText("M").width;
            m_ctx.restore()
            return new Misc.Size(w, h);
        }
    
        this.context = function(){
            return m_ctx;
        }
    
        this.canvasWidth = function(){
            return m_ctx.canvas.width;
        }
    
        this.canvasHeight = function(){
            return m_ctx.canvas.height;
        }
    
        this.save = function(){
            m_ctx.save();
        }
    
        this.restore = function(){
            m_ctx.restore();
        }
    
        /*
            ctx.translate( alignPos.x, alignPos.y );
            if ( m_labelOrientation == Vertical )
                ctx.rotate( -90*Math.PI/180 );*/
    
        this.translate = function(x, y){
            m_ctx.translate( x, y );
        }
    
        this.rotate = function(rot){
            m_ctx.rotate( rot * Math.PI / 180);
        }

        this.scale = function(x, y){
            m_ctx.scale(x, y );
        }
    
        /*style
          solid
          dash : ctx.setLineDash([10, 5])
          dashDot : ctx.setLineDash([12, 5, 3, 5])
          dashDotDot : ctx.setLineDash([12, 5, 3, 5, 3, 5])
          dot : ctx.setLineDash([2, 8])
        */
        this.setPen = function(pen){
            if(this.style==Static.NoPen)
                m_ctx.strokeStyle = "transparent";
            else
                m_ctx.strokeStyle = pen.color;
            m_ctx.lineWidth = pen.width;
            if(pen.style === "dash")
                m_ctx.setLineDash([10, 5]);
            else if(pen.style === "dot")
                m_ctx.setLineDash([3, 8]);
            else if(pen.style === "dashDot")
                m_ctx.setLineDash([12, 5, 3, 5]);
            else if(pen.style === "dashDotDot")
                m_ctx.setLineDash([12, 5, 3, 5, 3, 5]);
    
            penStyle = pen.style;
        }
    
        this.pen = function(){
            var color = ""
            if(m_ctx.strokeStyle == "transparent")
                color = NoPen;
            else
                color = m_ctx.strokeStyle;
            return new Misc.Pen(color, m_ctx.lineWidth, penStyle);
    
        }
        
        this.setBrush = function(brush){
            if(brush.color === undefined || brush.color===Static.NoBrush)
                m_ctx.fillStyle = "transparent";
            else
                m_ctx.fillStyle = brush.color;        
        }
    
        this.brush = function(){
            return m_ctx.fillStyle;
        }
    
        this.setFont = function(font){
            m_ctx.font = font.weight + " "
                            + font.style + " "
                            + font.th + "px "
                            + font.name;
            if(typeof(font.fontColor)!=="")
                ctx.fillStyle = font.fontColor;
    
            m_font = font;
        }
    
        this.font = function(){
            return m_font;
        }
        
        this.fillRect = function(rect, brush){
            if ( brush.style !== NoBrush )
            {
                //m_ctx.save();
                this.setBrush(brush);
                m_ctx.rect( rect.left(), rect.top(), rect.width(), rect.height() );
                m_ctx.fill();
                //m_ctx.restore();
            }
        }
        
        this.drawPath = function(path){
            m_ctx.beginPath()
            for ( var i = 0; i < path.elementCount(); i++ )
            {
                var element = path.elementAt(i);
                var x = element.x;
                var y = element.y;
    

                    switch( element.type )
                    {
                        case MoveToElement:
                        {
    
    //                        if ( doAlign )
    //                        {
    //                            x = qRound( x );
    //                            y = qRound( y );
    //                        }
    
    
                            m_ctx.moveTo( x, y );
                            break;
                        }
                        case LineToElement:
                        {
    //                        if ( doAlign )
    //                        {
    //                            x = qRound( x );
    //                            y = qRound( y );
    //                        }
    

                            m_ctx.lineTo( x, y );
                            break;
                        }
                        case CurveToElement:
                        {
                            var element1 = path.elementAt( ++i );
                            var x1 = element1.x;
                            var y1 = element1.y;
    
                            var element2 = path.elementAt( ++i );
                            var x2 = element2.x;
                            var y2 = element2.y;
    
                            m_ctx.bezierCurveTo(x, y, x1, y1, x2, y2 );
    
                            break;
                        }
                        case CurveToDataElement:
                        {
                            break;
                        }
                    }
                }
            m_ctx.stroke();
            m_ctx.fill();
        }
    
    
        this.drawPoint = function(pt){
            var pw = this.pen().width
            m_ctx.fillStyle = this.pen().color;
            m_ctx.fillRect(pt.x-pw*1.0, pt.y-pw*1.0, pw*1.9, pw*2.0)
        }        
        
        this.drawPoints = function(points){
            m_ctx.fillStyle = this.pen().color
            var pw = this.pen().width
            for(var i=0; i<points.length; ++i)
                m_ctx.fillRect(points[i].x-pw*1.0, points[i].y-pw*1.0, pw*1.9,pw*2.0) 
                            
        }
    
        this.drawLine = function(param1, param2, param3, param4){
            m_ctx.beginPath()
            if(typeof(param4)!=="undefined" && typeof(param3)!=="undefined"){
                m_ctx.moveTo(param1, param2);
                m_ctx.lineTo(param3, param4);
                m_ctx.stroke();
            }
            else {
                m_ctx.moveTo(param1.x, param1.y);
                m_ctx.lineTo(param2.x, param2.y);
            }
            m_ctx.stroke();
        }
    
        this.drawPolyline = function(polyline) {
            m_ctx.beginPath();
            //m_ctx.lineCap = "butt";
            m_ctx.moveTo(polyline[0].x, polyline[0].y);
            for (var i = 1; i < polyline.length; ++i)
                m_ctx.lineTo(polyline[i].x, polyline[i].y);
            m_ctx.stroke();
        }
    
        this.drawPolygon = function(polyline) {
            if((polyline[0].x !== polyline[polyline.length-1].x) ||(polyline[0].y !== polyline[polyline.length-1].y))
                polyline.push(polyline[0]);
            m_ctx.beginPath();
            this.drawPolyline(polyline);
            m_ctx.closePath();
            m_ctx.fill();
        }
    
        this.drawRect = function(x, y, width, height ){
            m_ctx.beginPath();
            if(typeof(x)=='number')
                m_ctx.rect(x, y, width, height);
            else{
                var rect = x;
                m_ctx.rect(rect.left(), rect.top(), rect.width(), rect.height());
            }
            m_ctx.stroke();
            m_ctx.fill();
            m_ctx.closePath()
        }

        this.drawCircle = function(x, y, radius ){
            m_ctx.beginPath();
            if(typeof(x)=='number')
                //m_ctx.rect(x, y, width, height);
                m_ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            else{
                var pt = x;
                radius = y;
                m_ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI, false);
            }
            m_ctx.stroke();
            m_ctx.fill();
            m_ctx.closePath()
        }

        //this.drawEllipse = function(centerX, centerY, width, height) {
        this.drawEllipse = function(rect) {
                var centerX = (rect.left()+rect.right())/2
                var centerY = (rect.top()+rect.bottom())/2
                var width = rect.width()
                var height = rect.height()
              m_ctx.beginPath();
              
              m_ctx.moveTo(centerX, centerY - height/2); // A1
              
              m_ctx.bezierCurveTo(
                centerX + width/2, centerY - height/2, // C1
                centerX + width/2, centerY + height/2, // C2
                centerX, centerY + height/2); // A2

              m_ctx.bezierCurveTo(
                centerX - width/2, centerY + height/2, // C3
                centerX - width/2, centerY - height/2, // C4
                centerX, centerY - height/2); // A1
             
              //m_ctx.fillStyle = "red";
              //m_ctx.stroke();
              //m_ctx.fill();

              m_ctx.stroke();
                m_ctx.fill();
                m_ctx.closePath()
              m_ctx.closePath();  
            }
    
    //    this.drawRect2 = function(x, y, width, height ){
    //        m_ctx.beginPath();
    //        m_ctx.rect(x, y, width, height);
    //        m_ctx.stroke();
    //    }
    
        this.drawVerticalText = function(txt, tx, ty, topDown){
            var bottomUp = -1;
            if(typeof(topDown) !== "undefined"){
                if(topDown === true)        
                    bottomUp = 1;
            }
            
            var size = m_ctx.measureText(txt);
            m_ctx.save();
            var x = tx;// + size.width/2;
            var y = ty - bottomUp*size.width/2;
            m_ctx.translate(x,y);
    
            m_ctx.rotate(bottomUp*Math.PI / 2);
            m_ctx.translate(-x,-y);
            if(bottomUp === -1)
                m_ctx.textAlign = "left";
            m_ctx.fillText(txt,x,y);
            m_ctx.restore();
    
        }
    
        function adjustedText(text, maxTextLength){
            //if(text==undefined ||text=="")return ""
            var txt = text;
            var textLength = m_font.textSize(txt).width;
            while(textLength > maxTextLength){
                if(!txt.substring) break
                txt = txt.substring(0, txt.length-1);
                textLength = m_font.textSize(txt).width;
            }
            return txt;
        }
    
        this.drawText = function(text, x, y, alignment, maxTextLength){
            if(typeof(maxTextLength)!=="undefined")
                text = adjustedText(text, maxTextLength);
            if(typeof(alignment)!=="undefined")
                m_ctx.textAlign = alignment;
            m_ctx.fillText(text,x, y);        
        }
    
        this.toString = function(){
            return '[Painter: ' + m_ctx + ']'
        }
    }
    
    
    function GraphicPainter(graphic){
        var svgNS = "http://www.w3.org/2000/svg"; 
        var m_graphic = graphic;
        var m_pen = new Misc.Pen;
        m_pen.style = Static.NoPen;
        var m_brush = new Misc.Brush;
    
        var m_font = new Misc.Font;
    
    
        var elem = null;
    
        this.setBrush = function(b){
    
            m_brush = b
        }
    
        this.setPen = function(p){
            m_pen = p
        }
    
        /*style
          solid
          dash : ctx.setLineDash([10, 5])
          dashDot : ctx.setLineDash([12, 5, 3, 5])
          dashDotDot : ctx.setLineDash([12, 5, 3, 5, 3, 5])
          dot : ctx.setLineDash([2, 8])
        */
        function doSetPen(){
            if(m_pen.style===Static.NoPen)
                elem.attr("stroke", "transparent");
            else
               elem.attr("stroke",m_pen.color);
            elem.attr("stroke-Width",m_pen.width);
            if(m_pen.style === "dash")
                elem.attr("stroke-dasharray",[10, 5]);
            else if(m_pen.style === "dot")
                elem.attr("stroke-dasharray",[3, 8]);
            else if(m_pen.style === "dashDot")
                elem.attr("stroke-dasharray",[12, 5, 3, 5]);
            else if(m_pen.style === "dashDotDot")
                elem.attr("stroke-dasharray",[12, 5, 3, 5, 3, 5]);
    
            //penStyle = m_pen.style;
        }
    
        function doSetBrush(){
            if(m_brush.color === Static.NoBrush)
                elem.attr("fill", "transparent");
            else
               elem.attr("fill",m_brush.color);
        }
    
        this.pen = function(){
            return m_pen;
        }

        this.rotate = function(rotation, x, y){
            xCenter = x || 0
            yCenter = y || 0
            if(rotation)
            elem.attr("transform", 
                " rotate("+rotation+' '+xCenter+' '+yCenter+ ")"
                );
        }

        
        this.transform = function(obj){
            var xTrans = obj.translateX || 0
            var yTrans = obj.translateY || 0
            var xScale = obj.scaleX || 1
            var yScale = obj.scaleY || 1
            var rotation = obj.rotation || 0
            var xCenter = obj.rotationX || 0
            var yCenter = obj.rotationY || 0

            var transformStr =""
            if(xScale != 1 || yScale != 1)
                transformStr += " scale("+xScale+' '+yScale+ ")"
            if(rotation)
                transformStr += " rotate("+rotation+' '+xCenter+' '+yCenter+ ")"
            if(xTrans != 1 || yTrans != 1)
                transformStr += " translate("+xTrans+' '+yTrans +")"

            elem.attr("transform", transformStr);

            
        }
    
        this.drawRect = function(x, y, w, h){        
           elem = $(document.createElementNS(svgNS,"rect"));
           elem.attr("x",x);
           elem.attr("y",y);
           elem.attr("width",w);
           elem.attr("height",h);

           /*if(rotation)
            elem.attr("transform", 
                " rotate("+rotation+' '+x+' '+y+ ")"
                );*/

           doSetBrush();
           elem.attr("stroke",m_pen.color);
           elem.attr("stroke-Width",1);
           elem.appendTo($(m_graphic.svg()))           
        }

        this.drawPath = function(path){                  
            elem = $(document.createElementNS(svgNS,"path"));           
            var data = path.data
            var d = "";
            for ( var i = 0; i < path.elementCount(); i++ )
            {
                var element = path.elementAt(i);
                var x = element.x + data.xOffset;
                var y = element.y + data.yOffset;    

                    switch( element.type )
                    {
                        case MoveToElement:
                        {  
       
                            d +='M'+x +' '+y+' ';
                            break;
                        }
                        case LineToElement:
                        {
                            d +='L'+x +' '+y+' ';
                            break;
                        }
                        case CurveToElement:
                        {
                            var element1 = path.elementAt( ++i );
                            var x1 = element1.x + data.xOffset;
                            var y1 = element1.y + data.yOffset;
    
                            var element2 = path.elementAt( ++i );
                            var x2 = element2.x + data.xOffset;
                            var y2 = element2.y + data.yOffset;
    
                            d +='C '+x +' '+y+' '+x1 +' '+y1+' '+x2 +' '+y2+' ';
                            break;
                        }
                        case CurveToDataElement:
                        {
                            break;
                        }
                    }
                }
            elem.attr("d",d);
            elem.attr("transform", 
                " scale("+data.scale+")"+
                " rotate("+data.rotation+' '+data.xCenter+' '+data.yCenter+ ")"
                );
            doSetBrush();
            elem.attr("stroke",m_pen.color);
            elem.attr("stroke-Width",1);
            elem.appendTo($(m_graphic.svg()))           
        }
    
        this.fillRect = function( rect, brush ){
            elem = $(document.createElementNS(svgNS,"rect"));
            elem.attr("x",rect.left);
            elem.attr("y",rect.top);
            elem.attr("width",rect.width);
            elem.attr("height",rect.height);
            elem.attr("fill",brush.color);
            doSetPen();
            elem.appendTo($(m_graphic.svg()))
        }

        /*elem = $(document.createElementNS(svgNS,"rect"));
           elem.attr("x",x);
           elem.attr("y",y);
           elem.attr("width",w);
           elem.attr("height",h);
           doSetBrush();
           elem.attr("stroke",m_pen.color);
           elem.attr("stroke-Width",1);
           elem.appendTo($(m_graphic.svg()))   */
    
        this.drawCircle = function(x, y, radius){        
           /*elem = $(document.createElementNS(svgNS,"circle"));
           elem.attr("cx",x);
           elem.attr("cy",y);
           elem.attr("r",radius);
           elem.attr("fill","red");
           doSetPen();
           elem.appendTo($(m_graphic.svg()))*/

           elem = $(document.createElementNS(svgNS,"circle"));
           elem.attr("cx",x);
           elem.attr("cy",y);
           elem.attr("r",radius);
           doSetBrush();
           elem.attr("stroke",m_pen.color);
           elem.attr("stroke-Width",1);
           elem.appendTo($(m_graphic.svg()))
           
        }
    
        this.drawLine = function(x1, y1, x2, y2){             
           elem = $(document.createElementNS(svgNS,"line"));           
           elem.attr("x1",x1);
           elem.attr("y1",y1);
           elem.attr("x2",x2);
           elem.attr("y2",y2);           
           doSetPen();           
           elem.appendTo($(m_graphic.svg()))    
        }
    
        this.drawText = function(text, x, y){
            elem = $(document.createElementNS(svgNS,"text"));
            elem.attr('x', x);
            elem.attr('y', y);
            doSetFont();
            doSetPen();
            doSetBrush();
            elem[0].textContent = text;
            elem.appendTo($(m_graphic.svg()));
    
        }
    
        this.textSize = function(text){
            return m_font.textSize(text);
        }
    
        this.setFont = function(font){
            m_font = font;
        }
        
        this.font = function(){
            return m_font;
        }
    
        function doSetFont(){
            elem.attr("font-size",m_font.th);
            elem.attr("font-family",m_font.name);
            elem.attr("font-weight",m_font.weight);
            elem.attr("font-style",m_font.style);
        }
    
    
        this.toString = function () {
            return '[GraphicPainter]';
        }
    }
    
    
    PaintUtil.Painter = function Painter(param){ 
        var m_painter = null;
        var m_graphicPainter = false;    
        
        if(param.toString()==='[Graphic]'){ 
            m_graphicPainter = true;
            m_painter = new GraphicPainter(param);
        }        
        else if(param.toString()==='[object CanvasRenderingContext2D]'){
            m_painter = new ContextPainter(param);        
        }
        else{
            m_painter = new ContextPainter(param.getContext());
        }
        
        this.isGraphicPainter = function(){
            return m_graphicPainter;
        }
        
        this.textSize = function (str){
            return m_painter.textSize(str)
        }
    
        this.context = function(){  
            if(m_graphicPainter){
                return;
            }            
            return m_painter.context()
        }
    
        this.canvasWidth = function(){
            if(m_graphicPainter)
                return;
            return m_painter.canvasWidth()
        }
    
        this.canvasHeight = function(){
            if(m_graphicPainter)
                return;
            return m_painter.canvasHeight()
        }
    
        this.save = function(){
           if(m_graphicPainter)
                return;
            m_painter.save()
        }
    
        this.restore = function(){
            if(m_graphicPainter)
                return;
            m_painter.restore()
        }    
    
        this.translate = function(x, y){
           if(m_graphicPainter)
                return;
            m_painter.translate(x, y)
        }

        this.scale = function(x, y){
           if(m_graphicPainter)
                return;
            m_painter.scale(x, y)
        }
    
        this.rotate = function(rot, x, y){
            //rot *= Math.PI / 180
            if(m_graphicPainter)
                return;
            m_painter.rotate(rot, x, y)
        }

        this.transform = function(obj){
            //rot *= Math.PI / 180
            if(!m_graphicPainter)
                return;
            m_painter.transform(obj)
        }
    
        
        this.setPen = function(pen){
            m_painter.setPen(pen)
        }
    
        this.pen = function(){
           return m_painter.pen()
    
        }
        
        this.setBrush = function(brush){
            m_painter.setBrush(brush)      
        }
    
        this.brush = function(){
            return m_painter.brush()
        }
    
        this.setFont = function(font){
           m_painter.setFont(font)
        }
    
        this.font = function(){
            return m_painter.font()
        }
        
        this.fillRect = function(rect, brush){
            m_painter.fillRect(rect, brush)
        }
        
        this.drawPath = function(path){
            //if(m_graphicPainter)
                //return;
            m_painter.drawPath(path)
        }
    
    
        this.drawPoint = function(pt){
            if(m_graphicPainter)
                return;
            m_painter.drawPoint(pt)
        }
        
        this.drawPoints = function(points){
            if(m_graphicPainter)
                return;
            m_painter.drawPoints(points)
        }
    
        this.drawLine = function(param1, param2, param3, param4){
            m_painter.drawLine(param1, param2, param3, param4)
        }
    
        this.drawPolyline = function(polyline) {
            if(m_graphicPainter)
                return;
            m_painter.drawPolyline(polyline)
        }
    
        this.drawPolygon = function(polyline) {
            if(m_graphicPainter)
                return;
            m_painter.drawPolygon(polyline)
        }
    
        this.drawRect = function(x, y, width, height ){
           m_painter.drawRect(x, y, width, height )
        }
    
        this.drawVerticalText = function(txt, tx, ty, topDown){
            if(m_graphicPainter)
                return;
            m_painter.drawVerticalText(txt, tx, ty, topDown)
        }    
    
        this.drawText = function(text, x, y, alignment, maxTextLength){
            m_painter.drawText(text, x, y, alignment, maxTextLength)       
        }
    
        this.drawCircle = function(x, y, radius){        
           //if(m_graphicPainter)
                //return;
           m_painter.drawCircle(x, y, radius)
        } 

        this.drawEllipse = function(rect){        
           //if(m_graphicPainter)
                //return;
           m_painter.drawEllipse(rect)
        }  
        
        this.toString = function(){
            return m_painter.toString()
        }
    
    }
}
PaintUtil()

;
define("jPainter", function(){});


///////////////////////////////////Object//////////////////start
class HObject {
	constructor(el){
		var self = this;
		var m_isEnabled = false;
		var element = $("body");
		var removed = false;
		var m_bind = false;
		//var m_parent = null;

		this.m_objectName = "jObject";

		this.m_mouseTracking = true
	    this.m_filterObjs = []

		if (el !== undefined) {
			//if(el && el.toString() == '[Widget]'){
			if(el && (el instanceof HObject)){
				element = el.getElement()
				//m_parent = el;
			}else{
				element = el;
			}
			
			//console.log(el.toString())
		}

		var clickEvent = "click"
		 var mousedownEvent = "mousedown"
		 var mouseupEvent = "mouseup"
		 var mousemoveEvent = "mousemove"
		 if(Static.isMobile()){
		   clickEvent = "tap"
		   mousedownEvent = "touchstart"
		   mouseupEvent = "touchend"
		   mousemoveEvent = "touchmove"
		 }

		 /*this.parentWidget = function(){
		 	 return m_parent
		 }*/

		this.mapToElement = function (pt) {
			if (!element)
				return;
			var result = new Misc.Point();
			var rect = element[0].getBoundingClientRect();
			result.x = pt.x - rect.left;
			result.y = pt.y - rect.top;
			return result;
		}

		this.setElement = function (el) {
			element = el;
			//if (el)
				//m_filterObjs.push(this);
		}

		this.getElement = function () {
			return element;
		}
		

		// !
		//   \brief En/disable the magnifier

		//   When enabled is true an event filter is installed for
		//   the observed widget, otherwise the event filter is removed.

		//   \param on true or false
		//   \sa isEnabled(), eventFilter()

		this.setEnabled_1 = function (on) {
			if (m_isEnabled != on) {
				m_isEnabled = on;
				this.elementEvent(m_isEnabled)
				if (m_isEnabled) {
					Static.trigger("enabled");
				} 
			}
		}

		

		this.event = function(event) {
	        //console.log(event.type)//'event() called')
	        return true;
	    }

	    this.elementEventOnCb = function(event){
	    	//console.log("event bind")        
            if (self.m_filterObjs.length) {
                self.m_filterObjs.forEach(function(filterObj) {
                    if (!filterObj.eventFilter(self, event))
                        return self.event(event)

                })

            } else {
                return self.event(event)
            }
	    }

	    

		this.elementEvent = function( on) {
	        if (this instanceof HObject) {
	            var self = this
	            if (on) {

	                self.getElement().on('mousedown mouseup mousemove mouseenter mouseleave mousewheel', 
	                	function(event) {
	                		self.elementEventOnCb(event)
	                    //console.log("event bind")        
	                    /*if (self.m_filterObjs.length) {
	                        self.m_filterObjs.forEach(function(filterObj) {
	                            if (!filterObj.eventFilter(self, event))
	                                return self.event(event)

	                        })

	                    } else {
	                        return self.event(event)
	                    }*/

	                });
	                $('body').on('keydown keyup', function(event) {
	                    if (self.m_filterObjs.length) {
	                        self.m_filterObjs.forEach(function(filterObj) {
	                            if (!filterObj.eventFilter(self, event))
	                                return self.event(event)

	                        })

	                    } else {
	                        return self.event(event)
	                    }
	                })

	            } else {
	                self.getElement().off('mousedown mouseup mousemove mouseenter mouseleave mousewheel');
	                $('body').off('keydown keyup');
	            }
	        }
	    }

	    /*
		An event filter is an object that receives all events that are sent to this object. The filter can either stop the 
		event or forward it to this object. The event filter filterObj receives events via its eventFilter() function. 
		The eventFilter() function must return true if the event should be filtered, (i.e. stopped); otherwise it must return false.
	    If multiple event filters are installed on a single object, the filter that was installed last is activated first.*/
	    this.installEventFilter = function(filterObj) {
	        /*if (this.hasSameElement(filterObj)) {
	            console.warn("hasSameElement")
	            return
	        }*/
	        this.m_filterObjs.push(filterObj)
	    }
	    
	    /*Removes an event filter object obj from this object. The request is ignored if such an event filter has not been installed.*/
	    this.removeEventFilter = function(obj) {
	        var index = this.m_filterObjs.indexOf(obj);
	        if (index > -1) {
	            this.m_filterObjs.splice(index, 1);
	        }
	    }

	    /*
	    Filters events if this object has been installed as an event filter for the watched object.
	    In your reimplementation of this function, if you want to filter the event out, i.e. stop it being handled further, return true; 
	    otherwise return false.*/
	    /*this.eventFilter = function(watched, event) {
	        //console.log('eventFilter() called')
	    }*/

	    this.hasSameElement = function(otherObj) {
	        return (this.getElement() == otherObj.getElement())
	    }
		
		this.isEnabled = function () {
			return m_isEnabled;
		}

		this.toString = function () {
			return '[HObject]';
			
		}


	}

	/*
	    Filters events if this object has been installed as an event filter for the watched object.
	    In your reimplementation of this function, if you want to filter the event out, i.e. stop it being handled further, return true; 
	    otherwise return false.*/
	    eventFilter(watched, event) {
	        console.log('eventFilter() called')
	    }

	    setMouseTracking(on) {
	        if (this.getElement() && on) {
	            var self = this
	            this.getElement().on('mousemove', function(event) {
	                //console.log("event bind")        
	                //return self.event(event)
	                self.elementEventOnCb(event)
	            });
	            this.m_mouseTracking = true
	        } else {
	            this.getElement().off('mousemove')
	            this.m_mouseTracking = false
	        }
	    }

	    hasMouseTracking() {
	        return this.m_mouseTracking;
	    }

	    setObjectName(name) {
        this.m_objectName = name;
	    }

	    objectName() {
	        return this.m_objectName;
	    }

	    isWidget() {
	        return (this.toString() == '[Widget]')
	    }



}
///////////////////////////////////////////////////end

;
define("hObject", function(){});


///////////////////Widget////////////////////////start
//Widget.inheritsFrom(HObject);
class Widget extends HObject{
//function Widget(el) {
	constructor(el){
		super (el)
	//HObject.call(this, el); ////////////////
	var self = this;

	var m_visible = true

	
	var cnvs = $('<canvas />').attr({
			style: "position: absolute; background-color: transparent"
		});
	//console.log("canvas created")
	if (this.getElement()) {
		this.getElement().append(cnvs);

	}

	this.clearCanvas = function () {
		var ctx = this.getContext()
			if (!ctx)
				return;
			ctx.clearRect(0, 0, cnvs[0].width, cnvs[0].height);
	}

	this.getContext = function () {
		var ctx = null
		if (!this.getElement())
			return null;

		cnvs[0].width = parseFloat(this.getElement().css("width"));
		cnvs[0].height = parseFloat(this.getElement().css("height")); //743

		//console.log("cnvs[0].height: "+cnvs[0].height)
		//console.log("cnvs[0].width: "+cnvs[0].width)
		ctx = cnvs[0].getContext("2d");
		return ctx//cnvs[0].getContext("2d");
	};

	this.width = function () {
		return cnvs[0].width;
	}

	this.height = function () {
		return cnvs[0].height;
	}

	this.setCanvasParent = function (el) {
		this.getElement().append(cnvs);
	}

	this.getCanvas = function () {
		return cnvs;
	}
	
	/*Returns the area inside the widget's margins.*/
      this.contentsRect = function () {
           var e = this.getElement()
		/*return new Misc.Rect(parseFloat(e.css("left")), 
						parseFloat(e.css("top")), 
						parseFloat(e.css("width")), 
						parseFloat(e.css("height")));*/
		
		return (new Misc.Rect(0, 0, parseFloat(e.css("width")), 
						parseFloat(e.css("height"))));
	}


	this.setVisible = function (on) {
		if (on || typeof(on) === 'undefined'){
			this.getCanvas().show();
			m_visible = true
		}
		else {
			this.getCanvas().hide();
			m_visible = false
		}
	}
	
	this.hide = function () {
		this.setVisible(false)
	}
	
	this.show = function () {
		this.setVisible(true)
	}

	this.disableContextmenu = function(){
		/*this.getElement().on("contextmenu", function(e){
		      e.preventDefault();
		      console.log(e)
		      return false
		    })*/
		this.getElement().addClass('prevented');
	}

	//this.enableContextmenu = function(){
		/*this.getElement().on("contextmenu", function(e){
		      e.preventDefault();
		      console.log(e)
		      return false
		    })*/
		//this.getElement().removeClass('prevented');
	//}

	//this.disableContextmenu = function(){
		//this.getElement().on("contextmenu", function(e){
   		//if($(this).hasClass('prevented')){
       		//e.preventDefault();
       		//$(this).removeClass('prevented');
   		//}/*else{
       		//$(this).addClass('prevented');
   		//}*/
		//});
	//}

	this.isVisible = function(){
		return m_visible
	}

	//this.setEnabled(true);
	this.disableContextmenu()

	this.toString = function () {
		return '[Widget]';
	}
  }
}

Widget.prototype.setElement = function (el) {
	HObject.prototype.setElement.call(this, el);
	this.setCanvasParent(el);
}
///////////////////////////////////////////////////end
;
define("widget", ["static","hObject"], function(){});


/////////////////////ScaleWidget/////////////////start
class ScaleWidget extends Widget {
//ScaleWidget.inheritsFrom(Widget);
	constructor(plot, domDivElem, align){
//function ScaleWidget(plot, domDivElem, align) {
	//Widget.call(this, domDivElem);
	super(domDivElem)
	var m_domDiv = this.getElement(); //domDivElem;
	var m_scaleDraw = null;
	var m_title = "";
	var m_plot = plot;

	var minBorderDist = []
	var borderDist = []

	var m_titleFont = new Misc.Font(14);
	var m_scaleFont = new Misc.Font(12);

	/*!
	  Specify distances of the scale's endpoints from the
	  widget's borders. The actual borders will never be less
	  than minimum border distance.
	  \param dist1 Left or top Distance
	  \param dist2 Right or bottom distance
	  \sa borderDist()
	*/
	this.setBorderDist = function( dist1, dist2 ){
	    if ( dist1 != borderDist[0] || dist2 != borderDist[1] )
	    {
	        borderDist[0] = dist1;
	        borderDist[1] = dist2;
	        //layoutScale();
	    }
	}

	/*!
	  \brief Calculate a hint for the border distances.

	  This member function calculates the distance
	  of the scale's endpoints from the widget borders which
	  is required for the mark labels to fit into the widget.
	  The maximum of this distance an the minimum border distance
	  is returned.

	  \param start Return parameter for the border width at 
	               the beginning of the scale
	  \param end Return parameter for the border width at the 
	             end of the scale

	  \warning
	  <ul> <li>The minimum border distance depends on the font.</ul>
	  \sa setMinBorderDist(), getMinBorderDist(), setBorderDist()
	*/
	this.getBorderDistHint = function( startAndEndObj ){
	    m_scaleDraw.getBorderDistHint( m_scaleFont, startAndEndObj );

	    if ( startAndEndObj.start < minBorderDist[0] )
	        startAndEndObj.start = minBorderDist[0];

	    if ( startAndEndObj.end < minBorderDist[1] )
	        startAndEndObj.end = minBorderDist[1];
	}

	this.setLabelFont = function (fontObj) {

		if (fontObj.th < 0 || fontObj.name === "" || fontObj.style === "")
			return;
		m_scaleFont = fontObj;
		m_plot.getLayout().adjustLayout(domDivElem, fontObj.th);
	}

	this.labelFont = function () {

		return m_scaleFont;
	}

	this.setTitleFont = function (fontObj) {
		if (fontObj.th < 0 || fontObj.name === "" || fontObj.style === "")
			return;
		m_titleFont = fontObj;
		m_plot.getLayout().adjustLayout(domDivElem, fontObj.th);
	}

	this.titleFont = function () {

		return m_titleFont;
	}

	/*
	var cnvs = $('<canvas />').attr({
	//id : this.plotId,
	style : "position: absolute; background-color: transparent"

	});
	if(m_domDiv)
	m_domDiv.append(cnvs);

	this.getContext = function () {
	cnvs[0].width = parseFloat(m_domDiv.css("width"));
	cnvs[0].height = parseFloat(m_domDiv.css("height"));
	return cnvs[0].getContext("2d");
	};

	this.width = function(){
	return cnvs[0].width;
	}

	this.height = function(){
	return cnvs[0].height;
	}*/

	/*!
	Set a scale draw

	scaleDraw has to be created with new and will be deleted in
	~QwtScaleWidget() or the next call of setScaleDraw().
	scaleDraw will be initialized with the attributes of
	the previous scaleDraw object.

	\param scaleDraw ScaleDraw object
	\sa scaleDraw()
	 */
	this.setScaleDraw = function (scaleDraw) {
		if ((typeof(scaleDraw) == "undefined") || (scaleDraw == m_scaleDraw))
			return;

		var sd = m_scaleDraw;
		if (sd) {
			//scaleDraw.setAlignment( m_scaleDraw.alignment() );
			scaleDraw.setScaleDiv(m_scaleDraw.scaleDiv());

			var transform = null;
			if (m_scaleDraw.scaleMap().transformation())
				transform = m_scaleDraw.scaleMap().transformation().copy();

			scaleDraw.setTransformation(transform);
		}

		//delete d_data->scaleDraw;
		m_scaleDraw = scaleDraw;

		//layoutScale();
	}

	/*!
	\return scaleDraw of this scale
	\sa setScaleDraw(), QwtScaleDraw::setScaleDraw()
	 */
	this.scaleDraw = function () {
		return m_scaleDraw;
	}

	//! Initialize the scale
	this.initScale = function (align) {
		m_scaleDraw = new ScaleDraw();		
		m_scaleDraw.setAlignment(align);
		//m_scaleDraw.setLength( 10 );

		var linearScaleEngine = new LinearScaleEngine();
		m_scaleDraw.setScaleDiv(linearScaleEngine.divideScale(0.0, 100.0, 10, 5));
	}

	if (typeof(align) === "undefined")
		this.initScale(LeftScale);
	else
		this.initScale(align);

	/*!
	Give title new text contents

	\param title New title
	\sa title(), setTitle(const QwtText &);
	 */
	this.setTitle = function (title) {
		//alert(m_titleFont.th)
		if (m_title === title)
			return;
		if (title !== "") {
			if (m_title === "") //We are adding a title for the first time. adjust the layout to accomodate it
			{
				//alert(title)
				if (this.alignment() === LeftScale || this.alignment() === RightScale) {
					m_plot.getLayout().adjustLayout(m_domDiv, parseFloat(m_domDiv.css("width")) + m_titleFont.th);

				} else {
					m_plot.getLayout().adjustLayout(m_domDiv, parseFloat(m_domDiv.css("height")) + m_titleFont.th);
				}
				Static.trigger("axisTitleAdded", true)

			}
			m_title = title;
		} else { //We are clearing the title. reclaim the space
			if (this.alignment() === LeftScale || this.alignment() === RightScale) {
				m_plot.getLayout().adjustLayout(m_domDiv, parseFloat(m_domDiv.css("width")) - m_titleFont.th);
			} else {
				m_plot.getLayout().adjustLayout(m_domDiv, parseFloat(m_domDiv.css("height")) - m_titleFont.th);
			}
			m_title = "";
			Static.trigger("axisTitleAdded", false)
		}
		m_plot.getLayout().updateLayout();
	}

	this.title = function () {
		return m_title;
	}

	/*!
	Change the alignment

	\param alignment New alignment
	\sa alignment()
	 */
	this.setAlignment = function (alignment) {
		if (m_scaleDraw)
			m_scaleDraw.setAlignment(alignment);
	}

	/*!
	\return position
	\sa setPosition()
	 */
	this.alignment = function () {
		if (m_scaleDraw == null)
			return LeftScale;

		return m_scaleDraw.alignment();
	}

	/*!
	Recalculate the scale's geometry and layout based on
	the current geometry and fonts.

	\param update_geometry Notify the layout system and call update
	to redraw the scale
	 */

	this.labelWidth = function (str) {
		return m_scaleFont.textSize(str).width;
	}

	/*!
	\brief draw the scale
	 */
	this.draw = function () {
		//alert(painter)
		//var context = this.getContext();
		var longestTick = m_scaleDraw.maxTickLength();
		var spacingBetweenLabelAndTick = m_scaleDraw.spacing();
		var spacingBetweenTitleAndLabel = 10;
		var margin = 10;
		if (m_scaleDraw.orientation() === Vertical) {
			//Compute the required width of widget

			var longestLbl = this.labelWidth(m_scaleDraw.longestLabel());
			var titleWidth = m_title !== "" ? m_titleFont.th : 0; //Title is vertical
			var widgetWidth = longestTick + spacingBetweenLabelAndTick + longestLbl
				 + spacingBetweenTitleAndLabel + titleWidth + margin;

			m_plot.getLayout().adjustLayout(m_domDiv, widgetWidth);

		}
		if (m_scaleDraw.orientation() === Horizontal) {
			var titleHeight = m_title !== "" ? m_titleFont.th : 0;

			var widgetHeight = longestTick + spacingBetweenLabelAndTick
				 + spacingBetweenTitleAndLabel + titleHeight + margin;

			m_plot.getLayout().adjustLayout(m_domDiv, widgetHeight);

		}
		m_plot.getLayout().updateLayout()

		        
        //We may very likely be painting widgets that are not visible
		var painter = new PaintUtil.Painter(this);
		painter.setFont(m_scaleFont);

		m_scaleDraw.draw(painter);
		if (m_title !== "") {
			painter.setFont(m_titleFont);
			this.drawTitle(painter);
		}
    	painter = null

	}

	/*!
	Rotate and paint a title according to its position into a given rectangle.

	\param painter Painter
	\param align Alignment
	\param rect Bounding rectangle
	 */

	this.drawTitle = function (painter) {
		var canvasWidth = painter.canvasWidth();
		var canvasHeight = painter.canvasHeight();

		painter.save();
		painter.setFont(m_titleFont)

		if (m_scaleDraw.alignment() === LeftScale) {
			if (m_title !== "") {
				//var tl = painter.context().measureText(m_title).width;
				painter.drawVerticalText(m_title, m_titleFont.th, canvasHeight / 2);
			}
		} else if (m_scaleDraw.alignment() === RightScale) {
			if (m_title !== "") {
				painter.drawVerticalText(m_title, canvasWidth - m_titleFont.th, canvasHeight / 2, true);
			}
		} else if (m_scaleDraw.alignment() === BottomScale) {
			if (m_title !== "") {
				painter.drawText(m_title, canvasWidth / 2, canvasHeight - 2, "center");
			}
		} else if (m_scaleDraw.alignment() === TopScale) {
			if (m_title !== "") {
				painter.drawText(m_title, canvasWidth / 2, m_titleFont.th, "center");
			}
		}
		painter.restore();
	}

	/*!
	\brief Assign a scale division

	The scale division determines where to set the tick marks.

	\param scaleDiv Scale Division
	\sa For more information about scale divisions, see QwtScaleDiv.
	 */
	this.setScaleDiv = function (scaleDiv) {
		if (m_scaleDraw.scaleDiv() !== scaleDiv) {

			m_scaleDraw.setScaleDiv(scaleDiv);
			//layoutScale();
			//alert("here")
			
			Static.trigger('scaleDivChanged')
		}
	}

	
	Static.bind('scaleDivChanged', this.scaleChange)

	/*!
	Set the transformation

	\param transformation Transformation
	\sa QwtAbstractScaleDraw::scaleDraw(), QwtScaleMap
	 */
	this.setTransformation = function (trans) {
		m_scaleDraw.setTransformation(trans);
		//layoutScale();


	}

	this.toString = function () {
		return '[ScaleWidget]';
	}
}
}
//This function can be overloaded by derived classes.
//The default implementation does nothing
ScaleWidget.prototype.scaleChange = function () {
	//console.log('scaleChanged')
}
///////////////////////////////////////////////////////////////end
;
define("scaleWidget", ["static","widget"], function(){});



///////////////AxisData////////////////////////
var AxisData = function() {
    this.axisName = "";
    this.isEnabled = false;
    this.doAutoScale = true;

    this.minValue// = -1000.0;
    this.maxValue// = 1000.0;
    this.stepSize// = 0;

    this.maxMajor// = 10;
    this.maxMinor// = 100;

    this.isValid = true;


    this.scaleDiv = null;
    this.scaleEngine = null;
    this.scaleWidget = null;
    this.scaleDomDiv = null;
    this.canvas = null;

    this.toString = function() {
        return '[AxisData]';
    };


}
///////////////////////////////////////////////end

/////////////////Plot//////////start

function Plot(_plotDiv, pTitle) {
    var plotDiv
    if (!_plotDiv){
        plotDiv = $("#plotDiv")
    }else{
         plotDiv =  _plotDiv
    }
       
    var self = this; //'self' is used in place of 'this' in callbacks
    var m_plotItemStore = [];
    var d_axisData = [];

    // var m_plotCanvas = 0


    var _title = "";
    var m_footer = "";
    var legendEnable = false;
    var m_cursor = ""
    var m_defaultCursor = "";

    var m_autoReplot = false;
    var m_legend = null;


    var m_legendFont = new Misc.Font;

    this.zoomer = null; //stores zoomer known to the plot
    this.panner = null; //stores panner known to the plot

    this.setLegendFont = function(font) {
        m_legendFont = font;
    }

    this.legendFont = function() {
        return m_legendFont;
    }

    //! Replots the plot if autoReplot() is \c true.
    this.autoRefresh = function() {
        if (m_autoReplot) {
            this.replot();
            //this.updateLayout
        }
    }

    /*!
	\brief Set or reset the autoReplot option

	If the autoReplot option is set, the plot will be
	updated implicitly by manipulating member functions.
	Since this may be time-consuming, it is recommended
	to leave this option switched off and call replot()
	explicitly if necessary.

	The autoReplot option is set to false by default, which
	means that the user has to call replot() in order to make
	changes visible.
	\param tf \c true or \c false. Defaults to \c true.
	\sa replot()
	 */
    this.setAutoReplot = function(tf) {
        m_autoReplot = tf;
    }

    /*!
	\return true if the autoReplot option is set.
	\sa setAutoReplot()
	 */
    this.autoReplot = function() {
        return m_autoReplot;
    }

    this.plotItemStore = function() {
        return m_plotItemStore;
    }

    var m_titleFont = new Misc.Font(12);

    var m_footerFont = new Misc.Font(12);

    var layout = new Layout(plotDiv, this);
    this.getLayout = function() {
        return layout;
    }

    /*!
	  \brief Return the current interval of the specified axis

	  This is only a convenience function for axisScaleDiv( axisId )->interval();
	  
	  \param axisId Axis index
	  \return Scale interval

	  \sa QwtScaleDiv, axisScaleDiv()
	*/
    this.axisInterval = function(axisId) {
        if (!this.axisValid(axisId))
            return new Interval();

        return d_axisData[axisId].scaleDiv.interval();
    }

    this.setAxisDecimalPlaces = function(axisId, places) {
        if (!this.axisValid(axisId))
            return;
        this.axisScaleDraw(axisId).setDecimalPlaces(places);

        this.autoRefresh();
    }


    this.axisDecimalPlaces = function(axisId) {
        if (!this.axisValid(axisId))
            return 3;

        return this.axisScaleDraw(axisId).decimalPlaces();
    }


    var centralWidget = new Widget(layout.getCentralDiv())
    var titleWidget = new Widget(layout.getTitleDiv())
    var footerWidget = new Widget(layout.getFooterDiv())

    centralWidget.plot = this;

    this.getCentralWidget = function() {
        return centralWidget;
    }

    this.getTitleWidget = function() {
        return titleWidget;
    }

    this.getFooterWidget = function() {
        return footerWidget;
    }

    //! Initialize axes
    this.initAxesData = function() {
        var axisId;

        for (axisId = 0; axisId < axisCnt; axisId++)
            d_axisData[axisId] = new AxisData();

        d_axisData[yLeft].axisName = "AxisYLeft";
        d_axisData[yRight].axisName = "AxisYRight";
        d_axisData[xTop].axisName = "AxisXTop";
        d_axisData[xBottom].axisName = "AxisXBottom";

        d_axisData[yLeft].scaleDomDiv = layout.getScaleDivElement(yLeft);
        d_axisData[yRight].scaleDomDiv = layout.getScaleDivElement(yRight);
        d_axisData[xTop].scaleDomDiv = layout.getScaleDivElement(xTop);
        d_axisData[xBottom].scaleDomDiv = layout.getScaleDivElement(xBottom);

        d_axisData[yLeft].scaleWidget = new ScaleWidget(this, layout.getScaleDivElement(yLeft), LeftScale);
        d_axisData[yRight].scaleWidget = new ScaleWidget(this, layout.getScaleDivElement(yRight), RightScale);
        d_axisData[xTop].scaleWidget = new ScaleWidget(this, layout.getScaleDivElement(xTop), TopScale);
        d_axisData[xBottom].scaleWidget = new ScaleWidget(this, layout.getScaleDivElement(xBottom), BottomScale);

        //#if 1
        // better find the font sizes from the application font
        //QFont fscl( fontInfo().family(), 10 );
        //QFont fttl( fontInfo().family(), 12, QFont::Bold );
        //#endif

        for (axisId = 0; axisId < axisCnt; axisId++) {
            var d = d_axisData[axisId];

            d.scaleEngine = new LinearScaleEngine();
            d.scaleWidget.setTransformation(d.scaleEngine.transformation());

            //d.scaleWidget->setFont( fscl );
            //d.scaleWidget->setMargin( 2 );

            //QwtText text = d.scaleWidget->title();
            //text.setFont( fttl );
            //d.scaleWidget->setTitle( text );

            d.doAutoScale = true;
            d.minValue = 0.0;
            d.maxValue = 1000.0;
            d.stepSize = 0.0;
            d.maxMinor = 5;
            d.maxMajor = 8;
            d.isValid = false;
        }
        d_axisData[yLeft].isEnabled = true;
        d_axisData[yRight].isEnabled = true;
        d_axisData[xBottom].isEnabled = true;
        d_axisData[xTop].isEnabled = true;

    }

    
    this.axisMaxMinor = function( axisId ){
        if(this.axisValid(axisId))
            return d_axisData[axisId].maxMinor;  
        return 0;     
    }
    
    this.axisMaxMajor = function( axisId ){
        if(this.axisValid(axisId))
            return d_axisData[axisId].maxMajor; 
        return 0;      
    }

    ////////////////////////////////
    /*!
  Set the maximum number of minor scale intervals for a specified axis

  \param axisId Axis index
  \param maxMinor Maximum number of minor steps

  \sa axisMaxMinor()
*/
this.setAxisMaxMinor = function( axisId, maxMinor ){
    if ( this.axisValid( axisId ) ){
        var maxMinor = Static.qBound( 0, maxMinor, 100 );

        var d = d_axisData[axisId];
        if ( maxMinor != d.maxMinor )
        {
            d.maxMinor = maxMinor;
            d.isValid = false;
            this.autoRefresh();
        }
    }
}

/*!
  Set the maximum number of major scale intervals for a specified axis

  \param axisId Axis index
  \param maxMajor Maximum number of major steps

  \sa axisMaxMajor()
*/
this.setAxisMaxMajor = function( axisId,  maxMajor )
{
    if ( this.axisValid( axisId ) )
    {
        var maxMajor = Static.qBound( 1, maxMajor, 10000 );

        var d = d_axisData[axisId];
        if ( maxMajor != d.maxMajor )
        {
            d.maxMajor = maxMajor;
            d.isValid = false;
            this.autoRefresh();
        }
    }
}

    ////////////////////////////////



    /*!
	\return \c true if the specified axis exists, otherwise \c false
	\param axisId axis index
	 */
    this.axisValid = function(axisId) {
        return ((axisId >= yLeft) && (axisId < axisCnt));
    }
    /*!
	Change the scale engine for an axis

	\param axisId Axis index
	\param scaleEngine Scale engine

	\sa axisScaleEngine()
	 */
    this.setAxisScaleEngine = function(axisId, engine) {
        if (this.axisValid(axisId) && engine !== null) {

            var d = d_axisData[axisId];
            //alert(d.scaleEngine)

            d.scaleEngine = engine;
            //alert(d.scaleEngine)

            d_axisData[axisId].scaleWidget.setTransformation(engine.transformation());
            //alert(d_axisData[axisId].scaleWidget.scaleDraw().scaleMap().transformation())


            d.isValid = false;

            this.autoRefresh();

        }
    }

    /*!
	\return the plot's legend
	\sa insertLegend()
	 */
    this.legend = function() {
        return m_legend;
    }


    this.insertLegend = function(legend) //////////////////////////////\\\\\\\\\\\\\\\\\\
    {

        m_legend = legend;
        m_legend.setLegendDiv(layout.getLegendDiv());
        m_legend.setPlot(this);
        //We add any items attached to the plot before insertLegend was called.
        for (var i = 0; i < m_plotItemStore.length; ++i) {
            this.insertLegendItem(m_plotItemStore[i]);
        }
    }

    /*if the legend is not enabled, it is enabled when an item is added.*/
    this.insertLegendItem = function(plotItem, rowNumber) {

        if (m_legend === null || plotItem == null)
            return;

        if (plotItem.testItemAttribute(Legend)) {
            m_legend.addItem(plotItem, rowNumber);

        }
        if (!m_legend.isEmpty()) {
            legendEnable = true;
            layout.getLegendDiv().show();
        }
    }

    /*if the legend is enabled, it is disabled when the last item is removed.*/
    this.removeLegendItem = function(plotItem) {
        if (m_legend === null)
            return;
        //var row = m_legend.rowNumberFromName(plotItem.title());
        //if(row >=0){
        var rowNumber = m_legend.removeItem(plotItem);
        if (m_legend.isEmpty()) {
            legendEnable = false;
            layout.getLegendDiv().hide();
        }
        // }
        return rowNumber
    }




    /*!
	  Emit legendDataChanged() for a plot item

	  \param plotItem Plot item
	  \sa QwtPlotItem::legendData(), legendDataChanged()
	 */
    this.updateLegend = function(plotItem) {
        if (plotItem == null)
            return;


        if (plotItem.testItemAttribute(Legend)) {

            //reinsert legend item
            var rowNumber = this.removeLegendItem(plotItem)
            this.insertLegendItem(plotItem, rowNumber)
        }

    }

    


    /*!
	\param axisId Axis index
	\return Scale engine for a specific axis
	 */
    this.axisScaleEngine = function(axisId) {
        if (this.axisValid(axisId))
            return d_axisData[axisId].scaleEngine;
        else
            return null;
    }
    /*!
	\brief Enable autoscaling for a specified axis

	This member function is used to switch back to autoscaling mode
	after a fixed scale has been set. Autoscaling is enabled by default.

	\param axisId Axis index
	\param on On/Off
	\sa setAxisScale(), setAxisScaleDiv(), updateAxes()

	\note The autoscaling flag has no effect until updateAxes() is executed
	( called by replot() ).
	 */
    this.setAxisAutoScale = function(axisId, on) {
        if (this.axisValid(axisId) && (d_axisData[axisId].doAutoScale !== on)) {
            d_axisData[axisId].doAutoScale = on;
            //Static.trigger("rescaled")
            this.autoRefresh();
        }
    }
    /*!
	\return \c True, if autoscaling is enabled
	\param axisId Axis index
	 */
    this.axisAutoScale = function(axisId) {
        if (this.axisValid(axisId))
            return d_axisData[axisId].doAutoScale;
        else
            return false;
    }

    /*!
	\brief Disable autoscaling and specify a fixed scale for a selected axis.

	In updateAxes() the scale engine calculates a scale division from the
	specified parameters, that will be assigned to the scale widget. So
	updates of the scale widget usually happen delayed with the next replot.

	\param axisId Axis index
	\param min Minimum of the scale
	\param max Maximum of the scale
	\param stepSize Major step size. If <code>step == 0</code>, the step size is
	calculated automatically using the maxMajor setting.

	\sa setAxisMaxMajor(), setAxisAutoScale(), axisStepSize(), QwtScaleEngine::divideScale()
	 */
    this.setAxisScale = function(axisId, min, max, stepSize) {
        var step = 0
        if (typeof(stepSize) !== "undefined")
            step = stepSize;
        if (this.axisValid(axisId)) {
            var d = d_axisData[axisId];

            d.doAutoScale = false;
            d.isValid = false;

            d.minValue = min;
            d.maxValue = max;
            d.stepSize = step;

            Static.trigger("rescaled")

            this.autoRefresh();
        }
    }

    /*!
	\brief Enable or disable a specified axis

	When an axis is disabled, this only means that it is not
	visible on the screen. Curves, markers and can be attached
	to disabled axes, and transformation of screen coordinates
	into values works as normal.

	Only xBottom and yLeft are enabled by default.

	\param axisId Axis index
	\param tf \c true (enabled) or \c false (disabled)
	 */
    this.enableAxis = function(axisId, tf) {
        if (this.axisValid(axisId) && tf !== d_axisData[axisId].isEnabled) {
            d_axisData[axisId].isEnabled = tf;
            if (tf)
                d_axisData[axisId].scaleDomDiv.show();
            else
                d_axisData[axisId].scaleDomDiv.hide();

            //layout.updateLayout();
            this.autoRefresh();

        }
    }
    /*!
	\return \c True, if a specified axis is enabled
	\param axisId Axis index
	 */
    this.axisEnabled = function(axisId) {
        //alert("hhh")
        if (this.axisValid(axisId))
            return d_axisData[axisId].isEnabled;
        else
            return false;
    }

    /*!
	\brief Change the title of a specified axis

	\param axisId Axis index
	\param title Axis title
	 */
    this.setAxisTitle = function(axisId, title) {
        if (this.axisValid(axisId)) {
            d_axisData[axisId].scaleWidget.setTitle(title);
            this.autoRefresh();
        }
    }
    /*!
	\return Title of a specified axis
	\param axisId Axis index
	 */
    this.axisTitle = function(axisId) {
        if (this.axisValid(axisId))
            return d_axisData[axisId].scaleWidget.title();
        else
            return "";
    }

    /*!
	\brief Return the scale division of a specified axis

	axisScaleDiv(axisId).lowerBound(), axisScaleDiv(axisId).upperBound()
	are the current limits of the axis scale.

	\param axisId Axis index
	\return Scale division

	\sa QwtScaleDiv, setAxisScaleDiv(), QwtScaleEngine::divideScale()
	 */
    this.axisScaleDiv = function(axisId) {
        return d_axisData[axisId].scaleDiv;
    }
    /*!
	\brief Disable autoscaling and specify a fixed scale for a selected axis.

	The scale division will be stored locally only until the next call
	of updateAxes(). So updates of the scale widget usually happen delayed with
	the next replot.

	\param axisId Axis index
	\param scaleDiv Scale division

	\sa setAxisScale(), setAxisAutoScale()
	 */
    this.setAxisScaleDiv = function(axisId, scaleDiv) {
        if (this.axisValid(axisId)) {
            d = d_axisData[axisId];

            d.doAutoScale = false;
            d.scaleDiv = scaleDiv;
            d.isValid = true;

            this.autoRefresh();
        }
    }
    /*!
	\brief Return the scale draw of a specified axis

	\param axisId Axis index
	\return Specified scaleDraw for axis, or NULL if axis is invalid.
	 */
    this.axisScaleDraw = function(axisId) {
        if (!this.axisValid(axisId))
            return null;

        return this.axisWidget(axisId).scaleDraw();
    }

    /*!
	\brief Change the font of an axis

	\param axisId Axis index
	\param font Font
	\warning This function changes the font of the tick labels,
	not of the axis title.
	 */
    this.setAxisLabelFont = function(axisId, fontObj) {
        if (this.axisValid(axisId)) {
            this.axisWidget(axisId).setLabelFont(fontObj);
            this.autoRefresh();
        }
    }

    this.axisLabelFont = function(axisId) {

        if (this.axisValid(axisId))
            return this.axisWidget(axisId).labelFont();
        return null;
    }

    this.setAxisTitleFont = function(axisId, fontObj) {
        if (this.axisValid(axisId)) {
            this.axisWidget(axisId).setTitleFont(fontObj);
            this.autoRefresh();
        }
    }

    this.axisTitleFont = function(axisId) {

        if (this.axisValid(axisId))
            return this.axisWidget(axisId).titleFont();
        return null;
    }

    /*this.setAxisScaleFont = function (axisId, fontObj) {
		if (this.axisValid(axisId)) {
			this.axisWidget(axisId).setLabelFont(fontObj);
			this.autoRefresh();
		}
	}

	this.axisScaleFont = function (axisId) {

		if (this.axisValid(axisId))
			return this.axisWidget(axisId).labelFont();
		return null;
	}*/

    this.initAxesData();

    this.isCursorSet = function() {
        return m_cursor !== "";
    }

    this.cursor = function(cursor) {
        return m_cursor;
    }

    this.setCursor = function(cursor) {
        if (cursor == m_cursor)
            return;
        m_cursor = cursor;
        layout.getCentralDiv().css("cursor", m_cursor)
    }

    this.setDefaultCursor = function(cursor) {
        if (m_defaultCursor == cursor)
            return;
        m_defaultCursor = cursor;
    }

    this.unsetCursor = function() {
        if (m_defaultCursor == m_cursor)
            return;
        m_cursor = m_defaultCursor;
        layout.getCentralDiv[0].style.cursor = m_cursor;
    }

    this.title = function() {
        return _title;
    }

    this.hideTitle = function() {
        if (_title == "")
            return
        layout.getTitleDiv().hide();
        layout.updateLayout();
        this.autoRefresh();
    }

    this.showTitle = function() {
        if (_title == "")
            return
        layout.getTitleDiv().show();
        layout.updateLayout();
        this.autoRefresh();
    }

    this.setTitle = function(ttl) {
        if (_title !== ttl) {
            _title = ttl;
            if (_title !== "") {
                layout.getTitleDiv().show(); //ensure the div is visible
                Static.trigger("titleAdded", true)
            } else {
                layout.getTitleDiv().hide();
                Static.trigger("titleAdded", false)
            }
            layout.updateLayout();
            this.autoRefresh();
            //console.log("setTitle called")
        }
    }

    //this.setTitle("")
    this.setTitleFont = function(fontObj) {
        if (fontObj.th < 0 || fontObj.name === "" || fontObj.style === "")
            return;
        m_titleFont = fontObj;
        layout.adjustLayout(layout.getTitleDiv(), fontObj.th * 2);
        this.autoRefresh();
    }
    this.setTitleFont(new Misc.Font(20, "Arial", "normal", "bold"))

    this.titleFont = function() {
        return m_titleFont;
    }

    this.footer = function() {
        return m_footer;
    }

    this.hideFooter = function() {
        if (m_footer == "")
            return
        layout.getFooterDiv().hide();
        layout.updateLayout();
        this.autoRefresh();
    }

    this.showFooter = function() {
        if (m_footer == "")
            return
        layout.getFooterDiv().show();
        layout.updateLayout();
        this.autoRefresh();
    }

    this.setFooter = function(ftr) {
        if (m_footer !== ftr) {
            m_footer = ftr;
            if (m_footer !== "") {
                layout.getFooterDiv().show(); //ensure the div is visible
                Static.trigger("footerAdded", true)
            } else {
                layout.getFooterDiv().hide();
                Static.trigger("footerAdded", false)
            }
            layout.updateLayout();
            this.autoRefresh();
        }
    }

    this.setFooterFont = function(fontObj) {
        if (fontObj.th < 0 || fontObj.name === "" || fontObj.style === "")
            return;
        m_footerFont = fontObj;
        layout.adjustLayout(layout.getFooterDiv(), fontObj.th * 2);
        this.autoRefresh();
    }
    this.setFooterFont(new Misc.Font(15, "Arial", "normal", "bold"))

    this.footerFont = function() {
        return m_footerFont;
    }

    this.enableLegend = function(on) {
        if (!m_legend || m_legend.isEmpty() || on === legendEnable)
            return;
        legendEnable = on;
        if (on) {
            layout.getLegendDiv().show();
        } else {
            layout.getLegendDiv().hide();
        }
        this.autoRefresh();
    }

    this.isLegendEnabled = function(on) {
        return legendEnable;
    }

    /*!
	  Transform the x or y coordinate of a position in the
	  drawing region into a value.

	  \param axisId Axis index
	  \param pos position

	  \return Position as axis coordinate

	  \warning The position can be an x or a y coordinate,
	           depending on the specified axis.
	*/
    this.invTransform = function(axisId, pos) {
        if (this.axisValid(axisId))
            return (this.canvasMap(axisId).invTransform(pos));
        else
            return 0.0;
    }


    /*!
	  \brief Transform a value into a coordinate in the plotting region

	  \param axisId Axis index
	  \param value value
	  \return X or Y coordinate in the plotting region corresponding
	          to the value.
	*/
    this.transform = function(axisId, value) {
        if (this.axisValid(axisId))
            return (this.canvasMap(axisId).transform(value));
        else
            return 0.0;
    }


    /*this.setLegendBackground = function (color) {
  		this.getLayout().getLegendDiv().css("background-color", color);
		
	}
	this.setLegendBackground("rgb(238, 232, 170)")*/

    var _plotBackGround = "";

    this.setPlotBackground = function(color) {
        this.getCentralWidget().getElement().css("background-color", color);

    }
    this.setPlotBackground("rgb(238, 232, 170)")

    /*this.setPlotContainerBackground = function (brush) {
                if(typeof(brush)=="string")
                    brush = new Misc.Brush(brush)
		_plotBackGround = brush;
		this.autoRefresh();
	}*/

    this.plotBackground = function(brush) {
        return this.getCentralWidget().getElement().css("background-color");
    }

    this.setBorderRadius = function(radius) {
        var cw = this.getCentralWidget()
        //cw.getElement().css("border-radius", radius)
        cw.getCanvas().css("border-radius", radius)
    }

    this.borderRadius = function(radius) {
        return m_borderRadius;
    }

    this.findPlotCurve = function(title) {
        var list = this.itemList(Static.Rtti_PlotCurve)
        for (var i = 0; i < list.length; ++i) {
            if (list[i].title() === title)
                return list[i];
        }
        return null;
    }

    this.drawBackGround = function() {
        var painter = new PaintUtil.Painter(centralWidget);
        painter.fillRect(new Misc.Rect(0, 0, centralWidget.width(), centralWidget.height()), _plotBackGround);
        painter = null
    }

    this.drawTitle = function() {
        if (_title === "")
            return;
        var painter = new PaintUtil.Painter(titleWidget);
        painter.setFont(m_titleFont);
        painter.drawText(_title, titleWidget.width() / 2, 2.6 * m_titleFont.th / 2, "center");
        painter = null
    }

    this.drawFooter = function() {
        if (m_footer === "")
            return;
        var painter = new PaintUtil.Painter(footerWidget);
        painter.setFont(m_footerFont);
        painter.drawText(m_footer, footerWidget.width() / 2, 2.6 * m_footerFont.th / 2, "center");
        painter=null
    }

    this.itemList = function(type) {
        if (typeof(type) === 'undefined')
            return m_plotItemStore;
        var list = [];
        for (var i = 0; i < m_plotItemStore.length; ++i) {
            var item = m_plotItemStore[i];
            if (item.rtti === type)
                list.push(item);
        }
        return list;
    }

    this.insertItem = function(item) {
        m_plotItemStore.push(item);
    }

    this.removeItem = function(item) {
        var index = m_plotItemStore.indexOf(item);
        if (index > -1) {
            m_plotItemStore.splice(index, 1);
        }
    }

    /*!
	\param axisId Axis
	\return Map for the axis on the canvas. With this map pixel coordinates can
	translated to plot coordinates and vice versa.
	\sa QwtScaleMap, transform(), invTransform()

	 */
    this.canvasMap = function(axisId) {
        var map = new ScaleMap();
        //        if ( !d_data->canvas )
        //            return map;

        map.setTransformation(this.axisScaleEngine(axisId).transformation());

        var sd = this.axisScaleDiv(axisId);
        map.setScaleInterval(sd.lowerBound(), sd.upperBound());

        if (1) { //this.axisEnabled(axisId)) {
            var s = this.axisWidget(axisId);
            if (axisId == yLeft || axisId == yRight) {
                //var y = s->y() + s->startBorderDist() - d_data->canvas->y();
                var h = s.height();
                map.setPaintInterval(h, 0);
            } else {
                //double x = s->x() + s->startBorderDist() - d_data->canvas->x();
                var w = s.width();
                map.setPaintInterval(0, w);
            }

        }
        /*else {

			// int margin = 0;
			//if ( !plotLayout()->alignCanvasToScale( axisId ) )
			// margin = plotLayout()->canvasMargin( axisId );

			//const QRect &canvasRect = d_data->canvas->contentsRect();
			if (axisId == yLeft || axisId == yRight) {
				map.setPaintInterval(centralWidget.height(), 0);
			} else {
				map.setPaintInterval(0, centralWidget.width());
			}
		}*/
        return map;
    }

    /*!
	\return Scale widget of the specified axis, or NULL if axisId is invalid.
	\param axisId Axis index
	 */
    this.axisWidget = function(axisId) {
        if (this.axisValid(axisId))
            return d_axisData[axisId].scaleWidget;

        return null;
    }

    /*!
	\brief Rebuild the axes scales

	In case of autoscaling the boundaries of a scale are calculated
	from the bounding rectangles of all plot items, having the
	QwtPlotItem::AutoScale flag enabled ( QwtScaleEngine::autoScale() ).
	Then a scale division is calculated ( QwtScaleEngine::didvideScale() )
	and assigned to scale widget.

	When the scale boundaries have been assigned with setAxisScale() a
	scale division is calculated ( QwtScaleEngine::didvideScale() )
	for this interval and assigned to the scale widget.

	When the scale has been set explicitly by setAxisScaleDiv() the
	locally stored scale division gets assigned to the scale widget.

	The scale widget indicates modifications by emitting a
	QwtScaleWidget::scaleDivChanged() signal.

	updateAxes() is usually called by replot().

	\sa setAxisAutoScale(), setAxisScale(), setAxisScaleDiv(), replot()
	QwtPlotItem::boundingRect()
	 */
    this.updateAxes = function() {

        // Find bounding interval of the item data
        // for all axes, where autoscaling is enabled

        var intv = [new Interval(Number.MAX_VALUE, -Number.MAX_VALUE),
            new Interval(Number.MAX_VALUE, -Number.MAX_VALUE),
            new Interval(Number.MAX_VALUE, -Number.MAX_VALUE),
            new Interval(Number.MAX_VALUE, -Number.MAX_VALUE)
        ];

        for (i = 0; i < m_plotItemStore.length; ++i) {

            var item = m_plotItemStore[i];
            // alert(m_plotItemStore[i])

            // alert(m_plotItemStore[i].testItemAttribute( AutoScale ))
            if (!item.testItemAttribute(AutoScale))
                continue;
            //alert(i)

            if (!item.isVisible())
                continue;

            //alert(11)
            //alert(this.axisAutoScale( item.xAxis()))
            if (this.axisAutoScale(item.xAxis()) || this.axisAutoScale(item.yAxis())) {
                //alert(item)
                var rect = item.boundingRect();
                //alert(rect)

                if (rect.width() >= 0.0) {
                    //intv[item.xAxis()] |= new Interval( rect.left(), rect.right());
                    if (rect.left() < intv[item.xAxis()].minValue())
                        intv[item.xAxis()].setMinValue(rect.left());
                    if (rect.right() > intv[item.xAxis()].maxValue())
                        intv[item.xAxis()].setMaxValue(rect.right());
                    //intv[item.xAxis()].setInterval(rect.left(), rect.right())
                }

                if (rect.height() >= 0.0) {
                    //intv[item.yAxis()] |= new Interval( rect.top(), rect.bottom );
                    if (rect.top() < intv[item.yAxis()].minValue())
                        intv[item.yAxis()].setMinValue(rect.top());
                    if (rect.bottom() > intv[item.yAxis()].maxValue())
                        intv[item.yAxis()].setMaxValue(rect.bottom());
                }
            }

        }
        // alert(intv[yLeft].maxValue())

        // Adjust scales

        for (var axisId = 0; axisId < axisCnt; axisId++) {

            var d = d_axisData[axisId];
            var minValue = d.minValue;
            var maxValue = d.maxValue;
            var stepSize = d.stepSize;
            //alert(d.doAutoScale)

            if (d.doAutoScale && intv[axisId].isValid()) {
                //alert("here")
                d.isValid = false;

                minValue = intv[axisId].minValue();
                maxValue = intv[axisId].maxValue();
                //alert("minValue: "+minValue +", "+"maxValue: " + maxValue)

                var xValues = {
                    "x1": minValue,
                    "x2": maxValue
                };
                d.scaleEngine.autoScale(d.maxMajor, xValues, stepSize);
                minValue = xValues["x1"];
                maxValue = xValues["x2"];
            }
            if (!d.isValid) {
                //alert("or here")
                d.scaleDiv = d.scaleEngine.divideScale(
                    minValue, maxValue,
                    d.maxMajor, d.maxMinor, stepSize);
                d.isValid = true;
                //alert(d.scaleDiv.ticks(2))
            }
            var scaleWidget = this.axisWidget(axisId);
            scaleWidget.setScaleDiv(d.scaleDiv);

            //var startDist, endDist;
            var startAndEndObj = {
                start: undefined,
                end: undefined
            }
            scaleWidget.getBorderDistHint(startAndEndObj);
            scaleWidget.setBorderDist(startAndEndObj.start, startAndEndObj.end);

        }
        for (var i = 0; i < m_plotItemStore.length; ++i) {
            var item = m_plotItemStore[i];
            if (item.testItemInterest(ScaleInterest)) {
                item.updateScaleDiv(this.axisScaleDiv(item.xAxis()),
                    this.axisScaleDiv(item.yAxis()));
            }
        }

    }

    /*!
	\brief Attach/Detach a plot item

	\param plotItem Plot item
	\param on When true attach the item, otherwise detach it
	 */
    this.attachItem = function(plotItem, on) {

        if (on) {
            this.insertItem(plotItem);
            if (plotItem.testItemAttribute(Legend)) {
                this.insertLegendItem(plotItem);
            }
        } else {
            if (plotItem.testItemAttribute(Legend)) {
                this.removeLegendItem(plotItem);
            }
            this.removeItem(plotItem);
        }
        //console.log(on)
        Static.trigger("itemAttached", [plotItem, on])
        this.autoRefresh();
    }

    this.replot = function() {
        this.updateAxes();

        //Without a border of width 1px gridlines will not align with scale ticks.
        //var centralDiv = this.getLayout().getCentralDiv()
        //if(centralDiv.css("border-style") =="none")
		    //centralDiv.css("border-style", "solid")
        //if(centralDiv.css("border-width") !=="1px")
		    //centralDiv.css("border-width", 1)

        /*m_scaleDraw.data.plotCanvasBorderWidth =
			parseFloat(m_plot.getLayout().getCentralDiv().
				css("border-width"))*/

        for (var axisId = 0; axisId < axisCnt; axisId++) {
            var axisWidget = d_axisData[axisId].scaleWidget
            axisWidget.scaleDraw().data.plotBorderWidth =
                parseFloat(this.getLayout().getCentralDiv().css("border-width"))
            //console.log(axisWidget.scaleDraw())
            axisWidget.draw();
        }

        this.drawTitle();
        this.drawFooter();

        //var i = 0;
        for (var i = 0; i < m_plotItemStore.length; ++i) {
            if (!m_plotItemStore[i].isVisible())
                continue;
            //console.log(m_plotItemStore[i].rtti)
            //var br = m_plotCanvas.getBorderRadius()
            //console.log(br)
            //if(br)
            //m_plotItemStore[i].setBorderRadius(br)
            m_plotItemStore[i].draw(this.axisScaleDraw(m_plotItemStore[i].xAxis()).scaleMap(),
                this.axisScaleDraw(m_plotItemStore[i].yAxis()).scaleMap());
        }
        
        Static.trigger("replot")

    }

    this.setAutoReplot(true)


    layout.getTitleDiv().hide();
    if (typeof(pTitle) !== 'undefined') {
        this.setTitle(pTitle)
    }

    m_defaultCursor = layout.getCentralDiv().css("cursor");
    this.setCursor("crosshair");

    this.enableAxis(yRight, false);
    this.enableAxis(xTop, false);
    layout.getFooterDiv().hide(); //initially hidden
    layout.getLegendDiv().hide(); //initially hidden


    Static.bind('resize', function(){
        self.replot();
    });
    
    //$(window).resize(function() {
        //self.replot();
        //console.log(22)
        //trigger("resizeEvent")
        /*if($("#toolBar")[0]!=undefined){//we have a toolbar
			if ( $("#toolBar").css('display') != 'none' ){
			    // element is not hidden
			    var percentHeight = (($(window).height()-$("#toolBar").height())/$(window).height()*100)-1
				console.log(percentHeight+"%")
				$("plotDiv").css("height", 400)//percentHeight+"%")
			}else{
				$("plotDiv").css("height", 98+"%")
			}

			//var tbHeight = $("#toolBar").height()
			//if()
			//console.log($("#toolBar")[0].display)
		}else{
			$("plotDiv").css("height", 98+"%")
		}*/
    //});

    this.setAutoReplot(false)

    this.toString = function() {
        return '[Plot "' + _title + '"]';
    }

    //m_plotCanvas = new PlotCanvas(this)

    
    //Force replot before printing
    Static.bind("beforePrint", function() {
        //alert("before")	
        self.replot()
    })

};
define("jQwtPlot", ["static","widget","scaleWidget"], function(){});


/////////////////ScaleDiv/////////////////start
/*!
Construct a division without ticks
lowerBound First boundary
upperBound Second boundary
lowerBound might be greater than upperBound for inverted scales
 */
var ScaleDiv = function (arg1, arg2, arg3, arg4, arg5) {

	// var NoTick = -1;
	// var MinorTick = 0;
	// var MediumTick = 1;
	// var MajorTick = 2;
	// var NTickTypes = 3;

	var d_lowerBound = 0.0;
	var d_upperBound = 0.0;
	var d_ticks = []; //array of array of numbers
	if (typeof(arg1) == 'undefined' || typeof(arg2) == 'undefined') { //constructor 1

	} else if ((typeof(arg3) == 'undefined') && ((typeof(arg1) == 'object') && (typeof(arg2) == 'object'))) { //constructor 2
		var interval = arg1;
		var ticks = arg2;
		d_lowerBound = interval.minValue();
		d_upperBound = interval.maxValue();

		for (var i = 0; i < NTickTypes; i++)
			d_ticks[i] = ticks[i];

	} else if (typeof(arg4) == 'undefined') { //constructor 3
		lowerBound = arg1;
		upperBound = arg2;
		ticks = arg3;
		d_lowerBound = lowerBound;
		d_upperBound = upperBound;

		for (i = 0; i < NTickTypes; i++)
			d_ticks[i] = ticks[i];

	} else if ((typeof(arg1) == 'undefined') && (typeof(arg2) == 'undefined') && (typeof(arg3) == 'undefined') && (typeof(arg4) == 'undefined') && (typeof(arg5) == 'undefined')) { //constructor 3
		lowerBound = arg1;
		upperBound = arg2;
		minorTicks = arg3;
		mediumTicks = arg4;
		majorTicks = arg5;
		d_lowerBound = lowerBound;
		d_upperBound = upperBound;
		d_ticks[MinorTick] = minorTicks;
		d_ticks[MediumTick] = mediumTicks;
		d_ticks[MajorTick] = majorTicks;

	}

	/*!
	Change the interval
	lowerBound First boundary
	upperBound Second boundary
	lowerBound might be greater than upperBound for inverted scales
	 */
	this.setInterval = function (arg1, arg2) {
		if (typeof(arg1) == 'number' && typeof(arg2) == 'number') {
			lowerBound = arg1;
			upperBound = arg2;
			d_lowerBound = lowerBound;
			d_upperBound = upperBound;
		} else if (typeof(arg1) == 'object' && typeof(arg2) == 'undefined') {
			interval = arg1;
			d_lowerBound = interval.minValue();
			d_upperBound = interval.maxValue();
		}

	};
	/*!
	lowerBound -> upperBound
	 */
	this.interval = function () {
		return new Interval(d_lowerBound, d_upperBound);
	};
	/*!
	Set the first boundary
	lowerBound First boundary
	 */
	this.setLowerBound = function (lowerBound) {
		d_lowerBound = lowerBound;
	};

	/*!
	First boundary
	 */
	this.lowerBound = function () {
		return d_lowerBound;
	};

	/*!
	Set the second boundary
	upperBound Second boundary
	 */
	this.setUpperBound = function (upperBound) {
		d_upperBound = upperBound;
	};

	/*!
	upper bound
	 */
	this.upperBound = function () {
		return d_upperBound;
	};

	/*
	upperBound() - lowerBound()
	 */
	this.range = function () {
		return d_upperBound - d_lowerBound;
	};

	// Check if the scale division is empty( lowerBound() == upperBound() )
	this.isEmpty = function () {
		return (d_lowerBound == d_upperBound);
	};

	// Check if the scale division is increasing( lowerBound() <= upperBound() )
	this.isIncreasing = function () {
		return d_lowerBound <= d_upperBound;
	};

	/*!
	Return if a value is between lowerBound() and upperBound()
	value Value
	return true/false
	 */
	this.contains = function (value) {
		var min = Math.min(d_lowerBound, d_upperBound);
		var max = Math.max(d_lowerBound, d_upperBound);
		return value >= min && value <= max;
	}
	/*!
	Invert the scale division
	 */
	this.invert = function () {
		//swap
		var temp = d_lowerBound;
		d_lowerBound = d_upperBound;
		d_upperBound = temp;

		for (i = 0; i < NTickTypes; i++) {
			var ticks = d_ticks[i];
			var size = ticks.count();
			var size2 = size / 2;

			for (j = 0; j < size2; j++) {
				//qSwap( ticks[j], ticks[size - 1 - j] );
				temp = ticks[j];
				ticks[j] = ticks[size - 1 - j];
				ticks[size - 1 - j] = temp;
			}
		}
	};

	/*!
	A scale division with inverted boundaries and ticks
	 */
	this.inverted = function () {
		var other = new ScaleDiv(d_lowerBound, d_upperBound);
		other.invert();
		return other;
	};

	/*!
	Return a scale division with an interval [lowerBound, upperBound]
	where all ticks outside this interval are removed
	param lowerBound Lower bound
	param upperBound Upper bound
	return Scale division with all ticks inside of the given interval
	note lowerBound might be greater than upperBound for inverted scales
	 */
	this.bounded = function (lowerBound, upperBound) {
		var min = Math.min(lowerBound, upperBound);
		var max = Math.max(lowerBound, upperBound);

		var sd = new ScaleDiv();
		sd.setInterval(lowerBound, upperBound);

		for (tickType = 0; tickType < NTickTypes; tickType++) {
			var ticks = d_ticks[tickType];

			var boundedTicks = [];
			for (i = 0; i < ticks.size(); i++) {
				var tick = ticks[i];
				if (tick >= min && tick <= max)
					boundedTicks.push(tick);
			}

			sd.setTicks(tickType, boundedTicks);
		}

		return sd;

	};

	/*!
	Assign ticks
	param type MinorTick, MediumTick or MajorTick
	param ticks Values of the tick positions
	 */
	this.setTicks = function (type, ticks) {
		if (type >= 0 && type < NTickTypes)
			d_ticks[type] = ticks;
	};

	/*!
	Return a list of ticks
	param type MinorTick, MediumTick or MajorTick
	return Tick list
	 */
	this.ticks = function (type) {
		if (type >= 0 && type < NTickTypes)
			return d_ticks[type];

		return [];
	};

};
ScaleDiv.prototype.toString = function () {
	return '[ScaleDiv]';
}
/////////////////////////////////////////end
;
define("scaleDiv", function(){});


///////////////Interval////////////////////////
function Interval(minValue, maxValue, borderFlags) {

	var d_minValue = 0.0;
	var d_maxValue = -1.0;
	var d_borderFlags = IncludeBorders;

	//minValue, maxValue, borderFlags
	if (typeof(minValue) !== 'undefined' && typeof(maxValue) !== 'undefined') {
		d_minValue = minValue;
		d_maxValue = maxValue;
	}
	if (typeof(borderFlags) !== 'undefined')
		d_borderFlags = borderFlags;

	this.toString = function () {
		return '[Interval]';
	};
	/*!
	Assign the limits of the interval

	\param minValue Minimum value
	\param maxValue Maximum value
	\param borderFlags Include/Exclude borders
	 */
	this.setInterval = function (minValue, maxValue, borderFlags) {
		d_minValue = minValue;
		d_maxValue = maxValue;
		d_borderFlags = borderFlags;
	}

	/*!
	Change the border flags

	\param borderFlags Or'd BorderMode flags
	\sa borderFlags()
	 */
	this.setBorderFlags = function (borderFlags) {
		d_borderFlags = borderFlags;
	}

	/*!
	\return Border flags
	\sa setBorderFlags()
	 */
	this.borderFlags = function () {
		return d_borderFlags;
	}

	/*!
	Assign the lower limit of the interval

	\param minValue Minimum value
	 */
	this.setMinValue = function (minValue) {
		d_minValue = minValue;
	}

	/*!
	Assign the upper limit of the interval

	\param maxValue Maximum value
	 */
	this.setMaxValue = function (maxValue) {
		d_maxValue = maxValue;
	}

	//! \return Lower limit of the interval
	this.minValue = function () {
		return d_minValue;
	}

	//! \return Upper limit of the interval
	this.maxValue = function () {
		return d_maxValue;
	}

	/*!
	A interval is valid when minValue() <= maxValue().
	In case of QwtInterval::ExcludeBorders it is true
	when minValue() < maxValue()

	\return True, when the interval is valid
	 */
	this.isValid = function () {
		if ((d_borderFlags & ExcludeBorders) === 0)
			return d_minValue <= d_maxValue;
		else
			return d_minValue < d_maxValue;
	}

	/*!
	\brief Return the width of an interval

	The width of invalid intervals is 0.0, otherwise the result is
	maxValue() - minValue().

	\return Interval width
	\sa isValid()
	 */
	this.width = function () {
		return this.isValid() ? (d_maxValue - d_minValue) : 0.0;
	}
	//! \return true, if isValid() && (minValue() >= maxValue())
	this.isNull = function () {
		return this.isValid() && d_minValue >= d_maxValue;
	}

	/*!
	Invalidate the interval

	The limits are set to interval [0.0, -1.0]
	\sa isValid()
	 */
	this.invalidate = function () {
		d_minValue = 0.0;
		d_maxValue = -1.0;
	}
	/*!
	\brief Normalize the limits of the interval

	If maxValue() < minValue() the limits will be inverted.
	\return Normalized interval

	\sa isValid(), inverted()
	 */
	this.normalized = function () {
		if (d_minValue > d_maxValue) {
			return this.inverted();
		}
		if (d_minValue == d_maxValue && d_borderFlags == ExcludeMinimum) {
			return this.inverted();
		}

		return this;
	}
	/*!
	Invert the limits of the interval
	\return Inverted interval
	\sa normalized()
	 */
	this.inverted = function () {
		var borderFlags = IncludeBorders;
		if (d_borderFlags & ExcludeMinimum)
			borderFlags |= ExcludeMaximum;
		if (d_borderFlags & ExcludeMaximum)
			borderFlags |= ExcludeMinimum;

		return new Interval(d_maxValue, d_minValue, borderFlags);
	}

	/*!
	Test if a value is inside an interval

	\param value Value
	\return true, if value >= minValue() && value <= maxValue()
	 */
	this.contains = function (value) {
		if (!this.isValid())
			return false;

		if (value < d_minValue || value > d_maxValue)
			return false;

		if (value == d_minValue && d_borderFlags & ExcludeMinimum)
			return false;

		if (value == d_maxValue && d_borderFlags & ExcludeMaximum)
			return false;

		return true;
	}

	/*!
	Limit the interval, keeping the border modes

	\param lowerBound Lower limit
	\param upperBound Upper limit

	\return Limited interval
	 */
	this.limited = function (lowerBound, upperBound) {
		if (!this.isValid() || lowerBound > upperBound)
			return new Interval();

		var minValue = Math.max(d_minValue, lowerBound);
		minValue = Math.min(minValue, upperBound);

		var maxValue = Math.max(d_maxValue, lowerBound);
		maxValue = Math.min(maxValue, upperBound);

		return new Interval(minValue, maxValue, d_borderFlags);
	}

};
///////////////////////////////////////////////end
;
define("interval", function(){});


/////////////////Transform - base class//////////start
var Transform = function () {}

Transform.prototype.toString = function () {
	return '[Transform]';
}

/*!
value Value to be bounded
return value unmodified
 */
Transform.prototype.bounded = function (value) {
	return value;
}
//////////////////////////////////////////////////////end

/////////////////NullTransform - subclass of Transform//////////start
var NullTransform = function () {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	Transform.call(this);
}
NullTransform.prototype = Object.create(Transform.prototype);
// Set the "constructor" property to refer to NullTransform
NullTransform.prototype.constructor = NullTransform;

NullTransform.prototype.toString = function () {
	return '[NullTransform]';
}

/*!
value Value to be transformed
return value unmodified
 */
NullTransform.prototype.transform = function (value) {
	return value;
}

/*!
value Value to be transformed
return value unmodified
 */
NullTransform.prototype.invTransform = function (value) {
	return value;
}

//! \return Clone of the transformation
NullTransform.prototype.copy = function () {
	return new NullTransform();
}
//////////////////////////////////////////////////////end

/////////////////LogTransform - subclass of Transform//////////start
var LogTransform = function () {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	Transform.call(this);
}
LogTransform.prototype = Object.create(Transform.prototype);
// Set the "constructor" property to refer to NullTransform
LogTransform.prototype.constructor = LogTransform;

LogTransform.prototype.toString = function () {
	return '[LogTransform]';
}

/*!
value Value to be transformed
return log( value )
 */
LogTransform.prototype.transform = function (value) {

	return Math.log(value);
}

/*!
param value Value to be transformed
return exp( value )
 */
LogTransform.prototype.invTransform = function (value) {
	return Math.exp(value);
}

/*!
value Value to be bounded
return qBound( LogMin, value, LogMax )
 */
LogTransform.prototype.bounded = function (value) {
	if (value > Number.MAX_VALUE)
		return Number.MAX_VALUE;
	if (value < Number.MIN_VALUE)
		return Number.MIN_VALUE;
	return value;
}

//! \return Clone of the transformation
LogTransform.prototype.copy = function () {
	return new LogTransform();
}
//////////////////////////////////////////////////////end

/////////////////PowerTransform - subclass of Transform//////////start
var PowerTransform = function (exponent) {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	Transform.call(this);
	this.d_exponent = exponent;
}
PowerTransform.prototype = Object.create(Transform.prototype);
// Set the "constructor" property to refer to NullTransform
PowerTransform.prototype.constructor = PowerTransform;

PowerTransform.prototype.toString = function () {
	return '[PowerTransform]';
}

/*!
value Value to be transformed
return Exponentiation preserving the sign
 */
PowerTransform.prototype.transform = function (value) {
	if (value < 0.0)
		return -Math.pow(-value, 1.0 / d_exponent);
	else
		return Math.pow(value, 1.0 / d_exponent);

}

/*!
value Value to be transformed
return Inverse exponentiation preserving the sign
 */
PowerTransform.prototype.invTransform = function (value) {
	if (value < 0.0)
		return -Math.pow(-value, d_exponent);
	else
		return Math.pow(value, d_exponent);
}

//! \return Clone of the transformation
PowerTransform.prototype.copy = function () {
	return new PowerTransform(d_exponent);
}

//////////////////////////////////////////////////////end
;
define("transform", function(){});


Static.mTransformPath = function(xMap, yMap, path, doAlign) {
	var shape = new Misc.MPath;
	//shape.setFillRule( path.fillRule() );

	for (var i = 0; i < path.elementCount(); i++) {
		var element = path.elementAt(i);

		var x = xMap.transform(element.x);
		var y = yMap.transform(element.y);

		switch (element.type) {
		case MoveToElement: {
				if (doAlign) {
					x = Math.round(x);
					y = Math.round(y);
				}

				shape.moveTo(x, y);
				break;
			}
		case LineToElement: {
				if (doAlign) {
					x = Math.round(x);
					y = Math.round(y);
				}

				shape.lineTo(x, y);
				break;
			}
		case CurveToElement: {
				var element1 = path.elementAt(++i);
				var x1 = xMap.transform(element1.x);
				var y1 = yMap.transform(element1.y);

				var element2 = path.elementAt(++i);
				var x2 = xMap.transform(element2.x);
				var y2 = yMap.transform(element2.y);

				shape.cubicTo(x, y, x1, y1, x2, y2);
				break;
			}
		case CurveToDataElement: {
				break;
			}
		}
	}

	return shape;
}


Static.mInvTransform = function(xMap, yMap, rect) {
	var x1 = xMap.invTransform(rect.left());
	var x2 = xMap.invTransform(rect.right() - 1);
	var y1 = yMap.invTransform(rect.top());
	var y2 = yMap.invTransform(rect.bottom() - 1);
	var r = new Misc.Rect(new Misc.Point(x1, y1), x2 - x1, y2 - y1);
	//r.normalized()
	return r.normalized();

}

Static.mTransform = function(xMap, yMap, rect) {
	var x1 = xMap.transform(rect.left());
	var x2 = xMap.transform(rect.right())// - 1);
	var y1 = yMap.transform(rect.top());
	var y2 = yMap.transform(rect.bottom())// - 1);
	var r = new Misc.Rect(new Misc.Point(x1, y1), x2 - x1, y2 - y1);
	//r.normalized()
	return r.normalized();

}

/////////////////ScaleMap//////////start
/*!
   \brief A scale map

   QwtScaleMap offers transformations from the coordinate system
   of a scale into the linear coordinate system of a paint device 
   and vice versa.
*/
function ScaleMap() {
	var d_s1 = 0.0;
	var d_s2 = 1.0;
	var d_p1 = 0.0;
	var d_p2 = 1.0;
	var d_cnv = 1.0;
	var d_ts1 = 0.0;
	var d_transform = null;

	/*!
	Initialize the map with a transformation
	 */
	this.setTransformation = function (trans) {

		if (trans !== d_transform) {

			d_transform = trans;

		}

		this.setScaleInterval(d_s1, d_s2);
		//alert(d_transform)
	}

	this.transformation = function () {
		return d_transform;
	}

	/*
	Specify the borders of the scale interval
	s1 first border
	s2 second border
	scales might be aligned to
	transformation depending boundaries
	 */
	this.setScaleInterval = function (s1, s2) {
		d_s1 = s1;
		d_s2 = s2;
		if (d_transform) {
			d_s1 = d_transform.bounded(d_s1);
			d_s2 = d_transform.bounded(d_s2);
		}
		this.updateFactor();
	}

	/*!
	Specify the borders of the paint device interval
	p1 first border
	p2 second border
	 */
	this.setPaintInterval = function (p1, p2) {
		d_p1 = p1;
		d_p2 = p2;
		this.updateFactor();
	}

	this.updateFactor = function () {
		d_ts1 = d_s1;
		var ts2 = d_s2;
		if (d_transform) {
			d_ts1 = d_transform.transform(d_ts1);
			ts2 = d_transform.transform(ts2);
		}
		d_cnv = 1.0;
		if (d_ts1 != ts2) {
			d_cnv = (d_p2 - d_p1) / (ts2 - d_ts1);
		}
	}

	/*!
	Transform a rectangle from paint to scale coordinates
	xMap X map
	yMap Y map
	pos Position in paint coordinates
	Position in scale coordinates
	 */
	this.invTransform = function (xMap, yMap, pos) {
		if (typeof(yMap) === "undefined")
			return this.invTransform1(xMap);
		return new Misc.Point(xMap.invTransform1(pos.x), yMap.invTransform1(pos.y));
		//return {x : xMap.invTransform1(pos.x), y : yMap.invTransform1(pos.y)};
	}

	/*!
	Transform a point from scale to paint coordinates
	xMap X map
	yMap Y map
	pos Position in scale coordinates
	Position in paint coordinates
	 */
	this.transform = function (xMap, yMap, pos) {
		if (typeof(yMap) === "undefined")
			return this.transform1(xMap);
		return {
			x: xMap.transform1(pos.x),
			y: yMap.transform1(pos.y)
		};
	}

	/*!
	Transform a point related to the scale interval into an point
	related to the interval of the paint device

	\param s Value relative to the coordinates of the scale
	\return Transformed value

	\sa invTransform()
	 */
	this.transform1 = function (s) {

		if (d_transform) {
			//alert(s)
			s = d_transform.transform(s);
			//alert(s)
		}

		return d_p1 + (s - d_ts1) * d_cnv;
	}

	/*!
	Transform an paint device value into a value in the
	interval of the scale.

	\param p Value relative to the coordinates of the paint device
	\return Transformed value

	\sa transform()
	 */
	this.invTransform1 = function (p) {
		var s = d_ts1 + (p - d_p1) / d_cnv;
		if (d_transform)
			//s = d_transform.invTransform1(s);
			s = d_transform.invTransform(s);
		return s;
	}

	this.toString = function () {
		return '[ScaleMap "' + d_cnv + '"]';
	}

}
//////////////////////////////////////////////////////end
;
define("scaleMap", ["static","transform"], function(){});

class jObject {
    constructor(parent) {
        var self = this;
        this.m_isEnabled = false;
        this.element = null //$("body");
        this.m_parent = null;
        this.m_children = [];
        this.m_mouseTracking = true
        this.m_filterObjs = []

        if(!(parent instanceof jObject))
            parent = undefined

        this.m_objectName = "jObject";

        //this.element = $('<div />');
        //$('body').append(this.element)
        //this.element = this.objectElement

        if (parent !== undefined /*&& parent.m_objectName !== "jObject"*/ ) {
            this.m_parent = parent
            parent.m_children.push(this)
        }



    }

    //////////////////////////////////////

    //////////////////////////////////


    setObjectName(name) {
        this.m_objectName = name;
    }

    objectName() {
        return this.m_objectName;
    }

    isWidget() {
        return (this.toString() == '[Widget]')
    }

    parent() {
        return this.m_parent
    }

    children() {
        return this.m_children
    }

    event(event) {
        //console.log(self.objectName()+'(): event() called')
        return true;
    }

    getObjectElement() {
        return this.objectElement
    }

    getElement() {
        return this.element
    }



    elementEvent( /*element,*/ on) {
        if (this instanceof jWidget) {
            var self = this
            if (on) {

                self.element.on('mousedown mouseup mousemove mouseenter mouseleave mousewheel', function(event) {
                    //console.log("event bind")        
                    if (self.m_filterObjs.length) {
                        self.m_filterObjs.forEach(function(filterObj) {
                            if (!filterObj.eventFilter(self, event))
                                return self.event(event)

                        })

                    } else {
                        return self.event(event)
                    }

                });
                $('body').on('keydown keyup', function(event) {
                    if (self.m_filterObjs.length) {
                        self.m_filterObjs.forEach(function(filterObj) {
                            if (!filterObj.eventFilter(self, event))
                                return self.event(event)

                        })

                    } else {
                        return self.event(event)
                    }
                })

            } else {
                self.element.off('mousedown mouseup mousemove mouseenter mouseleave mousewheel');
                $('body').off('keydown keyup');
            }
        }
    }

    setMouseTracking(on) {
        if (this.element && on) {
            var self = this
            this.element.on('mousemove', function(event) {
                //console.log("event bind")        
                return self.event(event)
            });
            this.m_mouseTracking = true
        } else {
            this.element.off('mousemove')
            this.m_mouseTracking = false
        }
    }

    hasMouseTracking() {
        return this.m_mouseTracking;
    }

    setParentElement(parent) {
        if (parent == undefined) {
            //Make body the parent
            $("body").append(this.element)
        } else {
            this.m_parent.element[0].appendChild(this.element[0])

        }
    }

    hasSameElement(otherObj) {
        return (this.getElement() == otherObj.getElement())
    }

    /*
	An event filter is an object that receives all events that are sent to this object. The filter can either stop the 
	event or forward it to this object. The event filter filterObj receives events via its eventFilter() function. 
	The eventFilter() function must return true if the event should be filtered, (i.e. stopped); otherwise it must return false.
    If multiple event filters are installed on a single object, the filter that was installed last is activated first.*/
    installEventFilter(filterObj) {
        if (this.hasSameElement(filterObj)) {
            console.warn("hasSameElement")
            return
        }
        this.m_filterObjs.push(filterObj)
    }
    
    /*Removes an event filter object obj from this object. The request is ignored if such an event filter has not been installed.*/
    removeEventFilter(obj) {
        var index = this.m_filterObjs.indexOf(obj);
        if (index > -1) {
            this.m_filterObjs.splice(index, 1);
        }
    }

    /*
    Filters events if this object has been installed as an event filter for the watched object.
    In your reimplementation of this function, if you want to filter the event out, i.e. stop it being handled further, return true; 
    otherwise return false.*/
    eventFilter(watched, event) {
        
    }

    toString() {
        return '[HObject]';
    }

    /////from HObject/////////////////////
    

};
define("jObject", function(){});


class jWidget extends jObject {
    constructor(parent) {
        super(parent)
        var self = this;
        this.m_objectName = "jWidget";
        this.sideAndBottomBorderWidth = 0;
        this.topBorderWidth = 0;
        this.m_visible = true;

        this.m_size = new Misc.Size(0, 0);

        this.element = $('<div />').attr({
                style: "position: absolute; overflow: hidden; border-color: gray; border-width: 2px; border-style: solid; border-top-width: 4px;"
            })


        this.canvas = null
        if (parent !== undefined && parent) {
            this.element.css('border-style', 'none')
            console.log("canvas created")
            this.canvas = $('<canvas />').attr({
                    //style: "position: absolute; background-color: transparent"
                    style: "background-color: lightBlue;"
                });
            if (this.element)
                this.element.append(this.canvas)
            if (parent.element)
                parent.element.append(this.element)
            else
                $('body').append(this.element)


            if (parent instanceof jWidget)
                this.move(parseInt(parent.canvas.css('borderLeftWidth')), parseInt(parent.canvas.css('border-top-width')))

        } else {
            console.log("canvas created")
            this.canvas = $('<canvas />').attr({
                    //style: "position: absolute; background-color: transparent"
                    style: "background-color: lightGray;"
                });
            $('body').append(this.element)
            if (this.element)
                this.element.append(this.canvas)

            this.sideAndBottomBorderWidth = 2
            this.topBorderWidth = 4

        }
        this.sync()
        this.elementEvent(true)
        this.setMouseTracking(false)

        this.m_size.width = this.width();
        this.m_size.height = this.height();

        Static.bind('resize', function(e) {
            self.sync()
        });
    }
    /*---------------Methods------------------------*/
    /*Keeps DIV and CANVAS elements the same size*/
    sync() {
        this.element.css('height', this.height())
    }

    /*Get the property that holds the size of the widget excluding any frame*/
    size() {
        return this.m_size;
    }

    /*Set the property that holds the size of the widget excluding any frame
if param2 is defined, it represents the height and param1 represents the width.
if param2 is not defined, param represents the size object.
*/
    resize(param1, param2) {
        var oldSize = new Misc.Size(this.m_size.width, this.m_size.height);
        if (param2 !== undefined) {
            this.canvas.css('width', param1)
            this.canvas.css('height', param2)
        } else {
            this.canvas.css('width', param1.width)
            this.canvas.css('height', param1.height)
        }
        //this.sync();
        this.m_size.width = this.width()
        this.m_size.height = this.height()
        Static.trigger('resize', [oldSize, this.m_size]);
    }

    /*Sets the property that holds the position of the widget within its parent widget
If the widget is a window, the position is that of the widget in the document, including its frame.*/
    move(x, y) {
        this.element.css('left', x)
        this.element.css('top', y)
    }

    /*Gets the property that holds the position of the widget within its parent widget
If the widget is a window, the position is that of the widget in the document, including its frame.*/
    pos() {
        return new Misc.Point(parseInt(this.element.css('left')), parseInt(this.element.css('top')))
    }

    width() {
        return (parseInt(this.canvas.css('width')) - 2 * this.sideAndBottomBorderWidth)
    }

    height() {
        return (parseInt(this.canvas.css('height')) - this.sideAndBottomBorderWidth - this.topBorderWidth)
    }

    rect() {
        return new Misc.Rect(0, 0, this.width(), this.height());
    }
    /*Returns the area inside the widget's margins.*/
    contentsRect() {
        return rect();
    }

    isVisible() {
        return this.m_visible;
    }

    setVisible(visible) {
        if (!visible)
            this.element.hide()
        else
            this.element.show()
        this.m_visible = visible;
    }

};
define("jWidget", ["static","jObject"], function(){});


/*Static.Rtti_PlotItem = 0; //Unspecific value, that can be used, when it doesn't matter.
Static.Rtti_PlotGrid = 1; //For QwtPlotGrid.
Static.Rtti_PlotScale = 2; //For QwtPlotScaleItem.
Static.Rtti_PlotLegend = 3; //For QwtPlotLegendItem.
Static.Rtti_PlotMarker = 4; //For QwtPlotMarker.
Static.Rtti_PlotCurve = 5; //For QwtPlotCurve.
Static.Rtti_PlotSpectroCurve = 6; //For QwtPlotSpectroCurve.
Static.Rtti_PlotIntervalCurve = 7; //For QwtPlotIntervalCurve.
Static.Rtti_PlotHistogram = 8; //For QwtPlotHistogram.
Static.Rtti_PlotSpectrogram = 9; //For QwtPlotSpectrogram.
Static.Rtti_PlotSVG = 10; //For QwtPlotSvgItem.
Static.Rtti_PlotTradingCurve = 11; //For QwtPlotTradingCurve.
Static.Rtti_PlotBarChart = 12; //For QwtPlotBarChart.
Static.Rtti_PlotMultiBarChart = 13; //For QwtPlotMultiBarChart.
Static.Rtti_PlotShape = 14; //For QwtPlotShapeItem.
Static.Rtti_PlotTextLabel = 15; //For QwtPlotTextLabel.
Static.Rtti_PlotZone = 16; //For QwtPlotZoneItem.
Static.Rtti_PlotUserItem = 1000; //Values >= Rtti_PlotUserItem are reserved for plot items not implemented in the Qwt library.
*/
/////////////////PlotItem/////////////////start
function PlotItem(tle) {
	var self = this;
	this.plotId = "";
	var _context = null;
	var _plot = null;
	var cnvs = null;
	var d_interests

	var m_domDiv = $("#centralDiv");

	var m_isVisible = true;
	var m_attributes = 0x0;
	//interests( 0 ),
	//renderHints( 0 ),
	//renderThreadCount( 1 ),
	var m_z = 0.0;
	var m_xAxis = xBottom;
	var m_yAxis = yLeft;
	var m_title = tle || "";

	this.rtti = Static.Rtti_PlotItem;

	var m_legendIconSize = new Misc.Size(10, 10);

	this.getLegendIconSize = function () {
		return m_legendIconSize;
	}

	/*!
	Set the size of the legend icon

	The default setting is 8x8 pixels

	\param size Size
	\sa legendIconSize(), legendIcon()
	 */
	this.setLegendIconSize = function (size) {
		//if ( (m_legendIconSize.width != size.width) &&  (m_legendIconSize.height != size.height))
		{
			m_legendIconSize = size;
			//legendChanged();
			if(_plot)
              _plot.updateLegend(this)
		}
	}

	//if (typeof(tle) !== 'undefined')
		//m_title = tle;

	/*!
	   Toggle an item interest

	   \param interest Interest type
	   \param on true/false

	   \sa testItemInterest(), ItemAttribute
	*/
	this.setItemInterest = function( interest, on ){
	    //if ( d_interests.testFlag( interest ) != on )
	    {
	        if ( on )
	            d_interests |= interest;
	        else
	            d_interests &= ~interest;

	        this.itemChanged();
	    }
	}

	/*!
	   Test an item interest

	   \param interest Interest type
	   \return true/false
	   \sa setItemInterest(), ItemAttribute
	*/
	this.testItemInterest = function( interest ){
	    //return d_interests.testFlag( interest );
	    return d_interests & interest;
	}



	this.plot = function () {
		return _plot;
	}

	this.title = function () {
		return m_title;
	}

    this.setTitle = function (tle) {
    	if(m_title !== tle){
			m_title = tle;
			this.legendChanged();
			this.itemChanged()
		}
		/*if(_plot)
              _plot.updateLegend(this)*/
	}

	//this.setBorderRadius = function(radius){
		//cnvs.css("border-radius", radius)		
	//}

	this.attach = function (plot) {
		if (plot == _plot) { //Cannot attach the same plot more than once
			return;
		}

		if (_plot) {
			_plot.attachItem(this, false);
			this.getContext().clearRect(0, 0, cnvs[0].width, cnvs[0].height);
		}

		_plot = plot;

		if (_plot) {

			if (cnvs === null) {

				cnvs = $('<canvas />').attr({
						style: "position: absolute; background-color: transparent"
					});
				_plot.getLayout().getCentralDiv().append(cnvs);
				cnvs.css({"border-radius": "inherit"});
				
				if (m_z != 0) {
					cnvs.css("zIndex", m_z);
				}
				//var cw = _plot.getCentralWidget()
				// var radius = parseInt(_plot.getLayout().getCentralDiv().css("border-radius"))
				 //console.log(_plot.borderRadius())
				 //console.log(plot.borderRadius())
				 //cnvs.css("border-radius", 25)
				// 	//parseInt(plotCanvas.css("border-radius")))

			}
			_plot.attachItem(this, true);
		}

	}

	/*!
	\brief This method detaches a QwtPlotItem from any
	QwtPlot it has been associated with.

	detach() is equivalent to calling attach( NULL )
	\sa attach()
	 */
	this.detach = function () {
		this.attach(null);
	}

	this.setZ = function (z) {
		if (m_z !== z) {
			m_z = z;
			if (cnvs) {
				cnvs.css("zIndex", m_z)
			}
			this.itemChanged()
		}
	}

        this.getZ = function (z) {
		return m_z
	}

	this.getCanvas = function () {
		return cnvs;
	}

	this.syncSizes = function () {
		var cd = _plot.getLayout().getCentralDiv()
		//var bw = parseInt(_plot.getPlotCanvas().css("border-width"))
		//console.log(bw)
		cnvs[0].width = parseFloat(cd.css("width"));
		cnvs[0].height = parseFloat(cd.css("height"));
	}

	this.getContext = function () {
		this.syncSizes();
		return cnvs[0].getContext("2d");
	};
	/*!
	Set X and Y axis

	The item will painted according to the coordinates of its Axes.

	\param xAxis X Axis ( QwtPlot::xBottom or QwtPlot::xTop )
	\param yAxis Y Axis ( QwtPlot::yLeft or QwtPlot::yRight )

	\sa setXAxis(), setYAxis(), xAxis(), yAxis(), QwtPlot::Axis
	 */
	this.setAxes = function (xAxis, yAxis) {
		if (xAxis == xBottom || xAxis == xTop)
			m_xAxis = xAxis;

		if (yAxis == yLeft || yAxis == yRight)
			m_yAxis = yAxis;

		this.itemChanged();
	}

	/*!
	Toggle an item attribute

	\param attribute Attribute type
	\param on true/false

	\sa testItemAttribute(), ItemInterest
	 */
	this.setItemAttribute = function (attribute, on) {
		if (on)
			m_attributes |= attribute;
		else
			m_attributes &= ~attribute;
		if ( attribute == Legend )
            this.legendChanged();

        this.itemChanged();

	}

	/*!
	Test an item attribute

	\param attribute Attribute type
	\return true/false
	\sa setItemAttribute(), ItemInterest
	 */
	this.testItemAttribute = function (attribute) {
		return m_attributes & attribute;
	}

	//! Show the item
	this.show = function () {
		this.setVisible(true);
	}

	//! Hide the item
	this.hide = function () {
		this.setVisible(false);
	}

	/*!
	Show/Hide the item

	\param on Show if true, otherwise hide
	\sa isVisible(), show(), hide()
	 */
	this.setVisible = function (on) {
		if (/*cnvs && */on !== m_isVisible) {
			m_isVisible = on;
			if (!on)
				cnvs.hide();
			else
				cnvs.show();
			this.itemChanged();
			Static.trigger("visibilityChange", [this, on])
		}
	}

	/*!
	\return true if visible
	\sa setVisible(), show(), hide()
	 */
	this.isVisible = function () {
		return m_isVisible;
	}

	/*!
   Update the legend and call QwtPlot::autoRefresh() for the
   parent plot.

   \sa QwtPlot::legendChanged(), QwtPlot::autoRefresh()
	*/
	this.itemChanged = function(){
	    if ( _plot )
	        _plot.autoRefresh();
	}

	/*!
	   Update the legend of the parent plot.
	   \sa QwtPlot::updateLegend(), itemChanged()
	*/
	this.legendChanged = function()
	{
	    if ( this.testItemAttribute(Legend ) && _plot )
	        _plot.updateLegend( this );
	}



	/*!
	Set the X axis

	The item will painted according to the coordinates its Axes.

	\param axis X Axis ( QwtPlot::xBottom or QwtPlot::xTop )
	\sa setAxes(), setYAxis(), xAxis(), QwtPlot::Axis
	 */
	this.setXAxis = function (axis) {
		if (axis == xBottom || axis == xTop) {
			m_xAxis = axis;
			this.itemChanged();
		}
                /*if(_plot)
			_plot.autoRefresh()*/
	}

	/*!
	Set the Y axis

	The item will painted according to the coordinates its Axes.

	\param axis Y Axis ( QwtPlot::yLeft or QwtPlot::yRight )
	\sa setAxes(), setXAxis(), yAxis(), QwtPlot::Axis
	 */
	this.setYAxis = function (axis) {
		if (axis == yLeft || axis == yRight) {
			m_yAxis = axis;
			this.itemChanged();
		}
		
	}

	//! Return xAxis
	this.xAxis = function () {
		return m_xAxis;
	}

	//! Return yAxis
	this.yAxis = function () {
		return m_yAxis;
	}

	this.getCanvasRect = function () {
		this.syncSizes();
		return new Misc.Rect(new Misc.Point(), cnvs[0].width, cnvs[0].height);
	}

};

/*!
\return An invalid bounding rect: QRectF(1.0, 1.0, -2.0, -2.0)
\note A width or height < 0.0 is ignored by the autoscaler
 */
PlotItem.prototype.boundingRect = function () {
	return new Misc.Rect(); //{ left:1.0, top:1.0, right:-2.0, bottom:-2.0 , width:-3.0, height: -3.0}; // invalid
}

PlotItem.prototype.draw = function (xMap, yMap) {
	//console.log("No drawing mehod define in subclass");
};

/*!
\return Legend icon size
\sa setLegendIconSize(), legendIcon()
 */
PlotItem.prototype.legendIconSize = function () {
	return this.getLegendIconSize();
}

/*!
\return Icon representing the item on the legend

The default implementation returns an invalid icon

\param index Index of the legend entry
( usually there is only one )
\param size Icon size

\sa setLegendIconSize(), legendData()
 */
PlotItem.prototype.legendIcon = function (index, size) {
	return null;
}

/*!
\brief Return a default icon from a brush

The default icon is a filled rectangle used
in several derived classes as legendIcon().

\param brush Fill brush
\param size Icon size

\return A filled rectangle
 */
PlotItem.prototype.defaultIcon = function (brush, size) {
	var icon = null;
	if (size.width > 0 && size.height > 0) {
		//icon.setDefaultSize( size );

		var r = new Misc.Rect(0, 0, size.width, size.height);
		icon = new GraphicUtil.Graphic(null, size.width + 1, size.height + 1)
			var painter = new GraphicPainter(icon);
		painter.fillRect(r, brush);
	}

	return icon;
}

/*!
\brief Return all information, that is needed to represent
the item on the legend

Most items are represented by one entry on the legend
showing an icon and a text, but f.e. QwtPlotMultiBarChart
displays one entry for each bar.

QwtLegendData is basically a list of QVariants that makes it
possible to overload and reimplement legendData() to
return almost any type of information, that is understood
by the receiver that acts as the legend.

The default implementation returns one entry with
the title() of the item and the legendIcon().

\return Data, that is needed to represent the item on the legend
\sa title(), legendIcon(), QwtLegend, QwtPlotLegendItem
 */
PlotItem.prototype.legendData = function () {
	var data = new LegendData;

	var titleValue = this.title();

	//QVariant titleValue;
	//qVariantSetValue( titleValue, label );
	data.setValue(Static.TitleRole, titleValue);
	//alert(this.legendIconSize())
	var iconValue = this.legendIcon(0, this.legendIconSize());
	if (iconValue) {
		//QVariant iconValue;
		//qVariantSetValue( iconValue, graphic );
		data.setValue(Static.IconRole, iconValue);
	}

	//var list =[];
	//list.push(data);
	return [data];
};

PlotItem.prototype.toString = function () {
	return '[PlotItem "' + this.plotId + '"]';
}
////////////////////////////////////////////////////end
;
define("plotItem", ["static"], function(){});


var Layout = function(plotDiv, plot){
  	var plt = plot;
	var leftOfLeftScaleDiv = 0;
	var topOfCentralDiv = 0;
	var bottomOfCentralDiv = 0;
	var rightOfCentralDiv = 0;
	var leftOfCentralDiv = 0;
	var rightOfRightScaleDiv = 0;
	var rightOfLegendDiv = 0;
	var bottomOfBottomScaleDiv = 0;
	var bottomOfFooterDiv = 0;
	var topOfTopScaleDiv = 0;

	if(!plotDiv)
		return


	if (plotDiv.parent()[0] === document.body) {
		plotDiv.css("position", "absolute");
	}

	

	var titleDiv = $('<div />').attr({
			id: "titleDiv"
		});
	//alert(titleDiv)
	plotDiv.append(titleDiv);
	if (titleDiv.css("top") !== "auto"); //topOfTitleDiv = parseFloat(titleDiv.css("top"))
	var topScaleDiv = $('<div />').attr({
			id: "topScaleDiv"
		});
	plotDiv.append(topScaleDiv);
	if (topScaleDiv.css("top") !== "auto")
		topOfTopScaleDiv = parseFloat(topScaleDiv.css("top"))
			var leftScaleDiv = $('<div />').attr({
				id: "leftScaleDiv"
			});
	plotDiv.append(leftScaleDiv);

	if (leftScaleDiv.css("left") !== "auto")
		leftOfLeftScaleDiv = parseFloat(leftScaleDiv.css("left"))
			var centralDiv = $('<div />').attr({
				id: "centralDiv"
			});
	plotDiv.append(centralDiv);
	if (centralDiv.css("top") !== "auto")
		topOfCentralDiv = parseFloat(centralDiv.css("top"));
	if (centralDiv.css("bottom") !== "auto")
		bottomOfCentralDiv = parseFloat(centralDiv.css("bottom"))
			if (centralDiv.css("right") !== "auto")
				rightOfCentralDiv = parseFloat(centralDiv.css("right"))
					if (centralDiv.css("left") !== "auto")
						leftOfCentralDiv = parseFloat(centralDiv.css("left"))
							this.getCentralDiv = function () {
							return centralDiv;
						}
					var rightScaleDiv = $('<div />').attr({
						id: "rightScaleDiv"
					});
			plotDiv.append(rightScaleDiv);
	if (rightScaleDiv.css("right") !== "auto")
		rightOfRightScaleDiv = parseFloat(rightScaleDiv.css("right"))

			var legendDiv = $('<div/>').attr({
				id: "legendDiv"
			});
	plotDiv.append(legendDiv);
	if (legendDiv.css("right") !== "auto")
		rightOfLegendDiv = parseFloat(legendDiv.css("right"))
			var bottomScaleDiv = $('<div />').attr({
				id: "bottomScaleDiv"
			});
	plotDiv.append(bottomScaleDiv);
	if (bottomScaleDiv.css("bottom") !== "auto")
		bottomOfBottomScaleDiv = parseFloat(bottomScaleDiv.css("bottom"))

			var footerDiv = $('<div />').attr({
				id: "footerDiv"
			});
	plotDiv.append(footerDiv);
	if (footerDiv.css("bottom") !== "auto")
		bottomOfFooterDiv = parseFloat(footerDiv.css("bottom"))

			this.getLegendDiv = function () {
			return legendDiv;
		}

	
	this.getTitleDiv = function () {
		return titleDiv;
	}

	this.getFooterDiv = function () {
		return footerDiv;
	}

	var scaleDivElement = [leftScaleDiv, rightScaleDiv, bottomScaleDiv, topScaleDiv]
	this.getScaleDivElement = function (type) {
		if (type < 0 || type >= axisCnt)
			return null;
		return scaleDivElement[type];
	}

	this.adjustLayout = function (domElement, newValue) {
		var dim = "width";
		if (domElement[0].id === "footerDiv" || domElement[0].id === "titleDiv" ||
			domElement[0].id === "topScaleDiv" || domElement[0].id === "bottomScaleDiv")
			dim = "height";
		domElement.css(dim, newValue);

	}

	function topScaleAndTitle() {
		var titleHeight = parseFloat(titleDiv.css("height"));
		var topScaleHeight = parseFloat(topScaleDiv.css("height"));
		legendDiv.css("top", titleHeight);
		topScaleDiv.css("top", titleHeight);
		centralDiv.css("top", titleHeight + topScaleHeight);
		leftScaleDiv.css("top", titleHeight + topScaleHeight);
		rightScaleDiv.css("top", titleHeight + topScaleHeight);
	}

	function topScaleAndNotTitle() {
		var topScaleHeight = parseFloat(topScaleDiv.css("height"));
		legendDiv.css("top", 0);
		topScaleDiv.css("top", 0);
		centralDiv.css("top", topScaleHeight);
		leftScaleDiv.css("top", topScaleHeight);
		rightScaleDiv.css("top", topScaleHeight);
	}

	function titleAndNotTopScale() {
		var titleHeight = parseFloat(titleDiv.css("height"));
		legendDiv.css("top", titleHeight);
		centralDiv.css("top", titleHeight);
		leftScaleDiv.css("top", titleHeight);
		rightScaleDiv.css("top", titleHeight);
	}

	function notTitleAndNotTopScale() {
		legendDiv.css("top", 0);
		centralDiv.css("top", 0);
		leftScaleDiv.css("top", 0);
		rightScaleDiv.css("top", 0);
	}

	function adjustForTitle() {
		var titleVisible = true
		if(titleDiv.css('display') == 'none')
			titleVisible = false
		//var titleVisible = plt.title() !== "";

		//case: top axis enabled
		if (plt.axisEnabled(xTop)) {
			if (titleVisible) {
				topScaleAndTitle();
			} else {
				topScaleAndNotTitle();
			}

		}
		//case: top axis not enabled
		else {
			if (titleVisible) {
				titleAndNotTopScale();
			} else {
				notTitleAndNotTopScale();
			}
		}
	}
	function adjustForTopScale() {
		var titleVisible = true
		if(titleDiv.css('display') == 'none')
			titleVisible = false
		//case: title exist
		//if (plt.title() !== "") {
		if (titleVisible) {
			if (plt.axisEnabled(xTop)) {
				topScaleAndTitle();
			} else {
				titleAndNotTopScale();
			}
		}
		//case: title does exist
		else {
			if (plt.axisEnabled(xTop)) {
				topScaleAndNotTitle();
			} else {
				notTitleAndNotTopScale();
			}
		}
	}

	function bottomScaleAndFooter() {
		var footerHeight = parseFloat(footerDiv.css("height"));
		var bottomScaleHeight = parseFloat(bottomScaleDiv.css("height"));
		//footerDiv.css("bottom", 0);
		legendDiv.css("bottom", footerHeight);
		bottomScaleDiv.css("bottom", footerHeight);
		centralDiv.css("bottom", footerHeight + bottomScaleHeight);
		leftScaleDiv.css("bottom", footerHeight + bottomScaleHeight);
		rightScaleDiv.css("bottom", footerHeight + bottomScaleHeight);
	}

	function bottomScaleAndNotFooter() {
		var bottomScaleHeight = parseFloat(bottomScaleDiv.css("height"));
		legendDiv.css("bottom", 0);
		bottomScaleDiv.css("bottom", 0);
		centralDiv.css("bottom", bottomScaleHeight);
		leftScaleDiv.css("bottom", bottomScaleHeight);
		rightScaleDiv.css("bottom", bottomScaleHeight);
	}

	function footerAndNotBottomtScale() {
		var footerHeight = parseFloat(footerDiv.css("height"));
		legendDiv.css("bottom", footerHeight);
		centralDiv.css("bottom", footerHeight);
		leftScaleDiv.css("bottom", footerHeight);
		rightScaleDiv.css("bottom", footerHeight);
	}

	function notFooterAndNotBottomScale() {
		legendDiv.css("bottom", 0);
		centralDiv.css("bottom", 0);
		leftScaleDiv.css("bottom", 0);
		rightScaleDiv.css("bottom", 0);
	}

	function adjustForFooter() {
		var footerVisible = true
		if(footerDiv.css('display') == 'none')
			footerVisible = false
		//var footerVisible = plt.footer() !== "";
		//case: bottom axis enabled
		if (plt.axisEnabled(xBottom)) {
			if (footerVisible) {
				bottomScaleAndFooter();
			} else {
				bottomScaleAndNotFooter();
			}

		}
		//case: bottom axis not enabled
		else {
			if (footerVisible) {
				footerAndNotBottomtScale();
			} else {
				notFooterAndNotBottomScale();
			}
		}
	}
	function adjustForBottomScale() {
		var footerVisible = true
		if(footerDiv.css('display') == 'none')
			footerVisible = false
		//case: footer exist
		// if (plt.footer() !== "") {
		if (footerVisible) {
			if (plt.axisEnabled(xBottom)) {
				bottomScaleAndFooter();
			} else {
				footerAndNotBottomtScale();
			}
		}
		//case: footer does exist
		else {
			if (plt.axisEnabled(xBottom)) {
				bottomScaleAndNotFooter();
			} else {
				notFooterAndNotBottomScale();
			}
		}
	}

	function rightScaleAndLegend() {
		var legendWidth = parseFloat(legendDiv.css("width"));
		var rightScaleWidth = parseFloat(rightScaleDiv.css("width"));
		titleDiv.css("right", legendWidth + rightScaleWidth + 14 + 3);
		topScaleDiv.css("right", legendWidth + rightScaleWidth + 14 + 3);
		footerDiv.css("right", legendWidth + rightScaleWidth + 14 + 3);
		bottomScaleDiv.css("right", legendWidth + rightScaleWidth + 14 + 3);
		legendDiv.css("right", 3);
		centralDiv.css("right", legendWidth + rightScaleWidth + 14 + 3);
		rightScaleDiv.css("right", legendWidth + 14 + 3);
	}
	function rightScaleAndNotLegend() {
		var rightScaleWidth = parseFloat(rightScaleDiv.css("width"));
		titleDiv.css("right", rightScaleWidth);
		topScaleDiv.css("right", rightScaleWidth);
		footerDiv.css("right", rightScaleWidth);
		bottomScaleDiv.css("right", rightScaleWidth);
		centralDiv.css("right", rightScaleWidth);
		rightScaleDiv.css("right", 0);
	}

	function legendAndNotRightScale() {
		var legendWidth = parseFloat(legendDiv.css("width"));
		centralDiv.css("right", legendWidth + 3 + 14);
		titleDiv.css("right", legendWidth + 3 + 14);
		topScaleDiv.css("right", legendWidth + 3 + 14);
		footerDiv.css("right", legendWidth + 3 + 14);
		bottomScaleDiv.css("right", legendWidth + 3 + 14);
		legendDiv.css("right", 3);
	}

	function notLegendAndNotRightScale() {
		titleDiv.css("right", 0);
		topScaleDiv.css("right", 0);
		footerDiv.css("right", 0);
		bottomScaleDiv.css("right", 0);
		centralDiv.css("right", 0);
	}

	function adjustForLegend() {
		if (plt.legend())
			legendDiv.css("width", plt.legend().legendDivWidth());
		//case: right axis enabled
		if (plt.axisEnabled(yRight)) {
			if (plt.isLegendEnabled()) {
				rightScaleAndLegend();
			} else {
				rightScaleAndNotLegend();
			}

		}
		//case: right axis not enabled
		else {
			if (plt.isLegendEnabled()) {
				legendAndNotRightScale();
			} else {
				notLegendAndNotRightScale();
			}
		}
	}
	function adjustForRightScale() {
		//case: legend exist
		if (plt.isLegendEnabled()) {
			if (plt.axisEnabled(yRight)) {
				rightScaleAndLegend();
			} else {
				legendAndNotRightScale();
			}
		}
		//case: legend does not exist
		else {
			if (plt.axisEnabled(yRight)) {
				rightScaleAndNotLegend();
			} else {
				notLegendAndNotRightScale();
			}
		}
	}

	function adjustForLeftScale() {
		var leftScaleWidth = parseFloat(leftScaleDiv.css("width"));
		if (plt.axisEnabled(yLeft)) {
			//alert(this.axisEnabled())
			titleDiv.css("left", leftScaleWidth);
			topScaleDiv.css("left", leftScaleWidth);
			footerDiv.css("left", leftScaleWidth);
			bottomScaleDiv.css("left", leftScaleWidth);
			centralDiv.css("left", leftScaleWidth);
		} else {
			titleDiv.css("left", 0);
			topScaleDiv.css("left", 0);
			footerDiv.css("left", 0);
			bottomScaleDiv.css("left", 0);
			centralDiv.css("left", 0);

		}
	}

	this.updateLayout = function () {
		if (typeof(plt) === "undefined")
			return;
		//alert("title: " + _title + ",   xTopEnable: " +  xTopEnable)
		adjustForTitle();

		adjustForTopScale();

		adjustForFooter();

		adjustForBottomScale();

		adjustForLegend();

		adjustForRightScale();

		adjustForLeftScale();

	}

	this.isLegendDivVisible = function () {
		if (legendDiv[0].style.display === "block")
			return true;
		return false;
	}

	this.setPlot = function (plot) {
		plt = plot;
	}

	this.toString = function () {
		return '[Layout]'
	}
  
};
define("layout", function(){});


/////////////////AbstractScaleDraw/////////////////start
function AbstractScaleDraw() {
	var m_components = Backbone | Ticks | Labels;
	var m_tickLength = [];
	m_tickLength[MinorTick] = 4.0;
	m_tickLength[MediumTick] = 6.0;
	m_tickLength[MajorTick] = 8.0;
	var m_map = new ScaleMap();
	var m_scaleDiv = null;

	var m_decimalPlaces = 3;

	var m_spacing = 4;
	var m_penWidth = 1;
	this.data = {} //any useful data can be stored here.

	//double minExtent;

	//    var m_longestLabel = "";

	this.decimalPlaces = function(){
		return m_decimalPlaces
	}

	this.setDecimalPlaces = function(places){
		m_decimalPlaces = places
	}

	this.longestLabel = function () {
		var m_longestLabel = "";
		//if( m_longestLabel === 0){
		var majorTicks = m_scaleDiv.ticks(MajorTick);
		//console.log(majorTicks)
		var i;
		var v;
		var n = majorTicks.length - 1;
		for (i = 1; i < n; i++) {
			v = majorTicks[i];
			if (m_scaleDiv.contains(v)) {
				v = Static.adjustForDecimalPlaces(v, m_decimalPlaces)
				if (v.toString().length > m_longestLabel.length)
					m_longestLabel = v.toString();
			}

		}
		// }
		return m_longestLabel;
	}

	/*!
	En/Disable a component of the scale

	\param component Scale component
	\param enable On/Off

	\sa hasComponent()
	 */
	this.enableComponent = function (component, enable) {
		if (enable)
			m_components |= component;
		else
			m_components &= ~component;
	}

	/*!
	Check if a component is enabled

	\param component Component type
	\return true, when component is enabled
	\sa enableComponent()
	 */
	this.hasComponent = function (component) {
		return (m_components & component);
	}
	/*!
	Change the scale division
	\param scaleDiv New scale division
	 */
	this.setScaleDiv = function (scaleDiv) {
		m_scaleDiv = scaleDiv;
		m_map.setScaleInterval(m_scaleDiv.lowerBound(), m_scaleDiv.upperBound());
		//d_data->labelCache.clear();
	}

	/*!
	Change the transformation of the scale
	\param transformation New scale transformation
	 */
	this.setTransformation = function (trans) {
		m_map.setTransformation(trans);

	}

	//! \return Map how to translate between scale and pixel values
	this.scaleMap = function () {
		return m_map;
	}
	//! \return scale division
	this.scaleDiv = function () {
		return m_scaleDiv;
	}

	/*!
	\brief Specify the width of the scale pen
	\param width Pen width
	\sa penWidth()
	 */
	this.setPenWidth = function (width) {
		if (width <= 0)
			width = 1;

		if (width !== m_penWidth)
			m_penWidth = width;
	}

	/*!
	\return Scale pen width
	\sa setPenWidth()
	 */
	this.penWidth = function () {
		return m_penWidth;
	}
	/*!
	\brief Draw the scale

	\param painter    The painter

	\param palette    Palette, text color is used for the labels,
	foreground color for ticks and backbone
	 */
	this.draw = function (painter) {

		if (this.orientation() === Horizontal)
			m_map.setPaintInterval(0, painter.canvasWidth());
		else
			m_map.setPaintInterval(painter.canvasHeight(), 0);

		//console.log("painter.canvasHeight(): "+painter.canvasHeight())
		//console.log("painter.canvasWidth(): "+painter.canvasWidth())

		if (this.hasComponent(Labels)) {

			var majorTicks = m_scaleDiv.ticks(MajorTick);

			for (var i = 0; i < majorTicks.length; i++) {
				var v = majorTicks[i];
				if (m_scaleDiv.contains(v))
					this.drawLabel(painter, v);
			}

		}

		if (this.hasComponent(Ticks)) {
			painter.save();
			painter.setPen(new Misc.Pen("grey", m_penWidth))
			for (var tickType = MinorTick; tickType < NTickTypes; tickType++) {
				var ticks = m_scaleDiv.ticks(tickType);
				for (i = 0; i < ticks.length; i++) {
					var v = ticks[i];
					if (m_scaleDiv.contains(v))
						this.drawTick(painter, v, m_tickLength[tickType]);
				}
			}
			painter.restore();
		}

		if (this.hasComponent(Backbone)) {
			painter.save();
			painter.setPen(new Misc.Pen("grey", m_penWidth))
			this.drawBackbone(painter);
			painter.restore();
		}

	}
	/*!
	\brief Set the spacing between tick and labels

	The spacing is the distance between ticks and labels.
	The default spacing is 4 pixels.

	\param spacing Spacing

	\sa spacing()
	 */
	this.setSpacing = function (spacing) {
		if (spacing < 0)
			spacing = 0;

		m_spacing = spacing;
	}

	/*!
	\brief Get the spacing

	The spacing is the distance between ticks and labels.
	The default spacing is 4 pixels.

	\return Spacing
	\sa setSpacing()
	 */
	this.spacing = function () {
		return m_spacing;
	}
	/*!
	Set the length of the ticks

	\param tickType Tick type
	\param length New length

	\warning the length is limited to [0..1000]
	 */
	this.setTickLength = function (tickType, length) {
		if (tickType < MinorTick || tickType > MajorTick) {
			return;
		}

		if (length < 0.0)
			length = 0.0;

		var maxTickLen = 1000.0;
		if (length > maxTickLen)
			length = maxTickLen;

		m_tickLength[tickType] = length;
	}

	/*!
	\return Length of the ticks
	\sa setTickLength(), maxTickLength()
	 */
	this.tickLength = function (tickType) {
		if (tickType < MinorTick || tickType > MajorTick) {
			return 0;
		}

		return m_tickLength[tickType];
	}
	/*!
	\return Length of the longest tick

	Useful for layout calculations
	\sa tickLength(), setTickLength()
	 */
	this.maxTickLength = function () {
		var length = 0.0;
		for (var i = 0; i < NTickTypes; i++)
			length = Math.max(length, m_tickLength[i]);

		return length;
	}

	/*!
	\brief Convert a value into its representing label

	The value is converted to a plain text using
	QLocale().toString(value).
	This method is often overloaded by applications to have individual
	labels.

	\param value Value
	\return Label string.
	 */
	this.label = function (value) {
		//value = Static.adjustForDecimalPlaces(value, 2)
		if (Static.mFuzzyCompare(value + 1.0, 1.0))
			value = 0.0;
		return value.toString();
	}

}
AbstractScaleDraw.prototype.toString = function () {
	return '[AbstractScaleDraw]';
};
//////////////////////////////////////////////////////end
;
define("abstractScaleDraw", function(){});


/////////////////ScaleDraw - subclass of AbstractScaleDraw//////////start
// Define the ScaleDraw constructor
ScaleDraw.inheritsFrom(AbstractScaleDraw);
function ScaleDraw() {
	AbstractScaleDraw.call(this);
	var m_alignment = BottomScale;
        

	/*!
	Return the orientation

	TopScale, BottomScale are horizontal (Qt::Horizontal) scales,
	LeftScale, RightScale are vertical (Qt::Vertical) scales.

	\return Orientation of the scale

	\sa alignment()
	 */
	this.orientation = function () {
		if (m_alignment === TopScale || m_alignment === BottomScale)
			return Horizontal;
		return Vertical;
	}

	/*!
	Return alignment of the scale
	\sa setAlignment()
	\return Alignment of the scale
	 */
	this.alignment = function () {
		return m_alignment;
	}
	/*!
	Set the alignment of the scale

	\param align Alignment of the scale

	The default alignment is QwtScaleDraw::BottomScale
	\sa alignment()
	 */
	this.setAlignment = function (align) {
		m_alignment = align;
	}

	/*!
	  \brief Determine the minimum border distance

	  This member function returns the minimum space
	  needed to draw the mark labels at the scale's endpoints.

	  \param font Font
	  \param start Start border distance
	  \param end End border distance
	*/
	this.getBorderDistHint = function( font, startAndEndObj ){
	    /*start = 0;
	    end = 1.0;

	    if ( !hasComponent( QwtAbstractScaleDraw::Labels ) )
	        return;

	    const QList<double> &ticks = scaleDiv().ticks( QwtScaleDiv::MajorTick );
	    if ( ticks.count() == 0 )
	        return;

	    // Find the ticks, that are mapped to the borders.
	    // minTick is the tick, that is mapped to the top/left-most position
	    // in widget coordinates.

	    double minTick = ticks[0];
	    double minPos = scaleMap().transform( minTick );
	    double maxTick = minTick;
	    double maxPos = minPos;

	    for ( int i = 1; i < ticks.count(); i++ )
	    {
	        const double tickPos = scaleMap().transform( ticks[i] );
	        if ( tickPos < minPos )
	        {
	            minTick = ticks[i];
	            minPos = tickPos;
	        }
	        if ( tickPos > scaleMap().transform( maxTick ) )
	        {
	            maxTick = ticks[i];
	            maxPos = tickPos;
	        }
	    }

	    double e = 0.0;
	    double s = 0.0;
	    if ( orientation() == Qt::Vertical )
	    {
	        s = -labelRect( font, minTick ).top();
	        s -= qAbs( minPos - qRound( scaleMap().p2() ) );

	        e = labelRect( font, maxTick ).bottom();
	        e -= qAbs( maxPos - scaleMap().p1() );
	    }
	    else
	    {
	        s = -labelRect( font, minTick ).left();
	        s -= qAbs( minPos - scaleMap().p1() );

	        e = labelRect( font, maxTick ).right();
	        e -= qAbs( maxPos - scaleMap().p2() );
	    }

	    if ( s < 0.0 )
	        s = 0.0;
	    if ( e < 0.0 )
	        e = 0.0;

	    start = qCeil( s );
	    end = qCeil( e );*/
	}
}
//ScaleDraw.prototype = Object.create(AbstractScaleDraw.prototype);
//ScaleDraw.prototype.constructor = ScaleDraw;
//ScaleDraw.prototype.parent = AbstractScaleDraw.prototype;

ScaleDraw.prototype.toString = function () {
	return '[ScaleDraw]';
}

/*!
Draw a tick

\param painter Painter
\param value Value of the tick
\param len Length of the tick

\sa drawBackbone(), drawLabel()
 */
ScaleDraw.prototype.drawTick = function (painter, value, len) {
	if (len <= 0)
		return;
	var bwAdjust = 0//this.data.plotBorderWidth-1
    var tval = this.scaleMap().transform(value)+bwAdjust;

	var bb = this.hasComponent(Backbone);

	switch (this.alignment()) {
	case LeftScale: {
			var x1 = painter.canvasWidth();
			if (bb)
				x1 -= 2;
			var x2 = x1 - len;
			painter.drawLine(x1, tval, x2, tval);
			break;
		}

	case RightScale: {
			var x1 = 0;
			if (bb)
				x1 += 2;
			var x2 = x1 + len;
			painter.drawLine(x1, tval, x2, tval);
			break;
		}

	case BottomScale: {
			var y1 = 0;
			if (bb)
				y1 += 2;
			var y2 = y1 + len;
			painter.drawLine(tval, y1, tval, y2);
			break;
		}

	case TopScale: {
			var y1 = painter.canvasHeight();
			if (bb)
				y1 -= 2;
			var y2 = y1 - len;
			painter.drawLine(tval, y1, tval, y2);
			break;
		}
	}
}

/*!
Draws the baseline of the scale
\param painter Painter

\sa drawTick(), drawLabel()
 */
ScaleDraw.prototype.drawBackbone = function (painter) {
	var off = 0.5 * painter.pen().width;
	var bb = this.hasComponent(Backbone);

	switch (this.alignment()) {
	case LeftScale: {
			var x = painter.canvasWidth() - off;
			if (bb)
				x -= 2;
			painter.drawLine(x, 0, x, painter.canvasHeight());
			break;
		}
	case RightScale: {
			var x = off;
			if (bb)
				x += 2;
			painter.drawLine(x, 0, x, painter.canvasHeight());
			break;
		}
	case TopScale: {
			var y = painter.canvasHeight() - off;
			if (bb)
				y -= 2;
			painter.drawLine(0, y, painter.canvasWidth(), y);
			break;
		}
	case BottomScale: {
			var y = off;
			if (bb)
				y += 2;
			painter.drawLine(0, y, painter.canvasWidth(), y);
			break;
		}
	}
}

/*!
Find the position, where to paint a label

The position has a distance that depends on the length of the ticks
in direction of the alignment().

\param value Value
\return Position, where to paint a label
 */
ScaleDraw.prototype.labelPosition = function (ctx, value) {
	ctx.save();
	var tval = this.scaleMap().transform(value);

	var dist = this.spacing();

	if (this.hasComponent(Backbone))
		dist += 1; //qMax( 1, penWidth() );

	if (this.hasComponent(Ticks))
		dist += this.tickLength(MajorTick);

	//alert(dist)
	var bwAdjust = 0//this.data.plotBorderWidth-1

	var px = 0;
	var py = 0;
	var th = ctx.measureText("M").width;

	switch (this.alignment()) {
	case RightScale: {
			px = dist;
			py = tval + 0.5 * th + bwAdjust;
			break;
		}
	case LeftScale: {
			px = ctx.canvas.width - dist;
			py = tval + 0.5 * th + bwAdjust;
			break;
		}
	case BottomScale: {
			px = tval + bwAdjust;
			py = dist + th;
			break;
		}
	case TopScale: {
			px = tval + bwAdjust;
			py = ctx.canvas.height - (dist);
			break;
		}
	}
	ctx.restore();
	return new Misc.Point(px, py);
}

/*!
Draws the label for a major scale tick

\param painter Painter
\param value Value

\sa drawTick(), drawBackbone(), boundingLabelRect()
 */
ScaleDraw.prototype.drawLabel = function (painter, value) {
	//value = Static.adjustForDecimalPlaces(value, 2)
	var lbl = this.label(value);
	if (lbl === "")
		return;
        

	var pos = this.labelPosition(painter.context(), value);
	if (this.orientation() == Horizontal && (pos.x === 0 || pos.x == painter.canvasWidth()))
		return;

	var tsz = painter.textSize(lbl);
	var th = tsz.height;
	if (this.orientation() == Vertical && ((Math.abs(pos.y - 0.5 * th - 0) < th) || (Math.abs(pos.y - 0.5 * th - painter.canvasHeight()) < th)))
		return;

	var alignment = "center";
	var maxTextLength = "undefined";

        //console.log(this.decimalPlaces)
         //console.log(lbl)

        //lbl = Static.adjustForDecimalPlaces(lbl, 2)
        //console.log(lbl)

	if (this.alignment() === LeftScale) {
                //Static.adjustForDecimalPlaces(lbl, 5)
		alignment = "right";
		maxTextLength = "undefined";
	} else if (this.alignment() === RightScale) {
		alignment = "left";
		maxTextLength = "undefined";
	} else {
		maxTextLength = painter.canvasWidth() / (this.scaleDiv().ticks(MajorTick).length - 1) - 5;
		var textWidth = tsz.width;
		if (textWidth > maxTextLength)
			textWidth = maxTextLength;
		if ((pos.x - textWidth / 2) < 0 || (pos.x + textWidth / 2) > painter.canvasWidth()) {
			return;
		}
	}

	
	painter.drawText(Static.adjustForDecimalPlaces(lbl, this.decimalPlaces()), 
		pos.x, pos.y, alignment, maxTextLength);
	

}
;
define("scaleDraw", ["static"], function(){});


Static.mLog = function(base, value) {
	return Math.log(value) / Math.log(base);
}

Static.mLogInterval = function(base, interval) {
	return new Interval(Static.mLog(base, interval.minValue()),
		Static.mLog(base, interval.maxValue()));
}

Static.mPowInterval = function(base, interval) {
	return new Interval(Math.pow(base, interval.minValue()),
		Math.pow(base, interval.maxValue()));
}

Static.mStepSize = function(intervalSize, maxSteps, base) {
	if (maxSteps <= 0)
		return 0.0;

	if (maxSteps > 2) {
		for (var numSteps = maxSteps; numSteps > 1; numSteps--) {
			var stepSize = intervalSize / numSteps;

			var p = Math.floor(Math.log(stepSize) / Math.log(base));
			var fraction = Math.pow(base, p);

			for (var n = base; n > 1; n /= 2) {
				if (Static.mFuzzyCompare(stepSize, n * fraction))
					return stepSize;

				if (n === 3 && (base % 2) === 0) {
					if (Static.mFuzzyCompare(stepSize, 2 * fraction))
						return stepSize;
				}
			}
		}
	}
	return intervalSize * 0.5;
}

/*
Calculate a step size for a given interval

param intervalSize Interval size
param numSteps Number of steps
param base Base for the division ( usually 10 )

return Calculated step size
 */
Static.divideInterval = function(intervalSize, numSteps, base) {

	if (numSteps <= 0)
		return 0.0;

	var v = divideEps(intervalSize, numSteps);
	//    alert(v)
	if (v === 0.0)
		return 0.0;

	var lx = Static.mLog(base, Math.abs(v));
	var p = Math.floor(lx);

	var fraction = Math.pow(base, lx - p);

	var n = base;
	while ((n > 1) && (fraction <= n / 2))
		n /= 2;

	var stepSize = n * Math.pow(base, p);
	if (v < 0)
		stepSize = -stepSize;

	return stepSize;
}


/*!
Ceil a value, relative to an interval

param value Value to be ceiled
param intervalSize Interval size

return Rounded value

floorEps()
 */
function ceilEps(value, intervalSize) {
	var eps = _eps * intervalSize;

	value = (value - eps) / intervalSize;
	return Math.ceil(value) * intervalSize;
}

/*!
Floor a value, relative to an interval

param value Value to be floored
param intervalSize Interval size

return Rounded value
sa floorEps()
 */
function floorEps(value, intervalSize) {
	var eps = _eps * intervalSize;

	value = (value + eps) / intervalSize;
	return Math.floor(value) * intervalSize;
}

/*!
Divide an interval into steps

stepSize = (intervalSize - intervalSize * 10e^{-6}) / numSteps\f$

param intervalSize Interval size
param numSteps Number of steps
return Step size
 */
function divideEps(intervalSize, numSteps) {
	if (numSteps === 0.0 || intervalSize === 0.0)
		return 0.0;

	return (intervalSize - (_eps * intervalSize)) / numSteps;
}


/////////////////ScaleEngine/////////////////start
var ScaleEngine = function (bs) {
	var m_base = 10;
	var m_lowerMargin = 0.0;
	var m_upperMargin = 0.0;
	if (typeof(bs) !== 'undefined')
		m_base = bs;
	var m_transform = null;
	var m_referenceValue = 0.0;



	/*!
	\return the margin at the lower end of the scale
	The default margin is 0.

	\sa setMargins()
	 */
	this.lowerMargin = function () {
		return m_lowerMargin;
	}

	/*!
	\return the margin at the upper end of the scale
	The default margin is 0.

	\sa setMargins()
	 */
	this.upperMargin = function () {
		return m_upperMargin;
	}

	/*!
	\brief Specify margins at the scale's endpoints
	\param lower minimum distance between the scale's lower boundary and the
	smallest enclosed value
	\param upper minimum distance between the scale's upper boundary and the
	greatest enclosed value

	Margins can be used to leave a minimum amount of space between
	the enclosed intervals and the boundaries of the scale.

	\warning
	\li QwtLogScaleEngine measures the margins in decades.

	\sa upperMargin(), lowerMargin()
	 */

	this.setMargins = function (lower, upper) {
		m_lowerMargin = Math.max(lower, 0.0);
		m_upperMargin = Math.max(upper, 0.0);
	}

	/*!
	Assign a transformation

	param transform Transformation

	The transformation object is used as factory for clones
	that are returned by transformation()

	The scale engine takes ownership of the transformation.

	QwtTransform::copy(), transformation()

	 */
	this.setTransformation = function (transform) {
		if (transform !== m_transform) {
			//delete m_transform;
			m_transform = transform;
		}
	}

	/*!
	Create and return a clone of the transformation
	of the engine. When the engine has no special transformation
	NULL is returned, indicating no transformation.

	return A clone of the transfomation
	setTransformation()
	 */
	this.transformation = function () {
		var transform = null;
		if (m_transform) {
			transform = m_transform.copy();
		}

		return transform;
	}
	/*!
	Calculate a step size for an interval size

	param intervalSize Interval size
	param numSteps Number of steps

	return Step size
	 */
	this.divideInterval = function (intervalSize, numSteps) {
		return Static.divideInterval(intervalSize, numSteps, m_base);
	}

	/*!
	Check if an interval "contains" a value

	param interval Interval
	param value Value

	return True, when the value is inside the interval
	 */
	this.contains = function (interval, value) {
		if (!interval.isValid())
			return false;

		if (Static.m3FuzzyCompare(value, interval.minValue(), interval.width()) < 0)
			return false;

		if (Static.m3FuzzyCompare(value, interval.maxValue(), interval.width()) > 0)
			return false;

		return true;
	}

	/*!
	Remove ticks from a list, that are not inside an interval

	param ticks Tick list
	param interval Interval

	return Stripped tick list
	 */
	this.strip = function (ticks, interval) {
		if (!interval.isValid() || ticks.length === 0)
			return [];

		if (this.contains(interval, ticks[0])
			 && this.contains(interval, ticks[ticks.length - 1])) {
			return ticks;
		}

		var strippedTicks = [];
		for (var i = 0; i < ticks.length; i++) {
			if (this.contains(interval, ticks[i]))
				strippedTicks.push(ticks[i]);
		}
		return strippedTicks;
	}

	/*!
	brief Build an interval around a value

	In case of v == 0.0 the interval is [-0.5, 0.5],
	otherwide it is [0.5 * v, 1.5 * v]

	param value Initial value
	return Calculated interval
	 */

	this.buildInterval = function (value) {
		var delta = (value === 0.0) ? 0.5 : Math.abs(0.5 * value);

		if (Number.MAX_VALUE - delta < value)
			return new Interval(Number.MAX_VALUE - delta, Number.MAX_VALUE);

		if (-Number.MAX_VALUE + delta > value)
			return new Interval(-Number.MAX_VALUE, -Number.MAX_VALUE + delta);

		return new Interval(value - delta, value + delta);
	}
	/*!
	Set the base of the scale engine

	While a base of 10 is what 99.9% of all applications need
	certain scales might need a different base: f.e 2

	The default setting is 10

	param base Base of the engine

	base()
	 */
	this.setBase = function (base) {
		m_base = Math.max(base, 2);
	}

	/*!
	return base Base of the scale engine
	setBase()
	 */
	this.base = function () {
		return m_base;
	}

	/*!
	\brief Specify a reference point
	\param r new reference value

	The reference point is needed if options IncludeReference or
	Symmetric are active. Its default value is 0.0.

	\sa Attribute
	 */
	this.setReference = function (r) {
		m_referenceValue = r;
	}

	/*!
	\return the reference value
	\sa setReference(), setAttribute()
	 */
	this.reference = function () {
		return m_referenceValue;
	}

}
ScaleEngine.prototype.toString = function () {
	return '[ScaleEngine]';
};
//////////////////////////////////////////////////////end

/////////////////LinearScaleEngine - subclass of ScaleEngine//////////start
var LinearScaleEngine = function (bs) {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	ScaleEngine.call(this, bs);

	/*!
	Align and divide an interval

	\param maxNumSteps Max. number of steps
	\param x1 First limit of the interval (In/Out)
	\param x2 Second limit of the interval (In/Out)
	\param stepSize Step size (Out)

	\sa setAttribute()
	 */
	this.autoScale = function (maxNumSteps, xValueObject, stepSize) {

		var interval = new Interval(xValueObject["x1"], xValueObject["x2"]);
		interval = interval.normalized();

		interval.setMinValue(interval.minValue() - this.lowerMargin());
		interval.setMaxValue(interval.maxValue() + this.upperMargin());

		/*if ( testAttribute( QwtScaleEngine::Symmetric ) )
		interval = interval.symmetrize( reference() );

		if ( testAttribute( QwtScaleEngine::IncludeReference ) )
		interval = interval.extend( reference() );*/

		if (interval.width() === 0.0)
			interval = this.buildInterval(interval.minValue());

		stepSize = Static.divideInterval(
				interval.width(), Math.max(maxNumSteps, 1), this.base());

		//if ( !testAttribute( QwtScaleEngine::Floating ) )
		//interval = align( interval, stepSize );

		xValueObject["x1"] = interval.minValue();
		xValueObject["x2"] = interval.maxValue();

		/*if ( testAttribute( QwtScaleEngine::Inverted ) ){
		qSwap( x1, x2 );
		stepSize = -stepSize;
		}*/
	}

	/*!
	\brief Calculate a scale division for an interval

	\param x1 First interval limit
	\param x2 Second interval limit
	\param maxMajorSteps Maximum for the number of major steps
	\param maxMinorSteps Maximum number of minor steps
	\param stepSize Step size. If stepSize == 0, the engine
	calculates one.

	\return Calculated scale division
	 */
	this.divideScale = function (x1, x2, maxMajorSteps, maxMinorSteps, stepSize) {
		if (typeof(stepSize) === "undefined")
			stepSize = 0.0;
		var interval = new Interval(x1, x2).normalized();
		if (interval.width() <= 0)
			return new ScaleDiv();

		stepSize = Math.abs(stepSize);
		if (stepSize === 0.0) {
			if (maxMajorSteps < 1)
				maxMajorSteps = 1;

			stepSize = Static.divideInterval(interval.width(), maxMajorSteps, this.base());
		}

		var scaleDiv = new ScaleDiv();

		if (stepSize !== 0.0) {
			var ticks = [];

			this.buildTicks(interval, stepSize, maxMinorSteps, ticks);
			scaleDiv = new ScaleDiv(interval, ticks);
			//console.log(interval.width())
			//console.log(ticks)
		}

		if (x1 > x2)
			scaleDiv.invert();

		return scaleDiv;
	}

	/*!
	\brief Calculate ticks for an interval

	\param interval Interval
	\param stepSize Step size
	\param maxMinorSteps Maximum number of minor steps
	\param ticks Arrays to be filled with the calculated ticks

	\sa buildMajorTicks(), buildMinorTicks
	 */
	this.buildTicks = function (interval, stepSize, maxMinorSteps, ticks) {

		var boundingInterval = this.align(interval, stepSize);

		ticks[MajorTick] = this.buildMajorTicks(boundingInterval, stepSize);

		if (maxMinorSteps > 0) {
			var minorTicks = [];
			var mediumTicks = [];
			this.buildMinorTicks(ticks[MajorTick], maxMinorSteps, stepSize,
				minorTicks, mediumTicks);
			ticks[MinorTick] = minorTicks;
			ticks[MediumTick] = mediumTicks;
		}

		for (var i = 0; i < NTickTypes; i++) {
			var obj = this.strip(ticks[i], interval);
			ticks[i] = [];
			ticks[i] = obj;

			// ticks very close to 0.0 are
			// explicitely set to 0.0

			for (var j = 0; j < ticks[i].length; j++) {
				if (Static.m3FuzzyCompare(ticks[i][j], 0.0, stepSize) === 0)
					ticks[i][j] = 0.0;
			}
		}
	}

	/*!
	\brief Calculate major ticks for an interval

	\param interval Interval
	\param stepSize Step size

	\return Calculated ticks
	 */
	this.buildMajorTicks = function (interval, stepSize) {
		var numTicks = Math.round(interval.width() / stepSize) + 1;
		if (numTicks > 10000)
			numTicks = 10000;

		var ticks = [];

		//ticks.push(Static.adjustForDecimalPlaces(interval.minValue(), 3));

		ticks.push(interval.minValue());
		for (var i = 1; i < numTicks - 1; i++)
			ticks.push(interval.minValue() + i * stepSize);			
		ticks.push(interval.maxValue());
		
		//console.log(ticks)
		return ticks;
	}

	/*!
	\brief Calculate minor/medium ticks for major ticks

	\param majorTicks Major ticks
	\param maxMinorSteps Maximum number of minor steps
	\param stepSize Step size
	\param minorTicks Array to be filled with the calculated minor ticks
	\param mediumTicks Array to be filled with the calculated medium ticks

	 */
	this.buildMinorTicks = function (majorTicks, maxMinorSteps, stepSize, minorTicks, mediumTicks) {

		var minStep = Static.mStepSize(stepSize, maxMinorSteps, this.base());
		if (minStep === 0.0)
			return;

		// # ticks per interval
		var numTicks = Math.ceil(Math.abs(stepSize / minStep)) - 1;

		var medIndex = -1;
		if (numTicks % 2)
			medIndex = numTicks / 2;

		// calculate minor ticks

		for (var i = 0; i < majorTicks.length; i++) {
			var val = majorTicks[i];
			for (var k = 0; k < numTicks; k++) {
				val += minStep;

				var alignedValue = val;
				if (Static.m3FuzzyCompare(val, 0.0, stepSize) === 0)
					alignedValue = 0.0;

				if (k == medIndex)
					mediumTicks.push(alignedValue);
				else
					minorTicks.push(alignedValue);
			}
		}
	}
	/*!
	\brief Align an interval to a step size

	The limits of an interval are aligned that both are integer
	multiples of the step size.

	\param interval Interval
	\param stepSize Step size

	\return Aligned interval
	 */
	this.align = function (interval, stepSize) {
		var x1 = interval.minValue();
		var x2 = interval.maxValue();

		if (-Number.MAX_VALUE + stepSize <= x1) {
			var x = floorEps(x1, stepSize);
			if (Static.m3FuzzyCompare(x1, x, stepSize) !== 0)
				x1 = x;
		}

		if (Number.MAX_VALUE - stepSize >= x2) {
			var x = ceilEps(x2, stepSize);
			if (Static.m3FuzzyCompare(x2, x, stepSize) !== 0)
				x2 = x;
		}

		return new Interval(x1, x2);
	}

}
LinearScaleEngine.prototype = Object.create(ScaleEngine.prototype);
// Set the "constructor" property to refer to LinearScaleEngine
LinearScaleEngine.prototype.constructor = LinearScaleEngine;

LinearScaleEngine.prototype.toString = function () {
	return '[LinearScaleEngine]';
}
///////////////////////////////////////////////////////////////end

/////////////////LogScaleEngine - subclass of ScaleEngine//////////start
var LogScaleEngine = function (bs) {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	ScaleEngine.call(this, bs);
	this.setTransformation(new LogTransform());

	/*!
	Align and divide an interval

	\param maxNumSteps Max. number of steps
	\param x1 First limit of the interval (In/Out)
	\param x2 Second limit of the interval (In/Out)
	\param stepSize Step size (Out)

	\sa QwtScaleEngine::setAttribute()
	 */
	this.autoScale = function (maxNumSteps, xValueObject, stepSize) {

		//if ( x1 > x2 )
		//qSwap( x1, x2 );

		var logBase = this.base();

		var interval = new Interval(xValueObject["x1"] / Math.pow(logBase, this.lowerMargin()),
				xValueObject["x2"] * Math.pow(logBase, this.upperMargin()));

		if (interval.maxValue() / interval.minValue() < logBase) {
			// scale width is less than one step -> try to build a linear scale

			var linearScaler = new LinearScaleEngine();
			//linearScaler.setAttributes( attributes() );
			linearScaler.setReference(this.reference());
			linearScaler.setMargins(this.lowerMargin(), this.upperMargin());

			linearScaler.autoScale(maxNumSteps, xValueObject, stepSize);

			var linearInterval = new Interval(xValueObject["x1"], xValueObject["x2"]);
			linearInterval.normalized();

			linearInterval = linearInterval.limited(1.0e-100, 1.0e100);

			if (linearInterval.maxValue() / linearInterval.minValue() < logBase) {
				// the aligned scale is still less than one step
				if (stepSize < 0.0)
					stepSize = -Static.mLog(logBase, Math.abs(stepSize));
				else
					stepSize = Static.mLog(logBase, stepSize);

				return;
			}
		}

		var logRef = 1.0;
		if (this.reference() > 1.0e-100 / 2)
			logRef = Math.min(this.reference(), 1.0e100 / 2);

		//        if ( testAttribute( QwtScaleEngine::Symmetric ) )
		//        {
		//            const double delta = qMax( interval.maxValue() / logRef,
		//                logRef / interval.minValue() );
		//            interval.setInterval( logRef / delta, logRef * delta );
		//        }

		//        if ( testAttribute( QwtScaleEngine::IncludeReference ) )
		//            interval = interval.extend( logRef );

		interval = interval.limited(1.0e-100, 1.0e100);

		if (interval.width() == 0.0)
			interval = this.buildInterval(interval.minValue());

		stepSize = Static.divideInterval(Static.mLogInterval(logBase, interval).width(),
				Math.max(maxNumSteps, 1));
		if (stepSize < 1.0)
			stepSize = 1.0;

		//if ( !testAttribute( QwtScaleEngine::Floating ) )
		//interval = align( interval, stepSize );

		xValueObject["x1"] = interval.minValue();
		xValueObject["x2"] = interval.maxValue();

		//        if ( testAttribute( QwtScaleEngine::Inverted ) )
		//        {
		//            qSwap( x1, x2 );
		//            stepSize = -stepSize;
		//        }
	}

	/*!
	\brief Calculate a scale division for an interval

	\param x1 First interval limit
	\param x2 Second interval limit
	\param maxMajorSteps Maximum for the number of major steps
	\param maxMinorSteps Maximum number of minor steps
	\param stepSize Step size. If stepSize == 0, the engine
	calculates one.

	\return Calculated scale division
	 */
	this.divideScale = function (x1, x2, maxMajorSteps, maxMinorSteps, stepSize) {
		//alert(456)
		var interval = new Interval(x1, x2);
		interval.normalized();
		interval = interval.limited(1.0e-100, 1.0e100);

		if (interval.width() <= 0)
			return new ScaleDiv();

		var logBase = this.base();

		if (interval.maxValue() / interval.minValue() < logBase) {
			// scale width is less than one decade -> build linear scale


			var linearScaler = new LinearScaleEngine();
			//linearScaler.setAttributes( attributes() );
			linearScaler.setReference(this.reference());
			linearScaler.setMargins(this.lowerMargin(), this.upperMargin());

			if (stepSize != 0.0) {
				if (stepSize < 0.0)
					stepSize = -Math.pow(logBase, -stepSize);
				else
					stepSize = Math.pow(logBase, stepSize);
			}

			return linearScaler.divideScale(x1, x2,
				maxMajorSteps, maxMinorSteps, stepSize);
		}

		stepSize = Math.abs(stepSize);
		if (stepSize == 0.0) {
			if (maxMajorSteps < 1)
				maxMajorSteps = 1;
			//alert(mLogInterval( logBase, interval ).width())
			stepSize = Static.divideInterval(Static.mLogInterval(logBase, interval).width(), maxMajorSteps, this.base());
			//alert(stepSize)
			if (stepSize < 1.0)
				stepSize = 1.0; // major step must be >= 1 decade
		}

		var scaleDiv = new ScaleDiv();
		//alert(stepSize)
		if (stepSize != 0.0) {
			//alert(stepSize)
			var ticks = [];

			this.buildTicks(interval, stepSize, maxMinorSteps, ticks);
			scaleDiv = new ScaleDiv(interval, ticks);

			//alert(432)
		}

		if (x1 > x2)
			scaleDiv.invert();

		return scaleDiv;
	}

	/*!
	\brief Calculate ticks for an interval

	\param interval Interval
	\param maxMinorSteps Maximum number of minor steps
	\param stepSize Step size
	\param ticks Arrays to be filled with the calculated ticks

	\sa buildMajorTicks(), buildMinorTicks
	 */
	this.buildTicks = function (interval, stepSize, maxMinorSteps, ticks) {

		var boundingInterval = this.align(interval, stepSize);

		ticks[MajorTick] = this.buildMajorTicks(boundingInterval, stepSize);
		//alert(ticks[MajorTick])


		if (maxMinorSteps > 0) {
			//this.buildMinorTicks( ticks[MajorTick], maxMinorSteps, stepSize,
			//ticks[MinorTick], ticks[MediumTick] );

			var minorTicks = [];
			var mediumTicks = [];
			this.buildMinorTicks(ticks[MajorTick], maxMinorSteps, stepSize,
				minorTicks, mediumTicks);
			//console.log(maxMinorSteps)
			ticks[MinorTick] = minorTicks;
			ticks[MediumTick] = mediumTicks;
		}

		//for ( i = 0; i < NTickTypes; i++ )
		//ticks[i] = this.strip( ticks[i], interval );

		for (var i = 0; i < NTickTypes; i++) {
			var obj = this.strip(ticks[i], interval);
			ticks[i] = [];
			ticks[i] = obj;

			// ticks very close to 0.0 are
			// explicitely set to 0.0

			for (var j = 0; j < ticks[i].length; j++) {
				if (Static.m3FuzzyCompare(ticks[i][j], 0.0, stepSize) === 0)
					ticks[i][j] = 0.0;
			}
		}
	}

	/*!
	\brief Calculate major ticks for an interval

	\param interval Interval
	\param stepSize Step size

	\return Calculated ticks
	 */
	this.buildMajorTicks = function (interval, stepSize) {
		var width = Static.mLogInterval(this.base(), interval).width();

		var numTicks = Math.round(width / stepSize) + 1;
		if (numTicks > 10000)
			numTicks = 10000;

		var lxmin = Math.log(interval.minValue());
		var lxmax = Math.log(interval.maxValue());
		var lstep = (lxmax - lxmin) / (numTicks - 1);

		var ticks = [];

		ticks.push(interval.minValue());

		for (var i = 1; i < numTicks - 1; i++)
			ticks.push(Math.exp(lxmin + i * lstep));

		ticks.push(interval.maxValue());

		//alert(ticks)

		return ticks;
	}

	/*!
	\brief Calculate minor/medium ticks for major ticks

	\param majorTicks Major ticks
	\param maxMinorSteps Maximum number of minor steps
	\param stepSize Step size
	\param minorTicks Array to be filled with the calculated minor ticks
	\param mediumTicks Array to be filled with the calculated medium ticks
	 */
	this.buildMinorTicks = function (majorTicks, maxMinorSteps, stepSize, minorTicks, mediumTicks) {
		var logBase = this.base();

		if (stepSize < 1.1) // major step width is one base
		{
			var minStep = this.divideInterval(stepSize, maxMinorSteps + 1);
			if (minStep == 0.0)
				return;

			var numSteps = Math.round(stepSize / minStep);

			var mediumTickIndex = -1;
			if ((numSteps > 2) && (numSteps % 2 == 0))
				mediumTickIndex = numSteps / 2;

			for (i = 0; i < majorTicks.length - 1; i++) {
				var v = majorTicks[i];
				var s = logBase / numSteps;

				if (s >= 1.0) {
					for (j = 2; j < numSteps; j++) {
						minorTicks.push(v * j * s);
					}
				} else {
					for (j = 1; j < numSteps; j++) {
						var tick = v + j * v * (logBase - 1) / numSteps;
						if (j == mediumTickIndex)
							mediumTicks.push(tick);
						else
							minorTicks.push(tick);
					}
				}
			}
		} else {
			var minStep = this.divideInterval(stepSize, maxMinorSteps);
			if (minStep == 0.0)
				return;

			if (minStep < 1.0)
				minStep = 1.0;

			// # subticks per interval
			var numTicks = Math.round(stepSize / minStep) - 1;

			// Do the minor steps fit into the interval?
			if (Static.m3FuzzyCompare((numTicks + 1) * minStep,
					stepSize, stepSize) > 0) {
				numTicks = 0;
			}

			if (numTicks < 1)
				return;

			var mediumTickIndex = -1;
			if ((numTicks > 2) && (numTicks % 2))
				mediumTickIndex = numTicks / 2;

			// substep factor = base^substeps
			var minFactor = Math.max(Math.pow(logBase, minStep), logBase);

			for (var i = 0; i < majorTicks.length; i++) {
				var tick = majorTicks[i];
				for (var j = 0; j < numTicks; j++) {
					tick *= minFactor;

					if (j == mediumTickIndex)
						mediumTicks.push(tick);
					else
						minorTicks.push(tick);
				}
			}
		}
	}

	/*!
	\brief Align an interval to a step size

	The limits of an interval are aligned that both are integer
	multiples of the step size.

	\param interval Interval
	\param stepSize Step size

	\return Aligned interval
	 */
	this.align = function (interval, stepSize) {
		var intv = Static.mLogInterval(this.base(), interval);

		var x1 = floorEps(intv.minValue(), stepSize);
		if (Static.m3FuzzyCompare(interval.minValue(), x1, stepSize) == 0)
			x1 = interval.minValue();

		var x2 = ceilEps(intv.maxValue(), stepSize);
		if (Static.m3FuzzyCompare(interval.maxValue(), x2, stepSize) == 0)
			x2 = interval.maxValue();

		return Static.mPowInterval(this.base(), new Interval(x1, x2));
	}

}
LogScaleEngine.prototype = Object.create(ScaleEngine.prototype);
// Set the "constructor" property to refer to LogScaleEngine
LogScaleEngine.prototype.constructor = LogScaleEngine;

LogScaleEngine.prototype.toString = function () {
	return '[LogScaleEngine]';
}
///////////////////////////////////////////////////////////////end
;
define("scaleEngine", ["static"], function(){});


// Mapping points with filtering out consecutive
// points mapped to the same position

Static.mToPolylineFiltered = function(xMap, yMap, series, from, to, round) {
	// in curves with many points consecutive points
	// are often mapped to the same position. As this might
	// result in empty lines ( or symbols hidden by others )
	// we try to filter them out

	//var polyline = [];//( to - from + 1 );
	//Point *points = polyline.data();
	var points = [];

	var sample0 = series.sample(from);

	//points.push({x:Math.round( xMap.transform( sample0.x ) ), y:Math.round( yMap.transform( sample0.y ) )})
	//points.push(new Misc.Point(Math.round(xMap.transform(sample0.x)), Math.round(yMap.transform(sample0.y))));
	points[0]=new Misc.Point(Math.round(xMap.transform(sample0.x)), Math.round(yMap.transform(sample0.y)));

	var pos = 0;
	for (var i = from + 1; i <= to; i++) {
		var sample = series.sample(i);
		var p;
		if (round)
			//p = { x:Math.round( xMap.transform( sample.x ) ), y:Math.round( yMap.transform( sample.y ) ) };
			p = new Misc.Point(Math.round(xMap.transform(sample.x)), Math.round(yMap.transform(sample.y)));
		else
			//            p = { x: xMap.transform( sample.x ), y: yMap.transform( sample.y )  };
			p = new Misc.Point(xMap.transform(sample.x), yMap.transform(sample.y));

		if (points[pos].x === p.x && points[pos].y === p.y)
			continue;
		pos++;
		//points.push(p);
		points[pos]= p;
	}

	//polyline.resize( pos + 1 );
	return points;
}

// mapping points without any filtering - beside checking
// the bounding rectangle

Static.mToPoints = function(boundingRect, xMap, yMap, series, from, to, round) {
	//Polygon polyline( to - from + 1 );
	var points = [];

	var numPoints = 0;

	if (boundingRect.left() <= boundingRect.right() && boundingRect.top() <= boundingRect.bottom()) {
		// iterating over all values
		// filtering out all points outside of
		// the bounding rectangle

		for (i = from; i <= to; i++) {
			var sample = series.sample(i);

			var x = xMap.transform(sample.x);
			var y = yMap.transform(sample.y);

			if (x >= boundingRect.left() && x <= boundingRect.right() && y >= boundingRect.top() && y <= boundingRect.bottom()) {
				if (round) {
					//                    points.push({x:Math.round( x ), y:Math.round( y )});
					points.push(new Misc.Point(Math.round(x), Math.round(y)));
				} else {
					//                    points.push({x:x, y:y});
					points.push(new Misc.Point(x, y));
				}
				numPoints++;
			}
		}

		//polyline.resize( numPoints );
	} else {

		// simply iterating over all values
		// without any filtering

		for (var i = from; i <= to; i++) {

			var sample = series.sample(i);

			var x = xMap.transform(sample.x)-1; //minus 1 why
			var y = yMap.transform(sample.y)-1; //minus 1 why

			if (round) {

				//                points.push({x:Math.round( x ), y:Math.round( y )});
				points.push(new Misc.Point(Math.round(x), Math.round(y)));

			} else {

				//                points.push({x:x, y:y});
				points.push(new Misc.Point(x, y));
			}

			numPoints++;
		}
	}
	return points;
}




////////////////////PointMapper////////////////////start
function PointMapper() {
	var m_flags = 0;
	//var m_boundingRect = { left:0.0, top:0.0, right:-1.0, bottom:-1.0, width:-1.0, height:-1 };
	var m_boundingRect = new Misc.Rect();
	/*!
	Set a bounding rectangle for the point mapping algorithm

	A valid bounding rectangle can be used for optimizations

	\param rect Bounding rectangle
	\sa boundingRect()
	 */
	this.setBoundingRect = function (rect) {
		m_boundingRect = rect;
	}

	/*!
	\return Bounding rectangle
	\sa setBoundingRect()
	 */
	this.boundingRect = function () {
		return m_boundingRect;
	}

	/*!
	Modify a flag affecting the transformation process

	\param flag Flag type
	\param on Value

	\sa flag(), setFlags()
	 */
	this.setFlag = function (flag, on) {
		if (on)
			m_flags |= flag;
		else
			m_flags &= ~flag;
	}

	/*!
	\return True, when the flag is set
	\param flag Flag type
	\sa setFlag(), setFlags()
	 */
	this.testFlag = function (flag) {
		return m_flags & flag;
	}

	/*!
	\brief Translate a series of points into a QPolygonF

	When the WeedOutPoints flag is enabled consecutive points,
	that are mapped to the same position will be one point.

	When RoundPoints is set all points are rounded to integers
	but returned as PolygonF - what only makes sense
	when the further processing of the values need a QPolygonF.

	\param xMap x map
	\param yMap y map
	\param series Series of points to be mapped
	\param from Index of the first point to be painted
	\param to Index of the last point to be painted

	\return Translated polygon
	 */
	this.toPolygonF = function (xMap, yMap, series, from, to) {
		var polyline = [];

		if (m_flags & WeedOutPoints) {
			if (m_flags & RoundPoints) {
				polyline = mToPolylineFiltered(xMap, yMap, series, from, to, true);
			} else {
				polyline = mToPolylineFiltered(xMap, yMap, series, from, to, false);
			}
		} else {
			if (m_flags & RoundPoints) {
				polyline = Static.mToPoints(new Misc.Rect(0.0, 0.0, -1.0, -1), xMap, yMap, series, from, to, true);
			} else {

				polyline = Static.mToPoints(new Misc.Rect(0.0, 0.0, -1.0, -1), xMap, yMap, series, from, to, false);
				//alert(polyline)
			}
		}

		return polyline;
	}

	/*!
	\brief Translate a series into a QPolygonF

	- WeedOutPoints & RoundPoints & boundingRect().isValid()
	All points that are mapped to the same position
	will be one point. Points outside of the bounding
	rectangle are ignored.

	- WeedOutPoints & RoundPoints & !boundingRect().isValid()
	All consecutive points that are mapped to the same position
	will one point

	- WeedOutPoints & !RoundPoints
	All consecutive points that are mapped to the same position
	will one point

	- !WeedOutPoints & boundingRect().isValid()
	Points outside of the bounding rectangle are ignored.

	When RoundPoints is set all points are rounded to integers
	but returned as PolygonF - what only makes sense
	when the further processing of the values need a QPolygonF.

	\param xMap x map
	\param yMap y map
	\param series Series of points to be mapped
	\param from Index of the first point to be painted
	\param to Index of the last point to be painted

	\return Translated polygon
	 */
	this.toPointsF = function (xMap, yMap, series, from, to) {
		var points //= [];

		if (m_flags & WeedOutPoints) {
			if (m_flags & RoundPoints) {
				if (m_boundingRect.left() <= m_boundingRect.right() && m_boundingRect.top() <= m_boundingRect.bottom()) {
					points = Static.mToPointsFiltered(m_boundingRect,
							xMap, yMap, series, from, to);
				} else {
					// without a bounding rectangle all we can
					// do is to filter out duplicates of
					// consecutive points

					points = mToPolylineFiltered(
							xMap, yMap, series, from, to, true);
				}
			} else {
				// when rounding is not allowed we can't use
				// qwtToPointsFilteredF

				points = Static.mToPolylineFiltered(
						xMap, yMap, series, from, to, false);
			}
		} else {
			if (m_flags & RoundPoints) {
				points = Static.mToPoints(m_boundingRect,
						xMap, yMap, series, from, to, true);
			} else {
				points = Static.mToPoints(m_boundingRect,
						xMap, yMap, series, from, to, false);
			}
		}

		return points;
	}

}
PointMapper.prototype.toString = function () {
	return '[PointMapper]';
}
/////////////////////////////////////////////////////end
;
define("pointMapper", ["static"], function(){});


Static.mBoundingRectPoint = function(sample) {
	return new Misc.Rect(sample.x, sample.y, 0, 0); //{ left:sample.x, top:sample.y, right:sample.x, bottom:sample.y, width:0.0, height:0.0};
}

Static.mBoundingRect = function(series, from, to) {
	var boundingRect = new Misc.Rect(); //{ left:0.0, top:0.0, right:-1.0, bottom:-1.0, width:-1.0, height:-1 }; // invalid;

	if (typeof(from) == "undefined")
		from = 0;

	if (typeof(to) == "undefined")
		to = series.size() - 1;

	if (to < from)
		return boundingRect;

	var i;
	for (i = from; i <= to; i++) {
		var rect = Static.mBoundingRectPoint(series.sample(i));
		//console.log(boundingRect.width())
		if (rect.width() >= 0.0 && rect.height() >= 0.0) {
			boundingRect = rect;

			i++;
			break;
		}
	}
	//console.log(i)
	for (; i <= to; i++) {

		var rect = Static.mBoundingRectPoint(series.sample(i));
		if (rect.width() >= 0.0 && rect.height() >= 0.0) {
			boundingRect.setRect(Math.min(boundingRect.left(), rect.left()),
				Math.min(boundingRect.top(), rect.top()),
				Math.max(boundingRect.right(), rect.right()) - Math.min(boundingRect.left(), rect.left()),
				Math.max(boundingRect.bottom(), rect.bottom()) - Math.min(boundingRect.top(), rect.top()));
		}
	}
	//
	return boundingRect;
}


///////////////////////////SeriesData/////////////////////////////start
/*!
\brief Abstract interface for iterating over samples

Qwt offers several implementations of the QwtSeriesData API,
but in situations, where data of an application specific format
needs to be displayed, without having to copy it, it is recommended
to implement an individual data access.

A subclass of QwtSeriesData<QPointF> must implement:

- size()\n
Should return number of data points.

- sample()\n
Should return values x and y values of the sample at specific position
as QPointF object.

- boundingRect()\n
Should return the bounding rectangle of the data series.
It is used for autoscaling and might help certain algorithms for displaying
the data. You can use qwtBoundingRect() for an implementation
but often it is possible to implement a more efficient algorithm
depending on the characteristics of the series.
The member d_boundingRect is intended for caching the calculated rectangle.

 */
function SeriesData() {
	this.d_boundingRect = new Misc.Rect(); //{ left:0.0, top:0.0, right:-1.0, bottom:-1.0, width:-1.0, height:-1 };

	this.setRectOfInterest = function (rect) {}

}

SeriesData.prototype.toString = function () {
	return '[SeriesData]';
}

/////////////////////////////////////////////////////////////////////////end

/////////////////ArraySeriesData - subclass of SeriesData//////////start
ArraySeriesData.inheritsFrom(SeriesData);
//Define the PlotSeriesItem constructor
function ArraySeriesData(samples) {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	SeriesData.call(this);
	var d_samples = [];
	if (typeof(samples) !== "undefined")
		d_samples = samples;

	this.setSamples = function (samples) {
		this.d_boundingRect = new Misc.Rect(); //{ left:0.0, top:0.0, right:-1.0, bottom:-1.0, width:-1.0, height:-1 };
		d_samples = samples;
	}

	this.samples = function () {

		return d_samples;
	}

	this.size = function () {
		return d_samples.length;
	}

	this.sample = function (i) {
		return d_samples[i];
	}

}

ArraySeriesData.prototype.toString = function () {
	return '[ArraySeriesData]';
}
/////////////////////////////////////////////////////end

/////////////////PointSeriesData - subclass of ArraySeriesData//////////start
PointSeriesData.inheritsFrom(ArraySeriesData);
//Define the PointSeriesData constructor
function PointSeriesData(samples) {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	ArraySeriesData.call(this, samples);

	/*!
	\brief Calculate the bounding rectangle

	The bounding rectangle is calculated once by iterating over all
	points and is stored for all following requests.

	\return Bounding rectangle
	 */
	this.boundingRect = function () {
		if (this.d_boundingRect.width() < 0.0)
			this.d_boundingRect = Static.mBoundingRect(this);

		return this.d_boundingRect;
	}

}

PointSeriesData.prototype.toString = function () {
	return '[PointSeriesData]';
}
/////////////////////////////////////////////////////end

/////////////////Point3DSeriesData - subclass of ArraySeriesData//////////start
Point3DSeriesData.inheritsFrom(ArraySeriesData);
//Define the Point3DSeriesData constructor
/*!
   Constructor
   \param samples Samples
*/
function Point3DSeriesData(samples) {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	ArraySeriesData.call(this, samples);


	/*!
  	\brief Calculate the bounding rectangle

  	The bounding rectangle is calculated once by iterating over all
  	points and is stored for all following requests.

  	\return Bounding rectangle
	*/
	this.boundingRect = function () {
		if (this.d_boundingRect.width() < 0.0)
			this.d_boundingRect = Static.mBoundingRect(this);

		return this.d_boundingRect;
	}

}

Point3DSeriesData.prototype.toString = function () {
	return '[Point3DSeriesData]';
}

/////////////////////////////////////////////////////end

/////////////////PlotSeriesItem - subclass of PlotItem//////////start
PlotSeriesItem.inheritsFrom(PlotItem);
//Define the PlotSeriesItem constructor
function PlotSeriesItem(tle) {
	// Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	PlotItem.call(this, tle);

	var d_series = null;
	var m_orientation = Vertical;

	/*!
	Set the orientation of the item.

	The orientation() might be used in specific way by a plot item.
	F.e. a QwtPlotCurve uses it to identify how to display the curve
	int QwtPlotCurve::Steps or QwtPlotCurve::Sticks style.

	\sa orientation()
	 */
	this.setOrientation = function (orientation) {
		if (m_orientation != orientation) {
			m_orientation = orientation;

			//legendChanged();
			//itemChanged();
		}
	}

	/*!
	\return Orientation of the plot item
	\sa setOrientation()
	 */
	this.orientation = function () {
		return m_orientation;
	}

	/*!
	\brief Draw the complete series

	\param painter Painter
	\param xMap Maps x-values into pixel coordinates.
	\param yMap Maps y-values into pixel coordinates.
	\param canvasRect Contents rectangle of the canvas
	 */
	this.draw = function (xMap, yMap) {
		//alert(45)
		this.drawSeries(xMap, yMap, 0, -1);
	}

	this.boundingRect = function () {
		return this.dataRect();
	}

	this.updateScaleDiv = function (xScaleDiv, yScaleDiv) {
		//        var rect = {
		//            left:xScaleDiv.lowerBound(),
		//            top:yScaleDiv.lowerBound(),
		//            width:xScaleDiv.range(),
		//            height:yScaleDiv.range(),
		//            right:xScaleDiv.lowerBound()+xScaleDiv.range(),
		//            bottom:yScaleDiv.lowerBound()+yScaleDiv.range()
		//        };

		var rect = new Misc.Rect(new Misc.Point(xScaleDiv.lowerBound(), yScaleDiv.lowerBound()),
				xScaleDiv.range(), yScaleDiv.range());

		this.setRectOfInterest( rect );
	}

	this.data = function () {
		return d_series;
	}

	this.sample = function (index) {
		return d_series ? d_series.sample(index) : null;
	}

	this.setData = function (series) {
		if (d_series != series) {
			d_series = series;
			//dataChanged();
		}
	}

	this.dataSize = function () {
		if (d_series == null)
			return 0;

		return d_series.size();
	}

	this.dataRect = function () {

		if (d_series == null)
			return new Misc.Rect(); //{left: 1.0, top:1.0, width:-2.0, height:-2.0 }; // invalid

		return d_series.boundingRect();
	}

	this.setRectOfInterest = function (rect) {
		if (d_series)
			d_series.setRectOfInterest(rect);
	}

	this.swapData = function (series) {
		var swappedSeries = d_series;
		d_series = series;

		return swappedSeries;
	}

}

PlotSeriesItem.prototype.toString = function () {
	return '[PlotSeriesItem]';
}
/////////////////////////////////////////////////////end


;
define("seriesData", ["static","plotItem"], function(){});


define('settings',['static'],function(){
	var fonts = [
            'Arial,Arial,Helvetica,sans-serif',
            'Arial Black,Arial Black,Gadget,sans-serif',
            'Comic Sans MS,Comic Sans MS,cursive',
            'Courier New,Courier New,Courier,monospace',
            'Georgia,Georgia,serif',
            'Impact,Charcoal,sans-serif',
            'Lucida Console,Monaco,monospace',
            'Lucida Sans Unicode,Lucida Grande,sans-serif',
            'Palatino Linotype,Book Antiqua,Palatino,serif',
            'Tahoma,Geneva,sans-serif',
            'Times New Roman,Times,serif',
            'Trebuchet MS,Helvetica,sans-serif',
            'Verdana,Geneva,sans-serif',
            'Gill Sans,Geneva,sans-serif'
            ];

	var m_plot = null;

	var m_dlg = $('<div class="modal fade" id="myModal" role="dialog">\
<div class="modal-dialog">\
\
<div class="modal-content">\
<div class="modal-header">\
<button type="button" class="close" data-dismiss="modal">&times;</button>\
<h4 class="modal-title">Modal Header</h4>\
</div>\
<div class="modal-body">\
<div class="panel-group" id="accordion">\
\
<div class="panel panel-default">\
<div class="panel-heading">\
<h4 class="panel-title">\
<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">General Settings</a>\
</h4>\
</div>\
<div id="collapse1" class="panel-collapse collapse in">\
<div class="panel-body">\
\
<ul class="nav nav-tabs">\
<li class="active"><a data-toggle="tab" href="#plotTitle">Title</a></li>\
<li><a data-toggle="tab" href="#plotFooter">Footer</a></li>\
<li><a data-toggle="tab" href="#plotBackground">Background</a></li>\
<li><a data-toggle="tab" href="#plotLegend">Legend</a></li>\
</ul>\
<div class="tab-content">\
<div id="plotTitle" class="tab-pane fade in active">\
<div class="row">\
<br>\
<div class="col-sm-3">Plot Title:</div>\
<input id="title" type="text" class="col-sm-9" value="Title"/>\
</div>\
\
\
<!--font start-->\
<div class="row">\
<br>\
<div class="col-sm-1">Font:</div>\
<div class="col-sm-4">\
<select id="fontSelector">\
<option value="Arial">Arial</option>\
<option value="ArialBlack">Arial Black</option>\
<option value="ComicSansMS">Comic Sans MS</option>\
<option value="CourierNew">Courier New</option>\
<option value="Georgia">Georgia</option>\
<option value="Impact">Impact</option>\
<option value="LucidaConsole">Lucida Console</option>\
<option value="LucidaSansUnicode">Lucida Sans Unicode</option>\
<option value="PalatinoLinotype">Palatino Linotype</option>\
<option value="Tahoma">Tahoma</option>\
<option value="TimesNewRoman">Times New Roman</option>\
<option value="TrebuchetMS">Trebuchet MS</option>\
<option value="Verdana">Verdana</option>\
<option value="GillSans">Gill Sans</option>\
</select>\
</div>\
<div class="col-sm-1">Color:</div>\
<div class="col-sm-2">\
<input type="color" id="colorTitle">\
</div>\
<div class="col-sm-2">Font size:</div>\
<div class="col-sm-1">\
<select id="pointSelector">\
<option value="6">6</option>\
<option value="7">7</option>\
<option value="8">8</option>\
<option value="9">9</option>\
<option value="10">10</option>\
<option value="11">11</option>\
<option value="12">12</option>\
<option value="13">13</option>\
<option value="14">14</option>\
<option value="15">15</option>\
<option value="16">16</option>\
<option value="17">17</option>\
<option value="18">18</option>\
<option value="19">19</option>\
<option value="20">20</option>\
<option value="21">21</option>\
<option value="22">22</option>\
<option value="23">23</option>\
<option value="24">24</option>\
<option value="25">25</option>\
<option value="26">26</option>\
<option value="27">27</option>\
<option value="28">28</option>\
<option value="29">29</option>\
<option value="30">30</option>\
<option value="31">31</option>\
<option value="32">32</option>\
</select>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-7">\
<form role="form">\
<label class="noSelect"><input id="bold_title" type="checkbox" checked name="bold">Bold</label><span> </span>\
</form>\
</div>\
<div class="col-sm-4">\
</div>\
</div>\
<!--font end-->\
\
\
</div>\
<div id="plotFooter" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-3">Plot Footer:</div>\
<input id="footer" type="text" class="col-sm-9" value="Footer"/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-1">Font:</div>\
<div class="col-sm-4">\
<select id="fontSelector_footer">\
<option value="Arial">Arial</option>\
<option value="ArialBlack">Arial Black</option>\
<option value="ComicSansMS">Comic Sans MS</option>\
<option value="CourierNew">Courier New</option>\
<option value="Georgia">Georgia</option>\
<option value="Impact">Impact</option>\
<option value="LucidaConsole">Lucida Console</option>\
<option value="LucidaSansUnicode">Lucida Sans Unicode</option>\
<option value="PalatinoLinotype">Palatino Linotype</option>\
<option value="Tahoma">Tahoma</option>\
<option value="TimesNewRoman">Times New Roman</option>\
<option value="TrebuchetMS">Trebuchet MS</option>\
<option value="Verdana">Verdana</option>\
<option value="GillSans">Gill Sans</option>\
</select>\
</div>\
<div class="col-sm-1">Color:</div>\
<div class="col-sm-2">\
<input type="color" id="colorSelector_footer">\
</div>\
<div class="col-sm-2">Font size:</div>\
<div class="col-sm-1">\
<select id="pointSelector_footer">\
<option value="6">6</option>\
<option value="7">7</option>\
<option value="8">8</option>\
<option value="9">9</option>\
<option value="10">10</option>\
<option value="11">11</option>\
<option value="12">12</option>\
<option value="13">13</option>\
<option value="14">14</option>\
<option value="15">15</option>\
<option value="16">16</option>\
<option value="17">17</option>\
<option value="18">18</option>\
<option value="19">19</option>\
<option value="20">20</option>\
<option value="21">21</option>\
<option value="22">22</option>\
<option value="23">23</option>\
<option value="24">24</option>\
<option value="25">25</option>\
<option value="26">26</option>\
<option value="27">27</option>\
<option value="28">28</option>\
<option value="29">29</option>\
<option value="30">30</option>\
<option value="31">31</option>\
<option value="32">32</option>\
</select>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-7">\
<form role="form">\
<label class="noSelect"><input id="bold_footer" type="checkbox" checked name="bold">Bold</label><span> </span>\
</form>\
</div>\
<div class="col-sm-4">\
<!--div class="col-sm-8">Font Size:</div>\
<select id="pointSelector_footer">\
<option value="6">6</option>\
<option value="7">7</option>\
<option value="8">8</option>\
<option value="9">9</option>\
<option value="10">10</option>\
<option value="11">11</option>\
<option value="12">12</option>\
<option value="13">13</option>\
<option value="14">14</option>\
<option value="15">15</option>\
<option value="16">16</option>\
<option value="17">17</option>\
<option value="18">18</option>\
<option value="19">19</option>\
<option value="20">20</option>\
<option value="21">21</option>\
<option value="22">22</option>\
<option value="23">23</option>\
<option value="24">24</option>\
<option value="25">25</option>\
<option value="26">26</option>\
<option value="27">27</option>\
<option value="28">28</option>\
<option value="29">29</option>\
<option value="30">30</option>\
<option value="31">31</option>\
<option value="32">32</option>\
</select-->\
</div>\
</div>\
</div>\
<div id="plotBackground" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-4">Background color:</div>\
<div class="col-sm-2">\
<input type="color" id= "colorSelector_background">\
</div>\
</div>\
</div>\
\
<div id="plotLegend" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-3">Background:</div>\
<div class="col-sm-2">\
<input type="color" id= "colorSelector_legend" value="#ffffff">\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-3">Show line:</div>\
<div class="col-sm-2">\
<input type="checkbox" id= "showline">\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-3">Show symbol:</div>\
<div class="col-sm-2">\
<input type="checkbox" id= "showsymbol">\
</div>\
</div>\
</div>\
\
</div>\
</div>\
</div>\
</div>\
\
\
<div class="panel panel-default">\
<div class="panel-heading">\
<h4 class="panel-title">\
<a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Scale Settings</a>\
</h4>\
</div>\
<div id="collapse2" class="panel-collapse collapse">\
<div class="panel-body">\
<ul class="nav nav-tabs">\
<li class="active"><a data-toggle="tab" href="#title_scale">Title and font</a></li>\
<li><a data-toggle="tab" href="#type">Type</a></li>\
<li><a data-toggle="tab" href="#user">User limits</a></li>\
</ul>\
<div class="tab-content">\
\
<div id="title_scale" class="tab-pane fade in active">\
<div class="row">\
<br>\
<div class="col-sm-2">Bottom:</div>\
<input id="bottomScale_title" type="text" class="col-sm-10" value=""/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Top:</div>\
<input id="topScale_title" type="text" class="col-sm-10" value=""/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Left:</div>\
<input id="leftScale_title" type="text" class="col-sm-10" value=""/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Right:</div>\
<input id="rightScale_title" type="text" class="col-sm-10" value=""/>\
</div>\
<!--font start-->\
<br>\
<div class="row">\
<br>\
<div class="col-sm-1">Font:</div>\
<div class="col-sm-4">\
<select id="axisTitleFontSelector">\
<option value="Arial">Arial</option>\
<option value="ArialBlack">Arial Black</option>\
<option value="ComicSansMS">Comic Sans MS</option>\
<option value="CourierNew">Courier New</option>\
<option value="Georgia">Georgia</option>\
<option value="Impact">Impact</option>\
<option value="LucidaConsole">Lucida Console</option>\
<option value="LucidaSansUnicode">Lucida Sans Unicode</option>\
<option value="PalatinoLinotype">Palatino Linotype</option>\
<option value="Tahoma">Tahoma</option>\
<option value="TimesNewRoman">Times New Roman</option>\
<option value="TrebuchetMS">Trebuchet MS</option>\
<option value="Verdana">Verdana</option>\
<option value="GillSans">Gill Sans</option>\
</select>\
</div>\
<div class="col-sm-1">Color:</div>\
<div class="col-sm-2">\
<input type="color" id="axisColorTitle">\
</div>\
<div class="col-sm-2">Font size:</div>\
<div class="col-sm-1">\
<select id="axisTitlePointSelector">\
<option value="6">6</option>\
<option value="7">7</option>\
<option value="8">8</option>\
<option value="9">9</option>\
<option value="10">10</option>\
<option value="11">11</option>\
<option value="12">12</option>\
<option value="13">13</option>\
<option value="14">14</option>\
<option value="15">15</option>\
<option value="16">16</option>\
<option value="17">17</option>\
<option value="18">18</option>\
<option value="19">19</option>\
<option value="20">20</option>\
<option value="21">21</option>\
<option value="22">22</option>\
<option value="23">23</option>\
<option value="24">24</option>\
<option value="25">25</option>\
<option value="26">26</option>\
<option value="27">27</option>\
<option value="28">28</option>\
<option value="29">29</option>\
<option value="30">30</option>\
<option value="31">31</option>\
<option value="32">32</option>\
</select>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-7">\
<form role="form">\
<label class="noSelect"><input id="axis_bold_title" type="checkbox" name="bold">Bold</label><span> </span>\
</form>\
</div>\
<div class="col-sm-4">\
</div>\
</div>\
<!--font end-->\
</div>\
\
\
<div id="type" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-2">Bottom:</div>\
<div class="col-sm-10">\
<form role="form">\
<label class="radio-inline">\
<input id="bottom_linear" type="radio" checked name="optradio">Linear\
</label>\
<label class="radio-inline">\
<input id="bottom_log" type="radio" name="optradio">Log\
</label>\
<label class="radio-inline">\
Decimal places\
<input id="bottom_decimalPlaces" type="number" min=0 max=10 value=3>\
</label>\
</form>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Top:</div>\
<div class="col-sm-10">\
<form role="form">\
<label class="radio-inline">\
<input id="top_linear" type="radio" checked name="optradio">Linear\
</label>\
<label class="radio-inline">\
<input id="top_log" type="radio" name="optradio">Log\
</label>\
<label class="radio-inline">\
Decimal places\
<input id="top_decimalPlaces" type="number" min=0 max=10 value=3>\
</label>\
</form>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Left:</div>\
<div class="col-sm-10">\
<form role="form">\
<label class="radio-inline">\
<input id="left_linear" type="radio" checked name="optradio">Linear\
</label>\
<label class="radio-inline">\
<input id="left_log" type="radio" name="optradio">Log\
</label>\
<label class="radio-inline">\
Decimal places\
<input id="left_decimalPlaces" type="number" min=0 max=10 value=3>\
</label>\
</form>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Right:</div>\
<div class="col-sm-10">\
<form role="form">\
<label class="radio-inline">\
<input id="right_linear" type="radio" checked name="optradio">Linear\
</label>\
<label class="radio-inline">\
<input id="right_log" type="radio" name="optradio">Log\
</label>\
<label class="radio-inline">\
Decimal places\
<input id="right_decimalPlaces" type="number" min=0 max=10 value=3>\
</label>\
</form>\
</div>\
</div>\
</div>\
\
<div id="user" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-4">Enable user scale:</div>\
<input id="enableUserScale" type="checkbox">\
</div>\
<div class="row">\
<br>\
<div class="col-sm-1">Bottom:</div><br>\
<div class="col-sm-1">min:</div>\
<input id="bottom_min" type="text" readonly value=0> max:\
<input id="bottom_max" type="text" readonly value=1000>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-1">Left:</div><br>\
<div class="col-sm-1">min:</div>\
<input id="left_min" type="text" readonly value=0> max:\
<input id="left_max" type="text" readonly value=1000>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-1">Top:</div><br>\
<div class="col-sm-1">min:</div>\
<input id="top_min" type="text" readonly value=0> max:\
<input id="top_max" type="text" readonly value=1000>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-1">Right:</div><br>\
<div class="col-sm-1">min:</div>\
<input id="right_min" type="text" readonly value=0> max:\
<input id="right_max" type="text" readonly value=1000>\
</div>\
<br>\
</div>\
\
</div>\
</div>\
</div>\
</div>\
\
\
<div class="panel panel-default">\
<div class="panel-heading">\
<h4 class="panel-title">\
<a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Grid Settings</a>\
</h4>\
</div>\
<div id="collapse3" class="panel-collapse collapse">\
<div class="panel-body">\
<ul class="nav nav-tabs">\
<li class="active"><a data-toggle="tab" href="#minor">Minor lines</a></li>\
<li><a data-toggle="tab" href="#major">Major lines</a></li>\
</ul>\
<div class="tab-content">\
<div id="minor" class="tab-pane fade in active">\
<div class="row">\
<br>\
<div class="col-sm-1">Show:</div>\
<input type="checkbox" checked class="col-sm-1"/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-7">Number of minor lines per major division:</div>\
<input type="number" class="col-sm-2" min=1 max=19 value=""/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Color:</div>\
<input type="color" class="col-sm-2"/>\
</div>\
</div>\
<div id="major" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-1">Show:</div>\
<input type="checkbox" checked class="col-sm-1"/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-4">Number of major lines:</div>\
<div class="col-sm-2">\
<form role="form">\
<input type="number" min=1 max=20>\
</form>\
</div>\
</div>\
<div class="row">\
<br>\
</div>\
<div class="row">\
<div class="col-sm-1">Color:</div>\
<div class="col-sm-10">\
<form role="form">\
<input type="color">\
</form>\
</div>\
</div>\
</div>\
</div>\
</div>\
</div>\
</div>\
</div>\
</div>\
<div class="modal-footer">\
<button id="okButton" type="button" class="btn btn-default" data-dismiss="modal">Ok</button>\
</div\
</div>\
</div>\
</div>');


function setReadonly(on){
			    	$("#bottom_min").attr("readonly", on);
			        $("#bottom_max").attr("readonly", on);
			        $("#left_min").attr("readonly", on);
			        $("#left_max").attr("readonly", on);
			        $("#top_min").attr("readonly", on);
			        $("#top_max").attr("readonly", on);
			        $("#right_min").attr("readonly", on);
			        $("#right_max").attr("readonly", on);
			    }
    

	return {
		setPlot: function(plot){
			m_plot = plot;

			//console.log(m_plot.getCentralWidget().getElement())
			if(m_plot){
				//m_dlg.css("zIndex", 2001)
				//m_plot.getCentralWidget().getElement().append(m_dlg);
				$("body").append(m_dlg);
				var titleFont = m_plot.titleFont();
				var axisTitleFont = m_plot.axisTitleFont(xBottom);
                        //console.log(axisTitleFont)
                        var axisLabelFont = null
                        /*var axisLabelFont = m_plot.axisLabelFont(xBottom);
                        console.log(axisLabelFont)
                        axisLabelFont.th = axisTitleFont.th*0.86
                        console.log(axisLabelFont)*/
				var userScale = false

				function setAxisTitleFont(){
                          axisLabelFont = m_plot.axisLabelFont(xBottom);
                          //console.log(axisLabelFont)
                          axisLabelFont.th = axisTitleFont.th*0.86
                          //console.log(axisLabelFont)
                          setAxisLabelFont()
				  m_plot.setAxisTitleFont(xBottom, axisTitleFont);
			        m_plot.setAxisTitleFont(xTop, axisTitleFont);
			        m_plot.setAxisTitleFont(yLeft, axisTitleFont);
			        m_plot.setAxisTitleFont(yRight, axisTitleFont);
                          

				}
                        function setAxisLabelFont(){
                          m_plot.setAxisLabelFont(xBottom, axisLabelFont);
                          m_plot.setAxisLabelFont(xTop, axisLabelFont);
                          m_plot.setAxisLabelFont(yLeft, axisLabelFont);
                          m_plot.setAxisLabelFont(yRight, axisLabelFont);
                          
                        }

				////////////axis font////
				$("#axis_bold_title").click(function () { 
			        if($(this)[0].checked) {			        	
                          axisTitleFont.weight = "bold";                          
			        }else{
			        	axisTitleFont.weight = "normal";
			        }
			        setAxisTitleFont()			        
			    });
			    $("#axisColorTitle").change(function () {
                          axisTitleFont.fontColor = $("#axisColorTitle")[0].value;
                          
                          setAxisTitleFont()
			        
			        //levelChanged({obj:self, levelIndex:this.selectedIndex, levelName:pollInfo.propValue});
			    });
			    $("#axisTitleFontSelector").change(function () { 
			        axisTitleFont.name = fonts[this.selectedIndex];
			        setAxisTitleFont();
			    });			    
			    $("#axisTitlePointSelector").change(function () { 
                    axisTitleFont.th = parseInt($(this[this.selectedIndex]).val()); 
			        setAxisTitleFont();
			    });
				/////////////////


				$("#bold_title").click(function () { 
			        if($(this)[0].checked) {			        	
                          titleFont.weight = "bold";                          
			        }else{
			        	titleFont.weight = "normal";
			        }
			        m_plot.setTitleFont(titleFont);
			    });

                        $("#bold_footer").click(function () { 
                          if($(this)[0].checked) {                            
                          footerFont.weight = "bold";                          
                          }else{
                              footerFont.weight = "normal";
                          }
                          m_plot.setFooterFont(footerFont);
                      });
			    
			    $("#colorTitle").change(function () {
                          //var titleFont = m_plot.titleFont();
                          titleFont.fontColor = $("#colorTitle")[0].value;
                          m_plot.setTitleFont(titleFont);
			        
			        //levelChanged({obj:self, levelIndex:this.selectedIndex, levelName:pollInfo.propValue});
			    });
			    
			    $("#fontSelector").change(function () { 
			        //var titleFont = m_plot.titleFont();
                          titleFont.name = fonts[this.selectedIndex];
			        m_plot.setTitleFont(titleFont);
			    });
			    
			    $("#pointSelector").change(function () { 
                          //var titleFont = m_plot.titleFont();
                          titleFont.th = $(this[this.selectedIndex]).val(); 
			        m_plot.setTitleFont(titleFont);
			    });
			    
			    /*$("#colorSelector_footer").change(function () { 
			        var color = $(this[this.selectedIndex]).val(); 
			        console.log(color) 
			        $("#colorSelector_footer").css("background", color)
			        
			        //levelChanged({obj:self, levelIndex:this.selectedIndex, levelName:pollInfo.propValue});
			    });*/

                $("#colorSelector_footer").change(function () { 
			        var footerFont = m_plot.footerFont();
                          	footerFont.fontColor = $("#colorSelector_footer")[0].value;
                          	m_plot.setFooterFont(footerFont);
			        
			        //levelChanged({obj:self, levelIndex:this.selectedIndex, levelName:pollInfo.propValue});
			    });

			    $("#colorSelector_background").change(function () {      

                            m_plot.setPlotBackground($("#colorSelector_background")[0].value)
			        
			        //levelChanged({obj:self, levelIndex:this.selectedIndex, levelName:pollInfo.propValue});
			    });

			    $("#colorSelector_legend").change(function () { 
			    	var table = m_plot.getLayout().getLegendDiv().children()[0]
			        $(table).css("background-color", 
			        	$("#colorSelector_legend")[0].value)
			        
			    });
                
                
			    
			    $("#fontSelector_footer").change(function () { 
			        var footerFont = m_plot.footerFont();
                          footerFont.name = fonts[this.selectedIndex];
			        m_plot.setFooterFont(footerFont);
			    });
			    
			    $("#pointSelector_footer").change(function () { 
			        var point = $(this[this.selectedIndex]).val(); 
			        var footerFont = m_plot.footerFont();
			        footerFont.th = point
			        m_plot.setFooterFont(footerFont);
			    });
                
			    $("#footer").change(function () { 
			        //console.log($(this).val()) 
			        m_plot.setFooter($(this).val())
			    });

			    $("#title").change(function () { 
			        //console.log($(this).val()) 
			        m_plot.setTitle($(this).val())
			    });

			    $("#bottomScale_title").change(function () { 
			        m_plot.setAxisTitle(xBottom, $(this).val())
			    });

			    $("#topScale_title").change(function () { 
			        m_plot.setAxisTitle(xTop, $(this).val())
			    });

			    $("#leftScale_title").change(function () { 
			        m_plot.setAxisTitle(yLeft, $(this).val())
			    });

			    $("#rightScale_title").change(function () { 
			        m_plot.setAxisTitle(yRight, $(this).val())
			    });

			    /*function setReadonly(on){
			    	$("#bottom_min").attr("readonly", on);
			        $("#bottom_max").attr("readonly", on);
			        $("#left_min").attr("readonly", on);
			        $("#left_max").attr("readonly", on);
			        $("#top_min").attr("readonly", on);
			        $("#top_max").attr("readonly", on);
			        $("#right_min").attr("readonly", on);
			        $("#right_max").attr("readonly", on);
			    }*/



			    $("#showline").change(function () { 
			        Static.showline = this.checked
			        
			    });

			    $("#showsymbol").change(function () { 
			        Static.showsymbol = this.checked
			        
			    });

			    $("#enableUserScale").change(function () { 
			        //m_plot.setAxisTitle(yRight, $(this).val())
			        //console.log(this.checked)
			        setReadonly(!this.checked)
			    });

			     // $("#bottom_min").change(function () { 
			     // 	console.log($(this).val(), $("#bottom_max").val())
			     //     //m_plot.setAxisScale(10, 100)//xBottom, $(this).val(), $("#bottom_max").val())	        
			     // 	m_plot.setAxisScale(xBottom, parseFloat($(this).val()), 100)
			     // });

			    // $("#bottom_max").change(function () { 
			    // 	console.log($("#bottom_min").val(), $(this).val())
			    //     m_plot.setAxisScale(xBottom, $("#bottom_min").val(),
			    //     $(this).val())			        	               	        
			    // });

				$("#okButton").click(function () { 
			     	if($("#enableUserScale")[0].checked){
			     		m_plot.setAxisScale(xBottom, parseFloat($("#bottom_min").val()), 
			     			parseFloat($("#bottom_max").val()))
			     		m_plot.setAxisScale(yLeft, parseFloat($("#left_min").val()), 
			     			parseFloat($("#left_max").val()))
			     		m_plot.setAxisScale(xTop, parseFloat($("#top_min").val()), 
			     			parseFloat($("#top_max").val()))
			     		m_plot.setAxisScale(yRight, parseFloat($("#right_min").val()), 
			     			parseFloat($("#right_max").val()))
			     	}
			     });
 				
			     $("#bottom_log").change(function () { 
			     	 m_plot.setAxisScaleEngine(xBottom, new LogScaleEngine())			        	               	        
			     });

                             $("#bottom_linear").change(function () { 
			     	 m_plot.setAxisScaleEngine(xBottom, new LinearScaleEngine())			        	               	        
			     });

                             $("#left_log").change(function () { 
                                 //console.log(44)
			     	 m_plot.setAxisScaleEngine(yLeft, new LogScaleEngine())			        	               	        
			     });

                             $("#left_linear").change(function () { 
			     	 m_plot.setAxisScaleEngine(yLeft, new LinearScaleEngine())			        	               	        
			     });

                             $("#top_log").change(function () { 
			     	 m_plot.setAxisScaleEngine(xTop, new LogScaleEngine())			        	               	        
			     });

                             $("#top_linear").change(function () { 
			     	 m_plot.setAxisScaleEngine(xTop, new LinearScaleEngine())			        	               	        
			     });

                             $("#right_log").change(function () { 
                                 console.log(44)
			     	 m_plot.setAxisScaleEngine(yRight, new LogScaleEngine())			        	               	        
			     });

                             $("#right_linear").change(function () { 
			     	 m_plot.setAxisScaleEngine(yRight, new LinearScaleEngine())			        	               	        
			     });

			     $("#bottom_decimalPlaces").change(function () { 
			     	 m_plot.setAxisDecimalPlaces(xBottom, $(this).val())			        	               	        
			     });

			     $("#top_decimalPlaces").change(function () { 
			     	 m_plot.setAxisDecimalPlaces(xTop, $(this).val())			        	               	        
			     });
		             $("#left_decimalPlaces").change(function () { 
			     	 m_plot.setAxisDecimalPlaces(yLeft, $(this).val())			        	               	        
			     });
                             $("#right_decimalPlaces").change(function () { 
			     	 m_plot.setAxisDecimalPlaces(yRight, $(this).val())			        	               	        
			     });


			}

			//initialize///////////////////
			/*var titleFont = m_plot.titleFont();
			$("#pointSelector").val(titleFont.th)
			$("#title").val(m_plot.title());
			$("#footer").val(m_plot.footer());
			$("#colorSelector_background").val(Static.RGB2HTML(m_plot.plotBackground()));
			
			var footerFont = m_plot.footerFont();
			$("#pointSelector_footer").val(footerFont.th)

			
			$("#bottomScale_title").val(m_plot.axisTitle(xBottom));
			$("#topScale_title").val(m_plot.axisTitle(xTop));
			$("#leftScale_title").val(m_plot.axisTitle(yLeft));
			$("#rightScale_title").val(m_plot.axisTitle(yRight));*/

			//m_plot.setAxisScale(xBottom, 10, 100)

			//console.log(m_plot)
			/*var intv = m_plot.axisInterval(xBottom)
			$("#bottom_min").val(intv.minValue());
	        $("#bottom_max").val(intv.maxValue());*/
	        // $("#left_min").attr("readonly", on);
	        // $("#left_max").attr("readonly", on);
	        // $("#top_min").attr("readonly", on);
	        // $("#top_max").attr("readonly", on);
	        // $("#right_min").attr("readonly", on);
	        // $("#right_max").attr("readonly", on);

			//$("#bottom_min").attr("readonly", false);

			/*var el = $("#fontSelector")[0]
            $(el[el.selectedIndex])
            el.selectedIndex = fonts.indexOf(titleFont.name);
            if(el.selectedIndex < 0)
                el.selectedIndex = 0;*/

		},
		plot: function(){
			return m_plot;
		},
		settingsDlg: function(){                  			
			$("#myModal").modal({backdrop: "static"});
			//m_plot.setAxisScale(xBottom, 10, 100)


			/////////////
			var titleFont = m_plot.titleFont();
			var selectedIndex = fonts.indexOf(titleFont.name)
			if(selectedIndex==-1){selectedIndex=0}
			$("#fontSelector")[0].selectedIndex = selectedIndex					
			$("#pointSelector").val(titleFont.th)
			$("#colorTitle").val(titleFont.fontColor);
			$("#title").val(m_plot.title());

			var footerFont = m_plot.footerFont();
			selectedIndex = fonts.indexOf(footerFont.name)
			if(selectedIndex==-1){selectedIndex=0}
			$("#fontSelector_footer")[0].selectedIndex = selectedIndex					
			$("#pointSelector_footer").val(footerFont.th)
			$("#colorSelector_footer").val(footerFont.fontColor);
			$("#footer").val(m_plot.footer());

			var axisTitleFont = m_plot.axisTitleFont(xBottom);
                  //console.log(axisTitleFont)
			selectedIndex = fonts.indexOf(axisTitleFont.name)
			if(selectedIndex==-1){selectedIndex=0}
			$("#axisTitleFontSelector")[0].selectedIndex = selectedIndex					
			$("#axisTitlePointSelector").val(axisTitleFont.th)
			$("#axisColorTitle").val(axisTitleFont.fontColor);
			//$("#footer").val(m_plot.footer());

			
			$("#colorSelector_background").val(Static.RGB2HTML(m_plot.plotBackground()));
			
			
			$("#bottomScale_title").val(m_plot.axisTitle(xBottom));
			$("#topScale_title").val(m_plot.axisTitle(xTop));
			$("#leftScale_title").val(m_plot.axisTitle(yLeft));
			$("#rightScale_title").val(m_plot.axisTitle(yRight));
			/////////////////////////

			$("#footer").val(m_plot.footer())
			//$("#title").val(m_plot.title())

			// console.log(m_plot.axisInterval(xBottom).maxValue())
			var intv = m_plot.axisInterval(xBottom)
			$("#bottom_min").val(intv.minValue());
	        $("#bottom_max").val(intv.maxValue());
	        intv = m_plot.axisInterval(yLeft)
	        $("#left_min").val(intv.minValue());
	        $("#left_max").val(intv.maxValue());
	        intv = m_plot.axisInterval(xTop)
	        $("#top_min").val(intv.minValue());
	        $("#top_max").val(intv.maxValue());
	        intv = m_plot.axisInterval(yRight)
	        $("#right_min").val(intv.minValue());
	        $("#right_max").val(intv.maxValue());

	        if(m_plot.axisScaleEngine(xBottom).toString()=="[LogScaleEngine]"){
	        	$("#bottom_log")[0].checked = true
	        }
	        if(m_plot.axisScaleEngine(xTop).toString()=="[LogScaleEngine]"){
	        	$("#top_log")[0].checked = true
	        }
	        if(m_plot.axisScaleEngine(yLeft).toString()=="[LogScaleEngine]"){
	        	$("#left_log")[0].checked = true
	        }
	        if(m_plot.axisScaleEngine(yRight).toString()=="[LogScaleEngine]"){
	        	$("#right_log")[0].checked = true
	        }

	        if(m_plot.axisScaleEngine(xBottom).toString()=="[LinearScaleEngine]"){
	        	$("#bottom_linear")[0].checked = true
	        }
	        if(m_plot.axisScaleEngine(xTop).toString()=="[LinearScaleEngine]"){
	        	$("#top_linear")[0].checked = true
	        }
	        if(m_plot.axisScaleEngine(yLeft).toString()=="[LinearScaleEngine]"){
	        	$("#left_linear")[0].checked = true
	        }
	        if(m_plot.axisScaleEngine(yRight).toString()=="[LinearScaleEngine]"){
	        	$("#right_linear")[0].checked = true
	        }

	        var autoScale = m_plot.axisAutoScale(xBottom)
	        $("#enableUserScale")[0].checked = !autoScale
	        setReadonly(autoScale)

		}
	}
});

define('curveSettings',['static'],function(){

var m_dlg1 = 
$('\
<!-- Modal -->\
  <div class="modal fade" id="curveSettingsModal" role="dialog">\
    <div class="modal-dialog">\
    \
      <!-- Modal content-->\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4 class="modal-title">Curve attributes</h4>\
        </div>\
        <div class="modal-body">\
	   \
	   \
<div class="row">\
<div class="col-sm-3">Curve name:</div>\
<div class="col-sm-5"><select id="curveSelect" style="width:100%"></select></div>\
<div class="col-sm-2"><button id="remove">Remove</button></div>\
<div class="col-sm-2"><button id="rename">Rename</button></div>\
</div>\
\
<br>\
<div class="row">\
<div class="col-sm-3">Pen color:<input id="penColor" type="color"/></div>\
<div class="col-sm-4">Pen width:<select id="penWidth" style="width:50%"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div>\
<div class="col-sm-5">Pen style:<select id="penStyle" style="width:60%"><option>solid</option><option>dot</option><option>dash</option><option>dashDot</option><option>dashDotDot</option></select></div>\
</div>\
\
<br>\
<div class="row">\
<div class="col-sm-6">Horizontal axis:<select id="horizontalAxis" style="width:50%"><option value="2">Bottom</option><option value="3">Top</option></select></div>\
<div class="col-sm-5">Vertical axis:<select id="verticalAxis" style="width:60%"><option value="0">Left</option><option value="1">Right</option></select></div>\
</div>\
\
<br>\
<div class="row">\
<div class="col-sm-2"><button id="fit">Fit</button></div>\
<div class="col-sm-3"><button id="fitInfo">Curve Fit Info...</button></div>\
</div>\
\
<br>\
<div class="row">\
<div class="col-sm-2">Symbols</div>\
<div class="col-sm-8"><select id="symbolType"><option value="None">None</option><option value="MRect">Rectangle</option><option value="Cross">Cross</option><option value="Diamond">Diamond</option><option value="Ellipse">Ellipse</option><option value="XCross">Diagonal cross</option></select></div>\
</div>\
\
<br>\
<div id="symbolContainer">\
  <div class="row">\
  <div class="col-sm-6">Symbol pen color:<input id="penColorSymbol" type="color"/></div>\
  <div class="col-sm-6">Symbol pen width:<select id="penWidthSymbol" style="width:50%"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div>\
  </div>\
  <br>\
  <div class="row">\
  <div class="col-sm-6">Symbol fill brush:<input id="fillBrushSymbol" type="color"/></div>\
  <div class="col-sm-6">Symbol size:<select id="sizeSymbol" style="width:50%"><option value="5">5x5</option><option value="6">6x6</option><option value="8">8x8</option><option value="10">10x10</option><option value="12">12x12</option><option value="15">15x15</option></select></div>\
  </div>\
</div>\
\
\
        </div>\
        <div class="modal-footer">\
          <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>\
        </div>\
      </div>\
      \
    </div>\
  </div>\
  ')

$("body").append(m_dlg1); 

var self = this
var _plot = null
var _curveFitCb = null
var _curveFitInfoCb = null

    $("#curveSelect").change(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          initDlg(curve)
      })

    $("#remove").click(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          //LegendMenu.detachReset(curve)
          curve.detach()
          var opts = $("#curveSelect").children()
          $("#curveSelect")[0].removeChild(opts[$("#curveSelect")[0].selectedIndex]);  
          _plot.findPlotCurve($("#curveSelect").val())
          updateDlg(_plot.findPlotCurve($("#curveSelect").val()))
      })

    $("#rename").click(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          Static.prompt("Enter a new name for \""+curve.title()+"\"",
            curve.title(), function(name){
            if(curve.title()==name){
              return true
            }
            if(!curve.plot().findPlotCurve(name)){
                curve.setTitle(name)
                return true
            }else{
              Static.alert(name + " already exist")
              return false
            }
          }, "small")
      })

    
    $("#fit").click(function(){
          _curveFitCb(_plot.findPlotCurve($("#curveSelect").val()))          
    })

    $("#fitInfo").click(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          var info = _curveFitInfoCb(curve)         
          if(info.length){        
            Static.alert(info)
          }else{
            Static.alert("No curve fitting equation found for \""+curve.title()+".\"")  
          }
    })

    $("#penColor").change(function(){
       		var curve = _plot.findPlotCurve($("#curveSelect").val())
          var pen = curve.pen()
       		pen.color = $(this).val()
       		curve.setPen(pen)
    	})
     $("#penWidth").change(function(){
       		var curve = _plot.findPlotCurve($("#curveSelect").val())
       		var pen = curve.pen()
       		pen.width = $(this).val()
       		curve.setPen(pen)
    	})
      $("#penStyle").change(function(){
       		var curve = _plot.findPlotCurve($("#curveSelect").val())
       		var pen = curve.pen()
       		pen.style = $(this).val()
       		curve.setPen(pen)
    	})
      $("#horizontalAxis").change(function(){
          _plot.findPlotCurve($("#curveSelect").val()).setXAxis($(this).val())          
      })
      $("#verticalAxis").change(function(){
          _plot.findPlotCurve($("#curveSelect").val()).setYAxis($(this).val())          
      })

      $("#symbolType").change(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          if($("#symbolType").val()=="None"){
            $("#symbolContainer").hide()
            //addSymbol(curve, $(this).val())
          }else{
            $("#symbolContainer").show()
            
            //addSymbol(curve, $(this).val())
          }
          addSymbol(curve, $(this).val())

      })

     $("#penColorSymbol").change(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          var sym = curve.symbol()
    		if (!sym){
      		return
    		}
    		var pen = sym.pen()
    		pen.color = $(this).val()
    		sym.setPen(pen)
    		//curve.setSymbol(sym)
    		curve.plot().autoRefresh()

    		curve.plot().updateLegend(curve)


      })

	$("#penWidthSymbol").change(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          setSymbolPenWidth(curve, $(this).val())


      })

	$("#fillBrushSymbol").change(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          var sym = curve.symbol()
    		if (!sym){
      		return
    		}
    		var pen = sym.brush()
    		pen.color = $(this).val()
    		sym.setBrush(pen)
    		//curve.setSymbol(sym)
    		curve.plot().autoRefresh()

    		curve.plot().updateLegend(curve)


      })

	$("#sizeSymbol").change(function(){
          var curve = _plot.findPlotCurve($("#curveSelect").val())
          var sym = curve.symbol()
    		if (!sym){
      		return
    		}
           //var sz = new Misc.size($(this)val(), $(this)val())
    		sym.setSize(new Misc.Size($(this).val(), $(this).val()))
    		//curve.setSymbol(sym)
    		curve.plot().autoRefresh()

    		curve.plot().updateLegend(curve)


      })



var addSymbol = function (curve, style) {
  if(style == 'None'){
      curve.setSymbol(null)
    return
  }
  var sym = new Symbol();
  sym.setBrush(new Misc.Brush(Static.NoBrush))
  sym.setSize(new Misc.Size(10, 10))


  if(style == 'MRect'){
      sym.setStyle(MRect)        
  }
  if(style == 'Cross'){
      sym.setStyle(Cross)
  }

  if(style == 'Diamond'){
      sym.setStyle(Diamond)
  }
  if(style == 'Ellipse'){
      sym.setStyle(Ellipse)
  }
  if(style == 'XCross'){
      sym.setStyle(XCross)
  }
      
      /*,{
      name: 'Triangle',
      //img:'images/all.png',
      fun:function(){
      LegendMenu.addSymbol(Triangle)
      }
      }*/
        

  curve.setSymbol(sym)      
}

var setSymbolPenWidth = function (curve, width) {
    var sym = curve.symbol()
    if (!sym){
      return
    }
    var pen = sym.pen()
    pen.width = width
    sym.setPen(pen)
    //curve.setSymbol(sym)
    curve.plot().autoRefresh()

    curve.plot().updateLegend(curve)
}

var setSymbolSize = function (curve, value) {
    var sym = curve.symbol()
    if (!sym)
      return
    var sz = sym.size()
    sz.width = value
    sz.height = value
    sym.setSize(sz)
    curve.plot().autoRefresh()
}



function initCurveSelect(){ 

	var opts = $("#curveSelect").children()
	for(var i=0; i<opts.length; ++i){
		$("#curveSelect")[0].removeChild(opts[i]);
	}
	var curves = _plot.itemList(Static.Rtti_PlotCurve)
	for(var i=0; i<curves.length; ++i){
		if(curves[i].isVisible()){
			var opt = $('<option>'+curves[i].title()+'</option>')
			opt.attr("value", curves[i].title())
			$("#curveSelect").append(opt)
		}
	}
  $("#sizeSymbol").val(10)
   //if(curves.length){
       //updateDlg(curves[0])
	//}
  if(curves.length){
   return curves[0]
	}
    return null
}

function initDlg(curve){
    if(!curve) return 

	var penStyles = ["solid", "dot", "dash", "dashDot", "dashDotDot"] 
    $("#penColor").val(Static.colorNameToHex(curve.pen().color))
    $("#penWidth")[0].selectedIndex = curve.pen().width-1
    $("#penStyle")[0].selectedIndex = penStyles.indexOf(curve.pen().style)
    $("#horizontalAxis")[0].selectedIndex = curve.xAxis()-2
    $("#verticalAxis")[0].selectedIndex = curve.yAxis()
    if(!curve.fitType){
      $("#fitInfo").hide()
    }else{
      $("#fitInfo").show()
    }    
   

       var symbol = curve.symbol()
        if(symbol){
          var symbolStyle = symbol.style()
          if(symbolStyle == MRect)
            $("#symbolType").val("MRect")
          if(symbolStyle == Cross)
            $("#symbolType").val("Cross")
          if(symbolStyle == Diamond)
            $("#symbolType").val("Diamond")
          if(symbolStyle == Ellipse)
            $("#symbolType").val("Ellipse")
          if(symbolStyle == XCross)
            $("#symbolType").val("XCross")
        }else{
          $("#symbolType").val("None")
        }
        if($("#symbolType").val()=="None"){
          $("#symbolContainer").hide()
        }else{
          $("#symbolContainer").show()
          //console.log(symbol.pen())
          $("#penColorSymbol").val(symbol.pen().color)
          $("#penWidthSymbol").val(symbol.pen().width)
          $("#fillBrushSymbol").val(symbol.brush().color)          
          $("#sizeSymbol").val(symbol.size().width)
        }
    }
          	
//}


	return {
        init: function(plot, curveFitCb, curveFitInfoCb){
          var self = this
            _plot = plot
            _curveFitCb = curveFitCb
            _curveFitInfoCb = curveFitInfoCb
		
            
		},        
            
    		curveSettingsDlg: function(){
                //initDlg() 
                 //initCurveSelect()
          		initDlg(initCurveSelect())
    			$("#curveSettingsModal").modal({backdrop: "static"});
    		},
        
        close: function(){
          $(".close").click();
        }

	}
});

define('upload',[],function(){
  var obj = {
     //fileType: "text.*",
     cb: null, 
     reset: function(inputDiv){
		inputDiv[0].value=""
	},
     setInputElement: function(inputDiv){
        inputDiv.change(function(evt){
        
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {      
          // Only process image files.
          var fileExtension = f.name.split('.')[1]
          //console.log(f)
          /*if (!f.type.match(obj.fileType)) {
            //continue;
          }*/

          if (fileExtension!="txt" && fileExtension!="plt") {
            continue;
          }

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              //console.log(e)          
              if(obj.cb)
                obj.cb({fileName: theFile.name, content: e.target.result})          
              else
                console.log({fileName: theFile.name, content: e.target.result})
            };
          })(f);

          //console.log(f)
          // Read in the image file as a data URL.

          reader.readAsText(f);
          //reader.readAsBinaryString(f);
        }
      });        
     }
  };  
  return obj;
});

/*
Based on ndef.parser, by Raphael Graf(r@undefined.ch)
http://www.undefined.ch/mparser/index.html

Ported to JavaScript and modified by Matthew Crumley (email@matthewcrumley.com, http://silentmatt.com/)

You are free to use and modify this code in anyway you find useful. Please leave this comment in the code
to acknowledge its original source. If you feel like it, I enjoy hearing about projects that use my code,
but don't feel like you have to let me know or ask permission.
 */

//  Added by stlsmiths 6/13/2011
//  re-define Array.indexOf, because IE doesn't know it ...
//
//  from http://stellapower.net/content/javascript-support-and-arrayindexof-ie
if (!Array.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0); i < this.length; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	}
}

//var Parser = (function (scope) {
define('mParser',[],function () {
	function object(o) {
		function F() {}
		F.prototype = o;
		return new F();
	}

	var TNUMBER = 0;
	var TOP1 = 1;
	var TOP2 = 2;
	var TVAR = 3;
	var TFUNCALL = 4;

	function Token(type_, index_, prio_, number_) {
		this.type_ = type_;
		this.index_ = index_ || 0;
		this.prio_ = prio_ || 0;
		this.number_ = (number_ !== undefined && number_ !== null) ? number_ : 0;
		this.toString = function () {
			switch (this.type_) {
			case TNUMBER:
				return this.number_;
			case TOP1:
			case TOP2:
			case TVAR:
				return this.index_;
			case TFUNCALL:
				return "CALL";
			default:
				return "Invalid Token";
			}
		};
	}

	function Expression(tokens, ops1, ops2, functions) {
		this.tokens = tokens;
		this.ops1 = ops1;
		this.ops2 = ops2;
		this.functions = functions;
	}

	// Based on http://www.json.org/json2.js
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	escapable = /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	meta = { // table of character substitutions
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		"'": "\\'",
		'\\': '\\\\'
	};

	function degreeToRad(deg) {
		return deg * Math.PI / 180.0;
	}

	function escapeValue(v) {
		if (typeof v === "string") {
			escapable.lastIndex = 0;
			return escapable.test(v) ?
			"'" + v.replace(escapable, function (a) {
				var c = meta[a];
				return typeof c === 'string' ? c :
				'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			}) + "'" :
			"'" + v + "'";
		}
		return v;
	}

	Expression.prototype = {
		simplify: function (values) {
			values = values || {};
			var nstack = [];
			var newexpression = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(item);
				} else if (type_ === TVAR && (item.index_ in values)) {
					item = new Token(TNUMBER, 0, 0, values[item.index_]);
					nstack.push(item);
				} else if (type_ === TOP2 && nstack.length > 1) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					f = this.ops2[item.index_];
					item = new Token(TNUMBER, 0, 0, f(n1.number_, n2.number_));
					nstack.push(item);
				} else if (type_ === TOP1 && nstack.length > 0) {
					n1 = nstack.pop();
					f = this.ops1[item.index_];
					item = new Token(TNUMBER, 0, 0, f(n1.number_));
					nstack.push(item);
				} else {
					while (nstack.length > 0) {
						newexpression.push(nstack.shift());
					}
					newexpression.push(item);
				}
			}
			while (nstack.length > 0) {
				newexpression.push(nstack.shift());
			}

			return new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
		},

		substitute: function (variable, expr) {
			if (!(expr instanceof Expression)) {
				expr = new Parser().parse(String(expr));
			}
			var newexpression = [];
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TVAR && item.index_ === variable) {
					for (var j = 0; j < expr.tokens.length; j++) {
						var expritem = expr.tokens[j];
						var replitem = new Token(expritem.type_, expritem.index_, expritem.prio_, expritem.number_);
						newexpression.push(replitem);
					}
				} else {
					newexpression.push(item);
				}
			}

			var ret = new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
			return ret;
		},

		evaluate: function (values, mode) {
			values = values || {};
			var nstack = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;

			var radMode = mode || false;

			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(item.number_);
				} else if (type_ === TOP2) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					f = this.ops2[item.index_];
					nstack.push(f(n1, n2));
				} else if (type_ === TVAR) {
					if (item.index_ in values) {
						nstack.push(values[item.index_]);
					} else if (item.index_ in this.functions) {
						nstack.push(this.functions[item.index_]);
					} else {
						throw new Error("undefined variable: " + item.index_);
					}
				} else if (type_ === TOP1) {
					n1 = nstack.pop();
					f = this.ops1[item.index_];
					/////////////added start
					if (!radMode) {
						if (item.index_ == "sin" || item.index_ == "cos" || item.index_ == "tan" ||
							item.index_ == "asin" || item.index_ == "acos" || item.index_ == "atan") {
							nstack.push(f(degreeToRad(n1)));
						} else
							nstack.push(f(n1));
					} else
						nstack.push(f(n1));

					/////////////////added end
					//nstack.push(f(n1));//removed
				} else if (type_ === TFUNCALL) {
					n1 = nstack.pop();
					f = nstack.pop();
					if (f.apply && f.call) {
						if (Object.prototype.toString.call(n1) == "[object Array]") {
							nstack.push(f.apply(undefined, n1));
						} else {
							nstack.push(f.call(undefined, n1));
						}
					} else {
						throw new Error(f + " is not a function");
					}
				} else {
					throw new Error("invalid Expression");
				}
			}
			if (nstack.length > 1) {
				throw new Error("invalid Expression (parity)");
			}
			return nstack[0];
		},

		toString: function (toJS) {
			var nstack = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(escapeValue(item.number_));
				} else if (type_ === TOP2) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					f = item.index_;
					if (toJS && f == "^") {
						nstack.push("Math.pow(" + n1 + "," + n2 + ")");
					} else {
						nstack.push("(" + n1 + f + n2 + ")");
					}
				} else if (type_ === TVAR) {
					nstack.push(item.index_);
				} else if (type_ === TOP1) {
					n1 = nstack.pop();
					f = item.index_;
					if (f === "-") {
						nstack.push("(" + f + n1 + ")");
					} else {
						nstack.push(f + "(" + n1 + ")");
					}
				} else if (type_ === TFUNCALL) {
					n1 = nstack.pop();
					f = nstack.pop();
					nstack.push(f + "(" + n1 + ")");
				} else {
					throw new Error("invalid Expression");
				}
			}
			if (nstack.length > 1) {
				throw new Error("invalid Expression (parity)");
			}
			return nstack[0];
		},

		variables: function () {
			var L = this.tokens.length;
			var vars = [];
			for (var i = 0; i < L; i++) {
				var item = this.tokens[i];
				if (item.type_ === TVAR && (vars.indexOf(item.index_) == -1)) {
					vars.push(item.index_);
				}
			}

			return vars;
		},

		toJSFunction: function (param, variables) {
			var f = new Function(param, "with(Parser.values) { return " + this.simplify(variables).toString(true) + "; }");
			return f;
		}
	};

	function add(a, b) {
		return Number(a) + Number(b);
	}
	function sub(a, b) {
		return a - b;
	}
	function mul(a, b) {
		return a * b;
	}
	function div(a, b) {
		return a / b;
	}
	function mod(a, b) {
		return a % b;
	}
	function concat(a, b) {
		return "" + a + b;
	}

	function log10(a) {
		return Math.log10(a) //* Math.LOG10E;
	}
	function neg(a) {
		return -a;
	}

	function random(a) {
		return Math.random() * (a || 1);
	}
	function fac(a) { //a!
		a = Math.floor(a);
		var b = a;
		while (a > 1) {
			b = b * (--a);
		}
		return b;
	}

	// TODO: use hypot that doesn't overflow
	function pyt(a, b) {
		return Math.sqrt(a * a + b * b);
	}

	function append(a, b) {
		if (Object.prototype.toString.call(a) != "[object Array]") {
			return [a, b];
		}
		a = a.slice();
		a.push(b);
		return a;
	}

	function Parser() {
		this.success = false;
		this.errormsg = "";
		this.expression = "";

		this.pos = 0;

		this.tokennumber = 0;
		this.tokenprio = 0;
		this.tokenindex = 0;
		this.tmpprio = 0;

		this.ops1 = {
			"sin": Math.sin,
			"cos": Math.cos,
			"tan": Math.tan,
			"asin": Math.asin,
			"acos": Math.acos,
			"atan": Math.atan,
			"sqrt": Math.sqrt,
			"log": Math.log,
			"lg": log10,
			"log10": log10,
			"abs": Math.abs,
			"ceil": Math.ceil,
			"floor": Math.floor,
			"round": Math.round,
			"-": neg,
			"exp": Math.exp
		};

		this.ops2 = {
			"+": add,
			"-": sub,
			"*": mul,
			"/": div,
			"%": mod,
			"^": Math.pow,
			",": append,
			"||": concat
		};

		this.functions = {
			"random": random,
			"fac": fac,
			"min": Math.min,
			"max": Math.max,
			"pyt": pyt,
			"pow": Math.pow,
			"atan2": Math.atan2
		};

		this.consts = {
			"E": Math.E,
			"PI": Math.PI
		};
	}

	/*Parser.parse = function (expr) {
		return new Parser().parse(expr);
	};*/
	Parser.getParser = function () {
		return new Parser();
	};

	/*Parser.parse = function (expr) {
		return new Parser().parse(expr);
	};*/

	Parser.evaluate = function (expr, variables) {
		return Parser.parse(expr).evaluate(variables);
	};

	Parser.Expression = Expression;

	Parser.values = {
		sin: Math.sin,
		cos: Math.cos,
		tan: Math.tan,
		asin: Math.asin,
		acos: Math.acos,
		atan: Math.atan,
		sqrt: Math.sqrt,
		log: Math.log,
		lg: log10,
		log10: log10,
		abs: Math.abs,
		ceil: Math.ceil,
		floor: Math.floor,
		round: Math.round,
		random: random,
		fac: fac,
		exp: Math.exp,
		min: Math.min,
		max: Math.max,
		pyt: pyt,
		pow: Math.pow,
		atan2: Math.atan2,
		E: Math.E,
		PI: Math.PI
	};

	var PRIMARY = 1 << 0;
	var OPERATOR = 1 << 1;
	var FUNCTION = 1 << 2;
	var LPAREN = 1 << 3;
	var RPAREN = 1 << 4;
	var COMMA = 1 << 5;
	var SIGN = 1 << 6;
	var CALL = 1 << 7;
	var NULLARY_CALL = 1 << 8;

	Parser.prototype = {
		parse: function (expr) {
			this.errormsg = "";
			this.success = true;
			var operstack = [];
			var tokenstack = [];
			this.tmpprio = 0;
			var expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
			var noperators = 0;
			this.expression = expr;
			this.pos = 0;
			while (this.pos < this.expression.length) {
				if (this.isOperator()) {
					if (this.isSign() && (expected & SIGN)) {
						if (this.isNegativeSign()) {
							this.tokenprio = 2;
							this.tokenindex = "-";
							noperators++;
							this.addfunc(tokenstack, operstack, TOP1);
						}
						expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
					} else if (this.isComment()) {}
					else {
						if ((expected & OPERATOR) === 0) {
							this.error_parsing(this.pos, "unexpected operator");
						}
						noperators += 2;
						this.addfunc(tokenstack, operstack, TOP2);
						expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
					}
				} else if (this.isNumber()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected number");
					}
					var token = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(token);

					expected = (OPERATOR | RPAREN | COMMA);
				} else if (this.isString()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected string");
					}
					var token = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(token);

					expected = (OPERATOR | RPAREN | COMMA);
				} else if (this.isLeftParenth()) {
					if ((expected & LPAREN) === 0) {
						this.error_parsing(this.pos, "unexpected \"(\"");
					}

					if (expected & CALL) {
						noperators += 2;
						this.tokenprio = -2;
						this.tokenindex = -1;
						this.addfunc(tokenstack, operstack, TFUNCALL);
					}

					expected = (PRIMARY | LPAREN | FUNCTION | SIGN | NULLARY_CALL);
				} else if (this.isRightParenth()) {
					if (expected & NULLARY_CALL) {
						var token = new Token(TNUMBER, 0, 0, []);
						tokenstack.push(token);
					} else if ((expected & RPAREN) === 0) {
						this.error_parsing(this.pos, "unexpected \")\"");
					}

					expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
				} else if (this.isComma()) {
					if ((expected & COMMA) === 0) {
						this.error_parsing(this.pos, "unexpected \",\"");
					}
					this.addfunc(tokenstack, operstack, TOP2);
					noperators += 2;
					expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
				} else if (this.isConst()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected constant");
					}
					var consttoken = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(consttoken);
					expected = (OPERATOR | RPAREN | COMMA);
				} else if (this.isOp2()) {
					if ((expected & FUNCTION) === 0) {
						this.error_parsing(this.pos, "unexpected function");
					}
					this.addfunc(tokenstack, operstack, TOP2);
					noperators += 2;
					expected = (LPAREN);
				} else if (this.isOp1()) {
					if ((expected & FUNCTION) === 0) {
						this.error_parsing(this.pos, "unexpected function");
					}
					this.addfunc(tokenstack, operstack, TOP1);
					noperators++;
					expected = (LPAREN);
				} else if (this.isVar()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected variable");
					}
					var vartoken = new Token(TVAR, this.tokenindex, 0, 0);
					tokenstack.push(vartoken);

					expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
				} else if (this.isWhite()) {}
				else {
					if (this.errormsg === "") {
						this.error_parsing(this.pos, "unknown character");
					} else {
						this.error_parsing(this.pos, this.errormsg);
					}
				}
			}
			if (this.tmpprio < 0 || this.tmpprio >= 10) {
				this.error_parsing(this.pos, "unmatched \"()\"");
			}
			while (operstack.length > 0) {
				var tmp = operstack.pop();
				tokenstack.push(tmp);
			}
			if (noperators + 1 !== tokenstack.length) {
				//print(noperators + 1);
				//print(tokenstack);
				this.error_parsing(this.pos, "parity");
			}

			return new Expression(tokenstack, object(this.ops1), object(this.ops2), object(this.functions));
		},

		evaluate: function (expr, variables) {
			return this.parse(expr).evaluate(variables);
		},

		error_parsing: function (column, msg) {
			this.success = false;
			this.errormsg = "parse error [column " + (column) + "]: " + msg;
			//throw new Error(this.errormsg);
		},

		//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

		addfunc: function (tokenstack, operstack, type_) {
			var operator = new Token(type_, this.tokenindex, this.tokenprio + this.tmpprio, 0);
			while (operstack.length > 0) {
				if (operator.prio_ <= operstack[operstack.length - 1].prio_) {
					tokenstack.push(operstack.pop());
				} else {
					break;
				}
			}
			operstack.push(operator);
		},

		isNumber: function () {
			var r = false;
			var str = "";
			while (this.pos < this.expression.length) {
				var code = this.expression.charCodeAt(this.pos);
				if ((code >= 48 && code <= 57) || code === 46) {
					str += this.expression.charAt(this.pos);
					this.pos++;
					this.tokennumber = parseFloat(str);
					r = true;
				} else {
					break;
				}
			}
			return r;
		},

		// Ported from the yajjl JSON parser at http://code.google.com/p/yajjl/
		unescape: function (v, pos) {
			var buffer = [];
			var escaping = false;

			for (var i = 0; i < v.length; i++) {
				var c = v.charAt(i);

				if (escaping) {
					switch (c) {
					case "'":
						buffer.push("'");
						break;
					case '\\':
						buffer.push('\\');
						break;
					case '/':
						buffer.push('/');
						break;
					case 'b':
						buffer.push('\b');
						break;
					case 'f':
						buffer.push('\f');
						break;
					case 'n':
						buffer.push('\n');
						break;
					case 'r':
						buffer.push('\r');
						break;
					case 't':
						buffer.push('\t');
						break;
					case 'u':
						// interpret the following 4 characters as the hex of the unicode code point
						var codePoint = parseInt(v.substring(i + 1, i + 5), 16);
						buffer.push(String.fromCharCode(codePoint));
						i += 4;
						break;
					default:
						throw this.error_parsing(pos + i, "Illegal escape sequence: '\\" + c + "'");
					}
					escaping = false;
				} else {
					if (c == '\\') {
						escaping = true;
					} else {
						buffer.push(c);
					}
				}
			}

			return buffer.join('');
		},

		isString: function () {
			var r = false;
			var str = "";
			var startpos = this.pos;
			if (this.pos < this.expression.length && this.expression.charAt(this.pos) == "'") {
				this.pos++;
				while (this.pos < this.expression.length) {
					var code = this.expression.charAt(this.pos);
					if (code != "'" || str.slice(-1) == "\\") {
						str += this.expression.charAt(this.pos);
						this.pos++;
					} else {
						this.pos++;
						this.tokennumber = this.unescape(str, startpos);
						r = true;
						break;
					}
				}
			}
			return r;
		},

		isConst: function () {
			var str;
			for (var i in this.consts) {
				if (true) {
					var L = i.length;
					str = this.expression.substr(this.pos, L);
					if (i === str) {
						this.tokennumber = this.consts[i];
						this.pos += L;
						return true;
					}
				}
			}
			return false;
		},

		isOperator: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 43) { // +
				this.tokenprio = 0;
				this.tokenindex = "+";
			} else if (code === 45) { // -
				this.tokenprio = 0;
				this.tokenindex = "-";
			} else if (code === 124) { // |
				if (this.expression.charCodeAt(this.pos + 1) === 124) {
					this.pos++;
					this.tokenprio = 0;
					this.tokenindex = "||";
				} else {
					return false;
				}
			} else if (code === 42 || code === 8729 || code === 8226) { // * or ∙ or •
				this.tokenprio = 1;
				this.tokenindex = "*";
			} else if (code === 47) { // /
				this.tokenprio = 2;
				this.tokenindex = "/";
			} else if (code === 37) { // %
				this.tokenprio = 2;
				this.tokenindex = "%";
			} else if (code === 94) { // ^
				this.tokenprio = 3;
				this.tokenindex = "^";
			} else {
				return false;
			}
			this.pos++;
			return true;
		},

		isSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 45 || code === 43) { // -
				return true;
			}
			return false;
		},

		isPositiveSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 43) { // +
				return true;
			}
			return false;
		},

		isNegativeSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 45) { // -
				return true;
			}
			return false;
		},

		isLeftParenth: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 40) { // (
				this.pos++;
				this.tmpprio += 10;
				return true;
			}
			return false;
		},

		isRightParenth: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 41) { // )
				this.pos++;
				this.tmpprio -= 10;
				return true;
			}
			return false;
		},

		isComma: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 44) { // ,
				this.pos++;
				this.tokenprio = -1;
				this.tokenindex = ",";
				return true;
			}
			return false;
		},

		isWhite: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 32 || code === 9 || code === 10 || code === 13) {
				this.pos++;
				return true;
			}
			return false;
		},

		isOp1: function () {
			var str = "";
			for (var i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0 && (str in this.ops1)) {
				this.tokenindex = str;
				this.tokenprio = 5;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isOp2: function () {
			var str = "";
			for (var i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0 && (str in this.ops2)) {
				this.tokenindex = str;
				this.tokenprio = 5;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isVar: function () {
			var str = "";
			for (var i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0) {
				this.tokenindex = str;
				this.tokenprio = 4;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isComment: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 47 && this.expression.charCodeAt(this.pos) === 42) {
				this.pos = this.expression.indexOf("*/", this.pos) + 2;
				if (this.pos === 1) {
					this.pos = this.expression.length;
				}
				return true;
			}
			return false;
		}
	};

	//scope.Parser = Parser;
	return Parser
}) /*(typeof exports === 'undefined' ? {} : exports);*/
;

define('toolBar',[],function(){
	function ToolBar(obj){
            var buttonList = []
            obj = obj || {}
            function defaultCb(){
              console.log("No callback defined for button")
              
            };
            var tbDiv = $('<div id="toolBar1" style="position:relative; border-style: ridge; background-color: lightBlue"></div>')
            if(obj.zIndex !== undefined)
              tbDiv.css("zIndex", obj.zIndex)
            tbDiv.insertBefore($("#plotDiv"))
            $("#plotDiv").removeClass("noToolBar")
            $("#plotDiv").addClass("toolBar")
            //tbDiv.addClass("no-print")

            
            var addPushbutton = function(obj){
                 obj.text = obj.text || "Button"
                 obj.class = obj.class || "btn btn-primary"
                 obj.innerHtmlId = obj.innerHtmlId || "elem_"+buttonList.length
                 obj.duration = obj.duration || 40
                 var b = $('<button id='+obj.innerHtmlId+' type="button" data-toggle="tooltip">')
                 b.addClass(obj.class)
                 b.text(obj.text)
                 tbDiv.append(b)  

                 b.attr('title', obj.tooltip)               
                 var _cb = obj.cb || function(){console.log("No callback defined for button")}
                 var clickEvent = "click"
                 var mousedownEvent = "mousedown"
                 var mouseupEvent = "mouseup"
                 if(Static.isMobile()){
                   clickEvent = "tap"
                   mousedownEvent = "touchstart"
                   mouseupEvent = "touchend"
                 }

                 if(obj.repeat){
                    b.interval = null
                    b.bind(mousedownEvent, function(e){ 
                                console.log(mousedownEvent) 
                                if(mousedownEvent == "mousedown"){ 
                                  if(e.button!=0){
                                    return 
                                  } 
                                }           
                                b.interval = setInterval(_cb, obj.duration);
                                
                            });
                    $(window).bind(mouseupEvent, function(){
                                clearInterval(b.interval)
                                //console.log(444)
                            });
                    // b.mouseup(function(){
                    //             clearInterval(b.interval)
                    //         });

                 }else{
                    b.bind(clickEvent, _cb)
                 }                    
                 buttonList.push(b)


                 return buttonList.length-1;                  
            }

            this.disable = function(identifier){
                buttonList[identifier].attr("disabled", true)                
            }

            this.enable = function(identifier){
                buttonList[identifier].attr("disabled", false)                
            }

            this.hide = function(identifier){
                if(identifier == undefined)
                    identifier = -1
                if(identifier > -1 && identifier < buttonList.length){
                    buttonList[identifier].hide()
                }
                else{
                    tbDiv.hide()
                    $("#plotDiv").removeClass("toolBar")
                    $("#plotDiv").addClass("noToolBar")
                  }
                if(obj.refreshCb)
                	refreshCb()
            }
            this.show = function(identifier){
                if(identifier == undefined)
                    identifier = -1
                if(identifier > -1 && identifier < buttonList.length){
                    buttonList[identifier].show()
                }
                else{
                    tbDiv.show()
                    $("#plotDiv").removeClass("noToolBar")
                    $("#plotDiv").addClass("toolBar")
                  }
                if(obj.refreshCb)
                  refreshCb()
            }

            var addCheckbox = function(obj){
                var option = obj.label || "Option 1"
                obj.innerHtmlId = obj.innerHtmlId || "elem_"+buttonList.length
                var chkbox = $('<label data-toggle="tooltip" class="checkbox-inline">\
                                    <input id='+obj.innerHtmlId+'  type="checkbox" value="">'+option+'\
                                  </label>')
                chkbox.css("marginLeft", obj.marginLeft || 8)
                chkbox.css("marginRight", obj.marginRight || 8)
                tbDiv.append(chkbox)  

                chkbox.attr('title', obj.tooltip)               
                var _cb = obj.cb || function(){console.log("No callback defined for button")}
                chkbox.click(_cb)                    
                buttonList.push(chkbox)
                return buttonList.length-1;   
            }

            var addRadiobutton = function(obj){
                var option = obj.label || "Option 1"
                obj.value = obj.value || option
                obj.innerHtmlId = obj.innerHtmlId || "elem_"+buttonList.length
                var name = obj.name || "optradio"
                var r = $('<label data-toggle="tooltip" class="checkbox-inline">\
                                    <input id='+obj.innerHtmlId+' type="radio" value='+obj.value+' name='+name+'>'+option+'\
                                  </label>')
                r.css("marginLeft", obj.marginLeft || 0)
                r.css("marginRight", obj.marginRight || 0)
                tbDiv.append(r)

                r.attr('title', obj.tooltip)

                r.addClass(obj.class)                 
                var _cb = obj.cb || defaultCb
                r.click(_cb)                    
                buttonList.push(r)
                return buttonList.length-1;   
            }

            function makeListElement(obj){
              var str = ""
              var checkbox = obj.hasCheckbox || false
              var elementsInfo = obj.listElements || []
              for(var i = 0; i<elementsInfo.length; ++i){
                //elementsInfo[i].hasCheckbox = elementsInfo[i].hasCheckbox || false
                elementsInfo[i].icon = elementsInfo[i].icon || ""
                elementsInfo[i].checked = elementsInfo[i].checked || "unchecked"
                if(checkbox && !elementsInfo[i].icon.length){
                  if(elementsInfo[i].tooltip){                  
                    str += '<li title="'+elementsInfo[i].tooltip+'"><a href="#"><label><input type="checkbox" '+elementsInfo[i].checkboxState+ ' value='+i+'>'+elementsInfo[i].text+'</label></a></li>'
                  }
                  else{                  
                    str += '<li><a href="#"><label><input type="checkbox" '+elementsInfo[i].checkboxState+ ' value='+i+'>'+elementsInfo[i].text+'</label></a></li>'
                  }
                }
                if(!checkbox && elementsInfo[i].icon.length){
                  if(elementsInfo[i].tooltip){                  
                    str += '<li title="'+elementsInfo[i].tooltip+'"><a href="#"><label>'+elementsInfo[i].icon+elementsInfo[i].text+'</label></a></li>'
                  }
                  else{                  
                    str += '<li><a href="#"><label>'+elementsInfo[i].icon+elementsInfo[i].text+'</label></a></li>'
                  }
                }
                if(checkbox && elementsInfo[i].icon.length){
                  if(elementsInfo[i].tooltip){                  
                    str += '<li title="'+elementsInfo[i].tooltip+'"><a href="#"><label><input type="checkbox" '+elementsInfo[i].checkboxState+ ' value="">'+elementsInfo[i].icon+elementsInfo[i].text+'</label></a></li>'
                  }
                  else{                  
                    str += '<li><a href="#"><label><input type="checkbox" '+elementsInfo[i].checkboxState+ ' value="">'+elementsInfo[i].icon+elementsInfo[i].text+'</label></a></li>'
                  }
                }
                if(!checkbox && !elementsInfo[i].icon.length){
                  //str += '<li><a href="#">'+elementsInfo[i].text+'</a></li>'
                  if(elementsInfo[i].tooltip){ 
                    str += '<li title="'+elementsInfo[i].tooltip+'"><a href="#"><label>'+elementsInfo[i].text+'</label></a></li>'
                  }
                  else{ 
                    str += '<li><a href="#"><label>'+elementsInfo[i].text+'</label></a></li>'
                  }
                }
              }
              return str
            }
            
            var addDropdown = function(obj){
                var option = obj.label || "Option 1"
                obj.text = obj.text || "Button"
                obj.innerHtmlId = obj.innerHtmlId || "elem_"+buttonList.length
                var d = $('<span data-toggle="tooltip" class="dropdown">\
                              <button id='+obj.innerHtmlId+' class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">'+obj.text+'\
                              <span class="caret"></span></button>\
                              <ul class=\"dropdown-menu\">'+makeListElement(obj)+'</ul>\
                          </span>')
                d.css("marginLeft", obj.marginLeft || 0)
                d.css("marginRight", obj.marginRight || 0)

                d.addClass(obj.class)

                d.attr('title', obj.tooltip)
                
                //console.log(obj.innerHtmlId)
                tbDiv.append(d)                 
               
                obj.cb = obj.cb || defaultCb
                

                d.on('click', function(e){
                  var el = $(e.target)
                  if(el.parent().parent().parent().hasClass('disabled'))
                    return false
                  if(obj.hasCheckbox)
                    return
                  var el = $(e.target)
                  var index = el.closest('li').index()
                  //var checked = el.prop("checked")
                  if(index == -1)
                    return
                  obj.cb(e, index)                
                  
                }) 
                

                d.on('change', function(e){

                  var el = $(e.target)
                  
                  //console.log()
                  var checked = el.prop("checked")
                  //if(index == -1 || checked==undefined)
                    //return   
                  obj.cb(e, el.closest('li').index(), el.prop("checked"))                
                  
                })     
                    
                
               
                buttonList.push(d)
                return buttonList.length-1;   
            }

            

            var addSelect = function(obj){
                obj.label = obj.label || "Select One"
                obj.innerHtmlId = obj.innerHtmlId || "elem_"+buttonList.length
                //obj.text = obj.text || "Button"
                var s = $('<span data-toggle="tooltip"><label for="sel1">'+obj.label+':</label>\
                            <select>\
                              <option>1</option>\
                              <option>23456789101112</option>\
                              <option>3</option>\
                              <option>4</option>\
                            </select></span>')
                s.css("marginLeft", obj.marginLeft || 8)
                s.css("marginRight", obj.marginRight || 8)

                s.addClass(obj.class)

                s.attr('title', obj.tooltip)
                

                tbDiv.append(s)                 
                var _cb = obj.cb || function(){console.log("No callback defined for button")}
                s.click(_cb)                    
                buttonList.push(s)
                return buttonList.length-1;   
            }

            var addUpload = function(obj){
                obj.label = obj.label || "Select One"
                obj.innerHtmlId = obj.innerHtmlId || "elem_"+buttonList.length
                //obj.text = obj.text || "Button"
                var inp = $('<input id='+obj.innerHtmlId+'  type="file" name="files[]" multiple />')
                var u = $('<button data-toggle="tooltip"></button>')
                inp.css("marginLeft", -8)
                inp.css("marginRight", -8)
                inp.css("marginTop", -3)
                inp.css("marginBottom", -3)
                u.append(inp)
                /*var u = $('<button data-toggle="tooltip">\
                            <input type="file" id="files" name="files[]" multiple />\
                            </button>')*/
                u.css("marginLeft", obj.marginLeft || 8)
                u.css("marginRight", obj.marginRight || 8)

                u.addClass(obj.class)

                u.attr('title', obj.tooltip)
                

                tbDiv.append(u)
                buttonList.push(u)

                //A workaround to get the input file tag tio work in some
                //IE browsers
                var click = false;
                u.click(function(){
                  if(!click){
                    click=true;
                    inp.trigger("click")
                    return false
                  }                  
                })

                return buttonList.length-1;   
            }

            var addNumber = function(obj){
                obj.label = obj.label || "Select One"
                obj.innerHtmlId = obj.innerHtmlId || "elem_"+buttonList.length
                //obj.text = obj.text || "Button"
                obj.min = obj.min||-1000000
                obj.max = obj.max||1000000
                obj.value = obj.value || obj.min
                if(obj.value > obj.max)
                    obj.value = obj.max
                if(obj.value < obj.min)
                    obj.value = obj.min
                //console.log(typeof(obj.min))
                var n = $('<span data-toggle="tooltip"><label for="sel1">'+obj.label+':</label>\
                                   </span>')
                    var spinBox = $('<input id='+obj.innerHtmlId+'  type="number"\
                            value="10" name="some-name"/>')
                    n.append(spinBox)  
                    tbDiv.append(n)  
                    spinBox.attr({'width': 200,
                                  'min': obj.min, 
                                  'max': obj.max, 
                                  'step': obj.step, 
                                  'value': obj.value}); 

                    n.attr('title', obj.tooltip)
                                      
                n.css("marginLeft", obj.marginLeft || 8)
                n.css("marginRight", obj.marginRight || 8)

                n.addClass(obj.class)
                              
                var _cb = obj.cb || function(){console.log("No callback defined for button")}
                n.click(_cb)                    
                buttonList.push(n)
                return buttonList.length-1;   
            }

            var addLink = function(obj){
                 obj.text = obj.text || "Button"
                 obj.innerHtmlId = obj.innerHtmlId || "elem_"+buttonList.length
                 
                 var l = $('<A HREF='+obj.href+'></a>')
                 l.text(obj.text)
                 tbDiv.append(l)  
                 l.addClass(obj.class)
                 l.attr('title', obj.tooltip)
                 l.attr('target', obj.target)               
                 var _cb = obj.cb || function(){console.log("No callback defined for button")}
                 l.click(_cb)                    
                 buttonList.push(l)
                 return buttonList.length-1;                  
            }

            this.addToolButton = function(type, obj){
              if(type == "pushbutton")
                return addPushbutton(obj)
              if(type == "checkbox")
                return addCheckbox(obj)
              if(type == "radio")
                return addRadiobutton(obj)
              if(type == "dropdown")
                return addDropdown(obj)
              if(type == "select")
                return addSelect(obj)
              if(type == "number")
                return addNumber(obj)
              if(type == "upload")
                return addUpload(obj)
              if(type == "link")
                return addLink(obj)

            }

            this.setButtonCheck = function(buttonId, on){
               buttonList[buttonId].children().prop("checked", on);
            }

            this.setDropdownItemCheck = function(buttonId, listIndex, on){
              var input = $($(buttonList[buttonId].children()[1]).children()[listIndex]).children().children().children()
              input.prop("checked", on)
            }

            this.hideDropdownItem = function(buttonId, listIndex){
              $($(buttonList[buttonId].children()[1]).children()[listIndex]).hide()              
            }

            this.showDropdownItem = function(buttonId, listIndex){
              $($(buttonList[buttonId].children()[1]).children()[listIndex]).show()              
            }

            this.enableDropdownItem = function(buttonId, listIndex, on){
              var liItem = $($(buttonList[buttonId].children()[1]).children()[listIndex]).addClass('disabled')
              if(!on){
                liItem.addClass('disabled')                
              }else{
                liItem.removeClass('disabled')                
              }
           }    
            
        }


	return ToolBar

})

/*var titleDiv = $('<div />').attr({
			id: "titleDiv"
		});
	//alert(titleDiv)
	plotDiv.append(titleDiv);*/;

define('functionDlg',['static'],function(){

var m_dlg1 = 
$('\
<div class="modal fade" id="functionModal" role="dialog">\
    <div class="modal-dialog modal-md">\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4 class="modal-title">Curve Function</h4>\
        </div>\
        <div class="modal-body">\
	  <div class="row">\
          <div class="col-sm-2">Curve title:</div>\
          <div class="col-sm-4"><input id="fnDlg_title" style="width:100%" type="text" value="curve_1"/></div>\
          <div class="col-sm-2">Function:</div>\
          <div class="col-sm-4"><input id="fnDlg_function" style="width:100%" type="text" value="x^2"/></div>\
    </div>\
	  <br>\
    <div id="limits" class="row">\
          	<div class="col-sm-3">Lower limit:</div>\
            <div class="col-sm-3"><input id="fnDlg_lowerLimit" style="width:100%" type="number" value="-10.0"/></div>\
            <div class="col-sm-3">Upper limit:</div>\
            <div class="col-sm-3"><input id="fnDlg_upperLimit" style="width:100%" type="number" value="10.0"/></div>\
    </div>\
    <br>\
          <div class="row">\
            <div class="col-sm-3">Unbounded range:</div>\
            <div class="col-sm-3"><input id="fnDlg_unboundedRange" type="checkbox"/></div>\
            <div class="col-sm-3">Number of points:</div>\
            <div class="col-sm-3"><input id="fnDlg_numberOfPoints" type="number" min="2" max="200" value="100"/></div>\
          </div>\
          <br>\
          <div id="cont_variable" class="row">\
            <div class="col-sm-3">Enter variable:</div>\
            <div class="col-sm-1"><input id="fnDlg_variable" style="width:100%" type="text" value="x" /></div>\
          </div>\
          <br>\
        <div class="modal-footer">\
          <button id="fnDlg_ok" type="button" class="btn btn-default" >Ok</button>\
        </div>\
      </div>\
    </div>\
  </div>\
</div>\
')

//var sideBarVisible=false

//this.coeffs = []

/*function isLetter(c){
   c = c.toLowerCase().charCodeAt(0)
   return (c>96 && c<122)
}*/

/*function getKeyword(str, ind){
  var word = []
  for(var i=ind; i<str.length; ++i){
    if(isLetter(str[i])){
      word.push(str[i])
    }else{
	break
    }
  } 
  if(word.length < 2 || keywords.indexOf(word)
==-1){
    return []
  }   
  return word
}*/

//var operators = ["(", ")", " ", "-", "+", "*", "/"]



function uniqueChars(str){
    var result = []
    //console.log(str)
    str = purgeKewords(str)
    for(var i=0; i<str.length; ++i){
        /*if(operators.indexOf(str[i])!=-1){
          continue
        }*/
        if(Static.isAlpha(str[i])){            
            if(result.indexOf(str[i])==-1){
                result.push(str[i])
            }
        }
    }
    return result
}

function selectorCont(index){
  return $("#coeff_cont"+(index+1))
}

function selector(index){
  return $("#coeff"+(index+1))
}
/*
math.acos(x)	Calculate the inverse cosine of a value.
math.acosh(x)	Calculate the hyperbolic arccos of a value, defined as acosh(x) = ln(sqrt(x^2 - 1) + x).
math.acot(x)	Calculate the inverse cotangent of a value, defined as acot(x) = atan(1/x).
math.acoth(x)	Calculate the hyperbolic arccotangent of a value, defined as acoth(x) = atanh(1/x) = (ln((x+1)/x) + ln(x/(x-1))) / 2.
math.acsc(x)	Calculate the inverse cosecant of a value, defined as acsc(x) = asin(1/x).
math.acsch(x)	Calculate the hyperbolic arccosecant of a value, defined as acsch(x) = asinh(1/x) = ln(1/x + sqrt(1/x^2 + 1)).
math.asec(x)	Calculate the inverse secant of a value.
math.asech(x)	Calculate the hyperbolic arcsecant of a value, defined as asech(x) = acosh(1/x) = ln(sqrt(1/x^2 - 1) + 1/x).
math.asin(x)	Calculate the inverse sine of a value.
math.asinh(x)	Calculate the hyperbolic arcsine of a value, defined as asinh(x) = ln(x + sqrt(x^2 + 1)).
math.atan(x)	Calculate the inverse tangent of a value.
math.atan2(y, x)	Calculate the inverse tangent function with two arguments, y/x.
math.atanh(x)	Calculate the hyperbolic arctangent of a value, defined as atanh(x) = ln((1 + x)/(1 - x)) / 2.
math.cos(x)	Calculate the cosine of a value.
math.cosh(x)	Calculate the hyperbolic cosine of a value, defined as cosh(x) = 1/2 * (exp(x) + exp(-x)).
math.cot(x)	Calculate the cotangent of a value.
math.coth(x)	Calculate the hyperbolic cotangent of a value, defined as coth(x) = 1 / tanh(x).
math.csc(x)	Calculate the cosecant of a value, defined as csc(x) = 1/sin(x).
math.csch(x)	Calculate the hyperbolic cosecant of a value, defined as csch(x) = 1 / sinh(x).
math.sec(x)	Calculate the secant of a value, defined as sec(x) = 1/cos(x).
math.sech(x)	Calculate the hyperbolic secant of a value, defined as sech(x) = 1 / cosh(x).
math.sin(x)	Calculate the sine of a value.
math.sinh(x)	Calculate the hyperbolic sine of a value, defined as sinh(x) = 1/2 * (exp(x) - exp(-x)).
math.tan(x)	Calculate the tangent of a value.
math.tanh(x)	Calculate the hyperbolic tangent of a value, defined as tanh(x) = (exp(2 * x) - 1) / (exp(2 * x) + 1).
*/

var keywords = 
["asinh", "acosh", "atanh", "acoth", "asech", "acsch",
"asin", "acos", "atan", "acot", "asec", "acsc",
"sinh", "cosh", "tanh", "coth", "sech", "csch",
"sin", "cos", "tan", "sec", "csc", "cot",
"deg"]

function purgeKewords(str){
   for(var i=0; i<keywords.length; ++i){
      while (str.indexOf(keywords[i]) != -1)
        str = str.replace(keywords[i], "")
   }
   return str
}

function hasKeyword(str){
   for(var i=0; i<keywords.length; ++i){
      while (str.indexOf(keywords[i]) != -1)
        return true
   }
   return false
}

function insertProductSign(str){
    if(hasKeyword(str))
        return str;
    var result = "";
    result += str[0]
    for(var i=1; i<str.length; ++i){
        if(Static.isAlpha(str[i-1]) && Static.isAlpha(str[i])){
            result += '*';
        }
        result += str[i];        
    }
    return result;
}

function getCoeffs(){
  var result = []
  var fn = $("#fnDlg_function").val()

  fn = purgeKewords(fn)

  var indepVar = $("#fnDlg_variable").val()

  while (fn.indexOf(indepVar) != -1)
        fn = fn.replace(indepVar, "")
  //console.log(fn)
  for(var i=0; i<fn.length; ++i){
      if(Static.isAlpha(fn[i])){
          if(result.indexOf(fn[i])==-1){
              result.push(fn[i])
          }
      }
  }
  return result
}



	return {
        init: function(cb){
          var self = this
            

            //$("body").append(sideBarDlg);        
    			  $("body").append(m_dlg1);
            $("#cont_variable").hide()  
            //$("#sideBar").hide()  

            /*$("#coeff_val1, #coeff_val2, #coeff_val3, #coeff_val4, #coeff_val5").change(function(){
              console.log(44)               
            })*/          

            $("#fnDlg_unboundedRange").change(function(){
                if($(this)[0].checked) {               
                     $("#limits").hide()//attr("readonly", true)
                     //$("#fnDlg_upperLimit").attr("readonly", true)                        
                }else{
                     $("#limits").show()//.attr("readonly", false)
                     //$("#fnDlg_upperLimit").attr("readonly", false) 
                }
            })

            
            $("#fnDlg_ok").click(function () { 
                  if($("#fnDlg_numberOfPoints").val()>200 || $("#fnDlg_numberOfPoints").val()<2){
                    $("#fnDlg_numberOfPoints").val(60)
                    Static.alert("\"Number of points\" cannot be \nless than 2 or greater than 200")
                  }else{
                        var uniqChars = uniqueChars($("#fnDlg_function").val())
                        if(uniqChars.indexOf($("#fnDlg_variable").val())==-1){
                          Static.alert("Please enter a valid variable.")
                          $("#cont_variable").show()
                          return
                        }

                        self.title = $("#fnDlg_title").val()
                        self.variable = $("#fnDlg_variable").val() 
                        self.fn = insertProductSign($("#fnDlg_function").val()) 
                        self.lowerLimit = $("#fnDlg_lowerLimit").val() 
                        self.upperLimit = $("#fnDlg_upperLimit").val()
                        self.numOfPoints = $("#fnDlg_numberOfPoints").val()
                        self.unboundedRange = $("#fnDlg_unboundedRange")[0].checked
                        
    			              self.coeffs = getCoeffs()

                        cb()     
                  }                  
    			    });
            
            /*$("#fnDlg_function").on("input",function(){
                  var fn = $(this).val()
                  if(uniqueChars(fn).length > 1){
                    $("#cont_variable").show()
                  }else if(fn.indexOf($("#fnDlg_variable").val())!=-1){
                    $("#cont_variable").hide()
                  }
            })*/
            
            $("#fnDlg_function").on("input",function(){
                  var fn = $(this).val()
                  if(uniqueChars(fn).length > 1 ||
                    fn.indexOf($("#fnDlg_variable").val())==-1){
                    $("#cont_variable").show()
                  }else{
                    $("#cont_variable").hide()
                  }
            })

            /*$("#fnDlg_variable").on("change",function(){
                  var fn = $("#fnDlg_function").val()
                  if(fn.indexOf($(this).val())!=-1){                    
                    $("#cont_variable").hide()
                  }
            })*/

    		},

    		functionDlg: function(){
    			$("#functionModal").modal({backdrop: "static"});
    		},

        close: function(){
          $(".close").click();
        }//,

        /*isSidebar: function(){
           return sideBarVisible
        },

        setTitle: function(title){
           $("#sideBarTitle").val(title)
        },*/

        /*getCoeffs: function(){
          return doGetCoeffs()
        }*/

	}
});

define('curveFitDlg',['static'],function(){
var m_dlg1 = 
$('\
<div class="modal fade" id="curveFitModal" role="dialog">\
    <div class="modal-dialog modal-sm">\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4 class="modal-title">Curve Fitter</h4>\
        </div>\
        <div class="modal-body">\
	  <div class="row">\
          	<div class="col-sm-5">Fitter type:</div>\
             <div class="col-sm-7">\
               <select id="curveFitDlg_type">\
  <option value="natural">Natural spline</option>\
  <option value="periodic">Periodic spline</option>\
      <option value="weeding">Weeding</option>\
  <option value="linear">Linear</option>\
  <option value="polynomial">Polynomial</option>\
  </select>\
		  </div>\
          </div>\
	  <br>\
\
\
<div id="cont_origin">\
<div class="row">\
<div class="col-sm-7">Through origin:</div>\
<div class="col-sm-2"><input id="origin" type="checkbox"/></div>\
</div>\
<br>\
</div>\
\
<div id="cont_order">\
<div class="row">\
<div class="col-sm-5">Order:</div>\
<div class="col-sm-3"><input id="order" type="number" style="width:100%" value="2" min="1" max="20"/></div>\
</div>\
<br>\
</div>\
\
<div class="row">\
            <div class="col-sm-7">Retain original curve:</div>\
                <div class="col-sm-2"><input id="curveFitDlg_retain" type="checkbox"/></div>\
          </div>\
          <br>\
       \
       \
	<div id="attributes">\
	  <div class="row">\
          	<div class="col-sm-6">Fitted curve name:</div>\
                <div class="col-sm-6"><input id="curveFitDlg_name" type="text" style="width:100%"/></div>\
          </div>\
	  <br>\
		<div class="row">\
          	<div class="col-sm-6">Fitted curve color:</div>\
                <div class="col-sm-2"><input id="curveFitDlg_color" type="color"/></div>\
          </div>\
          <br>\
     </div>\
     </div>\
        <div class="modal-footer">\
          <button id="curveFitDlg_ok" type="button" class="btn btn-default" >Ok</button>\
        </div>\
      </div>\
    </div>\
  </div>\
</div>\
')
$("body").append(m_dlg1);  
$("#cont_origin").hide() 
$("#cont_order").hide()  

$("#curveFitDlg_type").change(function(){
    //console.log($(this).val()) 
	if($(this).val()=="linear"){
		$("#cont_origin").show() 
	}else{
		$("#cont_origin").hide() 
	}
     if($(this).val()=="polynomial"){
		$("#cont_order").show() 
	}else{
		$("#cont_order").hide() 
	}    
                
})  
$("#attributes").hide() 
$("#curveFitDlg_retain")[0].checked=false   

$("#curveFitDlg_retain").change(function(){
                if(!$(this)[0].checked) {               
                     $("#attributes").hide()                     
                }else{
                     $("#attributes").show()                 
                     
                }
            })                                                     
  var obj2 = null;
	return obj2 = {
        //Called by LegendMenu
        curveFitCb: function(curve){
             //console.log(curve) 
             
             obj2.curveFitDlgInit
             if(obj2.curveFitDlgInit==undefined){
                //buildDlg()
                obj2.init()
                obj2.curveFitDlgInit = true
             }

             obj2.plot = curve.plot()            
             obj2.curve = curve
             //console.log(obj2)
             obj2.curveFitDlg() 
             return obj2                        
        },

        cb: function(){ //called by CurveFitDlg   
                if(obj2.retain){
                    var title = obj2.name
                    if (obj2.plot.findPlotCurve( title)) {
                        Static.alert(title + " already exist")
                        return //false;
                    }                
                }

                var curve = new Curve();
                curve.setPen(new Misc.Pen(obj2.color))

                curve.fitType = obj2.type 
                curve.origin = obj2.origin

                if(obj2.type == "natural" || 
                           obj2.type == "periodic"){
                    curve.setData(obj2.curve.data())
                    var f = new SplineCurveFitter()
                        var s = f.spline()
                    if(obj2.type == "periodic"){
                        s.setSplineType(Static.SplineType.Periodic )
                        //curve.fitType = "periodic spline"
                    }else{
                            s.setSplineType(Static.SplineType.Natural )
                            //curve.fitType = "natural spline"
                    }
                    curve.setCurveFitter(f)
                }

                else if(obj2.type == "weeding"){
                    return
                }


            else {   
                var regr = regress(obj2.curve, obj2.type, parseInt(obj2.order),
                    obj2.origin)     
                //var regr = regress()//CurveFitDlg.curve, parseInt(CurveFitDlg.type))
                var rc = obj2.curve.data().boundingRect()
                var fn = regr.string
                while(fn.indexOf('+ -')!=-1){
                    fn = fn.replace('+ -', '- ')
                }
                //fn = fn.replace('-+', '-')
                curve.equation = fn
                //console.log(CurveFitDlg.curve.data().boundingRect().left())       
                fn = fn.replace('y =', '')
                //fn = fn.replace('=', '')
                curve.setSamples(makeSamples({fx:fn, 
                lowerX:rc.left(), 
                upperX:rc.right(),
                numOfSamples: 60}))     
            }    
            
            if(obj2.retain){
                curve.setTitle(title)               
            }else{   
                curve.setTitle(obj2.curve.title())
                obj2.curve.detach()
            }
            curve.fitType = obj2.type    
            curve.attach(obj2.plot)
            obj2.close()
        },

        init: function(){ 
            var self = this		

            $("#curveFitDlg_ok").click(function () {
			 self.type = $("#curveFitDlg_type").val() 
                 self.retain = $("#curveFitDlg_retain")[0].checked
                 self.name = $("#curveFitDlg_name").val()
                 self.color = $("#curveFitDlg_color").val()
			 self.order = $("#order").val() || 1
			 self.origin = $("#origin")[0].checked

                 self.cb()                                
    		  });

    		},

    		curveFitDlg: function(){
            var self = this
            $("#curveFitDlg_name").
					   val(self.curve.title()+"_fit")
			      $("#curveFitDlg_color").
					  val(Static.colorNameToHex (self.curve.pen().color))                 
    			  $("#curveFitModal").modal({backdrop: "static"});
    		},

        curveFitInfoCb: function(curve){
            var info = ""
            if(curve.fitType == "natural"){
                info += "Fit type:Natural Spline"
            }
            if(curve.fitType == "periodic"){
                info += "Fit type:Periodic Spline"
            }
            if(curve.fitType == "polynomial"){
                info += "Fit type:Polynomial"
                info += "; Equation:"+curve.equation
            }
            if(curve.fitType == "linear"){
                if(curve.origin){
                    info += "Fit type:Linear Through Origin"
                }else{
                    info += "Fit type:Linear"
                }
                info += "; Equation:"+curve.equation
            }   
            return info
        },

        close: function(){
          $(".close").click();
        }
	}
});

define('axisDlg',['static'],function(){
var m_dlg1 = null
function buildDlg(){
m_dlg1 = 
$('\
<div class="modal fade" id="axisModal" role="dialog">\
    <div class="modal-dialog modal-sm">\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4 class="modal-title">Curve Axis</h4>\
        </div>\
        <div class="modal-body">\
	  <div class="row">\
          	<div class="col-sm-5">Horizontal:</div>\
             <div class="col-sm-7">\
               <select id="axisHorizontal">\
  <option value="bottomAxis">Bottom axis</option>\
  <option value="topAxis">Top axis</option>\
  </select>\
		  </div>\
          </div>\
	  <br>\
    <div class="row">\
            <div class="col-sm-5">Vertical:</div>\
             <div class="col-sm-7">\
               <select id="axisVertical">\
  <option value="leftAxis">Left axis</option>\
  <option value="rightAxis">Right axis</option>\
  </select>\
      </div>\
          </div>\
    <br>\
\
\
\
\
\
       \
               <div class="modal-footer">\
          <button id="axisDlg_ok" type="button" class="btn btn-default"  data-dismiss="modal">Ok</button>\
        </div>\
      </div>\
    </div>\
  </div>\
</div>\
')
$("body").append(m_dlg1); 
} 
 
         
  var obj = null;

	return obj = {

        axisCb: function(curve){
            obj.axisDlgInit
            if(obj.axisDlgInit==undefined){
                buildDlg()
                obj.init()
                obj.axisDlgInit = true
            }
            obj.curve = curve
            obj.axisDlg()
                
        },

        init: function(){ 
          var self = this 

          $("#axisHorizontal").change(function(){    
              if($(this).val()=="bottomAxis"){
                self.curve.setXAxis(xBottom)
                Static.trigger("axisChanged", xBottom)
              }else{
                self.curve.setXAxis(xTop)
                Static.trigger("axisChanged", xTop)
              }

          }) 

          $("#axisVertical").change(function(){    
              if($(this).val()=="leftAxis"){
                self.curve.setYAxis(yLeft)
                Static.trigger("axisChanged", yLeft)
              }else{
                self.curve.setYAxis(yRight)
                Static.trigger("axisChanged", yRight)
              }

          }) 

    		},

    		axisDlg: function(){
                var self = this
          if(self.curve.xAxis()==xBottom){
            //console.log("xBottom") 
            $("#axisHorizontal").val("bottomAxis")
          }else{
            //console.log("xTop")
            $("#axisHorizontal").val("topAxis")
          }
          if(self.curve.yAxis()==yLeft){
            //console.log("yLeft")
            $("#axisVertical").val("leftAxis") 
          }else{
            //console.log("yRight")
            $("#axisVertical").val("rightAxis")
          }
					//console.log(self.curve.xAxis())
			    $("#axisModal").modal({backdrop: "static"});
    		}/*,

        close: function(){
          $(".close").click();
        }*/
	}
});

/*!
   Constructor

   \param size Number of points
   \param interval Bounding interval for the points

   \sa setInterval(), setSize()
*/

/////////////////SyntheticPointData - subclass of SeriesData//////////start
SyntheticPointData.inheritsFrom( SeriesData );
//Define the SyntheticPointData constructor
function SyntheticPointData(size, interval) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    SeriesData.call(this);
    var d_size =  size
    var d_interval = interval || new Interval()
    //console.log(d_interval)
    var d_rectOfInterest;
    var d_intervalOfInterest = new Interval(0.0, 10.0); //???

    this.setSize = function( size ){
        d_size = size;
    }

    this.size = function(){
        return d_size;
    }

    /*!
    Set the bounding interval

    \param interval Interval
    \sa interval(), setSize()
    */
    this.setInterval = function( interval ){
        d_interval = interval.normalized();
    }

    /*!
    \return Bounding interval
    \sa setInterval(), size()
    */
    this.interval = function(){
        return d_interval;
    }

    /*!
     Set a the "rectangle of interest"

     QwtPlotSeriesItem defines the current area of the plot canvas
     as "rect of interest" ( QwtPlotSeriesItem::updateScaleDiv() ).

     If interval().isValid() == false the x values are calculated
     in the interval rect.left() -> rect.right().

     \sa rectOfInterest()
    */
    this.setRectOfInterest = function( rect ){
          d_rectOfInterest = rect;
          d_intervalOfInterest = new Interval(rect.left(), rect.right() ).normalized();
    }

    /*!
    \return "rectangle of interest"
    \sa setRectOfInterest()
   */
    this.rectOfInterest = function(){
         return d_rectOfInterest;
    }

    /*!
    \brief Calculate the bounding rectangle

    This implementation iterates over all points, what could often
    be implemented much faster using the characteristics of the series.
    When there are many points it is recommended to overload and
    reimplement this method using the characteristics of the series
    ( if possible ).

    \return Bounding rectangle
   */
    this.boundingRect = function(){
        if ( d_size == 0 || !( d_interval.isValid() || d_intervalOfInterest.isValid() ) ){
           return new Misc.Rect( 1.0, 1.0, -2.0, -2.0 ); // something invalid
        }

        return Static.mBoundingRect( this );
    }

    this.y = function( _x ){
            throw "subclass must implement \"this.y\"";
        }

    /*!
    Calculate the point from an index

    \param index Index
    \return QPointF(x(index), y(x(index)));

    \warning For invalid indices ( index < 0 || index >= size() )
            (0, 0) is returned.
    */
    this.sample = function(index ){
        if ( index >= d_size )
            return new Misc.Point( 0, 0 );

        var xValue = this.x( index );
        var yValue = this.y( xValue );
        //console.log(this.y)

        return new Misc.Point( xValue, yValue );
    }

    /*!
     Calculate a x-value from an index

     x values are calculated by dividing an interval into
     equidistant steps. If !interval().isValid() the
     interval is calculated from the "rectangle of interest".

     \param index Index of the requested point 
     \return Calculated x coordinate

     \sa interval(), rectOfInterest(), y()
    */
    this.x = function(index ){
       var interval = d_interval.isValid() ? d_interval : d_intervalOfInterest;

       if ( !interval.isValid() || d_size == 0 || index >= d_size )
           return 0.0;

       var dx = interval.width() / d_size;
       return interval.minValue() + index * dx;
    }



}

/////////////////////////////////////////////////////////end




;
define("jQwtPointData", ["static","seriesData"], function(){});


function GraphicUtil(){
    var svgNS = "http://www.w3.org/2000/svg"; 
    GraphicUtil.Graphic = function(e, w, h){
        var m_parent = e;
        var m_width = w;
        var m_height = h;
        
        var m_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        m_svg.setAttribute('width',w)
        m_svg.setAttribute('height',h)
        if(this.parent)
            this.parent[0].appendChild(m_svg);
    
        this.setParent = function(p){
            this.parent = p;
            this.parent[0].appendChild(m_svg);
        }
        
        this.parent = function(){
            return m_parent;            
        } 
        
        this.setWidth = function(w){
            m_width = w;            
        }
        
        this.width = function(){
            return m_width;            
        }
        
        this.setHeight = function(h){
            m_height = h;            
        }
        
        this.height = function(){
            return m_height;            
        }
        
        this.svg = function(){
            return m_svg
        }
    
        this.toString = function () {
            return '[Graphic]';
        }
    }
}

GraphicUtil();
define("jGraphic", function(){});


/*function mDrawEllipseSymbols(ctx, points, symbol )
{
    var numPoints = points.length;

    var size = symbol.size();
    var pen = symbol.pen();
    var brush = symbol.brush();




//    if ( QwtPainter::roundingAlignment( painter ) )
//    {
//        const int sw = size.width();
//        const int sh = size.height();
//        const int sw2 = size.width() / 2;
//        const int sh2 = size.height() / 2;

//        for ( int i = 0; i < numPoints; i++ )
//        {
//            const int x = qRound( points[i].x() );
//            const int y = qRound( points[i].y() );

//            const QRectF r( x - sw2, y - sh2, sw, sh );
//            QwtPainter::drawEllipse( painter, r );
//        }
//    }
    //else
    {
        var sw = size.width;
        var sh = size.height;
        var r = 0.5 * size.width;
        //var sh2 = 0.5 * size.height;
        var scaleX = 1;
        var scaleY = 1;

        if(sw > sh){
            scaleX = sw/sh;
            r = sh/2;
        }
        else if(sh > sw){
            scaleY = sh/sw;
            r = sw/2;
        }


        //ctx.save();

        ctx.beginPath();
        ctx.scale(scaleX,scaleY);
        ctx.strokeStyle = pen.color;
        ctx.lineWidth = pen.width;
        if(brush !== "NoBrush")
            ctx.fillStyle = brush;
        for ( var i = 0; i < numPoints; i++ )
        {
            var x = points[i].x/scaleX - pen.width*0.5;
            var y = points[i].y/scaleY - pen.width*0.5;
            ctx.moveTo(x, y);
            ctx.arc(x, y, r, 0, 2 * Math.PI, false);

            //const QRectF r( x - sw2, y - sh2, sw, sh );
            //QwtPainter::drawEllipse( painter, r );
        }
        ctx.stroke();
        //ctx.restore();

        if(brush !== "NoBrush")
            ctx.fill();


        //ctx.arc(pt.x, pt.y, 4, 0, 2 * Math.PI);

    }
}
*/
function mDrawXCrossSymbols(ctx, points, symbol )
{
    var size = symbol.size();
    var pen = symbol.pen();
    var brush = symbol.brush();
    var sw = size.width;
    var sh = size.height;
    ctx.beginPath();
    ctx.strokeStyle = pen.color;
    ctx.lineWidth = pen.width;

    for ( var i = 0; i < points.length; i++ )
    {
        var x = points[i].x - 0.5*sw - 1//pen.width*0.5;
        var y = points[i].y - 0.5*sh - 1//pen.width*0.5;

        ctx.moveTo(x, y);
        ctx.lineTo(x+sw, y+sh);
        ctx.moveTo(x+sw, y);
        ctx.lineTo(x, y+sh);

    }
    ctx.stroke();
}

function mDrawLineSymbols(ctx, orientations,points, symbol )
{
    var size = symbol.size();
    var pen = symbol.pen();
    var brush = symbol.brush();
    var sw = size.width;
    var sh = size.height;
    var painter = new PaintUtil.Painter(ctx);
    painter.setPen(pen);

    painter.save();

    for ( var i = 0; i < points.length; i++ )
    {
        if ( orientations & Horizontal )
        {

            var x = points[i].x - 0.5*sw -1//- pen.width*0.5;
            var y = points[i].y -1//- pen.width*0.5;
            painter.drawLine(x, y, x+sw, y);

        }
        if ( orientations & Vertical )
        {
            var x = points[i].x -1//- pen.width*0.5;
            var y = points[i].y - 0.5*sh -1//- pen.width*0.5;

            painter.drawLine(x, y, x, y+sh);
         }
    }
    painter.restore();
    painter = null

}


function mDrawPathSymbols(ctx, points, symbol )
{
    var numPoints = points.length;
    var size = symbol.size();
    var pen = symbol.pen();
    var brush = symbol.brush();
    var sw = size.width;
    var sh = size.height;
    var painter = new PaintUtil.Painter(ctx);
    painter.setPen(pen);
    painter.setBrush(brush)

    for ( var i = 0; i < numPoints; i++ )
    {               
        var x = points[i].x
        var y = points[i].y 
        var bRc = symbol.m_path.boundingRect()        
        painter.save()
        painter.translate(x, y) 
        painter.scale(sw/bRc.width(), sh/bRc.height())       
        if(symbol.m_path.data.rotation){
            painter.rotate(symbol.m_path.data.rotation)
        }
        var pinpoint = symbol.pinPoint()
        //console.log(sw/bRc.width())
        painter.translate(-1*pinpoint.x, -1*pinpoint.y)
        //painter.scale(sw/bRc.width(), sh/bRc.height())
        painter.drawPath(symbol.m_path)
        painter.restore()

    }
    painter = null
}


function mDrawDiamondSymbols(ctx, points, symbol )
{
    var painter = new PaintUtil.Painter(ctx);
    painter.save()
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );
    var sz = symbol.size()
    var rc = new Misc.Rect(new Misc.Point, symbol.size())
    var numPoints = points.length;

        for ( var i = 0; i < numPoints; i++ )
        {
	    painter.save()
            painter.translate(points[i].x-1, points[i].y-1)
            painter.rotate(45)
            painter.drawRect(-0.5*sz.width, -0.5*sz.height, sz.width, sz.height);
            painter.restore()
        }
    painter.restore()
    painter = null

}



function mDrawRectSymbols(ctx, points, symbol )
{
    var painter = new PaintUtil.Painter(ctx);
    painter.save()
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );
    var rc = new Misc.Rect(new Misc.Point, symbol.size())
    var numPoints = points.length;

        for ( var i = 0; i < numPoints; i++ )
        {
            rc.moveCenter(points[i]);
            //painter.drawRect(rc.left()-0.5*symbol.pen().width, rc.top()-0.5*symbol.pen().width, rc.width(), rc.height());
	    painter.drawRect(rc.left(), rc.top(), rc.width(), rc.height());
        }
    painter.restore()
    painter = null

}

function mDrawEllipseSymbols(ctx, points, symbol )
{
    var painter = new PaintUtil.Painter(ctx);
    painter.save()
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );
    var radius = Math.min(symbol.size().width, symbol.size().height)/2
    var numPoints = points.length;

        for ( var i = 0; i < numPoints; i++ )
        {
            //painter.drawCircle(points[i].x-0.5*symbol.pen().width, points[i].y-0.5*symbol.pen().width, radius);
	    painter.drawCircle(points[i].x-1, points[i].y-1, radius);
            
        }
    painter.restore()
    painter = null

}

function mDrawCrossGraphicSymbol(painter, point, size, symbol )
{    
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );
    var rc = new Misc.Rect(new Misc.Point, symbol.size())
    rc.moveCenter(point);
    painter.drawLine(rc.left()+0.5*rc.width(), rc.top(), rc.left()+0.5*rc.width(), rc.bottom());
    painter.drawLine(rc.left(), rc.top()+0.5*rc.height(), rc.right(), rc.top()+0.5*rc.height());

}

function mDrawXCrossGraphicSymbol(painter, point, size, symbol )
{    
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );
    var rc = new Misc.Rect(new Misc.Point, symbol.size())
    rc.moveCenter(point);
    painter.drawLine(rc.left(), rc.top(), rc.right(), rc.bottom());
    painter.drawLine(rc.right(), rc.top(), rc.left(), rc.bottom());

}


function mDrawRectGraphicSymbol(painter, point, size, symbol )
{ 
    //console.log(symbol.brush().color)   
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );
    var rc = new Misc.Rect(new Misc.Point, symbol.size())
    rc.moveCenter(point);
    painter.drawRect(rc.left(), rc.top(), rc.width(), rc.height());

}

function mDrawDiamondGraphicSymbol(painter, point, size, symbol )
{    
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );
    var rc = new Misc.Rect(new Misc.Point, 
              symbol.size().width*0.707, symbol.size().height*0.707)
    rc.moveCenter(point);
    painter.drawRect(rc.left(), rc.top(), rc.width(), rc.height());
    painter.transform({rotation:45, rotationX:point.x, rotationY:point.y})    
}

function mDrawEllipseGraphicSymbol(painter, point, size, symbol )
{    
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );
    var radius = Math.min(symbol.size().width, symbol.size().height)/2
    painter.drawCircle(point.x, point.y, radius)
    
}


function mDrawPathGraphicSymbol(painter, point, iconSize, symbol )
{
    var pen = symbol.pen()
    var pw = 0.0;
    if ( pen.style !== Static.NoPen )
        pw = Math.max( pen.width, 1.0 );
    var rc = symbol.path().boundingRect();
    rc = rc.adjusted(-pw, -pw, pw, pw)
    var data = symbol.path().data   
    data.xOffset = -1*rc.left()
    data.yOffset = -1*rc.top()
    data.xCenter = (rc.right() - rc.left())/2
    data.yCenter = (rc.bottom() - rc.top())/2     
    painter.setBrush( symbol.brush() );
    painter.setPen( symbol.pen() );    
    
    data.scale = Math.min(iconSize.width/rc.width(),
        iconSize.height/rc.height())    
    
    //symbol.path().data = data
    painter.drawPath(symbol.path());

}



////////////////////Symbol////////////////////start
/*!
  Default Constructor
  \param style Symbol Style

  The symbol is constructed with gray interior,
  black outline with zero width, no size and style 'NoSymbol'.
*/
const Symbol = function( style, brush, pen, size ){
    var m_style =  NoSymbol;
    var m_size = new Misc.Size(-1, -1);//{width:-1, height: -1};//invalid size
    var m_brush =  new Misc.Brush("gray");
    var m_pen =  new Misc.Pen;//{color:"black", width:1, style:"solid"};
    var m_isPinPointEnabled =  false;
    this.m_path = 0

    var m_pinpoint = new Misc.Point(0,0)

    if(typeof(size)!=="undefined"){
        m_style = style;
        m_brush = brush;
        m_pen = pen;
        m_size = size;
    }
    else if(typeof(pen)!=="undefined"){
        m_style = style;
        m_brush = brush;
        m_pen = pen;
    }
    else if(typeof(brush)!=="undefined"){
        m_style = style;
        m_brush = brush;
    }
    else if(typeof(style)!=="undefined"){
        m_style = style;
    }

    this.setPinPoint = function(pt )
    {
        m_pinpoint = pt;            
    }

    this.pinPoint = function(pt )
    {
        return m_pinpoint;            
    }

    /*!
       Set the symbol's size
       \param size Size

       \sa size()
    */
    this.setSize = function(size )
    {
        if ( size.isValid() && !size.isEqual(m_size) )
        {
            m_size = size;
            //invalidateCache();
        }
    }

    /*!
       \return Size
       \sa setSize()
    */
    this.size = function()
    {
        return m_size;
    }

    /*!
      Specify the symbol style

      \param style Style
      \sa style()
    */
    this.setStyle = function( style )
    {
        if ( m_style != style )
        {
            m_style = style;
            //invalidateCache();
        }
    }

    /*!
      \return Current symbol style
      \sa setStyle()
    */
    this.style = function()
    {
        return m_style;
    }

    /*!
      \brief Set a painter path as symbol

      The symbol is represented by a painter path, where the 
      origin ( 0, 0 ) of the path coordinate system is mapped to
      the position of the symbol.

      When the symbol has valid size the painter path gets scaled
      to fit into the size. Otherwise the symbol size depends on
      the bounding rectangle of the path.

      \note The style is implicitely set to QwtSymbol::Path.
      \sa path(), setSize()
     */
    this.setPath = function( path ){
        m_style = Path;
        // d_data->path.path = path;
        // d_data->path.graphic.reset();
        this.m_path = path;
    }

    /*!
       \return Painter path for displaying the symbol
       \sa setPath()
    */
    this.path = function(){
        return this.m_path;
    }


    this.setPen = function( pen )
    {
        //if ( brush != m_brush )
        {
            m_pen = pen;

        }
    }
    this.pen = function()
    {
        return m_pen;
    }

    /*!
      \brief Assign a brush

      The brush is used to draw the interior of the symbol.
      \param brush Brush

      \sa brush()
    */
    this.setBrush = function( brush )
    {
       // if ( brush != m_brush )
        {
            m_brush = brush;
            //invalidateCache();

            if ( m_style == Path )
                ;//d_data->path.graphic.reset();
        }
    }

    /*!
      \return Brush
      \sa setBrush()
    */
    this.brush = function()
    {
        return m_brush;
    }

    /*!
      Render an array of symbols

      Painting several symbols is more effective than drawing symbols
      one by one, as a couple of layout calculations and setting of pen/brush
      can be done once for the complete array.

      \param painter Painter
      \param points Array of points
      \param numPoints Number of points
    */
    this.drawSymbols = function(ctx, points )
    {
        if ( points.length <= 0 )
            return;

        var useCache = false;

        //alert("drawSymbols: here")

        // Don't use the pixmap, when the paint device
        // could generate scalable vectors

//        if ( QwtPainter::roundingAlignment( painter ) &&  !painter->transform().isScaling() )
//        {
//            if ( d_data->cache.policy == QwtSymbol::Cache )
//            {
//                useCache = true;
//            }
//            else if ( d_data->cache.policy == QwtSymbol::AutoCache )
//            {
//                if ( painter->paintEngine()->type() == QPaintEngine::Raster )
//                {
//                    useCache = true;
//                }
//                else
//                {
//                    switch( d_data->style )
//                    {
//                        case QwtSymbol::XCross:
//                        case QwtSymbol::HLine:
//                        case QwtSymbol::VLine:
//                        case QwtSymbol::Cross:
//                            break;

//                        case QwtSymbol::Pixmap:
//                        {
//                            if ( !d_data->size.isEmpty() &&
//                                d_data->size != d_data->pixmap.pixmap.size() )
//                            {
//                                useCache = true;
//                            }
//                            break;
//                        }
//                        default:
//                            useCache = true;
//                    }
//                }
//            }
//        }

        if ( useCache )
        {
            //var br = this.boundingRect();/////////////////////

            //var rect = {left:0, top:0, width:br.width(), height:br.height() };

//            if ( d_data->cache.pixmap.isNull() )
//            {
//                d_data->cache.pixmap = QwtPainter::backingStore( NULL, br.size() );
//                d_data->cache.pixmap.fill( Qt::transparent );

//                QPainter p( &d_data->cache.pixmap );
//                p.setRenderHints( painter->renderHints() );
//                p.translate( -br.top()Left() );

//                const QPointF pos;
//                renderSymbols( &p, &pos, 1 );
//            }

            var dx = br.left();
            var dy = br.top();

            for ( var i = 0; i < numPoints; i++ )
            {
                var left = Math.round( points[i].x ) + dx;
                var top = Math.round( points[i].y ) + dy;

                //painter->drawPixmap( left, top, d_data->cache.pixmap );
            }
        }
        else
        {
            //painter->save();

            this.renderSymbols(ctx, points );
            //painter->restore();
        }
    }

    this.drawGraphicSymbol = function(painter, pos, size )
    {
       this.renderGraphicSymbol(painter, pos, size )
    }

    this.drawSymbol = function(ctx, pos )
    {
       this.drawSymbols( ctx, [pos] );
    }

    /*!
      Render the symbol to series of points

      \param painter Qt painter
      \param points Positions of the symbols
      \param numPoints Number of points
     */
    this.renderSymbols = function(ctx, points )
    {
        var numPoints = points.length;

        switch ( m_style )
        {
            case Ellipse:
            {

                mDrawEllipseSymbols(ctx, points, this );
                break;
            }
            case MRect:
            {
                mDrawRectSymbols(ctx, points, this );
                break;
            }
            case Diamond:
            {
                mDrawDiamondSymbols(ctx, points, this );
                break;
            }
            case Cross:
            {
                mDrawLineSymbols(ctx, Horizontal|Vertical, points, this );
                break;
            }
            case XCross:
            {
                mDrawXCrossSymbols(ctx, points, this );
                break;
            }
//            case QwtSymbol::Triangle:
//            case QwtSymbol::UTriangle:
//            {
//                qwtDrawTriangleSymbols( painter, QwtTriangle::Up,
//                    points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::DTriangle:
//            {
//                qwtDrawTriangleSymbols( painter, QwtTriangle::Down,
//                    points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::RTriangle:
//            {
//                qwtDrawTriangleSymbols( painter, QwtTriangle::Right,
//                    points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::LTriangle:
//            {
//                qwtDrawTriangleSymbols( painter, QwtTriangle::Left,
//                    points, numPoints, *this );
//                break;
//            }
            case HLine:
            {
                mDrawLineSymbols( ctx, Horizontal, points, this );
                break;
            }
            case VLine:
            {
                mDrawLineSymbols( ctx, Vertical, points, this );
                break;
            }
//            case QwtSymbol::Star1:
//            {
//                qwtDrawStar1Symbols( painter, points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::Star2:
//            {
//                qwtDrawStar2Symbols( painter, points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::Hexagon:
//            {
//                qwtDrawHexagonSymbols( painter, points, numPoints, *this );
//                break;
//            }
           case Path:
           {
               // if ( d_data->path.graphic.isNull() )
               // {
               //     d_data->path.graphic = qwtPathGraphic( d_data->path.path,
               //         d_data->pen, d_data->brush );
               // }

               // qwtDrawGraphicSymbols( painter, points, numPoints,
               //     d_data->path.graphic, *this );
               mDrawPathSymbols( ctx, points, this );
               break;
           }
//            case QwtSymbol::Pixmap:
//            {
//                qwtDrawPixmapSymbols( painter, points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::Graphic:
//            {
//                qwtDrawGraphicSymbols( painter, points, numPoints,
//                    d_data->graphic.graphic, *this );
//                break;
//            }
//            case QwtSymbol::SvgDocument:
//            {
//    #ifndef QWT_NO_SVG
//                qwtDrawSvgSymbols( painter, points, numPoints,
//                    d_data->svg.renderer, *this );
//    #endif
//                break;
//            }
            default:;
        }
    }


    this.renderGraphicSymbol = function(painter, point, size )
    {

        switch ( m_style )
        {
            case Ellipse:
            {

               // mDrawEllipseSymbols(ctx, points, this );
               mDrawEllipseGraphicSymbol(painter, point, 0, this );
                break;
            }
            case MRect:
            {
                mDrawRectGraphicSymbol(painter, point, 0, this );
                break;
            }
            case Diamond:
            {
                //mDrawDiamondSymbols(ctx, points, this );
                mDrawDiamondGraphicSymbol(painter, point, 0, this );
                break;
            }
            case Cross:
            {
                //mDrawLineSymbols(ctx, Horizontal|Vertical, points, this );
                mDrawCrossGraphicSymbol(painter, point, 0, this );
                break;
            }
            case XCross:
            {
                //mDrawXCrossSymbols(ctx, points, this );
                mDrawXCrossGraphicSymbol(painter, point, 0, this );
                break;
            }
//            case QwtSymbol::Triangle:
//            case QwtSymbol::UTriangle:
//            {
//                qwtDrawTriangleSymbols( painter, QwtTriangle::Up,
//                    points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::DTriangle:
//            {
//                qwtDrawTriangleSymbols( painter, QwtTriangle::Down,
//                    points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::RTriangle:
//            {
//                qwtDrawTriangleSymbols( painter, QwtTriangle::Right,
//                    points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::LTriangle:
//            {
//                qwtDrawTriangleSymbols( painter, QwtTriangle::Left,
//                    points, numPoints, *this );
//                break;
//            }
            case HLine:
            {
                //mDrawLineSymbols( ctx, Horizontal, points, this );
                break;
            }
            case VLine:
            {
                //mDrawLineSymbols( ctx, Vertical, points, this );
                break;
            }
//            case QwtSymbol::Star1:
//            {
//                qwtDrawStar1Symbols( painter, points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::Star2:
//            {
//                qwtDrawStar2Symbols( painter, points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::Hexagon:
//            {
//                qwtDrawHexagonSymbols( painter, points, numPoints, *this );
//                break;
//            }
           case Path:
           {
                //console.log(44)
               /*if ( d_data->path.graphic.isNull() )
               {
                   d_data->path.graphic = qwtPathGraphic( d_data->path.path,
                       d_data->pen, d_data->brush );
               }

               qwtDrawGraphicSymbols( painter, points, numPoints,
                   d_data->path.graphic, *this );*/
                //mDrawRectGraphicSymbol(painter, point, size, this );
                mDrawPathGraphicSymbol(painter, point, size, this );
               break;
           }
//            case QwtSymbol::Pixmap:
//            {
//                qwtDrawPixmapSymbols( painter, points, numPoints, *this );
//                break;
//            }
//            case QwtSymbol::Graphic:
//            {
//                qwtDrawGraphicSymbols( painter, points, numPoints,
//                    d_data->graphic.graphic, *this );
//                break;
//            }
//            case QwtSymbol::SvgDocument:
//            {
//    #ifndef QWT_NO_SVG
//                qwtDrawSvgSymbols( painter, points, numPoints,
//                    d_data->svg.renderer, *this );
//    #endif
//                break;
//            }
            default:;
        }
    }

    /*!
      Calculate the bounding rectangle for a symbol
      at position (0,0).

      \return Bounding rectangle
     */
    this.boundingRect = function()
    {
        var rect = new Misc.Rect();

        switch ( m_style )
        {
            case Ellipse:
            case MRect:
            case Hexagon:
            {
                var pw = 0.0;
                if ( m_pen.style != Static.NoPen )
                    pw = Math.max( m_pen.width,  1.0 );

                rect = new Misc.Rect(new Misc.Point(), m_size.width + pw, m_size.height + pw );
                rect.moveCenter( new Misc.Point() );

                break;
            }
            case XCross:
            case Diamond:
            case Triangle:
            case UTriangle:
            case DTriangle:
            case RTriangle:
            case LTriangle:
            case Star1:
            case Star2:
            {

                var pw = 0.0;
                if ( m_pen.style !== Static.NoPen )
                    pw = Math.max( m_pen.width, 1.0 );



                rect = new Misc.Rect(new Misc.Point(), m_size.width + 2*pw, m_size.height + 2*pw );
                rect.moveCenter( new Misc.Point() );
                break;
            }
           case Path:
           {

               
                rect = m_path.boundingRect()
                console.log(rect.width())
                rect.moveCenter( new Misc.Point() );

               break;
           }
//            case QwtSymbol::Pixmap:
//            {
//                if ( d_data->size.isEmpty() )
//                    rect.setSize( d_data->pixmap.pixmap.size() );
//                else
//                    rect.setSize( d_data->size );

//                rect.moveCenter( QPointF( 0.0, 0.0 ) );

//                // pinpoint ???
//                break;
//            }
//            case QwtSymbol::Graphic:
//            {
//                rect = qwtScaledBoundingRect(
//                    d_data->graphic.graphic, d_data->size );

//                break;
//            }
//    #ifndef QWT_NO_SVG
//            case QwtSymbol::SvgDocument:
//            {
//                if ( d_data->svg.renderer )
//                    rect = d_data->svg.renderer->viewBoxF();

//                if ( d_data->size.isValid() && !rect.isEmpty() )
//                {
//                    QSizeF sz = rect.size();

//                    const double sx = d_data->size.width() / sz.width();
//                    const double sy = d_data->size.height() / sz.height();

//                    QTransform transform;
//                    transform.scale( sx, sy );

//                    rect = transform.mapRect( rect );
//                }
//                break;
//            }
//    #endif
            default:
            {
                rect = new Misc.Rect(new Misc.Point(), m_size.width, m_size.height );
                rect.moveCenter(new Misc.Point() );
            }
        }

//        if ( d_data->style == QwtSymbol::Graphic ||
//            d_data->style == QwtSymbol::SvgDocument || d_data->style == QwtSymbol::Path )
//        {
//            QPointF pinPoint( 0.0, 0.0 );
//            if ( d_data->isPinPointEnabled )
//                pinPoint = rect.center() - d_data->pinPoint;

//            rect.moveCenter( pinPoint );
//        }

        var r = new Misc.Rect();
        r.setLeft(Math.floor( rect.left()));
        r.setTop(Math.floor( rect.top() ));
        r.setRight(Math.ceil( rect.right() ));
        r.setBottom(Math.ceil( rect.bottom() ));

        //if ( m_style != Pixmap )
            //r.adjust( -1, -1, 1, 1 ); // for antialiasing

        return r;
    }

}
Symbol.prototype.toString = function () {
    return '[Symbol]';
}
/////////////////////////////////////////////////end
;
define("jQwtSymbol", ["static","jGraphic"], function(){});


var LegendData = function(){
    var m_map = {};
    var m_empty = true;

    //! \return Value of the TitleRole attribute
    this.title = function () {
      return this.value(Static.TitleRole);
    }

    //! \return Value of the IconRole attribute
    this.icon = function () {
      return this.value(Static.IconRole);
    }

    //! \return Value of the ModeRole attribute
    this.mode = function () {
      if (this.hasRole(Static.ModeRole))
        return this.value(Static.ModeRole);
      return Static.ReadOnly;
    }

    this.setValue = function (role, val) {
      //m_data.push({role:role, value:val});
      m_map[role] = val;
      m_empty = false;
    }

    this.isValid = function () {
      return !m_empty;
    }

    /*!
    \param role Attribute role
    \return True, when the internal map has an entry for role
     */
    this.hasRole = function (role) {
      return contains(role);
    }

    this.value = function (role) {
      if (!contains(role))
        return null;
      return m_map[role];
    }

    function contains(role) {
      if (typeof(m_map[role]) === "undefined")
        return false;
      return true;
    }

    this.toString = function () {
      return '[LegendData]';
    }
  
}
////////////////////////////////////////////end


/////////////////AbstractLegend//////////start

var AbstractLegend = function(){
    var m_plot = null;
    var m_checked = false;
    var m_legendDiv = null;
    var m_maxChar = "";//number of characters in longest label
    var m_iconWidth = 0;
    var m_maxWidth = 100;
    var margin = 8;
    var m_checkChangeFn = function(plotItem, check){
        plotItem.setVisible(!check);
        if(!m_plot.autoReplot())
            m_plot.replot();
    };

    if(typeof(checkChangeFn)!=="undefined")
        m_checkChangeFn = checkChangeFn;

    var m_itemList = [];

    var tbl = $('<table/>').attr({
            //id : tableElementId
        });

    this.setLegendDiv = function(div){
        //div.css("z-index", 10000)
        //console.log(div.css("z-index"))
        m_legendDiv = div;
        m_legendDiv.append(tbl);
        m_legendDiv.css("overflow", "auto");
        
        m_legendDiv.on('contextmenu', function(e){
    		e.preventDefault()
    	})

    };

    /*this.hide = function(){
      if(m_legendDiv && m_plot){
          m_legendDiv.hide()
          m_plot.getLayout().updateLayout();
          m_plot.autoRefresh();
        } 
    }

    this.show = function(){
      if(m_legendDiv && m_plot){
          m_legendDiv.show()
          m_plot.getLayout().updateLayout();
          m_plot.autoRefresh();
        }
    }*/

    this.setPlot = function(plot){
        m_plot = plot;
    };

    this.isEmpty = function(){
        return tbl[0].rows.length >= 1 ? false : true;
    };
    
    this.setMaxWidth = function(width){
        m_maxWidth = width;
        //m_plot.getLayout().updateLayout()        
    }

    this.maxWidth = function(){
        return m_maxWidth;
    }

    this.legendDivWidth = function(){
        var w = m_plot.legendFont().textSize(m_maxChar).width + m_iconWidth + margin;
        return w < this.maxWidth() ? w : this.maxWidth();
    };

    

    this.addItem = function(plotItem, rowNumber){        
       var font = plotItem.plot().legendFont();
       
       var itemData = plotItem.legendData()[0];
       
       
       if(!itemData.isValid())
           return;
    
       var title = itemData.title();
       var icon = itemData.icon();
       

       if(icon && (icon.width() > m_iconWidth ))
          m_iconWidth = icon.width();
       var row = $('<tr />');

       var tdElem = $('<td class="unchecked"></td>');
       

       var textLabel = $('<label />');
       textLabel.css("color", font.fontColor);
       textLabel.css("font-size", font.th);
       textLabel.text(" "+title);

       var spanElem = $('<span/>')
       if(icon)
          icon.setParent(spanElem)
       textLabel.appendTo(spanElem);
       spanElem.appendTo(tdElem);
       

       row.append(tdElem);


       tbl.append(row);
	
       if(rowNumber !== undefined && rowNumber > -1){
                m_itemList.splice(rowNumber, 0, plotItem)
                Static.setElementIndex(row, rowNumber)
       }else{
       		m_itemList.push(plotItem);
                //tbl.append(row);
       }


       tdElem.click(plotItem, function(event){
          if($(this).attr("class") === "unchecked"){
              $(this).removeClass("unchecked");
              $(this).addClass("checked");
              m_checked = true;
          }
          else{
              $(this).removeClass("checked");
              $(this).addClass("unchecked");
              m_checked = false;
         }
         if(m_checkChangeFn)
            m_checkChangeFn(event.data, m_checked);
      });
            
      if(plotItem.title().length > m_maxChar.length)
          m_maxChar = plotItem.title();         
      

   };


    function removeElementAt(index){
        if (index > -1) {
            m_itemList.splice(index, 1);
        }
    }

    this.removeItem = function(plotItem) {
        var rowNumber = m_itemList.indexOf(plotItem);
        //alert(rowNumber)
        if(rowNumber < 0)
            return;
        removeElementAt(rowNumber);
        tbl[0].deleteRow(rowNumber);
        if(parseInt(tbl.css("height")) < parseInt(m_legendDiv.css("height")) ){
            m_legendDiv.css("overflow-y", "auto");
       }
       if(parseInt(tbl.css("width")) < parseInt(m_legendDiv.css("width")) ){
            m_legendDiv.css("overflow-x", "auto");
       }
       //if(tbl[0].rows.length <= 0)
          // tbl.hide();
       return rowNumber
    };

   this.clearLegend = function(){
       var numRows = tbl[0].rows.length;
       for(var i=0; i<numRows; ++i){
            tbl[0].deleteRow(0);
       }
   };

   this.rowNumberFromName = function(name){
        var Rows = tbl[0].rows;
        for(var i=0; i<Rows.length; ++i){
             if(Rows[i].cells[0].innerHTML===name)
                return i;
        }
        return -1; //not found
   };


    this.toString = function () {
        return '[AbstractLegend]';
    };
      
}
//Subclass overwrite this method.
//! \return True, when no plot item is inserted
AbstractLegend.prototype.isEmpty = function () {
    return true;
};
//Subclass overwrite this method.
/*!
      Render the legend into a given rectangle.

      \param painter Painter
      \param rect Bounding rectangle
      \param fillBackground When true, fill rect with the widget background

      \sa renderLegend() is used by QwtPlotRenderer
    */
AbstractLegend.prototype.renderLegend = function (painter, rect, fillBackground) {
    return true;
};
//Subclass overwrite this method.
/*!
      \brief Update the entries for a plot item

      \param itemInfo Info about an item
      \param data List of legend entry attributes for the  item
     */
AbstractLegend.prototype.updateLegend = function (itemInfo, data) {

};
//////////////////////////////////////////////////////end

MLegend.inheritsFrom( AbstractLegend );
function MLegend(callBack ){
    AbstractLegend.call(this, callBack);

    this.toString = function () {
        return '[MLegend]';
    };
}

// class MLegend extends AbstractLegend{
//   constructor(callBack ){
//     super(callBack);    
//     this.toString = function () {
//       return '[MLegend]';
//     };
//   }
// }

/*return MLegend;

});*/
;
define("jQwtLegend", ["static"], function(){});


//define(function(){
////////////////////Magnifier///////////////////////start
//Magnifier.inheritsFrom( HObject );
class Magnifier extends HObject{
//function Magnifier(plot){
  constructor(plot){
    //HObject.call(this);
    super(plot)
    //var self = this;
    var m_plot = null;
    //var m_isEnabled = false;
    var m_wheelFactor = 1.9;
    var m_wheelModifiers = Static.NoModifier;
    var m_mouseFactor = 0.95;
    var m_mouseButton = Static.RightButton;
    var m_mouseButtonModifiers = Static.NoModifier;
    var m_keyFactor = 0.9;
    var m_zoomInKey = 107;//Key_Plus;
    var m_zoomInKeyModifiers = Static.Key_Shift //Static.NoModifier;
    var m_zoomOutKey = 109;//Key_Minus;
    var m_zoomOutKeyModifiers = Static.Key_Shift //Static.NoModifier;
    var m_mousePressed = false;
    var m_zoomInKeyModifiersEnabled = false;
    var m_zoomOutKeyModifiersEnabled = false;
    
    var initialPosX = 0;
    var initialPosY = 0;

    var m_isAxisEnabled = [];

    for ( var axis = 0; axis < axisCnt; axis++ )
            m_isAxisEnabled[axis] = true;


    /*!
   \brief En/Disable an axis

   Only Axes that are enabled will be zoomed.
   All other axes will remain unchanged.

   \param axis Axis, see QwtPlot::Axis
   \param on On/Off

   \sa isAxisEnabled()
    */
    this.setAxisEnabled = function( axis, on )
    {
        if ( axis >= 0 && axis < axisCnt )
            m_isAxisEnabled[axis] = on;
    }

    /*!
       Test if an axis is enabled

       \param axis Axis, see QwtPlot::Axis
       \return True, if the axis is enabled

       \sa setAxisEnabled()
    */
    this.isAxisEnabled = function( axis ) 
    {
        if ( axis >= 0 && axis < axisCnt )
            return m_isAxisEnabled[axis];

        return true;
    }
    
    //var m_centralDiv = null;
    
    if(typeof(plot)!=="undefined"){
        plot.magnifier = this
        m_plot = plot;
        this.setElement(m_plot.getLayout().getCentralDiv());
    }
    
    this.plot = function(){
        return m_plot;
    }

    /*!
       \brief Change the wheel factor

       The wheel factor defines the ratio between the current range
       on the parent widget and the zoomed range for each step of the wheel.

       Use values > 1 for magnification (i.e. 2.0) and values < 1 for
       scaling down (i.e. 1/2.0 = 0.5). You can use this feature for
       inverting the direction of the wheel.

       The default value is 0.9.

       \param factor Wheel factor
       \sa wheelFactor(), setWheelButtonState(),
           setMouseFactor(), setKeyFactor()
    */
    this.setWheelFactor = function( factor )
    {
        m_wheelFactor = factor;
    }

    /*!
       \return Wheel factor
       \sa setWheelFactor()
    */
    this.wheelFactor = function()
    {
        return m_wheelFactor;
    }

    /*!
       Assign keyboard modifiers for zooming in/out using the wheel.
       The default modifiers are Qt::NoModifiers.

       \param modifiers Keyboard modifiers
       \sa wheelModifiers()
    */
    this.setWheelModifiers = function(  modifiers )
    {
        m_wheelModifiers = modifiers;
    }

    /*!
       \return Wheel modifiers
       \sa setWheelModifiers()
    */
    this.wheelModifiers = function()
    {
        return m_wheelModifiers;
    }

    /*!
       \brief Change the mouse factor

       The mouse factor defines the ratio between the current range
       on the parent widget and the zoomed range for each vertical mouse movement.
       The default value is 0.95.

       \param factor Wheel factor
       \sa mouseFactor(), setMouseButton(), setWheelFactor(), setKeyFactor()
    */
    this.setMouseFactor = function( factor )
    {
        m_mouseFactor = factor;
    }

    /*!
       \return Mouse factor
       \sa setMouseFactor()
    */
    this.mouseFactor = function()
    {
        return m_mouseFactor;
    }

    /*!
       Assign the mouse button, that is used for zooming in/out.
       The default value is Qt::RightButton.

       \param button Button
       \param modifiers Keyboard modifiers

       \sa getMouseButton()
    */
    this.setMouseButton = function( button, modifiers )
    {
        m_mouseButton = button;
        m_mouseButtonModifiers = modifiers;
    }

    //! \sa setMouseButton()
    this.getMouseButton = function( )
    {
       return {button:m_mouseButton, modifiers:m_mouseButtonModifiers};
    }

    /*!
       \brief Change the key factor

       The key factor defines the ratio between the current range
       on the parent widget and the zoomed range for each key press of
       the zoom in/out keys. The default value is 0.9.

       \param factor Key factor
       \sa keyFactor(), setZoomInKey(), setZoomOutKey(),
           setWheelFactor, setMouseFactor()
    */
    this.setKeyFactor = function( factor )
    {
        m_keyFactor = factor;
    }

    /*!
   \return Key factor
   \sa setKeyFactor()
    */
    this.keyFactor = function() 
    {
        return m_keyFactor;
    }
    
    /*!
       Assign the key, that is used for zooming in.
       The default combination is Qt::Key_Plus + Qt::NoModifier.
    
       \param key
       \param modifiers
       \sa getZoomInKey(), setZoomOutKey()
    */
    this.setZoomInKey = function( key, modifiers )
    {
        m_zoomInKey = key;
        m_zoomInKeyModifiers = modifiers;
    }
    
    /*! 
       \brief Retrieve the settings of the zoom in key
    
       \param key Key code, see Qt::Key
       \param modifiers Keyboard modifiers
    
       \sa setZoomInKey()
    */
    this.getZoomInKey = function() 
    {
        return {key: m_zoomInKey, modifiers: m_zoomInKeyModifiers};
    }
    
    /*!
       Assign the key, that is used for zooming out.
       The default combination is Qt::Key_Minus + Qt::NoModifier.
    
       \param key
       \param modifiers
       \sa getZoomOutKey(), setZoomOutKey()
    */
    this.setZoomOutKey = function(  key,  modifiers )
    {
        m_zoomOutKey = key;
        m_zoomOutKeyModifiers = modifiers;
    }
    
    /*! 
   \brief Retrieve the settings of the zoom out key

   \param key Key code, see Qt::Key
   \param modifiers Keyboard modifiers

   \sa setZoomOutKey()
    */
    this.getZoomOutKey = function( ) 
    {
        return {key: m_zoomOutKey, modifiers: m_zoomOutKeyModifiers};
    }  


    this.event = function(event) {
        //console.log('event() called in Magnifier')
        switch (event.type){
          case 'mousedown':
              {
                if ( this.plot() == null ){
                    //Magnifier.prototype.mousePressEvent.call(this, mouseEvent)
                    return true;
                }

                //alert(mouseEvent.key)

                if ( ( event.button !== m_mouseButton ) /*|| ( mouseEvent.modifiers != m_mouseButtonModifiers )*/ )
                {
                    return true;
                }
                initialPosX = event.clientX;
                initialPosY = event.clientY;
                m_mousePressed = true; 

                return  true
              }
            break;
          case 'mouseup':
            {

                if (event.button === m_mouseButton && m_mousePressed && this.plot() )
                {
                    m_mousePressed = false;
                    //parentWidget()->setMouseTracking( d_data->hasMouseTracking );
                }
                //HObject.prototype.mouseReleaseEvent.call(this, mouseEvent)
                //return false
            }
            break;
            case 'mousemove':
              {

                  if ( !m_mousePressed)//  || mouseEvent.button !== m_mouseButton)
                      return;
                  //alert("here")
                  var dy = event.clientY - initialPosY;
                  if ( dy != 0 )
                  {
                      var f = m_mouseFactor;
                      if ( dy < 0 )
                          f = 1 / f;

                      this.rescale( f );
                  }

                  initialPosX = event.clientX;
                  initialPosY = event.clientY;
              }
              break; 
              case 'keydown':
                {
                    //console.log(keyEvent.keyCode)
                      if ( event.keyCode == m_zoomInKeyModifiers)
                      {
                          m_zoomInKeyModifiersEnabled = true;
                      }
                      if ( event.keyCode == m_zoomOutKeyModifiers)
                      {
                          m_zoomOutKeyModifiersEnabled = true;
                      }

                      if ( event.keyCode == m_zoomInKey &&  m_zoomInKeyModifiersEnabled)
                      {
                          this.rescale( m_keyFactor );
                      }
                      else if ( event.keyCode == m_zoomOutKey && m_zoomOutKeyModifiersEnabled )
                      {
                          this.rescale( 1.0 / m_keyFactor );
                      }
                 }
                break;
              case 'keyup':
                {

                   if ( event.keyCode == m_zoomInKeyModifiers)
                    {
                        m_zoomInKeyModifiersEnabled = false;
                    }
                    if ( event.keyCode == m_zoomOutKeyModifiers)
                    {
                        m_zoomOutKeyModifiersEnabled = false;
                    }
                }
                break;
                case 'mousewheel':
                {
                  //console.log(keyEvent)
                    if (m_wheelFactor != 0.0 )
                     {            
                         var f = Math.pow(m_wheelFactor, Math.abs(event.deltaY/15));
                         if ( event.deltaY > 0 )
                             f = 1 / f;     
                         this.rescale(f);             
                     }      
                }
                break;           
          default:
            // code block
        }
    }  
    
    
    /*!
   Zoom in/out the axes scales
   \param factor A value < 1.0 zooms in, a value > 1.0 zooms out.
    */
    this.rescale = function( factor )
    {
        var plt = this.plot();
        if ( plt == null )
            return;
        //alert("here")
        factor = Math.abs( factor );
        if ( factor == 1.0 || factor == 0.0 )
            return;
    
        var doReplot = false;
    
        var autoReplot = plt.autoReplot();
        plt.setAutoReplot( false );

        //var rescaled = false;
    
        for ( var axisId = 0; axisId < axisCnt; axisId++ )
        {
            var scaleDiv = this.plot().axisScaleDiv( axisId );
            if (  this.isAxisEnabled( axisId ) )
            {
                var center =  scaleDiv.lowerBound() + scaleDiv.range() / 2;
                var width_2 = scaleDiv.range() / 2 * factor;
    
                plt.setAxisScale( axisId, center - width_2, center + width_2 );
                doReplot = true;
                //rescaled = true
            }
        }

        /*if(doReplot)
            Static.trigger("rescaled");*/
    
        plt.setAutoReplot( autoReplot );
    
        if ( doReplot )
            plt.replot();


            
        return false;
    }

    
    this.setEnabled_1( true );
    //this.setEnabled( false );

    
    this.toString = function () {
        return '[Magnifier]';
    }

}

}
;
define("jQwtMagnifier", ["static"], function(){});


//define(function(){
/////////////////PlotGrid - subclass of PlotItem//////////start
PlotGrid.inheritsFrom( PlotItem );
// Define the PlotGrid constructor
function PlotGrid(tle) {
    // Call the parent constructor, making sure (using Function#call)
	// that "this" is set correctly during the call
	PlotItem.call(this, tle);

    this.setItemAttribute(AutoScale, true );



	// Initialize our PlotGrid-specific properties
	// Enables major grid, disables minor grid
	var xEnabled = true;
	var yEnabled = true;
    var xMinEnabled = false;
    var yMinEnabled = false;

	var xScaleDiv = null;
	var yScaleDiv = null;

    var majorPen = "grey";
    var minorPen = "lightGrey";

    this.rtti = Static.Rtti_PlotGrid;

	this.setZ( 10.0 );
	this.enableX = function (on) {
		if (xEnabled != on) {
			xEnabled = on;
			this.plot().autoRefresh()
			//legendChanged();
			//itemChanged();
		}
	}
	this.enableY = function (on) {
		if (yEnabled != on) {
			yEnabled = on;
			this.plot().autoRefresh()
			//legendChanged();
			//itemChanged();
		}
	}
	this.enableXMin = function (on) {
		if (xMinEnabled != on) {
			xMinEnabled = on;
			this.plot().autoRefresh()

			//legendChanged();
			//itemChanged();
		}
	}
	this.enableYMin = function (on) {
		if (yMinEnabled != on) {
			yMinEnabled = on;
			this.plot().autoRefresh()

			//legendChanged();
			//itemChanged();
		}
	}
	/*
	Assign an x axis scale division
	scaleDiv Scale division
	 */
	this.setXDiv = function (scaleDiv) {
        if (xScaleDiv !== scaleDiv) {
			xScaleDiv = scaleDiv;
			//itemChanged();
		}
	}
    this.xDiv = function () {
        return xScaleDiv;
    }

	/*!
	Assign a y axis division
	scaleDiv Scale division
	 */
	this.setYDiv = function (scaleDiv) {
        if (yScaleDiv !== scaleDiv) {
			yScaleDiv = scaleDiv;
			//itemChanged();
		}
	}
    this.yDiv = function () {
        return yScaleDiv;
    }
	
	/*
	  Draw the grid	
	  The grid is drawn into the bounding rectangle such that
	  grid lines begin and end at the rectangle's borders. The X and Y
	  maps are used to map the scale divisions into the drawing region
	  screen.	
	  param painter  Painter
	  param xMap X axis map
	  param yMap Y axis
	  param canvasRect Contents rectangle of the plot canvas
	*/
	this.draw = function (xMap, yMap) 
	{        
        var p = this.plot();        
        var xScaleDiv = p.axisScaleDiv(this.xAxis());
        var yScaleDiv = p.axisScaleDiv(this.yAxis());


        var ctx = this.getContext();

		//ctx.clearRect ( 0 , 0 , ctx.canvas.width, ctx.canvas.height );
        ctx.strokeStyle = minorPen;

        if ( xEnabled && xMinEnabled )
	    {

            this.drawLines(ctx, "vertical", xMap, xScaleDiv.ticks( MinorTick ) );
            this.drawLines(ctx,  "vertical", xMap, xScaleDiv.ticks( MediumTick ) );
	    }
	
        if ( yEnabled && yMinEnabled )
	    {
            this.drawLines(ctx, "horizontal", yMap, yScaleDiv.ticks(MinorTick ) );
            this.drawLines(ctx,  "horizontal", yMap, yScaleDiv.ticks(MediumTick ) );
        }
        //ctx.stroke();
	
	    //  draw major grid lines
        ctx.strokeStyle = majorPen;

        //ctx.beginPath();
	    
        if ( xEnabled )
	    {

            this.drawLines(ctx,  "vertical", xMap, xScaleDiv.ticks(MajorTick ) );
	    }
	
        if ( yEnabled )
	    {
            this.drawLines(ctx,  "horizontal", yMap, yScaleDiv.ticks( MajorTick ) );
	    }

        //ctx.stroke();
	}

    this.drawLines = function(context, orientation, scaleMap, values )
	{
        var x1 = 0;
        var x2 = context.canvas.width - 1.0;

        var y1 = 0;//canvasRect.top()();
        var y2 = context.canvas.height - 1.0;

        var painter = new PaintUtil.Painter(context);
        var lineThickness = painter.pen().width
        
	    for (var i = 0; i < values.length; i++ )
	    {
	        var value = scaleMap.transform( values[i] );
	        //if ( doAlign )
                //value = Math.round( value );

	
            if ( orientation === "horizontal" )
            {               
               painter.drawLine(x1, value-lineThickness, x2, value-lineThickness)
	        }
	        else
            {                
                painter.drawLine(value-lineThickness, y1, value-lineThickness, y2);
	        }
	    }
	    painter = null
	}
    /*!
       Update the grid to changes of the axes scale division

       \param xScaleDiv Scale division of the x-axis
       \param yScaleDiv Scale division of the y-axis

       \sa QwtPlot::updateAxes()
    */
    this.updateScaleDiv = function( xScale_div, yScale_div )
    {
        this.setXDiv( xScale_div );
        this.setYDiv( yScale_div );
    }

    
}

//PlotGrid.prototype = Object.create(PlotItem.prototype);
//PlotGrid.prototype.constructor = PlotGrid;
//PlotGrid.prototype.parent = PlotItem.prototype;

PlotGrid.prototype.toString = function () {
	return '[PlotGrid]';
}
/////////////////////////////////////////////////////end

/*return PlotGrid
})*/;
define("jQwtPlotGrid", ["static","plotItem"], function(){});


///////////////////WidgetOverlay////////////////////////start
//WidgetOverlay.inheritsFrom(Widget);
class WidgetOverlay extends Widget{
//function WidgetOverlay(w) {
	constructor(w){
		/*if (typeof(w) === 'undefined')
			return;*/
		//Widget.call(this, w.getElement()); ////////////////
		super(w)
		var self = this;

		
		this.draw = function () {
			var p = new PaintUtil.Painter(this)
			this.drawOverlay(p)//new PaintUtil.Painter(this))
			p=null
		}



		/*Static.bind("replot", function(){
	        self.draw()
	    })*/

	    

		this.toString = function () {
			return '[WidgetOverlay]';
		}
	}
	updateOverlay(){
		//console.log('updateOverlay() called in WidgetOverlay')
		this.draw();
	}
}
//subclass reimplement this method to draw the widget overlay
WidgetOverlay.prototype.drawOverlay = function (painter) {}
///////////////////////////////////////////////////end
;
define("widgetOverlay", ["static","widget"], function(){});


/*!
    \brief Symbolic mouse input codes

    QwtEventPattern implements 3 different settings for
    mice with 1, 2, or 3 buttons that can be activated
    using initMousePattern(). The default setting is for
    3 button mice.

    Individual settings can be configured using setMousePattern().

    \sa initMousePattern(), setMousePattern(), setKeyPattern()
  */

/*! 
  The default setting for 1, 2 and 3 button mice is:

  - Qt::LeftButton 
  - Qt::LeftButton 
  - Qt::LeftButton 
 */
//MousePatternCode...
var MouseSelect1 = 0

/*!
    The default setting for 1, 2 and 3 button mice is:

    - Qt::LeftButton + Qt::ControlModifier
    - Qt::RightButton
    - Qt::RightButton
   */
var MouseSelect2 = 1;

/*!
    The default setting for 1, 2 and 3 button mice is:

    - Qt::LeftButton + Qt::AltModifier
    - Qt::LeftButton + Qt::AltModifier
    - Qt::MidButton
   */
var MouseSelect3 = 2;

/*!
    The default setting for 1, 2 and 3 button mice is:

    - Qt::LeftButton + Qt::ShiftModifier
    - Qt::LeftButton + Qt::ShiftModifier
    - Qt::LeftButton + Qt::ShiftModifier
   */
var MouseSelect4 = 3;

/*!
    The default setting for 1, 2 and 3 button mice is:

    - Qt::LeftButton + Qt::ControlButton | Qt::ShiftModifier
    - Qt::RightButton + Qt::ShiftModifier
    - Qt::RightButton + Qt::ShiftModifier
   */
var MouseSelect5 = 4;

/*!
    The default setting for 1, 2 and 3 button mice is:

    - Qt::LeftButton + Qt::AltModifier + Qt::ShiftModifier
    - Qt::LeftButton + Qt::AltModifier | Qt::ShiftModifier
    - Qt::MidButton + Qt::ShiftModifier
   */
var MouseSelect6 = 5;

//! Number of mouse patterns
var MousePatternCount = 6;


//-------------------------------------------------------------------
/*!
  \brief Symbolic keyboard input codes

  Individual settings can be configured using setKeyPattern()

  \sa setKeyPattern(), setMousePattern()
*/
// KeyPatternCode

//! Qt::Key_Return
var KeySelect1 = 0;

//! Qt::Key_Space
var KeySelect2 = 1;

//! Qt::Key_Escape
var KeyAbort = 2;

//! Qt::Key_Left
var KeyLeft = 3;

//! Qt::Key_Right
var KeyRight = 4;

//! Qt::Key_Up
var KeyUp = 5;

//! Qt::Key_Down
var KeyDown = 6;

//! Qt::Key_Plus
var KeyRedo = 7;

//! Qt::Key_Minus
var KeyUndo = 8;

//! Qt::Key_Escape
var KeyHome = 9;

//! Number of key patterns
var KeyPatternCount = 10;


//! A pattern for mouse events

function MousePattern(btn, modifierCodes) {
    this.button = Static.NoButton;
    this.modifiers = Static.NoModifier;
    if (btn !== undefined) {
        this.button = btn;
    }
    if (modifierCodes !== undefined) {
        this.modifiers = modifierCodes;
    }
}


//! A pattern for key events

function KeyPattern(keyCode, modifierCodes) {
    this.key = Static.Key_unknown
    this.modifiers = Static.NoModifier;
    if (keyCode !== undefined) {
        this.key = keyCode;
    }
    if (modifierCodes !== undefined) {
        this.modifiers = modifierCodes;
    }
}


//-----------------------------------------------------------


/*!
  Constructor

  \sa MousePatternCode, KeyPatternCode
*/

/*class EventPattern{ ///EventPattern Start
  constructor(){*/

class EventPattern extends HObject { ///EventPattern Start
    constructor(parent) {
        super(parent)

        var d_mousePattern = [] //= MousePatternCount;
        var d_keyPattern = [] //= KeyPatternCount;
        //--------------public methods----------------------
        this.initMousePattern = function(numButtons) {
            //d_mousePattern.resize( MousePatternCount );
            for (var i = 0; i < MousePatternCount; ++i)
                d_mousePattern.push(new MousePattern());
            //console.log(d_mousePattern)

            switch (numButtons) {
                case 1:
                    {
                        this.setMousePattern(MouseSelect1, Static.LeftButton);
                        this.setMousePattern(MouseSelect2, Static.LeftButton, Static.ControlModifier);
                        this.setMousePattern(MouseSelect3, Static.LeftButton, Static.AltModifier);
                        break;
                    }
                case 2:
                    {
                        this.setMousePattern(MouseSelect1, Static.LeftButton);
                        this.setMousePattern(MouseSelect2, Static.RightButton);
                        this.setMousePattern(MouseSelect3, Static.LeftButton, Static.AltModifier);
                        break;
                    }
                default:
                    {
                        this.setMousePattern(MouseSelect1, Static.LeftButton);
                        this.setMousePattern(MouseSelect2, Static.RightButton);
                        this.setMousePattern(MouseSelect3, Static.MidButton);
                    }
            }
            //console.log(d_mousePattern)
            this.setMousePattern(MouseSelect4, d_mousePattern[MouseSelect1].button,
                d_mousePattern[MouseSelect1].modifiers | Static.ShiftModifier);

            this.setMousePattern(MouseSelect5, d_mousePattern[MouseSelect2].button,
                d_mousePattern[MouseSelect2].modifiers | Static.ShiftModifier);

            this.setMousePattern(MouseSelect6, d_mousePattern[MouseSelect3].button,
                d_mousePattern[MouseSelect3].modifiers | Static.ShiftModifier);

        }

        this.initKeyPattern = function() {
            //d_keyPattern.resize( KeyPatternCount );
            for (var i = 0; i < KeyPatternCount; ++i)
                d_keyPattern.push(new KeyPattern());

            this.setKeyPattern(KeySelect1, Static.Key_Return);
            this.setKeyPattern(KeySelect2, Static.Key_Space);
            this.setKeyPattern(KeyAbort, Static.Key_Escape);

            this.setKeyPattern(KeyLeft, Static.Key_Left);
            this.setKeyPattern(KeyRight, Static.Key_Right);
            this.setKeyPattern(KeyUp, Static.Key_Up);
            this.setKeyPattern(KeyDown, Static.Key_Down);

            this.setKeyPattern(KeyRedo, Static.Key_Plus);
            this.setKeyPattern(KeyUndo, Static.Key_Minus);
            this.setKeyPattern(KeyHome, Static.Key_Escape);
        }

        this.setMousePattern = function(pattern, button, modifiers) {
            if (button == undefined) {
                d_mousePattern = pattern;
            } else {
                if (modifiers == undefined)
                    modifiers = Static.NoModifier
                if (pattern >= 0 && pattern < MousePatternCount) {
                    d_mousePattern[pattern].button = button;
                    d_mousePattern[pattern].modifiers = modifiers;
                }
            }

        }

        this.setKeyPattern = function(pattern, key, modifiers) {
            if (key == undefined) {
                d_mousePattern = pattern;
            } else {
                if (modifiers == undefined)
                    modifiers = Static.NoModifier
                if (pattern >= 0 && pattern < KeyPatternCount) {
                    d_keyPattern[pattern].key = key;
                    d_keyPattern[pattern].modifiers = modifiers;
                }
            }

        }

        this.modifiers = function(event) {
            var _modifiers = Static.NoModifier
            if (event.altKey && event.ctrlKey && event.shiftKey)
                return _modifiers | Static.AltModifier |
                    Static.ControlModifier | Static.ShiftModifier
            if (event.altKey && event.ctrlKey)
                return _modifiers | Static.AltModifier |
                    Static.ControlModifier
            if (event.altKey && event.shiftKey)
                return _modifiers | Static.AltModifier | Static.ShiftModifier
            if (event.ctrlKey && event.shiftKey)
                return _modifiers | Static.ControlModifier | Static.ShiftModifier
            if (event.altKey)
                return _modifiers | Static.AltModifier
            if (event.ctrlKey)
                return _modifiers | Static.ControlModifier
            if (event.shiftKey)
                return _modifiers | Static.ShiftModifier
            return _modifiers
        }

        this.button = function(event) {
            if (event == null)
                return false;
            return event.button
        }

        /*!
      \brief Compare a mouse event with an event pattern.

      A mouse event matches the pattern when both have the same button
      value and in the state value the same key flags(Qt::KeyButtonMask)
      are set.

      \param code Index of the event pattern
      \param event Mouse event
      \return true if matches

      \sa keyMatch()
    */
        this.mouseMatch = function( /*MousePatternCode*/ code, event) {
            if (code >= 0 && code < MousePatternCount)
                return this.mouseMatch2(d_mousePattern[code], event);

            return false;
        }

        /*!
      \brief Compare a mouse event with an event pattern.

      A mouse event matches the pattern when both have the same button
      value and in the state value the same key flags(Qt::KeyButtonMask)
      are set.

      \param pattern Mouse event pattern
      \param event Mouse event
      \return true if matches

      \sa keyMatch()
    */

        this.mouseMatch2 = function(pattern, event) {
            if (event == null)
                return false;

            //const MousePattern mousePattern( event->button(), event->modifiers() );

            //return mousePattern == pattern;
            return ((pattern.button == this.button(event)) && (pattern.modifiers == this.modifiers(event)))
        }




        this.keyPattern = function() {
            return d_keyPattern;
        }

        this.key = function(event) {
            if (event == null)
                return false;
            return event.keyCode

        }

        /*!
  \brief Compare a key event with an event pattern.

  A key event matches the pattern when both have the same key
  value and in the state value the same key flags (Qt::KeyButtonMask)
  are set.

  \param code Index of the event pattern
  \param event Key event
  \return true if matches

  \sa mouseMatch()
*/
        this.keyMatch = function( /*KeyPatternCode*/ code, event) {
            if (code >= 0 && code < KeyPatternCount)
                return this.keyMatch2(d_keyPattern[code], event);

            return false;

        }

        /*!
  \brief Compare a key event with an event pattern.

  A key event matches the pattern when both have the same key
  value and in the state value the same key flags (Qt::KeyButtonMask)
  are set.

  \param pattern Key event pattern
  \param event Key event
  \return true if matches

  \sa mouseMatch()
*/

        this.keyMatch2 = function( /*KeyPattern*/ pattern, event) {
            if (event == null)
                return false;

            //const KeyPattern keyPattern( event->key(), event->modifiers() );
            //return keyPattern == pattern;
            return ((pattern.key == this.key(event)) && (pattern.modifiers == this.modifiers(event)))
        }


        this.initKeyPattern();
        this.initMousePattern(3);
    }
} ///EventPattern End;
define("qwteventpattern", function(){});


Static.Begin = 0
Static.Append = 1
Static.Move = 2
Static.Remove = 3
Static.End = 4

//! Constructor
function PickerMachine( /*SelectionType*/ type ){/////////start PickerMachine
    var d_selectionType =  type
    var d_state = 0

    //! Return the selection type
    this.selectionType = function()  {
        return d_selectionType;
    }

    //! Return the current state
    this.state = function(){
        return d_state;
    }

    //! Change the current state
    this.setState = function(/* int*/ state )
    {
        d_state = state;
    }

    //! Set the current state to 0.
    this.reset = function()
    {
        this.setState( 0 );
    }

}/////////end PickerMachine





//! Constructor
PickerTrackerMachine.inheritsFrom(PickerMachine)///Start PickerTrackerMachine
function PickerTrackerMachine(){
    PickerMachine.call( this, Static.NoSelection )

    //! Transition
this.transition = function(/*QwtEventPattern*/ p, /*const QEvent*/ e ){
        var cmdList = [];

        switch ( e.type )
        {
            //case QEvent::Enter:
            //case QEvent::MouseMove:
            case 'mouseenter':
            case 'mousemove':
            {
                if ( this.state() == 0 )
                {
                    cmdList.push(Static.Begin);
                    cmdList.push(Static.Append);
                    this.setState( 1 );
                }
                else
                {
                    cmdList.push(Static.Move);
                }
                break;
            }
            //case QEvent::Leave:
            case 'mouseleave':
            {
                cmdList.push(Static.Remove);
                cmdList.push(Static.End);
                this.setState( 0 );
            }
            default:
                break;
        }

        return cmdList;
    }

}//end PickerTrackerMachine


//! Constructor
PickerClickPointMachine.inheritsFrom(PickerMachine)///start PickerClickPointMachine
function PickerClickPointMachine() {
    PickerMachine.call(this, Static.PointSelection )

    //! Transition
this.transition = function( /*QwtEventPattern*/ eventPattern, event ){
    var cmdList = [];

    switch ( event.type )
    {
        //case QEvent::MouseButtonPress:
        case 'mousedown':
        {
            if ( eventPattern.mouseMatch(MouseSelect1, event ))
            {
                cmdList.push(Static.Begin);
                cmdList.push(Static.Append);
                cmdList.push(Static.End);
            }
            break;
        }
        //case QEvent::KeyPress:
        case 'keydown':
        {
            var keyEvent =  event;
            if ( eventPattern.keyMatch( KeySelect1, keyEvent ) )
            {
                //if ( !keyEvent->isAutoRepeat() )
                {
                    cmdList.push(Static.Begin);
                    cmdList.push(Static.Append);
                    cmdList.push(Static.End);
                }
            }
            break;
        }
        default:
            break;
    }

    return cmdList;
}


}///end PickerClickPointMachine


//! Constructor
PickerDragPointMachine.inheritsFrom(PickerMachine);
function PickerDragPointMachine(){//Start PickerDragPointMachine
    PickerMachine.call (this,  Static.PointSelection )

    //! Transition
    this.transition = function(/*QwtEventPattern*/ eventPattern, event ){    
        var cmdList = [];

        switch ( event.type )
        {
            //case QEvent::MouseButtonPress:
            case 'mousedown':
            {
                if ( eventPattern.mouseMatch( MouseSelect1, event ))
                {
                    if ( this.state() == 0 )
                    {
                        cmdList.push(Static.Begin);
                        cmdList.push(Static.Append);
                        this.setState( 1 );
                    }
                }
                break;
            }
            //case QEvent::MouseMove:
            case 'mousemove':
            //case QEvent::Wheel:
            case 'mousewheel':
            {
                if ( this.state() != 0 )
                    cmdList.push(Static.Move);
                break;
            }
            //case QEvent::MouseButtonRelease:
            case 'mouseup':
            {
                if ( this.state() != 0 )
                {
                    cmdList.push(Static.End);
                    this.setState( 0 );
                }
                break;
            }
            //case QEvent::KeyPress:
            case 'keydown':
            {
                var keyEvent = event;
                if ( eventPattern.keyMatch( KeySelect1, keyEvent ) )
                {
                    //if ( !keyEvent->isAutoRepeat() )
                    {
                        if ( this.state() == 0 )
                        {
                            cmdList.push(Static.Begin);
                            cmdList.push(Static.Append);
                            this.setState( 1 );
                        }
                        else
                        {
                            cmdList.push(Static.End);
                            this.setState( 0 );
                        }
                    }
                }
                break;
            }
            default:
                break;
        }

        return cmdList;
    }


}//End PickerDragPointMachine


//! Constructor
PickerClickRectMachine.inheritsFrom(PickerMachine);//Start PickerClickRectMachine
function PickerClickRectMachine(){
    PickerMachine.call(this, Static.RectSelection )

    //! Transition
    this.transition = function( /*QwtEventPattern*/ eventPattern, event ){
        var cmdList = [];

        switch ( event.type )
        {
            //case QEvent::MouseButtonPress:
            case 'mousedown':
            {
                if ( eventPattern.mouseMatch( MouseSelect1, event  ) )
                {
                    switch ( this.state() )
                    {
                        case 0:
                        {
                            cmdList.push(Static.Begin);
                            cmdList.push(Static.Append);
                            this.setState( 1 );
                            break;
                        }
                        case 1:
                        {
                            // Uh, strange we missed the MouseButtonRelease
                            break;
                        }
                        default:
                        {
                            cmdList.push(Static.End);
                            this.setState( 0 );
                        }
                    }
                }
                break;
            }
            //case QEvent::MouseMove:
            case 'mousemove':
            //case QEvent::Wheel:
            case 'mousewheel':
            {
                if ( this.state() != 0 )
                    cmdList.push(Static.Move);
                break;
            }
            //case QEvent::MouseButtonRelease:
            case 'mouseup':
            {
                if ( eventPattern.mouseMatch( MouseSelect1, event ) )
                {
                    if ( this.state() == 1 )
                    {
                        cmdList.push(Static.Append);
                        this.setState( 2 );
                    }
                }
                break;
            }
            //case QEvent::KeyPress:
            case 'keydown':
            {
                var keyEvent = event;
                if ( eventPattern.keyMatch(KeySelect1, keyEvent ) )
                {
                    //if ( !keyEvent->isAutoRepeat() )
                    {
                        if ( this.state() == 0 )
                        {
                            cmdList.push(Static.Begin);
                            cmdList.push(Static.Append);
                            this.setState( 1 );
                        }
                        else
                        {
                            if ( this.state() == 1 )
                            {
                                cmdList.push(Static.Append);
                                this.setState( 2 );
                            }
                            else if ( this.state() == 2 )
                            {
                                cmdList.push(Static.End);
                                this.setState( 0 );
                            }
                        }
                    }
                }
                break;
            }
            default:
                break;
        }

        return cmdList;
    }


}//End PickerClickRectMachine



//! Constructor
PickerDragRectMachine.inheritsFrom(PickerMachine)//Start PickerDragRectMachine
function PickerDragRectMachine(){
    PickerMachine.call(this, Static.RectSelection )

    //! Transition
    this.transition = function(/*QwtEventPattern*/ eventPattern, event ) {
        var cmdList = [];

        switch ( event.type)
        {
            //case QEvent::MouseButtonPress:
            case 'mousedown':
            {
                if ( eventPattern.mouseMatch( MouseSelect1, event ) ) 
                {
                    if ( this.state() == 0 )
                    {
                        cmdList.push(Static.Begin);
                        cmdList.push(Static.Append);
                        cmdList.push(Static.Append);
                        this.setState( 2 );
                    }
                }
                break;
            }
            //case QEvent::MouseMove:
            case 'mousemove':
            //case QEvent::Wheel:
            case 'mousewheel':
            {
                if ( this.state() != 0 )
                    cmdList.push(Static.Move);
                break;
            }
            //case QEvent::MouseButtonRelease:
            case 'mouseup':
            {
                if ( this.state() == 2 )
                {
                    cmdList.push(Static.End);
                    this.setState( 0 );
                }
                break;
            }
            //case QEvent::KeyPress:
            case 'keydown':
            {
                if ( eventPattern.keyMatch( KeySelect1, event ) )
                {
                    if ( this.state() == 0 )
                    {
                        cmdList.push(Static.Begin);
                        cmdList.push(Static.Append);
                        cmdList.push(Static.Append);
                        this.setState( 2 );
                    }
                    else
                    {
                        cmdList.push(Static.End);
                        this.setState( 0 );
                    }
                }
                break;
            }
            default:
                break;
        }

        return cmdList;
    }


}//end PickerDragRectMachine


//! Constructor
PickerPolygonMachine.inheritsFrom(PickerMachine);//Start PickerPolygonMachine
function PickerPolygonMachine(){
    PickerMachine.call( this, Static.PolygonSelection )

    //! Transition
    this.transition = function(/*QwtEventPattern*/ eventPattern, event ) {
        var cmdList = [];

        switch ( event.type )
        {
            //case QEvent::MouseButtonPress:
            case 'mousedown':
            {
                if ( eventPattern.mouseMatch( MouseSelect1, event  ) )
                {
                    if ( this.state() == 0 )
                    {
                        cmdList.push(Static.Begin);
                        cmdList.push(Static.Append);
                        cmdList.push(Static.Append);
                        this.setState( 1 );
                    }
                    else
                    {
                        cmdList.push(Static.Append);
                    }
                }
                if ( eventPattern.mouseMatch( MouseSelect2, event ) )
                {
                    if ( this.state() == 1 )
                    {
                        cmdList.push(Static.End);
                        this.setState( 0 );
                    }
                }
                break;
            }
            //case QEvent::MouseMove:
            case 'mousemove':
            //case QEvent::Wheel:
            case 'mousewheel':
            {
                if ( this.state() != 0 )
                    cmdList.push(Static.Move);
                break;
            }
            //case QEvent::KeyPress:
            case 'keydown':
            {
                var keyEvent = event;
                if ( eventPattern.keyMatch(KeySelect1, keyEvent ) )
                {
                    //if ( !keyEvent->isAutoRepeat() )
                    {
                        if ( this.state() == 0 )
                        {
                            cmdList.push(Static.Begin);
                            cmdList.push(Static.Append);
                            cmdList.push(Static.Append);
                            this.setState( 1 );
                        }
                        else
                        {
                            cmdList.push(Static.Append);
                        }
                    }
                }
                else if ( eventPattern.keyMatch( KeySelect2, keyEvent ) )
                {
                    //if ( !keyEvent->isAutoRepeat() )
                    {
                        if ( this.state() == 1 )
                        {
                            cmdList.push(Static.End);
                            this.setState( 0 );
                        }
                    }
                }
                break;
            }
            default:
                break;
        }

        return cmdList;
    }


}//End PickerPolygonMachine


//! Constructor
PickerDragLineMachine.inheritsFrom(PickerMachine);//Start PickerDragLineMachine
function PickerDragLineMachine(){
    PickerMachine.call(this, Static.PolygonSelection )

    //! Transition
    this.transition = function transition(/*QwtEventPattern*/ eventPattern, event )
    {
        var cmdList = [];

        switch( event.type )
        {
            //case QEvent::MouseButtonPress:
            case 'mousedown':
            {
                if ( eventPattern.mouseMatch( MouseSelect1, event ) )
                {
                    if ( this.state() == 0 )
                    {
                        cmdList.push(Static.Begin);
                        cmdList.push(Static.Append);
                        cmdList.push(Static.Append);
                        this.setState( 1 );
                    }
                }
                break;
            }
            //case QEvent::KeyPress:
            case 'keydown':
            {
                if ( eventPattern.keyMatch( KeySelect1, event ) )
                {
                    if ( this.state() == 0 )
                    {
                        cmdList.push(Static.Begin);
                        cmdList.push(Static.Append);
                        cmdList.push(Static.Append);
                        this.setState( 1 );
                    }
                    else
                    {
                        cmdList.push(Static.End);
                        this.setState( 0 );
                    }
                }
                break;
            }
            //case QEvent::MouseMove:
            case 'mousemove':
            //case QEvent::Wheel:
            case 'mousewheel':
            {
                if ( this.state() != 0 )
                    cmdList.push(Static.Move);

                break;
            }
            //case QEvent::MouseButtonRelease:
            case 'mouseup':
            {
                if ( this.state() != 0 )
                {
                    cmdList.push(Static.End);
                    this.setState( 0 );
                }
            }
            default:
                break;
        }

        return cmdList;
    }


}//End PickerDragLineMachine
;
define("qwtpickermachine", ["static","qwteventpattern"], function(){});



class PickerRubberband extends WidgetOverlay {
	constructor(/*QwtPicker*/ picker, /*QWidget*/ parent) {
		super(parent)

		var d_picker = picker;

		this.drawOverlay = function (painter) {
			//d_picker.rubberBandOverlay().clearCanvas()
			//painter.save()
			painter.setPen(d_picker.rubberBandPen());
			painter.setBrush(Static.NoBrush)
			d_picker.drawRubberBand(painter);
			//painter.restore()
		}

	}
};

class PickerTracker extends WidgetOverlay {
	constructor(/*QwtPicker*/ picker, /*QWidget*/ parent) {
		super(parent)

		var d_picker = picker;

		this.drawOverlay = function (painter) {
			d_picker.trackerOverlay().clearCanvas()
			painter.save()
			painter.setPen(d_picker.trackerPen());
			d_picker.drawTracker(painter);
			painter.restore()
		}
	}
};

function PickerPrivateData() {
	this.enabled = false;

	this.stateMachine = null;

	this.resizeMode //= QwtPicker::Stretch;

	this.rubberBand = Static.NoRubberBand;
	this.rubberBandPen = new Misc.Pen('red');

	this.trackerMode = Static.AlwaysOff;
	this.trackerPen = new Misc.Pen('red');
	this.trackerFont;

	this.pickedPoints = [];
	this.isActive = false;
	/*QPoint*/
	this.trackerPosition = new Misc.Point();

	this.mouseTracking = false; // used to save previous value

	/*QPointer< QwtPickerRubberband >*/
	this.rubberBandOverlay = null;
	/*QPointer< QwtPickerTracker>*/
	this.trackerOverlay = null;
};

/*!
Constructor

Creates an picker that is enabled, but without a state machine.
rubber band and tracker are disabled.

\param parent Parent widget, that will be observed
 */

/*!
Constructor

\param rubberBand Rubber band style
\param trackerMode Tracker mode
\param parent Parent widget, that will be observed
 */
//Picker.inheritsFrom(HObject);

/*
Try to simulate multiple inheritance.
 */

//class Picker extends HObject{
class Picker extends EventPattern {
	constructor(rubberBand, trackerMode, /*QWidget*/ parent) {
		super(parent)

		var d_data;
		var m_pickedPoints = [];

		var m_parent = null

			if (parent !== undefined && parent.toString() == '[Widget]') {
				m_parent = parent
			}

			//! Initialize the picker - used by the constructors
			this.init = function (parent, rubberBand, trackerMode) {
			d_data = new PickerPrivateData();

			d_data.rubberBand = rubberBand;

			if (parent) {
				//if ( parent->focusPolicy() == Qt::NoFocus )
				//parent->setFocusPolicy( Qt::WheelFocus );

				//d_data->openGL = parent->inherits( "QGLWidget" );
				d_data.trackerFont = new Misc.Font(12); ;
				//d_data->mouseTracking = parent->hasMouseTracking();

				this.setEnabled_1(true);
			}

			this.setTrackerMode(trackerMode);
			Picker.pickers.push(this)
		}

		this.getPickerData = function () {
			return d_data
		}

		/*!
		Set a state machine and delete the previous one

		\param stateMachine State machine
		\sa stateMachine()
		 */
		this.setStateMachine = function (/*QwtPickerMachine*/ stateMachine) {
			if (d_data.stateMachine != stateMachine) {
				this.reset();

				//delete d_data->stateMachine;
				d_data.stateMachine = stateMachine;

				if (d_data.stateMachine)
					d_data.stateMachine.reset();
			}
		}

		/*!
		\return Assigned state machine
		\sa setStateMachine()
		 */
		this.stateMachine = function () {
			return d_data.stateMachine;
		}

		//! Return the parent widget, where the selection happens
		this.parentWidget = function () {
			//QObject *obj = parent();
			//if ( obj && obj->isWidgetType() )
			//return static_cast<QWidget *>( obj );

			//return null;
			return m_parent
		}

		/*!
		Set the rubber band style

		\param rubberBand Rubber band style
		The default value is NoRubberBand.

		\sa rubberBand(), RubberBand, setRubberBandPen()
		 */
		this.setRubberBand = function (rubberBand) {
			d_data.rubberBand = rubberBand;
		}

		/*!
		\return Rubber band style
		\sa setRubberBand(), RubberBand, rubberBandPen()
		 */
		this.rubberBand = function () {
			return d_data.rubberBand;
		}

		/*!
		\brief Set the display mode of the tracker.

		A tracker displays information about current position of
		the cursor as a string. The display mode controls
		if the tracker has to be displayed whenever the observed
		widget has focus and cursor (AlwaysOn), never (AlwaysOff), or
		only when the selection is active (ActiveOnly).

		\param mode Tracker display mode

		\warning In case of AlwaysOn, mouseTracking will be enabled
		for the observed widget.
		\sa trackerMode(), DisplayMode
		 */

		this.setTrackerMode = function (/*DisplayMode*/ mode) {
			if (d_data.trackerMode != mode) {
				d_data.trackerMode = mode;
				this.setMouseTracking(d_data.trackerMode == Static.AlwaysOn);
			}
		}

		/*!
		\return Tracker display mode
		\sa setTrackerMode(), DisplayMode
		 */
		this.trackerMode = function () {
			return d_data.trackerMode;
		}

		/*!
		\brief Set the resize mode.

		The resize mode controls what to do with the selected points of an active
		selection when the observed widget is resized.

		Stretch means the points are scaled according to the new
		size, KeepSize means the points remain unchanged.

		The default mode is Stretch.

		\param mode Resize mode
		\sa resizeMode(), ResizeMode
		 */
		/*void QwtPicker::setResizeMode( ResizeMode mode )
	{
		d_data->resizeMode = mode;
		}*/

		/*!
		\return Resize mode
		\sa setResizeMode(), ResizeMode
		 */

		/* QwtPicker::ResizeMode QwtPicker::resizeMode() const
	{
		return d_data->resizeMode;
		}*/

		/*!
		\brief En/disable the picker

		When enabled is true an event filter is installed for
		the observed widget, otherwise the event filter is removed.

		\param enabled true or false
		\sa isEnabled(), eventFilter()
		 */
		this.setEnabled = function (enabled) {
			if (d_data.enabled != enabled) {
				d_data.enabled = enabled;

				/*QWidget*/
				var w = this.parentWidget();
				if (w) {
					if (enabled)
						w.installEventFilter(this);
					else
						w.removeEventFilter(this);
				}

				this.updateDisplay();
			}
		}

		/*!
		\return true when enabled, false otherwise
		\sa setEnabled(), eventFilter()
		 */

		this.isEnabled = function () {
			return d_data.enabled;
		}

		/*!
		Set the font for the tracker

		\param font Tracker font
		\sa trackerFont(), setTrackerMode(), setTrackerPen()
		 */
		this.setTrackerFont = function (font) {
			if (font != d_data.trackerFont) {
				d_data.trackerFont = font;
				this.updateDisplay();
			}
		}

		/*!
		\return Tracker font
		\sa setTrackerFont(), trackerMode(), trackerPen()
		 */

		this.trackerFont = function () {
			return d_data.trackerFont;
		}

		/*!
		Set the pen for the tracker

		\param pen Tracker pen
		\sa trackerPen(), setTrackerMode(), setTrackerFont()
		 */
		this.setTrackerPen = function (pen) {
			if (pen != d_data.trackerPen) {
				d_data.trackerPen = pen;
				this.updateDisplay();
			}
		}

		/*!
		\return Tracker pen
		\sa setTrackerPen(), trackerMode(), trackerFont()
		 */
		this.trackerPen = function () {
			return d_data.trackerPen;
		}

		/*!
		Set the pen for the rubberband

		\param pen Rubber band pen
		\sa rubberBandPen(), setRubberBand()
		 */
		this.setRubberBandPen = function (pen) {
			if (pen != d_data.rubberBandPen) {
				d_data.rubberBandPen = pen;
				this.updateDisplay();
			}
		}

		/*!
		\return Rubber band pen
		\sa setRubberBandPen(), rubberBand()
		 */
		this.rubberBandPen = function () {
			return d_data.rubberBandPen;
		}

		/*!
		Draw a rubber band, depending on rubberBand()

		\param painter Painter, initialized with a clip region

		\sa rubberBand(), RubberBand
		 */

		this.drawRubberBand = function (painter) {
			if (!this.isActive() || this.rubberBand() == Static.NoRubberBand ||
				this.rubberBandPen().style == Static.NoPen) {
				return;
			}

			/*const QPolygon*/
			var pa = this.adjustedPoints(d_data.pickedPoints);

			var selectionType = Static.NoSelection;

			if (d_data.stateMachine)
				selectionType = d_data.stateMachine.selectionType();

			switch (selectionType) {
			case Static.NoSelection:
			case Static.PointSelection: {
					if (pa.length < 1)
						return;

					/*const QPoint*/
					var pos = pa[0];

					///*const QRect*/ var pRect = this.pickArea().boundingRect().toRect();
					/*const QRect*/
					var pRect = this.pickArea();
					switch (this.rubberBand()) {
					case Static.VLineRubberBand: {
							painter.drawLine(pos.x, pRect.top(), pos.x, pRect.bottom());
							break;
						}
					case Static.HLineRubberBand: {
							painter.drawLine(pRect.left(), pos.y, pRect.right(), pos.y);
							break;
						}
					case Static.CrossRubberBand: {
							painter.drawLine(pos.x, pRect.top(), pos.x, pRect.bottom());
							painter.drawLine(pRect.left(), pos.y, pRect.right(), pos.y);
							break;
						}
					default:
						break;
					}
					break;
				}
			case Static.RectSelection: {
					if (pa.length < 2)
						return;

					///*const QRect*/ var rect = ( pa[0], pa[pa.length-1] ).normalized();
					/*const QRect*/
					var rect = new Misc.Rect(pa[0], pa[pa.length - 1]);
					rect = rect.normalized()
						switch (this.rubberBand()) {
						case Static.EllipseRubberBand: {
								painter.drawEllipse(rect);
								break;
							}
						case Static.RectRubberBand: {
								painter.drawRect(rect);
								break;
							}
						default:
							break;
						}
						break;
				}
			case Static.PolygonSelection: {
					if (pa.length < 2)
						return;
					if (this.rubberBand() == Static.PolygonRubberBand) {
						painter.drawPolyline(pa);
						//console.log(pa)
					}
					break;
				}
			default:
				break;
			}
		}

		/*!
		Draw the tracker

		\param painter Painter
		\sa trackerRect(), trackerText()
		 */
		this.drawTracker = function (painter) {
			var textRect = this.trackerRect(this.trackerFont());
			if (textRect !== null) {
				//this.clearTrackerCanvas();
				var label = this.trackerText(d_data.trackerPosition);
				if (label !== "") {
					//var trackerPainter = new PaintUtil.Painter(trackerCtx);
					//painter.save();
					//trackerPainter.setFont(m_trackerFont);
					//console.log(textRect.left())
					painter.drawText(label, textRect.left(), textRect.bottom());
					//trackerPainter.save();
				}
				//painter.drawText(label, d_data.trackerPosition.x, d_data.trackerPosition.y, Static.AlignLeft)
			}
		}

		/*!
		\brief Map the pickedPoints() into a selection()

		adjustedPoints() maps the points, that have been collected on
		the parentWidget() into a selection(). The default implementation
		simply returns the points unmodified.

		The reason, why a selection() differs from the picked points
		depends on the application requirements. F.e. :

		- A rectangular selection might need to have a specific aspect ratio only.\n
		- A selection could accept non intersecting polygons only.\n
		- ...\n

		The example below is for a rectangular selection, where the first
		point is the center of the selected rectangle.
		\par Example
		\verbatim QPolygon MyPicker::adjustedPoints(const QPolygon &points) const{
		QPolygon adjusted;
		if ( points.size() == 2 ){
		const int width = qAbs(points[1].x() - points[0].x());
		const int height = qAbs(points[1].y() - points[0].y());

		QRect rect(0, 0, 2 * width, 2 * height);
		rect.moveCenter(points[0]);

		adjusted += rect.topLeft();
		adjusted += rect.bottomRight();
		}
		return adjusted;
		}\endverbatim\n

		\param points Selected points
		\return Selected points unmodified
		 */
		this.adjustedPoints = function (points) {
			return points;
		}

		/*!
		\return Selected points
		\sa pickedPoints(), adjustedPoints()
		 */
		this.selection = function () {
			return this.adjustedPoints(d_data.pickedPoints);
		}

		//! \return Current position of the tracker
		this.trackerPosition = function () {
			return d_data.trackerPosition;
		}

		/*!
		Calculate the bounding rectangle for the tracker text
		from the current position of the tracker

		\param font Font of the tracker text
		\return Bounding rectangle of the tracker text

		\sa trackerPosition()
		 */
		this.trackerRect = function (font) {
			if (this.trackerMode() === Static.AlwaysOff) {
				return null;
			}

			if (this.trackerPosition().x < 0 || this.trackerPosition().y < 0)
				return null;

			var text = this.trackerText(this.trackerPosition());

			if (text == "")
				return null;

			var textSize = font.textSize(text);
			//console.log(textSize)

			//var textRect = {left:0, top:0, width:textSize.width, height:textSize.height, right:textSize.width, bottom:textSize.height };
			var textRect = new Misc.Rect(new Misc.Point(), textSize.width, textSize.height);
			var pos = this.trackerPosition();

			var alignment = 0;

			//if (/*isActive() &&*/ this.trackerPosition().length > 1 && this.rubberBand() != Static.NoRubberBand) {
			if (/*isActive() &&*/ m_pickedPoints.length.length > 1 && this.rubberBand() != Static.NoRubberBand) {
				var last = m_pickedPoints[0];

				alignment |= (pos.x >= last.x) ? Static.AlignRight : Static.AlignLeft;
				alignment |= (pos.y > last.y) ? Static.AlignBottom : Static.AlignTop;
			} else
				alignment = Static.AlignTop | Static.AlignRight;

			var margin = 5;

			var x = pos.x;
			if (alignment & Static.AlignLeft)
				x -= textRect.width() + margin;
			else if (alignment & Static.AlignRight)
				x += margin;

			var y = pos.y;
			if (alignment & Static.AlignBottom)
				y += margin;
			else if (alignment & Static.AlignTop)
				y -= textRect.height() + margin;

			textRect.moveTopLeft(new Misc.Point(x, y));

			//var pickRect = new Misc.Rect(new Misc.Point(), m_trackerCnvs[0].width, m_trackerCnvs[0].height);

			var pickRect = new Misc.Rect(new Misc.Point(), this.trackerOverlay().width(), this.trackerOverlay().height());
			var right = Math.min(textRect.right(), pickRect.right() - margin);
			var bottom = Math.min(textRect.bottom(), pickRect.bottom() - margin);
			textRect.moveBottomRight(new Misc.Point(right, bottom));

			var left = Math.max(textRect.left(), pickRect.left() + margin);
			var top = Math.max(textRect.top(), pickRect.top() + margin);
			textRect.moveTopLeft(new Misc.Point(left, top));

			/*console.log('w: ' +textRect.width())
			console.log('h: ' +textRect.height())
			console.log('l: ' +textRect.left())
			console.log('t: ' +textRect.top())*/

			return textRect;
		}

		/*!
		\brief Event filter

		When isEnabled() is true all events of the observed widget are filtered.
		Mouse and keyboard events are translated into widgetMouse- and widgetKey-
		and widgetWheel-events. Paint and Resize events are handled to keep
		rubber band and tracker up to date.

		\param object Object to be filtered
		\param event Event

		\return Always false.

		\sa widgetEnterEvent(), widgetLeaveEvent(),
		widgetMousePressEvent(), widgetMouseReleaseEvent(),
		widgetMouseDoubleClickEvent(), widgetMouseMoveEvent(),
		widgetWheelEvent(), widgetKeyPressEvent(), widgetKeyReleaseEvent(),
		QObject::installEventFilter(), QObject::event()
		 */
		this.eventFilter = function (/*QObject*/ object, event) {
			//console.log('eventFilter() called in qwtpicker')
			if(!this.isEnabled()) return false;
			if (object && object == this.parentWidget()) {
				switch (event.type) {
					/*case QEvent::Resize:{
					const QResizeEvent *re = static_cast<QResizeEvent *>( event );


					// Adding/deleting additional event filters inside of an event filter
					//is not safe dues to the implementation in Qt ( changing alist while iterating ).
					//So we create the overlays in a way, that they don't install en event filter
					//( parent set to NULL ) and do the resizing here.

					if ( d_data->trackerOverlay )
					d_data->trackerOverlay->resize( re->size() );

					if ( d_data->rubberBandOverlay )
					d_data->rubberBandOverlay->resize( re->size() );

					if ( d_data->resizeMode == Stretch )
					stretchSelection( re->oldSize(), re->size() );

					updateDisplay();
					break;
					}*/
					//case QEvent::Enter:
				case 'mouseenter': {
						this.widgetEnterEvent(event);
						break;
					}
					//case QEvent::Leave:
				case 'mouseleave': {
						this.widgetLeaveEvent(event);
						break;
					}
					//case QEvent::MouseButtonPress:
				case 'mousedown': {
						this.widgetMousePressEvent(event);
						break;
					}
					//case QEvent::MouseButtonRelease:
				case 'mouseup': {
						this.widgetMouseReleaseEvent(event);
						break;
					}
					//QEvent::MouseButtonDblClick:
				case 'dblclick': {
						this.widgetMouseDoubleClickEvent(event);
						break;
					}
					//case QEvent::MouseMove:
				case 'mousemove': {
						//console.log(event.clientX)
						this.widgetMouseMoveEvent(event);
						break;
					}
					//case QEvent::KeyPress:
				case 'keydown': {
						this.widgetKeyPressEvent(event);
						break;
					}
					//case QEvent::KeyRelease:
				case 'keyup': {
						this.widgetKeyReleaseEvent(event);
						break;
					}
					//case QEvent::Wheel:
				case 'mousewheel': {
						this.widgetWheelEvent(event);
						break;
					}
				default:
					break;
				}
			}
			return false;
		}

		/*!
		Passes an event to the state machine and executes the resulting
		commands. Append and Move commands use the current position
		of the cursor ( QCursor::pos() ).

		\param event Event
		 */
		this.transition = function (event) {
			if (!d_data.stateMachine)
				return;

			/*const QList<QwtPickerMachine::Command>*/
			var commandList =
				d_data.stateMachine.transition(this, event);

			var pos;
			switch (event.type) {
				//case QEvent::MouseButtonDblClick:
			case 'mousedown':
				//case QEvent::MouseButtonRelease:
			case 'mouseup':
				//case QEvent::MouseMove:
			case 'mousemove': {
					var me = event;
					//pos = this.parentWidget().mapToElement( new Misc.Point(me.clientX, me.clietY) );
					//console.log(me.clientY)
					pos = this.parentWidget().mapToElement(new Misc.Point(me.clientX, me.clientY));
					break;
				}
			default:
				//pos = this.parentWidget()->mapFromGlobal( QCursor::pos() );
				pos = this.parentWidget().mapToElement(new Misc.Point(0, 0));
			}

			for (var i = 0; i < commandList.length; i++) {
				switch (commandList[i]) {
				case Static.Begin: {
						this.begin();
						break;
					}
				case Static.Append: {
						this.append(pos);
						break;
					}
				case Static.Move: {
						this.move(pos);
						break;
					}
				case Static.Remove: {
						this.remove();
						break;
					}
				case Static.End: {
						this.end();
						break;
					}
				}
			}
		}

		/*!
		Reset the state machine and terminate ( end(false) ) the selection
		 */
		this.reset = function () {
			if (d_data.stateMachine)
				d_data.stateMachine.reset();

			if (this.isActive())
				this.end(false);
		}

		/*!
		Append a point to the selection and update rubber band and tracker.
		The appended() signal is emitted.

		\param pos Additional point

		\sa isActive(), begin(), end(), move(), appended()
		 */
		this.append = function (/*const QPoint*/ pos) {
			if (d_data.isActive) {
				/*var idx = d_data.pickedPoints.length;
				d_data.pickedPoints.resize( idx + 1 );
				d_data.pickedPoints[idx] = pos;*/

				//d_data.pickedPoints.resize( 0 )
				d_data.pickedPoints.push(pos);

				this.updateDisplay();
				//Q_EMIT appended( pos );
				Static.trigger('appended', pos)
			}
		}

		/*!
		Move the last point of the selection
		The moved() signal is emitted.

		\param pos New position
		\sa isActive(), begin(), end(), append()
		 */
		this.move = function (/*const QPoint*/ pos) {
			if (d_data.isActive) {
				var idx = d_data.pickedPoints.length - 1;
				if (idx >= 0) {
					if (d_data.pickedPoints[idx] != pos) {
						d_data.pickedPoints[idx] = pos;

						this.updateDisplay();

						//Q_EMIT moved( pos );
						Static.trigger('moved', pos)
					}
				}
			}
		}

		/*!
		Remove the last point of the selection
		The removed() signal is emitted.

		\sa isActive(), begin(), end(), append(), move()
		 */
		this.remove = function () {
			if (d_data.isActive) {
				var idx = d_data.pickedPoints.length - 1;
				if (idx > 0) {
					//var idx = d_data.pickedPoints.length;

					//var pos = d_data.pickedPoints[idx - 1];
					var pos = d_data.pickedPoints.pop()
						//d_data.pickedPoints.resize( idx - 1 );

						this.updateDisplay();
					Static.trigger('removed', pos);
				}
			}
		}

		/*!
		\brief Validate and fix up the selection

		Accepts all selections unmodified

		\param selection Selection to validate and fix up
		\return true, when accepted, false otherwise
		 */
		this.accept = function (/*QPolygon &*/ selection) {
			//Q_UNUSED( selection );
			return true;
		}

		/*!
		A picker is active between begin() and end().
		\return true if the selection is active.
		 */
		this.isActive = function () {
			return d_data.isActive;
		}

		/*!
		Return the points, that have been collected so far. The selection()
		is calculated from the pickedPoints() in adjustedPoints().
		\return Picked points
		 */
		this.pickedPoints = function () {
			return d_data.pickedPoints;
		}

		/*!
		Scale the selection by the ratios of oldSize and newSize
		The changed() signal is emitted.

		\param oldSize Previous size
		\param newSize Current size

		\sa ResizeMode, setResizeMode(), resizeMode()
		 */
		/*this.stretchSelection = function( const QSize &oldSize, const QSize &newSize )
	{
		if ( oldSize.isEmpty() )
	{
		// avoid division by zero. But scaling for small sizes also
		// doesn't make much sense, because of rounding losses. TODO ...
		return;
		}

		const double xRatio =
		double( newSize.width() ) / double( oldSize.width() );
		const double yRatio =
		double( newSize.height() ) / double( oldSize.height() );

		for ( int i = 0; i < int( d_data->pickedPoints.count() ); i++ )
	{
		QPoint &p = d_data->pickedPoints[i];
		p.setX( qRound( p.x() * xRatio ) );
		p.setY( qRound( p.y() * yRatio ) );

		Q_EMIT changed( d_data->pickedPoints );
		}
		}*/

		/*!
		Set mouse tracking for the observed widget.

		In case of enable is true, the previous value
		is saved, that is restored when enable is false.

		\warning Even when enable is false, mouse tracking might be restored
		to true. When mouseTracking for the observed widget
		has been changed directly by QWidget::setMouseTracking
		while mouse tracking has been set to true, this value can't
		be restored.
		 */

		this.setMouseTracking = function (enable) {
			var widget = this.parentWidget();
			if (!widget)
				return;

			if (enable) {
				d_data.mouseTracking = widget.hasMouseTracking();
				widget.setMouseTracking(true);
			} else {
				widget.setMouseTracking(d_data.mouseTracking);
			}
		}

		/*!
		Find the area of the observed widget, where selection might happen.

		\return parentWidget()->contentsRect()
		 */
		this.pickArea = function () {
			//QPainterPath path;

			var widget = this.parentWidget();
			if (widget)
				return (widget.contentsRect());
			return null

			//return path;
		}

		//! Update the state of rubber band and tracker label
		this.updateDisplay = function () {
			/*QWidget*/
			var w = this.parentWidget();

			var showRubberband = false;
			var showTracker = false;

			if (w && w.isVisible() && d_data.enabled) {
				if (this.rubberBand() !== Static.NoRubberBand && this.isActive() &&
					this.rubberBandPen().style !== Static.NoPen) {
					showRubberband = true;
				}

				if (this.trackerMode() == Static.AlwaysOn ||
					(this.trackerMode() == Static.ActiveOnly && this.isActive())) {
					if (this.trackerPen() != Static.NoPen)
						//&& !this.trackerRect( QFont() ).isEmpty() )
					{
						showTracker = true;
					}
				}
			}

			/*QPointer< QwtPickerRubberband >*/
			var rw = d_data.rubberBandOverlay;
			if (showRubberband) {
				//if ( rw.isNull() )
				if (rw == null) {
					//rw = new PickerRubberband( this, null ); // NULL -> no extra event filter
					rw = new PickerRubberband(this, w);
					//console.log("rubberBandOverlay created")
					rw.setObjectName("PickerRubberBand");
					d_data.rubberBandOverlay = rw
						//rw.setParent( w );
						//rw->resize( w->size() );
				}

				//if ( d_data.rubberBand <= Static.RectRubberBand )
				//rw->setMaskMode( QwtWidgetOverlay::MaskHint );
				//else
				//rw->setMaskMode( QwtWidgetOverlay::AlphaMask );

				rw.updateOverlay();
			} else {
				/*if ( d_data->openGL ){
				// Qt 4.8 crashes for a delete
				if ( !rw.isNull() ){
				rw->hide();
				rw->deleteLater();
				rw = NULL;
				}
				}
				else{
				delete rw;
				}*/
				if (rw) {
					d_data.rubberBandOverlay.getCanvas().hide()
					delete d_data.rubberBandOverlay.getCanvas()
					d_data.rubberBandOverlay = null
				}
			}

			/*QPointer< QwtPickerTracker >*/
			var tw = d_data.trackerOverlay;
			if (showTracker) {
				//if ( tw.isNull() )
				if (tw == null) {

					//tw = new PickerTracker( this, null ); // NULL -> no extra event filter
					tw = new PickerTracker(this, w);
					//console.log("trackerOverlay created")
					tw.setObjectName("PickerTracker");
					d_data.trackerOverlay = tw
						//tw.setParent( w );
						// tw->resize( w->size() );
				}
				//tw.setFont( d_data.trackerFont );
				tw.updateOverlay();
			} else {
				/*if ( d_data->openGL ){
				// Qt 4.8 crashes for a delete
				if ( !tw.isNull() ){
				tw->hide();
				tw->deleteLater();
				tw = NULL;
				}
				}*/
				/* else
			{
				delete tw;
				}*/

				if (tw) {
					//d_data.trackerOverlay.clearCanvas()
					//d_data.trackerOverlay = null
					d_data.trackerOverlay.getCanvas().hide()
					delete d_data.trackerOverlay.getCanvas()
					d_data.trackerOverlay = null
				}
			}
		}

		//! \return Overlay displaying the rubber band
		this.rubberBandOverlay = function () {
			return d_data.rubberBandOverlay;
		}

		//! \return Overlay displaying the tracker text
		this.trackerOverlay = function () {
			return d_data.trackerOverlay;
		}

		/*this.widgetMouseReleaseEvent = function( mouseEvent ) {
		this.transition( mouseEvent );
		}*/

		if (rubberBand == undefined && trackerMode == undefined)
			this.init(parent, Static.NoRubberBand, Static.AlwaysOff);
		else
			this.init(parent, rubberBand, trackerMode);

	}

	/*!
	Handle a enter event for the observed widget.

	\param event Qt event

	\sa eventFilter(), widgetMousePressEvent(), widgetMouseReleaseEvent(),
	widgetMouseDoubleClickEvent(),
	widgetWheelEvent(), widgetKeyPressEvent(), widgetKeyReleaseEvent()
	 */
	widgetEnterEvent(event) {
		this.transition(event);
	}

	/*!
	Handle a leave event for the observed widget.

	\param event Qt event

	\sa eventFilter(), widgetMousePressEvent(), widgetMouseReleaseEvent(),
	widgetMouseDoubleClickEvent(),
	widgetWheelEvent(), widgetKeyPressEvent(), widgetKeyReleaseEvent()
	 */
	widgetLeaveEvent(event) {
		this.transition(event);

		this.getPickerData().trackerPosition = new Misc.Point(-1, -1);
		if (!this.isActive())
			this.updateDisplay();
	}

	/*!
	Handle a key release event for the observed widget.

	Passes the event to the state machine.

	\param keyEvent Key event

	\sa eventFilter(), widgetMousePressEvent(), widgetMouseReleaseEvent(),
	widgetMouseDoubleClickEvent(), widgetMouseMoveEvent(),
	widgetWheelEvent(), widgetKeyPressEvent(), stateMachine()
	 */
	widgetKeyReleaseEvent(keyEvent) {
		this.transition(keyEvent);
	}

	/*!
	Handle a wheel event for the observed widget.

	Move the last point of the selection in case of isActive() == true

	\param wheelEvent Wheel event

	\sa eventFilter(), widgetMousePressEvent(), widgetMouseReleaseEvent(),
	widgetMouseDoubleClickEvent(), widgetMouseMoveEvent(),
	widgetKeyPressEvent(), widgetKeyReleaseEvent()
	 */
	widgetWheelEvent(wheelEvent) {
		var pos = new Misc.Point(wheelEvent.clientX, wheelEvent.clientY)
			if (this.pickArea().contains(pos))
				this.getPickerData().trackerPosition = pos;
			else
				this.getPickerData().trackerPosition = new Misc.Point(-1, -1);

			this.updateDisplay();

		this.transition(wheelEvent);
	}

	/*!
	Handle mouse double click event for the observed widget.

	\param mouseEvent Mouse event

	\sa eventFilter(), widgetMousePressEvent(), widgetMouseReleaseEvent(),
	widgetMouseMoveEvent(),
	widgetWheelEvent(), widgetKeyPressEvent(), widgetKeyReleaseEvent()
	 */
	widgetMouseDoubleClickEvent(mouseEvent) {
		this.transition(mouseEvent);
	}

	/*!
	Handle a mouse move event for the observed widget.

	\param mouseEvent Mouse event

	\sa eventFilter(), widgetMousePressEvent(), widgetMouseReleaseEvent(),
	widgetMouseDoubleClickEvent(),
	widgetWheelEvent(), widgetKeyPressEvent(), widgetKeyReleaseEvent()
	 */
	widgetMouseMoveEvent(mouseEvent) {
		var pos = this.mapToElement(new Misc.Point(mouseEvent.clientX, mouseEvent.clientY));
		//var pos = new Misc.Point(mouseEvent.clientX, mouseEvent.clientY)
		if (this.pickArea().contains(pos))
			this.getPickerData().trackerPosition = pos;
		else
			this.getPickerData().trackerPosition = new Misc.Point(-1, -1);

		if (!this.isActive())
			this.updateDisplay();

		this.transition(mouseEvent);
	}

	/*!
	Handle a mouse press event for the observed widget.

	\param mouseEvent Mouse event

	\sa eventFilter(), widgetMouseReleaseEvent(),
	widgetMouseDoubleClickEvent(), widgetMouseMoveEvent(),
	widgetWheelEvent(), widgetKeyPressEvent(), widgetKeyReleaseEvent()
	 */
	widgetMousePressEvent(mouseEvent) {
		this.transition(mouseEvent);
	}

	/*!
	Handle a key press event for the observed widget.

	Selections can be completely done by the keyboard. The arrow keys
	move the cursor, the abort key aborts a selection. All other keys
	are handled by the current state machine.

	\param keyEvent Key event

	\sa eventFilter(), widgetMousePressEvent(), widgetMouseReleaseEvent(),
	widgetMouseDoubleClickEvent(), widgetMouseMoveEvent(),
	widgetWheelEvent(), widgetKeyReleaseEvent(), stateMachine(),
	QwtEventPattern::KeyPatternCode
	 */
	widgetKeyPressEvent(keyEvent) {
		var dx = 0;
		var dy = 0;

		var offset = 1;
		// if ( keyEvent->isAutoRepeat() )
		//offset = 5;

		if (this.keyMatch(KeyLeft, keyEvent))
			dx = -offset;
		else if (this.keyMatch(KeyRight, keyEvent))
			dx = offset;
		else if (this.keyMatch(KeyUp, keyEvent))
			dy = -offset;
		else if (this.keyMatch(KeyDown, keyEvent))
			dy = offset;
		else if (this.keyMatch(KeyAbort, keyEvent)) {
			this.reset();
		} else
			this.transition(keyEvent);

		if (dx !== 0 || dy !== 0) {
			///*const QRect* rect = pickArea().boundingRect().toRect();
			/*const QRect*/
			var rect = pickArea() //.boundingRect().toRect();
				/*const QPoint*/
				var pos = this.parentWidget().mapToElement(new Misc.Point(clientX, clientY));

			var x = pos.x + dx;
			x = Math.max(rect.left(), x);
			x = Math.min(rect.right(), x);

			var y = pos.y + dy;
			y = Math.max(rect.top(), y);
			y = Math.min(rect.bottom(), y);

			//QCursor::setPos( parentWidget()->mapToGlobal( QPoint( x, y ) ) );
		}
	}

	/*!
	Handle a mouse release event for the observed widget.

	\param mouseEvent Mouse event

	\sa eventFilter(), widgetMousePressEvent(),
	widgetMouseDoubleClickEvent(), widgetMouseMoveEvent(),
	widgetWheelEvent(), widgetKeyPressEvent(), widgetKeyReleaseEvent()
	 */
	widgetMouseReleaseEvent(mouseEvent) {
		this.transition(mouseEvent);
	}

	/*!
	\brief Close a selection setting the state to inactive.

	The selection is validated and maybe fixed by accept().

	\param ok If true, complete the selection and emit a selected signal
	otherwise discard the selection.
	\return true if the selection is accepted, false otherwise
	\sa isActive(), begin(), append(), move(), selected(), accept()
	 */
	end(ok) {
		var d = this.getPickerData();
		if (d.isActive) {
			this.setMouseTracking(false);

			d.isActive = false;
			//Q_EMIT activated( false );
			Static.trigger('activated', false);

			if (this.trackerMode() == Static.ActiveOnly)
				d.trackerPosition = new Misc.Point(-1, -1);

			if (ok)
				ok = this.accept(d.pickedPoints);

			if (ok)
				//Q_EMIT selected( d_data->pickedPoints );
				Static.trigger('selected', d.pickedPoints);
			else
				d.pickedPoints.resize(0);

			this.updateDisplay();
		} else
			ok = false;

		return ok;
	}

	/*!
	Open a selection setting the state to active

	\sa isActive(), end(), append(), move()
	 */
	begin() {
		var d = this.getPickerData();
		if (!d)
			return;
		if (d.isActive)
			return;

		d.pickedPoints = []//.resize( 0 );
		d.isActive = true;
		//Q_EMIT activated( true );
		Static.trigger('activated', true);

		if (this.trackerMode() !== Static.AlwaysOff) {
			if (d.trackerPosition.x < 0 || d.trackerPosition.y < 0) {
				var w = this.parentWidget();
				if (w)
					//d_data.trackerPosition = w->mapFromGlobal( QCursor::pos() );
					d.trackerPosition = w.mapToElement(new Misc.Point(0, 0));
			}
		}

		this.updateDisplay();
		this.setMouseTracking(true);
	}

	/*!
	\brief Return the label for a position

	In case of HLineRubberBand the label is the value of the
	y position, in case of VLineRubberBand the value of the x position.
	Otherwise the label contains x and y position separated by a ',' .

	The format for the string conversion is "%d".

	\param pos Position
	\return Converted position as string
	 */
	trackerText(pos) {
		//pos =  this.invTransform( pos )
		var label //= "";

		switch (this.rubberBand()) {
		case Static.HLineRubberBand:
			label = pos.y.toString();
			break;
		case Static.VLineRubberBand:
			label = pos.x.toString();
			break;
		default:
			label = pos.x.toString() + ", " + pos.y.toString();
		}
		return label;
	}

} //////////////////


Picker.pickers = [];

define("qwtpicker", ["static","widgetOverlay","qwtpickermachine"], function(){});


/*!
  \brief QwtPlotPicker provides selections on a plot canvas

  QwtPlotPicker is a QwtPicker tailored for selections on
  a plot canvas. It is set to a x-Axis and y-Axis and
  translates all pixel coordinates into this coordinate system.
*/

/*!
  \brief Create a plot picker

  The picker is set to those x- and y-axis of the plot
  that are enabled. If both or no x-axis are enabled, the picker
  is set to QwtPlot::xBottom. If both or no y-axis are
  enabled, it is set to QwtPlot::yLeft.

  \param canvas Plot canvas to observe, also the parent object

  \sa QwtPlot::autoReplot(), QwtPlot::replot(), scaleRect()
*/
//( int xAxis, int yAxis, QWidget *canvas )
class PlotPicker extends Picker {
    constructor(xAxis, yAxis, rubberBand, trackerMode, /*QWidget **/canvas ) {
      var _constructor = 0
      
      if(typeof (xAxis) !== 'number'){ //constructor 1
          /*PlotPicker( QWidget *canvas );*/
          canvas = xAxis
          xAxis = -1
          yAxis = -1
          rubberBand = Static.NoRubberBand
          trackerMode = Static.AlwaysOff
          _constructor = 1 //indicate the constructor to use
      }
      if(typeof (rubberBand) !== 'number'){ //constructor 2
          /*PlotPicker( int xAxis, int yAxis,/* QWidget */ /*canvas)*/
          canvas = rubberBand
          rubberBand = Static.NoRubberBand
          trackerMode = Static.AlwaysOff
          _constructor = 2 //indicate the constructor to use
      }

      if(canvas instanceof Plot)
          canvas = canvas.getCentralWidget()

      super(rubberBand, trackerMode, canvas)
      this.d_xAxis = -1;
      this.d_yAxis = -1;
     
     if(_constructor == 1){     

        var plot = this.plot();
        var xAxis = xBottom;
        if (plot && !plot.axisEnabled( xBottom ) && plot.axisEnabled(xTop ) )
        {
            xAxis = xTop;
        }

        var yAxis = yLeft;
        if (plot &&  !plot.axisEnabled( yLeft ) && plot.axisEnabled( yRight ) )
        {
            yAxis = yRight;
        }

        this.setAxis( xAxis, yAxis );
      }
      else{    

          this.d_xAxis = xAxis;
          this.d_yAxis = yAxis;
      }

     this.setEnabled(true) 
     if(canvas) 
          canvas.setEnabled_1(true)     
  }//////////////////////////////////////////////////////////////////


   setAxis( xAxis, yAxis ){
      var plt = this.plot();
      if ( !plt )
          return;

      if ( xAxis != this.d_xAxis || yAxis != this.d_yAxis )
      {
          this.d_xAxis = xAxis;
          this.d_yAxis = yAxis;
      }
   }

    xAxis(){
        return this.d_xAxis;
    }
    yAxis(){
        return this.d_yAxis;
    }

    plot(){
      var w = this.parentWidget()
      if(!w)
        return null
      return w.plot;

    }
    
    /*const QWidget *canvas() const;*/
    canvas(){
        return this.parentWidget();
    }
    

//Q_SIGNALS:

    /*!
      A signal emitted in case of QwtPickerMachine::PointSelection.
      \param pos Selected point
    */
    //void selected( const QPointF &pos );

    /*!
      A signal emitted in case of QwtPickerMachine::RectSelection.
      \param rect Selected rectangle
    */
    //void selected( const QRectF &rect );

    /*!
      A signal emitting the selected points,
      at the end of a selection.

      \param pa Selected points
    */
    //void selected( const QVector<QPointF> &pa );

    /*!
      A signal emitted when a point has been appended to the selection

      \param pos Position of the appended point.
      \sa append(). moved()
    */
    //void appended( const QPointF &pos );

    /*!
      A signal emitted whenever the last appended point of the
      selection has been moved.

      \param pos Position of the moved last point of the selection.
      \sa move(), appended()
    */
    //void moved( const QPointF &pos );

//protected:
    /*QRectF */scaleRect(){
        var rect = null;
        if ( this.plot() )
        {
            var xs = this.plot().axisScaleDiv( this.xAxis() );
            var ys = this.plot().axisScaleDiv( this.yAxis() );

            rect = new Misc.Rect( xs.lowerBound(), ys.lowerBound(),
                xs.range(), ys.range() );
            rect = rect.normalized();
        }

        return rect;
    }

    /*!
    Translate a point from pixel into plot coordinates
    \return Point in plot coordinates
    \sa transform()
*/
/*QPointF QwtPlotPicker::invTransform( const QPoint &pos ) const
{
    QwtScaleMap xMap = plot()->canvasMap( d_xAxis );
    QwtScaleMap yMap = plot()->canvasMap( d_yAxis );

    return QPointF(
        xMap.invTransform( pos.x() ),
        yMap.invTransform( pos.y() )
    );
}*/

    /*!
    Translate a rectangle from pixel into plot coordinates
    \return Rectangle in plot coordinates
    \sa transform()
*/
    /*QRectF */invTransform( /*const QRect &*/ rect){
      var xMap = this.plot().canvasMap( this.d_xAxis );
      var yMap = this.plot().canvasMap( this.d_yAxis );
      if(rect.x !== undefined){ //argument is a point
          var pos = rect
          return new Misc.Point(xMap.invTransform( pos.x ), yMap.invTransform( pos.y ));
      }else{//argument is a rect
        /*var xMap = this.plot().canvasMap( this.d_xAxis );
        var yMap = this.plot().canvasMap( this.d_yAxis );*/
        //return QwtScaleMap::invTransform( xMap, yMap, rect );
        return Static.mInvTransform( xMap, yMap, rect)
    }
  }

  /*
  QPoint QwtPlotPicker::transform( const QPointF &pos ) const
{
    QwtScaleMap xMap = plot()->canvasMap( d_xAxis );
    QwtScaleMap yMap = plot()->canvasMap( d_yAxis );

    const QPointF p( xMap.transform( pos.x() ),
        yMap.transform( pos.y() ) );

    return p.toPoint();
}

  */


    /*!
    Translate a rectangle from plot into pixel coordinates
    \return Rectangle in pixel coordinates
    \sa invTransform()
*/
    /*QRect */transform(/* const QRectF &*/ rect){
      var xMap = this.plot().canvasMap( this.d_xAxis );
      var yMap = this.plot().canvasMap( this.d_yAxis );
      if(rect.x !== undefined){ //argument is a point
          var pos = rect
          var p = new Misc.Point( xMap.transform( pos.x ),
          yMap.transform( pos.y) );

          return p//.toPoint();
      } else{

      //return QwtScaleMap::transform( xMap, yMap, rect ).toRect();
      return Static.mTransform( xMap, yMap, rect );
    }
  }

    /*QwtText QwtPlotPicker::trackerText( const QPoint &pos ) const
{
    return trackerTextF( invTransform( pos ) );
}*/

    //QPointF invTransform( const QPoint & ) const;
    //QPoint transform( const QPointF & ) const;

    /*virtual QwtText */trackerText(/* const QPointF &*/ pos){
      pos =  this.invTransform( pos )
      var label //= "";

        switch (this.rubberBand()) {
        case Static.HLineRubberBand:
            label = pos.y.toString();
            break;
        case Static.VLineRubberBand:
            label = pos.x.toString();
            break;
        default:
            label = pos.x.toString() + ", " + pos.y.toString();
        }
        return label;

    }

    /*!
  Move the last point of the selection

  \param pos New position
  \sa isActive, begin(), end(), append()

  \note The moved(const QPoint &), moved(const QDoublePoint &)
        signals are emitted.
*/
    move( /*const QPoint &*/ pos){
      super.method(move( pos ));
    //Q_EMIT moved( invTransform( pos )
      Static.trigger('moved', invTransform( pos ))

     }


    /*!
  Append a point to the selection and update rubber band and tracker.

  \param pos Additional point
  \sa isActive, begin(), end(), move(), appended()

  \note The appended(const QPoint &), appended(const QDoublePoint &)
        signals are emitted.
*/
    append( /*const QPoint & */pos) {
         super.method(append( pos ));
        //Q_EMIT appended( invTransform( pos ) );
        Static.trigger('appended', invTransform( pos ))
    }


    /*!
  Close a selection setting the state to inactive.

  \param ok If true, complete the selection and emit selected signals
            otherwise discard the selection.
  \return True if the selection has been accepted, false otherwise
*/
    /*virtual bool*/ end( ok = true ){
        ok = super.end( ok );
        //console.log(ok)
        if ( !ok )
            return false;

        var plot = this.plot();
        if ( !plot )
            return false;

        /*const QPolygon*/ var points = this.selection();
        if ( points.length == 0 )
            return false;

        var selectionType = Static.NoSelection;

        if ( this.stateMachine() )
            selectionType = this.stateMachine().selectionType();

        switch ( selectionType )
        {
            case Static.PointSelection:
            {
                /*onst QPointF*/ var pos = this.invTransform( points[0] );
                //Q_EMIT selected( pos );
                 Static.trigger('selected',  pos )
                break;
            }
            case Static.RectSelection:
            {
                if ( points.length >= 2 )
                {
                    /*const QPoint*/var p1 = points[0];
                    /*const QPoint*/var p2 = points[points.length - 1];

                    /*const QRect*/var rect = new Misc.Rect( p1, p2 ).normalized();
                    //Q_EMIT selected( invTransform( rect ) );
                    Static.trigger('selected', this.invTransform( rect ) )
                }
                break;
            }
            case Static.PolygonSelection:
            {
                /*QVector<QPointF>*/var dpa = [];//( points.count() );
                for ( var i = 0; i < points.length; i++ )
                    dpa.push( this.invTransform( points[i] ));

                //Q_EMIT selected( dpa );
                Static.trigger('selected', dpa )
            }
            default:
                break;
        }

        return true;

    }

/*private:
    int d_xAxis;
    int d_yAxis;*/
};



define("qwtplotpicker", ["static","qwtpicker"], function(){});

/*!
\brief QwtPlotZoomer provides stacked zooming for a plot widget

QwtPlotZoomer selects rectangles from user inputs ( mouse or keyboard )
translates them into plot coordinates and adjusts the axes to them.
The selection is supported by a rubber band and optionally by displaying
the coordinates of the current mouse position.

Zooming can be repeated as often as possible, limited only by
maxStackDepth() or minZoomSize().  Each rectangle is pushed on a stack.

The default setting how to select rectangles is
a QwtPickerDragRectMachine with the following bindings:

- QwtEventPattern::MouseSelect1\n
The first point of the zoom rectangle is selected by a mouse press,
the second point from the position, where the mouse is released.

- QwtEventPattern::KeySelect1\n
The first key press selects the first, the second key press
selects the second point.

- QwtEventPattern::KeyAbort\n
Discard the selection in the state, where the first point
is selected.

To traverse the zoom stack the following bindings are used:

- QwtEventPattern::MouseSelect3, QwtEventPattern::KeyUndo\n
Zoom out one position on the zoom stack

- QwtEventPattern::MouseSelect6, QwtEventPattern::KeyRedo\n
Zoom in one position on the zoom stack

- QwtEventPattern::MouseSelect2, QwtEventPattern::KeyHome\n
Zoom to the zoom base

The setKeyPattern() and setMousePattern() functions can be used
to configure the zoomer actions. The following example
shows, how to configure the 'I' and 'O' keys for zooming in and out
one position on the zoom stack. The "Home" key is used to
"unzoom" the plot.

\code
zoomer = new QwtPlotZoomer( plot );
zoomer->setKeyPattern( QwtEventPattern::KeyRedo, Qt::Key_I, Qt::ShiftModifier );
zoomer->setKeyPattern( QwtEventPattern::KeyUndo, Qt::Key_O, Qt::ShiftModifier );
zoomer->setKeyPattern( QwtEventPattern::KeyHome, Qt::Key_Home );
\endcode

QwtPlotZoomer is tailored for plots with one x and y axis, but it is
allowed to attach a second QwtPlotZoomer ( without rubber band and tracker )
for the other axes.

\note The realtime example includes an derived zoomer class that adds
scrollbars to the plot canvas.

\sa QwtPlotPanner, QwtPlotMagnifier
 */

class PrivateData_2 {
	constructor() {
		this.zoomRectIndex;
		/*QStack<QRectF>*/
		this.zoomStack = [];

		this.maxStackDepth;
	}
};

class PlotZoomer extends PlotPicker {
	constructor(xAxis, yAxis, /*QWidget **/ canvas, doReplot = true) {
		if (typeof(xAxis) !== 'number') { //first argument is a widget
			canvas = xAxis
				super(canvas)
		} else {
			super(xAxis, yAxis, canvas)
		}

		/*if ( canvas )
		this.init( doReplot );*/

		var self = this;

		/*PrivateData*/
		var d_data;

		this.getZoomerData = function () {
			return d_data
		}

		//! Init the zoomer, used by the constructors
		this.init = function (doReplot) {
			d_data = new PrivateData_2();

			d_data.maxStackDepth = -1;

			this.setTrackerMode(Static.ActiveOnly);
			//this.setTrackerMode( Static.AlwaysOn );
			this.setRubberBand(Static.RectRubberBand);
			this.setStateMachine(new PickerDragRectMachine());

			this.plot().zoomer = this;

			Static.trigger('zoomerAdded', this)

			if (doReplot && this.plot()){				
				this.plot().replot();
			}

			this.setZoomBase(this.scaleRect());
		}

		/*!
		Reinitialized the zoom stack with scaleRect() as base.

		\param doReplot Call QwtPlot::replot() for the attached plot before initializing
		the zoomer with its scales. This might be necessary,
		when the plot is in a state with pending scale changes.

		\sa zoomBase(), scaleRect() QwtPlot::autoReplot(), QwtPlot::replot().
		 */
		this.setZoomBase = function (doReplot = true) { //or  /*setZoomBase( const QRectF & );*/
			if (typeof(doReplot) == 'object') {
				var base = doReplot
					var plt = this.plot();
				if (!plt)
					return;

				/*const QRectF*/
				var sRect = this.scaleRect();
				/*const QRectF*/
				var bRect = base | sRect;
				var bRect = null
					if (!base)
						bRect = sRect 
          else
						bRect = base

				//d_data.zoomStack.clear();
				d_data.zoomStack = [];
				d_data.zoomStack.push(bRect);
				d_data.zoomRectIndex = 0;

				if (!base.isEqual(sRect)) {
					d_data.zoomStack.push(sRect);
					d_data.zoomRectIndex++;
				}

				this.rescale();

			} else {

				var plt = this.plot();
				if (plt == null)
					return;

				if (doReplot)
					plt.replot();

				//d_data.zoomStack.clear();
				d_data.zoomStack = []
				d_data.zoomStack.push(this.scaleRect());
				d_data.zoomRectIndex = 0;

				this.rescale();
			}
		}

		/*!
		\return Initial rectangle of the zoomer
		\sa setZoomBase(), zoomRect()
		 */
		/*QRectF */
		this.zoomBase = function () {
			return d_data.zoomStack[0];
		}

		/*!
		\return Rectangle at the current position on the zoom stack.
		\sa zoomRectIndex(), scaleRect().
		 */
		/*QRectF*/
		this.zoomRect = function () {
			return d_data.zoomStack[d_data.zoomRectIndex];
		}

		/*!
		\brief Limit the number of recursive zoom operations to depth.

		A value of -1 set the depth to unlimited, 0 disables zooming.
		If the current zoom rectangle is below depth, the plot is unzoomed.

		\param depth Maximum for the stack depth
		\sa maxStackDepth()
		\note depth doesn't include the zoom base, so zoomStack().count() might be
		maxStackDepth() + 1.
		 */
		this.setMaxStackDepth = function (depth) {
			d_data.maxStackDepth = depth;

			if (depth >= 0) {
				// unzoom if the current depth is below d_data2->maxStackDepth

				/*const int*/
				var zoomOut =
					(d_data.zoomStack.length) - 1 - depth; // -1 for the zoom base

				if (zoomOut > 0) {
					this.zoom(-zoomOut);
					for (var i = (d_data.zoomStack.length) - 1;
						i > (d_data.zoomRectIndex); i--) {
						d_data.zoomStack.pop(); // remove trailing rects
					}
				}
			}
		}

		/*!
		\return Maximal depth of the zoom stack.
		\sa setMaxStackDepth()
		 */
		this.maxStackDepth = function () {
			return d_data.maxStackDepth;
		}

		/*!
		\return The zoom stack. zoomStack()[0] is the zoom base,
		zoomStack()[1] the first zoomed rectangle.

		\sa setZoomStack(), zoomRectIndex()

		/*QStack<QRectF>*/
		this.zoomStack = function () {
			return d_data.zoomStack;
		}

		/*!
		\brief Assign a zoom stack

		In combination with other types of navigation it might be useful to
		modify to manipulate the complete zoom stack.

		\param zoomStack New zoom stack
		\param zoomRectIndex Index of the current position of zoom stack.
		In case of -1 the current position is at the top
		of the stack.

		\note The zoomed signal might be emitted.
		\sa zoomStack(), zoomRectIndex()
		 */
		this.setZoomStack = function (/*QStack<QRectF>*/ zoomStack, zoomRectIndex = -1) {
			if (this.zoomStack.length == 0)
				return;

			if (d_data.maxStackDepth >= 0 &&
				(this.zoomStack.length) > d_data.maxStackDepth) {
				return;
			}

			if (zoomRectIndex < 0 || zoomRectIndex > (this.zoomStack.length))
				zoomRectIndex = zoomStack.length - 1;

			var doRescale = this.zoomStack[zoomRectIndex] != this.zoomRect();

			d_data.zoomStack = zoomStack;
			d_data.zoomRectIndex = zoomRectIndex;

			if (doRescale) {
				this.rescale();
				//Q_EMIT zoomed( zoomRect() );
				Static.trigger('zoomed', this.zoomRect())
			}

		}

		/*!
		\return Index of current position of zoom stack.
		 */
		this.zoomRectIndex = function () {
			return d_data.zoomRectIndex;
		}

		//public Q_SLOTS:

		/*!
		Move the current zoom rectangle.

		\param dx X offset
		\param dy Y offset

		\note The changed rectangle is limited by the zoom base
		 */
		this.moveBy = function (dx, dy) {
			/*const QRectF*/
			var rect = d_data.zoomStack[d_data.zoomRectIndex];
			moveTo(new Misc.Point(rect.left() + dx, rect.top() + dy));
		}

		/*!
		Move the the current zoom rectangle.

		\param pos New position

		\sa QRectF::moveTo()
		\note The changed rectangle is limited by the zoom base
		 */
		this.moveTo = function (/*const QPointF*/ pos) {
			var x = pos.x;
			var y = pos.y;

			if (x < this.zoomBase().left())
				x = this.zoomBase().left();
			if (x > this.zoomBase().right() - this.zoomRect().width())
				x = this.zoomBase().right() - this.zoomRect().width();

			if (y < this.zoomBase().top())
				y = this.zoomBase().top();
			if (y > this.zoomBase().bottom() - this.zoomRect().height())
				y = this.zoomBase().bottom() - this.zoomRect().height();

			if (x != this.zoomRect().left() || y != this.zoomRect().top()) {
				d_data.zoomStack[d_data.zoomRectIndex].moveTo(x, y);
				this.rescale();
			}
		}

		/*!
		\brief Zoom in

		Clears all rectangles above the current position of the
		zoom stack and pushes the normalized rectangle on it.

		\note If the maximal stack depth is reached, zoom is ignored.
		\note The zoomed signal is emitted.
		 */
		this.zoom = function (/*QRectF*/ rect) { //or /*virtual void zoom( int up );*/
			if (typeof(rect) == 'number') {
				var offset = rect;
				if (offset == 0)
					d_data.zoomRectIndex = 0;
				else {
					var newIndex = d_data.zoomRectIndex + offset;
					newIndex = Math.max(0, newIndex);
					newIndex = Math.min((d_data.zoomStack.length) - 1, newIndex);

					d_data.zoomRectIndex = newIndex;
				}

				this.rescale();

				//Q_EMIT zoomed( zoomRect() );
				Static.trigger('zoomed', this.zoomRect())
			} else {

				if (d_data.maxStackDepth >= 0 &&
					(d_data.zoomRectIndex) >= d_data.maxStackDepth) {
					return;
				}

				/*const QRectF*/
				//console.log(rect.right())
				var zoomRect = rect.normalized();
				//console.log(rect.right())
				if (!zoomRect.isEqual(d_data.zoomStack[d_data.zoomRectIndex])) {
					for (var i = (d_data.zoomStack.length) - 1;
						i > d_data.zoomRectIndex; i--) {
						d_data.zoomStack.pop();
					}

					d_data.zoomStack.push(zoomRect);
					d_data.zoomRectIndex++;

					this.rescale();

					//Q_EMIT zoomed( zoomRect );
					Static.trigger('zoomed', zoomRect)
				}
			}
		}

		//Q_SIGNALS:
		/*!
		A signal emitting the zoomRect(), when the plot has been
		zoomed in or out.

		\param rect Current zoom rectangle.
		 */

		//void zoomed( const QRectF &rect );

		//protected:

		/*!
		Adjust the observed plot to zoomRect()

		\note Initiates QwtPlot::replot()
		 */
		this.rescale = function () {
			var plt = this.plot();
			if (!plt)
				return;

			var rect = d_data.zoomStack[d_data.zoomRectIndex];
			/*if ( rect !== this.scaleRect() )*/
			if (!rect.isEqual(this.scaleRect())) {
				var doReplot = plt.autoReplot();
				plt.setAutoReplot(false);

				var x1 = rect.left();
				var x2 = rect.right();
				if (!plt.axisScaleDiv(this.xAxis()).isIncreasing()) {
					//qSwap( x1, x2 );
					var temp = x1
						x1 = x2
						x2 = x1
				}

				plt.setAxisScale(this.xAxis(), x1, x2);

				var y1 = rect.top();
				var y2 = rect.bottom();
				if (!plt.axisScaleDiv(this.yAxis()).isIncreasing()) {
					//qSwap( y1, y2 );
					var temp = y1
						y1 = y2
						y2 = y1
				}

				plt.setAxisScale(this.yAxis(), y1, y2);

				plt.setAutoReplot(doReplot);

				plt.replot();
			}

		}

		/*!
		\brief Limit zooming by a minimum rectangle

		\return zoomBase().width() / 10e4, zoomBase().height() / 10e4
		 */
		/*QSizeF*/
		this.minZoomSize = function () {
			return new Misc.Size(d_data.zoomStack[0].width() / 10e4,
				d_data.zoomStack[0].height() / 10e4);
		}

		/*!
		\brief Check and correct a selected rectangle

		Reject rectangles with a height or width < 2, otherwise
		expand the selected rectangle to a minimum size of 11x11
		and accept it.

		\return true If the rectangle is accepted, or has been changed
		to an accepted one.
		 */
		this.accept = function (/*QPolygon*/ pa) {
			if (pa.length < 2)
				return false;

			var rect = new Misc.Rect(pa[0], pa[pa.length - 1]);
			rect = rect.normalized();

			var minSize = 2;
			if (rect.width() < minSize && rect.height() < minSize)
				return false;

			var minZoomSize = 11;

			/*const QPoint*/
			var center = rect.center();
			rect.setSize(rect.size().expandedTo(new Misc.Size(minZoomSize, minZoomSize)));
			rect.moveCenter(center);

			pa.resize(2);
			pa[0] = rect.topLeft();
			pa[1] = rect.bottomRight();

			return true;
		}

		if (canvas)
			this.init(doReplot);
    

	}

	/*!
	Qt::Key_Plus zooms in, Qt::Key_Minus zooms out one position on the
	zoom stack, Qt::Key_Escape zooms out to the zoom base.

	Changes the current position on the stack, but doesn't pop
	any rectangle.

	\note The keys codes can be changed, using
	QwtEventPattern::setKeyPattern: 3, 4, 5
	 */
	widgetKeyPressEvent(ke) {
		if (!this.isActive()) {
			if (this.keyMatch(KeyUndo, ke))
				this.zoom(-1);
			else if (this.keyMatch(KeyRedo, ke))
				this.zoom(+1);
			else if (this.keyMatch(KeyHome, ke))
				this.zoom(0);
		}

		super.widgetKeyPressEvent(ke);

	}

	/*!
	Qt::MidButton zooms out one position on the zoom stack,
	Qt::RightButton to the zoom base.

	Changes the current position on the stack, but doesn't pop
	any rectangle.

	\note The mouse events can be changed, using
	QwtEventPattern::setMousePattern: 2, 1
	 */
	widgetMouseReleaseEvent(me) {
		if (this.mouseMatch(MouseSelect2, me))
			this.zoom(0);
		else if (this.mouseMatch(MouseSelect3, me))
			this.zoom(-1);
		else if (this.mouseMatch(MouseSelect6, me))
			this.zoom(+1);
		else
			super.widgetMouseReleaseEvent(me)

	}

	/*!
	Expand the selected rectangle to minZoomSize() and zoom in
	if accepted.

	\param ok If true, complete the selection and emit selected signals
	otherwise discard the selection.

	\sa accept(), minZoomSize()
	\return True if the selection has been accepted, false otherwise
	 */
	end(ok = true) {
		ok = super.end(ok);
		if (!ok)
			return false;

		var plot = this.plot();
		if (!plot)
			return false;

		/*const QPolygon*/
		var pa = this.selection();
		if (pa.length < 2)
			return false;

		var rect = new Misc.Rect(pa[0], pa[(pa.length - 1)]);
		rect = rect.normalized();

		var zoomRect = this.invTransform(rect).normalized();
		//console.log(zoomRect.right())

		/*const QSizeF*/
		var minSize = this.minZoomSize();
		if (minSize.isValid()) {
			/*const QPointF*/
			var center = zoomRect.center();
			zoomRect.setSize(zoomRect.size().expandedTo(this.minZoomSize()));
			//console.log(zoomRect.right())
			zoomRect.moveCenter(center);
		}
		//console.log(zoomRect.right())
		this.zoom(zoomRect);

		return true;
	}

	/*!
	Rejects selections, when the stack depth is too deep, or
	the zoomed rectangle is minZoomSize().

	\sa minZoomSize(), maxStackDepth()
	 */
	begin() {
		var d = this.getZoomerData()
			if (d.maxStackDepth >= 0) {
				if (d.zoomRectIndex >= (d.maxStackDepth))
					return;
			}

			/*const QSizeF*/
			var minSize = this.minZoomSize();
		if (minSize.isValid()) {
			/*const QSizeF*/
			var sz =
				//d.zoomStack[d.zoomRectIndex].size() * 0.9999;
				new Misc.Size(d.zoomStack[d.zoomRectIndex].width() * 0.9999,
					d.zoomStack[d.zoomRectIndex].height() * 0.9999)

				if (minSize.width >= sz.width && minSize.height >= sz.height) {
					return;
				}
		}
		//ParentClass.prototype.myMethod.call(this)
		super.begin();
	}

	/*!
	Reinitialize the axes, and set the zoom base to their scales.

	\param xAxis X axis
	\param yAxis Y axis
	 */
	setAxis(xAxis, yAxis) {
		if (xAxis != super.xAxis() || yAxis != super.yAxis()) {
			super.setAxis(xAxis, yAxis);
			if(this.setZoomBase !== undefined)
				this.setZoomBase(this.scaleRect());
		}
	}

};

define("qwtplotzoomer", ["qwtplotpicker"], function(){});


Static.mVerifyRange = function(size, i1, i2) {
	if (size < 1)
		return 0;

	i1 = Math.max(0, Math.min(i1, size - 1));
	i2 = Math.max(0, Math.min(i2, size - 1));

	if (i1 > i2) {
		//qSwap( i1, i2 );
		var temp = i1;
		i1 = i2;
		i2 = temp;
	}

	return (i2 - i1 + 1);
}



var LegendNoAttribute = 0x00;
var LegendShowLine = 0x01;
var LegendShowSymbol = 0x02;
var LegendShowBrush = 0x04;

function updateLegendIconSize(curve )
{
    var sz = curve.getLegendIconSize();
    if(curve.symbol())
        sz = curve.symbol().boundingRect().size();
    if ( curve.symbol() && curve.testLegendAttribute( LegendShowSymbol ) )
    {
        sz.width += 2; // margin
        sz.height += 2; // margin

        if ( curve.testLegendAttribute( LegendShowLine ) )
        {
            // Avoid, that the line is completely covered by the symbol

            var w = Math.ceil( 1.5 * sz.width );

            if ( w % 2 )
                w++;

            sz.width = Math.max( 40, w );
        }
        curve.setLegendIconSize( sz );
    }
    else if( curve.testLegendAttribute( LegendShowLine )){
        sz.width = 40;
        curve.setLegendIconSize( sz );
    }
}

/////////////////Curve - subclass of PlotSeriesItem//////////start
Curve.inheritsFrom( PlotSeriesItem );
//Define the PlotSeriesItem constructor
function Curve(tle) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    PlotSeriesItem.call(this, tle);

    var m_style = Lines;
    var c_attributes = 0;
    var m_baseline = 0;
    var m_paintAttributes = FilterPoints;
    var m_legendAttributes = LegendNoAttribute;
    var m_brush = new Misc.Brush();//"NoBrush";
    var m_pen = new Misc.Pen; //mMakePen();

    var m_curveFitter = null

    var m_symbol = null;

    this.rtti = Static.Rtti_PlotCurve;

    this.setItemInterest(ScaleInterest , true)


    //! boundingRect().left()
    this.minXValue = function() 
    {
        return this.boundingRect().left();
    }

    //! boundingRect().right()
    this.maxXValue = function()
    {
        return this.boundingRect().right();
    }

    //! boundingRect().top()
    this.minYValue = function()
    {
        return this.boundingRect().top();
    }

    //! boundingRect().bottom()
    this.maxYValue = function()
    {
        return this.boundingRect().bottom();
    }
    
    
    /*!
  Specify an attribute how to draw the legend icon

  \param attribute Attribute
  \param on On/Off
  /sa testLegendAttribute(). legendIcon()
    */
    this.setLegendAttribute = function( attribute, on )
    {
        if ( on != this.testLegendAttribute( attribute ) )
        {
            if ( on )
                m_legendAttributes |= attribute;
            else
                m_legendAttributes &= ~attribute;
    
            updateLegendIconSize( this );
            //alert(this.legendIconSize())
            //legendChanged();

            if(this.plot())
              this.plot().updateLegend(this)

        }
    }
    
    /*!
      \return True, when attribute is enabled
      \sa setLegendAttribute()
    */
    this.testLegendAttribute = function( attribute ) 
    {
        return ( m_legendAttributes & attribute );
    }

    this.legendAttributes = function( ) 
    {
        return  m_legendAttributes;
    }

    /*!
      \brief Assign a symbol

      The curve will take the ownership of the symbol, hence the previously
      set symbol will be delete by setting a new one. If \p symbol is
      \c NULL no symbol will be drawn.

      \param symbol Symbol
      \sa symbol()
    */
    this.setSymbol = function( symbol )
    {

        if ( symbol !== m_symbol )
        {
            m_symbol = symbol;

            updateLegendIconSize( this );

            this.legendChanged();
            this.itemChanged();
        }
    }

    /*!
      \return Current symbol or NULL, when no symbol has been assigned
      \sa setSymbol()
    */
    this.symbol = function()
    {
        return m_symbol;
    }
    
    
    this.setBrush = function(brush){
         if(typeof(brush)=="string")
		        brush = new Misc.Brush(brush)
          //if(!m_brush.isEqual(brush)){
            m_brush = brush;
            this.legendChanged();
            this.itemChanged();
         // }
          
    }
    
    this.brush = function(){
        return m_brush;
    }
    
    this.setPen = function(pen){
        if(typeof(pen)!=="object")
		        return
        //if(!m_pen.isEqual(pen)){
            m_pen = pen;
            this.legendChanged();
            this.itemChanged();
        //}           
    }
    
    this.pen = function(){
        return m_pen;
    }
    
    /*!
  Specify an attribute how to draw the curve

  \param attribute Paint attribute
  \param on On/Off
  \sa testPaintAttribute()
    */
    this.setPaintAttribute = function( attribute, on )
    {
        if ( on )
            m_paintAttributes |= attribute;
        else
            m_paintAttributes &= ~attribute;
    }
    
    /*!
        \return True, when attribute is enabled
        \sa setPaintAttribute()
    */
    this.testPaintAttribute = function( attribute ) 
    {
        return ( m_paintAttributes & attribute );
    }


    /*!
      Initialize data with an array of points.

      \param samples Vector of points
      \note QVector is implicitly shared
      \note QPolygonF is derived from QVector<QPointF>
    */
    this.setSamples = function( samples )
    {
        this.setData( new PointSeriesData( samples ) );
    }


    /*!
      Specify an attribute for drawing the curve

      \param attribute Curve attribute
      \param on On/Off

      /sa testCurveAttribute(), setCurveFitter()
    */
    this.setCurveAttribute = function( attribute, on )
    {
        if(typeof(on)==="undefined")
            on = true;
        if ( ( c_attributes & attribute ) == on )
            return;

        if ( on )
            c_attributes |= attribute;
        else
            c_attributes &= ~attribute;

        this.itemChanged();
    }

    /*!
        \return true, if attribute is enabled
        \sa setCurveAttribute()
    */
    this.testCurveAttribute = function( attribute )
    {
        return c_attributes & attribute;
    }


    //! Initialize internal members
   this.init = function()
    {
        this.setItemAttribute( Legend, true );
        this.setItemAttribute( AutoScale, true );

        this.setData( new PointSeriesData() );
        this.setCurveAttribute( Fitted, true );

        this.setZ( 20.0 );
    }

    /*!
      Set the curve's drawing style

      \param style Curve style
      \sa style()
    */
    this.setStyle = function( style )
    {
        if ( style != m_style )
        {
            m_style = style;
            this.legendChanged();
            this.itemChanged();
        }
        
    }

    /*!
      \return Style of the curve
      \sa setStyle()
    */
    this.style = function()
    {
        return m_style;
    }

    /*!
      Draw an interval of the curve

      \param painter Painter
      \param xMap Maps x-values into pixel coordinates.
      \param yMap Maps y-values into pixel coordinates.
      \param canvasRect Contents rectangle of the canvas
      \param from Index of the first point to be painted
      \param to Index of the last point to be painted. If to < 0 the
             curve will be painted to its last point.

      \sa drawCurve(), drawSymbols(),
    */
    this.drawSeries = function(xMap, yMap, from, to )
    {

        var ctx = this.getContext();

        var painter = new PaintUtil.Painter(ctx);
        // painter.setPen(m_pen);
        // painter.setBrush(m_brush);
        var numSamples = this.dataSize();

        if (numSamples <= 0 )
            return;

//        if ( typeof(from) == "undefined" )
//            from = 0;

//        if ( typeof(to) == "undefined" )
//            to = numSamples - 1;
        if ( to < 0 )
             to = numSamples - 1;

        //alert(from)

        if ( Static.mVerifyRange( numSamples, from, to ) > 0 )
        {
            painter.save();
            painter.setPen(m_pen);
            painter.setBrush(m_brush);
            //painter->setPen( d_data->pen );

            /*
              Qt 4.0.0 is slow when drawing lines, but it's even
              slower when the painter has a brush. So we don't
              set the brush before we really need it.
             */



            this.drawCurve(painter, m_style, xMap, yMap, from, to );
            painter.restore();


            if ( m_symbol && ( m_symbol.style() !== NoSymbol ) )
            {

                painter.save();
                painter.setPen(m_symbol.pen());
                painter.setBrush(m_symbol.brush());
                this.drawSymbols(ctx, m_symbol, xMap, yMap, from, to );
                painter.restore();
            }
        }
        painter = null
    }

    /*!
      Draw symbols

      \param painter Painter
      \param symbol Curve symbol
      \param xMap x map
      \param yMap y map
      \param canvasRect Contents rectangle of the canvas
      \param from Index of the first point to be painted
      \param to Index of the last point to be painted

      \sa setSymbol(), drawSeries(), drawCurve()
    */
    this.drawSymbols = function(ctx, symbol, xMap, yMap, from, to )
    {
        var  mapper = new PointMapper();
        //mapper.setFlag( QwtPointMapper::RoundPoints,  QwtPainter::roundingAlignment( painter ) );
        mapper.setFlag( WeedOutPoints, this.testPaintAttribute( FilterPoints ) );
        //mapper.setBoundingRect( canvasRect );

        var chunkSize = 500;

        //var ctx = this.getContext();
        for ( var i = from; i <= to; i += chunkSize )
        {
            var n = Math.min( chunkSize, to - i + 1 );

            var points = mapper.toPointsF( xMap, yMap, this.data(), i, i + n - 1 );


            if ( points.length > 0 )
                symbol.drawSymbols( ctx, points );
        }
    }

    /*!
        \brief Set the value of the baseline

        The baseline is needed for filling the curve with a brush or
        the Sticks drawing style.

        The interpretation of the baseline depends on the orientation().
        With Qt::Horizontal, the baseline is interpreted as a horizontal line
        at y = baseline(), with Qt::Vertical, it is interpreted as a vertical
        line at x = baseline().

        The default value is 0.0.

        \param value Value of the baseline
        \sa baseline(), setBrush(), setStyle(), QwtPlotAbstractSeriesItem::orientation()
      */
      this.setBaseline = function(value ) {
          if ( m_baseline != value )
          {
              m_baseline = value;
              this.itemChanged();
          }
      }

      /*!
        \return Value of the baseline
        \sa setBaseline()
      */
      this.baseline = function()
      {
          return m_baseline;
      }

    /*!
      \brief Draw the line part (without symbols) of a curve interval.
      \param painter Painter
      \param style curve style, see QwtPlotCurve::CurveStyle
      \param xMap x map
      \param yMap y map
      \param canvasRect Contents rectangle of the canvas
      \param from index of the first point to be painted
      \param to index of the last point to be painted
      \sa draw(), drawDots(), drawLines(), drawSteps(), drawSticks()
    */
    this.drawCurve = function(painter, style, xMap, yMap, from, to )
    {       
        switch ( style )
        {
            case Lines:
                if ( this.testCurveAttribute( Fitted ) )
                {

                    // we always need the complete
                    // curve for fitting
                    from = 0;
                    to = this.dataSize() - 1;
                }                
                this.drawLines(painter, xMap, yMap, from, to );
                break;
            case Sticks:
                this.drawSticks(painter, xMap, yMap, from, to );
                break;
            case Steps:                
                this.drawSteps(painter, xMap, yMap, from, to );
                break;
            case Dots:
                this.drawDots(painter, xMap, yMap, from, to );
                break;
            case NoCurve:
            default:
                break;
        }
    }

    /*!
      \brief Draw lines

      If the CurveAttribute Fitted is enabled a QwtCurveFitter tries
      to interpolate/smooth the curve, before it is painted.

      \param painter Painter
      \param xMap x map
      \param yMap y map
      \param canvasRect Contents rectangle of the canvas
      \param from index of the first point to be painted
      \param to index of the last point to be painted

      \sa setCurveAttribute(), setCurveFitter(), draw(),
          drawLines(), drawDots(), drawSteps(), drawSticks()
    */
    this.drawLines = function(painter, xMap, yMap, from, to )
    {
        if ( from > to )
            return;

        //const bool doAlign = QwtPainter::roundingAlignment( painter );
        var doFit = ( c_attributes & Fitted ) && m_curveFitter;
        var doFill =  m_brush.color !== Static.NoBrush ? true : false;
        //alert(doFill)

//        QRectF clipRect;
//        if ( d_data->paintAttributes & ClipPolygons )
//        {
//            qreal pw = qMax( qreal( 1.0 ), painter->pen().widthF());
//            clipRect = canvasRect.adjusted(-pw, -pw, pw, pw);
//        }

        var doIntegers = false;


//        const bool noDuplicates = d_data->paintAttributes & FilterPoints;

    
        var mapper = new PointMapper;
        //mapper.setFlag( QwtPointMapper::RoundPoints, doAlign );
        //mapper.setFlag( QwtPointMapper::WeedOutPoints, noDuplicates );
        //mapper.setBoundingRect( canvasRect );



        //alert(443)
        var polyline = mapper.toPolygonF( xMap, yMap,  this.data(), from, to );
        //alert(444)

            if ( doFit ){
              //console.log(44)
              polyline = m_curveFitter.fitCurve( polyline );
            }

            //console.log(polyline)


            painter.drawPolyline(polyline );
            if ( doFill )
            {
                this.fillCurve(painter, xMap, yMap, polyline );
            }

    }

    /*!
        Assign a curve fitter

        The curve fitter "smooths" the curve points, when the Fitted
        CurveAttribute is set. setCurveFitter(NULL) also disables curve fitting.

        The curve fitter operates on the translated points ( = widget coordinates)
        to be functional for logarithmic scales. Obviously this is less performant
        for fitting algorithms, that reduce the number of points.

        For situations, where curve fitting is used to improve the performance
        of painting huge series of points it might be better to execute the fitter
        on the curve points once and to cache the result in the QwtSeriesData object.

        \param curveFitter() Curve fitter
        \sa Fitted
      */
      this.setCurveFitter = function( curveFitter )
      {
          //m_curveFitter = 0;
          m_curveFitter = curveFitter;

          this.itemChanged();
      }

      /*!
        Get the curve fitter. If curve fitting is disabled NULL is returned.

        \return Curve fitter
        \sa setCurveFitter(), Fitted
      */
      this.curveFitter = function()
      {
          return m_curveFitter;
      }

    
    /*!
  Fill the area between the curve and the baseline with
  the curve brush

  \param painter Painter
  \param xMap x map
  \param yMap y map
  \param canvasRect Contents rectangle of the canvas
  \param polygon Polygon - will be modified !

  \sa setBrush(), setBaseline(), setStyle()
    */
    this.fillCurve = function(painter, xMap, yMap, polygon )
    {
        if ( m_brush.color == Static.NoBrush )
            return;
    
        //alert(polygon.length)
        this.closePolyline(  xMap, yMap, polygon );
        if ( polygon.length <= 2 ) // a line can't be filled
            return;
    
        //alert(polygon.length)
    
        //if ( d_data->paintAttributes & ClipPolygons )
            //polygon = QwtClipper::clipPolygonF( canvasRect, polygon, true );
    
        painter.setPen(new Misc.Pen(m_brush.color))
        painter.drawPolygon(polygon)
    
        //painter->restore();
    }
    
    /*!
  \brief Complete a polygon to be a closed polygon including the 
         area between the original polygon and the baseline.

  \param painter Painter
  \param xMap X map
  \param yMap Y map
  \param polygon Polygon to be completed
    */
    this.closePolyline = function( xMap, yMap, polygon )
    {
        if ( polygon.length < 2 )
            return;
    
        //const bool doAlign = QwtPainter::roundingAlignment( painter );
    
        var baseline = m_baseline;
        
        if ( this.orientation() == Vertical )
        {
            if ( yMap.transformation() )
                baseline = yMap.transformation().bounded( baseline );
    
            var refY = yMap.transform( baseline );
            //if ( doAlign )
                //refY = qRound( refY );
    
            //polygon.push({x:polygon[polygon.length -1].x, y:refY} );
            //polygon.push( {x:polygon[0].x, y:refY} );
            polygon.push(new Misc.Point(polygon[polygon.length -1].x, refY) );
            polygon.push(new Misc.Point(polygon[0].x, refY) );
        }
        else
        {
            if ( xMap.transformation() )
                baseline = xMap.transformation().bounded( baseline );
    
            var refX = xMap.transform( baseline );
            //if ( doAlign )
                //refX = qRound( refX );
    
            //polygon.push( {x:refX, y:polygon[polygon.length -1].y} );
            //polygon.push( {x:refX, y:polygon[0].y} );
            polygon.push( new Misc.Point(refX, polygon[polygon.length -1].y) );
            polygon.push(new Misc.Point(refX, polygon[0].y));
        }
    }   
    
        
    /*!
      Draw step function

      The direction of the steps depends on Inverted attribute.

      \param painter Painter
      \param xMap x map
      \param yMap y map
      \param canvasRect Contents rectangle of the canvas
      \param from index of the first point to be painted
      \param to index of the last point to be painted

      \sa CurveAttribute, setCurveAttribute(),
          draw(), drawCurve(), drawDots(), drawLines(), drawSticks()
    */
    this.drawSteps = function(painter, xMap, yMap, from, to )
    {

        //const bool doAlign = QwtPainter::roundingAlignment( painter );

        //QPolygonF polygon( 2 * ( to - from ) + 1 );
        //alert(from+", "+to)
        var points = [];
        var sz = 2 * ( to - from ) + 1;
        for(var i=0; i<sz; ++i)
            //points.push({x:0,y:0})
            points.push(new Misc.Point())

        //alert(points.length)


        var inverted = this.orientation() == Vertical;
        if ( c_attributes & Inverted )
            inverted = !inverted;

        var series = this.data();

        var i, ip;
        for ( i = from, ip = 0; i <= to; i++, ip += 2 )
        {
            var sample = series.sample( i );

            var xi = xMap.transform( sample.x );
            var yi = yMap.transform( sample.y );
//            if ( doAlign )
//            {
//                xi = Math.round( xi );
//                yi = Math.round( yi );
//            }

            if ( ip > 0 )
            {
                var p0 = points[ip - 2];
                var p = points[ip - 1];

                if ( inverted )
                {
                    p.x = p0.x;
                    p.y = yi;
                }
                else
                {
                    p.x = xi;
                    p.y = p0.y;
                }
            }

            points[ip].x = xi;
            points[ip].y = yi;
        }
    //alert(points)
//        if ( d_data->paintAttributes & ClipPolygons )
//        {
//            const QPolygonF clipped = QwtClipper::clipPolygonF(
//                canvasRect, polygon, false );

//            QwtPainter::drawPolyline( painter, clipped );
//        }
//        else
//        {

            painter.drawPolyline(points);
        //}

//        if ( d_data->brush.style() != Qt::NoBrush )
//            fillCurve( painter, xMap, yMap, canvasRect, polygon );
    }

    /*!
      Draw sticks

      \param painter Painter
      \param xMap x map
      \param yMap y map
      \param canvasRect Contents rectangle of the canvas
      \param from index of the first point to be painted
      \param to index of the last point to be painted

      \sa draw(), drawCurve(), drawDots(), drawLines(), drawSteps()
    */
    this.drawSticks = function(painter, xMap, yMap,from, to )
    {
        //alert(45)
        //painter->save();
        //painter->setRenderHint( QPainter::Antialiasing, false );

        //const bool doAlign = QwtPainter::roundingAlignment( painter );
        //m_baseline = -100;

        var x0 = xMap.transform( m_baseline );
        var y0 = yMap.transform( m_baseline );
//        if ( doAlign )
//        {
//            x0 = qRound( x0 );
//            y0 = qRound( y0 );
//        }

        var o = this.orientation();

        var series = this.data();

        //var penWidth = 1;
        //var penColor  = "#ff0000";
        //ctx.strokeStyle = penColor;///////////
        //ctx.beginPath();

        for ( var i = from; i <= to; i++ )
        {
            var sample = series.sample( i );
            var xi = xMap.transform( sample.x );
            var yi = yMap.transform( sample.y );
//            if ( doAlign )
//            {
//                xi = qRound( xi );
//                yi = qRound( yi );
//            }

            if ( o == Horizontal )
                //ctx.moveTo(x0, yi);
                painter.drawLine(x0, yi, xi, yi);
            else
                //ctx.moveTo(xi, y0);
                painter.drawLine(xi, y0, xi, yi);
            //ctx.lineTo(xi, yi);
            
            

        }

        //ctx.stroke();
        //ctx.closePath();


    }

    /*!
      Draw dots

      \param painter Painter
      \param xMap x map
      \param yMap y map
      \param canvasRect Contents rectangle of the canvas
      \param from index of the first point to be painted
      \param to index of the last point to be painted

      \sa draw(), drawCurve(), drawSticks(), drawLines(), drawSteps()
    */
    this.drawDots = function(painter, xMap, yMap, from, to )
    {
        //TODO
        /*var penWidth = 1;
        var penColor  = "#ff0000";
        //var ctx = this.getContext();
        ctx.fillStyle = penColor;///////////
        
        */
        
        //ctx.beginPath();
        
        //const QColor color = painter->pen().color();

        //if ( painter->pen().style() == Qt::NoPen || color.alpha() == 0 )
        //{
            //return;
        //}

        //const bool doFill = ( d_data->brush.style() != Qt::NoBrush )
               // && ( d_data->brush.color().alpha() > 0 );
        //const bool doAlign = QwtPainter::roundingAlignment( painter );

        var mapper = new PointMapper;
        //mapper.setBoundingRect( canvasRect );
        //mapper.setFlag( QwtPointMapper::RoundPoints, doAlign );

        if ( m_paintAttributes & FilterPoints )
        {
            mapper.setFlag( WeedOutPoints, true );            
        }

        /*if ( doFill )
        {
            mapper.setFlag( WeedOutPoints, false );

            var points = mapper.toPointsF( xMap, yMap, data(), from, to );

            this.drawPoints( painter, points );
            //fillCurve( painter, xMap, yMap, canvasRect, points );
        }*/
        
        /*else*/ if ( m_paintAttributes & MinimizeMemory )
        {
            var series = this.data();
            
            

            for ( var i = from; i <= to; i++ )
            {
                
                var sample = series.sample( i );

                var xi = xMap.transform( sample.x);
                var yi = yMap.transform( sample.y);

                /*if ( doAlign )
                {
                    xi = qRound( xi );
                    yi = qRound( yi );
                }*/

                //this.drawPoint(ctx, {x:xi, y:yi});
                //this.drawPoint(ctx, new Point(xi, yi));
                painter.drawPoint(new Misc.Point(xi, yi));
                
            }
            
            //ctx.closePath();
        }
        else
        {
            var points = mapper.toPointsF( xMap, yMap, this.data(), from, to );
            //alert(points)

            //this.drawPoints(ctx, points );
            painter.drawPoints(points );  
        }
    }
    
    

    this.init();
}

/*!
   \return Icon representing the curve on the legend

   \param index Index of the legend entry 
                ( ignored as there is only one )
   \param size Icon size

   \sa QwtPlotItem::setLegendIconSize(), QwtPlotItem::legendData()
 */
Curve.prototype.legendIcon = function( index, size ) 
{
    //Q_UNUSED( index );

    //alert(size)

    if ( size.width === 0 && size.height === 0 )
        return null;

    var graphic = new GraphicUtil.Graphic(null, size.width, size.height);
     
    //graphic.setDefaultSize( size );
    //graphic.setRenderHint( QwtGraphic::RenderPensUnscaled, true );

    //QPainter painter( &graphic );
    //painter.setRenderHint( QPainter::Antialiasing,
       // testRenderHint( QwtPlotItem::RenderAntialiased ) );
    var painter = new PaintUtil.Painter(graphic);
    
    
    if ( this.legendAttributes() == 0 || this.legendAttributes() & LegendShowBrush )
    {
        var brush = this.brush();
        
        if ( brush.color == Static.NoBrush && this.legendAttributes() == 0 )
        {
            if ( this.style() != NoCurve )
            {
                brush = new Misc.Brush( this.pen().color);
                
            }
            else if ( this.symbol() && (this.symbol().style() != NoSymbol ) )
            {
                brush = new Misc.Brush( this.symbol().pen().color );
            }
        }
        if ( brush.color != Static.NoBrush )
        {
            var r = new Misc.Rect( 0, 0, size.width, size.height );
            painter.fillRect( r, brush );
            //graphic.setParent($("#demo"))
        }
    }

    if ( this.legendAttributes() & LegendShowLine )
    {        
        if ( this.pen().color != Static.NoPen )
        {
            var pn = this.pen();
            //pn.setCapStyle( Qt::FlatCap );

            painter.setPen( pn );

            var y = 0.5 * size.height;           
            painter.drawLine( 0.0, y, size.width, y );
            
        }
        
    }

    if ( this.legendAttributes() & LegendShowSymbol )
    {            
        if ( this.symbol() )
        { 
            var sh = size.height/2+1
            if(this.symbol().style()==Ellipse) 
              sh -= 1
            this.symbol().drawGraphicSymbol( painter, new Misc.Point(size.width/2, sh), size );
        }
    }
    painter = null
    return graphic;    
}

Curve.prototype.toString = function () {
    return '[Curve]';
}
/////////////////////////////////////////////////////end
;
define("qwtplotcurve", ["static","seriesData"], function(){});


function CurveFitter(){
    /*!
        Find a curve which has the best fit to a series of data points

        \param polygon Series of data points
        \return Curve points
        subclass must reimplement
     */
    this.fitCurve = function( polygon ) {}

};


/*!
Spline type
The default setting is Auto
\sa setFitMode(), FitMode()
*/
Static.FitMode = {}

/*!
Use the default spline algorithm for polygons with
increasing x values ( p[i-1] < p[i] ), otherwise use
a parametric spline algorithm.
*/
Static.FitMode.Auto = 0

//! Use a default spline algorithm
Static.FitMode.Spline = 1

//! Use a parametric spline algorithm
Static.FitMode.ParametricSpline = 2

/*!
  \brief A curve fitter using cubic splines
*/
/////////////////SplineCurveFitter - subclass of CurveFitter//////////start
SplineCurveFitter.inheritsFrom( CurveFitter);
//Define the SplineCurveFitter constructor
function SplineCurveFitter(){
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    CurveFitter.call(this);

    var m_fitMode = Static.FitMode.Auto
    var m_spline = new Spline()
    var m_splineSize = 250

    
    function fitSpline( points ){
      m_spline.setPoints( points );
      if ( !m_spline.isValid() )
          return points;

      var fittedPoints = new Array( m_splineSize );


      var x1 = points[0].x;
      var x2 = points[points.length - 1 ].x;
      var dx = x2 - x1;
      var delta = dx / ( m_splineSize - 1 );

      for ( var i = 0; i < m_splineSize; i++ )
      {
          //var p = fittedPoints[i];

          var v = x1 + i * delta;
          var sv = m_spline.value( v );

          /*p.x = v;
          p.y = sv;*/
          fittedPoints[i] = new Misc.Point(v, sv)
          
      }
      m_spline.reset();

      return fittedPoints;

    }

    function fitParametric( points ) {
      var i;
      var size = points.length;

      var fittedPoints = []//( d_data->splineSize );
      var splinePointsX = []//( size );
      var splinePointsY = []//( size );

      var p = points;
      var spX = splinePointsX;
      var spY = splinePointsY;

      var param = 0.0;
      for ( i = 0; i < size; i++ )
      {
          var x = p[i].x;
          var y = p[i].y;
          if ( i > 0 )
          {
            console.log(Math)
              var delta = Math.sqrt( Static.sqr( x - spX[i-1].y() )
                        + Static.sqr( y - spY[i-1].y() ) );
              param += Math.max( delta, 1.0 );
          }
          spX[i].x =  param;
          spX[i].y =  x;
          spY[i].x =  param;
          spY[i].y =  y ;
      }

      m_spline.setPoints( splinePointsX );
      if ( !m_spline.isValid() )
          return points;

      var deltaX =
          splinePointsX[size - 1].x / ( m_splineSize - 1 );
      for ( i = 0; i < m_splineSize; i++ )
      {
          var dtmp = i * deltaX;
          fittedPoints[i].x = m_spline.value( dtmp );
      }

      m_spline.setPoints( splinePointsY );
      if ( m_spline.isValid() )
          return points;

      var deltaY =
          splinePointsY[size - 1].x / ( m_splineSize - 1 );
      for ( i = 0; i < m_splineSize; i++ )
      {
          var dtmp = i * deltaY;
          fittedPoints[i].y =  m_spline.value( dtmp );
      }

      return fittedPoints;

    }

    
    this.setFitMode = function( mode ){

    }

    this.fitMode = function(){

    }

    this.setSpline = function( spline ){
        m_spline = spline;
        m_spline.reset();
    }

    this.spline = function(){
        return m_spline;
    }

    this.setSplineSize = function(splineSize ){
        m_splineSize = Math.max( splineSize, 10 );
    }

    this.splineSize = function(){
        return m_splineSize;
    }

    this.fitCurve = function(points){
        //console.log(polygon)
        var size = points.length;
        if ( size <= 2 )
            return points;

        var fitMode = m_fitMode;
        if ( fitMode == Static.FitMode.Auto )
        {
            fitMode = Static.FitMode.Spline;

            var p = points//.data();
            for ( var i = 1; i < size; i++ )
            {
                if ( p[i].x <= p[i-1].x )
                {
                    fitMode = Static.FitMode.ParametricSpline;
                    break;
                }
            };
        }

        if ( fitMode == Static.FitMode.ParametricSpline )
            return fitParametric( points );
        else
            return fitSpline( points );
        }
    }

/*!
  \brief A curve fitter implementing Douglas and Peucker algorithm

  The purpose of the Douglas and Peucker algorithm is that given a 'curve'
  composed of line segments to find a curve not too dissimilar but that
  has fewer points. The algorithm defines 'too dissimilar' based on the
  maximum distance (tolerance) between the original curve and the
  smoothed curve.

  The runtime of the algorithm increases non linear ( worst case O( n*n ) )
  and might be very slow for huge polygons. To avoid performance issues
  it might be useful to split the polygon ( setChunkSize() ) and to run the algorithm
  for these smaller parts. The disadvantage of having no interpolation
  at the borders is for most use cases irrelevant.

  The smoothed curve consists of a subset of the points that defined the
  original curve.

  In opposite to QwtSplineCurveFitter the Douglas and Peucker algorithm reduces
  the number of points. By adjusting the tolerance parameter according to the
  axis scales QwtSplineCurveFitter can be used to implement different
  level of details to speed up painting of curves of many points.
*/
/////////////////WeedingCurveFitter - subclass of CurveFitter//////////start
WeedingCurveFitter.inheritsFrom( CurveFitter);
//Define the WeedingCurveFitter constructor
function WeedingCurveFitter(){
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    CurveFitter.call(this);

    function simplify( polygon ){

    }


    this.setTolerance = function( val ){

    }

    this.tolerance = function() {

    }

    this.setChunkSize = function( sz ){

    }

    this.chunkSize = function(){

    }

    this.fitCurve = function( polygon ){

    }


}
;
define("jQwtCurveFitter", ["static"], function(){});


/*!
  \brief A class for spline interpolation

  The QwtSpline class is used for cubical spline interpolation.
  Two types of splines, natural and periodic, are supported.

  \par Usage:
  <ol>
  <li>First call setPoints() to determine the spline coefficients
      for a tabulated function y(x).
  <li>After the coefficients have been set up, the interpolated
      function value for an argument x can be determined by calling
      QwtSpline::value().
  </ol>

  \par Example:
  \code
#include <qwt_spline.h>

QPolygonF interpolate(const QPolygonF& points, int numValues)
{
    QwtSpline spline;
    if ( !spline.setPoints(points) )
        return points;

    QPolygonF interpolatedPoints(numValues);

    const double delta =
        (points[numPoints - 1].x() - points[0].x()) / (points.size() - 1);
    for(i = 0; i < points.size(); i++)  / interpolate
    {
        const double x = points[0].x() + i * delta;
        interpolatedPoints[i].setX(x);
        interpolatedPoints[i].setY(spline.value(x));
    }
    return interpolatedPoints;
}
  \endcode
*/

//! Spline type
Static.SplineType = {}

//! A natural spline
Static.SplineType.Natural = 0

//! A periodic spline
Static.SplineType.Periodic = 1

Static.lookup = function( x, values )
{
   var i1;
    var size = values.length;

    if ( x <= values[0].x )
        i1 = 0;
    else if ( x >= values[size - 2].x )
        i1 = size - 2;
    else
    {
        i1 = 0;
        var i2 = size - 2;
        var i3 = 0;

        while ( i2 - i1 > 1 )
        {
            i3 = i1 + ( ( i2 - i1 ) >> 1 );

            if ( values[i3].x > x )
                i2 = i3;
            else
                i1 = i3;
        }
    }
    return i1;
}

function Spline(){

    var m_points = null
    var m_a = []
    var m_b = []
    var m_c = []
    var m_splineType = Static.SplineType.Natural
        
    this.setSplineType = function( splineType ){
        m_splineType = splineType;
    }

    this.splineType = function(){
        return m_splineType;
    }

    /*!
      \brief Calculate the spline coefficients

      Depending on the value of \a periodic, this function
      will determine the coefficients for a natural or a periodic
      spline and store them internally.

      \param points Points
      \return true if successful
      \warning The sequence of x (but not y) values has to be strictly monotone
               increasing, which means <code>points[i].x() < points[i+1].x()</code>.
           If this is not the case, the function will return false
    */
    this.setPoints = function(  points ){
        var size = points.length;
        if ( size <= 2 )
        {
            this.reset();
            return false;
        }

        m_points = points;

        m_a.resize( size - 1 );
        m_b.resize( size - 1 );
        m_c.resize( size - 1 );

        var ok;
        if ( m_splineType == Static.SplineType.Periodic )
            ok = this.buildPeriodicSpline( points );
        else
            ok = this.buildNaturalSpline( points );

        if ( !ok )
            this.reset();

        return ok;
    }

    this.points = function(){
        return m_points;
    }

    this.reset = function(){
        m_a.resize( 0 );
        m_b.resize( 0 );
        m_c.resize( 0 );
        m_points.resize( 0 );
    }

    this.isValid = function(){
        return m_a.length > 0;
    }

    /*!
      Calculate the interpolated function value corresponding
      to a given argument x.

      \param x Coordinate
      \return Interpolated coordinate
    */
    this.value = function(  x ){
        if ( m_a.length == 0 )
            return 0.0;

        var i = Static.lookup( x, m_points );

        var delta = x - m_points[i].x;
        return( ( ( ( m_a[i] * delta ) + m_b[i] )
            * delta + m_c[i] ) * delta + m_points[i].y );
    }

    this.coefficientsA = function(){
        return m_a;
    }

    this.coefficientsB = function(){
        return m_b;
    }

    this.coefficientsC = function() {
        return m_c;
    }

    this.buildNaturalSpline = function( points ){
      var i;

      var p = points;
      var size = points.length

      var a = m_a;
      var b = m_b;
      var c = m_c;

      //  set up tridiagonal equation system; use coefficient
      //  vectors as temporary buffers
      var h = new Array( size - 1 );
      for ( i = 0; i < size - 1; i++ )
      {
          h[i] = p[i+1].x - p[i].x;
          if ( h[i] <= 0 )
              return false;
      }

      var d = new Array( size - 1 );
      var dy1 = ( p[1].y - p[0].y ) / h[0];
      for ( i = 1; i < size - 1; i++ )
      {
          b[i] = c[i] = h[i];
          a[i] = 2.0 * ( h[i-1] + h[i] );

          var dy2 = ( p[i+1].y - p[i].y ) / h[i];
          d[i] = 6.0 * ( dy1 - dy2 );
          dy1 = dy2;
      }

      //
      // solve it
      //

      // L-U Factorization
      for ( i = 1; i < size - 2; i++ )
      {
          c[i] /= a[i];
          a[i+1] -= b[i] * c[i];
      }

      // forward elimination
      var s = new Array( size );
      s[1] = d[1];
      for ( i = 2; i < size - 1; i++ )
          s[i] = d[i] - c[i-1] * s[i-1];

      // backward elimination
      s[size - 2] = - s[size - 2] / a[size - 2];
      for ( i = size - 3; i > 0; i-- )
          s[i] = - ( s[i] + b[i] * s[i+1] ) / a[i];
      s[size - 1] = s[0] = 0.0;

      //
      // Finally, determine the spline coefficients
      //
      for ( i = 0; i < size - 1; i++ )
      {
          a[i] = ( s[i+1] - s[i] ) / ( 6.0 * h[i] );
          b[i] = 0.5 * s[i];
          c[i] = ( p[i+1].y - p[i].y ) / h[i]
              - ( s[i+1] + 2.0 * s[i] ) * h[i] / 6.0;
      }

      return true;

    }

    this.buildPeriodicSpline = function( points ){
        var i;

        var p = points;
        var size = points.length

        var a = m_a
        var b = m_b
        var c = m_c
        
        var d = new Array( size - 1 );
        var h = new Array( size - 1 );
        var s = new Array( size );

        //
        //  setup equation system; use coefficient
        //  vectors as temporary buffers
        //
        for ( i = 0; i < size - 1; i++ )
        {
            h[i] = p[i+1].x - p[i].x;
            if ( h[i] <= 0.0 )
                return false;
        }

        var imax = size - 2;
        var htmp = h[imax];
        var dy1 = ( p[0].y - p[imax].y ) / htmp;
        for ( i = 0; i <= imax; i++ )
        {
            b[i] = c[i] = h[i];
            a[i] = 2.0 * ( htmp + h[i] );
            var dy2 = ( p[i+1].y - p[i].y ) / h[i];
            d[i] = 6.0 * ( dy1 - dy2 );
            dy1 = dy2;
            htmp = h[i];
        }

        //
        // solve it
        //

        // L-U Factorization
        a[0] = Math.sqrt( a[0] );
        c[0] = h[imax] / a[0];
        var sum = 0;

        for ( i = 0; i < imax - 1; i++ )
        {
            b[i] /= a[i];
            if ( i > 0 )
                c[i] = - c[i-1] * b[i-1] / a[i];
            a[i+1] = Math.sqrt( a[i+1] - Static.sqr( b[i] ) );
            sum += Static.sqr( c[i] );
        }
        b[imax-1] = ( b[imax-1] - c[imax-2] * b[imax-2] ) / a[imax-1];
        a[imax] = Math.sqrt( a[imax] - Static.sqr( b[imax-1] ) - sum );


        // forward elimination
        s[0] = d[0] / a[0];
        sum = 0;
        for ( i = 1; i < imax; i++ )
        {
            s[i] = ( d[i] - b[i-1] * s[i-1] ) / a[i];
            sum += c[i-1] * s[i-1];
        }
        s[imax] = ( d[imax] - b[imax-1] * s[imax-1] - sum ) / a[imax];


        // backward elimination
        s[imax] = - s[imax] / a[imax];
        s[imax-1] = -( s[imax-1] + b[imax-1] * s[imax] ) / a[imax-1];
        for ( i = imax - 2; i >= 0; i-- )
            s[i] = - ( s[i] + b[i] * s[i+1] + c[i] * s[imax] ) / a[i];

        //
        // Finally, determine the spline coefficients
        //
        s[size-1] = s[0];
        for ( i = 0; i < size - 1; i++ )
        {
            a[i] = ( s[i+1] - s[i] ) / ( 6.0 * h[i] );
            b[i] = 0.5 * s[i];
            c[i] = ( p[i+1].y - p[i].y )
                / h[i] - ( s[i+1] + 2.0 * s[i] ) * h[i] / 6.0;
        }

        return true;

    }


};


define("jQwtSpline", ["static"], function(){});


function SideBar(plot, tbar, makeSamples){

var sideBarDlg = 
$('<div id="sideBar" style="position: absolute; height:98%; background-color:#ffc9ae;  border-style: solid; border-width:1px">\
<div class="noSelect" style="text-align:center"><h4>Sidebar</h4></div>\
<div style="margin:4px">\
<select id="currentCurve" style="width:100%">\
</select></div>\
<div><input id="fnDisplay" style="width:100%" readonly /></div>\
<div><label style="margin:4px">onchcange: <input id="onchange" type="checkbox" readonly /></label></div>\
\
<div style="height:40%; overflow: auto">\
<div id="coeff_cont0" style="background-color:lightBlue; margin:2px; border-radius:4px">\
<div style="">Coefficient:<b><span id="coeff0">?</span></b></div>\
<div style="margin:4px">\
<div style="" title="A coefficient in the function that could be ajusted">\
value:<input id="coeff_val0" style="width:60%" type="number" value="1" />\
</div>\
</div>\
</div>\
<br>\
<div id="coeff_cont1" style="background-color:lightBlue; margin:2px; border-radius:4px">\
<div style="">Coefficient:<b><span id="coeff1">?</span></b></div>\
<div style="margin:4px">\
<div style="" title="A coefficient in the function that could be ajusted">\
value:<input id="coeff_val1" style="width:60%" type="number" value="1" />\
</div>\
</div>\
</div>\
<br>\
<div id="coeff_cont2" style="background-color:lightBlue; margin:2px; border-radius:4px">\
<div style="">Coefficient:<b><span id="coeff2">?</span></b></div>\
<div style="margin:4px">\
<div style="" title="A coefficient in the function that could be ajusted">\
value:<input id="coeff_val2" style="width:60%" type="number" value="1" />\
</div>\
</div>\
</div>\
<br>\
<div id="coeff_cont3" style="background-color:lightBlue; margin:2px; border-radius:4px">\
<div style="">Coefficient:<b><span id="coeff3">?</span></b></div>\
<div style="margin:4px">\
<div style="" title="A coefficient in the function that could be ajusted">\
        value:<input id="coeff_val3" style="width:60%" type="number" value="1" />\
           </div>\
         </div>\
      </div>\
      <br>\
      <div id="coeff_cont4" style="background-color:lightBlue; margin:2px; border-radius:4px">\
        <div style="">Coefficient:<b><span id="coeff4">?</span></b></div>\
          <div style="margin:4px">\
           <div style="" title="A coefficient in the function that could be ajusted">\
        value:<input id="coeff_val4" style="width:60%" type="number" value="1" />\
           </div>\
         </div>\
      </div>\
      </div>\
      \
      <div style="text-align:center"><h4>Watches</h4></div>\
      <div class="table-responsive" style="height: 34%">\
      \
        \
          <table class="table table-bordered" id="watchTable">\
            <thead>\
              <tr>\
                <th>Watch</th>\
                <th>Value</th>\
             </tr>\
            </thead>\
            <tbody id="watchTableBody">\
            </tbody>\
          </table>\
          \
          \
      </div>\
    </div>')

 $("body").append(sideBarDlg); 

/*var coeffId = tbar.addToolButton("pushbutton", {
			text: "Coeff.",
			cb: toggleCoeffFn,
			//innerHtmlId: "functionpushbutton",
			class: "btn btn-primary",
			tooltip: "Toggle coefficient sidebar."
		})*/
var self = this

var sideBarVisible=false
var _rulers = null

/*this.isSidebar = function(){
	return sideBarVisible;
}*/

var visible = false
Static.bind("beforePrint", function(){
	if(sideBarVisible){
		visible = true
		showSidebar(false)
	}	
})

Static.bind("afterPrint", function(){
	if(visible){
		visible = false
		showSidebar(true)		
	}		
})


$("#sideBar").hide() 

function initSidebarSelect(){
	var opts = $("#currentCurve").children()
	for(var i=0; i<opts.length; ++i){
		//opts[i].remove()
		$("#currentCurve")[0].removeChild(opts[i]);
	}
	var curves = plot.itemList(Static.Rtti_PlotCurve)
	for(var i=0; i<curves.length; ++i){
		if(curves[i].isVisible()){
			var opt = $('<option>'+curves[i].title()+'</option>')
			opt.attr("value", curves[i].title())
			$("#currentCurve").append(opt)
		}
	}

	//console.log(44, $("#currentCurve").val())

	/*if($("#currentCurve").val()==null){
		//Invalidate cache and, thus, force integrate() to re-compute
		Static.total_volume = undefined
		Static.total_area = undefined
		Static.prevStart = undefined
		Static.prevEnd = undefined
	}	*/
}

function hideAllInputs(){
	for(var i=0; i<5; ++i){
		$("#coeff_cont"+(i)).hide()
	}
}
//Static.alert("You have more than 5 unknown coefficients. Only the first 5 coefficients could be adjusted from the sidebar. The value of each remaining will be 1.")
function initSidebarInput(){
	var curves = plot.itemList(Static.Rtti_PlotCurve)
	hideAllInputs()
	var curCurve = plot.findPlotCurve($("#currentCurve").val())
	if(!curCurve){
		return
	}
	/*if(_rulers){
		_rulers.setCurrentCurve(curCurve)
	}*/
	//console.log(curCurve)
	$("#fnDisplay").val("")
	if(curCurve.fn){
		$("#fnDisplay").val("f("+curCurve.variable+")="+curCurve.fn)
	}

	var coeffs = curCurve.coeffs || []

	var step = (curCurve.upperX - curCurve.lowerX)/80
    var numOfCoeffs = coeffs.length


    if(numOfCoeffs>5){
    	//Static.alert("You have more than 5 unknown coefficients. Only the first 5 coefficients could be adjusted from the sidebar. The value of each remaining will be 1.")
    	//alert(44)
    	numOfCoeffs = 5
    	//return
    }  
	for(var i=0; i<numOfCoeffs; ++i){
		//console.log(coeffs[i])
		$("#coeff"+i).html(coeffs[i])
		$("#coeff_val"+i).attr("step", step)
		$("#coeff_val"+i).val(curCurve.coeffsVal[i])
		$("#coeff_cont"+i).show()		
	}
	
}

function initSidebar(){
	initSidebarSelect()
	initSidebarInput() 
	if(_rulers){
		var curCurve = plot.findPlotCurve($("#currentCurve").val())
		_rulers.setCurrentCurve(curCurve)
		//$("#currentCurve")[0].selectedIndex = curves.length-1
	}
}

this.initSidebar = function(){
	initSidebar()
}

this.currentCurveName = function(){
	return $("#currentCurve").val()
}

this.setRulers = function(rulers){
	_rulers = rulers
}

var sideBarWidth = 20 //As percentage

//left:90.1%; width:9.8%; height: 98%; 
$("#sideBar").css("width", (sideBarWidth-0.2)+"%")
$("#sideBar").css("left", (100-sideBarWidth+0.1)+"%")

function showSidebar(on){
	if(on){		      
        $("#sideBar").show()
        $("#plotDiv").parent().css("width", (100-sideBarWidth)+"%")
        initSidebar()
        /*if(_rulers){
			var curCurve = plot.findPlotCurve($("#currentCurve").val())
			_rulers.setCurrentCurve(curCurve)
			//$("#currentCurve")[0].selectedIndex = curves.length-1
		}*/
               
  	}else{
    	$("#sideBar").hide()
    	$("#plotDiv").parent().css("width", "100%")  
                                 
  	} 
    sideBarVisible=on
      //Static.trigger("showSidebar", on)
    plot.autoRefresh()  
    
}

this.showSidebar = function(on){
	showSidebar(on)
}

/*function toggleCoeffFn() {
	if(plot.itemList(Static.Rtti_PlotCurve).length){
    	showSidebar(!sideBarVisible)
    }	      
}

tbar.hide(coeffId)

Static.bind("itemAttached", function(e, plotItem, on){
    if(plotItem.rtti == Static.Rtti_PlotCurve){
	     if(on){ //attached
			
				tbar.show(coeffId)
			
		}else{ //detached
			if(!plot.itemList(Static.Rtti_PlotCurve).length){
	    				tbar.hide(coeffId)
					showSidebar(false)
					sideBarVisible = false    

			}
		}
      	initSidebar()
    }
})
*/


$("#currentCurve").change(function(){
	//Invalidate cache and, thus, force integrate() to re-compute
	Static.total_volume = undefined
	Static.total_area = undefined
	Static.prevStart = undefined
	Static.prevEnd = undefined

	//console.log(456)

	initSidebarInput()
	if(_rulers){
		var curCurve = plot.findPlotCurve($("#currentCurve").val())
		_rulers.setCurrentCurve(curCurve)
	}
	
})

function adjustCurve(){
	var curCurve = plot.findPlotCurve($("#currentCurve").val())
     //console.log(curCurve.title())
     var coeffs = curCurve.coeffs
     var fn = curCurve.fn
     for(var i=0; i<coeffs.length; ++i){
		while(fn.indexOf(coeffs[i])!= -1){
               fn=fn.replace(coeffs[i], $("#coeff_val"+i).val())
           }
		curCurve.coeffsVal[i]= $("#coeff_val"+i).val()
     }
    //console.log(curCurve.coeffsVal)

     var data = curCurve.data()
     if(curCurve.unboundedRange){     	
     	data.setFn(fn)
     	//console.log(fn)
     }else{	
     	data.setSamples(makeSamples({fx:fn, 
		lowerX:curCurve.lowerX, 
		upperX:curCurve.upperX,
	    numOfSamples: curCurve.numOfSamples}))
     }
     Static.trigger("curveAdjusted")
     //console.log(curCurve.data().samples())
     plot.autoRefresh()
}

$("#coeff_val0, #coeff_val1, #coeff_val2, #coeff_val3, #coeff_val4").on("input", function(){
     if(!$("#onchange")[0].checked)
     		adjustCurve()
})

$("#coeff_val0, #coeff_val1, #coeff_val2, #coeff_val3, #coeff_val4").on("change", function(){
     if($("#onchange")[0].checked)
     		adjustCurve()
})
}
;
define("sideBar", function(){});


///////////////////Panner///////////////////start
//Panner.inheritsFrom( HObject );
class Panner extends HObject{
//function Panner(plot ){
    constructor(plot){
        super()
  //HObject.call(this)
  var self = this;
  var m_plot = null;
  var m_mouseButton = Static.LeftButton
  var buttonModifiers = Static.NoModifier;

  var abortKey = Static.Key_Escape;
  var abortKeyModifiers = Static.NoModifier;

  
  var initialPosX = 0;
  var initialPosY = 0;
  var posX = 0;
  var posY = 0;

  var m_enabled = false;

  var m_canvas = null;
  
  var m_mouseDown = false;
  
  var m_cursor = "";
  var m_restoreCursor = "";
  var m_hasCursor = false;
  var m_orientations = Vertical | Horizontal;
  
    var deltaX = 0;
    var deltaY = 0;
    
    if(typeof(plot)!=="undefined"){
        plot.panner = this
        m_plot = plot;
        //this.setElement(m_plot.getLayout().getCentralDiv());
    }
    
    this.plot = function(){
        return m_plot;
    }

    /*!
   Change the mouse button and modifiers used for panning
   The defaults are Qt::LeftButton and Qt::NoModifier
*/
this.setMouseButton = function( btn, modifiers )
{
    m_mouseButton = btn;
    buttonModifiers = modifiers;    
}

//! Get mouse button and modifiers used for panning
this.getMouseButton = function(  ) {
    return {button: m_mouseButton, modifiers: buttonModifiers}
}

this.setOrientation = function( orientation){

    m_orientations = orientation
}
     

    
    function movePlotItems(){        
        var itemStore = self.plot().plotItemStore();
        for(var i=0; i<itemStore.length; ++i){
            var c = itemStore[i].getCanvas();
            c.css("left", deltaX);
            c.css("top", deltaY);            
        }
    }
//alert(487)
    this.rescaleAndRedraw = function(_deltaX, _deltaY){
        var itemStore = self.plot().plotItemStore();
        for(var i=0; i<itemStore.length; ++i){
            var c = itemStore[i].getCanvas();
            c.css("left", 0);
            c.css("top", 0);
        }
        var doReplot = false;
        var autoReplot = m_plot.autoReplot();
        m_plot.setAutoReplot( false );
        var rescaled = false
        for ( var axis = 0; axis < axisCnt; axis++ )
        {

//          if (!m_plot.axisEnabled(axis) )
//              continue;

            var map = self.plot().canvasMap( axis );
            var p1 = map.transform( self.plot().axisScaleDiv( axis ).lowerBound() );
            var p2 = map.transform( self.plot().axisScaleDiv( axis ).upperBound() );


            var d1, d2;

            if ( axis == xBottom || axis == xTop )
            {
                d1 = map.invTransform( p1 - _deltaX );
                d2 = map.invTransform( p2 - _deltaX );

            }
            else
            {
                d1 = map.invTransform( p1 - _deltaY );
                d2 = map.invTransform( p2 - _deltaY );
            }
            m_plot.setAxisScale( axis, d1, d2 );
            //rescaled = true
            doReplot = true;

        }
        // if(rescaled)
        //   Static.trigger("rescaled");
        m_plot.setAutoReplot( autoReplot );
        if(doReplot)
            m_plot.replot();

    }
    
    
    /*function pointInCentralDiv(pt){
        return pt.x > 0 && p.x < this.plot().getCentralDiv()[0].width && pt.y > 0 && pt.y < this.plot().getCentralDiv()[0].height;
    }*/

    // this.event = function(event) {
    //     //console.log(this.hasMouseTracking())
    //     switch(event.type) {
    //       case 'mousedown':
    //         { 
    //             this.setMouseTracking(true)

    //         if ( !Static.isMobile() && ( event.button != m_mouseButton ) /*|| ( mouseEvent.modifiers != m_mouseButtonModifiers )*/ )
    //             { 

    //                 return true;
    //             }

    //             if (Static.isMobile()){
    //                 initialPosX = event.originalEvent.touches[0].clientX;
    //                 initialPosY = event.originalEvent.touches[0].clientY;
    //                 m_mouseDown = true; 
    //             }else{        
    //                 initialPosX = event.clientX;
    //                 initialPosY = event.clientY;
    //                 m_mouseDown = true; 
    //             }

    //                 this.showCursor(true)
    //                 //return true
    //            return true;       
    //         }
    //         break;
    //       case 'mousemove':
    //         {        
    //             if(m_mouseDown){
    //                 if ( !Static.isMobile()){
    //                     //this.showCursor(true)
    //                     deltaX = event.clientX-initialPosX;
    //                     deltaY = event.clientY-initialPosY;
    //                 }else{
    //                     var touchobj = event.originalEvent.changedTouches[0] // reference first touch point for this event
    //                     deltaX = parseInt(touchobj.clientX)-initialPosX;
    //                     deltaY = parseInt(touchobj.clientY)-initialPosY;
    //                 }
    //                 movePlotItems(deltaX, deltaY);
    //             }
    //            // return true;
    //         }
    //         break;
    //         case 'mouseup':
    //             {
    //             if(!m_mouseDown) return
    //                m_mouseDown = false;
    //                self.showCursor(false)
    //                     if(deltaX !=0 || deltaY !=0){
    //                         self.rescaleAndRedraw(deltaX, deltaY)
    //                         deltaX = 0;
    //                         deltaY = 0;
    //                     }
    //                 this.setMouseTracking(false)
    //                // return true
    //             }
            
    //         break;
    //         default:
    //                 // code block
    //     }
    // }
    
 
/*var mouseupEvent = "mouseup"
                 if(Static.isMobile()){
                   mouseupEvent = "touchend"
                 }*/

/*$("#plotDivContainer").on('mouseup', function(){   
   if(!m_mouseDown) return
   m_mouseDown = false;
   self.showCursor(false)
        if(deltaX !=0 || deltaY !=0){
            self.rescaleAndRedraw(deltaX, deltaY)
            deltaX = 0;
            deltaY = 0;
        }
   // return true
});*/
 

    this.showCursor = function( on )
    {
        
        if ( on == m_hasCursor )
            return;
    
        if ( this.plot() == null || m_cursor == "" )
            return;
    
        m_hasCursor = on;
        
    
        if ( on )
        {
            if ( this.plot().isCursorSet() )
            {
                m_restoreCursor = this.plot().cursor();
            }
            this.plot().setCursor( m_cursor );
            
        }
        else
        {
            if ( m_restoreCursor!=="" )
            {
                this.plot().setCursor( m_restoreCursor );
                m_restoreCursor = "";
            }
            else
                this.plot().unsetCursor();
        }
    }
    this.setCursor = function( cursor )
    {
        m_cursor = cursor;
    }
    /*!
       \return Cursor that is active while panning
       \sa setCursor()
    */
    this.cursor = function()
    {
        if ( m_cursor!="" )
            return m_cursor;
    
        if ( this.plot()!=null )
            return  this.plot().cursor();
    
        return "";
    }

    //this.setMouseButton(LeftButton)
    //this.setMouseTracking(false);
    if(this.plot())
        this.setEnabled_1( true );
    //console.log(this.hasMouseTracking())

    //var w = plot.getCentralWidget()
    //w.installEventFilter( this );

    /*!
        \brief En/disable the panner

        When enabled is true an event filter is installed for
        the observed widget, otherwise the event filter is removed.

        \param enabled true or false
        \sa isEnabled(), eventFilter()
         */
        this.setEnabled = function (enabled) {
            if (m_enabled != enabled) {
                m_enabled = enabled;

                /*QWidget*/
                var w = plot.getCentralWidget();
                if (w) {
                    if (enabled){
                        //w.setEnabled_1(true)
                        w.installEventFilter(this);
                    }
                    else
                        w.removeEventFilter(this);
                }

                //this.updateDisplay();
            }
        }

	this.isEnabled = function (enabled) {
            return m_enabled;
        }


    this.widgetMousePressEvent = function(  event ){
        
            if ( !Static.isMobile() && ( event.button != m_mouseButton ) /*|| ( mouseEvent.modifiers != m_mouseButtonModifiers )*/ )
                { 

                    return true;
                }

                if (Static.isMobile()){
                    initialPosX = event.originalEvent.touches[0].clientX;
                    initialPosY = event.originalEvent.touches[0].clientY;
                    m_mouseDown = true; 
                }else{        
                    initialPosX = event.clientX;
                    initialPosY = event.clientY;
                    m_mouseDown = true; 
                }

                    this.showCursor(true)
                    //return true
               return true;       
    }

    this.widgetMouseUpEvent = function(  event ){
        if(!m_mouseDown) return
                   m_mouseDown = false;
                   self.showCursor(false)
                        if(deltaX !=0 || deltaY !=0){
                            self.rescaleAndRedraw(deltaX, deltaY)
                            deltaX = 0;
                            deltaY = 0;
                        }
                    
                   // return true
                
    }

    this.widgetMouseMoveEvent = function(  event ){
        if(m_mouseDown){
                    if ( !Static.isMobile()){
                        //this.showCursor(true)
                        deltaX = event.clientX-initialPosX;
                        deltaY = event.clientY-initialPosY;

                    }else{
                        var touchobj = event.originalEvent.changedTouches[0] // reference first touch point for this event
                        deltaX = parseInt(touchobj.clientX)-initialPosX;
                        deltaY = parseInt(touchobj.clientY)-initialPosY;
                    }
                    if(m_orientations == Vertical)
                        deltaX = 0
                    if(m_orientations == Horizontal)
                        deltaY = 0
                    movePlotItems(/*deltaX, deltaY*/);
                }
               // return true;
    }
    Static.trigger('pannerAdded', this)
    this.setEnabled(true)
}

    eventFilter(watched, event) {
        if(!this.isEnabled()) return
        //console.log(watched.hasMouseTracking())
        //console.log(event.type)
        var mt = false;
        switch(event.type) {
          case 'mousedown':
          {
            //mt = watched.hasMouseTracking()
            //if(!mt)
                //watched.setMouseTracking(true)
            this.widgetMousePressEvent(event)
        }
            break;
          case 'mousemove':
            this.widgetMouseMoveEvent(event)
            break;
          case 'mouseleave':
            this.widgetMouseUpEvent(event)
            break;
            case 'mouseup':
                {
                    this.widgetMouseUpEvent(event)
                    //if(!mt)
                        ;//watched.setMouseTracking(false)
                }
            break;
            default:
                    // code block
        }
    }
    

}
Panner.prototype.toString = function () {
    return '[Panner]';
}

////////////////////////////////////////////end
;
define("jQwtPanner", ["static"], function(){});


/*
 *contextMenu.js v 1.4.1
 *Author: Sudhanshu Yadav
 *s-yadav.github.com
 *Copyright (c) 2013-2015 Sudhanshu Yadav.
 *Dual licensed under the MIT and GPL licenses
 */
;
(function($, window, document, undefined) {
    "use strict";

    $.single = (function() {
        var single = $({});
        return function(elm) {
            single[0] = elm;
            return single;
        };
    }());

    $.fn.contextMenu = function(method, selector, option) {

        //parameter fix
        if (!methods[method]) {
            option = selector;
            selector = method;
            method = 'popup';
        }
        //need to check for array object
        else if (selector) {
            if (!((selector instanceof Array) || (typeof selector === 'string') || (selector.nodeType) || (selector.jquery))) {
                option = selector;
                selector = null;
            }
        }

        if ((selector instanceof Array) && (method != 'update')) {
            method = 'menu';
        }

        var myoptions = option;
        if ($.inArray(method, ['menu', 'popup', 'close', 'destroy']) > -1) {
            option = iMethods.optionOtimizer(method, option);
            this.each(function() {
                var $this = $(this)
                myoptions = $.extend({}, $.fn.contextMenu.defaults, option);
                if (!myoptions.baseTrigger) {
                    myoptions.baseTrigger = $this;
                }
                methods[method].call($this, selector, myoptions)
            });
        } else {
            methods[method].call(this, selector, myoptions)
        }
        return this;
    };
    $.fn.contextMenu.defaults = {
        triggerOn: 'click', //avaliable options are all event related mouse plus enter option
        subMenuTriggerOn: 'hover click',
        displayAround: 'cursor', // cursor or trigger
        mouseClick: 'left',
        verAdjust: 0,
        horAdjust: 0,
        top: 'auto',
        left: 'auto',
        closeOther: true, //to close other already opened context menu
        containment: window,
        winEventClose: true,
        position: 'auto', //allowed values are top, left, bottom and right
        closeOnClick: true, //close context menu on click/ trigger of any item in menu

        //callback
        onOpen: function(data, event) {},
        afterOpen: function(data, event) {},
        onClose: function(data, event) {}
    };

    var methods = {
        menu: function(selector, option) {
            selector = iMethods.createMenuList(this, selector, option);
            iMethods.contextMenuBind.call(this, selector, option, 'menu');
        },
        popup: function(selector, option) {
            $(selector).addClass('iw-contextMenu');
            iMethods.contextMenuBind.call(this, selector, option, 'popup');
        },
        update: function(selector, option) {
            var self = this;
            option = option || {};

            this.each(function() {
                var trgr = $(this),
                    menuData = trgr.data('iw-menuData');
                //refresh if any new element is added
                if (!menuData) {
                    self.contextMenu('refresh');
                    menuData = trgr.data('iw-menuData');
                }

                var menu = menuData.menu;
                if (typeof selector === 'object') {

                    for (var i = 0; i < selector.length; i++) {
                        var name = selector[i].name,
                            disable = selector[i].disable,
                            fun = selector[i].fun,
                            icon = selector[i].icon,
                            img = selector[i].img,
                            title = selector[i].title,
                            className = selector[i].className,
                            elm = menu.children('li').filter(function() {
                                return $(this).contents().filter(function() {
                                    return this.nodeType == 3;
                                }).text() == name;
                            }),
                            subMenu = selector[i].subMenu;

                        //toggle disable if provided on update method
                        disable != undefined && (disable ? elm.addClass('iw-mDisable') : elm.removeClass('iw-mDisable'));

                        //bind new function if provided
                        fun && elm.unbind('click.contextMenu').bind('click.contextMenu', fun);

                        //update title
                        title != undefined && elm.attr('title', title);

                        //update class name
                        className != undefined && elm.attr('class', className);

                        var imgIcon = elm.find('.iw-mIcon');
                        if(imgIcon.length) imgIcon.remove();
                        
                        //update image or icon
                        if (img) {
                            elm.prepend('<img src="' + img + '" align="absmiddle" class="iw-mIcon" />');
                        } else if (icon) {
                            elm.prepend('<span align="absmiddle" class="iw-mIcon '+icon+'" />');
                        }
                        
                        //to change submenus
                        if (subMenu) {
                            elm.contextMenu('update', subMenu);
                        }
                    }
                }

                iMethods.onOff(menu);

                //bind event again if trigger option has changed.
                var triggerOn = option.triggerOn;
                if (triggerOn) {
                    trgr.unbind('.contextMenu');

                    //add contextMenu identifier on all events
                    triggerOn = triggerOn.split(" ");
                    var events = [];
                    for (var i = 0, ln = triggerOn.length; i < ln; i++) {
                        events.push(triggerOn[i] + '.contextMenu')
                    }

                    //to bind event
                    trgr.bind(events.join(' '), iMethods.eventHandler);
                }

                //set menu data back to trigger element
                menuData.option = $.extend({}, menuData.option, option);
                trgr.data('iw-menuData', menuData);
            });
        },
        refresh: function() {
            var menuData = this.filter(function() {
                return !!$(this).data('iw-menuData');
            }).data('iw-menuData'),
                newElm = this.filter(function() {
                    return !$(this).data('iw-menuData');
                });
            //to change basetrigger on refresh  
            menuData.option.baseTrigger = this;
            iMethods.contextMenuBind.call(newElm, menuData.menuSelector, menuData.option);
        },
        open: function(sel, data) {
            data = data || {};
            var e = data.event || $.Event('click');
            if (data.top) e.clientY = data.top;
            if (data.left) e.clientX = data.left;
            this.each(function() {
                iMethods.eventHandler.call(this, e);
            });
        },
        //to force context menu to close
        close: function() {
            var menuData = this.data('iw-menuData');
            if (menuData) {
                iMethods.closeContextMenu(menuData.option, this, menuData.menu, null);
            }
        },
        //to get value of a key
        value: function(key) {
            var menuData = this.data('iw-menuData');
            if (menuData[key]) {
                return menuData[key];
            } else if (menuData.option) {
                return menuData.option[key];
            }
            return null;
        },
        destroy: function() {
            var trgr = this,
                menuId = trgr.data('iw-menuData').menuId,
                menu = $('.iw-contextMenu[menuId=' + menuId + ']'),
                menuData = menu.data('iw-menuData');

            //Handle the situation of dynamically added element.
            if (!menuData) return;


            if (menuData.noTrigger == 1) {
                if (menu.hasClass('iw-created')) {
                    menu.remove();
                } else {
                    menu.removeClass('iw-contextMenu ' + menuId)
                        .removeAttr('menuId').removeData('iw-menuData');
                    //to destroy submenus
                    menu.find('li.iw-mTrigger').contextMenu('destroy');
                }
            } else {
                menuData.noTrigger--;
                menu.data('iw-menuData', menuData);
            }
            trgr.unbind('.contextMenu').removeClass('iw-mTrigger').removeData('iw-menuData');
        }
    };
    var iMethods = {
        contextMenuBind: function(selector, option, method) {
            var trigger = this,
                menu = $(selector),
                menuData = menu.data('iw-menuData');

            //fallback
            if (menu.length == 0) {
                menu = trigger.find(selector);
                if (menu.length == 0) {
                    return;
                }
            }

            if (method == 'menu') {
                iMethods.menuHover(menu);
            }
            //get base trigger
            var baseTrigger = option.baseTrigger;


            if (!menuData) {
                var menuId;
                if (!baseTrigger.data('iw-menuData')) {
                    menuId = Math.ceil(Math.random() * 100000);
                    baseTrigger.data('iw-menuData', {
                        'menuId': menuId
                    });
                } else {
                    menuId = baseTrigger.data('iw-menuData').menuId;
                }
                //create clone menu to calculate exact height and width.
                var cloneMenu = menu.clone();
                cloneMenu.appendTo('body');

                menuData = {
                    'menuId': menuId,
                    'menuWidth': cloneMenu.outerWidth(true),
                    'menuHeight': cloneMenu.outerHeight(true),
                    'noTrigger': 1,
                    'trigger': trigger
                };


                //to set data on selector
                menu.data('iw-menuData', menuData).attr('menuId', menuId);
                //remove clone menu
                cloneMenu.remove();
            } else {
                menuData.noTrigger++;
                menu.data('iw-menuData', menuData);
            }

            //to set data on trigger
            trigger.addClass('iw-mTrigger').data('iw-menuData', {
                'menuId': menuData.menuId,
                'option': option,
                'menu': menu,
                'menuSelector': selector,
                'method': method
            });

            //hover fix
            var triggerOn = option.triggerOn;
            if (triggerOn.indexOf('hover') != -1) {
                triggerOn = triggerOn.replace('hover', 'mouseenter');
                //hover out if display is of context menu is on hover
                if (baseTrigger.index(trigger) != -1) {
                    baseTrigger.add(menu).bind('mouseleave.contextMenu', function(e) {
                        if ($(e.relatedTarget).closest('.iw-contextMenu').length == 0) {
                            $('.iw-contextMenu[menuId="' + menuData.menuId + '"]').fadeOut(100);
                        }
                    });
                }

            }

            trigger.delegate('input,a,.needs-click', 'click', function(e) {
                e.stopImmediatePropagation()
            });

            //add contextMenu identifier on all events
            triggerOn = triggerOn.split(' ');
            var events = [];
            for (var i = 0, ln = triggerOn.length; i < ln; i++) {
                events.push(triggerOn[i] + '.contextMenu')
            }

            //to bind event
            trigger.bind(events.join(' '), iMethods.eventHandler);

            //to stop bubbling in menu
            menu.bind('click mouseenter', function(e) {
                e.stopPropagation();
            });

            menu.delegate('li', 'click', function(e) {
                if (option.closeOnClick && !$.single(this).hasClass('iw-has-submenu')) iMethods.closeContextMenu(option, trigger, menu, e);
            });
        },
        eventHandler: function(e) {
            e.preventDefault();
            var trigger = $(this),
                trgrData = trigger.data('iw-menuData'),
                menu = trgrData.menu,
                menuData = menu.data('iw-menuData'),
                option = trgrData.option,
                cntnmnt = option.containment,
                clbckData = {
                    trigger: trigger,
                    menu: menu
                },
                //check conditions
                cntWin = cntnmnt == window,
                btChck = option.baseTrigger.index(trigger) == -1;

            //to close previous open menu.
            if (!btChck && option.closeOther) {
                $('.iw-contextMenu').css('display', 'none');
            }

            //to reset already selected menu item
            menu.find('.iw-mSelected').removeClass('iw-mSelected');

            //call open callback
            option.onOpen.call(this, clbckData, e);


            var cObj = $(cntnmnt),
                cHeight = cObj.innerHeight(),
                cWidth = cObj.innerWidth(),
                cTop = 0,
                cLeft = 0,
                menuHeight = menuData.menuHeight,
                menuWidth = menuData.menuWidth,
                va, ha,
                left = 0,
                top = 0,
                bottomMenu,
                rightMenu,
                verAdjust = va = parseInt(option.verAdjust),
                horAdjust = ha = parseInt(option.horAdjust);

            if (!cntWin) {
                cTop = cObj.offset().top;
                cLeft = cObj.offset().left;

                //to add relative position if no position is defined on containment
                if (cObj.css('position') == 'static') {
                    cObj.css('position', 'relative');
                }

            }


            if (option.displayAround == 'cursor') {
                left = cntWin ? e.clientX : e.clientX + $(window).scrollLeft() - cLeft;
                top = cntWin ? e.clientY : e.clientY + $(window).scrollTop() - cTop;
                bottomMenu = top + menuHeight;
                rightMenu = left + menuWidth;
                //max height and width of context menu
                if (bottomMenu > cHeight) {
                    if ((top - menuHeight) < 0) {
                        if ((bottomMenu - cHeight) < (menuHeight - top)) {
                            top = cHeight - menuHeight;
                            va = -1 * va;
                        } else {
                            top = 0;
                            va = 0;
                        }
                    } else {
                        top = top - menuHeight;
                        va = -1 * va;
                    }
                }
                if (rightMenu > cWidth) {
                    if ((left - menuWidth) < 0) {
                        if ((rightMenu - cWidth) < (menuWidth - left)) {
                            left = cWidth - menuWidth;
                            ha = -1 * ha;
                        } else {
                            left = 0;
                            ha = 0;
                        }
                    } else {
                        left = left - menuWidth;
                        ha = -1 * ha;
                    }
                }
            } else if (option.displayAround == 'trigger') {
                var triggerHeight = trigger.outerHeight(true),
                    triggerWidth = trigger.outerWidth(true),
                    triggerLeft = cntWin ? trigger.offset().left - cObj.scrollLeft() : trigger.offset().left - cLeft,
                    triggerTop = cntWin ? trigger.offset().top - cObj.scrollTop() : trigger.offset().top - cTop,
                    leftShift = triggerWidth;

                left = triggerLeft + triggerWidth;
                top = triggerTop;


                bottomMenu = top + menuHeight;
                rightMenu = left + menuWidth;
                //max height and width of context menu
                if (bottomMenu > cHeight) {
                    if ((top - menuHeight) < 0) {
                        if ((bottomMenu - cHeight) < (menuHeight - top)) {
                            top = cHeight - menuHeight;
                            va = -1 * va;
                        } else {
                            top = 0;
                            va = 0;
                        }
                    } else {
                        top = top - menuHeight + triggerHeight;
                        va = -1 * va;
                    }
                }
                if (rightMenu > cWidth) {
                    if ((left - menuWidth) < 0) {
                        if ((rightMenu - cWidth) < (menuWidth - left)) {
                            left = cWidth - menuWidth;
                            ha = -1 * ha;
                            leftShift = -triggerWidth;
                        } else {
                            left = 0;
                            ha = 0;
                            leftShift = 0;
                        }
                    } else {
                        left = left - menuWidth - triggerWidth;
                        ha = -1 * ha;
                        leftShift = -triggerWidth;
                    }
                }
                //test end
                if (option.position == 'top') {
                    top = triggerTop - menuHeight;
                    va = verAdjust;
                    left = left - leftShift;
                } else if (option.position == 'left') {
                    left = triggerLeft - menuWidth;
                    ha = horAdjust;
                } else if (option.position == 'bottom') {
                    top = triggerTop + triggerHeight;
                    va = verAdjust;
                    left = left - leftShift;
                } else if (option.position == 'right') {
                    left = triggerLeft + triggerWidth;
                    ha = horAdjust;
                }
            }

            //applying css property
            var cssObj = {
                'position': (cntWin || btChck) ? 'fixed' : 'absolute',
                'display': 'inline-block',
                'height': '',
                'width': ''
            };


            //to get position from offset parent
            if (option.left != 'auto') {
                left = iMethods.getPxSize(option.left, cWidth);
            }
            if (option.top != 'auto') {
                top = iMethods.getPxSize(option.top, cHeight);
            }
            if (!cntWin) {
                var oParPos = trigger.offsetParent().offset();
                if (btChck) {
                    left = left + cLeft - $(window).scrollLeft();
                    top = top + cTop - $(window).scrollTop();
                } else {
                    left = left - (cLeft - oParPos.left);
                    top = top - (cTop - oParPos.top);
                }
            }
            cssObj.left = left + ha + 'px';
            cssObj.top = top + va + 'px';

            menu.css(cssObj);

            //to call after open call back
            option.afterOpen.call(this, clbckData, e);


            //to add current menu class
            if (trigger.closest('.iw-contextMenu').length == 0) {
                $('.iw-curMenu').removeClass('iw-curMenu');
                menu.addClass('iw-curMenu');
            }


            var dataParm = {
                trigger: trigger,
                menu: menu,
                option: option,
                method: trgrData.method
            };
            $('html').unbind('click', iMethods.clickEvent).click(dataParm, iMethods.clickEvent);
            $(document).unbind('keydown', iMethods.keyEvent).keydown(dataParm, iMethods.keyEvent);
            if (option.winEventClose) {
                $(window).bind('scroll resize', dataParm, iMethods.scrollEvent);
            }
        },

        scrollEvent: function(e) {
            iMethods.closeContextMenu(e.data.option, e.data.trigger, e.data.menu, e);
        },

        clickEvent: function(e) {
            var button = e.data.trigger.get(0);

            if ((button !== e.target) && ($(e.target).closest('.iw-contextMenu').length == 0)) {
                iMethods.closeContextMenu(e.data.option, e.data.trigger, e.data.menu, e);
            }
        },
        keyEvent: function(e) {
            e.preventDefault();
            var menu = e.data.menu,
                option = e.data.option,
                keyCode = e.keyCode;
            // handle cursor keys
            if (keyCode == 27) {
                iMethods.closeContextMenu(option, e.data.trigger, menu, e);
            }
            if (e.data.method == 'menu') {
                var curMenu = $('.iw-curMenu'),
                    optList = curMenu.children('li:not(.iw-mDisable)'),
                    selected = optList.filter('.iw-mSelected'),
                    index = optList.index(selected),
                    focusOn = function(elm) {
                        iMethods.selectMenu(curMenu, elm);
                        var menuData = elm.data('iw-menuData');
                        if (menuData) {
                            iMethods.eventHandler.call(elm[0], e);

                        }
                    },
                    first = function() {
                        focusOn(optList.filter(':first'));
                    },
                    last = function() {
                        focusOn(optList.filter(':last'));
                    },
                    next = function() {
                        focusOn(optList.filter(':eq(' + (index + 1) + ')'));
                    },
                    prev = function() {
                        focusOn(optList.filter(':eq(' + (index - 1) + ')'));
                    },
                    subMenu = function() {
                        var menuData = selected.data('iw-menuData');
                        if (menuData) {
                            iMethods.eventHandler.call(selected[0], e);
                            var selector = menuData.menu;
                            selector.addClass('iw-curMenu');
                            curMenu.removeClass('iw-curMenu');
                            curMenu = selector;
                            optList = curMenu.children('li:not(.iw-mDisable)');
                            selected = optList.filter('.iw-mSelected');
                            first();
                        }
                    },
                    parMenu = function() {
                        var selector = curMenu.data('iw-menuData').trigger;
                        var parMenu = selector.closest('.iw-contextMenu');
                        if (parMenu.length != 0) {
                            curMenu.removeClass('iw-curMenu').css('display', 'none');
                            parMenu.addClass('iw-curMenu');
                        }
                    };
                switch (keyCode) {
                    case 13:
                        selected.click();
                        break;
                    case 40:
                        (index == optList.length - 1 || selected.length == 0) ? first() : next();
                        break;
                    case 38:
                        (index == 0 || selected.length == 0) ? last() : prev();
                        break;
                    case 33:
                        first();
                        break;
                    case 34:
                        last();
                        break;
                    case 37:
                        parMenu();
                        break;
                    case 39:
                        subMenu();
                        break;
                }
            }
        },
        closeContextMenu: function(option, trigger, menu, e) {

            //unbind all events from top DOM
            $(document).unbind('keydown', iMethods.keyEvent);
            $('html').unbind('click', iMethods.clickEvent);
            $(window).unbind('scroll resize', iMethods.scrollEvent);
            $('.iw-contextMenu').css('display', 'none');
            $(document).focus();

            //call close function
            option.onClose.call(this, {
                trigger: trigger,
                menu: menu
            }, e);
        },
        getPxSize: function(size, of) {
            if (!isNaN(size)) {
                return size;
            }
            if (size.indexOf('%') != -1) {
                return parseInt(size) * of / 100;
            } else {
                return parseInt(size);
            }
        },
        selectMenu: function(menu, elm) {
            //to select the list
            var selected = menu.find('li.iw-mSelected'),
                submenu = selected.find('.iw-contextMenu');
            if ((submenu.length != 0) && (selected[0] != elm[0])) {
                submenu.fadeOut(100);
            }
            selected.removeClass('iw-mSelected');
            elm.addClass('iw-mSelected');
        },
        menuHover: function(menu) {
            var lastEventTime = Date.now();
            menu.children('li').bind('mouseenter.contextMenu click.contextMenu', function(e) {
                //to make curmenu
                $('.iw-curMenu').removeClass('iw-curMenu');
                menu.addClass('iw-curMenu');
                iMethods.selectMenu(menu, $(this));
            });
        },
        createMenuList: function(trgr, selector, option) {
            var baseTrigger = option.baseTrigger,
                randomNum = Math.floor(Math.random() * 10000);
            if ((typeof selector == 'object') && (!selector.nodeType) && (!selector.jquery)) {
                var menuList = $('<ul class="iw-contextMenu iw-created iw-cm-menu" id="iw-contextMenu' + randomNum + '"></ul>');

var z = option.zIndex || trgr.css("zIndex") //added               
menuList.css("zIndex", z)//added
//menuList.css("zIndex", trgr.css("zIndex"))//removed
                $.each(selector, function(index, selObj) {
                    var name = selObj.name,
                        fun = selObj.fun || function() {},
                        subMenu = selObj.subMenu,
                        img = selObj.img || '',
                        icon = selObj.icon || '',
                        title = selObj.title || "",
                        className = selObj.className || "",
                        disable = selObj.disable,
                        list = $('<li title="' + title + '" class="' + className + '">' + name + '</li>');

                    if (img) {
                        list.prepend('<img src="' + img + '" align="absmiddle" class="iw-mIcon" />');
                    } else if (icon) {
                        list.prepend('<span align="absmiddle" class="' + "iw-mIcon "+icon+'" />');
                    }
                    //to add disable
                    if (disable) {
                        list.addClass('iw-mDisable');
                    }

                    if (!subMenu) {
                        list.bind('click.contextMenu', function(e) {
                            fun.call(this, {
                                trigger: baseTrigger,
                                menu: menuList
                            }, e);
                        });
                    }

                    //to create sub menu
                    menuList.append(list);
                    if (subMenu) {
                        list.addClass('iw-has-submenu').append('<div class="iw-cm-arrow-right" />');
                        iMethods.subMenu(list, subMenu, baseTrigger, option);
                    }
                });

                if (baseTrigger.index(trgr[0]) == -1) {
                    trgr.append(menuList);
                } else {
                    var par = option.containment == window ? 'body' : option.containment;
                    $(par).append(menuList);
                }

                iMethods.onOff($('#iw-contextMenu' + randomNum));
                return '#iw-contextMenu' + randomNum;
            } else if ($(selector).length != 0) {
                var element = $(selector);
                element.removeClass('iw-contextMenuCurrent')
                    .addClass('iw-contextMenu iw-cm-menu iw-contextMenu' + randomNum)
                    .attr('menuId', 'iw-contextMenu' + randomNum)
                    .css('display', 'none');

                //to create subMenu
                element.find('ul').each(function(index, element) {
                    var subMenu = $(this),
                        parent = subMenu.parent('li');
                    parent.append('<div class="iw-cm-arrow-right" />');
                    subMenu.addClass('iw-contextMenuCurrent');
                    iMethods.subMenu(parent, '.iw-contextMenuCurrent', baseTrigger, option);
                });
                iMethods.onOff($('.iw-contextMenu' + randomNum));
                return '.iw-contextMenu' + randomNum;
            }
        },
        subMenu: function(trigger, selector, baseTrigger, option) {
            trigger.contextMenu('menu', selector, {
                triggerOn: option.subMenuTriggerOn,
                displayAround: 'trigger',
                position: 'auto',
                mouseClick: 'left',
                baseTrigger: baseTrigger,
                containment: option.containment
            });
        },
        onOff: function(menu) {

            menu.find('.iw-mOverlay').remove();
            menu.find('.iw-mDisable').each(function() {
                var list = $(this);
                list.append('<div class="iw-mOverlay"/>');
                list.find('.iw-mOverlay').bind('click mouseenter', function(event) {
                    event.stopPropagation();
                });

            });

        },
        optionOtimizer: function(method, option) {
            if (!option) {
                return;
            }
            if (method == 'menu') {
                if (!option.mouseClick) {
                    option.mouseClick = 'right';
                }
            }
            if ((option.mouseClick == 'right') && (option.triggerOn == 'click')) {
                option.triggerOn = 'contextmenu';
            }

            if ($.inArray(option.triggerOn, ['hover', 'mouseenter', 'mouseover', 'mouseleave', 'mouseout', 'focusin', 'focusout']) != -1) {
                option.displayAround = 'trigger';
            }
            return option;
        }
    };
})(jQuery, window, document);
define("contextMenu", function(){});


//////////////////////////PlotMarker////////////start
PlotMarker.inheritsFrom( PlotItem );
function PlotMarker(tle){
    PlotItem.call(this, tle);
    var m_label = "";
    var m_labelFont = new Misc.Font();
    var m_labelAlignment = Static.AlignCenter;
    var m_labelOrientation = Horizontal;
    var m_spacing = 2;
    var m_pen = new Misc.Pen;//mMakePen();
    var m_symbol = null;
    var m_style = NoLine;
    var m_xValue = 0.0;
    var m_yValue = 0.0;

    this.rtti = Static.Rtti_PlotMarker;


    //! Return Value
    this.value = function()
    {
        return new Misc.Point( m_xValue, m_yValue );
    }

    //! Return x Value
    this.xValue = function()
    {
        return m_xValue;
    }

    //! Return y Value
    this.yValue = function()
    {
        return m_yValue;
    }

    //! Set Value
//    this.setValue = function( pos )
//    {
//        this.setValue( pos.x, pos.y );
//    }

    //! Set Value
    this.setValue = function( x, y ) {
        //console.log(x)
        if(typeof(x)=="object"){
            var temp = x
            x=temp.x
            y=temp.y
        }
        if ( x != m_xValue || y != m_yValue )
        {
            m_xValue = x;
            m_yValue = y;
            //itemChanged();
            if(this.plot())
                this.plot().autoRefresh()
        }
    }

    //! Set X Value
    this.setXValue = function(  x )
    {
        this.setValue( x, m_yValue );
    }

    //! Set Y Value
    this.setYValue = function(  y )
    {
        this.setValue( m_xValue, y );
    }

    /*!
      \brief Set the label
      \param label Label text
      \sa label()
    */
    this.setLabel = function( label )
    {
        if ( label != m_label )
        {
            m_label = label;
            //itemChanged();
        }
    }

    /*!
      \return the label
      \sa setLabel()
    */
    this.label = function()
    {
        return m_label;
    }

    /*!
      \brief Set the alignment of the label

      In case of QwtPlotMarker::HLine the alignment is relative to the
      y position of the marker, but the horizontal flags correspond to the
      canvas rectangle. In case of QwtPlotMarker::VLine the alignment is
      relative to the x position of the marker, but the vertical flags
      correspond to the canvas rectangle.

      In all other styles the alignment is relative to the marker's position.

      \param align Alignment.
      \sa labelAlignment(), labelOrientation()
    */
    this.setLabelAlignment = function(align )
    {
        if ( align !== m_labelAlignment )
        {
            m_labelAlignment = align;
            //itemChanged();
        }
    }

    /*!
      \return the label alignment
      \sa setLabelAlignment(), setLabelOrientation()
    */
    this.labelAlignment = function()
    {
        return m_labelAlignment;
    }

    /*!
      \brief Set the orientation of the label

      When orientation is Qt::Vertical the label is rotated by 90.0 degrees
      ( from bottom to top ).

      \param orientation Orientation of the label

      \sa labelOrientation(), setLabelAlignment()
    */
    this.setLabelOrientation = function( orientation )
    {
        if ( orientation != m_labelOrientation )
        {
            m_labelOrientation = orientation;
            //itemChanged();
        }
    }

    /*!
      \return the label orientation
      \sa setLabelOrientation(), labelAlignment()
    */
    this.labelOrientation = function()
    {
        return m_labelOrientation;
    }

    /*!
      \brief Set the spacing

      When the label is not centered on the marker position, the spacing
      is the distance between the position and the label.

      \param spacing Spacing
      \sa spacing(), setLabelAlignment()
    */
    this.setSpacing = function( spacing )
    {
        if ( spacing < 0 )
            spacing = 0;

        if ( spacing == m_spacing )
            return;

        m_spacing = spacing;
        //itemChanged();
    }

    /*!
      \return the spacing
      \sa setSpacing()
    */
    this.spacing = function()
    {
        return m_spacing;
    }


    /*!
      \brief Assign a symbol
      \param symbol New symbol
      \sa symbol()
    */
    this.setSymbol = function( symbol )
    {
        //if ( symbol != m_symbol )
        {
            m_symbol = symbol;

            //if ( symbol )
                //setLegendIconSize( symbol->boundingRect().size() );

            //legendChanged();
            //itemChanged();
        }
    }

    /*!
      \return the symbol
      \sa setSymbol(), QwtSymbol
    */
    this.symbol = function()
    {
        return m_symbol;
    }

    /*!
      Draw the marker

      \param painter Painter
      \param xMap x Scale Map
      \param yMap y Scale Map
      \param canvasRect Contents rectangle of the canvas in painter coordinates
    */
    this.draw = function(xMap, yMap)
    {

        var canvasRect = this.getCanvasRect();
        //$("#demo").text(mRectToString(canvasRect))
        var pos = new Misc.Point( xMap.transform( m_xValue ), yMap.transform( m_yValue ) );

        var ctx = this.getContext();

        // draw lines
        this.drawLines(ctx, canvasRect, pos );

        // draw symbol
        //console.log(m_symbol.style())
        if ( m_symbol && ( m_symbol.style() !== NoSymbol ) )
        {
            var sz = m_symbol.size();
            var clipRect = canvasRect.adjusted( -sz.width, -sz.height, sz.width, sz.height );
            if ( clipRect.contains(pos ) ){
                m_symbol.drawSymbol( ctx, pos );
            }

        }

        this.drawLabel(ctx, canvasRect, pos );
    }

    /*!
      Align and draw the text label of the marker

      \param painter Painter
      \param canvasRect Contents rectangle of the canvas in painter coordinates
      \param pos Position of the marker, translated into widget coordinates

      \sa drawLabel(), QwtSymbol::drawSymbol()
    */
    this.drawLabel = function(ctx, canvasRect, pos )
    {

        if ( m_label === "" )
            return;

        var align = m_labelAlignment;
        var alignPos = pos;

        var symbolOff = new Misc.Size( 0, 0 );
        //var canvasRect = this.getCanvasRect();

        //var ctx = this.getContext();

        switch ( m_style )
        {

            case VLine:
            {
                // In VLine-style the y-position is pointless and
                // the alignment flags are relative to the canvas

                if ( m_labelAlignment & Static.AlignTop )
                {
                    alignPos.y = canvasRect.top();
                    align &= ~Static.AlignTop;
                    align |= Static.AlignBottom;
                }
                else if ( m_labelAlignment & Static.AlignBottom )
                {
                    // In HLine-style the x-position is pointless and
                    // the alignment flags are relative to the canvas

                    alignPos.y = canvasRect.bottom() - 1;
                    align &= ~Static.AlignBottom;
                    align |= Static.AlignTop;
                }
                else
                {

                    alignPos.y = canvasRect.center().y;

                }
                break;
            }
            case HLine:
            {
                if ( m_labelAlignment & Static.AlignLeft )
                {
                    alignPos.x = canvasRect.left();
                    align &= ~Static.AlignLeft;
                    align |= Static.AlignRight;
                }
                else if ( m_labelAlignment & Static.AlignRight )
                {
                    alignPos.x = canvasRect.right() - 1;
                    align &= ~Static.AlignRight;
                    align |= Static.AlignLeft;
                }
                else
                {
                    alignPos.x = canvasRect.center().x;
                }
                break;
            }
            default:
            {
                if ( m_symbol && ( m_symbol.style() !== NoSymbol ) )
                {
                    var sz = m_symbol.size();
                    symbolOff = new Misc.Size((sz.width+1)/2, (sz.height+1)/2 );
                    //symbolOff /= 2;
                }
            }
        }

        var pw2 = m_pen.width / 2.0;
        if ( pw2 == 0.0 )
            pw2 = 0.5;


        var spacing = m_spacing;

        var xOff = Math.max( pw2, symbolOff.width );
        var yOff = Math.max( pw2, symbolOff.height );

        var textSize = m_labelFont.textSize(m_label)

        if ( align & Static.AlignLeft )
        {
            alignPos.x -= xOff + spacing;
            if ( m_labelOrientation == Vertical )
                alignPos.x -= textSize.height;
            else
                alignPos.x -= textSize.width;
        }
        else if ( align & Static.AlignRight )
        {
            alignPos.x += xOff + spacing;
        }
        else
        {
            if ( m_labelOrientation == Vertical )
                alignPos.x -= textSize.height / 2;
            else
                alignPos.x -= textSize.width / 2;
        }

        if ( align & Static.AlignTop )
        {
            alignPos.y -= yOff + spacing;
            if ( m_labelOrientation != Vertical )
                alignPos.y -= textSize.height;
        }
        else if ( align & Static.AlignBottom )
        {
            alignPos.y += yOff + spacing;
            if ( m_labelOrientation == Vertical )
                alignPos.y += textSize.width;
        }
        else
        {
            if ( m_labelOrientation == Vertical )
                alignPos.y += textSize.width / 2;
            else
                alignPos.y -= textSize.height / 2;
        }

        var painter = new PaintUtil.Painter(ctx);
        painter.save();
        //painter.setBrush(new Misc.Brush("black"))
        painter.translate( alignPos.x, alignPos.y );
        if ( m_labelOrientation == Vertical )
            painter.rotate( -90*Math.PI/180 );
        painter.setFont(m_labelFont)
        var textRect = new Misc.Rect( 0, 0, textSize.width, textSize.height );
        painter.drawText(m_label, textRect.left(), textRect.bottom());
        painter.restore();

        painter = null

    }


    /*!
      Draw the lines marker

      \param painter Painter
      \param canvasRect Contents rectangle of the canvas in painter coordinates
      \param pos Position of the marker, translated into widget coordinates

      \sa drawLabel(), QwtSymbol::drawSymbol()
    */
    this.drawLines = function(ctx, canvasRect, pos )
    {

        if ( m_style == NoLine )
            return;

        //var doAlign = QwtPainter::roundingAlignment( painter );

        var painter = new PaintUtil.Painter(ctx);
        painter.setPen(m_pen);

        if ( m_style == HLine || m_style == Cross )
        {
            var y = pos.y;
            //if ( doAlign )
                //y = qRound( y );

            painter.drawLine(canvasRect.left(), y, canvasRect.right() - 1.0, y );
        }
        if ( m_style == VLine || m_style == Cross )
        {
            var x = pos.x;
            //if ( doAlign )
                //x = qRound( x );

            painter.drawLine(x, canvasRect.top(), x, canvasRect.bottom() - 1.0 );
        }
        painter = null
    }


    /*!
      \brief Set the line style
      \param style Line style.
      \sa lineStyle()
    */
    this.setLineStyle = function( style )
    {

        if ( style != m_style )
        {
            m_style = style;


           // legendChanged();
           // itemChanged();
        }
    }

    /*!
      \return the line style
      \sa setLineStyle()
    */
    this.lineStyle = function()
    {
        return m_style;
    }

    /*!
      Specify a pen for the line.

      \param pen New pen
      \sa linePen()
    */
    this.setLinePen = function( pen )
    {
       // if ( pen != m_pen )
        //{
            m_pen = pen;
            if(this.plot())
                this.plot().autoRefresh()


           // legendChanged();
            //itemChanged();
        //}
    }

    /*!
      \return the line pen
      \sa setLinePen()
    */
    this.linePen = function()
    {
        return m_pen;
    }

    this.setZ( 30.0 );
}
PlotMarker.prototype.toString = function () {
    return '[PlotMarker]';
}

/*!
   \return Icon representing the marker on the legend

   \param index Index of the legend entry 
                ( usually there is only one )
   \param size Icon size

   \sa setLegendIconSize(), legendData()
*/
PlotMarker.prototype.legendIcon = function( index, size ){
   
    /*if ( size.isEmpty() )
        return QwtGraphic();*/
    if ( size.width === 0 && size.height === 0 )
        return null;

    var graphic = new GraphicUtil.Graphic(null, size.width, size.height);
     
    //graphic.setDefaultSize( size );
    //graphic.setRenderHint( QwtGraphic::RenderPensUnscaled, true );

    //QPainter painter( &graphic );
    //painter.setRenderHint( QPainter::Antialiasing,
       // testRenderHint( QwtPlotItem::RenderAntialiased ) );
    var painter = new PaintUtil.Painter(graphic);

    // QwtGraphic icon;
    // icon.setDefaultSize( size );
    // icon.setRenderHint( QwtGraphic::RenderPensUnscaled, true );

    // QPainter painter( &icon );
    // painter.setRenderHint( QPainter::Antialiasing,
    //     testRenderHint( QwtPlotItem::RenderAntialiased ) );

     if ( this.lineStyle() != NoLine ){
    //     painter.setPen( d_data->pen );

    //     if ( d_data->style == QwtPlotMarker::HLine ||
    //         d_data->style == QwtPlotMarker::Cross )
    //     {
    //         const double y = 0.5 * size.height();

    //         QwtPainter::drawLine( &painter, 
    //             0.0, y, size.width(), y );
    //     }

    //     if ( d_data->style == QwtPlotMarker::VLine ||
    //         d_data->style == QwtPlotMarker::Cross )
    //     {
    //         const double x = 0.5 * size.width();

    //         QwtPainter::drawLine( &painter, 
    //             x, 0.0, x, size.height() );
    //     }
     }

     if ( this.symbol() )
     {
    //     const QRect r( 0.0, 0.0, size.width(), size.height() );
    //     d_data->symbol->drawSymbol( &painter, r );
        this.symbol().drawGraphicSymbol( painter, new Misc.Point(size.width, size.height), size );
     }
     painter = null

    return graphic;
}


/////////////////////////////////////////////////end
;
define("jQwtPlotMarker", ["static","plotItem"], function(){});


/////////////////Ruler - subclass of PlotMarker//////////start
//Ruler.inheritsFrom( PlotMarker );
class Ruler extends PlotMarker{
//Define the Ruler constructor
//function Ruler(plot, name, lineStyle) {
    constructor(plot, name, lineStyle){
	// Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    
    //PlotMarker.call(this, name);
    super(name);
    this._picker = 0 
    this._pos = 0.0 
    this._rightClickMenu = 0

    if(lineStyle == VLine || lineStyle == HLine)
     {
        this.setLineStyle(lineStyle);
        this.setLinePen(new Misc.Pen("blue"));
     }
    this.attach(plot);
    //console.log(plot, 25)

    this.setMouseTracking = function (enable) {
        this._picker.setMouseTracking(enable);
    }
}

/*scaleRect(){
        var rect = null;
        if ( this.plot() )
        {
            var xs = this.plot().axisScaleDiv( this.xAxis() );
            var ys = this.plot().axisScaleDiv( this.yAxis() );

            rect = new Misc.Rect( xs.lowerBound(), ys.lowerBound(),
                xs.range(), ys.range() );
            rect = rect.normalized();
        }

        return rect;
    }*/
     
}
//Ruler.prototype = Object.create(PlotMarker.prototype);
// Set the "constructor" property to refer to Ruler
//Ruler.prototype.constructor = Ruler;

Ruler.prototype.toString = function () {
	return '[Ruler]';
}

Ruler.prototype.setPicker = function (pick) {
	if(!pick)
        return false;
    //if(_picker)
        //delete _picker;
    this._picker = pick;
    return true;
}

Ruler.prototype.setZoomerSearch = function(on)
{
    //_picker.setControlFlag(Picker::ZoomerSearch, on);
    this._picker.setControlFlag(Static.ZoomerSearch, on);
    this._picker.initZoomer();
}

Ruler.prototype.setPannerSearch = function(on)
 {
//     _picker->setControlFlag(Picker::PannerSearch, on);
	this._picker.setControlFlag(Static.PannerSearch, on);     
}

//Ruler.prototype.setLockAt = function(val)
//{
     /*this._picker.setControlFlag(Static.Locked, lock);
     this._picker.clearDragCursor()*/     
     //console.log("position: "+ val)
//}

Ruler.prototype.setLock = function(lock)
{
     this._picker.setControlFlag(Static.Locked, lock);
     this._picker.clearDragCursor()
}

Ruler.prototype.lock = function()
{
     return this._picker.controlFlag(Static.Locked);
}

Ruler.prototype.setTrackingTextStyle = function(trackingTextStyle)
{
     this._picker.setTrackingTextStyle(trackingTextStyle);
}

Ruler.prototype.trackingTextStyle = function()
{
     return this._picker.trackingTextStyle();
}

Ruler.prototype.setTrackingTextFont = function(f)
{
     this._picker.setTrackerFont(f);
}

Ruler.prototype.trackingTextFont = function()
{
     return this._picker.trackerFont();
}

Ruler.prototype.setTrackingTextColor = function(c)
{
    var font = this._picker.trackerFont();
    font.fontColor = c;
    this._picker.setTrackerFont(font);
}

Ruler.prototype.trackingTextColor = function()
{
     return this._picker.trackerFont().color;
}

Ruler.prototype.validatePosition = function(min, max)
{

}

Ruler.prototype.dragCursorShape = function()
{
     return this._picker.dragCursorShape();
}

Ruler.prototype.setDragCursorShape = function(shape)
{
     this._picker.setDragCursorShape(shape);
}

Ruler.prototype.setRightClickMenu = function(menu)
{
//     if(_rightClickMenu)
//     {
//         delete _rightClickMenu;
//         if(!menu)
//             menu = new DummyMenu(this);
//     }
//     _rightClickMenu = menu;
}
////////////////////////////////////////////////////////
/////////////////RulerV - subclass of PlotMarker//////////start
//RulerV.inheritsFrom( Ruler );
class RulerV extends Ruler{
//Define the RulerV constructor
//function RulerV(plot, name) {
    constructor(plot, name){
	// Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //Ruler.call(this, plot, name, VLine);
    super(plot, name, VLine);
    //if(plot){
	    this._picker = new PickerV(plot, this._pos, this);
	    //this._picker.setEnabled_2(true)
	//}
    }
}
//RulerV.prototype = Object.create(Ruler.prototype);
// Set the "constructor" property to refer to Ruler
//RulerV.prototype.constructor = RulerV;



RulerV.prototype.setPosition = function(pos)
{
    this._pos = pos;
    this._picker._rulerPos = pos
    this.setXValue(this._pos);    
}

/*RulerV.prototype.setLockAt = function(val)
{
     this.setPosition(val)
     this.setLock(true)
}*/

////////////////////////////////////
/////////////////RulerH - subclass of PlotMarker//////////start
//RulerH.inheritsFrom( Ruler );
class RulerH extends Ruler{
//Define the RulerV constructor
//function RulerH(plot, name) {
    constructor(plot, name){
	// Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //Ruler.call(this, plot, name, HLine);
    super(plot, name, HLine);
    //if(plot){
	    this._picker = new PickerH(plot, this._pos, this);
	    //this._picker.setEnabled_2(true)
	//}
    }
}
//RulerH.prototype = Object.create(Ruler.prototype);
// Set the "constructor" property to refer to Ruler
//RulerH.prototype.constructor = RulerH;


RulerH.prototype.setPosition = function(pos)
{
    this._pos = pos;
    this._picker._rulerPos = pos
    this.setYValue(this._pos);
}

/*RulerH.prototype.setLockAt = function(val)
{
     this.setPosition(val)//new Misc.Point(0, val))
     this.setLock(true)

}*/
////////////////////////////////////



;
define("ruler", ["static","jQwtPlotMarker"], function(){});



/////////////////MPicker - subclass of PlotPicker//////////start
//MPicker.inheritsFrom( PlotPicker );
class MPicker extends PlotPicker{
//Define the MPicker constructor
//function MPicker(plot, rulerPos, ruler) {
    constructor(plot, rulerPos, ruler){
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //PlotPicker.call(this, plot);
    super(plot)
    var self = this
    this._rulerPos = rulerPos
     this._ruler = ruler 
     var _zoomer = 0, _panner = 0, _magnifier=0

     var _qwtPlotCursorShape = ""

     var _cursorOld = null;
     var _cursorDrag = null;

     var _controlFlags = 0;
    /*_controlFlags &= ~Static.Locked;
    _controlFlags &= ~Static.LeftButtonDown;
    _controlFlags &= ~Static.MagnifierEnabled;
    _controlFlags &= ~Static.ZoomEnabled;
    _controlFlags &= ~Static.PanEnabled;
    _controlFlags &= ~Static.PanningInProgress;
    _controlFlags &= ~Static.DragCursor;*/
    //_controlFlags |= Static.MagnifierSearch;
    //_controlFlags |= Static.ZoomerSearch;
    //_controlFlags |= Static.PannerSearch;

    //console.log(_controlFlags)

    //At this stage, no current curve is set. Thus, we could live with whatever axes the base class (QwtPlotPicker) sets.
    //We make the adjustment when we set a valid current curve that is visible.
    if(this._ruler){
        this._ruler.setAxes(this.xAxis(), this.yAxis());
    }

    //setStateMachine( new QwtPickerDragPointMachine() );
    var _trackingTextStyle = Static.FullTrackingText;
    //this.setTrackerPen( new Misc.Pen( "red" ) );
    if(this.plot()){
        _qwtPlotCursorShape = this.plot().cursor();
    }
    //console.log(_qwtPlotCursorShape)
    //this.setTrackerMode(Static.AlwaysOn);
    //this.setTrackerMode(Static.ActiveOnly);

    this.controlFlag = function(flag)
    {
        return Boolean(_controlFlags & flag);
    }

    this.setControlFlag = function(flag, set)
    {
        if(set)
            _controlFlags |= flag;
        else
            _controlFlags &= ~flag;
    }

    this.prohibit = function()
    {
        //console.log(_controlFlags)
        if(_zoomer && this.controlFlag(Static.ZoomerSearch))
        {
            this.setControlFlag(Static.ZoomEnabled, _zoomer.isEnabled());
            if(this.controlFlag(Static.ZoomEnabled))
                _zoomer.setEnabled(false);
        }
        if(_panner && this.controlFlag(Static.PannerSearch))
        {
            this.setControlFlag(Static.PanEnabled, _panner.isEnabled());
            if(this.controlFlag(Static.PanEnabled))
                _panner.setEnabled(false);
        }

        if(_magnifier && this.controlFlag(Static.MagnifierSearch))
        {
            this.setControlFlag(Static.MagnifierEnabled, _magnifier.isEnabled());
            if(this.controlFlag(Static.MagnifierEnabled))
                _magnifier.setEnabled(false);
        }
    }

    this.restore = function()
    {
        if(_zoomer && this.controlFlag(Static.ZoomEnabled))//Zooming was disable before dragging.
        {
             _zoomer.setEnabled(true);//Dragging has ended. Re-enable zooming.
             this.setControlFlag(Static.ZoomEnabled, false);
        }
        if(_panner && this.controlFlag(Static.PanEnabled))//Panning was disable before dragging.
        {
             _panner.setEnabled(true);//Dragging has ended. Re-enable panning.
             this.setControlFlag(Static.PanEnabled, false);
        }
        if(_magnifier && this.controlFlag(Static.MagnifierEnabled))//Panning was disable before dragging.
        {
             _magnifier.setEnabled(true);//Dragging has ended. Re-enable magnifier.
             this.setControlFlag(Static.MagnifierEnabled, false);
        }
    }





/*var el = null
if(plot)
	el = plot.getLayout().getCentralDiv()*/

    this.setDragCursor = function()
    {
        if(this.controlFlag(Static.DragCursor))
            return;
        //var plot = this.plot();
        if(plot.cursor()!=_qwtPlotCursorShape)
            return;
        _cursorOld = plot.cursor();
        _cursorDrag = this._dragCursorShape;
        plot.setCursor(_cursorDrag);
        this.setControlFlag(Static.DragCursor, true);

        //We prohibit magnifying, zooming and/or panning during dragging.
        this.prohibit();

        Static.trigger("rulerSelected", self._ruler)
		
		   /* el.contextMenu(menu, {
                triggerOn: 'contextmenu',
                zIndex: 1
              });*/
    }

    this.clearDragCursor = function()
    {
        if(!this.controlFlag(Static.DragCursor))
            return;
        this._ruler.plot().setCursor(_cursorOld);
        this.setControlFlag(Static.DragCursor, false);
        this.restore();

        Static.trigger("rulerDeselected", self._ruler)
        
        //el.contextMenu('destroy')
	   /*el.contextMenu(menu1, {
                triggerOn: 'contextmenu',
                zIndex: 1
              });*/

    }

    this.setTrackingTextStyle = function(trackingTextStyle)
    {
        _trackingTextStyle = trackingTextStyle;
    }

    this.trackerText = function(pos)
     {
        
         if(this._ruler.lock() || (_trackingTextStyle == Static.NoTrackingText) ||( !this.controlFlag(Static.LeftButtonDown) &&
                                                                         !this.controlFlag(Static.ZoomEnabled)))
             return "";
             
         if(_trackingTextStyle == Static.FullTrackingText)
         {
             var xTitle = this.axisTitle();
             if(!xTitle.length)
                 return this._rulerPos;
             return xTitle + "=" + this._rulerPos;
         }
         if(_trackingTextStyle == Static.PartialTrackingText)
         {
             return this._rulerPos;
         }
         return "";         
    }


    this.panningFinished = function()
    {
        this.setControlFlag(Static.PanningInProgress, false);
    }

    this.panningStarted = function()
    {
        this.setControlFlag(Static.PanningInProgress, true);
    }

    /*this.widgetMouseReleaseEvent = function(event)
    {
        if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return PlotPicker.prototype.mouseReleaseEvent.call(this, event );
        if ( event.button == Static.LeftButton  )
        {
            if(this.controlFlag(Static.LeftButtonDown)){
                //emit positionChanged(this._ruler, this._rulerPos);
                Static.trigger("positionChanged", [this._ruler, this._rulerPos])
            }
            this.setControlFlag(Static.LeftButtonDown, false);        
        }        
        PlotPicker.prototype.widgetMouseReleaseEvent.call(this, event );
    }*/

   /* $("#plotDivContainer").on('mouseup touchend', function(){
       if(Static.LeftButtonDown){
           if(Static.isMobile()){
                self.clearDragCursor()                
           }
           self.setControlFlag(Static.LeftButtonDown , false)
           //Static.trigger("positionChanged", [self._ruler, self._rulerPos])
       }

       
    });*/


    
   
    /*this.mousePressEvent = function(event)
    {
        
        
        if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return PlotPicker.prototype.mousePressEvent.call(this, event );
        if ( event.button == 2 )
        {
        		if(this.controlFlag(Static.DragCursor)){       
        				
        		}
           return true
        }

        if(Static.isMobile()){
             var _rulerPosVal = plot.transform(this.xAxis(), this._rulerPos);
             var clientX = event.originalEvent.touches[0].clientX;
             var clientY = event.originalEvent.touches[0].clientY;
             var pt = this.mapToElement(new Misc.Point(clientX, clientY))
             var val = pt.x;
              if(!this.controlFlag(Static.LeftButtonDown) && val < _rulerPosVal+5 && val > _rulerPosVal-5)
              {
                  //console.log("close to ruler")
                  this.setDragCursor();
                  this.setControlFlag(Static.LeftButtonDown, true )
              }

        }

        else if( event.button == Static.LeftButton  || Static.isMobile())
        {
            
           if(this.controlFlag(Static.DragCursor)){
                //console.log("mousePressEvent")
               this.setControlFlag(Static.LeftButtonDown, true);
               //console.log("mousePressEvent")
           }
           return true
        }
        // QwtPlotPicker::widgetMousePressEvent(event );
        return PlotPicker.prototype.mousePressEvent.call(this,event);
    }*/

    this.initMagnifier = function()
    {
        if(!this.controlFlag(Static.MagnifierSearch) || _magnifier)
            return;
        if(plot.magnifier){
            _magnifier = plot.magnifier            
        }
    }

    this.initZoomer = function()
    {
        if(!this.controlFlag(Static.ZoomerSearch) && _zoomer){
            //_zoomer = null
            return; 
        }       
       if(plot.zoomer){
           _zoomer = plot.zoomer 
       }
       
    }

    this.initPanner = function()
    {
        if(!this.controlFlag(Static.PannerSearch) && _panner)
            return;        
        if(plot.panner){
           _panner = plot.panner 
       }
       
    }

    /*$(window).on('mouseup touchend', function(){   
       if(!Static.LeftButtonDown) return
       self.setControlFlag(Static.LeftButtonDown , false)
       
    });*/
    this.doMouseReleaseEvent = function(event){
        if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return //super.widgetMouseReleaseEvent(event );
        if ( event.button == Static.LeftButton  )
        {
            if(this.controlFlag(Static.LeftButtonDown)){
                //emit positionChanged(this._ruler, this._rulerPos);
                Static.trigger("positionChanged", [this._ruler, this._rulerPos])
            }
            this.setControlFlag(Static.LeftButtonDown, false);        
        }        
        
    }
    
}
    

    widgetMouseReleaseEvent(event){
        /*if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return super.widgetMouseReleaseEvent(event );
        if ( event.button == Static.LeftButton  )
        {
            if(this.controlFlag(Static.LeftButtonDown)){
                //emit positionChanged(this._ruler, this._rulerPos);
                Static.trigger("positionChanged", [this._ruler, this._rulerPos])
            }
            this.setControlFlag(Static.LeftButtonDown, false);        
        }        
        super.widgetMouseReleaseEvent(event );*/
        this.doMouseReleaseEvent(event);
        super.widgetMouseReleaseEvent(event );
    }

    widgetLeaveEvent(event){
        /*if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return super.widgetMouseReleaseEvent(event );
        if ( event.button == Static.LeftButton  )
        {
            if(this.controlFlag(Static.LeftButtonDown)){
                //emit positionChanged(this._ruler, this._rulerPos);
                Static.trigger("positionChanged", [this._ruler, this._rulerPos])
            }
            this.setControlFlag(Static.LeftButtonDown, false);        
        }        
        super.widgetMouseReleaseEvent(event );*/
        this.doMouseReleaseEvent(event);
        super.widgetMouseReleaseEvent(event );
    }
}





///////////////////////////////////////////////////////////
/////////////////PickerV - subclass of MPicker//////////start
//PickerV.inheritsFrom( MPicker );
class PickerV extends MPicker {
//Define the PickerV constructor
//function PickerV(plot, rulerPos, ruler) {
    constructor(plot, rulerPos, ruler){
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //MPicker.call(this, plot, rulerPos, ruler);
    super(plot, rulerPos, ruler)

    this._dragCursorShape = "w-resize";

    //this.initMagnifier()
    //this.initZoomer()
    //this.initPanner()

    this.axisTitle = function()
    {
        return this._ruler.plot().axisTitle (this.xAxis());
    }

    
}
    widgetMousePressEvent(event)
    {
        
        
        if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return super.widgetMousePressEvent(event );
        if ( event.button == 2 )
        {
            if(this.controlFlag(Static.DragCursor)){       
                
            }
           return true
        }

        if(Static.isMobile()){
             var _rulerPosVal = plot.transform(this.xAxis(), this._rulerPos);
             var clientX = event.originalEvent.touches[0].clientX;
             var clientY = event.originalEvent.touches[0].clientY;
             var pt = this.mapToElement(new Misc.Point(clientX, clientY))
             var val = pt.x;
              if(!this.controlFlag(Static.LeftButtonDown) && val < _rulerPosVal+12 && val > _rulerPosVal-12)
              {
                  //console.log("close to ruler")
                  this.setDragCursor();
                  this.setControlFlag(Static.LeftButtonDown, true )
              }

        }

        else if( event.button == Static.LeftButton  || Static.isMobile())
        {
            
           if(this.controlFlag(Static.DragCursor)){
                //console.log("mousePressEvent")
               this.setControlFlag(Static.LeftButtonDown, true);
               //console.log("mousePressEvent")
           }
           return true
        }
        // QwtPlotPicker::widgetMousePressEvent(event );
        return super.widgetMousePressEvent(event );
    }//

    widgetMouseMoveEvent(event)
    {
        //console.log("mouseMoveEvent")
        if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return super.widgetMouseMoveEvent(event );
        if(!this.controlFlag(Static.Locked))
        {
             var plot=this._ruler.plot();
             var clientX = event.clientX
             var clientY = event.clientY
             if(Static.isMobile()){
                var touchobj = event.originalEvent.changedTouches[0] // reference first touch point for this event
                clientX = parseInt(touchobj.clientX);
                clientY = parseInt(touchobj.clientY);

             }
             var pt = this.mapToElement(new Misc.Point(clientX, clientY))
             var val = pt.x;
             var _rulerPosVal = plot.transform(this.xAxis(), this._rulerPos);
             //console.log(Static.LeftButton)

              if ( this.controlFlag(Static.LeftButtonDown ))
              {
                //console.log("dragging")
                  this._rulerPos =plot.invTransform(this.xAxis(), val);
                  this._ruler._pos = this._rulerPos
                  this._ruler.validatePosition();
                  this._rulerPos = this._ruler._pos
                  this._ruler.setXValue(this._rulerPos);



                  Static.trigger("shapeItemValueChanged")

                  //this._ruler._picker.trackerText(pt)

                  //plot.replot();
                  //Picker.prototype.widgetMouseMoveEvent.call(this, event );
                  //super.widgetMouseMoveEvent(event );
              }
              //console.log(_rulerPosVal + ' ' + val)
              if(!this.controlFlag(Static.LeftButtonDown) && val < _rulerPosVal+2 && val > _rulerPosVal-2)
              {
                  //console.log("close to ruler")
                  this.setDragCursor();
              }
              if(!this.controlFlag(Static.LeftButtonDown) && !(val < _rulerPosVal+2 && val > _rulerPosVal-2) )
              {
                  this.clearDragCursor();
             
              }
        }
        

    }///

}
/////////////////////////////////////////////////////

/////////////////PickerH - subclass of MPicker//////////start
//PickerH.inheritsFrom( MPicker );
class PickerH extends MPicker{
//Define the PickerV constructor
//function PickerH(plot, rulerPos, ruler) {
    constructor(plot, rulerPos, ruler) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //MPicker.call(this, plot, rulerPos, ruler);
    super(plot, rulerPos, ruler) 

    this._dragCursorShape = "s-resize";

    //this.initMagnifier()
    //this.initZoomer()
    //this.initPanner()

    this.axisTitle = function()
    {
        return this._ruler.plot().axisTitle (this.yAxis());
    }
}
    widgetMousePressEvent(event)
    {
        
        
        if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return super.widgetMousePressEvent(event );
        if ( event.button == 2 )
        {
            if(this.controlFlag(Static.DragCursor)){       
                
            }
           return true
        }

        if(Static.isMobile()){
             var _rulerPosVal = plot.transform(this.yAxis(), this._rulerPos);
             var clientX = event.originalEvent.touches[0].clientX;
             var clientY = event.originalEvent.touches[0].clientY;
             var pt = this.mapToElement(new Misc.Point(clientX, clientY))
             var val = pt.y;
              if(!this.controlFlag(Static.LeftButtonDown) && val < _rulerPosVal+12 && val > _rulerPosVal-12)
              {
                  //console.log("close to ruler")
                  this.setDragCursor();
                  this.setControlFlag(Static.LeftButtonDown, true )
              }

        }

        else if( event.button == Static.LeftButton  || Static.isMobile())
        {
            
           if(this.controlFlag(Static.DragCursor)){
                //console.log("mousePressEvent")
               this.setControlFlag(Static.LeftButtonDown, true);
               //console.log("mousePressEvent")
           }
           return true
        }
        // QwtPlotPicker::widgetMousePressEvent(event );
        return super.widgetMousePressEvent(event);
    }

    widgetMouseMoveEvent(event)
    {
        //console.log("mouseMoveEvent")
        if(!this._ruler.isVisible() || this.controlFlag(Static.PanningInProgress))
            return super.widgetMouseMoveEvent(event );
        if(!this.controlFlag(Static.Locked))
        {
             var plot=this._ruler.plot();
             var clientX = event.clientX
             var clientY = event.clientY
             if(Static.isMobile()){
                var touchobj = event.originalEvent.changedTouches[0] // reference first touch point for this event
                clientX = parseInt(touchobj.clientX);
                clientY = parseInt(touchobj.clientY);

             }
             var pt = this.mapToElement(new Misc.Point(clientX, clientY))
             var val = pt.y;
             var _rulerPosVal = plot.transform(this.yAxis(), this._rulerPos);
             //console.log(Static.LeftButton)

              if ( this.controlFlag(Static.LeftButtonDown ))
              {
                //console.log("dragging")
                  this._rulerPos =plot.invTransform(this.yAxis(), val);
                  //this._ruler.validatePosition();

                  this._ruler._pos = this._rulerPos
                  this._ruler.validatePosition();
                  this._rulerPos = this._ruler._pos
                  this._ruler.setYValue(this._rulerPos);
                  Static.trigger("shapeItemValueChanged")

                  //this._ruler._picker.trackerText(pt)

                  //plot.replot();
              }
              //console.log(_rulerPosVal + ' ' + val)
              if(!this.controlFlag(Static.LeftButtonDown) && val < _rulerPosVal+2 && val > _rulerPosVal-2)
              {
                  //console.log("close to ruler")
                  this.setDragCursor();
              }
              if(!this.controlFlag(Static.LeftButtonDown) && !(val < _rulerPosVal+2 && val > _rulerPosVal-2) )
              {
                  this.clearDragCursor();
              }
        }
        super.widgetMouseMoveEvent(event );
    }
}

/////////////////////////////////////////////////////





;
define("mpicker", ["static","qwtplotpicker"], function(){});


/////////////////MRulerV - subclass of RulerV//////////start
//MRulerV.inheritsFrom( RulerV );
//Define the MRulerV constructor
class MRulerV extends RulerV{
//function MRulerV(plot, name, rulerGroup) {
    constructor(plot, name, rulerGroup){
	//RulerV.call(this, plot, name);
    super(plot, name);
    this._rulers = null

    if(rulerGroup)
        this._rulers = rulerGroup

    this.rulers = function()
    {
        return this._rulers;
    }

    this.validatePosition = function()
    {
        var plot = this.plot();
        var intv = plot.axisInterval  (this.xAxis());
        var min = intv.minValue();
        var max = intv.maxValue();

        var minVal = plot.transform(this._picker.xAxis(), min);
        var maxVal = plot.transform(this._picker.xAxis(), max);
        var rulerPosVal = plot.transform(this._picker.xAxis(), this._pos);
        var minX = this._rulers.minX();
        var maxX = this._rulers.maxX();

        var space = 2
        if(Static.isMobile()){
            space = 12
        }

        var separationX = 0.5*(this.rulers().ruler(0).linePen().width + this.rulers().ruler(1).linePen().width)+space;

        var n = this._rulers.rulerId(this);
        if(n==0)
        {
            if(this._rulers.ruler(1).isVisible())
            {
                var val =plot.transform(this._picker.xAxis(), this._rulers.ruler(1)._pos);
                if(rulerPosVal >= val-separationX)
                {
                    this._pos = plot.invTransform(this._picker.xAxis(), val-separationX);
                }
                if(rulerPosVal < minVal)
                {
                    this._pos = plot.invTransform(this._picker.xAxis(), minVal);
                }
                if(this._rulers._curve && this._pos<minX)
                    this._pos=minX;

                //console.log(this._pos)
            }
            else
            {
                if(rulerPosVal < minVal)
                {
                    this._pos = plot.invTransform(this._picker.xAxis(), minVal);
                }
                if(rulerPosVal > maxVal)
                {
                    this._pos = plot.invTransform(this._picker.xAxis(), maxVal);
                }
                if(this._rulers._curve && this._pos<minX)
                    this._pos=minX;
                if(this._rulers._curve && this._pos>maxX)
                    this._pos=maxX;
            }
        }
        if(n==1)
        {
            if(this._rulers.ruler(0).isVisible())
            {
                var val = plot.transform(this._picker.xAxis(), this._rulers.ruler(0)._pos);
                if(rulerPosVal <= val+separationX)
                {
                    this._pos = plot.invTransform(this._picker.xAxis(), val+separationX);
                }
                if(rulerPosVal > maxVal)
                {
                    this._pos = plot.invTransform(this._picker.xAxis(), maxVal);
                }
                if(this._rulers._curve && this._pos>maxX)
                    this._pos=maxX;
            }
            else
            {
                if(rulerPosVal < minVal)
                {
                    this._pos = plot.invTransform(this._picker.xAxis(), minVal);
                }
                if(rulerPosVal > maxVal)
                {
                    this._pos = plot.invTransform(this._picker.xAxis(), maxVal);
                }
                if(this._rulers._curve && this._pos<minX)
                    this._pos=minX;
                if(this._rulers._curve && this._pos>maxX)
                    this._pos=maxX;
            }
        }
    }
}
}
//MRulerV.prototype = Object.create(RulerV.prototype);
// Set the "constructor" property to refer to Ruler
//MRulerV.prototype.constructor = MRulerV;

MRulerV.prototype.setVisible = function(visible){
    PlotMarker.prototype.setVisible.call(this, visible);
    if(visible && this._rulers)
    {
        var n = this._rulers.rulerId(this);
        if((n==0 && this._rulers.ruler(1).isVisible())||(n==1 && this._rulers.ruler(0).isVisible()))
        {
            this._rulers.resetXPositions();
        }
    }
}

MRulerV.prototype.setLockAt = function(val)
{    
    this.setPosition(val)
    this.setLock(true)
    Static.trigger("positionChanged") 
    Static.trigger("shapeItemValueChanged") 

}
/////////////////////////////////////////////////////////////////////////
/////////////////MRulerV - subclass of RulerV//////////start
//MRulerH.inheritsFrom( RulerH );
class MRulerH extends RulerH{
//Define the MRulerH constructor
//function MRulerH(plot, name, rulerGroup) {
    constructor(plot, name, rulerGroup) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    //RulerH.call(this, plot, name);
    super(plot, name);
    this._rulers = null

    if(rulerGroup)
        this._rulers = rulerGroup

    this.rulers = function()
    {
        return this._rulers;
    }

    this.validatePosition = function()
    {
         var plot = this.plot();
         var intv = plot.axisInterval  (this.yAxis());
         var min = intv.minValue();
         var max = intv.maxValue();
         var minVal = plot.transform(this.yAxis(), min);
         var maxVal = plot.transform(this.yAxis(), max);
         var rulerPosVal = plot.transform(this.yAxis(), this._pos);
         var minY = this._rulers.minY();
         var maxY = this._rulers.maxY();

         var space = 2
            if(Static.isMobile()){
                space = 12
            }

         var separationY = 0.5*(this.rulers().ruler(2).linePen().width + this.rulers().ruler(3).linePen().width)+space;

         var n = this._rulers.rulerId(this);
         if(n==2)
         {
              if(this._rulers.ruler(3).isVisible())
              {
                  var val = plot.transform(this.yAxis(), this._rulers.ruler(3)._pos);
                  if(rulerPosVal <= val+separationY)
                  {
                      this._pos = plot.invTransform(this.yAxis(), val+separationY);
                  }
                  if(rulerPosVal > minVal)
                  {
                      this._pos = plot.invTransform(this.yAxis(), minVal);
                  }
                  if(this._rulers._curve && this._pos<minY)
                        this._pos=minY;
              }
              else
              {
                    if(rulerPosVal < maxVal)
                    {
                        this._pos = plot.invTransform(this.yAxis(), maxVal);
                    }
                    if(rulerPosVal > minVal)
                    {
                        this._pos = plot.invTransform(this.yAxis(), minVal);
                    }
                    if(this._rulers._curve && this._pos<minY)
                        this._pos=minY;
                    if(this._rulers._curve && this._pos>maxY)
                        this._pos=maxY;
                }
            }
            if(n==3)
            {
                if(this._rulers.ruler(2).isVisible())
                {
                    var val = plot.transform(this.yAxis(), this._rulers.ruler(2)._pos);
                    if(rulerPosVal >= val-separationY)
                    {
                        this._pos = plot.invTransform(this.yAxis(), val-separationY);
                    }
                    if(rulerPosVal < maxVal)
                    {
                        this._pos = plot.invTransform(this.yAxis(), maxVal);
                    }
                    if(this._rulers._curve &&this._pos>maxY)
                        this._pos=maxY;
                }
                else
                {
                    if(rulerPosVal > minVal)
                    {
                        this._pos = plot.invTransform(this.yAxis(), minVal);
                    }
                    if(rulerPosVal < maxVal)
                    {
                        this._pos = plot.invTransform(this.yAxis(), maxVal);
                    }
                    if(this._rulers._curve && this._pos<minY)
                        this._pos=minY;
                    if(this._rulers._curve && this._pos>maxY)
                        this._pos=maxY;
                }

            }
        }    
    }
}
//MRulerH.prototype = Object.create(RulerH.prototype);
// Set the "constructor" property to refer to Ruler
//MRulerH.prototype.constructor = MRulerH;

MRulerH.prototype.setVisible = function(visible)
    {
        PlotMarker.prototype.setVisible.call(visible);
        if(visible && this._rulers)
        {
            var n = this._rulers.rulerId(this);
            if((n==2 && this._rulers.ruler(3).isVisible())||(n==3 && this._rulers.ruler(2).isVisible()))
            {
                this._rulers.resetYPositions();
            }
        }
    }

MRulerH.prototype.setLockAt = function(val)
{
    this.setPosition(val)
    this.setLock(true)
    Static.trigger("positionChanged") 
    Static.trigger("shapeItemValueChanged") 

}
/////////////////////////////////////////////////////////////

function Rulers(plot, /*vRulerConstructor, hRulerConstructor,*/ flags) {
    var self = this
    this._curve = 0
    this._watchTable = new WatchTable(this) 
    this._editor = 0 
    //this._flags = flags 
    this._curveShapeItem = 0 
    this._watchSetter = 0
    this._rulerList = null

    this._watchList = []

    /*var vRulerConst = vRulerConstructor || MRulerV
    var hRulerConst = hRulerConstructor || MRulerH*/

    plot.setAutoReplot(true)

    //if(!this._rulerList){
        this._rulerList = [new MRulerV(plot, "v_ruler1", self), 
                        new MRulerV(plot, "v_ruler2", self),
                        new MRulerH(plot, "h_ruler1", self), 
                        new MRulerH(plot, "h_ruler2", self)];
                    //}

        //console.log(this._rulerList)


    this._minX=0;
    this._maxX=0;
    this._minY=0;
    this._maxY=0;

    this.minX = function(){return this._minX;}
    this.maxX = function(){return this._maxX;}
    this.minY = function(){return this._minY;}
    this.maxY = function(){return this._maxY;}

    this.currentRuler = null

    var _menu = null

    var el = plot.getLayout().getCentralDiv()
    
    Static.bind("rulerSelected", function(e, ruler){
        self.currentRuler = ruler
        //ensure 'contextMenu' is included
        el.contextMenu(_menu, { 
                    triggerOn: 'contextmenu',
                    zIndex: 1
                  });
    })


    this.setMenu = function(menu){
        _menu = menu
    }



    this.init( plot);
    /*if(this._flags & Static.ConstructEditor)
    {
        _editor = new Editor(this);
    }*/
    /*if(!(this._flags & Static.ZoomerSearch))
    {
        this.setZoomerSearch(false);
    }
    if(!(this._flags & Static.PannerSearch))
    {
        this.setPannerSearch(false);
    }*/

    /*this.watchTable = function()    {
        //if(_flags & ConstructWatchTable)
        {
            if(this._watchTable)
                return this._watchTable;
            this._watchTable = new WatchTable(this);
            this._watchTable.updateWatchTable();
            this._watchTable.show();
        }    
        return this._watchTable;
    }*/

    this.position = function(rulerId){
        if(rulerId > -1 && rulerId < 4)
        {
            if(!this._rulerList[rulerId].isVisible())
                return Number.MAX_VALUE; //error
            return this._rulerList[rulerId]._pos;
        }
        return Number.MAX_VALUE;; //error
    }

    this.watch = function(id){
        if(id >= 0 && id < this._watchList.length)
            return this._watchList[id];
        return null;
    }

    this.addToWatchList = function(watch){
        this._watchList.push(watch);
        return this._watchList.length-1;
    }

    this.setWatchEnabled = function(id, set){
        if(id >= 0 && id < this._watchList.length)
        {
            if(this._watchList[id].isEnable()==set)
                return;
            this._watchList[id].setEnable(set);
            //To account for any changes that occurred during the disabled state, we updateWatch().
            if(set)
                this.updateWatch(this._watchList[id]);
            this._watchTable.updateWatchTable();
        }
    }

    this.isWatchEnabled = function(id){
        if(id >= 0 && id < this._watchList.length)
        {
            return this._watchList[id].isEnable();
        }
        return false;
    }

    this.updateWatchesAndTable = function(){    
        if(!this._curve)
            return;

        this.updateWatches();
        if(this._watchTable)
            this._watchTable.updateWatchTable();

        /*$("#watchTableBody").hide()//
        $("#watchTableBody").show()//*/

    }

    this.updateWatch = function(w){
        if(w.isEnable())
        {
            w.setCurveName(this._curve.title());
            w.setRulerLeft(this.position(0));
            w.setRulerRight(this.position(1));
            w.setRulerBottom(this.position(2));
            w.setRulerTop(this.position(3));
            if(this._curve){
                w.setCurve(this._curve);
            }
            w.computeWatch();
        }
    }

    this.updateWatches = function()
    {
        this._watchList.forEach(function(w){
           self.updateWatch(w);
       })
    }

    this.setEnabled = function (enable) {
        this._rulerList.forEach(function(ruler){
            ruler._picker.setEnabled(enable);
        })
        
    }

    this.setMouseTracking = function (enable) {
        this._rulerList.forEach(function(ruler){
            ruler._picker.setMouseTracking(enable);
        })
        
    }

    this.setZoomerSearch(true)
    this.setPannerSearch(true)

    //plot.setAutoReplot(true);
    this.setMouseTracking(true)

    Static.bind('zoomerAdded', function(e, zoomer){
        //self.initZoomer()
        self.setZoomerSearch(self._rulerList[0]._picker.controlFlag(Static.ZoomerSearch))
        self.setMouseTracking(true)
    })

    Static.bind('pannerAdded', function(e, panner){
        //self.initPanner()
        self.setPannerSearch(self._rulerList[0]._picker.controlFlag(Static.PannerSearch))
        self.setMouseTracking(true)
    })

    //this.setEnabled(true)

}
////////////////////////////////////////////////
Rulers.prototype.unlockAllRulers = function()
{
    for(var i=0; i<this._rulerList.length; ++i)
    {
         this._rulerList[i].setLock(false);
         //this._rulerList[i]._picker.setControlFlag(Static.Locked, false);
    }
}

Rulers.prototype.setCurrentCurve = function(curve)
{
    if(this._curve == curve)
        return;
    this.doSetCurrentCurve(curve);
}

Rulers.prototype.refresh = function()
{
    var p = this._rulerList[0].plot();
    if(this._curve && this._curve.isVisible())
    {
        // if(this._watchTable)
        //     this._watchTable.setEnabled(true);
        // if(_curveShapeItem && _curveShapeItem.visibilityToBerestored() &&
        //                            _rulerList[0].isVisible() && _rulerList[1].isVisible())
        // {
        //      _curveShapeItem.setVisible(true);
        //      _curveShapeItem.setVisibilityToBerestored(false);
        // }

        var intvX = p.axisInterval(this._rulerList[0].xAxis());
        var minX = intvX.minValue();
        var maxX = intvX.maxValue();
        var intvY = p.axisInterval(this._rulerList[0].yAxis());
        var minY = intvY.minValue();
        var maxY = intvY.maxValue();

        minX = this._minX < minX ? minX : this._minX;
        this._rulerList[0].setPosition(minX);

        maxX = this._maxX < maxX ? this._maxX : maxX;
        this._rulerList[1].setPosition(maxX);

        minY = this._minY < minY ? minY : this._minY;
        this._rulerList[2].setPosition(minY);

        maxY = this._maxY < maxY ? this._maxY : maxY;
        this._rulerList[3].setPosition(maxY);
        //unlockAllRulers();
        this.updateWatchesAndTable();
     }
     else
     {
        // if(this._watchTable)
        //     this._watchTable.setEnabled(false);
        this.resetXPositions();
        this.resetYPositions();
        // if(_curveShapeItem && _curveShapeItem.isVisible())
        // {
        //     _curveShapeItem.setVisible(false);
        //     _curveShapeItem.setVisibilityToBerestored(true);// note that visibility is to restored
        // }
     }
     //p.replot();
}


Rulers.prototype.doSetRulersAxes = function(xAxis, yAxis)
{
    var oldXAxis = this._rulerList[0].xAxis();
    var oldYAxis = this._rulerList[0].yAxis();
    for(var i=0; i<this._rulerList.length; ++i)
    {
        this._rulerList[i].setAxes(xAxis, yAxis);
        this._rulerList[i]._picker.setAxis(xAxis, yAxis);
    }
    //if(this._curveShapeItem)
        //this._curveShapeItem.setAxes(xAxis, yAxis);
    //updateConnectionOnXAxisChange(oldXAxis);
    //updateConnectionOnYAxisChange(oldYAxis);
}

Rulers.prototype.doSetCurrentCurve = function(curve)
{
    this._curve = curve;
    //console.log(curve)
    if(this._curve)
    {
        if(this._curve.isVisible())
        {
             this._minX = this._curve.minXValue();
             this._maxX = this._curve.maxXValue();
             this._minY = this._curve.minYValue();
             this._maxY = this._curve.maxYValue();
        }
        this.doSetRulersAxes(this._curve.xAxis(), this._curve.yAxis());//rulers reference these axes.
        if(this._curveShapeItem)
        {
            //this._curveShapeItem.setCurve(_curve);
            //this._curveShapeItem.setAbcissaValues(_minX, _maxX);
        }
    }
    this.refresh();
}

/*void Rulers::setCurrentCurve(const QString  & name)
{
    if(_curve && _curve.title().text() == name)
        return;
    doSetCurrentCurve(this.findCurve(name));
}*/

Rulers.prototype.setCurrentCurve = function(curve)
{
    if(this._curve == curve)
        return;
    this.doSetCurrentCurve(curve);
}

Rulers.prototype.currentCurve = function()
{
    return this._curve;    
}

Rulers.prototype.init = function( plot)
{
	var self = this
	var _rulerList = this._rulerList	 
	
	/*var scaleDivChangedFn = function()
	{
        var doReplot = true;
    
        var p = _rulerList[0].plot();
        var autoReplot = p.autoReplot();
        p.setAutoReplot( false );

		//console.log(_rulerList)
		//var _rulerList = self._rulerList
	    var separationX = 0.5*(_rulerList[0].linePen().width + _rulerList[1].linePen().width)+2;
	    var separationY = 0.5*(_rulerList[2].linePen().width + _rulerList[3].linePen().width)+2;
	    //var p = _rulerList[0].plot();
	    var intvX = p.axisInterval  (_rulerList[0].xAxis());
	    var minX = intvX.minValue();
	    var maxX = intvX.maxValue();
	    var intvY = p.axisInterval  (_rulerList[0].yAxis());
	    var minY = intvY.minValue();
	    var maxY = intvY.maxValue();
	    if(!self._curve)
	    {
	        _rulerList[0].setPosition(minX);
	        _rulerList[1].setPosition(maxX);
	        _rulerList[2].setPosition(minY);
	        _rulerList[3].setPosition(maxY);
             p.setAutoReplot( autoReplot );    
             //p.replot();
	        return;
	    }

	    //We position the rulers to the curve limits and reposition if they are out of visible range
	    _rulerList[0].setPosition(self._minX);
	    _rulerList[1].setPosition(self._maxX);
	    _rulerList[2].setPosition(self._minY);
	    _rulerList[3].setPosition(self._maxY);

	    //Position Left ruler
	    if(_rulerList[0]._pos< minX) //Ruler is to the left of minimum x
	    {
	        _rulerList[0].setPosition(minX);
	    }
	    var val =p.transform(_rulerList[0].xAxis(), maxX);
	    var lm = p.invTransform(_rulerList[0].xAxis(), val-separationX);
	    if(_rulerList[0]._pos>lm) //Ruler is to the right of it's right limit (lm)
	    {
	        _rulerList[0].setPosition(lm);
	    }

	    //Position Right ruler
	    if(_rulerList[1]._pos>maxX) //Ruler is to the right of maximum x
	    {
	        _rulerList[1].setPosition(maxX);
	    }
	    val = p.transform(_rulerList[0].xAxis(), minX);
	    lm = p.invTransform(_rulerList[0].xAxis(), val+separationX);
	    if(_rulerList[1]._pos<lm) //Ruler is to the left of it's left limit (lm)
	    {
	        _rulerList[1].setPosition(lm);
	    }

	    //Position Bottom ruler
	    if(_rulerList[2]._pos< minY) //Ruler is below of minimum y
	    {
	        _rulerList[2].setPosition(minY);
	    }
	    val =p.transform(_rulerList[0].yAxis(), maxY);
	    lm = p.invTransform(_rulerList[0].yAxis(), val+separationY);
	    if(_rulerList[2]._pos>lm) //Ruler is above the top limit (lm)
	    {
	        _rulerList[2].setPosition(lm);
	    }

	    //Position Top ruler
	    if(_rulerList[3]._pos>maxY) //Ruler is above maximum y
	    {
	        _rulerList[3].setPosition(maxY);
	    }
	    val = p.transform(_rulerList[0].yAxis(), minY);
	    lm = p.invTransform(_rulerList[0].yAxis(), val-separationY);
	    if(_rulerList[3]._pos<lm) //Ruler is below it's low limit (lm)
	    {
	        _rulerList[3].setPosition(lm);
	    }
	    // if(this._curveShapeItem)
	    //     this._curveShapeItem.setAbcissaValues(_rulerList[0].position(), _rulerList[1].position());

	    //Refresh the watch table
	    updateWatches();
	    if(this._watchTable)
	        this._watchTable.updateWatchTable();

        p.setAutoReplot( autoReplot );    
        //p.replot();

	}*/

    //To keep the rulers in the visible range after any zooming, panning or magnifying, we respond to scaleDivChanged()
    // QObject* scWidgetX = (QObject*)(plot.axisWidget(_rulerList[0].xAxis()));
    // connect(scWidgetX, SIGNAL(scaleDivChanged()), this, SLOT(scaleDivChangedSlot()));
    // QObject* scWidgetY = (QObject*)(plot.axisWidget(_rulerList[0].yAxis()));
    // connect(scWidgetY, SIGNAL(scaleDivChanged()), this, SLOT(scaleDivChangedSlot()));
    //var scWidgetX = plot.axisWidget(this._rulerList[0].xAxis());
    //console.log(scWidgetX)

    /*Static.bind("scaleDivChanged", function(){
	console.log(55)
})*/
	//Static.bind("scaleDivChanged", scaleDivChangedFn)
    

    // if(_flags & Static.CurveShapeItemX)
    // {
    //     _curveShapeItem = new CurveShapeItem("xItem");
    //     _curveShapeItem.setBrush(QColor(255, 0, 0, 50));
    //     _curveShapeItem.setPen(QPen(Qt::NoPen));
    //     _curveShapeItem.attach(plot);
    // }
//Static.trigger("positionChanged", [this._ruler, this._rulerPos])
    // foreach (Ruler * ruler, _rulerList) {
    //     connect(ruler.picker(), SIGNAL(positionChanged(Ruler *, double)), this, SLOT(updateWatchesAndTable()));
    //     if(dynamic_cast<RulerV*>(ruler))
    //     {
    //         connect(ruler.picker(), SIGNAL(shapeItemValueChanged()), this,
    //                 SLOT(shapeItemValueChangedSlot()));
    //         if(ruler.rightClickMenu())
    //             connect(ruler.rightClickMenu(), SIGNAL(rulerHidden(Ruler*)), this,
    //                 SLOT(rulerHiddenSlot(Ruler*)));
    //     }

    // }

    Static.bind("positionChanged", function(e, ruler, rulerPos){
        self.updateWatchesAndTable()
    });

    Static.bind("curveAdjusted", function(e, ruler, rulerPos){
        self.updateWatchesAndTable()
    });

    this._rulerList[0].setLinePen(new Misc.Pen("red"));
    this._rulerList[2].setLinePen(new Misc.Pen("red"));

    this.resetXPositions();
    this.resetYPositions();
}



Rulers.prototype.setZoomerSearch = function(on)
{
    this._rulerList.forEach(function(ruler){
        ruler.setZoomerSearch(on);
        ruler._picker.initZoomer()
    })    
}

Rulers.prototype.setPannerSearch = function(on)
{
    this._rulerList.forEach(function(ruler){
        ruler.setPannerSearch(on);
        ruler._picker.initPanner()
    })
}

Rulers.prototype.resetXPositions = function( )
{
    var intv = this._rulerList[0].plot().axisInterval(this._rulerList[0].xAxis());
    if(!this._curve || ! this._curve.isVisible())
    {
        this._rulerList[0].setPosition(intv.minValue());
        this._rulerList[1].setPosition(intv.maxValue());
    }
    else
    {
        if(intv.minValue() > this._minX)
            this._rulerList[0].setPosition(intv.minValue());
        else
            this._rulerList[0].setPosition(this._minX);
        if(intv.maxValue() < this._maxX)
            this._rulerList[1].setPosition(intv.maxValue());
        else
            this._rulerList[1].setPosition(this._maxX);
    }
}

Rulers.prototype.resetYPositions = function( )
{
    var intv= this._rulerList[0].plot().axisInterval(this._rulerList[0].yAxis());
    if(!this._curve || ! this._curve.isVisible())
    {        
        this._rulerList[2].setPosition(intv.minValue());
        this._rulerList[3].setPosition(intv.maxValue());
    }
    else
    {
        this._rulerList[2].setPosition(this._minY);
        this._rulerList[3].setPosition(this._maxY);

        if(intv.minValue() > this._minY)
            this._rulerList[2].setPosition(intv.minValue());
        else
            _rulerList[2].setPosition(this._minY);
        if(intv.maxValue() < this._maxY)
            this._rulerList[3].setPosition(intv.maxValue());
        else
            this._rulerList[3].setPosition(this._maxY);
    }
}

Rulers.prototype.ruler = function(rulerId)
{
    if(rulerId < 4 && rulerId >= 0)
        return this._rulerList[rulerId];
    return 0;
}

Rulers.prototype.rulerId = function(r)
{
    if(!r)
        return -1;
    return this._rulerList.indexOf(r);
}

Rulers.prototype.setRulersXAxis = function(axis)
{
    //if(!this._curve)
    {
        var oldAxis = this._rulerList[0].xAxis();
        for(var i=0; i<this._rulerList.length; ++i)
        {
            this._rulerList[i].setXAxis(axis);
            this._rulerList[i]._picker.setAxis(axis, this._rulerList[i].yAxis());
        }
        if(this._curveShapeItem)
            this._curveShapeItem.setAxes(axis, this._rulerList[0].yAxis());
        //updateConnectionOnXAxisChange(oldAxis);
    }
}

Rulers.prototype.setRulersYAxis = function(axis)
{
    //if(!this._curve)
    {
        //var oldAxis = this._rulerList[0].xAxis();
        for(var i=0; i<this._rulerList.length; ++i)
        {
            this._rulerList[i].setYAxis(axis);
            this._rulerList[i]._picker.setAxis(this._rulerList[i].xAxis(), axis);
        }
        if(this._curveShapeItem)
            this._curveShapeItem.setAxes(_rulerList[0].xAxis(), axis);
        //updateConnectionOnYAxisChange(oldAxis);
    }
}


////////////////////////////////////////////////////////////////

// WatchTable::WatchTable(Rulers * rulerGroup, QWidget * parent):QTableWidget(parent), _rulerGroup(rulerGroup)
// {
//     this.setColumnCount(2);
//     this.setHorizontalHeaderLabels(QStringList() << "Watch variable" << "value");
//     this.verticalHeader().hide();
//     this.horizontalHeader().setStretchLastSection(true);
// }

function WatchTable(_rulerGroup){

  /*var _dlg = $('<div class="modal fade" id="watchModal" role="dialog">\
    <div class="modal-dialog modal-sm">\
      <!-- Modal content-->\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4 class="modal-title">Watch Table</h4>\
        </div>\
        <div class="modal-body">\
        \
        \
          <table class="table table-bordered" id="watchTable">\
            <thead>\
              <tr>\
                <th>Watch</th>\
                <th>Value</th>\
             </tr>\
            </thead>\
            <tbody id="watchTableBody">\
            </tbody>\
          </table>\
          \
          \
        </div>\
        <div class="modal-footer">\
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
        </div>\
      </div>\
    </div>\
  </div>')*/

  //$('body').append(_dlg)

  //var _watchTable = null
  //var _watchList = []


    /*this.show = function(){
        this.updateWatchTable();
        _dlg.modal({backdrop: "static"});
    }*/

    function makeRow(watch){
        var watchVariable = watch.name()
        var value = watch.value()

        if(watch.valueType=="number" || watch.valueType=="text"){
            var elemId = watchVariable
            while(elemId.indexOf(' ')!=-1){
                elemId = elemId.replace(' ', '')
            }
            var row = $('<tr><td>'+watchVariable+'</td></tr>')
            $("#watchTableBody").append(row)
            var valueElem = $('<td><input id='+elemId+' type='+watch.valueType+'  style="width:100%" value='+value+' /></td>')
            row.append(valueElem)
            $("#"+elemId).on("change", watch.cb)
        }

        else{
            $("#watchTableBody").append($('<tr><td>'+watchVariable+'</td><td>'+value+'</td></tr>'))
        }
    }



    

    this.removeAllRows = function(){
        var rows = $("#watchTableBody").children()
        for(var i=0; i<rows.length; ++i){
            $("#watchTableBody")[0].removeChild(rows[i]);
        }
    }

    //this.insertInfoRow = function(watchVariable, value){
    this.insertInfoRow = function(watch){
        makeRow(watch)
        //makeRow(watchVariable, value)
        /*int row = this.rowCount();
        this.insertRow(row);
        QTableWidgetItem *newItem = new QTableWidgetItem(watchVariable);
        Qt::ItemFlags flags = newItem.flags();
        flags &= ~Qt::ItemIsSelectable;
        flags &= ~Qt::ItemIsEditable;
        newItem.setFlags(flags);
        this.setItem(row, 0, newItem);
        newItem = new QTableWidgetItem(value);
        flags = newItem.flags();
        flags &= ~Qt::ItemIsSelectable;
        flags &= ~Qt::ItemIsEditable;
        newItem.setFlags(flags);
        this.setItem(row, 1, newItem);*/
    }

    this.updateWatchTable = function()    {
        this.removeAllRows();
        if(_rulerGroup._curve && _rulerGroup._curve.isVisible())
        {
            //console.log(_rulerGroup._curve.title())

            var n = _rulerGroup._watchList.length;
            for(var i= 0; i<n; ++i)
            {
                var w = _rulerGroup.watch(i);
                if(w.isEnable())
                    //this.insertInfoRow(w.name(), w.value());
                    this.insertInfoRow(w);
            }
        }
    }

    

    

    


}

/////////////////////////////////////////////////////////////////////////

;
define("rulers", ["static","mpicker","ruler"], function(){});



function Watch(rulerGroup, dependentRuler){
    this._dependentRuler = dependentRuler || Static.NoRuler
    this._rulerGroup = rulerGroup
    var _enable = true
    this._curveName = "";
    this._curve = null;
    this._rulerLeft = Number.MAX_VALUE;
    this._rulerRight = Number.MAX_VALUE;
    this._rulerBottom = Number.MAX_VALUE;
    this._rulerTop = Number.MAX_VALUE;
    this._value; //undefined

    //subclass reimplement
    this.name = function(){
    }
    //subclass reimplement
    this.computeWatch = function(){        
    }
    this.value = function(){
        return this._value;
    }

    this.setCurveName = function(curveName){
        this._curveName = curveName;
    }
    this.setCurve = function(curve){
        this._curve = curve;
    }
    this.setRulerLeft = function(val){
        this._rulerLeft = val;
    }
    this.setRulerRight = function(val){
        this._rulerRight = val;
    }
    this.setRulerBottom = function(val){
        this._rulerBottom = val;
    }
    this.setRulerTop = function(val){
        this._rulerTop = val;
    }

    this.setEnable = function(set)
    {
        _enable = set;
    }
    this.isEnable = function(){
        return _enable;
    }

}



/*class WatchCurveName : public Watch
{
public:
    WatchCurveName():Watch(NO_RULER)
    {

    }
    QString name()const
    {
        return "Curve Name";
    }

    void computeWatch()
    {
        _value = _curveName;
    }


protected:


};

class WatchLeftRulerPosition : public Watch
{
public:
    WatchLeftRulerPosition():Watch(LEFT)
    {

    }
    QString name()const
    {
        return "Left Ruler Position";
    }

    void computeWatch()
    {
        if(_rulerLeft == DBL_MAX)
            _value = "Invalid";
        else
            _value = QString::number(_rulerLeft);
    }
protected:


};

class WatchRightRulerPosition : public Watch
{
public:
    WatchRightRulerPosition():Watch(RIGHT)
    {

    }
    QString name()const
    {
        return "Right Ruler Position";
    }

    void computeWatch()
    {
        if(_rulerRight == DBL_MAX)
            _value = "Invalid";
        else
            _value = QString::number(_rulerRight);
    }
protected:


};

class WatchBottomRulerPosition : public Watch
{
public:
    WatchBottomRulerPosition():Watch(BOTTOM)
    {

    }
    QString name()const
    {
        return "Bottom Ruler Position";
    }

    void computeWatch()
    {
        if(_rulerBottom == DBL_MAX)
            _value = "Invalid";
        else
            _value = QString::number(_rulerBottom);
    }
protected:


};

class WatchTopRulerPosition : public Watch
{
public:
    WatchTopRulerPosition():Watch(TOP)
    {

    }
    QString name()const
    {
        return "Top Ruler Position";
    }

    void computeWatch()
    {
        if(_rulerTop == DBL_MAX)
            _value = "Invalid";
        else
            _value = QString::number(_rulerTop);
    }
protected:


};



#endif // WATCH_H
*/;
define("watch", function(){});


///////////////////WatchCurveName///////////////////start
WatchCurveName.inheritsFrom( Watch );
function WatchCurveName(){
    Watch.call(this)

    this.name = function(){
        return "Curve name";
    }

    this.computeWatch = function()
    {
        this._value = this._curveName;
    }
}

///////////////////WatchLeftRulerPosition///////////////////start
WatchLeftRulerPosition.inheritsFrom( Watch );
function WatchLeftRulerPosition(rulerGroup){
    Watch.call(this, rulerGroup, Static.Left)
    var self = this

    this.name = function(){
        return "Left ruler position";
    }

    this.valueType = "number"

    this.computeWatch = function()
    {
        if(this._rulerLeft == Number.MAX_VALUE)
            this._value = "Invalid";
        else
            this._value = this._rulerLeft;
    }

    this.cb = function(){
                self._rulerGroup._rulerList[0]._pos = $(this).val()
                self._rulerGroup._rulerList[0].validatePosition();
                self._rulerGroup._rulerList[0].setPosition(self._rulerGroup._rulerList[0]._pos);
                Static.trigger("positionChanged", [self._rulerGroup._rulerList[0], self._rulerGroup._rulerList[0]._pos])
            }
}

///////////////////WatchRightRulerPosition///////////////////start
WatchRightRulerPosition.inheritsFrom( Watch );
function WatchRightRulerPosition(rulerGroup){
    Watch.call(this, rulerGroup, Static.Right)
    var self = this

    this.name = function(){
        return "Right ruler position";
    }
    this.valueType = "number"
    this.computeWatch = function()
    {
        if(this._rulerLeft == Number.MAX_VALUE)
            this._value = "Invalid";
        else
            this._value = this._rulerRight;
    }

    this.cb = function(){
                self._rulerGroup._rulerList[1]._pos = $(this).val()
                self._rulerGroup._rulerList[1].validatePosition();
                self._rulerGroup._rulerList[1].setPosition(self._rulerGroup._rulerList[1]._pos);
                Static.trigger("positionChanged", [self._rulerGroup._rulerList[1], self._rulerGroup._rulerList[1]._pos])
            }
}

///////////////////WatchBottomRulerPosition///////////////////start
WatchBottomRulerPosition.inheritsFrom( Watch );
function WatchBottomRulerPosition(rulerGroup){
    Watch.call(this, rulerGroup, Static.Bottom)
    var self = this
    this.valueType = "number"

    this.name = function(){
        return "Bottom ruler position";
    }

    this.computeWatch = function()
    {
        if(this._rulerBottom == Number.MAX_VALUE)
            this._value = "Invalid";
        else
            this._value = this._rulerBottom;
    }
    this.cb = function(){
                self._rulerGroup._rulerList[2]._pos = $(this).val()
                self._rulerGroup._rulerList[2].validatePosition();
                self._rulerGroup._rulerList[2].setPosition(self._rulerGroup._rulerList[2]._pos);
                Static.trigger("positionChanged", [self._rulerGroup._rulerList[2], self._rulerGroup._rulerList[2]._pos])
            }
}

///////////////////WatchTopRulerPosition///////////////////start
WatchTopRulerPosition.inheritsFrom( Watch );
function WatchTopRulerPosition(rulerGroup){
    Watch.call(this, rulerGroup, Static.Top)
    var self = this
    this.valueType = "number"

    this.name = function(){
        return "Top ruler position";
    }

    this.computeWatch = function()
    {
        if(this._rulerTop == Number.MAX_VALUE)
            this._value = "Invalid";
        else
            this._value = this._rulerTop;
    }

    this.cb = function(){
                self._rulerGroup._rulerList[3]._pos = $(this).val()
                self._rulerGroup._rulerList[3].validatePosition();
                self._rulerGroup._rulerList[3].setPosition(self._rulerGroup._rulerList[3]._pos);
                Static.trigger("positionChanged", [self._rulerGroup._rulerList[3], self._rulerGroup._rulerList[3]._pos])
            }
}

///////////////////WatchSlope///////////////////start
WatchSlope.inheritsFrom( Watch );
function WatchSlope(){
    Watch.call(this, Static.Left)//math.derivative('x^2', 'x').eval({x: 4});        // number 8
    
    this.name = function(){
        return "Slope at left ruler";
    }

    this.computeWatch = function()
    {

        if(this._rulerLeft == Number.MAX_VALUE)
            this._value = "Invalid";
        else{
            if(this._curve.fn){
                var fn = this._curve.fn
                if(this._curve.variable != 'z'){
                    while(fn.indexOf(this._curve.variable)!=-1){
                        fn=fn.replace(this._curve.variable, 'z')
                    }
                }
                if(this._curve.coeffs){
                    for(var i=0; i<this._curve.coeffs.length; ++i){
                        while(fn.indexOf(this._curve.coeffs[i])!=-1){
                            fn=fn.replace(this._curve.coeffs[i], this._curve.coeffsVal[i])
                        }
                    }
                }
                this._value = math.derivative(fn, 'z').eval({z: this._rulerLeft});
                //console.log(this._curve)
                return
            }
            var numOfPoints = this._curve.dataSize()
            //console.log(numOfPoints)
            var x = this._rulerLeft
            
            for(var i=0; i<numOfPoints; ++i){

                if(this._curve.sample(i).x > x){                    
                    var p2 = this._curve.sample(i)
                    var p1 = this._curve.sample(i-1)
                    this._value = (p2.y-p1.y)/(p2.x-p1.x)
                    return                    
                }
            }
        }
            //this._value = this._rulerTop;
    }
}



///////////////////WatchAreaBelowCurve///////////////////start
WatchAreaBelowCurve.inheritsFrom( Watch );
function WatchAreaBelowCurve(){
    Watch.call(this, Static.LeftAndRight)
    
    this.name = function(){
        return "Area below curve";
    }    

    this.computeWatch = function()
    {

        if(this._rulerLeft == Number.MAX_VALUE)
            this._value = "Invalid";
        else{
            
            if(this._curve.fn){
                var fn = this._curve.fn
                if(this._curve.variable != 'z'){
                    while(fn.indexOf(this._curve.variable)!=-1){
                        fn=fn.replace(this._curve.variable, 'z')
                    }
                }
                if(this._curve.coeffs){
                    for(var i=0; i<this._curve.coeffs.length; ++i){
                        while(fn.indexOf(this._curve.coeffs[i])!=-1){
                            fn=fn.replace(this._curve.coeffs[i], this._curve.coeffsVal[i])
                        }
                    }
                }
                //this._value = math.integrate(fn, 'x').eval({x: this._rulerLeft});
                this._value = math.eval('integrate('+fn+', z,'+this._rulerLeft+','+this._rulerRight+')')
                //console.log(this._curve)
                return
            }

            
            var numOfPoints = this._curve.dataSize()
            //this._rulerLeft this._rulerRight
            this._value = 0
            for(var i=1; i<numOfPoints; ++i){
                var p2 = this._curve.sample(i)//point to right of the left ruler
                var p1 = this._curve.sample(i-1)//point to left of (or at) the
                var fn = Static.linearEquationFromPoints(p1, p2)
                //this._value = math.eval('integrate('+fn+', x,'+this._rulerLeft+','+this._rulerRight+')')
                var left = p1.x

                if(p2.x < this._rulerLeft)
                    continue
                if(p1.x > this._rulerRight)
                    continue

                if(left < this._rulerLeft)
                    left = this._rulerLeft
                var right = p2.x
                if(right > this._rulerRight)
                    right = this._rulerRight

                
                this._value += math.eval('integrate('+fn+', x,'+left+','+right+')')

            }
            this._value = Static.adjustForDecimalPlaces(this._value)
            //console.log(this._value)
            
            /*var numOfPoints = this._curve.dataSize()
            //console.log(numOfPoints)
            var xLeft = this._rulerLeft
            var xRight = this._rulerRight
            
            var A0 = 0 
            var An = 0
            var Ai = 0
            for(var i=1; i<numOfPoints; ++i){
                var p2 = this._curve.sample(i)//point to right of the left ruler
                var p1 = this._curve.sample(i-1)//point to left of (or at) the
                
                if(!A0 && p2.x > xLeft && p2.x <= xRight){ 
                    var y = p1.y+(p2.y-p1.y)*(xLeft-p1.x)/(p2.x-p1.x)//point to left of (or at) the left ruler
                    //console.log("yLeft:"+yLeft)
                    A0 = 0.5*(y+p2.y)*(p2.x-xLeft)
                    //console.log("A0:"+A0)
                    continue
                }
                if(A0 && p2.x <= xRight){
                    Ai += 0.5*(p2.y+p1.y)*(p2.x-p1.x)
                    //console.log("Ai:"+Ai)
                    continue
                }
                
                if( p2.x > xRight){
                    if(p1.x >= xLeft){
                        var y = p2.y+(p2.y-p1.y)*(xRight-p2.x)/(p2.x-p1.x) 
                        //console.log("y:"+y) 
                        An = 0.5*(y+p1.y)*(xRight-p1.x)
                        //console.log("An:"+An) 

                        break   
                    }else{
                        var y2 = p2.y+(p2.y-p1.y)*(xRight-p2.x)/(p2.x-p1.x) 
                        //console.log("y2:"+y2) 
                        var y1 = p1.y+(p2.y-p1.y)*(xLeft-p1.x)/(p2.x-p1.x) 
                        //console.log("y1:"+y1) 
                        An = 0.5*(y2+y1)*(xRight-xLeft)
                        //console.log("An:"+An) 

                        break
                    }                       
                }                                        
                
            }*/
            //this._value = A0+Ai+An 

            
        }
            
    }
}

///////////////////WatchVolumeOfRevolution///////////////////start
WatchVolumeOfRevolution.inheritsFrom( Watch );
function WatchVolumeOfRevolution(){
    Watch.call(this, Static.LeftAndRight)

    function getvolume(y1, y2, w){
        var volume = y1*w*Math.PI*y1
        volume = volume + 0.5*(y2-y1)*w*(y1+(y2-y1)/3)*2*Math.PI
        return volume
    }
    
    this.name = function(){
        return "Volume of revolution";
    }    

    this.computeWatch = function()
    {

        if(this._rulerLeft == Number.MAX_VALUE)
            this._value = "Invalid";
        else{
            
            if(this._curve.fn){
                var fn = this._curve.fn
                if(this._curve.variable != 'x'){
                    while(fn.indexOf(this._curve.variable)!=-1){
                        fn=fn.replace(this._curve.variable, 'x')
                    }
                }
                if(this._curve.coeffs){
                    for(var i=0; i<this._curve.coeffs.length; ++i){
                        while(fn.indexOf(this._curve.coeffs[i])!=-1){
                            fn=fn.replace(this._curve.coeffs[i], this._curve.coeffsVal[i])
                        }
                    }
                }
                //this._value = math.derivative(fn, 'x').eval({x: this._rulerLeft});
                this._value = math.eval('integrate('+fn+', x,'+this._rulerLeft+','+this._rulerRight+',true)')
                //console.log(this._curve)
                return
            }
            
            var numOfPoints = this._curve.dataSize()
            //console.log(numOfPoints)
            var xLeft = this._rulerLeft
            var xRight = this._rulerRight
            
            var A0 = 0 
            var An = 0
            var Ai = 0
            for(var i=1; i<numOfPoints; ++i){
                var p2 = this._curve.sample(i)//point to right of the left ruler
                var p1 = this._curve.sample(i-1)//point to left of (or at) the
                
                if(!A0 && p2.x > xLeft && p2.x <= xRight){ 
                    var y = p1.y+(p2.y-p1.y)*(xLeft-p1.x)/(p2.x-p1.x)//point to left of (or at) the left ruler
                    //console.log("yLeft:"+yLeft)
                    //A0 = 0.5*(y+p2.y)*(p2.x-xLeft)
                    A0 = getvolume(y,p2.y, p2.x-xLeft)

                    //console.log("A0:"+A0)
                    continue
                }
                if(A0 && p2.x <= xRight){
                    //Ai += 0.5*(p2.y+p1.y)*(p2.x-p1.x)
                    //console.log("Ai:"+Ai)
                    Ai += getvolume(p2.y,p1.y, p2.x-p1.x)
                    continue
                }
                
                if( p2.x > xRight){
                    if(p1.x >= xLeft){
                        var y = p2.y+(p2.y-p1.y)*(xRight-p2.x)/(p2.x-p1.x) 
                        //console.log("y:"+y) 
                        //An = 0.5*(y+p1.y)*(xRight-p1.x)
                        //console.log("An:"+An) 
                        An = getvolume(y,p1.y, xRight-p1.x)

                        break   
                    }else{
                        var y2 = p2.y+(p2.y-p1.y)*(xRight-p2.x)/(p2.x-p1.x) 
                        //console.log("y2:"+y2) 
                        var y1 = p1.y+(p2.y-p1.y)*(xLeft-p1.x)/(p2.x-p1.x) 
                        //console.log("y1:"+y1) 
                        //An = 0.5*(y2+y1)*(xRight-xLeft)
                        //console.log("An:"+An) 
                        An = getvolume(y2,y1, xRight-xLeft)

                        break
                    }                       
                }                                        
                
            }
            this._value = Static.adjustForDecimalPlaces(A0+Ai+An) 

            
        }
            
    }
}

;
define("basicWatch", ["static","watch"], function(){});


var LegendMenu = {}
	LegendMenu.plot = null
    LegendMenu.detachReset = null
    LegendMenu.curveFitCb = null
    LegendMenu.curveFitInfoCb = null
    LegendMenu.axisCb = null

    //Names of menu items
    //'remove', 'fit','axis', 'rename', 'symbol', 'pen'
    LegendMenu.hiddenItems = null //['fit', 'symbol']


/////////////submenu1///////////////////
LegendMenu.subMenu1 = [
	/*style
	solid
	dash : ctx.setLineDash([10, 5])
	dashDot : ctx.setLineDash([12, 5, 3, 5])
	dashDotDot : ctx.setLineDash([12, 5, 3, 5, 3, 5])
	dot : ctx.setLineDash([2, 8])
	 */

	{
		name: 'style',
		//title: 'It will replace row',
		//img:'images/replace.png',
		subMenu: [{
				name: 'Rectangle',
				//img:'images/top.png',
				fun: function () {
					LegendMenu.addSymbol(MRect)
				}

			}, {
				name: 'Cross',
				//img:'images/top.png',
				fun: function () {
					LegendMenu.addSymbol(Cross)
				}

			}, {
				name: 'Diamond',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.addSymbol(Diamond)
				}
			}, {
				name: 'Ellipse',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.addSymbol(Ellipse)
				}
			}, {
				name: 'Diagonal cross',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.addSymbol(XCross)
				}
			}
			/*,{
			name: 'Triangle',
			//img:'images/all.png',
			fun:function(){
			LegendMenu.addSymbol(Triangle)
			}
			}*/
		, {
				name: 'None',
				//img:'images/all.png',
				fun: function () {
					var curve = LegendMenu.getCurve()
					if(!curve) return
					curve.setSymbol(null)
				}
			}
		]
	}

]
///////////////////////////////
////////////////////////////subMenu2
LegendMenu.subMenu2 = [///////////

	/*style
	solid
	dash : ctx.setLineDash([10, 5])
	dashDot : ctx.setLineDash([12, 5, 3, 5])
	dashDotDot : ctx.setLineDash([12, 5, 3, 5, 3, 5])
	dot : ctx.setLineDash([2, 8])
	 */

	{
		name: 'style',
		//title: 'It will replace row',
		//img:'images/replace.png',
		subMenu: [{
				name: 'Rectangle',
				//img:'images/top.png',
				fun: function () {
					LegendMenu.addSymbol(MRect)
				}

			}, {
				name: 'Cross',
				//img:'images/top.png',
				fun: function () {
					LegendMenu.addSymbol(Cross)
				}

			}, {
				name: 'Diamond',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.addSymbol(Diamond)
				}
			}, {
				name: 'Ellipse',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.addSymbol(Ellipse)
				}
			}, {
				name: 'Diagonal cross',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.addSymbol(XCross)
				}
			}
			/*,{
			name: 'Triangle',
			//img:'images/all.png',
			fun:function(){
			LegendMenu.addSymbol(Triangle)
			}
			}*/
		, {
				name: 'None',
				//img:'images/all.png',
				fun: function () {
					var curve = LegendMenu.getCurve()
					if(!curve) return
					curve.setSymbol(null)
				}
			}
		]
	}, {
		name: 'size',
		//title: 'It will replace row',
		//img:'images/replace.png',
		//disable: true,
		subMenu: [{
				name: '5x5',
				//img:'images/top.png',
				fun: function () {
					LegendMenu.setSymbolSize(5)
				}

			}, {
				name: '6x6',
				//img:'images/top.png',
				fun: function () {
					LegendMenu.setSymbolSize(6)
				}

			}, {
				name: '8x8',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.setSymbolSize(8)
				}
			}, {
				name: '10x10',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.setSymbolSize(10)
				}
			}, {
				name: '12x12',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.setSymbolSize(12)
				}
			}
			/*,{
			name: '14x14',
			//img:'images/all.png',
			fun:function(){
			LegendMenu.setSymbolSize(14)
			}
			}*/
		, {
				name: '15x15',
				//img:'images/all.png',
				fun: function () {
					LegendMenu.setSymbolSize(15)
				}
			}
		]
	}, {
		name: 'fill brush',
		//title: 'It will merge row',
		//img:'images/merge.png',
		//disable: true,
		fun: function () {
			var colorSelector = $('<input type="color" style="opacity:0;">')
				LegendMenu.el.append(colorSelector)
				var curve = LegendMenu.getCurve()
				if(!curve) return
				var sym = curve.symbol()
				if (sym) {
					var brush = sym.brush()
					var c = brush.color
					if(c == "noBrush"){
						c = "#000000"
					}
						colorSelector.val(Static.colorNameToHex(c))
						colorSelector.change(function () {
							//console.log($(this).val())
							//console.log(el.text())
							$(this).remove()

							//var pen = curve.pen()
							brush.color = $(this).val()
								sym.setBrush(brush)
								LegendMenu.plot.autoRefresh()
								LegendMenu.plot.updateLegend(curve)

						})
						colorSelector.trigger('click')
				}
		}

	}, {
		name: 'pen',
		//img: 'images/update.png',
		//title: 'update button',
		//disable: true,
		subMenu: [{
				name: 'color',
				//title: 'It will merge row',
				//img:'images/merge.png',
				fun: function () {
					var colorSelector = $('<input type="color" style="opacity:0;">')

						LegendMenu.el.append(colorSelector)
						var curve = LegendMenu.getCurve()
						if(!curve) return
						var sym = curve.symbol()
						if (!sym)
							return

							colorSelector.val(Static.colorNameToHex(sym.pen().color))
							colorSelector.change(function () {
								//$(this).remove()

								var pen = sym.pen()
									pen.color = $(this).val()
									sym.setPen(pen)
									LegendMenu.plot.autoRefresh()
									LegendMenu.plot.updateLegend(curve)

							})
							colorSelector.trigger('click')
				}

			}, {
				name: 'pen width',
				//title: 'It will replace row',
				//img:'images/replace.png',
				subMenu: [{
						name: '1',
						//img:'images/top.png',
						fun: function () {
							LegendMenu.setSymbolPenWidth(1)
						}

					}, {
						name: '2',
						//img:'images/top.png',
						fun: function () {
							LegendMenu.setSymbolPenWidth(2)
						}

					}, {
						name: '3',
						//img:'images/all.png',
						fun: function () {
							LegendMenu.setSymbolPenWidth(3)
						}
					}, {
						name: '4',
						//img:'images/all.png',
						fun: function () {
							LegendMenu.setSymbolPenWidth(4)
						}
					}, {
						name: '5',
						//img:'images/all.png',
						fun: function () {
							LegendMenu.setSymbolPenWidth(5)
						}
					}
				]
			}

		]
	}

]
/////////////////////////////////////////////////////////
// function curveFitCb(){
// }

/////////////////////////////menu1////////////////////////////////////
LegendMenu.menu1 = [{
		name: 'axis',
		title: 'Set the axes associated with the curve.',
		fun: function () {			
			var curve = LegendMenu.getCurve()
			if(!curve) return
			LegendMenu.axisCb(curve)
		}
	},{	    
		name: 'remove',
		title: 'Removes the curve from the plot.',
		fun: function () {
			var curve = LegendMenu.getCurve()
			if(!curve) return
				LegendMenu.detachReset(curve)
				curve.detach()

		}

	},{
		name: 'rename',
		title: 'Renames the curve.',
		fun: function () {
			var curve = LegendMenu.getCurve()
			if(!curve) return
			LegendMenu.detachReset(curve)

			Static.prompt("Enter a new name for \""+curve.title()+"\"",
				curve.title(), function(name){
				if(curve.title()==name){
					return true
				}
				if(!curve.plot().findPlotCurve(name)){
				    curve.setTitle(name)
				    return true
				}else{
					Static.alert(name + " already exist")
					return false
				}
			}, "small")

			
		},
	
	},{
		name: 'fit',
		title: 'Defines a curve fitter.',
		fun: function () {
			var curve = LegendMenu.getCurve()
			if(!curve) return
			LegendMenu.curveFitCb(curve)

		},
	
	}, {
		name: 'symbol',
		//img: 'images/update.png',
		//title: 'update button',
		subMenu: null
	}, {
		name: 'pen',
		//img: 'images/update.png',
		//title: 'update button',
		subMenu: [{
				name: 'color',
				//title: 'It will merge row',
				//img:'images/merge.png',
				fun: function () {
					    var colorSelector = $('<input type="color" style="opacity:0;">')
					    //LegendMenu.el, and hence colorSelector, is removed from the DOM during legend update
					    LegendMenu.el.append(colorSelector)

						var curve = LegendMenu.getCurve()
						if(!curve) return
						colorSelector.val(Static.colorNameToHex(curve.pen().color))
						colorSelector.change(function () {
							//console.log($(this).val())
							//console.log(el.text())
							//$(this).remove()

							var pen = curve.pen()
								pen.color = $(this).val()
								curve.setPen(pen)

						})
						colorSelector.trigger('click')
				}

			},

			/*style
			solid
			dash : ctx.setLineDash([10, 5])
			dashDot : ctx.setLineDash([12, 5, 3, 5])
			dashDotDot : ctx.setLineDash([12, 5, 3, 5, 3, 5])
			dot : ctx.setLineDash([2, 8])
			 */

			{
				name: 'line style',
				//title: 'It will replace row',
				//img:'images/replace.png',
				subMenu: [{
						name: 'solid',
						//img:'images/top.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "solid"
								curve.setPen(pen)
						}

					}, {
						name: 'dot',
						//img:'images/top.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "dot"
								curve.setPen(pen)
						}

					}, {
						name: 'dash',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "dash"
								curve.setPen(pen)
						}
					}, {
						name: 'dashDot',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "dashDot"
								curve.setPen(pen)
						}
					}, {
						name: 'dashDotDot',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "dashDotDot"
								curve.setPen(pen)
						}
					}
				]
			}, {
				name: 'pen width',
				//title: 'It will replace row',
				//img:'images/replace.png',
				subMenu: [{
						name: '1',
						//img:'images/top.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 1
								curve.setPen(pen)
						}

					}, {
						name: '2',
						//img:'images/top.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 2
								curve.setPen(pen)
						}

					}, {
						name: '3',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 3
								curve.setPen(pen)
						}
					}, {
						name: '4',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 4
								curve.setPen(pen)
						}
					}, {
						name: '5',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 5
								curve.setPen(pen)
						}
					}
				]
			}

		]
	}];

/////////////////////////////////////

/////////////////////////////menu2////////////////////////////////////
LegendMenu.menu2 = [{
		name: 'axis',
		title: 'Set the axes associated with the curve.',
		fun: function () {			
			var curve = LegendMenu.getCurve()
			if(!curve) return
			LegendMenu.axisCb(curve)
		}
	},{	    
		name: 'remove',
		title: 'Removes the curve from the plot.',
		fun: function () {
			var curve = LegendMenu.getCurve()
			if(!curve) return
				LegendMenu.detachReset(curve)
				curve.detach()

		}

	},{
		name: 'rename',
		title: 'Renames the curve.',
		fun: function () {
			var curve = LegendMenu.getCurve()
			if(!curve) return
			LegendMenu.detachReset(curve)

			Static.prompt("Enter a new name for \""+curve.title()+"\"",
				curve.title(), function(name){
				if(curve.title()==name){
					return true
				}
				if(!curve.plot().findPlotCurve(name)){
				    curve.setTitle(name)
				    return true
				}else{
					Static.alert(name + " already exist")
					return false
				}
			})

			/*var name = prompt("Enter a new name for \""+curve.title()+"\"",
				curve.title())
			curve.setTitle(name)*/
		},
	
	},{
		name: 'fit',
		title: 'Defines a curve fitter.',
		fun: function () {
			var curve = LegendMenu.getCurve()
			if(!curve) return
			LegendMenu.curveFitCb(curve)

		},
	
	}, {
		name: 'symbol',
		//img: 'images/update.png',
		//title: 'update button',
		subMenu: null
	}, {
		name: 'pen',
		//img: 'images/update.png',
		//title: 'update button',
		subMenu: [{
				name: 'color',
				//title: 'It will merge row',
				//img:'images/merge.png',
				fun: function () {
					var colorSelector = $('<input type="color" style="opacity:0;">')

						LegendMenu.el.append(colorSelector)
						var curve = LegendMenu.getCurve()
						if(!curve) return
						colorSelector.val(Static.colorNameToHex(curve.pen().color))
						colorSelector.change(function () {
							//console.log($(this).val())
							//console.log(el.text())
							//$(this).remove()

							var pen = curve.pen()
								pen.color = $(this).val()
								curve.setPen(pen)

						})
						colorSelector.trigger('click')
				}

			},

			/*style
			solid
			dash : ctx.setLineDash([10, 5])
			dashDot : ctx.setLineDash([12, 5, 3, 5])
			dashDotDot : ctx.setLineDash([12, 5, 3, 5, 3, 5])
			dot : ctx.setLineDash([2, 8])
			 */

			{
				name: 'line style',
				//title: 'It will replace row',
				//img:'images/replace.png',
				subMenu: [{
						name: 'solid',
						//img:'images/top.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "solid"
								curve.setPen(pen)
						}

					}, {
						name: 'dot',
						//img:'images/top.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "dot"
								curve.setPen(pen)
						}

					}, {
						name: 'dash',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "dash"
								curve.setPen(pen)
						}
					}, {
						name: 'dashDot',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "dashDot"
								curve.setPen(pen)
						}
					}, {
						name: 'dashDotDot',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.style = "dashDotDot"
								curve.setPen(pen)
						}
					}
				]
			}, {
				name: 'pen width',
				//title: 'It will replace row',
				//img:'images/replace.png',
				subMenu: [{
						name: '1',
						//img:'images/top.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 1
								curve.setPen(pen)
						}

					}, {
						name: '2',
						//img:'images/top.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 2
								curve.setPen(pen)
						}

					}, {
						name: '3',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 3
								curve.setPen(pen)
						}
					}, {
						name: '4',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 4
								curve.setPen(pen)
						}
					}, {
						name: '5',
						//img:'images/all.png',
						fun: function () {
							var curve = LegendMenu.getCurve()
							if(!curve) return
								var pen = curve.pen()
								pen.width = 5
								curve.setPen(pen)
						}
					}
				]
			}

		]
	},

{	    
		name: 'fit info...',
		title: 'Displays information associated with curve fitting.',
		fun: function () {
			var curve = LegendMenu.getCurve()
			if(!curve) return
			var info = LegendMenu.curveFitInfoCb(curve)
			if(info.length){				
				Static.alert(info/*, "small"*/)
			}else{
				Static.alert("No curve fitting equation found for \""+curve.title()+".\"")	
			}
		}

	}];

/////////////////////////////////////



LegendMenu.addSymbol = function (style) {
	var curve = LegendMenu.getCurve()
	if(!curve) return
	//console.log(curve)
	var sym = new Symbol();
	sym.setBrush(new Misc.Brush(Static.NoBrush))
	sym.setSize(new Misc.Size(10, 10))
	sym.setStyle(style);
	curve.setSymbol(sym)      
}

LegendMenu.setSymbolPenWidth = function (width) {
	var curve = LegendMenu.getCurve()
		if(!curve) return
		var sym = curve.symbol()
		if (!sym){
			return
		}
		var pen = sym.pen()
		pen.width = width
		sym.setPen(pen)
		//curve.setSymbol(sym)
		LegendMenu.plot.autoRefresh()

        LegendMenu.plot.updateLegend(curve)
}

LegendMenu.setSymbolSize = function (value) {
	var curve = LegendMenu.getCurve()
		if(!curve) return
		var sym = curve.symbol()
		if (!sym)
			return
			var sz = sym.size()
				sz.width = value
				sz.height = value
				sym.setSize(sz)
				LegendMenu.plot.autoRefresh()
}

LegendMenu.getCurve = function () {
	if(LegendMenu.el==undefined){
		return null
	}
	var txt = LegendMenu.el.text().replace(' ', '') //remove leading white space
		return LegendMenu.plot.findPlotCurve(txt)
}



LegendMenu.initialize = function (){//plot, detachCb, curveFitCb) {	


   
	//console.log(LegendMenu.menu1)
	//LegendMenu.menu1.splice(3, 1)
	//console.log(LegendMenu.menu1)
	//console.log(LegendMenu.hiddenItems)
//////////////////////////////////
	var _menuItemName = ""

	function indexOfMenuItemCb(_name, legendMenu) {
		_menuItemName = _name
		return legendMenu.findIndex(findIndexOfMenuItemCb);
	}

    function findIndexOfMenuItemCb(obj) {
		return obj.name == _menuItemName;
	}

	//ages.findIndex(findIndexOfMenuItemCb)

	function hideMenuItem(menuItemName){
		_menuItemName = menuItemName
		//var n = LegendMenu.menu1.findIndex(findIndexOfMenuItemCb)
		//console.log(n)
		LegendMenu.menu1.splice(LegendMenu.menu1.findIndex(findIndexOfMenuItemCb), 1)
		LegendMenu.menu2.splice(LegendMenu.menu2.findIndex(findIndexOfMenuItemCb), 1)
	}

	if(LegendMenu.hiddenItems)
		LegendMenu.hiddenItems.forEach(hideMenuItem)
	//console.log(LegendMenu.menu1)
	//console.log(indexOfMenuItemCb('symbol', LegendMenu.menu1))


	
      
		LegendMenu.table = $(LegendMenu.plot.getLayout().getLegendDiv().children()[0])

		/*LegendMenu.table.mouseover(function (e) {
			LegendMenu.el = Static.elementsFromPoint(e.pageX, e.pageY, LegendMenu.table).find('LABEL')
			//console.log(LegendMenu.el)	
				/////////////////////////////
			var curve = LegendMenu.getCurve()
			LegendMenu.menu = LegendMenu.menu1
			if (curve){
				if(curve.equation){
					LegendMenu.menu = LegendMenu.menu2
				}
			}
				/////////////////////////////


				var str = LegendMenu.el.text()
				LegendMenu.menu[3].subMenu = LegendMenu.subMenu1




				if (curve && curve.symbol()) {
					LegendMenu.menu[3].subMenu = LegendMenu.subMenu2
				}


				LegendMenu.el.parent().contextMenu(LegendMenu.menu, {
					triggerOn: 'contextmenu',
					zIndex: 1000
				});

		})*/

		LegendMenu.table.mousedown(function(e){
			if(e.button!=2){//not right button
				return
			}
			var x = e.pageX, y = e.pageY;
		    var res = [];

		    var ele = document.elementFromPoint(x,y);
		    //console.log(ele.parentElement.tagName)/////////
		    while(ele && ele.tagName != "BODY" && ele.tagName != "HTML"){
		        res.push(ele);
		        ele.style.display = "none";
		        ele = document.elementFromPoint(x,y);
		    }

		    for(var i = 0; i < res.length; i++){
		        res[i].style.display = "";
		    }
		    //console.log($(res[0]).text());
		    LegendMenu.el = $(res[0])
		    var curve = LegendMenu.getCurve()
		    if(!curve) return
		    //console.log(curve.title())
			LegendMenu.menu = LegendMenu.menu1
			if (curve){
				if(curve.fitType){
					LegendMenu.menu = LegendMenu.menu2
				}
			}
			var subMenuIndex = indexOfMenuItemCb('symbol', LegendMenu.menu1)
			if(subMenuIndex > -1){
				LegendMenu.menu[subMenuIndex].subMenu = LegendMenu.subMenu1
				if (curve && curve.symbol()) {
					LegendMenu.menu[subMenuIndex].subMenu = LegendMenu.subMenu2
				}
			}
			//LegendMenu.el.parent().contextMenu(LegendMenu.menu, {
			LegendMenu.el.contextMenu(LegendMenu.menu, {
				triggerOn: 'contextmenu',
				zIndex: 1
			});
		})
}
;
define("legendMenu", ["static","contextMenu"], function(){});


define('app/examples/qwtTest',[
		'settings',
		'curveSettings',
		
		'upload',
		'mParser',
		'toolBar',
        'functionDlg',
		'curveFitDlg',
		
		'axisDlg',
        'jQwtPlot',
        'jQwtPointData', 
		'jQwtSymbol',
		'jQwtLegend',
		'jQwtMagnifier',
		'jQwtPlotGrid',
		'widgetOverlay',
		'qwtplotzoomer',
		'qwtplotcurve',
		'jQwtCurveFitter',
		'jQwtSpline',
		'sideBar',
		'jQwtPanner',
		'contextMenu',
		'jQwtPlotMarker',
		'ruler',
		'mpicker',
		'rulers',
		'watch',
		'basicWatch',
		
                'legendMenu'
		

	], function (Settings, CurveSettings, Upload, Parser, ToolBar, FunctionDlg, CurveFitDlg, AxisDlg) {

	var isChrome = !!window.chrome && !!window.chrome.webstore;
	if(!isChrome)
    {
        Static.alert('This application is design to run in \"chrome browser\". While it may run in other browsers, some features may not behave as expected.', "small");
    }
	

	var _numOfSamples = 80;
	var colorList = ["black", "red", "green", "blue", "yellow", "brown"]
	var plot = new Plot($("#plotDiv"), "Plot");

	plot.setFooter("Footer");

	//Static.alert("this.message");
	//plot.setAxisScale( yRight, -100,100)


	//console.log(Static.adjustForDecimalPlaces(999.9999999999998, 5))

	//console.log(plot.axisScaleDraw(xBottom))


	var grid = new PlotGrid();

	//console.log(grid.getZ())

	grid.attach(plot);
	//console.log(grid)
	/*grid.enableX(false)
	grid.enableY(false)
	grid.enableXMin(true)*/

	function minorGridLines(on) {
		grid.enableXMin(on)
		grid.enableYMin(on)
	}

	minorGridLines(true)

	function majorGridLines(on) {
		if (!on) {
			tbar.hideDropdownItem(viewButton, 5)
		} else {
			tbar.showDropdownItem(viewButton, 5)
		}
		grid.enableX(on)
		grid.enableY(on)
	}

	var lgd = new MLegend
        //new LegendContextMenu(plot)
		plot.insertLegend(lgd); //1.This need to be called early
	//plot.replot()//and in this order. Should not be

	//lgd.setMaxWidth(300)
	//plot.replot()
	//console.log(lgd.maxWidth())


	// var obj = new Curve("HH")

	// 	obj.setSamples([new Misc.Point(-300, -100), new Misc.Point(-50, -50), new Misc.Point(0, 0), new

	// 			Misc.Point(50, 50), new Misc.Point(300, 100)]);
	//obj.setStyle(Dots);
	//obj.setOrientation(Horizontal)
	//obj.setCurveAttribute(Inverted, true)
	//obj.setBrush(new Misc.Brush("#0000ff"))
	// obj.setPen(new Misc.Pen("green"))

	// var sym = new Symbol();
	// sym.setSize(new Misc.Size(10, 10))
	// sym.setStyle(MRect);
	// sym.setBrush(new Misc.Brush("red"))
	// sym.setPen(new Misc.Pen("#0000FF", 2))

	// obj.setSymbol(sym);
	// obj.setLegendAttribute(LegendShowSymbol, true);
	// obj.setLegendAttribute(LegendShowLine, true);
	// obj.setPen(new Misc.Pen("black", 1)); //, "dash"));

	//obj.attach(plot);

	//console.log(obj.getZ())


	// var obj1 = new Curve("Hcccccccccccck")
	// 	obj1.setSamples([new Misc.Point(-200, -50), new Misc.Point(-50, 25), new Misc.Point(0, 150)]);
	// obj1.setPen(new Misc.Pen("red"));
	//obj1.attach(plot);
	//obj1.setLegendAttribute(LegendShowLine, true);
	//obj1.setLegendIconSize(new Misc.Size(60, 20));


	// var obj2 = new Curve("HH2")
	// 	obj2.setSamples([new Misc.Point(-100, -150), new Misc.Point(-50, 55), new Misc.Point(80, 100)]);
	// obj2.setPen(new Misc.Pen("green"));
	//obj2.attach(plot);
	//obj2.setLegendAttribute(LegendShowLine, true);
	//obj2.setLegendIconSize(new Misc.Size(60, 20));

	// var sym1 = new Symbol();
	// sym1.setSize(new Misc.Size(10, 10))
	// sym1.setStyle(Cross);
	// sym1.setBrush(new Misc.Brush("green"))
	// sym1.setPen(new Misc.Pen("#0000FF", 2))

	// var obj3 = new Curve()
		//obj3.setTitle("HH2")
		//obj3.setSamples([new Misc.Point(-90, -140), new Misc.Point(-40, 65), new Misc.Point(90, 110)]);
	//obj3.setPen(new Misc.Pen("green", 1, "dashDotDot"));


	//obj3.attach(plot);
	// obj3.setLegendAttribute(LegendShowLine, true);
	// obj3.setLegendIconSize(new Misc.Size(60, 10));
	// obj3.setPen(new Misc.Pen("green", 1, "dashDotDot"));
	// obj3.setTitle("HH2")
	// obj3.setSymbol(sym1);
	// obj3.setLegendAttribute(LegendShowSymbol, true);
	//obj3.attach(null);
	//obj3.attach(plot);

	//console.log(obj3)

	//plot.replot()



	//grid.attach(plot);
	var magnifier = new Magnifier(plot);
	//console.log(mg)
	//mg.setEnabled(false);
	var pan = new Panner(plot)
	pan.setCursor("move");
	pan.setEnabled(false);

	
	var zm = new PlotZoomer(plot);
	//zm.setMaxStackDepth (0)
	//zm.setTrackerMode(Static.AlwaysOn)
	//zm.setRubberBand(Static.VLineRubberBand)
	//zm.setTrackerMode(AlwaysOff)
	//pan.setMouseTracking(false)
	zm.setEnabled(false);

	//var mg1 = new Magnifier(plot1);
	//mg1.setEnabled(false);
	//var pan1 = new Panner(plot1)
	//pan1.setCursor("move");
	//pan1.setEnabled(false);

	//var zm1 = new Zoomer(plot1);
	//zm.setMaxStackDepth (0)
	//zm.setTrackerMode(AlwaysOn)
	//zm.setTrackerMode(AlwaysOff)
	//zm.setTrackerMode(ActiveOnly)
	//pan.setMouseTracking(false)
	//zm1.setEnabled(false);


	//alert(111)////////////////////////////////////


	//plot.insertLegend(new MLegend);//2
	//plot.enableLegend(true);

	//var hobject = new HObject
	/*bind("mySignal", {"num":88}, function(event, param){
	console.log(event.data , param)
	})

	trigger("mySignal", {"number":44})*/

	//plot.setAxisTitleFont(xBottom, new Misc.Font(30, "Arial", "italic"/*, "100", "red"*/))
	plot.setAxisTitle(xBottom, "Bottom scale")
	//plot.setAxisTitleFont(xTop, new Misc.Font(30/*, name, style, weight, color*/))
	plot.setAxisTitle(xTop, "Top scale")
	//plot.setAxisTitleFont(yLeft, new Misc.Font(30/*, name, style, weight, color*/))
	plot.setAxisTitle(yLeft, "Left scale")
	plot.setAxisTitle(yRight, "Right scale")

	//console.log(plot)lgd
	//console.log(lgd)

	//console.log(plot)

	plot.replot();
	plot.setAutoReplot(true)

	//plot.setAxisScale(xBottom, 10, 100)


	var flag = false

		//plot.setFooter("My foot");

	function footerFn(on) {
		if (on) {
			plot.showFooter()
		} else {
			plot.hideFooter()
		}
	}

	function legendFn(on) {
		//if (on) {
			plot.enableLegend(on)
		//} else {
			//lgd.hide()
		//}		
	}

	function titleFn(on) {
		if (on) {
			plot.showTitle()
		} else {
			plot.hideTitle()
		}
	}


	


	/*var bottomScaleFn = function (){
	if(plot.axisEnabled(xBottom)){
	plot.enableAxis(xBottom, false);
	}
	else{
	plot.enableAxis(xBottom, true);
	}
	plot.replot();
	}*/

	$("#test4").click(function () {
		if (plot.isLegendEnabled()) {
			plot.enableLegend(false);
		} else {
			plot.enableLegend(true);
		}
		// plot.replot();
	});

	function leftAxis(on) {
           //console.log(plot.axisWidget(yLeft))
		//plot.axisWidget(yLeft).setVisible(on)
		plot.enableAxis(yLeft, on);
		plot.replot();
	}
	function rightAxis(on) {
		plot.enableAxis(yRight, on);
		plot.replot();
	}
	function bottomAxis(on) {
		plot.enableAxis(xBottom, on);
		plot.replot();
	}
	function topAxis(on) {
		plot.enableAxis(xTop, on);
		plot.replot();
	}

	

	var wo = null;
	$("#test7").click(function () {
		//wo.setVisible();

		//mg.removeEventFilter(wo)
		$(".pick-a-color").pickAColor();

		//console.log($.jPicker)


	});

	function setAutoScale(on){
		plot.setAxisAutoScale(xBottom, true);
		plot.setAxisAutoScale(yLeft, true);
		plot.setAxisAutoScale(xTop, true);
		plot.setAxisAutoScale(yRight, true);
		tbar.setButtonCheck(autoRadio, true)

		/*var intvX = plot.axisInterval(xBottom);
		var margin = intvX.width()*0.05
		plot.axisScaleEngine(xBottom).setMargins(margin, margin)
		console.log(plot.axisScaleEngine(xBottom))*/
	}

	////////////////////////////////////////
	function radioButtonCb() {
		/*pan.setEnabled(false);
			//mg.setEnabled(false)
			zm.setEnabled(false)*/
		var myRadio = $('input[name=optradio]');
		var checkedValue = myRadio.filter(':checked').val();
		//console.log(checkedValue +"AA")

		if (checkedValue == "Zoom") {
			pan.setEnabled(false);
			//mg.setEnabled(false)
			zm.setEnabled(true)
            zm.setZoomBase(zm.scaleRect());
		}
		if (checkedValue == "Pan") {
			pan.setEnabled(true);
			//mg.setEnabled(false)
			zm.setEnabled(false)
		}

		if (checkedValue == "Auto") {
			pan.setEnabled(false);
			//mg.setEnabled(false)
			zm.setEnabled(false)
			/*plot.setAxisAutoScale(xBottom, true);
			plot.setAxisAutoScale(yLeft, true);
			plot.setAxisAutoScale(xTop, true);
			plot.setAxisAutoScale(yRight, true);*/
			setAutoScale(true)
		}
		
	}

	//console.log(mg.trigger)

	//mg.setEnabled(true);
	Static.bind("rescaled", function () {
		//console.log(autoRadio)
		tbar.setButtonCheck(autoRadio, false)
	})

	var tbar = new ToolBar({
			zIndex: 1003
		})

	function getCoffsVal(){
 		var result = []
		var coeffs = FunctionDlg.coeffs || []
  		for(var i=0; i<coeffs.length; ++i){
			result.push(1.0)
            }
		return result
      }

     function addCurveInit(curve){
		curve.coeffs = FunctionDlg.coeffs
		curve.variable = FunctionDlg.variable
		curve.coeffsVal = getCoffsVal()
		curve.fn = FunctionDlg.fn
		curve.unboundedRange = FunctionDlg.unboundedRange
		curve.lowerX = parseFloat(FunctionDlg.lowerLimit), 
		curve.upperX = parseFloat(FunctionDlg.upperLimit),
	    curve.numOfSamples = FunctionDlg.numOfPoints
	    //rv.setCurrentCurve(curve)

	}

	function addCurve(title, samples, upload){

		//var _coeffs = FunctionDlg.coeffs// || []
           //var fn = FunctionDlg.fn
		if (!samples || samples.length==0) {
			return false;
		}
		if (plot.findPlotCurve( title)) {
			Static.alert(title + " already exist")
			return false;
		}

		var curve = new Curve(title)


		if(!upload)
			addCurveInit(curve)
		
		curve.setSamples(samples)
		curve.setPen(new Misc.Pen(colorList[numberOfCurves(plot) % 6]))
		if(Static.showline){
			curve.setLegendAttribute(LegendShowLine, true);                        
                }
		if(Static.showsymbol)
			curve.setLegendAttribute(LegendShowSymbol, true);
		curve.attach(plot)
		//Static.trigger("scaleDivChanged")
		rv.setCurrentCurve(curve)
           sidebar.initSidebar()


		//console.log(curve)
		//initSidebar()
		//initSidebarInput()
		return true;

	}

	//function isNaN(value) {
	    //return Number.isNaN(Number(value));
	//}

	function toArrays(csvContent){
		var arr = csvContent.split('\n')
		var result = []
		for(var i=0; i<arr.length; ++i){
			var pt = arr[i].split(',')			
			if(isNaN(parseFloat(pt))){
				continue
			}
			result.push(pt)
		}
		return result
	}

	var fnListFile = [saveFn, curveSettingsFn, settingsFn, functionFn, calculatorFn, printFn]

	tbar.addToolButton("dropdown", { text: "File",
			//tooltip: "Allow for hiding/showing various components of a plot.",
			cb: function (e, index) {
				//console.log(index, checked)
				fnListFile[index]();
			},
			listElements: [{
					text: "Save",
					tooltip: "Save the current graph."					
				},{
					text: "Curve settings",
					tooltip: "Launches the curve settings dialog."					
				},{
					text: "Plot settings",
					tooltip: "Launches the plot settings dialog."					
				}, {
					text: "Function",
					tooltip: "Launches the function dialog."
				}, {
					text: "Calculator",
					tooltip: "Launches the calculator."
				}, {
					text: "Print",
					tooltip: "Print the current graph."
				}]
		})

	function plt(data){
		var obj = JSON.parse(data.content);

			var p = obj[0]
			if(p.rightScaleEngineType == "[LogScaleEngine]"){
				plot.setAxisScaleEngine(yRight, new LogScaleEngine())
			}
			if(p.leftScaleEngineType == "[LogScaleEngine]"){
				plot.setAxisScaleEngine(yLeft, new LogScaleEngine())
			}
			if(p.bottomScaleEngineType == "[LogScaleEngine]"){
				plot.setAxisScaleEngine(xBottom, new LogScaleEngine())
			}
			if(p.topScaleEngineType == "[LogScaleEngine]"){
				plot.setAxisScaleEngine(xTop, new LogScaleEngine())
			}

			if(p.rightScaleEngineType == "[LinearScaleEngine]"){
				plot.setAxisScaleEngine(yRight, new LinearScaleEngine())
			}
			if(p.leftScaleEngineType == "[LinearScaleEngine]"){
				plot.setAxisScaleEngine(yLeft, new LinearScaleEngine())
			}
			if(p.bottomScaleEngineType == "[LinearScaleEngine]"){
				plot.setAxisScaleEngine(xBottom, new LinearScaleEngine())
			}
			if(p.topScaleEngineType == "[LinearScaleEngine]"){
				plot.setAxisScaleEngine(xTop, new LinearScaleEngine())
			}

			if(!p.autoScale){
				plot.setAxisScale(xBottom, p.xBottomMin, p.xBottomMax)
				plot.setAxisScale(yLeft, p.yLeftMin, p.yLeftMax)
				plot.setAxisScale(xTop, p.xTopMin, p.xTopMax)
				plot.setAxisScale(yRight, p.yRightMin, p.yRightMax)
			}
			else{
				setAutoScale(true)
			}
			//setAutoScale(true)

			plot.setTitleFont(new Misc.Font(p.titleFont))
			plot.setFooterFont(new Misc.Font(p.footerFont))
			plot.setAxisTitleFont(xBottom, new Misc.Font(p.axisTitleFont))
			plot.setAxisTitleFont(xTop, new Misc.Font(p.axisTitleFont))
			plot.setAxisTitleFont(yLeft, new Misc.Font(p.axisTitleFont))
			plot.setAxisTitleFont(yRight, new Misc.Font(p.axisTitleFont))

			plot.setTitle(p.title)
			plot.setFooter(p.footer)
			plot.setAxisTitle(xBottom, p.xBottomAxisTitle)
			plot.setAxisTitle(xTop, p.xTopAxisTitle)
			plot.setAxisTitle(yLeft, p.yLeftAxisTitle)
			plot.setAxisTitle(yRight, p.yRightAxisTitle)

			
			for(var i=1; i<obj.length; ++i){
				if (plot.findPlotCurve( obj[i].title)) {
					Static.alert(obj[i].title + " already exist")
					Upload.reset($("#fileInput"))
					return //false;
				}
			}
			for(var i=1; i<obj.length; ++i){
				var curve = new Curve(obj[i].title)	
				if(obj[i].symbolType !== NoSymbol){
					var sym = new Symbol()
					sym.setStyle(obj[i].symbolType)
					sym.setSize(new Misc.Size(obj[i].symbolWidth, obj[i].symbolWidth))
					sym.setPen(new Misc.Pen(obj[i].symbolPenColor, 
						obj[i].symbolPenWidth))
					sym.setBrush(new Misc.Brush(obj[i].symbolBrushColor))
					curve.setSymbol(sym)
				}			
				if(obj[i].fitType){
					curve.fitType = obj[i].fitType
				}
				curve.setSamples(obj[i].samples)
				if(obj[i].fitType == "natural" || 
               			obj[i].fitType == "periodic"){
    				//curve.setData(CurveFitDlg.curve.data())
					var f = new SplineCurveFitter()
    				var s = f.spline()
					if(obj[i].fitType == "periodic"){
						s.setSplineType(Static.SplineType.Periodic )
					}else{
			    		s.setSplineType(Static.SplineType.Natural )
					}
					curve.setCurveFitter(f)
			    }
				curve.setPen(new Misc.Pen(obj[i].pen.color, obj[i].pen.width, obj[i].pen.style))
				
				curve.setAxes(obj[i].xAxis, obj[i].yAxis)



				curve.attach(plot)
				
			}

			Upload.reset($("#fileInput"))
			
	}

	function uploadFn(data) {
		var extension = data.fileName.split('.')[1]
		//console.log(extension)

		if(extension=='txt'){//csv
			var samples = makePoints(toArrays(data.content));
			addCurve(data.fileName, samples, true)
		}
		
		else if(extension=='plt'){//json
			var list = plot.itemList(Static.Rtti_PlotCurve)
			if(list.length){
				Static.alertYesNo("Do you want to save the changes to the Grapher?", function(answer){
				    if(answer == Static.Cancel){
				    	Upload.reset($("#fileInput"))
				    	return
				    }
				    if(answer == Static.Yes){
				    	saveFn()
				    	Upload.reset($("#fileInput"))
				    	return
				    }
				    if(answer == Static.No){
				    	for(var i=0; i<list.length; ++i){
				    		list[i].detach()
				    	}
				    	//setAutoScale(true)
				    	plt(data)
				    	return
				    }
				})
			}

			else{
				plt(data)
			}			
			
		}
		
	}

	tbar.addToolButton("upload", { //text:"Title",
		//cb:uploadFn,
		innerHtmlId: "fileInput",
		class: "btn btn-primary",
		tooltip: "Upload data files"
	})

	Upload.cb = uploadFn;
	Upload.setInputElement($("#fileInput"))

	
	
	/*tbar.addToolButton("pushbutton", {
		text: "Settings",
		cb: settingsFn,
		class: "btn btn-primary",
		tooltip: "Launches the settings dialog."
	})

	tbar.addToolButton("pushbutton", {
		text: "Print",
		cb: printFn,
		class: "btn btn-primary",
		tooltip: "Print the current graph."
	})*/

	tbar.addToolButton("radio", {
		label: "Zoom",
		tooltip: "Enable zooming. Press the mouse left button and drag.",
		cb: radioButtonCb
	})
	tbar.addToolButton("radio", {
		label: "Pan",
		tooltip: "Allow dragging of all plot items to new positions. Press the mouse left button and drag.",
		cb: radioButtonCb
	})
	var autoRadio = tbar.addToolButton("radio", {
			label: "Auto",
			tooltip: "Determine and and apply the scale that\nallows the extent of all curves to be shown.",
			cb: radioButtonCb
		})

			


		var fnListAxis = [leftAxis, bottomAxis, rightAxis, topAxis,
			majorGridLines, minorGridLines, titleFn, footerFn, legendFn, coeffSidebarFn]

		var viewButton = tbar.addToolButton("dropdown", {
			text: "View",
			tooltip: "Allow for hiding/showing various components of a plot.",
			hasCheckbox: true,
			cb: function (e, index, checked) {
				//console.log(index, checked)
				fnListAxis[index](checked);
			},
			listElements: [{
					text: "Left axis",
					checkboxState: "checked"
				}, {
					text: "Bottom axis",
					checkboxState: "checked"
				}, {
					text: "Right axis"
				}, {
					text: "Top axis"
				}, {
					text: "Major gridlines",
					checkboxState: "checked"
				}, {
					text: "Minor gridlines",
					checkboxState: "checked"
				}, {
					text: "Title",
					checkboxState: "checked"
				}, {
					text: "Footer",
					checkboxState: "checked"
				}, {
					text: "Legend",
					checkboxState: "checked"
				}, {
					text: "Sidebar"					
				}
			]
		})

		tbar.addToolButton("pushbutton", {
			text: "+",
			repeat: true,
			tooltip: "Zoom in.",
			cb: function (e) {				
					var f = magnifier.mouseFactor();
					magnifier.rescale( f );
				
				 }
			})

		tbar.addToolButton("pushbutton", {
			text: "-",
			repeat: true,
			tooltip: "Zoom out",
			cb: function (e) {				
					var f = 1/magnifier.mouseFactor();
					magnifier.rescale( f );
				}
			})

		/*tbar.addToolButton("pushbutton", {
			text: "<",
			repeat: true,
			tooltip: "Pan left",
			cb: function () {
					pan.rescaleAndRedraw(-4, 0)
				 }
			})

		

		tbar.addToolButton("pushbutton", {
			text: "/\\",
			repeat: true,
			tooltip: "Pan up.",
			cb: function (e) {				
					pan.rescaleAndRedraw(0, -4)
				 }
			})

		tbar.addToolButton("pushbutton", {
			text: ">",
			repeat: true,
			tooltip: "Pan right",
			cb: function (e) {				
					pan.rescaleAndRedraw(4, 0)
				}
			})

		

		tbar.addToolButton("pushbutton", {
			text: "\\/",
			repeat: true,
			tooltip: "Pan down",
			cb: function (e) {				
					pan.rescaleAndRedraw(0, 4)
				}
			})*/

		/*tbar.addToolButton("pushbutton", {
			text: "Fun",
			cb: functionFn,
			innerHtmlId: "functionpushbutton",
			class: "btn btn-primary",
			tooltip: "Launches the function dialog."
		})*/		

		/*var coeffId = tbar.addToolButton("pushbutton", {
			text: "Coeff.",
			cb: toggleCoeffFn,
			//innerHtmlId: "functionpushbutton",
			class: "btn btn-primary",
			tooltip: "Toggle coefficient sidebar."
		})*/


		if(plot.title()==""){
			tbar.hideDropdownItem(viewButton, 6)
		}
		Static.bind("titleAdded", function (e, param) {
			//console.log(44, param)
			if (param) {
				tbar.showDropdownItem(viewButton, 6)
			} else {
				tbar.hideDropdownItem(viewButton, 6)
			}
		})

		if(plot.footer()==""){
			tbar.hideDropdownItem(viewButton, 7)
		}
		Static.bind("footerAdded", function (e, param) {
			//console.log(44, param)
			if (param) {
				tbar.showDropdownItem(viewButton, 7)
			} else {
				tbar.hideDropdownItem(viewButton, 7)
			}
		})

	tbar.hideDropdownItem(viewButton, 9)
	Static.bind("itemAttached", function(e, plotItem, on){
	    if(plotItem.rtti == Static.Rtti_PlotCurve){
		     if(on){ //attached
				
					//tbar.show(coeffId)
					tbar.showDropdownItem(viewButton, 9)					
				
			}else{ //detached
				//if(plotItem.title()==sidebar.currentCurveName()){
					/*//Invalidate cache and, thus, force integrate() to re-compute
					Static.total_volume = undefined
					Static.total_area = undefined
					Static.prevStart = undefined
					Static.prevEnd = undefined*/
				//}
				if(!plot.itemList(Static.Rtti_PlotCurve).length){
		    			//tbar.hide(coeffId)
		    			tbar.hideDropdownItem(viewButton, 9)
		    			tbar.setDropdownItemCheck(viewButton, 9, false)
						sidebar.showSidebar(false)
						//sideBarVisible = false 						   

				}				
			}
	      	sidebar.initSidebar()
	    }
	})

	Static.bind("visibilityChange", function(e, plotItem, on){
		if(plotItem.rtti == Static.Rtti_PlotCurve){
			sidebar.initSidebar()
		}	

	})

	function coeffSidebarFn(on) {
		if(plot.itemList(Static.Rtti_PlotCurve).length){
	    	sidebar.showSidebar(on)
	    }	      
	}



		tbar.setButtonCheck(autoRadio, true)

		
///////////////////////////////////////////////////////////////////////////////////////////////////////

Static.bind("axisChanged", function(e, axis){
	if(axis == xBottom || axis == xTop){
		rv.setRulersXAxis(axis)
	}
	if(axis == yLeft || axis == yRight){
		rv.setRulersXAxis(axis)
	}
	
})


var detachCb = function(curve){
                               if($("#fileInput").val().includes(curve.title()))
			       Upload.reset($("#fileInput"))
			}

LegendMenu.plot = plot
LegendMenu.detachReset = detachCb
LegendMenu.curveFitCb = CurveFitDlg.curveFitCb
LegendMenu.curveFitInfoCb = CurveFitDlg.curveFitInfoCb
LegendMenu.axisCb = AxisDlg.axisCb

LegendMenu.initialize()//plot, detachCb, curveFitCb)
	        
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function makePoints(arrayOfTwoMemberArrays) {
		//console.log(arr)
		var res = [];
		/*for (var i = 0; i < arr.length; ++i) {
			res.push(new Misc.Point(parseFloat(arr[i][0]), parseFloat(arr[i][1])))
		}*/
		arrayOfTwoMemberArrays.forEach(function(arrayOfTwoMembers){
			res.push(new Misc.Point(parseFloat(arrayOfTwoMembers[0]), 
				parseFloat(arrayOfTwoMembers[1])))
		})
		return res;
	}      

	function numberOfCurves(plot) {
		return plot.itemList(Static.Rtti_PlotCurve).length;
	}

	function degreeToRad(deg) {
		return deg * Math.PI / 180;
	}

	

	
function saveData(data, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    //return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    //};
}

//var mdata = { x: 42, s: "hello, world", d: new Date() }
//    fileName = "my-download.json";
function getPlotData(){////m_plot.setAxisScaleEngine(yLeft, new LinearScaleEngine())
	var data = []
	var p = {}
	p.bottomScaleEngineType = plot.axisScaleEngine(xBottom).toString()
	p.leftScaleEngineType = plot.axisScaleEngine(yLeft).toString()
	p.topScaleEngineType = plot.axisScaleEngine(xTop).toString()
	p.rightScaleEngineType = plot.axisScaleEngine(yRight).toString()
	p.title = plot.title()
	p.titleFont = plot.titleFont()
	p.footer = plot.footer()
	p.footerFont = plot.footerFont()

	p.axisTitleFont = plot.axisTitleFont(xBottom)
	p.xBottomAxisTitle = plot.axisTitle(xBottom)
	p.xTopAxisTitle = plot.axisTitle(xTop)
	p.yLeftAxisTitle = plot.axisTitle(yLeft)
	p.yRightAxisTitle = plot.axisTitle(yRight)

	p.autoScale = plot.axisAutoScale(xBottom)
	if(!p.autoScale){
		p.xBottomMin = plot.axisInterval(xBottom).minValue()
		p.xBottomMax = plot.axisInterval(xBottom).maxValue()
		p.yLeftMin = plot.axisInterval(yLeft).minValue()
		p.yLeftMax = plot.axisInterval(yLeft).maxValue()
		p.xTopMin = plot.axisInterval(xTop).minValue()
		p.xTopMax = plot.axisInterval(xTop).maxValue()
		p.yRightMin = plot.axisInterval(yRight).minValue()
		p.yRightMax = plot.axisInterval(yRight).maxValue()
	}

	data.push(p)
	var list = plot.itemList(Static.Rtti_PlotCurve)
	for(var i=0; i<list.length; ++i){
		var d = {}
		d.title = list[i].title()
		d.samples = list[i].data().samples()
		d.fn = list[i].fn
		d.pen = list[i].pen()		
		d.fitType = list[i].fitType
		var sym = list[i].symbol()
		if(sym){
			d.symbolType = sym.style()
			d.symbolWidth = sym.size().width			
			d.symbolPenColor = sym.pen().color
			d.symbolPenWidth = sym.pen().width
			d.symbolBrushColor = sym.brush().color
		}
		d.xAxis = list[i].xAxis()
		d.yAxis = list[i].yAxis()

		
		data.push(d)
	}
	return data
}



    function saveFn() {	
    		/*var list = plot.itemList(Static.Rtti_PlotCurve)	
			for (var i = 0; i < list.length; ++i) {
				if (list[i].title() === title)
					return list[i];
			} */     

			Static.prompt("Enter a filename without extensions",
				"plot_1", function(filename){
				filename += '.plt'				
				//console.log(filename)
				//var textFile = new Blob(['Hello Sir'],{type: 'text/plain'})
				
				var data = getPlotData()
				//console.log(data)
				saveData(data, filename);

				return true
				
			}, "small")	
	}

	var w;
	function calculatorFn (){
		//var myWindow = window.open("", "", "width=600,height=100");
		//window.open("https://www.tcsion.com/OnlineAssessment/ScientificCalculator/Calculator.html#nogo");
		//var w;     
		

		if (!w || w.closed) {
		    w = window.open("https://www.tcsion.com/OnlineAssessment/ScientificCalculator/Calculator.html#nogo","_blank","width=500,height=400, top=200, left=200");
		  } else {
		    ;//console.log('window is already opened');
		  }
		  w.focus();
	}

	function printFn() {
		//console.log($("#centralDiv")[0].children)
		window.print()								
	}

	
	CurveSettings.init(plot, CurveFitDlg.curveFitCb, CurveFitDlg.curveFitInfoCb)
	function curveSettingsFn() {
		//FunctionDlg.functionDlg()
		if(plot.itemList(Static.Rtti_PlotCurve).length)
            CurveSettings.curveSettingsDlg()
        else
        	Static.alert("No curves found", "small") 

	}


	function settingsFn() {
		Settings.settingsDlg()
	}

	//console.log(Settings)
	Settings.setPlot(plot)

	//plot.setFooter("AaaaA")

	function validateTitle(str){ 
           if(!str) return str
		var s = str.trim()       
        return s.length > 0 ? s : null
	}

	function validateFunction(str){ 
           if(!str) return str
		var s = str.trim()       
        return s.length > 0 ? s : null
	}

	///////FunctionData - subclass of SyntheticPointData/////start
    FunctionData.inheritsFrom( SyntheticPointData );
    //Define the FunctionData constructor
    function FunctionData(yCb, numOfPoints) {
        // Call the parent constructor, making sure (using Function#call)
        // that "this" is set correctly during the call
        SyntheticPointData.call(this, numOfPoints );
        var d_y = yCb
        var parser = new EvaluateExp(d_y)

        this.setFn = function(fn){
        	d_y = fn
        	parser.setExpString(d_y)
        }
                
        this.y = function( _x ){
        	if(parser.error)
        		return 0
        	return parser.eval({x: _x});
       }
   }
    
    ///////////////////////////////////

        //plot.setAxisScale( xBottom, 0.0, 10.0 );

        //plot.setAxisScale( yLeft, -1.0, 1.0 );

	function addUnboundedCurve(title, fn, numOfPoints){
		if (plot.findPlotCurve( title)) {
			Static.alert(title + " already exist")
			return false;
		}
		plot.setAxisScale( xBottom, 1.0, 10.0 );
        plot.setAxisScale( yLeft, 1.0, 10.0 );
		var curve = new Curve(title)
           addCurveInit(curve)
		curve.setData(new FunctionData( fn,  numOfPoints))
		curve.setPen(new Misc.Pen(colorList[numberOfCurves(plot) % 6]))
		if(Static.showline){
			curve.setLegendAttribute(LegendShowLine, true);                        
                }
		if(Static.showsymbol)
			curve.setLegendAttribute(LegendShowSymbol, true);
		//console.log(r)
		curve.attach(plot)

		setAutoScale(true)
        
		return true;
	}

function functionCb(){
	var title = FunctionDlg.title
	var fn = FunctionDlg.fn
	var lowerLimit = FunctionDlg.lowerLimit
	var upperLimit = FunctionDlg.upperLimit
	var numOfPoints = FunctionDlg.numOfPoints
	//var unboundedRange = FunctionDlg.unboundedRange

	var coeffs = FunctionDlg.coeffs

    if(FunctionDlg.coeffs.length){		
		//var coeffsVal = FunctionDlg.geCoeffsVal()
		//console.log(coeffs)
		//console.log(coeffsVal)

		for(var i=0; i<coeffs.length; ++i){
			while (fn.indexOf(coeffs[i]) != -1){
        		fn = fn.replace(coeffs[i], 1)
        	}
		}

		//console.log(fn)
		//return
	}

	if(FunctionDlg.unboundedRange){
		if(addUnboundedCurve(title, fn, numOfPoints)){
			FunctionDlg.close()
		}		
	}else if(addCurve(title, makeSamples({fx:fn, 
		lowerX:parseFloat(FunctionDlg.lowerLimit), 
		upperX:parseFloat(FunctionDlg.upperLimit),
	    numOfSamples: FunctionDlg.numOfPoints}))){
		FunctionDlg.close()	
	}
}
FunctionDlg.init(functionCb)
  
	function functionFn() {		
		FunctionDlg.functionDlg()
           
	}

	/*function functionHelp() {		
		console.log("Help file")           
	}*/
/////////////SideBar/////////////
var sidebar =  new SideBar(plot, tbar, makeSamples)

/*[{
					text: "Curve name",
					checkboxState: "checked"
				}, {
					text: "Left ruler position",
					checkboxState: "checked"
				}, {
					text: "Bottom ruler position"
				}, {
					text: "Right ruler position",
					checkboxState: "checked"
				}, {
					text: "Top ruler position"
				}, {
					text: "Slope at left ruler"
				}, {
					text: "Area below curve"
				}, {
					text: "Volume of revolution(X)"
				}
			]*/



/////////////////////////////////////////////////////////////


///////////////////////////////////

/*function EvaluateExp(expStr){
	var m_expStr = expStr;
	var f ;
    var simplified;
    this.error = false

	function init(){
		try {
			f = math.parse(m_expStr);
    		simplified = math.simplify(f);
    	}
    	catch(err) {
		    Static.alert(err.message);
		    this.error = true
		}
	}

	if(m_expStr !== undefined){
		init()
	}

	this.setExpString = function(s){
		m_expStr = s
		init()
	}

	this.getExpString = function(){
		return m_expStr
	}

	this.eval = function(obj){
		this.error = false
		try {
			return simplified.eval(obj)
		}		
		catch(err) {
			//console.log(55)
		    //Static.alert(err.message);
		    this.errorMessage = err.message
		    this.error = true
		    return 0;
		}
		
	}

}*/


/*Static.bind("scaleDivChanged", function(){
	var intvX = plot.axisInterval(xBottom);
	var margin = intvX.width()*0.01
	plot.axisScaleEngine(xBottom).setMargins(margin, margin)
	console.log(77)

})*/

/*
function isAnyRulerVisible(){
	for(var i=0; i<4; ++i){
		if(rv._rulerList[i].isVisible()){
			return true
		}
	}
	return false
}

function isAnyRulerUnlocked(){
	for(var i=0; i<4; ++i){
		if(!rv._rulerList[i].lock()){
			return true
		}
	}
	return false
}

function isAnyRulerLocked(){
	for(var i=0; i<4; ++i){
		if(rv._rulerList[i].lock()){
			return true
		}
	}
	return false
}

function updateOnAllRulersHidden(){
	el.contextMenu('update',[{name: 'Hide rulers',
							disable: true}])
	el.contextMenu('update',[{name: 'Show rulers',
			disable: false}])
	el.contextMenu('update',[{name: 'Unlock rulers',
			disable: true}])
}
*/


var el = plot.getLayout().getCentralDiv()
var menu =[{name: 'Hide rulers',
		title: 'Hide all rulers',
		fun: function(){
			    rv._rulerList.forEach(function(ruler){
			    	ruler.setVisible(false)
			    })
				//updateOnAllRulersHidden()
           	}
		},
		{name: 'Show rulers',
		title: 'Show any hidden rulers',
		//disable: true,
		fun: function(){
			    rv._rulerList.forEach(function(ruler){
			    	ruler.setVisible(true)
			    })
			    /*el.contextMenu('update',[{name: 'Show rulers',
							disable: true}])
			    el.contextMenu('update',[{name: 'Hide rulers',
							disable: false}])*/
				
      			//rv.currentRuler._picker.clearDragCursor()
           	}
		},
		{name: 'Unlock rulers',
		title: 'Unlock any locked rulers',
		//disable: true,
		fun: function(){
			    rv.unlockAllRulers()
				// el.contextMenu('update',[{name: 'Unlock rulers',
				// 			disable: true}])
      			//rv.currentRuler._picker.clearDragCursor()
           	}
		},
		{name: 'Remove all curves',
		title: 'Permanently remove all curves',
		fun: function(){
				console.log('Permanently remove all curves')
           	}
		}] 

Static.bind("rulerDeselected", function(){
	// console.log(44)
el.contextMenu(menu, {
                triggerOn: 'contextmenu',
                zIndex: 1
              });
})

Static.trigger("rulerDeselected")

//console.log(menu1)

//////////////////////////////////
//var rv = new Rulers(plot)//, "myVRuler")
//console.log(rv)
//rv.setVisible(false)
//rv.setPosition(20)

/*var rh = new RulerH(plot, "myHRuler")
console.log(rh)
rh.setPosition(10)
rh.setLinePen(new Misc.Pen("red"));
rh.setTrackingTextColor("red")*/



var rv = new Rulers(plot)
//rv.setEnabled(true)
sidebar.setRulers(rv)
//console.log(margin)

var menu1 = [{
    name: 'hide...',
    title: 'hide the ruler.',
    fun: function () {            
      rv.currentRuler.setVisible(false)
      rv.currentRuler._picker.clearDragCursor()
      /*el.contextMenu('update',[{name: 'Show rulers',
							disable: false}])
      if(!isAnyRulerVisible()){
      	updateOnAllRulersHidden()
      }*/
      
    }
  },{
    name: 'lock...',
    title: 'lock the ruler in its current position.',
    fun: function () {            
      rv.currentRuler.setLock(true)
      //rv.currentRuler._picker.clearDragCursor()
      /*if(!isAnyRulerUnlocked()){//all rulers locked
      	el.contextMenu('update',[{name: 'lock',
							disable: false}])
      }
      el.contextMenu('update',[{name: 'Unlock rulers',
							disable: false}])*/
    }
  },
   {
    name: 'lock at...',
    title: 'lock the ruler at a specific position.',
    fun: function () {
      var currentRulerPosition = 0;
      if(rv.currentRuler instanceof RulerH){
      	  currentRulerPosition = rv.currentRuler.yValue()
      }else{
      	  currentRulerPosition = rv.currentRuler.xValue()
      }  

      Static.prompt("Enter a position",
				currentRulerPosition, function(val){				
				rv.currentRuler.setLockAt(parseFloat(val))
				return true
				
			}, "small")	           
      
    }
  }]
rv.setMenu(menu1)

/////////////////////////////////



var watchElements = []

function addwatch(watch, options, disabled){
	rv.addToWatchList(watch)
	watchElements.push(options)
	if(disabled){
		watch.setEnable(false)
	}
}


addwatch(new WatchCurveName(), 
	{text: "Curve name",	checkboxState: "checked"})
addwatch(new WatchLeftRulerPosition(rv), 
	 {text: "Left ruler position", checkboxState: "checked"})
addwatch(new WatchRightRulerPosition(rv), 
	 {text: "Right ruler position", checkboxState: "checked"})
addwatch(new WatchBottomRulerPosition(rv), {text: "Bottom ruler position"}, true)
addwatch(new WatchTopRulerPosition(rv), {text: "Top ruler position"}, true)
addwatch(new WatchSlope(), {text: "Slope at left ruler"}, true)
addwatch(new WatchAreaBelowCurve(), {text: "Area below curve"}, true)
addwatch(new WatchVolumeOfRevolution(), {text: "Volume of revolution(X)"}, true)


Static.bind("curveAdjusted", function(){
	rv.updateWatchesAndTable()
})


tbar.addToolButton("dropdown", {
			text: "Watch",
			tooltip: "Enable/disable watches.",
			hasCheckbox: true,
			cb: function (e, index, checked) {
				//updateWatchesAndTable()
				//console.log(index, checked)
				//fnListAxis[index](checked);
				rv.watch(index).setEnable(checked)
				rv.updateWatchesAndTable()
			},
			listElements: watchElements
		})


//We add the help button last. This way it is always to the right
tbar.addToolButton("link", {
			text: "Help",
			cb: function(){
				//console.log("Callback called")
			},
			//href: 'C:\\Users\\anthony\\Documents\\helpFiles\\_tmphhp\\grapher.chm',
			href: 'help.html',
			target: '_blank',
			//innerHtmlId: "functionpushbutton",
			class: "noSelect",
			tooltip: "Launches online help."
		})





/*//console.log()
//plot.axisWidget(yLeft).labelFont().th = 20
/*
var rulerLeft = -10
var rulerRight = 10
var fn = "1x^2"
var value = math.eval('integrate('+fn+', x,'+rulerLeft+','+rulerRight+')')
console.log(value)

//var rulerLeft1 = -10
//var rulerRight1 = 10
var fn1 = "0.5x^2"
var value1 = math.eval('integrate('+fn1+', x,'+rulerLeft+','+rulerRight+')')
console.log(value1)*/


})
;
//var $ = null
define('app/main',['require','static','miscObjects','jPainter','jQwtPlot','scaleDiv','interval','scaleMap','hObject','jObject','jWidget','scaleWidget','plotItem','transform','layout','abstractScaleDraw','scaleDraw','scaleEngine','pointMapper','seriesData','./examples/qwtTest'],function (require) {
    //app-specific modules should be placed in the app folder
    //and loaded by a relative require call.
    //e.g If you have a app-specifc module myApp.js, place it in
    //the app folder and load it as:   require('./myApp');
    //If you have a myAppDir folder in the app folder and a app-specifc module, myApp.js, 
    //in the myAppDir, load it as:   require('./myAppDir/myApp');
        
    
    // Load essential modules
    require('static');
    require('miscObjects'); 
    require('jPainter'); 
    require('jQwtPlot'); 
    require('scaleDiv'); 
    require('interval'); 
    require('scaleMap');         
    require('hObject');
    require('jObject'); 
    //require('widget'); 
    require('jWidget'); 
    require('scaleWidget'); 
    require('plotItem'); 
    require('transform'); 
    require('layout'); 
    require('abstractScaleDraw'); 
    require('scaleDraw'); 
    require('scaleEngine');
    require('pointMapper');
    require('seriesData');



    //require('./examples/spectrocurve');  
    //require('./examples/scatterplot');
    //require('./examples/simplePlot');
    //require('./examples/simplePlot1');
    //require('./examples/sinusplot');  
    require('./examples/qwtTest');
    //require('./examples/qwtCoreTest');
    //require('./examples/qwtCoreTest2');
    //require('./examples/test');
    //require('./examples/test1');
    //console.log(455)
    
    
    
    
});



// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',
        //backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.0/backbone-min',
        //underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        bootstrap:  "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min"  
    },
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        /*'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },*/
        'bootstrap' : { 
            deps :['jquery'] 
        },
        
        /*'underscore': {
            exports: '_'
        },*/ 

        'static' : { 
            deps :['miscObjects'] 
        },

	'plotItem':{
	    deps :['static'] 
        },

        'ruler':{
        deps :['static', 'jQwtPlotMarker'] 
        },

        'rulerVandH':{
        deps :['static', 'jQwtPlotMarker'] 
        },

        'mpicker':{
        deps :['static', 'qwtplotpicker'] 
        },

        'rulers':{
        deps :['static', 'mpicker', 'ruler'] 
        },
        
        'scaleMap' : { 
            deps :['static', 'transform'] 
        },

        'jQwtCanvas' : { 
            deps :['static'] 
        },

        'jQwtCurveFitter' : { 
            deps :['static'] 
        },

        'jQwtSpline' : { 
            deps :['static'] 
        },

        'jQwtSymbol' : { 
            deps :['static', 'jGraphic'] 
        },        

        'seriesData' : { 
            deps :['static', 'plotItem'] 
        },

	'pointMapper' : { 
            deps :['static'] 
        },
	

        'jQwtPointData' : { 
            deps :['static', 'seriesData'] 
        },	
        

	'scaleEngine' : { 
            deps :['static'] 
        },

	'scaleDraw' : { 
            deps :['static'] 
        },

        'widget' : { 
            deps :['static', 'hObject'] 
        },
        
        'widgetOverlay' : { 
            deps :['static', 'widget'] 
        },        

        'scaleWidget' : { 
            deps :['static', 'widget'] 
        },

        /*'picker' : { 
            deps :['static'] 
        },
        'plotPicker' : { 
            deps :['static', 'picker'] 
        },*/

        'qwtpicker' : {
            deps :['static', 'widgetOverlay', 'qwtpickermachine']
        },

        'qwtplotpicker' : { 
            deps :['static', 'qwtpicker'] 
        },
        'qwtplotzoomer' : { 
            deps :['qwtplotpicker'] 
        },
                                
        'jQwtPlotGrid' : { 
            deps :['static', 'plotItem'] 
        },        
        'jQwtPlotZoneItem' : { 
            deps :['static'] 
        },

        /*'jQwtZoomer' : { 
            deps :['static', 'plotPicker'] 
        },*/

        'jQwtPlotSpectroCurve' : { 
            deps :['static', 'jQwtColorMap', 'plotItem'] 
        },

        'jQwtColorMap' : { 
            deps :['static'] 
        },

        'qwtplotcurve' : { 
            deps :['static', 'seriesData'] 
        },

        'jQwtPlot' : { 
            deps :['static', 'widget', 'scaleWidget'] 
        },

        'jQwtPanner' : { 
            deps :['static'] 
        },
        'jQwtMagnifier' : { 
            deps :['static'] 
        },
        'jQwtPlotShapeItem' : { 
            deps :['static'] 
        },
        'jQwtPlotMarker' : { 
            deps :['static', 'plotItem'] 
        },
        
        'jQwtLegend' : { 
            deps :['static'] 
        },
        
        'legendMenu' : { 
            deps :['static', 'contextMenu'] 
        },

        'qwtpickermachine' : {
            deps :['static', 'qwteventpattern']
        },

        'jWidget' : {
            deps :['static', 'jObject']
        },

        'basicWatch' : {
            deps :['static', 'watch']
        }
        
        
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);

define("app", function(){});

