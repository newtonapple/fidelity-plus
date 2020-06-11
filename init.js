let routes = new Routes([
    new PathRoute('/', function () {
        console.log('Fidelity+: brought to you by David Dai');
    }),

    // note that 'table.magicgrid--table' is only used as a signal for positions being replace after AJAX call.
    // Substree changes are not detected for some reasons.
    new ChangeRoute('/portfolio#positions', 'table.magicgrid--table', Positions.render),
    // new ChangeRoute('/portfolio#activity', 'table:not([class]):not([style])', Activity.render),
    new ChangeRoute('/portfolio#activity', 'div.activity--history-footer', Activity.render),
    // new ChangeRoute('/portfolio#activity', 'iframe#walkme-proxy-iframe', Activity.render),

]);
routes.init();