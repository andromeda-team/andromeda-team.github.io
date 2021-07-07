let navigation = document.getElementById('_navigation');
let mobileButton = document.getElementById('_mobile-button');
let isMobileButtonActive = false;

mobileButton.onclick = function() {
    isMobileButtonActive = !isMobileButtonActive;
    updateNavbar(isMobileButtonActive);
};

window.onresize = function() {
    if (window.innerWidth > 900) {
        updateNavbar(true)
    } else {
        updateNavbar(false)
    }
};

function updateNavbar(boolean) {
    if (boolean) {
        navigation.style.setProperty('left', '0');
        mobileButton.style.setProperty('position', 'absolute');
        mobileButton.style.setProperty('left', 'calc(100% - 5em)');
        mobileButton.children[0].style.setProperty('transform', 'translateX(-96px)');
        mobileButton.children[1].style.setProperty('left', '4px');
        navigation.style.setProperty('display', 'flex');
    } else {
        mobileButton.style.setProperty('position', 'relative');
        mobileButton.style.setProperty('left', '0');
        navigation.style.setProperty('left', 'calc(5em - 100%)');
        mobileButton.style.setProperty('transform', 'translateX(0)');
        mobileButton.children[0].style.setProperty('transform', 'translateX(0)');
        mobileButton.children[1].style.setProperty('left', '96px');
        setTimeout(function() {
            navigation.style.setProperty('display', 'none');
        }, 200);
    }
};