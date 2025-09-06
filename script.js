const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`)
    return htmlElements.join(" ");

}
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove("hidden");
        document.getElementById('word-container').classList.add("hidden");
    } else {
        document.getElementById('word-container').classList.remove("hidden");
        document.getElementById('spinner').classList.add("hidden");
    }
}
const loadLession = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then((json) => displayLessions(json.data));
};
const removeActive = () => {
    const lesionBtn = document.querySelectorAll('.lesion-btn');
    lesionBtn.forEach(btn => {
        btn.classList.remove('active')
    })
};
const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lession-btn-${id}`);
            clickBtn.classList.add('active');
            displayLevelWord(data.data);
        });

}


const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWDetails(details.data);

};

const displayWDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
   <div class="">
        <h2 class="text-2xl font-bold">${word.meaning}</h2>
        </div>
         <div class="">
        <h2 class="text-2xl font-bold">${createElement(word.synonyms)}</h2>
        <h2 class="text-2xl font-bold">sym</h2>
        <h2 class="text-2xl font-bold">syn</h2>
        </div>
   `
    document.getElementById('word_modal').showModal();

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';
    if (words.length == 0) {
        wordContainer.innerHTML = `
  <div class="text-center bg-sky-100 col-span-full py-10 rounded-xl space-y-6">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] font-5xl"><i class="fa-solid fa-triangle-exclamation"></i></button>
         <p class="text-xl font-medium text-gray-300">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
         <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
       </div>
  `;
        return;
    }
    words.forEach((word) => {
        const card = document.createElement('div');
        card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
         <h2 class="text-xl font-bold">${word.word ? word.word : "not match"}</h2>
         <p class="font-semibold">Lorem, ipsum dolor.</p>
         <p class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "not match"} / ${word.pronunciation ? word.pronunciation : "not match"}"</p>
         <div onclick="word_modal.showModal()" class="flex justify-between items-center">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
         </div>
    </div>
    `
        wordContainer.append(card)

    });
    manageSpinner(false)

}

const displayLessions = (lessions) => {
    const lavelContainer = document.getElementById("lavel-container");
    for (const lession of lessions) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary lesion-btn" id="lession-btn-${lession.level_no}" onclick="loadLevelWord(${lession.level_no})"><i class="fa-solid fa-book-open"></i>lession - ${lession.level_no}</button>
    `;

        lavelContainer.append(btnDiv)
    }

};


loadLession()

document.getElementById('btn-search').addEventListener('click', function(){
   const searchinput = document.getElementById('input-search');
   const searchValue = searchinput.value.trim().toLowerCase();
   console.log(searchValue)
   fetch("https://openapi.programming-hero.com/api/words/all")
   .then(res => res.json())
   .then(data => {
    const allowWord = data.data;
    const filterword = allowWord.filter(word => word.word.toLowerCase().includes(searchValue));
    displayLevelWord(filterword);
   });
});