// ======================================
// DAFTAR 32 COMPANY
// ======================================

const companies = [
    "AMANDANA TRIJAYA MAKMUR",
    "PT ARIYA ERNATA VALUTA",
    "PT ARTHA GIRI KENCANA",
    "PT ARTHA CEMERLANG VALUTA",
    "PT BALI MERDEKA INDAH",
    "PT BALI HASTIE INDOMALAYA",
    "PT BALI MASPINTJINRA",
    "PT CITRA DEWATA INDRAGRAHA",
    "PT CILI BALI LESTARI",
    "PT CAHAYA ADI SUKSES HUTAMA",
    "PT CENTRAL KUTA",
    "PT DIRGAHAYU VALUTA PRIMA",
    "PT DEVINDA MANDIRI UTAMA",
    "PT DINAR MITRA PRATAMA",
    "PT GITA GEMILANG",
    "PT GEMILANG ARTHA VALINDO",
    "PT JAYA AMERTA VALASINDO",
    "PT MARAZAVALAS",
    "PT RIASTA VALASINDO",
    "PT SEMANGAT ANAK RANTAU",
    "PT SARI CITRA SEDANA ARTA",
    "PT SOLUSI MEGA ARTHA",
    "PT SAMUDRA ARTHA JAYA",
    "PT SUKMA BALI ARTHA",
    "PT PARTHA SEDANA",
    "PT PRASARANA MAKMUR VALASINDO",
    "PT PUTRA BALI VALAS UTAMA",
    "PT PADI MANDIRI VALUTA",
    "PT PRAWIRA VALAS",
    "PT PRADNYANA ARTHA MANDIRI",
    "PT TAMAN SWASTI LOVINA",
    "PT UBUD VALASINDO"
];

// ======================================
// DATA SISTEM
// ======================================

let availableCompanies = [

    ...companies

];


let selectedCompanies = [];

let isSpinning = false;

// ======================================
// PENYIMPANAN PROGRESS UNDIAN
// ======================================

let spinCount = 0;

// Ambil data undian yang sebelumnya tersimpan
const savedData = localStorage.getItem("bcaGatheringSpinData");

if (savedData) {

    const parsedData = JSON.parse(savedData);

    availableCompanies = parsedData.availableCompanies;
    selectedCompanies = parsedData.selectedCompanies;
    spinCount = parsedData.spinCount || 0;

}


// Simpan progress undian
function saveSpinData() {

    localStorage.setItem(
        "bcaGatheringSpinData",
        JSON.stringify({
            availableCompanies: availableCompanies,
            selectedCompanies: selectedCompanies,
            spinCount: spinCount
        })
    );

}

// ======================================
// SOUND EFFECT
// ======================================

const spinSound = new Audio("sounds/spin.mp3");
spinSound.loop = true;
spinSound.volume = 0.4;

const winnerSound = new Audio("sounds/winner.mp3");
winnerSound.volume = 1;

const applauseSound = new Audio("sounds/applause.mp3");
applauseSound.volume = 0.8;

// ======================================
// CANVAS
// ======================================

const canvas =

    document.getElementById(

        "wheel"

    );


const ctx =

    canvas.getContext(

        "2d"

    );


const wheelRotator =

    document.getElementById(

        "wheelRotator"

    );


// ======================================
// GAMBAR RODA
// ======================================

function drawWheel() {


    const total =

        availableCompanies.length;


    if (

        total === 0

    ) {


        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );


        return;

    }


    const centerX =

        canvas.width / 2;


    const centerY =

        canvas.height / 2;


    const radius =

        canvas.width / 2;


    const sliceAngle =

        (

            2 *

            Math.PI

        )

        /

        total;


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    availableCompanies.forEach(

        (

            company,

            index

        ) => {


            const startAngle =

                index *

                sliceAngle;


            const endAngle =

                startAngle +

                sliceAngle;


            ctx.beginPath();


            ctx.moveTo(

                centerX,

                centerY

            );


            ctx.arc(

                centerX,

                centerY,

                radius,

                startAngle,

                endAngle

            );


            ctx.closePath();

  const wheelColors = [
    "#0066AE",
    "#5BA9D6",
    "#92caeb",
    "#D9F1FF"
];

const colorIndexes = [];

for (let i = 0; i < total; i++) {

    if (i === 0) {
        colorIndexes.push(0);
        continue;
    }

    let nextColor =
        (colorIndexes[i - 1] + 1) % wheelColors.length;

    if (
        i === total - 1 &&
        nextColor === colorIndexes[0] &&
        total > 1
    ) {
        nextColor =
            (nextColor + 1) % wheelColors.length;
    }

    colorIndexes.push(nextColor);
}

ctx.fillStyle = wheelColors[colorIndexes[index]];

ctx.fill();

ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.stroke();

// Tulisan company
ctx.save();

ctx.translate(
    centerX,
    centerY
);

ctx.rotate(
    startAngle +
    sliceAngle / 2
);

ctx.textAlign = "right";

// Warna font mengikuti warna slice
const currentColor = wheelColors[colorIndexes[index]];

if (currentColor === "#0066AE") {
    ctx.fillStyle = "#FFFFFF";
} else {
    ctx.fillStyle = "#000000";
}

ctx.font = "bold 13px Segoe UI";

let text = company;

            if (

                text.length > 22

            ) {


                text =

                    text.substring(

                        0,

                        22

                    )

                    +

                    "...";

            }


            ctx.fillText(

                text,

                radius - 20,

                5

            );


            ctx.restore();


        }

    );

}


// ======================================
// SPIN RODA
// ======================================

function spinWheel() {


    if (

        isSpinning

        ||

        availableCompanies.length === 0

    ) {


        return;

    }


    isSpinning = true;

    spinSound.currentTime = 0;
spinSound.play();

    const button =

        document.getElementById(

            "spinButton"

        );


    button.disabled = true;


    // Hentikan idle animation

    wheelRotator.classList.remove(

        "idle-spin"

    );


    // Reset transform

    wheelRotator.style.transition =

        "none";


    wheelRotator.style.transform =

        "rotate(0deg)";


    /*
        Memaksa browser membaca posisi terbaru.
        Ini penting agar animasi spin
        benar-benar dimulai.
    */

    wheelRotator.offsetHeight;


 // ======================================
// MENENTUKAN PEMENANG
// ======================================

spinCount++;

let selectedIndex;

// ======================================
// PUTARAN KE-20 = HADIAH UTAMA
// PT SOLUSI MEGA ARTHA WAJIB MENANG
// ======================================

if (spinCount === 20) {

    selectedIndex =
        availableCompanies.indexOf(
            "PT SOLUSI MEGA ARTHA"
        );

    // Pengaman jika PT SOLUSI MEGA ARTHA
    // tidak tersedia
    if (selectedIndex === -1) {

        selectedIndex =
            Math.floor(
                Math.random() *
                availableCompanies.length
            );
    }

} else {

    // ======================================
    // PUTARAN 1-19 = RANDOM
    // EXCLUDE 3 COMPANY TERTENTU
    // ======================================

    const excludedCompanies = [
        "PT SOLUSI MEGA ARTHA",
        "PT CILI BALI LESTARI",
        "PT BALI MASPINTJINRA"
    ];

    const randomCompanies =
        availableCompanies.filter(
            company =>
                !excludedCompanies.includes(company)
        );

    const randomCompany =
        randomCompanies[
            Math.floor(
                Math.random() *
                randomCompanies.length
            )
        ];

    selectedIndex =
        availableCompanies.indexOf(
            randomCompany
        );
}

const total = availableCompanies.length;
const sliceAngle = 360 / total;
    /*
        Posisi tengah slice pemenang.
        Pointer berada di bagian atas.
    */

    const selectedMiddleAngle =

        (

            selectedIndex *

            sliceAngle

        )

        +

        (

            sliceAngle / 2

        );


    const targetRotation =

        -90

        -

        selectedMiddleAngle;


    const extraSpins =

        360 * 6;


    const finalRotation =

        extraSpins

        +

        targetRotation;


    // ======================================
    // MULAI PUTAR
    // ======================================

    wheelRotator.style.transition =

        "transform 6s cubic-bezier(0.12, 0.8, 0.18, 1)";


    wheelRotator.style.transform =

        `rotate(${finalRotation}deg)`;


    // ======================================
    // SETELAH SELESAI
    // ======================================

    setTimeout(

        () => {

           spinSound.pause();
spinSound.currentTime = 0;

winnerSound.play();

setTimeout(() => {
    applauseSound.play();
}, 500); 

            const selectedCompany =

                availableCompanies[

                    selectedIndex

                ];


            const isMainPrize =

                selectedCompany ===

                "PT SOLUSI MEGA ARTHA";


            // Tampilkan nama

            document.getElementById(

                "winner"

            ).innerHTML =

                `🎉 ${selectedCompany}`;


            // Popup

            document.getElementById(

                "winnerModalName"

            ).innerText =

                selectedCompany;

               const winnerName =
    document.getElementById("winnerModalName");

winnerName.style.fontSize = "";

if (selectedCompany.length > 28) {
    winnerName.style.fontSize = "36px";
}

if (selectedCompany.length > 34) {
    winnerName.style.fontSize = "32px";
}

if (selectedCompany.length > 40) {
    winnerName.style.fontSize = "28px";
} 


            document.getElementById(

                "winnerLabel"

            ).innerText =

                isMainPrize

                    ? "🏆 HADIAH UTAMA 🏆"

                    : "PEMENANG UNDIAN";


            const winnerBox =

                document.getElementById(

                    "winnerBox"

                );


            if (

                isMainPrize

            ) {


                winnerBox.classList.add(

                    "main-prize"

                );

            }


            else {


                winnerBox.classList.remove(

                    "main-prize"

                );

            }


            // Confetti

            startConfetti(

                isMainPrize

            );


            // Tampilkan popup

            document.getElementById(

                "winnerModal"

            ).classList.add(

                "show"

            );


          // Simpan pemenang

selectedCompanies.push(
    selectedCompany
);


// Hapus dari roda

availableCompanies.splice(
    selectedIndex,
    1
);


// Simpan progress ke browser

saveSpinData();


            // Update list

            displayCompanies();

            displaySelected();


            // Reset roda

            wheelRotator.style.transition =

                "none";


            wheelRotator.style.transform =

                "rotate(0deg)";


            // Gambar ulang

            drawWheel();


            isSpinning = false;


            button.disabled = false;


            // Idle spin kembali

            if (

                availableCompanies.length > 0

            ) {


                wheelRotator.classList.add(

                    "idle-spin"

                );

            }


        },

        6200

    );

}


// ======================================
// DAFTAR COMPANY
// ======================================

function displayCompanies() {


    const list =

        document.getElementById(

            "companiesList"

        );


    const count =

        document.getElementById(

            "companyCount"

        );


    list.innerHTML = "";


    count.innerText =

        `${availableCompanies.length} Company`;


    availableCompanies.forEach(

        company => {


            const item =

                document.createElement(

                    "div"

                );


            item.className =

                "company-item";


            item.innerHTML =

                `<span>${company}</span>`;


            list.appendChild(

                item

            );

        }

    );

}


// ======================================
// COMPANY TERPILIH
// ======================================

function displaySelected() {


    const list =

        document.getElementById(

            "selectedList"

        );


    list.innerHTML = "";


    if (

        selectedCompanies.length === 0

    ) {


        list.innerHTML = `

            <p class="empty">

                Belum ada company terpilih

            </p>

        `;


        return;

    }


    selectedCompanies.forEach(

        (

            company,

            index

        ) => {


            const item =

                document.createElement(

                    "div"

                );


            item.className =

                "selected-item";


            item.innerHTML = `

                <span>

                    ${company}

                </span>


                <button

                    class="delete-btn"

                    onclick="deleteSelected(${index})">

                    Hapus

                </button>

            `;


            list.appendChild(

                item

            );

        }

    );

}


// ======================================
// HAPUS COMPANY TERPILIH
// ======================================

function deleteSelected(index) {


    if (

        isSpinning

    ) {


        return;

    }


    const deletedCompany =

        selectedCompanies[index];


    selectedCompanies.splice(

        index,

        1

    );


    availableCompanies.push(

        deletedCompany

    );

     // Simpan perubahan
    saveSpinData();



    drawWheel();

    displayCompanies();

    displaySelected();


    wheelRotator.classList.add(

        "idle-spin"

    );

}


// ======================================
// POPUP PEMENANG
// ======================================

function closeWinnerModal() {


    document.getElementById(

        "winnerModal"

    ).classList.remove(

        "show"

    );

}


// ======================================
// FULLSCREEN
// ======================================

function toggleFullscreen() {


    if (

        !document.fullscreenElement

    ) {


        document.documentElement

            .requestFullscreen();

    }


    else {


        document.exitFullscreen();

    }

}


document.addEventListener(

    "fullscreenchange",

    () => {


        const button =

            document.getElementById(

                "fullscreenButton"

            );


        if (

            document.fullscreenElement

        ) {


            document.body.classList.add(

                "fullscreen-mode"

            );


            button.innerText =

                "EXIT FULLSCREEN";

        }


        else {


            document.body.classList.remove(

                "fullscreen-mode"

            );


            button.innerText =

                "FULLSCREEN";

        }

    }

);


// ======================================
// CONFETTI
// ======================================

const confettiCanvas =

    document.getElementById(

        "confettiCanvas"

    );


const confettiCtx =

    confettiCanvas.getContext(

        "2d"

    );


let confettiParticles = [];


function resizeConfettiCanvas() {


    confettiCanvas.width =

        window.innerWidth;


    confettiCanvas.height =

        window.innerHeight;

}


window.addEventListener(

    "resize",

    resizeConfettiCanvas

);


resizeConfettiCanvas();


function startConfetti(

    isMainPrize = false

) {


    const amount =

        isMainPrize

            ? 350

            : 180;


    confettiParticles = [];


    for (

        let i = 0;

        i < amount;

        i++

    ) {


        confettiParticles.push({

            x:

                Math.random()

                *

                confettiCanvas.width,


            y:

                -Math.random()

                *

                confettiCanvas.height,


            width:

                Math.random()

                *

                10

                +

                5,


            height:

                Math.random()

                *

                18

                +

                8,


            speed:

                Math.random()

                *

                5

                +

                3,


            rotation:

                Math.random()

                *

                360,


            rotationSpeed:

                Math.random()

                *

                8

                -

                4,


            swingOffset:

                Math.random()

                *

                Math.PI

                *

                2

        });

    }


    animateConfetti();

}


function animateConfetti() {


    confettiCtx.clearRect(

        0,

        0,

        confettiCanvas.width,

        confettiCanvas.height

    );


    confettiParticles.forEach(

        particle => {


            particle.y +=

                particle.speed;


            particle.x +=

                Math.sin(

                    particle.y

                    *

                    0.02

                    +

                    particle.swingOffset

                );


            particle.rotation +=

                particle.rotationSpeed;


            confettiCtx.save();


            confettiCtx.translate(

                particle.x,

                particle.y

            );


            confettiCtx.rotate(

                particle.rotation

                *

                Math.PI

                /

                180

            );


            confettiCtx.fillStyle =

                `hsl(${Math.random() * 360}, 90%, 60%)`;


            confettiCtx.fillRect(

                -particle.width / 2,

                -particle.height / 2,

                particle.width,

                particle.height

            );


            confettiCtx.restore();

        }

    );


    confettiParticles =

        confettiParticles.filter(

            particle =>

                particle.y

                <

                confettiCanvas.height

                +

                50

        );


    if (

        confettiParticles.length > 0

    ) {


        requestAnimationFrame(

            animateConfetti

        );

    }

}


// ======================================
// MULAI WEBSITE
// ======================================

drawWheel();

displayCompanies();

displaySelected();


// Roda bergerak pelan saat menunggu

wheelRotator.classList.add(

    "idle-spin"

);

// ======================================
// RESET UNDIAN
// ======================================

function resetUndian() {

    const confirmReset = confirm(
        "Apakah Anda yakin ingin mereset seluruh undian?"
    );

    if (!confirmReset) {
        return;
    }

    localStorage.removeItem("bcaGatheringSpinData");

    location.reload();

}