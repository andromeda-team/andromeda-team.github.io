let navigation = document.getElementById('_navigation');
let mobileButton = document.getElementById('_mobile-button');
let isMobileButtonActive = false;

mobileButton.onclick = function () {
    isMobileButtonActive = !isMobileButtonActive;
    if (isMobileButtonActive) {
        navigation.style.setProperty('left', '0');
        mobileButton.style.setProperty('position', 'absolute');
        mobileButton.style.setProperty('left', 'calc(100% - 5em)');
        mobileButton.children[0].style.setProperty('transform', 'translateX(48px)');
        mobileButton.children[1].style.setProperty('left', '0');
    } else {
        mobileButton.style.setProperty('position', 'relative');
        mobileButton.style.setProperty('left', '0');
        navigation.style.setProperty('left', 'calc(5em - 100%)');
        mobileButton.style.setProperty('transform', 'translateX(0)');
        mobileButton.children[0].style.setProperty('transform', 'translateX(0)');
        mobileButton.children[1].style.setProperty('left', '-48px');
    }
};