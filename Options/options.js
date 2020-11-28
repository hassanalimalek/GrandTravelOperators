const cityOptions = document.querySelector('.cityOptions');
const cityOption = document.querySelectorAll('.cityOption');
// Main Buttons
const crossBtn= document.querySelector('.crossBtn');
const backBtn = document.querySelector('.backBtn');
const formBtn = document.querySelector('.formBtn');
const dpButtons = document.querySelector('.dpButtons');
// Overlays
const formOverlay = document.querySelector('#formOverlay');
const billOverlay = document.querySelector('#billOverlay');
const confirmBillOverlay = document.querySelector('#confirmBillOverlay');
const billInfo = document.querySelector('.billInfo');
// Download and Print Buttons
const downloadInvoice = document.querySelector('.downloadInvoice')
const printInvoice = document.querySelector('.printInvoice')
const overlayInfo = document.querySelector('.overlayInfo');
const form = document.querySelector('#form');
const billDetails = document.querySelector('.billDetails');
// For Rendering Html based on City
const cityTitle = document.querySelector('.cityTitle');
const campPrice = document.querySelector('.campPrice');
const hostelPrice = document.querySelector('.hostelPrice');
const bnbPrice = document.querySelector('.bnbPrice');
const hotelPrice = document.querySelector('.hotelPrice');
const resortPrice = document.querySelector('.resortPrice');

// Renders the City Name and Prices based on city Selected
render();
function render(){
    let cityName = localStorage.getItem('city')
    const cityBasePrice = {
        London:80,
        Paris:70,
        Madrid:40,
        Geneva:80,
        Rome:50,
        Sydney:50,
        Amsterdam:60
    }
    cityTitle.innerHTML=`
    <h1>${cityName}</h1>
    <p>Accomodation Options</p>
    `
    
    campPrice.innerHTML=`Starting from <span class="euroSign">&#163</span>${cityBasePrice[cityName]+(cityBasePrice[cityName]*0.10)} per Night`;
    hostelPrice.innerHTML=`Starting from <span class="euroSign">&#163</span>${cityBasePrice[cityName]+(cityBasePrice[cityName]*0.20)} per Night`;
    bnbPrice.innerHTML=`Starting from <span class="euroSign">&#163</span>${cityBasePrice[cityName]+(cityBasePrice[cityName]*0.30)} per Night`;
    hotelPrice.innerHTML=`Starting from <span class="euroSign">&#163</span>${cityBasePrice[cityName]+(cityBasePrice[cityName]*0.40)} per Night`;
    resortPrice.innerHTML=`Starting from <span class="euroSign">&#163</span>${cityBasePrice[cityName]+(cityBasePrice[cityName]*0.60)} per Night`;
    
    
}

// Rendering Accomodation function based on user click.
cityOptions.addEventListener('click',(e)=>{
    if(e.target.classList.contains("bookBtn")){
        const parent = e.target.parentElement.parentElement.parentElement;
        if(parent.id=='camp'){
            camp()
        }
        else if (parent.id =='hostel'){
            hostel()
        }
        else if (parent.id =='bnb'){
            bnb()
        }
        else if (parent.id =='hotel'){
            hotel()
        }
        else if (parent.id == 'resort'){
             resort();
        }
        
    }
    
});

// Form event listner
let userInput='';
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    userInput = getFormInfo();
    console.log("Form Event Exectution Started")
    console.log(userInput)
    if(!userInput){ 
        return null;
    }
    accomodationType = overlayInfo.firstElementChild.textContent.toLowerCase();
    price = priceFinder(localStorage.getItem('city').toLowerCase(),accomodationType,userInput[3],userInput[4],userInput[5]);
    billingNumber = billNumGen(localStorage.getItem('city'));
    let accomodation = overlayInfo.firstElementChild.textContent;
    billInfo.innerHTML =`<div class="billLine"> <h2>${accomodation} Booking</h2></div>  <div class="billLine">
    <h4 class="inline">Name:</h4><p class="inline"> ${userInput[0]}</p>
</div>
<div class="billLine">
    <h4 class="inline">Email:</h4><p class="inline"> ${userInput[1]}</p>
</div>
<div class="billLine">
    <h4 class="inline">Number of Guests:</h4><p class="inline"> ${userInput[3]}</p>
</div>
<div class="billLine">
    <h4 class="inline">Check-In Date:</h4><p class="inline"> ${userInput[4]}</p>
</div>
<div class="billLine">
    <h4 class="inline">Check-Out Date:</h4><p class="inline"> ${userInput[5]}</p>
</div>
<div class="billLine">
    <h4 class="inline">Booking Number:</h4><p class="inline"> ${billingNumber}</p>
</div>
<div class="billLine">
    <h4 class="inline">Total Bill:</h3><p class="inline"> ${price}<span class="poundSymbol"></span> &#163;</p>
</div>
<button class="confirmBtn">Confirm Booking</button>` 
    dpButtons.classList.add('hidden');     
    billOverlay.classList.toggle('hidden');   
    
});

// Generate Billing number
function billNumGen(city){
    const cities = {
        London:'LCY',
        Paris:'CDG',
        Madrid:'MAD',
        Geneva:'GVA',
        Rome:'FCO',
        Sydney:'SYD',
        Amsterdam:'AMS'
    }
    return (cities[city]+(Math.floor(Math.random() * 100000000)));
}

// Get UserInput from all form fields and Date Validation. 
function getFormInfo(){
    let name = form.name.value;
    let email = form.email.value;
    let number = form.phone.value;
    let guests = form.guests.value;
    let checkIn = form.checkinDate.value;
    let checkOut = form.checkoutDate.value
    if(Date.parse(checkIn) <= Date.parse(checkOut)){
        return [name,email,number,guests,checkIn,checkOut];
    }
    else{
        alert("Check Out Date cannot be before Check In Date")
        return false
    }
}

// Calculate Number of days between dates
function calcDays(checkIn,checkOut){
    console.log("check In "+checkIn+"------ CHECK out"+checkOut)
    function parseDate(str) {
        var mdy = str.split('-');
        return( new Date(mdy[0], mdy[1]-1, mdy[2]));
    
    }
    function datediff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number.
        return Math.round((second-first)/(1000*60*60*24));
    }
    days = datediff(parseDate(checkIn.toString()),parseDate(checkOut.toString()));
    console.log("Days Difference "+(Number(days)+Number(1)))
    return days+1
    
    
}

// Find Booking Season
function seasonFinder(checkIn,checkOut){
    const days = {
      
    }
    // Get Days in a month
    var getDaysInMonth = function(month) {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
       return new Date(2020, month, 0).getDate();
      // Here January is 0 based
      // return new Date(year, month+1, 0).getDate();
      };
    var checkInSplit = checkIn.split('-');
    var checkOutSplit = checkOut.split('-');
    days[Number(checkInSplit[1])]=(getDaysInMonth(checkInSplit[1])-(checkInSplit[2]));
    if(checkInSplit[1]!=checkOutSplit[1]){
        var currMonth = Number(checkInSplit[1])+1;
        let counter = 1;
        while(currMonth!=checkOutSplit[1]){
            days[Number(checkInSplit[1])+counter]=getDaysInMonth(Number(checkInSplit[1])+counter);
            currMonth++;counter++;
        }
        days[checkOutSplit[1]]=(getDaysInMonth(checkOutSplit[1])-checkOutSplit[2]);
    }
    let seasonTwoDays =0
    let seasonThreeDays =0
    let keys = Object.keys(days);
    keys.forEach(key => {
        if(key=="4" || key =="5" ||key=="6" || key =="7" || key =="8" ){
            seasonTwoDays+=days[key];
        }
        else if (key=="2"|| key=="3"){
            seasonThreeDays+=days[key]
        }
    });
    console.log("111111111111");
    console.log(seasonTwoDays)
    return [seasonTwoDays,seasonThreeDays];
}

// Calculate the price of the Stay
function priceFinder(city,accomdationType,guests,checkIn,checkOut){
    let londonBase = 80;
    let parisBase = 70;
    let madridBase = 40;
    let genevaBase =80;
    let romeBase = 50;
    let sydneyBase = 100;
    let amsterdamBase = 60;
    // Final Price Calculator
    function totalPrice(cityBasePrice,seasonTwoTax,seasonThreeTax,seasonTwoDays,seasonThreeDays,accomoType,guests,days){
        let accomoTaxes = {
            camp:0.10,
            hostel:0.20,
            bnb:0.30,
            hotel:0.40,
            resort:0.60
        }
        let accomodationTax = cityBasePrice*accomoTaxes[accomoType];
        let seasonTwoTotalTax = (cityBasePrice*seasonTwoTax)*seasonTwoDays;
        let seasonThreeTotalTax = (cityBasePrice*seasonThreeTax)*seasonThreeDays;
        let finalPrice = ((cityBasePrice*days)+accomodationTax+seasonTwoTotalTax+seasonThreeTotalTax)*guests;
        return finalPrice

    }
    seasonDays = seasonFinder(checkIn,checkOut); 
    days = calcDays(checkIn,checkOut)
    if(city=='london')return (totalPrice(londonBase,0.25,0,seasonDays[0],seasonDays[1],accomdationType,guests,days));
    if(city=='paris')return (totalPrice(parisBase,0.22,0,seasonDays[0],seasonDays[1],accomdationType,guests,days));
    if(city=='madrid')return (totalPrice(madridBase,0.18,0,seasonDays[0],seasonDays[1],accomdationType,guests,days));
    if(city=='geneva')return (totalPrice(genevaBase,0.20,0,seasonDays[0],seasonDays[1],accomdationType,guests,days));
    if(city=='rome') return (totalPrice(romeBase,0.20,0,seasonDays[0],seasonDays[1],accomdationType,guests,days));
    if(city=='sydney')return (totalPrice(sydneyBase,-0.18,0.10,seasonDays[0],seasonDays[1],accomdationType,guests,days));
    if(city=='amsterdam')return (totalPrice(amsterdamBase,0.20,0,seasonDays[0],seasonDays[1],accomdationType,guests,days));
    
}

// Cross Button event listner
crossBtn.addEventListener('click',(e)=>{
    formOverlay.classList.toggle('hidden')
    });
// Back Button event listner
backBtn.addEventListener('click',(e)=>{
    billOverlay.classList.toggle('hidden');
    dpButtons.classList.toggle('hidden');
});


// Bill Overlay
billOverlay.addEventListener('click',(e)=>{
    console.log(e.target);
    if(e.target.classList.contains('confirmBtn')){
        confirmBillOverlay.classList.toggle('hidden');
        setTimeout(()=>{
            e.target.remove();
            dpButtons.classList.remove('hidden');
            confirmBillOverlay.classList.toggle('hidden');
        },3000);
     
    }
});

// Download Event Listner
downloadInvoice.addEventListener('click',()=>{
var doc = new jsPDF();
doc.fromHTML(`<html><head><title>"Title"</title></head></head><body style="border: 1px solid black; padding:25px;"><h1>Invoice</h1>`
+ billInfo.innerHTML + `</body></html>`);
 doc.save('Invoice.pdf');
});

// Print Event Listner
printInvoice.addEventListener('click',()=>{
    
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    
    mywindow.document.write(`<html><head><title>GTO</title>`);
    mywindow.document.write('</head><body style="border: 1px solid black; padding:25px;"><h1>Invoice</h1>');
    mywindow.document.write(billInfo.innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;  
});


// Camp Title Render
function camp(){
    form.reset()
    overlayInfo.innerHTML=` <h2>Camp</h2>
    <p>The Camping experience you desire.</p>`
    formOverlay.classList.toggle('hidden');

}
// Hostel Title Render
function hostel(){
    form.reset()
    overlayInfo.innerHTML=` <h2>Hostel</h2>
    <p>The Hostel experience you desire.</p>`
    formOverlay.classList.toggle('hidden');
    console.log(form.classList);
}
// bnb Title Render
function bnb(){
    form.reset()
    overlayInfo.innerHTML=` <h2>BnB</h2>
    <p>The BnB experience you desire.</p>`
    formOverlay.classList.toggle('hidden');
    console.log(form.classList);
}
// Hotel Title Render
function hotel(){
    form.reset()
    overlayInfo.innerHTML=` <h2>Hostel</h2>
    <p>The Hostel experience you desire.</p>`
    formOverlay.classList.toggle('hidden');
    console.log(form.classList);
}
// Resort Title Render
function resort(){
    form.reset()
    overlayInfo.innerHTML=` <h2>Resort</h2>
    <p>The Resort experience you desire.</p>`
    formOverlay.classList.toggle('hidden');
    console.log(form.classList);
}


