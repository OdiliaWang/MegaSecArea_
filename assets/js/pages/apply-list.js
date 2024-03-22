var url = "assets/json/";
var allApplyList = '';

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
getJSON("apply-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allApplyList = data;
        loadApplyListData(allApplyList, currentPage);
        paginationEvents();
    }
});

function loadApplyListData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#apply-list").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#apply-list").innerHTML += '<div class="col-lg-12">\
            <div class="apply-list list-view-filter">\
                <div class="card apply-box">\
                    <div class="card-body px-4">\
                        <div class="row align-items-center apply-row">\
                            <div class="col-lg-4 col">\
                                <div class="apply-content">\
                                    <h5 class="mb-1">'+ datas[i].stockName + '</h5>\
                                    <p class="text-muted mb-0 fs-14">'+ datas[i].stockNo + '</p>\
                                </div>\
                            </div>\
                            <div class="col-lg-8 col">\
                                <div class="row text-muted text-center align-items-center">\
                                    <div class="col-6 border-end border-end-dashed">\
                                        <h5 class="mb-2 text-muted">'+ datas[i].nowStock[0] + '庫存 '+ datas[i].nowStock[1] + '(張)</h5>\
                                        <h5 class="mb-0">45</h5>\
                                    </div>\
                                    <div class="col-6">\
                                        <div class="text-center">\
                                        <a href="MegaArea-stockexchange-apply-setup.html" class="btn btn-primary">申請設定</a>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
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
        return Math.ceil(allApplyList.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadApplyListData(allApplyList, currentPage);
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
            loadApplyListData(allApplyList, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadApplyListData(allApplyList, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}



// Filiter Search /* unsuccessful */
