var mainDiv = document.getElementById("maindiv"); //获得主界面
var startdiv = document.getElementById("startdiv");  //获得开始界面
var scorediv = document.getElementById("scorediv");//获得游戏中分数显示界面
var scorelabel = document.getElementById("label");  //获得分数界面
var suspenddiv = document.getElementById("suspenddiv"); //获得暂停界面
var enddiv = document.getElementById("enddiv"); //获得游戏结束界面
var planscore = document.getElementById("planscore");  //获得游戏结束后分数统计界面


/**
 * 敌人模型
 * @method plan
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
function plan(hp,X,Y,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    this.planX = X;
    this.planY = Y;
    this.imagenode = null;
    this.planhp = hp;
    this.planscore = score;
    this.plansizeX = sizeX;
    this.plansizeY = sizeY;
    this.planboomimage = boomimage;
    this.planisdie = false;
    this.plandietimes = 0;
    this.plandietime = dietime;
    this.plansudu = sudu;


    this.planmove = function() { //移动行为
        if(game.scores <= 50000) {
            this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + "px";
        } else if(game.scores  > 50000 && game.scores  <= 100000) {
            this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + 1 + "px";
        }  else if(game.scores  > 100000&&game.scores  <= 150000) {
            this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu+2+"px";
        } else if(game.scores  > 150000&&game.scores  <= 200000){
            this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu+3+"px";
        } else if(game.scores  > 200000 && game.scores  <= 300000) {
            this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu+4+"px";
        } else {
            this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu+5+"px";
        }
    }

    this.init = function() { //生成模型
        this.imagenode = document.createElement("img");
        this.imagenode.style.left = this.planX + "px";
        this.imagenode.style.top = this.planY + "px";
        this.imagenode.src = imagesrc;
        mainDiv.appendChild(this.imagenode);
    }

    this.init();
}

/**
 * 子弹模型
 * @method bullet
 * @param {Number} X 坐标X
 * @param {Number} Y 坐标Y
 * @param {Number} sizeX 体积X
 * @param {Number} sizeY 体积Y
 * @param {String} imagesrc  子弹效果图
 */
function bullet(X,Y,sizeX,sizeY,imagesrc){
    this.bulletX = X;
    this.bulletY = Y;
    this.bulletimage = null;
    this.bulletattach = 1;
    this.bulletsizeX = sizeX;
    this.bulletsizeY = sizeY;

    this.bulletmove = function() { //移动行为
        this.bulletimage.style.top = this.bulletimage.offsetTop - 20 + "px";
    }

    this.init = function() { //生成子弹模型
        this.bulletimage=document.createElement("img");
        this.bulletimage.style.left = this.bulletX+"px";
        this.bulletimage.style.top = this.bulletY+"px";
        this.bulletimage.src = imagesrc;
        mainDiv.appendChild(this.bulletimage);
    }

    this.init();
}