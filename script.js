const loadLession = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then((json) => displayLessions(json.data));
};

const loadLevelWord = (id) =>{
    const url  = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayLevelWord(data.data))
    
}

const displayLevelWord = (words) =>{
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML ='';
  if (words.length == 0) {
  wordContainer.innerHTML =`
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
         <h2 class="text-xl font-bold">${word.word}</h2>
         <p class="font-semibold">Lorem, ipsum dolor.</p>
         <p class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</p>
         <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
         </div>
    </div>
    `
  wordContainer.append(card)
    
  });
  
}

const displayLessions = (lessions) =>{
  const lavelContainer = document.getElementById("lavel-container");
  for (const lession of lessions) {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary" onclick="loadLevelWord(${lession.level_no})"><i class="fa-solid fa-book-open"></i>lession - ${lession.level_no}</button>
    `;

    lavelContainer.append(btnDiv)
  }
  
};


loadLession()