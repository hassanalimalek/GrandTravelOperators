// Google Map Function
function initMap(){

    // Your Location
    const loc = { lat:42.361145, lng:-71.057083};
    
    // Centered map on location
    const map = new google.maps.Map(document.querySelector('.map')
    ,{
        zoom:14,
        center:loc
    });

    // The marker, positioned at location
    const marker = new google.maps.Marker({position: loc,map:map});

}

// View More & View Less
const viewBtn = document.querySelector('.viewBtn');
var elmntToView = document.getElementById("destinations");
const destinationCard = document.querySelectorAll('.special')
viewBtn.addEventListener('click',()=>{
   console.log(typeof(destinationCard))
   destinationCard.forEach(element => {
       element.classList.toggle('hidden');
   });
   if(viewBtn.textContent.includes('More')){
        viewBtn.textContent="View Less"
        elmntToView.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
       
   }
   else{
       viewBtn.textContent="View More"
       elmntToView.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
   }
})


const exploreBtn = document.querySelectorAll('.exploreBtn')

exploreBtn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        localStorage.setItem('city',e.target.parentElement.previousElementSibling.innerHTML);
    });
})
