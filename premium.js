const vehicleExamples=[
{id:1,brand:'Toyota',name:'Corolla',category:'Compact Sedan',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/sedan-blue.jpg'},
{id:2,brand:'Toyota',name:'Camry',category:'Mid-size Sedan',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/sedan-gray.jpg'},
{id:3,brand:'Toyota',name:'RAV4',category:'Compact SUV',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/family-suv.jpg'},
{id:4,brand:'Toyota',name:'Land Cruiser Prado',category:'Mid-size SUV',seats:7,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/prado.jpg'},
{id:5,brand:'Toyota',name:'Land Cruiser',category:'Full-size SUV',seats:7,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/land-cruiser.jpg'},
{id:6,brand:'Toyota',name:'Yaris',category:'Economy Hatchback',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/city-car.jpg'},
{id:7,brand:'Hyundai',name:'Elantra',category:'Mid-size Sedan',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/economy-car.jpg'},
{id:8,brand:'Hyundai',name:'Tucson',category:'Mid-size SUV',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/suv-white.jpg'},
{id:9,brand:'Hyundai',name:'Accent',category:'Compact Sedan',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/hyundai.jpg'},
{id:10,brand:'Kia',name:'Rio',category:'Economy Hatchback',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/hatch-red.jpg'},
{id:11,brand:'Kia',name:'Sportage',category:'Compact SUV',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/suv-white.jpg'},
{id:12,brand:'Honda',name:'Civic',category:'Compact Sedan',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/sedan-gray.jpg'},
{id:13,brand:'Honda',name:'CR-V',category:'Mid-size SUV',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/family-suv.jpg'},
{id:14,brand:'Nissan',name:'X-Trail',category:'Mid-size SUV',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/suv-white.jpg'},
{id:15,brand:'Nissan',name:'Patrol',category:'Full-size SUV',seats:7,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/land-cruiser.jpg'},
{id:16,brand:'Suzuki',name:'Vitara',category:'Compact SUV',seats:5,transmission:'Automatic',fuel:'Petrol',image:'assets/vehicles/family-suv.jpg'}];

const grid=document.getElementById('vehicle-grid');
function renderVehicles(){const brand=document.getElementById('brand-filter').value;const category=document.getElementById('category-filter').value;const seats=document.getElementById('seats-filter').value;const query=document.getElementById('vehicle-search').value.trim().toLowerCase();const cars=vehicleExamples.filter(v=>(brand==='All'||v.brand===brand)&&(category==='All'||v.category===category)&&(seats==='All'||v.seats>=Number(seats))&&(v.name+' '+v.brand).toLowerCase().includes(query));grid.innerHTML=cars.map(v=>`<article class="vehicle-card fade-ready"><div class="vehicle-image"><img loading="lazy" src="${v.image}" alt="${v.brand} ${v.name} vehicle example" onerror="this.onerror=null;this.src='assets/vehicles/hero.jpg';"><span class="vehicle-status">Illustrative example</span></div><div class="vehicle-body"><span class="vehicle-brand">${v.brand}</span><h3>${v.name}</h3><div class="spec-row"><span>${v.seats} seats</span><span>${v.transmission}</span><span>${v.fuel}</span></div><div class="vehicle-actions"><button onclick="openVehicle(${v.id})">View details</button><button class="book-small" onclick="bookVehicle('${v.brand} ${v.name}')">Enquire</button></div></div></article>`).join('');document.getElementById('fleet-count').textContent=`${cars.length} curated examples`;observeFades();}
function openVehicle(id){const v=vehicleExamples.find(x=>x.id===id);document.getElementById('modal-image').src=v.image;document.getElementById('modal-image').alt=`${v.brand} ${v.name}`;document.getElementById('modal-brand').textContent=v.brand;document.getElementById('modal-name').textContent=v.name;document.getElementById('modal-seats').textContent=`Passengers: ${v.seats}`;document.getElementById('modal-transmission').textContent=`Transmission: ${v.transmission}`;document.getElementById('modal-fuel').textContent=`Fuel: ${v.fuel}`;document.getElementById('modal-description').textContent=`A ${v.category.toLowerCase()} profile in the proposed collection. Availability, exact specification and rental terms must be confirmed with Linkedinn Car Rental Service before booking.`;document.getElementById('vehicle-modal').classList.add('open');document.getElementById('modal-book').onclick=()=>bookVehicle(`${v.brand} ${v.name}`);}
window.openVehicle=openVehicle;
window.bookVehicle=function(name){document.getElementById('vehicle-modal').classList.remove('open');document.getElementById('preferred-vehicle').value=name;document.getElementById('booking').scrollIntoView({behavior:'smooth'});};
function closeModal(){document.getElementById('vehicle-modal').classList.remove('open')}
document.getElementById('modal-close').addEventListener('click',closeModal);document.getElementById('vehicle-modal').addEventListener('click',e=>{if(e.target.id==='vehicle-modal')closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
['brand-filter','category-filter','seats-filter','vehicle-search'].forEach(id=>document.getElementById(id).addEventListener(id==='vehicle-search'?'input':'change',renderVehicles));

const nav=document.getElementById('premium-nav');window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));document.getElementById('menu-toggle').addEventListener('click',()=>document.getElementById('premium-links').classList.toggle('open'));document.querySelectorAll('#premium-links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('premium-links').classList.remove('open')));

function observeFades(){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.fade-ready').forEach(el=>observer.observe(el))}

const booking=document.getElementById('booking-form');booking.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(booking);const name=data.get('name').trim(),phone=data.get('phone').trim(),vehicle=data.get('vehicle'),pickup=data.get('pickup'),ret=data.get('return'),location=data.get('location').trim(),destination=data.get('destination').trim(),message=data.get('message').trim();const error=document.getElementById('booking-error');error.textContent='';if(!name||!phone||!vehicle||!pickup||!ret||!location){error.textContent='Please complete all required fields.';return}if(new Date(ret)<new Date(pickup)){error.textContent='Return date cannot be before the pickup date.';return}const text=`Hello Linkedinn Car Rental Service,%0A%0AI would like to make a vehicle rental enquiry:%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AVehicle: ${encodeURIComponent(vehicle)}%0APickup date: ${pickup}%0AReturn date: ${ret}%0APickup location: ${encodeURIComponent(location)}%0ADestination: ${encodeURIComponent(destination||'Not provided')}%0AMessage: ${encodeURIComponent(message||'Not provided')}%0A%0APlease confirm availability and arrangements.`;const confirmation=document.getElementById('booking-confirmation');confirmation.style.display='block';confirmation.innerHTML=`<strong>Enquiry ready.</strong><br>This will open WhatsApp. Linkedinn will confirm availability and final arrangements; no booking is confirmed yet.<br><a class="gold-btn" style="margin-top:16px;width:220px" href="https://wa.me/233242650673?text=${text}" target="_blank" rel="noopener">Continue on WhatsApp</a>`;confirmation.scrollIntoView({behavior:'smooth',block:'nearest'})});

const today=new Date().toISOString().split('T')[0];document.querySelectorAll('input[type="date"]').forEach(i=>i.min=today);renderVehicles();observeFades();

// Linkedinn autonomous website concierge
const concierge=document.getElementById('concierge');
const conciergeLauncher=document.getElementById('concierge-launcher');
const conciergePanel=document.getElementById('concierge-panel');
const conciergeMessages=document.getElementById('concierge-messages');
const chatForm=document.getElementById('chat-form');
const chatInput=document.getElementById('chat-input');

function openConcierge(){concierge.classList.add('open');conciergeLauncher.setAttribute('aria-expanded','true');setTimeout(()=>chatInput.focus(),260)}
conciergeLauncher.addEventListener('click',()=>{const open=concierge.classList.toggle('open');conciergeLauncher.setAttribute('aria-expanded',String(open));if(open)setTimeout(()=>chatInput.focus(),260)});
document.getElementById('concierge-close').addEventListener('click',()=>{concierge.classList.remove('open');conciergeLauncher.setAttribute('aria-expanded','false')});

function addChatMessage(text,type='assistant'){const node=document.createElement('div');node.className=`chat-message ${type}`;node.textContent=text;conciergeMessages.appendChild(node);conciergeMessages.scrollTop=conciergeMessages.scrollHeight}

function conciergeAnswer(question){const q=question.toLowerCase();
 if(/location|address|where|kumasi|airport/.test(q))return 'Linkedinn Car Rental Service is at Eastern By-pass, Airport Roundabout, Kumasi, Ghana.';
 if(/phone|call|number|contact/.test(q))return 'You can call 024 265 0673 or use the international format +233 24 265 0673.';
 if(/hour|open|available|24/.test(q))return 'The business is listed as open 24 hours.';
 if(/price|cost|rent|lease|rate/.test(q))return 'Rental prices are not currently published. Please use the booking enquiry or WhatsApp to confirm pricing and vehicle availability directly.';
 if(/fleet|car|vehicle|suv|sedan|model/.test(q))return 'The fleet section contains a 28-model illustrative collection of practical and mid-range vehicles, with search and filter tools. Only confirmed vehicles should be treated as available inventory.';
 if(/book|booking|reserve|hire/.test(q))return 'Complete the booking enquiry form with your name, phone, vehicle, pickup and return dates. It prepares a WhatsApp message; the team must confirm availability before a booking is confirmed.';
 if(/service/.test(q))return 'You can enquire about vehicle rentals, personal transportation, corporate rentals, airport transportation and vehicle leasing.';
 if(/about|company|business/.test(q))return 'Linkedinn Car Rental Service provides car rental and leasing services in Kumasi, Ghana. It is located around Eastern By-pass, Airport Roundabout.';
 if(/whatsapp/.test(q))return 'WhatsApp the team directly at +233 24 265 0673 using the green floating button.';
 if(/rating|review/.test(q))return 'The verified Google Business Profile rating is 4.3 out of 5 from 4 reviews.';
 return 'I can help with fleet models, booking enquiries, location, contact details, availability, services or reviews. Please ask one of those questions.';
}

function askConcierge(question){addChatMessage(question,'user');const answer=conciergeAnswer(question);setTimeout(()=>addChatMessage(answer,'assistant'),420)}
chatForm.addEventListener('submit',e=>{e.preventDefault();const value=chatInput.value.trim();if(!value)return;chatInput.value='';askConcierge(value)});
document.querySelectorAll('#chat-suggestions button').forEach(button=>button.addEventListener('click',()=>{const questionMap={fleet:'Which vehicles are in the fleet?',location:'Where is Linkedinn located?',booking:'How do I make a booking enquiry?'};askConcierge(questionMap[button.dataset.question])}));

const stage=document.querySelector('.hero-vehicle-stage');
if(stage&&matchMedia('(pointer:fine)').matches){document.addEventListener('mousemove',e=>{const x=(e.clientX/window.innerWidth-.5)*12;const y=(e.clientY/window.innerHeight-.5)*-8;stage.style.transform=`translate3d(${x}px,${y}px,0)`})}