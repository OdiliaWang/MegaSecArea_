var url = "assets/json/";
var allValidList = '';

var prevButton = document.getElementById('page-prev');
var nextButton = document.getElementById('page-next');

// configuration variables
var currentPage = 1;
var itemsPerPage = 5;

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
getJSON("valid-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allValidList = data;
        loadValidListData(allValidList, currentPage);
        paginationEvents();
    }
});

function loadValidListData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#valid-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#valid-card").innerHTML += '<div class="card p-0">\
            <div class="card-body p-3">\
                <div class="d-flex">\
                    <div class="avatar-xs">\
                        <div class="avatar-title bg-primary rounded-circle align-bottom fs-20">\
                            <i class="bx bx-bar-chart-alt-2"></i>\
                        </div>\
                    </div>\
                    <div class="flex-grow-1 ms-2 mb-3">\
                        <h3 class="mb-1">'+ datas[i].stockName + '</h3>\
                        <h5 class="text-muted mb-0">'+ datas[i].stockNo + '</h5>\
                    </div>\
                    <div class="d-flex flex-wrap">\
                        <div class="p-1 px-1">\
                            <a class="btn btn-secondary btn-icon" href="investock-entrust-adjust.html">\
                            <i class="fa-solid fa-pen"></i>\
                            </a>\
                        </div>\
                    </div>\
                </div>\
                <div class="d-flex flex-wrap gap-4 align-items-center">\
                    <span class="badge badge-primary badge-border fs-6 mb-1">扣款日已設定</span>\
                    <p class="text-muted mb-0">'+ datas[i].chargeDate + '</p>\
                </div>\
                <div class="d-flex flex-wrap gap-4 align-items-center">\
                    <span class="badge badge-secondary badge-border fs-6">申購金額</span>\
                    <p class="text-muted mb-0">NTD '+ datas[i].chargeAmount + '</p>\
                </div>\
            </div>\
            <div class="card-footer border-top p-0 px-3">\
                <div class="d-flex flex-wrap align-items-center">\
                    <div class="flex-grow-1">\
                        <h6 class="mb-0">委託日'+ datas[i].orderDate + '<small class="text-muted ms-1">'+ datas[i].orderTime + '</small></h6>\
                    </div>\
                    <div class="flex-shrink-0">\
                        <a class="btn btn-light" href="investock-deleteBuy.html">\
                            <i class="fa-solid fa-trash-can"></i>\
                            <div class="ms-1 d-inline">終止</div>\
                        </a>\
                    </div>\
                </div>\
            </div>\
        </div>';
        }
    }
    selectedPage();
    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');
}


function selectedPage() {
    var pagenumLink = document.getElementById('page-num').getElementsByClassName('clickPageNumber');
    for (var i = 0; i < pagenumLink.length; i++) {
        if (i == currentPage - 1) {
            pagenumLink[i].parentNode.classList.add("active");
        } else {
            pagenumLink[i].parentNode.classList.remove("active");
        }
    }
};

// paginationEvents
function paginationEvents() {
    var numPages = function numPages() {
        return Math.ceil(allValidList.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadValidListData(allValidList, currentPage);
            }
        });
    };

    function pageNumbers() {
        var pageNumber = document.getElementById('page-num');
        pageNumber.innerHTML = "";
        // for each page
        for (var i = 1; i < numPages() + 1; i++) {
            pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
        }
    }

    prevButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            loadValidListData(allValidList, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadValidListData(allValidList, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}


// Search list
var searchElementList = document.getElementById("searchValidList");
searchElementList.addEventListener("keyup", function () {
    var inputVal = searchElementList.value.toLowerCase();

    // 搜尋範圍
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.stockName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.stockNo.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    // 宣告搜尋結果
    var filterData = filterItems(allValidList, inputVal);

    if (filterData.length == 0) {
        document.getElementById("pagination-element").style.display = "none";
    } else {
        document.getElementById("pagination-element").style.display = "flex";
    }

    // 檢查搜尋結果是否為空
    if (filterData.length > 0) {
        document.getElementsByClassName("noresult")[0].style.display = "none";
    } else {
        document.getElementsByClassName("noresult")[0].style.display = "block";
    }

    // 分頁帶出頁數
    var pageNumber = document.getElementById('page-num');
    pageNumber.innerHTML = "";
    var dataPageNum = Math.ceil(filterData.length / itemsPerPage)
    // for each page
    for (var i = 1; i < dataPageNum + 1; i++) {
        pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
    }
    loadValidListData(filterData, currentPage);
});


