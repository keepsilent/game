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
        if(getUserAgent()){      //ios
            $('#main').css('overflow','hidden');
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
            $('#main').css('overflow','');
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
    var showStatus = 0;

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
            rule.showStatus = 1;
            $(id).show();
            init();
            config.preventPenetration();
        } else {
            rule.showStatus = 0;
            $(id).hide();
            config.recoverPenetration();
        }
    }

    return {
        show:show
        ,showStatus:showStatus
    }
})();