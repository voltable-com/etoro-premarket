const selector = "[data-etoro-automation-id=orders-table-body-cell-action-market-name]";
const selector1 = "i-portfolio-table-inner-name-symbol"
const selector2 = 'table-first-name ng-star-inserted'
const selector4 = 'execution-head-title-top ng-binding'


let jsInitCheck = setInterval(check_after_loading, 300);

function check_after_loading() {
    add_links_for_page(selector);
    add_links_for_page(selector4);
    // for history page
    add_links_for_history_page(selector1);
    // for history page - for other peoples
    add_links_for_history_page(selector2);
}

function add_links_for_page(selector) {
    let spans = document.querySelectorAll(selector);
    if (spans.length > 0) {
        for (let i = 0; i < spans.length; i++) {
            let s = spans[i];
            if (s.getElementsByTagName('a').length <= 0) {
                let a = document.createElement('a');
                a.href = 'https://www.etoro.com/markets/' + escapeHTML(s.innerText);
                a.innerText = s.innerText;
                s.innerText = "";
                s.appendChild(a);
            }
        }
    }
}

function add_links_for_history_page(selector) {
    let divs = document.getElementsByClassName(selector);
    if (divs.length > 0) {
        for (let i = 0; i < divs.length; i++) {
            let d = divs[i];
            if (d.getElementsByTagName('a').length <= 0) {
                let codeText = d.innerText;
                let code = codeText
                    .replace('BUY ', '')
                    .replace('SELL ', '');
                let a = document.createElement('a');
                a.href = 'https://www.etoro.com/markets/' + escapeHTML(code);
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
