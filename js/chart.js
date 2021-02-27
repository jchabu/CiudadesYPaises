import { tiemposLinea, paisesCircular } from './main.js';

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChartCircular);
google.charts.setOnLoadCallback(drawChartLinear);

export function drawChartCircular() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Example');
    data.addColumn('number', 'Example');
    data.addRows(paisesCircular);
    var options = {
        title: 'Ocurrencias de Paises',
        height: 350
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

export function drawChartLinear() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Ronda');
    data.addColumn('number', 'Tiempo');
    data.addRows(tiemposLinea);

    var options = {
        height: 350,
        title: 'Tiempo por partida',
        hAxis: {
            title: 'Ronda'
          },
          vAxis: {
            title: 'Tiempo'
          }
    };

    var chart = new google.visualization.LineChart(document.getElementById('linechart'));
    chart.draw(data, options);
}