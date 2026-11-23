let vehicleExamples=[];
const grid=document.getElementById('vehicle-grid');
const FLEET_FALLBACK_IMAGE='assets/vehicles/hero.jpg';

async function loadVehicleFleet(){
  try{
    const response=await fetch('fleet.json',{cache:'no-store'});
    if(!response.ok)throw new Error(`Fleet data unavailable (${response.status})`);
    const data=await response.json();
    vehicleExamples=Array.isArray(data.fleet)?data.fleet:[];
  }catch(error){
    console.error(error);
    vehicleExamples=[];
    if(grid){
      grid.innerHTML='<p class="fleet-error" role="status">The vehicle list could not be loaded. Please refresh the page or contact us on 024 265 0673.</p>';
    }
    const count=document.getElementById('fleet-count');
    if(count)count.textContent='Fleet unavailable';
    return;
  }
  renderVehicles();
}

function renderVehicles(){
  if(!grid)return;
  const brand=document.getElementById('brand-filter')?.value||'All';
  const category=document.getElementById('category-filter')?.value||'All';
  const seats=document.getElementById('seats-filter')?.value||'All';
  const query=document.getElementById('vehicle-search')?.value.trim().toLowerCase()||'';
  const cars=vehicleExamples.filter(vehicle=>{
    const use=Array.isArray(vehicle.best_use)?vehicle.best_use:[];
    const matchesBrand=brand==='All'||vehicle.brand===brand;
    const matchesCategory=category==='All'||vehicle.category===category;
    const matchesSeats=seats==='All'||Number(vehicle.seats)>=Number(seats);
    const haystack=`${vehicle.brand||''} ${vehicle.name||''} ${use.join(' ')}`.toLowerCase();
    return matchesBrand&&matchesCategory&&matchesSeats&&haystack.includes(query);
  });

  if(!cars.length){
    grid.innerHTML='<p class="fleet-empty" role="status">No vehicles match your filters. Try clearing the search or filters.</p>';
  }else{
    grid.innerHTML=cars.map(vehicle=>{
      const use=Array.isArray(vehicle.best_use)?vehicle.best_use:[];
      const safeImage=vehicle.image||FLEET_FALLBACK_IMAGE;
      const safeAlt=vehicle.alt||`${vehicle.brand||''} ${vehicle.name||''} rental vehicle`;
      const price=vehicle.typical_daily_price_range_ghs||'Price: confirm with owner';
      const fullName=(vehicle.brand+' '+vehicle.name).replace(/'/g,"\\'");
      return `<article class="vehicle-card fade-ready"><div class="vehicle-image"><img loading="lazy" decoding="async" src="${safeImage}" alt="${safeAlt}" onerror="this.onerror=null;this.src='${FLEET_FALLBACK_IMAGE}';">${vehicle.most_rented?'<span class="vehicle-status most-rented">Most Rented</span>':''}</div><div class="vehicle-body"><span class="vehicle-brand">${vehicle.brand||''}</span><h3>${vehicle.name||''}</h3><div class="vehicle-price">${price}</div><div class="spec-row"><span>${vehicle.seats||''} seats</span><span>${vehicle.transmission||''}</span><span>${vehicle.fuel||''}</span></div><p class="vehicle-use">Best for: ${use.join(', ')}</p><div class="vehicle-actions"><button type="button" onclick="openVehicle(${vehicle.id})">View details</button><button type="button" class="book-small" onclick="openVehicleWhatsApp('${fullName}')">WhatsApp Enquiry</button></div></div></article>`;
    }).join('');
  }
  const count=document.getElementById('fleet-count');
  if(count)count.textContent=`${cars.length} vehicle${cars.length===1?'':'s'}`;
  observeFades();
}

function openVehicle(id){
  const vehicle=vehicleExamples.find(item=>item.id===id);
  if(!vehicle)return;
  const modalImage=document.getElementById('modal-image');
  modalImage.src=vehicle.image||FLEET_FALLBACK_IMAGE;
  modalImage.alt=vehicle.alt||`${vehicle.brand} ${vehicle.name}`;
  modalImage.onerror=function(){this.onerror=null;this.src=FLEET_FALLBACK_IMAGE;};
  document.getElementById('modal-brand').textContent=vehicle.brand;
  document.getElementById('modal-name').textContent=vehicle.name;
  document.getElementById('modal-seats').textContent=`Passengers: ${vehicle.seats}`;
  document.getElementById('modal-transmission').textContent=`Transmission: ${vehicle.transmission}`;
  document.getElementById('modal-fuel').textContent=`Fuel: ${vehicle.fuel}`;
  const priceSlot=document.querySelector('#vehicle-modal .modal-specs div:last-child');
  if(priceSlot)priceSlot.textContent=`Price: ${vehicle.typical_daily_price_range_ghs||'confirm with owner'}`;
  const use=Array.isArray(vehicle.best_use)?vehicle.best_use:[];
  document.getElementById('modal-description').textContent=`Best suited for ${use.join(', ')||'general rental'}. Availability, exact specification and final rental terms must be confirmed with Linkedinn before booking.`;
  document.getElementById('vehicle-modal').classList.add('open');
  document.getElementById('modal-book').onclick=()=>openVehicleWhatsApp(`${vehicle.brand} ${vehicle.name}`);
}
window.openVehicle=openVehicle;

function openVehicleWhatsApp(name){
  const preferredVehicle=document.getElementById('preferred-vehicle');
  if(preferredVehicle)preferredVehicle.value=name;
  const message=`Hello Linkedinn Car Rental Service, I would like to enquire about the ${name}. Please confirm availability and final price.`;
  window.open(`https://wa.me/233242650673?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
}
window.openVehicleWhatsApp=openVehicleWhatsApp;
window.bookVehicle=name=>openVehicleWhatsApp(name);

function closeModal(){document.getElementById('vehicle-modal')?.classList.remove('open')}
document.getElementById('modal-close')?.addEventListener('click',closeModal);
document.getElementById('vehicle-modal')?.addEventListener('click',event=>{if(event.target.id==='vehicle-modal')closeModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal()});

['brand-filter','category-filter','seats-filter','vehicle-search'].forEach(id=>{const element=document.getElementById(id);if(element)element.addEventListener(id==='vehicle-search'?'input':'change',renderVehicles)});

const nav=document.getElementById('premium-nav');
window.addEventListener('scroll',()=>nav?.classList.toggle('scrolled',scrollY>40));
document.getElementById('menu-toggle')?.addEventListener('click',()=>document.getElementById('premium-links').classList.toggle('open'));
document.querySelectorAll('#premium-links a').forEach(link=>link.addEventListener('click',()=>document.getElementById('premium-links').classList.remove('open')));

function observeFades(){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.fade-ready').forEach(element=>observer.observe(element));
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question=>{
  question.setAttribute('role','button');
  question.setAttribute('tabindex','0');
  question.setAttribute('aria-expanded','false');
  const toggle=()=>{
    const item=question.closest('.faq-item');
    if(!item)return;
    const isOpen=item.classList.toggle('open');
    question.setAttribute('aria-expanded',String(isOpen));
  };
  question.addEventListener('click',toggle);
  question.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
});

const booking=document.getElementById('booking-form');
booking?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(booking);
  const name=data.get('name')?.trim()||'';
  const phone=data.get('phone')?.trim()||'';
  const email=data.get('email')?.trim()||'';
  const vehicle=data.get('vehicle')||'';
  const pickup=data.get('pickup')||'';
  const pickupTime=data.get('pickupTime')||'';
  const rentalType=data.get('rentalType')||'';
  const ret=data.get('return')||'';
  const location=data.get('location')?.trim()||'';
  const destination=data.get('destination')?.trim()||'';
  const message=data.get('message')?.trim()||'';
  const error=document.getElementById('booking-error');
  error.textContent='';
  if(!name||!phone||!vehicle||!pickup||!ret||!location){error.textContent='Please complete all required fields.';return}
  if(new Date(ret)<new Date(pickup)){error.textContent='Return date cannot be before the pickup date.';return}
  const lines=[`Hello Linkedinn Car Rental Service,`,'',`I would like to make a vehicle rental enquiry:`,``,`Name: ${name}`,`Phone: ${phone}`,`Email: ${email||'Not provided'}`,`Vehicle: ${vehicle}`,`Pickup date: ${pickup}${pickupTime?` at ${pickupTime}`:''}`,`Return date: ${ret}`,`Rental type: ${rentalType||'Not specified'}`,`Pickup location: ${location}`,`Destination: ${destination||'Not provided'}`,`Message: ${message||'Not provided'}`,'','Please confirm availability, final price and rental arrangements.'];
  const text=encodeURIComponent(lines.join('\n'));
  const confirmation=document.getElementById('booking-confirmation');
  confirmation.style.display='block';
  confirmation.innerHTML=`<strong>Enquiry ready.</strong><br>This will open WhatsApp. Linkedinn must confirm availability and final arrangements; no booking is confirmed yet.<br><a class="gold-btn" style="margin-top:16px;width:220px" href="https://wa.me/233242650673?text=${text}" target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a>`;
  confirmation.scrollIntoView({behavior:'smooth',block:'nearest'});
});

loadVehicleFleet();
observeFades();
const today=new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input=>input.min=today);

const concierge=document.getElementById('concierge');
const conciergeLauncher=document.getElementById('concierge-launcher');
const conciergeMessages=document.getElementById('concierge-messages');
const chatForm=document.getElementById('chat-form');
const chatInput=document.getElementById('chat-input');

function addChatMessage(text,type='assistant'){
  const node=document.createElement('div');
  node.className=`chat-message ${type}`;
  node.textContent=text;
  conciergeMessages.appendChild(node);
  conciergeMessages.scrollTop=conciergeMessages.scrollHeight;
}
function conciergeAnswer(question){
  const q=question.toLowerCase();
  if(/location|address|where|kumasi|airport/.test(q))return'Linkedinn Car Rental Service is at Eastern By-pass, Airport Roundabout, Kumasi, Ghana.';
  if(/phone|call|number|contact/.test(q))return'Call 024 265 0673 or use +233 24 265 0673.';
  if(/hour|open|available|24/.test(q))return'Linkedinn is listed as open 24 hours.';
  if(/price|cost|rent|lease|rate/.test(q))return'Fleet prices are estimates and must be confirmed directly with Linkedinn.';
  if(/fleet|car|vehicle|suv|sedan|model/.test(q))return'Our fleet has 10 popular rental vehicles — Toyota, Hyundai and Kia — with brand, category and seat filters. Prices are estimates and must be confirmed with Linkedinn.';
  if(/book|booking|reserve|hire/.test(q))return'Complete the enquiry form and continue through WhatsApp. Linkedinn must confirm availability and final arrangements.';
  if(/service/.test(q))return'Linkedinn offers airport transportation, corporate rentals, personal transport and vehicle leasing.';
  if(/about|company|business/.test(q))return'Linkedinn Car Rental Service provides car rental and leasing around Airport Roundabout, Kumasi.';
  if(/whatsapp/.test(q))return'WhatsApp the team directly at +233 24 265 0673.';
  if(/rating|review/.test(q))return'Linkedinn has a 4.3 Google Business Profile rating.';
  return'I can help with the fleet, location, contact details, availability, services or reviews.';
}
function askConcierge(question){addChatMessage(question,'user');setTimeout(()=>addChatMessage(conciergeAnswer(question)),420)}
conciergeLauncher?.addEventListener('click',()=>{const open=concierge.classList.toggle('open');conciergeLauncher.setAttribute('aria-expanded',String(open));if(open)setTimeout(()=>chatInput.focus(),260)});
document.getElementById('concierge-close')?.addEventListener('click',()=>{concierge.classList.remove('open');conciergeLauncher.setAttribute('aria-expanded','false')});
chatForm?.addEventListener('submit',event=>{event.preventDefault();const value=chatInput.value.trim();if(!value)return;chatInput.value='';askConcierge(value)});
document.querySelectorAll('#chat-suggestions button').forEach(button=>button.addEventListener('click',()=>{const map={fleet:'Which vehicles are in the fleet?',location:'Where is Linkedinn located?',booking:'How do I make a booking enquiry?'};askConcierge(map[button.dataset.question])}));

const stage=document.querySelector('.hero-vehicle-stage');
if(stage&&matchMedia('(pointer:fine)').matches){document.addEventListener('mousemove',event=>{const x=(event.clientX/window.innerWidth-.5)*12;const y=(event.clientY/window.innerHeight-.5)*-8;stage.style.transform=`translate3d(${x}px,${y}px,0)`})}