// List Js
var perPage = 10;

//Table
var options = {
    valueNames: [
        "date",
        "stock_name",
        "type",
        "charge",
        "amount",
        "status",
    ],
    page: perPage,
    pagination: true,
    plugins: [
        ListPagination({
            left: 2,
            right: 2
        })
    ]
};


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
            <td class="date">'+ datas[i].advDate + '<small class="text-muted"> '+ datas[i].dataTime + '</small></td>\
            <td class="stock_name">'+ datas[i].stockNo[1] + '<small class="text-muted"> '+ datas[i].stockNo[0] + '</small></td>\
            <td class="type">'+ datas[i].type + '</td>\
            <td class="charge">'+ datas[i].charge + '</td>\
            <td class="amount">'+ datas[i].amount + '</td>\
            <td class="status">' + isStatus(datas[i].Zh) + '</td>\
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


function SearchData(){
    var isstatus = document.getElementById("idStatus").value;
    var isType = document.getElementById("idType").value;
    var pickerVal = document.getElementById("rage-date").value;

    var date1 = pickerVal.split(" 至 ")[0];
    var date2 = pickerVal.split(" 至 ")[1];

    advclctList.filter(function (data) {
        matchData = new DOMParser().parseFromString(data.values().status, "text/html");
        var status = matchData.body.firstElementChild.innerHTML;
        var statusFilter = false;
        var dateFilter = false;
        var typeFilter = false;

        if (status == "all" || isstatus == "all") {
            statusFilter = true;
        } else {
            statusFilter = status == isstatus;
        }

        if (data.values().type == "all" || isType == "all") {
            typeFilter = true;
        } else {
            typeFilter = data.values().type == isType;
        }

        if (
            new Date(data.values().order_date.slice(0, 12)) >= new Date(date1) &&
            new Date(data.values().order_date.slice(0, 12)) <= new Date(date2)
        ) {
            dateFilter = true;
        } else {
            dateFilter = false;
        }

        if(statusFilter && typeFilter && dateFilter){
            return statusFilter && typeFilter && dateFilter
        }  else if (statusFilter && typeFilter && pickerVal == "") {
            return statusFilter && typeFilter;
        } else if (typeFilter && dateFilter && pickerVal == "") {
            return typeFilter && dateFilter;
        }
    });

    advclctList.update();
}

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