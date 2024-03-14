var url = "assets/json/";
var allChargeList = '';

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
getJSON("charge-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allChargeList = data;
        loadChargeData(allChargeList, currentPage);
        paginationEvents();
    }
});

function loadChargeData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#charge-card").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {

            document.querySelector("#charge-card").innerHTML += '<div class="card p-0">\
            <div class="card-body p-3">\
                <div class="d-flex">\
                    <div class="flex-shrink-0 avatar-xs">\
                        <div class="avatar-title bg-secondary rounded-circle align-bottom fs-4">\
                        <i class="bx bx-dollar-circle"></i>\
                        </div>\
                    </div>\
                    <div class="flex-grow-1 ms-2">\
                        <h3 class="mb-1">'+ datas[i].stockName + '</h3>\
                        <h5 class="text-muted mb-0">'+ datas[i].stockNo + '</h5>\
                        <div class="flex-grow-1 gap-4 mt-2">\
                            <h5 class="mb-1">申購金額 / 實際扣款</h5>\
                            <h5 class="text-muted mb-0">'+ datas[i].chargeAmount[0] + ' / <span class="badge badge-secondary fs-5">'+ datas[i].chargeAmount[1] + '</span></h5>\
                        </div>\
                    </div>\
                    <div class="status">' + isStatus(datas[i].status) + '</div>\
                </div>\
            </div>\
            <div class="card-body border-top border-top-dashed p-3">\
                <div class="d-flex">\
                    <div class="flex-grow-1">\
                        <h6 class="order_date mb-0">實際扣款日'+ datas[i].order_date + '</h6>\
                    </div>\
                    <h6 class="flex-shrink-0 mb-0"><i class="bx bx-file align-bottom"></i>來源別'+ datas[i].orderFrom + '</h6>\
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
        case "Success":
            return ('<span class="badge badge-success fs-5">' + "扣款成功" + "</span>");
        case "Failed":
            return ('<span class="badge badge-warning fs-5">' + "扣款失敗" + "</span>");
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
        return Math.ceil(allChargeList.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadChargeData(allChargeList, currentPage);
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
            loadChargeData(allChargeList, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadChargeData(allChargeList, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}


// Search list
var searchElementList = document.getElementById("searchChargeList");
searchElementList.addEventListener("keyup", function () {
    var inputVal = searchElementList.value.toLowerCase();

    // 搜尋範圍
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.stockName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.stockNo.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    // 宣告搜尋結果
    var filterData = filterItems(allChargeList, inputVal);

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
    loadChargeData(filterData, currentPage);
});


// Choices status input
var statusInput = new Choices(document.getElementById('status-select'), {
    searchEnabled: false,
});

statusInput.passedElement.element.addEventListener('change', function (event) {
    var statusInputValue = event.detail.value;
    if (event.detail.value != "All") {
        var filterData = allChargeList.filter(listdata => listdata.status == statusInputValue);
    } else {
        var filterData = allChargeList;
    }
    loadChargeData(filterData, currentPage);
}, false);


//Date Filter /* unsuccessful */

// function filterData(){
//     var isstatus = document.getElementById("idStatus").value;
//     var pickerVal = document.getElementById("range-datepicker").value;

//     var date1 = pickerVal.split(" ~ ")[0];
//     var date2 = pickerVal.split(" ~ ")[1];

//     contactList.filter(function (data) {
//         matchData = new DOMParser().parseFromString(data.values().status, "text/html");
//         var status = matchData.body.firstElementChild.innerHTML;
//         var statusFilter = false;
//         var dateFilter = false;

//         if (status == "all" || isstatus == "all") {
//             statusFilter = true;
//         } else {
//             statusFilter = status == isstatus;
//         }

//         if (
//             new Date(data.values().order_date.slice(0, 10)) >= new Date(date1) &&
//             new Date(data.values().order_date.slice(0, 10)) <= new Date(date2)
//         ) {
//             dateFilter = true;
//         } else {
//             dateFilter = false;
//         }

//         if(statusFilter && dateFilter){
//             return statusFilter && dateFilter
//         }  else if (statusFilter && pickerVal == "") {
//             return statusFilter;
//         } else if (dateFilter && pickerVal == "") {
//             return dateFilter;
//         }
//     });

//     contactList.update();
// }