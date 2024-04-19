var url = "assets/json/";
var allContractList = '';

var prevButton = document.getElementById('page-prev');
var nextButton = document.getElementById('page-next');

// configuration variables
var currentPage = 1;
var itemsPerPage = 25;

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
getJSON("contract-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allContractList = data;
        loadContractListData(allContractList, currentPage);
        paginationEvents();
    }
});

function loadContractListData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#contractList").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#contractList").innerHTML += '<div class="col-xxl-12 col-lg-12 col-md-12">\
            <div class="card ribbon-box border shadow-none right mb-lg-0">\
                <div class="card-body">\
                    <div>'+ isStatus(datas[i].status) + '</div>\
                    <h5 class="fs-20 text-start"><span class="badge rounded-pill text-bg-secondary">'+ datas[i].id + '</span></h5>\
                    <div class="mt-2 fs-18"><a class="stretched-link h5" href="'+ datas[i].link + '">'+ datas[i].contract_name + '</a></div>\
                </div>\
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
        case "已簽署":
            return ('<div class="ribbon ribbon-danger round-shape">' + val + "</div>");
        case "未簽署":
            return ('<div class="ribbon ribbon-primary round-shape">' + val + "</div>");
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
        return Math.ceil(allContractList.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadContractListData(allContractList, currentPage);
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
            loadContractListData(allContractList, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadContractListData(allContractList, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}



