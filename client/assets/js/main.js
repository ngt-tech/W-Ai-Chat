setTimeout(() => {
    const loaderBody = document.getElementById('loader-body');

    const loaderText = document.getElementById('loader-text');

    loaderText.style.display = 'none';
    loaderBody.style.visibility = 'visible';

}, 3000);

const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('main_nav')
navLinks.forEach((l) => {
    l.addEventListener('click', () => {
        const bsCollapse = new bootstrap.Collapse(menuToggle)
        bsCollapse.toggle()
    })
})

let load_slider = 0;

console.log(getMobileOperatingSystem());



window.setInterval(async function () {
    if (load_slider === 0) {
        new Swiper('.swiper--top', {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 6000,
            lazy: true,
            autoplay: {
                delay: 1,
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
            disableOnInteraction: true
        });

        new Swiper('.swiper--rotate', {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 6000,
            lazy: true,
            autoplay: {
                delay: 1,
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
            disableOnInteraction: true
        });

        new Swiper('.swiper--bottom', {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 6000,
            lazy: true,
            autoplay: {
                delay: 1,
                reverseDirection: true
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
            disableOnInteraction: true
        });
        load_slider = 1;
    }

    let colors = ['#000000e6', '#173f5fe6', '#17185FB2'];
    let random_color = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('body').style.background = random_color;
    document.getElementById('main-body').style.background = random_color;

    document.getElementById('certificate').style.background = random_color.substring(0, 7);
    document.getElementById('ngtPass').style.background = random_color.substring(0, 7);

    document.getElementById('regis').style.background = random_color.substring(0, 7);
    document.getElementById('pass-back-1').style.background = random_color.substring(0, 7);
    document.getElementById('pass-back-2').style.background = random_color.substring(0, 7);

}, 3000)


document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            document.getElementById('navbar_top').classList.add('fixed-top');
            // add padding top to show content behind navbar
            navbar_height = document.querySelector('.navbar').offsetHeight;
            document.body.style.paddingTop = navbar_height + 'px';
        } else {
            document.getElementById('navbar_top').classList.remove('fixed-top');
            // remove padding top from body
            document.body.style.paddingTop = '0';
        }
    });
});


setCookie('width', getWidth());

window.setInterval(async function () {
    console.log(getWidth());
    console.log(getCookie('width'));
    if (getWidth() !== parseInt(getCookie('width'))){
        setCookie('width', getWidth());

        $(".swiper-container").each(function(){
            this.swiper.destroy();
        });


        new Swiper('.swiper--top', {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 8000,
            lazy: true,
            autoplay: {
                delay: 1,
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
            disableOnInteraction: true
        });

        new Swiper('.swiper--rotate', {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 8000,
            lazy: true,
            autoplay: {
                delay: 1,
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
            disableOnInteraction: true
        });

        new Swiper('.swiper--bottom', {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 8000,
            lazy: true,
            autoplay: {
                delay: 1,
                reverseDirection: true
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
            disableOnInteraction: true
        });
    }
}, 2000);


function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function setCookie(name, value) {
    document.cookie = name + "=" + value + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getMobileOperatingSystem() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}


new WOW().init();
