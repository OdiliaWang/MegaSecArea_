document.addEventListener('DOMContentLoaded', function () {
    const returnOrders = document.querySelectorAll('#returnOrder');
    const orderCardContainer = document.querySelector('.card-body.pb-0');
    const checkCard = document.querySelector('.unres-check-card');

    // 初始隱藏 checkCard
    checkCard.style.display = 'none';

    returnOrders.forEach((order, index) => {
        const checkbox = order.querySelector('.form-check-input');

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                order.querySelector('.card').classList.add('border', 'border-secondary');
                const orderCard = createOrderCard(order, index);
                orderCardContainer.appendChild(orderCard);
            } else {
                order.querySelector('.card').classList.remove('border', 'border-secondary');
                const orderCard = document.getElementById(`orderCard-${index}`);
                if (orderCard) {
                    orderCardContainer.removeChild(orderCard);
                }
            }

            // 使用 setTimeout 確保 DOM 完成更新後再檢查
            setTimeout(toggleCheckCardVisibility, 0);
        });
    });

    function createOrderCard(order, index) {
        const companyName = order.querySelector('.fw-semibold').innerText;
        const stockCode = order.querySelector('.text-muted').innerText;
        const remainingShares = order.querySelectorAll('.text-danger')[2].innerText;
        const marketValue = order.querySelectorAll('.text-danger')[3].innerText;
        const returnShares = order.querySelector('.input-step input').value + "張";

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card border-1 shadow-none p-1';
        cardDiv.id = `orderCard-${index}`;
        cardDiv.innerHTML = `
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-sm-2">
                        <h5 class="mb-1">${companyName}</h5>
                        <h5 class="mb-0 text-muted">${stockCode}</h5>
                    </div>
                    <div class="col-sm">
                        <h5 class="mb-1 fw-medium">未還張數</h5>
                        <span class="text-secondary">${remainingShares}</span>
                    </div>
                    <div class="col-sm">
                        <h5 class="mb-1 fw-medium">市值</h5>
                        <span class="text-secondary ">${marketValue}</span>
                    </div>
                    <div class="col-sm">
                        <h5 class="mb-1 fw-medium">本次退還張數</h5>
                        <span class="text-secondary ">${returnShares}</span>
                    </div>
                </div>
            </div>
        `;
        return cardDiv;
    }

    function toggleCheckCardVisibility() {
        // 確認 orderCardContainer 中是否還有子元素
        if (orderCardContainer.children.length > 0) {
            checkCard.style.display = 'block';
        } else {
            checkCard.style.display = 'none';
        }
    }
});
