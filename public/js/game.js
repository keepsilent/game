/**
 * 打薯条君游戏
 *
 * @author keepsilent
 * @version 1.0.0
 */
var game = (function() {
    var scores = 0; //游戏分数
    var width = $(window).width();
    var height = $(window).height();
    var playing = ''; //游戏进行中
    var playStatus = 0; //游戏状态
    var stopStatus = 0; //游戏暂停状态
    var backgroundPositonY = 0; //背景图片位置Y
    var backgroundOffset = 0.5; //背景图片移动速度
    var encounterRate = { small: 0, big: 0 }; //遇敌率
    var myself = ''; //自己角色
    var role = ''; //第一人称解色
    var enemys = []; //敌机对象数组
    var bullets = []; //子弹对象数组
    var body = ''; //body控制器
    var elements = {
        beginWrap: 'begin-wrap'//游戏开始界面
        ,content: 'content' //游戏容器
        ,protagonist: 'protagonist' //主角
        ,scoreBox: 'score-box' //游戏分数框
        ,scoreBoxValue: 'score-value' //游戏分粉框显示积分
        ,overBox: 'over-box' //游戏结束框
        ,overBoxValue : 'over-value' //游戏结束框显示积分
        ,overBoxProceedBtn : 'proceed-btn' //继续按钮
        ,backgroundMusic : document.getElementById('background-music') //背景音乐
        ,bulletMusic: document.getElementById('bullet-music') //子弹音乐
    };
    var content = document.getElementById(elements.content);
    var bodyScroll = 0; //充许滚动

    /**
     * 游戏初始化
     * @method init
     */
    var init = function() {
        //设置容器大小
        $('#contentdiv').css({'width':width,'height':height});
        $('#'+elements.beginWrap).css({'width':width,'height':height});
        $('#'+elements.content).css({'width':width,'height':height});

        if(!isMobile()) {
            alert('游戏初始失败');
            return;
        }

        game.bodyScroll = 0;
        game.myself = new createRole(elements.protagonist);
        game.myself.imagenode.style.display = "none"; //初始化隐藏本方飞机
        game.role = document.getElementById(elements.protagonist);

        //game.body = document.getElementsByTagName("body")[0];
        //game.myself.imagenode.attachEvent("onclick",stop); //为本方飞机添加暂停事件
        /*
        game.body = document.getElementsByTagName("body")[0];
        if(document.addEventListener) {
            mainDiv.addEventListener("mousemove",roleMove,true);  //为本方飞机添加移动和暂停
            game.myself.imagenode.addEventListener("click",stop,true);//为本方飞机添加暂停事件
            game.body.addEventListener("mousemove",boundary,true); //为body添加判断本方飞机移出边界事件//为暂停界面的继续按钮添加暂停事件
            suspenddiv.getElementsByTagName("button")[0].addEventListener("click",stop,true);//为暂停界面的继续按钮添加暂停事件
            suspenddiv.getElementsByTagName("button")[2].addEventListener("click",proceed,true); //为暂停界面的返回主页按钮添加事件
        } else if(document.attachEvent) {
            mainDiv.attachEvent("onmousemove",roleMove); //为本方飞机添加移动
            game.myself.imagenode.attachEvent("onclick",stop); //为本方飞机添加暂停事件
            game.body.attachEvent("onmousemove",boundary);  //为body添加判断本方飞机移出边界事件
            suspenddiv.getElementsByTagName("button")[0].attachEvent("onclick",stop); //为暂停界面的继续按钮添加暂停事件
            suspenddiv.getElementsByTagName("button")[2].attachEvent("click",proceed,true); //为暂停界面的返回主页按钮添加事件
        }*/

        $('#'+elements.protagonist).tocher({action:function(tocher) {
            tocher.resetload();
        }});

        //阻止body冒泡事件
        document.body.addEventListener('touchmove', function (event) {
            event.preventDefault();
            return false;

        }, false)
    }

    /**
     * 游戏开始
     * @method begin
     */
    var begin = function() {
        game.playStatus = 1;
        $('#'+elements.content).show();
        $('#'+elements.scoreBox).show();
        $('#'+elements.beginWrap).hide();
        game.myself.imagenode.style.display = "block";
        game.playing = setInterval(start,20); //调用开始函数
    }

    /**
     * 游戏继续
     * @method proceed
     */
    var proceed = function() {
        location.reload(true);
    }

    /**
     * 游戏暂停
     * @method stop
     */
    var stop = function() {
        if(game.playStatus == 0) { //游戏结束
            return false;
        }

        if(game.stopStatus == 0) {
            //suspenddiv.style.display = "block";
            /*
            if(document.removeEventListener) {
                mainDiv.removeEventListener("mousemove",roleMove,true);
                game.body.removeEventListener("mousemove",boundary,true);
            } else if(document.detachEvent) {
                mainDiv.detachEvent("onmousemove",roleMove);
                game.body.detachEvent("onmousemove",boundary);
            }*/
            showStopBox(1);
            clearInterval(game.playing);
            game.stopStatus = 1;
        } else {
            //suspenddiv.style.display = "none";
            /*
            if(document.addEventListener) {
                mainDiv.addEventListener("mousemove",roleMove,true);
                game.body.addEventListener("mousemove",boundary,true);
            } else if(document.attachEvent) {
                mainDiv.attachEvent("onmousemove",roleMove);
                game.body.attachEvent("onmousemove",boundary);
            }*/
            showStopBox(0);
            game.playing = setInterval(start,20);
            game.stopStatus = 0;
        }
    }

    /**
     * 显示暂停框
     * @method showStopBox
     * @param {Number} status 状态
     */
    var showStopBox = function(status) {
        $('#'+elements.overBoxProceedBtn).removeAttr('style');
        if(status == 1) {
            $('#'+elements.overBox).show();
            $('#'+elements.overBoxValue).html(game.scores);
            if(game.playStatus == 0) {
                $('#'+elements.overBoxProceedBtn).css('background','#CCC');
            }
            controlMusic(0);
        } else {
            $('#'+elements.overBox).hide();
            $('#'+elements.overBoxValue).html(0);
            controlMusic(1);
        }
    }


    /**
     * 重新开始
     * @method restarting
     */
    var restarting = function() {
        game.enemys = [];
        game.bullets = [];
        game.scores = 0;
        game.stopStatus = 0;
        game.playStatus = 1;
        game.backgroundPositonY = 0;
        game.encounterRate = { small: 0, big: 0 };

        clearInterval(game.playing);
        $('#'+elements.overBox).hide();
        $('#'+elements.content).html('');
        $('#'+elements.scoreBoxValue).html(0);

        game.myself = new createRole(elements.protagonist);
        game.myself.imagenode.style.display = "none"; //初始化隐藏本方飞机
        game.role = document.getElementById(elements.protagonist);
        game.myself.imagenode.style.display = "block";

        $('#'+elements.protagonist).tocher({action:function(tocher) {
            tocher.resetload();
        }});

        game.playing = setInterval(start,20); //调用开始函数
    }

    /**
     * 背景移动
     * @method backgroundMove
     */
    var backgroundMove = function() {
        game.content.style.backgroundPositionY = game.backgroundPositonY + "px";
        game.backgroundPositonY += backgroundOffset;
        if(game.backgroundPositonY > height){
            game.backgroundPositonY = 0;
        }
    }

    /**
     * 生成敌人
     * @method createEnemys
     */
    var createEnemys = function() {
        game.encounterRate.small++;

        if(game.encounterRate.small >= 20) {
            game.encounterRate.big++;

            if(game.encounterRate.big % 5 == 0) { //生成中型敌人
                game.enemys.push(new createEnemyClass(6,25,width-60,46,60,3,360,random(1,3),'public/images/material/enemy_explode_03.gif','public/images/material/enemy_03.png'));
            }

            if(game.encounterRate.big >= 20) { //生成大型敌人
                game.enemys.push(new createEnemyClass(12,57,width-94,94,80,5,540,1,'public/images/material/enemy_explode_02.gif','public/images/material/enemy_02.png'));
                game.encounterRate.big = 0;
            } else { //生成小型敌人
                game.enemys.push(new createEnemyClass(1,19,width-22,22,28,1,360,random(1,4),'public/images/material/enemy_explode_01.gif','public/images/material/enemy_01.png'));
            }

            game.encounterRate.small = 0;
        }
    }

    /**
     * 敌人移动
     * @method enemysMove
     */
    var enemysMove = function() {
        var len = game.enemys.length;
        for(var i = 0;i < len; i++) {
            if(game.enemys[i].planisdie != true) { //如果敌人没死
                game.enemys[i].planmove();
            }

            if(game.enemys[i].imagenode.offsetTop > height){ //如果敌人超出边界,删除敌人
                game.content.removeChild(game.enemys[i].imagenode);
                game.enemys.splice(i,1);
                len--;
            }

            if(game.enemys[i].planisdie == true) { //当敌人死亡标记为true时，经过一段时间后清除敌机
                game.enemys[i].plandietimes += 20;
                if(game.enemys[i].plandietimes == game.enemys[i].plandietime){
                    game.content.removeChild(game.enemys[i].imagenode);
                    game.enemys.splice(i,1);
                    len--;
                }
            }
        }
    }

    /**
     * 生成敌人类
     * @method createEnemyClass
     * @param {Number} hp 血量
     * @param {Number} X 坐标X
     * @param {Number} Y 坐标Y
     * @param {Number} sizeX 体积X
     * @param {Number} sizeY 体积Y
     * @param {Number} score 打败敌人获得的分数
     * @param {Number} dietime 敌人打败效果到消失时间
     * @param {Number} sudo 移动速度
     * @param {String} boomimage 打败敌人的效果图
     * @param {String} imagesrc  敌人效果图
     */
    var createEnemyClass = function(hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
        plan.call(this,hp,random(a,b),-100,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc);
    }

    /**
     * 生成子弹
     * @method createBullet
     */
    var createBullet = function() {
        if(game.encounterRate.small % 5 == 0) { //创建子弹
            game.bullets.push(new createBulletClass(parseInt(game.myself.imagenode.style.left)+31,parseInt(game.myself.imagenode.style.top)));
        }
    }

    /**
     * 子弹移动
     * @method bulletMove
     */
    var bulletMove = function() {
        var len = game.bullets.length;
        for(var i = 0; i < len; i++) { //移动子弹
            game.bullets[i].bulletmove();
            if(game.bullets[i].bulletimage.offsetTop < 0) { //如果子弹超出边界,删除子弹
                game.content.removeChild(game.bullets[i].bulletimage);
                game.bullets.splice(i,1);
                len--;
            }
        }
    }

    /**
     * 生成单行子弹类
     * @method createBulletClass
     * @param {Number} X 坐标X
     * @param {Number} Y 坐标Y
     */
    var createBulletClass = function (X,Y){
        bullet.call(this,X,Y,9,14,"public/images/material/bullet_01.png");
    }


    /**
     * 生成角色
     * @method createRole
     * @param {String} name 名称
     */
    var createRole = function(name) {
        var X = (width - 69 ) / 2; //角色坐标X
        var Y = (height - 91 ) - (height * 0.1); //角色坐标Y
        plan.call(this,1,X,Y,69,91,0,660,0,'public/image/protagonist_explode.gif','public/images/material/protagonist.gif');
        this.imagenode.setAttribute('id',name);
    }

    /**
     * 角色移动
     * @method roleMove
     */
    var roleMove = function() {
        var oevent = window.event||arguments[0];
        var chufa = oevent.srcElement||oevent.target;
        var selfplanX = oevent.clientX;
        var selfplanY = oevent.clientY;

        game.role.style.left = selfplanX - game.myself.plansizeX / 2 + "px";
        game.role.style.top = selfplanY - game.myself.plansizeY / 2 + "px";
    }

    /**
     * 游戏开始
     * @method start
     */
    var start = function() {
        createEnemys(); //生成敌机
        backgroundMove(); //背景移动
        enemysMove(); //敌机移动
        createBullet(); //生成子弹
        bulletMove(); // 子弹移动
        event(); //事件处理
        controlMusic(1);
    }

    /**
     * 事件触发
     * @method event
     */
    var event = function() {
        var enemyslen = game.enemys.length;
        var bulletslen = game.bullets.length;

        for(var k = 0; k < bulletslen; k++){
            for(var j = 0; j < enemyslen; j++){
                if(game.enemys[j].planisdie == false) {  //判断碰撞本方飞机
                   if(collide(game.enemys[j].imagenode.offsetLeft,game.enemys[j].plansizeX,game.myself.imagenode.offsetLeft,game.myself.plansizeX)) {
                        if(game.enemys[j].imagenode.offsetTop + game.enemys[j].plansizeY >= game.myself.imagenode.offsetTop + 40 && game.enemys[j].imagenode.offsetTop <= game.myself.imagenode.offsetTop - 20 + game.myself.plansizeY){
                            //碰撞本方飞机，游戏结束，统计分数
                            game.playStatus = 0;
                            game.myself.imagenode.src = "public/images/material/protagonist_explode.gif";
                            showStopBox(1);
                            clearInterval(game.playing);

                            /*
                            if(document.removeEventListener) {
                                mainDiv.removeEventListener("mousemove",roleMove,true);
                                game.body.removeEventListener("mousemove",boundary,true);
                            } else if(document.detachEvent) {
                                mainDiv.detachEvent("onmousemove",roleMove);
                                game.body.removeEventListener("mousemove",boundary,true);
                            }*/
                        }
                    }

                    //判断子弹与敌机碰撞
                    if(collide(game.bullets[k].bulletimage.offsetLeft,game.bullets[k].bulletsizeX,game.enemys[j].imagenode.offsetLeft,game.enemys[j].plansizeX)) {
                        if(game.bullets[k].bulletimage.offsetTop <= game.enemys[j].imagenode.offsetTop + game.enemys[j].plansizeY && game.bullets[k].bulletimage.offsetTop + game.bullets[k].bulletsizeY >= game.enemys[j].imagenode.offsetTop){
                            game.enemys[j].planhp = game.enemys[j].planhp - game.bullets[k].bulletattach; //敌机血量减子弹攻击力
                            if(game.enemys[j].planhp == 0 && game.playStatus == 1) {  //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
                                game.scores += game.enemys[j].planscore;
                                game.enemys[j].imagenode.src = game.enemys[j].planboomimage;
                                game.enemys[j].planisdie = true;
                                $('#'+elements.scoreBoxValue).html(game.scores);
                            }

                            game.content.removeChild(game.bullets[k].bulletimage); //删除子弹
                            game.bullets.splice(k,1);
                            bulletslen--;
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * 碰撞
     * 判断物体A与物体B在x轴上是否相交
     * @method collide
     * @param {Number} x1 物体A x轴起点坐标
     * @param {Number} x2 物体A x轴结束坐标
     * @param {Number} x3 物体B x轴起点坐标
     * @param {Number} x4 物体B x轴结束坐标
     * @returns {boolean}
     */
    var collide = function(x1,x2,x3,x4) {
        if((x1 + x2 > x3) && (x1 < x3 + x4)){
            return true
        }
        return false;
    }

    /**
     * 产生min到max之间的随机数
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @returns {Number}
     */
    var random = function(min,max) {
        return Math.floor(min+Math.random()*(max-min));
    }

    /**
     * 判断本方飞机是否移出边界,如果移出边界,则取消mousemove事件,反之加上mousemove事件
     * @method boundary
     */
    var boundary = function() {
        var oevent = window.event || arguments[0];
        var bodyobjX = oevent.clientX;
        var bodyobjY = oevent.clientY;

        if(bodyobjX < 5 || bodyobjX > width - 5 || bodyobjY < 0 || bodyobjY > height - 5 ){
            if(document.removeEventListener) {
                game.content.removeEventListener("mousemove",roleMove,true);
            } else if(document.detachEvent){
                game.content.detachEvent("onmousemove",roleMove);
            }
        } else {
            if(document.addEventListener){
                game.content.addEventListener("mousemove",roleMove,true);
            } else if(document.attachEvent){
                game.content.attachEvent("nomousemove",roleMove);
            }
        }
    }

    /**
     * 是否手机端
     * @method isMobile
     */
    var isMobile = function() {
        var agent = navigator.userAgent;
        var ipad = agent.match(/(iPad).*OS\s([\d_]+)/),
            isIphone = !ipad && agent.match(/(iPhone\sOS)\s([\d_]+)/),
            isAndroid = agent.match(/(Android)\s+([\d.]+)/);
        if(isIphone || ipad || isAndroid) {
            return true;
        }

        return false;
    }

    /**
     * 控制背景音乐
     * @method controlMusic
     */
    var controlMusic = function(status) {
        if(status == 1) {
            elements.backgroundMusic.play();
            elements.backgroundMusic.volume = 0.3;

            elements.bulletMusic.play();
            elements.bulletMusic.volume = 0.5;
        } else {
            elements.backgroundMusic.pause();
            elements.bulletMusic.pause();
        }
    }

    return {
        init:init
        ,begin:begin
        ,proceed:proceed
        ,stop:stop
        ,playing:playing
        ,restarting:restarting
        ,stopStatus:stopStatus
        ,playStatus:playStatus
        ,scores:scores
        ,role:role
        ,myself:myself
        ,backgroundPositonY:backgroundPositonY
        ,encounterRate:encounterRate
        ,enemys:enemys
        ,bullets:bullets
        ,content:content
        ,bodyScroll:bodyScroll
}
})();