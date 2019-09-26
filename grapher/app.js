var MoveToElement=0;var LineToElement=1;var CurveToElement=2;var CurveToDataElement=3;var Misc={}
Misc.Pen=function(c,w,s){if(typeof c==='object'){return new Misc.Pen(c.color,c.width,c.style)}
this.color='black';this.width=1.0;this.style='solid';this.toString=function(){return'[color:'+this.color+', width:'+this.width+', style:'+this.style+']';}
if(typeof(s)!=="undefined")
this.style=s;if(typeof(w)!=="undefined")
this.width=w;if(typeof(c)!=="undefined")
this.color=c;this.isEqual=function(otherPen){if(this.color==otherPen.color&&this.style==otherPen.style&&this.width==otherPen.width)return true
return false}}
Misc.Brush=function(type){this.color=Static.NoBrush;if(typeof(type)!=="undefined"&&typeof(type)=="string")
this.color=type;this.toString=function(){return'[Brush: '+this.color+']'}
this.isEqual=function(otherBrush){if(this.color==otherBrush.color)return true
return false}}
Misc.Line=function(point1,point2){var m_p1=point1;var m_p2=point2
this.p1=function(){return m_p1}
this.p2=function(){return m_p2}
this.x1=function(){return m_p1.x}
this.x2=function(){return m_p2.x}
this.y1=function(){return m_p1.y}
this.y2=function(){return m_p2.y}
this.length=function(){return Math.sqrt((m_p2.x-m_p1.x)^2+(m_p2.y-m_p1.y)^2)}
this.x2=function(){return m_p2.x}}
Misc.Size=function(w,h){if(w instanceof Misc.Size){h=w.height;w=w.width;}
this.width=0.0;this.height=0.0;if(typeof(h)!=="undefined"){this.width=w;this.height=h;}
this.isValid=function(){if(this.width<0||this.height<0)
return false;return true;}
this.isEqual=function(size){if((this.width==size.width)&&(this.height==size.height))
return true;return false;}
this.expandedTo=function(otherSize){return new Misc.Size(Math.max(this.width,otherSize.width),Math.max(this.height,otherSize.height))}
this.toString=function(){return'['+this.width+', '+this.height+']'}}
Misc.Point=function(x,y){this.x=0.0;this.y=0.0;if(typeof(y)!=="undefined"){this.y=y;}
if(typeof(x)!=="undefined"){this.x=x;}
this.toString=function(){return'('+this.x+', '+this.y+')'}
this.isEqual=function(pt){return(this.x===pt.x&&this.y===pt.y)}}
Misc.Rect=function(param1,param2,param3,param4){var m_left=0.0;var m_top=0.0;var m_right=-1.0;var m_bottom=-1.0;var m_width=-1.0;var m_height=-1;if(typeof(param4)!=="undefined"){m_left=param1;m_top=param2;m_width=param3;m_height=param4;m_right=m_left+m_width;m_bottom=m_top+m_height;}
else if(typeof(param3)!=="undefined"){m_left=param1.x;m_top=param1.y;m_width=param2;m_height=param3;m_right=m_left+m_width;m_bottom=m_top+m_height;}
else if(typeof(param2)!=="undefined"){m_left=param1.x;m_top=param1.y;if(typeof(param2.x)!=="undefined"){m_right=param2.x;m_bottom=param2.y;m_width=m_right-m_left;m_height=m_bottom-m_top;}
else{m_width=param2.width;m_height=param2.height;m_right=m_left+m_width;m_bottom=m_top+m_height;}}
this.size=function(){return new Misc.Size(this.width(),this.height());}
this.setSize=function(sz){this.setWidth(sz.width)
this.setHeight(sz.height)}
this.setRect=function(x,y,width,height){m_left=x;m_top=y;m_width=width;m_height=height;m_right=m_left+m_width;m_bottom=m_top+m_height;}
this.left=function(){return m_left;}
this.setLeft=function(val){if(m_left===val)
return;m_left=val
m_width=m_right-m_left;}
this.top=function(){return m_top;}
this.setTop=function(val){if(m_top===val)
return;m_top=val
m_height=m_bottom-m_top;}
this.right=function(){return m_right;}
this.setRight=function(val){if(m_right===val)
return;m_right=val
m_width=m_right-m_left;}
this.bottom=function(){return m_bottom;}
this.setBottom=function(val){if(m_bottom===val)
return;m_bottom=val
m_height=m_bottom-m_top;}
this.width=function(){return m_width;}
this.setWidth=function(val){if(m_width===val)
return;m_width=val;m_right=m_left+m_width;}
this.height=function(){return m_height;}
this.setHeight=function(val){if(m_height===val)
return;m_height=val
m_bottom=m_top+m_height}
this.united=function(rect){return new Misc.Rect(Math.min(m_left,rect.left()),Math.min(m_top,rect.top()),Math.max(m_right,rect.right())-Math.min(m_left,rect.left()),Math.max(m_bottom,rect.bottom())-Math.min(m_top,rect.top()))}
this.normalized=function(){var rc=new Misc.Rect(m_left,m_top,m_width,m_height);if(rc.width()<0){var temp=rc.right();rc.setRight(rc.left());rc.setLeft(temp);}
if(m_height<0){var temp=rc.bottom();rc.setBottom(rc.top());rc.setTop(temp);}
return rc;}
this.center=function(){return new Misc.Point(0.5*(m_left+m_right),0.5*(m_top+m_bottom));}
this.moveTopLeft=function(pt){m_left=pt.x;m_top=pt.y;m_right=pt.x+m_width;m_bottom=pt.y+m_height;}
this.moveBottomRight=function(pt){m_right=pt.x;m_bottom=pt.y;m_left=pt.x-m_width
m_top=pt.y-m_height;}
this.moveCenter=function(pt){m_right=pt.x+0.5*m_width;m_bottom=pt.y+0.5*m_height;m_left=pt.x-0.5*m_width;m_top=pt.y-0.5*m_height;}
this.intersects=function(rect){var xmin=Math.max(this.left(),rect.left());var xmax1=this.left()+this.width();var xmax2=rect.left()+rect.width();var xmax=Math.min(xmax1,xmax2);if(xmax>xmin){var ymin=Math.max(this.top(),rect.top());var ymax1=this.top()+this.height();var ymax2=rect.top()+rect.height();var ymax=Math.min(ymax1,ymax2);if(ymax>ymin){return true;}}
return false;}
this.adjusted=function(left,top,right,bottom){var pt1=new Misc.Point(m_left+left,m_top+top);var pt2=new Misc.Point(m_right+right,m_bottom+bottom);return new Misc.Rect(pt1,pt2);}
this.contains=function(pt,proper){if(typeof(proper)==="undefined"||proper===true)
return pt.x>this.left()&&pt.y>this.top()&&pt.x<this.right()&&pt.y<this.bottom();else
return pt.x>=this.left()&&pt.y>=this.top()&&pt.x<=this.right()&&pt.y<=this.bottom();}
this.isEqual=function(other){return this.left()==other.left()&&this.right()==other.right()&&this.top()==other.top()&&this.bottom()==other.bottom();}
this.leftTop=function(){return new Misc.Point(m_left,m_top);}
this.topLeft=function(){return this.leftTop();}
this.rightTop=function(){return new Misc.Point(m_right,m_top);}
this.leftBottom=function(){return new Misc.Point(m_left,m_bottom);}
this.rightBottom=function(){return new Misc.Point(m_right,m_bottom);}
this.bottomRight=function(){return this.rightBottom();}
this.toString=function(){return'['+m_left+', '+m_top+', '+m_width+', '+m_height+']'}}
Misc.Font=function(th,name,style,weight,color){if(typeof(th)=='object'){this.th=th.th;this.name=th.name
this.style=th.style;this.weight=th.weight;this.fontColor=th.fontColor;}else{this.th=12;this.name="Arial";this.style="normal";this.weight="normal";this.fontColor="black";}
if(typeof(th)!='object'){if(typeof(color)!=="undefined")
this.fontColor=color;if(typeof(weight)!=="undefined")
this.weight=weight;if(typeof(style)!=="undefined")
this.style=style;if(typeof(name)!=="undefined")
this.name=name;if(typeof(th)!=="undefined")
this.th=th;}
this.textSize=function(str){if(str==""||typeof(str)=="undefined")
return new Misc.Size(0,0);var canvas=$('<canvas />')
var context=canvas[0].getContext("2d");context.font=this.weight+" "+this.style+" "+this.th+"px "+this.name;var w=context.measureText(str).width*1.16;var h=context.measureText("M").width;canvas.remove()
return new Misc.Size(w,h);}
this.toString=function(){return'[th:'+this.th+', name:'+this.name+', style:'+this.style+', weight:'+this.weight+', color:'+this.fontColor+']';}}
Misc.MPath=function(){var MPathElement=function(elementType,xVal,yVal){this.type=MoveToElement;this.x=0.0;this.y=0.0;if(typeof(xVal)!=="undefined")
this.x=xVal;if(typeof(yVal)!=="undefined")
this.y=yVal;if(typeof(elementType)!=="undefined")
this.type=elementType;this.toString=function(){return'[MPathElement: type('+this.type+'), point'+new Misc.Point(this.x,this.y)+']';}}
var m_elements=[];this.data={};this.elementCount=function(){return m_elements.length;}
this.elementAt=function(index){if(index<0||index>=m_elements.length)
return null;return m_elements[index];}
this.moveTo=function(x,y){m_elements.push(new MPathElement(MoveToElement,x,y))}
this.lineTo=function(x,y){m_elements.push(new MPathElement(LineToElement,x,y))}
this.cubicTo=function(x,y,x1,y1,x2,y2){m_elements.push(new MPathElement(CurveToElement,x,y))
m_elements.push(new MPathElement(CurveToElement,x1,y1))
m_elements.push(new MPathElement(CurveToElement,x2,y2))}
this.toString=function(){var s='[MPath: elementCount = '+m_elements.length+']';return s;}
this.isEmpty=function(){return m_elements.length==0?true:false;}
this.addRect=function(rect){m_elements.push(new MPathElement(MoveToElement,rect.left(),rect.top()));m_elements.push(new MPathElement(LineToElement,rect.right(),rect.top()));m_elements.push(new MPathElement(LineToElement,rect.right(),rect.bottom()));m_elements.push(new MPathElement(LineToElement,rect.left(),rect.bottom()));m_elements.push(new MPathElement(LineToElement,rect.left(),rect.top()));}
this.addPolygon=function(polygon){m_elements.push(new MPathElement(MoveToElement,polygon[0].x,polygon[0].y));for(var i=1;i<polygon.length;++i){m_elements.push(new MPathElement(LineToElement,polygon[i].x,polygon[i].y));}}
this.boundingRect=function(){var pts=[];var left=0;var top=0;var right=0;var bottom=0;var firstPass=false;for(var i=0;i<m_elements.length;i++)
{var element=m_elements[i];switch(element.type)
{case LineToElement:case MoveToElement:case CurveToElement:{if(!firstPass){left=element.x;top=element.y;right=element.x;bottom=element.y;firstPass=true;}
left=Math.min(left,element.x);right=Math.max(right,element.x);top=Math.min(top,element.y);bottom=Math.max(bottom,element.y);break;}
case CurveToDataElement:{break;}}}
return new Misc.Rect(left,top,right-left,bottom-top);}};define("miscObjects",function(){});(function _umd(global,factory){var returned;if(typeof define==='function'&&define.amd){returned=define('regression',factory);}else if(typeof module!=='undefined'){returned=module.exports=factory();}else{returned=global.regression=factory();}
return returned;})(this,function _regressionUmdFactory(){'use strict';var exports;function determinationCoefficient(observations,predictions){var sum=observations.reduce(function(accum,observation){return accum+observation[1];},0);var mean=sum/observations.length;var ssyy=observations.reduce(function(accum,observation){var diff=observation[1]-mean;return accum+diff*diff;},0);var sse=observations.reduce(function(accum,observation,ix){var prediction=predictions[ix];var resid=observation[1]-prediction[1];return accum+resid*resid;},0);return 1-(sse/ssyy);}
function gaussianElimination(matrix,order){var i=0;var j=0;var k=0;var maxrow=0;var tmp=0;var n=matrix.length-1;var coefficients=new Array(order);for(i=0;i<n;i++){maxrow=i;for(j=i+1;j<n;j++){if(Math.abs(matrix[i][j])>Math.abs(matrix[i][maxrow])){maxrow=j;}}
for(k=i;k<n+1;k++){tmp=matrix[k][i];matrix[k][i]=matrix[k][maxrow];matrix[k][maxrow]=tmp;}
for(j=i+1;j<n;j++){for(k=n;k>=i;k--){matrix[k][j]-=matrix[k][i]*matrix[i][j]/matrix[i][i];}}}
for(j=n-1;j>=0;j--){tmp=0;for(k=j+1;k<n;k++){tmp+=matrix[k][j]*coefficients[k];}
coefficients[j]=(matrix[n][j]-tmp)/matrix[j][j];}
return coefficients;}
var _DEFAULT_PRECISION=2;function _round(number,precision){var factor=Math.pow(10,precision);return Math.round(number*factor)/factor;}
var methods={linear:function(data,_order,options){var sum=[0,0,0,0,0];var results;var gradient;var intercept;var len=data.length;for(var n=0;n<len;n++){if(data[n][1]!==null){sum[0]+=data[n][0];sum[1]+=data[n][1];sum[2]+=data[n][0]*data[n][0];sum[3]+=data[n][0]*data[n][1];sum[4]+=data[n][1]*data[n][1];}}
gradient=(len*sum[3]-sum[0]*sum[1])/(len*sum[2]-sum[0]*sum[0]);intercept=(sum[1]/len)-(gradient*sum[0])/len;results=data.map(function(xyPair){var x=xyPair[0];return[x,gradient*x+intercept];});return{r2:determinationCoefficient(data,results),equation:[gradient,intercept],points:results,string:'y = '+_round(gradient,options.precision)+'x + '+_round(intercept,options.precision),};},linearthroughorigin:function(data,_order,options){var sum=[0,0];var gradient;var results;for(var n=0;n<data.length;n++){if(data[n][1]!==null){sum[0]+=data[n][0]*data[n][0];sum[1]+=data[n][0]*data[n][1];}}
gradient=sum[1]/sum[0];results=data.map(function(xyPair){var x=xyPair[0];return[x,gradient*x];});return{r2:determinationCoefficient(data,results),equation:[gradient],points:results,string:'y = '+_round(gradient,options.precision)+'x',};},exponential:function(data,_order,options){var sum=[0,0,0,0,0,0];var denominator;var coeffA;var coeffB;var results;for(var n=0;n<data.length;n++){if(data[n][1]!==null){sum[0]+=data[n][0];sum[1]+=data[n][1];sum[2]+=data[n][0]*data[n][0]*data[n][1];sum[3]+=data[n][1]*Math.log(data[n][1]);sum[4]+=data[n][0]*data[n][1]*Math.log(data[n][1]);sum[5]+=data[n][0]*data[n][1];}}
denominator=(sum[1]*sum[2]-sum[5]*sum[5]);coeffA=Math.exp((sum[2]*sum[3]-sum[5]*sum[4])/denominator);coeffB=(sum[1]*sum[4]-sum[5]*sum[3])/denominator;results=data.map(function(xyPair){var x=xyPair[0];return[x,coeffA*Math.exp(coeffB*x)];});return{r2:determinationCoefficient(data,results),equation:[coeffA,coeffB],points:results,string:'y = '+_round(coeffA,options.precision)+'e^('+_round(coeffB,options.precision)+'x)',};},logarithmic:function(data,_order,options){var sum=[0,0,0,0];var coeffA;var coeffB;var results;var len=data.length;for(var n=0;n<len;n++){if(data[n][1]!==null){sum[0]+=Math.log(data[n][0]);sum[1]+=data[n][1]*Math.log(data[n][0]);sum[2]+=data[n][1];sum[3]+=Math.pow(Math.log(data[n][0]),2);}}
coeffB=(len*sum[1]-sum[2]*sum[0])/(len*sum[3]-sum[0]*sum[0]);coeffA=(sum[2]-coeffB*sum[0])/len;results=data.map(function(xyPair){var x=xyPair[0];return[x,coeffA+coeffB*Math.log(x)];});return{r2:determinationCoefficient(data,results),equation:[coeffA,coeffB],points:results,string:'y = '+_round(coeffA,options.precision)+' + '+_round(coeffB,options.precision)+' ln(x)',};},power:function(data,_order,options){var sum=[0,0,0,0];var coeffA;var coeffB;var results;var len=data.length;for(var n=0;n<len;n++){if(data[n][1]!==null){sum[0]+=Math.log(data[n][0]);sum[1]+=Math.log(data[n][1])*Math.log(data[n][0]);sum[2]+=Math.log(data[n][1]);sum[3]+=Math.pow(Math.log(data[n][0]),2);}}
coeffB=(len*sum[1]-sum[2]*sum[0])/(len*sum[3]-sum[0]*sum[0]);coeffA=Math.exp((sum[2]-coeffB*sum[0])/len);results=data.map(function(xyPair){var x=xyPair[0];return[x,coeffA*Math.pow(x,coeffB)];});return{r2:determinationCoefficient(data,results),equation:[coeffA,coeffB],points:results,string:'y = '+_round(coeffA,options.precision)+'x^'+_round(coeffB,options.precision),};},polynomial:function(data,order,options){var lhs=[];var rhs=[];var a=0;var b=0;var c;var k;var i;var j;var l;var len=data.length;var results;var equation;var string;if(typeof order==='undefined'){k=3;}else{k=order+1;}
for(i=0;i<k;i++){for(l=0;l<len;l++){if(data[l][1]!==null){a+=Math.pow(data[l][0],i)*data[l][1];}}
lhs.push(a);a=0;c=[];for(j=0;j<k;j++){for(l=0;l<len;l++){if(data[l][1]!==null){b+=Math.pow(data[l][0],i+j);}}
c.push(b);b=0;}
rhs.push(c);}
rhs.push(lhs);equation=gaussianElimination(rhs,k);results=data.map(function(xyPair){var x=xyPair[0];var answer=equation.reduce(function(sum,coeff,power){return sum+coeff*Math.pow(x,power);},0);return[x,answer];});string='y = ';for(i=equation.length-1;i>=0;i--){if(i>1){string+=_round(equation[i],options.precision)+'x^'+i+' + ';}else if(i===1){string+=_round(equation[i],options.precision)+'x'+' + ';}else{string+=_round(equation[i],options.precision);}}
return{r2:determinationCoefficient(data,results),equation:equation,points:results,string:string,};},lastvalue:function(data,_order,options){var results=[];var lastvalue=null;for(var i=0;i<data.length;i++){if(data[i][1]!==null&&isFinite(data[i][1])){lastvalue=data[i][1];results.push([data[i][0],data[i][1]]);}else{results.push([data[i][0],lastvalue]);}}
return{r2:determinationCoefficient(data,results),equation:[lastvalue],points:results,string:''+_round(lastvalue,options.precision),};},};exports=function regression(method,data,order,options){var methodOptions=(((typeof order==='object')&&(typeof options==='undefined'))?order:options||{});if(!methodOptions.precision){methodOptions.precision=_DEFAULT_PRECISION;}
if(typeof method==='string'){return methods[method.toLowerCase()](data,order,methodOptions);}
return null;};return exports;});var Static={};Function.prototype.inheritsFrom=function(ParentClassOrObject){if(ParentClassOrObject.constructor===Function){this.prototype=new ParentClassOrObject();this.prototype.constructor=this;this.prototype.parent=ParentClassOrObject.prototype;}else{this.prototype=ParentClassOrObject;this.prototype.constructor=this;this.prototype.parent=ParentClassOrObject;}
return this;}
Static.qBound=function(min,val,max){return Math.max(min,Math.min(val,max));}
Static.linearEquationFromPoints=function(p1,p2){var m=(p2.y-p1.y)/(p2.x-p1.x)
var c=-m*p1.x+p1.y
var fn=m.toString()
fn+="x+"
fn+=c.toString()
return fn}
String.prototype.insertAt=function(idx,rem,str){return this.slice(0,idx)+str+this.slice(idx+Math.abs(rem));};String.prototype.replaceAt=function(index,replacement){return this.substr(0,index)+replacement+this.substr(index+replacement.length);}
Array.prototype.resize=function(newSize){var self=this
self=[]
while(newSize>self.length)
self.push(undefined);}
Array.prototype.containsPoint=function(point){var self=this;for(var i=0;i<self.length;++i){if(self[i].isEqual(point))
return true;}
return false;}
Static.Rtti_PlotItem=0;Static.Rtti_PlotGrid=1;Static.Rtti_PlotScale=2;Static.Rtti_PlotLegend=3;Static.Rtti_PlotMarker=4;Static.Rtti_PlotCurve=5;Static.Rtti_PlotSpectroCurve=6;Static.Rtti_PlotIntervalCurve=7;Static.Rtti_PlotHistogram=8;Static.Rtti_PlotSpectrogram=9;Static.Rtti_PlotSVG=10;Static.Rtti_PlotTradingCurve=11;Static.Rtti_PlotBarChart=12;Static.Rtti_PlotMultiBarChart=13;Static.Rtti_PlotShape=14;Static.Rtti_PlotTextLabel=15;Static.Rtti_PlotZone=16;Static.Rtti_PlotUserItem=1000;Static.MagnifierEnabled=1
Static.ZoomEnabled=2
Static.PanEnabled=4
Static.Locked=8
Static.LeftButtonDown=16
Static.DragCursor=32
Static.PanningInProgress=64
Static.MagnifierSearch=128
Static.ZoomerSearch=256
Static.PannerSearch=512
Static.NoRuler=1024
Static.Left=0
Static.Right=1
Static.Bottom=2
Static.Top=3
Static.LeftAndRight=0x12800
Static.BottomAndTop=0x25600
Static.NoTrackingText=0
Static.FullTrackingText=1
Static.PartialTrackingText=2
Static.ReadOnly=0;Static.Clickable=1;Static.Checkable=2;Static.ModeRole=0,Static.TitleRole=1,Static.IconRole=2,Static.UserRole=32;Static.NoRubberBand=0;Static.HLineRubberBand=1;Static.VLineRubberBand=2;Static.CrossRubberBand=3;Static.RectRubberBand=4;Static.EllipseRubberBand=5;Static.PolygonRubberBand=6;Static.UserRubberBand=100;Static.NoSelection=-1;Static.PointSelection=0;Static.RectSelection=1;Static.PolygonSelection=2;Static.AlwaysOff=0;Static.AlwaysOn=1;Static.ActiveOnly=2;Static.NoPen="noPen";Static.NoBrush="noBrush";var _eps=1.0e-6;var NoTick=-1;var MinorTick=0;var MediumTick=1;var MajorTick=2;var NTickTypes=3;var BottomScale=0;var TopScale=1;var LeftScale=2;var RightScale=3;var Horizontal=1;var Vertical=2;var Backbone=0x01;var Ticks=0x02;var Labels=0x04;var ScaleInterest=0x01;var IncludeBorders=0x00;var ExcludeMinimum=0x01;var ExcludeMaximum=0x02;var ExcludeBorders=0x03;var yLeft=0;var yRight=1;var xBottom=2;var xTop=3;var axisCnt=4;var Legend=0x01;var AutoScale=0x02;var Margins=0x04;var NoCurve=-1;var Lines=0;var Sticks=1;var Steps=2;var Dots=3;var UserCurve=100;var Inverted=0x01;var Fitted=0x02;var RoundPoints=0x01;var WeedOutPoints=0x02;var FilterPoints=0x01;var MinimizeMemory=0x02;var NoLine=0;var NoSymbol=-1;var Ellipse=0;var MRect=2;var Diamond=3;var Triangle=4;var DTriangle=5;var UTriangle=6;var LTriangle=7;var RTriangle=8;var Cross=9;var XCross=10;var HLine=11;var VLine=12;var Star1=13;var Star2=14;var Hexagon=15;var Path=16;var Pixmap=17;var MGraphic=18;var SvgDocument=19;var UserStyle=1000
Static.NoButton=-1;Static.LeftButton=0;Static.MiddleButton=1;Static.MidButton=1;Static.RightButton=2;Static.Key_Escape=27
Static.Key_Plus=107
Static.Key_Minus=109
Static.Key_Ctrl=17
Static.Key_Shift=16
Static.Key_Return=13
Static.Key_Space=32
Static.Key_Left=37
Static.Key_Right=39
Static.Key_Up=38
Static.Key_Down=40
Static.Key_Undo=90
Static.Key_Redo=89
Static.Key_Home=36
Static.Key_I=73
Static.Key_O=79
Static.Key_unknown=-1
Static.NoModifier=0x00000000
Static.ShiftModifier=0x02000000
Static.ControlModifier=0x04000000
Static.AltModifier=0x08000000
Static.AlignRight=1;Static.AlignLeft=2;Static.AlignBottom=4;Static.AlignTop=8;Static.AlignCenter=16;var RGB=0
var INDEXED=1
var ScaledColors=0
var FixedColors=1
Static.adjustForDecimalPlaces=function(number,places){if(places==undefined)
places=5;var multiplier=Math.pow(10,places);return Math.round(number*multiplier)/multiplier;}
Static.mFuzzyCompare=function(a,b){var diff=Math.abs(a-b);if(diff<_eps){return true;}
return false;}
Static.m3FuzzyCompare=function(value1,value2,intervalSize){var eps=Math.abs(1.0e-6*intervalSize);if(value2-value1>eps)
return-1;if(value1-value2>eps)
return 1;return 0;}
Static.bind=function(sig,data,cb){$(window).bind(sig,data,cb)}
Static.trigger=function(sig,param){$(window).trigger(sig,param)}
Static.invert=function(rgb){rgb=[].slice.call(arguments).join(",").replace(/rgb\(|\)|rgba\(|\)|\s/gi,'').split(',');for(var i=0;i<rgb.length;i++)
rgb[i]=(i===3?1:255)-rgb[i];return"rgb("+rgb.join(", ")+")";}
Static.RGB2HTML=function(red,green,blue)
{if(typeof(red)=="string"){var str=red
str=str.replace("rgb(",'')
red=parseInt(str)
str=str.replace(',','')
str=str.replace(red,'')
green=parseInt(str)
str=str.replace(',','')
str=str.replace(green,'')
blue=parseInt(str)}
if(red.r!==undefined){var temp=red
red=red.r
green=temp.g
blue=temp.b}
var decColor=0x1000000+blue+0x100*green+0x10000*red;return'#'+decColor.toString(16).substr(1);}
Static.HTMLToRGB=function(hex){var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return result?{r:parseInt(result[1],16),g:parseInt(result[2],16),b:parseInt(result[3],16)}:null;}
Static.mRgb=function(red,green,blue){return{r:red,g:green,b:blue}}
Static.colorNameToHex=function(colour)
{var colours={"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0","hotpink":"#ff69b4","indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"};if(colour[0]=='r'&&colour[1]=='g'&&colour[2]=='b')
return Static.RGB2HTML(colour);if(colour[0]=='#')
return colour;if(typeof colours[colour.toLowerCase()]!='undefined')
return colours[colour.toLowerCase()];return"#000000";}
Static.sqr=function(value){return Math.pow(value,2)}
Static.setElementIndex=function(element,index){var Children=$(element).parent().children();var target=Children[index];if($(element).index()>index){if(target==null){target=Children[0];}
if(target!=element&&target!=null){$(target).before(element);}}else{if(target==null){target=Children[Children.length-1];}
if(target!=element&&target!=null){$(target).after(element);}}}
Static.elementsFromPoint=function(x,y,elem){var until=elem[0];var parents=[];var current;do{current=document.elementFromPoint(x,y);if(current!==until){parents.push(current);current.style.pointerEvents='none';}else{current=false;}}while(current);parents.forEach(function(parent){return parent.style.pointerEvents='all';});return $(parents);}
Static.stopkeyPressPropagation=function(element){element.keydown(function(event){event.stopPropagation();});}
window.matchMedia('print').addListener(function(mql){if(mql.matches){Static.trigger('beforePrint');}else{Static.trigger('afterPrint');}})
window.onbeforeprint=function(mql){Static.trigger('beforePrint');}
window.onafterprint=function(mql){Static.trigger('afterPrint');}
Static.Cancel=0
Static.No=1
Static.Yes=2
Static.alertDlg=function(){var dlg=$('<div class="modal fade" id="alert_Modal" role="dialog">\
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
$("body").append(dlg);dlg.css('z-index',1000000000)
this.alert=function(msg,type){$("#alertDlgFooter2").hide()
$("#alertDlgFooter1").show()
$("#msg").text(msg)
if(type=="small"){$("#dlg").addClass("modal-sm")}else{$("#dlg").removeClass("modal-sm")}
dlg.modal({backdrop:"static"});}
var self=this
this.alertYesNo=function(msg,cb,type){$(".close").hide()
this.alertYesCb=cb
$("#alertDlgFooter1").hide()
$("#alertDlgFooter2").show()
$("#msg").text(msg)
if(type=="small"){$("#dlg").addClass("modal-sm")}else{$("#dlg").removeClass("modal-sm")}
dlg.modal({backdrop:"static"});}
$("#yes").click(function(){$(".close").click();self.alertYesCb(Static.Yes)})
$("#no").click(function(){$(".close").click();self.alertYesCb(Static.No)})
$("#cancel").click(function(){$(".close").click();self.alertYesCb(Static.Cancel)})}
Static.alert=function(msg,type){if(Static.alertObj==undefined){Static.alertObj=new Static.alertDlg()}
Static.alertObj.alert(msg,type)}
Static.alertYesNo=function(msg,cb,type){if(Static.alertObj==undefined){Static.alertObj=new Static.alertDlg()}
Static.alertObj.alertYesNo(msg,cb,type)}
Static.promptDlg=function(){var prompt_dlg=$('<div class="modal fade" id="promptModal" role="dialog">\
    <div id="prompt_dlg" class="modal-dialog">\
      <!-- Modal content-->\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal"></button>\
          <h4 class="modal-title" id="prompt_title">Alert</h4>\
        </div>\
        <div class="modal-body">\
          <input id="prompt_msg" style="width:100%" autofocus />\
        </div>\
        <div class="modal-footer">\
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\
          <button id="prompt_ok" type="button" class="btn btn-default">Ok</button>\
        </div>\
      </div>\
    </div>\
  </div>')
$("body").append(prompt_dlg);var self=this
this.prompt=function(title,defaultMsg,cb,type){if(type=="small"){$("#prompt_dlg").addClass("modal-sm")}
$("#prompt_title").text(title)
$("#prompt_msg").val(defaultMsg)
$("#prompt_msg").select()
this.cb=cb
prompt_dlg.modal({backdrop:"static"});}
$("#prompt_ok").on('click',function(){if(self.cb($("#prompt_msg").val())){$(".close").click();}else{$("#prompt_msg").select()}})}
Static.prompt=function(msg,defaultMsg,cb,type){if(Static.promptObj==undefined){Static.promptObj=new Static.promptDlg()}
Static.promptObj.prompt(msg,defaultMsg,cb,type)}
Static.isMobile=function(){return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4)))}
function insertLogBase(expStr,logStr){var str=expStr;if(expStr.includes(logStr)){var base=logStr.replace("log","");while(str.indexOf(logStr)!==-1){var i=str.indexOf(logStr)+logStr.length;var leftPar=0;var rightPar=0;for(i;i<str.length;++i){if(str[i]=='(')
leftPar++;if(str[i]==')')
rightPar++;if(leftPar==rightPar){str=str.insertAt(i,0,","+base)
str=str.replace(logStr,"log")
break;}}}}
return str;}
function logBaseAdjust(expStr){var logBaseStr=["log2","log3","log4","log5","log6","log7","log8","log9","log10"];for(var i=0;i<logBaseStr.length;i++){expStr=insertLogBase(expStr,logBaseStr[i])}
return expStr;}
function EvaluateExp(expStr){var m_expStr=expStr;var f;var simplified;this.error=false
function init(){try{simplified=math.parse(m_expStr);if(!m_expStr.includes("log"))
simplified=math.simplify(simplified);}
catch(err){Static.alert(err.message);this.error=true}}
if(m_expStr!==undefined){m_expStr=logBaseAdjust(m_expStr);init()}
this.setExpString=function(s){m_expStr=s
init()}
this.getExpString=function(){return m_expStr}
this.eval=function(obj){this.error=false
try{return simplified.eval(obj)}
catch(err){this.errorMessage=err.message
this.error=true
return 0;}}}
function findIndepVar(fx){var alphas="abcdfghijklmnopqrstuvwxyzABCDFGHIJKLMNOPQRSTUVWXYZ";var i=0;while(i<fx.length){var c=fx.charAt(i);var str="";while(alphas.indexOf(c)!=-1&&i<fx.length){str+=c;++i;c=fx.charAt(i);}
if(str.length===1){return str}
++i;}
return undefined;}
function makeSamples(obj){var fx=obj.fx
var lowerX=obj.lowerX
var upperX=obj.upperX
var numOfSamples=obj.numOfSamples
var indepVarIsDegree=obj.indepVarIsDegree
if(typeof numOfSamples==='undefined')
numOfSamples=_numOfSamples;var indepVar=findIndepVar(fx);if(indepVar!=="x"){while(fx.indexOf(indepVar)!=-1)
fx=fx.replace(indepVar,"x")}
var samples=[];var parser=new EvaluateExp(fx)
if(parser.error){Static.alert(parser.errorMessage);return null}
var step=(upperX-lowerX)/(numOfSamples-1);for(var i=0;i<=numOfSamples-1;++i){var xVal=lowerX+i*step;var yVal=parser.eval({x:xVal})
if(parser.error){Static.alert(parser.errorMessage);return null}
samples.push(new Misc.Point(xVal,yVal))}
return samples;}
define('static',['regression'],function(regression){Static.regression=regression})
function regress(curve,type,order,throughOrigin){if(type=="linear"&&throughOrigin){type="linearthroughorigin"}
var samples=curve.data().samples()
var points=[]
var point=[0,0]
for(var i=0;i<samples.length;++i){points.push([samples[i].x,samples[i].y])}
return Static.regression(type,points,order);}
$('body').on("contextmenu",function(e){e.preventDefault();});function integrate(f,start,end,volumeX,step){Static.total_area=0;Static.total_volume=0;step=step||(end-start)/950000
volumeX=volumeX||false
for(var x=start;x<end;x+=step){var _x=x+step/2
if(_x>end)
step=step-(_x-end)
var y=f(x+step/2)
if(volumeX)
Static.total_volume+=y*step*y*Math.PI;else
Static.total_area+=y*step;}
if(volumeX)
return Static.total_volume;return Static.total_area;}
integrate.transform=function(args,math,scope){if(args[1]instanceof math.expression.node.SymbolNode){var variable=args[1].name;}
else{throw new Error('Second argument must be a symbol');}
var start=args[2].compile().eval(scope);var end=args[3].compile().eval(scope);var volumeX=args[4]&&args[4].compile().eval(scope);var step=args[5]&&args[5].compile().eval(scope);var fnScope=Object.create(scope);var fnCode=args[0].compile();var f=function(x){fnScope[variable]=x;return fnCode.eval(fnScope);};return integrate(f,start,end,volumeX,step);};integrate.transform.rawArgs=true;math.import({integrate:integrate});Static.isAlpha=function(ch){ch=ch.toLowerCase().charCodeAt(0)
return(ch>96&&ch<122)}
Static.printFn=function(){window.print()};class Utility{static colorList(){return["black","red","green","blue","yellow","brown"]}
static makePoints(arrayOfTwoMemberArrays){var res=[];arrayOfTwoMemberArrays.forEach(function(arrayOfTwoMembers){res.push(new Misc.Point(parseFloat(arrayOfTwoMembers[0]),parseFloat(arrayOfTwoMembers[1])))})
return res;}
static toArrays(csvContent){var arr=csvContent.split('\n')
var result=[]
for(var i=0;i<arr.length;++i){var pt=arr[i].split(',')
if(isNaN(parseFloat(pt))){continue}
result.push(pt)}
return result}
static setAutoScale(plot,on){plot.setAxisAutoScale(xBottom,true);plot.setAxisAutoScale(yLeft,true);plot.setAxisAutoScale(xTop,true);plot.setAxisAutoScale(yRight,true);}
static majorGridLines(grid,on){grid.enableX(on);grid.enableY(on);}
static minorGridLines(grid,on){grid.enableXMin(on);grid.enableYMin(on);}
static randomColor(brightness=0){var rgb=[Math.random()*256,Math.random()*256,Math.random()*256];var mix=[brightness*51,brightness*51,brightness*51];var mixedrgb=[rgb[0]+mix[0],rgb[1]+mix[1],rgb[2]+mix[2]].map(function(x){return Math.round(x/2.0)})
return"rgb("+mixedrgb.join(",")+")";}
static setSymbolPenWidth(curve,width){var sym=curve.symbol()
if(!sym){return}
var pen=sym.pen()
pen.width=width
curve.plot().autoRefresh()
updateLegendIconSize(curve)
curve.plot().updateLegend(curve)}
static setSymbolSize(curve,value){var sym=curve.symbol()
if(!sym)
return
var sz=sym.size()
sz.width=value
sz.height=value
sym.setSize(sz)
curve.plot().autoRefresh()
updateLegendIconSize(curve)
curve.plot().updateLegend(curve)}
static addSymbol(curve,style){if(style=='None'){curve.setSymbol(null)
return}
var sym=curve.symbol()
if(sym==null){sym=new Symbol();sym.setBrush(new Misc.Brush(Static.NoBrush))
sym.setSize(new Misc.Size(10,10))
curve.setSymbol(sym)}
if(sym.size().width<=0)
sym.setSize(new Misc.Size(10,10))
sym.setStyle(style)
curve.itemChanged()
curve.legendChanged();}
static curveRenameDlg(existingName,plot,successCb){Static.prompt("Enter a new name for \""+existingName+"\"",existingName,function(newName){if(existingName==newName){Static.alert("You did not change the name!")
return false}
var curve=plot.findPlotCurve(existingName)
if(!plot.findPlotCurve(newName)){curve.setTitle(newName)
if(successCb!==undefined)
successCb()
return true}else{Static.alert(newName+" already exist")
return false}},"small")}
static setLegendAttribute(curve,attribute,defaultIconSize){if(attribute=="line"){curve.setLegendIconSize(new Misc.Size(defaultIconSize))
curve.setLegendAttribute(LegendShowSymbol,false)
curve.setLegendAttribute(LegendShowLine,true)
return;}
if(attribute=="symbol"){curve.setLegendIconSize(new Misc.Size(defaultIconSize))
curve.setLegendAttribute(LegendShowLine,false)
curve.setLegendAttribute(LegendShowSymbol,true);return;}
if(attribute=="lineAndSymbol"){curve.setLegendIconSize(new Misc.Size(defaultIconSize))
curve.setLegendAttribute(LegendShowLine,true)
curve.setLegendAttribute(LegendShowSymbol,true);return;}
curve.setLegendAttribute(LegendShowLine,false)
curve.setLegendAttribute(LegendShowSymbol,false)}
static enableComponent(plot,component,on){var scaleDraw=null;for(var axisId=0;axisId<axisCnt;++axisId){scaleDraw=plot.axisScaleDraw(axisId)
scaleDraw.enableComponent(component,on)}
plot.autoRefresh()}
static setTickLength(plot,length){var scaleDraw=null;for(var axisId=0;axisId<axisCnt;++axisId){scaleDraw=plot.axisScaleDraw(axisId);if(length=="small"){scaleDraw.setTickLength(MajorTick,6);scaleDraw.setTickLength(MinorTick,3);}else if(length=="medium"){scaleDraw.setTickLength(MajorTick,8);scaleDraw.setTickLength(MinorTick,4);}else if(length=="large"){scaleDraw.setTickLength(MajorTick,12);scaleDraw.setTickLength(MinorTick,6);}}
plot.autoRefresh()}};define("utility",function(){});function PaintUtil(){function ContextPainter(ctx){var m_ctx=ctx;var penStyle="";var m_font=null;this.textSize=function(str){m_ctx.save()
m_ctx.font=m_font.weight+" "+m_font.style+" "+m_font.th+"px "+m_font.name;var w=m_ctx.measureText(str).width;var h=m_ctx.measureText("M").width;m_ctx.restore()
return new Misc.Size(w,h);}
this.context=function(){return m_ctx;}
this.canvasWidth=function(){return m_ctx.canvas.width;}
this.canvasHeight=function(){return m_ctx.canvas.height;}
this.save=function(){m_ctx.save();}
this.restore=function(){m_ctx.restore();}
this.translate=function(x,y){m_ctx.translate(x,y);}
this.rotate=function(rot){m_ctx.rotate(rot*Math.PI/180);}
this.scale=function(x,y){m_ctx.scale(x,y);}
this.setPen=function(pen){if(this.style==Static.NoPen)
m_ctx.strokeStyle="transparent";else
m_ctx.strokeStyle=pen.color;m_ctx.lineWidth=pen.width;if(pen.style==="dash")
m_ctx.setLineDash([10,5]);else if(pen.style==="dot")
m_ctx.setLineDash([3,8]);else if(pen.style==="dashDot")
m_ctx.setLineDash([12,5,3,5]);else if(pen.style==="dashDotDot")
m_ctx.setLineDash([12,5,3,5,3,5]);penStyle=pen.style;}
this.pen=function(){var color=""
if(m_ctx.strokeStyle=="transparent")
color=NoPen;else
color=m_ctx.strokeStyle;return new Misc.Pen(color,m_ctx.lineWidth,penStyle);}
this.setBrush=function(brush){if(brush.color===undefined||brush.color===Static.NoBrush)
m_ctx.fillStyle="transparent";else
m_ctx.fillStyle=brush.color;}
this.brush=function(){return m_ctx.fillStyle;}
this.setFont=function(font){m_ctx.font=font.weight+" "
+font.style+" "
+font.th+"px "
+font.name;if(typeof(font.fontColor)!=="")
ctx.fillStyle=font.fontColor;m_font=font;}
this.font=function(){return m_font;}
this.fillRect=function(rect,brush){if(brush.style!==NoBrush)
{this.setBrush(brush);m_ctx.rect(rect.left(),rect.top(),rect.width(),rect.height());m_ctx.fill();}}
this.drawPath=function(path){m_ctx.beginPath()
for(var i=0;i<path.elementCount();i++)
{var element=path.elementAt(i);var x=element.x;var y=element.y;switch(element.type)
{case MoveToElement:{m_ctx.moveTo(x,y);break;}
case LineToElement:{m_ctx.lineTo(x,y);break;}
case CurveToElement:{var element1=path.elementAt(++i);var x1=element1.x;var y1=element1.y;var element2=path.elementAt(++i);var x2=element2.x;var y2=element2.y;m_ctx.bezierCurveTo(x,y,x1,y1,x2,y2);break;}
case CurveToDataElement:{break;}}}
m_ctx.stroke();m_ctx.fill();}
this.drawPoint=function(pt){var pw=this.pen().width
m_ctx.fillStyle=this.pen().color;m_ctx.fillRect(pt.x-pw*1.0,pt.y-pw*1.0,pw*1.9,pw*2.0)}
this.drawPoints=function(points){m_ctx.fillStyle=this.pen().color
var pw=this.pen().width
for(var i=0;i<points.length;++i)
m_ctx.fillRect(points[i].x-pw*1.0,points[i].y-pw*1.0,pw*1.9,pw*2.0)}
this.drawLine=function(param1,param2,param3,param4){m_ctx.beginPath()
if(typeof(param4)!=="undefined"&&typeof(param3)!=="undefined"){m_ctx.moveTo(param1,param2);m_ctx.lineTo(param3,param4);m_ctx.stroke();}
else{m_ctx.moveTo(param1.x,param1.y);m_ctx.lineTo(param2.x,param2.y);}
m_ctx.stroke();}
this.drawPolyline=function(polyline){m_ctx.beginPath();m_ctx.moveTo(polyline[0].x,polyline[0].y);for(var i=1;i<polyline.length;++i)
m_ctx.lineTo(polyline[i].x,polyline[i].y);m_ctx.stroke();}
this.drawPolygon=function(polyline){if((polyline[0].x!==polyline[polyline.length-1].x)||(polyline[0].y!==polyline[polyline.length-1].y))
polyline.push(polyline[0]);m_ctx.beginPath();this.drawPolyline(polyline);m_ctx.closePath();m_ctx.fill();}
this.drawRect=function(x,y,width,height){m_ctx.beginPath();if(typeof(x)=='number')
m_ctx.rect(x,y,width,height);else{var rect=x;m_ctx.rect(rect.left(),rect.top(),rect.width(),rect.height());}
m_ctx.stroke();m_ctx.fill();m_ctx.closePath()}
this.drawCircle=function(x,y,radius){m_ctx.beginPath();if(typeof(x)=='number')
m_ctx.arc(x,y,radius,0,2*Math.PI,false);else{var pt=x;radius=y;m_ctx.arc(pt.x,pt.y,radius,0,2*Math.PI,false);}
m_ctx.stroke();m_ctx.fill();m_ctx.closePath()}
this.drawEllipse=function(rect){var centerX=(rect.left()+rect.right())/2
var centerY=(rect.top()+rect.bottom())/2
var width=rect.width()
var height=rect.height()
m_ctx.beginPath();m_ctx.moveTo(centerX,centerY-height/2);m_ctx.bezierCurveTo(centerX+width/2,centerY-height/2,centerX+width/2,centerY+height/2,centerX,centerY+height/2);m_ctx.bezierCurveTo(centerX-width/2,centerY+height/2,centerX-width/2,centerY-height/2,centerX,centerY-height/2);m_ctx.stroke();m_ctx.fill();m_ctx.closePath()
m_ctx.closePath();}
this.drawVerticalText=function(txt,tx,ty,topDown){var bottomUp=-1;if(typeof(topDown)!=="undefined"){if(topDown===true)
bottomUp=1;}
var size=m_ctx.measureText(txt);m_ctx.save();var x=tx;var y=ty-bottomUp*size.width/2;m_ctx.translate(x,y);m_ctx.rotate(bottomUp*Math.PI/2);m_ctx.translate(-x,-y);if(bottomUp===-1)
m_ctx.textAlign="left";m_ctx.fillText(txt,x,y);m_ctx.restore();}
function adjustedText(text,maxTextLength){var txt=text;var textLength=m_font.textSize(txt).width;while(textLength>maxTextLength){if(!txt.substring)break
txt=txt.substring(0,txt.length-1);textLength=m_font.textSize(txt).width;}
return txt;}
this.drawText=function(text,x,y,alignment,maxTextLength){if(typeof(maxTextLength)!=="undefined")
text=adjustedText(text,maxTextLength);if(typeof(alignment)!=="undefined")
m_ctx.textAlign=alignment;m_ctx.fillText(text,x,y);}
this.toString=function(){return'[Painter: '+m_ctx+']'}}
function GraphicPainter(graphic){var svgNS="http://www.w3.org/2000/svg";var m_graphic=graphic;var m_pen=new Misc.Pen;m_pen.style=Static.NoPen;var m_brush=new Misc.Brush;var m_font=new Misc.Font;var elem=null;this.setBrush=function(b){m_brush=b}
this.setPen=function(p){m_pen=p}
function doSetPen(){if(m_pen.style===Static.NoPen)
elem.attr("stroke","transparent");else
elem.attr("stroke",m_pen.color);elem.attr("stroke-Width",m_pen.width);if(m_pen.style==="dash")
elem.attr("stroke-dasharray",[10,5]);else if(m_pen.style==="dot")
elem.attr("stroke-dasharray",[3,8]);else if(m_pen.style==="dashDot")
elem.attr("stroke-dasharray",[12,5,3,5]);else if(m_pen.style==="dashDotDot")
elem.attr("stroke-dasharray",[12,5,3,5,3,5]);}
function doSetBrush(){if(m_brush.color===Static.NoBrush)
elem.attr("fill","transparent");else
elem.attr("fill",m_brush.color);}
this.pen=function(){return m_pen;}
this.rotate=function(rotation,x,y){xCenter=x||0
yCenter=y||0
if(rotation)
elem.attr("transform"," rotate("+rotation+' '+xCenter+' '+yCenter+")");}
this.transform=function(obj){var xTrans=obj.translateX||0
var yTrans=obj.translateY||0
var xScale=obj.scaleX||1
var yScale=obj.scaleY||1
var rotation=obj.rotation||0
var xCenter=obj.rotationX||0
var yCenter=obj.rotationY||0
var transformStr=""
if(xScale!=1||yScale!=1)
transformStr+=" scale("+xScale+' '+yScale+")"
if(rotation)
transformStr+=" rotate("+rotation+' '+xCenter+' '+yCenter+")"
if(xTrans!=1||yTrans!=1)
transformStr+=" translate("+xTrans+' '+yTrans+")"
elem.attr("transform",transformStr);}
this.drawRect=function(x,y,w,h){elem=$(document.createElementNS(svgNS,"rect"));elem.attr("x",x);elem.attr("y",y);elem.attr("width",w);elem.attr("height",h);doSetBrush();doSetPen()
elem.appendTo($(m_graphic.svg()))}
this.drawPath=function(path){elem=$(document.createElementNS(svgNS,"path"));var data=path.data
var d="";for(var i=0;i<path.elementCount();i++)
{var element=path.elementAt(i);var x=element.x+data.xOffset;var y=element.y+data.yOffset;switch(element.type)
{case MoveToElement:{d+='M'+x+' '+y+' ';break;}
case LineToElement:{d+='L'+x+' '+y+' ';break;}
case CurveToElement:{var element1=path.elementAt(++i);var x1=element1.x+data.xOffset;var y1=element1.y+data.yOffset;var element2=path.elementAt(++i);var x2=element2.x+data.xOffset;var y2=element2.y+data.yOffset;d+='C '+x+' '+y+' '+x1+' '+y1+' '+x2+' '+y2+' ';break;}
case CurveToDataElement:{break;}}}
elem.attr("d",d);elem.attr("transform"," scale("+data.scale+")"+" rotate("+data.rotation+' '+data.xCenter+' '+data.yCenter+")");doSetBrush();doSetPen()
elem.appendTo($(m_graphic.svg()))}
this.fillRect=function(rect,brush){elem=$(document.createElementNS(svgNS,"rect"));elem.attr("x",rect.left);elem.attr("y",rect.top);elem.attr("width",rect.width);elem.attr("height",rect.height);elem.attr("fill",brush.color);doSetPen();elem.appendTo($(m_graphic.svg()))}
this.drawCircle=function(x,y,radius){elem=$(document.createElementNS(svgNS,"circle"));elem.attr("cx",x);elem.attr("cy",y);elem.attr("r",radius);doSetBrush();doSetPen()
elem.appendTo($(m_graphic.svg()))}
this.drawLine=function(x1,y1,x2,y2){elem=$(document.createElementNS(svgNS,"line"));elem.attr("x1",x1);elem.attr("y1",y1);elem.attr("x2",x2);elem.attr("y2",y2);doSetPen();elem.appendTo($(m_graphic.svg()))}
this.drawText=function(text,x,y){elem=$(document.createElementNS(svgNS,"text"));elem.attr('x',x);elem.attr('y',y);doSetFont();doSetPen();doSetBrush();elem[0].textContent=text;elem.appendTo($(m_graphic.svg()));}
this.textSize=function(text){return m_font.textSize(text);}
this.setFont=function(font){m_font=font;}
this.font=function(){return m_font;}
function doSetFont(){elem.attr("font-size",m_font.th);elem.attr("font-family",m_font.name);elem.attr("font-weight",m_font.weight);elem.attr("font-style",m_font.style);}
this.toString=function(){return'[GraphicPainter]';}}
PaintUtil.Painter=function Painter(param){var m_painter=null;var m_graphicPainter=false;if(param.toString()==='[Graphic]'){m_graphicPainter=true;m_painter=new GraphicPainter(param);}
else if(param.toString()==='[object CanvasRenderingContext2D]'){m_painter=new ContextPainter(param);}
else{m_painter=new ContextPainter(param.getContext());}
this.isGraphicPainter=function(){return m_graphicPainter;}
this.textSize=function(str){return m_painter.textSize(str)}
this.context=function(){if(m_graphicPainter){return;}
return m_painter.context()}
this.canvasWidth=function(){if(m_graphicPainter)
return;return m_painter.canvasWidth()}
this.canvasHeight=function(){if(m_graphicPainter)
return;return m_painter.canvasHeight()}
this.save=function(){if(m_graphicPainter)
return;m_painter.save()}
this.restore=function(){if(m_graphicPainter)
return;m_painter.restore()}
this.translate=function(x,y){if(m_graphicPainter)
return;m_painter.translate(x,y)}
this.scale=function(x,y){if(m_graphicPainter)
return;m_painter.scale(x,y)}
this.rotate=function(rot,x,y){if(m_graphicPainter)
return;m_painter.rotate(rot,x,y)}
this.transform=function(obj){if(!m_graphicPainter)
return;m_painter.transform(obj)}
this.setPen=function(pen){m_painter.setPen(pen)}
this.pen=function(){return m_painter.pen()}
this.setBrush=function(brush){m_painter.setBrush(brush)}
this.brush=function(){return m_painter.brush()}
this.setFont=function(font){m_painter.setFont(font)}
this.font=function(){return m_painter.font()}
this.fillRect=function(rect,brush){m_painter.fillRect(rect,brush)}
this.drawPath=function(path){m_painter.drawPath(path)}
this.drawPoint=function(pt){if(m_graphicPainter)
return;m_painter.drawPoint(pt)}
this.drawPoints=function(points){if(m_graphicPainter)
return;m_painter.drawPoints(points)}
this.drawLine=function(param1,param2,param3,param4){m_painter.drawLine(param1,param2,param3,param4)}
this.drawPolyline=function(polyline){if(m_graphicPainter)
return;m_painter.drawPolyline(polyline)}
this.drawPolygon=function(polyline){if(m_graphicPainter)
return;m_painter.drawPolygon(polyline)}
this.drawRect=function(x,y,width,height){m_painter.drawRect(x,y,width,height)}
this.drawVerticalText=function(txt,tx,ty,topDown){if(m_graphicPainter)
return;m_painter.drawVerticalText(txt,tx,ty,topDown)}
this.drawText=function(text,x,y,alignment,maxTextLength){m_painter.drawText(text,x,y,alignment,maxTextLength)}
this.drawCircle=function(x,y,radius){m_painter.drawCircle(x,y,radius)}
this.drawEllipse=function(rect){m_painter.drawEllipse(rect)}
this.toString=function(){return m_painter.toString()}}}
PaintUtil();define("jPainter",function(){});class HObject{constructor(el){let self=this;let m_isEnabled=false;let element=$("body");let removed=false;let m_bind=false;this.m_objectName="jObject";this.m_mouseTracking=true;this.m_filterObjs=[];if(el!==undefined){if(el&&(el instanceof HObject)){element=el.getElement();}else{element=el;}}
let clickEvent="click";let mousedownEvent="mousedown";let mouseupEvent="mouseup";let mousemoveEvent="mousemove";if(Static.isMobile()){clickEvent="tap";mousedownEvent="touchstart";mouseupEvent="touchend";mousemoveEvent="touchmove";}
this.mapToElement=function(pt){if(!element)
return;let result=new Misc.Point();let rect=element[0].getBoundingClientRect();result.x=pt.x-rect.left;result.y=pt.y-rect.top;return result;}
this.setElement=function(el){element=el;}
this.getElement=function(){return element;}
this.setEnabled_1=function(on){if(m_isEnabled!=on){m_isEnabled=on;this.elementEvent(m_isEnabled)
if(m_isEnabled){Static.trigger("enabled");}}}
this.event=function(event){return true;}
this.elementEventOnCb=function(event){if(self.m_filterObjs.length){self.m_filterObjs.forEach(function(filterObj){if(!filterObj.eventFilter(self,event))
return self.event(event)})}else{return self.event(event)}}
this.elementEvent=function(on){if(this instanceof HObject){let self=this;if(on){self.getElement().on(mousedownEvent+" "+mouseupEvent+" "+mousemoveEvent+" "+'mouseenter mouseleave mousewheel',function(event){self.elementEventOnCb(event);});$('body').on('keydown keyup',function(event){if(self.m_filterObjs.length){self.m_filterObjs.forEach(function(filterObj){if(!filterObj.eventFilter(self,event))
return self.event(event);})}else{return self.event(event);}})}else{self.getElement().off(mousedownEvent+" "+mouseupEvent+" "+mousemoveEvent+" "+'mouseenter mouseleave mousewheel');$('body').off('keydown keyup');}}}
this.installEventFilter=function(filterObj){this.m_filterObjs.push(filterObj);}
this.removeEventFilter=function(obj){let index=this.m_filterObjs.indexOf(obj);if(index>-1){this.m_filterObjs.splice(index,1);}}
this.hasSameElement=function(otherObj){return(this.getElement()==otherObj.getElement());}
this.isEnabled=function(){return m_isEnabled;}
this.toString=function(){return'[HObject]';}}
eventFilter(watched,event){console.log('eventFilter() called')}
setMouseTracking(on){if(this.getElement()&&on){let self=this;this.getElement().on('mousemove touchmove',function(event){self.elementEventOnCb(event);});this.m_mouseTracking=true;}else{this.getElement().off('mousemove touchmove');this.m_mouseTracking=false;}}
hasMouseTracking(){return this.m_mouseTracking;}
setObjectName(name){this.m_objectName=name;}
objectName(){return this.m_objectName;}
isWidget(){return(this.toString()=='[Widget]')}};define("hObject",function(){});class Widget extends HObject{constructor(el){super(el)
let self=this;let m_visible=true;let m_z=0.0;let cnvs=$('<canvas />').attr({style:"position: absolute; background-color: transparent"});if(this.getElement()){this.getElement().append(cnvs);}
this.clearCanvas=function(){let ctx=this.getContext()
if(!ctx)
return;ctx.clearRect(0,0,cnvs[0].width,cnvs[0].height);}
this.getContext=function(){let ctx=null
if(!this.getElement())
return null;cnvs[0].width=parseFloat(this.getElement().css("width"));cnvs[0].height=parseFloat(this.getElement().css("height"));ctx=cnvs[0].getContext("2d");return ctx};this.width=function(){return cnvs[0].width;}
this.height=function(){return cnvs[0].height;}
this.setCanvasParent=function(el){this.getElement().append(cnvs);}
this.getCanvas=function(){return cnvs;}
this.contentsRect=function(){let e=this.getElement()
return(new Misc.Rect(0,0,parseFloat(e.css("width")),parseFloat(e.css("height"))));}
this.setVisible=function(on){if(on||typeof(on)==='undefined'){this.getCanvas().show();m_visible=true}else{this.getCanvas().hide();m_visible=false}}
this.hide=function(){this.setVisible(false)}
this.show=function(){this.setVisible(true)}
this.disableContextmenu=function(){this.getElement().addClass('prevented');}
this.isVisible=function(){return m_visible}
this.setZ=function(z){if(m_z!==z){m_z=z;if(cnvs){cnvs.css("zIndex",m_z)}
this.itemChanged()}}
this.getZ=function(z){return m_z}
this.disableContextmenu()
this.toString=function(){return'[Widget]';}}}
Widget.prototype.setElement=function(el){HObject.prototype.setElement.call(this,el);this.setCanvasParent(el);};define("widget",["static","hObject"],function(){});class ScaleWidget extends Widget{constructor(plot,domDivElem,align){super(domDivElem)
var m_domDiv=this.getElement();var m_scaleDraw=null;var m_title="";var m_plot=plot;var minBorderDist=[]
var borderDist=[]
var m_titleFont=new Misc.Font(14);var m_scaleFont=new Misc.Font(12);this.setBorderDist=function(dist1,dist2){if(dist1!=borderDist[0]||dist2!=borderDist[1])
{borderDist[0]=dist1;borderDist[1]=dist2;}}
this.getBorderDistHint=function(startAndEndObj){m_scaleDraw.getBorderDistHint(m_scaleFont,startAndEndObj);if(startAndEndObj.start<minBorderDist[0])
startAndEndObj.start=minBorderDist[0];if(startAndEndObj.end<minBorderDist[1])
startAndEndObj.end=minBorderDist[1];}
this.setLabelFont=function(fontObj){if(fontObj.th<0||fontObj.name===""||fontObj.style==="")
return;m_scaleFont=fontObj;m_plot.getLayout().adjustLayout(domDivElem,fontObj.th);}
this.labelFont=function(){return m_scaleFont;}
this.setTitleFont=function(fontObj){if(fontObj.th<0||fontObj.name===""||fontObj.style==="")
return;m_titleFont=fontObj;m_plot.getLayout().adjustLayout(domDivElem,fontObj.th);}
this.titleFont=function(){return m_titleFont;}
this.setScaleDraw=function(scaleDraw){if((typeof(scaleDraw)=="undefined")||(scaleDraw==m_scaleDraw))
return;var sd=m_scaleDraw;if(sd){scaleDraw.setScaleDiv(m_scaleDraw.scaleDiv());var transform=null;if(m_scaleDraw.scaleMap().transformation())
transform=m_scaleDraw.scaleMap().transformation().copy();scaleDraw.setTransformation(transform);}
m_scaleDraw=scaleDraw;}
this.scaleDraw=function(){return m_scaleDraw;}
this.initScale=function(align){m_scaleDraw=new ScaleDraw();m_scaleDraw.setAlignment(align);var linearScaleEngine=new LinearScaleEngine();m_scaleDraw.setScaleDiv(linearScaleEngine.divideScale(0.0,100.0,10,5));}
if(typeof(align)==="undefined")
this.initScale(LeftScale);else
this.initScale(align);this.setTitle=function(title){if(m_title===title)
return;if(title!==""){if(m_title==="")
{if(this.alignment()===LeftScale||this.alignment()===RightScale){m_plot.getLayout().adjustLayout(m_domDiv,parseFloat(m_domDiv.css("width"))+m_titleFont.th);}else{m_plot.getLayout().adjustLayout(m_domDiv,parseFloat(m_domDiv.css("height"))+m_titleFont.th);}
Static.trigger("axisTitleAdded",true)}
m_title=title;}else{if(this.alignment()===LeftScale||this.alignment()===RightScale){m_plot.getLayout().adjustLayout(m_domDiv,parseFloat(m_domDiv.css("width"))-m_titleFont.th);}else{m_plot.getLayout().adjustLayout(m_domDiv,parseFloat(m_domDiv.css("height"))-m_titleFont.th);}
m_title="";Static.trigger("axisTitleAdded",false)}
m_plot.getLayout().updateLayout();}
this.title=function(){return m_title;}
this.setAlignment=function(alignment){if(m_scaleDraw)
m_scaleDraw.setAlignment(alignment);}
this.alignment=function(){if(m_scaleDraw==null)
return LeftScale;return m_scaleDraw.alignment();}
this.labelWidth=function(str){return m_scaleFont.textSize(str).width;}
this.draw=function(){var longestTick=m_scaleDraw.maxTickLength();var spacingBetweenLabelAndTick=m_scaleDraw.spacing();var spacingBetweenTitleAndLabel=10;var margin=10;if(m_scaleDraw.orientation()===Vertical){var longestLbl=this.labelWidth(m_scaleDraw.longestLabel());var titleWidth=m_title!==""?m_titleFont.th:0;var widgetWidth=longestTick+spacingBetweenLabelAndTick+longestLbl
+spacingBetweenTitleAndLabel+titleWidth+margin;m_plot.getLayout().adjustLayout(m_domDiv,widgetWidth);}
if(m_scaleDraw.orientation()===Horizontal){var titleHeight=m_title!==""?m_titleFont.th:0;var widgetHeight=longestTick+spacingBetweenLabelAndTick
+spacingBetweenTitleAndLabel+titleHeight+margin;m_plot.getLayout().adjustLayout(m_domDiv,widgetHeight);}
m_plot.getLayout().updateLayout()
var painter=new PaintUtil.Painter(this);painter.setFont(m_scaleFont);m_scaleDraw.draw(painter);if(m_title!==""){painter.setFont(m_titleFont);this.drawTitle(painter);}
painter=null}
this.drawTitle=function(painter){var canvasWidth=painter.canvasWidth();var canvasHeight=painter.canvasHeight();painter.save();painter.setFont(m_titleFont)
if(m_scaleDraw.alignment()===LeftScale){if(m_title!==""){painter.drawVerticalText(m_title,m_titleFont.th,canvasHeight/2);}}else if(m_scaleDraw.alignment()===RightScale){if(m_title!==""){painter.drawVerticalText(m_title,canvasWidth-m_titleFont.th,canvasHeight/2,true);}}else if(m_scaleDraw.alignment()===BottomScale){if(m_title!==""){painter.drawText(m_title,canvasWidth/2,canvasHeight-2,"center");}}else if(m_scaleDraw.alignment()===TopScale){if(m_title!==""){painter.drawText(m_title,canvasWidth/2,m_titleFont.th,"center");}}
painter.restore();}
this.setScaleDiv=function(scaleDiv){if(m_scaleDraw.scaleDiv()!==scaleDiv){m_scaleDraw.setScaleDiv(scaleDiv);Static.trigger('scaleDivChanged')}}
Static.bind('scaleDivChanged',this.scaleChange)
this.setTransformation=function(trans){m_scaleDraw.setTransformation(trans);}
this.toString=function(){return'[ScaleWidget]';}}}
ScaleWidget.prototype.scaleChange=function(){};define("scaleWidget",["static","widget"],function(){});var AxisData=function(){this.axisName="";this.isEnabled=false;this.doAutoScale=true;this.minValue
this.maxValue
this.stepSize
this.maxMajor
this.maxMinor
this.isValid=true;this.scaleDiv=null;this.scaleEngine=null;this.scaleWidget=null;this.scaleDomDiv=null;this.canvas=null;this.toString=function(){return'[AxisData]';};}
function Plot(_plotDiv,pTitle){var plotDiv
if(!_plotDiv){plotDiv=$("#plotDiv")}else{plotDiv=_plotDiv}
var self=this;var m_plotItemStore=[];var d_axisData=[];var _title="";var m_footer="";var legendEnable=false;var m_cursor=""
var m_defaultCursor="";var m_autoReplot=false;var m_legend=null;var m_legendFont=new Misc.Font;this.zoomer=null;this.panner=null;this.setLegendFont=function(font){m_legendFont=font;}
this.legendFont=function(){return m_legendFont;}
this.autoRefresh=function(){if(m_autoReplot){this.replot();}}
this.setAutoReplot=function(tf){m_autoReplot=tf;}
this.autoReplot=function(){return m_autoReplot;}
this.plotItemStore=function(){return m_plotItemStore;}
var m_titleFont=new Misc.Font(12);var m_footerFont=new Misc.Font(12);var layout=new Layout(plotDiv,this);this.getLayout=function(){return layout;}
this.axisInterval=function(axisId){if(!this.axisValid(axisId))
return new Interval();return d_axisData[axisId].scaleDiv.interval();}
this.setAxisDecimalPlaces=function(axisId,places){if(!this.axisValid(axisId))
return;this.axisScaleDraw(axisId).setDecimalPlaces(places);this.autoRefresh();}
this.setNonExponentNotationLimits=function(lower,upper){for(var axisId=0;axisId<axisCnt;++axisId){this.axisScaleDraw(axisId).setNonExponentLimits(lower,upper);}
this.autoRefresh();}
this.axisDecimalPlaces=function(axisId){if(!this.axisValid(axisId))
return 3;return this.axisScaleDraw(axisId).decimalPlaces();}
var centralWidget=new Widget(layout.getCentralDiv())
var titleWidget=new Widget(layout.getTitleDiv())
var footerWidget=new Widget(layout.getFooterDiv())
centralWidget.plot=this;this.getCentralWidget=function(){return centralWidget;}
this.getTitleWidget=function(){return titleWidget;}
this.getFooterWidget=function(){return footerWidget;}
this.initAxesData=function(){var axisId;for(axisId=0;axisId<axisCnt;axisId++)
d_axisData[axisId]=new AxisData();d_axisData[yLeft].axisName="AxisYLeft";d_axisData[yRight].axisName="AxisYRight";d_axisData[xTop].axisName="AxisXTop";d_axisData[xBottom].axisName="AxisXBottom";d_axisData[yLeft].scaleDomDiv=layout.getScaleDivElement(yLeft);d_axisData[yRight].scaleDomDiv=layout.getScaleDivElement(yRight);d_axisData[xTop].scaleDomDiv=layout.getScaleDivElement(xTop);d_axisData[xBottom].scaleDomDiv=layout.getScaleDivElement(xBottom);d_axisData[yLeft].scaleWidget=new ScaleWidget(this,layout.getScaleDivElement(yLeft),LeftScale);d_axisData[yRight].scaleWidget=new ScaleWidget(this,layout.getScaleDivElement(yRight),RightScale);d_axisData[xTop].scaleWidget=new ScaleWidget(this,layout.getScaleDivElement(xTop),TopScale);d_axisData[xBottom].scaleWidget=new ScaleWidget(this,layout.getScaleDivElement(xBottom),BottomScale);for(axisId=0;axisId<axisCnt;axisId++){var d=d_axisData[axisId];d.scaleEngine=new LinearScaleEngine();d.scaleWidget.setTransformation(d.scaleEngine.transformation());d.doAutoScale=true;d.minValue=0.0;d.maxValue=1000.0;d.stepSize=0.0;d.maxMinor=5;d.maxMajor=8;d.isValid=false;}
d_axisData[yLeft].isEnabled=true;d_axisData[yRight].isEnabled=true;d_axisData[xBottom].isEnabled=true;d_axisData[xTop].isEnabled=true;}
this.axisMaxMinor=function(axisId){if(this.axisValid(axisId))
return d_axisData[axisId].maxMinor;return 0;}
this.axisMaxMajor=function(axisId){if(this.axisValid(axisId))
return d_axisData[axisId].maxMajor;return 0;}
this.setAxisMaxMinor=function(axisId,maxMinor){if(this.axisValid(axisId)){var maxMinor=Static.qBound(0,maxMinor,100);var d=d_axisData[axisId];if(maxMinor!=d.maxMinor)
{d.maxMinor=maxMinor;d.isValid=false;this.autoRefresh();}}}
this.setAxisMaxMajor=function(axisId,maxMajor)
{if(this.axisValid(axisId))
{var maxMajor=Static.qBound(1,maxMajor,10000);var d=d_axisData[axisId];if(maxMajor!=d.maxMajor)
{d.maxMajor=maxMajor;d.isValid=false;this.autoRefresh();}}}
this.axisValid=function(axisId){return((axisId>=yLeft)&&(axisId<axisCnt));}
this.setAxisScaleEngine=function(axisId,engine){if(this.axisValid(axisId)&&engine!==null){var d=d_axisData[axisId];d.scaleEngine=engine;d_axisData[axisId].scaleWidget.setTransformation(engine.transformation());d.isValid=false;this.autoRefresh();}}
this.legend=function(){return m_legend;}
this.insertLegend=function(legend)
{m_legend=legend;m_legend.setLegendDiv(layout.getLegendDiv());m_legend.setPlot(this);for(var i=0;i<m_plotItemStore.length;++i){this.insertLegendItem(m_plotItemStore[i]);}}
this.insertLegendItem=function(plotItem,rowNumber){if(m_legend===null||plotItem==null)
return;if(plotItem.testItemAttribute(Legend)){m_legend.addItem(plotItem,rowNumber);}
if(!m_legend.isEmpty()){if(legendEnable){layout.getLegendDiv().show();}}}
this.removeLegendItem=function(plotItem){if(m_legend===null)
return;var rowNumber=m_legend.removeItem(plotItem);if(m_legend.isEmpty()){layout.getLegendDiv().hide();}
return rowNumber}
this.updateLegend=function(plotItem){if(plotItem==null)
return;if(plotItem.testItemAttribute(Legend)){var rowNumber=this.removeLegendItem(plotItem)
this.insertLegendItem(plotItem,rowNumber)}}
this.axisScaleEngine=function(axisId){if(this.axisValid(axisId))
return d_axisData[axisId].scaleEngine;else
return null;}
this.setAxisAutoScale=function(axisId,on){if(this.axisValid(axisId)&&(d_axisData[axisId].doAutoScale!==on)){d_axisData[axisId].doAutoScale=on;this.autoRefresh();}}
this.axisAutoScale=function(axisId){if(this.axisValid(axisId))
return d_axisData[axisId].doAutoScale;else
return false;}
this.setAxisScale=function(axisId,min,max,stepSize){var step=0
if(typeof(stepSize)!=="undefined")
step=stepSize;if(this.axisValid(axisId)){var d=d_axisData[axisId];d.doAutoScale=false;d.isValid=false;d.minValue=min;d.maxValue=max;d.stepSize=step;Static.trigger("rescaled")
this.autoRefresh();}}
this.enableAxis=function(axisId,tf){if(this.axisValid(axisId)&&tf!==d_axisData[axisId].isEnabled){d_axisData[axisId].isEnabled=tf;if(tf)
d_axisData[axisId].scaleDomDiv.show();else
d_axisData[axisId].scaleDomDiv.hide();this.autoRefresh();}}
this.axisEnabled=function(axisId){if(this.axisValid(axisId))
return d_axisData[axisId].isEnabled;else
return false;}
this.setAxisTitle=function(axisId,title){if(this.axisValid(axisId)){d_axisData[axisId].scaleWidget.setTitle(title);this.autoRefresh();}}
this.axisTitle=function(axisId){if(this.axisValid(axisId))
return d_axisData[axisId].scaleWidget.title();else
return"";}
this.axisScaleDiv=function(axisId){return d_axisData[axisId].scaleDiv;}
this.setAxisScaleDiv=function(axisId,scaleDiv){if(this.axisValid(axisId)){d=d_axisData[axisId];d.doAutoScale=false;d.scaleDiv=scaleDiv;d.isValid=true;this.autoRefresh();}}
this.axisScaleDraw=function(axisId){if(!this.axisValid(axisId))
return null;return this.axisWidget(axisId).scaleDraw();}
this.setAxisLabelFont=function(axisId,fontObj){if(this.axisValid(axisId)){this.axisWidget(axisId).setLabelFont(fontObj);this.autoRefresh();}}
this.axisLabelFont=function(axisId){if(this.axisValid(axisId))
return this.axisWidget(axisId).labelFont();return null;}
this.setAxisTitleFont=function(axisId,fontObj){if(this.axisValid(axisId)){this.axisWidget(axisId).setTitleFont(fontObj);this.autoRefresh();}}
this.axisTitleFont=function(axisId){if(this.axisValid(axisId))
return this.axisWidget(axisId).titleFont();return null;}
this.initAxesData();this.isCursorSet=function(){return m_cursor!=="";}
this.cursor=function(cursor){return m_cursor;}
this.setCursor=function(cursor){if(cursor==m_cursor)
return;m_cursor=cursor;layout.getCentralDiv().css("cursor",m_cursor)}
this.setDefaultCursor=function(cursor){if(m_defaultCursor==cursor)
return;m_defaultCursor=cursor;}
this.unsetCursor=function(){if(m_defaultCursor==m_cursor)
return;m_cursor=m_defaultCursor;layout.getCentralDiv[0].style.cursor=m_cursor;}
this.title=function(){return _title;}
this.hideTitle=function(){if(_title=="")
return
layout.getTitleDiv().hide();layout.updateLayout();this.autoRefresh();}
this.showTitle=function(){if(_title=="")
return
layout.getTitleDiv().show();layout.updateLayout();this.autoRefresh();}
this.setTitle=function(ttl){if(_title!==ttl){_title=ttl;if(ttl.trim(" ").length==0)
_title="";if(_title!==""){layout.getTitleDiv().show();Static.trigger("titleAdded",true)}else{layout.getTitleDiv().hide();Static.trigger("titleAdded",false)}
layout.updateLayout();this.autoRefresh();}}
this.setTitleFont=function(fontObj){if(fontObj.th<0||fontObj.name===""||fontObj.style==="")
return;m_titleFont=fontObj;layout.adjustLayout(layout.getTitleDiv(),fontObj.th*2);this.autoRefresh();}
this.setTitleFont(new Misc.Font(20,"Arial","normal","bold"))
this.titleFont=function(){return m_titleFont;}
this.footer=function(){return m_footer;}
this.hideFooter=function(){if(m_footer=="")
return
layout.getFooterDiv().hide();layout.updateLayout();this.autoRefresh();}
this.showFooter=function(){if(m_footer=="")
return
layout.getFooterDiv().show();layout.updateLayout();this.autoRefresh();}
this.setFooter=function(ftr){if(m_footer!==ftr){m_footer=ftr;if(m_footer!==""){layout.getFooterDiv().show();Static.trigger("footerAdded",true)}else{layout.getFooterDiv().hide();Static.trigger("footerAdded",false)}
layout.updateLayout();this.autoRefresh();}}
this.setFooterFont=function(fontObj){if(fontObj.th<0||fontObj.name===""||fontObj.style==="")
return;m_footerFont=fontObj;layout.adjustLayout(layout.getFooterDiv(),fontObj.th*2);this.autoRefresh();}
this.setFooterFont(new Misc.Font(15,"Arial","normal","bold"))
this.footerFont=function(){return m_footerFont;}
this.enableLegend=function(on){legendEnable=on;if(!m_legend||m_legend.isEmpty())
return;if(on){layout.getLegendDiv().show();}else{layout.getLegendDiv().hide();}
this.autoRefresh();}
this.isLegendEnabled=function(on){return!(layout.getLegendDiv()[0].style.display=='none');}
this.invTransform=function(axisId,pos){if(this.axisValid(axisId))
return(this.canvasMap(axisId).invTransform(pos));else
return 0.0;}
this.transform=function(axisId,value){if(this.axisValid(axisId))
return(this.canvasMap(axisId).transform(value));else
return 0.0;}
var _plotBackGround="";this.setPlotBackground=function(color){this.getCentralWidget().getElement().css("background-color",color);}
this.setPlotBackground("rgb(238, 232, 170)")
this.plotBackground=function(brush){return this.getCentralWidget().getElement().css("background-color");}
this.setBorderRadius=function(radius){var cw=this.getCentralWidget()
cw.getCanvas().css("border-radius",radius)}
this.borderRadius=function(radius){return m_borderRadius;}
this.findPlotCurve=function(title){var list=this.itemList(Static.Rtti_PlotCurve)
for(var i=0;i<list.length;++i){if(list[i].title()===title)
return list[i];}
return null;}
this.hasPlotCurve=function(){return this.itemList(Static.Rtti_PlotCurve).length>0}
this.drawBackGround=function(){var painter=new PaintUtil.Painter(centralWidget);painter.fillRect(new Misc.Rect(0,0,centralWidget.width(),centralWidget.height()),_plotBackGround);painter=null}
this.drawTitle=function(){if(_title==="")
return;var painter=new PaintUtil.Painter(titleWidget);painter.setFont(m_titleFont);painter.drawText(_title,titleWidget.width()/2,2.6*m_titleFont.th/2,"center");painter=null}
this.drawFooter=function(){if(m_footer==="")
return;var painter=new PaintUtil.Painter(footerWidget);painter.setFont(m_footerFont);painter.drawText(m_footer,footerWidget.width()/2,2.6*m_footerFont.th/2,"center");painter=null}
this.itemList=function(type){if(typeof(type)==='undefined')
return m_plotItemStore;var list=[];for(var i=0;i<m_plotItemStore.length;++i){var item=m_plotItemStore[i];if(item.rtti===type)
list.push(item);}
return list;}
this.insertItem=function(item){m_plotItemStore.push(item);}
this.removeItem=function(item){var index=m_plotItemStore.indexOf(item);if(index>-1){m_plotItemStore.splice(index,1);}}
this.canvasMap=function(axisId){var map=new ScaleMap();map.setTransformation(this.axisScaleEngine(axisId).transformation());var sd=this.axisScaleDiv(axisId);map.setScaleInterval(sd.lowerBound(),sd.upperBound());if(1){var s=this.axisWidget(axisId);if(axisId==yLeft||axisId==yRight){var h=s.height();map.setPaintInterval(h,0);}else{var w=s.width();map.setPaintInterval(0,w);}}
return map;}
this.axisWidget=function(axisId){if(this.axisValid(axisId))
return d_axisData[axisId].scaleWidget;return null;}
this.updateAxes=function(){var intv=[new Interval(Number.MAX_VALUE,-Number.MAX_VALUE),new Interval(Number.MAX_VALUE,-Number.MAX_VALUE),new Interval(Number.MAX_VALUE,-Number.MAX_VALUE),new Interval(Number.MAX_VALUE,-Number.MAX_VALUE)];for(i=0;i<m_plotItemStore.length;++i){var item=m_plotItemStore[i];if(!item.testItemAttribute(AutoScale))
continue;if(!item.isVisible())
continue;if(this.axisAutoScale(item.xAxis())||this.axisAutoScale(item.yAxis())){var rect=item.boundingRect();if(rect.width()>=0.0){if(rect.left()<intv[item.xAxis()].minValue())
intv[item.xAxis()].setMinValue(rect.left());if(rect.right()>intv[item.xAxis()].maxValue())
intv[item.xAxis()].setMaxValue(rect.right());}
if(rect.height()>=0.0){if(rect.top()<intv[item.yAxis()].minValue())
intv[item.yAxis()].setMinValue(rect.top());if(rect.bottom()>intv[item.yAxis()].maxValue())
intv[item.yAxis()].setMaxValue(rect.bottom());}}}
for(var axisId=0;axisId<axisCnt;axisId++){var d=d_axisData[axisId];var minValue=d.minValue;var maxValue=d.maxValue;var stepSize=d.stepSize;if(d.doAutoScale&&intv[axisId].isValid()){d.isValid=false;minValue=intv[axisId].minValue();maxValue=intv[axisId].maxValue();var xValues={"x1":minValue,"x2":maxValue};d.scaleEngine.autoScale(d.maxMajor,xValues,stepSize);minValue=xValues["x1"];maxValue=xValues["x2"];}
if(!d.isValid){d.scaleDiv=d.scaleEngine.divideScale(minValue,maxValue,d.maxMajor,d.maxMinor,stepSize);d.isValid=true;}
var scaleWidget=this.axisWidget(axisId);scaleWidget.setScaleDiv(d.scaleDiv);var startAndEndObj={start:undefined,end:undefined}
scaleWidget.getBorderDistHint(startAndEndObj);scaleWidget.setBorderDist(startAndEndObj.start,startAndEndObj.end);}
for(var i=0;i<m_plotItemStore.length;++i){var item=m_plotItemStore[i];if(item.testItemInterest(ScaleInterest)){item.updateScaleDiv(this.axisScaleDiv(item.xAxis()),this.axisScaleDiv(item.yAxis()));}}}
this.attachItem=function(plotItem,on){if(on){this.insertItem(plotItem);if(plotItem.testItemAttribute(Legend)){this.insertLegendItem(plotItem);}}else{if(plotItem.testItemAttribute(Legend)){this.removeLegendItem(plotItem);}
this.removeItem(plotItem);}
Static.trigger("itemAttached",[plotItem,on])
if(!on)
plotItem=null
this.autoRefresh();}
this.replot=function(){this.updateAxes();for(var axisId=0;axisId<axisCnt;axisId++){var axisWidget=d_axisData[axisId].scaleWidget
axisWidget.scaleDraw().data.plotBorderWidth=parseFloat(this.getLayout().getCentralDiv().css("border-width"))
axisWidget.draw();}
this.drawTitle();this.drawFooter();for(var i=0;i<m_plotItemStore.length;++i){if(!m_plotItemStore[i].isVisible())
continue;m_plotItemStore[i].draw(this.axisScaleDraw(m_plotItemStore[i].xAxis()).scaleMap(),this.axisScaleDraw(m_plotItemStore[i].yAxis()).scaleMap());}
Static.trigger("replot")}
this.setAutoReplot(true)
layout.getTitleDiv().hide();if(typeof(pTitle)!=='undefined'){this.setTitle(pTitle)}
m_defaultCursor=layout.getCentralDiv().css("cursor");this.setCursor("crosshair");this.enableAxis(yRight,false);this.enableAxis(xTop,false);layout.getFooterDiv().hide();layout.getLegendDiv().hide();Static.bind('resize',function(){self.replot();});this.setAutoReplot(false)
this.toString=function(){return'[Plot "'+_title+'"]';}
Static.bind("beforePrint",function(){self.replot()})};define("jQwtPlot",["static","widget","scaleWidget"],function(){});var ScaleDiv=function(arg1,arg2,arg3,arg4,arg5){var d_lowerBound=0.0;var d_upperBound=0.0;var d_ticks=[];if(typeof(arg1)=='undefined'||typeof(arg2)=='undefined'){}else if((typeof(arg3)=='undefined')&&((typeof(arg1)=='object')&&(typeof(arg2)=='object'))){var interval=arg1;var ticks=arg2;d_lowerBound=interval.minValue();d_upperBound=interval.maxValue();for(var i=0;i<NTickTypes;i++)
d_ticks[i]=ticks[i];}else if(typeof(arg4)=='undefined'){lowerBound=arg1;upperBound=arg2;ticks=arg3;d_lowerBound=lowerBound;d_upperBound=upperBound;for(i=0;i<NTickTypes;i++)
d_ticks[i]=ticks[i];}else if((typeof(arg1)=='undefined')&&(typeof(arg2)=='undefined')&&(typeof(arg3)=='undefined')&&(typeof(arg4)=='undefined')&&(typeof(arg5)=='undefined')){lowerBound=arg1;upperBound=arg2;minorTicks=arg3;mediumTicks=arg4;majorTicks=arg5;d_lowerBound=lowerBound;d_upperBound=upperBound;d_ticks[MinorTick]=minorTicks;d_ticks[MediumTick]=mediumTicks;d_ticks[MajorTick]=majorTicks;}
this.setInterval=function(arg1,arg2){if(typeof(arg1)=='number'&&typeof(arg2)=='number'){lowerBound=arg1;upperBound=arg2;d_lowerBound=lowerBound;d_upperBound=upperBound;}else if(typeof(arg1)=='object'&&typeof(arg2)=='undefined'){interval=arg1;d_lowerBound=interval.minValue();d_upperBound=interval.maxValue();}};this.interval=function(){return new Interval(d_lowerBound,d_upperBound);};this.setLowerBound=function(lowerBound){d_lowerBound=lowerBound;};this.lowerBound=function(){return d_lowerBound;};this.setUpperBound=function(upperBound){d_upperBound=upperBound;};this.upperBound=function(){return d_upperBound;};this.range=function(){return d_upperBound-d_lowerBound;};this.isEmpty=function(){return(d_lowerBound==d_upperBound);};this.isIncreasing=function(){return d_lowerBound<=d_upperBound;};this.contains=function(value){var min=Math.min(d_lowerBound,d_upperBound);var max=Math.max(d_lowerBound,d_upperBound);return value>=min&&value<=max;}
this.invert=function(){var temp=d_lowerBound;d_lowerBound=d_upperBound;d_upperBound=temp;for(i=0;i<NTickTypes;i++){var ticks=d_ticks[i];var size=ticks.count();var size2=size/2;for(j=0;j<size2;j++){temp=ticks[j];ticks[j]=ticks[size-1-j];ticks[size-1-j]=temp;}}};this.inverted=function(){var other=new ScaleDiv(d_lowerBound,d_upperBound);other.invert();return other;};this.bounded=function(lowerBound,upperBound){var min=Math.min(lowerBound,upperBound);var max=Math.max(lowerBound,upperBound);var sd=new ScaleDiv();sd.setInterval(lowerBound,upperBound);for(tickType=0;tickType<NTickTypes;tickType++){var ticks=d_ticks[tickType];var boundedTicks=[];for(i=0;i<ticks.size();i++){var tick=ticks[i];if(tick>=min&&tick<=max)
boundedTicks.push(tick);}
sd.setTicks(tickType,boundedTicks);}
return sd;};this.setTicks=function(type,ticks){if(type>=0&&type<NTickTypes)
d_ticks[type]=ticks;};this.ticks=function(type){if(type>=0&&type<NTickTypes)
return d_ticks[type];return[];};};ScaleDiv.prototype.toString=function(){return'[ScaleDiv]';};define("scaleDiv",function(){});function Interval(minValue,maxValue,borderFlags){var d_minValue=0.0;var d_maxValue=-1.0;var d_borderFlags=IncludeBorders;if(typeof(minValue)!=='undefined'&&typeof(maxValue)!=='undefined'){d_minValue=minValue;d_maxValue=maxValue;}
if(typeof(borderFlags)!=='undefined')
d_borderFlags=borderFlags;this.toString=function(){return'[Interval]';};this.setInterval=function(minValue,maxValue,borderFlags){d_minValue=minValue;d_maxValue=maxValue;d_borderFlags=borderFlags;}
this.setBorderFlags=function(borderFlags){d_borderFlags=borderFlags;}
this.borderFlags=function(){return d_borderFlags;}
this.setMinValue=function(minValue){d_minValue=minValue;}
this.setMaxValue=function(maxValue){d_maxValue=maxValue;}
this.minValue=function(){return d_minValue;}
this.maxValue=function(){return d_maxValue;}
this.isValid=function(){if((d_borderFlags&ExcludeBorders)===0)
return d_minValue<=d_maxValue;else
return d_minValue<d_maxValue;}
this.width=function(){return this.isValid()?(d_maxValue-d_minValue):0.0;}
this.isNull=function(){return this.isValid()&&d_minValue>=d_maxValue;}
this.invalidate=function(){d_minValue=0.0;d_maxValue=-1.0;}
this.normalized=function(){if(d_minValue>d_maxValue){return this.inverted();}
if(d_minValue==d_maxValue&&d_borderFlags==ExcludeMinimum){return this.inverted();}
return this;}
this.inverted=function(){var borderFlags=IncludeBorders;if(d_borderFlags&ExcludeMinimum)
borderFlags|=ExcludeMaximum;if(d_borderFlags&ExcludeMaximum)
borderFlags|=ExcludeMinimum;return new Interval(d_maxValue,d_minValue,borderFlags);}
this.contains=function(value){if(!this.isValid())
return false;if(value<d_minValue||value>d_maxValue)
return false;if(value==d_minValue&&d_borderFlags&ExcludeMinimum)
return false;if(value==d_maxValue&&d_borderFlags&ExcludeMaximum)
return false;return true;}
this.limited=function(lowerBound,upperBound){if(!this.isValid()||lowerBound>upperBound)
return new Interval();var minValue=Math.max(d_minValue,lowerBound);minValue=Math.min(minValue,upperBound);var maxValue=Math.max(d_maxValue,lowerBound);maxValue=Math.min(maxValue,upperBound);return new Interval(minValue,maxValue,d_borderFlags);}};;define("interval",function(){});var Transform=function(){}
Transform.prototype.toString=function(){return'[Transform]';}
Transform.prototype.bounded=function(value){return value;}
var NullTransform=function(){Transform.call(this);}
NullTransform.prototype=Object.create(Transform.prototype);NullTransform.prototype.constructor=NullTransform;NullTransform.prototype.toString=function(){return'[NullTransform]';}
NullTransform.prototype.transform=function(value){return value;}
NullTransform.prototype.invTransform=function(value){return value;}
NullTransform.prototype.copy=function(){return new NullTransform();}
var LogTransform=function(){Transform.call(this);}
LogTransform.prototype=Object.create(Transform.prototype);LogTransform.prototype.constructor=LogTransform;LogTransform.prototype.toString=function(){return'[LogTransform]';}
LogTransform.prototype.transform=function(value){return Math.log(value);}
LogTransform.prototype.invTransform=function(value){return Math.exp(value);}
LogTransform.prototype.bounded=function(value){if(value>Number.MAX_VALUE)
return Number.MAX_VALUE;if(value<Number.MIN_VALUE)
return Number.MIN_VALUE;return value;}
LogTransform.prototype.copy=function(){return new LogTransform();}
var PowerTransform=function(exponent){Transform.call(this);this.d_exponent=exponent;}
PowerTransform.prototype=Object.create(Transform.prototype);PowerTransform.prototype.constructor=PowerTransform;PowerTransform.prototype.toString=function(){return'[PowerTransform]';}
PowerTransform.prototype.transform=function(value){if(value<0.0)
return-Math.pow(-value,1.0/d_exponent);else
return Math.pow(value,1.0/d_exponent);}
PowerTransform.prototype.invTransform=function(value){if(value<0.0)
return-Math.pow(-value,d_exponent);else
return Math.pow(value,d_exponent);}
PowerTransform.prototype.copy=function(){return new PowerTransform(d_exponent);};define("transform",function(){});Static.mTransformPath=function(xMap,yMap,path,doAlign){var shape=new Misc.MPath;for(var i=0;i<path.elementCount();i++){var element=path.elementAt(i);var x=xMap.transform(element.x);var y=yMap.transform(element.y);switch(element.type){case MoveToElement:{if(doAlign){x=Math.round(x);y=Math.round(y);}
shape.moveTo(x,y);break;}
case LineToElement:{if(doAlign){x=Math.round(x);y=Math.round(y);}
shape.lineTo(x,y);break;}
case CurveToElement:{var element1=path.elementAt(++i);var x1=xMap.transform(element1.x);var y1=yMap.transform(element1.y);var element2=path.elementAt(++i);var x2=xMap.transform(element2.x);var y2=yMap.transform(element2.y);shape.cubicTo(x,y,x1,y1,x2,y2);break;}
case CurveToDataElement:{break;}}}
return shape;}
Static.mInvTransform=function(xMap,yMap,rect){var x1=xMap.invTransform(rect.left());var x2=xMap.invTransform(rect.right()-1);var y1=yMap.invTransform(rect.top());var y2=yMap.invTransform(rect.bottom()-1);var r=new Misc.Rect(new Misc.Point(x1,y1),x2-x1,y2-y1);return r.normalized();}
Static.mTransform=function(xMap,yMap,rect){var x1=xMap.transform(rect.left());var x2=xMap.transform(rect.right())
var y1=yMap.transform(rect.top());var y2=yMap.transform(rect.bottom())
var r=new Misc.Rect(new Misc.Point(x1,y1),x2-x1,y2-y1);return r.normalized();}
function ScaleMap(){var d_s1=0.0;var d_s2=1.0;var d_p1=0.0;var d_p2=1.0;var d_cnv=1.0;var d_ts1=0.0;var d_transform=null;this.setTransformation=function(trans){if(trans!==d_transform){d_transform=trans;}
this.setScaleInterval(d_s1,d_s2);}
this.transformation=function(){return d_transform;}
this.setScaleInterval=function(s1,s2){d_s1=s1;d_s2=s2;if(d_transform){d_s1=d_transform.bounded(d_s1);d_s2=d_transform.bounded(d_s2);}
this.updateFactor();}
this.setPaintInterval=function(p1,p2){d_p1=p1;d_p2=p2;this.updateFactor();}
this.updateFactor=function(){d_ts1=d_s1;var ts2=d_s2;if(d_transform){d_ts1=d_transform.transform(d_ts1);ts2=d_transform.transform(ts2);}
d_cnv=1.0;if(d_ts1!=ts2){d_cnv=(d_p2-d_p1)/(ts2-d_ts1);}}
this.invTransform=function(xMap,yMap,pos){if(typeof(yMap)==="undefined")
return this.invTransform1(xMap);return new Misc.Point(xMap.invTransform1(pos.x),yMap.invTransform1(pos.y));}
this.transform=function(xMap,yMap,pos){if(typeof(yMap)==="undefined")
return this.transform1(xMap);return{x:xMap.transform1(pos.x),y:yMap.transform1(pos.y)};}
this.transform1=function(s){if(d_transform){s=d_transform.transform(s);}
return d_p1+(s-d_ts1)*d_cnv;}
this.invTransform1=function(p){var s=d_ts1+(p-d_p1)/d_cnv;if(d_transform)
s=d_transform.invTransform(s);return s;}
this.toString=function(){return'[ScaleMap "'+d_cnv+'"]';}};define("scaleMap",["static","transform"],function(){});function PlotItem(tle){var self=this;this.plotId="";var _context=null;var _plot=null;var cnvs=null;var d_interests
var m_domDiv=$("#centralDiv");var m_isVisible=true;var m_attributes=0x0;var m_z=0.0;var m_xAxis=xBottom;var m_yAxis=yLeft;var m_title=tle||"";this.rtti=Static.Rtti_PlotItem;var m_legendIconSize=new Misc.Size(10,10);this.getLegendIconSize=function(){return m_legendIconSize;}
this.setLegendIconSize=function(size){{m_legendIconSize=size;if(_plot)
_plot.updateLegend(this)}}
this.setItemInterest=function(interest,on){{if(on)
d_interests|=interest;else
d_interests&=~interest;this.itemChanged();}}
this.testItemInterest=function(interest){return d_interests&interest;}
this.plot=function(){return _plot;}
this.title=function(){return m_title;}
this.setTitle=function(tle){if(m_title!==tle){m_title=tle;this.legendChanged();this.itemChanged()}}
this.attach=function(plot){if(plot==_plot){return;}
if(_plot){this.getContext().clearRect(0,0,cnvs[0].width,cnvs[0].height);cnvs.hide()
cnvs=null
_plot.attachItem(this,false);}
_plot=plot;if(_plot){if(cnvs===null){cnvs=$('<canvas />').attr({style:"position: absolute; background-color: transparent"});_plot.getLayout().getCentralDiv().append(cnvs);cnvs.css({"border-radius":"inherit"});if(m_z!=0){cnvs.css("zIndex",m_z);}}
_plot.attachItem(this,true);}}
this.detach=function(){this.attach(null);}
this.setZ=function(z){if(m_z!==z){m_z=z;if(cnvs){cnvs.css("zIndex",m_z)}
this.itemChanged()}}
this.getZ=function(z){return m_z}
this.getCanvas=function(){return cnvs;}
this.syncSizes=function(){var cd=_plot.getLayout().getCentralDiv()
cnvs[0].width=parseFloat(cd.css("width"));cnvs[0].height=parseFloat(cd.css("height"));}
this.getContext=function(){this.syncSizes();return cnvs[0].getContext("2d");};this.setAxes=function(xAxis,yAxis){if(xAxis==xBottom||xAxis==xTop)
m_xAxis=xAxis;if(yAxis==yLeft||yAxis==yRight)
m_yAxis=yAxis;this.itemChanged();}
this.setItemAttribute=function(attribute,on){if(on)
m_attributes|=attribute;else
m_attributes&=~attribute;if(attribute==Legend)
this.legendChanged();this.itemChanged();}
this.testItemAttribute=function(attribute){return m_attributes&attribute;}
this.show=function(){this.setVisible(true);}
this.hide=function(){this.setVisible(false);}
this.setVisible=function(on){if(on!==m_isVisible){m_isVisible=on;if(!on)
cnvs.hide();else
cnvs.show();this.itemChanged();Static.trigger("visibilityChange",[this,on])}}
this.isVisible=function(){return m_isVisible;}
this.itemChanged=function(){if(_plot)
_plot.autoRefresh();}
this.legendChanged=function()
{if(this.testItemAttribute(Legend)&&_plot)
_plot.updateLegend(this);}
this.setXAxis=function(axis){if(axis==xBottom||axis==xTop){m_xAxis=axis;this.itemChanged();}}
this.setYAxis=function(axis){if(axis==yLeft||axis==yRight){m_yAxis=axis;this.itemChanged();}}
this.xAxis=function(){return m_xAxis;}
this.yAxis=function(){return m_yAxis;}
this.getCanvasRect=function(){this.syncSizes();return new Misc.Rect(new Misc.Point(),cnvs[0].width,cnvs[0].height);}};PlotItem.prototype.boundingRect=function(){return new Misc.Rect();}
PlotItem.prototype.draw=function(xMap,yMap){};PlotItem.prototype.legendIconSize=function(){return this.getLegendIconSize();}
PlotItem.prototype.legendIcon=function(index,size){return null;}
PlotItem.prototype.defaultIcon=function(brush,size){var icon=null;if(size.width>0&&size.height>0){var r=new Misc.Rect(0,0,size.width,size.height);icon=new GraphicUtil.Graphic(null,size.width+1,size.height+1)
var painter=new GraphicPainter(icon);painter.fillRect(r,brush);}
return icon;}
PlotItem.prototype.legendData=function(){var data=new LegendData;var titleValue=this.title();data.setValue(Static.TitleRole,titleValue);var iconValue=this.legendIcon(0,this.legendIconSize());if(iconValue){data.setValue(Static.IconRole,iconValue);}
return[data];};PlotItem.prototype.toString=function(){return'[PlotItem "'+this.plotId+'"]';};define("plotItem",["static"],function(){});var Layout=function(plotDiv,plot){var plt=plot;var leftOfLeftScaleDiv=0;var topOfCentralDiv=0;var bottomOfCentralDiv=0;var rightOfCentralDiv=0;var leftOfCentralDiv=0;var rightOfRightScaleDiv=0;var rightOfLegendDiv=0;var bottomOfBottomScaleDiv=0;var bottomOfFooterDiv=0;var topOfTopScaleDiv=0;if(!plotDiv)
return
if(plotDiv.parent()[0]===document.body){plotDiv.css("position","absolute");}
var titleDiv=$('<div />').attr({id:"titleDiv"});plotDiv.append(titleDiv);if(titleDiv.css("top")!=="auto");var topScaleDiv=$('<div />').attr({id:"topScaleDiv"});plotDiv.append(topScaleDiv);if(topScaleDiv.css("top")!=="auto")
topOfTopScaleDiv=parseFloat(topScaleDiv.css("top"))
var leftScaleDiv=$('<div />').attr({id:"leftScaleDiv"});plotDiv.append(leftScaleDiv);if(leftScaleDiv.css("left")!=="auto")
leftOfLeftScaleDiv=parseFloat(leftScaleDiv.css("left"))
var centralDiv=$('<div />').attr({id:"centralDiv"});plotDiv.append(centralDiv);if(centralDiv.css("top")!=="auto")
topOfCentralDiv=parseFloat(centralDiv.css("top"));if(centralDiv.css("bottom")!=="auto")
bottomOfCentralDiv=parseFloat(centralDiv.css("bottom"))
if(centralDiv.css("right")!=="auto")
rightOfCentralDiv=parseFloat(centralDiv.css("right"))
if(centralDiv.css("left")!=="auto")
leftOfCentralDiv=parseFloat(centralDiv.css("left"))
this.getCentralDiv=function(){return centralDiv;}
var rightScaleDiv=$('<div />').attr({id:"rightScaleDiv"});plotDiv.append(rightScaleDiv);if(rightScaleDiv.css("right")!=="auto")
rightOfRightScaleDiv=parseFloat(rightScaleDiv.css("right"))
var legendDiv=$('<div/>').attr({id:"legendDiv"});plotDiv.append(legendDiv);if(legendDiv.css("right")!=="auto")
rightOfLegendDiv=parseFloat(legendDiv.css("right"))
var bottomScaleDiv=$('<div />').attr({id:"bottomScaleDiv"});plotDiv.append(bottomScaleDiv);if(bottomScaleDiv.css("bottom")!=="auto")
bottomOfBottomScaleDiv=parseFloat(bottomScaleDiv.css("bottom"))
var footerDiv=$('<div />').attr({id:"footerDiv"});plotDiv.append(footerDiv);if(footerDiv.css("bottom")!=="auto")
bottomOfFooterDiv=parseFloat(footerDiv.css("bottom"))
this.getLegendDiv=function(){return legendDiv;}
this.getTitleDiv=function(){return titleDiv;}
this.getFooterDiv=function(){return footerDiv;}
var scaleDivElement=[leftScaleDiv,rightScaleDiv,bottomScaleDiv,topScaleDiv]
this.getScaleDivElement=function(type){if(type<0||type>=axisCnt)
return null;return scaleDivElement[type];}
this.adjustLayout=function(domElement,newValue){var dim="width";if(domElement[0].id==="footerDiv"||domElement[0].id==="titleDiv"||domElement[0].id==="topScaleDiv"||domElement[0].id==="bottomScaleDiv")
dim="height";domElement.css(dim,newValue);}
function topScaleAndTitle(){var titleHeight=parseFloat(titleDiv.css("height"));var topScaleHeight=parseFloat(topScaleDiv.css("height"));legendDiv.css("top",titleHeight);topScaleDiv.css("top",titleHeight);centralDiv.css("top",titleHeight+topScaleHeight);leftScaleDiv.css("top",titleHeight+topScaleHeight);rightScaleDiv.css("top",titleHeight+topScaleHeight);}
function topScaleAndNotTitle(){var topScaleHeight=parseFloat(topScaleDiv.css("height"));legendDiv.css("top",0);topScaleDiv.css("top",0);centralDiv.css("top",topScaleHeight);leftScaleDiv.css("top",topScaleHeight);rightScaleDiv.css("top",topScaleHeight);}
function titleAndNotTopScale(){var titleHeight=parseFloat(titleDiv.css("height"));legendDiv.css("top",titleHeight);centralDiv.css("top",titleHeight);leftScaleDiv.css("top",titleHeight);rightScaleDiv.css("top",titleHeight);}
function notTitleAndNotTopScale(){legendDiv.css("top",0);centralDiv.css("top",0);leftScaleDiv.css("top",0);rightScaleDiv.css("top",0);}
function adjustForTitle(){var titleVisible=true
if(titleDiv.css('display')=='none')
titleVisible=false
if(plt.axisEnabled(xTop)){if(titleVisible){topScaleAndTitle();}else{topScaleAndNotTitle();}}
else{if(titleVisible){titleAndNotTopScale();}else{notTitleAndNotTopScale();}}}
function adjustForTopScale(){var titleVisible=true
if(titleDiv.css('display')=='none')
titleVisible=false
if(titleVisible){if(plt.axisEnabled(xTop)){topScaleAndTitle();}else{titleAndNotTopScale();}}
else{if(plt.axisEnabled(xTop)){topScaleAndNotTitle();}else{notTitleAndNotTopScale();}}}
function bottomScaleAndFooter(){var footerHeight=parseFloat(footerDiv.css("height"));var bottomScaleHeight=parseFloat(bottomScaleDiv.css("height"));legendDiv.css("bottom",footerHeight);bottomScaleDiv.css("bottom",footerHeight);centralDiv.css("bottom",footerHeight+bottomScaleHeight);leftScaleDiv.css("bottom",footerHeight+bottomScaleHeight);rightScaleDiv.css("bottom",footerHeight+bottomScaleHeight);}
function bottomScaleAndNotFooter(){var bottomScaleHeight=parseFloat(bottomScaleDiv.css("height"));legendDiv.css("bottom",0);bottomScaleDiv.css("bottom",0);centralDiv.css("bottom",bottomScaleHeight);leftScaleDiv.css("bottom",bottomScaleHeight);rightScaleDiv.css("bottom",bottomScaleHeight);}
function footerAndNotBottomtScale(){var footerHeight=parseFloat(footerDiv.css("height"));legendDiv.css("bottom",footerHeight);centralDiv.css("bottom",footerHeight);leftScaleDiv.css("bottom",footerHeight);rightScaleDiv.css("bottom",footerHeight);}
function notFooterAndNotBottomScale(){legendDiv.css("bottom",0);centralDiv.css("bottom",0);leftScaleDiv.css("bottom",0);rightScaleDiv.css("bottom",0);}
function adjustForFooter(){var footerVisible=true
if(footerDiv.css('display')=='none')
footerVisible=false
if(plt.axisEnabled(xBottom)){if(footerVisible){bottomScaleAndFooter();}else{bottomScaleAndNotFooter();}}
else{if(footerVisible){footerAndNotBottomtScale();}else{notFooterAndNotBottomScale();}}}
function adjustForBottomScale(){var footerVisible=true
if(footerDiv.css('display')=='none')
footerVisible=false
if(footerVisible){if(plt.axisEnabled(xBottom)){bottomScaleAndFooter();}else{footerAndNotBottomtScale();}}
else{if(plt.axisEnabled(xBottom)){bottomScaleAndNotFooter();}else{notFooterAndNotBottomScale();}}}
function rightScaleAndLegend(){var legendWidth=parseFloat(legendDiv.css("width"));var rightScaleWidth=parseFloat(rightScaleDiv.css("width"));titleDiv.css("right",legendWidth+rightScaleWidth+14+3);topScaleDiv.css("right",legendWidth+rightScaleWidth+14+3);footerDiv.css("right",legendWidth+rightScaleWidth+14+3);bottomScaleDiv.css("right",legendWidth+rightScaleWidth+14+3);legendDiv.css("right",3);centralDiv.css("right",legendWidth+rightScaleWidth+14+3);rightScaleDiv.css("right",legendWidth+14+3);}
function rightScaleAndNotLegend(){var rightScaleWidth=parseFloat(rightScaleDiv.css("width"));titleDiv.css("right",rightScaleWidth);topScaleDiv.css("right",rightScaleWidth);footerDiv.css("right",rightScaleWidth);bottomScaleDiv.css("right",rightScaleWidth);centralDiv.css("right",rightScaleWidth);rightScaleDiv.css("right",0);}
function legendAndNotRightScale(){var legendWidth=parseFloat(legendDiv.css("width"));centralDiv.css("right",legendWidth+3+14);titleDiv.css("right",legendWidth+3+14);topScaleDiv.css("right",legendWidth+3+14);footerDiv.css("right",legendWidth+3+14);bottomScaleDiv.css("right",legendWidth+3+14);legendDiv.css("right",3);}
function notLegendAndNotRightScale(){titleDiv.css("right",0);topScaleDiv.css("right",0);footerDiv.css("right",0);bottomScaleDiv.css("right",0);centralDiv.css("right",0);}
function adjustForLegend(){if(plt.legend())
legendDiv.css("width",plt.legend().legendDivWidth());if(plt.axisEnabled(yRight)){if(plt.isLegendEnabled()){rightScaleAndLegend();}else{rightScaleAndNotLegend();}}
else{if(plt.isLegendEnabled()){legendAndNotRightScale();}else{notLegendAndNotRightScale();}}}
function adjustForRightScale(){if(plt.isLegendEnabled()){if(plt.axisEnabled(yRight)){rightScaleAndLegend();}else{legendAndNotRightScale();}}
else{if(plt.axisEnabled(yRight)){rightScaleAndNotLegend();}else{notLegendAndNotRightScale();}}}
function adjustForLeftScale(){var leftScaleWidth=parseFloat(leftScaleDiv.css("width"));if(plt.axisEnabled(yLeft)){titleDiv.css("left",leftScaleWidth);topScaleDiv.css("left",leftScaleWidth);footerDiv.css("left",leftScaleWidth);bottomScaleDiv.css("left",leftScaleWidth);centralDiv.css("left",leftScaleWidth);}else{titleDiv.css("left",0);topScaleDiv.css("left",0);footerDiv.css("left",0);bottomScaleDiv.css("left",0);centralDiv.css("left",0);}}
this.updateLayout=function(){if(typeof(plt)==="undefined")
return;adjustForTitle();adjustForTopScale();adjustForFooter();adjustForBottomScale();adjustForLegend();adjustForRightScale();adjustForLeftScale();}
this.isLegendDivVisible=function(){if(legendDiv[0].style.display==="block")
return true;return false;}
this.setPlot=function(plot){plt=plot;}
this.toString=function(){return'[Layout]'}};define("layout",function(){});function AbstractScaleDraw(){var m_components=Backbone|Ticks|Labels;var m_tickLength=[];m_tickLength[MinorTick]=4.0;m_tickLength[MediumTick]=6.0;m_tickLength[MajorTick]=8.0;var m_map=new ScaleMap();var m_scaleDiv=null;var m_decimalPlaces=3;var m_nonExponentNotationLowerLimit=-10000;var m_nonExponentNotationUpperLimit=10000;var m_spacing=4;var m_penWidth=1;this.data={}
this.setNonExponentLimits=function(lower,upper){m_nonExponentNotationLowerLimit=lower;m_nonExponentNotationUpperLimit=upper;}
this.getNonExponentNotationLimits=function(){return{lower:m_nonExponentNotationLowerLimit,upper:m_nonExponentNotationUpperLimit}}
this.decimalPlaces=function(){return m_decimalPlaces}
this.setDecimalPlaces=function(places){m_decimalPlaces=places}
this.longestLabel=function(){var m_longestLabel="";var majorTicks=m_scaleDiv.ticks(MajorTick);var i;var v;var n=majorTicks.length-1;for(i=1;i<n;i++){v=majorTicks[i];if(m_scaleDiv.contains(v)){v=Static.adjustForDecimalPlaces(v,m_decimalPlaces)
if(v>m_nonExponentNotationUpperLimit||v<m_nonExponentNotationLowerLimit)
v=v.toExponential(m_decimalPlaces);if(v.toString().length>m_longestLabel.length)
m_longestLabel=v.toString();}}
return m_longestLabel;}
this.enableComponent=function(component,enable){if(enable)
m_components|=component;else
m_components&=~component;}
this.hasComponent=function(component){return(m_components&component);}
this.setScaleDiv=function(scaleDiv){m_scaleDiv=scaleDiv;m_map.setScaleInterval(m_scaleDiv.lowerBound(),m_scaleDiv.upperBound());}
this.setTransformation=function(trans){m_map.setTransformation(trans);}
this.scaleMap=function(){return m_map;}
this.scaleDiv=function(){return m_scaleDiv;}
this.setPenWidth=function(width){if(width<=0)
width=1;if(width!==m_penWidth)
m_penWidth=width;}
this.penWidth=function(){return m_penWidth;}
this.draw=function(painter){if(this.orientation()===Horizontal)
m_map.setPaintInterval(0,painter.canvasWidth());else
m_map.setPaintInterval(painter.canvasHeight(),0);if(this.hasComponent(Labels)){var majorTicks=m_scaleDiv.ticks(MajorTick);for(var i=0;i<majorTicks.length;i++){var v=majorTicks[i];if(m_scaleDiv.contains(v))
this.drawLabel(painter,v);}}
if(this.hasComponent(Ticks)){painter.save();painter.setPen(new Misc.Pen("grey",m_penWidth))
for(var tickType=MinorTick;tickType<NTickTypes;tickType++){var ticks=m_scaleDiv.ticks(tickType);for(i=0;i<ticks.length;i++){var v=ticks[i];if(m_scaleDiv.contains(v))
this.drawTick(painter,v,m_tickLength[tickType]);}}
painter.restore();}
if(this.hasComponent(Backbone)){painter.save();painter.setPen(new Misc.Pen("grey",m_penWidth))
this.drawBackbone(painter);painter.restore();}}
this.setSpacing=function(spacing){if(spacing<0)
spacing=0;m_spacing=spacing;}
this.spacing=function(){return m_spacing;}
this.setTickLength=function(tickType,length){if(tickType<MinorTick||tickType>MajorTick){return;}
if(length<0.0)
length=0.0;var maxTickLen=1000.0;if(length>maxTickLen)
length=maxTickLen;m_tickLength[tickType]=length;}
this.tickLength=function(tickType){if(tickType<MinorTick||tickType>MajorTick){return 0;}
return m_tickLength[tickType];}
this.maxTickLength=function(){var length=0.0;for(var i=0;i<NTickTypes;i++)
length=Math.max(length,m_tickLength[i]);return length;}
this.label=function(value){if(Static.mFuzzyCompare(value+1.0,1.0))
value=0.0;return value.toString();}}
AbstractScaleDraw.prototype.toString=function(){return'[AbstractScaleDraw]';};;define("abstractScaleDraw",function(){});ScaleDraw.inheritsFrom(AbstractScaleDraw);function ScaleDraw(){AbstractScaleDraw.call(this);var m_alignment=BottomScale;this.orientation=function(){if(m_alignment===TopScale||m_alignment===BottomScale)
return Horizontal;return Vertical;}
this.alignment=function(){return m_alignment;}
this.setAlignment=function(align){m_alignment=align;}
this.getBorderDistHint=function(font,startAndEndObj){}}
ScaleDraw.prototype.toString=function(){return'[ScaleDraw]';}
ScaleDraw.prototype.drawTick=function(painter,value,len){if(len<=0)
return;var bwAdjust=0
var tval=this.scaleMap().transform(value)+bwAdjust;var bb=this.hasComponent(Backbone);switch(this.alignment()){case LeftScale:{var x1=painter.canvasWidth();if(bb)
x1-=2;var x2=x1-len;painter.drawLine(x1,tval,x2,tval);break;}
case RightScale:{var x1=0;if(bb)
x1+=2;var x2=x1+len;painter.drawLine(x1,tval,x2,tval);break;}
case BottomScale:{var y1=0;if(bb)
y1+=2;var y2=y1+len;painter.drawLine(tval,y1,tval,y2);break;}
case TopScale:{var y1=painter.canvasHeight();if(bb)
y1-=2;var y2=y1-len;painter.drawLine(tval,y1,tval,y2);break;}}}
ScaleDraw.prototype.drawBackbone=function(painter){var off=0.5*painter.pen().width;var bb=this.hasComponent(Backbone);switch(this.alignment()){case LeftScale:{var x=painter.canvasWidth()-off;if(bb)
x-=2;painter.drawLine(x,0,x,painter.canvasHeight());break;}
case RightScale:{var x=off;if(bb)
x+=2;painter.drawLine(x,0,x,painter.canvasHeight());break;}
case TopScale:{var y=painter.canvasHeight()-off;if(bb)
y-=2;painter.drawLine(0,y,painter.canvasWidth(),y);break;}
case BottomScale:{var y=off;if(bb)
y+=2;painter.drawLine(0,y,painter.canvasWidth(),y);break;}}}
ScaleDraw.prototype.labelPosition=function(ctx,value){ctx.save();var tval=this.scaleMap().transform(value);var dist=this.spacing();if(this.hasComponent(Backbone))
dist+=1;if(this.hasComponent(Ticks))
dist+=this.tickLength(MajorTick);var bwAdjust=0
var px=0;var py=0;var th=ctx.measureText("M").width;switch(this.alignment()){case RightScale:{px=dist;py=tval+0.5*th+bwAdjust;break;}
case LeftScale:{px=ctx.canvas.width-dist;py=tval+0.5*th+bwAdjust;break;}
case BottomScale:{px=tval+bwAdjust;py=dist+th;break;}
case TopScale:{px=tval+bwAdjust;py=ctx.canvas.height-(dist);break;}}
ctx.restore();return new Misc.Point(px,py);}
ScaleDraw.prototype.drawLabel=function(painter,value){value=Static.adjustForDecimalPlaces(value,this.decimalPlaces())
var limits=this.getNonExponentNotationLimits()
if(value>limits.upper||value<limits.lower)
value=value.toExponential(this.decimalPlaces());var lbl=this.label(value);if(lbl==="")
return;var pos=this.labelPosition(painter.context(),value);if(this.orientation()==Horizontal&&(pos.x===0||pos.x==painter.canvasWidth()))
return;var tsz=painter.textSize(lbl);var th=tsz.height;if(this.orientation()==Vertical&&((Math.abs(pos.y-0.5*th-0)<th)||(Math.abs(pos.y-0.5*th-painter.canvasHeight())<th)))
return;var alignment="center";var maxTextLength="undefined";if(this.alignment()===LeftScale){alignment="right";maxTextLength="undefined";}else if(this.alignment()===RightScale){alignment="left";maxTextLength="undefined";}else{maxTextLength=painter.canvasWidth()/(this.scaleDiv().ticks(MajorTick).length-1)-5;var textWidth=tsz.width;if(textWidth>maxTextLength)
textWidth=maxTextLength;if((pos.x-textWidth/2)<0||(pos.x+textWidth/2)>painter.canvasWidth()){return;}}
painter.drawText(lbl,pos.x,pos.y,alignment,maxTextLength);};define("scaleDraw",["static"],function(){});Static.mLog=function(base,value){return Math.log(value)/Math.log(base);}
Static.mLogInterval=function(base,interval){return new Interval(Static.mLog(base,interval.minValue()),Static.mLog(base,interval.maxValue()));}
Static.mPowInterval=function(base,interval){return new Interval(Math.pow(base,interval.minValue()),Math.pow(base,interval.maxValue()));}
Static.mStepSize=function(intervalSize,maxSteps,base){if(maxSteps<=0)
return 0.0;if(maxSteps>2){for(var numSteps=maxSteps;numSteps>1;numSteps--){var stepSize=intervalSize/numSteps;var p=Math.floor(Math.log(stepSize)/Math.log(base));var fraction=Math.pow(base,p);for(var n=base;n>1;n/=2){if(Static.mFuzzyCompare(stepSize,n*fraction))
return stepSize;if(n===3&&(base%2)===0){if(Static.mFuzzyCompare(stepSize,2*fraction))
return stepSize;}}}}
return intervalSize*0.5;}
Static.divideInterval=function(intervalSize,numSteps,base){if(numSteps<=0)
return 0.0;var v=divideEps(intervalSize,numSteps);if(v===0.0)
return 0.0;var lx=Static.mLog(base,Math.abs(v));var p=Math.floor(lx);var fraction=Math.pow(base,lx-p);var n=base;while((n>1)&&(fraction<=n/2))
n/=2;var stepSize=n*Math.pow(base,p);if(v<0)
stepSize=-stepSize;return stepSize;}
function ceilEps(value,intervalSize){var eps=_eps*intervalSize;value=(value-eps)/intervalSize;return Math.ceil(value)*intervalSize;}
function floorEps(value,intervalSize){var eps=_eps*intervalSize;value=(value+eps)/intervalSize;return Math.floor(value)*intervalSize;}
function divideEps(intervalSize,numSteps){if(numSteps===0.0||intervalSize===0.0)
return 0.0;return(intervalSize-(_eps*intervalSize))/numSteps;}
var ScaleEngine=function(bs){var m_base=10;var m_lowerMargin=0.0;var m_upperMargin=0.0;if(typeof(bs)!=='undefined')
m_base=bs;var m_transform=null;var m_referenceValue=0.0;this.lowerMargin=function(){return m_lowerMargin;}
this.upperMargin=function(){return m_upperMargin;}
this.setMargins=function(lower,upper){m_lowerMargin=Math.max(lower,0.0);m_upperMargin=Math.max(upper,0.0);}
this.setTransformation=function(transform){if(transform!==m_transform){m_transform=transform;}}
this.transformation=function(){var transform=null;if(m_transform){transform=m_transform.copy();}
return transform;}
this.divideInterval=function(intervalSize,numSteps){return Static.divideInterval(intervalSize,numSteps,m_base);}
this.contains=function(interval,value){if(!interval.isValid())
return false;if(Static.m3FuzzyCompare(value,interval.minValue(),interval.width())<0)
return false;if(Static.m3FuzzyCompare(value,interval.maxValue(),interval.width())>0)
return false;return true;}
this.strip=function(ticks,interval){if(!interval.isValid()||ticks.length===0)
return[];if(this.contains(interval,ticks[0])&&this.contains(interval,ticks[ticks.length-1])){return ticks;}
var strippedTicks=[];for(var i=0;i<ticks.length;i++){if(this.contains(interval,ticks[i]))
strippedTicks.push(ticks[i]);}
return strippedTicks;}
this.buildInterval=function(value){var delta=(value===0.0)?0.5:Math.abs(0.5*value);if(Number.MAX_VALUE-delta<value)
return new Interval(Number.MAX_VALUE-delta,Number.MAX_VALUE);if(-Number.MAX_VALUE+delta>value)
return new Interval(-Number.MAX_VALUE,-Number.MAX_VALUE+delta);return new Interval(value-delta,value+delta);}
this.setBase=function(base){m_base=Math.max(base,2);}
this.base=function(){return m_base;}
this.setReference=function(r){m_referenceValue=r;}
this.reference=function(){return m_referenceValue;}}
ScaleEngine.prototype.toString=function(){return'[ScaleEngine]';};var LinearScaleEngine=function(bs){ScaleEngine.call(this,bs);this.autoScale=function(maxNumSteps,xValueObject,stepSize){var interval=new Interval(xValueObject["x1"],xValueObject["x2"]);interval=interval.normalized();interval.setMinValue(interval.minValue()-this.lowerMargin());interval.setMaxValue(interval.maxValue()+this.upperMargin());if(interval.width()===0.0)
interval=this.buildInterval(interval.minValue());stepSize=Static.divideInterval(interval.width(),Math.max(maxNumSteps,1),this.base());xValueObject["x1"]=interval.minValue();xValueObject["x2"]=interval.maxValue();}
this.divideScale=function(x1,x2,maxMajorSteps,maxMinorSteps,stepSize){if(typeof(stepSize)==="undefined")
stepSize=0.0;var interval=new Interval(x1,x2).normalized();if(interval.width()<=0)
return new ScaleDiv();stepSize=Math.abs(stepSize);if(stepSize===0.0){if(maxMajorSteps<1)
maxMajorSteps=1;stepSize=Static.divideInterval(interval.width(),maxMajorSteps,this.base());}
var scaleDiv=new ScaleDiv();if(stepSize!==0.0){var ticks=[];this.buildTicks(interval,stepSize,maxMinorSteps,ticks);scaleDiv=new ScaleDiv(interval,ticks);}
if(x1>x2)
scaleDiv.invert();return scaleDiv;}
this.buildTicks=function(interval,stepSize,maxMinorSteps,ticks){var boundingInterval=this.align(interval,stepSize);ticks[MajorTick]=this.buildMajorTicks(boundingInterval,stepSize);if(maxMinorSteps>0){var minorTicks=[];var mediumTicks=[];this.buildMinorTicks(ticks[MajorTick],maxMinorSteps,stepSize,minorTicks,mediumTicks);ticks[MinorTick]=minorTicks;ticks[MediumTick]=mediumTicks;}
for(var i=0;i<NTickTypes;i++){var obj=this.strip(ticks[i],interval);ticks[i]=[];ticks[i]=obj;for(var j=0;j<ticks[i].length;j++){if(Static.m3FuzzyCompare(ticks[i][j],0.0,stepSize)===0)
ticks[i][j]=0.0;}}}
this.buildMajorTicks=function(interval,stepSize){var numTicks=Math.round(interval.width()/stepSize)+1;if(numTicks>10000)
numTicks=10000;var ticks=[];ticks.push(interval.minValue());for(var i=1;i<numTicks-1;i++)
ticks.push(interval.minValue()+i*stepSize);ticks.push(interval.maxValue());return ticks;}
this.buildMinorTicks=function(majorTicks,maxMinorSteps,stepSize,minorTicks,mediumTicks){var minStep=Static.mStepSize(stepSize,maxMinorSteps,this.base());if(minStep===0.0)
return;var numTicks=Math.ceil(Math.abs(stepSize/minStep))-1;var medIndex=-1;if(numTicks%2)
medIndex=numTicks/2;for(var i=0;i<majorTicks.length;i++){var val=majorTicks[i];for(var k=0;k<numTicks;k++){val+=minStep;var alignedValue=val;if(Static.m3FuzzyCompare(val,0.0,stepSize)===0)
alignedValue=0.0;if(k==medIndex)
mediumTicks.push(alignedValue);else
minorTicks.push(alignedValue);}}}
this.align=function(interval,stepSize){var x1=interval.minValue();var x2=interval.maxValue();if(-Number.MAX_VALUE+stepSize<=x1){var x=floorEps(x1,stepSize);if(Static.m3FuzzyCompare(x1,x,stepSize)!==0)
x1=x;}
if(Number.MAX_VALUE-stepSize>=x2){var x=ceilEps(x2,stepSize);if(Static.m3FuzzyCompare(x2,x,stepSize)!==0)
x2=x;}
return new Interval(x1,x2);}}
LinearScaleEngine.prototype=Object.create(ScaleEngine.prototype);LinearScaleEngine.prototype.constructor=LinearScaleEngine;LinearScaleEngine.prototype.toString=function(){return'[LinearScaleEngine]';}
var LogScaleEngine=function(bs){ScaleEngine.call(this,bs);this.setTransformation(new LogTransform());this.autoScale=function(maxNumSteps,xValueObject,stepSize){var logBase=this.base();var interval=new Interval(xValueObject["x1"]/Math.pow(logBase,this.lowerMargin()),xValueObject["x2"]*Math.pow(logBase,this.upperMargin()));if(interval.maxValue()/interval.minValue()<logBase){var linearScaler=new LinearScaleEngine();linearScaler.setReference(this.reference());linearScaler.setMargins(this.lowerMargin(),this.upperMargin());linearScaler.autoScale(maxNumSteps,xValueObject,stepSize);var linearInterval=new Interval(xValueObject["x1"],xValueObject["x2"]);linearInterval.normalized();linearInterval=linearInterval.limited(1.0e-100,1.0e100);if(linearInterval.maxValue()/linearInterval.minValue()<logBase){if(stepSize<0.0)
stepSize=-Static.mLog(logBase,Math.abs(stepSize));else
stepSize=Static.mLog(logBase,stepSize);return;}}
var logRef=1.0;if(this.reference()>1.0e-100/2)
logRef=Math.min(this.reference(),1.0e100/2);interval=interval.limited(1.0e-100,1.0e100);if(interval.width()==0.0)
interval=this.buildInterval(interval.minValue());stepSize=Static.divideInterval(Static.mLogInterval(logBase,interval).width(),Math.max(maxNumSteps,1));if(stepSize<1.0)
stepSize=1.0;xValueObject["x1"]=interval.minValue();xValueObject["x2"]=interval.maxValue();}
this.divideScale=function(x1,x2,maxMajorSteps,maxMinorSteps,stepSize){var interval=new Interval(x1,x2);interval.normalized();interval=interval.limited(1.0e-100,1.0e100);if(interval.width()<=0)
return new ScaleDiv();var logBase=this.base();if(interval.maxValue()/interval.minValue()<logBase){var linearScaler=new LinearScaleEngine();linearScaler.setReference(this.reference());linearScaler.setMargins(this.lowerMargin(),this.upperMargin());if(stepSize!=0.0){if(stepSize<0.0)
stepSize=-Math.pow(logBase,-stepSize);else
stepSize=Math.pow(logBase,stepSize);}
return linearScaler.divideScale(x1,x2,maxMajorSteps,maxMinorSteps,stepSize);}
stepSize=Math.abs(stepSize);if(stepSize==0.0){if(maxMajorSteps<1)
maxMajorSteps=1;stepSize=Static.divideInterval(Static.mLogInterval(logBase,interval).width(),maxMajorSteps,this.base());if(stepSize<1.0)
stepSize=1.0;}
var scaleDiv=new ScaleDiv();if(stepSize!=0.0){var ticks=[];this.buildTicks(interval,stepSize,maxMinorSteps,ticks);scaleDiv=new ScaleDiv(interval,ticks);}
if(x1>x2)
scaleDiv.invert();return scaleDiv;}
this.buildTicks=function(interval,stepSize,maxMinorSteps,ticks){var boundingInterval=this.align(interval,stepSize);ticks[MajorTick]=this.buildMajorTicks(boundingInterval,stepSize);if(maxMinorSteps>0){var minorTicks=[];var mediumTicks=[];this.buildMinorTicks(ticks[MajorTick],maxMinorSteps,stepSize,minorTicks,mediumTicks);ticks[MinorTick]=minorTicks;ticks[MediumTick]=mediumTicks;}
for(var i=0;i<NTickTypes;i++){var obj=this.strip(ticks[i],interval);ticks[i]=[];ticks[i]=obj;for(var j=0;j<ticks[i].length;j++){if(Static.m3FuzzyCompare(ticks[i][j],0.0,stepSize)===0)
ticks[i][j]=0.0;}}}
this.buildMajorTicks=function(interval,stepSize){var width=Static.mLogInterval(this.base(),interval).width();var numTicks=Math.round(width/stepSize)+1;if(numTicks>10000)
numTicks=10000;var lxmin=Math.log(interval.minValue());var lxmax=Math.log(interval.maxValue());var lstep=(lxmax-lxmin)/(numTicks-1);var ticks=[];ticks.push(interval.minValue());for(var i=1;i<numTicks-1;i++)
ticks.push(Math.exp(lxmin+i*lstep));ticks.push(interval.maxValue());return ticks;}
this.buildMinorTicks=function(majorTicks,maxMinorSteps,stepSize,minorTicks,mediumTicks){var logBase=this.base();if(stepSize<1.1)
{var minStep=this.divideInterval(stepSize,maxMinorSteps+1);if(minStep==0.0)
return;var numSteps=Math.round(stepSize/minStep);var mediumTickIndex=-1;if((numSteps>2)&&(numSteps%2==0))
mediumTickIndex=numSteps/2;for(i=0;i<majorTicks.length-1;i++){var v=majorTicks[i];var s=logBase/numSteps;if(s>=1.0){for(j=2;j<numSteps;j++){minorTicks.push(v*j*s);}}else{for(j=1;j<numSteps;j++){var tick=v+j*v*(logBase-1)/numSteps;if(j==mediumTickIndex)
mediumTicks.push(tick);else
minorTicks.push(tick);}}}}else{var minStep=this.divideInterval(stepSize,maxMinorSteps);if(minStep==0.0)
return;if(minStep<1.0)
minStep=1.0;var numTicks=Math.round(stepSize/minStep)-1;if(Static.m3FuzzyCompare((numTicks+1)*minStep,stepSize,stepSize)>0){numTicks=0;}
if(numTicks<1)
return;var mediumTickIndex=-1;if((numTicks>2)&&(numTicks%2))
mediumTickIndex=numTicks/2;var minFactor=Math.max(Math.pow(logBase,minStep),logBase);for(var i=0;i<majorTicks.length;i++){var tick=majorTicks[i];for(var j=0;j<numTicks;j++){tick*=minFactor;if(j==mediumTickIndex)
mediumTicks.push(tick);else
minorTicks.push(tick);}}}}
this.align=function(interval,stepSize){var intv=Static.mLogInterval(this.base(),interval);var x1=floorEps(intv.minValue(),stepSize);if(Static.m3FuzzyCompare(interval.minValue(),x1,stepSize)==0)
x1=interval.minValue();var x2=ceilEps(intv.maxValue(),stepSize);if(Static.m3FuzzyCompare(interval.maxValue(),x2,stepSize)==0)
x2=interval.maxValue();return Static.mPowInterval(this.base(),new Interval(x1,x2));}}
LogScaleEngine.prototype=Object.create(ScaleEngine.prototype);LogScaleEngine.prototype.constructor=LogScaleEngine;LogScaleEngine.prototype.toString=function(){return'[LogScaleEngine]';};define("scaleEngine",["static"],function(){});Static.mToPolylineFiltered=function(xMap,yMap,series,from,to,round){var points=[];var sample0=series.sample(from);points[0]=new Misc.Point(Math.round(xMap.transform(sample0.x)),Math.round(yMap.transform(sample0.y)));var pos=0;for(var i=from+1;i<=to;i++){var sample=series.sample(i);var p;if(round)
p=new Misc.Point(Math.round(xMap.transform(sample.x)),Math.round(yMap.transform(sample.y)));else
p=new Misc.Point(xMap.transform(sample.x),yMap.transform(sample.y));if(points[pos].x===p.x&&points[pos].y===p.y)
continue;pos++;points[pos]=p;}
return points;}
Static.mToPoints=function(boundingRect,xMap,yMap,series,from,to,round){var points=[];var numPoints=0;if(boundingRect.left()<=boundingRect.right()&&boundingRect.top()<=boundingRect.bottom()){for(i=from;i<=to;i++){var sample=series.sample(i);var x=xMap.transform(sample.x);var y=yMap.transform(sample.y);if(x>=boundingRect.left()&&x<=boundingRect.right()&&y>=boundingRect.top()&&y<=boundingRect.bottom()){if(round){points.push(new Misc.Point(Math.round(x),Math.round(y)));}else{points.push(new Misc.Point(x,y));}
numPoints++;}}}else{for(var i=from;i<=to;i++){var sample=series.sample(i);var x=xMap.transform(sample.x)-1;var y=yMap.transform(sample.y)-1;if(round){points.push(new Misc.Point(Math.round(x),Math.round(y)));}else{points.push(new Misc.Point(x,y));}
numPoints++;}}
return points;}
function PointMapper(){var m_flags=0;var m_boundingRect=new Misc.Rect();this.setBoundingRect=function(rect){m_boundingRect=rect;}
this.boundingRect=function(){return m_boundingRect;}
this.setFlag=function(flag,on){if(on)
m_flags|=flag;else
m_flags&=~flag;}
this.testFlag=function(flag){return m_flags&flag;}
this.toPolygonF=function(xMap,yMap,series,from,to){var polyline=[];if(m_flags&WeedOutPoints){if(m_flags&RoundPoints){polyline=mToPolylineFiltered(xMap,yMap,series,from,to,true);}else{polyline=mToPolylineFiltered(xMap,yMap,series,from,to,false);}}else{if(m_flags&RoundPoints){polyline=Static.mToPoints(new Misc.Rect(0.0,0.0,-1.0,-1),xMap,yMap,series,from,to,true);}else{polyline=Static.mToPoints(new Misc.Rect(0.0,0.0,-1.0,-1),xMap,yMap,series,from,to,false);}}
return polyline;}
this.toPointsF=function(xMap,yMap,series,from,to){var points
if(m_flags&WeedOutPoints){if(m_flags&RoundPoints){if(m_boundingRect.left()<=m_boundingRect.right()&&m_boundingRect.top()<=m_boundingRect.bottom()){points=Static.mToPointsFiltered(m_boundingRect,xMap,yMap,series,from,to);}else{points=mToPolylineFiltered(xMap,yMap,series,from,to,true);}}else{points=Static.mToPolylineFiltered(xMap,yMap,series,from,to,false);}}else{if(m_flags&RoundPoints){points=Static.mToPoints(m_boundingRect,xMap,yMap,series,from,to,true);}else{points=Static.mToPoints(m_boundingRect,xMap,yMap,series,from,to,false);}}
return points;}}
PointMapper.prototype.toString=function(){return'[PointMapper]';};define("pointMapper",["static"],function(){});Static.mBoundingRectPoint=function(sample){return new Misc.Rect(sample.x,sample.y,0,0);}
Static.mBoundingRect=function(series,from,to){var boundingRect=new Misc.Rect();if(typeof(from)=="undefined")
from=0;if(typeof(to)=="undefined")
to=series.size()-1;if(to<from)
return boundingRect;var i;for(i=from;i<=to;i++){var rect=Static.mBoundingRectPoint(series.sample(i));if(rect.width()>=0.0&&rect.height()>=0.0){boundingRect=rect;i++;break;}}
for(;i<=to;i++){var rect=Static.mBoundingRectPoint(series.sample(i));if(rect.width()>=0.0&&rect.height()>=0.0){boundingRect.setRect(Math.min(boundingRect.left(),rect.left()),Math.min(boundingRect.top(),rect.top()),Math.max(boundingRect.right(),rect.right())-Math.min(boundingRect.left(),rect.left()),Math.max(boundingRect.bottom(),rect.bottom())-Math.min(boundingRect.top(),rect.top()));}}
return boundingRect;}
function SeriesData(){this.d_boundingRect=new Misc.Rect();this.setRectOfInterest=function(rect){}}
SeriesData.prototype.toString=function(){return'[SeriesData]';}
ArraySeriesData.inheritsFrom(SeriesData);function ArraySeriesData(samples){SeriesData.call(this);var d_samples=[];if(typeof(samples)!=="undefined")
d_samples=samples;this.setSamples=function(samples){this.d_boundingRect=new Misc.Rect();d_samples=samples;}
this.samples=function(){return d_samples;}
this.size=function(){return d_samples.length;}
this.sample=function(i){return d_samples[i];}}
ArraySeriesData.prototype.toString=function(){return'[ArraySeriesData]';}
PointSeriesData.inheritsFrom(ArraySeriesData);function PointSeriesData(samples){ArraySeriesData.call(this,samples);this.boundingRect=function(){if(this.d_boundingRect.width()<0.0)
this.d_boundingRect=Static.mBoundingRect(this);return this.d_boundingRect;}}
PointSeriesData.prototype.toString=function(){return'[PointSeriesData]';}
Point3DSeriesData.inheritsFrom(ArraySeriesData);function Point3DSeriesData(samples){ArraySeriesData.call(this,samples);this.boundingRect=function(){if(this.d_boundingRect.width()<0.0)
this.d_boundingRect=Static.mBoundingRect(this);return this.d_boundingRect;}}
Point3DSeriesData.prototype.toString=function(){return'[Point3DSeriesData]';}
PlotSeriesItem.inheritsFrom(PlotItem);function PlotSeriesItem(tle){PlotItem.call(this,tle);var d_series=null;var m_orientation=Vertical;this.setOrientation=function(orientation){if(m_orientation!=orientation){m_orientation=orientation;}}
this.orientation=function(){return m_orientation;}
this.draw=function(xMap,yMap){this.drawSeries(xMap,yMap,0,-1);}
this.boundingRect=function(){return this.dataRect();}
this.updateScaleDiv=function(xScaleDiv,yScaleDiv){var rect=new Misc.Rect(new Misc.Point(xScaleDiv.lowerBound(),yScaleDiv.lowerBound()),xScaleDiv.range(),yScaleDiv.range());this.setRectOfInterest(rect);}
this.data=function(){return d_series;}
this.sample=function(index){return d_series?d_series.sample(index):null;}
this.setData=function(series){if(d_series!=series){d_series=series;}}
this.dataSize=function(){if(d_series==null)
return 0;return d_series.size();}
this.dataRect=function(){if(d_series==null)
return new Misc.Rect();return d_series.boundingRect();}
this.setRectOfInterest=function(rect){if(d_series)
d_series.setRectOfInterest(rect);}
this.swapData=function(series){var swappedSeries=d_series;d_series=series;return swappedSeries;}}
PlotSeriesItem.prototype.toString=function(){return'[PlotSeriesItem]';};define("seriesData",["static","plotItem"],function(){});define('upload',[],function(){var obj={cb:null,reset:function(inputDiv){inputDiv[0].value=""},setInputElement:function(inputDiv){Static.bind("itemAttached",function(e,plotItem,on){if(plotItem.rtti==Static.Rtti_PlotCurve){if($("#fileInput").val().includes(plotItem.title())&&!on)
obj.reset($("#fileInput"))}})
inputDiv.change(function(evt){var files=evt.target.files;for(var i=0,f;f=files[i];i++){var fileExtension=f.name.split('.')[1]
if(fileExtension!="txt"&&fileExtension!="plt"){continue;}
var reader=new FileReader();reader.onload=(function(theFile){return function(e){if(obj.cb)
obj.cb({fileName:theFile.name,content:e.target.result})
else
console.log({fileName:theFile.name,content:e.target.result})};})(f);reader.readAsText(f);}});}};return obj;});define('jqwtfile',['upload','static'],function(Upload){var self=null
var _plot=null
function get_plotData(){var data=[]
var p={}
p.bottomScaleEngineType=_plot.axisScaleEngine(xBottom).toString()
p.leftScaleEngineType=_plot.axisScaleEngine(yLeft).toString()
p.topScaleEngineType=_plot.axisScaleEngine(xTop).toString()
p.rightScaleEngineType=_plot.axisScaleEngine(yRight).toString()
p.title=_plot.title()
p.titleFont=_plot.titleFont()
p.footer=_plot.footer()
p.footerFont=_plot.footerFont()
p.axisTitleFont=_plot.axisTitleFont(xBottom)
p.xBottomAxisTitle=_plot.axisTitle(xBottom)
p.xTopAxisTitle=_plot.axisTitle(xTop)
p.yLeftAxisTitle=_plot.axisTitle(yLeft)
p.yRightAxisTitle=_plot.axisTitle(yRight)
p.autoScale=_plot.axisAutoScale(xBottom)
if(!p.autoScale){p.xBottomMin=_plot.axisInterval(xBottom).minValue()
p.xBottomMax=_plot.axisInterval(xBottom).maxValue()
p.yLeftMin=_plot.axisInterval(yLeft).minValue()
p.yLeftMax=_plot.axisInterval(yLeft).maxValue()
p.xTopMin=_plot.axisInterval(xTop).minValue()
p.xTopMax=_plot.axisInterval(xTop).maxValue()
p.yRightMin=_plot.axisInterval(yRight).minValue()
p.yRightMax=_plot.axisInterval(yRight).maxValue()}
data.push(p)
var list=_plot.itemList(Static.Rtti_PlotCurve)
for(var i=0;i<list.length;++i){var d={}
d.title=list[i].title()
d.samples=list[i].data().samples()
d.fn=list[i].fn
d.pen=list[i].pen()
d.fitType=list[i].fitType
var sym=list[i].symbol()
if(sym){d.symbolType=sym.style()
d.symbolWidth=sym.size().width
d.symbolPenColor=sym.pen().color
d.symbolPenWidth=sym.pen().width
d.symbolBrushColor=sym.brush().color}
d.xAxis=list[i].xAxis()
d.yAxis=list[i].yAxis()
data.push(d)}
return data}
function saveData(data,fileName){var a=document.createElement("a");document.body.appendChild(a);a.style="display: none";var json=JSON.stringify(data),blob=new Blob([json],{type:"octet/stream"}),url=window.URL.createObjectURL(blob);a.href=url;a.download=fileName;a.click();window.URL.revokeObjectURL(url);}
function plt(data){var obj=JSON.parse(data.content);var p=obj[0]
if(p.rightScaleEngineType=="[LogScaleEngine]"){_plot.setAxisScaleEngine(yRight,new LogScaleEngine())}
if(p.leftScaleEngineType=="[LogScaleEngine]"){_plot.setAxisScaleEngine(yLeft,new LogScaleEngine())}
if(p.bottomScaleEngineType=="[LogScaleEngine]"){_plot.setAxisScaleEngine(xBottom,new LogScaleEngine())}
if(p.topScaleEngineType=="[LogScaleEngine]"){_plot.setAxisScaleEngine(xTop,new LogScaleEngine())}
if(p.rightScaleEngineType=="[LinearScaleEngine]"){_plot.setAxisScaleEngine(yRight,new LinearScaleEngine())}
if(p.leftScaleEngineType=="[LinearScaleEngine]"){_plot.setAxisScaleEngine(yLeft,new LinearScaleEngine())}
if(p.bottomScaleEngineType=="[LinearScaleEngine]"){_plot.setAxisScaleEngine(xBottom,new LinearScaleEngine())}
if(p.topScaleEngineType=="[LinearScaleEngine]"){_plot.setAxisScaleEngine(xTop,new LinearScaleEngine())}
if(!p.autoScale){_plot.setAxisScale(xBottom,p.xBottomMin,p.xBottomMax)
_plot.setAxisScale(yLeft,p.yLeftMin,p.yLeftMax)
_plot.setAxisScale(xTop,p.xTopMin,p.xTopMax)
_plot.setAxisScale(yRight,p.yRightMin,p.yRightMax)}
else{setAutoScale(true)}
_plot.setTitleFont(new Misc.Font(p.titleFont))
_plot.setFooterFont(new Misc.Font(p.footerFont))
_plot.setAxisTitleFont(xBottom,new Misc.Font(p.axisTitleFont))
_plot.setAxisTitleFont(xTop,new Misc.Font(p.axisTitleFont))
_plot.setAxisTitleFont(yLeft,new Misc.Font(p.axisTitleFont))
_plot.setAxisTitleFont(yRight,new Misc.Font(p.axisTitleFont))
_plot.setTitle(p.title)
_plot.setFooter(p.footer)
_plot.setAxisTitle(xBottom,p.xBottomAxisTitle)
_plot.setAxisTitle(xTop,p.xTopAxisTitle)
_plot.setAxisTitle(yLeft,p.yLeftAxisTitle)
_plot.setAxisTitle(yRight,p.yRightAxisTitle)
for(var i=1;i<obj.length;++i){if(_plot.findPlotCurve(obj[i].title)){Static.alert(obj[i].title+" already exist")
Upload.reset($("#fileInput"))
return}}
for(var i=1;i<obj.length;++i){var curve=new Curve(obj[i].title)
if(obj[i].symbolType!==NoSymbol){var sym=new Symbol()
sym.setStyle(obj[i].symbolType)
sym.setSize(new Misc.Size(obj[i].symbolWidth,obj[i].symbolWidth))
sym.setPen(new Misc.Pen(obj[i].symbolPenColor,obj[i].symbolPenWidth))
sym.setBrush(new Misc.Brush(obj[i].symbolBrushColor))
curve.setSymbol(sym)}
if(obj[i].fitType){curve.fitType=obj[i].fitType}
curve.setSamples(obj[i].samples)
if(obj[i].fitType=="natural"||obj[i].fitType=="periodic"){var f=new SplineCurveFitter()
var s=f.spline()
if(obj[i].fitType=="periodic"){s.setSplineType(Static.SplineType.Periodic)}else{s.setSplineType(Static.SplineType.Natural)}
curve.setCurveFitter(f)}
curve.setPen(new Misc.Pen(obj[i].pen.color,obj[i].pen.width,obj[i].pen.style))
curve.setAxes(obj[i].xAxis,obj[i].yAxis)
curve.attach(_plot)}
Upload.reset($("#fileInput"))}
return{init:function(plot){self=this
_plot=plot
Upload.cb=self.upload},setInputElement:function(el){Upload.setInputElement(el)},upload:function(data){var extension=data.fileName.split('.')[1]
if(extension=='txt'){var samples=Utility.makePoints(Utility.toArrays(data.content));Static.trigger('addCurve',[data.fileName,samples,true]);}
else if(extension=='plt'){var list=_plot.itemList(Static.Rtti_PlotCurve)
if(list.length){Static.alertYesNo("Do you want to save the changes to the Grapher?",function(answer){if(answer==Static.Cancel){Upload.reset($("#fileInput"))
return}
if(answer==Static.Yes){self.save()
Upload.reset($("#fileInput"))
return}
if(answer==Static.No){for(var i=0;i<list.length;++i){list[i].detach()}
plt(data)
return}})}
else{plt(data)}}},save:function(){Static.prompt("Enter a filename without extensions","plot_1",function(filename){filename+='.plt'
var data=get_plotData()
saveData(data,filename);return true},"small")}}});define('pointEntryDlg',['static'],function(){var m_dlg11=null
function buildDlg1101(){var m_dlg1101=$('\
                <div class="modal fade" id="pointEntryModal" role="dialog">\
                <div class="modal-dialog modal-sm">\
                <div class="modal-content">\
                <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal">&times;</button>\
                <h4 class="modal-title">Point Entry</h4>\
                </div>\
                <div class="modal-body">\
                <div class="row">\
                <div class="col-sm-4">Name:</div>\
                <input id="curve_name" type="text" value="curve_1"\>\
                \
                </div>\
                <br>\
                <div class="row">\
                <div class="col-sm-4">Abscissa(X):</div>\
                <input id="abscissa" type="number" value=0.0\>\
                \
                </div>\
                <br>\
                <div class="row">\
                <div class="col-sm-4">Ordinate(Y):</div>\
                <input id="ordinate" type="number" value=0.0\>\
                \
                </div>\
                <br>\
                \
                \
                \
                \
                \
                \
                <div class="modal-footer">\
                <button id="pointEntryDlg_enter" type="button" class="btn btn-default" >Enter</button>\
                <button id="pointEntryDlg_remove" type="button" class="btn btn-default" >Remove</button>\
                <button id="pointEntryDlg_ok" type="button" class="btn btn-default"  data-dismiss="modal">Finish</button>\
                </div>\
                </div>\
                </div>\
                </div>\
                </div>\
                ')
$("body").append(m_dlg1101);}
var obj11=null;return obj11={pointEntryCb:function(plot,curveName,point){obj11.modify=false;obj11.axisDlgInit;obj11.curveName=curveName;obj11.point=point;if(obj11.pointEntryDlgInit==undefined){buildDlg1101();obj11.init();obj11.pointEntryDlgInit=true;}
if(curveName!==undefined){$("#curve_name").val(curveName);}
if(point!==undefined){$("#abscissa").val(point.x);$("#ordinate").val(point.y);}
obj11.plot=plot;obj11.pointEntryDlg();if(obj11.curveName!==undefined&&obj11.point!==undefined){obj11.modify=true;$('#curve_name').attr('disabled',true);}else{$('#curve_name').attr('disabled',false);}},init:function(){var self=this;$("#pointEntryDlg_enter").click(function(){var curve=obj11.plot.findPlotCurve($("#curve_name").val());if(curve){if(obj11.modify){curve.removePoint(obj11.point,true);}}else{curve=new Curve($("#curve_name").val());curve.attach(obj11.plot);var color=Utility.randomColor();curve.setPen(new Misc.Pen(color));var sym=new Symbol(MRect,new Misc.Brush(Static.invert(color)),new Misc.Pen(color),new Misc.Size(8,8));curve.setSymbol(sym);var attribute="";if(Static.showline&&Static.showsymbol){attribute="lineAndSymbol";}else if(Static.showline){attribute="line";}else if(Static.showsymbol){attribute="symbol";}
Utility.setLegendAttribute(curve,attribute,curve.getLegendIconSize());}
var samples=curve.data().samples();var p=new Misc.Point(parseFloat($("#abscissa").val()),parseFloat($("#ordinate").val()));obj11.point=p;if(!samples.containsPoint(p)){samples.push(p);}
samples.sort(function(a,b){return a.x-b.x;})
curve.setSamples(samples);obj11.plot.replot();Static.trigger("pointAdded",curve);})
$("#pointEntryDlg_remove").click(function(){var curve=obj11.plot.findPlotCurve($("#curve_name").val());curve.removePoint(new Misc.Point(parseFloat($("#abscissa").val()),parseFloat($("#ordinate").val())));})},pointEntryDlg:function(){var self=this;$("#pointEntryModal").modal({backdrop:"static"});}}});define('settings',['pointEntryDlg','static'],function(PointEntryDlg){var fonts=['Arial,Arial,Helvetica,sans-serif','Arial Black,Arial Black,Gadget,sans-serif','Comic Sans MS,Comic Sans MS,cursive','Courier New,Courier New,Courier,monospace','Georgia,Georgia,serif','Impact,Charcoal,sans-serif','Lucida Console,Monaco,monospace','Lucida Sans Unicode,Lucida Grande,sans-serif','Palatino Linotype,Book Antiqua,Palatino,serif','Tahoma,Geneva,sans-serif','Times New Roman,Times,serif','Trebuchet MS,Helvetica,sans-serif','Verdana,Geneva,sans-serif','Gill Sans,Geneva,sans-serif'];var m_plot=null;var m_dlg=$('<div class="modal fade" id="myModal" role="dialog">\
<div class="modal-dialog">\
\
<div class="modal-content">\
<div class="modal-header">\
<button type="button" class="close" data-dismiss="modal">&times;</button>\
<h4 class="modal-title">Plot Settings</h4>\
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
<li class="active"><a data-toggle="tab" href="#title_scale">Title</a></li>\
<li><a data-toggle="tab" href="#type">Type</a></li>\
<li><a data-toggle="tab" href="#user">Limits</a></li>\
<li><a data-toggle="tab" href="#exponent">Exp notation</a></li>\
<li><a data-toggle="tab" href="#margins">Margins</a></li>\
<li><a data-toggle="tab" href="#components">Components</a></li>\
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
<div class="col-sm-20">\
<form role="form">\
<label class="radio-inline">\
<input id="bottom_linear" type="radio" checked name="optradio">Linear\
</label>\
<label class="radio-inline">\
<input id="bottom_log" type="radio" name="optradio">Log\
</label>\
<label class="radio-inline">\
Base \
<input id="bottom_logBase" type="number" min=2 max=10 value=10 readonly=true>\
<span> </span>\
Decimal \
<input id="bottom_decimalPlaces" type="number" min=0 max=10 value=3>\
</label>\
</form>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Top:</div>\
<div class="col-sm-20">\
<form role="form">\
<label class="radio-inline">\
<input id="top_linear" type="radio" checked name="optradio">Linear\
</label>\
<label class="radio-inline">\
<input id="top_log" type="radio" name="optradio">Log\
</label>\
<label class="radio-inline">\
Base \
<input id="top_logBase" type="number" min=2 max=10 value=10 readonly=true>\
<span> </span>\
Decimal \
<input id="top_decimalPlaces" type="number" min=0 max=10 value=3>\
</label>\
</form>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Left:</div>\
<div class="col-sm-20">\
<form role="form">\
<label class="radio-inline">\
<input id="left_linear" type="radio" checked name="optradio">Linear\
</label>\
<label class="radio-inline">\
<input id="left_log" type="radio" name="optradio">Log\
</label>\
<label class="radio-inline">\
Base \
<input id="left_logBase" type="number" min=2 max=10 value=10 readonly=true>\
<span> </span>\
Decimal \
<input id="left_decimalPlaces" type="number" min=0 max=10 value=3>\
</label>\
</form>\
</div>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Right:</div>\
<div class="col-sm-20">\
<form role="form">\
<label class="radio-inline">\
<input id="right_linear" type="radio" checked name="optradio">Linear\
</label>\
<label class="radio-inline">\
<input id="right_log" type="radio" name="optradio">Log\
</label>\
<label class="radio-inline">\
Base \
<input id="right_logBase" type="number" min=2 max=10 value=10 readonly=true>\
<span> </span>\
Decimal \
<input id="right_decimalPlaces" type="number" min=0 max=10 value=3>\
</label>\
</form>\
</div>\
</div>\
</div>\
\
<div id="exponent" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-8">Use exponent notation for values less than:</div>\
<input id="exponent_lower" type="number" max=0 value=-10000>\
<br>\
<div class="col-sm-8">Use exponent notation for values greater than:</div>\
<input id="exponent_upper" type="number" min=0 value=10000>\
</div>\
</div>\
\
<div id="margins" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-4">Left axis:</div>\
<input id="margin_left" type="number" min= 0.0 value=0.0>\
<br>\
<div class="col-sm-4">Right axis:</div>\
<input id="margin_right" type="number" min= 0.0 value=0.0>\
<br>\
<div class="col-sm-4">Bottom axis:</div>\
<input id="margin_bottom" type="number" min= 0.0 value=0.0>\
<br>\
<div class="col-sm-4">Top:</div>\
<input id="margin_top" type="number" min= 0.0 value=0.0>\
</div>\
</div>\
\
<div id="components" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-4">Show backbone:</div>\
<input type="checkbox" checked id= "show_backbone">\
<br>\
<div class="col-sm-4">Show labels:</div>\
<input type="checkbox" checked id= "show_labels">\
<br>\
<div class="col-sm-4">Show ticks:</div>\
<input type="checkbox" checked id= "show_ticks">\
<br>\
<div id="tickLengthRow">\
<div class="col-sm-4">Tick length:</div>\
<select id= "tick_length">\
<option value="small">Small</option>\
<option value="medium" selected>Medium</option>\
<option value="large">Large</option>\
</select>\
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
<a data-toggle="collapse" data-parent="#accordion" href="#collapse4">Point selection Settings</a>\
</h4>\
</div>\
<div id="collapse4" class="panel-collapse collapse">\
<div class="panel-body">\
     <div class="col-sm-5">When a point is selected</div>\
     <select id="point_selection">\
       <option value="display_data">display data</option>\
       <option value="remove_it">remove it</option>\
 <option value="modify_it">modify it</option>\
     </select>\
<br>\
<br>\
</div>\
</div>\
</div>\
\
\
<div class="panel panel-default">\
<div class="panel-heading">\
<h4 class="panel-title">\
<a data-toggle="collapse" data-parent="#accordion" href="#collapse7">Zoomer Settings</a>\
</h4>\
</div>\
<div id="collapse7" class="panel-collapse collapse">\
<div class="panel-body">\
<div>Zoom according to:</div>\
     <br>\
     <div class="col-sm-2">Horizontal:</div>\
     <select id="axisHorizontal">\
       <option value="bottomAxis">Bottom axis</option>\
       <option value="topAxis">Top axis</option>\
     </select>\
<br>\
<br>\
<div class="col-sm-2">Vertical:</div>\
<select id="axisVertical">\
  <option value="leftAxis">Left axis</option>\
  <option value="rightAxis">Right axis</option>\
</select>\
</div>\
</div>\
</div>\
\
\
<div class="panel panel-default">\
<div class="panel-heading">\
<h4 class="panel-title">\
<a data-toggle="collapse" data-parent="#accordion" href="#collapse5">Magnifier Settings</a>\
</h4>\
</div>\
<div id="collapse5" class="panel-collapse collapse">\
<div class="panel-body">\
<div>Enabled axes.</div>\
<br>\
<div class="col-sm-1">Left:</div>\
<input id= "leftAxis" type="checkbox" checked class="col-sm-1"/>\
<div class="col-sm-1">Right:</div>\
<input id= "rightAxis" type="checkbox" class="col-sm-1"/>\
<div class="col-sm-1">Bottom:</div>\
<input id= "bottomAxis" type="checkbox" checked class="col-sm-1"/>\
<div class="col-sm-1">Top:</div>\
<input id= "topAxis" type="checkbox" class="col-sm-1"/>\
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
<input id="minor_gridLines" type="checkbox" checked class="col-sm-1"/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-8">Maximum number of minor divisions per major division:</div>\
<input id="minor_divisions" type="number" class="col-sm-2" min=2 max=20 value="5"/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-2">Color:</div>\
<input id="minor_line_color" type="color" class="col-sm-2"/>\
</div>\
</div>\
<div id="major" class="tab-pane fade">\
<div class="row">\
<br>\
<div class="col-sm-1">Show:</div>\
<input id="major_gridLines" type="checkbox" checked class="col-sm-1"/>\
</div>\
<div class="row">\
<br>\
<div class="col-sm-6">Maximum number of major divisions:</div>\
<div class="col-sm-2">\
<form role="form">\
<input input id="major_divisions" type="number" min=1 max=40 value="8">\
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
<input id="major_line_color" type="color">\
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
</div>');function setReadonly(on){$("#bottom_min").attr("readonly",on);$("#bottom_max").attr("readonly",on);$("#left_min").attr("readonly",on);$("#left_max").attr("readonly",on);$("#top_min").attr("readonly",on);$("#top_max").attr("readonly",on);$("#right_min").attr("readonly",on);$("#right_max").attr("readonly",on);}
return{setPlot:function(plot){m_plot=plot;if(m_plot){$("body").append(m_dlg);var titleFont=m_plot.titleFont();var axisTitleFont=m_plot.axisTitleFont(xBottom);var axisLabelFont=null
var userScale=false
function setAxisTitleFont(){axisLabelFont=m_plot.axisLabelFont(xBottom);axisLabelFont.th=axisTitleFont.th*0.86
setAxisLabelFont()
m_plot.setAxisTitleFont(xBottom,axisTitleFont);m_plot.setAxisTitleFont(xTop,axisTitleFont);m_plot.setAxisTitleFont(yLeft,axisTitleFont);m_plot.setAxisTitleFont(yRight,axisTitleFont);}
function setAxisLabelFont(){m_plot.setAxisLabelFont(xBottom,axisLabelFont);m_plot.setAxisLabelFont(xTop,axisLabelFont);m_plot.setAxisLabelFont(yLeft,axisLabelFont);m_plot.setAxisLabelFont(yRight,axisLabelFont);}
$("#axisHorizontal").change(function(){if($(this).val()=="bottomAxis"){m_plot.zoomer.setAxis(xBottom,m_plot.zoomer.yAxis())}else{m_plot.zoomer.setAxis(xTop,m_plot.zoomer.yAxis())}})
$("#point_selection").change(function(){if($(this).val()=="remove_it"){m_plot.curveClosestPoint.setCb(function(curve,point){curve.removePoint(point)});}else if($(this).val()=="modify_it"){m_plot.curveClosestPoint.setCb(function(curve,point){PointEntryDlg.pointEntryCb(m_plot,curve.title(),point);});}
else{m_plot.curveClosestPoint.setCb(null);}})
$("#axisVertical").change(function(){if($(this).val()=="leftAxis"){m_plot.zoomer.setAxis(m_plot.zoomer.xAxis(),yLeft)}else{m_plot.zoomer.setAxis(m_plot.zoomer.xAxis(),yRight)}})
$("#leftAxis").change(function(){m_plot.magnifier.setAxisEnabled(yLeft,this.checked)});$("#rightAxis").change(function(){m_plot.magnifier.setAxisEnabled(yRight,this.checked)});$("#bottomAxis").change(function(){m_plot.magnifier.setAxisEnabled(xBottom,this.checked)});$("#topAxis").change(function(){m_plot.magnifier.setAxisEnabled(xTop,this.checked)});$("#minor_divisions").change(function(){var value=Math.min(Math.max(2,$(this).val()),20)
$("#minor_divisions").val(value)
m_plot.setAxisMaxMinor(yLeft,value)
m_plot.setAxisMaxMinor(yRight,value)
m_plot.setAxisMaxMinor(xTop,value)
m_plot.setAxisMaxMinor(xBottom,value)})
$("#major_divisions").change(function(){var value=Math.min(Math.max(1,$(this).val()),40)
$("#major_divisions").val(value)
m_plot.setAxisMaxMajor(yLeft,$(this).val())
m_plot.setAxisMaxMajor(yRight,$(this).val())
m_plot.setAxisMaxMajor(xTop,$(this).val())
m_plot.setAxisMaxMajor(xBottom,$(this).val())})
$("#minor_line_color").change(function(){var grid=m_plot.itemList(Static.Rtti_PlotGrid)[0]
grid.setMinorPen($("#minor_line_color")[0].value)});$("#major_line_color").change(function(){var grid=m_plot.itemList(Static.Rtti_PlotGrid)[0]
grid.setMajorPen($("#major_line_color")[0].value)});$("#major_gridLines").click(function(){var grid=m_plot.itemList(Static.Rtti_PlotGrid)[0]
Utility.majorGridLines(grid,$(this)[0].checked)
$("#minor_gridLines").prop('checked',$(this)[0].checked)});$("#minor_gridLines").click(function(){var grid=m_plot.itemList(Static.Rtti_PlotGrid)[0]
Utility.minorGridLines(grid,$(this)[0].checked)});$("#margin_left").change(function(){var margin=0;var scaleEngine=m_plot.axisScaleEngine(yLeft)
if(scaleEngine instanceof LogScaleEngine){var scaleDiv=m_plot.axisScaleDiv(yLeft);margin=Static.mLog(scaleEngine.base(),$(this).val());}else{var intvY=m_plot.axisInterval(yLeft);margin=$(this).val();}
m_plot.axisScaleEngine(yLeft).setMargins(margin,margin)
m_plot.autoRefresh()});$("#margin_right").change(function(){var margin=0;var scaleEngine=m_plot.axisScaleEngine(yRight)
if(scaleEngine instanceof LogScaleEngine){var scaleDiv=m_plot.axisScaleDiv(yRight);margin=Static.mLog(scaleEngine.base(),$(this).val());}else{var intvY=m_plot.axisInterval(yRight);margin=$(this).val();}
m_plot.axisScaleEngine(yRight).setMargins(margin,margin)
m_plot.autoRefresh()});$("#margin_bottom").change(function(){var margin=0;var scaleEngine=m_plot.axisScaleEngine(xBottom)
if(scaleEngine instanceof LogScaleEngine){var scaleDiv=m_plot.axisScaleDiv(xBottom);margin=Static.mLog(scaleEngine.base(),$(this).val());}else{var intvY=m_plot.axisInterval(xBottom);margin=$(this).val();}
m_plot.axisScaleEngine(xBottom).setMargins(margin,margin)
m_plot.autoRefresh()});$("#margin_top").change(function(){var margin=0;var scaleEngine=m_plot.axisScaleEngine(xTop)
if(scaleEngine instanceof LogScaleEngine){var scaleDiv=m_plot.axisScaleDiv(xTop);margin=Static.mLog(scaleEngine.base(),$(this).val());}else{var intvY=m_plot.axisInterval(xTop);margin=$(this).val();}
m_plot.axisScaleEngine(xTop).setMargins(margin,margin)
m_plot.autoRefresh()});$("#exponent_lower").change(function(){m_plot.setNonExponentNotationLimits($(this).val(),$("#exponent_upper").val())});$("#exponent_upper").change(function(){m_plot.setNonExponentNotationLimits($("#exponent_lower").val(),$(this).val())});$("#axis_bold_title").click(function(){if($(this)[0].checked){axisTitleFont.weight="bold";}else{axisTitleFont.weight="normal";}
setAxisTitleFont()});$("#axisColorTitle").change(function(){axisTitleFont.fontColor=$("#axisColorTitle")[0].value;setAxisTitleFont()});$("#axisTitleFontSelector").change(function(){axisTitleFont.name=fonts[this.selectedIndex];setAxisTitleFont();});$("#axisTitlePointSelector").change(function(){axisTitleFont.th=parseInt($(this[this.selectedIndex]).val());setAxisTitleFont();});$("#bold_title").click(function(){if($(this)[0].checked){titleFont.weight="bold";}else{titleFont.weight="normal";}
m_plot.setTitleFont(titleFont);});$("#bold_footer").click(function(){if($(this)[0].checked){footerFont.weight="bold";}else{footerFont.weight="normal";}
m_plot.setFooterFont(footerFont);});$("#colorTitle").change(function(){titleFont.fontColor=$("#colorTitle")[0].value;m_plot.setTitleFont(titleFont);});$("#fontSelector").change(function(){titleFont.name=fonts[this.selectedIndex];m_plot.setTitleFont(titleFont);});$("#pointSelector").change(function(){titleFont.th=$(this[this.selectedIndex]).val();m_plot.setTitleFont(titleFont);});$("#colorSelector_footer").change(function(){var footerFont=m_plot.footerFont();footerFont.fontColor=$("#colorSelector_footer")[0].value;m_plot.setFooterFont(footerFont);});$("#colorSelector_background").change(function(){m_plot.setPlotBackground($("#colorSelector_background")[0].value)});$("#colorSelector_legend").change(function(){var table=m_plot.getLayout().getLegendDiv().children()[0]
$(table).css("background-color",$("#colorSelector_legend")[0].value)});$("#fontSelector_footer").change(function(){var footerFont=m_plot.footerFont();footerFont.name=fonts[this.selectedIndex];m_plot.setFooterFont(footerFont);});$("#pointSelector_footer").change(function(){var point=$(this[this.selectedIndex]).val();var footerFont=m_plot.footerFont();footerFont.th=point
m_plot.setFooterFont(footerFont);});$("#footer").change(function(){m_plot.setFooter($(this).val())});$("#title").change(function(){m_plot.setTitle($(this).val())});$("#bottomScale_title").change(function(){m_plot.setAxisTitle(xBottom,$(this).val())});$("#topScale_title").change(function(){m_plot.setAxisTitle(xTop,$(this).val())});$("#leftScale_title").change(function(){m_plot.setAxisTitle(yLeft,$(this).val())});$("#rightScale_title").change(function(){m_plot.setAxisTitle(yRight,$(this).val())});$("#show_backbone").change(function(){Utility.enableComponent(m_plot,Backbone,this.checked);});$("#show_ticks").change(function(){Utility.enableComponent(m_plot,Ticks,this.checked);if(!this.checked){$("#tickLengthRow").hide();}
else{$("#tickLengthRow").show();}})
$("#tick_length").change(function(){Utility.setTickLength(m_plot,$(this).val());})
$("#show_labels").change(function(){Utility.enableComponent(m_plot,Labels,this.checked);});$("#showline").change(function(){Static.showline=this.checked});$("#showsymbol").change(function(){Static.showsymbol=this.checked});$("#enableUserScale").change(function(){setReadonly(!this.checked)});$("#okButton").click(function(){if($("#enableUserScale")[0].checked){m_plot.setAxisScale(xBottom,parseFloat($("#bottom_min").val()),parseFloat($("#bottom_max").val()))
m_plot.setAxisScale(yLeft,parseFloat($("#left_min").val()),parseFloat($("#left_max").val()))
m_plot.setAxisScale(xTop,parseFloat($("#top_min").val()),parseFloat($("#top_max").val()))
m_plot.setAxisScale(yRight,parseFloat($("#right_min").val()),parseFloat($("#right_max").val()))}});$("#bottom_log").change(function(){$("#bottom_logBase").attr("readonly",false);m_plot.setAxisScaleEngine(xBottom,new LogScaleEngine())
$("#margin_bottom").val(0)
Static.trigger("scaleEngineChanged","LogScaleEngine")});$("#bottom_logBase").change(function(){m_plot.axisScaleEngine(yLeft).setBase($(this).val())
m_plot.replot()});$("#bottom_linear").change(function(){$("#bottom_logBase").attr("readonly",true);m_plot.setAxisScaleEngine(xBottom,new LinearScaleEngine())
$("#margin_bottom").val(0)
Static.trigger("scaleEngineChanged","LinearScaleEngine")});$("#left_log").change(function(){$("#left_logBase").attr("readonly",false);$("#margin_left").val(0)
m_plot.setAxisScaleEngine(yLeft,new LogScaleEngine())
Static.trigger("scaleEngineChanged","LogScaleEngine")});$("#left_logBase").change(function(){m_plot.axisScaleEngine(yLeft).setBase($(this).val())
m_plot.replot()});$("#left_linear").change(function(){$("#left_logBase").attr("readonly",true);m_plot.setAxisScaleEngine(yLeft,new LinearScaleEngine())
$("#margin_left").val(0)
Static.trigger("scaleEngineChanged","LinearScaleEngine")});$("#top_log").change(function(){$("#top_logBase").attr("readonly",false);m_plot.setAxisScaleEngine(xTop,new LogScaleEngine())
$("#margin_top").val(0)
Static.trigger("scaleEngineChanged","LogScaleEngine")});$("#top_logBase").change(function(){m_plot.axisScaleEngine(yLeft).setBase($(this).val())
m_plot.replot()});$("#top_linear").change(function(){$("#top_logBase").attr("readonly",true);m_plot.setAxisScaleEngine(xTop,new LinearScaleEngine())
$("#margin_top").val(0)
Static.trigger("scaleEngineChanged","LinearScaleEngine")});$("#right_log").change(function(){$("#right_logBase").attr("readonly",false);m_plot.setAxisScaleEngine(yRight,new LogScaleEngine())
$("#margin_right").val(0)
Static.trigger("scaleEngineChanged","LogScaleEngine")});$("#right_logBase").change(function(){m_plot.axisScaleEngine(yLeft).setBase($(this).val())
m_plot.replot()});$("#right_linear").change(function(){$("#right_logBase").attr("readonly",true);m_plot.setAxisScaleEngine(yRight,new LinearScaleEngine())
$("#margin_right").val(0)
Static.trigger("scaleEngineChanged","LinearScaleEngine")});$("#bottom_decimalPlaces").change(function(){m_plot.setAxisDecimalPlaces(xBottom,parseInt($(this).val()))});$("#top_decimalPlaces").change(function(){m_plot.setAxisDecimalPlaces(xTop,parseInt($(this).val()))});$("#left_decimalPlaces").change(function(){m_plot.setAxisDecimalPlaces(yLeft,parseInt($(this).val()))});$("#right_decimalPlaces").change(function(){m_plot.setAxisDecimalPlaces(yRight,parseInt($(this).val()))});}},plot:function(){return m_plot;},settingsDlg:function(){$("#myModal").modal({backdrop:"static"});var titleFont=m_plot.titleFont();var selectedIndex=fonts.indexOf(titleFont.name)
if(selectedIndex==-1){selectedIndex=0}
$("#fontSelector")[0].selectedIndex=selectedIndex
$("#pointSelector").val(titleFont.th)
$("#colorTitle").val(titleFont.fontColor);$("#title").val(m_plot.title());var footerFont=m_plot.footerFont();selectedIndex=fonts.indexOf(footerFont.name)
if(selectedIndex==-1){selectedIndex=0}
$("#fontSelector_footer")[0].selectedIndex=selectedIndex
$("#pointSelector_footer").val(footerFont.th)
$("#colorSelector_footer").val(footerFont.fontColor);$("#footer").val(m_plot.footer());var axisTitleFont=m_plot.axisTitleFont(xBottom);selectedIndex=fonts.indexOf(axisTitleFont.name)
if(selectedIndex==-1){selectedIndex=0}
$("#axisTitleFontSelector")[0].selectedIndex=selectedIndex
$("#axisTitlePointSelector").val(axisTitleFont.th)
$("#axisColorTitle").val(axisTitleFont.fontColor);$("#colorSelector_background").val(Static.RGB2HTML(m_plot.plotBackground()));$("#bottomScale_title").val(m_plot.axisTitle(xBottom));$("#topScale_title").val(m_plot.axisTitle(xTop));$("#leftScale_title").val(m_plot.axisTitle(yLeft));$("#rightScale_title").val(m_plot.axisTitle(yRight));$("#footer").val(m_plot.footer())
var intv=m_plot.axisInterval(xBottom)
$("#bottom_min").val(intv.minValue());$("#bottom_max").val(intv.maxValue());intv=m_plot.axisInterval(yLeft)
$("#left_min").val(intv.minValue());$("#left_max").val(intv.maxValue());intv=m_plot.axisInterval(xTop)
$("#top_min").val(intv.minValue());$("#top_max").val(intv.maxValue());intv=m_plot.axisInterval(yRight)
$("#right_min").val(intv.minValue());$("#right_max").val(intv.maxValue());if(m_plot.axisScaleEngine(xBottom).toString()=="[LogScaleEngine]"){$("#bottom_log")[0].checked=true}
if(m_plot.axisScaleEngine(xTop).toString()=="[LogScaleEngine]"){$("#top_log")[0].checked=true}
if(m_plot.axisScaleEngine(yLeft).toString()=="[LogScaleEngine]"){$("#left_log")[0].checked=true}
if(m_plot.axisScaleEngine(yRight).toString()=="[LogScaleEngine]"){$("#right_log")[0].checked=true}
if(m_plot.axisScaleEngine(xBottom).toString()=="[LinearScaleEngine]"){$("#bottom_linear")[0].checked=true}
if(m_plot.axisScaleEngine(xTop).toString()=="[LinearScaleEngine]"){$("#top_linear")[0].checked=true}
if(m_plot.axisScaleEngine(yLeft).toString()=="[LinearScaleEngine]"){$("#left_linear")[0].checked=true}
if(m_plot.axisScaleEngine(yRight).toString()=="[LinearScaleEngine]"){$("#right_linear")[0].checked=true}
var autoScale=m_plot.axisAutoScale(xBottom)
$("#enableUserScale")[0].checked=!autoScale
setReadonly(autoScale)}}});define('curveSettings',['static'],function(){let m_dlg1=$('\
<!-- Modal -->\
  <div class="modal fade" id="curveSettingsModal" role="dialog">\
    <div class="modal-dialog">\
    \
      <!-- Modal content-->\
      <div class="modal-content">\
        <div class="modal-header">\
          <!--button type="button" class="close" data-dismiss="modal">&times;</button-->\
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
<div class="col-sm-2"><button id="fit">Fit</button></div><div class="col-sm-3"><button id="legendAttribute">Legend attribute</button></div><div class="col-sm-3"><button id="curveStyle">Curve style</button></div><!--div class="col-sm-2"><button id="curveAxis">Axis</button></div-->\
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
          <button id="cancelAxisDlg" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\
          <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>\
        </div>\
      </div>\
      \
    </div>\
  </div>\
  ')
$("body").append(m_dlg1);let self=this
let _plot=null
let _curveFitCb=null
let _curveFitInfoCb=null
let _curveAttributeCb=null
let _curveStyleCb=null
let _curveAxisCb=null
$("#curveSelect").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
initDlg(curve)})
$("#remove").click(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
curve.detach()
if(!_plot.hasPlotCurve()){$("#cancelAxisDlg").click();return;}
let opts=$("#curveSelect").children()
$("#curveSelect")[0].removeChild(opts[$("#curveSelect")[0].selectedIndex]);initDlg(_plot.findPlotCurve($("#curveSelect").val()))})
$("#rename").click(function(){Utility.curveRenameDlg($("#curveSelect").val(),_plot,function(){let ind=$("#curveSelect")[0].selectedIndex
initCurveSelect()
$("#curveSelect")[0].selectedIndex=ind
return true})
return true})
$("#fit").click(function(){_curveFitCb(_plot.findPlotCurve($("#curveSelect").val()))})
$("#legendAttribute").click(function(){_curveAttributeCb(_plot.findPlotCurve($("#curveSelect").val()));})
$("#curveStyle").click(function(){_curveStyleCb(_plot.findPlotCurve($("#curveSelect").val()));})
$("#curveAxis").click(function(){_curveAxisCb(_plot.findPlotCurve($("#curveSelect").val()));})
$("#fitInfo").click(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
let info=_curveFitInfoCb(curve)
if(info.length){Static.alert(info)}else{Static.alert("No curve fitting equation found for \""+curve.title()+".\"")}})
$("#penColor").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
let pen=curve.pen()
pen.color=$(this).val()
curve.setPen(pen)})
$("#penWidth").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
let pen=curve.pen()
pen.width=$(this).val()
curve.setPen(pen)})
$("#penStyle").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
let pen=curve.pen()
pen.style=$(this).val()
curve.setPen(pen)})
$("#horizontalAxis").change(function(){_plot.findPlotCurve($("#curveSelect").val()).setXAxis($(this).val())
Static.trigger("axisChanged",$(this).val())})
$("#verticalAxis").change(function(){_plot.findPlotCurve($("#curveSelect").val()).setYAxis($(this).val())
Static.trigger("axisChanged",$(this).val())})
$("#symbolType").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
if($("#symbolType").val()=="None"){$("#symbolContainer").hide()
$("#penWidthSymbol").val(1)
$("#penColorSymbol").val(Static.colorNameToHex("black"))
$("#fillBrushSymbol").val(Static.colorNameToHex("transparent"))
$("#sizeSymbol").val(10)}else{$("#symbolContainer").show()}
addSymbol(curve,$(this).val())})
$("#penColorSymbol").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
let sym=curve.symbol()
if(!sym){return}
let pen=sym.pen()
pen.color=$(this).val()
sym.setPen(pen)
curve.plot().autoRefresh()
curve.plot().updateLegend(curve)})
$("#penWidthSymbol").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
setSymbolPenWidth(curve,parseInt($(this).val()))})
$("#fillBrushSymbol").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
let sym=curve.symbol()
if(!sym){return}
let pen=sym.brush()
pen.color=$(this).val()
sym.setBrush(pen)
curve.plot().autoRefresh()
curve.plot().updateLegend(curve)})
$("#sizeSymbol").change(function(){let curve=_plot.findPlotCurve($("#curveSelect").val())
setSymbolSize(curve,parseInt($(this).val()))})
let addSymbol=function(curve,style){if(style=='None'){curve.setSymbol(null)
return}
let _style=-1
if(style=='MRect'){_style=MRect}
if(style=='Cross'){_style=Cross}
if(style=='Diamond'){_style=Diamond}
if(style=='Ellipse'){_style=Ellipse}
if(style=='XCross'){_style=XCross}
Utility.addSymbol(curve,_style)}
let setSymbolPenWidth=function(curve,width){Utility.setSymbolPenWidth(curve,width)}
let setSymbolSize=function(curve,value){Utility.setSymbolSize(curve,value)}
function initCurveSelect(){let opts=$("#curveSelect").children()
for(let i=0;i<opts.length;++i){$("#curveSelect")[0].removeChild(opts[i]);}
let curves=_plot.itemList(Static.Rtti_PlotCurve)
for(let i=0;i<curves.length;++i){if(curves[i].isVisible()){let opt=$('<option>'+curves[i].title()+'</option>')
opt.attr("value",curves[i].title())
$("#curveSelect").append(opt)}}
$("#sizeSymbol").val(10)
if(curves.length){return curves[0]}
return null}
function initDlg(curve){if(!curve)return
let penStyles=["solid","dot","dash","dashDot","dashDotDot"]
$("#penColor").val(Static.colorNameToHex(curve.pen().color))
$("#penWidth")[0].selectedIndex=curve.pen().width-1
$("#penStyle")[0].selectedIndex=penStyles.indexOf(curve.pen().style)
$("#horizontalAxis")[0].selectedIndex=curve.xAxis()-2
$("#verticalAxis")[0].selectedIndex=curve.yAxis()
if(!curve.fitType){$("#fitInfo").hide()}else{$("#fitInfo").show()}
let symbol=curve.symbol()
if(symbol){let symbolStyle=symbol.style()
if(symbolStyle==MRect)
$("#symbolType").val("MRect")
if(symbolStyle==Cross)
$("#symbolType").val("Cross")
if(symbolStyle==Diamond)
$("#symbolType").val("Diamond")
if(symbolStyle==Ellipse)
$("#symbolType").val("Ellipse")
if(symbolStyle==XCross)
$("#symbolType").val("XCross")}else{$("#symbolType").val("None")}
if($("#symbolType").val()=="None"){$("#symbolContainer").hide()}else{$("#symbolContainer").show()
$("#penColorSymbol").val(symbol.pen().color)
$("#penWidthSymbol").val(symbol.pen().width)
$("#fillBrushSymbol").val(symbol.brush().color)
$("#sizeSymbol").val(symbol.size().width)}}
return{init:function(plot,curveFitCb,curveFitInfoCb,curveAttributeCb,curveStyleCb,curveAxisCb){let self=this
_plot=plot;_curveFitCb=curveFitCb;_curveFitInfoCb=curveFitInfoCb;_curveAttributeCb=curveAttributeCb;_curveStyleCb=curveStyleCb;_curveAxisCb=curveAxisCb;},curveSettingsDlg:function(){if(!_plot.itemList(Static.Rtti_PlotCurve).length){Static.alert("No curves found","small")}else{initDlg(initCurveSelect())
$("#curveSettingsModal").modal({backdrop:"static"});}},close:function(){$(".close").click();}}});define('toolBar',[],function(){function ToolBar(obj){var buttonList=[]
obj=obj||{}
function defaultCb(){console.log("No callback defined for button")};var tbDiv=$('<div id="toolBar1" style="position:relative; border-style: ridge; background-color: lightBlue"></div>')
if(obj.zIndex!==undefined)
tbDiv.css("zIndex",obj.zIndex)
tbDiv.insertBefore($("#plotDiv"))
$("#plotDiv").removeClass("noToolBar")
$("#plotDiv").addClass("toolBar")
function textToId(text){var id=0;for(var i=0;i<buttonList.length;++i){if((buttonList[i][0].innerText).trim().split(" ")[0]==text){return i}}
return-1;}
var addPushbutton=function(obj){obj.text=obj.text
obj.class=obj.class||"btn btn-primary"
obj.innerHtmlId=obj.innerHtmlId||"elem_"+buttonList.length
obj.duration=obj.duration||40
var b=$('<button id='+obj.innerHtmlId+' type="button" data-toggle="tooltip">')
b.addClass(obj.class);if(obj.icon!==undefined){if(obj.text!==undefined&&obj.text.length)
b.text(obj.text+" ")
var img=$('<img src='+obj.icon+' alt="Img" width=18px>')
b.append(img)}else{b.text(obj.text)}
tbDiv.append(b)
b.attr('title',obj.tooltip)
var _cb=obj.cb||function(){console.log("No callback defined for button")}
var clickEvent="click"
var mousedownEvent="mousedown"
var mouseupEvent="mouseup"
if(Static.isMobile()){clickEvent="tap"
mousedownEvent="touchstart"
mouseupEvent="touchend"}
if(obj.repeat){b.interval=null
b.bind(mousedownEvent,function(e){if(mousedownEvent=="mousedown"){if(e.button!=0){return}}
b.interval=setInterval(_cb,obj.duration);});$(window).bind(mouseupEvent,function(){clearInterval(b.interval)});}else{b.bind(clickEvent,_cb)}
buttonList.push(b)
return buttonList.length-1;}
this.disable=function(identifier){if(typeof(identifier)=="string")
identifier=textToId(identifier)
buttonList[identifier].attr("disabled",true)}
this.enable=function(identifier){if(typeof(identifier)=="string")
identifier=textToId(identifier)
buttonList[identifier].attr("disabled",false)}
this.hide=function(identifier){if(typeof(identifier)=="string")
identifier=textToId(identifier)
if(identifier==undefined)
identifier=-1
if(identifier>-1&&identifier<buttonList.length){buttonList[identifier].hide()}
else{tbDiv.hide()
$("#plotDiv").removeClass("toolBar")
$("#plotDiv").addClass("noToolBar")}
if(obj.refreshCb)
refreshCb()}
this.show=function(identifier){if(typeof(identifier)=="string")
identifier=textToId(identifier)
if(identifier==undefined)
identifier=-1
if(identifier>-1&&identifier<buttonList.length){buttonList[identifier].show()}
else{tbDiv.show()
$("#plotDiv").removeClass("noToolBar")
$("#plotDiv").addClass("toolBar")}
if(obj.refreshCb)
refreshCb()}
var addCheckbox=function(obj){var option=obj.label||"Option 1"
obj.innerHtmlId=obj.innerHtmlId||"elem_"+buttonList.length
var chkbox=$('<label data-toggle="tooltip" class="checkbox-inline">\
                                    <input id='+obj.innerHtmlId+'  type="checkbox" value="">'+option+'\
                                  </label>')
chkbox.css("marginLeft",obj.marginLeft||8)
chkbox.css("marginRight",obj.marginRight||8)
tbDiv.append(chkbox)
chkbox.attr('title',obj.tooltip)
var _cb=obj.cb||function(){console.log("No callback defined for button")}
chkbox.click(_cb)
buttonList.push(chkbox)
return buttonList.length-1;}
var addRadiobutton=function(obj){var option=obj.label||"Option 1"
obj.value=obj.value||option
obj.innerHtmlId=obj.innerHtmlId||"elem_"+buttonList.length
var name=obj.name||"optradio"
var r=$('<label data-toggle="tooltip" class="checkbox-inline">\
                                    <input id='+obj.innerHtmlId+' type="radio" value='+obj.value+' name='+name+'>'+option+'\
                                  </label>')
r.css("marginLeft",obj.marginLeft||0)
r.css("marginRight",obj.marginRight||0)
tbDiv.append(r)
r.attr('title',obj.tooltip)
r.addClass(obj.class)
var _cb=obj.cb||defaultCb
r.click(_cb)
buttonList.push(r)
return buttonList.length-1;}
function makeListElement(obj){var str=""
var checkbox=obj.hasCheckbox||false
var elementsInfo=obj.listElements||[]
for(var i=0;i<elementsInfo.length;++i){elementsInfo[i].icon=elementsInfo[i].icon||""
elementsInfo[i].checked=elementsInfo[i].checked||"unchecked"
if(checkbox&&!elementsInfo[i].icon.length){if(elementsInfo[i].tooltip){str+='<li title="'+elementsInfo[i].tooltip+'"><a href="#"><label><input type="checkbox" '+elementsInfo[i].checkboxState+' value='+i+'>'+elementsInfo[i].text+'</label></a></li>'}
else{str+='<li><a href="#"><label><input type="checkbox" '+elementsInfo[i].checkboxState+' value='+i+'>'+elementsInfo[i].text+'</label></a></li>'}}
if(!checkbox&&elementsInfo[i].icon.length){if(elementsInfo[i].tooltip){str+='<li title="'+elementsInfo[i].tooltip+'"><a href="#"><label><img src='+elementsInfo[i].icon+' alt="Img" width=20px>'+" "+elementsInfo[i].text+'</label></a></li>'}
else{str+='<li><a href="#"><label>'+elementsInfo[i].icon+elementsInfo[i].text+'</label></a></li>'}}
if(checkbox&&elementsInfo[i].icon.length){if(elementsInfo[i].tooltip){str+='<li title="'+elementsInfo[i].tooltip+'"><a href="#"><label><img src='+elementsInfo[i].icon+' alt="Img" width=20px><input type="checkbox" '+elementsInfo[i].checkboxState+' value="">'+elementsInfo[i].text+'</label></a></li>'}
else{str+='<li><a href="#"><label><input type="checkbox" '+elementsInfo[i].checkboxState+' value="">'+elementsInfo[i].icon+elementsInfo[i].text+'</label></a></li>'}}
if(!checkbox&&!elementsInfo[i].icon.length){if(elementsInfo[i].tooltip){str+='<li title="'+elementsInfo[i].tooltip+'"><a href="#"><label>'+elementsInfo[i].text+'</label></a></li>'}
else{str+='<li><a href="#"><label>'+elementsInfo[i].text+'</label></a></li>'}}}
return str}
var addDropdown=function(obj){var option=obj.label||"Option 1"
obj.text=obj.text||"Button"
obj.innerHtmlId=obj.innerHtmlId||"elem_"+buttonList.length
var d=$('<span data-toggle="tooltip" class="dropdown">\
                              <button id='+obj.innerHtmlId+' class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">'+obj.text+'\
                              <span class="caret"></span></button>\
                              <ul class=\"dropdown-menu\">'+makeListElement(obj)+'</ul>\
                          </span>')
d.css("marginLeft",obj.marginLeft||0)
d.css("marginRight",obj.marginRight||0)
d.addClass(obj.class)
d.attr('title',obj.tooltip)
tbDiv.append(d)
obj.cb=obj.cb||defaultCb
d.on('click',function(e){var el=$(e.target)
if(el.parent().parent().parent().hasClass('disabled'))
return false
if(obj.hasCheckbox)
return
var el=$(e.target)
var index=el.closest('li').index()
if(index==-1)
return
obj.cb(e,index)})
d.on('change',function(e){var el=$(e.target)
var checked=el.prop("checked")
obj.cb(e,el.closest('li').index(),el.prop("checked"))})
buttonList.push(d)
return buttonList.length-1;}
var addSelect=function(obj){obj.label=obj.label||"Select One"
obj.innerHtmlId=obj.innerHtmlId||"elem_"+buttonList.length
var s=$('<span data-toggle="tooltip"><label for="sel1">'+obj.label+':</label>\
                            <select>\
                              <option>1</option>\
                              <option>23456789101112</option>\
                              <option>3</option>\
                              <option>4</option>\
                            </select></span>')
s.css("marginLeft",obj.marginLeft||8)
s.css("marginRight",obj.marginRight||8)
s.addClass(obj.class)
s.attr('title',obj.tooltip)
tbDiv.append(s)
var _cb=obj.cb||function(){console.log("No callback defined for button")}
s.click(_cb)
buttonList.push(s)
return buttonList.length-1;}
var addUpload=function(obj){obj.label=obj.label||"Select One"
obj.innerHtmlId=obj.innerHtmlId||"elem_"+buttonList.length
var inp=$('<input id='+obj.innerHtmlId+'  type="file" name="files[]" multiple />')
var u=$('<button data-toggle="tooltip"></button>')
inp.css("marginLeft",-8)
inp.css("marginRight",-8)
inp.css("marginTop",-3)
inp.css("marginBottom",-3)
u.append(inp)
u.css("marginLeft",obj.marginLeft||8)
u.css("marginRight",obj.marginRight||8)
u.addClass(obj.class)
u.attr('title',obj.tooltip)
tbDiv.append(u)
buttonList.push(u)
var click=false;u.click(function(){if(!click){click=true;inp.trigger("click")
return false}})
return buttonList.length-1;}
var addNumber=function(obj){obj.label=obj.label||"Select One"
obj.innerHtmlId=obj.innerHtmlId||"elem_"+buttonList.length
obj.min=obj.min||-1000000
obj.max=obj.max||1000000
obj.value=obj.value||obj.min
if(obj.value>obj.max)
obj.value=obj.max
if(obj.value<obj.min)
obj.value=obj.min
var n=$('<span data-toggle="tooltip"><label for="sel1">'+obj.label+':</label>\
                                   </span>')
var spinBox=$('<input id='+obj.innerHtmlId+'  type="number"\
                            value="10" name="some-name"/>')
n.append(spinBox)
tbDiv.append(n)
spinBox.attr({'width':200,'min':obj.min,'max':obj.max,'step':obj.step,'value':obj.value});n.attr('title',obj.tooltip)
n.css("marginLeft",obj.marginLeft||8)
n.css("marginRight",obj.marginRight||8)
n.addClass(obj.class)
var _cb=obj.cb||function(){console.log("No callback defined for button")}
n.click(_cb)
buttonList.push(n)
return buttonList.length-1;}
var addLink=function(obj){obj.text=obj.text||"Button"
obj.innerHtmlId=obj.innerHtmlId||"elem_"+buttonList.length
var l=$('<A HREF='+obj.href+'></a>')
l.text(obj.text)
tbDiv.append(l)
l.addClass(obj.class)
l.attr('title',obj.tooltip)
l.attr('target',obj.target)
var _cb=obj.cb||function(){console.log("No callback defined for button")}
l.click(_cb)
buttonList.push(l)
return buttonList.length-1;}
this.addToolButton=function(type,obj){if(type=="pushbutton")
return addPushbutton(obj)
if(type=="checkbox")
return addCheckbox(obj)
if(type=="radio")
return addRadiobutton(obj)
if(type=="dropdown")
return addDropdown(obj)
if(type=="select")
return addSelect(obj)
if(type=="number")
return addNumber(obj)
if(type=="upload")
return addUpload(obj)
if(type=="link")
return addLink(obj)}
this.setButtonCheck=function(buttonId,on){if(typeof(buttonId)=="string")
buttonId=textToId(buttonId)
buttonList[buttonId].children().prop("checked",on);}
this.setDropdownItemCheck=function(buttonId,listIndex,on){if(typeof(buttonId)=="string")
buttonId=textToId(buttonId)
var input=$($(buttonList[buttonId].children()[1]).children()[listIndex]).children().children().children()
input.prop("checked",on)}
this.hideDropdownItem=function(buttonId,listIndex){if(typeof(buttonId)=="string")
buttonId=textToId(buttonId)
$($(buttonList[buttonId].children()[1]).children()[listIndex]).hide()}
this.showDropdownItem=function(buttonId,listIndex){if(typeof(buttonId)=="string")
buttonId=textToId(buttonId)
$($(buttonList[buttonId].children()[1]).children()[listIndex]).show()}
this.enableDropdownItem=function(buttonId,listIndex,on){if(typeof(buttonId)=="string")
buttonId=textToId(buttonId)
var liItem=$($(buttonList[buttonId].children()[1]).children()[listIndex]).addClass('disabled')
if(!on){liItem.addClass('disabled')}else{liItem.removeClass('disabled')}}}
return ToolBar});define('functionDlg',['static'],function(){var m_dlg1=$('\
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
            <div class="col-sm-3"><input id="fnDlg_lowerLimit" style="width:100%" type="text" value="-10.0"/></div>\
            <div class="col-sm-3">Upper limit:</div>\
            <div class="col-sm-3"><input id="fnDlg_upperLimit" style="width:100%" type="text" value="10.0"/></div>\
    </div>\
    <br>\
          <div class="row">\
            <div class="col-sm-3">Unbounded range:</div>\
            <div class="col-sm-3"><input id="fnDlg_unboundedRange" type="checkbox"/></div>\
            <div class="col-sm-3">Number of points:</div>\
            <div class="col-sm-3"><input id="fnDlg_numberOfPoints" style="width:100%" type="number" min="2" max="200" value="100"/></div>\
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
function uniqueChars(str){var result=[]
str=purgeKewords(str)
for(var i=0;i<str.length;++i){if(Static.isAlpha(str[i])){if(result.indexOf(str[i])==-1){result.push(str[i])}}}
return result}
function selectorCont(index){return $("#coeff_cont"+(index+1))}
function selector(index){return $("#coeff"+(index+1))}
var keywords=["asinh","acosh","atanh","acoth","asech","acsch","asin","acos","atan","acot","asec","acsc","sinh","cosh","tanh","coth","sech","csch","sin","cos","tan","sec","csc","cot","log2","log3","log4","log5","log6","log7","log8","log9","log10","deg","pi","PI","e","E"]
function purgeKewords(str){for(var i=0;i<keywords.length;++i){while(str.indexOf(keywords[i])!=-1)
str=str.replace(keywords[i],"")}
return str}
function hasKeyword(str){for(var i=0;i<keywords.length;++i){while(str.indexOf(keywords[i])!=-1)
return true}
return false}
function insertProductSign(str){if(hasKeyword(str))
return str;var result="";result+=str[0]
for(var i=1;i<str.length;++i){if(Static.isAlpha(str[i-1])&&Static.isAlpha(str[i])){result+='*';}
result+=str[i];}
return result;}
function replaceLogWithLog10(str){var result=str;if(result.includes("log")){if(!result.includes("log10")){result=result.replace("log","log10")}}
return result;}
function getCoeffs(){var result=[]
var fn=$("#fnDlg_function").val()
fn=purgeKewords(fn)
var indepVar=$("#fnDlg_variable").val()
while(fn.indexOf(indepVar)!=-1)
fn=fn.replace(indepVar,"")
for(var i=0;i<fn.length;++i){if(Static.isAlpha(fn[i])){if(result.indexOf(fn[i])==-1){result.push(fn[i])}}}
return result}
function validateLimits(lowerLimit,upperLimit){if(lowerLimit>=upperLimit){Static.alert("Upper limit must be greater than Lower limit.")
return false}
return true}
return{init:function(cb){var self=this
$("body").append(m_dlg1);$("#cont_variable").hide()
$("#fnDlg_unboundedRange").change(function(){if($(this)[0].checked){$("#limits").hide()}else{$("#limits").show()}})
$("#fnDlg_ok").click(function(){if($("#fnDlg_numberOfPoints").val()>200||$("#fnDlg_numberOfPoints").val()<2){$("#fnDlg_numberOfPoints").val(60)
Static.alert("\"Number of points\" cannot be \nless than 2 or greater than 200")}else{var uniqChars=uniqueChars($("#fnDlg_function").val())
if(uniqChars.length>0&&uniqChars.indexOf($("#fnDlg_variable").val())==-1){Static.alert("Please enter a valid variable.")
$("#cont_variable").show()
return}
self.title=$("#fnDlg_title").val()
self.variable=$("#fnDlg_variable").val()
self.fn=insertProductSign($("#fnDlg_function").val())
try{self.lowerLimit=math.eval($("#fnDlg_lowerLimit").val());}
catch(err){Static.alert("Please enter a valid lower limit.")
return;}
try{self.upperLimit=math.eval($("#fnDlg_upperLimit").val());}
catch(err){Static.alert("Please enter a valid upper limit.")
return;}
if(!validateLimits(parseFloat(self.lowerLimit),parseFloat(self.upperLimit)))
return
self.numOfPoints=$("#fnDlg_numberOfPoints").val()
self.unboundedRange=$("#fnDlg_unboundedRange")[0].checked
self.coeffs=getCoeffs()
cb()}});$("#fnDlg_function").on("input",function(){var fn=$(this).val()
if(uniqueChars(fn).length>1||fn.indexOf($("#fnDlg_variable").val())==-1){$("#cont_variable").show()}else{$("#cont_variable").hide()}})},functionDlg:function(){$("#functionModal").modal({backdrop:"static"});},close:function(){$(".close").click();}}});define('curveFitDlg',['static'],function(){var m_dlg1=$('\
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
$("body").append(m_dlg1);$("#cont_origin").hide()
$("#cont_order").hide()
$("#curveFitDlg_type").change(function(){if($(this).val()=="linear"){$("#cont_origin").show()}else{$("#cont_origin").hide()}
if($(this).val()=="polynomial"){$("#cont_order").show()}else{$("#cont_order").hide()}})
$("#attributes").hide()
$("#curveFitDlg_retain")[0].checked=false
$("#curveFitDlg_retain").change(function(){if(!$(this)[0].checked){$("#attributes").hide()}else{$("#attributes").show()}})
var obj2=null;return obj2={curveFitCb:function(curve){obj2.curveFitDlgInit
if(obj2.curveFitDlgInit==undefined){obj2.init()
obj2.curveFitDlgInit=true}
obj2.plot=curve.plot()
obj2.curve=curve
obj2.curveFitDlg()
return obj2},cb:function(){if(obj2.retain){var title=obj2.name
if(obj2.plot.findPlotCurve(title)){Static.alert(title+" already exist")
return}}
var curve=new Curve();curve.setPen(new Misc.Pen(obj2.color))
curve.fitType=obj2.type
curve.origin=obj2.origin
if(obj2.type=="natural"||obj2.type=="periodic"){curve.setData(obj2.curve.data())
var f=new SplineCurveFitter()
var s=f.spline()
if(obj2.type=="periodic"){s.setSplineType(Static.SplineType.Periodic)}else{s.setSplineType(Static.SplineType.Natural)}
curve.setCurveFitter(f)}
else if(obj2.type=="weeding"){return}
else{var regr=regress(obj2.curve,obj2.type,parseInt(obj2.order),obj2.origin)
var rc=obj2.curve.data().boundingRect()
var fn=regr.string
while(fn.indexOf('+ -')!=-1){fn=fn.replace('+ -','- ')}
curve.equation=fn
fn=fn.replace('y =','')
curve.setSamples(makeSamples({fx:fn,lowerX:rc.left(),upperX:rc.right(),numOfSamples:60}))}
if(obj2.retain){curve.setTitle(title)}else{curve.setTitle(obj2.curve.title())
obj2.curve.detach()}
curve.fitType=obj2.type
curve.attach(obj2.plot)
obj2.close()},init:function(){var self=this
$("#curveFitDlg_ok").click(function(){self.type=$("#curveFitDlg_type").val()
self.retain=$("#curveFitDlg_retain")[0].checked
self.name=$("#curveFitDlg_name").val()
self.color=$("#curveFitDlg_color").val()
self.order=$("#order").val()||1
self.origin=$("#origin")[0].checked
self.cb()});},curveFitDlg:function(){var self=this
$("#curveFitDlg_name").val(self.curve.title()+"_fit")
$("#curveFitDlg_color").val(Static.colorNameToHex(self.curve.pen().color))
$("#curveFitModal").modal({backdrop:"static"});},curveFitInfoCb:function(curve){var info=""
if(curve.fitType=="natural"){info+="Fit type:Natural Spline"}
if(curve.fitType=="periodic"){info+="Fit type:Periodic Spline"}
if(curve.fitType=="polynomial"){info+="Fit type:Polynomial"
info+="; Equation:"+curve.equation}
if(curve.fitType=="linear"){if(curve.origin){info+="Fit type:Linear Through Origin"}else{info+="Fit type:Linear"}
info+="; Equation:"+curve.equation}
return info},close:function(){$(".close").click();}}});define('curveStyleDlg',['static'],function(){var m_dlg11=null
function buildDlg11(){m_dlg11=$('\
<div class="modal fade" id="curveStyleModal" role="dialog">\
    <div class="modal-dialog modal-sm">\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4 class="modal-title">Curve Style</h4>\
        </div>\
        <div class="modal-body">\
   <div class="row">\
           <div class="col-sm-5">Curve style:</div>\
             <div class="col-sm-7">\
               <select id="style">\
  <option value="Lines">Lines (Default)</option>\
  <option value="Sticks">Sticks</option>\
  <option value="Steps">Steps</option>\
  <option value="Dots">Dots</option>\
  <option value="NoCurve">NoCurve</option>\
  </select>\
    </div>\
          </div>\
   <br>\
    <div class="row">\
             <div class="col-sm-7">\
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
          <button id="curveStyleDlg_ok" type="button" class="btn btn-default"  data-dismiss="modal">Ok</button>\
        </div>\
      </div>\
    </div>\
  </div>\
</div>\
')
$("body").append(m_dlg11);}
var obj11=null;return obj11={curveStyleCb:function(curve){obj11.curveStyleDlgInit
if(obj11.curveStyleDlgInit==undefined){buildDlg11()
obj11.init()
obj11.curveStyleDlgInit=true}
obj11.curve=curve
obj11.curveStyleDlg()},init:function(){var self=this
$("#style").change(function(){if($(this).val()=="Lines"){self.curve.setStyle(Lines)
Static.trigger("styleChanged",Lines)}else if($(this).val()=="Sticks"){self.curve.setStyle(Sticks)
Static.trigger("styleChanged",Sticks)}else if($(this).val()=="Steps"){self.curve.setStyle(Steps)
Static.trigger("styleChanged",Steps)}else if($(this).val()=="Dots"){self.curve.setStyle(Dots)
Static.trigger("styleChanged",Dots)}else{self.curve.setStyle(NoCurve)
Static.trigger("styleChanged",NoCurve)}})},curveStyleDlg:function(){var self=this
if(self.curve.style()==Lines){$("#style").val("Lines")}
if(self.curve.style()==Sticks){$("#style").val("Sticks")}
if(self.curve.style()==Steps){$("#style").val("Steps")}
if(self.curve.style()==Dots){$("#style").val("Dots")}
if(self.curve.style()==NoCurve){$("#style").val("NoCurve")}
$("#curveStyleModal").modal({backdrop:"static"});}}});define('axisDlg',['static'],function(){var m_dlg11=null
function buildDlg11(){m_dlg11=$('\
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
               <select id="axisHorizontal1">\
  <option value="bottomAxis">Bottom axis</option>\
  <option value="topAxis">Top axis</option>\
  </select>\
    </div>\
          </div>\
   <br>\
    <div class="row">\
            <div class="col-sm-5">Vertical:</div>\
             <div class="col-sm-7">\
               <select id="axisVertical1">\
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
$("body").append(m_dlg11);}
var obj11=null;return obj11={axisCb:function(curve){obj11.axisDlgInit
if(obj11.axisDlgInit==undefined){buildDlg11()
obj11.init()
obj11.axisDlgInit=true}
obj11.curve=curve
obj11.axisDlg()},init:function(){var self=this
$("#axisHorizontal1").change(function(){if($(this).val()=="bottomAxis"){self.curve.setXAxis(xBottom)
Static.trigger("axisChanged",xBottom)}else{self.curve.setXAxis(xTop)
Static.trigger("axisChanged",xTop)}})
$("#axisVertical1").change(function(){if($(this).val()=="leftAxis"){self.curve.setYAxis(yLeft)
Static.trigger("axisChanged",yLeft)}else{self.curve.setYAxis(yRight)
Static.trigger("axisChanged",yRight)}})},axisDlg:function(){var self=this
if(self.curve.xAxis()==xBottom){$("#axisHorizontal1").val("bottomAxis")}else{$("#axisHorizontal1").val("topAxis")}
if(self.curve.yAxis()==yLeft){$("#axisVertical1").val("leftAxis")}else{$("#axisVertical1").val("rightAxis")}
$("#axisModal").modal({backdrop:"static"});}}});define('curveLegendAttributeDlg',['static'],function(){var m_dlg12=null;function buildDlg(){m_dlg12=$('\
                <div class="modal fade" id="curveLegendAttributeModal" role="dialog">\
                <div class="modal-dialog modal-sm">\
                <div class="modal-content">\
                <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal">&times;</button>\
                <h4 class="modal-title">Curve Legend Attribute</h4>\
                </div>\
                <div class="modal-body">\
                <div class="row">\
                <div class="col-sm-5">Attribute:</div>\
                <div class="col-sm-7">\
                <select id="curveAttribute">\
                <option value="default">Pen color(Default)</option>\
                <option value="line">Line</option>\
                <option value="symbol">Symbol</option>\
                <option value="lineAndSymbol">Line and Symbol</option>\
                </select>\
                </div>\
                </div>\
                <br>\
                <div class="row" id="iconSizeRow">\
                <div class="col-sm-5">Icon size:</div>\
                <div class="col-sm-7">\
                <select id="iconSize">\
                <option value="small">Small</option>\
                <option value="medium">Medium</option>\
                <option value="large">Large</option>\
                </select>\
                </div>\
                </div>\
                <br>\
                \
                \
                \
                \
                \
                <div class="modal-footer">\
                <button id="curveAttributeDlg_ok" type="button" class="btn btn-default"  data-dismiss="modal">Ok</button>\
                </div>\
                </div>\
                </div>\
                </div>\
                </div>\
                ')
$("body").append(m_dlg12);}
var obj=null;var curveAttributeDlgInit=false;function setIconSize(val){if(val=="small"){obj.curve.setLegendIconSize(new Misc.Size(obj.defaultIconSize.height-4,obj.defaultIconSize.height-4));}else if(val=="medium"){obj.curve.setLegendIconSize(new Misc.Size(obj.defaultIconSize.height,obj.defaultIconSize.height));}else{obj.curve.setLegendIconSize(new Misc.Size(obj.defaultIconSize.height+4,obj.defaultIconSize.height+4));}}
return obj={curveAttributeCb:function(curve){if(!curveAttributeDlgInit){buildDlg();obj.init();obj.defaultIconSize=new Misc.Size(curve.getLegendIconSize());curveAttributeDlgInit=true;}
obj.curve=curve;obj.curveAttributeDlg();if($("#curveAttribute").val()=="line"||$("#curveAttribute").val()=="symbol"||$("#curveAttribute").val()=="lineAndSymbol")
$("#iconSizeRow").hide();else{$("#iconSizeRow").show();}},init:function(){var self=this;$("#curveAttribute").change(function(){Utility.setLegendAttribute(self.curve,$(this).val(),obj.defaultIconSize);if($(this).val()=="line"){$("#iconSizeRow").hide();}else if($(this).val()=="symbol"){$("#iconSizeRow").hide();}else if($(this).val()=="lineAndSymbol"){$("#iconSizeRow").hide();}else{setIconSize($("#iconSize").val());$("#iconSizeRow").show();}})
$("#iconSize").change(function(){setIconSize($(this).val());})},curveAttributeDlg:function(){var self=this
if(self.curve.testLegendAttribute(LegendShowLine)&&self.curve.testLegendAttribute(LegendShowSymbol)){$("#curveAttribute").val("lineAndSymbol");}else if(self.curve.testLegendAttribute(LegendShowSymbol)){$("#curveAttribute").val("symbol");}else if(self.curve.testLegendAttribute(LegendShowLine)){$("#curveAttribute").val("line");}else{$("#curveAttribute").val("default");}
$("#curveLegendAttributeModal").modal({backdrop:"static"});if(self.curve.getLegendIconSize().width==obj.defaultIconSize.width-4){$("#iconSize").val("small");}else if(self.curve.getLegendIconSize().width==obj.defaultIconSize.width){$("#iconSize").val("medium");}else if(self.curve.getLegendIconSize().width==obj.defaultIconSize.width+4){$("#iconSize").val("large");}}}});SyntheticPointData.inheritsFrom(SeriesData);function SyntheticPointData(size,interval){SeriesData.call(this);var d_size=size
var d_interval=interval||new Interval()
var d_rectOfInterest;var d_intervalOfInterest=new Interval(0.0,10.0);this.setSize=function(size){d_size=size;}
this.size=function(){return d_size;}
this.setInterval=function(interval){d_interval=interval.normalized();}
this.interval=function(){return d_interval;}
this.setRectOfInterest=function(rect){d_rectOfInterest=rect;d_intervalOfInterest=new Interval(rect.left(),rect.right()).normalized();}
this.rectOfInterest=function(){return d_rectOfInterest;}
this.boundingRect=function(){if(d_size==0||!(d_interval.isValid()||d_intervalOfInterest.isValid())){return new Misc.Rect(1.0,1.0,-2.0,-2.0);}
return Static.mBoundingRect(this);}
this.y=function(_x){throw"subclass must implement \"this.y\"";}
this.sample=function(index){if(index>=d_size)
return new Misc.Point(0,0);var xValue=this.x(index);var yValue=this.y(xValue);return new Misc.Point(xValue,yValue);}
this.x=function(index){var interval=d_interval.isValid()?d_interval:d_intervalOfInterest;if(!interval.isValid()||d_size==0||index>=d_size)
return 0.0;var dx=interval.width()/d_size;return interval.minValue()+index*dx;}};define("jQwtPointData",["static","seriesData"],function(){});function GraphicUtil(){var svgNS="http://www.w3.org/2000/svg";GraphicUtil.Graphic=function(e,w,h){var m_parent=e;var m_width=w;var m_height=h;var m_svg=document.createElementNS("http://www.w3.org/2000/svg","svg");m_svg.setAttribute('width',w)
m_svg.setAttribute('height',h)
if(this.parent)
this.parent[0].appendChild(m_svg);this.setParent=function(p){this.parent=p;this.parent[0].appendChild(m_svg);}
this.parent=function(){return m_parent;}
this.setWidth=function(w){m_width=w;}
this.width=function(){return m_width;}
this.setHeight=function(h){m_height=h;}
this.height=function(){return m_height;}
this.svg=function(){return m_svg}
this.toString=function(){return'[Graphic]';}}}
GraphicUtil();define("jGraphic",function(){});function mDrawXCrossSymbols(ctx,points,symbol)
{var size=symbol.size();var pen=symbol.pen();var brush=symbol.brush();var sw=size.width;var sh=size.height;ctx.beginPath();ctx.strokeStyle=pen.color;ctx.lineWidth=pen.width;for(var i=0;i<points.length;i++)
{var x=points[i].x-0.5*sw-1
var y=points[i].y-0.5*sh-1
ctx.moveTo(x,y);ctx.lineTo(x+sw,y+sh);ctx.moveTo(x+sw,y);ctx.lineTo(x,y+sh);}
ctx.stroke();}
function mDrawLineSymbols(ctx,orientations,points,symbol)
{var size=symbol.size();var pen=symbol.pen();var brush=symbol.brush();var sw=size.width;var sh=size.height;var painter=new PaintUtil.Painter(ctx);painter.setPen(pen);painter.save();for(var i=0;i<points.length;i++)
{if(orientations&Horizontal)
{var x=points[i].x-0.5*sw-1
var y=points[i].y-1
painter.drawLine(x,y,x+sw,y);}
if(orientations&Vertical)
{var x=points[i].x-1
var y=points[i].y-0.5*sh-1
painter.drawLine(x,y,x,y+sh);}}
painter.restore();painter=null}
function mDrawPathSymbols(ctx,points,symbol)
{var numPoints=points.length;var size=symbol.size();var pen=symbol.pen();var brush=symbol.brush();var sw=size.width;var sh=size.height;var painter=new PaintUtil.Painter(ctx);painter.setPen(pen);painter.setBrush(brush)
for(var i=0;i<numPoints;i++)
{var x=points[i].x
var y=points[i].y
var bRc=symbol.m_path.boundingRect()
painter.save()
painter.translate(x,y)
painter.scale(sw/bRc.width(),sh/bRc.height())
if(symbol.m_path.data.rotation){painter.rotate(symbol.m_path.data.rotation)}
var pinpoint=symbol.pinPoint()
painter.translate(-1*pinpoint.x,-1*pinpoint.y)
painter.drawPath(symbol.m_path)
painter.restore()}
painter=null}
function mDrawDiamondSymbols(ctx,points,symbol)
{var painter=new PaintUtil.Painter(ctx);painter.save()
painter.setBrush(symbol.brush());painter.setPen(symbol.pen());var sz=symbol.size()
var rc=new Misc.Rect(new Misc.Point,symbol.size())
var numPoints=points.length;for(var i=0;i<numPoints;i++)
{painter.save()
painter.translate(points[i].x-1,points[i].y-1)
painter.rotate(45)
painter.drawRect(-0.5*sz.width,-0.5*sz.height,sz.width,sz.height);painter.restore()}
painter.restore()
painter=null}
function mDrawRectSymbols(ctx,points,symbol)
{var painter=new PaintUtil.Painter(ctx);painter.save()
painter.setBrush(symbol.brush());painter.setPen(symbol.pen());var rc=new Misc.Rect(new Misc.Point,symbol.size())
var numPoints=points.length;for(var i=0;i<numPoints;i++)
{rc.moveCenter(points[i]);painter.drawRect(rc.left(),rc.top(),rc.width(),rc.height());}
painter.restore()
painter=null}
function mDrawEllipseSymbols(ctx,points,symbol)
{var painter=new PaintUtil.Painter(ctx);painter.save()
painter.setBrush(symbol.brush());painter.setPen(symbol.pen());var radius=Math.min(symbol.size().width,symbol.size().height)/2
var numPoints=points.length;for(var i=0;i<numPoints;i++)
{painter.drawCircle(points[i].x-1,points[i].y-1,radius);}
painter.restore()
painter=null}
function mDrawCrossGraphicSymbol(painter,point,size,symbol)
{painter.setBrush(symbol.brush());painter.setPen(symbol.pen());var rc=new Misc.Rect(new Misc.Point,symbol.size())
rc.moveCenter(point);painter.drawLine(rc.left()+0.5*rc.width(),rc.top(),rc.left()+0.5*rc.width(),rc.bottom());painter.drawLine(rc.left(),rc.top()+0.5*rc.height(),rc.right(),rc.top()+0.5*rc.height());}
function mDrawXCrossGraphicSymbol(painter,point,size,symbol)
{painter.setBrush(symbol.brush());painter.setPen(symbol.pen());var rc=new Misc.Rect(new Misc.Point,symbol.size())
rc.moveCenter(point);painter.drawLine(rc.left(),rc.top(),rc.right(),rc.bottom());painter.drawLine(rc.right(),rc.top(),rc.left(),rc.bottom());}
function mDrawRectGraphicSymbol(painter,point,size,symbol)
{painter.setBrush(symbol.brush());var rc=new Misc.Rect(new Misc.Point,symbol.size())
rc.moveCenter(point);painter.drawRect(rc.left(),rc.top(),rc.width(),rc.height());}
function mDrawDiamondGraphicSymbol(painter,point,size,symbol)
{painter.setBrush(symbol.brush());var rc=new Misc.Rect(new Misc.Point,symbol.size().width*0.707,symbol.size().height*0.707)
rc.moveCenter(point);painter.drawRect(rc.left(),rc.top(),rc.width(),rc.height());painter.transform({rotation:45,rotationX:point.x,rotationY:point.y})}
function mDrawEllipseGraphicSymbol(painter,point,size,symbol)
{painter.setBrush(symbol.brush());var radius=Math.min(symbol.size().width,symbol.size().height)/2
painter.drawCircle(point.x,point.y,radius)}
function mDrawPathGraphicSymbol(painter,point,iconSize,symbol)
{var pen=symbol.pen()
var pw=0.0;if(pen.style!==Static.NoPen)
pw=Math.max(pen.width,1.0);var rc=symbol.path().boundingRect();rc=rc.adjusted(-pw,-pw,pw,pw)
var data=symbol.path().data
data.xOffset=-1*rc.left()
data.yOffset=-1*rc.top()
data.xCenter=(rc.right()-rc.left())/2
data.yCenter=(rc.bottom()-rc.top())/2
painter.setBrush(symbol.brush());painter.setPen(symbol.pen());data.scale=Math.min(iconSize.width/rc.width(),iconSize.height/rc.height())
painter.drawPath(symbol.path());}
class Symbol{constructor(style,brush,pen,size){var m_style=NoSymbol;var m_size=new Misc.Size(-1,-1);var m_brush=new Misc.Brush("gray");var m_pen=new Misc.Pen;var m_isPinPointEnabled=false;this.m_path=0
var m_pinpoint=new Misc.Point(0,0)
if(typeof(size)!=="undefined"){m_style=style;m_brush=brush;m_pen=pen;m_size=size;}
else if(typeof(pen)!=="undefined"){m_style=style;m_brush=brush;m_pen=pen;}
else if(typeof(brush)!=="undefined"){m_style=style;m_brush=brush;}
else if(typeof(style)!=="undefined"){m_style=style;}
this.setPinPoint=function(pt)
{m_pinpoint=pt;}
this.pinPoint=function(pt)
{return m_pinpoint;}
this.setSize=function(size)
{if(size.isValid()&&!size.isEqual(m_size))
{m_size=size;}}
this.size=function()
{return m_size;}
this.setStyle=function(style)
{if(m_style!=style)
{m_style=style;}}
this.style=function()
{return m_style;}
this.setPath=function(path){m_style=Path;this.m_path=path;}
this.path=function(){return this.m_path;}
this.setPen=function(pen)
{{m_pen=pen;}}
this.pen=function()
{return m_pen;}
this.setBrush=function(brush)
{{m_brush=brush;if(m_style==Path);}}
this.brush=function()
{return m_brush;}
this.brush1=function()
{return(m_brush.color!=="noBrush");}
this.drawSymbols=function(ctx,points)
{if(points.length<=0)
return;var useCache=false;if(useCache)
{var dx=br.left();var dy=br.top();for(var i=0;i<numPoints;i++)
{var left=Math.round(points[i].x)+dx;var top=Math.round(points[i].y)+dy;}}
else
{this.renderSymbols(ctx,points);}}
this.drawGraphicSymbol=function(painter,pos,size)
{this.renderGraphicSymbol(painter,pos,size)}
this.drawSymbol=function(ctx,pos)
{this.drawSymbols(ctx,[pos]);}
this.renderSymbols=function(ctx,points)
{var numPoints=points.length;switch(m_style)
{case Ellipse:{mDrawEllipseSymbols(ctx,points,this);break;}
case MRect:{mDrawRectSymbols(ctx,points,this);break;}
case Diamond:{mDrawDiamondSymbols(ctx,points,this);break;}
case Cross:{mDrawLineSymbols(ctx,Horizontal|Vertical,points,this);break;}
case XCross:{mDrawXCrossSymbols(ctx,points,this);break;}
case HLine:{mDrawLineSymbols(ctx,Horizontal,points,this);break;}
case VLine:{mDrawLineSymbols(ctx,Vertical,points,this);break;}
case Path:{mDrawPathSymbols(ctx,points,this);break;}
default:;}}
this.renderGraphicSymbol=function(painter,point,size)
{if(m_style!==Cross||m_style!==XCross){var p=new Misc.Pen(this.pen())
if(this.brush1())
p.width/=2;painter.setPen(p)}
switch(m_style)
{case Ellipse:{mDrawEllipseGraphicSymbol(painter,point,0,this);break;}
case MRect:{mDrawRectGraphicSymbol(painter,point,0,this);break;}
case Diamond:{mDrawDiamondGraphicSymbol(painter,point,0,this);break;}
case Cross:{mDrawCrossGraphicSymbol(painter,point,0,this);break;}
case XCross:{mDrawXCrossGraphicSymbol(painter,point,0,this);break;}
case HLine:{break;}
case VLine:{break;}
case Path:{mDrawPathGraphicSymbol(painter,point,size,this);break;}
default:;}}
this.boundingRect=function()
{var rect=new Misc.Rect();switch(m_style)
{case Ellipse:case MRect:case Hexagon:{var pw=0.0;if(m_pen.style!=Static.NoPen)
pw=Math.max(m_pen.width,1.0);rect=new Misc.Rect(new Misc.Point(),m_size.width+pw,m_size.height+pw);rect.moveCenter(new Misc.Point());break;}
case XCross:case Diamond:case Triangle:case UTriangle:case DTriangle:case RTriangle:case LTriangle:case Star1:case Star2:{var pw=0.0;if(m_pen.style!==Static.NoPen)
pw=Math.max(m_pen.width,1.0);rect=new Misc.Rect(new Misc.Point(),m_size.width+pw,m_size.height+pw);rect.moveCenter(new Misc.Point());break;}
case Path:{rect=m_path.boundingRect()
console.log(rect.width())
rect.moveCenter(new Misc.Point());break;}
default:{rect=new Misc.Rect(new Misc.Point(),m_size.width,m_size.height);rect.moveCenter(new Misc.Point());}}
var r=new Misc.Rect();r.setLeft(Math.floor(rect.left()));r.setTop(Math.floor(rect.top()));r.setRight(Math.ceil(rect.right()));r.setBottom(Math.ceil(rect.bottom()));return r;}}
toString(){return'[Symbol]';}};define("jQwtSymbol",["static","jGraphic"],function(){});var LegendData=function(){var m_map={};var m_empty=true;this.title=function(){return this.value(Static.TitleRole);}
this.icon=function(){return this.value(Static.IconRole);}
this.mode=function(){if(this.hasRole(Static.ModeRole))
return this.value(Static.ModeRole);return Static.ReadOnly;}
this.setValue=function(role,val){m_map[role]=val;m_empty=false;}
this.isValid=function(){return!m_empty;}
this.hasRole=function(role){return contains(role);}
this.value=function(role){if(!contains(role))
return null;return m_map[role];}
function contains(role){if(typeof(m_map[role])==="undefined")
return false;return true;}
this.toString=function(){return'[LegendData]';}}
var AbstractLegend=function(){var m_plot=null;var m_checked=false;var m_legendDiv=null;var m_maxChar="";var m_iconWidth=0;var m_maxWidth=100;var margin=8;var m_checkChangeFn=function(plotItem,check){plotItem.setVisible(!check);if(!m_plot.autoReplot())
m_plot.replot();};if(typeof(checkChangeFn)!=="undefined")
m_checkChangeFn=checkChangeFn;var m_itemList=[];var tbl=$('<table/>').attr({});this.setLegendDiv=function(div){m_legendDiv=div;m_legendDiv.append(tbl);m_legendDiv.css("overflow","auto");};this.setPlot=function(plot){m_plot=plot;};this.isEmpty=function(){return tbl[0].rows.length>=1?false:true;};this.setMaxWidth=function(width){m_maxWidth=width;}
this.maxWidth=function(){return m_maxWidth;}
this.legendDivWidth=function(){var w=m_plot.legendFont().textSize(m_maxChar).width+m_iconWidth+margin;return w<this.maxWidth()?w:this.maxWidth();};this.addItem=function(plotItem,rowNumber){var font=plotItem.plot().legendFont();var itemData=plotItem.legendData()[0];if(!itemData.isValid())
return;var title=itemData.title();var icon=itemData.icon();if(icon&&(icon.width()>m_iconWidth))
m_iconWidth=icon.width();var row=$('<tr />');var tdElem=$('<td class="unchecked"></td>');var textLabel=$('<label />');textLabel.css("color",font.fontColor);textLabel.css("font-size",font.th);textLabel.text(" "+title);var spanElem=$('<span/>')
if(icon)
icon.setParent(spanElem)
textLabel.appendTo(spanElem);spanElem.appendTo(tdElem);row.append(tdElem);tbl.append(row);if(rowNumber!==undefined&&rowNumber>-1){m_itemList.splice(rowNumber,0,plotItem)
Static.setElementIndex(row,rowNumber)}else{m_itemList.push(plotItem);}
tdElem.click(plotItem,function(event){if($(this).attr("class")==="unchecked"){$(this).removeClass("unchecked");$(this).addClass("checked");m_checked=true;}
else{$(this).removeClass("checked");$(this).addClass("unchecked");m_checked=false;}
if(m_checkChangeFn)
m_checkChangeFn(event.data,m_checked);});if(plotItem.title().length>m_maxChar.length)
m_maxChar=plotItem.title();};function removeElementAt(index){if(index>-1){m_itemList.splice(index,1);}}
this.removeItem=function(plotItem){var rowNumber=m_itemList.indexOf(plotItem);if(rowNumber<0)
return;removeElementAt(rowNumber);tbl[0].deleteRow(rowNumber);if(parseInt(tbl.css("height"))<parseInt(m_legendDiv.css("height"))){m_legendDiv.css("overflow-y","auto");}
if(parseInt(tbl.css("width"))<parseInt(m_legendDiv.css("width"))){m_legendDiv.css("overflow-x","auto");}
return rowNumber};this.clearLegend=function(){var numRows=tbl[0].rows.length;for(var i=0;i<numRows;++i){tbl[0].deleteRow(0);}};this.rowNumberFromName=function(name){var Rows=tbl[0].rows;for(var i=0;i<Rows.length;++i){if(Rows[i].cells[0].innerHTML===name)
return i;}
return-1;};this.toString=function(){return'[AbstractLegend]';};}
AbstractLegend.prototype.isEmpty=function(){return true;};AbstractLegend.prototype.renderLegend=function(painter,rect,fillBackground){return true;};AbstractLegend.prototype.updateLegend=function(itemInfo,data){};MLegend.inheritsFrom(AbstractLegend);function MLegend(callBack){AbstractLegend.call(this,callBack);this.toString=function(){return'[MLegend]';};};define("jQwtLegend",["static"],function(){});class Magnifier extends HObject{constructor(plot){super(plot)
var m_plot=null;var m_isEnabled=true;var m_wheelFactor=1.9;var m_wheelModifiers=Static.NoModifier;var m_mouseFactor=0.95;var m_mouseButton=Static.RightButton;var m_mouseButtonModifiers=Static.NoModifier;var m_keyFactor=0.9;var m_zoomInKey=107;var m_zoomInKeyModifiers=Static.Key_Shift
var m_zoomOutKey=109;var m_zoomOutKeyModifiers=Static.Key_Shift
var m_mousePressed=false;var m_zoomInKeyModifiersEnabled=false;var m_zoomOutKeyModifiersEnabled=false;var initialPosX=0;var initialPosY=0;var m_isAxisEnabled=[];for(var axis=0;axis<axisCnt;axis++)
m_isAxisEnabled[axis]=true;m_isAxisEnabled[1]=false;m_isAxisEnabled[3]=false;this.setAxisEnabled=function(axis,on){if(axis>=0&&axis<axisCnt)
m_isAxisEnabled[axis]=on;}
this.isAxisEnabled=function(axis){if(axis>=0&&axis<axisCnt)
return m_isAxisEnabled[axis];return true;}
if(typeof(plot)!=="undefined"){plot.magnifier=this
m_plot=plot;this.setElement(m_plot.getLayout().getCentralDiv());}
this.plot=function(){return m_plot;}
this.setWheelFactor=function(factor){m_wheelFactor=factor;}
this.wheelFactor=function(){return m_wheelFactor;}
this.setWheelModifiers=function(modifiers){m_wheelModifiers=modifiers;}
this.wheelModifiers=function(){return m_wheelModifiers;}
this.setMouseFactor=function(factor){m_mouseFactor=factor;}
this.mouseFactor=function(){return m_mouseFactor;}
this.setMouseButton=function(button,modifiers){m_mouseButton=button;m_mouseButtonModifiers=modifiers;}
this.getMouseButton=function(){return{button:m_mouseButton,modifiers:m_mouseButtonModifiers};}
this.setKeyFactor=function(factor){m_keyFactor=factor;}
this.keyFactor=function(){return m_keyFactor;}
this.setZoomInKey=function(key,modifiers){m_zoomInKey=key;m_zoomInKeyModifiers=modifiers;}
this.getZoomInKey=function(){return{key:m_zoomInKey,modifiers:m_zoomInKeyModifiers};}
this.setZoomOutKey=function(key,modifiers){m_zoomOutKey=key;m_zoomOutKeyModifiers=modifiers;}
this.getZoomOutKey=function(){return{key:m_zoomOutKey,modifiers:m_zoomOutKeyModifiers};}
this.setEnabled=function(on){m_isEnabled=on;}
this.isEnabled=function(on){return m_isEnabled;}
this.event=function(event){if(!m_isEnabled)
return;switch(event.type){case'mousedown':{if(this.plot()==null){return true;}
if((event.button!==m_mouseButton)){return true;}
initialPosX=event.clientX;initialPosY=event.clientY;m_mousePressed=true;return true}
break;case'mouseup':{if(event.button===m_mouseButton&&m_mousePressed&&this.plot()){m_mousePressed=false;}}
break;case'mousemove':{if(!m_mousePressed)
return;var dy=event.clientY-initialPosY;if(dy!=0){var f=m_mouseFactor;if(dy<0)
f=1/f;this.rescale(f);}
initialPosX=event.clientX;initialPosY=event.clientY;}
break;case'keydown':{if(event.keyCode==m_zoomInKeyModifiers){m_zoomInKeyModifiersEnabled=true;}
if(event.keyCode==m_zoomOutKeyModifiers){m_zoomOutKeyModifiersEnabled=true;}
if(event.keyCode==m_zoomInKey&&m_zoomInKeyModifiersEnabled){this.rescale(m_keyFactor);}else if(event.keyCode==m_zoomOutKey&&m_zoomOutKeyModifiersEnabled){this.rescale(1.0/m_keyFactor);}}
break;case'keyup':{if(event.keyCode==m_zoomInKeyModifiers){m_zoomInKeyModifiersEnabled=false;}
if(event.keyCode==m_zoomOutKeyModifiers){m_zoomOutKeyModifiersEnabled=false;}}
break;case'mousewheel':{if(m_wheelFactor!=0.0){var f=Math.pow(m_wheelFactor,Math.abs(event.deltaY/15));if(event.deltaY>0)
f=1/f;this.rescale(f);}}
break;default:}}
this.rescale=function(factor){var plt=this.plot();if(plt==null)
return;factor=Math.abs(factor);if(factor==1.0||factor==0.0)
return;var doReplot=false;var autoReplot=plt.autoReplot();plt.setAutoReplot(false);for(var axisId=0;axisId<axisCnt;axisId++){var scaleDiv=this.plot().axisScaleDiv(axisId);if(this.isAxisEnabled(axisId)){var scaleEngine=this.plot().axisScaleEngine(axisId);var center,width_2,lower,upper;if(scaleEngine instanceof LogScaleEngine){center=(Static.mLog(scaleEngine.base(),scaleDiv.lowerBound())+Static.mLog(scaleEngine.base(),scaleDiv.upperBound()))/2;width_2=(Static.mLog(scaleEngine.base(),scaleDiv.upperBound())-Static.mLog(scaleEngine.base(),scaleDiv.lowerBound()))/2*factor;lower=Math.pow(scaleEngine.base(),center-width_2);upper=Math.pow(scaleEngine.base(),center+width_2);}else{center=scaleDiv.lowerBound()+scaleDiv.range()/2;width_2=scaleDiv.range()/2*factor;lower=center-width_2;upper=center+width_2;}
plt.setAxisScale(axisId,lower,upper);doReplot=true;}}
plt.setAutoReplot(autoReplot);if(doReplot)
plt.replot();return false;}
this.setEnabled_1(true);this.toString=function(){return'[Magnifier]';}}};define("jQwtMagnifier",["static"],function(){});PlotGrid.inheritsFrom(PlotItem);function PlotGrid(tle){PlotItem.call(this,tle);this.setItemAttribute(AutoScale,true);var xEnabled=true;var yEnabled=true;var xMinEnabled=false;var yMinEnabled=false;var xScaleDiv=null;var yScaleDiv=null;var _majorPen="grey";var _minorPen="lightGrey";this.rtti=Static.Rtti_PlotGrid;this.setMajorPen=function(penColor){if(_majorPen!==penColor){_majorPen=penColor;this.itemChanged();}}
this.majorPen=function(){return _majorPen;}
this.setMinorPen=function(penColor){if(_minorPen!==penColor){_minorPen=penColor;this.itemChanged();}}
this.minorPen=function(){return _minorPen;}
this.enableX=function(on){if(xEnabled!=on){xEnabled=on;this.itemChanged();Static.trigger("itemChanged",[this,on]);}}
this.enableY=function(on){if(yEnabled!=on){yEnabled=on;this.itemChanged();Static.trigger("itemChanged",[this,on]);}}
this.enableXMin=function(on){if(xMinEnabled!=on){xMinEnabled=on;this.itemChanged();}}
this.enableYMin=function(on){if(yMinEnabled!=on){yMinEnabled=on;this.itemChanged();}}
this.setXDiv=function(scaleDiv){if(xScaleDiv!==scaleDiv){xScaleDiv=scaleDiv;}}
this.xDiv=function(){return xScaleDiv;}
this.setYDiv=function(scaleDiv){if(yScaleDiv!==scaleDiv){yScaleDiv=scaleDiv;}}
this.yDiv=function(){return yScaleDiv;}
this.draw=function(xMap,yMap)
{var p=this.plot();var xScaleDiv=p.axisScaleDiv(this.xAxis());var yScaleDiv=p.axisScaleDiv(this.yAxis());var ctx=this.getContext();ctx.strokeStyle=_minorPen;if(xEnabled&&xMinEnabled)
{this.drawLines(ctx,"vertical",xMap,xScaleDiv.ticks(MinorTick));this.drawLines(ctx,"vertical",xMap,xScaleDiv.ticks(MediumTick));}
if(yEnabled&&yMinEnabled)
{this.drawLines(ctx,"horizontal",yMap,yScaleDiv.ticks(MinorTick));this.drawLines(ctx,"horizontal",yMap,yScaleDiv.ticks(MediumTick));}
ctx.strokeStyle=_majorPen;if(xEnabled)
{this.drawLines(ctx,"vertical",xMap,xScaleDiv.ticks(MajorTick));}
if(yEnabled)
{this.drawLines(ctx,"horizontal",yMap,yScaleDiv.ticks(MajorTick));}}
this.drawLines=function(context,orientation,scaleMap,values)
{var x1=0;var x2=context.canvas.width-1.0;var y1=0;var y2=context.canvas.height-1.0;var painter=new PaintUtil.Painter(context);var lineThickness=painter.pen().width
for(var i=0;i<values.length;i++)
{var value=scaleMap.transform(values[i]);if(orientation==="horizontal")
{painter.drawLine(x1,value-lineThickness,x2,value-lineThickness)}
else
{painter.drawLine(value-lineThickness,y1,value-lineThickness,y2);}}
painter=null}
this.updateScaleDiv=function(xScale_div,yScale_div)
{this.setXDiv(xScale_div);this.setYDiv(yScale_div);}}
PlotGrid.prototype.toString=function(){return'[PlotGrid]';};define("jQwtPlotGrid",["static","plotItem"],function(){});class WidgetOverlay extends Widget{constructor(w){super(w)
let self=this;this.draw=function(){let p=new PaintUtil.Painter(this)
this.drawOverlay(p)
p=null}
this.toString=function(){return'[WidgetOverlay]';}}
updateOverlay(){this.draw();}
drawOverlay(painter){console.warn('drawOverlay() not reimplemented')}};define("widgetOverlay",["static","widget"],function(){});var MouseSelect1=0
var MouseSelect2=1;var MouseSelect3=2;var MouseSelect4=3;var MouseSelect5=4;var MouseSelect6=5;var MousePatternCount=6;var KeySelect1=0;var KeySelect2=1;var KeyAbort=2;var KeyLeft=3;var KeyRight=4;var KeyUp=5;var KeyDown=6;var KeyRedo=7;var KeyUndo=8;var KeyHome=9;var KeyPatternCount=10;function MousePattern(btn,modifierCodes){this.button=Static.NoButton;this.modifiers=Static.NoModifier;if(btn!==undefined){this.button=btn;}
if(modifierCodes!==undefined){this.modifiers=modifierCodes;}}
function KeyPattern(keyCode,modifierCodes){this.key=Static.Key_unknown
this.modifiers=Static.NoModifier;if(keyCode!==undefined){this.key=keyCode;}
if(modifierCodes!==undefined){this.modifiers=modifierCodes;}}
class EventPattern extends HObject{constructor(parent){super(parent)
var d_mousePattern=[]
var d_keyPattern=[]
this.initMousePattern=function(numButtons){for(var i=0;i<MousePatternCount;++i)
d_mousePattern.push(new MousePattern());switch(numButtons){case 1:{this.setMousePattern(MouseSelect1,Static.LeftButton);this.setMousePattern(MouseSelect2,Static.LeftButton,Static.ControlModifier);this.setMousePattern(MouseSelect3,Static.LeftButton,Static.AltModifier);break;}
case 2:{this.setMousePattern(MouseSelect1,Static.LeftButton);this.setMousePattern(MouseSelect2,Static.RightButton);this.setMousePattern(MouseSelect3,Static.LeftButton,Static.AltModifier);break;}
default:{this.setMousePattern(MouseSelect1,Static.LeftButton);this.setMousePattern(MouseSelect2,Static.RightButton);this.setMousePattern(MouseSelect3,Static.MidButton);}}
this.setMousePattern(MouseSelect4,d_mousePattern[MouseSelect1].button,d_mousePattern[MouseSelect1].modifiers|Static.ShiftModifier);this.setMousePattern(MouseSelect5,d_mousePattern[MouseSelect2].button,d_mousePattern[MouseSelect2].modifiers|Static.ShiftModifier);this.setMousePattern(MouseSelect6,d_mousePattern[MouseSelect3].button,d_mousePattern[MouseSelect3].modifiers|Static.ShiftModifier);}
this.initKeyPattern=function(){for(var i=0;i<KeyPatternCount;++i)
d_keyPattern.push(new KeyPattern());this.setKeyPattern(KeySelect1,Static.Key_Return);this.setKeyPattern(KeySelect2,Static.Key_Space);this.setKeyPattern(KeyAbort,Static.Key_Escape);this.setKeyPattern(KeyLeft,Static.Key_Left);this.setKeyPattern(KeyRight,Static.Key_Right);this.setKeyPattern(KeyUp,Static.Key_Up);this.setKeyPattern(KeyDown,Static.Key_Down);this.setKeyPattern(KeyRedo,Static.Key_Plus);this.setKeyPattern(KeyUndo,Static.Key_Minus);this.setKeyPattern(KeyHome,Static.Key_Escape);}
this.setMousePattern=function(pattern,button,modifiers){if(button==undefined){d_mousePattern=pattern;}else{if(modifiers==undefined)
modifiers=Static.NoModifier
if(pattern>=0&&pattern<MousePatternCount){d_mousePattern[pattern].button=button;d_mousePattern[pattern].modifiers=modifiers;}}}
this.setKeyPattern=function(pattern,key,modifiers){if(key==undefined){d_mousePattern=pattern;}else{if(modifiers==undefined)
modifiers=Static.NoModifier
if(pattern>=0&&pattern<KeyPatternCount){d_keyPattern[pattern].key=key;d_keyPattern[pattern].modifiers=modifiers;}}}
this.modifiers=function(event){var _modifiers=Static.NoModifier
if(event.altKey&&event.ctrlKey&&event.shiftKey)
return _modifiers|Static.AltModifier|Static.ControlModifier|Static.ShiftModifier
if(event.altKey&&event.ctrlKey)
return _modifiers|Static.AltModifier|Static.ControlModifier
if(event.altKey&&event.shiftKey)
return _modifiers|Static.AltModifier|Static.ShiftModifier
if(event.ctrlKey&&event.shiftKey)
return _modifiers|Static.ControlModifier|Static.ShiftModifier
if(event.altKey)
return _modifiers|Static.AltModifier
if(event.ctrlKey)
return _modifiers|Static.ControlModifier
if(event.shiftKey)
return _modifiers|Static.ShiftModifier
return _modifiers}
this.button=function(event){if(event==null)
return false;return event.button}
this.mouseMatch=function(code,event){if(code>=0&&code<MousePatternCount)
return this.mouseMatch2(d_mousePattern[code],event);return false;}
this.mouseMatch2=function(pattern,event){if(event==null)
return false;return((pattern.button==this.button(event))&&(pattern.modifiers==this.modifiers(event)))}
this.keyPattern=function(){return d_keyPattern;}
this.key=function(event){if(event==null)
return false;return event.keyCode}
this.keyMatch=function(code,event){if(code>=0&&code<KeyPatternCount)
return this.keyMatch2(d_keyPattern[code],event);return false;}
this.keyMatch2=function(pattern,event){if(event==null)
return false;return((pattern.key==this.key(event))&&(pattern.modifiers==this.modifiers(event)))}
this.initKeyPattern();this.initMousePattern(3);}}
define("qwteventpattern",function(){});Static.Begin=0
Static.Append=1
Static.Move=2
Static.Remove=3
Static.End=4
function PickerMachine(type){var d_selectionType=type
var d_state=0
this.selectionType=function(){return d_selectionType;}
this.state=function(){return d_state;}
this.setState=function(state)
{d_state=state;}
this.reset=function()
{this.setState(0);}}
PickerTrackerMachine.inheritsFrom(PickerMachine)
function PickerTrackerMachine(){PickerMachine.call(this,Static.NoSelection)
this.transition=function(p,e){var cmdList=[];switch(e.type)
{case'mouseenter':case'mousemove':case'touchmove':{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);this.setState(1);}
else
{cmdList.push(Static.Move);}
break;}
case'mouseleave':{cmdList.push(Static.Remove);cmdList.push(Static.End);this.setState(0);}
default:break;}
return cmdList;}}
PickerClickPointMachine.inheritsFrom(PickerMachine)
function PickerClickPointMachine(){PickerMachine.call(this,Static.PointSelection)
this.transition=function(eventPattern,event){var cmdList=[];switch(event.type)
{case'mousedown':case'touchstart':{if(eventPattern.mouseMatch(MouseSelect1,event))
{cmdList.push(Static.Begin);cmdList.push(Static.Append);cmdList.push(Static.End);}
break;}
case'keydown':{var keyEvent=event;if(eventPattern.keyMatch(KeySelect1,keyEvent))
{{cmdList.push(Static.Begin);cmdList.push(Static.Append);cmdList.push(Static.End);}}
break;}
default:break;}
return cmdList;}}
PickerDragPointMachine.inheritsFrom(PickerMachine);function PickerDragPointMachine(){PickerMachine.call(this,Static.PointSelection)
this.transition=function(eventPattern,event){var cmdList=[];switch(event.type)
{case'mousedown':case'touchstart':{if(eventPattern.mouseMatch(MouseSelect1,event))
{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);this.setState(1);}}
break;}
case'mousemove':case'touchmove':case'mousewheel':{if(this.state()!=0)
cmdList.push(Static.Move);break;}
case'mouseup':case'touchend':{if(this.state()!=0)
{cmdList.push(Static.End);this.setState(0);}
break;}
case'keydown':{var keyEvent=event;if(eventPattern.keyMatch(KeySelect1,keyEvent))
{{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);this.setState(1);}
else
{cmdList.push(Static.End);this.setState(0);}}}
break;}
default:break;}
return cmdList;}}
PickerClickRectMachine.inheritsFrom(PickerMachine);function PickerClickRectMachine(){PickerMachine.call(this,Static.RectSelection)
this.transition=function(eventPattern,event){var cmdList=[];switch(event.type)
{case'mousedown':case'touchstart':{if(eventPattern.mouseMatch(MouseSelect1,event))
{switch(this.state())
{case 0:{cmdList.push(Static.Begin);cmdList.push(Static.Append);this.setState(1);break;}
case 1:{break;}
default:{cmdList.push(Static.End);this.setState(0);}}}
break;}
case'mousemove':case'touchmove':case'mousewheel':{if(this.state()!=0)
cmdList.push(Static.Move);break;}
case'mouseup':case'touchend':{if(eventPattern.mouseMatch(MouseSelect1,event))
{if(this.state()==1)
{cmdList.push(Static.Append);this.setState(2);}}
break;}
case'keydown':{var keyEvent=event;if(eventPattern.keyMatch(KeySelect1,keyEvent))
{{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);this.setState(1);}
else
{if(this.state()==1)
{cmdList.push(Static.Append);this.setState(2);}
else if(this.state()==2)
{cmdList.push(Static.End);this.setState(0);}}}}
break;}
default:break;}
return cmdList;}}
PickerDragRectMachine.inheritsFrom(PickerMachine)
function PickerDragRectMachine(){PickerMachine.call(this,Static.RectSelection)
this.transition=function(eventPattern,event){var cmdList=[];switch(event.type)
{case'mousedown':case'touchstart':{if(event.type=='touchstart'||eventPattern.mouseMatch(MouseSelect1,event))
{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);cmdList.push(Static.Append);this.setState(2);}}
break;}
case'mousemove':case'touchmove':case'mousewheel':{if(this.state()!=0)
cmdList.push(Static.Move);break;}
case'mouseup':case'touchend':{if(this.state()==2)
{cmdList.push(Static.End);this.setState(0);}
break;}
case'keydown':{if(eventPattern.keyMatch(KeySelect1,event))
{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);cmdList.push(Static.Append);this.setState(2);}
else
{cmdList.push(Static.End);this.setState(0);}}
break;}
default:break;}
return cmdList;}}
PickerPolygonMachine.inheritsFrom(PickerMachine);function PickerPolygonMachine(){PickerMachine.call(this,Static.PolygonSelection)
this.transition=function(eventPattern,event){var cmdList=[];switch(event.type)
{case'mousedown':case'touchstart':{if(eventPattern.mouseMatch(MouseSelect1,event))
{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);cmdList.push(Static.Append);this.setState(1);}
else
{cmdList.push(Static.Append);}}
if(eventPattern.mouseMatch(MouseSelect2,event))
{if(this.state()==1)
{cmdList.push(Static.End);this.setState(0);}}
break;}
case'mousemove':case'touchmove':case'mousewheel':{if(this.state()!=0)
cmdList.push(Static.Move);break;}
case'keydown':{var keyEvent=event;if(eventPattern.keyMatch(KeySelect1,keyEvent))
{{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);cmdList.push(Static.Append);this.setState(1);}
else
{cmdList.push(Static.Append);}}}
else if(eventPattern.keyMatch(KeySelect2,keyEvent))
{{if(this.state()==1)
{cmdList.push(Static.End);this.setState(0);}}}
break;}
default:break;}
return cmdList;}}
PickerDragLineMachine.inheritsFrom(PickerMachine);function PickerDragLineMachine(){PickerMachine.call(this,Static.PolygonSelection)
this.transition=function transition(eventPattern,event)
{var cmdList=[];switch(event.type)
{case'mousedown':case'touchstart':{if(eventPattern.mouseMatch(MouseSelect1,event))
{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);cmdList.push(Static.Append);this.setState(1);}}
break;}
case'keydown':{if(eventPattern.keyMatch(KeySelect1,event))
{if(this.state()==0)
{cmdList.push(Static.Begin);cmdList.push(Static.Append);cmdList.push(Static.Append);this.setState(1);}
else
{cmdList.push(Static.End);this.setState(0);}}
break;}
case'mousemove':case'touchmove':case'mousewheel':{if(this.state()!=0)
cmdList.push(Static.Move);break;}
case'mouseup':case'touchend':{if(this.state()!=0)
{cmdList.push(Static.End);this.setState(0);}}
default:break;}
return cmdList;}};define("qwtpickermachine",["static","qwteventpattern"],function(){});class PickerRubberband extends WidgetOverlay{constructor(picker,parent){super(parent)
var d_picker=picker;this.drawOverlay=function(painter){painter.setPen(d_picker.rubberBandPen());painter.setBrush(Static.NoBrush)
d_picker.drawRubberBand(painter);}}};class PickerTracker extends WidgetOverlay{constructor(picker,parent){super(parent)
var d_picker=picker;this.drawOverlay=function(painter){d_picker.trackerOverlay().clearCanvas()
painter.save()
painter.setPen(d_picker.trackerPen());d_picker.drawTracker(painter);painter.restore()}}};function PickerPrivateData(){this.enabled=false;this.stateMachine=null;this.resizeMode
this.rubberBand=Static.NoRubberBand;this.rubberBandPen=new Misc.Pen('red',1,'solid');this.trackerMode=Static.AlwaysOff;this.trackerPen=new Misc.Pen('red');this.trackerFont;this.pickedPoints=[];this.isActive=false;this.trackerPosition=new Misc.Point();this.mouseTracking=false;this.rubberBandOverlay=null;this.trackerOverlay=null;};class Picker extends EventPattern{constructor(rubberBand,trackerMode,parent){super(parent)
let clickEvent="click";let mousedownEvent="mousedown";let mouseupEvent="mouseup";let mousemoveEvent="mousemove";if(Static.isMobile()){clickEvent="tap";mousedownEvent="touchstart";mouseupEvent="touchend";mousemoveEvent="touchmove";}
var d_data;var m_pickedPoints=[];var m_parent=null
if(parent!==undefined&&parent.toString()=='[Widget]'){m_parent=parent}
this.init=function(parent,rubberBand,trackerMode){d_data=new PickerPrivateData();d_data.rubberBand=rubberBand;if(parent){d_data.trackerFont=new Misc.Font(12);;this.setEnabled_1(true);}
this.setTrackerMode(trackerMode);Picker.pickers.push(this)}
this.getPickerData=function(){return d_data}
this.setStateMachine=function(stateMachine){if(d_data.stateMachine!=stateMachine){this.reset();d_data.stateMachine=stateMachine;if(d_data.stateMachine)
d_data.stateMachine.reset();}}
this.stateMachine=function(){return d_data.stateMachine;}
this.parentWidget=function(){return m_parent}
this.setRubberBand=function(rubberBand){d_data.rubberBand=rubberBand;}
this.rubberBand=function(){return d_data.rubberBand;}
this.setTrackerMode=function(mode){if(d_data.trackerMode!=mode){d_data.trackerMode=mode;this.setMouseTracking(d_data.trackerMode==Static.AlwaysOn);}}
this.trackerMode=function(){return d_data.trackerMode;}
this.setEnabled=function(enabled){if(d_data.enabled!=enabled){d_data.enabled=enabled;var w=this.parentWidget();if(w){if(enabled)
w.installEventFilter(this);else
w.removeEventFilter(this);}
this.updateDisplay();}}
this.isEnabled=function(){return d_data.enabled;}
this.setTrackerFont=function(font){if(font!=d_data.trackerFont){d_data.trackerFont=font;this.updateDisplay();}}
this.trackerFont=function(){return d_data.trackerFont;}
this.setTrackerPen=function(pen){if(pen!=d_data.trackerPen){d_data.trackerPen=pen;this.updateDisplay();}}
this.trackerPen=function(){return d_data.trackerPen;}
this.setRubberBandPen=function(pen){if(pen!=d_data.rubberBandPen){d_data.rubberBandPen=pen;this.updateDisplay();}}
this.rubberBandPen=function(){return d_data.rubberBandPen;}
this.drawRubberBand=function(painter){if(!this.isActive()||this.rubberBand()==Static.NoRubberBand||this.rubberBandPen().style==Static.NoPen){return;}
var pa=this.adjustedPoints(d_data.pickedPoints);var selectionType=Static.NoSelection;if(d_data.stateMachine)
selectionType=d_data.stateMachine.selectionType();switch(selectionType){case Static.NoSelection:case Static.PointSelection:{if(pa.length<1)
return;var pos=pa[0];var pRect=this.pickArea();switch(this.rubberBand()){case Static.VLineRubberBand:{painter.drawLine(pos.x,pRect.top(),pos.x,pRect.bottom());break;}
case Static.HLineRubberBand:{painter.drawLine(pRect.left(),pos.y,pRect.right(),pos.y);break;}
case Static.CrossRubberBand:{painter.drawLine(pos.x,pRect.top(),pos.x,pRect.bottom());painter.drawLine(pRect.left(),pos.y,pRect.right(),pos.y);break;}
default:break;}
break;}
case Static.RectSelection:{if(pa.length<2)
return;var rect=new Misc.Rect(pa[0],pa[pa.length-1]);rect=rect.normalized()
switch(this.rubberBand()){case Static.EllipseRubberBand:{painter.drawEllipse(rect);break;}
case Static.RectRubberBand:{painter.drawRect(rect);break;}
default:break;}
break;}
case Static.PolygonSelection:{if(pa.length<2)
return;if(this.rubberBand()==Static.PolygonRubberBand){painter.drawPolyline(pa);}
break;}
default:break;}}
this.drawTracker=function(painter){var textRect=this.trackerRect(this.trackerFont());if(textRect!==null){var label=this.trackerText(d_data.trackerPosition);if(label!==""){painter.drawText(label,textRect.left(),textRect.bottom());}}}
this.adjustedPoints=function(points){return points;}
this.selection=function(){return this.adjustedPoints(d_data.pickedPoints);}
this.trackerPosition=function(){return d_data.trackerPosition;}
this.trackerRect=function(font){if(this.trackerMode()===Static.AlwaysOff){return null;}
if(this.trackerPosition().x<0||this.trackerPosition().y<0)
return null;var text=this.trackerText(this.trackerPosition());if(text=="")
return null;var textSize=font.textSize(text);var textRect=new Misc.Rect(new Misc.Point(),textSize.width,textSize.height);var pos=this.trackerPosition();var alignment=0;if(m_pickedPoints.length.length>1&&this.rubberBand()!=Static.NoRubberBand){var last=m_pickedPoints[0];alignment|=(pos.x>=last.x)?Static.AlignRight:Static.AlignLeft;alignment|=(pos.y>last.y)?Static.AlignBottom:Static.AlignTop;}else
alignment=Static.AlignTop|Static.AlignRight;var margin=5;var x=pos.x;if(alignment&Static.AlignLeft)
x-=textRect.width()+margin;else if(alignment&Static.AlignRight)
x+=margin;var y=pos.y;if(alignment&Static.AlignBottom)
y+=margin;else if(alignment&Static.AlignTop)
y-=textRect.height()+margin;textRect.moveTopLeft(new Misc.Point(x,y));var pickRect=new Misc.Rect(new Misc.Point(),this.trackerOverlay().width(),this.trackerOverlay().height());var right=Math.min(textRect.right(),pickRect.right()-margin);var bottom=Math.min(textRect.bottom(),pickRect.bottom()-margin);textRect.moveBottomRight(new Misc.Point(right,bottom));var left=Math.max(textRect.left(),pickRect.left()+margin);var top=Math.max(textRect.top(),pickRect.top()+margin);textRect.moveTopLeft(new Misc.Point(left,top));return textRect;}
this.eventFilter=function(object,event){if(!this.isEnabled())return false;if(object&&object==this.parentWidget()){switch(event.type){case'mouseenter':{this.widgetEnterEvent(event);break;}
case'mouseleave':{this.widgetLeaveEvent(event);break;}
case mousedownEvent:{this.widgetMousePressEvent(event);break;}
case mouseupEvent:{this.widgetMouseReleaseEvent(event);break;}
case'dblclick':{this.widgetMouseDoubleClickEvent(event);break;}
case mousemoveEvent:{this.widgetMouseMoveEvent(event);break;}
case'keydown':{this.widgetKeyPressEvent(event);break;}
case'keyup':{this.widgetKeyReleaseEvent(event);break;}
case'mousewheel':{this.widgetWheelEvent(event);break;}
default:break;}}
return false;}
this.transition=function(event){if(!d_data.stateMachine)
return;var commandList=d_data.stateMachine.transition(this,event);var pos;switch(event.type){case mousedownEvent:case mouseupEvent:case mousemoveEvent:{var me=event;var pos=new Misc.Point(me.clientX,me.clientY);if(Static.isMobile()){pos=new Misc.Point(event.originalEvent.changedTouches[0].clientX,event.originalEvent.changedTouches[0].clientY)}
pos=this.parentWidget().mapToElement(pos);break;}
default:pos=this.parentWidget().mapToElement(new Misc.Point(0,0));}
for(var i=0;i<commandList.length;i++){switch(commandList[i]){case Static.Begin:{this.begin();break;}
case Static.Append:{this.append(pos);break;}
case Static.Move:{this.move(pos);break;}
case Static.Remove:{this.remove();break;}
case Static.End:{this.end();break;}}}}
this.reset=function(){if(d_data.stateMachine)
d_data.stateMachine.reset();if(this.isActive())
this.end(false);}
this.append=function(pos){if(d_data.isActive){d_data.pickedPoints.push(pos);this.updateDisplay();Static.trigger('appended',pos)}}
this.move=function(pos){if(d_data.isActive){var idx=d_data.pickedPoints.length-1;if(idx>=0){if(d_data.pickedPoints[idx]!=pos){d_data.pickedPoints[idx]=pos;this.updateDisplay();Static.trigger('moved',pos)}}}}
this.remove=function(){if(d_data.isActive){var idx=d_data.pickedPoints.length-1;if(idx>0){var pos=d_data.pickedPoints.pop()
this.updateDisplay();Static.trigger('removed',pos);}}}
this.accept=function(selection){return true;}
this.isActive=function(){return d_data.isActive;}
this.pickedPoints=function(){return d_data.pickedPoints;}
this.setMouseTracking=function(enable){var widget=this.parentWidget();if(!widget)
return;if(enable){d_data.mouseTracking=widget.hasMouseTracking();widget.setMouseTracking(true);}else{widget.setMouseTracking(d_data.mouseTracking);}}
this.pickArea=function(){var widget=this.parentWidget();if(widget)
return(widget.contentsRect());return null}
this.updateDisplay=function(){var w=this.parentWidget();var showRubberband=false;var showTracker=false;if(w&&w.isVisible()&&d_data.enabled){if(this.rubberBand()!==Static.NoRubberBand&&this.isActive()&&this.rubberBandPen().style!==Static.NoPen){showRubberband=true;}
if(this.trackerMode()==Static.AlwaysOn||(this.trackerMode()==Static.ActiveOnly&&this.isActive())){if(this.trackerPen()!=Static.NoPen)
{showTracker=true;}}}
var rw=d_data.rubberBandOverlay;if(showRubberband){if(rw==null){rw=new PickerRubberband(this,w);rw.setObjectName("PickerRubberBand");d_data.rubberBandOverlay=rw}
rw.updateOverlay();}else{if(rw){d_data.rubberBandOverlay.getCanvas().hide()
delete d_data.rubberBandOverlay.getCanvas()
d_data.rubberBandOverlay=null}}
var tw=d_data.trackerOverlay;if(showTracker){if(tw==null){tw=new PickerTracker(this,w);tw.setObjectName("PickerTracker");d_data.trackerOverlay=tw}
tw.updateOverlay();}else{if(tw){d_data.trackerOverlay.getCanvas().hide()
delete d_data.trackerOverlay.getCanvas()
d_data.trackerOverlay=null}}}
this.rubberBandOverlay=function(){return d_data.rubberBandOverlay;}
this.trackerOverlay=function(){return d_data.trackerOverlay;}
if(rubberBand==undefined&&trackerMode==undefined)
this.init(parent,Static.NoRubberBand,Static.AlwaysOff);else
this.init(parent,rubberBand,trackerMode);}
widgetEnterEvent(event){this.transition(event);}
widgetLeaveEvent(event){this.transition(event);this.getPickerData().trackerPosition=new Misc.Point(-1,-1);if(!this.isActive())
this.updateDisplay();}
widgetKeyReleaseEvent(keyEvent){this.transition(keyEvent);}
widgetWheelEvent(wheelEvent){var pos=new Misc.Point(wheelEvent.clientX,wheelEvent.clientY)
if(this.pickArea().contains(pos))
this.getPickerData().trackerPosition=pos;else
this.getPickerData().trackerPosition=new Misc.Point(-1,-1);this.updateDisplay();this.transition(wheelEvent);}
widgetMouseDoubleClickEvent(mouseEvent){this.transition(mouseEvent);}
widgetMouseMoveEvent(mouseEvent){var pos=new Misc.Point(mouseEvent.clientX,mouseEvent.clientY);if(Static.isMobile()){pos=new Misc.Point(mouseEvent.originalEvent.changedTouches[0].clientX,mouseEvent.originalEvent.changedTouches[0].clientY)}
pos=this.mapToElement(pos);if(this.pickArea().contains(pos))
this.getPickerData().trackerPosition=pos;else
this.getPickerData().trackerPosition=new Misc.Point(-1,-1);if(!this.isActive())
this.updateDisplay();this.transition(mouseEvent);}
widgetMousePressEvent(mouseEvent){this.transition(mouseEvent);}
widgetKeyPressEvent(keyEvent){var dx=0;var dy=0;var offset=1;if(this.keyMatch(KeyLeft,keyEvent))
dx=-offset;else if(this.keyMatch(KeyRight,keyEvent))
dx=offset;else if(this.keyMatch(KeyUp,keyEvent))
dy=-offset;else if(this.keyMatch(KeyDown,keyEvent))
dy=offset;else if(this.keyMatch(KeyAbort,keyEvent)){this.reset();}else
this.transition(keyEvent);if(dx!==0||dy!==0){var rect=pickArea()
var pos=this.parentWidget().mapToElement(new Misc.Point(clientX,clientY));var x=pos.x+dx;x=Math.max(rect.left(),x);x=Math.min(rect.right(),x);var y=pos.y+dy;y=Math.max(rect.top(),y);y=Math.min(rect.bottom(),y);}}
widgetMouseReleaseEvent(mouseEvent){this.transition(mouseEvent);}
end(ok){var d=this.getPickerData();if(d.isActive){this.setMouseTracking(false);d.isActive=false;Static.trigger('activated',false);if(this.trackerMode()==Static.ActiveOnly)
d.trackerPosition=new Misc.Point(-1,-1);if(ok)
ok=this.accept(d.pickedPoints);if(ok)
Static.trigger('selected',d.pickedPoints);else
d.pickedPoints.resize(0);this.updateDisplay();}else
ok=false;return ok;}
begin(){var d=this.getPickerData();if(!d)
return;if(d.isActive)
return;d.pickedPoints=[]
d.isActive=true;Static.trigger('activated',true);if(this.trackerMode()!==Static.AlwaysOff){if(d.trackerPosition.x<0||d.trackerPosition.y<0){var w=this.parentWidget();if(w)
d.trackerPosition=w.mapToElement(new Misc.Point(0,0));}}
this.updateDisplay();this.setMouseTracking(true);}
trackerText(pos){var label
switch(this.rubberBand()){case Static.HLineRubberBand:label=pos.y.toString();break;case Static.VLineRubberBand:label=pos.x.toString();break;default:label=pos.x.toString()+", "+pos.y.toString();}
return label;}}
Picker.pickers=[];define("qwtpicker",["static","widgetOverlay","qwtpickermachine"],function(){});class PlotPicker extends Picker{constructor(xAxis,yAxis,rubberBand,trackerMode,canvas){var _constructor=0
if(typeof(xAxis)!=='number'){canvas=xAxis
xAxis=-1
yAxis=-1
rubberBand=Static.NoRubberBand
trackerMode=Static.AlwaysOff
_constructor=1}
if(typeof(rubberBand)!=='number'){canvas=rubberBand
rubberBand=Static.NoRubberBand
trackerMode=Static.AlwaysOff
_constructor=2}
if(canvas instanceof Plot)
canvas=canvas.getCentralWidget()
super(rubberBand,trackerMode,canvas)
this.d_xAxis=-1;this.d_yAxis=-1;if(_constructor==1){var plot=this.plot();var xAxis=xBottom;if(plot&&!plot.axisEnabled(xBottom)&&plot.axisEnabled(xTop))
{xAxis=xTop;}
var yAxis=yLeft;if(plot&&!plot.axisEnabled(yLeft)&&plot.axisEnabled(yRight))
{yAxis=yRight;}
this.setAxis(xAxis,yAxis);}
else{this.d_xAxis=xAxis;this.d_yAxis=yAxis;}
this.setEnabled(true)
if(canvas)
canvas.setEnabled_1(true)}
setAxis(xAxis,yAxis){var plt=this.plot();if(!plt)
return;if(xAxis!=this.d_xAxis||yAxis!=this.d_yAxis)
{this.d_xAxis=xAxis;this.d_yAxis=yAxis;}}
xAxis(){return this.d_xAxis;}
yAxis(){return this.d_yAxis;}
plot(){var w=this.parentWidget()
if(!w)
return null
return w.plot;}
canvas(){return this.parentWidget();}
scaleRect(){var rect=null;if(this.plot())
{var xs=this.plot().axisScaleDiv(this.xAxis());var ys=this.plot().axisScaleDiv(this.yAxis());rect=new Misc.Rect(xs.lowerBound(),ys.lowerBound(),xs.range(),ys.range());rect=rect.normalized();}
return rect;}
invTransform(rect){var xMap=this.plot().canvasMap(this.d_xAxis);var yMap=this.plot().canvasMap(this.d_yAxis);if(rect.x!==undefined){var pos=rect
return new Misc.Point(xMap.invTransform(pos.x),yMap.invTransform(pos.y));}else{return Static.mInvTransform(xMap,yMap,rect)}}
transform(rect){var xMap=this.plot().canvasMap(this.d_xAxis);var yMap=this.plot().canvasMap(this.d_yAxis);if(rect.x!==undefined){var pos=rect
var p=new Misc.Point(xMap.transform(pos.x),yMap.transform(pos.y));return p}else{return Static.mTransform(xMap,yMap,rect);}}
trackerText(pos){pos=this.invTransform(pos)
var label
switch(this.rubberBand()){case Static.HLineRubberBand:label=pos.y.toString();break;case Static.VLineRubberBand:label=pos.x.toString();break;default:label=pos.x.toString()+", "+pos.y.toString();}
return label;}
move(pos){super.method(move(pos));Static.trigger('moved',invTransform(pos))}
append(pos){super.method(append(pos));Static.trigger('appended',invTransform(pos))}
end(ok=true){ok=super.end(ok);if(!ok)
return false;var plot=this.plot();if(!plot)
return false;var points=this.selection();if(points.length==0)
return false;var selectionType=Static.NoSelection;if(this.stateMachine())
selectionType=this.stateMachine().selectionType();switch(selectionType)
{case Static.PointSelection:{var pos=this.invTransform(points[0]);Static.trigger('selected',pos)
break;}
case Static.RectSelection:{if(points.length>=2)
{var p1=points[0];var p2=points[points.length-1];var rect=new Misc.Rect(p1,p2).normalized();Static.trigger('selected',this.invTransform(rect))}
break;}
case Static.PolygonSelection:{var dpa=[];for(var i=0;i<points.length;i++)
dpa.push(this.invTransform(points[i]));Static.trigger('selected',dpa)}
default:break;}
return true;}};define("qwtplotpicker",["static","qwtpicker"],function(){});class PrivateData_2{constructor(){this.zoomRectIndex;this.zoomStack=[];this.maxStackDepth;}};class PlotZoomer extends PlotPicker{constructor(xAxis,yAxis,canvas,doReplot=true){if(typeof(xAxis)!=='number'){canvas=xAxis
super(canvas)}else{super(xAxis,yAxis,canvas)}
var self=this;var d_data;this.getZoomerData=function(){return d_data}
this.init=function(doReplot){d_data=new PrivateData_2();d_data.maxStackDepth=-1;this.setTrackerMode(Static.ActiveOnly);this.setRubberBand(Static.RectRubberBand);this.setStateMachine(new PickerDragRectMachine());this.plot().zoomer=this;Static.trigger('zoomerAdded',this)
if(doReplot&&this.plot()){this.plot().replot();}
this.setZoomBase(this.scaleRect());}
this.setZoomBase=function(doReplot=true){if(typeof(doReplot)=='object'){var base=doReplot
var plt=this.plot();if(!plt)
return;var sRect=this.scaleRect();var bRect=base|sRect;var bRect=null
if(!base)
bRect=sRect
else
bRect=base
d_data.zoomStack=[];d_data.zoomStack.push(bRect);d_data.zoomRectIndex=0;if(!base.isEqual(sRect)){d_data.zoomStack.push(sRect);d_data.zoomRectIndex++;}
this.rescale();}else{var plt=this.plot();if(plt==null)
return;if(doReplot)
plt.replot();d_data.zoomStack=[]
d_data.zoomStack.push(this.scaleRect());d_data.zoomRectIndex=0;this.rescale();}}
this.zoomBase=function(){return d_data.zoomStack[0];}
this.zoomRect=function(){return d_data.zoomStack[d_data.zoomRectIndex];}
this.setMaxStackDepth=function(depth){d_data.maxStackDepth=depth;if(depth>=0){var zoomOut=(d_data.zoomStack.length)-1-depth;if(zoomOut>0){this.zoom(-zoomOut);for(var i=(d_data.zoomStack.length)-1;i>(d_data.zoomRectIndex);i--){d_data.zoomStack.pop();}}}}
this.maxStackDepth=function(){return d_data.maxStackDepth;}
this.zoomStack=function(){return d_data.zoomStack;}
this.setZoomStack=function(zoomStack,zoomRectIndex=-1){if(this.zoomStack.length==0)
return;if(d_data.maxStackDepth>=0&&(this.zoomStack.length)>d_data.maxStackDepth){return;}
if(zoomRectIndex<0||zoomRectIndex>(this.zoomStack.length))
zoomRectIndex=zoomStack.length-1;var doRescale=this.zoomStack[zoomRectIndex]!=this.zoomRect();d_data.zoomStack=zoomStack;d_data.zoomRectIndex=zoomRectIndex;if(doRescale){this.rescale();Static.trigger('zoomed',this.zoomRect())}}
this.zoomRectIndex=function(){return d_data.zoomRectIndex;}
this.moveBy=function(dx,dy){var rect=d_data.zoomStack[d_data.zoomRectIndex];moveTo(new Misc.Point(rect.left()+dx,rect.top()+dy));}
this.moveTo=function(pos){var x=pos.x;var y=pos.y;if(x<this.zoomBase().left())
x=this.zoomBase().left();if(x>this.zoomBase().right()-this.zoomRect().width())
x=this.zoomBase().right()-this.zoomRect().width();if(y<this.zoomBase().top())
y=this.zoomBase().top();if(y>this.zoomBase().bottom()-this.zoomRect().height())
y=this.zoomBase().bottom()-this.zoomRect().height();if(x!=this.zoomRect().left()||y!=this.zoomRect().top()){d_data.zoomStack[d_data.zoomRectIndex].moveTo(x,y);this.rescale();}}
this.zoom=function(rect){if(typeof(rect)=='number'){var offset=rect;if(offset==0)
d_data.zoomRectIndex=0;else{var newIndex=d_data.zoomRectIndex+offset;newIndex=Math.max(0,newIndex);newIndex=Math.min((d_data.zoomStack.length)-1,newIndex);d_data.zoomRectIndex=newIndex;}
this.rescale();Static.trigger('zoomed',this.zoomRect())}else{if(d_data.maxStackDepth>=0&&(d_data.zoomRectIndex)>=d_data.maxStackDepth){return;}
var zoomRect=rect.normalized();if(!zoomRect.isEqual(d_data.zoomStack[d_data.zoomRectIndex])){for(var i=(d_data.zoomStack.length)-1;i>d_data.zoomRectIndex;i--){d_data.zoomStack.pop();}
d_data.zoomStack.push(zoomRect);d_data.zoomRectIndex++;this.rescale();Static.trigger('zoomed',zoomRect)}}}
this.rescale=function(){var plt=this.plot();if(!plt)
return;var rect=d_data.zoomStack[d_data.zoomRectIndex];if(!rect.isEqual(this.scaleRect())){var doReplot=plt.autoReplot();plt.setAutoReplot(false);var x1=rect.left();var x2=rect.right();if(!plt.axisScaleDiv(this.xAxis()).isIncreasing()){var temp=x1
x1=x2
x2=x1}
plt.setAxisScale(this.xAxis(),x1,x2);var y1=rect.top();var y2=rect.bottom();if(!plt.axisScaleDiv(this.yAxis()).isIncreasing()){var temp=y1
y1=y2
y2=y1}
plt.setAxisScale(this.yAxis(),y1,y2);plt.setAutoReplot(doReplot);plt.replot();}}
this.minZoomSize=function(){return new Misc.Size(d_data.zoomStack[0].width()/10e4,d_data.zoomStack[0].height()/10e4);}
this.accept=function(pa){if(pa.length<2)
return false;var rect=new Misc.Rect(pa[0],pa[pa.length-1]);rect=rect.normalized();var minSize=2;if(rect.width()<minSize&&rect.height()<minSize)
return false;var minZoomSize=11;var center=rect.center();rect.setSize(rect.size().expandedTo(new Misc.Size(minZoomSize,minZoomSize)));rect.moveCenter(center);pa.resize(2);pa[0]=rect.topLeft();pa[1]=rect.bottomRight();return true;}
if(canvas)
this.init(doReplot);}
widgetKeyPressEvent(ke){if(!this.isActive()){if(this.keyMatch(KeyUndo,ke))
this.zoom(-1);else if(this.keyMatch(KeyRedo,ke))
this.zoom(+1);else if(this.keyMatch(KeyHome,ke))
this.zoom(0);}
super.widgetKeyPressEvent(ke);}
widgetMouseReleaseEvent(me){if(this.mouseMatch(MouseSelect2,me));else if(this.mouseMatch(MouseSelect3,me))
this.zoom(-1);else if(this.mouseMatch(MouseSelect6,me))
this.zoom(+1);else
super.widgetMouseReleaseEvent(me)}
end(ok=true){ok=super.end(ok);if(!ok)
return false;var plot=this.plot();if(!plot)
return false;var pa=this.selection();if(pa.length<2)
return false;var rect=new Misc.Rect(pa[0],pa[(pa.length-1)]);rect=rect.normalized();var zoomRect=this.invTransform(rect).normalized();var minSize=this.minZoomSize();if(minSize.isValid()){var center=zoomRect.center();zoomRect.setSize(zoomRect.size().expandedTo(this.minZoomSize()));zoomRect.moveCenter(center);}
this.zoom(zoomRect);return true;}
begin(){var d=this.getZoomerData()
if(d.maxStackDepth>=0){if(d.zoomRectIndex>=(d.maxStackDepth))
return;}
var minSize=this.minZoomSize();if(minSize.isValid()){var sz=new Misc.Size(d.zoomStack[d.zoomRectIndex].width()*0.9999,d.zoomStack[d.zoomRectIndex].height()*0.9999)
if(minSize.width>=sz.width&&minSize.height>=sz.height){return;}}
super.begin();}
setAxis(xAxis,yAxis){if(xAxis!=super.xAxis()||yAxis!=super.yAxis()){super.setAxis(xAxis,yAxis);if(this.setZoomBase!==undefined)
this.setZoomBase(this.scaleRect());}}};define("qwtplotzoomer",["qwtplotpicker"],function(){});Static.mVerifyRange=function(size,i1,i2){if(size<1)
return 0;i1=Math.max(0,Math.min(i1,size-1));i2=Math.max(0,Math.min(i2,size-1));if(i1>i2){var temp=i1;i1=i2;i2=temp;}
return(i2-i1+1);}
var LegendNoAttribute=0x00;var LegendShowLine=0x01;var LegendShowSymbol=0x02;var LegendShowBrush=0x04;function updateLegendIconSize(curve)
{var sz=curve.getLegendIconSize();if(curve.symbol()){sz=curve.symbol().boundingRect().size();}
if(curve.symbol()&&curve.testLegendAttribute(LegendShowSymbol))
{if(curve.testLegendAttribute(LegendShowLine))
{var w=Math.ceil(1.5*sz.width);if(w%2)
w++;sz.width=Math.max(40,w);}
curve.setLegendIconSize(sz);}
else if(curve.testLegendAttribute(LegendShowLine)){sz.width=40;curve.setLegendIconSize(sz);}}
Curve.inheritsFrom(PlotSeriesItem);function Curve(tle){PlotSeriesItem.call(this,tle);var m_style=Lines;var c_attributes=0;var m_baseline=0;var m_paintAttributes=FilterPoints;var m_legendAttributes=LegendNoAttribute;var m_brush=new Misc.Brush();var m_pen=new Misc.Pen;var m_curveFitter=null
var m_symbol=null;this.rtti=Static.Rtti_PlotCurve;this.setItemInterest(ScaleInterest,true)
this.minXValue=function()
{return this.boundingRect().left();}
this.maxXValue=function()
{return this.boundingRect().right();}
this.minYValue=function()
{return this.boundingRect().top();}
this.maxYValue=function()
{return this.boundingRect().bottom();}
this.setLegendAttribute=function(attribute,on)
{if(on!=this.testLegendAttribute(attribute))
{if(on)
m_legendAttributes|=attribute;else
m_legendAttributes&=~attribute;updateLegendIconSize(this);if(this.plot())
this.plot().updateLegend(this)}}
this.testLegendAttribute=function(attribute)
{return(m_legendAttributes&attribute);}
this.legendAttributes=function()
{return m_legendAttributes;}
this.setSymbol=function(symbol)
{if(symbol!==m_symbol)
{m_symbol=symbol;updateLegendIconSize(this);this.legendChanged();this.itemChanged();}}
this.symbol=function()
{return m_symbol;}
this.setBrush=function(brush){if(typeof(brush)=="string")
brush=new Misc.Brush(brush)
m_brush=brush;this.legendChanged();this.itemChanged();}
this.brush=function(){return m_brush;}
this.setPen=function(pen){if(typeof(pen)!=="object")
return
m_pen=pen;this.legendChanged();this.itemChanged();}
this.pen=function(){return m_pen;}
this.setPaintAttribute=function(attribute,on)
{if(on)
m_paintAttributes|=attribute;else
m_paintAttributes&=~attribute;}
this.testPaintAttribute=function(attribute)
{return(m_paintAttributes&attribute);}
this.setSamples=function(samples)
{this.setData(new PointSeriesData(samples));}
this.setCurveAttribute=function(attribute,on)
{if(typeof(on)==="undefined")
on=true;if((c_attributes&attribute)==on)
return;if(on)
c_attributes|=attribute;else
c_attributes&=~attribute;this.itemChanged();}
this.testCurveAttribute=function(attribute)
{return c_attributes&attribute;}
this.init=function()
{this.setItemAttribute(Legend,true);this.setItemAttribute(AutoScale,true);this.setData(new PointSeriesData());this.setCurveAttribute(Fitted,true);this.setZ(20.0);}
this.setStyle=function(style)
{if(style!=m_style)
{m_style=style;this.legendChanged();this.itemChanged();}}
this.style=function()
{return m_style;}
this.drawSeries=function(xMap,yMap,from,to)
{var ctx=this.getContext();var painter=new PaintUtil.Painter(ctx);var numSamples=this.dataSize();if(numSamples<=0)
return;if(to<0)
to=numSamples-1;if(Static.mVerifyRange(numSamples,from,to)>0)
{painter.save();painter.setPen(m_pen);painter.setBrush(m_brush);this.drawCurve(painter,m_style,xMap,yMap,from,to);painter.restore();if(m_symbol&&(m_symbol.style()!==NoSymbol))
{painter.save();painter.setPen(m_symbol.pen());painter.setBrush(m_symbol.brush());this.drawSymbols(ctx,m_symbol,xMap,yMap,from,to);painter.restore();}}
painter=null}
this.drawSymbols=function(ctx,symbol,xMap,yMap,from,to)
{var mapper=new PointMapper();mapper.setFlag(WeedOutPoints,this.testPaintAttribute(FilterPoints));var chunkSize=500;for(var i=from;i<=to;i+=chunkSize)
{var n=Math.min(chunkSize,to-i+1);var points=mapper.toPointsF(xMap,yMap,this.data(),i,i+n-1);if(points.length>0)
symbol.drawSymbols(ctx,points);}}
this.setBaseline=function(value){if(m_baseline!=value)
{m_baseline=value;this.itemChanged();}}
this.baseline=function()
{return m_baseline;}
this.drawCurve=function(painter,style,xMap,yMap,from,to)
{switch(style)
{case Lines:if(this.testCurveAttribute(Fitted))
{from=0;to=this.dataSize()-1;}
this.drawLines(painter,xMap,yMap,from,to);break;case Sticks:this.drawSticks(painter,xMap,yMap,from,to);break;case Steps:this.drawSteps(painter,xMap,yMap,from,to);break;case Dots:this.drawDots(painter,xMap,yMap,from,to);break;case NoCurve:default:break;}}
this.drawLines=function(painter,xMap,yMap,from,to)
{if(from>to)
return;var doFit=(c_attributes&Fitted)&&m_curveFitter;var doFill=m_brush.color!==Static.NoBrush?true:false;var doIntegers=false;var mapper=new PointMapper;var polyline=mapper.toPolygonF(xMap,yMap,this.data(),from,to);if(doFit){polyline=m_curveFitter.fitCurve(polyline);}
painter.drawPolyline(polyline);if(doFill)
{this.fillCurve(painter,xMap,yMap,polyline);}}
this.setCurveFitter=function(curveFitter)
{m_curveFitter=curveFitter;this.itemChanged();}
this.curveFitter=function()
{return m_curveFitter;}
function qwtSqr(x)
{return x*x;}
this.closestPoint=function(pos,dist)
{let numSamples=this.dataSize();if(this.plot()==null||numSamples<=0)
return-1;let series=this.data();let xMap=this.plot().canvasMap(this.xAxis());let yMap=this.plot().canvasMap(this.yAxis());let index=-1;let dmin=1.0e10;for(var i=0;i<numSamples;i++)
{let sample=series.sample(i);let cx=xMap.transform(sample.x)-pos.x;let cy=yMap.transform(sample.y)-pos.y;let f=qwtSqr(cx)+qwtSqr(cy);if(f<dmin)
{index=i;dmin=f;}}
if(dist)
dist.distance=Math.sqrt(dmin);return index;}
this.fillCurve=function(painter,xMap,yMap,polygon)
{if(m_brush.color==Static.NoBrush)
return;this.closePolyline(xMap,yMap,polygon);if(polygon.length<=2)
return;painter.setPen(new Misc.Pen(m_brush.color))
painter.drawPolygon(polygon)}
this.closePolyline=function(xMap,yMap,polygon)
{if(polygon.length<2)
return;var baseline=m_baseline;if(this.orientation()==Vertical)
{if(yMap.transformation())
baseline=yMap.transformation().bounded(baseline);var refY=yMap.transform(baseline);polygon.push(new Misc.Point(polygon[polygon.length-1].x,refY));polygon.push(new Misc.Point(polygon[0].x,refY));}
else
{if(xMap.transformation())
baseline=xMap.transformation().bounded(baseline);var refX=xMap.transform(baseline);polygon.push(new Misc.Point(refX,polygon[polygon.length-1].y));polygon.push(new Misc.Point(refX,polygon[0].y));}}
this.drawSteps=function(painter,xMap,yMap,from,to)
{var points=[];var sz=2*(to-from)+1;for(var i=0;i<sz;++i)
points.push(new Misc.Point())
var inverted=this.orientation()==Vertical;if(c_attributes&Inverted)
inverted=!inverted;var series=this.data();var i,ip;for(i=from,ip=0;i<=to;i++,ip+=2)
{var sample=series.sample(i);var xi=xMap.transform(sample.x);var yi=yMap.transform(sample.y);if(ip>0)
{var p0=points[ip-2];var p=points[ip-1];if(inverted)
{p.x=p0.x;p.y=yi;}
else
{p.x=xi;p.y=p0.y;}}
points[ip].x=xi;points[ip].y=yi;}
painter.drawPolyline(points);}
this.drawSticks=function(painter,xMap,yMap,from,to)
{var x0=xMap.transform(m_baseline);var y0=yMap.transform(m_baseline);var o=this.orientation();var series=this.data();for(var i=from;i<=to;i++)
{var sample=series.sample(i);var xi=xMap.transform(sample.x);var yi=yMap.transform(sample.y);if(o==Horizontal)
painter.drawLine(x0,yi,xi,yi);else
painter.drawLine(xi,y0,xi,yi);}}
this.drawDots=function(painter,xMap,yMap,from,to)
{var mapper=new PointMapper;if(m_paintAttributes&FilterPoints)
{mapper.setFlag(WeedOutPoints,true);}
if(m_paintAttributes&MinimizeMemory)
{var series=this.data();for(var i=from;i<=to;i++)
{var sample=series.sample(i);var xi=xMap.transform(sample.x);var yi=yMap.transform(sample.y);painter.drawPoint(new Misc.Point(xi,yi));}}
else
{var points=mapper.toPointsF(xMap,yMap,this.data(),from,to);painter.drawPoints(points);}}
this.init();}
Curve.prototype.legendIcon=function(index,size)
{if(size.width===0&&size.height===0)
return null;var graphic=new GraphicUtil.Graphic(null,size.width,size.height);var painter=new PaintUtil.Painter(graphic);if(this.legendAttributes()==0||this.legendAttributes()&LegendShowBrush)
{var brush=this.brush();if(brush.color==Static.NoBrush&&this.legendAttributes()==0)
{if(this.style()!=NoCurve)
{brush=new Misc.Brush(this.pen().color);}
else if(this.symbol()&&(this.symbol().style()!=NoSymbol))
{brush=new Misc.Brush(this.symbol().pen().color);}}
if(brush.color!=Static.NoBrush)
{var r=new Misc.Rect(0,0,size.width,size.height);painter.fillRect(r,brush);}}
if(this.legendAttributes()&LegendShowLine)
{if(this.pen().color!=Static.NoPen)
{var pn=this.pen();painter.setPen(pn);var y=0.5*size.height;painter.drawLine(0.0,y,size.width,y);}}
if(this.legendAttributes()&LegendShowSymbol)
{if(this.symbol())
{var sh=size.height/2+1
if(this.symbol().style()==Ellipse)
sh-=1
painter.setPen(this.symbol().pen())
this.symbol().drawGraphicSymbol(painter,new Misc.Point(size.width/2,sh),size);}}
painter=null
return graphic;}
Curve.prototype.removePoint=function(point,always){if(always==undefined)always=false;var samples=this.data().samples();if(samples.length==1&&!always){Static.alert("You cannot remove the only point in the curve. Remove the entire curve.")
return;}
var newSamples=[];for(var i=0;i<samples.length;++i){if(samples[i].isEqual(point))
continue;newSamples.push(samples[i])}
if(newSamples.length==samples.length&&!always){Static.alert("The point selected for removal does not exist.")
return;}
this.setSamples(newSamples);this.itemChanged();Static.trigger("pointRemoved",this);}
Curve.prototype.toString=function(){return'[Curve]';};define("qwtplotcurve",["static","seriesData"],function(){});function CurveFitter(){this.fitCurve=function(polygon){}};Static.FitMode={}
Static.FitMode.Auto=0
Static.FitMode.Spline=1
Static.FitMode.ParametricSpline=2
SplineCurveFitter.inheritsFrom(CurveFitter);function SplineCurveFitter(){CurveFitter.call(this);var m_fitMode=Static.FitMode.Auto
var m_spline=new Spline()
var m_splineSize=250
function fitSpline(points){m_spline.setPoints(points);if(!m_spline.isValid())
return points;var fittedPoints=new Array(m_splineSize);var x1=points[0].x;var x2=points[points.length-1].x;var dx=x2-x1;var delta=dx/(m_splineSize-1);for(var i=0;i<m_splineSize;i++)
{var v=x1+i*delta;var sv=m_spline.value(v);fittedPoints[i]=new Misc.Point(v,sv)}
m_spline.reset();return fittedPoints;}
function fitParametric(points){var i;var size=points.length;var fittedPoints=[]
var splinePointsX=[]
var splinePointsY=[]
var p=points;var spX=splinePointsX;var spY=splinePointsY;var param=0.0;for(i=0;i<size;i++)
{var x=p[i].x;var y=p[i].y;if(i>0)
{console.log(Math)
var delta=Math.sqrt(Static.sqr(x-spX[i-1].y())
+Static.sqr(y-spY[i-1].y()));param+=Math.max(delta,1.0);}
spX[i].x=param;spX[i].y=x;spY[i].x=param;spY[i].y=y;}
m_spline.setPoints(splinePointsX);if(!m_spline.isValid())
return points;var deltaX=splinePointsX[size-1].x/(m_splineSize-1);for(i=0;i<m_splineSize;i++)
{var dtmp=i*deltaX;fittedPoints[i].x=m_spline.value(dtmp);}
m_spline.setPoints(splinePointsY);if(m_spline.isValid())
return points;var deltaY=splinePointsY[size-1].x/(m_splineSize-1);for(i=0;i<m_splineSize;i++)
{var dtmp=i*deltaY;fittedPoints[i].y=m_spline.value(dtmp);}
return fittedPoints;}
this.setFitMode=function(mode){}
this.fitMode=function(){}
this.setSpline=function(spline){m_spline=spline;m_spline.reset();}
this.spline=function(){return m_spline;}
this.setSplineSize=function(splineSize){m_splineSize=Math.max(splineSize,10);}
this.splineSize=function(){return m_splineSize;}
this.fitCurve=function(points){var size=points.length;if(size<=2)
return points;var fitMode=m_fitMode;if(fitMode==Static.FitMode.Auto)
{fitMode=Static.FitMode.Spline;var p=points
for(var i=1;i<size;i++)
{if(p[i].x<=p[i-1].x)
{fitMode=Static.FitMode.ParametricSpline;break;}};}
if(fitMode==Static.FitMode.ParametricSpline)
return fitParametric(points);else
return fitSpline(points);}}
WeedingCurveFitter.inheritsFrom(CurveFitter);function WeedingCurveFitter(){CurveFitter.call(this);function simplify(polygon){}
this.setTolerance=function(val){}
this.tolerance=function(){}
this.setChunkSize=function(sz){}
this.chunkSize=function(){}
this.fitCurve=function(polygon){}};define("jQwtCurveFitter",["static"],function(){});Static.SplineType={}
Static.SplineType.Natural=0
Static.SplineType.Periodic=1
Static.lookup=function(x,values)
{var i1;var size=values.length;if(x<=values[0].x)
i1=0;else if(x>=values[size-2].x)
i1=size-2;else
{i1=0;var i2=size-2;var i3=0;while(i2-i1>1)
{i3=i1+((i2-i1)>>1);if(values[i3].x>x)
i2=i3;else
i1=i3;}}
return i1;}
function Spline(){var m_points=null
var m_a=[]
var m_b=[]
var m_c=[]
var m_splineType=Static.SplineType.Natural
this.setSplineType=function(splineType){m_splineType=splineType;}
this.splineType=function(){return m_splineType;}
this.setPoints=function(points){var size=points.length;if(size<=2)
{this.reset();return false;}
m_points=points;m_a.resize(size-1);m_b.resize(size-1);m_c.resize(size-1);var ok;if(m_splineType==Static.SplineType.Periodic)
ok=this.buildPeriodicSpline(points);else
ok=this.buildNaturalSpline(points);if(!ok)
this.reset();return ok;}
this.points=function(){return m_points;}
this.reset=function(){m_a.resize(0);m_b.resize(0);m_c.resize(0);m_points.resize(0);}
this.isValid=function(){return m_a.length>0;}
this.value=function(x){if(m_a.length==0)
return 0.0;var i=Static.lookup(x,m_points);var delta=x-m_points[i].x;return((((m_a[i]*delta)+m_b[i])*delta+m_c[i])*delta+m_points[i].y);}
this.coefficientsA=function(){return m_a;}
this.coefficientsB=function(){return m_b;}
this.coefficientsC=function(){return m_c;}
this.buildNaturalSpline=function(points){var i;var p=points;var size=points.length
var a=m_a;var b=m_b;var c=m_c;var h=new Array(size-1);for(i=0;i<size-1;i++)
{h[i]=p[i+1].x-p[i].x;if(h[i]<=0)
return false;}
var d=new Array(size-1);var dy1=(p[1].y-p[0].y)/h[0];for(i=1;i<size-1;i++)
{b[i]=c[i]=h[i];a[i]=2.0*(h[i-1]+h[i]);var dy2=(p[i+1].y-p[i].y)/h[i];d[i]=6.0*(dy1-dy2);dy1=dy2;}
for(i=1;i<size-2;i++)
{c[i]/=a[i];a[i+1]-=b[i]*c[i];}
var s=new Array(size);s[1]=d[1];for(i=2;i<size-1;i++)
s[i]=d[i]-c[i-1]*s[i-1];s[size-2]=-s[size-2]/a[size-2];for(i=size-3;i>0;i--)
s[i]=-(s[i]+b[i]*s[i+1])/a[i];s[size-1]=s[0]=0.0;for(i=0;i<size-1;i++)
{a[i]=(s[i+1]-s[i])/(6.0*h[i]);b[i]=0.5*s[i];c[i]=(p[i+1].y-p[i].y)/h[i]
-(s[i+1]+2.0*s[i])*h[i]/6.0;}
return true;}
this.buildPeriodicSpline=function(points){var i;var p=points;var size=points.length
var a=m_a
var b=m_b
var c=m_c
var d=new Array(size-1);var h=new Array(size-1);var s=new Array(size);for(i=0;i<size-1;i++)
{h[i]=p[i+1].x-p[i].x;if(h[i]<=0.0)
return false;}
var imax=size-2;var htmp=h[imax];var dy1=(p[0].y-p[imax].y)/htmp;for(i=0;i<=imax;i++)
{b[i]=c[i]=h[i];a[i]=2.0*(htmp+h[i]);var dy2=(p[i+1].y-p[i].y)/h[i];d[i]=6.0*(dy1-dy2);dy1=dy2;htmp=h[i];}
a[0]=Math.sqrt(a[0]);c[0]=h[imax]/a[0];var sum=0;for(i=0;i<imax-1;i++)
{b[i]/=a[i];if(i>0)
c[i]=-c[i-1]*b[i-1]/a[i];a[i+1]=Math.sqrt(a[i+1]-Static.sqr(b[i]));sum+=Static.sqr(c[i]);}
b[imax-1]=(b[imax-1]-c[imax-2]*b[imax-2])/a[imax-1];a[imax]=Math.sqrt(a[imax]-Static.sqr(b[imax-1])-sum);s[0]=d[0]/a[0];sum=0;for(i=1;i<imax;i++)
{s[i]=(d[i]-b[i-1]*s[i-1])/a[i];sum+=c[i-1]*s[i-1];}
s[imax]=(d[imax]-b[imax-1]*s[imax-1]-sum)/a[imax];s[imax]=-s[imax]/a[imax];s[imax-1]=-(s[imax-1]+b[imax-1]*s[imax])/a[imax-1];for(i=imax-2;i>=0;i--)
s[i]=-(s[i]+b[i]*s[i+1]+c[i]*s[imax])/a[i];s[size-1]=s[0];for(i=0;i<size-1;i++)
{a[i]=(s[i+1]-s[i])/(6.0*h[i]);b[i]=0.5*s[i];c[i]=(p[i+1].y-p[i].y)
/ h[i] - ( s[i+1] + 2.0 * s[i] ) * h[i] /6.0;}
return true;}};define("jQwtSpline",["static"],function(){});function SideBar(plot,tbar,makeSamples){var sideBarDlg=$('<div id="sideBar" style="position: absolute; height:98%; background-color:#ffc9ae;  border-style: solid; border-width:1px">\
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
$("body").append(sideBarDlg);var self=this
var sideBarVisible=false
var _rulers=null
var visible=false
Static.bind("beforePrint",function(){if(sideBarVisible){visible=true
showSidebar(false)}})
Static.bind("afterPrint",function(){if(visible){visible=false
showSidebar(true)}})
$("#sideBar").hide()
function initSidebarSelect(){var opts=$("#currentCurve").children()
for(var i=0;i<opts.length;++i){$("#currentCurve")[0].removeChild(opts[i]);}
var curves=plot.itemList(Static.Rtti_PlotCurve)
for(var i=0;i<curves.length;++i){if(curves[i].isVisible()){var opt=$('<option>'+curves[i].title()+'</option>')
opt.attr("value",curves[i].title())
$("#currentCurve").append(opt)}}}
function hideAllInputs(){for(var i=0;i<5;++i){$("#coeff_cont"+(i)).hide()}}
function initSidebarInput(){var curves=plot.itemList(Static.Rtti_PlotCurve)
hideAllInputs()
var curCurve=plot.findPlotCurve($("#currentCurve").val())
if(!curCurve){return}
$("#fnDisplay").val("")
if(curCurve.fn){$("#fnDisplay").val("f("+curCurve.variable+")="+curCurve.fn)}
var coeffs=curCurve.coeffs||[]
var step=(curCurve.upperX-curCurve.lowerX)/80
var numOfCoeffs=coeffs.length
if(numOfCoeffs>5){numOfCoeffs=5}
for(var i=0;i<numOfCoeffs;++i){$("#coeff"+i).html(coeffs[i])
$("#coeff_val"+i).attr("step",step)
$("#coeff_val"+i).val(curCurve.coeffsVal[i])
$("#coeff_cont"+i).show()}}
function initSidebar(){initSidebarSelect()
initSidebarInput()
if(_rulers){var curCurve=plot.findPlotCurve($("#currentCurve").val())
_rulers.setCurrentCurve(curCurve)}}
this.initSidebar=function(){initSidebar()}
this.currentCurveName=function(){return $("#currentCurve").val()}
this.setRulers=function(rulers){_rulers=rulers}
var sideBarWidth=20
$("#sideBar").css("width",(sideBarWidth-0.2)+"%")
$("#sideBar").css("left",(100-sideBarWidth+0.1)+"%")
function showSidebar(on){if(on){$("#sideBar").show()
$("#plotDiv").parent().css("width",(100-sideBarWidth)+"%")
initSidebar()}else{$("#sideBar").hide()
$("#plotDiv").parent().css("width","100%")}
sideBarVisible=on
plot.autoRefresh()}
this.showSidebar=function(on){showSidebar(on)}
$("#currentCurve").change(function(){Static.total_volume=undefined
Static.total_area=undefined
Static.prevStart=undefined
Static.prevEnd=undefined
initSidebarInput()
if(_rulers){var curCurve=plot.findPlotCurve($("#currentCurve").val())
_rulers.setCurrentCurve(curCurve)}})
Static.bind("pointAdded pointRemoved",function(e,curve){$("#currentCurve").val(curve.title)})
function adjustCurve(){var curCurve=plot.findPlotCurve($("#currentCurve").val())
var coeffs=curCurve.coeffs
var fn=curCurve.fn
for(var i=0;i<coeffs.length;++i){while(fn.indexOf(coeffs[i])!=-1){fn=fn.replace(coeffs[i],$("#coeff_val"+i).val())}
curCurve.coeffsVal[i]=$("#coeff_val"+i).val()}
var data=curCurve.data()
if(curCurve.unboundedRange){data.setFn(fn)}else{data.setSamples(makeSamples({fx:fn,lowerX:curCurve.lowerX,upperX:curCurve.upperX,numOfSamples:curCurve.numOfSamples}))}
Static.trigger("curveAdjusted")
plot.autoRefresh()}
$("#coeff_val0, #coeff_val1, #coeff_val2, #coeff_val3, #coeff_val4").on("input",function(){if(!$("#onchange")[0].checked)
adjustCurve()})
$("#coeff_val0, #coeff_val1, #coeff_val2, #coeff_val3, #coeff_val4").on("change",function(){if($("#onchange")[0].checked)
adjustCurve()})};define("sideBar",function(){});class Panner extends HObject{constructor(plot){super()
var self=this;var m_plot=null;var m_mouseButton=Static.LeftButton
var buttonModifiers=Static.NoModifier;var abortKey=Static.Key_Escape;var abortKeyModifiers=Static.NoModifier;var initialPosX=0;var initialPosY=0;var posX=0;var posY=0;var m_enabled=false;var m_canvas=null;var m_mouseDown=false;var m_cursor="";var m_restoreCursor="";var m_hasCursor=false;var m_orientations=Vertical|Horizontal;var deltaX=0;var deltaY=0;if(typeof(plot)!=="undefined"){plot.panner=this
m_plot=plot;}
this.plot=function(){return m_plot;}
this.setMouseButton=function(btn,modifiers)
{m_mouseButton=btn;buttonModifiers=modifiers;}
this.getMouseButton=function(){return{button:m_mouseButton,modifiers:buttonModifiers}}
this.setOrientation=function(orientation){m_orientations=orientation}
function movePlotItems(){var itemStore=self.plot().plotItemStore();for(var i=0;i<itemStore.length;++i){var c=itemStore[i].getCanvas();c.css("left",deltaX);c.css("top",deltaY);}}
this.rescaleAndRedraw=function(_deltaX,_deltaY){var itemStore=self.plot().plotItemStore();for(var i=0;i<itemStore.length;++i){var c=itemStore[i].getCanvas();c.css("left",0);c.css("top",0);}
var doReplot=false;var autoReplot=m_plot.autoReplot();m_plot.setAutoReplot(false);var rescaled=false
for(var axis=0;axis<axisCnt;axis++)
{var map=self.plot().canvasMap(axis);var p1=map.transform(self.plot().axisScaleDiv(axis).lowerBound());var p2=map.transform(self.plot().axisScaleDiv(axis).upperBound());var d1,d2;if(axis==xBottom||axis==xTop)
{d1=map.invTransform(p1-_deltaX);d2=map.invTransform(p2-_deltaX);}
else
{d1=map.invTransform(p1-_deltaY);d2=map.invTransform(p2-_deltaY);}
m_plot.setAxisScale(axis,d1,d2);doReplot=true;}
m_plot.setAutoReplot(autoReplot);if(doReplot)
m_plot.replot();}
this.showCursor=function(on)
{if(on==m_hasCursor)
return;if(this.plot()==null||m_cursor=="")
return;m_hasCursor=on;if(on)
{if(this.plot().isCursorSet())
{m_restoreCursor=this.plot().cursor();}
this.plot().setCursor(m_cursor);}
else
{if(m_restoreCursor!=="")
{this.plot().setCursor(m_restoreCursor);m_restoreCursor="";}
else
this.plot().unsetCursor();}}
this.setCursor=function(cursor)
{m_cursor=cursor;}
this.cursor=function()
{if(m_cursor!="")
return m_cursor;if(this.plot()!=null)
return this.plot().cursor();return"";}
if(this.plot())
this.setEnabled_1(true);this.setEnabled=function(enabled){if(m_enabled!=enabled){m_enabled=enabled;var w=plot.getCentralWidget();if(w){if(enabled){w.installEventFilter(this);}
else
w.removeEventFilter(this);}}}
this.isEnabled=function(enabled){return m_enabled;}
this.widgetMousePressEvent=function(event){if(!Static.isMobile()&&(event.button!=m_mouseButton))
{return true;}
if(Static.isMobile()){initialPosX=event.originalEvent.touches[0].clientX;initialPosY=event.originalEvent.touches[0].clientY;m_mouseDown=true;}else{initialPosX=event.clientX;initialPosY=event.clientY;m_mouseDown=true;}
this.showCursor(true)
return true;}
this.widgetMouseUpEvent=function(event){if(!m_mouseDown)return
m_mouseDown=false;self.showCursor(false)
if(deltaX!=0||deltaY!=0){self.rescaleAndRedraw(deltaX,deltaY)
deltaX=0;deltaY=0;}}
this.widgetMouseMoveEvent=function(event){if(m_mouseDown){if(!Static.isMobile()){deltaX=event.clientX-initialPosX;deltaY=event.clientY-initialPosY;}else{var touchobj=event.originalEvent.changedTouches[0]
deltaX=parseInt(touchobj.clientX)-initialPosX;deltaY=parseInt(touchobj.clientY)-initialPosY;}
if(m_orientations==Vertical)
deltaX=0
if(m_orientations==Horizontal)
deltaY=0
movePlotItems();}}
Static.trigger('pannerAdded',this)
this.setEnabled(true)}
eventFilter(watched,event){if(!this.isEnabled())return
var mt=false;switch(event.type){case'mousedown':case'touchstart':{this.widgetMousePressEvent(event)}
break;case'mousemove':case'touchmove':this.widgetMouseMoveEvent(event)
break;case'mouseleave':this.widgetMouseUpEvent(event)
break;case'mouseup':case'touchend':{this.widgetMouseUpEvent(event);}
break;default:}}}
Panner.prototype.toString=function(){return'[Panner]';};define("jQwtPanner",["static"],function(){});;(function($,window,document,undefined){"use strict";$.single=(function(){var single=$({});return function(elm){single[0]=elm;return single;};}());$.fn.contextMenu=function(method,selector,option){if(!methods[method]){option=selector;selector=method;method='popup';}
else if(selector){if(!((selector instanceof Array)||(typeof selector==='string')||(selector.nodeType)||(selector.jquery))){option=selector;selector=null;}}
if((selector instanceof Array)&&(method!='update')){method='menu';}
var myoptions=option;if($.inArray(method,['menu','popup','close','destroy'])>-1){option=iMethods.optionOtimizer(method,option);this.each(function(){var $this=$(this)
myoptions=$.extend({},$.fn.contextMenu.defaults,option);if(!myoptions.baseTrigger){myoptions.baseTrigger=$this;}
methods[method].call($this,selector,myoptions)});}else{methods[method].call(this,selector,myoptions)}
return this;};$.fn.contextMenu.defaults={triggerOn:'click',subMenuTriggerOn:'hover click',displayAround:'cursor',mouseClick:'left',verAdjust:0,horAdjust:0,top:'auto',left:'auto',closeOther:true,containment:window,winEventClose:true,position:'auto',closeOnClick:true,onOpen:function(data,event){},afterOpen:function(data,event){},onClose:function(data,event){}};var methods={menu:function(selector,option){selector=iMethods.createMenuList(this,selector,option);iMethods.contextMenuBind.call(this,selector,option,'menu');},popup:function(selector,option){$(selector).addClass('iw-contextMenu');iMethods.contextMenuBind.call(this,selector,option,'popup');},update:function(selector,option){var self=this;option=option||{};this.each(function(){var trgr=$(this),menuData=trgr.data('iw-menuData');if(!menuData){self.contextMenu('refresh');menuData=trgr.data('iw-menuData');}
var menu=menuData.menu;if(typeof selector==='object'){for(var i=0;i<selector.length;i++){var name=selector[i].name,disable=selector[i].disable,fun=selector[i].fun,icon=selector[i].icon,img=selector[i].img,title=selector[i].title,className=selector[i].className,elm=menu.children('li').filter(function(){return $(this).contents().filter(function(){return this.nodeType==3;}).text()==name;}),subMenu=selector[i].subMenu;disable!=undefined&&(disable?elm.addClass('iw-mDisable'):elm.removeClass('iw-mDisable'));fun&&elm.unbind('click.contextMenu').bind('click.contextMenu',fun);title!=undefined&&elm.attr('title',title);className!=undefined&&elm.attr('class',className);var imgIcon=elm.find('.iw-mIcon');if(imgIcon.length)imgIcon.remove();if(img){elm.prepend('<img src="'+img+'" align="absmiddle" class="iw-mIcon" />');}else if(icon){elm.prepend('<span align="absmiddle" class="iw-mIcon '+icon+'" />');}
if(subMenu){elm.contextMenu('update',subMenu);}}}
iMethods.onOff(menu);var triggerOn=option.triggerOn;if(triggerOn){trgr.unbind('.contextMenu');triggerOn=triggerOn.split(" ");var events=[];for(var i=0,ln=triggerOn.length;i<ln;i++){events.push(triggerOn[i]+'.contextMenu')}
trgr.bind(events.join(' '),iMethods.eventHandler);}
menuData.option=$.extend({},menuData.option,option);trgr.data('iw-menuData',menuData);});},refresh:function(){var menuData=this.filter(function(){return!!$(this).data('iw-menuData');}).data('iw-menuData'),newElm=this.filter(function(){return!$(this).data('iw-menuData');});menuData.option.baseTrigger=this;iMethods.contextMenuBind.call(newElm,menuData.menuSelector,menuData.option);},open:function(sel,data){data=data||{};var e=data.event||$.Event('click');if(data.top)e.clientY=data.top;if(data.left)e.clientX=data.left;this.each(function(){iMethods.eventHandler.call(this,e);});},close:function(){var menuData=this.data('iw-menuData');if(menuData){iMethods.closeContextMenu(menuData.option,this,menuData.menu,null);}},value:function(key){var menuData=this.data('iw-menuData');if(menuData[key]){return menuData[key];}else if(menuData.option){return menuData.option[key];}
return null;},destroy:function(){var trgr=this,menuId=trgr.data('iw-menuData').menuId,menu=$('.iw-contextMenu[menuId='+menuId+']'),menuData=menu.data('iw-menuData');if(!menuData)return;if(menuData.noTrigger==1){if(menu.hasClass('iw-created')){menu.remove();}else{menu.removeClass('iw-contextMenu '+menuId).removeAttr('menuId').removeData('iw-menuData');menu.find('li.iw-mTrigger').contextMenu('destroy');}}else{menuData.noTrigger--;menu.data('iw-menuData',menuData);}
trgr.unbind('.contextMenu').removeClass('iw-mTrigger').removeData('iw-menuData');}};var iMethods={contextMenuBind:function(selector,option,method){var trigger=this,menu=$(selector),menuData=menu.data('iw-menuData');if(menu.length==0){menu=trigger.find(selector);if(menu.length==0){return;}}
if(method=='menu'){iMethods.menuHover(menu);}
var baseTrigger=option.baseTrigger;if(!menuData){var menuId;if(!baseTrigger.data('iw-menuData')){menuId=Math.ceil(Math.random()*100000);baseTrigger.data('iw-menuData',{'menuId':menuId});}else{menuId=baseTrigger.data('iw-menuData').menuId;}
var cloneMenu=menu.clone();cloneMenu.appendTo('body');menuData={'menuId':menuId,'menuWidth':cloneMenu.outerWidth(true),'menuHeight':cloneMenu.outerHeight(true),'noTrigger':1,'trigger':trigger};menu.data('iw-menuData',menuData).attr('menuId',menuId);cloneMenu.remove();}else{menuData.noTrigger++;menu.data('iw-menuData',menuData);}
trigger.addClass('iw-mTrigger').data('iw-menuData',{'menuId':menuData.menuId,'option':option,'menu':menu,'menuSelector':selector,'method':method});var triggerOn=option.triggerOn;if(triggerOn.indexOf('hover')!=-1){triggerOn=triggerOn.replace('hover','mouseenter');if(baseTrigger.index(trigger)!=-1){baseTrigger.add(menu).bind('mouseleave.contextMenu',function(e){if($(e.relatedTarget).closest('.iw-contextMenu').length==0){$('.iw-contextMenu[menuId="'+menuData.menuId+'"]').fadeOut(100);}});}}
trigger.delegate('input,a,.needs-click','click',function(e){e.stopImmediatePropagation()});triggerOn=triggerOn.split(' ');var events=[];for(var i=0,ln=triggerOn.length;i<ln;i++){events.push(triggerOn[i]+'.contextMenu')}
trigger.bind(events.join(' '),iMethods.eventHandler);menu.bind('click mouseenter',function(e){e.stopPropagation();});menu.delegate('li','click',function(e){if(option.closeOnClick&&!$.single(this).hasClass('iw-has-submenu'))iMethods.closeContextMenu(option,trigger,menu,e);});},eventHandler:function(e){e.preventDefault();var trigger=$(this),trgrData=trigger.data('iw-menuData'),menu=trgrData.menu,menuData=menu.data('iw-menuData'),option=trgrData.option,cntnmnt=option.containment,clbckData={trigger:trigger,menu:menu},cntWin=cntnmnt==window,btChck=option.baseTrigger.index(trigger)==-1;if(!btChck&&option.closeOther){$('.iw-contextMenu').css('display','none');}
menu.find('.iw-mSelected').removeClass('iw-mSelected');option.onOpen.call(this,clbckData,e);var cObj=$(cntnmnt),cHeight=cObj.innerHeight(),cWidth=cObj.innerWidth(),cTop=0,cLeft=0,menuHeight=menuData.menuHeight,menuWidth=menuData.menuWidth,va,ha,left=0,top=0,bottomMenu,rightMenu,verAdjust=va=parseInt(option.verAdjust),horAdjust=ha=parseInt(option.horAdjust);if(!cntWin){cTop=cObj.offset().top;cLeft=cObj.offset().left;if(cObj.css('position')=='static'){cObj.css('position','relative');}}
if(option.displayAround=='cursor'){left=cntWin?e.clientX:e.clientX+$(window).scrollLeft()-cLeft;top=cntWin?e.clientY:e.clientY+$(window).scrollTop()-cTop;bottomMenu=top+menuHeight;rightMenu=left+menuWidth;if(bottomMenu>cHeight){if((top-menuHeight)<0){if((bottomMenu-cHeight)<(menuHeight-top)){top=cHeight-menuHeight;va=-1*va;}else{top=0;va=0;}}else{top=top-menuHeight;va=-1*va;}}
if(rightMenu>cWidth){if((left-menuWidth)<0){if((rightMenu-cWidth)<(menuWidth-left)){left=cWidth-menuWidth;ha=-1*ha;}else{left=0;ha=0;}}else{left=left-menuWidth;ha=-1*ha;}}}else if(option.displayAround=='trigger'){var triggerHeight=trigger.outerHeight(true),triggerWidth=trigger.outerWidth(true),triggerLeft=cntWin?trigger.offset().left-cObj.scrollLeft():trigger.offset().left-cLeft,triggerTop=cntWin?trigger.offset().top-cObj.scrollTop():trigger.offset().top-cTop,leftShift=triggerWidth;left=triggerLeft+triggerWidth;top=triggerTop;bottomMenu=top+menuHeight;rightMenu=left+menuWidth;if(bottomMenu>cHeight){if((top-menuHeight)<0){if((bottomMenu-cHeight)<(menuHeight-top)){top=cHeight-menuHeight;va=-1*va;}else{top=0;va=0;}}else{top=top-menuHeight+triggerHeight;va=-1*va;}}
if(rightMenu>cWidth){if((left-menuWidth)<0){if((rightMenu-cWidth)<(menuWidth-left)){left=cWidth-menuWidth;ha=-1*ha;leftShift=-triggerWidth;}else{left=0;ha=0;leftShift=0;}}else{left=left-menuWidth-triggerWidth;ha=-1*ha;leftShift=-triggerWidth;}}
if(option.position=='top'){top=triggerTop-menuHeight;va=verAdjust;left=left-leftShift;}else if(option.position=='left'){left=triggerLeft-menuWidth;ha=horAdjust;}else if(option.position=='bottom'){top=triggerTop+triggerHeight;va=verAdjust;left=left-leftShift;}else if(option.position=='right'){left=triggerLeft+triggerWidth;ha=horAdjust;}}
var cssObj={'position':(cntWin||btChck)?'fixed':'absolute','display':'inline-block','height':'','width':''};if(option.left!='auto'){left=iMethods.getPxSize(option.left,cWidth);}
if(option.top!='auto'){top=iMethods.getPxSize(option.top,cHeight);}
if(!cntWin){var oParPos=trigger.offsetParent().offset();if(btChck){left=left+cLeft-$(window).scrollLeft();top=top+cTop-$(window).scrollTop();}else{left=left-(cLeft-oParPos.left);top=top-(cTop-oParPos.top);}}
cssObj.left=left+ha+'px';cssObj.top=top+va+'px';menu.css(cssObj);option.afterOpen.call(this,clbckData,e);if(trigger.closest('.iw-contextMenu').length==0){$('.iw-curMenu').removeClass('iw-curMenu');menu.addClass('iw-curMenu');}
var dataParm={trigger:trigger,menu:menu,option:option,method:trgrData.method};$('html').unbind('click',iMethods.clickEvent).click(dataParm,iMethods.clickEvent);$(document).unbind('keydown',iMethods.keyEvent).keydown(dataParm,iMethods.keyEvent);if(option.winEventClose){$(window).bind('scroll resize',dataParm,iMethods.scrollEvent);}},scrollEvent:function(e){iMethods.closeContextMenu(e.data.option,e.data.trigger,e.data.menu,e);},clickEvent:function(e){var button=e.data.trigger.get(0);if((button!==e.target)&&($(e.target).closest('.iw-contextMenu').length==0)){iMethods.closeContextMenu(e.data.option,e.data.trigger,e.data.menu,e);}},keyEvent:function(e){e.preventDefault();var menu=e.data.menu,option=e.data.option,keyCode=e.keyCode;if(keyCode==27){iMethods.closeContextMenu(option,e.data.trigger,menu,e);}
if(e.data.method=='menu'){var curMenu=$('.iw-curMenu'),optList=curMenu.children('li:not(.iw-mDisable)'),selected=optList.filter('.iw-mSelected'),index=optList.index(selected),focusOn=function(elm){iMethods.selectMenu(curMenu,elm);var menuData=elm.data('iw-menuData');if(menuData){iMethods.eventHandler.call(elm[0],e);}},first=function(){focusOn(optList.filter(':first'));},last=function(){focusOn(optList.filter(':last'));},next=function(){focusOn(optList.filter(':eq('+(index+1)+')'));},prev=function(){focusOn(optList.filter(':eq('+(index-1)+')'));},subMenu=function(){var menuData=selected.data('iw-menuData');if(menuData){iMethods.eventHandler.call(selected[0],e);var selector=menuData.menu;selector.addClass('iw-curMenu');curMenu.removeClass('iw-curMenu');curMenu=selector;optList=curMenu.children('li:not(.iw-mDisable)');selected=optList.filter('.iw-mSelected');first();}},parMenu=function(){var selector=curMenu.data('iw-menuData').trigger;var parMenu=selector.closest('.iw-contextMenu');if(parMenu.length!=0){curMenu.removeClass('iw-curMenu').css('display','none');parMenu.addClass('iw-curMenu');}};switch(keyCode){case 13:selected.click();break;case 40:(index==optList.length-1||selected.length==0)?first():next();break;case 38:(index==0||selected.length==0)?last():prev();break;case 33:first();break;case 34:last();break;case 37:parMenu();break;case 39:subMenu();break;}}},closeContextMenu:function(option,trigger,menu,e){$(document).unbind('keydown',iMethods.keyEvent);$('html').unbind('click',iMethods.clickEvent);$(window).unbind('scroll resize',iMethods.scrollEvent);$('.iw-contextMenu').css('display','none');$(document).focus();option.onClose.call(this,{trigger:trigger,menu:menu},e);},getPxSize:function(size,of){if(!isNaN(size)){return size;}
if(size.indexOf('%')!=-1){return parseInt(size)*of/100;}else{return parseInt(size);}},selectMenu:function(menu,elm){var selected=menu.find('li.iw-mSelected'),submenu=selected.find('.iw-contextMenu');if((submenu.length!=0)&&(selected[0]!=elm[0])){submenu.fadeOut(100);}
selected.removeClass('iw-mSelected');elm.addClass('iw-mSelected');},menuHover:function(menu){var lastEventTime=Date.now();menu.children('li').bind('mouseenter.contextMenu click.contextMenu',function(e){$('.iw-curMenu').removeClass('iw-curMenu');menu.addClass('iw-curMenu');iMethods.selectMenu(menu,$(this));});},createMenuList:function(trgr,selector,option){var baseTrigger=option.baseTrigger,randomNum=Math.floor(Math.random()*10000);if((typeof selector=='object')&&(!selector.nodeType)&&(!selector.jquery)){var menuList=$('<ul class="iw-contextMenu iw-created iw-cm-menu" id="iw-contextMenu'+randomNum+'"></ul>');var z=option.zIndex||trgr.css("zIndex")
menuList.css("zIndex",z)
$.each(selector,function(index,selObj){var name=selObj.name,fun=selObj.fun||function(){},subMenu=selObj.subMenu,img=selObj.img||'',icon=selObj.icon||'',title=selObj.title||"",className=selObj.className||"",disable=selObj.disable,list=$('<li title="'+title+'" class="'+className+'">'+name+'</li>');if(img){list.prepend('<img src="'+img+'" align="absmiddle" class="iw-mIcon" />');}else if(icon){list.prepend('<span align="absmiddle" class="'+"iw-mIcon "+icon+'" />');}
if(disable){list.addClass('iw-mDisable');}
if(!subMenu){list.bind('click.contextMenu',function(e){fun.call(this,{trigger:baseTrigger,menu:menuList},e);});}
menuList.append(list);if(subMenu){list.addClass('iw-has-submenu').append('<div class="iw-cm-arrow-right" />');iMethods.subMenu(list,subMenu,baseTrigger,option);}});if(baseTrigger.index(trgr[0])==-1){trgr.append(menuList);}else{var par=option.containment==window?'body':option.containment;$(par).append(menuList);}
iMethods.onOff($('#iw-contextMenu'+randomNum));return'#iw-contextMenu'+randomNum;}else if($(selector).length!=0){var element=$(selector);element.removeClass('iw-contextMenuCurrent').addClass('iw-contextMenu iw-cm-menu iw-contextMenu'+randomNum).attr('menuId','iw-contextMenu'+randomNum).css('display','none');element.find('ul').each(function(index,element){var subMenu=$(this),parent=subMenu.parent('li');parent.append('<div class="iw-cm-arrow-right" />');subMenu.addClass('iw-contextMenuCurrent');iMethods.subMenu(parent,'.iw-contextMenuCurrent',baseTrigger,option);});iMethods.onOff($('.iw-contextMenu'+randomNum));return'.iw-contextMenu'+randomNum;}},subMenu:function(trigger,selector,baseTrigger,option){trigger.contextMenu('menu',selector,{triggerOn:option.subMenuTriggerOn,displayAround:'trigger',position:'auto',mouseClick:'left',baseTrigger:baseTrigger,containment:option.containment});},onOff:function(menu){menu.find('.iw-mOverlay').remove();menu.find('.iw-mDisable').each(function(){var list=$(this);list.append('<div class="iw-mOverlay"/>');list.find('.iw-mOverlay').bind('click mouseenter',function(event){event.stopPropagation();});});},optionOtimizer:function(method,option){if(!option){return;}
if(method=='menu'){if(!option.mouseClick){option.mouseClick='right';}}
if((option.mouseClick=='right')&&(option.triggerOn=='click')){option.triggerOn='contextmenu';}
if($.inArray(option.triggerOn,['hover','mouseenter','mouseover','mouseleave','mouseout','focusin','focusout'])!=-1){option.displayAround='trigger';}
return option;}};})(jQuery,window,document);define("contextMenu",function(){});PlotMarker.inheritsFrom(PlotItem);function PlotMarker(tle){PlotItem.call(this,tle);var m_label="";var m_labelFont=new Misc.Font();var m_labelAlignment=Static.AlignCenter;var m_labelOrientation=Horizontal;var m_spacing=2;var m_pen=new Misc.Pen;var m_symbol=null;var m_style=NoLine;var m_xValue=0.0;var m_yValue=0.0;this.rtti=Static.Rtti_PlotMarker;this.value=function()
{return new Misc.Point(m_xValue,m_yValue);}
this.xValue=function()
{return m_xValue;}
this.yValue=function()
{return m_yValue;}
this.setValue=function(x,y){if(typeof(x)=="object"){var temp=x
x=temp.x
y=temp.y}
if(x!=m_xValue||y!=m_yValue)
{m_xValue=x;m_yValue=y;if(this.plot())
this.plot().autoRefresh()}}
this.setXValue=function(x)
{this.setValue(x,m_yValue);}
this.setYValue=function(y)
{this.setValue(m_xValue,y);}
this.setLabel=function(label)
{if(label!=m_label)
{m_label=label;}}
this.label=function()
{return m_label;}
this.setLabelAlignment=function(align)
{if(align!==m_labelAlignment)
{m_labelAlignment=align;}}
this.labelAlignment=function()
{return m_labelAlignment;}
this.setLabelOrientation=function(orientation)
{if(orientation!=m_labelOrientation)
{m_labelOrientation=orientation;}}
this.labelOrientation=function()
{return m_labelOrientation;}
this.setSpacing=function(spacing)
{if(spacing<0)
spacing=0;if(spacing==m_spacing)
return;m_spacing=spacing;}
this.spacing=function()
{return m_spacing;}
this.setSymbol=function(symbol)
{{m_symbol=symbol;}}
this.symbol=function()
{return m_symbol;}
this.draw=function(xMap,yMap)
{var canvasRect=this.getCanvasRect();var pos=new Misc.Point(xMap.transform(m_xValue),yMap.transform(m_yValue));var ctx=this.getContext();this.drawLines(ctx,canvasRect,pos);if(m_symbol&&(m_symbol.style()!==NoSymbol))
{var sz=m_symbol.size();var clipRect=canvasRect.adjusted(-sz.width,-sz.height,sz.width,sz.height);if(clipRect.contains(pos)){m_symbol.drawSymbol(ctx,pos);}}
this.drawLabel(ctx,canvasRect,pos);}
this.drawLabel=function(ctx,canvasRect,pos)
{if(m_label==="")
return;var align=m_labelAlignment;var alignPos=pos;var symbolOff=new Misc.Size(0,0);switch(m_style)
{case VLine:{if(m_labelAlignment&Static.AlignTop)
{alignPos.y=canvasRect.top();align&=~Static.AlignTop;align|=Static.AlignBottom;}
else if(m_labelAlignment&Static.AlignBottom)
{alignPos.y=canvasRect.bottom()-1;align&=~Static.AlignBottom;align|=Static.AlignTop;}
else
{alignPos.y=canvasRect.center().y;}
break;}
case HLine:{if(m_labelAlignment&Static.AlignLeft)
{alignPos.x=canvasRect.left();align&=~Static.AlignLeft;align|=Static.AlignRight;}
else if(m_labelAlignment&Static.AlignRight)
{alignPos.x=canvasRect.right()-1;align&=~Static.AlignRight;align|=Static.AlignLeft;}
else
{alignPos.x=canvasRect.center().x;}
break;}
default:{if(m_symbol&&(m_symbol.style()!==NoSymbol))
{var sz=m_symbol.size();symbolOff=new Misc.Size((sz.width+1)/2,(sz.height+1)/2);}}}
var pw2=m_pen.width/2.0;if(pw2==0.0)
pw2=0.5;var spacing=m_spacing;var xOff=Math.max(pw2,symbolOff.width);var yOff=Math.max(pw2,symbolOff.height);var textSize=m_labelFont.textSize(m_label)
if(align&Static.AlignLeft)
{alignPos.x-=xOff+spacing;if(m_labelOrientation==Vertical)
alignPos.x-=textSize.height;else
alignPos.x-=textSize.width;}
else if(align&Static.AlignRight)
{alignPos.x+=xOff+spacing;}
else
{if(m_labelOrientation==Vertical)
alignPos.x-=textSize.height/2;else
alignPos.x-=textSize.width/2;}
if(align&Static.AlignTop)
{alignPos.y-=yOff+spacing;if(m_labelOrientation!=Vertical)
alignPos.y-=textSize.height;}
else if(align&Static.AlignBottom)
{alignPos.y+=yOff+spacing;if(m_labelOrientation==Vertical)
alignPos.y+=textSize.width;}
else
{if(m_labelOrientation==Vertical)
alignPos.y+=textSize.width/2;else
alignPos.y-=textSize.height/2;}
var painter=new PaintUtil.Painter(ctx);painter.save();painter.translate(alignPos.x,alignPos.y);if(m_labelOrientation==Vertical)
painter.rotate(-90*Math.PI/180);painter.setFont(m_labelFont)
var textRect=new Misc.Rect(0,0,textSize.width,textSize.height);painter.drawText(m_label,textRect.left(),textRect.bottom());painter.restore();painter=null}
this.drawLines=function(ctx,canvasRect,pos)
{if(m_style==NoLine)
return;var painter=new PaintUtil.Painter(ctx);painter.setPen(m_pen);if(m_style==HLine||m_style==Cross)
{var y=pos.y;painter.drawLine(canvasRect.left(),y,canvasRect.right()-1.0,y);}
if(m_style==VLine||m_style==Cross)
{var x=pos.x;painter.drawLine(x,canvasRect.top(),x,canvasRect.bottom()-1.0);}
painter=null}
this.setLineStyle=function(style)
{if(style!=m_style)
{m_style=style;}}
this.lineStyle=function()
{return m_style;}
this.setLinePen=function(pen)
{m_pen=pen;if(this.plot())
this.plot().autoRefresh()}
this.linePen=function()
{return m_pen;}
this.setZ(30.0);}
PlotMarker.prototype.toString=function(){return'[PlotMarker]';}
PlotMarker.prototype.legendIcon=function(index,size){if(size.width===0&&size.height===0)
return null;var graphic=new GraphicUtil.Graphic(null,size.width,size.height);var painter=new PaintUtil.Painter(graphic);if(this.lineStyle()!=NoLine){}
if(this.symbol())
{this.symbol().drawGraphicSymbol(painter,new Misc.Point(size.width,size.height),size);}
painter=null
return graphic;};define("jQwtPlotMarker",["static","plotItem"],function(){});class Ruler extends PlotMarker{constructor(plot,name,lineStyle){super(name);this._picker=0
this._pos=0.0
this._rightClickMenu=0
this._rulers=null;if(lineStyle==VLine||lineStyle==HLine)
{this.setLineStyle(lineStyle);this.setLinePen(new Misc.Pen("blue"));}
this.attach(plot);this.setMouseTracking=function(enable){this._picker.setMouseTracking(enable);}}}
Ruler.prototype.toString=function(){return'[Ruler]';}
Ruler.prototype.setPicker=function(pick){if(!pick)
return false;this._picker=pick;return true;}
Ruler.prototype.setZoomerSearch=function(on)
{this._picker.setControlFlag(Static.ZoomerSearch,on);this._picker.initZoomer();}
Ruler.prototype.setPannerSearch=function(on)
{this._picker.setControlFlag(Static.PannerSearch,on);}
Ruler.prototype.setLock=function(lock)
{this._picker.setControlFlag(Static.Locked,lock);this._picker.clearDragCursor()}
Ruler.prototype.lock=function()
{return this._picker.controlFlag(Static.Locked);}
Ruler.prototype.setTrackingTextStyle=function(trackingTextStyle)
{this._picker.setTrackingTextStyle(trackingTextStyle);}
Ruler.prototype.trackingTextStyle=function()
{return this._picker.trackingTextStyle();}
Ruler.prototype.setTrackingTextFont=function(f)
{this._picker.setTrackerFont(f);}
Ruler.prototype.trackingTextFont=function()
{return this._picker.trackerFont();}
Ruler.prototype.setTrackingTextColor=function(c)
{var font=this._picker.trackerFont();font.fontColor=c;this._picker.setTrackerFont(font);}
Ruler.prototype.trackingTextColor=function()
{return this._picker.trackerFont().color;}
Ruler.prototype.validatePosition=function(min,max)
{}
Ruler.prototype.dragCursorShape=function()
{return this._picker.dragCursorShape();}
Ruler.prototype.setDragCursorShape=function(shape)
{this._picker.setDragCursorShape(shape);}
Ruler.prototype.setRightClickMenu=function(menu)
{}
class RulerV extends Ruler{constructor(plot,name,rulerGroup){super(plot,name,VLine);if(rulerGroup)
this._rulers=rulerGroup
this._picker=new PickerV(plot,this._pos,this);}}
RulerV.prototype.setPosition=function(pos)
{this._pos=pos;this._picker._rulerPos=pos
this.setXValue(this._pos);}
class RulerH extends Ruler{constructor(plot,name,rulerGroup){super(plot,name,HLine);if(rulerGroup)
this._rulers=rulerGroup
this._picker=new PickerH(plot,this._pos,this);}}
RulerH.prototype.setPosition=function(pos)
{this._pos=pos;this._picker._rulerPos=pos
this.setYValue(this._pos);};define("ruler",["static","jQwtPlotMarker"],function(){});class MPicker extends PlotPicker{constructor(plot,rulerPos,ruler){super(plot)
var self=this
this._rulerPos=rulerPos
this._ruler=ruler
var _zoomer=0,_panner=0,_magnifier=0
var _qwtPlotCursorShape=""
var _cursorOld=null;var _cursorDrag=null;var _controlFlags=0;if(this._ruler){this._ruler.setAxes(this.xAxis(),this.yAxis());}
var _trackingTextStyle=Static.FullTrackingText;if(this.plot()){_qwtPlotCursorShape=this.plot().cursor();}
this.controlFlag=function(flag)
{return Boolean(_controlFlags&flag);}
this.setControlFlag=function(flag,set)
{if(set)
_controlFlags|=flag;else
_controlFlags&=~flag;}
this.prohibit=function()
{if(_zoomer&&this.controlFlag(Static.ZoomerSearch))
{this.setControlFlag(Static.ZoomEnabled,_zoomer.isEnabled());if(this.controlFlag(Static.ZoomEnabled))
_zoomer.setEnabled(false);}
if(_panner&&this.controlFlag(Static.PannerSearch))
{this.setControlFlag(Static.PanEnabled,_panner.isEnabled());if(this.controlFlag(Static.PanEnabled))
_panner.setEnabled(false);}
if(_magnifier&&this.controlFlag(Static.MagnifierSearch))
{this.setControlFlag(Static.MagnifierEnabled,_magnifier.isEnabled());if(this.controlFlag(Static.MagnifierEnabled))
_magnifier.setEnabled(false);}}
this.restore=function()
{if(_zoomer&&this.controlFlag(Static.ZoomEnabled))
{_zoomer.setEnabled(true);this.setControlFlag(Static.ZoomEnabled,false);}
if(_panner&&this.controlFlag(Static.PanEnabled))
{_panner.setEnabled(true);this.setControlFlag(Static.PanEnabled,false);}
if(_magnifier&&this.controlFlag(Static.MagnifierEnabled))
{_magnifier.setEnabled(true);this.setControlFlag(Static.MagnifierEnabled,false);}}
this.setDragCursor=function()
{if(this.controlFlag(Static.DragCursor))
return;if(plot.cursor()!=_qwtPlotCursorShape)
return;_cursorOld=plot.cursor();_cursorDrag=this._dragCursorShape;plot.setCursor(_cursorDrag);this.setControlFlag(Static.DragCursor,true);this.prohibit();Static.trigger("rulerSelected",self._ruler)}
this.clearDragCursor=function()
{if(!this.controlFlag(Static.DragCursor))
return;this._ruler.plot().setCursor(_cursorOld);this.setControlFlag(Static.DragCursor,false);this.restore();Static.trigger("rulerDeselected",self._ruler)}
this.setTrackingTextStyle=function(trackingTextStyle)
{_trackingTextStyle=trackingTextStyle;}
this.trackerText=function(pos)
{if(this._ruler.lock()||(_trackingTextStyle==Static.NoTrackingText)||(!this.controlFlag(Static.LeftButtonDown)&&!this.controlFlag(Static.ZoomEnabled)))
return"";if(_trackingTextStyle==Static.FullTrackingText)
{var xTitle=this.axisTitle();if(!xTitle.length)
return this._rulerPos;return xTitle+"="+this._rulerPos;}
if(_trackingTextStyle==Static.PartialTrackingText)
{return this._rulerPos;}
return"";}
this.panningFinished=function()
{this.setControlFlag(Static.PanningInProgress,false);}
this.panningStarted=function()
{this.setControlFlag(Static.PanningInProgress,true);}
$("#plotDivContainer").on('mouseup touchend',function(){if(Static.LeftButtonDown){if(Static.isMobile()){self.clearDragCursor()}
self.setControlFlag(Static.LeftButtonDown,false)}});this.initMagnifier=function()
{if(!this.controlFlag(Static.MagnifierSearch)||_magnifier)
return;if(plot.magnifier){_magnifier=plot.magnifier}}
this.initZoomer=function()
{if(!this.controlFlag(Static.ZoomerSearch)&&_zoomer){return;}
if(plot.zoomer){_zoomer=plot.zoomer}}
this.initPanner=function()
{if(!this.controlFlag(Static.PannerSearch)&&_panner)
return;if(plot.panner){_panner=plot.panner}}
this.doMouseReleaseEvent=function(event){if(!this._ruler.isVisible()||this.controlFlag(Static.PanningInProgress))
return
if(event.button==Static.LeftButton)
{if(this.controlFlag(Static.LeftButtonDown)){Static.trigger("positionChanged",[this._ruler,this._rulerPos])}
this.setControlFlag(Static.LeftButtonDown,false);}}}
widgetMouseReleaseEvent(event){this.doMouseReleaseEvent(event);super.widgetMouseReleaseEvent(event);}
widgetLeaveEvent(event){this.doMouseReleaseEvent(event);super.widgetMouseReleaseEvent(event);}}
class PickerV extends MPicker{constructor(plot,rulerPos,ruler){super(plot,rulerPos,ruler)
this._dragCursorShape="w-resize";this.axisTitle=function()
{return this._ruler.plot().axisTitle(this.xAxis());}}
widgetMousePressEvent(event)
{if(!this._ruler.isVisible()||this.controlFlag(Static.PanningInProgress))
return super.widgetMousePressEvent(event);if(event.button==2)
{if(this.controlFlag(Static.DragCursor)){}
return true}
if(Static.isMobile()){var _rulerPosVal=this._ruler.plot().transform(this.xAxis(),this._rulerPos);var clientX=event.originalEvent.touches[0].clientX;var clientY=event.originalEvent.touches[0].clientY;var pt=this.mapToElement(new Misc.Point(clientX,clientY))
var val=pt.x;if(!this.controlFlag(Static.LeftButtonDown)&&val<_rulerPosVal+12&&val>_rulerPosVal-12)
{this.setDragCursor();this.setControlFlag(Static.LeftButtonDown,true)}}
else if(event.button==Static.LeftButton||Static.isMobile())
{if(this.controlFlag(Static.DragCursor)){this.setControlFlag(Static.LeftButtonDown,true);}
return true}
return super.widgetMousePressEvent(event);}
widgetMouseMoveEvent(event)
{if(!this._ruler.isVisible()||this.controlFlag(Static.PanningInProgress))
return super.widgetMouseMoveEvent(event);if(!this.controlFlag(Static.Locked))
{var plot=this._ruler.plot();var clientX=event.clientX
var clientY=event.clientY
if(Static.isMobile()){var touchobj=event.originalEvent.changedTouches[0]
clientX=parseInt(touchobj.clientX);clientY=parseInt(touchobj.clientY);}
var pt=this.mapToElement(new Misc.Point(clientX,clientY))
var val=pt.x;var _rulerPosVal=this._ruler.plot().transform(this.xAxis(),this._rulerPos);if(this.controlFlag(Static.LeftButtonDown))
{this._rulerPos=plot.invTransform(this.xAxis(),val);this._ruler._pos=this._rulerPos
this._ruler.validatePosition();this._rulerPos=this._ruler._pos
this._ruler.setXValue(this._rulerPos);Static.trigger("shapeItemValueChanged")}
if(!this.controlFlag(Static.LeftButtonDown)&&val<_rulerPosVal+2&&val>_rulerPosVal-2)
{this.setDragCursor();}
if(!this.controlFlag(Static.LeftButtonDown)&&!(val<_rulerPosVal+2&&val>_rulerPosVal-2))
{this.clearDragCursor();}}}}
class PickerH extends MPicker{constructor(plot,rulerPos,ruler){super(plot,rulerPos,ruler)
this._dragCursorShape="s-resize";this.axisTitle=function()
{return this._ruler.plot().axisTitle(this.yAxis());}}
widgetMousePressEvent(event)
{if(!this._ruler.isVisible()||this.controlFlag(Static.PanningInProgress))
return super.widgetMousePressEvent(event);if(event.button==2)
{if(this.controlFlag(Static.DragCursor)){}
return true}
if(Static.isMobile()){var _rulerPosVal=this._ruler.plot().transform(this.yAxis(),this._rulerPos);var clientX=event.originalEvent.touches[0].clientX;var clientY=event.originalEvent.touches[0].clientY;var pt=this.mapToElement(new Misc.Point(clientX,clientY))
var val=pt.y;if(!this.controlFlag(Static.LeftButtonDown)&&val<_rulerPosVal+12&&val>_rulerPosVal-12)
{this.setDragCursor();this.setControlFlag(Static.LeftButtonDown,true)}}
else if(event.button==Static.LeftButton||Static.isMobile())
{if(this.controlFlag(Static.DragCursor)){this.setControlFlag(Static.LeftButtonDown,true);}
return true}
return super.widgetMousePressEvent(event);}
widgetMouseMoveEvent(event)
{if(!this._ruler.isVisible()||this.controlFlag(Static.PanningInProgress))
return super.widgetMouseMoveEvent(event);if(!this.controlFlag(Static.Locked))
{var plot=this._ruler.plot();var clientX=event.clientX
var clientY=event.clientY
if(Static.isMobile()){var touchobj=event.originalEvent.changedTouches[0]
clientX=parseInt(touchobj.clientX);clientY=parseInt(touchobj.clientY);}
var pt=this.mapToElement(new Misc.Point(clientX,clientY))
var val=pt.y;var _rulerPosVal=this._ruler.plot().transform(this.yAxis(),this._rulerPos);if(this.controlFlag(Static.LeftButtonDown))
{this._rulerPos=plot.invTransform(this.yAxis(),val);this._ruler._pos=this._rulerPos
this._ruler.validatePosition();this._rulerPos=this._ruler._pos
this._ruler.setYValue(this._rulerPos);Static.trigger("shapeItemValueChanged")}
if(!this.controlFlag(Static.LeftButtonDown)&&val<_rulerPosVal+2&&val>_rulerPosVal-2)
{this.setDragCursor();}
if(!this.controlFlag(Static.LeftButtonDown)&&!(val<_rulerPosVal+2&&val>_rulerPosVal-2))
{this.clearDragCursor();}}
super.widgetMouseMoveEvent(event);}};define("mpicker",["static","qwtplotpicker"],function(){});class MRulerV extends RulerV{constructor(plot,name,rulerGroup){super(plot,name,rulerGroup);this.rulers=function()
{return this._rulers;}
this.validatePosition=function()
{var plot=this.plot();var intv=plot.axisInterval(this.xAxis());var min=intv.minValue();var max=intv.maxValue();var minVal=plot.transform(this._picker.xAxis(),min);var maxVal=plot.transform(this._picker.xAxis(),max);var rulerPosVal=plot.transform(this._picker.xAxis(),this._pos);var minX=this._rulers.minX();var maxX=this._rulers.maxX();var space=2
if(Static.isMobile()){space=12}
var separationX=0.5*(this.rulers().ruler(0).linePen().width+this.rulers().ruler(1).linePen().width)+space;var n=this._rulers.rulerId(this);if(n==0)
{if(this._rulers.ruler(1).isVisible())
{var val=plot.transform(this._picker.xAxis(),this._rulers.ruler(1)._pos);if(rulerPosVal>=val-separationX)
{this._pos=plot.invTransform(this._picker.xAxis(),val-separationX);}
if(rulerPosVal<minVal)
{this._pos=plot.invTransform(this._picker.xAxis(),minVal);}
if(this._rulers._curve&&this._pos<minX)
this._pos=minX;}
else
{if(rulerPosVal<minVal)
{this._pos=plot.invTransform(this._picker.xAxis(),minVal);}
if(rulerPosVal>maxVal)
{this._pos=plot.invTransform(this._picker.xAxis(),maxVal);}
if(this._rulers._curve&&this._pos<minX)
this._pos=minX;if(this._rulers._curve&&this._pos>maxX)
this._pos=maxX;}}
if(n==1)
{if(this._rulers.ruler(0).isVisible())
{var val=plot.transform(this._picker.xAxis(),this._rulers.ruler(0)._pos);if(rulerPosVal<=val+separationX)
{this._pos=plot.invTransform(this._picker.xAxis(),val+separationX);}
if(rulerPosVal>maxVal)
{this._pos=plot.invTransform(this._picker.xAxis(),maxVal);}
if(this._rulers._curve&&this._pos>maxX)
this._pos=maxX;}
else
{if(rulerPosVal<minVal)
{this._pos=plot.invTransform(this._picker.xAxis(),minVal);}
if(rulerPosVal>maxVal)
{this._pos=plot.invTransform(this._picker.xAxis(),maxVal);}
if(this._rulers._curve&&this._pos<minX)
this._pos=minX;if(this._rulers._curve&&this._pos>maxX)
this._pos=maxX;}}}}}
MRulerV.prototype.setVisible=function(visible){PlotMarker.prototype.setVisible.call(this,visible);if(visible&&this._rulers)
{var n=this._rulers.rulerId(this);if((n==0&&this._rulers.ruler(1).isVisible())||(n==1&&this._rulers.ruler(0).isVisible()))
{this._rulers.resetXPositions();}}}
MRulerV.prototype.setLockAt=function(val)
{this.setPosition(val)
this.setLock(true)
Static.trigger("positionChanged")
Static.trigger("shapeItemValueChanged")}
class MRulerH extends RulerH{constructor(plot,name,rulerGroup){super(plot,name,rulerGroup);this.rulers=function()
{return this._rulers;}
this.validatePosition=function()
{var plot=this.plot();var intv=plot.axisInterval(this.yAxis());var min=intv.minValue();var max=intv.maxValue();var minVal=plot.transform(this.yAxis(),min);var maxVal=plot.transform(this.yAxis(),max);var rulerPosVal=plot.transform(this.yAxis(),this._pos);var minY=this._rulers.minY();var maxY=this._rulers.maxY();var space=2
if(Static.isMobile()){space=12}
var separationY=0.5*(this.rulers().ruler(2).linePen().width+this.rulers().ruler(3).linePen().width)+space;var n=this._rulers.rulerId(this);if(n==2)
{if(this._rulers.ruler(3).isVisible())
{var val=plot.transform(this.yAxis(),this._rulers.ruler(3)._pos);if(rulerPosVal<=val+separationY)
{this._pos=plot.invTransform(this.yAxis(),val+separationY);}
if(rulerPosVal>minVal)
{this._pos=plot.invTransform(this.yAxis(),minVal);}
if(this._rulers._curve&&this._pos<minY)
this._pos=minY;}
else
{if(rulerPosVal<maxVal)
{this._pos=plot.invTransform(this.yAxis(),maxVal);}
if(rulerPosVal>minVal)
{this._pos=plot.invTransform(this.yAxis(),minVal);}
if(this._rulers._curve&&this._pos<minY)
this._pos=minY;if(this._rulers._curve&&this._pos>maxY)
this._pos=maxY;}}
if(n==3)
{if(this._rulers.ruler(2).isVisible())
{var val=plot.transform(this.yAxis(),this._rulers.ruler(2)._pos);if(rulerPosVal>=val-separationY)
{this._pos=plot.invTransform(this.yAxis(),val-separationY);}
if(rulerPosVal<maxVal)
{this._pos=plot.invTransform(this.yAxis(),maxVal);}
if(this._rulers._curve&&this._pos>maxY)
this._pos=maxY;}
else
{if(rulerPosVal>minVal)
{this._pos=plot.invTransform(this.yAxis(),minVal);}
if(rulerPosVal<maxVal)
{this._pos=plot.invTransform(this.yAxis(),maxVal);}
if(this._rulers._curve&&this._pos<minY)
this._pos=minY;if(this._rulers._curve&&this._pos>maxY)
this._pos=maxY;}}}}}
MRulerH.prototype.setVisible=function(visible)
{PlotMarker.prototype.setVisible.call(visible);if(visible&&this._rulers)
{var n=this._rulers.rulerId(this);if((n==2&&this._rulers.ruler(3).isVisible())||(n==3&&this._rulers.ruler(2).isVisible()))
{this._rulers.resetYPositions();}}}
MRulerH.prototype.setLockAt=function(val)
{this.setPosition(val)
this.setLock(true)
Static.trigger("positionChanged")
Static.trigger("shapeItemValueChanged")}
function Rulers(plot,flags){var self=this
this._curve=0
this._watchTable=new WatchTable(this)
this._editor=0
this._curveShapeItem=0
this._watchSetter=0
this._rulerList=null
this._watchList=[]
plot.setAutoReplot(true)
this._rulerList=[new MRulerV(plot,"v_ruler1",self),new MRulerV(plot,"v_ruler2",self),new MRulerH(plot,"h_ruler1",self),new MRulerH(plot,"h_ruler2",self)];if(Static.isMobile()){for(var i=0;i<4;++i){var p=this._rulerList[i].linePen();p.width=3*p.width;}}
this._minX=0;this._maxX=0;this._minY=0;this._maxY=0;this.minX=function(){return this._minX;}
this.maxX=function(){return this._maxX;}
this.minY=function(){return this._minY;}
this.maxY=function(){return this._maxY;}
this.currentRuler=null
var _menu=null
var el=plot.getLayout().getCentralDiv()
Static.bind("rulerSelected",function(e,ruler){self.currentRuler=ruler
el.contextMenu(_menu,{triggerOn:'contextmenu',zIndex:1});})
this.setMenu=function(menu){_menu=menu}
this.init(plot);this.position=function(rulerId){if(rulerId>-1&&rulerId<4)
{if(!this._rulerList[rulerId].isVisible())
return Number.MAX_VALUE;return this._rulerList[rulerId]._pos;}
return Number.MAX_VALUE;;}
this.watch=function(id){if(id>=0&&id<this._watchList.length)
return this._watchList[id];return null;}
this.addToWatchList=function(watch){this._watchList.push(watch);return this._watchList.length-1;}
this.setWatchEnabled=function(id,set){if(id>=0&&id<this._watchList.length)
{if(this._watchList[id].isEnable()==set)
return;this._watchList[id].setEnable(set);if(set)
this.updateWatch(this._watchList[id]);this._watchTable.updateWatchTable();}}
this.isWatchEnabled=function(id){if(id>=0&&id<this._watchList.length)
{return this._watchList[id].isEnable();}
return false;}
this.updateWatchesAndTable=function(){if(!this._curve)
return;this.updateWatches();if(this._watchTable)
this._watchTable.updateWatchTable();}
this.setVisible=function(on){this._rulerList.forEach(function(ruler){ruler.setVisible(on)})}
this.hasVisibleRuler=function(){for(var i=0;i<4;++i){if(this._rulerList[i].isVisible()){return true}}
return false}
this.hasLockedRuler=function(){for(var i=0;i<4;++i){if(this._rulerList[i].lock()){return true}}
return false}
this.updateWatch=function(w){if(w.isEnable())
{w.setCurveName(this._curve.title());w.setRulerLeft(this.position(0));w.setRulerRight(this.position(1));w.setRulerBottom(this.position(2));w.setRulerTop(this.position(3));if(this._curve){w.setCurve(this._curve);}
w.computeWatch();}}
this.updateWatches=function()
{this._watchList.forEach(function(w){self.updateWatch(w);})}
this.setEnabled=function(enable){this._rulerList.forEach(function(ruler){ruler._picker.setEnabled(enable);})}
this.setMouseTracking=function(enable){this._rulerList.forEach(function(ruler){ruler._picker.setMouseTracking(enable);})}
this.setZoomerSearch(true)
this.setPannerSearch(true)
this.setMouseTracking(true)
Static.bind('zoomerAdded',function(e,zoomer){self.setZoomerSearch(self._rulerList[0]._picker.controlFlag(Static.ZoomerSearch))
self.setMouseTracking(true)})
Static.bind('pannerAdded',function(e,panner){self.setPannerSearch(self._rulerList[0]._picker.controlFlag(Static.PannerSearch))
self.setMouseTracking(true)})}
Rulers.prototype.unlockAllRulers=function()
{for(var i=0;i<this._rulerList.length;++i)
{this._rulerList[i].setLock(false);}}
Rulers.prototype.setCurrentCurve=function(curve)
{if(this._curve==curve)
return;this.doSetCurrentCurve(curve);}
Rulers.prototype.refresh=function()
{var p=this._rulerList[0].plot();if(this._curve&&this._curve.isVisible())
{var intvX=p.axisInterval(this._rulerList[0].xAxis());var minX=intvX.minValue();var maxX=intvX.maxValue();var intvY=p.axisInterval(this._rulerList[0].yAxis());var minY=intvY.minValue();var maxY=intvY.maxValue();minX=this._minX<minX?minX:this._minX;this._rulerList[0].setPosition(minX);maxX=this._maxX<maxX?this._maxX:maxX;this._rulerList[1].setPosition(maxX);minY=this._minY<minY?minY:this._minY;this._rulerList[2].setPosition(minY);maxY=this._maxY<maxY?this._maxY:maxY;this._rulerList[3].setPosition(maxY);this.updateWatchesAndTable();}
else
{this.resetXPositions();this.resetYPositions();}}
Rulers.prototype.doSetRulersAxes=function(xAxis,yAxis)
{var oldXAxis=this._rulerList[0].xAxis();var oldYAxis=this._rulerList[0].yAxis();for(var i=0;i<this._rulerList.length;++i)
{this._rulerList[i].setAxes(xAxis,yAxis);this._rulerList[i]._picker.setAxis(xAxis,yAxis);}}
Rulers.prototype.doSetCurrentCurve=function(curve)
{this._curve=curve;if(this._curve)
{if(this._curve.isVisible())
{this._minX=this._curve.minXValue();this._maxX=this._curve.maxXValue();this._minY=this._curve.minYValue();this._maxY=this._curve.maxYValue();}
this.doSetRulersAxes(this._curve.xAxis(),this._curve.yAxis());if(this._curveShapeItem)
{}}
this.refresh();}
Rulers.prototype.setCurrentCurve=function(curve)
{if(this._curve==curve)
return;this.doSetCurrentCurve(curve);}
Rulers.prototype.currentCurve=function()
{return this._curve;}
Rulers.prototype.init=function(plot)
{var self=this
var _rulerList=this._rulerList
Static.bind("positionChanged",function(e,ruler,rulerPos){self.updateWatchesAndTable()});Static.bind("curveAdjusted",function(e,ruler,rulerPos){self.updateWatchesAndTable()});this._rulerList[0].linePen().color="red";this._rulerList[2].linePen().color="red";this.resetXPositions();this.resetYPositions();}
Rulers.prototype.setZoomerSearch=function(on)
{this._rulerList.forEach(function(ruler){ruler.setZoomerSearch(on);ruler._picker.initZoomer()})}
Rulers.prototype.setPannerSearch=function(on)
{this._rulerList.forEach(function(ruler){ruler.setPannerSearch(on);ruler._picker.initPanner()})}
Rulers.prototype.resetXPositions=function()
{var intv=this._rulerList[0].plot().axisInterval(this._rulerList[0].xAxis());if(!this._curve||!this._curve.isVisible())
{this._rulerList[0].setPosition(intv.minValue());this._rulerList[1].setPosition(intv.maxValue());}
else
{if(intv.minValue()>this._minX)
this._rulerList[0].setPosition(intv.minValue());else
this._rulerList[0].setPosition(this._minX);if(intv.maxValue()<this._maxX)
this._rulerList[1].setPosition(intv.maxValue());else
this._rulerList[1].setPosition(this._maxX);}}
Rulers.prototype.resetYPositions=function()
{var intv=this._rulerList[0].plot().axisInterval(this._rulerList[0].yAxis());if(!this._curve||!this._curve.isVisible())
{this._rulerList[2].setPosition(intv.minValue());this._rulerList[3].setPosition(intv.maxValue());}
else
{this._rulerList[2].setPosition(this._minY);this._rulerList[3].setPosition(this._maxY);if(intv.minValue()>this._minY)
this._rulerList[2].setPosition(intv.minValue());else
_rulerList[2].setPosition(this._minY);if(intv.maxValue()<this._maxY)
this._rulerList[3].setPosition(intv.maxValue());else
this._rulerList[3].setPosition(this._maxY);}}
Rulers.prototype.ruler=function(rulerId)
{if(rulerId<4&&rulerId>=0)
return this._rulerList[rulerId];return 0;}
Rulers.prototype.rulerId=function(r)
{if(!r)
return-1;return this._rulerList.indexOf(r);}
Rulers.prototype.setRulersXAxis=function(axis)
{{var oldAxis=this._rulerList[0].xAxis();for(var i=0;i<this._rulerList.length;++i)
{this._rulerList[i].setXAxis(axis);this._rulerList[i]._picker.setAxis(axis,this._rulerList[i].yAxis());}
if(this._curveShapeItem)
this._curveShapeItem.setAxes(axis,this._rulerList[0].yAxis());}}
Rulers.prototype.setRulersYAxis=function(axis)
{{for(var i=0;i<this._rulerList.length;++i)
{this._rulerList[i].setYAxis(axis);this._rulerList[i]._picker.setAxis(this._rulerList[i].xAxis(),axis);}
if(this._curveShapeItem)
this._curveShapeItem.setAxes(_rulerList[0].xAxis(),axis);}}
function WatchTable(_rulerGroup){function makeRow(watch){var watchVariable=watch.name()
var value=watch.value()
if(watch.valueType=="number"||watch.valueType=="text"){var elemId=watchVariable
while(elemId.indexOf(' ')!=-1){elemId=elemId.replace(' ','')}
var row=$('<tr><td>'+watchVariable+'</td></tr>')
$("#watchTableBody").append(row)
var valueElem=$('<td><input id='+elemId+' type='+watch.valueType+'  style="width:100%" value='+value+' /></td>')
row.append(valueElem)
$("#"+elemId).on("change",watch.cb)}
else{$("#watchTableBody").append($('<tr><td>'+watchVariable+'</td><td>'+value+'</td></tr>'))}}
this.removeAllRows=function(){var rows=$("#watchTableBody").children()
for(var i=0;i<rows.length;++i){$("#watchTableBody")[0].removeChild(rows[i]);}}
this.insertInfoRow=function(watch){makeRow(watch)}
this.updateWatchTable=function(){this.removeAllRows();if(_rulerGroup._curve&&_rulerGroup._curve.isVisible())
{var n=_rulerGroup._watchList.length;for(var i=0;i<n;++i)
{var w=_rulerGroup.watch(i);if(w.isEnable())
this.insertInfoRow(w);}}}};define("rulers",["static","mpicker","ruler"],function(){});function Watch(rulerGroup,dependentRuler){this._dependentRuler=dependentRuler||Static.NoRuler
this._rulerGroup=rulerGroup
var _enable=true
this._curveName="";this._curve=null;this._rulerLeft=Number.MAX_VALUE;this._rulerRight=Number.MAX_VALUE;this._rulerBottom=Number.MAX_VALUE;this._rulerTop=Number.MAX_VALUE;this._value;this.name=function(){}
this.computeWatch=function(){}
this.value=function(){return this._value;}
this.setCurveName=function(curveName){this._curveName=curveName;}
this.setCurve=function(curve){this._curve=curve;}
this.setRulerLeft=function(val){if(this._curve&&this._curve.plot())
val=Static.adjustForDecimalPlaces(val,this._curve.plot().axisDecimalPlaces(this._curve.xAxis()));this._rulerLeft=val;}
this.setRulerRight=function(val){if(this._curve&&this._curve.plot())
val=Static.adjustForDecimalPlaces(val,this._curve.plot().axisDecimalPlaces(this._curve.xAxis()));this._rulerRight=val;}
this.setRulerBottom=function(val){if(this._curve&&this._curve.plot())
val=Static.adjustForDecimalPlaces(val,this._curve.plot().axisDecimalPlaces(this._curve.yAxis()));this._rulerBottom=val;}
this.setRulerTop=function(val){if(this._curve&&this._curve.plot())
val=Static.adjustForDecimalPlaces(val,this._curve.plot().axisDecimalPlaces(this._curve.yAxis()));this._rulerTop=val;}
this.setEnable=function(set)
{_enable=set;}
this.isEnable=function(){return _enable;}};define("watch",function(){});WatchCurveName.inheritsFrom(Watch);function WatchCurveName(){Watch.call(this)
this.name=function(){return"Curve name";}
this.computeWatch=function()
{this._value=this._curveName;}}
WatchLeftRulerPosition.inheritsFrom(Watch);function WatchLeftRulerPosition(rulerGroup){Watch.call(this,rulerGroup,Static.Left)
var self=this
this.name=function(){return"Left ruler position";}
this.valueType="number"
this.computeWatch=function()
{if(this._rulerLeft==Number.MAX_VALUE)
this._value="Invalid";else
this._value=this._rulerLeft;}
this.cb=function(){self._rulerGroup._rulerList[0]._pos=$(this).val()
self._rulerGroup._rulerList[0].validatePosition();self._rulerGroup._rulerList[0].setPosition(self._rulerGroup._rulerList[0]._pos);Static.trigger("positionChanged",[self._rulerGroup._rulerList[0],self._rulerGroup._rulerList[0]._pos])}}
WatchRightRulerPosition.inheritsFrom(Watch);function WatchRightRulerPosition(rulerGroup){Watch.call(this,rulerGroup,Static.Right)
var self=this
this.name=function(){return"Right ruler position";}
this.valueType="number"
this.computeWatch=function()
{if(this._rulerLeft==Number.MAX_VALUE)
this._value="Invalid";else
this._value=this._rulerRight;}
this.cb=function(){self._rulerGroup._rulerList[1]._pos=$(this).val()
self._rulerGroup._rulerList[1].validatePosition();self._rulerGroup._rulerList[1].setPosition(self._rulerGroup._rulerList[1]._pos);Static.trigger("positionChanged",[self._rulerGroup._rulerList[1],self._rulerGroup._rulerList[1]._pos])}}
WatchBottomRulerPosition.inheritsFrom(Watch);function WatchBottomRulerPosition(rulerGroup){Watch.call(this,rulerGroup,Static.Bottom)
var self=this
this.valueType="number"
this.name=function(){return"Bottom ruler position";}
this.computeWatch=function()
{if(this._rulerBottom==Number.MAX_VALUE)
this._value="Invalid";else
this._value=this._rulerBottom;}
this.cb=function(){self._rulerGroup._rulerList[2]._pos=$(this).val()
self._rulerGroup._rulerList[2].validatePosition();self._rulerGroup._rulerList[2].setPosition(self._rulerGroup._rulerList[2]._pos);Static.trigger("positionChanged",[self._rulerGroup._rulerList[2],self._rulerGroup._rulerList[2]._pos])}}
WatchTopRulerPosition.inheritsFrom(Watch);function WatchTopRulerPosition(rulerGroup){Watch.call(this,rulerGroup,Static.Top)
var self=this
this.valueType="number"
this.name=function(){return"Top ruler position";}
this.computeWatch=function()
{if(this._rulerTop==Number.MAX_VALUE)
this._value="Invalid";else
this._value=this._rulerTop;}
this.cb=function(){self._rulerGroup._rulerList[3]._pos=$(this).val()
self._rulerGroup._rulerList[3].validatePosition();self._rulerGroup._rulerList[3].setPosition(self._rulerGroup._rulerList[3]._pos);Static.trigger("positionChanged",[self._rulerGroup._rulerList[3],self._rulerGroup._rulerList[3]._pos])}}
WatchSlope.inheritsFrom(Watch);function WatchSlope(){Watch.call(this,Static.Left)
this.name=function(){return"Slope at left ruler";}
this.computeWatch=function()
{if(this._rulerLeft==Number.MAX_VALUE)
this._value="Invalid";else{if(this._curve.fn){var fn=this._curve.fn
if(this._curve.variable!='z'){while(fn.indexOf(this._curve.variable)!=-1){fn=fn.replace(this._curve.variable,'z')}}
if(this._curve.coeffs){for(var i=0;i<this._curve.coeffs.length;++i){while(fn.indexOf(this._curve.coeffs[i])!=-1){fn=fn.replace(this._curve.coeffs[i],this._curve.coeffsVal[i])}}}
this._value=math.derivative(fn,'z').eval({z:this._rulerLeft});return}
var numOfPoints=this._curve.dataSize()
var x=this._rulerLeft
for(var i=0;i<numOfPoints;++i){if(this._curve.sample(i).x>x){var p2=this._curve.sample(i)
var p1=this._curve.sample(i-1)
this._value=(p2.y-p1.y)/(p2.x-p1.x)
return}}}}}
WatchAreaBelowCurve.inheritsFrom(Watch);function WatchAreaBelowCurve(){Watch.call(this,Static.LeftAndRight)
this.name=function(){return"Area below curve";}
this.computeWatch=function()
{if(this._rulerLeft==Number.MAX_VALUE)
this._value="Invalid";else{if(this._curve.fn){var fn=this._curve.fn
fn=logBaseAdjust(fn);if(this._curve.variable!='z'){while(fn.indexOf(this._curve.variable)!=-1){fn=fn.replace(this._curve.variable,'z')}}
if(this._curve.coeffs){for(var i=0;i<this._curve.coeffs.length;++i){while(fn.indexOf(this._curve.coeffs[i])!=-1){fn=fn.replace(this._curve.coeffs[i],this._curve.coeffsVal[i])}}}
var decimalPlaces=this._curve.plot().axisDecimalPlaces(this._curve.yAxis())+
this._curve.plot().axisDecimalPlaces(this._curve.xAxis());this._value=math.eval('integrate('+fn+', z,'+this._rulerLeft+','+this._rulerRight+')')
this._value=Static.adjustForDecimalPlaces(this._value,decimalPlaces);return}
var numOfPoints=this._curve.dataSize()
this._value=0
for(var i=1;i<numOfPoints;++i){var p2=this._curve.sample(i)
var p1=this._curve.sample(i-1)
var fn=Static.linearEquationFromPoints(p1,p2)
var left=p1.x
if(p2.x<this._rulerLeft)
continue
if(p1.x>this._rulerRight)
continue
if(left<this._rulerLeft)
left=this._rulerLeft
var right=p2.x
if(right>this._rulerRight)
right=this._rulerRight
var decimalPlaces=this._curve.plot().axisDecimalPlaces(this._curve.yAxis())+
this._curve.plot().axisDecimalPlaces(this._curve.xAxis());this._value+=math.eval('integrate('+fn+', x,'+left+','+right+')')
this._value=Static.adjustForDecimalPlaces(this._value,decimalPlaces);}}}}
WatchVolumeOfRevolution.inheritsFrom(Watch);function WatchVolumeOfRevolution(){Watch.call(this,Static.LeftAndRight)
function getvolume(y1,y2,w){var volume=y1*w*Math.PI*y1
volume=volume+0.5*(y2-y1)*w*(y1+(y2-y1)/3)*2*Math.PI
return volume}
this.name=function(){return"Volume of revolution";}
this.computeWatch=function()
{if(this._rulerLeft==Number.MAX_VALUE)
this._value="Invalid";else{if(this._curve.fn){var fn=this._curve.fn
if(this._curve.variable!='x'){while(fn.indexOf(this._curve.variable)!=-1){fn=fn.replace(this._curve.variable,'x')}}
if(this._curve.coeffs){for(var i=0;i<this._curve.coeffs.length;++i){while(fn.indexOf(this._curve.coeffs[i])!=-1){fn=fn.replace(this._curve.coeffs[i],this._curve.coeffsVal[i])}}}
var decimalPlaces=2*this._curve.plot().axisDecimalPlaces(this._curve.yAxis())+
this._curve.plot().axisDecimalPlaces(this._curve.xAxis());this._value=math.eval('integrate('+fn+', x,'+this._rulerLeft+','+this._rulerRight+',true)')
this._value=Static.adjustForDecimalPlaces(this._value,decimalPlaces);return}
var numOfPoints=this._curve.dataSize()
var xLeft=this._rulerLeft
var xRight=this._rulerRight
var A0=0
var An=0
var Ai=0
for(var i=1;i<numOfPoints;++i){var p2=this._curve.sample(i)
var p1=this._curve.sample(i-1)
if(!A0&&p2.x>xLeft&&p2.x<=xRight){var y=p1.y+(p2.y-p1.y)*(xLeft-p1.x)/(p2.x-p1.x)
A0=getvolume(y,p2.y,p2.x-xLeft)
continue}
if(A0&&p2.x<=xRight){Ai+=getvolume(p2.y,p1.y,p2.x-p1.x)
continue}
if(p2.x>xRight){if(p1.x>=xLeft){var y=p2.y+(p2.y-p1.y)*(xRight-p2.x)/(p2.x-p1.x)
An=getvolume(y,p1.y,xRight-p1.x)
break}else{var y2=p2.y+(p2.y-p1.y)*(xRight-p2.x)/(p2.x-p1.x)
var y1=p1.y+(p2.y-p1.y)*(xLeft-p1.x)/(p2.x-p1.x)
An=getvolume(y2,y1,xRight-xLeft)
break}}}
var decimalPlaces=2*this._curve.plot().axisDecimalPlaces(this._curve.yAxis())+
this._curve.plot().axisDecimalPlaces(this._curve.xAxis());this._value=Static.adjustForDecimalPlaces(A0+Ai+An,decimalPlaces);}}};define("basicWatch",["static","watch"],function(){});var LegendMenu={}
LegendMenu.plot=null
LegendMenu.detachReset=null
LegendMenu.curveFitCb=null
LegendMenu.curveFitInfoCb=null
LegendMenu.axisCb=null
LegendMenu.curveStyleCb=null
LegendMenu.hiddenItems=null
LegendMenu.subMenu1=[{name:'style',subMenu:[{name:'Rectangle',fun:function(){LegendMenu.addSymbol(MRect)}},{name:'Cross',fun:function(){LegendMenu.addSymbol(Cross)}},{name:'Diamond',fun:function(){LegendMenu.addSymbol(Diamond)}},{name:'Ellipse',fun:function(){LegendMenu.addSymbol(Ellipse)}},{name:'Diagonal cross',fun:function(){LegendMenu.addSymbol(XCross)}},{name:'None',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
curve.setSymbol(null)}}]}]
LegendMenu.subMenu2=[{name:'style',subMenu:[{name:'Rectangle',fun:function(){LegendMenu.addSymbol(MRect)}},{name:'Cross',fun:function(){LegendMenu.addSymbol(Cross)}},{name:'Diamond',fun:function(){LegendMenu.addSymbol(Diamond)}},{name:'Ellipse',fun:function(){LegendMenu.addSymbol(Ellipse)}},{name:'Diagonal cross',fun:function(){LegendMenu.addSymbol(XCross)}},{name:'None',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
curve.setSymbol(null)}}]},{name:'size',subMenu:[{name:'5x5',fun:function(){LegendMenu.setSymbolSize(5)}},{name:'6x6',fun:function(){LegendMenu.setSymbolSize(6)}},{name:'8x8',fun:function(){LegendMenu.setSymbolSize(8)}},{name:'10x10',fun:function(){LegendMenu.setSymbolSize(10)}},{name:'12x12',fun:function(){LegendMenu.setSymbolSize(12)}},{name:'15x15',fun:function(){LegendMenu.setSymbolSize(15)}}]},{name:'fill brush',fun:function(){var colorSelector=$('<input type="color" style="opacity:0;">')
var curve=LegendMenu.getCurve()
if(!curve)return
var sym=curve.symbol()
if(sym){var brush=sym.brush()
var c=brush.color
if(c=="noBrush"){c="#000000"}
colorSelector.val(Static.colorNameToHex(c))
colorSelector.change(function(){$(this).remove()
brush.color=$(this).val()
sym.setBrush(brush)
LegendMenu.plot.autoRefresh()
LegendMenu.plot.updateLegend(curve)})
colorSelector.trigger('click')}}},{name:'pen',subMenu:[{name:'color',fun:function(){var colorSelector=$('<input type="color" style="opacity:0;">')
var curve=LegendMenu.getCurve()
if(!curve)return
var sym=curve.symbol()
if(!sym)
return
colorSelector.val(Static.colorNameToHex(sym.pen().color))
colorSelector.change(function(){var pen=sym.pen()
pen.color=$(this).val()
sym.setPen(pen)
LegendMenu.plot.autoRefresh()
LegendMenu.plot.updateLegend(curve)})
colorSelector.trigger('click')}},{name:'pen width',subMenu:[{name:'1',fun:function(){LegendMenu.setSymbolPenWidth(1)}},{name:'2',fun:function(){LegendMenu.setSymbolPenWidth(2)}},{name:'3',fun:function(){LegendMenu.setSymbolPenWidth(3)}},{name:'4',fun:function(){LegendMenu.setSymbolPenWidth(4)}},{name:'5',fun:function(){LegendMenu.setSymbolPenWidth(5)}}]}]}]
LegendMenu.menu1=[{name:'curve style',img:'images/axis.png',title:'Sets the style of the curve.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.curveStyleCb(curve)}},{name:'axis',img:'images/axis.png',title:'Sets the axes associated with the curve.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.axisCb(curve)}},{name:'legend attribute',img:'images/attribute.png',title:'Sets how the curve is represented on the legend.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.curveAttributeCb(curve)}},{name:'remove',img:'images/scissors.png',title:'Removes the curve from the plot.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
curve.detach()}},{name:'rename',img:'images/rename.png',title:'Renames the curve.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
Utility.curveRenameDlg(curve.title(),curve.plot())},},{name:'fit',img:'images/fit.png',title:'Defines a curve fitter.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.curveFitCb(curve)},},{name:'symbol',img:'images/symbol.png',subMenu:null},{name:'pen',img:'images/pen.png',subMenu:[{name:'color',fun:function(){var colorSelector=$('<input type="color" style="opacity:0;">')
var curve=LegendMenu.getCurve()
if(!curve)return
colorSelector.val(Static.colorNameToHex(curve.pen().color))
colorSelector.change(function(){var pen=curve.pen()
pen.color=$(this).val()
curve.setPen(pen)})
colorSelector.trigger('click')}},{name:'line style',subMenu:[{name:'solid',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="solid"
curve.setPen(pen)}},{name:'dot',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="dot"
curve.setPen(pen)}},{name:'dash',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="dash"
curve.setPen(pen)}},{name:'dashDot',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="dashDot"
curve.setPen(pen)}},{name:'dashDotDot',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="dashDotDot"
curve.setPen(pen)}}]},{name:'pen width',subMenu:[{name:'1',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=1
curve.setPen(pen)}},{name:'2',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=2
curve.setPen(pen)}},{name:'3',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=3
curve.setPen(pen)}},{name:'4',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=4
curve.setPen(pen)}},{name:'5',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=5
curve.setPen(pen)}}]}]}];LegendMenu.menu2=[{name:'curve style',img:'images/axis.png',title:'Sets the style of the curve.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.curveStyleCb(curve)}},{name:'axis',img:'images/axis.png',title:'Set the axes associated with the curve.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.axisCb(curve)}},{name:'legend attribute',img:'images/attribute.png',title:'Sets how the curve is represented on the legend.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.curveAttributeCb(curve)}},{name:'remove',title:'Removes the curve from the plot.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
curve.detach()}},{name:'rename',title:'Renames the curve.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
Utility.curveRenameDlg(curve.title(),curve.plot())},},{name:'fit',title:'Defines a curve fitter.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.curveFitCb(curve)},},{name:'symbol',subMenu:null},{name:'pen',subMenu:[{name:'color',fun:function(){var colorSelector=$('<input type="color" style="opacity:0;">')
var curve=LegendMenu.getCurve()
if(!curve)return
colorSelector.val(Static.colorNameToHex(curve.pen().color))
colorSelector.change(function(){var pen=curve.pen()
pen.color=$(this).val()
curve.setPen(pen)})
colorSelector.trigger('click')}},{name:'line style',subMenu:[{name:'solid',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="solid"
curve.setPen(pen)}},{name:'dot',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="dot"
curve.setPen(pen)}},{name:'dash',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="dash"
curve.setPen(pen)}},{name:'dashDot',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="dashDot"
curve.setPen(pen)}},{name:'dashDotDot',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.style="dashDotDot"
curve.setPen(pen)}}]},{name:'pen width',subMenu:[{name:'1',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=1
curve.setPen(pen)}},{name:'2',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=2
curve.setPen(pen)}},{name:'3',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=3
curve.setPen(pen)}},{name:'4',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=4
curve.setPen(pen)}},{name:'5',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var pen=curve.pen()
pen.width=5
curve.setPen(pen)}}]}]},{name:'fit info...',title:'Displays information associated with curve fitting.',fun:function(){var curve=LegendMenu.getCurve()
if(!curve)return
var info=LegendMenu.curveFitInfoCb(curve)
if(info.length){Static.alert(info)}else{Static.alert("No curve fitting equation found for \""+curve.title()+".\"")}}}];LegendMenu.addSymbol=function(style){Utility.addSymbol(LegendMenu.getCurve(),style)}
LegendMenu.setSymbolPenWidth=function(width){Utility.setSymbolPenWidth(LegendMenu.getCurve(),width)}
LegendMenu.setSymbolSize=function(value){Utility.setSymbolSize(LegendMenu.getCurve(),value)}
LegendMenu.getCurve=function(){if(LegendMenu.el==undefined){return null}
var txt=LegendMenu.el.text().replace(' ','')
return LegendMenu.plot.findPlotCurve(txt)}
LegendMenu.initialize=function(){var _menuItemName=""
function indexOfMenuItemCb(_name,legendMenu){_menuItemName=_name
return legendMenu.findIndex(findIndexOfMenuItemCb);}
function findIndexOfMenuItemCb(obj){return obj.name==_menuItemName;}
function hideMenuItem(menuItemName){_menuItemName=menuItemName
LegendMenu.menu1.splice(LegendMenu.menu1.findIndex(findIndexOfMenuItemCb),1)
LegendMenu.menu2.splice(LegendMenu.menu2.findIndex(findIndexOfMenuItemCb),1)}
if(LegendMenu.hiddenItems)
LegendMenu.hiddenItems.forEach(hideMenuItem)
LegendMenu.table=$(LegendMenu.plot.getLayout().getLegendDiv().children()[0])
LegendMenu.table.mousedown(function(e){if(e.button!=2){return}
var x=e.pageX,y=e.pageY;var res=[];var ele=document.elementFromPoint(x,y);while(ele&&ele.tagName!="BODY"&&ele.tagName!="HTML"){res.push(ele);ele.style.display="none";ele=document.elementFromPoint(x,y);}
for(var i=0;i<res.length;i++){res[i].style.display="";}
LegendMenu.el=$(res[0]).parent()
var curve=LegendMenu.getCurve()
if(!curve)return
LegendMenu.menu=LegendMenu.menu1
if(curve){if(curve.fitType){LegendMenu.menu=LegendMenu.menu2}}
var subMenuIndex=indexOfMenuItemCb('symbol',LegendMenu.menu1)
if(subMenuIndex>-1){LegendMenu.menu[subMenuIndex].subMenu=LegendMenu.subMenu1
if(curve&&curve.symbol()){LegendMenu.menu[subMenuIndex].subMenu=LegendMenu.subMenu2}}
LegendMenu.el.contextMenu(LegendMenu.menu,{triggerOn:'contextmenu touchstart',zIndex:1});})};define("legendMenu",["static","contextMenu"],function(){});class MyOverlay extends WidgetOverlay{constructor(widget,eventObject){super(widget);var self=this;this.eventObject=eventObject;this.curve=null;this.toString=function(){return'[MyOverlay]';}}
drawOverlay(painter){let xMap=this.curve.plot().canvasMap(this.curve.xAxis());let yMap=this.curve.plot().canvasMap(this.curve.yAxis());let cx=xMap.transform(this.eventObject.p.x);let cy=yMap.transform(this.eventObject.p.y);painter.setBrush(new Misc.Brush("lightGrey"))
painter.drawCircle(cx,cy,8);}}
class MyObject extends HObject{constructor(plot,cb){super();var self=this;this._plot=plot;this._dmin=10;this._cb==null;this.selected=false;if(cb!==undefined)
this._cb=cb;this.selectorWidgetOverlay=new MyOverlay(plot.getCentralWidget(),this);Static.bind("visibilityChange",function(e,curve,on)
{if(self.selectorWidgetOverlay.curve!==curve)
return;if(!on){self.selectorWidgetOverlay.clearCanvas();this.selected=false;}})
this.toString=function(){return'[MyObject]';}}
eventFilter(watched,event){if(Static.isMobile()){if(event.type=='touchstart'){let curves=this._plot.itemList(Static.Rtti_PlotCurve);if(!curves.length)
return;var pt=watched.mapToElement({x:event.originalEvent.touches[0].clientX,y:event.originalEvent.touches[0].clientY});let dist={distance:-1};let curvePointIndex=-1;let curvePointIndexAtDmin=-1;let dmin=1.0e10;let indexInCurvesListAtDmin=-1;for(var i=0;i<curves.length;++i){if(!curves[i].isVisible())
continue;curvePointIndex=curves[i].closestPoint(pt,dist);if(dist.distance<dmin){dmin=dist.distance;indexInCurvesListAtDmin=i;curvePointIndexAtDmin=curvePointIndex;}}
if(curvePointIndexAtDmin==-1)
return;this.p=curves[indexInCurvesListAtDmin].data().samples()[curvePointIndexAtDmin];if(dmin<this._dmin){if(this._cb==null)
alert("Curve: "+curves[indexInCurvesListAtDmin].title()+"; point: ("+this.p.x+", "+this.p.y+")");else{this._cb(curves[indexInCurvesListAtDmin],this.p);}}}
return;}
if(event.type=='mousedown'){if(this.selected){if(this._cb==null)
alert("Curve: "+this.selectorWidgetOverlay.curve.title()+"; point: ("+this.p.x+", "+this.p.y+")");else{this._cb(this.selectorWidgetOverlay.curve,this.p);}}}
if(event.type=='mousemove'){let curves=this._plot.itemList(Static.Rtti_PlotCurve);if(!curves.length)
return;var pt=watched.mapToElement({x:event.clientX,y:event.clientY});let dist={distance:-1};let curvePointIndex=-1;let curvePointIndexAtDmin=-1;let dmin=1.0e10;let indexInCurvesListAtDmin=-1;for(var i=0;i<curves.length;++i){if(!curves[i].isVisible())
continue;curvePointIndex=curves[i].closestPoint(pt,dist);if(dist.distance<dmin){dmin=dist.distance;indexInCurvesListAtDmin=i;curvePointIndexAtDmin=curvePointIndex;}}
if(curvePointIndexAtDmin==-1)
return;this.p=curves[indexInCurvesListAtDmin].data().samples()[curvePointIndexAtDmin];if(!this.selected){this.selectorWidgetOverlay.clearCanvas();}
if(dmin<this._dmin){this.selectorWidgetOverlay.curve=curves[indexInCurvesListAtDmin];if(!this.selected){this.selectorWidgetOverlay.draw();this.selected=true;}}else{this.selected=false;}}
return true;}}
class CurveClosestPoint{constructor(plot,cb){this.eventHandlingObject=new MyObject(plot);this.cw=plot.getCentralWidget();this.cw.setEnabled_1(true);}
setDistance(dist){this.eventHandlingObject._dmin=dist;}
setEnabled(on){if(on)
this.cw.installEventFilter(this.eventHandlingObject);else{this.cw.removeEventFilter(this.eventHandlingObject);this.eventHandlingObject.selectorWidgetOverlay.clearCanvas();}}
setCb(cb){this.eventHandlingObject._cb=cb;}};define("curveClosestPoint",["static","widgetOverlay"],function(){});define('app/examples/qwtTest',['jqwtfile','settings','curveSettings','upload','toolBar','functionDlg','curveFitDlg','curveStyleDlg','axisDlg','pointEntryDlg','curveLegendAttributeDlg','jQwtPlot','jQwtPointData','jQwtSymbol','jQwtLegend','jQwtMagnifier','jQwtPlotGrid','widgetOverlay','qwtplotzoomer','qwtplotcurve','jQwtCurveFitter','jQwtSpline','sideBar','jQwtPanner','contextMenu','jQwtPlotMarker','ruler','mpicker','rulers','watch','basicWatch','legendMenu','curveClosestPoint','widgetOverlay'],function(File,Settings,CurveSettings,Upload,ToolBar,FunctionDlg,CurveFitDlg,CurveStyleDlg,AxisDlg,PointEntryDlg,CurveAttributeDlg){var isChrome=!!window.chrome&&!!window.chrome.webstore;if(!isChrome){Static.alert('This application is design to run in \"chrome browser\". While it may run in other browsers, some features may not behave as expected.',"small");}
var _numOfSamples=80;var plot=new Plot($("#plotDiv"),"Plot");plot.setFooter("Footer");var grid=new PlotGrid();grid.attach(plot);function minorGridLines(on){Utility.minorGridLines(grid,on)}
minorGridLines(true);function majorGridLines(on){Utility.majorGridLines(grid,on)}
Static.bind("itemChanged",function(e,plotItem,on){if(plotItem.rtti==Static.Rtti_PlotGrid){if(!on){tbar.hideDropdownItem("View",5);}else{tbar.showDropdownItem('View',5);}}})
var lgd=new MLegend;plot.insertLegend(lgd);plot.enableLegend(true);var magnifier=new Magnifier(plot);var pan=new Panner(plot);pan.setCursor("move");pan.setEnabled(false);var zm=new PlotZoomer(plot);zm.setEnabled(false);plot.setAxisTitle(xBottom,"Bottom scale");plot.setAxisTitle(xTop,"Top scale");plot.setAxisTitle(yLeft,"Left scale");plot.setAxisTitle(yRight,"Right scale");plot.replot();plot.setAutoReplot(true);function footerFn(on){if(on){plot.showFooter();}else{plot.hideFooter();}}
function legendFn(on){plot.enableLegend(on);}
function titleFn(on){if(on){plot.showTitle();}else{plot.hideTitle();}}
function pointSelection(on){plot.curveClosestPoint.setEnabled(on);}
function leftAxis(on){plot.enableAxis(yLeft,on);}
function rightAxis(on){plot.enableAxis(yRight,on);}
function bottomAxis(on){plot.enableAxis(xBottom,on);}
function topAxis(on){plot.enableAxis(xTop,on);}
function radioButtonCb(){var myRadio=$('input[name=optradio]');var checkedValue=myRadio.filter(':checked').val();if(checkedValue=="Zoom"){pan.setEnabled(false);zm.setEnabled(true);zm.setZoomBase(zm.scaleRect());}
if(checkedValue=="Pan"){pan.setEnabled(true);zm.setEnabled(false);}
if(checkedValue=="Auto"){pan.setEnabled(false);zm.setEnabled(false);Utility.setAutoScale(plot,true);}}
Static.bind("rescaled",function(){tbar.setButtonCheck('Auto',false);})
var tbar=new ToolBar({zIndex:1003})
function getCoffsVal(){var result=[];var coeffs=FunctionDlg.coeffs||[];for(var i=0;i<coeffs.length;++i){result.push(1.0);}
return result;}
function addCurveInit(curve){curve.coeffs=FunctionDlg.coeffs;curve.variable=FunctionDlg.variable;curve.coeffsVal=getCoffsVal();curve.fn=FunctionDlg.fn;curve.unboundedRange=FunctionDlg.unboundedRange;curve.lowerX=parseFloat(FunctionDlg.lowerLimit);curve.upperX=parseFloat(FunctionDlg.upperLimit);curve.numOfSamples=FunctionDlg.numOfPoints;}
var el=plot.getLayout().getCentralDiv();function addCurve(title,samples,upload){if(!samples||samples.length==0){return false;}
if(plot.findPlotCurve(title)){Static.alert(title+" already exist");return false;}
var curve=new Curve(title);if(!upload)
addCurveInit(curve);curve.setSamples(samples);curve.setPen(new Misc.Pen(Utility.randomColor()));CurveAttributeDlg.defaultIconSize=new Misc.Size(curve.getLegendIconSize());var attribute="";if(Static.showline&&Static.showsymbol){attribute="lineAndSymbol";}else if(Static.showline){attribute="line";}else if(Static.showsymbol){attribute="symbol";}
Utility.setLegendAttribute(curve,attribute,curve.getLegendIconSize());curve.attach(plot);rv.setCurrentCurve(curve);sidebar.initSidebar();return true;}
Static.bind('addCurve',function(e,title,samples,upload){addCurve(title,samples,upload);});var fnListFile=[File.save,CurveSettings.curveSettingsDlg,Settings.settingsDlg,functionFn,pointEntryFn,calculatorFn,Static.printFn];tbar.addToolButton("dropdown",{text:"File",cb:function(e,index){fnListFile[index]();},listElements:[{text:"Save",icon:'images/save.png',tooltip:"Save the current graph."},{text:"Curve settings",icon:'images/curveSettings.png',tooltip:"Launches the curve settings dialog."},{text:"Plot settings",icon:'images/settings.png',tooltip:"Launches the plot settings dialog."},{text:"Function",icon:'images/function.png',tooltip:"Launches the function dialog."},{text:"Point entry",icon:'images/pointEntry.png',tooltip:"Launches the point entry dialog."},{text:"Calculator",icon:'images/calculator.png',tooltip:"Launches the calculator."},{text:"Print",icon:'images/print.png',tooltip:"Print the current graph."}]})
tbar.addToolButton("upload",{innerHtmlId:"fileInput",class:"btn btn-primary",tooltip:"Upload data files"})
File.setInputElement($("#fileInput"));tbar.addToolButton("radio",{label:"Zoom",tooltip:"Enable zooming. Press the mouse left button and drag.",cb:radioButtonCb})
tbar.addToolButton("radio",{label:"Pan",tooltip:"Allow dragging of all plot items to new positions. Press the mouse left button and drag.",cb:radioButtonCb})
tbar.addToolButton("radio",{label:"Auto",tooltip:"Determine and and apply the scale that\nallows the extent of all curves to be shown.",cb:radioButtonCb})
var fnListAxis=[pointSelection,leftAxis,bottomAxis,rightAxis,topAxis,majorGridLines,minorGridLines,titleFn,footerFn,legendFn,coeffSidebarFn]
tbar.addToolButton("dropdown",{text:"View",hasCheckbox:true,cb:function(e,index,checked){fnListAxis[index](checked);},listElements:[{text:"Point selection",icon:"images/pointSelection.png",tooltip:"Turn on point selection. This may affect response."},{text:"Left axis",icon:"images/axis.png",tooltip:"Enable left axis",checkboxState:"checked"},{text:"Bottom axis",icon:"images/axis.png",tooltip:"Enable bottom axis",checkboxState:"checked"},{text:"Right axis",icon:"images/axis.png",tooltip:"Enable right axis",},{text:"Top axis",icon:"images/axis.png",tooltip:"Enable top axis"},{text:"Major gridlines",icon:"images/major_grid.png",tooltip:"Enable major gridlines",checkboxState:"checked"},{text:"Minor gridlines",icon:"images/minor_grid.png",tooltip:"Enable minor gridlines",checkboxState:"checked"},{text:"Title",icon:"images/title.png",tooltip:"Enable title",checkboxState:"checked"},{text:"Footer",icon:"images/footer.png",tooltip:"Enable footor",checkboxState:"checked"},{text:"Legend",icon:"images/legend.png",tooltip:"Enable the legend (at least one curve should be present)",checkboxState:"checked"},{text:"Sidebar",icon:"images/side_bar.png",tooltip:"Display the sidebar"}]})
tbar.addToolButton("pushbutton",{text:"+",icon:"images/zoom_in.png",repeat:true,tooltip:"Zoom in.",cb:function(e){var f=0.995
for(var axisId=0;axisId<axisCnt;axisId++){var scaleDiv=plot.axisScaleDiv(axisId);if(scaleDiv.range()>0.000000001){magnifier.rescale(f);}}}})
tbar.addToolButton("pushbutton",{text:"-",icon:"images/zoom_out.png",repeat:true,tooltip:"Zoom out",cb:function(e){var f=1/0.98
magnifier.rescale(f);}})
if(plot.title()==""){tbar.hideDropdownItem("View",6)}
Static.bind("titleAdded",function(e,param){if(param){tbar.showDropdownItem('View',6)}else{tbar.hideDropdownItem("View",6)}})
if(plot.footer()==""){tbar.hideDropdownItem("View",7)}
Static.bind("footerAdded",function(e,param){if(param){tbar.showDropdownItem('View',7)}else{tbar.hideDropdownItem("View",7)}})
tbar.hideDropdownItem("View",9)
Static.bind("itemAttached",function(e,plotItem,on){if(plotItem.rtti==Static.Rtti_PlotCurve){if(on){tbar.showDropdownItem('View',9);}else{if(!plot.itemList(Static.Rtti_PlotCurve).length){tbar.hideDropdownItem("View",9)
tbar.setDropdownItemCheck('View',9,false)
sidebar.showSidebar(false);}}
sidebar.initSidebar()}})
Static.bind("visibilityChange",function(e,plotItem,on){if(plotItem.rtti==Static.Rtti_PlotCurve){sidebar.initSidebar()}})
function coeffSidebarFn(on){if(plot.itemList(Static.Rtti_PlotCurve).length){sidebar.showSidebar(on)}}
tbar.setButtonCheck('Auto',true)
Static.bind("axisChanged",function(e,axis){if(axis==xBottom||axis==xTop){rv.setRulersXAxis(axis)}
if(axis==yLeft||axis==yRight){rv.setRulersYAxis(axis)}})
Static.bind("pointAdded pointRemoved",function(e,curve){rv.doSetCurrentCurve(curve)})
LegendMenu.plot=plot;LegendMenu.curveFitCb=CurveFitDlg.curveFitCb;LegendMenu.curveFitInfoCb=CurveFitDlg.curveFitInfoCb;LegendMenu.curveStyleCb=CurveStyleDlg.curveStyleCb;LegendMenu.axisCb=AxisDlg.axisCb;LegendMenu.curveAttributeCb=CurveAttributeDlg.curveAttributeCb;LegendMenu.initialize();function numberOfCurves(plot){return plot.itemList(Static.Rtti_PlotCurve).length;}
var w;function calculatorFn(){if(!w||w.closed){w=window.open("https://www.tcsion.com/OnlineAssessment/ScientificCalculator/Calculator.html#nogo","_blank","width=480,height=345, top=200, left=200");}
w.focus();}
CurveSettings.init(plot,CurveFitDlg.curveFitCb,CurveFitDlg.curveFitInfoCb,CurveAttributeDlg.curveAttributeCb,CurveStyleDlg.curveStyleCb,AxisDlg.axisCb)
File.init(plot)
Settings.setPlot(plot)
function validateTitle(str){if(!str)
return str
var s=str.trim()
return s.length>0?s:null}
function validateFunction(str){if(!str)
return str
var s=str.trim()
return s.length>0?s:null}
FunctionData.inheritsFrom(SyntheticPointData);function FunctionData(yCb,numOfPoints){SyntheticPointData.call(this,numOfPoints);var d_y=yCb
var parser=new EvaluateExp(d_y)
this.setFn=function(fn){d_y=fn
parser.setExpString(d_y)}
this.y=function(_x){if(parser.error)
return 0
return parser.eval({x:_x});}}
function addUnboundedCurve(title,fn,numOfPoints){if(plot.findPlotCurve(title)){Static.alert(title+" already exist")
return false;}
plot.setAxisScale(xBottom,1.0,10.0);plot.setAxisScale(yLeft,1.0,10.0);var curve=new Curve(title)
addCurveInit(curve)
curve.setData(new FunctionData(fn,numOfPoints))
curve.setPen(new Misc.Pen(Utility.randomColor()));CurveAttributeDlg.defaultIconSize=new Misc.Size(curve.getLegendIconSize());if(Static.showline){curve.setLegendAttribute(LegendShowLine,true);}
if(Static.showsymbol)
curve.setLegendAttribute(LegendShowSymbol,true);curve.attach(plot)
Utility.setAutoScale(plot,true);return true;}
function functionCb(){var title=FunctionDlg.title,fn=FunctionDlg.fn,lowerLimit=FunctionDlg.lowerLimit,upperLimit=FunctionDlg.upperLimit,numOfPoints=FunctionDlg.numOfPoints,coeffs=FunctionDlg.coeffs;if(FunctionDlg.coeffs.length){for(var i=0;i<coeffs.length;++i){while(fn.indexOf(coeffs[i])!=-1){fn=fn.replace(coeffs[i],1);}}}
if(FunctionDlg.unboundedRange){if(addUnboundedCurve(title,fn,numOfPoints)){FunctionDlg.close()}}else if(addCurve(title,makeSamples({fx:fn,lowerX:parseFloat(FunctionDlg.lowerLimit),upperX:parseFloat(FunctionDlg.upperLimit),numOfSamples:FunctionDlg.numOfPoints}))){FunctionDlg.close()}}
FunctionDlg.init(functionCb)
function functionFn(){FunctionDlg.functionDlg()}
function pointEntryFn(){PointEntryDlg.pointEntryCb(plot);}
var sidebar=new SideBar(plot,tbar,makeSamples)
var menu=[{name:'Hide rulers',img:'images/hide.png',title:'Hide all rulers',fun:function(){rv.setVisible(false)}},{name:'Show rulers',img:'images/show.png',title:'Show any hidden rulers',fun:function(){rv.setVisible(true)}},{name:'Unlock rulers',img:'images/unlock.png',title:'Unlock any locked rulers',fun:function(){rv.unlockAllRulers()}},{name:'Remove all curves',title:'Permanently remove all curves',img:'images/scissors.png',fun:function(){var L=plot.itemList(Static.Rtti_PlotCurve);L.forEach(function(curve){curve.detach()})}}]
Static.bind("rulerSelected",function(){el.contextMenu(menu,{triggerOn:'contextmenu',zIndex:1});})
var rv=new Rulers(plot)
sidebar.setRulers(rv)
var menu1=[{name:'hide...',img:'images/hide.png',title:'hide the ruler.',fun:function(){rv.currentRuler.setVisible(false)
rv.currentRuler._picker.clearDragCursor()
if(!rv.hasVisibleRuler()){;}else{;}}},{name:'lock...',img:'images/lock.png',title:'lock the ruler in its current position.',fun:function(){rv.currentRuler.setLock(true)
if(!rv.hasLockedRuler()){;}else{;}}},{name:'lock at...',img:'images/lockAt.png',title:'lock the ruler at a specific position.',fun:function(){var currentRulerPosition=0;if(rv.currentRuler instanceof RulerH){currentRulerPosition=rv.currentRuler.yValue()}else{currentRulerPosition=rv.currentRuler.xValue()}
Static.prompt("Enter a position",currentRulerPosition,function(val){rv.currentRuler.setLockAt(parseFloat(val))
return true},"small")}}]
Static.bind("rulerDeselected",function(){el.contextMenu(menu,{triggerOn:'contextmenu',zIndex:1});})
Static.trigger("rulerDeselected");rv.setMenu(menu1)
var watchElements=[];function addwatch(watch,options,disabled){rv.addToWatchList(watch)
watchElements.push(options)
if(disabled){watch.setEnable(false)}}
addwatch(new WatchCurveName(),{text:"Curve name",tooltip:"Name of the curve that is the subject of watches.",checkboxState:"checked"})
addwatch(new WatchLeftRulerPosition(rv),{text:"Left ruler position",tooltip:"Current position of the left ruler.",checkboxState:"checked"})
addwatch(new WatchRightRulerPosition(rv),{text:"Right ruler position",tooltip:"Current position of the right ruler.",checkboxState:"checked"})
addwatch(new WatchBottomRulerPosition(rv),{text:"Bottom ruler position",tooltip:"Current position of the bottom ruler."},true)
addwatch(new WatchTopRulerPosition(rv),{text:"Top ruler position",tooltip:"Current position of the top ruler."},true)
addwatch(new WatchSlope(),{text:"Slope at left ruler",tooltip:"Slope (gradient) in the curve at the point where the left ruler intersects the curve."},true)
addwatch(new WatchAreaBelowCurve(),{text:"Area below curve",tooltip:"Area bounded by the curve, right ruler, x-axis and left ruler."},true)
addwatch(new WatchVolumeOfRevolution(),{text:"Volume of revolution(X)",tooltip:"Volume generated by a 360 degrees rotation about the x-axis of the area bounded by the curve, right ruler, x-axis and left ruler."},true)
Static.bind("curveAdjusted",function(){rv.updateWatchesAndTable()})
tbar.addToolButton("dropdown",{text:"Watch",tooltip:"Enable/disable watches.",hasCheckbox:true,cb:function(e,index,checked){rv.watch(index).setEnable(checked)
rv.updateWatchesAndTable()},listElements:watchElements})
tbar.addToolButton("link",{text:"Help",cb:function(){},href:'help.html',target:'_blank',class:"noSelect",tooltip:"Launches online help."})
plot.curveClosestPoint=new CurveClosestPoint(plot)});define('app/main',['require','static','utility','miscObjects','jPainter','jQwtPlot','scaleDiv','interval','scaleMap','hObject','widget','scaleWidget','plotItem','transform','layout','abstractScaleDraw','scaleDraw','scaleEngine','pointMapper','seriesData','./examples/qwtTest'],function(require){require('static');require('utility');require('miscObjects');require('jPainter');require('jQwtPlot');require('scaleDiv');require('interval');require('scaleMap');require('hObject');require('widget');require('scaleWidget');require('plotItem');require('transform');require('layout');require('abstractScaleDraw');require('scaleDraw');require('scaleEngine');require('pointMapper');require('seriesData');require('./examples/qwtTest');});requirejs.config({baseUrl:'lib',paths:{app:'../app',jquery:'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',bootstrap:"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min"},shim:{'bootstrap':{deps:['jquery']},'static':{deps:['miscObjects']},'plotItem':{deps:['static']},'ruler':{deps:['static','jQwtPlotMarker']},'rulerVandH':{deps:['static','jQwtPlotMarker']},'mpicker':{deps:['static','qwtplotpicker']},'rulers':{deps:['static','mpicker','ruler']},'scaleMap':{deps:['static','transform']},'jQwtCanvas':{deps:['static']},'jQwtCurveFitter':{deps:['static']},'jQwtSpline':{deps:['static']},'jQwtSymbol':{deps:['static','jGraphic']},'seriesData':{deps:['static','plotItem']},'pointMapper':{deps:['static']},'jQwtPointData':{deps:['static','seriesData']},'scaleEngine':{deps:['static']},'scaleDraw':{deps:['static']},'widget':{deps:['static','hObject']},'widgetOverlay':{deps:['static','widget']},'scaleWidget':{deps:['static','widget']},'qwtpicker':{deps:['static','widgetOverlay','qwtpickermachine']},'qwtplotpicker':{deps:['static','qwtpicker']},'qwtplotzoomer':{deps:['qwtplotpicker']},'jQwtPlotGrid':{deps:['static','plotItem']},'jQwtPlotZoneItem':{deps:['static']},'jQwtPlotSpectroCurve':{deps:['static','jQwtColorMap','plotItem']},'jQwtColorMap':{deps:['static']},'qwtplotcurve':{deps:['static','seriesData']},'jQwtPlot':{deps:['static','widget','scaleWidget']},'jQwtPanner':{deps:['static']},'jQwtMagnifier':{deps:['static']},'jQwtPlotShapeItem':{deps:['static']},'jQwtPlotMarker':{deps:['static','plotItem']},'jQwtLegend':{deps:['static']},'legendMenu':{deps:['static','contextMenu']},'qwtpickermachine':{deps:['static','qwteventpattern']},'jWidget':{deps:['static','jObject']},'basicWatch':{deps:['static','watch']},'curveClosestPoint':{deps:['static','widgetOverlay']}}});requirejs(['app/main']);define("app",function(){});