'use strict';
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

const activeClassName = 'active';
const navLinkClassName = 'menu__link';

/** @type { NodeListOf<HTMLAnchorElement> } */
let linkEls;

/** @type { HTMLUListElement } */
let navbarListEl;

/** @type { NodeListOf<HTMLElement> } */
let sectionEls;

/**
 * End Global Variables
 * Start Helper Functions
 */

/** @type { (name: string) => HTMLElement } */
function makeEl(name) {
  return document.createElement(name);
}

/** @type { (link: HTMLAnchorElement, isActive: boolean, section: HTMLElement) => void } */
function setupLink(link, isActive, section) {
  const className = [link.className, navLinkClassName, isActive ? activeClassName : ''].filter((name) => name !== '').join(' ');
  const attrs = {
    href: `#${section.id}`,
    innerText: section.dataset.nav,
    className,
  };

  Object.entries(attrs).forEach(([property, value]) => link[property] = value);
}

/** @type { (...elTuples: [HTMLElement, HTMLElement][]) => void } */
function appendChildAll(...elTuples) {
  elTuples.forEach(([parent, child]) => parent.appendChild(child));
}

/**
 * End Helper Functions
 * Begin Main Functions
 */

// Build the nav
/** @type { () => DocumentFragment } */
function buildNavbar() {
  return Array.from(sectionEls).reduce((frag, sectionEl, index) => {
    // First link is active by default
    const isActive = index === 0;
    const link = makeEl('a');
    const li = makeEl('li');

    setupLink(link, isActive, sectionEl);
    appendChildAll([li, link], [frag, li]);

    return frag;
  }, document.createDocumentFragment());
}

/** @type { () => void } */
function renderNav() {
  const navbarFragment = buildNavbar();
  navbarListEl.appendChild(navbarFragment);
}

// Add class 'active' to section when near top of viewport and nav link
/** @type { (elsToDeactivate: NodeListOf<HTMLElement>, elToActivate: HTMLElement) => void } */
function setActiveElement(elsToDeactivate, elToActivate) {
  elsToDeactivate.forEach((el) => el.classList.remove(activeClassName));
  elToActivate.classList.add(activeClassName);
}

/** @type { (evt: MouseEvent) => void } */
function navLinkHandler(evt) {
  const { target: el } = evt;

  if (el.tagName.toLowerCase() === 'a') {
    const idSelector = el.getAttribute('href');
    const section = document.querySelector(idSelector);

    // Set sections as active
    setActiveElement(sectionEls, section);

    // Set navigation links as active
    setActiveElement(linkEls, el);

    // Scroll to section using scrollIntoView function
    section.scrollIntoView({ behavior: 'smooth' });

    evt.preventDefault();
  }
}

/**
 * End Main Functions
 * Begin Events
 */

// Enable functionality regardless of script placement
document.addEventListener('DOMContentLoaded', () => {
  navbarListEl = document.getElementById('navbar__list');
  sectionEls = document.querySelectorAll('[data-nav]');

  // Build menu
  renderNav();

  linkEls = document.querySelectorAll(`.${navLinkClassName}`);

  // Scroll to section on link click
  navbarListEl.addEventListener('click', navLinkHandler);
});
