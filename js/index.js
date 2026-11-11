let services = [];

(async function () {
    try {
        let res = await fetch("https://semicode.tech/api/v1/l10nhouse/services");

        services = await res.json();

        let i = 0;

        for (let service of services) {
            $("#Services .row").append(`
                <div class="col-md-6 wow ${((i + 1) % 2 == 0) ? 'animate__fadeInRight' : 'animate__fadeInLeft'}" data-wow-delay = "${i * .2}s">
                    <div class="box item text-center">
                        <img src="./images/${service.icon}" alt="${service.title}">

                        <h4 class="my-3">${service.title}</h4>

                        <p>
                            ${prepareDescription(service.description.slice(0, 180))}...
                            <a class="firstColor" onclick="showServices(${i})">Read More</a>
                        </p>
                    </div>
                </div>
            `);

            i++;
        }

    } catch (error) {
        console.log(error);
    }
})();


(async function () {
    try {
        let res = await fetch("https://semicode.tech/api/v1/l10nhouse/sectors");

        let response = await res.json();
        let sectors = response.data || response;
        $(".popup[data-popup-name='sector'] .row").empty();

        let i = 0;

        for (let sector of sectors) {
            let iconName = sector.icon.replace('.png', '');

            $(".popup[data-popup-name='sector'] .row").append(`
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="item text-center rounded-3 py-3 h-100 shadow-sm">
                        <img src="./images/sec/${iconName}.png" alt="${sector.name}" class="mb-3" style="max-height: 60px;">
                        <p class="mb-0 px-2">${sector.name}</p>
                    </div>
                </div>
            `);

            i++;
        }

    } catch (error) {
        console.log(error);
    }
})();



(async function () {
    try {
        let res = await fetch("https://semicode.tech/api/v1/l10nhouse/languages");

        let response = await res.json();
        let languages = response.data || response;

        $(".popup[data-popup-name='languages'] .body").empty();

        let i = 0;

        for (let lang of languages) {
            let iconName = lang.icon ? lang.icon.replace('.png', '') : '';

            $(".popup[data-popup-name='languages'] .body").append(`
                 <div class="section mb-3">
                        <h4>${lang.continent || ''}</h4>
                        <ul class="list-unstyled">
                          ${prepareLangages(lang.languages)}
                        </ul>
                    </div>
            `);

            i++;
        }

    } catch (error) {
        console.log(error);
    }
})();


$(".popup .box").on("click", function (e) {
    e.stopPropagation();
});



$(window).scroll(function () {

    $(".navbar").toggleClass("scrolled", window.scrollY > 10);

    let scrollPos = $(window).scrollTop() + 150;
    let navHeight = $(".navbar").outerHeight() || 70;

    $("section, header").each(function () {
        let currSection = $(this);
        let sectionId = currSection.attr("id");

        if (sectionId) {
            let sectionTop = currSection.offset().top - navHeight;
            let sectionHeight = currSection.outerHeight();

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $(".navbar-nav .nav-link").removeClass("active");
                $(`.navbar-nav .nav-link`).filter(function () {
                    return $(this).attr("href") === `#${sectionId}`;
                }).addClass("active");
            }
        }
    });
});


new WOW({
    animateClass: 'animate__animated'
}).init();


$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 5,
        slideBy: 1,
        margin: 10,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            650: {
                items: 3
            },
            1050: {
                items: 5
            }
        }
    });
});


let loadingpageEle = document.querySelector(".loadingPage");

window.addEventListener("load", function () {
    setTimeout(function () {
        loadingpageEle.classList.add("hide");
    }, 1000);
});