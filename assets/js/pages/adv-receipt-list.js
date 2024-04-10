var url = "assets/json/";
var allAdvReceiptList = '';

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
getJSON("adv-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        allAdvReceiptList = data;
        loadAdvReceiptData(allAdvReceiptList, currentPage);
        paginationEvents();
    }
});

function loadAdvReceiptData(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#advList").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#advList").innerHTML += '<tr class="align-middle">\
            <td>'+ datas[i].advDate + '<small class="text-muted"> '+ datas[i].dataTime + '</small></td>\
            <td>'+ datas[i].stockNo[1] + '<small class="text-muted"> '+ datas[i].stockNo[0] + '</small></td>\
            <td>'+ datas[i].type + '</td>\
            <td>'+ datas[i].charge + '</td>\
            <td>'+ datas[i].amount + '</td>\
            <td>' + isStatus(datas[i].Zh) + '</td>\
            </tr>';
        }
    }
    selectedPage();
    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');
}

function isStatus(val) {
    switch (val) {
        case "成功":
            return ('<span class="badge badge-success">' + val + "</span>");
        case "取消":
            return ('<span class="badge badge-warning">' + val + "</span>");
        case "失敗":
            return ('<span class="badge badge-primary">' + val + "</span>");
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
        return Math.ceil(allAdvReceiptList.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadAdvReceiptData(allAdvReceiptList, currentPage);
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
            loadAdvReceiptData(allAdvReceiptList, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadAdvReceiptData(allAdvReceiptList, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}


// Search list
var searchElementList = document.getElementById("searchAdvReceiptList");
searchElementList.addEventListener("keyup", function () {
    var inputVal = searchElementList.value.toLowerCase();

    // 搜尋範圍
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.stockNo[0].toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.stockNo[1].toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    // 宣告搜尋結果
    var filterData = filterItems(allAdvReceiptList, inputVal);

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
    loadAdvReceiptData(filterData, currentPage);
});


// Choices status input
var statusInput = new Choices(document.getElementById('idStatus'), {
    searchEnabled: false,
});

statusInput.passedElement.element.addEventListener('change', function (event) {
    var statusInputValue = event.detail.value;
    if (event.detail.value != "All") {
        var filterData = allAdvReceiptList.filter(listdata => listdata.status == statusInputValue);
    } else {
        var filterData = allAdvReceiptList;
    }
    loadAdvReceiptData(filterData, currentPage);
}, false);




// var statusVal = new Choices(statusField, {
//     searchEnabled: false,
// });

// function SearchData() {
//     var isstatus = document.getElementById("idStatus").value;
//     var pickerVal = document.getElementById("rage-date").value;

//     var date1 = pickerVal.split(" 至 ")[0];
//     var date2 = pickerVal.split(" 至 ")[1];

//     tasksList.filter(function (data) {
//         matchData = new DOMParser().parseFromString(
//             data.values().status,
//             "text/html"
//         );
//         var status = matchData.body.firstElementChild.innerHTML;
//         var statusFilter = false;
//         var dateFilter = false;

//         if (status == "all" || isstatus == "all") {
//             statusFilter = true;
//         } else {
//             statusFilter = status == isstatus;
//         }

//         if (
//             new Date(data.values().due_date.slice(0, 12)) >= new Date(date1) &&
//             new Date(data.values().due_date.slice(0, 12)) <= new Date(date2)
//         ) {
//             dateFilter = true;
//         } else {
//             dateFilter = false;
//         }

//         if (statusFilter && dateFilter) {
//             return statusFilter && dateFilter;
//         } else if (statusFilter && pickerVal == "") {
//             return statusFilter;
//         } else if (dateFilter && pickerVal == "") {
//             return dateFilter;
//         }
//     });
//     tasksList.update();
// }
