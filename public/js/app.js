/**
 * 游戏配置
 *
 * @author keepsilent
 * @version 1.0.0
 */
var config = (function() {
    var width = $(window).width();
    var height = $(window).height();
    var bodyscrollTop = 0;

    /**
     * 显示分享引导
     * @param status
     */
    var share = function(status) {
        if(status == 1) {
            $('#share-box').show();
        } else {
            $('#share-box').hide();
        }
    }

    /**
     * 防止弹出层的滚动穿透到底层
     * @method base.preventPenetration
     */
    var preventPenetration = function(){
        var page = $('#page-mark').val();
        if(getUserAgent()){      //ios
            $('.'+page+'-wrap').css('overflow','hidden');
            return false;
        }
        config.bodyscrollTop = $(window).scrollTop();
        $('html,body').addClass('penetration-in');
    }

    /**
     * 恢复底层滚动，与base.preventPenetration配合使用
     * @method base.recoverPenetration
     */
    var recoverPenetration = function(){
        if(getUserAgent()){      //ios
            $('.'+page+'-wrap').css('overflow','');
            return false;
        }
        $('html,body').removeClass('penetration-in');
        $(window).scrollTop(config.bodyscrollTop);
        config.bodyscrollTop = 0;
    }


    /**
     * 获得用户代理
     * @method config.getUserAgent
     */
    var getUserAgent = function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        var userAgent =  { //移动终端浏览器版本信息
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1 //是否iPad
        };

        if(userAgent.iPhone || userAgent.iPad || userAgent.ios) {
            return true;
        }

        return false;
    }

    return {
        width:width
        ,height:height
        ,share:share
        ,bodyscrollTop:bodyscrollTop
        ,preventPenetration:preventPenetration
        ,recoverPenetration:recoverPenetration
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
        var page = $('#page-mark').val();
        if(stauts == 1) {
            $(id).show();
            init();
            config.preventPenetration();
            if(page == 'index') {
                game.bodyScroll = 1;
            }
        } else {
            $(id).hide();
            config.recoverPenetration();
            if(page == 'index') {
                game.bodyScroll = 0;
            }
        }
    }

    return {
        show:show
    }
})();

/**
 * 提示框
 * 生成单选框 和 复选框
 *
 * @author keepsilent
 * @version 1.0.0
 */
var tipsBox = (function(){

    var id = '#tips-box';

    /**
     * 单选框
     * @param {String} tips 提示文字
     * @param {String} sure 按钮提示
     * @param {String} url 跳转链接
     */
    var alert = function(tips, sure, url) {
        var sure = sure || '知道了';
        var url = url || 'javascript:tipsBox.hide()';

        var html = '<div class="alert-wrap"><h3>'+tips+'</h3><p><a href="'+url+'" title="'+sure+'">'+sure+'</a></p></div>';
        $(id).html(html);
        $(id).show();
        tipsBox.center(id + ' > div.alert-wrap');
    }

    /**
     * 复选框
     * @param {String} tips 提示文字
     * @param {String} name 函数名
     * @param {String} param 函数参数
     * @param {String} sure 确认按钮
     * @param {String} cancel 取消按钮
     */
    var confirm = function(tips, name, param, sure, cancel) {
        var sure  =  sure || '确定';
        var cancel = cancel || '取消';
        var html = '<div class="confirm-wrap"><h3 >'+tips+'</h3><table border-collapse="0" border-spacing="0"><tr><td><a href="javascript:tipsBox.hide();" title="'+cancel+'">'+cancel+'</a></td><td><a href="javascript:tipsBox.dynamicFunction(\''+name+'\',\''+param+'\');" title="'+sure+'">'+sure+'</a></td></tr></tabel></div></div>';
        $(id).html(html);
        $(id).show();
        tipsBox.center(id + ' > div.confirm-wrap');
    }

    /**
     * 元素上下居中
     * @param {String} _this
     */
    var center = function(_this) {
        var windowHeight = $(window).height();
        var _thisHeight = $(_this).css('height').replace('px','');
        var top = parseFloat(windowHeight - _thisHeight) / 2;
        $(_this).css('marginTop',top);
    }

    /**
     * 清空提示框
     */
    var hide = function() {
        $(id).removeAttr('style');
        $(id).html('');
    }

    /**
     * 动态生成函数
     * @param {String} name 函数名字
     * @param {String} param 函数参数
     * @returns {*}
     */
    var dynamicFunction = function(name,param) {
        var paramStr = "";
        var paramArr = param.split(",");

        for(var key in paramArr){
            paramStr += '\"' + paramArr[key] + '\",';
        }

        paramStr = paramStr.substring(0, paramStr.length - 1);
        return Function('return ' + name + '(' + paramStr + ')')();
    }

    return {
        alert:alert,
        confirm:confirm,
        center:center,
        hide:hide,
        dynamicFunction:dynamicFunction
    }
})();