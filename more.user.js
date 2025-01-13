// ==UserScript==
// @name         惜物網-物品瀏覽-載入全部
// @namespace    https://ntut.club
// @version      2025-01-13
// @description  「載入全部」會以 100Hz 的頻率瘋狂點擊載入更多按鈕
// @author       kevinlee-06
// @match        https://shwoo.gov.taipei/shwoo/browse/browse00/advancedQuery*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.taipei
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        var divHome = document.getElementById('home');
        if (divHome) {
            var buttonStart = document.createElement('input');
            var buttonStop = document.createElement('input');
            buttonStart.type = 'button';
            buttonStart.value = '載入全部';
            buttonStop.type = 'button';
            buttonStop.value = '停止載入';
            buttonStart.style.marginRight = '10px';
            buttonStop.style.marginRight = '10px';
            // buttonStart.style.marginTop = '10px';
            // buttonStop.style.marginTop = '10px';
            buttonStart.title = '點擊此按鈕以開始瘋狂 call seeMoreObject()';
            buttonStop.title = '點擊此按鈕以停止左邊按鈕的瘋狂行為';
            buttonStart.className = 'btn bg_green';
            buttonStop.className = 'btn bg_blue2';
            var buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'flex-end';
            buttonContainer.style.marginTop = '10px';
            buttonStart.addEventListener('click', () => showMoreUntilAlert());
            buttonStop.addEventListener('click', () => stopLoading());
            buttonContainer.appendChild(buttonStart);
            buttonContainer.appendChild(buttonStop);
            divHome.appendChild(buttonContainer);
        }
    });


    let interval;

    function showMoreUntilAlert() {
        // const btnShowMore = document.querySelector('input[title="看更多物品"]');
        // if (!btnShowMore) return;
        document.querySelector('.row.col-md-12.spaceBottom20.spaceTop10.padding10a.hidden-xs').style.display = "none";
        interval = setInterval(() => {
            // 備用方法
            // btnShowMore.click();
            // 嘗試直接用 seeMoreObject()
            seeMoreObject(); //
            const originalAlert = window.alert;
            window.alert = (message) => {
                clearInterval(interval);
                originalAlert(message);
            };
        }, 10);
    }

    function stopLoading() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
})();
