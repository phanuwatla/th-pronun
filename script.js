const consonants = [
    { char: "ก", sound: "กอ ไก่" },
    { char: "ข", sound: "ขอ ไข่" },
    { char: "ฃ", sound: "ขอ ขวด" },
    { char: "ค", sound: "คอ ควาย" },
    { char: "ฅ", sound: "คอ คน" },
    { char: "ฆ", sound: "ฆอ ระฆัง" },
    { char: "ง", sound: "งอ -งู" },
    { char: "จ", sound: "จอ จาน" },
    { char: "ฉ", sound: "ฉอ ฉิ่ง" },
    { char: "ช", sound: "ชอ ช้าง" },
    { char: "ซ", sound: "ซอ โซ่" },
    { char: "ฌ", sound: "ฌอ เฌอ" },
    { char: "ญ", sound: "ญอ หญิง" },
    { char: "ฎ", sound: "ฎอ ชฎา" },
    { char: "ฏ", sound: "ฏอ ปฏัก" },
    { char: "ฐ", sound: "ฐอ ฐาน" },
    { char: "ฑ", sound: "ฑอ มณโฑ" },
    { char: "ฒ", sound: "ฒอ ผู้เฒ่า" },
    { char: "ณ", sound: "ณอ เณร" },
    { char: "ด", sound: "ดอ เด็ก" },
    { char: "ต", sound: "ตอ เต่า" },
    { char: "ถ", sound: "ถอ ถุง" },
    { char: "ท", sound: "ทอ ทหาร" },
    { char: "ธ", sound: "ธอ ธง" },
    { char: "น", sound: "นอ หนู" },
    { char: "บ", sound: "บอ ใบไม้" },
    { char: "ป", sound: "ปอ ปลา" },
    { char: "ผ", sound: "ผอ ผึ้ง" },
    { char: "ฝ", sound: "ฝอ ฝา" },
    { char: "พ", sound: "พอ พาน" },
    { char: "ฟ", sound: "ฟอ ฟัน" },
    { char: "ภ", sound: "ภอ สำเภา" },
    { char: "ม", sound: "มอ ม้า" },
    { char: "ย", sound: "ยอ ยักษ์" },
    { char: "ร", sound: "รอ เรือ" },
    { char: "ล", sound: "ลอ ลิง" },
    { char: "ว", sound: "วอ แหวน" },
    { char: "ศ", sound: "ศอ ศาลา" },
    { char: "ษ", sound: "ษอ ฤาษี" },
    { char: "ส", sound: "สอ เสือ" },
    { char: "ห", sound: "หอ หีบ" },
    { char: "ฬ", sound: "ฬอ จุฬา" },
    { char: "อ", sound: "ออ อ่าง" },
    { char: "ฮ", sound: "ฮอ นกฮูก" }
];

const vowels = ["ะ", "า", "ิ", "ี", "ึ", "ื", "ุ", "ู", "เ-ะ", "เ", "แ-ะ", "แ", "โ-ะ", "โ", "เ-าะ", "-อ", "เ-อะ", "เ-อ",
    "เอียะ", "เอีย", "เอือะ", "เอือ", "อัวะ", "อัว", "ำ", "ใ", "ไ", "เ-า", "ฤ", "ฤา", "ฦ", "ฦา"];

const vowelReadings = {
    ะ: "สะ ร่ะ อะ",
    า: "สะ ร่ะ อา",
    "ิ": "สะ ร่ะ อิ",
    "ี": "สะ ร่ะ อี",
    "ึ": "สะ ร่ะ อึ",
    "ื": "สะ ร่ะ อือ",
    "ุ": "สะ ร่ะ อุ",
    "ู": "สะ ร่ะ อู",
    "เ-ะ": "สะ ร่ะ เอะ",
    เ: "สะ ร่ะ เอ",
    "แ-ะ": "สะ ร่ะ แอะ",
    แ: "สะ ร่ะ แอ",
    "โ-ะ": "สะ ร่ะ โอะ",
    โ: "สะ ร่ะ โอ",
    "เ-าะ": "สะ ร่ะ เอาะ",
    "-อ": "สะ ร่ะ ออ",
    "เ-อะ": "สะ ร่ะ เอ่อ",
    "เ-อ": "สะ ร่ะ เออ",
    "เอียะ": "สะ ร่ะ เอี่ย",
    "เอีย": "สะ ร่ะ เอีย",
    "เอือะ": "สะ ร่ะ เอื่อ",
    "เอือ": "สะ ร่ะ เอือ",
    "อัวะ": "สะ ร่ะ อั่ว",
    "อัว": "สะ ร่ะ อัว",
    ำ: "สะ ร่ะ อำ",
    ใ: "สะ ร่ะ ใอไม้ม้วน",
    ไ: "สะ ร่ะ ไอไม้มะลาย",
    "เ-า": "สะ ร่ะ เอา",
    ฤ: "ตัว รึ",
    "ฤๅ": "ตัว รือ",
    ฦ: "ตัว ลึ",
    "ฦๅ": "ตัว ลือ",
};

let selectedConsonant = "";
let selectedVowel = "";
let lastWord = "";
let lastConsonantShort = "";
let lastVowelShort = "";
let speechRate = 1;

const consonantsContainer = document.getElementById("consonantsContainer");
const vowelsContainer = document.getElementById("vowelsContainer");
const repeatBtn = document.getElementById("repeatBtn");

function speak(text) {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "th-TH";
    utter.rate = speechRate;
    speechSynthesis.speak(utter);
}

function speakSequence(texts) {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    texts.forEach(text => {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "th-TH";
        utter.rate = speechRate;
        speechSynthesis.speak(utter);
    });
}

function resetDisplay() {
    document.getElementById("finalWord").textContent = "ยังไม่เลือกพยัญชนะและสระ";
    document.getElementById("formula").textContent = "Select a consonant and vowel";
    repeatBtn.disabled = true;
    selectedVowel = "";
    lastWord = "";
    lastConsonantShort = "";
    lastVowelShort = "";
}

function selectConsonant(char, sound) {
    selectedConsonant = char;
    resetDisplay();
    speak(sound);
}

function selectVowel(char) {
    if (!selectedConsonant) {
        showCustomAlert();
        return;
    }
    selectedVowel = char;
    showResult();
}

function showResult() {
    const vowelTemplate = selectedVowel;
    let word = "";

    if (vowelTemplate.includes("-")) {
        // สระมี "-" ให้แทนตำแหน่งด้วยพยัญชนะ เช่น เ-อ => เมอ
        word = vowelTemplate.replace("-", selectedConsonant);
    } else if (vowelTemplate.includes("อ")) {
        // สระเช่น -อ, -ัว => แทน "อ" ด้วยพยัญชนะ
        word = vowelTemplate.replace("อ", selectedConsonant);
    } else if (/^[เแโใไ]/.test(vowelTemplate)) {
        // สระที่ต้องวางหน้าพยัญชนะ เช่น เ แ โ ใ ไ
        word = vowelTemplate + selectedConsonant;
    } else if (vowelTemplate === "ื") {
        word = selectedConsonant + "ือ"; // เติม "อ" ต่อท้าย
    } else {
        // สระทั่วไป วางหลังพยัญชนะ เช่น พา => พ + า
        word = selectedConsonant + vowelTemplate;
    }

    // อ่านเสียงแบบแยก
    const vowelSoundFull = vowelReadings[selectedVowel] || `สะ ร่ะ ${selectedVowel}`;
    const consonantSoundShort = consonants.find(c => c.char === selectedConsonant)?.sound.split(" ")[0] || selectedConsonant + "อ";
    const vowelSoundShort = vowelSoundFull.split(" ").slice(-1)[0];

    lastWord = word;
    lastConsonantShort = consonantSoundShort;
    lastVowelShort = vowelSoundShort;

    document.getElementById("finalWord").textContent = word;
    document.getElementById("formula").textContent = `${selectedConsonant} + ${selectedVowel} = ${word}`;
    repeatBtn.disabled = false;

    speakSequence([vowelSoundFull, consonantSoundShort, vowelSoundShort, word]);
}

function repeatWord() {
    const word = document.getElementById('finalWord').textContent;
    const button = document.getElementById('repeatBtn');

    if (!word || word === "ยังไม่เลือกพยัญชนะและสระ") return;

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'th-TH';

    // เปลี่ยนข้อความและไอคอนขณะเล่น
    button.innerHTML = '<i class="fas fa-volume-up"></i> กำลังเล่น...';
    button.disabled = true;

    utterance.onend = () => {
        // กลับเป็นไอคอนลำโพงและข้อความเดิม
        button.innerHTML = '<i class="fas fa-volume-up"></i> ฟังเสียง (Listen)';
        button.disabled = false;
    };

    speechSynthesis.speak(utterance);
}

function createButtons() {
    consonants.forEach(({ char, sound }) => {
        const btn = document.createElement("button");
        btn.textContent = char;
        btn.onclick = () => selectConsonant(char, sound);
        consonantsContainer.appendChild(btn);
    });

    vowels.forEach(char => {
        const btn = document.createElement("button");
        btn.textContent = char;
        btn.classList.add("vowel-btn");
        btn.onclick = () => selectVowel(char);
        vowelsContainer.appendChild(btn);
    });
}

function showCustomAlert() {
    const alertBox = document.getElementById("customAlert");
    alertBox.style.display = "block";
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000); // แสดง 3 วินาที
}

createButtons();
resetDisplay();
