// ==UserScript==
// @name         VivifyGmail
// @namespace    https://github.com/jonas0616/vivifygmail
// @version      0.1.3
// @description  Keep your POP3 account in Gmail up to date
// @author       jonas0616
// @grant        none
// @include      https://mail.google.com/*
// @license      Apache License 2.0
// ==/UserScript==

(function () { // eslint-disable-line func-names
  'use strict'; // eslint-disable-line

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  
  function refresh(refreshUrl) {
    // console.log(`VivifyGamil: refresh ${refreshUrl}`);
    const fetchInit = {
      method: 'POST',
      headers: new Headers(),
      credentials: 'include',
    };
    fetch(refreshUrl, fetchInit).then(data => {
      // console.log(data);
    }).catch(e => {
      console.log(e);
    });
  }

  Promise.resolve()
    .then(() => new Promise((resolve) => {
      const id = setInterval(() => {
        if (window.GM_ACTION_TOKEN !== undefined &&
            window.GLOBALS !== undefined) {
          clearInterval(id);
          resolve();
        }
      }, 5000);
    }))

    .then(() => {
      const l = window.location;
      const url = `${l.origin}${l.pathname}`;
      const at = getCookie('GMAIL_AT');
      const ik = window.GLOBALS[9];
      const refreshUrl = `${url}?ik=${ik}&act=cma_1&at=${at}&view=up&rt=j`;
    
      refresh(refreshUrl);
      // repeat by one minute
      window.setInterval(refresh, 60000, refreshUrl);
    });
}());
