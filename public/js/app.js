/**
 * 游戏配置
 *
 * @author keepsilent
 * @version 1.0.0
 */
var config = (function() {
    var width = $(window).width();
    var height = $(window).height();

    var share = function(status) {
        if(status == 1) {
            $('#share-box').show();
        } else {
            $('#share-box').hide();
        }
    }

    return {
        width:width,
        height:height,
        share:share
    }
})();


/**
 * 游戏规则
 *
 * @author keepsilent
 * @version 1.0.0
 */
var rule = (function() {
    var id = '#rule-box';
    var wrap = '#rule-box-wrap';
    var box = '#rule-box-inner';

    /**
     * 规则初始化
     * @method init
     */
    var init = function() {
        var boxHeight = $(box).height();
        if(boxHeight > config.height * 0.9) {
            $(box).css('height',config.height * 0.9);
            $(wrap).css('top',(config.height - config.height * 0.9) / 2);
        } else {
            $(wrap).css('top',(config.height - boxHeight) / 2);
        }
    }

    /**
     * 显示规则提示
     * @param stauts
     */
    var show = function(stauts) {
        if(stauts == 1) {
            $(id).show();
            init();
        } else {
            $(id).hide();
        }
    }

    return {
        show:show
    }
})();