///////////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS //////////////////////////////////////////////////////////////////////////////

// Get elements from the DOM //////////////////////////////////////////////////////////////
const expoUnits = document.querySelectorAll(".exp-unit");

// All Rights Reserved, Correct Year Specification ////////////////////////////////////////
const smallFontElements = document.querySelectorAll(".smallfont");
const currentYearSpan = document.getElementById('currentYear');
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// NavigationBar //////////////////////////////////////////////////////////////////////////
let navOverlay = false;
let progress = 1;
const overlayIndex = () => document.querySelector(".topmost").style.backdropFilter = 'none';
const overlayIndexBack = () => document.querySelector(".topmost").style.backdropFilter = 'blur(2px)';
if (!navOverlay) overlayIndex();
const setNavWidth = width => document.getElementById("navCloak").style.width = width;
const OpenNavbarFullWidth = () => {
    document.getElementById("goToTopButton").style.display = "none";
    document.body.classList.add('no-scroll');
    overlayIndex();
    setNavWidth("100%")
};
const closeNavbarFullWidth = () => {
    document.getElementById("goToTopButton").style.display = "block";
    document.body.classList.remove('no-scroll');
    overlayIndexBack();
    setNavWidth("0%");
};

///////////////////////////////////////////////////////////////////////////////////////////
// Main Scripts ///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function to add event listeners to linked routes
const addLinkedRouteListeners = (color) => {
    expoUnits.forEach(elementParent => {
        const linkedRoute = elementParent.querySelector(".linked-route");
        linkedRoute.style.color = color;

        ["mouseover", "mouseout"].forEach(eventType => {
            elementParent.addEventListener(eventType, () => {
                elementParent.style.cursor = eventType === "mouseover" ? "pointer" : "auto";
            });
        });

        elementParent.addEventListener("click", (event) => {
            event.preventDefault();
            const linkUrl = linkedRoute.getAttribute("href");
            linkUrl && window.open(linkUrl, '_blank'); // Open link in new tab if linkUrl exists
        });
    });
};


// Navbar Clicks //////////////////////////////////////////////////////////////////////////
document.getElementById("navigationBar").addEventListener("click", function () { navOverlay = true; OpenNavbarFullWidth(); });
// console.log("Clicked element:", event.target.id);
document.addEventListener("click", event => {
    const scrollLinks = ["navCloak", "scrollToWorkExperience", "scrollToSideProjects", "scrollToLinks", "scrollToAbout", "linked-icon-nav1", "linked-icon-nav2", "linked-icon-nav3", "linked-icon-nav4"].map(id => document.getElementById(id));
    if (scrollLinks.some(link => link === event.target || link === event.target.parentElement)) { closeNavbarFullWidth(); navOverlay = false; }

    const CloakIDs = ["WE-UVR-Cloak", "WE-DE-Cloak", "SE-RuBiS-Cloak", "SE-WeTR-Cloak", "SE-TTT-Cloak", "SE-TRe-Cloak"].map(id => document.getElementById(id));
    if (CloakIDs.some(cloak => cloak === event.target || cloak === event.target.parentElement || cloak === event.target.parentElement.parentElement)) CloakBarCL();
});


// Navbar Greyish Design //////////////////////////////////////////////////////////////////
window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const startScroll = 0;
    const endScroll = 1000;
    progress = Math.min(1, (scrollPosition - startScroll) / (endScroll - startScroll));
    const blurValue = 2 * progress;

    // console.log(navOverlay);
    if (!navOverlay) {
        const topBlurEffect = document.querySelector(".topmost");
        const imageElement = topBlurEffect.querySelector('#arfazhxsse');
        const iconElement = topBlurEffect.querySelector('.material-icons');

        topBlurEffect.style.backgroundColor = `rgba(0, 0, 0, ${0.2 * progress})`;
        // console.log(5 * progress);
        topBlurEffect.style.backdropFilter = `blur(${3 * progress}px)`; // Use blurValue variable
        // topBlurEffect.style.border = `${1 * progress}px solid rgb(235, 238, 241)`;
        // imageElement.src = progress < 0.5 ? "assets/img/arfazhxsse-1" : "assets/img/arfazhxsse-1";
        // iconElement.style.color = progress < 0.5 ? "#ffffff" : "#011E15";
    } else { overlayIndex(); }
});


// ScrollToSection ////////////////////////////////////////////////////////////////////////
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = section.offsetTop - 13 * window.innerHeight / 100; // Adjusted for 5cm down from the top
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
}

// Function to attach click event listener to an element //////////////////////////////////
function addScrollListener(elementId, targetSectionId) {
    document.getElementById(elementId).addEventListener('click', function (event) {
        event.preventDefault();
        scrollToSection(targetSectionId);
    });
}

// Attach click event listeners to specific elements
addScrollListener('scrollToAbout', 'about');
addScrollListener('scrollToWorkExperience', 'workExperience');
addScrollListener('scrollToSideProjects', 'sideProjects');
addScrollListener('scrollToLinks', 'linksLower');

// LinkCloak ///////////////////////////////////////////////////////////////////////////////
document.getElementById("WE-UVR").addEventListener("click", function () { CloakBarOP('WE-UVR-Cloak'); });
// document.getElementById("WE-DE").addEventListener("click", function () { CloakBarOP('WE-DE-Cloak'); });
document.getElementById("SE-RuBiS").addEventListener("click", function () { CloakBarOP('SE-RuBiS-Cloak'); });
document.getElementById("SE-WeTR").addEventListener("click", function () { CloakBarOP('SE-WeTR-Cloak'); });
document.getElementById("SE-TTT").addEventListener("click", function () { CloakBarOP('SE-TTT-Cloak'); });
document.getElementById("SE-TRe").addEventListener("click", function () { CloakBarOP('SE-TRe-Cloak'); });

function CloakBarOP(elementId) {
    CloakBarCL(elementId);
    document.getElementById("goToTopButton").style.display = "none";
    const currentElement = document.getElementById(elementId);
    if (currentElement) { currentElement.style.width = "100%"; document.body.classList.add('no-scroll'); }
}

function CloakBarCL(excludeThisElementId) {
    document.getElementById("goToTopButton").style.display = "block";
    const CloakLinks = [
        "WE-UVR-Cloak",
        // "WE-DE-Cloak",
        "SE-RuBiS-Cloak",
        "SE-WeTR-Cloak",
        "SE-TTT-Cloak",
        "SE-TRe-Cloak"
    ];
    for (const elementID of CloakLinks) {
        const element = document.getElementById(elementID);
        if (excludeThisElementId === null || elementID !== excludeThisElementId) { element.style.width = "0%"; }
    }
    document.body.classList.remove('no-scroll');
}

// GoToTop Feature ////////////////////////////////////////////////////////////////////////

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("goToTopButton").style.display = "block";
    }
}

document.getElementById("goToTopButton").addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                //////
/////  /////////   ///   ///   /////////        /////////   ///    //   ////////     //////
/////     ///      ///   ///   ///              //          // /   //   ///   ///    //////
/////     ///      /////////   /////////        /////////   //  /  //   ///    //    //////
/////     ///      ///   ///   ///              //          //   / //   ///   ///    //////
/////     ///      ///   ///   /////////        /////////   //    ///   ////////     //////
/////                                                                                //////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////