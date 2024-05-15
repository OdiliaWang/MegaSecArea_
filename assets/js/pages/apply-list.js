var url = "assets/json/";
var allApplyList = '';

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
getJSON("apply-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allApplyList = data;
        loadApplyListData(allApplyList, currentPageA);
        paginationEventsA();
    }
});

function loadApplyListData(datas, page) {
    var pagesA = Math.ceil(datas.length / itemsPerPageA)
    if (page < 1) page = 1
    if (page > pagesA) page = pagesA
    document.querySelector("#apply-list").innerHTML = '';
    for (var i = (page - 1) * itemsPerPageA; i < (page * itemsPerPageA) && i < datas.length; i++) {
        if (datas[i]) {
                document.querySelector("#apply-list").innerHTML += '<div class="col-xl-12 col-md-12">\
                <div class="card">\
                    <div class="card-body">\
                        <div class="d-lg-flex justify-content-between align-items-center">\
                            <div class="flex-shrink-0">\
                                <h3 class="mb-1">'+ datas[i].stockName + '</h3>\
                                <p class="text-muted mb-0">'+ datas[i].stockNo + '</p>\
                            </div>\
                            <div class="d-lg-flex align-items-center">\
                                <div class="ms-lg-3 my-3 my-lg-0">\
                                    <h5 class="mb-2">'+ datas[i].nowStock[0] + '庫存 </h5></a>\
                                    <p class="text-danger mb-0">'+ datas[i].nowStock[1] + '(張)</p>\
                                </div>\
                                <div class="ms-lg-3 my-3 my-lg-0">\
                                    <button type="button" class="btn btn-secondary w-100 nexttab" data-nexttab="pills-info-desc-tab">申請設定</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        }
    }
    selectedPageA();
    currentPageA == 1 ? prevButtonA.parentNode.classList.add('disabled') : prevButtonA.parentNode.classList.remove('disabled');
    currentPageA == pagesA ? nextButtonA.parentNode.classList.add('disabled') : nextButtonA.parentNode.classList.remove('disabled');
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
        return Math.ceil(allApplyList.length / itemsPerPageA);
    };

    function clickPageA() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPageA = e.target.textContent;
                loadApplyListData(allApplyList, currentPageA);
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
            loadApplyListData(allApplyList, currentPageA);
        }
    });

    nextButtonA.addEventListener('click', function () {
        if (currentPageA < numPages()) {
            currentPageA++;
            loadApplyListData(allApplyList, currentPageA);
        }
    });

    pageNumbersA();
    clickPageA();
    selectedPageA();
}
