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
var count = 1;
timer = setInterval(inject, 3000);
function inject(){
    $.each($('.xblock-json-init-args'),function(k,v){
        if(v.innerHTML.includes("video_id")){
            var options = JSON.parse(v.innerHTML)
            $.ajax({
                notifyOnError: false,
                url: '/vod/' + options["video_id"],
                type: 'GET',
                async: false,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (res) {
                    $('<li class="video-download-button">\n' +
                      '<a href="' + res['origin_url'] + '" download>Download the video #'+count+'</a>\n' +
                      '</li>').appendTo(".videojs_block")[0];
                    count += 1;
                    clearInterval(timer);
                }
            })
        }
    })
}



