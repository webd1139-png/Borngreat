// =========================================
// LINKEDINN CAR RENTAL - MAIN JAVASCRIPT
// =========================================

// --- Car Data (Real car images from Unsplash) ---
const cars = [
    {
        id: 1, name: 'Mercedes-Benz S-Class', category: 'luxury',
        price: 250, rating: 4.9, seats: 4, transmission: 'Automatic', fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1617766777571-9e7f9097228f?auto=format&fit=crop&w=800&q=80',
        desc: 'Ultimate luxury sedan for executive travel in Kumasi and Accra.'
    },
    {
        id: 2, name: 'Range Rover Vogue', category: 'luxury',
        price: 300, rating: 4.8, seats: 5, transmission: 'Automatic', fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
        desc: 'Premium SUV perfect for city and off-road adventures across Ghana.'
    },
    {
        id: 3, name: 'Toyota Land Cruiser V8', category: 'suv',
        price: 200, rating: 4.7, seats: 7, transmission: 'Automatic', fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
        desc: 'Rugged and reliable SUV ideal for family trips and long journeys.'
    },
    {
        id: 4, name: 'Toyota Highlander', category: 'suv',
        price: 180, rating: 4.6, seats: 7, transmission: 'Automatic', fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
        desc: 'Comfortable mid-size SUV with ample space for passengers and luggage.'
    },
    {
        id: 5, name: 'Toyota Corolla', category: 'economy',
        price: 60, rating: 4.5, seats: 5, transmission: 'Manual', fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1580273906647-d49fb6219c43?auto=format&fit=crop&w=800&q=80',
        desc: 'Fuel-efficient economy car perfect for daily city driving.'
    },
    {
        id: 6, name: 'Hyundai Sonata', category: 'economy',
        price: 70, rating: 4.4, seats: 5, transmission: 'Automatic', fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1562003816-12e7ed855c62?auto=format&fit=crop&w=800&q=80',
        desc: 'Stylish sedan with great mileage for business and leisure.'
    },
    {
        id: 7, name: 'Toyota Coaster Minibus', category: 'van',
        price: 150, rating: 4.7, seats: 20, transmission: 'Manual', fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad98e?auto=format&fit=crop&w=800&q=80',
        desc: 'Spacious minibus for group travel, weddings, and events in Ghana.'
    },
    {
        id: 8, name: 'Ford Transit Van', category: 'van',
        price: 130, rating: 4.6, seats: 15, transmission: 'Manual', fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1507746655936-10e0936531f9?auto=format&fit=crop&w=800&q=80',
        desc: 'Reliable cargo and passenger van for logistics and group transport.'
    }
];

// --- Reviews Data ---
const reviews = [
    { name: 'Vincent Kwabena', rating: 5, text: 'They are the best car rental service in Ghana so far...... I recommend it for everyone', time: '3 years ago' },
    { name: 'Acquah Samuel', rating: 5, text: 'They are amazing and great', time: '3 years ago' },
    { name: 'Marlene Quaicoe', rating: 5, text: 'Excellent service and professional drivers. Will rent again!', time: 'a year ago' },
    { name: 'Kofi Mensah', rating: 4, text: 'Great cars and fair pricing. Easy pickup at Airport Roundabout.', time: '6 months ago' }];

// --- Render Fleet ---
const carGrid = document.getElementById('car-grid');
function renderCars(filter = 'all') {
    carGrid.innerHTML = '';
    const filtered = filter === 'all' ? cars : cars.filter(c => c.category === filter);
    filtered.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card tilt-card reveal';
        card.innerHTML = `
            <div class="car-image" style="background-image: url('${car.image}')"></div>
            <div class="car-badge">${car.category.toUpperCase()}</div>
            <div class="car-content">
                <span class="car-category">${car.category}</span>
                <h3>${car.name}</h3>
                <div class="car-price">GH\u20B5${car.price}/day <span>/ per day</span></div>
                <div class="car-features">
                    <span><i class="fas fa-users"></i> ${car.seats} seats</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                </div>
                <p style="font-size:0.85rem;color:var(--text-muted);margin-top:12px;line-height:1.5;">${car.desc}</p>
                <button class="btn-primary btn-full" style="margin-top:16px;font-size:0.9rem;" onclick="bookCar('${car.name}')">Book Now</button>
            </div>
        `;
        carGrid.appendChild(card);
    });
}
window.bookCar = function(name) {
    const lower = name.toLowerCase();
    let cat = 'luxury';
    if (lower.includes('suv')) cat = 'suv';
    else if (lower.includes('van') || lower.includes('transit') || lower.includes('coaster')) cat = 'van';
    else if (lower.includes('corolla') || lower.includes('sonata')) cat = 'economy';
    document.getElementById('quick-book').category.value = cat;
    document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
};
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCars(btn.dataset.filter);
    });
});

// --- Render Reviews ---
const reviewsGrid = document.getElementById('reviews-grid');
// --- Navbar Scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    const btn = document.getElementById('back-to-top');
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
});

// --- Mobile Menu ---
const burger = document.getElementById('nav-burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => { navLinks.classList.remove('active'); });
});

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// --- Scroll Reveal ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- Tilt Card Effect ---
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// --- Forms ---
document.getElementById('quick-book').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const pickup = fd.get('pickup');
    const date = fd.get('date');
    const category = fd.get('category');
    const duration = fd.get('duration');
    alert('Quote request received!\n\nPickup Location: ' + pickup + '\nDate: ' + date + '\nCar Category: ' + category + '\nDuration: ' + duration + ' day(s)\n\nWe will contact you shortly with pricing.\n\nContact: WhatsApp +233 24 608 6365 or Call +233 59 905 5809');
});
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    e.target.reset();
});

// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
});
document.addEventListener('mousedown', () => { cursor.style.transform = 'translate(-50%,-50%) scale(0.7)'; dot.style.transform = 'translate(-50%,-50%) scale(0.5)'; });
document.addEventListener('mouseup', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; dot.style.transform = 'translate(-50%,-50%) scale(1)'; });
document.body.classList.add('cursor-active');

// --- Back to Top ---
document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
reviews.forEach(r => {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const el = document.createElement('div');
    el.className = 'review-card reveal';
    el.innerHTML = `
        <div class="review-stars">${stars}</div>
        <div class="review-text">"${r.text}"</div>
        <div class="review-author">
            <div><strong>${r.name}</strong><span>${r.time}</span></div>
        </div>
    `;
    reviewsGrid.appendChild(el);
});

// --- Render on load ---

// --- Three.js 3D Hero Animation ---
(function initHero3D() {
    const container = document.getElementById('hero-3d');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient + point light
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0xffd700, 1.5, 12);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);
    const fillLight = new THREE.PointLight(0x00d4ff, 0.8, 12);
    fillLight.position.set(-3, -1, 3);
    scene.add(fillLight);

    // Car image planes arranged in a 3D ring
    const textures = cars.map(c => new THREE.TextureLoader().load(c.image));
    const planes = [];
    const radius = 3.6;
    const count = Math.min(cars.length, 6);

    for (let i = 0; i < count; i++) {
        const geometry = new THREE.PlaneGeometry(1.9, 1.25);
        const material = new THREE.MeshStandardMaterial({
            map: textures[i],
            roughness: 0.2,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(geometry, material);
        const angle = (i / count) * Math.PI * 2;
        plane.position.x = Math.sin(angle) * radius;
        plane.position.z = Math.cos(angle) * radius;
        plane.position.y = Math.sin(i * 1.3) * 0.6;
        plane.rotation.y = angle;
        plane.rotation.x = 0.1;
        plane.userData = { car: cars[i], angle: angle };
        scene.add(plane);
        planes.push(plane);
    }

    // Floating particles
    const particlesGeo = new THREE.BufferGeometry();
    const pos = [];
    for (let i = 0; i < 120; i++) {
        pos.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 10);
    }
    particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0xffd700, size: 0.025, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    window.addEventListener('resize', () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

    // Raycaster for click interaction
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    container.addEventListener('click', (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(planes);
        if (intersects.length > 0) {
            const car = intersects[0].object.userData.car;
            bookCar(car.name);
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001;

        // Auto rotate group
        targetRotationY = mouseX * 0.5;
        targetRotationX = mouseY * 0.3;
        scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.05;
        scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.05;

        // Individual plane bobbing
        planes.forEach((p, i) => {
            p.position.y = Math.sin(time * 1.5 + i) * 0.25;
            p.rotation.z = Math.sin(time + i) * 0.05;
        });

        particles.rotation.y = time * 0.05;
        renderer.render(scene, camera);
    }
    animate();
})();
renderCars();
