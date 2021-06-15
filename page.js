const selector = "[data-etoro-automation-id=orders-table-body-cell-action-market-name]";
const selector1 = "i-portfolio-table-inner-name-symbol"

let jsInitCheck = setInterval(check_after_loading, 300);

function check_after_loading() {
    let spans = document.querySelectorAll(selector);
    console.log(spans.length);
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

    let divs = document.getElementsByClassName(selector1);
    console.log(divs.length);
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
