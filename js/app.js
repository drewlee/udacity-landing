/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 */
const navbarListEl = document.getElementById('navbar__list');
const sectionEls = document.querySelectorAll('[data-nav]');
const activeClassName = 'active';

/**
 * End Global Variables
 * Start Helper Functions
 */

/**
 * End Helper Functions
 * Begin Main Functions
 */

// Build the nav
function buildNavbar() {
  return Array.from(sectionEls).reduce((frag, sectionEl) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
  
    link.classList.add('menu__link');
    link.href = `#${sectionEl.id}`;
    link.innerText = sectionEl.dataset.nav;
  
    li.appendChild(link);
    frag.appendChild(li);
  
    return frag;
  }, document.createDocumentFragment());
}

// Add class 'active' to section when near top of viewport
function setActiveSection(activeSectionEl) {
  sectionEls.forEach((section) => section.classList.remove(activeClassName));
  activeSectionEl.classList.add(activeClassName);
}

/**
 * End Main Functions
 * Begin Events
 */

// Build menu 
const navbarFragment = buildNavbar();
navbarListEl.appendChild(navbarFragment);

// Scroll to section on link click
navbarListEl.addEventListener('click', (evt) => {
  const el = evt.target;

  if (el.tagName.toLowerCase() === 'a') {
    const id = el.getAttribute('href');
    const section = document.querySelector(id);
    const rect = section.getBoundingClientRect();
    const top = document.body.scrollTop + rect.top;

    // Set sections as active
    setActiveSection(section);

    // Scroll to anchor ID using scrollTo event
    window.scrollTo({ top, behavior: 'smooth'});

    evt.preventDefault();
  }
});
