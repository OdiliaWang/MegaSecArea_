const unlockBtn = document.getElementById('unlockBtn');
    const overlay = document.getElementById('overlay');
    const signBtn = document.getElementById('signBtn');
    const cardContent = document.getElementById('cardContent');

    unlockBtn.addEventListener('click', () => {
        overlay.style.display = 'block';
    });

    signBtn.addEventListener('click', () => {
        // 在這裡處理簽署契約的相關邏輯，可以是彈出對話框、顯示表單等
        // 這裡只是一個示例，您需要根據實際情況來實現相關功能
        alert('契約已簽署，卡片已解鎖！');
        overlay.style.display = 'none';
        cardContent.innerHTML = `
        <div class="card-header d-flex align-items-center">\
            <h4 class="mb-0 flex-grow-1 text-start">約定庫存總覽</h4>\
            <div class="flex-shrink-0">\
                <a href="investock-valid-list.html" class="btn btn-outline-secondary mega-act" id="d-layout">查看明細</a>\
                <a href="investock-valid-list.html" class="btn btn-outline-secondary btn-icon" id="m-layout"><i class="fa-solid fa-up-right-from-square"></i></a>\
            </div>\
        </div>\
        <div class="card-body p-0">\
            <div class="row align-items-center">\
                <div class="col-xl-5 col-md-12 text-center mt-3 mb-3">\
                    <canvas id="doughnut" class="chartjs-chart" data-colors='["#DE6269", "#CB954B", "#FFE0E0", "#755E98", "#CFC1FF"]'>\
                        </canvas>\
                </div>\
                <div class="col-xl-7 col-md-12 text-start mt-3">\
                    <ul class="list list-group list-group-flush mb-0">\
                        <li class="list-group-item">\
                            <div class="d-flex">\
                                <div class="flex-grow-1 ms-2">\
                                    <p class="h6">\
                                        <i class="bx bxs-circle me-2 chart-first"></i>0061元大寶滬深</p>\
                                </div>\
                                <div class="flex-shrink-0 text-end">\
                                    <h6 class="mb-1">庫存股數 200張</h6>\
                                </div>\
                            </div>\
                        </li>\
                        <li class="list-group-item">\
                            <div class="d-flex">\
                                <div class="flex-grow-1 ms-2">\
                                    <p class="h6">\
                                        <i class="bx bxs-circle me-2 chart-second"></i>2330台積電</p>\
                                </div>\
                                <div class="flex-shrink-0 text-end">\
                                    <h6 class="mb-1">庫存股數 100張</h6>\
                                </div>\
                            </div>\
                        </li>\
                        <li class="list-group-item">\
                            <div class="d-flex">\
                                <div class="flex-grow-1 ms-2">\
                                    <p class="h6">\
                                        <i class="bx bxs-circle me-2 chart-third"></i>0056元大高股息</p>\
                                </div>\
                                <div class="flex-shrink-0 text-end">\
                                    <h6 class="mb-1">庫存股數 30張</h6>\
                                </div>\
                            </div>\
                        </li>\
                        <li class="list-group-item">\
                            <div class="d-flex">\
                                <div class="flex-grow-1 ms-2">\
                                    <p class="h6">\
                                        <i class="bx bxs-circle me-2 chart-forth"></i>00679B元大美債20年</p>\
                                </div>\
                                <div class="flex-shrink-0 text-end">\
                                    <h6 class="mb-1">庫存股數 15張</h6>\
                                </div>\
                            </div>\
                        </li>\
                        <li class="list-group-item">\
                            <div class="d-flex">\
                                <div class="flex-grow-1 ms-2">\
                                    <p class="h6">\
                                        <i class="bx bxs-circle me-2 chart-fifth"></i>9904寶成</p>\
                                </div>\
                                <div class="flex-shrink-0 text-end">\
                                    <h6 class="mb-1">庫存股數 2張</h6>\
                                </div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        </div>`;
        
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
    });










