// ==UserScript==
// @name         惜物網-物品資訊整頁顯示
// @namespace    https://ntut.club
// @version      2025-01-13
// @description  取消「物品資訊」、「出價紀錄」、「付款交貨方式」、「問與答」分類
// @author       kevinlee-06
// @match        https://shwoo.gov.taipei/shwoo/newproduct/newproduct00/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.taipei
// @updateURL    https://github.com/kevinlee-06/shwoo-script/raw/refs/heads/main/info.user.js
// @downloadURL  https://github.com/kevinlee-06/shwoo-script/raw/refs/heads/main/info.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 建立 css
    var style = document.createElement("style");
    style.type = "text/css";
    var css = `
        #tb001, #tb002, #tb004 {
            display: block;
        }
    `;

    // 移除「物品資訊」、「出價紀錄」、「付款交貨方式」、「問與答」按鈕
    var elements = document.querySelectorAll('[role="presentation"]');
    elements.forEach(function(element) {
        element.remove();
    });

    // 套用 css
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();

