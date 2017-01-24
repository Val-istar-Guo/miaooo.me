// var w = document.body.clientWidth;
// var fontSize = w / 375;
//
// document.body.parentElement.style.fontSize = fontSize.toFixed(4) + "px";

if (document.addEventListener) {

    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };

    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);

}
