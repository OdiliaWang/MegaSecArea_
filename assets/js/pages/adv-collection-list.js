var url = "assets/json/";
var alladvanceList = '';

var prevButtonA = document.getElementById('page-prevA');
var nextButtonA = document.getElementById('page-nextA');

// configuration variables
var currentPageA = 1;
var itemsPerPageA = 5;

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
getJSON("advance-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        alladvanceList = data;
        loadAdvanceData(alladvanceList, currentPageA);
        paginationEventsA();
    }
});

function loadAdvanceData(datas, page) {
    var pagesA = Math.ceil(datas.length / itemsPerPageA)
    if (page < 1) page = 1
    if (page > pagesA) page = pagesA
    document.querySelector("#advance-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPageA; i < (page * itemsPerPageA) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#advance-card").innerHTML += '<div class="card p-0">\
            <div class="card-body p-3">\
                <div class="d-flex">\
                    <div class="avatar-xs">\
                        <div class="avatar-title bg-info rounded-circle align-bottom fs-18">\
                            <i class="bx bx-receipt"></i>\
                        </div>\
                    </div>\
                    <div class="flex-grow-1 ms-2">\
                        <h4 class="mb-1">預收金額</h4>\
                        <h5 class="text-muted mb-0">NTD '+ datas[i].chargeAmount + '</h5>\
                    </div>\
                    <div class="d-flex gap-4 mt-0 mx-auto">\
                        <div>' + isStatus(datas[i].type) + '</div>\
                    </div>\
                </div>\
            </div>\
            <div class="card-body border-top border-top-dashed p-3">\
                <h6 class="mb-0">預收日期'+ datas[i].orderDate + '<small class="text-muted ms-1">'+ datas[i].orderTime + '</small></h6>\
            </div>\
        </div>';
        }
    }
    selectedPageA();
    currentPageA == 1 ? prevButtonA.parentNode.classList.add('disabled') : prevButtonA.parentNode.classList.remove('disabled');
    currentPageA == pagesA ? nextButtonA.parentNode.classList.add('disabled') : nextButtonA.parentNode.classList.remove('disabled');
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


function selectedPageA() {
    var pagenumLinkA = document.getElementById('page-numA').getElementsByClassName('clickPageNumber');
    for (var i = 0; i < pagenumLinkA.length; i++) {
        if (i == currentPageA - 1) {
            pagenumLinkA[i].parentNode.classList.add("active");
        } else {
            pagenumLinkA[i].parentNode.classList.remove("active");
        }
    }
};


// paginationEvents
function paginationEventsA() {
    var numPages = function numPages() {
        return Math.ceil(alladvanceList.length / itemsPerPageA);
    };

    function clickPageA() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPageA = e.target.textContent;
                loadAdvanceData(alladvanceList, currentPageA);
            }
        });
    };

    function pageNumbersA() {
        var pageNumber = document.getElementById('page-numA');
        pageNumber.innerHTML = "";
        // for each page
        for (var i = 1; i < numPages() + 1; i++) {
            pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
        }
    }

    prevButtonA.addEventListener('click', function () {
        if (currentPageA > 1) {
            currentPageA--;
            loadAdvanceData(alladvanceList, currentPageA);
        }
    });

    nextButtonA.addEventListener('click', function () {
        if (currentPageA < numPages()) {
            currentPageA++;
            loadAdvanceData(alladvanceList, currentPageA);
        }
    });

    pageNumbersA();
    clickPageA();
    selectedPageA();
}
