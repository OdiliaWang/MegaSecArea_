var url = "assets/json/";
var allrestockList = '';

var prevButtonB = document.getElementById('page-prevB');
var nextButtonB = document.getElementById('page-nextB');

// configuration variables
var currentPageB = 1;
var itemsPerPageB = 5;

// getJSON
var getJSON = function (jsonurl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + jsonurl, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

// get json
getJSON("adv-restock-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allrestockList = data;
        loadreStockData(allrestockList, currentPageB);
        paginationEventsB();
    }
});

function loadreStockData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPageB)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#restock-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPageB; i < (page * itemsPerPageB) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#restock-card").innerHTML += '<div class="card p-0">\
            <div class="card-body p-3">\
                <div class="d-flex">\
                    <div class="avatar-xs">\
                        <div class="avatar-title bg-primary rounded-circle align-bottom fs-18">\
                            <i class="bx bx-receipt"></i>\
                        </div>\
                    </div>\
                    <div class="flex-grow-1 ms-2">\
                        <h4 class="mb-1">預收股票</h4>\
                        <p class="mb-0">股票代號 / 預收股數</p>\
                        <h5 class="text-muted mb-0">'+ datas[i].stockNo[0] + ' '+ datas[i].stockNo[1] + ' / '+ datas[i].amount + '</h5>\
                    </div>\
                    <div class="d-flex gap-4 mt-0 mx-auto">\
                        <div>' + isStatus(datas[i].type) + '</div>\
                    </div>\
                </div>\
            </div>\
            <div class="card-body border-top border-top-dashed p-3">\
                <h6 class="mb-0">預收日期'+ datas[i].advDate + '<small class="text-muted ms-1">'+ datas[i].dataTime + '</small></h6>\
            </div>\
        </div>';
        }
    }
    selectedPageB();
    currentPageB == 1 ? prevButtonB.parentNode.classList.add('disabled') : prevButtonB.parentNode.classList.remove('disabled');
    currentPageB == pages ? nextButtonB.parentNode.classList.add('disabled') : nextButtonB.parentNode.classList.remove('disabled');
}


function isStatus(val) {
    switch (val) {
        case "Success":
            return ('<span class="badge badge-success fs-5">' + "圈存成功" + "</span>");
        case "Upload":
            return ('<span class="badge badge-warning fs-5">' + "失敗/上傳中" + "</span>");
        case "Failed":
        return ('<span class="badge badge-primary fs-5">' + "圈存失敗" + "</span>");
    }
}


function selectedPageB() {
    var pagenumLink = document.getElementById('page-numB').getElementsByClassName('clickPageNumber');
    for (var i = 0; i < pagenumLink.length; i++) {
        if (i == currentPageB - 1) {
            pagenumLink[i].parentNode.classList.add("active");
        } else {
            pagenumLink[i].parentNode.classList.remove("active");
        }
    }
};


// paginationEvents
function paginationEventsB() {
    var numPages = function numPages() {
        return Math.ceil(allrestockList.length / itemsPerPageB);
    };

    function clickPageB() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPageB = e.target.textContent;
                loadreStockData(allrestockList, currentPageB);
            }
        });
    };

    function pageNumbersB() {
        var pageNumber = document.getElementById('page-numB');
        pageNumber.innerHTML = "";
        // for each page
        for (var i = 1; i < numPages() + 1; i++) {
            pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
        }
    }

    prevButtonB.addEventListener('click', function () {
        if (currentPageB > 1) {
            currentPageB--;
            loadreStockData(allrestockList, currentPageB);
        }
    });

    nextButtonB.addEventListener('click', function () {
        if (currentPageB < numPages()) {
            currentPageB++;
            loadreStockData(allrestockList, currentPageB);
        }
    });

    pageNumbersB();
    clickPageB();
    selectedPageB();
}
