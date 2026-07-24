// ======================================
// DAFTAR 23 COMPANY
// ======================================

const companies = [

    "PT CITRA DEWATA INDRAGRAHA",

    "PT MARAZAVALAS",

    "PT GITA GEMILANG",

    "PT AMANDANA TRIJAYA MAKMUR",

    "PT SEMANGAT ANAK RANTAU",

    "PT CILI BALI LESTARI",

    "PT BALI MERDEKA INDAH",

    "PT CAHAYA ADI SUKSES HUTAMA",

    "PT DIRGAHAYU VALUTA PRIMA",

    "PT RIASTA VALASINDO",

    "PT SARI CITRA SEDANA ARTA",

    "PT PARTHA SEDANA",

    "PT ARIYA ERNATA VALUTA",

    "PT SOLUSI MEGA ARTHA",

    "PT BALI HASTIE INDOMALAYA",

    "PT BALI MASPINTJINRA",

    "PT PRASARANA MAKMUR VALASINDO",

    "PT DEVINDA MANDIRI UTAMA",

    "PT PUTRA BALI VALAS UTAMA",

    "PT PADI MANDIRI VALUTA",

    "PT ARTHA CEMERLANG VALUTA",

    "PT PRAWIRA VALAS",

    "PT PRADNYANA ARTHA MANDIRI"

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


            ctx.fillStyle =

                `hsl(${index * 360 / total}, 75%, 50%)`;


            ctx.fill();


            ctx.strokeStyle =

                "white";


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


            ctx.textAlign =

                "right";


            ctx.fillStyle =

                "white";


            ctx.font =

                "bold 12px Arial";


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


    // Lingkaran tengah

    ctx.beginPath();


    ctx.arc(

        centerX,

        centerY,

        65,

        0,

        2 *

        Math.PI

    );


    ctx.fillStyle =

        "#111827";


    ctx.fill();


    ctx.strokeStyle =

        "white";


    ctx.lineWidth = 5;


    ctx.stroke();


    ctx.fillStyle =

        "#facc15";


    ctx.font =

        "bold 18px Arial";


    ctx.textAlign =

        "center";


    ctx.fillText(

        "SPIN",

        centerX,

        centerY + 7

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

    let selectedIndex;


    /*
        3 pemenang pertama random.
        Pemenang ke-4 adalah hadiah utama.
    */

    if (

        selectedCompanies.length === 3

    ) {


        selectedIndex =

            availableCompanies.indexOf(

                "PT SOLUSI MEGA ARTHA"

            );

    }


    else {


        const randomCompanies =

            availableCompanies.filter(

                company =>

                    company !==

                    "PT SOLUSI MEGA ARTHA"

            );


        const randomIndex =

            Math.floor(

                Math.random()

                *

                randomCompanies.length

            );


        selectedIndex =

            availableCompanies.indexOf(

                randomCompanies[

                    randomIndex

                ]

            );

    }


    // Pengaman

    if (

        selectedIndex < 0

    ) {


        selectedIndex =

            Math.floor(

                Math.random()

                *

                availableCompanies.length

            );

    }


    const total =

        availableCompanies.length;


    const sliceAngle =

        360 / total;


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

                "⛶ EXIT FULLSCREEN";

        }


        else {


            document.body.classList.remove(

                "fullscreen-mode"

            );


            button.innerText =

                "⛶ FULLSCREEN";

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