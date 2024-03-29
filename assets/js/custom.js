/* 按鈕元素和輸出區域元素 */
var button = document.getElementById('stopBtn');
var output = document.getElementById('output');

/* 點擊事件 */
button.addEventListener('click', function() {
/* 在輸出區域內呈現文字 */
  output.innerHTML = '<div class="alert alert-warning alert-dismissible alert-label-icon label-arrow fade show" role="alert">\
  <i class="fa-solid fa-circle-check label-icon"></i><strong class="fs-18"> 已提出暫停申請成功 </strong>\
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
</div>';
});

