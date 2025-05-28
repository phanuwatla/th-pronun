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
    { char: "ถ", sound: "ถอ ถ่า" },
    { char: "ท", sound: "ทอ ท่า" },
    { char: "ธ", sound: "ธอ ธาตุ" },
    { char: "น", sound: "นอ เนียน" },
    { char: "บ", sound: "บอ บ้าน" },
    { char: "ป", sound: "ปอ ปู" },
    { char: "ผ", sound: "ผอ ผู้" },
    { char: "ฝ", sound: "ฝอ ฝัน" },
    { char: "พ", sound: "พอ พัน" },
    { char: "ฟ", sound: "ฟอ ฟ้า" },
    { char: "ภ", sound: "ภอ ภู" },
    { char: "ม", sound: "มอ ม้า" },
    { char: "ย", sound: "ยอ ยา" },
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
    "เ-ียะ", "เ-ีย", "เ-ือะ", "เ-ือ", "-ัวะ", "-ัว", "ำ", "ใ", "ไ", "เ-า", "ฤ", "ฤา", "ฦ", "ฦา"];

const vowelReadings = {
    ะ: "สะ หระ อะ",
    า: "สะ หระ อา",
    ำ: "สะ หระ อำ",
    "ิ": "สะ หระ อิ",
    "ี": "สะ หระ อี",
    "ึ": "สะ หระ อึ",
    "ื": "สะ หระ อื",
    "ุ": "สะ หระ อุ",
    "ู": "สะ หระ อู",
    เ: "สะ หระ เอ",
    แ: "สะ หระ แอ",
    โ: "สะ หระ โอ",
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
        alert("กรุณาเลือกพยัญชนะก่อนเลือกสระ");
        return;
    }
    selectedVowel = char;
    showResult();
}

function showResult() {
    const frontVowels = ["เ", "แ", "โ", "ใ", "ไ"];
    const specialVowelWithOr = ["ื"];
    let word = "";

    if (frontVowels.includes(selectedVowel)) {
        word = selectedVowel + selectedConsonant;
    } else if (specialVowelWithOr.includes(selectedVowel)) {
        word = selectedConsonant + selectedVowel + "อ";
    } else {
        word = selectedConsonant + selectedVowel;
    }

    const vowelSoundFull = vowelReadings[selectedVowel] || `สะ หระ ${selectedVowel}`;
    const consonantSoundShort = consonants.find(c => c.char === selectedConsonant)?.sound.split(" ")[0] || selectedConsonant + "อ";
    const vowelSoundShort = vowelSoundFull.split(" ").slice(-1)[0];

    lastWord = word;
    lastConsonantShort = consonantSoundShort;
    lastVowelShort = vowelSoundShort;

    document.getElementById("finalWord").textContent = word;
    document.getElementById("formula").textContent = `${selectedConsonant} + อ${selectedVowel} = ${word}`;
    repeatBtn.disabled = false;

    speakSequence([vowelSoundFull, consonantSoundShort, vowelSoundShort, word]);
}

function repeatWord() {
    if (!lastWord) return;
    speakSequence([lastConsonantShort, lastVowelShort, lastWord]);
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

createButtons();
resetDisplay();
