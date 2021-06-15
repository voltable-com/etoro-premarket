browser.contextMenus.create({
    id: "show-premarket-stock-value",
    title: browser.i18n.getMessage("menuPremarket"),
    documentUrlPatterns: ["*://www.etoro.com/*"],
    contexts: ["link"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "show-premarket-stock-value") {
        // Examples: text and HTML to be copied.
        let link = info.linkUrl;        
        link = link.replace("https://www.etoro.com/markets/", "");
        link = link.replace("https://www.etoro.com/portfolio/", "");
        link = link.replace(/https:\/\/www\.etoro\.com\/people\/.+\/portfolio\//g, "");
        link = link.replace(/https:\/\/www\.etoro\.com\/copyportfolios\/.+\/portfolio\//g, "");
        let code = link.split('/')[0];
        let codes = code.split('.');
        if(codes.length > 1) {
          code = codes[0];
        }

        const marketwatch = "https://www.marketwatch.com/investing/stock/" + escapeHTML(code);
        
        browser.tabs.create({"url": marketwatch});

    }
});


const selector = "[data-etoro-automation-id=orders-table-body-cell-action-market-name]";
const selector1 = "i-portfolio-table-inner-name-symbol"

var jsInitCheck = setInterval (check_after_loading, 300);

function check_after_loading () {
    let spans = window.document.querySelectorAll(selector);
    if (spans.length > 0) {
        for(let i = 0; i < spans.length; i++) {
            let s = spans[i];
            if(s.getElementsByTagName('a').length <= 0) {
                let a = window.document.createElement('a');
                a.href = 'https://www.etoro.com/markets/' + s.innerText;
                a.innerText = s.innerText;
                s.innerText = "";
                s.appendChild(a);
            }

        }

    }

    let divs = window.document.getElementsByClassName(selector1);
    if (divs.length > 0) {
        for(let i = 0; i < divs.length; i++) {
            let d = divs[i];
            if(d.getElementsByTagName('a').length <= 0) {
                let codeText = d.innerText;
                let code = codeText.replace('BUY ', '').replace('SELL ', '');
                let a = window.document.createElement('a');
                a.href = 'https://www.etoro.com/markets/' + code;
                a.innerText = codeText;
                d.innerText = "";
                d.appendChild(a);
            }

        }

    }
}

// https://gist.github.com/Rob--W/ec23b9d6db9e56b7e4563f1544e0d546
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
