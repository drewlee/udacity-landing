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

/** @type { (name: string) => HTMLElement } */
function makeEl(name) {
  return document.createElement(name);
}

/** @type { (link: HTMLAnchorElement, section: HTMLElement) => void } */
function setupLink(link, section) {
  link.classList.add('menu__link');
  link.href = `#${section.id}`;
  link.innerText = section.dataset.nav;
}

/**
 * End Helper Functions
 * Begin Main Functions
 */

// Build the nav
/** @type { () => DocumentFragment } */
function buildNavbar() {
  return Array.from(sectionEls).reduce((frag, sectionEl) => {
    const li = makeEl('li');
    const link = makeEl('a');

    setupLink(link, sectionEl);
  
    li.appendChild(link);
    frag.appendChild(li);
  
    return frag;
  }, document.createDocumentFragment());
}

/** @type { () => void } */
function renderNav() {
  const navbarFragment = buildNavbar();
  navbarListEl.appendChild(navbarFragment);
}

// Add class 'active' to section when near top of viewport
/** @type { (activeSection: HTMLElement) => void } */
function setActiveSection(activeSection) {
  sectionEls.forEach((section) => section.classList.remove(activeClassName));
  activeSection.classList.add(activeClassName);
}

/** @type { (evt: MouseEvent) => void } */
function navLinkHandler(evt) {
  const { target: el } = evt;

  if (el.tagName.toLowerCase() === 'a') {
    const id = el.getAttribute('href');
    const section = document.querySelector(id);

    // Set sections as active
    setActiveSection(section);

    // Scroll to anchor ID using scrollTo event
    section.scrollIntoView({ behavior: 'smooth' });

    evt.preventDefault();
  }
}

/**
 * End Main Functions
 * Begin Events
 */

// Build menu 
renderNav();

// Scroll to section on link click
navbarListEl.addEventListener('click', navLinkHandler);
