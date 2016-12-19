/**
 * 配置
 *
 * @author keepsilent
 * @version 1.0.0
 */
var config = (function(){

    /**
     * 防止弹出层的滚动穿透到底层
     * @method base.preventPenetration
     */
    var preventPenetration = function(){
        if(config.getUserAgent()){      //ios
            $('#main').css('overflow','hidden');
            return false;
        }
        base.bodyscrollTop = $(window).scrollTop();
        $('html,body').addClass('penetration-in');
    }

    /**
     * 恢复底层滚动，与base.preventPenetration配合使用
     * @method base.recoverPenetration
     */
    var recoverPenetration = function(){
        if(config.getUserAgent()){      //ios
            $('#main').css('overflow','');
            return false;
        }
        $('html,body').removeClass('penetration-in');
        $(window).scrollTop(base.bodyscrollTop);
        base.bodyscrollTop = 0;
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
        preventPenetration:preventPenetration
        ,recoverPenetration:recoverPenetration
    }
})();