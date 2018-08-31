window.TouchFeedback = function (bindCls, targetCls){
    // 以添加类名移除类名的方式实现触摸的反馈， 任何动作都可以在类名下定义css样式；
    // bindCls 需要有触摸反馈的元素的类名，
    // @targetCls： 反馈添加的类名， 反馈的动作都加在这个类名下，例如背景色的改变
    var _this = this;
    this.el = document.getElementsByTagName('body')[0];
    this.bindCls = bindCls;
    this.targetCls = targetCls;
    this.targetClsExp = new RegExp(_this.targetCls)
    this.touchDelay = 100;
    this.oldDom = null;
    this.matchCls = new RegExp(this.bindCls);
    this.stopDom = document.getElementsByTagName('body')[0];
    this.moveMax = 10;
    this.timer = null;
    this.holdEl = null;
    this.addAct = function () {
        _this.holdEl.setAttribute('class', _this.holdEl.getAttribute('class') + ' ' + _this.targetCls);
    }
    this.removeAct = function () {
        _this.holdEl.setAttribute('class', _this.holdEl.getAttribute('class').replace(' ' + _this.targetCls, ''));
    }
    this.start = function (e) {
        console.log(_this.oldDom)
        if(_this.oldDom && _this.targetClsExp.test(_this.oldDom.getAttribute('class'))) {
            _this.oldDom.setAttribute('class', _this.oldDom.getAttribute('class').replace(' ' + _this.targetCls, ''));
        }
        var e = e || event;
        var el = e.target,
            loop = true,
            i = 0;
        while (loop) {
            i ++;
            if(i > 30) {loop = false}
            if(el.className) {
                if(_this.matchCls.test(el.className)) {
                    loop = false;
                } else if (el === _this.stopDom) {
                    loop = false;
                    el = false;
                } else {
                    el = el.parentNode;
                }
            } else {
                el = el.parentNode;
            }
        }
        _this.oldDom = _this.holdEl = el;

        if(_this.holdEl) _this.addAct()
    }
    this.end = function () {
        if(_this.holdEl) _this.removeAct();
    }
    this.move = function (e) {
        var e = e || event;
        if(_this.holdEl) _this.removeAct();
    };
    this.el.addEventListener('touchstart',this.start, false);
    this.el.addEventListener('touchend',this.end, false);
    this.el.addEventListener('touchmove',this.move, false);
}
