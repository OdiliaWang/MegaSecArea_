// get colors array from the string
function getChartColorsArray(chartId) {
    if (document.getElementById(chartId) !== null) {
        var colors = document.getElementById(chartId).getAttribute("data-colors");
        colors = JSON.parse(colors);
        return colors.map(function (value) {
            var newValue = value.replace(" ", "");
            if (newValue.indexOf(",") === -1) {
                var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
                if (color) return color; else return newValue;;
            } else {
                var val = value.split(',');
                if(val.length == 2){
                    var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                    rgbaColor = "rgba("+rgbaColor+","+val[1]+")";
                    return rgbaColor;
                } else {
                    return newValue;
                }
            }
        });
    }
}



// pie chart -dashboard
var isdoughnutchart = document.getElementById('doughnut');
doughnutChartColors =  getChartColorsArray('doughnut');
    if(doughnutChartColors){
    var lineChart = new Chart(isdoughnutchart, {
        type: 'doughnut',
        data: {
            labels: [
                "0061",
                "2330",
                "0056",
                "00679B",
                "9904"
            ],
            datasets: [
                {
                    data: [42, 20, 18, 8 , 4],
                    backgroundColor: doughnutChartColors,
                    hoverBackgroundColor: doughnutChartColors,
                    hoverBorderColor: doughnutChartColors
                }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'none',
                    labels: {
                        font: {
                            family: 'Poppins',
                        },
                    }
                },
            }
        }
    });
}