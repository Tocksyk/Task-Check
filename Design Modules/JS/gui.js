var Chart = require('../../node_modules/chart.js/dist/Chart');
var days = Array();
var taskcomplete = Array();

const tab = function graphs () {
    var ctx = document.getElementById('mychart').getContext('2d');
    db.collection('Work Hours').get().then((snapshot) =>{
        snapshot.docs.forEach(doc => {
            days.push(doc.id),
            taskcomplete.push(doc.data().Tcomplete)
        });
    });
    setTimeout(() => {
        barset =1;
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label:'Task Completed',
                    data: taskcomplete
                }],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                maxBarThickness: 8,
                minBarLength: 2
            }         
        });
        days = [];
        taskcomplete = [];
    }, 3000);
    
}

module.exports = {
    tab
}