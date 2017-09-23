// ==UserScript==
// @name         VivifyGmail
// @namespace    https://github.com/jonas0616/vivifygmail
// @version      0.1.1
// @description  Keep your POP3 account in Gmail up to date
// @author       jonas0616
// @grant        none
// @include      https://mail.google.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @license      Apache License 2.0
// ==/UserScript==

(function() {
    'use strict';

    Promise.resolve()

    .then(() => {
        return new Promise((resolve) => {
            let id = setInterval(() => {
                if (window.GM_ACTION_TOKEN !== undefined &&
                    window.GLOBALS !== undefined
                ) {
                    clearInterval(id);
                    resolve();
                }
            }, 5000);
        });
    })

    .then((data) => {
        let url = window.location.href.split('#')[0];
        let at = window.GM_ACTION_TOKEN;
        let ik = window.GLOBALS[9];
        let refreshUrl = `${url}?ik=${ik}&&at=${at}&view=up&act=par&rt=j`;

        // repeat by one minute
        window.setInterval(refresh, 60000, refreshUrl);
    });

    function refresh(refreshUrl) {
        $.ajax({
            url: refreshUrl,
            method: 'POST',
            xhr: () => {
                let xhr = $.ajaxSettings.xhr();
                let setRequestHeader = (name, value) => {
                    // ignore X-Requested-With
                    if (name === 'X-Requested-With') {
                        return;
                    }
                    setRequestHeader.call(this, name, value);
                };
                return xhr;
            }
        })

        .catch((err) => {
            console.log(err);
        });
    }
})();
