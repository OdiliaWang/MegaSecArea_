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
            document.querySelector("#apply-list").innerHTML += '<div class="col-lg-12 col-md-6">\
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
                                <a href="stockexchange-apply-setup.html" class="btn btn-secondary w-100">申請設定</a>\
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
