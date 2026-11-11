function prepareDescription(desc) {
    let regex = /L10N House/gmi;
    return desc.replaceAll(regex, ` <span
                                    class="fw-semibold"><span
                                        class="firstColor">L10N</span><span
                                        class="secondColor"> House</span>
                                </span>`)
}


function openPopup(popupName) {
    $("body").css('overflow-y', 'hidden');
    let $popup = $(`.popup[data-popup-name = "${popupName}"]`);

    $popup.fadeIn(500, function () {
        if (popupName == 'languages') {
            $popup.find('.box').addClass('show');
        }
    });
}

function closePopup(popupName) {
    $("body").css('overflow-y', 'auto');
    let $popup = $(`.popup[data-popup-name = "${popupName}"]`);

    if (popupName == 'languages') {

        let $box = $popup.find('.box');
        $box.removeClass('show');

        setTimeout(function () {
            $popup.fadeOut(500);
        }, 300);
    } else {
        $popup.fadeOut(500);
    }
}
function showServices(indexOfService) {
    let service = services[indexOfService],
        sections = ``;

    for (let section of service.sections) {
        let lis = ``;

        for (let point of section.points) {
            lis += `<li>${point}</li>`;
        }

        sections += `
            <section class="mt-4">
                <h6>${section.title}</h6>
                <ol>
                    ${lis}
                </ol>
            </section>
        `;
    }

    $(`.popup[data-popup-name="service"] .box .body`).html(`
        <h3 class="mb-5 text-center secondColor">
            ${service.title}
        </h3>

        <div class="row mb-5">
            <div class="col-lg-6">
                <div class="item">
                    <p>${service.description}</p>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="item">
                    <img src="./images/${service.img}"
                        alt="${service.title}"
                        class="img-fluid rounded-3">
                </div>
            </div>
        </div>

        ${sections}
    `);

    openPopup('service');
}

function prepareLangages(languages) {
    let lis = ``;

    for (let language of languages) {
        lis += `<li><i class="far fa-dot-circle"></i>${language}</li>`;
    }

    return lis;
}

window.onscroll = function () {
    let topBtn = document.getElementById("Top");
    if (window.scrollY > 300) {
        topBtn.style.right = "0";
    } else {
        topBtn.style.right = "-120px";
    }
};

function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}