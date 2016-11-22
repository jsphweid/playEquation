"use strict";function FooplotSVGRecorder(){this.width=null,this.height=null,this.font="",this.textAlign="",this.svgHeader="",this.svgBody="",this.svgFooter="",this.lineWidth=1,this.strokeStyle="#000000",this.fillStyle="#ffffff",this.x=0,this.y=0,this.path_d="",this.moveToX=null,this.moveToY=null,this.clear=function(){this.svgBody=""},this.fillText=function(a,b,c){var d="start";"center"===this.textAlign&&(d="middle"),"right"===this.textAlign&&(d="end"),this.svgBody+='<text x="'+b+'" y="'+c+'" text-anchor="'+d+'" style="font:'+this.font+";stroke:none;fill:"+this.fillStyle+'">'+a+"</text>"},this.beginPath=function(){this.path_d=""},this.moveTo=function(a,b){isNaN(a)||isNaN(b)||(this.moveToX=a.toFixed(2),this.moveToY=b.toFixed(2))},this.lineTo=function(a,b){this.moveToX&&(this.path_d+="M"+this.moveToX+" "+this.moveToY+" ",this.moveToX=null,this.moveToY=null),this.path_d+="L"+a.toFixed(2)+" "+b.toFixed(2)+" "},this.stroke=function(){this.svgBody+='<path d="'+this.path_d+'" style="fill:none;stroke:'+this.strokeStyle+";stroke-width:"+this.lineWidth+';" />',this.path_d=""},this.fillRect=function(a,b,c,d){this.svgBody+='<rect x="'+a.toFixed(2)+'" y="'+b.toFixed(2)+'" width="'+c.toFixed(2)+'" height="'+d.toFixed(2)+'" style="fill:'+this.fillStyle+';stroke:none;" />'},this.getSVG=function(){var a="";return a+='<?xml version="1.0" standalone="no"?>',a+='<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',a+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+this.width+" "+this.height+'" version="1.1">',a+='<clipPath id="box"><rect x="0" y="0" width="'+this.width+'" height="'+this.height+'" style="fill:none;stroke:none;" /></clipPath>',a+='<g clip-path="url(#box)">',a+=this.svgBody,a+="</g></svg>"}}function Fooplot(container,options){FOOPLOT_INSTANCES.push(this),this.container=container,this.container.style.overflow="hidden",this.container.style.position="relative",this.container.style.webkitUserSelect="none",this.container.style.MozUserSelect="none",this.container.style.userSelect="none",FOOPLOT_MSIE&&(this.container.unselectable=!0),this.container.style.cursor="move",this.cover=document.createElement("div"),this.cover.style.position="absolute",this.cover.style.width="100%",this.cover.style.height="100%",this.container.style.webkitUserSelect="none",this.container.style.MozUserSelect="none",FOOPLOT_MSIE&&(this.cover.unselectable=!0),this.cover.style.zIndex=100,this.cover.style.background="#ffffff",this.cover.style.filter="alpha(opacity=0)",this.cover.style.opacity=0,this.container.appendChild(this.cover),this.subcontainer=document.createElement("div"),this.subcontainer.style.position="absolute",this.subcontainer.style.zIndex="1",this.subcontainer.style.webkitUserSelect="none",this.subcontainer.style.userSelect="none",FOOPLOT_MSIE&&(this.subcontainer.unselectable=!0),this.container.appendChild(this.subcontainer),this.recorder=new FooplotSVGRecorder,this.toolcontainer=document.createElement("div"),this.toolcontainer.style.position="absolute",this.toolcontainer.style.top="100%",this.toolcontainer.style.zIndex="200",this.toolcontainer.style.opacity=.7,this.toolcontainer.style.marginTop="-60px",this.toolcontainer.style.marginLeft="10px",this.toolcontainer.style.padding="10px",this.toolcontainer.style.height="32px",this.toolcontainer.style.webkitBorderRadius="5px",this.toolcontainer.style.visibility="hidden",this.container.appendChild(this.toolcontainer),this.addToolSeparator=function(){var a=document.createElement("div");a.style.display="inline",a.style.width="32px",a.style.height="1px",a.style.border="0px",a.style.padding="0px",a.style.marginRight="15px",this.toolcontainer.appendChild(a)},this.addToolButton=function(a,b,c,d){var e=document.createElement("button");return e.className="fooplot-tool",e.style.width="32px",d&&(e.title=d),e.style.background=a,e.style.position="relative",e.style.height="32px",e.style.border="0px",e.style.padding="0px",e.style.marginRight="15px",e.style.cursor="pointer",c?(e.onclick=function(){for(i in FOOPLOT_INSTANCES)if(this.parentNode===FOOPLOT_INSTANCES[i].toolcontainer)var a=FOOPLOT_INSTANCES[i];a.selectMode(this)},this.toolsMode.push({tool:e,id:c})):(e.onmousedown=function(){this.style.opacity=.7,this.style.filter="alpha(opacity=70)"},e.onmouseup=function(){this.style.opacity=1,this.style.filter=""},e.onmouseout=function(){this.style.opacity=1,this.style.filter=""},e.onclick=b),this.toolcontainer.appendChild(e),e},this.hideIntersection=function(){this.intersectionPoint.style.visibility="hidden",this.intersectionDisplay.style.visibility="hidden"},this.hideTrace=function(){this.tracePoint.style.visibility="hidden",this.traceDisplay.style.visibility="hidden"},this.toolsMode=[],this.selectedMode=FOOPLOT_MODE_MOVE,this.selectMode=function(a){this.hideIntersection(),this.hideTrace();for(var b in this.toolsMode)this.toolsMode[b].tool===a||this.toolsMode[b].id===a?(this.selectedMode=this.toolsMode[b].id,this.toolsMode[b].tool.style.opacity=.7,this.toolsMode[b].tool.style.filter="alpha(opacity=70)"):(this.toolsMode[b].tool.style.opacity=1,this.toolsMode[b].tool.style.filter="")},this.zoomTimeout=null,this.zoomSelf=null,this.zoomPendingFactor=1,this.zoom=function(a){this.zoomTimeout&&window.clearTimeout(this.zoomTimeout),FOOPLOT_TRANSITIONS&&this.canvas&&this.canvas.style&&1!=a,this.hideIntersection(),this.hideTrace(),this.zoomSelf=this,this.zoomPendingFactor*=a,this.zoomTimeout=window.setTimeout(function(a){if(!a)for(i in FOOPLOT_INSTANCES)if(FOOPLOT_INSTANCES[i].zoomSelf)var a=FOOPLOT_INSTANCES[i].zoomSelf;var b=(a.xmax+a.xmin)/2,c=(a.ymax+a.ymin)/2;a.xmax=(a.xmax-b)/a.zoomPendingFactor+b,a.xmin=(a.xmin-b)/a.zoomPendingFactor+b,a.ymax=(a.ymax-c)/a.zoomPendingFactor+c,a.ymin=(a.ymin-c)/a.zoomPendingFactor+c,a.zoomPendingFactor=1,a.reDraw(),a.canvas.style.OTransition="color 0 ease",a.canvas.style.webkitTransition="",a.canvas.style.MozTransition="",a.canvas.style.msTransition="",a.canvas.style.webkitTransform="",a.canvas.style.MozTransform="",a.canvas.style.msTransform+="",a.canvas.style.OTransform="",a.onWindowChange([a.xmin,a.xmax,a.ymin,a.ymax]),a.zoomTimeout=null,a.zoomSelf=null},FOOPLOT_TRANSITIONS?1:0,this)},this.toolZoomIn=this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAPZRAP9/AP+AAP+AAf+AAv+BA/+BBP+DB/+GDf+GDv+HD/+KFv+LGP+MGv+OHf+PH/+QIv+UKf+UKv+YMv+aNv+bN/+gQf+iRf+jSP+kSf+nUP+oUv+pU/+pVP+qVv+sWf+wYf+xY/+2bv+5c/+8ev+9fP+/gP/Bg//Chv/Eiv/Gjf/HkP/Jk//Ll//Mmf/Onv/Qof/Ysv/bt//cuf/cuv/du//evf/evv/gwf/gwv/hw//jx//kyv/mzf/nz//s2v/v3//v4P/w4f/w4v/x4//y5v/06v/27f/48f/59P/69v/79//7+P/8+f/8+v/9+//+/f/+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAAAgACAAAAf+gFJSAAEAhoeIiYqJglKFi5CRhwGDkpaSj5eak5oGDJuaFio6SFFGMycQoIoJLlGvsK9IIpmgFECxua85CqsJQ7lAP0S5MKsvuUuGFLofmxi6ygDMuUe9ly3Ry7pRHpo8uk3buimXBk2vNQnrCYYG7AmlUTmXD7AytYpLr0OXAfIyDAg0YCjAQAPyYmjKoW0atxOaVDSklguDJgnoYkmjCAtIO00lko2LVQGUAXCxePTwoUvDqgY1uIVzCSpACHm5hoyQ16TDKgAOQLDYUaQGig7tMOyL0oTmT0hKX/V8GgkDT1VUF0UtkbUqCUX5uiIKKxaRo7KJKAkihLaQoEAAOw==')",function(){for(i in FOOPLOT_INSTANCES)if(this.parentNode===FOOPLOT_INSTANCES[i].toolcontainer)var a=FOOPLOT_INSTANCES[i];a.zoom(2)},null,"Zoom In"),this.toolZoomOut=this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAPZLAP9/AP+AAP+AAf+AAv+BBP+DB/+GDf+GDv+HD/+KFv+LF/+LGP+MGv+OHf+PH/+QIv+UKf+UKv+YMv+bN/+gQf+iRf+jSP+kSf+nUP+oUv+pU/+pVP+qVv+rWP+sWf+wYf+xY/+zZ/+2bv+5c/+8ev+9fP+/gP/Bg//Chv/Eiv/Gjf/HkP/Jk//Ll//Mmf/Onv/Qof/Ysv/bt//cuv/evf/evv/gwf/gwv/hw//jx//kyv/mzf/v4P/w4f/w4v/x4//06v/27f/48f/59P/69v/79//7+P/8+v/9+//+/f/+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAgACAAAAfXgExMAAEAhoeIiYqJgkyFi5CRhwGDkpaSj5eak5oFDJuaFSw5Q0tBMygQoIoIL0uvsK9DI5mgEzyxua84CqsIP7rBMaswwcYfmxfGxkILmi7Lxh2aO9HBKpcFR7khCt7exbE2lw+604gtuT+XAaWx54fpsTKaOda6KJoq97kXmhL8YPFAsKlEwCUUQBWoxi/DqgY1+B1xCCqACHfqSLg7wmEVgAcfWugAUiMFB4IXjLya6FFSypUdW0K6sFGVzEUvTdyMdKHEzlW1fipyJDQRJUFFDRUSFAgAOw==')",function(){for(i in FOOPLOT_INSTANCES)if(this.parentNode===FOOPLOT_INSTANCES[i].toolcontainer)var a=FOOPLOT_INSTANCES[i];a.zoom(.5)},null,"Zoom Out"),this.addToolSeparator(),this.toolMove=this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAPY/AP9/AP+AAP+AAf+AAv+BBP+CBf+FDP+GDv+HD/+IEf+IEv+JE/+KFv+MGv+NG/+OHf+PH/+PIP+QIf+QIv+TKP+UKf+bOP+dPP+fQP+jSP+oUv+pVP+rWP+uXf+xY/+1a/+3cP+6dv+7d/+7eP+8ef+9e/++ff/Dh//DiP/Hj//Ikv/Klf/Ll//LmP/NnP/Pn//du//fv//hw//ixv/kyv/lzP/mzv/o0f/o0v/p1P/t2//u3v/v4P/w4f/+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEAALAAAAAAgACAAAAf0gEBAAAEAhoeIiYqHhYJAhYuRkoyDk4mQloaYlhw5D5mEoAAjPz87E6KWBC6lpaepkQgwra09qLCJDhYWIKUiGhsXuJEZpRbDk8U/x8jExs0TwonKzIgUm4sRPBuK1IogLJMPOz8a3c+JvSiRDjq+u/C8pR7xuymlJIoBOLT9/v+lPijqALDgPxmLTPjKwLAhqR8gGjZsUYoGgkisMJxb9u2HjQWRAhCAoXEaOkQgcICchCDCxmqHMjBo5q3Zopo2TXLMaSgDCHClWIwYUSEngxv+VGAbpsAGrXU8DSGYgU/U0kUIYoCIqg/WI66UBIXi2QhIIAA7')",null,FOOPLOT_MODE_MOVE,"Move"),this.toolZoomBox=this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAPYAAP9/AP+AAP+AAf+AAv+BA/+BBP+CBf+DB/+GDf+GDv+HD/+KFv+LGP+MGv+OHf+PH/+QIv+TJ/+UKf+UKv+YMv+bN/+gQf+iRf+jSP+kSf+nT/+nUP+oUv+pU/+pVP+qVv+sWf+uXv+wYf+xY/+1a/+2bv+3b/+5c/+8ev+9fP+/gP/Bg//Chv/Eiv/Gjf/Hj//HkP/Jk//JlP/Ll//Mmf/Onv/Qof/Xr//Ysv/bt//cuv/evf/evv/gwf/gwv/hw//jx//kyv/mzf/r1//v4P/w4f/w4v/x4//06v/27f/48f/59P/69v/79//7+P/8+v/9+//9/P/+/f/+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFUALAAAAAAgACAAAAf+gFVVAAEAhoeIiYqHhYJVhYuRkoyDk5aTkJeajJoHDZuaFzFAS1RJOiwSoIoKNVSvsK9LJ5mgFUSxua8/C6sKR09LT03CS07Gx1Q4qzZUGoaQAdKHL1Qimxmvz4qZ1Uq9lzTahgfl5geG1VQfmkLjADe5JumvL5cHT+/xsfMA6j+XIMDatg9WP3VELgUo5cxQwVcHX+nQ5OPdjCEYMYagR2WFJnXbJIHUROGdSCpEFGxKQYVEhJcwY0ZoZgHUAXe6cnJY5WBHTl1Pdq4ywTAXERQMg64C8GDEjCBIdrT4oDKDk1dP2C2VZBWr0K2Lur5SBXYRhqsqykrCkELtqloObhU9ipsogCO60AAICgQAOw==')",null,FOOPLOT_MODE_ZOOMBOX,"Zoom Box"),this.zoomboxBox=document.createElement("div"),this.zoomboxBox.style.position="absolute",this.zoomboxBox.style.visibility="hidden",this.zoomboxBox.style.width="1px",this.zoomboxBox.style.height="1px",this.zoomboxBox.style.top="-1px",this.zoomboxBox.style.left="-1px",this.zoomboxBox.style.border="1px solid #ff8000",this.zoomboxBox.style.background="#ffa000",this.zoomboxBox.style.opacity=.5,this.zoomboxBox.style.filter="alpha(opacity=50)",this.zoomboxBox.style.zIndex=50,this.container.appendChild(this.zoomboxBox),this.tracePoint=document.createElement("div"),this.tracePoint.style.position="absolute",this.tracePoint.style.visibility="hidden",this.tracePoint.style.width="5px",this.tracePoint.style.height="5px",this.tracePoint.style.top="-1px",this.tracePoint.style.left="-1px",this.tracePoint.style.border="1px solid #ffffff",this.tracePoint.style.background="#ff8000",this.tracePoint.style.zIndex=50,this.container.appendChild(this.tracePoint),this.traceDisplay=document.createElement("div"),this.traceDisplayText=document.createTextNode(""),this.traceDisplay.style.position="absolute",this.traceDisplay.style.visibility="hidden",this.traceDisplay.style.height="20px",this.traceDisplay.style.padding="4px",this.traceDisplay.style.top="-1px",this.traceDisplay.style.left="-1px",this.traceDisplay.style.border="1px solid #a0a0a0",this.traceDisplay.style.background="#ffffff",this.traceDisplay.style.webkitBoxShadow="5px 5px 5px #808080",this.traceDisplay.style.MozBoxShadow="5px 5px 5px #808080",this.traceDisplay.style.OBoxShadow="5px 5px 5px #808080",this.traceDisplay.style.msBoxShadow="5px 5px 5px #808080",this.traceDisplay.style.boxShadow="5px 5px 5px #808080",this.traceDisplay.style.zIndex=50,this.traceDisplay.appendChild(this.traceDisplayText),this.container.appendChild(this.traceDisplay),this.intersectionPoint=document.createElement("div"),this.intersectionPoint.style.position="absolute",this.intersectionPoint.style.visibility="hidden",this.intersectionPoint.style.width="5px",this.intersectionPoint.style.height="5px",this.intersectionPoint.style.top="-1px",this.intersectionPoint.style.left="-1px",this.intersectionPoint.style.border="1px solid #ffffff",this.intersectionPoint.style.background="#ff8000",this.intersectionPoint.style.zIndex=50,this.container.appendChild(this.intersectionPoint),this.intersectionDisplay=document.createElement("div"),this.intersectionDisplayText=document.createTextNode(""),this.intersectionDisplay.style.position="absolute",this.intersectionDisplay.style.visibility="hidden",this.intersectionDisplay.style.height="20px",this.intersectionDisplay.style.padding="4px",this.intersectionDisplay.style.top="-1px",this.intersectionDisplay.style.left="-1px",this.intersectionDisplay.style.border="1px solid #a0a0a0",this.intersectionDisplay.style.background="#ffffff",this.intersectionDisplay.style.webkitBoxShadow="5px 5px 5px #808080",this.intersectionDisplay.style.MozBoxShadow="5px 5px 5px #808080",this.intersectionDisplay.style.OBoxShadow="5px 5px 5px #808080",this.intersectionDisplay.style.msBoxShadow="5px 5px 5px #808080",this.intersectionDisplay.style.boxShadow="5px 5px 5px #808080",this.intersectionDisplay.style.zIndex=50,this.intersectionDisplay.appendChild(this.intersectionDisplayText),this.container.appendChild(this.intersectionDisplay),this.selectMode(FOOPLOT_MODE_MOVE),this.canvas=!1,this.context=!1,this.vars={pi:3.141592653589793,e:2.718281828459045,s:0,t:0,x:0,theta:0},this.plots=[],this.plotlastid=0,this.width=!1,this.height=!1,this.xmin=-6.5,this.xmax=6.5,this.ymin=-4,this.ymax=4,this.xgrid="",this.ygrid="",this.xgridunits=null,this.ygridunits=null,this.showGrid=!0,this.showAxes=!0,this.showTicks=!0,this.showLabels=!0,this.gridColor="#D0D0D0",this.axesColor="#606060",this.labelsColor="#606060",this.backgroundColor="#FFFFFF",this.setSize=function(){this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this.recorder.width=this.width,this.recorder.height=this.height},this.canvas=document.createElement("canvas");try{FOOPLOT_MSIE&&G_vmlCanvasManager.initElement(this.canvas)}catch(a){}this.subcontainer.appendChild(this.canvas),this.setSize(),this.canvas.style.webkitBackfaceVisibility="hidden",this.canvas.style.webkitTransform="translate3d(0,0,0)",this.canvas.style.MozTransform="translate3d(0,0,0)",this.context=this.canvas.getContext("2d"),this.getRealGrid=function(){return parseFloat(this.xgrid)?realxgrid=this.xgrid:(orderfull=-.9+Math.log(this.xmax-this.xmin)/Math.log(10),order=Math.floor(orderfull),rem=orderfull-order,realxgrid=Math.pow(10,order),rem>.7?realxgrid*=5:rem>.3&&(realxgrid*=2)),parseFloat(this.ygrid)?realygrid=this.ygrid:(orderfull=-.9+Math.log(this.width/this.height*(this.ymax-this.ymin))/Math.log(10),order=Math.floor(orderfull),rem=orderfull-order,realygrid=Math.pow(10,order),rem>.7?realygrid*=5:rem>.3&&(realygrid*=2)),[realxgrid,realygrid]},this.drawGrid=function(){var a,b,c,d,e,f,g;if(g=this.getRealGrid(),e=g[0],f=g[1],(this.ymax-this.ymin)/f>this.height/2||(this.xmax-this.xmin)/e>this.width/2)this.context.fillRect(0,0,this.width,this.height);else{for(this.context.beginPath(),d=Math.ceil(this.ymin/f)*f;d<=this.ymax;d+=f)b=(1-(d-this.ymin)/(this.ymax-this.ymin))*this.height,this.context.moveTo(0,Math.floor(b)),this.context.lineTo(this.width,Math.floor(b));for(c=Math.ceil(this.xmin/e)*e;c<=this.xmax;c+=e)a=(c-this.xmin)/(this.xmax-this.xmin)*this.width,this.context.moveTo(Math.floor(a),0),this.context.lineTo(Math.floor(a),this.height);this.context.stroke()}},this.drawLabels=function(){var a,b,c,d,e,f;g=this.getRealGrid(),e=g[0],f=g[1];var h=Math.pow(10,2-Math.floor(Math.log(this.xmax-this.xmin)/Math.log(10))),i=Math.pow(10,2-Math.floor(Math.log(this.ymax-this.ymin)/Math.log(10)));if(this.context.font="10px Droid Sans,Trebuchet MS,Arial,Helvetica,sans-serif",a=(0-this.xmin)/(this.xmax-this.xmin)*this.width,this.context.textAlign="left",a<0&&(a=0),a>this.width-this.width/80-16&&(this.xmax>0?a-=20:a=this.width-this.width/100-18,this.context.textAlign="right"),(this.ymax-this.ymin)/f<this.height/6)for(d=Math.floor(this.ymin/f)*f;d<=this.ymax;d+=f)b=(this.ymax-d)/(this.ymax-this.ymin)*this.height,this.ygridunits===FOOPLOT_UNITS_PI?printy=this.tryToMakeFraction(d/this.vars.pi)+"π":this.ygridunits===FOOPLOT_UNITS_E?printy=this.tryToMakeFraction(d/this.vars.e)+"e":printy=parseFloat(Math.round(d*i)/i),b>8&&b<this.height-8&&this.context.fillText(printy,a+this.width/80,b+2.5);if(this.context.textAlign="center",b=this.ymax/(this.ymax-this.ymin)*this.height,b<0&&(b=0),b>this.height-16-this.width/80&&(this.ymin<0?b-=22:b=this.height-20-this.width/100),(this.xmax-this.xmin)/e<this.width/6)for(c=Math.floor(this.xmin/e)*e;c<=this.xmax;c+=e)a=(c-this.xmin)/(this.xmax-this.xmin)*this.width,this.xgridunits===FOOPLOT_UNITS_PI?printx=this.tryToMakeFraction(c/this.vars.pi)+"π":this.xgridunits===FOOPLOT_UNITS_E?printx=this.tryToMakeFraction(c/this.vars.e)+"e":printx=parseFloat(Math.round(c*h)/h),a>8&&a<this.width-8&&this.context.fillText(printx,a,b+this.width/80+8)},this.drawAxes=function(){var a,b,c,d,e,f;if(g=this.getRealGrid(),e=g[0],f=g[1],this.xmin<0&&this.xmax>0?a=(0-this.xmin)/(this.xmax-this.xmin)*this.width:this.xmin>=0?a=0:this.xmax<=0&&(a=this.width),this.context.beginPath(),this.context.moveTo(a,0),this.context.lineTo(a,this.height),this.context.stroke(),this.showTicks)if((this.ymax-this.ymin)/f>this.height/2)this.context.fillRect(a-this.width/100,0,this.width/50,this.height);else{for(this.context.beginPath(),d=Math.floor(this.ymin/f)*f;d<=this.ymax;d+=f)b=(this.ymax-d)/(this.ymax-this.ymin)*this.height,this.context.moveTo(a-this.width/100,b),this.context.lineTo(a+this.width/100,b);this.context.stroke()}if(this.ymin<0&&this.ymax>0?b=(1-(0-this.ymin)/(this.ymax-this.ymin))*this.height:this.ymin>=0?b=this.height:this.ymax<=0&&(b=0),this.context.beginPath(),this.context.moveTo(0,b),this.context.lineTo(this.width,b),this.context.stroke(),this.showTicks)if((this.xmax-this.xmin)/e>this.width/2)this.context.fillRect(0,b-this.width/100,this.width,this.width/50);else{for(this.context.beginPath(),c=Math.floor(this.xmin/e)*e;c<=this.xmax;c+=e)a=(c-this.xmin)/(this.xmax-this.xmin)*this.width,this.context.moveTo(a,b-this.width/100),this.context.lineTo(a,b+this.width/100);this.context.stroke()}},this.clear=function(){this.context!=this.recorder&&(this.canvas.width=this.canvas.width),this.context.clear&&this.context.clear(),this.context.fillStyle=this.backgroundColor,this.context.fillRect(0,0,this.width,this.height)},this.isMouseDown=0,this.dragInitX=0,this.dragInitY=0,this.dpx=0,this.dpy=0,this.container.onmousemove=function(a){null===a&&(a=window.event);for(i in FOOPLOT_INSTANCES)if(this===FOOPLOT_INSTANCES[i].container)var b=FOOPLOT_INSTANCES[i];if(a&&a.preventDefault&&a.preventDefault(),a&&"fooplot-tool"===(a.srcElement?a.srcElement:a.target).className)return null;if(b.zoomTimeout)return null;var c=b.container.offsetLeft,d=b.container.offsetTop;b.container.parentNode&&(c+=b.container.parentNode.offsetLeft,d+=b.container.parentNode.offsetTop);var e=(FOOPLOT_MSIE?document.body.scrollLeft+event.clientX:a.pageX)-c,f=(FOOPLOT_MSIE?document.body.scrollTop+event.clientY:a.pageY)-d;if(b.isMouseDown)switch(b.dpx=e-b.dragInitX,b.dpy=f-b.dragInitY,b.selectedMode){case FOOPLOT_MODE_MOVE:b.subcontainer.style.left=b.dpx+"px",b.subcontainer.style.top=b.dpy+"px";break;case FOOPLOT_MODE_ZOOMBOX:b.zoomboxBox.style.width=b.dpx+"px",b.zoomboxBox.style.height=b.dpy+"px";break;case FOOPLOT_MODE_TRACE:var g=e/b.width*(b.xmax-b.xmin)+b.xmin,h=Math.pow(10,2-Math.floor(Math.log(b.xmax-b.xmin)/Math.log(10))),g=parseFloat(Math.floor(g*h)/h),j=(1-f/b.height)*(b.ymax-b.ymin)+b.ymin;b.showTrace(g,j)}},this.container.onmouseover=function(a){null===a&&(a=window.event);for(i in FOOPLOT_INSTANCES)if(this===FOOPLOT_INSTANCES[i].container)var b=FOOPLOT_INSTANCES[i];if(a&&a.preventDefault&&a.preventDefault(),b.toolcontainer.style.visibility="visible",a&&"fooplot-tool"===(a.srcElement?a.srcElement:a.target).className)return null},this.container.onmouseout=function(a){null===a&&(a=window.event);for(i in FOOPLOT_INSTANCES)if(this===FOOPLOT_INSTANCES[i].container)var b=FOOPLOT_INSTANCES[i];return a&&a.preventDefault&&a.preventDefault(),b.toolcontainer.style.visibility="hidden",a&&"fooplot-tool"==(a.srcElement?a.srcElement:a.target).className?null:void this.onmouseup(a)},this.container.onmousedown=function(a){null===a&&(a=window.event);for(i in FOOPLOT_INSTANCES)if(this===FOOPLOT_INSTANCES[i].container)var b=FOOPLOT_INSTANCES[i];if(a&&a.preventDefault&&a.preventDefault(),a&&"fooplot-tool"==(a.srcElement?a.srcElement:a.target).className)return null;if(b.zoomTimeout)return null;var c=b.container.offsetLeft,d=b.container.offsetTop;b.container.parentNode&&(c+=b.container.parentNode.offsetLeft,d+=b.container.parentNode.offsetTop);var e=(FOOPLOT_MSIE?document.body.scrollLeft+event.clientX:a.pageX)-c,f=(FOOPLOT_MSIE?document.body.scrollTop+event.clientY:a.pageY)-d;switch(b.dragInitX=e,b.dragInitY=f,b.isMouseDown=!0,b.selectedMode){case FOOPLOT_MODE_ZOOMBOX:b.zoomboxBox.style.left=e+"px",b.zoomboxBox.style.top=f+"px",b.zoomboxBox.style.width="0px",b.zoomboxBox.style.height="0px",b.zoomboxBox.style.visibility="visible"}},this.container.onmouseup=function(a){null===a&&(a=window.event),a&&a.preventDefault&&a.preventDefault();for(i in FOOPLOT_INSTANCES)if(this===FOOPLOT_INSTANCES[i].container)var b=FOOPLOT_INSTANCES[i];var c=b.container.offsetLeft,d=b.container.offsetTop;if(b.container.parentNode&&(c+=b.container.parentNode.offsetLeft,d+=b.container.parentNode.offsetTop),(FOOPLOT_MSIE?document.body.scrollLeft+event.clientX:a.pageX)-c,(FOOPLOT_MSIE?document.body.scrollTop+event.clientY:a.pageY)-d,b.isMouseDown)switch(b.isMouseDown=!1,b.selectedMode){case FOOPLOT_MODE_MOVE:if(b.zoomTimeout)return null;var e=b.dpx/b.width*(b.xmax-b.xmin),f=b.dpy/b.height*(b.ymax-b.ymin);b.xmin-=e,b.xmax-=e,b.ymin+=f,b.ymax+=f,b.dpx=0,b.dpy=0,b.subcontainer.style.left="0px",b.subcontainer.style.top="0px",b.reDraw(),b.onWindowChange([b.xmin,b.xmax,b.ymin,b.ymax]);break;case FOOPLOT_MODE_ZOOMBOX:if(b.zoomboxBox.style.visibility="hidden",b.selectMode(FOOPLOT_MODE_MOVE),parseInt(b.zoomboxBox.style.width)>5&&parseInt(b.zoomboxBox.style.height)>5){var g=parseInt(b.zoomboxBox.style.left)/b.width*(b.xmax-b.xmin)+b.xmin,h=b.ymax-parseInt(b.zoomboxBox.style.top)/b.height*(b.ymax-b.ymin),j=(parseInt(b.zoomboxBox.style.left)+parseInt(b.zoomboxBox.style.width))/b.width*(b.xmax-b.xmin)+b.xmin,k=b.ymax-(parseInt(b.zoomboxBox.style.top)+parseInt(b.zoomboxBox.style.height))/b.height*(b.ymax-b.ymin);b.xmin=g,b.xmax=j,b.ymin=k,b.ymax=h,b.reDraw(),b.onWindowChange([b.xmin,b.xmax,b.ymin,b.ymax])}}},this.lastTouch=null,this.container.ontouchmove=function(a){a.preventDefault();for(i in FOOPLOT_INSTANCES)if(this===FOOPLOT_INSTANCES[i].container)var b=FOOPLOT_INSTANCES[i];if(a.touches.length>=1){var c=a.touches[0];b.lastTouch=c,this.mousemove(c)}else b.lastTouch=null},this.container.ontouchstart=function(a){a.preventDefault();for(i in FOOPLOT_INSTANCES)if(this===FOOPLOT_INSTANCES[i].container)var b=FOOPLOT_INSTANCES[i];if(a.touches.length>=1){var c=a.touches[0];b.lastTouch=c,this.mousedown(c)}else b.lastTouch=null},this.container.ontouchend=function(a){a.preventDefault();for(i in FOOPLOT_INSTANCES)if(this===FOOPLOT_INSTANCES[i].container)var b=FOOPLOT_INSTANCES[i];0==a.touches.length&&(this.mouseup(b.lastTouch),b.lastTouch=null)},this.drawPoints=function(a){if(a.length)for(i in a)2==a[i].length&&(px=(a[i][0]-this.xmin)/(this.xmax-this.xmin)*this.width,py=(this.ymax-a[i][1])/(this.ymax-this.ymin)*this.height,!isNaN(px)&&!isNaN(py)&&0<=px&&px<=this.width&&0<=py&&py<=this.height&&this.context.fillRect(px-2,py-2,5,5))},this.drawFunction=function(a){var b,c,d,e,f,g,h,i,j,k=!1,l=!1;this.context.beginPath();var m=FOOPLOT_MSIE?1:.25;for(this.context.moveTo(-10,this.height/2),b=0;b<this.width;b+=m)this.vars.x=b/this.width*(this.xmax-this.xmin)+this.xmin,d=a(this.vars),isNaN(d)?(l||(j>0&&i>0?this.context.lineTo(g,0):j<0&&i<0&&this.context.lineTo(g,this.height)),f=!1,k=!0):(c=(this.ymax-d)/(this.ymax-this.ymin)*this.height,f=c>=0&&c<=this.height,c>this.height+100&&(c=this.height+100),c<-100&&(c=-100),k=!1),m>.001&&f&&!e?(b-=m,m/=10):(l||k||!e&&!f?!l&&!k&&i*d<0&&i*d>Math.min(-10,this.ymin-this.ymax)?this.context.lineTo(b,c):this.context.moveTo(b,c):this.context.lineTo(b,c),f?m/=Math.abs(h-c):m=1,m>2?m=2:m<.001?m=.001:isNaN(m)&&(m=1),g=b,h=c,i=d,e=f,l=k);this.context.stroke()},this.drawPolar=function(a,b,c,d){var e,f,g,h,i,j,k;this.context.beginPath();var l=!1;for(this.vars.theta=b;this.vars.theta<=c;this.vars.theta+=d)i=a(this.vars),g=i*Math.cos(this.vars.theta),h=i*Math.sin(this.vars.theta),isNaN(h)||isNaN(g)?k=!1:(e=(g-this.xmin)/(this.xmax-this.xmin)*this.width,f=(this.ymax-h)/(this.ymax-this.ymin)*this.height,l||(l=!0,this.context.moveTo(e,f)),k=e>0&&e<this.width&&f>0&&f<this.height,j||k?this.context.lineTo(e,f):this.context.moveTo(e,f)),j=k;this.context.stroke()},this.drawParametric=function(a,b,c,d,e){var f,g,h,i,j,k,l=!1;for(this.context.beginPath(),this.vars.s=c;this.vars.s<=d;this.vars.s+=e)h=a(this.vars),i=b(this.vars),isNaN(i)||isNaN(h)?k=!1:(f=(h-this.xmin)/(this.xmax-this.xmin)*this.width,g=(this.ymax-i)/(this.ymax-this.ymin)*this.height,l||(l=!0,this.context.moveTo(f,g)),k=f>0&&f<this.width&&g>0&&g<this.height,j||k?this.context.lineTo(f,g):this.context.moveTo(f,g)),j=k;this.context.stroke()},this.findIntersection=function(a,b,c){var d,e,f,g,h=1e-10,i=0;if(null===a)return 0;for(null===b&&(b=function(){return 0}),this.vars.x=c,d=a(this.vars),e=b(this.vars),f=d-e;i<100;)i++,d=a(this.vars),e=b(this.vars),f=d-e,this.vars.x+=h,d=a(this.vars),e=b(this.vars),g=d-e,f-g!=0&&(this.vars.x+=f*h/(f-g));return d=a(this.vars),e=b(this.vars),f=d-e,isNaN(this.vars.x)?null:Math.abs(f)>1e-9?null:parseFloat(this.vars.x.toFixed(9))},this.showTrace=function(a,b){var c,d,e=1e10,f=null,g=null;this.vars.x=a;for(c in this.plots)this.plots[c].type===FOOPLOT_TYPE_FUNCTION&&(d=this.plots[c].jeq(this.vars),Math.abs(d-b)<e&&(e=Math.abs(d-b),f=c,g=d));return null===f?null:(px=(a-this.xmin)/(this.xmax-this.xmin)*this.width,py=(this.ymax-g)/(this.ymax-this.ymin)*this.height,this.tracePoint.style.visibility="",this.tracePoint.style.left=px-3+"px",this.tracePoint.style.top=py-3+"px",this.traceDisplay.style.visibility="",this.traceDisplay.style.left=px+"px",this.traceDisplay.style.top=py+8-(py>this.height/2?48:0)+"px",void(this.traceDisplayText.nodeValue="("+parseFloat(a.toFixed(9))+","+parseFloat(g.toFixed(9))+")"))},this.showIntersection=function(a){this.vars.x=a;var b,c,d,e,f=1e10,g=null;this.plotstmp=this.plots.slice(0),this.plotstmp.unshift({type:FOOPLOT_TYPE_FUNCTION,jeq:function(){return 0}});for(b in this.plotstmp)if(this.plotstmp[b].type===FOOPLOT_TYPE_FUNCTION)for(c in this.plotstmp)b!=c&&this.plotstmp[c].type===FOOPLOT_TYPE_FUNCTION&&(d=this.plotstmp[b].jeq(this.vars),e=this.plotstmp[c].jeq(this.vars),Math.abs(d-e)<f&&(f=Math.abs(d-e),g=[b,c]));return null===g?null:(xroot=this.findIntersection(this.plotstmp[g[0]].jeq,this.plotstmp[g[1]].jeq,a),y=this.plotstmp[g[0]].jeq(this.vars),y=parseFloat(y.toFixed(9)),px=(xroot-this.xmin)/(this.xmax-this.xmin)*this.width,py=(this.ymax-y)/(this.ymax-this.ymin)*this.height,void(null!=xroot&&(this.intersectionPoint.style.visibility="",this.intersectionPoint.style.left=px-3+"px",this.intersectionPoint.style.top=py-3+"px",this.intersectionDisplay.style.visibility="",this.intersectionDisplay.style.left=px+"px",this.intersectionDisplay.style.top=py+8-(py>this.height/2?48:0)+"px",this.intersectionDisplayText.nodeValue="("+xroot+","+y+")")))},this.tryToMakeFraction=function(a){for(var b,c,c=1;c<16;c++)if(b=(a*c).toFixed(9),b.indexOf(".000000000")!=-1)return parseFloat(b)+(1===c?"":"/"+c);return parseFloat(a.toFixed(9)).toString()},this.parseEquationError="",this.parseEquationHasElement=function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1},this.parseEquationFixPowers=function(a){if(null===a)return this.parseEquationError?null:this.parseEquationError="syntax error",null;for(b=0;b<a.length;b++)if(this.parseEquationIsArray(a[b])&&(a[b]=this.parseEquationFixPowers(a[b]),null===a[b]))return this.parseEquationError?null:this.parseEquationError="syntax error",null;for(var b=0;b<a.length;b++)if("^"===a[b]){if(null===a[b-1]||null===a[b+1])return this.parseEquationError="^ requires two arguments, for example x^2 or (x+1)^(x+2).",null;a.splice(b-1,3,new Array("Math.pow",new Array("(",a[b-1],",",a[b+1],")"))),b-=2}return a},this.parseEquationFixFunctions=function(a){if(null===a)return this.parseEquationError?null:this.parseEquationError="syntax error",null;for(b=0;b<a.length;b++)if(this.parseEquationIsArray(a[b])&&(a[b]=this.parseEquationFixFunctions(a[b]),null===a[b]))return this.parseEquationError?null:this.parseEquationError="syntax error",null;for(var b=0;b<a.length;b++)if(!this.parseEquationIsArray(a[b])&&void 0!=FOOPLOT_MATH[a[b]]){if(null===a[b+1])return this.parseEquationEror="function "+a[b]+" requires an argument.",null;a[b]="FOOPLOT_MATH."+a[b].toLowerCase(),a.splice(b,2,new Array("(",a[b],a[b+1],")")),b--}return a},this.parseEquationIsArray=function(a){return null==a?0:a.constructor.toString().indexOf("Array")!==-1},this.parseEquationJoinArray=function(a){for(var b="",c=0;c<a.length;c++)b+=this.parseEquationIsArray(a[c])?this.parseEquationJoinArray(a[c]):a[c];return b},this.parseEquation=function(eq,vars){var jeq=null,tokens,e,i,pstart=-1,pend;for(vars||(vars=this.vars),jeq_error="",e=eq.replace(/ /g,""),e=e.replace(/([0-9])([a-df-z]|[a-z][a-z]|\()/gi,"$1*$2"),e=e.replace(/(\))([0-9a-df-z]|[a-z][a-z]|\()/gi,"$1*$2"),e=e.replace(/([a-z0-9\.])([^a-z0-9\.])/gi,"$1 $2"),e=e.replace(/([^a-z0-9\.])([a-z0-9\.])/gi,"$1 $2"),e=e.replace(/(\-|\)|\()/g," $1 "),tokens=e.split(/ +/),i=0;i<tokens.length;i++)if(tokens[i]=tokens[i].replace(/ /g,""),tokens[i]=tokens[i].replace(/_/g,"."),""===tokens[i])tokens.splice(i,1),i--;else if(tokens[i].match(/^[a-z][a-z0-9]*$/i)&&void 0!=vars[tokens[i]])tokens[i]="vars."+tokens[i];else if(tokens[i].length>0&&tokens[i].match(/^[a-z][a-z0-9]*$/i)&&void 0===FOOPLOT_MATH[tokens[i]])return this.parseEquationError="invalid variable or function: "+tokens[i],null;for(;this.parseEquationHasElement(tokens,"(")||this.parseEquationHasElement(tokens,")");){for(pstart=-1,i=0;i<tokens.length;i++){if("("===tokens[i]&&(pstart=i),")"===tokens[i]&&pstart==-1)return this.parseEquationError="unmatched right parenthesis )",null;")"===tokens[i]&&pstart!=-1&&(tokens.splice(pstart,i-pstart+1,tokens.slice(pstart,i+1)),i=-1,pstart=-1)}if(pstart!=-1)return this.parseEquationError="unmatched left parenthesis (",null}return tokens=this.parseEquationFixFunctions(tokens),null===tokens?null:(tokens=this.parseEquationFixPowers(tokens),null===tokens?null:(eval("jeq=function(vars) { return "+this.parseEquationJoinArray(tokens)+"; }"),makeTone.mostRecentSring=this.parseEquationJoinArray(tokens),jeq))},this.parseConst=function(a){var b={pi:this.vars.pi,e:this.vars.e},c=this.parseEquation(a,b);return c?parseFloat(c(b)):(alert(this.parseEquationError),0)},this.reDraw=function(){this.hideIntersection(),this.hideTrace(),this.clear(),this.showGrid&&(this.context.strokeStyle=this.gridColor,this.context.fillStyle=this.gridColor,this.drawGrid()),this.showAxes&&(this.context.strokeStyle=this.axesColor,this.context.fillStyle=this.axesColor,this.drawAxes()),this.showLabels&&(this.context.fillStyle=this.labelsColor,this.drawLabels());for(var a in this.plots)switch(this.context.strokeStyle="#000000",
this.plots[a].type){case FOOPLOT_TYPE_FUNCTION:this.context.strokeStyle=this.plots[a].options.color,this.drawFunction(this.plots[a].jeq);break;case FOOPLOT_TYPE_POLAR:this.context.strokeStyle=this.plots[a].options.color,this.drawPolar(this.plots[a].jeq,this.plots[a].options.thetamin,this.plots[a].options.thetamax,this.plots[a].options.thetastep);break;case FOOPLOT_TYPE_PARAMETRIC:this.context.strokeStyle=this.plots[a].options.color,this.drawParametric(this.plots[a].jeqx,this.plots[a].jeqy,this.plots[a].options.smin,this.plots[a].options.smax,this.plots[a].options.sstep);break;case FOOPLOT_TYPE_POINTS:this.context.fillStyle=this.plots[a].options.color,this.drawPoints(this.plots[a].eq)}FOOPLOT_MSIE&&(this.context.beginPath(),this.context.moveTo(0,-1),this.context.lineTo(-1,-1),this.context.stroke())},this.addPlot=function(a,b,c){switch(b||(b=FOOPLOT_TYPE_FUNCTION),c||(c={}),c.color||(c.color="#000000"),c.width||(c.width=1),b){case FOOPLOT_TYPE_FUNCTION:var d=this.parseEquation(a);if(!d)return alert(this.parseEquationError),null;this.plots.push({id:this.plotlastid++,type:b,eq:a,jeq:d,options:c});break;case FOOPLOT_TYPE_POLAR:var d=this.parseEquation(a);if(!d)return alert(this.parseEquationError),null;c.thetamin=c.thetamin?this.parseConst(c.thetamin):0,c.thetamax=c.thetamax?this.parseConst(c.thetamax):2*this.vars.pi,c.thetastep=c.thetastep?this.parseConst(c.thetastep):.01,c.thetastep<=0&&(c.thetastep=.01),this.plots.push({id:this.plotlastid++,type:b,eq:a,jeq:d,options:c});break;case FOOPLOT_TYPE_PARAMETRIC:var e=this.parseEquation(a[0]);if(!e)return alert(this.parseEquationError),null;var f=this.parseEquation(a[1]);if(!f)return alert(this.parseEquationError),null;c.smin=c.smin?this.parseConst(c.smin):0,c.smax=c.smax?this.parseConst(c.smax):10,c.sstep=c.sstep?this.parseConst(c.sstep):.01,this.plots.push({id:this.plotlastid++,type:b,eq:a,jeqx:e,jeqy:f,options:c});break;case FOOPLOT_TYPE_POINTS:if(null===a.length)return null;this.plots.push({id:this.plotlastid++,type:b,eq:a,options:c});break;default:alert("Error: invalid plot type")}return this.plots.size},this.deletePlot=function(a){},this.deleteAllPlots=function(){this.plots=[]},this.getGrid=function(){return[this.xgrid,this.ygrid]},this.setGrid=function(a){a[0]=a[0].replace(" ",""),a[0]?(a[0]=this.parseConst(a[0]),a[0]<=0&&(a[0]=1),this.xgrid=a[0],null!==(720*a[0]/this.vars.pi).toFixed(6).match(/0000$/)?this.xgridunits=FOOPLOT_UNITS_PI:null!==(720*a[0]/this.vars.e).toFixed(6).match(/0000$/)?this.xgridunits=FOOPLOT_UNITS_E:this.xgridunits=null):(this.xgrid=null,this.xgridunits=null),a[1]=a[1].replace(" ",""),a[1]?(a[1]=this.parseConst(a[1]),a[1]<=0&&(a[1]=1),this.ygrid=a[1],null!==(720*a[1]/this.vars.pi).toFixed(6).match(/0000$/)?this.ygridunits=FOOPLOT_UNITS_PI:null!==(720*a[1]/this.vars.e).toFixed(6).match(/0000$/)?this.ygridunits=FOOPLOT_UNITS_E:this.ygridunits=null):(this.ygrid=null,this.ygridunits=null)},this.getWindow=function(){return[this.xmin,this.xmax,this.ymin,this.ymax]},this.setWindow=function(a){a[0]=this.parseConst(a[0]),a[1]=this.parseConst(a[1]),a[2]=this.parseConst(a[2]),a[3]=this.parseConst(a[3]),a[1]>a[0]&&a[3]>a[2]&&(this.xmin=a[0],this.xmax=a[1],this.ymin=a[2],this.ymax=a[3])},this.setBackgroundColor=function(a){this.backgroundColor=a,this.container.style.background=a,this.subcontainer.style.background=a},this.setLabelsColor=function(a){this.labelsColor=a},this.setAxesColor=function(a){this.axesColor=a},this.setGridColor=function(a){this.gridColor=a},this.setShowAxes=function(a){this.showAxes=a},this.setShowTicks=function(a){this.showTicks=a},this.setShowLabels=function(a){this.showLabels=a},this.setShowGrid=function(a){this.showGrid=a},this.getSVG=function(){return this.context=this.recorder,this.reDraw(),this.context=this.canvas.getContext("2d"),this.recorder.getSVG()},this.onWindowChange=function(a){}}var FOOPLOT_TYPE_FUNCTION=0,FOOPLOT_TYPE_POLAR=1,FOOPLOT_TYPE_PARAMETRIC=2,FOOPLOT_TYPE_POINTS=3,FOOPLOT_MODE_MOVE=1,FOOPLOT_MODE_ZOOMBOX=2,FOOPLOT_MODE_INTERSECTION=3,FOOPLOT_MODE_TRACE=4,FOOPLOT_UNITS_PI=1,FOOPLOT_UNITS_E=2,FOOPLOT_INSTANCES=[],FOOPLOT_MATH={};FOOPLOT_MATH.sin=Math.sin,FOOPLOT_MATH.cos=Math.cos,FOOPLOT_MATH.tan=Math.tan,FOOPLOT_MATH.asin=Math.asin,FOOPLOT_MATH.acos=Math.acos,FOOPLOT_MATH.atan=Math.atan,FOOPLOT_MATH.abs=Math.abs,FOOPLOT_MATH.floor=Math.floor,FOOPLOT_MATH.ceil=Math.ceil,FOOPLOT_MATH.exp=Math.exp,FOOPLOT_MATH.sqrt=Math.sqrt,FOOPLOT_MATH.max=Math.max,FOOPLOT_MATH.min=Math.min,FOOPLOT_MATH.sec=function(a){return 1/Math.cos(a)},FOOPLOT_MATH.csc=function(a){return 1/Math.sin(a)},FOOPLOT_MATH.cot=function(a){return 1/Math.tan(a)},FOOPLOT_MATH.asec=function(a){return Math.acos(1/a)},FOOPLOT_MATH.acsc=function(a){return Math.asin(1/a)},FOOPLOT_MATH.acot=function(a){return Math.atan(1/a)},FOOPLOT_MATH.ln=function(a){return Math.log(a)},FOOPLOT_MATH.log=function(a){return Math.log(a)/Math.log(10)},FOOPLOT_MATH.sinh=function(a){return(Math.exp(a)-Math.exp(-a))/2},FOOPLOT_MATH.cosh=function(a){return(Math.exp(a)+Math.exp(-a))/2},FOOPLOT_MATH.tanh=function(a){return(Math.exp(a)-Math.exp(-a))/(Math.exp(a)+Math.exp(-a))},FOOPLOT_MATH.asinh=function(a){return Math.log(a+Math.sqrt(a*a+1))},FOOPLOT_MATH.acosh=function(a){return Math.log(a+Math.sqrt(a*a-1))},FOOPLOT_MATH.atanh=function(a){return.5*Math.log((1+a)/(1-a))},FOOPLOT_MATH.sech=function(a){return 2/(Math.exp(a)+Math.exp(-a))},FOOPLOT_MATH.csch=function(a){return 2/(Math.exp(a)-Math.exp(-a))},FOOPLOT_MATH.coth=function(a){return(Math.exp(a)+Math.exp(-a))/(Math.exp(a)-Math.exp(-a))},FOOPLOT_MATH.asech=function(a){return Math.log(1/a+Math.sqrt(1/a/a-1))},FOOPLOT_MATH.acsch=function(a){return Math.log(1/a+Math.sqrt(1/a/a+1))},FOOPLOT_MATH.acoth=function(a){return.5*Math.log((1+a)/(1-a))},FOOPLOT_MATH.u=function(a){return a>=0};var FOOPLOT_MSIE=navigator.userAgent.toLowerCase().indexOf("msie")!=-1,FOOPLOT_TRANSITIONS=function(){var a=document.body||document.documentElement,b=a.style,c="transition";if("string"==typeof b[c])return!0;v=["Moz","Webkit","Khtml","O","ms"],c=c.charAt(0).toUpperCase()+c.substr(1);for(var d=0;d<v.length;d++)if("string"==typeof b[v[d]+c])return!0;return!1}();