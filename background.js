browser.contextMenus.create({
    id: "show-premarket-stock-value",
    title: browser.i18n.getMessage("menuPremarket"),
    documentUrlPatterns: ["*://www.etoro.com/*"],
    contexts: ["link"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "show-premarket-stock-value") {
        let link = getLink(info.linkUrl);
        let code = getCode(link);
        let marketwatch = "https://www.marketwatch.com/investing/stock/" + escapeHTML(code[0]);
        if(code[1] !== '') {
            marketwatch = marketwatch + '?countryCode=' + code[1]
        }

        browser.tabs.create({"url": marketwatch});

    }
});

// https://gist.github.com/Rob--W/ec23b9d6db9e56b7e4563f1544e0d546
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


function getLink(link) {
    link = link.replace("https://www.etoro.com/markets/", "");
    link = link.replace("https://www.etoro.com/portfolio/", "");
    link = link.replace(/https:\/\/www\.etoro\.com\/people\/.+\/portfolio\//g, "");
    link = link.replace(/https:\/\/www\.etoro\.com\/copyportfolios\/.+\/portfolio\//g, "");
    link = link.replace(/https:\/\/www\.etoro\.com\/people\/.+\/portfolio\/history\//g, "");

    return link;
}

function getCode(link) {
    const validMarketSuffixes = [
        'us', 'de', 'hk', 'st',
        'nv', 'l', 'pa', 'mc',
        'mi', 'zu', 'ol', 'co',
        'he', 'lsb', 'br'
    ];
    let country = '';
    let code = link.split('/')[0];
    let codes = code.split('.');
    if (codes.length > 1) {
        let suffix = codes[codes.length - 1];
        if (validMarketSuffixes.indexOf(suffix) != -1) {
            let lastIndex = code.lastIndexOf('.' +  suffix);
            code = code.substring(0, lastIndex);
            let codeInt = parseInt(codes[0]);
            if (!isNaN(codeInt)) {
                code = '' + codeInt
            }

            if(suffix === 'l') {
                country = 'UK';
            }
            if(suffix === 'hk') {
                country = 'hk';
            }
        }
    }

    code = code.replace('-', '.');

    return [code, country];
}