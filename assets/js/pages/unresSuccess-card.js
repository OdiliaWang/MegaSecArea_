var url = "assets/json/";
var allSuccessList = '';

var prevButtonB = document.getElementById('page-prevB');
var nextButtonB = document.getElementById('page-nextB');

// configuration variables
var currentPageB = 1;
var itemsPerPageB = 6;

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
getJSON("unresSuccess-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allSuccessList = data;
        loadSuccessListData(allSuccessList, currentPageB);
        paginationEventsB();
    }
});

function loadSuccessListData(datas, page) {
    var pagesB = Math.ceil(datas.length / itemsPerPageB)
    if (page < 1) page = 1
    if (page > pagesB) page = pagesB
    document.querySelector("#unloanSuccess-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPageB; i < (page * itemsPerPageB) && i < datas.length; i++) {
        
        if (datas[i]) {
            document.querySelector("#unloanSuccess-card").innerHTML += '<div class="col-xxl-12 col-lg-12 col-sm-12">\
            <div class="card card-animate">\
                <div class="card-header bg-light border-0">\
                    <div class="d-flex align-items-center">\
                        <div class="flex-grow-1">\
                            <div>\
                                <span class="fw-semibold mb-0">出借書號</span>\
                                <span class="ms-2 text-muted mb-1 fs-16">'+ datas[i].id + '</span>\
                            </div>\
                        </div>\
                        <div class="flex-shrink-0">\
                            <div>\
                                <span class="fw-semibold mb-0">借款日</span>\
                                <span class="ms-2 text-muted mb-1 fs-16">'+ datas[i].date + '</span>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="card-body p-3">\
                    <div class="d-flex align-items-center justify-content-between">\
                        <div>\
                            <span class="fw-semibold fs-20 mb-0">借款金額</span>\
                            <span class="ms-2 text-muted mb-1 fs-16">'+ datas[i].loanAmount + ' 元</span>\
                        </div>\
                    </div>\
                    <div class="d-flex align-items-center mt-1">\
                        <div class="flex-grow-1">\
                            <span class="fw-semibold fs-20 mb-0">未償金額</span>\
                            <span class="ms-2 text-muted mb-1 fs-16">'+ datas[i].notreturnedAmount + ' 元</span>\
                        </div>\
                        <div id="m-layout">\
                            <div class="flex-shrink-0">\
                                <button type="button" class="btn btn-primary fs-16 mt-3">還款</button>\
                            </div>\
                        </div>\
                    </div>\
                    <div id="d-layout">\
                        <div class="d-flex">\
                            <div class="flex-grow-1">\
                                <div class="mt-3 hstack gap-2">\
                                    <a class="btn btn-outline-secondary fs-16" href="unresLoansReturn-collateral.html">退擔保品</a>\
                                    <a class="btn btn-outline-secondary fs-16" href="#!">轉擔保品</a>\
                                    <a class="btn btn-outline-secondary fs-16" href="#!">借款明細</a>\
                                    <a class="btn btn-outline-secondary fs-16" href="#!">擔保品明細</a>\
                                </div>\
                            </div>\
                            <div class="flex-shrink-0">\
                                <button type="button" class="btn btn-primary fs-16 mt-3">還款</button>\
                            </div>\
                        </div>\
                    </div>\
                    <div id="m-layout">\
                        <div class="mt-3 hstack gap-2">\
                            <a class="btn btn-outline-secondary w-100 fs-16" href="#showModal" data-bs-toggle="modal">退擔保品</a>\
                            <a class="btn btn-outline-secondary w-100 fs-16" href="#showModal" data-bs-toggle="modal">轉擔保品</a>\
                        </div>\
                        <div class="align-items-center mt-1 text-center">\
                            <div class="flex-grow-1" data-bs-toggle="collapse" data-bs-target="#'+ datas[i].controlNo + '" aria-expanded="false" aria-controls="'+ datas[i].controlNo + '">\
                                <button type="button" class="btn link-dark moreDetail">更多明細 <i class="ri-arrow-down-s-line moreDetail"></i></button>\
                            </div>\
                        </div>\
                        <div class="collapse" id="'+ datas[i].controlNo + '">\
                            <div class="hstack gap-2">\
                                <a class="btn btn-outline-secondary w-100 fs-16" href="#showModal" data-bs-toggle="modal">借款明細</a>\
                                <a class="btn btn-outline-secondary w-100 fs-16" href="#showModal" data-bs-toggle="modal">擔保品明細</a>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>';
        }
    }
    selectedPageB();
    currentPageB == 1 ? prevButtonB.parentNode.classList.add('disabled') : prevButtonB.parentNode.classList.remove('disabled');
    currentPageB == pagesB ? nextButtonB.parentNode.classList.add('disabled') : nextButtonB.parentNode.classList.remove('disabled');
}

function selectedPageB() {
    var pagenumLinkB = document.getElementById('page-numB').getElementsByClassName('clickPageNumber');
    for (var i = 0; i < pagenumLinkB.length; i++) {
        if (i == currentPageB - 1) {
            pagenumLinkB[i].parentNode.classList.add("active");
        } else {
            pagenumLinkB[i].parentNode.classList.remove("active");
        }
    }
};

// paginationEvents
function paginationEventsB() {
    var numPages = function numPages() {
        return Math.ceil(allSuccessList.length / itemsPerPageB);
    };

    function clickPageB() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPageB = e.target.textContent;
                loadSuccessListData(allSuccessList, currentPageB);
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
            loadSuccessListData(allSuccessList, currentPageB);
        }
    });

    nextButtonB.addEventListener('click', function () {
        if (currentPageB < numPages()) {
            currentPageB++;
            loadSuccessListData(allSuccessList, currentPageB);
        }
    });

    pageNumbersB();
    clickPageB();
    selectedPageB();
}



