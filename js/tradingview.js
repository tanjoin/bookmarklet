/*
 * TradingView テクニカルサマリー監視ブックマークレット
 * 
 * 【使い方】
 * 1. https://jp.tradingview.com/symbols/EURJPY/technicals/ を開く
 * 2. ブラウザのコンソールにこのコードを貼り付けて実行
 *    または、下記のブックマークレット用コードをブックマークに登録して実行
 * 3. 初回実行時に通知の許可を求められるので「許可」を選択
 * 4. テクニカルサマリーが変更されると、音と共にブラウザ通知が表示される
 * 
 * 【通知内容】
 * - 🟢📈 強い買い
 * - 🟢 買い
 * - ⚪ 中立
 * - 🔴 売り
 * - 🔴📉 強い売り
 * 
 * 【監視方法】
 * - リアルタイム: DOM変更を検知して即座に通知
 * - 定期チェック: 1分ごとにバックアップチェック
 * 
 * 【停止方法】
 * ページをリロードすると監視が停止します
 */

/*
 * ブックマークレット用コード（ワンライナー）:
 * 以下のコードをコピーして、ブラウザのブックマークのURLに貼り付けてください
 * 
javascript:(function(){'use strict';const STORAGE_KEY='eurjpy_technicals_summary';function playBeep(){try{const audioContext=new(window.AudioContext||window.webkitAudioContext)();const oscillator=audioContext.createOscillator();const gainNode=audioContext.createGain();oscillator.connect(gainNode);gainNode.connect(audioContext.destination);oscillator.frequency.value=800;oscillator.type='sine';gainNode.gain.setValueAtTime(0.3,audioContext.currentTime);gainNode.gain.exponentialRampToValueAtTime(0.01,audioContext.currentTime+0.5);oscillator.start(audioContext.currentTime);oscillator.stop(audioContext.currentTime+0.5);}catch(e){console.error('音の再生に失敗しました:',e);}}function analyzeSummary(summary){const summaryLower=summary.toLowerCase();if(summaryLower.includes('強い買い')||summaryLower.includes('strong buy')){return{action:'強い買い',icon:'🟢📈'};}else if(summaryLower.includes('買い')||summaryLower==='buy'){return{action:'買い',icon:'🟢'};}else if(summaryLower.includes('中立')||summaryLower==='neutral'){return{action:'中立',icon:'⚪'};}else if(summaryLower.includes('強い売り')||summaryLower.includes('strong sell')){return{action:'強い売り',icon:'🔴📉'};}else if(summaryLower.includes('売り')||summaryLower==='sell'){return{action:'売り',icon:'🔴'};}return{action:summary,icon:'❓'};}function notifyChange(newSummary){playBeep();const analysis=analyzeSummary(newSummary);if(Notification.permission==='granted'){showNotification(analysis);}else if(Notification.permission!=='denied'){Notification.requestPermission().then(permission=>{if(permission==='granted'){showNotification(analysis);}});}}function showNotification(analysis){const notification=new Notification('EURJPY テクニカルサマリー変更',{body:`${analysis.icon} ${analysis.action}\n\n判断: ${analysis.action}`,icon:'https://www.tradingview.com/favicon.ico',requireInteraction:true,tag:'tradingview-alert'});notification.onclick=function(){window.focus();notification.close();};}function getTechnicalSummary(){const selectors=['.tv-symbol-summary__value--technical','[data-name="technical-summary"]','.speedometerSignal-pyzN93TW','[class*="speedometerSignal"]','[class*="technical"]',];for(const selector of selectors){const element=document.querySelector(selector);if(element){const text=element.textContent.trim();if(text){return text;}}}const allElements=document.querySelectorAll('span, div');for(const el of allElements){const text=el.textContent.trim();if(/^(強い買い|買い|中立|売り|強い売り|Strong Buy|Buy|Neutral|Sell|Strong Sell)$/i.test(text)){console.log('テキストマッチで取得:',text);return text;}}console.warn('テクニカルサマリーの要素が見つかりませんでした');return null;}function checkForChanges(){try{const currentSummary=getTechnicalSummary();if(!currentSummary){console.log('サマリーが取得できませんでした。ページが完全に読み込まれていない可能性があります。');return;}const storedSummary=localStorage.getItem(STORAGE_KEY);if(storedSummary!==currentSummary){console.log(`サマリーの変更を検出: ${storedSummary} → ${currentSummary}`);localStorage.setItem(STORAGE_KEY,currentSummary);if(storedSummary!==null){notifyChange(currentSummary);}else{console.log('初回読み込み完了。現在のサマリー:',currentSummary);}}}catch(e){console.error('チェック中にエラーが発生しました:',e);}}function startMonitoring(){const observer=new MutationObserver(()=>{checkForChanges();});observer.observe(document.body,{childList:true,subtree:true,characterData:true});console.log('TradingView監視を開始しました');}function requestNotificationPermission(){if(Notification.permission==='default'){Notification.requestPermission().then(permission=>{console.log('通知の許可:',permission);});}}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{requestNotificationPermission();checkForChanges();startMonitoring();},2000);});}else{setTimeout(()=>{requestNotificationPermission();checkForChanges();startMonitoring();},2000);}setInterval(checkForChanges,60000);})();
 */

(function() {
    'use strict';
    
    // 保存するためのキー
    const STORAGE_KEY = 'eurjpy_technicals_summary';
    
    // Web Audio APIを使って音を生成する関数
    function playBeep() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800; // 周波数 (Hz)
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.error('音の再生に失敗しました:', e);
        }
    }

    // サマリーを分析して売買判断を返す関数
    function analyzeSummary(summary) {
        const summaryLower = summary.toLowerCase();
        if (summaryLower.includes('強い買い') || summaryLower.includes('strong buy')) {
            return { action: '強い買い', icon: '🟢📈' };
        } else if (summaryLower.includes('買い') || summaryLower === 'buy') {
            return { action: '買い', icon: '🟢' };
        } else if (summaryLower.includes('中立') || summaryLower === 'neutral') {
            return { action: '中立', icon: '⚪' };
        } else if (summaryLower.includes('強い売り') || summaryLower.includes('strong sell')) {
            return { action: '強い売り', icon: '🔴📉' };
        } else if (summaryLower.includes('売り') || summaryLower === 'sell') {
            return { action: '売り', icon: '🔴' };
        }
        return { action: summary, icon: '❓' };
    }

    // 通知を表示する関数
    function notifyChange(newSummary) {
        playBeep();
        
        const analysis = analyzeSummary(newSummary);
        
        // 通知の許可をリクエスト
        if (Notification.permission === 'granted') {
            showNotification(analysis);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showNotification(analysis);
                }
            });
        }
    }
    
    // ブラウザ通知を表示
    function showNotification(analysis) {
        const notification = new Notification('EURJPY テクニカルサマリー変更', {
            body: `${analysis.icon} ${analysis.action}\n\n判断: ${analysis.action}`,
            icon: 'https://www.tradingview.com/favicon.ico',
            requireInteraction: true, // ユーザーが閉じるまで表示
            tag: 'tradingview-alert' // 同じタグの通知は置き換える
        });
        
        notification.onclick = function() {
            window.focus();
            notification.close();
        };
    }

    // テクニカルサマリーを取得する関数（複数のセレクタを試す）
    function getTechnicalSummary() {
        // TradingViewの様々な可能なセレクタを試す
        const selectors = [
            '.tv-symbol-summary__value--technical',
            '[data-name="technical-summary"]',
            '.speedometerSignal-pyzN93TW',
            '[class*="speedometerSignal"]',
            '[class*="technical"]',
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                const text = element.textContent.trim();
                if (text) {
                    return text;
                }
            }
        }
        
        // フォールバック: テキストで検索
        const allElements = document.querySelectorAll('span, div');
        for (const el of allElements) {
            const text = el.textContent.trim();
            if (/^(強い買い|買い|中立|売り|強い売り|Strong Buy|Buy|Neutral|Sell|Strong Sell)$/i.test(text)) {
                console.log('テキストマッチで取得:', text);
                return text;
            }
        }
        
        console.warn('テクニカルサマリーの要素が見つかりませんでした');
        return null;
    }
    
    // 変更をチェックする関数
    function checkForChanges() {
        try {
            const currentSummary = getTechnicalSummary();
            if (!currentSummary) {
                console.log('サマリーが取得できませんでした。ページが完全に読み込まれていない可能性があります。');
                return;
            }
            
            const storedSummary = localStorage.getItem(STORAGE_KEY);
            
            if (storedSummary !== currentSummary) {
                console.log(`サマリーの変更を検出: ${storedSummary} → ${currentSummary}`);
                localStorage.setItem(STORAGE_KEY, currentSummary);
                if (storedSummary !== null) { // 初回読み込み時は通知しない
                    notifyChange(currentSummary);
                } else {
                    console.log('初回読み込み完了。現在のサマリー:', currentSummary);
                }
            }
        } catch (e) {
            console.error('チェック中にエラーが発生しました:', e);
        }
    }

    // MutationObserverでDOM変更を監視
    function startMonitoring() {
        const observer = new MutationObserver(() => {
            checkForChanges();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
        
        console.log('TradingView監視を開始しました');
    }
    
    // 通知の許可をリクエスト
    function requestNotificationPermission() {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                console.log('通知の許可:', permission);
            });
        }
    }

    // ページ読み込み後に開始
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                requestNotificationPermission();
                checkForChanges();
                startMonitoring();
            }, 2000); // ページが完全に読み込まれるまで待機
        });
    } else {
        setTimeout(() => {
            requestNotificationPermission();
            checkForChanges();
            startMonitoring();
        }, 2000);
    }
    
    // 定期的にもチェック（バックアップ）
    setInterval(checkForChanges, 60000); // 1分ごと
})();