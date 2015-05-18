function setDragAble(divid)
{
    var obj=null;
    var divTop=null;//顶端div条
    var divRight=null;//右端div条
    var divBottom=null;//底端div条
    var divCorner=null;//角落div条
    var mouseStart={};//鼠标点击的的起始位置
    var divStart={};//div的起始位置
    var rightStart={};//右侧div起始位置
    var bottomStart={};//底端div起始位置
    var divContainer=document.getElementById("container");//图片容器
    if(typeof divid =="string")//添加工具条div
    {

        obj=document.getElementById(divid);
        divTop=document.createElement("div");
        divTop.id='top';
        obj.appendChild(divTop);
        divRight=document.createElement("div");
        divRight.id='right';
        obj.appendChild(divRight);
        divBottom=document.createElement("div");
        divBottom.id='bottom';
        obj.appendChild(divBottom);
        divCorner=document.createElement("div");
        divCorner.id='corner';
        obj.appendChild(divCorner);

    }
    //改变宽度
    divRight.onmousedown=function(e)
    {
        var e = e||event;
        mouseStart.x= e.clientX;
        mouseStart.y= e.clientY;
        rightStart.x=divRight.offsetLeft;
        if(divRight.setCapture)//ie
        {
            divRight.onmousemove=dragRight;
            divRight.onmouseup=stopDragRight;
            divRight.setCapture();
        }else
        {
            document.addEventListener("mousemove",dragRight,true);
            document.addEventListener("mouseup",stopDragRight,true);
        }
    }
    function dragRight(e)
    {
        var e=e||event;
        var l= e.clientX-mouseStart.x+rightStart.x;
        var w=l+divCorner.offsetWidth;
        if(w<divCorner.offsetWidth)//缩小
        {
            w=divCorner.offsetWidth;
        }else if(w>document.documentElement.clientWidth-divContainer.offsetWidth)//变大
        {
            w=document.documentElement.clientWidth-divContainer.offsetWidth-2
        }
        divContainer.style.width=w+"px";
    }
    function stopDragRight()
    {
        if(divRight.releaseCapture)
        {
            divRight.onmousemove=null;
            divRight.onmouseup=null;
            divRight.releaseCapture();
        }else
        {
            document.removeEventListener("mousemove",dragRight,true);
            document.removeEventListener("mouseup",stopDragRight,true);
        }
    }
    //改变高度
    divBottom.onmousedown=function(e)
    {
        var e=e||event;
        mouseStart.x= e.clientX;
        mouseStart.y= e.clientY;
        bottomStart.y=divBottom.offsetTop;
        if(divBottom.setCapture)
        {
            divBottom.onmousemove=dragBottom;
            divBottom.onmouseup=stopDragBottom;
            divBottom.setCapture();
        }else
        {
            document.addEventListener("mousemove",dragBottom,true);
            document.addEventListener("mouseup",stopDragBottom,true);
        }
    }
    function dragBottom(e)
    {
        var e=e||event;
        var t= e.clientY-mouseStart.y+bottomStart.y;
        var h=t+divCorner.offsetHeight;
        if(h<divCorner.offsetHeight)//缩小
        {
            h=divCorner.offsetHeight;
        }else if(h>document.documentElement.clientHeight-divContainer.offsetTop)//变大
        {
            h=document.documentElement.clientHeight-divContainer.offsetTop-2;
        }
        divContainer.style.height=h+"px";
    }
    function stopDragBottom()
    {
        if(divBottom.releaseCapture)
        {
            divBottom.onmousemove=null;
            divBottom.onmouseup=null;
            divBottom.releaseCapture();
        }else
        {
            document.removeEventListener("mousemove",dragBottom,true);
            document.removeEventListener("mouseup",stopDragBottom,true);
        }
    }

    //改变宽度和高度
    divCorner.onmousedown=function(e)

    {
        var e=e||event;
        mouseStart.x=e.clientX;
        mouseStart.y=e.clientY;
        divStart.x=divCorner.offsetLeft;
        divStart.y=divCorner.offsetTop;
        if(divCorner.setCapture)
        {
            divCorner.onmousemove=doDrag;
            divCorner.onmouseup=stopDrag;
            divCorner.setCapture();
        }else
        {
            document.addEventListener("mousemove",dragCorner,true);
            document.addEventListener("mouseup",stopDragCorner,true);
        }
    };

    function dragCorner(e)

    {
        var e=e||event;
        var l=e.clientX-mouseStart.x+divStart.x;
        var t=e.clientY-mouseStart.y+divStart.y;
        var w=l+divCorner.offsetWidth;
        var h=t+divCorner.offsetHeight;
        if(w<divCorner.offsetWidth)
        {
            w=divCorner.offsetWidth;
        }else if(w>document.documentElement.clientWidth-divContainer.offsetLeft)
        {
            w=document.documentElement.clientWidth-divContainer.offsetLeft-2;
        }
        if(h<divCorner.offsetHeight)
        {
            h=divCorner.offsetHeight;
        }
        else if(h>document.documentElement.clientHeight-divContainer.offsetTop)
        {
            h=document.documentElement.clientHeight-divContainer.offsetTop-2;
        }
        divContainer.style.width=w+"px";
        divContainer.style.height=h+"px";

    };

    function stopDragCorner()
    {
        if(divCorner.releaseCapture)
        {
            divCorner.onmousemove=null;
            divCorner.onmouseup=null;
            divCorner.releaseCapture();
        }else
        {
            document.removeEventListener("mousemove",dragCorner,true);
            document.removeEventListener("mouseup",stopDragCorner,true);
        }
    };
    //平移
    divTop.onmousedown=function(e)
    {
        var e=e||event;
        mouseStart.x= e.clientX;
        mouseStart.y= e.clientY;
        divStart.x=divContainer.offsetLeft;
        divStart.y=divContainer.offsetTop;
        if(divTop.setCapture)
        {
            divTop.onmousemove=pan;
            divTop.onmouseup=stopPan;
            divTop.setCapture();
        }else
        {
            document.addEventListener("mousemove",pan,true);
            document.addEventListener("mouseup",stopPan,true);
        }
    }
    function pan(e)
    {
        var e= e||event;
        var l= e.clientX-mouseStart.x+divStart.x;
        var t= e.clientY-mouseStart.y+divStart.y;
        if(l<0)
        {
            l=0;
        }else if(l>document.documentElement.clientWidth-divContainer.offsetWidth)
        {
            l=document.documentElement.clientWidth-divContainer.offsetWidth;
        }
        if(t<0)
        {
            t=0;
        }else if(t>document.documentElement.clientHeight-divContainer.offsetHeight)
        {
            l=document.documentElement.clientHeight-divContainer.offsetHeight;
        }
        divContainer.style.left=l+"px";
        divContainer.style.top=t+"px";
    }
    function stopPan()
    {
        if(divTop.releaseCapture)
        {
            divTop.onmousemove=null;
            divTop.onmouseup=null;
            divTop.releaseCapture();
        }else
        {

            document.removeEventListener("mousemove",pan,true);
            document.removeEventListener("mouseup",stopPan,true);
        }
    }

}