var url = "assets/json/";
var alllendingList = '';

var prevButtonD = document.getElementById('page-prevD');
var nextButtonD = document.getElementById('page-nextD');

// configuration variables
var currentPageD = 1;
var itemsPerPageD = 5;

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
getJSON("adv-lending-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        alllendingList = data;
        loadlendingData(alllendingList, currentPageD);
        paginationEventsD();
    }
});

function loadlendingData(datas, page) {
    var pagesD = Math.ceil(datas.length / itemsPerPageD)
    if (page < 1) page = 1
    if (page > pagesD) page = pagesD
    document.querySelector("#lending-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPageD; i < (page * itemsPerPageD) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#lending-card").innerHTML += '<div class="card p-0">\
            <div class="card-body p-3">\
                <div class="d-flex">\
                    <div class="avatar-xs">\
                        <div class="avatar-title bg-danger rounded-circle align-bottom fs-18">\
                            <i class="bx bx-receipt"></i>\
                        </div>\
                    </div>\
                    <div class="flex-grow-1 ms-2">\
                        <h4 class="mb-1">借券圈存</h4>\
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
    selectedPageD();
    currentPageD == 1 ? prevButtonD.parentNode.classList.add('disabled') : prevButtonD.parentNode.classList.remove('disabled');
    currentPageD == pagesD ? nextButtonD.parentNode.classList.add('disabled') : nextButtonD.parentNode.classList.remove('disabled');
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


function selectedPageD() {
    var pagenumLinkD = document.getElementById('page-numD').getElementsByClassName('clickPageNumber');
    for (var i = 0; i < pagenumLinkD.length; i++) {
        if (i == currentPageD - 1) {
            pagenumLinkD[i].parentNode.classList.add("active");
        } else {
            pagenumLinkD[i].parentNode.classList.remove("active");
        }
    }
};


// paginationEvents
function paginationEventsD() {
    var numPages = function numPages() {
        return Math.ceil(alllendingList.length / itemsPerPageD);
    };

    function clickPageD() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPageD = e.target.textContent;
                loadlendingData(alllendingList, currentPageD);
            }
        });
    };

    function pageNumbersD() {
        var pageNumber = document.getElementById('page-numD');
        pageNumber.innerHTML = "";
        // for each page
        for (var i = 1; i < numPages() + 1; i++) {
            pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
        }
    }

    prevButtonD.addEventListener('click', function () {
        if (currentPageD > 1) {
            currentPageD--;
            loadlendingData(alllendingList, currentPageD);
        }
    });

    nextButtonD.addEventListener('click', function () {
        if (currentPageD < numPages()) {
            currentPageD++;
            loadlendingData(alllendingList, currentPageD);
        }
    });

    pageNumbersD();
    clickPageD();
    selectedPageD();
}
