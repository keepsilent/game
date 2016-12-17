/**
 * 视频播放
 */
var video = {}

/**
 * 播放视频按钮
 * @method video.playVideoBnt
 * @param {String} src 视频数径
 * @param {String} open 按钮点击统计
 */
video.playVideoBnt = function(src,open) {

    if(webDevice.networkType != '' && webDevice.networkType != 'wifi') {
        if(!confirm('亲，您不是在wifi网络，是否继续播放')) {
            return false;
        }
    }

    var videoBox = '';
    videoBox = '<div id="video-mask" onclick="video.colseVideoBtn()"></div>';
    videoBox += '<div id="video-view-box"></div>';
    videoBox += '<div class="video-colsebtn"><a href="javascript:video.colseVideoBtn();">关闭视频</a></div>';
    $('#video-box').html(videoBox);
    $('#video-box').show();

    var videoMyselfBox = '';
    videoMyselfBox = '<param name="wmode" value="opaque"/>';
    videoMyselfBox = '<video id="video-myself-box"  style="display: none;" onclick="video.pausedVideoBtn()" src="" width="100%"  wmode="opaque" webkit-playsinline>'+videoMyselfBox+'</video>';
    $('#video-view-box').html(videoMyselfBox);
    $('#video-myself-box').attr('src',src);

    $('#video-view-box').css('height',config.width * 9 / 16);
    document.getElementById('video-myself-box').play();
    $('#video-myself-box').show();


    //按钮点击统计
    var page = $('#page-mark').val();
    if(page == "product-info" && open != "open"){
        common.buttonClikcStatistics("view","view_video","视频播放");
    }else if(page == "home"){
        common.buttonClikcStatistics("index","index_playVideo","视频播放");
    }
}

/**
 * 视频播放与暂停
 * @method video.pausedVideoBtn
 */
video.pausedVideoBtn = function() {
    var _thisVideo = document.getElementById('video-myself-box');
    if (_thisVideo.paused) {
        $('#video-myself-box').removeAttr('controls');
        _thisVideo.play();
    } else {
        _thisVideo.pause();
        $('#video-myself-box').attr('controls','controls');
    }
}

/**
 * 关闭视频
 * @method video.colseVideoBtn
 */
video.colseVideoBtn = function() {
    var _thisVideo = document.getElementById('video-myself-box');
    _thisVideo.pause();

    $('#video-view-box').html('');
    $('#video-box').hide();
}



video.playVideo = function(id, src) {
    if(webDevice.networkType != '' && webDevice.networkType != 'wifi') {
        if(!confirm('亲，您不是在wifi网络，是否继续播放')) {
            return false;
        }
    }

    $('div.video-wrap').removeClass('video-mBottom');
    $('div.product-title-header').removeClass('video-mTop');
    $('div.product-title-header').removeClass('video-pBottom');
    $('div.product-notice-inner').removeClass('video-top');
    $('div.product-shopping').removeClass('video-top');
    $('.video-fullSreen').hide();
    $('.video-close').hide();
    $('.video-pause').hide();
    $('.video-wrap').hide();
    $('div.video-loading').hide();
    $('.video-play').show();
    $('.product-cover').show();

    var _thisVideoSrc = '<video id="product-video-'+id+'"  onplaying="video.loading('+id+')" class="video-style" src=""  wmode="opaque"  webkit-playsinline> <param name="wmode" value="opaque" /></video>';
    var _cover = $('#product-item-'+id).find('a.product-cover');
    _cover.hide();
    $('#product-item-'+id).find('div.video-play').hide();
    $('#product-item-'+id).find('div.video-fullSreen').show();

    $('#product-item-'+id).find('div.video-wrap').html(_thisVideoSrc).show();
    $('#product-video-'+id).attr('src',src);
    $('#product-video-'+id).css('width',_cover.css('width'));
    $('#product-video-'+id).css('height',_cover.css('height'));
    $('#product-video-'+id).attr('width',_cover.width());
    $('#product-video-'+id).attr('height',parseInt(_cover.css('height').replace('px','')));
    video.scan_code_video(id,0);
    video.pausedLoading(id);
    var u = navigator.userAgent;
    if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
        $('#product-item-'+id).find('div.video-wrap').addClass('video-mBottom');
        $('#product-item-'+id).find('div.product-title-header').addClass('video-mTop');
        $('#product-item-'+id).find('div.product-title-header').addClass('video-pBottom');
        $('#product-item-'+id).find('div.product-notice-inner').addClass('video-top');
        $('#product-item-'+id).find('div.product-shopping').addClass('video-top');
        $('#video-close-'+id).show();
    }
    var _thisVideo = document.getElementById('product-video-'+id);
    _thisVideo.play();
}
video.loading = function(id) {
    $('#product-item-'+id).find('div.video-loading').hide();
}
video.pausedVideo = function(id) {
    var _thisVideo = document.getElementById('product-video-'+id);
    if(_thisVideo.paused) {
        _thisVideo.play();
        $('#product-item-'+id).find('div.video-pause').hide();
        $('#product-item-'+id).find('div.video-fullSreen').show();
        $('#product-item-'+id).find('div.video-loading').hide();

        $('#product-item-'+id).find('a.product-cover').hide();
        $('#product-item-'+id).find('div.video-wrap').show();
        $('#video-close'+id).show();
    } else {
        _thisVideo.pause();
        video.pausedHide(id);
        $('#product-item-'+id).find('div.video-fullSreen').hide();
        $('#product-item-'+id).find('div.video-loading').hide();

        $('#product-item-'+id).find('div.video-pause').hide();
        $('#product-item-'+id).find('a.product-cover').show();
        $('#product-item-'+id).find('div.video-wrap').hide();
        $('#product-item-'+id).find('div.video-play').show();

        var u = navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
            $('div.video-wrap').removeClass('video-mBottom');
            $('div.product-title-header').removeClass('video-mTop');
            $('div.product-title-header').removeClass('video-pBottom');
            $('div.product-notice-inner').removeClass('video-top');
            $('div.product-shopping').removeClass('video-top');
            $('#video-close-'+id).hide();
        }
        video.scan_code_video(id,1);
    }
}

video.pausedHide = function(id) {
    $('#product-item-'+id).find('div.video-pause').show();
    var _thisPause = $('#product-item-'+id).find('div.video-pause-inner');
    var _height = _thisPause.height();
    var _cover =  $('#product-video-'+id).height();
    _thisPause.css('marginTop', ((_cover - _height ) / 2 )+'px');
}

video.pausedLoading = function(id) {
    $('#product-item-'+id).find('div.video-loading').show();
    var _thisPause = $('#product-item-'+id).find('div.video-loading-inner');
    var _height = _thisPause.height();
    var _cover =  $('#product-video-'+id).height();
    _thisPause.css('marginTop', ((_cover - _height ) / 2 )+'px');
}

video.fullScreen = function(id) {
    var _thisVideo = document.getElementById('product-video-'+id);
    _thisVideo.webkitEnterFullscreen();
}

/**
 * 扫码视频
 * @param {int} id 元素id
 * @return {void}
 */
video.scan_code_video = function(id,status) {
    if($('#scan-code-page').val() != 1) {
        return false;
    }
    if(status == 0) {
        var width = $(window).width();
        $('#product-video-' + id).css('width', width + 'px');
        $('#product-video-' + id).css('height', 'auto');
        $('.praise-btn').hide();
        $('.video-style').css('borderRadius',0);
    } else {
        $('.praise-btn').show();
    }
}