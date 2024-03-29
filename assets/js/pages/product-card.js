var url = "assets/json/";
var allProductsList = '';

var prevButton = document.getElementById('page-prev');
var nextButton = document.getElementById('page-next');

// configuration variables
var currentPage = 1;
var itemsPerPage = 21;

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
getJSON("products-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allProductsList = data;
        loadProductsListData(allProductsList, currentPage);
        paginationEvents();
    }
});

function loadProductsListData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#product-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        // Array.from(datas).forEach(function (listData, index) {
        if (datas[i]) {
            document.querySelector("#product-card").innerHTML += '<div class="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-12">\
            <div class="card">\
                <div class="card-body">\
                    <div class="d-flex align-items-center">\
                        <div class="text-center flex-shrink-0">\
                            <span>'+ isType(datas[i].stockType) + '</span>\
                        </div>\
                        <div class="flex-grow-1 ms-3">\
                            <h4 class="text-uppercase">'+ datas[i].stockName + '</h4>\
                            <p class="mb-0 text-muted">'+ datas[i].stockNo + '</p>\
                        </div>\
                        <div class="flex-shrink-0 ms-3">\
                            <a class="btn btn-primary w-100 stock-in-ani" href="investock-entrust-setup.html">\
                                <i class="fa-solid fa-cart-plus"></i>\
                                <i cartadded class="fa-solid fa-cart-shopping"></i>\
                            </a>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>';
        }
    }
    // })
    selectedPage();
    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');
}

function isType(val) {
    switch (val) {
        case "ETF":
            return ('<span class="badge badge-info fs-14">' + val + "</span>");
        case "個股":
            return ('<span class="badge badge-primary fs-14">' + val + "</span>");
    }
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
        return Math.ceil(allProductsList.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadProductsListData(allProductsList, currentPage);
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
            loadProductsListData(allProductsList, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadProductsListData(allProductsList, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}


// Search list
var searchElementList = document.getElementById("searchProductsList");
searchElementList.addEventListener("keyup", function () {
    var inputVal = searchElementList.value.toLowerCase();

    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.stockName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.stockNo.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    var filterData = filterItems(allProductsList, inputVal);

    if (filterData.length == 0) {
        document.getElementById("pagination-element").style.display = "none";
    } else {
        document.getElementById("pagination-element").style.display = "flex";
    }

    var pageNumber = document.getElementById('page-num');
    pageNumber.innerHTML = "";
    var dataPageNum = Math.ceil(filterData.length / itemsPerPage)
    // for each page
    for (var i = 1; i < dataPageNum + 1; i++) {
        pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
    }
    loadProductsListData(filterData, currentPage);
});