//Parameter Custom
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