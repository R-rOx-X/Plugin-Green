/**
 * script.js - Unified & Optimized for Plugin Green
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- 1. PREMIUM SCROLL REVEAL ANIMATION ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // --- 2. DYNAMIC NUMBER COUNTER ---
    const countCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const speed = 200; 
        
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + inc > target ? target : count + inc;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));


    // --- 3. TAB SWITCHING (Unified Logic) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const timelineAchievements = document.getElementById('timeline-achievements');
    const timelineProducts = document.getElementById('timeline-products');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Toggle Button Active State
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Logic A: Toggle between two main containers (Achievements vs Products)
                if (timelineAchievements && timelineProducts) {
                    if (targetTab === 'achievements') {
                        timelineAchievements.classList.remove('hidden');
                        timelineProducts.classList.add('hidden');
                    } else if (targetTab === 'products') {
                        timelineAchievements.classList.add('hidden');
                        timelineProducts.classList.remove('hidden');
                    }
                }

                // Logic B: Filter individual timeline items by text/ID (if applicable)
                if (timelineItems.length > 0) {
                    timelineItems.forEach(item => {
                        const yearEl = item.querySelector('.timeline-year');
                        if (yearEl) {
                            const title = yearEl.textContent.toLowerCase();
                            item.style.display = title.includes(targetTab) ? 'block' : 'none';
                        }
                    });
                }
            });
        });
    }


    // --- 4. MOBILE MENU TOGGLE ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        const toggleMenu = () => {
            navLinks.classList.toggle('open');
            menuBtn.classList.toggle('open');
        };

        menuBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuBtn.classList.remove('open');
            });
        });
    }
});