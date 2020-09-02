//dom
var height = document.querySelector('.bodyHeight');
var weight = document.querySelector('.bodyWeight');
var resultBtn = document.querySelector('#resultBtn');
var resultTxt = document.querySelector('#resultTxt');
var listData =document.querySelector('.list');
var delAll = document.querySelector('#delAll');
///BMI計算
function countBMI(e) {
    e.preventDefault();
    if (e.target.nodeName !== "A") {return};
    ///內容空值判斷
    if (weight.value == '' && height.value == '') {
        alert('請輸入正確內容');
        return
    } else if (weight.value == '' || weight.value == 0) {
        alert('請輸入正確體重');
        return
    } else if (height.value == '' || height.value == 0) {
        alert('請輸入正確身高');
        return
    }
    ////BMI判斷
    var BMIvalue = weight.value / Math.pow((height.value * 0.01), 2);
    var strBtn = '<h2>' + BMIvalue.toFixed(2) + '<br><small class="mb-0 h6">BMI</small><a href="#" class="back"><img src="stylestheets/images/icons_loop.png" class="header-back-icon"></a></h2>';
    var strTxt = ''
    if (BMIvalue < 18.5) {
        strTxt = '<p>過輕</p>';
        resultBtn.classList.add('header-result-light');
        resultTxt.classList.add('header-result-light');
    } else if (BMIvalue >= 18.5 && BMIvalue < 25){
        strTxt = '<p>標準</p>';
        resultBtn.classList.add('header-result-normal');
        resultTxt.classList.add('header-result-normal');
    } else if (BMIvalue >= 25 && BMIvalue < 30) {
        strTxt = '<p>過重</p>';
        resultBtn.classList.add('header-result-heavy');
        resultTxt.classList.add('header-result-heavy');
    } else if (BMIvalue >= 30 && BMIvalue < 35) {
        strTxt = '<p>輕度肥胖</p>';
        resultBtn.classList.add('header-result-fat');
        resultTxt.classList.add('header-result-fat');
    } else if (BMIvalue >= 35 && BMIvalue < 40) {
        strTxt = '<p>中度肥胖</p>';
        resultBtn.classList.add('header-result-fat');
        resultTxt.classList.add('header-result-fat');
    } else if (BMIvalue >= 40) {
        strTxt = '<p>重度肥胖</p>';
        resultBtn.classList.add('header-result-veryfat');
        resultTxt.classList.add('header-result-veryfat');
    }
    resultBtn.innerHTML = strBtn;
    resultTxt.innerHTML = strTxt;
    updateList(data); updateList(data2);
}
///返回
function goBack(e) {
    e.preventDefault();
    var strback = '<a href="#">看結果</a>'
    if (e.target.nodeName !== "IMG") {
        return
    }else{
        ///刪除class樣式
        resultBtn.classList.remove('header-result-light'); resultTxt.classList.remove('header-result-light')
        resultBtn.classList.remove('header-result-normal'); resultTxt.classList.remove('header-result-normal')
        resultBtn.classList.remove('header-result-heavy'); resultTxt.classList.remove('header-result-heavy')
        resultBtn.classList.remove('header-result-fat'); resultTxt.classList.remove('header-result-fat')
        resultBtn.classList.remove('header-result-veryfat'); resultTxt.classList.remove('header-result-veryfat')
    }
    resultBtn.innerHTML = strback;
    resultTxt.innerHTML = '';
    height.value = '';
    weight.value = '';
}
////存入資料庫
var data = JSON.parse(localStorage.getItem('listData')) || [];//無值時是輸出空值有內容時輸出資料庫內容
var data2 = JSON.parse(localStorage.getItem('listData2')) || [];

function addContent(e) {
    e.preventDefault();
    if (e.target.nodeName !== "A") {return};
    var heightValue = height.value;
    var weightValue = weight.value;
    var Today = new Date();
    var BMIvalue = (weight.value / Math.pow((height.value * 0.01), 2)).toFixed(2);
    if (weight.value == '' || height.value == ''){return};
    if ((BMIvalue < 18.5)){
        var status = {
            state: '過輕',
            color: 'light',
        }
    } else if (BMIvalue >= 18.5 && BMIvalue < 25){
        var status = {
            state: '標準',
            color: 'normal',
        }
    } else if (BMIvalue >= 25 && BMIvalue < 30){
        var status = {
            state: '過重',
            color: 'heavy',
        }
    } else if (BMIvalue >= 30 && BMIvalue < 35){
        var status = {
            state: '輕度肥胖',
            color: 'fat',
        }
    } else if (BMIvalue >= 35 && BMIvalue < 40){
        var status = {
            state: '中度肥胖',
            color: 'fat',
        }
    } else if (BMIvalue >= 40){
        var status = {
            state: '重度肥胖',
            color: 'veryfat',
        }
    }
    var status2 ={
        BMI: BMIvalue,//BMI值
        weight: weightValue,//體重
        height: heightValue,//身高
        date: Today.getDate() + '-' + (Today.getMonth() + 1) + '-' + Today.getFullYear(),//檢測日期
    }
    data.push(status);
    var strDataString = JSON.stringify(data)////轉換成string(字串)
    localStorage.setItem('listData', strDataString);
    data2.push(status2);
    var strDataString2 = JSON.stringify(data2);
    localStorage.setItem('listData2', strDataString2);
    updateList(data); updateList(data2);
}
//更新資料
function updateList(e) {
    var len = e.length;
    str = '';
    for (var i = 0; i < len; i++) {
        str += '<li class ="list-class list-' + data[i].color +' mb-4"><div class="d-none d-sm-block col">' + data[i].state + '</div><div class="col"><small>BMI</small>' + data2[i].BMI + '</div><div class="col"><small>weight</small>' + data2[i].weight + 'kg</div><div class="col"><small>Height</small>' + data2[i].height + 'cm</div><div class="d-none d-md-block col text-right"><small>' + data2[i].date+'</small><a href="#"><i class="fas fa-trash" data-num='+i+'></i></a></div></li>';
    }
    listData.innerHTML = str;
}
////個別刪除
function deleteList(e) {
    e.preventDefault();
    var nodeName = e.target.nodeName;
    if (nodeName !== 'I') { return }; //當nodeName = "I" (false)才執行動作 不等於的時候(true) return 當中斷點不繼續動作
    var num = e.target.dataset.num;
    data.splice(num, 1);
    localStorage.setItem('listData', JSON.stringify(data))
    data2.splice(num, 1);
    localStorage.setItem('listData2', JSON.stringify(data2))
    updateList(data); updateList(data2)///更新內容
    ;///更新內容
}
///刪除全部
function deleteAll(e) {
    e.preventDefault();
    data = [];///讓資料庫內容變空值
    data2 = [];
    localStorage.setItem('listData', JSON.stringify(data));
    localStorage.setItem('listData2', JSON.stringify(data2));
    updateList(data); updateList(data2);
}
///監聽事件
resultBtn.addEventListener('click',countBMI);//計算BMI
resultBtn.addEventListener('click', goBack);//返回
resultBtn.addEventListener('click', addContent);//儲存資料
listData.addEventListener('click', deleteList);//個別刪除
delAll.addEventListener('click', deleteAll)//刪除全部
updateList(data); updateList(data2);