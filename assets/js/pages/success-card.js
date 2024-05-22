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
getJSON("apply-success-list.json", function (err, data) {
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
    document.querySelector("#success-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPageB; i < (page * itemsPerPageB) && i < datas.length; i++) {
        
        if (datas[i]) {
            document.querySelector("#success-card").innerHTML += '<div class="col-xl-4 col-lg-4 col-md-6">\
            <div class="card card-animate">\
                <div class="card-header bg-soft-secondary border-0">\
                    <div class="d-flex align-items-center">\
                        <div class="flex-grow-1">\
                            <p class="text-uppercase fw-semibold fs-24 mb-0">'+ datas[i].stockName + '</p>\
                            <p class="text-muted mb-1 fs-16">'+ datas[i].stockNo + '</p>\
                        </div>\
                        <div class="flex-shrink-0">\
                            <div class="dropdown">\
                                <button class="btn btn-secondary dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">\
                                    <i class="ri-more-fill align-middle"></i>\
                                </button>\
                                <ul class="dropdown-menu dropdown-menu-end">\
                                    <li><a class="dropdown-item edit-item-btn" href="MegaArea-stockexchange-apply-setup.html"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>變更</a></li>\
                                    <li><a class="dropdown-item remove-item-btn" data-bs-toggle="modal" data-bs-target="#topmodal"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>撤銷約定</a></li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="card-body p-3 pt-0">\
                    <div class="d-flex align-items-center justify-content-between mt-4">\
                        <div>\
                            <p class="fw-semibold fs-20 mb-0">出借書號</p>\
                            <p class="text-muted mb-1 fs-16">'+ datas[i].id + '</p>\
                        </div>\
                        <div>\
                            <p class="fw-semibold fs-20 mb-0">已出借張數</p>\
                            <p class="text-muted mb-1 fs-16">'+ datas[i].lendingAmount + '</p>\
                        </div>\
                    </div>\
                    <div class="d-flex align-items-center mt-1">\
                        <div class="flex-grow-1">\
                            <p class="fw-semibold fs-20 mb-1">出借費率</p>\
                            <p class="text-muted mb-1 fs-16">'+ datas[i].lendingFee + '</p>\
                        </div>\
                    </div>\
                    <div class="d-flex align-items-center mt-1">\
                        <div class="flex-grow-1">\
                            <p class="fw-semibold fs-20 mb-1">提前還券條件</p>\
                            <span>'+ isRequire1(datas[i].requirement[0]) + ' </span>\
                            <span>'+ isRequire2(datas[i].requirement[1]) + '</span>\
                            <span>'+ isRequire3(datas[i].requirement[2]) + '</span>\
                            <span>'+ isRequire4(datas[i].requirement[3]) + '</span>\
                            <span>'+ isRequire5(datas[i].requirement[4]) + '</span>\
                        </div>\
                    </div>\
                    <div class="d-flex align-items-center mt-3 text-center">\
                        <div class="flex-grow-1" data-bs-toggle="collapse" data-bs-target="#'+ datas[i].controlNo + '" aria-expanded="false" aria-controls="'+ datas[i].controlNo + '">\
                            <button type="button" class="btn btn-soft-secondary btn-icon rounded-pill"><i class="ri-arrow-down-s-line"></i></button>\
                        </div>\
                    </div>\
                </div>\
                <div class="collapse border-top border-top-dashed" id="'+ datas[i].controlNo + '">\
                    <div class="card-body">\
                        <h6 class="fw-semibold fs-20 mb-2">出借餘額</h6>\
                        <ul class="list-unstyled vstack gap-2 mb-0">\
                            <li>\
                                <div class="d-flex">\
                                    <div class="flex-shrink-0 avatar-xxs text-muted">\
                                        <i class="bx bx-up-arrow-circle fs-16"></i>\
                                    </div>\
                                    <div class="flex-grow-1">\
                                        <h6 class="mb-0 fs-16">已出借張數</h6>\
                                        <a class="text-muted fs-16">'+ datas[i].lendingAmount + '</a>\
                                    </div>\
                                </div>\
                            </li>\
                            <li>\
                                <div class="d-flex">\
                                    <div class="flex-shrink-0 avatar-xxs text-muted">\
                                        <i class="bx bx-import fs-16"></i>\
                                    </div>\
                                    <div class="flex-grow-1">\
                                        <h6 class="mb-0 fs-16">還券張數</h6>\
                                        <a class="text-muted ">'+ datas[i].returnedAmount + '</a>\
                                    </div>\
                                </div>\
                            </li>\
                            <li>\
                                <div class="d-flex">\
                                    <div class="flex-shrink-0 avatar-xxs text-muted">\
                                        <i class="ri-mac-line"></i>\
                                    </div>\
                                    <div class="flex-grow-1">\
                                        <h6 class="mb-0 fs-16">未還券張數</h6>\
                                        <a class="text-muted fs-16">'+ datas[i].notreturnedAmount + '</a>\
                                    </div>\
                                </div>\
                            </li>\
                            <li>\
                                <div class="d-flex">\
                                    <div class="flex-shrink-0 avatar-xxs text-muted">\
                                        <i class="bx bx-money-withdraw"></i>\
                                    </div>\
                                    <div class="flex-grow-1">\
                                        <h6 class="mb-0 fs-16">預估收入</h6>\
                                        <a class="text-muted fs-16">'+ datas[i].estincome + '</a>\
                                    </div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="card-footer hstack gap-2">\
                        <a class="btn btn-secondary btn-sm w-100 fs-18" href="#showModal" data-bs-toggle="modal"><i class="bx bxs-bank align-center me-1 fs-16"></i>提前還券</a>\
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

function isRequire1(val) {
    switch (val) {
        case "是":
            return ('<span class="badge badge-success fs-16 mb-2">股東會' + "</span>");
        case "否":
            return ('<span class="badge badge-cancelled fs-16 mb-2">股東會' + "</span>");
    }
}

function isRequire2(val) {
    switch (val) {
        case "是":
            return ('<span class="badge badge-success fs-16">臨時股東會' + "</span>");
        case "否":
            return ('<span class="badge badge-cancelled fs-16">臨時股東會' + "</span>");
    }
}

function isRequire3(val) {
    switch (val) {
        case "是":
            return ('<span class="badge badge-success fs-16">現金增資' + "</span>");
        case "否":
            return ('<span class="badge badge-cancelled fs-16">現金增資' + "</span>");
    }
}

function isRequire4(val) {
    switch (val) {
        case "是":
            return ('<span class="badge badge-success fs-16">除權' + "</span>");
        case "否":
            return ('<span class="badge badge-cancelled fs-16">除權' + "</span>");
    }
}

function isRequire5(val) {
    switch (val) {
        case "是":
            return ('<span class="badge badge-success fs-16">除息' + "</span>");
        case "否":
            return ('<span class="badge badge-cancelled fs-16">除息' + "</span>");
    }
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


// Search list
var searchElementList = document.getElementById("searchSuccessCard");
searchElementList.addEventListener("keyup", function () {
    var inputVal = searchElementList.value.toLowerCase();

    // 搜尋範圍
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.stockName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.stockNo.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    // 宣告搜尋結果
    var filterData = filterItems(allSuccessList, inputVal);

    if (filterData.length == 0) {
        document.getElementById("pagination-element").style.display = "none";
    } else {
        document.getElementById("pagination-element").style.display = "flex";
    }

    // 檢查搜尋結果是否為空
    if (filterData.length > 0) {
        document.getElementsByClassName("noresultA")[0].style.display = "none";
    } else {
        document.getElementsByClassName("noresultA")[0].style.display = "block";
    }

    // 分頁帶出頁數
    var pageNumber = document.getElementById('page-numB');
    pageNumber.innerHTML = "";
    var dataPageNum = Math.ceil(filterData.length / itemsPerPageB)
    // for each page
    for (var i = 1; i < dataPageNum + 1; i++) {
        pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
    }
    loadSuccessListData(filterData, currentPageB);
});



