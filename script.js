const services = [
  {name:"Fan Repair", price:300, icon:"🌀", desc:"Fan checking and basic repair"},
  {name:"Ceiling Fan Installation", price:500, icon:"🌀", desc:"Installation/service of ceiling fan"},
  {name:"Light Repair", price:200, icon:"💡", desc:"Light fault checking and repair"},
  {name:"LED Installation", price:200, icon:"🔆", desc:"LED light installation"},
  {name:"Switch Repair/Replacement", price:200, icon:"🔘", desc:"Switch checking or replacement"},
  {name:"Socket Repair/Replacement", price:250, icon:"🔌", desc:"Socket checking or replacement"},
  {name:"MCB/Breaker Repair", price:300, icon:"⚡", desc:"MCB/breaker checking"},
  {name:"Wiring Repair", price:500, icon:"🧰", desc:"Basic wiring fault repair"},
  {name:"Short Circuit Inspection", price:300, icon:"⚠️", desc:"Electrical fault inspection"},
  {name:"Inverter Installation/Repair", price:500, icon:"🔋", desc:"Inverter service"},
  {name:"Exhaust Fan Repair", price:300, icon:"🌀", desc:"Exhaust fan checking and repair"},
  {name:"Other Electrical Problem", price:200, icon:"🛠️", desc:"Describe your problem in the booking form"}
];

const grid=document.getElementById("serviceGrid");
const select=document.getElementById("service");
const bookingCharge=200;

services.forEach((s,i)=>{
  const card=document.createElement("article");
  card.className="service";
  card.innerHTML=`<div style="font-size:30px">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p><div class="price">₹${s.price}</div><button class="btn primary" data-index="${i}">Select Service</button>`;
  grid.appendChild(card);
  const opt=document.createElement("option");
  opt.value=i; opt.textContent=`${s.name} — ₹${s.price}`;
  select.appendChild(opt);
});
grid.addEventListener("click",e=>{
  if(!e.target.dataset.index)return;
  select.value=e.target.dataset.index;
  updateSummary();
  document.getElementById("booking").scrollIntoView({behavior:"smooth"});
});
select.addEventListener("change",updateSummary);
function updateSummary(){
  const s=services[Number(select.value)];
  document.getElementById("summaryService").textContent=s?s.name:"—";
  document.getElementById("summaryPrice").textContent=s?`₹${s.price}`:"₹0";
  document.getElementById("summaryTotal").textContent=s?`₹${s.price+bookingCharge}`:`₹${bookingCharge}`;
}
document.getElementById("date").min=new Date().toISOString().split("T")[0];

document.getElementById("bookingForm").addEventListener("submit",e=>{
  e.preventDefault();
  const phone=document.getElementById("phone").value.replace(/\D/g,"");
  if(phone.length!==10){alert("Please enter a valid 10-digit mobile number.");return;}
  const s=services[Number(select.value)];
  if(!s){alert("Please select a service.");return;}
  const id="PAT-"+Date.now().toString().slice(-8);
  const booking={
    id,name:document.getElementById("name").value.trim(),phone,address:document.getElementById("address").value.trim(),
    city:document.getElementById("city").value.trim(),pin:document.getElementById("pin").value.trim(),
    service:s.name,servicePrice:s.price,bookingCharge,total:s.price+bookingCharge,
    date:document.getElementById("date").value,time:document.getElementById("time").value,
    problem:document.getElementById("problem").value.trim(),status:"New",createdAt:new Date().toISOString()
  };
  const list=JSON.parse(localStorage.getItem("electricianBookings")||"[]");
  list.push(booking); localStorage.setItem("electricianBookings",JSON.stringify(list));
  const box=document.getElementById("confirmation");
  box.classList.remove("hidden");
  box.innerHTML=`<h3>Booking request submitted ✅</h3><p>Your Booking ID is <strong>${id}</strong>.</p><p>Service: <strong>${s.name}</strong><br>Estimated total: <strong>₹${booking.total}</strong></p><p>Please call <strong>9914076203</strong> or <strong>8872899634</strong> to confirm the request.</p>`;
  e.target.reset(); document.getElementById("city").value="Patiala"; document.getElementById("pin").value="147001"; updateSummary();
  box.scrollIntoView({behavior:"smooth"});
});
