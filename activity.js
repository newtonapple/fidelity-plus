let Activity = (function () {
    function render(node) {
        renderOrders();
        renderHistory();
    }

    function renderOrders() {
        let ordersTable = orders();
        if ( !ordersTable ) return;
        let stats = orderStats(ordersTable);
        console.log(stats);
        ordersTable.insertAdjacentHTML(
            'beforeend',
            '<tr><td colspan=4> Total:</td> <td>' +
            Utils.fmtMoney(stats.total) +
            ' (' + stats.values.length + ' orders)</td></tr>'
        )
    }

    function orders() {
        return document.querySelector('#AccountActivityTabOrders table tbody');
    }

    function orderStats(ordersTable) {
        var total = 0;
        let values = [];
        ordersTable.querySelectorAll('td.activity--pending-amount-width div').forEach(function (node) {
            let value = Utils.parseMoney(node.innerText)
            values.push(value);
            total += value;
        });

        return {
            total: total,
            values: values,
        };
    }

    function renderHistory() {
        let historyTable = history();
        let stats = historyStats(historyTable);
        console.log(stats);
        historyTable.insertAdjacentHTML(
            'beforeend',
            '<tr><td colspan=2> Total:</td> <td>' + Utils.fmtMoney(stats.total) + '</td><td/></tr>'
        )
    }

    function history() {
        return document.querySelector('#historyExpanderContent table:not([class]) tbody');
    }

    function historyStats(historyTable) {
        var total = 0;
        let values = [];
        historyTable.querySelectorAll('td:nth-child(3)').forEach(function (node) {
            let text = node.innerText;
            if (text != '--') {
                let value = Utils.parseMoney(text);
                total += value
                values.push(value);
            }
        });

        return {
            total: total,
            values: values,
        };
    }

    return {
        render: render,
    };
})();