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