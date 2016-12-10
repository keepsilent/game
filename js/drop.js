/**
 * 拖动元素自加加载新的数据
 *
 * @author keepsilent
 * @version 1.0.0
 */
;(function($){
    $.fn.drop = function(options){
        var defaults = {
            _this: this,
            offsetX: 12,
            offsexY: 23
        };
        var options = $.extend(defaults, options);
        var tocher = {
            status:true,
            touchMove: false,
            width: $(window).width(),
            height: $(window).height(),
            startPostion: {}, //开始触发坐标
            endPostion: {}, //结束触发坐标
            start:function(event) {
                tocher.startPostion = { //取第一个touch的坐标值
                    x: event.touches[0].pageX,
                    y: event.touches[0].pageY,
                };
                tocher.postition(tocher.startPostion.x,tocher.startPostion.y);
            },
            move:function(event) {
                if (event.touches.length > 1 || event.scale && event.scale !== 1) { //多点触摸,当屏幕有多个touch或者页面被缩放过，就不执行move操作
                    //return false;
                }
                tocher.endPostion = {
                    x:event.touches[0].pageX,
                    y:event.touches[0].pageY,
                };

                tocher.postition(tocher.endPostion.x,tocher.endPostion.y);
            },
            end:function(event) {
                tocher.postition(tocher.endPostion.x,tocher.endPostion.y);
            },
            postition:function(x, y) {
                if(x < options.offsetX || x > tocher.width - options.offsetX || y < options.offsexY || y > tocher.height - options.offsexY) {
                    return false;
                }

                ourPlan.style.left = x - selfplan.plansizeX / 2 + "px";
                ourPlan.style.top = y - selfplan.plansizeY / 2 + "px";
            }
        };
        var operate = {
            init: function() {
                options._this.on('touchstart',function(e){
                    if(!tocher.status) {
                        return false;
                    }
                    tocher.start(e);
                });

                options._this.on('touchmove',function(e){
                    if(!tocher.status) {
                        return false;
                    }
                    tocher.move(e);
                });

                options._this.on('touchend',function(e){
                    if(!tocher.status) {
                        return false;
                    }
                    tocher.end(e);
                });
            }
        };
        operate.init();
    };
})(window.Zepto || window.jQuery);
