var url = "assets/json/";
var allunresAplList = '';

var prevButton = document.getElementById('page-prev');
var nextButton = document.getElementById('page-next');

// configuration variables
var currentPage = 1;
var itemsPerPage = 3;

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
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages
    document.querySelector("#applyTable").innerHTML = '';
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            document.querySelector("#applyTable").innerHTML += '<tr>\
            <th scope="row">\
                <div class="form-check">\
                    <input class="form-check-input" type="checkbox" name="chk_child" value="option1">\
                </div>\
            </th>\
            <td style="display:none;">'+ datas[i].id + '</td>\
            <td class="flex-grow-1">\
                <h5>'+ datas[i].stockName[0] + '</h5>\
                <small class="text-muted"> '+ datas[i].stockName[1] + '</small>\
            </td>\
            <td>'+ datas[i].quantity + ' / '+ datas[i].amount + '</td>\
            <td>'+ datas[i].charge + ' 元</td>\
            <td>'+ datas[i].rate + ' %</td>\
            <td><button type="button" class="btn btn-icon btn-primary" href="#showModal" data-bs-toggle="modal"><i class="fa-solid fa-pen"></i></button></td>\
        </tr>';
        }
    }
    selectedPage();
    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');
}

//彈出修改視窗
var currentRow;

function editRow(button) {
    currentRow = button.parentNode.parentNode;
    var id = currentRow.cells[0].innerText;
    var name = currentRow.cells[1].innerText;
    var quantity = currentRow.cells[2].innerText;
    var leverage = currentRow.cells[3].innerText;

    document.getElementById("stockId").innerText = id;
    document.getElementById("stockName").innerText = name;
    document.getElementById("stockQuantity").value = quantity;
    document.getElementById("stockLeverage").value = leverage;

    document.getElementById("showModal").style.display = "block";
}

function saveChanges() {
    var newQuantity = document.getElementById("stockQuantity").value;
    var newLeverage = document.getElementById("stockLeverage").value;

    currentRow.cells[2].innerText = newQuantity;
    currentRow.cells[3].innerText = newLeverage;

    closeModal();
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
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

