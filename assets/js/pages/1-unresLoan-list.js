var url = "assets/json/";
var allunresAplList = '';

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
getJSON("unres-loan-list.json", function (err, data) {
    if (err !== null) {
        console.log("錯誤" + err);
    } else {
        allunresAplList = data;
        loadAplListData(allunresAplList, currentPage);
        paginationEvents();
    }
});

var checkAll = document.getElementById("checkAll");
if (checkAll) {
    checkAll.onclick = function () {
        var checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]');
        if (checkAll.checked == true) {
            Array.from(checkboxes).forEach(function (checkbox) {
                checkbox.checked = true;
                checkbox.closest("tr").classList.add("table-active");
            });
        } else {
            Array.from(checkboxes).forEach(function (checkbox) {
                checkbox.checked = false;
                checkbox.closest("tr").classList.remove("table-active");
            });
        }
    };
}

function loadAplListData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage);
    if (page < 1) page = 1;
    if (page > pages) page = pages;
    document.querySelector("#applyCard").innerHTML = '';

    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#applyCard").innerHTML += '<div class="card p-0">\
            <div class="card-body p-3">\
                <div class="row">\
                    <div class="col-xl-12">\
                        <div class="d-flex">\
                            <div class="avatar-xs">\
                                <div class="avatar-title bg-primary rounded-circle align-bottom fs-20">\
                                    <i class="bx bx-bar-chart-alt-2"></i>\
                                </div>\
                            </div>\
                            <div class="flex-grow-1 ms-2 mb-3">\
                                <span style="display:none;">'+ datas[i].id + '</span>\
                                <h3 class="mb-1">'+ datas[i].stockName[0] + '</h3>\
                                <h5 class="text-muted mb-0">'+ datas[i].stockName[1] + '</h5>\
                            </div>\
                            <div class="d-flex flex-wrap">\
                                <div class="p-1 px-1">\
                                    <button id="editBtn-'+ i +'" class="btn btn-secondary btn-icon edit-btn" data-index="'+ i +'" data-amount="'+ datas[i].amount +'">\
                                    <i class="fa-solid fa-pen"></i>\
                                    </button>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="d-flex flex-wrap gap-4 align-items-center">\
                            <span class="badge badge-primary badge-border fs-6 mb-1">可用張數</span>\
                            <p class="text-muted mb-0">'+ datas[i].quantity + ' 張</p>\
                        </div>\
                        <div class="d-flex flex-wrap gap-4 align-items-center">\
                            <span class="badge badge-warning badge-border fs-6">融通成數 / 利率</span>\
                            <p class="text-muted mb-0">'+ datas[i].leverage + ' 成 / '+ datas[i].rate + ' % </p>\
                        </div>\
                        <div class="d-flex flex-wrap gap-4 align-items-center">\
                            <span class="badge badge-secondary badge-border fs-6">擔保張數</span>\
                            <p id="amount-'+ i +'" class="text-muted mb-0">'+ datas[i].amount + ' 張</p>\
                        </div>\
                        <div class="d-flex flex-wrap gap-4 align-items-center">\
                            <span class="badge badge-secondary badge-border fs-6">可借金額</span>\
                            <p class="text-muted mb-0">NTD '+ datas[i].charge + ' 元</p>\
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

 
    document.querySelector("#applyCard").addEventListener('click', function (event) {
        if (event.target && event.target.closest('.edit-btn')) {
            var index = event.target.closest('.edit-btn').getAttribute('data-index');
            var amount = event.target.closest('.edit-btn').getAttribute('data-amount');
            showEditInput(index, amount);
        }
    });
}

function showEditInput(index, currentAmount) {
    var amountElement = document.getElementById('amount-' + index);
    var originalHtml = amountElement.innerHTML;

    amountElement.innerHTML = `<input type="text" id="editAmount-${index}" value="${currentAmount}" class="form-control d-inline-block" style="width: 80px;">
        <button id="confirmBtn-${index}" class="btn btn-primary btn-sm ms-2">確定</button>
        <button id="cancelBtn-${index}" class="btn btn-outline-secondary btn-sm ms-2">取消</button>`;

    document.getElementById('confirmBtn-' + index).addEventListener('click', function () {
        var newAmount = document.getElementById('editAmount-' + index).value;
        amountElement.innerHTML = newAmount + ' 張';
    });

    document.getElementById('cancelBtn-' + index).addEventListener('click', function () {
        amountElement.innerHTML = originalHtml;
    });
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
        return Math.ceil(allunresAplList.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadAplListData(allunresAplList, currentPage);
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
            loadAplListData(allunresAplList, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadAplListData(allunresAplList, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}

