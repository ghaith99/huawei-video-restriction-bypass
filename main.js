    // ==UserScript==
    // @name         Bypass Huawei Video Download Restrictions
    // @namespace    http://tampermonkey.net/
    // @version      0.1
    // @description  inject mp4 video download link
    // @author       Ghaith
    // @match        https://ilearningx.huawei.com/courses/*
    // @grant        none
    // ==/UserScript==


var timer;
timer = setInterval(inject, 3000);
function inject(){
        if (typeof ($('.xblock-json-init-args')[1]) !== 'undefined') {
            var options = JSON.parse($('.xblock-json-init-args')[1].innerHTML)
            $.ajax({
                notifyOnError: false,
                url: '/vod/' + options["video_id"],
                type: 'GET',
                async: false,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (res) {
                    $('<li class="video-download-button">\n' +
                      '<a href="' + res['origin_url'] + '" download>Download the video</a>\n' +
                      '</li>').appendTo(".videojs_block")[0];
                    clearInterval(timer);
                }
            })
        }
}



