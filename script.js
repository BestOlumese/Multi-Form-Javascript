const pname = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const btn = document.getElementById('btn');
const stepOne = document.getElementById('step-one');
const stepTwo = document.getElementById('step-two');
const stepThree = document.getElementById('step-three');
const stepFour = document.getElementById('step-four');
const stepFinal = document.getElementById('step-final');
const optionMenu = document.querySelectorAll('.option-menu');
const toggle = document.getElementById('toggle');
const showEx = document.querySelectorAll('.show-ex');
const monthlyPrice = document.querySelectorAll('.monthly-price');
const yearlyPrice = document.querySelectorAll('.yearly-price');
const planBack = document.getElementById('plan-back');
const planNext = document.getElementById('plan-next');
const addonBack = document.getElementById('addon-back');
const addonNext = document.getElementById('addon-next');
const finishupBack = document.getElementById('finishup-back');
const finishupNext = document.getElementById('finishup-next');
const addonCheckbox = document.querySelectorAll('.addon-checkbox');
const finishupChange = document.getElementById('finishup-change');
const finishupTitle = document.getElementById('finishup-title');
const finishupPrice = document.getElementById('finishup-price');
const finishupTime = document.getElementById('finishup-time');
const addonFinishContent = document.getElementById('addon-finish-content');
const finishupType = document.getElementById('finishup-type');
const finishupPriceType = document.getElementById('finishup-price-type');
const finishupPriceText = document.getElementById('finishup-price-text');
const isSmallScreen = document.querySelector('sm-group');
const isLargeScreen = document.querySelector('lg-group');
var isYearly;
var planType;

let validator = false;
btn.addEventListener('click', () => {
    if(pname.value == "") {
        pname.previousElementSibling.children[1].innerHTML = 'The field is required';
        pname.classList.add('error');
        validator = false;
    } else {
        pname.previousElementSibling.children[1].innerHTML = '';
        pname.classList.remove('error');
        validator = true;
    }

    if(email.value == "") {
        email.previousElementSibling.children[1].innerHTML = 'The field is required';
        email.classList.add('error');
        validator = false;
    } else {
        email.previousElementSibling.children[1].innerHTML = '';
        email.classList.remove('error');
        validator = true;
    }

    if(phone.value == "") {
        phone.previousElementSibling.children[1].innerHTML = 'The field is required';
        phone.classList.add('error');
        validator = false;
    } else {
        phone.previousElementSibling.children[1].innerHTML = '';
        phone.classList.remove('error');
        validator = true;
    }
    if(validator) {
        stepOne.style.display = 'none';
        stepTwo.style.display = 'block';
    }
});

var dataf = {name: 'Arcade', price: '9', time: 'mo', type: 'Monthly'};
localStorage.setItem('plan', JSON.stringify(dataf))

var val = 'Arcade';
if(isYearly) {
    var price = '90';
} else {
    var price = '9';
}
optionMenu.forEach((option, z) => {
    option.addEventListener('click', () => {
        for(i = 0; i < optionMenu.length; i++) {
            optionMenu[i].classList.remove('active');
        }
        option.classList.add('active');
        planType = z;
        if(z == 0) {
            val = 'Arcade';
            if(isYearly) {
                price = '90'
            } else {
                price = '9'
            }
        } else if(z == 1) {
            val = 'Advanced';
            if(isYearly) {
                price = '120'
            } else {
                price = '12'
            }
        } else if (z == 2) {
            val = 'Pro';
            if(isYearly) {
                price = '150'
            } else {
                price = '15'
            }
        }
        if(isYearly) {
            var data = {name: val, price: price, time: 'yr', type: 'Yearly'};
            localStorage.setItem('plan', JSON.stringify(data))
        } else {
            var data = {name: val, price: price, time: 'mo', type: 'Monthly'};
            localStorage.setItem('plan', JSON.stringify(data))
        }
        
    });
});

toggle.addEventListener('click', () => {
    if(toggle.checked) {
        toggle.parentElement.nextElementSibling.classList.add('active-t');
        toggle.parentElement.previousElementSibling.classList.remove('active-t');
        showEx.forEach((show) => {
            show.style.display = 'block';
        });
        monthlyPrice.forEach((monthly) => {
            monthly.style.display = 'none';
        });
        yearlyPrice.forEach((yearly) => {
            yearly.style.display = 'block';
        });
        isYearly = true;
        var data = {name: val, price: price, time: 'yr', type: 'Yearly'};
        localStorage.setItem('plan', JSON.stringify(data))
    } else {
        toggle.parentElement.nextElementSibling.classList.remove('active-t');
        toggle.parentElement.previousElementSibling.classList.add('active-t');
        showEx.forEach((show) => {
            show.style.display = 'none';
        });
        yearlyPrice.forEach((yearly) => {
            yearly.style.display = 'none';
        });
        monthlyPrice.forEach((monthly) => {
            monthly.style.display = 'block';
        });
        isYearly = false;
        var data = {name: val, price: price, time: 'mo', type: 'Monthly'};
        localStorage.setItem('plan', JSON.stringify(data))
    }
});

planBack.addEventListener('click', () => {
    stepOne.style.display = 'block';
    stepTwo.style.display = 'none';
});

planNext.addEventListener('click', () => {
    stepOne.style.display = 'none';
    stepTwo.style.display = 'none';
    stepThree.style.display = 'block';
    const chooseAddonMonthly = document.querySelectorAll('.choose-addon-monthly');
    const chooseAddonYearly = document.querySelectorAll('.choose-addon-yearly');
    if(isYearly) {
        chooseAddonMonthly.forEach((item) => {
            item.style.display = 'none';
        });
        chooseAddonYearly.forEach((item) => {
            item.style.display = 'block';
        });
    } else {
        chooseAddonYearly.forEach((item) => {
            item.style.display = 'none';
        });
        chooseAddonMonthly.forEach((item) => {
            item.style.display = 'block';
        });
    }
});

var addonData = [];
addonCheckbox.forEach((checkbox, i) => {
    checkbox.addEventListener('click', () => {
        var name;
        var price;
        var type;
        if(!checkbox.checked) {
            checkbox.parentElement.classList = 'choose-addon';
            var keyData = JSON.parse(localStorage.getItem('addon'));
            keyData.forEach((data) => {
                if(i == data.key) {
                    console.log('delete');
                    data['key'] = '';
                    data['name'] = '';
                    data['price'] = '';
                    data['type'] = '';
                }
            });
            addonData = keyData;
            localStorage.setItem('addon', JSON.stringify(keyData));
        } else {
            checkbox.parentElement.classList = 'choose-addon active';
            if(i == 0) {
                name = 'Online service';
                if(isYearly) {
                    type = 'yr';
                    price = '10';
                } else {
                    price = '1';
                    type = 'mo';
                }
            } else if(i == 1) {
                name = 'Larger storage';
                if(isYearly) {
                    price = '20';
                    type = 'yr';
                } else {
                    price = '2';
                    type = 'mo';
                }
            }  else if(i == 2) {
                name = 'Customizable Profile';
                if(isYearly) {
                    price = '20';
                    type = 'yr';
                } else {
                    price = '2';
                    type = 'mo';
                }
            }
            addonData.push({name: name, price: price, type: type, key: i});
            localStorage.setItem('addon', JSON.stringify(addonData));
        }
    });
});

addonBack.addEventListener('click', () => {
    stepOne.style.display = 'none';
    stepTwo.style.display = 'block';
    stepThree.style.display = 'none';
});

addonNext.addEventListener('click', () => {
    stepOne.style.display = 'none';
    stepTwo.style.display = 'none';
    stepThree.style.display = 'none';
    stepFour.style.display = 'block';
    var getData = JSON.parse(localStorage.getItem('plan'));
    finishupTitle.innerHTML = getData.name + ' (' + getData.type + ')';
    if(getData.type == 'Yearly') {
        finishupType.innerHTML = 'yearly';
        finishupPriceType.innerHTML = 'yr';
    } else {
        finishupType.innerHTML = 'monthly';
        finishupPriceType.innerHTML = 'mo';
    }
    finishupPrice.innerHTML = getData.price;
    finishupTime.innerHTML = getData.time;
    var content = ``;
    var price_a = 0;
    var price_b = Number(getData.price);
    var getAddonData = JSON.parse(localStorage.getItem('addon'));
    getAddonData.forEach((addon) => {
        if(addon.name != '') {
            content += `
                <div class="row-f">
                    <p>${addon.name}</p>
                    <p class="price">+$${addon.price}/${addon.type}</p>
                </div>
            `;
            console.log(addon.price);
            price_a += Number(addon.price);
        }
        addonFinishContent.innerHTML = content; 
    });
    var total = price_a + price_b;
    finishupPriceText.innerHTML = total;
});

finishupChange.addEventListener('click', () => {
    stepOne.style.display = 'none';
    stepTwo.style.display = 'block';
    stepThree.style.display = 'none';
    stepFour.style.display = 'none';
});

finishupBack.addEventListener('click', () => {
    stepOne.style.display = 'none';
    stepTwo.style.display = 'none';
    stepThree.style.display = 'block';
    stepFour.style.display = 'none';
});

finishupNext.addEventListener('click', () => {
    stepOne.style.display = 'none';
    stepTwo.style.display = 'none';
    stepThree.style.display = 'none';
    stepFour.style.display = 'none';
    stepFinal.style.display = 'block';
});

window.addEventListener('load', () => {
    localStorage.setItem('addon', JSON.stringify([{name: ''}]));
});
