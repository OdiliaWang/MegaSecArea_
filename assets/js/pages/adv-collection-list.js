var url = "assets/json/";
var alladvanceList = '';

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
getJSON("advance-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        alladvanceList = data;
        loadAdvanceData(alladvanceList, currentPage);
        paginationEvents();
    }
});

function loadAdvanceData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#advance-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
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
    selectedPage();
    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');
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
        return Math.ceil(alladvanceList.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadAdvanceData(alladvanceList, currentPage);
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
            loadAdvanceData(alladvanceList, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadAdvanceData(alladvanceList, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}