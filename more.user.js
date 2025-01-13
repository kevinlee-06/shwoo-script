// ==UserScript==
// @name         惜物網-物品瀏覽-載入全部
// @namespace    https://ntut.club
// @version      2025-01-13
// @description  「載入全部」自動載入所有物品，支援停止功能與錯誤處理
// @author       kevinlee-06
// @match        https://shwoo.gov.taipei/shwoo/browse/browse00/advancedQuery*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.taipei
// @updateURL    https://github.com/kevinlee-06/shwoo-script/raw/refs/heads/main/more.user.js
// @downloadURL  https://github.com/kevinlee-06/shwoo-script/raw/refs/heads/main/more.user.js
// @grant        none
// ==/UserScript==

(function() {
    
    'use strict';
    window.addEventListener('load', function() {
        var divHome = document.getElementById('home');
        if (divHome) {
            const buttonStart = createButton('載入全部', '開始載入更多物品', 'btn bg_green', showMoreUntilAlert);
            const buttonStop = createButton('停止載入', '停止載入物品', 'btn bg_blue2', stopLoading);
            const buttonContainer = document.createElement('div');

            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'flex-end';
            buttonContainer.style.marginTop = '10px';
            buttonContainer.appendChild(buttonStart);
            buttonContainer.appendChild(buttonStop);
            divHome.appendChild(buttonContainer);
        }
    });

    let interval;
    let isLoading = false;

    function showMoreUntilAlert() {
        if (isLoading) return; // Prevent multiple intervals
        isLoading = true;

        const btnShowMore = document.querySelector('input[title="看更多物品"]');
        interval = setInterval(() => {
            try {
                seeMoreObject();
                interceptAlert(); // Handle "到底囉！"
            } catch (error) {
                console.error("Error during loading:", error);
                stopLoading();
            }
        }, 1000);
    }

    function stopLoading() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            isLoading = false;
        }
    }

    function interceptAlert() {
        const originalAlert = window.alert;
        window.alert = (message) => {
            if (message.includes("到底囉！")) {
                stopLoading();
            }
            originalAlert(message);
        };
    }

    function createButton(value, title, className, onClickHandler) {
        const button = document.createElement('input');
        button.type = 'button';
        button.value = value;
        button.title = title;
        button.className = className;
        button.style.marginRight = '10px';
        button.addEventListener('click', onClickHandler);
        return button;
    }

})();
