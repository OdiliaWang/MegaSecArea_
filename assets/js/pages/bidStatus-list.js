// card Table
if (document.getElementById("table-card"))
    new gridjs.Grid({
        columns: [{
                name: '收購股票',
                width: '100px',
                formatter: (function (cell) {
                    return gridjs.html( ''+ cell[1] + '<small class="text-muted"> ' + cell[0] + '</small>');
                })
            },{
                name: '對價',
                width: '100px',
            }, {
                name: '對價期間',
                width: '200px',
            }, {
                name: '有效庫存(股)',
                width: '120px',
            }, {
                name: '收購專戶',
                width: '180px',
            }, {
                name: '收購股數',
                width: '100px',
            }, {
                name: '交存狀態',
                width: '120px',
                formatter: (function (cell) {
                    switch (cell) {
                        case "傳送中":
                            return gridjs.html('<span class="badge bg-info-subtle text-info fs-16">' + cell + "</span>");
                        case "已傳":
                            return gridjs.html('<span class="badge bg-danger-subtle text-danger fs-16">' + cell + "</span>");
                        case "成功":
                        return gridjs.html('<span class="badge bg-primary-subtle text-primary fs-16">' + cell + "</span>");
                    }
                })
            }
        ],
        sort: true,
        pagination: {
            limit: 5
        },
        data: [
            [["6527","明達醫"], "67.00000", ["2023/03/01"+"~"+"2023/04/10"], "1000", "9203-0596008", "1000", "傳送中"],
            [["6449","鈺邦"], "58.00000", ["2023/03/17"+"~"+"2023/04/06"], "0", "8150-2055882", "2000", "已傳"],
            [["6449","鈺邦"], "58.00000", ["2021/04/17"+"~"+"2021/05/22"], "0", "8150-2055882", "1000", "成功"],
            [["6527","明達醫"], "67.00000", ["2023/03/01"+"~"+"2023/04/10"], "1000", "9203-0596008", "1000", "傳送中"],
            [["6527","明達醫"], "67.00000", ["2023/03/01"+"~"+"2023/04/10"], "1000", "9203-0596008", "1000", "傳送中"],
            [["6449","鈺邦"], "58.00000", ["2023/03/17"+"~"+"2023/04/06"], "0", "8150-2055882", "2000", "已傳"],
            [["6449","鈺邦"], "58.00000", ["2023/03/17"+"~"+"2023/04/06"], "0", "8150-2055882", "2000", "已傳"],
        ]
    }).render(document.getElementById("table-card"));


