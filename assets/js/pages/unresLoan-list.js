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

// 存放已加入申請匣的股票 ID
var addedItems = new Set();

function loadAplListData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage);
    if (page < 1) page = 1;
    if (page > pages) page = pages;
    document.querySelector("#applyCard").innerHTML = '';

    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            // 檢查此股票是否已加入申請匣
            var isAdded = addedItems.has(datas[i].id);
            var cardClass = isAdded ? 'bg-light' : ''; // 若已加入，卡片背景改為灰色
            var btnDisabled = isAdded ? 'disabled' : ''; // 若已加入，按鈕禁用

            document.querySelector("#applyCard").innerHTML += `
                <div class="card p-0 ${cardClass}">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="d-flex">
                                    <div class="avatar-xs">
                                        <div class="avatar-title bg-primary rounded-circle align-bottom fs-20">
                                            <i class="bx bx-bar-chart-alt-2"></i>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-2 mb-3">
                                        <span style="display:none;">${datas[i].id}</span>
                                        <h3 class="mb-1">${datas[i].stockName[0]}</h3>
                                        <h5 class="text-muted mb-0">${datas[i].stockName[1]}</h5>
                                    </div>
                                    <div class="d-flex flex-wrap">
                                        <div class="p-1 px-1">
                                            <button id="addBtn-${i}" class="btn btn-secondary add-btn" data-index="${i}" data-id="${datas[i].id}" data-name="${datas[i].stockName[0]}" data-rate="${datas[i].rate}" ${btnDisabled}>
                                                加入申請
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-wrap gap-4 align-items-center">
                                    <span class="badge badge-primary badge-border fs-6 mb-1">可用張數</span>
                                    <p class="text-muted mb-0">${datas[i].quantity} 張</p>
                                </div>
                                <div class="d-flex flex-wrap gap-4 align-items-center">
                                    <span class="badge badge-warning badge-border fs-6">融通成數 / 利率</span>
                                    <p class="text-muted mb-0">${datas[i].leverage} 成 / ${datas[i].rate} % </p>
                                </div>
                                <div class="d-flex flex-wrap gap-4 align-items-center">
                                    <span class="badge badge-secondary badge-border fs-6">擔保張數</span>
                                    <p id="amount-${i}" class="text-muted mb-0">${datas[i].amount} 張</p>
                                </div>
                                <div class="d-flex flex-wrap gap-4 align-items-center">
                                    <span class="badge badge-secondary badge-border fs-6">可借金額</span>
                                    <p class="text-muted mb-0">NTD ${datas[i].charge} 元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
    }

    selectedPage();

    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');

    document.querySelector("#applyCard").addEventListener('click', function (event) {
        if (event.target && event.target.closest('.add-btn')) {
            var index = event.target.closest('.add-btn').getAttribute('data-index');
            var stockId = event.target.closest('.add-btn').getAttribute('data-id');
            var stockName = event.target.closest('.add-btn').getAttribute('data-name');
            var rate = event.target.closest('.add-btn').getAttribute('data-rate');
            addToApplication(index, stockId, stockName, rate);
        }
    });
}

function addToApplication(index, stockId, stockName, rate) {
    if (!addedItems.has(stockId)) {
        var selectedItemsDiv = document.getElementById("selectedItems");
        var itemHtml = `
            <div id="selected-item-${index}" class="d-flex justify-content-between align-items-center mb-2">
                <span>${stockName} - 利率: ${rate}%</span>
                <button class="btn btn-outline-danger btn-sm" onclick="removeFromApplication(${index}, '${stockId}')">刪除</button>
            </div>`;
        selectedItemsDiv.innerHTML += itemHtml;

        // 將股票ID加入已選清單，並更新按鈕與卡片樣式
        addedItems.add(stockId);
        document.getElementById(`addBtn-${index}`).disabled = true;
        document.getElementById(`addBtn-${index}`).closest('.card').classList.add('bg-light');
    }
}

function removeFromApplication(index, stockId) {
    var item = document.getElementById('selected-item-' + index);
    if (item) {
        item.remove();
        // 從已選清單中移除股票ID
        addedItems.delete(stockId);
        document.getElementById(`addBtn-${index}`).disabled = false;
        document.getElementById(`addBtn-${index}`).closest('.card').classList.remove('bg-light');
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

