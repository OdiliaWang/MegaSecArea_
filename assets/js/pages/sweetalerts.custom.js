// Parameter Custom
if (document.getElementById("sa-params"))
    document.getElementById("sa-params").addEventListener("click", function () {
        Swal.fire({
            title: '確認刪除',
            text: "這筆資料將會刪除，請再次確認",
            icon: 'primary',
            showCancelButton: true,
            confirmButtonText: '確認刪除',
            cancelButtonText: '取消',
            confirmButtonClass: 'btn btn-outline-secondary w-xs me-2 mt-2',
            cancelButtonClass: 'btn btn-secondary w-xs mt-2',
            buttonsStyling: false,
            showCloseButton: false
        }).then(function (result) {
            if (result.value) {
                Swal.fire({
                    title: '已刪除成功',
                    icon: 'success',
                    confirmButtonText: '<a style="color:#ffffff" href="不限用途款項借貸menu.html">完成</a>',
                    confirmButtonClass: 'btn btn-secondary w-xs mt-2',
                    buttonsStyling: false
                })
            } else if (result.isDissmissed) {
                Swal.close();
            }
        });
    });

// Warning Message
if (document.getElementById("swal2-warning"))
    document.getElementById("swal2-warning").addEventListener("click", function () {
        Swal.fire({
            title: "您尚未開立不限用途款項借貸帳戶",
            icon: "warning",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-secondary w-xs me-2 mt-2',
            cancelButtonClass: 'btn btn-danger w-xs mt-2',
            confirmButtonText: "確認返回",
            buttonsStyling: false,
            showCloseButton: false
        }).then(function (result) {
            if (result.isConfirmed) {
                history.back(); // 跳轉回上一頁
            }
        });
    });

// Long Content
if (document.getElementById("confirmBtn"))
    document.getElementById("confirmBtn").addEventListener("click", function () {
        Swal.fire({
            html: '<div class="card unres-check-card">' +
                                '<div class="card-header">' +
                                    '<span class="mb-0 h4">請確認內容明細</span>' +
                                '</div>' +
                                '<div class="card-body pb-0">' +
                                    '<div id="orderCard">' +
                                        '<div class="card border-1 shadow-none p-1">' +
                                            '<div class="card-body">' +
                                                '<div class="row g-3">' +
                                                    '<div class="col-sm-2">' +
                                                        '<h5 class="mb-1">台積電</h5>' +
                                                        '<h5 class="mb-0 text-muted">2330</h5>' +
                                                    '</div>' +
                                                    '<div class="col-sm">' +
                                                        '<h5 class="mb-1 fw-medium">未還張數</h5>' +
                                                        '<span class="text-danger">200張</span>' +
                                                    '</div>' +
                                                    '<div class="col-sm">' +
                                                        '<h5 class="mb-1 fw-medium">市值</h5>' +
                                                        '<span class="text-danger">32,500,000元</span>' +
                                                    '</div>' +
                                                    '<div class="col-sm">' +
                                                        '<h5 class="mb-1 fw-medium">本次退還張數</h5>' +
                                                        '<span class="text-danger">1張</span>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="card border-1 shadow-none p-1">' +
                                            '<div class="card-body">' +
                                                '<div class="row g-3">' +
                                                    '<div class="col-sm-2">' +
                                                        '<h5 class="mb-1">WW</h5>' +
                                                        '<h5 class="mb-0 text-muted">1325</h5>' +
                                                    '</div>' +
                                                    '<div class="col-sm">' +
                                                        '<h5 class="mb-1 fw-medium">未還張數</h5>' +
                                                        '<span class="text-danger">50張</span>' +
                                                    '</div>' +
                                                    '<div class="col-sm">' +
                                                        '<h5 class="mb-1 fw-medium">市值</h5>' +
                                                        '<span class="text-danger">3,620,000元</span>' +
                                                    '</div>' +
                                                    '<div class="col-sm">' +
                                                        '<h5 class="mb-1 fw-medium">本次退還張數</h5>' +
                                                        '<span class="text-danger">1張</span>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' ,
            customClass: {
                confirmButton: 'btn btn-secondary w-xs mt-2',
                cancelButton: 'btn btn-outline-secondary w-xs me-2 mt-2',
                closeButton: 'custom-close-btn'
            },
            confirmButtonText: '確認送出',
            cancelButtonText: '取消',
            width: 1200,
            padding: 20,
            buttonsStyling: false,
            showCancelButton: true,
            showCloseButton: true,
            reverseButtons: true  
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "unresLoans-result.html";
            }
        });
    });
