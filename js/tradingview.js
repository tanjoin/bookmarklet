/*
 * TradingView EURJPY テクニカルサマリー監視ブックマークレット
 * 
 * 【使い方】
 * 1. https://jp.tradingview.com/symbols/EURJPY/technicals/ を開く
 * 2. ブラウザのコンソールにこのコードを貼り付けて実行
 * 3. 初回実行時に通知の許可を求められるので「許可」を選択
 * 4. テクニカルサマリーが変更されると2つの通知が表示される:
 *    - エントリー通知: 新規ポジション用
 *    - 決済通知: 逆ポジション保有者用
 * 5. 自動で時間足ボタンをクリックしてデータを更新(30秒毎)
 * 
 * 【通知パターン】
 * 買いシグナル時:
 *   通知1: 【買いエントリー】ロング推奨
 *   通知2: 【ショート決済】売りポジション保有者は決済推奨
 * 
 * 売りシグナル時:
 *   通知1: 【売りエントリー】ショート推奨
 *   通知2: 【ロング決済】買いポジション保有者は決済推奨
 * 
 * 【停止方法】
 * ページをリロードすると監視が停止します
 */

(function() {
    'use strict';
    
    // ストレージキー
    const STORAGE_KEY = 'eurjpy_technicals_summary';
    
    // 自動クリック中フラグ
    let isAutoClicking = false;
    
    console.log('[TradingView Monitor] 起動しました');
    
    // ビープ音を鳴らす
    function playBeep() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.error('[TradingView Monitor] 音の再生失敗:', e);
        }
    }

    // サマリーを分析
    function analyzeSummary(summary) {
        const text = summary.trim().toLowerCase();
        
        if (text.includes('強い買い') || text.includes('strong buy')) {
            return { action: '強い買い', icon: '🟢📈', isBuy: true };
        } else if (text.includes('買い') || text === 'buy') {
            return { action: '買い', icon: '🟢', isBuy: true };
        } else if (text.includes('強い売り') || text.includes('strong sell')) {
            return { action: '強い売り', icon: '🔴📉', isBuy: false };
        } else if (text.includes('売り') || text === 'sell') {
            return { action: '売り', icon: '🔴', isBuy: false };
        } else if (text.includes('中立') || text === 'neutral') {
            return { action: '中立', icon: '⚪', isBuy: null };
        }
        
        return { action: summary, icon: '❓', isBuy: null };
    }

    // エントリー通知を表示
    function showEntryNotification(analysis) {
        let title = 'EURJPY ';
        let body = '';
        
        if (analysis.isBuy === true) {
            title += '【買いエントリー】';
            body = `${analysis.icon} ${analysis.action} - ロング推奨`;
        } else if (analysis.isBuy === false) {
            title += '【売りエントリー】';
            body = `${analysis.icon} ${analysis.action} - ショート推奨`;
        } else {
            return; // 中立は通知しない
        }
        
        const notification = new Notification(title, {
            body: body,
            icon: 'https://www.tradingview.com/favicon.ico',
            requireInteraction: true,
            tag: 'tradingview-entry-' + Date.now()
        });
        
        notification.onclick = function() {
            window.focus();
            notification.close();
        };
        
        console.log('[TradingView Monitor] エントリー通知:', title, body);
    }
    
    // 決済通知を表示
    function showExitNotification(analysis) {
        let title = 'EURJPY ';
        let body = '';
        
        if (analysis.isBuy === true) {
            title += '⚠️【ショート決済】';
            body = '🔴→🟢 売りポジション保有者は決済推奨';
        } else if (analysis.isBuy === false) {
            title += '⚠️【ロング決済】';
            body = '🟢→🔴 買いポジション保有者は決済推奨';
        } else {
            return; // 中立は通知しない
        }
        
        const notification = new Notification(title, {
            body: body,
            icon: 'https://www.tradingview.com/favicon.ico',
            requireInteraction: true,
            tag: 'tradingview-exit-' + Date.now()
        });
        
        notification.onclick = function() {
            window.focus();
            notification.close();
        };
        
        console.log('[TradingView Monitor] 決済通知:', title, body);
    }

    // 通知を表示
    function notifyChange(newSummary) {
        const analysis = analyzeSummary(newSummary);
        
        console.log('[TradingView Monitor] シグナル変更:', newSummary, analysis);
        
        // 中立は通知しない
        if (analysis.isBuy === null) {
            console.log('[TradingView Monitor] 中立のため通知スキップ');
            return;
        }
        
        // 音を2回鳴らす
        playBeep();
        setTimeout(() => playBeep(), 600);
        
        // 通知の許可をリクエスト
        if (Notification.permission === 'granted') {
            showEntryNotification(analysis);
            setTimeout(() => showExitNotification(analysis), 100);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showEntryNotification(analysis);
                    setTimeout(() => showExitNotification(analysis), 100);
                }
            });
        }
    }

    // テクニカルサマリーを取得
    function getTechnicalSummary() {
        // 方法1: "サマリー" というテキストの後の要素を探す
        const summaryLabels = Array.from(document.querySelectorAll('span, div')).filter(el => 
            el.textContent.trim() === 'サマリー' || el.textContent.trim() === 'Summary'
        );
        
        for (const label of summaryLabels) {
            // 次の兄弟要素を探す
            let sibling = label.nextElementSibling;
            if (sibling) {
                const text = sibling.textContent.trim();
                if (/^(強い買い|買い|中立|売り|強い売り|Strong Buy|Buy|Neutral|Sell|Strong Sell)$/i.test(text)) {
                    console.log('[TradingView Monitor] 方法1でサマリー発見:', text);
                    return text;
                }
            }
            
            // 親要素の次の要素を探す
            if (label.parentElement) {
                sibling = label.parentElement.nextElementSibling;
                if (sibling) {
                    const text = sibling.textContent.trim();
                    if (/^(強い買い|買い|中立|売り|強い売り|Strong Buy|Buy|Neutral|Sell|Strong Sell)$/i.test(text)) {
                        console.log('[TradingView Monitor] 方法1-2でサマリー発見:', text);
                        return text;
                    }
                }
            }
        }
        
        // 方法2: data-name属性で探す
        const technicalElements = document.querySelectorAll('[data-name*="technical"], [data-name*="summary"]');
        for (const el of technicalElements) {
            const spans = el.querySelectorAll('span, div');
            for (const span of spans) {
                const text = span.textContent.trim();
                if (/^(強い買い|買い|中立|売り|強い売り|Strong Buy|Buy|Neutral|Sell|Strong Sell)$/i.test(text)) {
                    console.log('[TradingView Monitor] 方法2でサマリー発見:', text);
                    return text;
                }
            }
        }
        
        // 方法3: クラス名で探す
        const signalElements = document.querySelectorAll('[class*="signal"], [class*="speedometer"], [class*="summary"]');
        for (const el of signalElements) {
            const text = el.textContent.trim();
            if (/^(強い買い|買い|中立|売り|強い売り|Strong Buy|Buy|Neutral|Sell|Strong Sell)$/i.test(text)) {
                console.log('[TradingView Monitor] 方法3でサマリー発見:', text);
                return text;
            }
        }
        
        // 方法4: 全てのspan/divから正規表現マッチ
        const allSpans = document.querySelectorAll('span, div');
        for (const span of allSpans) {
            const text = span.textContent.trim();
            if (/^(強い買い|買い|中立|売り|強い売り|Strong Buy|Buy|Neutral|Sell|Strong Sell)$/i.test(text)) {
                // 「サマリー」が近くにあるか確認
                const parent = span.closest('div');
                if (parent && parent.textContent.includes('サマリー')) {
                    console.log('[TradingView Monitor] 方法4でサマリー発見:', text);
                    return text;
                }
            }
        }
        
        console.log('[TradingView Monitor] サマリーが見つかりません');
        return null;
    }
    
    // 変更をチェック
    function checkForChanges() {
        if (isAutoClicking) {
            console.log('[TradingView Monitor] 自動クリック中のためスキップ');
            return;
        }
        
        try {
            const currentSummary = getTechnicalSummary();
            if (!currentSummary) {
                console.log('[TradingView Monitor] サマリーが取得できません');
                return;
            }
            
            const storedSummary = localStorage.getItem(STORAGE_KEY);
            
            console.log('[TradingView Monitor] 現在:', currentSummary, '前回:', storedSummary);
            
            if (storedSummary !== currentSummary) {
                localStorage.setItem(STORAGE_KEY, currentSummary);
                if (storedSummary !== null) {
                    console.log('[TradingView Monitor] 変更検知! 通知します');
                    notifyChange(currentSummary);
                } else {
                    console.log('[TradingView Monitor] 初回読み込み、通知しません');
                }
            }
        } catch (e) {
            console.error('[TradingView Monitor] エラー:', e);
        }
    }

    // 時間足ボタンをクリック
    function clickTimeframeButton() {
        console.log('[TradingView Monitor] 時間足ボタンをクリック試行');
        
        // 時間足ボタンのセレクタ
        const timeframeButtons = document.querySelectorAll(
            'button[data-value="5"], button[data-value="15"], button[data-value="60"], ' +
            'button[data-value="240"], button[data-value="1D"], button[data-value="1W"], button[data-value="1M"], ' +
            '#\\35 m, #\\31 h, #\\31 5m, #\\34 h, #\\31 D, #\\31 W, #\\31 M'
        );
        
        if (timeframeButtons.length > 0) {
            isAutoClicking = true;
            const randomIndex = Math.floor(Math.random() * timeframeButtons.length);
            const button = timeframeButtons[randomIndex];
            
            console.log('[TradingView Monitor] ボタンクリック:', button);
            button.click();
            
            setTimeout(() => {
                isAutoClicking = false;
                checkForChanges();
            }, 2000);
        } else {
            console.log('[TradingView Monitor] 時間足ボタンが見つかりません');
            checkForChanges();
        }
    }

    // DOM監視開始
    function startMonitoring() {
        console.log('[TradingView Monitor] DOM監視開始');
        
        const targetElement = document.querySelector('main') || document.body;
        
        const observer = new MutationObserver((mutations) => {
            if (isAutoClicking) return;
            
            if (!checkForChanges.timeout) {
                checkForChanges.timeout = true;
                setTimeout(() => {
                    checkForChanges();
                    checkForChanges.timeout = false;
                }, 500);
            }
        });
        
        observer.observe(targetElement, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }
    
    // 通知の許可をリクエスト
    function requestNotificationPermission() {
        if (Notification.permission === 'default') {
            console.log('[TradingView Monitor] 通知許可をリクエスト');
            Notification.requestPermission().then(permission => {
                console.log('[TradingView Monitor] 通知許可:', permission);
            });
        } else {
            console.log('[TradingView Monitor] 通知許可状態:', Notification.permission);
        }
    }

    // 初期化
    function init() {
        console.log('[TradingView Monitor] 初期化開始');
        requestNotificationPermission();
        
        // 初回チェック
        setTimeout(() => {
            checkForChanges();
            startMonitoring();
            
            // 30秒ごとに時間足ボタンをクリック
            setInterval(clickTimeframeButton, 30000);
            
            console.log('[TradingView Monitor] 監視開始完了');
        }, 3000);
    }

    // ページ読み込み後に開始
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
