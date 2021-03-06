let Positions = (function () {
    function render(node) {
        let nodes = valueNodes(),
            {
                absTotal,
                posTotal,
                total,
                values
            } = currentValues(nodes),
            pending = pendingValues(),
            settledTotal = total + pending.total;
        console.log(
            'Fidelity+: ' +
            'current total: $' + (total / 100).toFixed(2),
            ', settled total: $' + (settledTotal / 100).toFixed(2),
            ', absolute total: $' + (absTotal / 100).toFixed(2),
            ', positive total: $' + (absTotal / 100).toFixed(2),
            ', pending: $' + (pending.total / 100).toFixed(2),
        );
        headerNodes().forEach(function (th) {
            th.insertAdjacentHTML(
                'afterend',
                '<th><span class="magicgrid--stacked-data-title"> % Assets </span></th>'
            );
        });

        nodes.forEach(function (td, i) {
            td.insertAdjacentHTML(
                'afterend',
                '<td>' + (values[i] / absTotal * 100).toFixed(2) + '% </td>'
            );
        });
    }

    function currentValues(nodes = valueNodes()) {
        let values = [],
            absTotal = 0,
            posTotal = 0,
            total = 0;
        for (let node of nodes) {
            let value = Utils.parseMoney(node.innerText);
            total += value;
            if (value >= 0) {
                absTotal += value;
                posTotal += value;
            } else {
                absTotal -= value;
            }
            values.push(value);
        }
        return {
            absTotal: absTotal,
            posTotal: posTotal,
            total: total,
            values: values,
        }
    }

    function pendingValues(nodes = pendingActivityNodes()) {
        let values = [],
            total = 0;
        for (let node of nodes) {
            let value = Utils.parseMoney(node.innerText.match(/You have (.+) in pending activity/)[1])
            total += value;
            values.push(value);
        }

        return {
            values: values,
            total: total,
        };
    }

    function headerNodes() {
        return document.querySelectorAll("#display-layout table thead th:nth-child(5)");
    }

    function valueNodes() {
        return document.querySelectorAll("#display-layout tbody tr.normal-row td:nth-child(5)");
    }

    function pendingActivityNodes() {
        return document.querySelectorAll('tr[class=magicgrid--total-row] .magicgrid--total-pending-activity-link');
    }

    return {
        render: render,
        currentValues: currentValues
    }
})();