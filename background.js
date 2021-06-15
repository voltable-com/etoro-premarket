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
        if (codes.length > 1) {
            code = codes[0];
        }

        const marketwatch = "https://www.marketwatch.com/investing/stock/" + escapeHTML(code);

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
