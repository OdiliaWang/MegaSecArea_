var url = "assets/json/";
var allReturnedCard = '';

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
getJSON("return-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allReturnedCard = data;
        loadReturnedCardData(allReturnedCard, currentPage);
        paginationEvents();
    }
});

function loadReturnedCardData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#returned-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#returned-card").innerHTML += '<div class="card mb-2">\
            <div class="card-body">\
                <div class="d-flex mb-3">\
                    <div class="avatar-xs">\
                        <div class="avatar-title bg-secondary text-light rounded-circle align-bottom fs-20">\
                            <i class="bx bx-trending-up"></i>\
                        </div>\
                    </div>\
                    <div class="flex-grow-1 ms-2">\
                        <h3 class="mb-1">'+ datas[i].stockName + '</h3>\
                        <p class="text-muted mb-2 fs-16">'+ datas[i].stockNo + '</p>\
                    </div>\
                    <div>\
                        <span class="badge badge-primary fs-18">應收金額 '+ datas[i].receivable[0] + '</span>\
                        <p class="text-muted mb-2 fs-16 text-end">退款日 '+ datas[i].receivable[1] + '</p>\
                    </div>\
                </div>\
                <div class="d-flex">\
                    <div>\
                        <span class="badge badge-secondary badge-border fs-18">還券日</span>\
                        <p class="text-muted fs-16 mb-2">'+ datas[i].return[0] + '</p>\
                    </div>\
                    <div class="ms-3">\
                        <span class="badge badge-success badge-border fs-18">還券張數</span>\
                        <p class="text-muted fs-16 mb-0">'+ datas[i].return[1] + '</p>\
                    </div>\
                </div>\
                <div class="flex-grow-1 ms-2 mt-3 fs-16 text-end">\
                    <h5 class="mb-1">出借收入 / 手續費</h5>\
                    <p class="text-muted mb-2">'+ datas[i].Income[0] + ' / '+ datas[i].Income[1] + '</p>\
                    <h5 class="mb-1">代扣稅款 / 健保補充費 / 股票移轉費</h5>\
                    <p class="text-muted mb-2">'+ datas[i].detailFee[0] + ' / '+ datas[i].detailFee[1] + ' / '+ datas[i].detailFee[2] + '</p>\
                </div>\
            </div>\
            <div class="card-body border-top border-top-dashed">\
                <div class="d-flex">\
                    <div class="flex-grow-1">\
                        <h6 class="mb-0">原借券日 '+ datas[i].originalDate + '</h6>\
                    </div>\
                    <h6 class="flex-shrink-0 mb-0"><i class="bx bx-file align-bottom"></i>出借書號 '+ datas[i].id + '</h6>\
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
        return Math.ceil(allReturnedCard.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadReturnedCardData(allReturnedCard, currentPage);
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
            loadReturnedCardData(allReturnedCard, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadReturnedCardData(allReturnedCard, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}

// Search list
var searchElementList = document.getElementById("searchReturnedCard");
searchElementList.addEventListener("keyup", function () {
    var inputVal = searchElementList.value.toLowerCase();

    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.stockName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.stockNo.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    // 宣告搜尋結果
    var filterData = filterItems(allReturnedCard, inputVal);

    if (filterData.length == 0) {
        document.getElementById("pagination-element").style.display = "none";
    } else {
        document.getElementById("pagination-element").style.display = "flex";
    }

    // 檢查搜尋結果是否為空
    if (filterData.length > 0) {
        document.getElementsByClassName("noresultB")[0].style.display = "none";
    } else {
        document.getElementsByClassName("noresultB")[0].style.display = "block";
    }

    // 分頁帶出頁數
    var pageNumber = document.getElementById('page-num');
    pageNumber.innerHTML = "";
    var dataPageNum = Math.ceil(filterData.length / itemsPerPage)
    // for each page
    for (var i = 1; i < dataPageNum + 1; i++) {
        pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
    }
    loadReturnedCardData(filterData, currentPage);
});

