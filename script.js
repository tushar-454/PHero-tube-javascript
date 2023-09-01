// dynamic catagory create
const dynamicCata = async () => {
  const catagoryWraper = document.getElementById('catagoryWrper');
  const promise = await fetch(
    'https://openapi.programming-hero.com/api/videos/categories'
  );
  const response = await promise.json();
  const categories = response.data;

  for (const category of categories) {
    const div = document.createElement('div');
    div.innerHTML = `<button
    class="cateItem bg-[#CBCBCB] rounded py-3 px-5 text-[#252525] text-xl font-medium active:bg-[#A5A5A5]" id=${category.category_id} onclick="loadAsCate(${category.category_id})">${category.category}</button>`;
    catagoryWraper.append(div);
  }
  const allCateItem = document.querySelectorAll('.cateItem');
  allCateItem[0].classList.add('bg-[#FF1F3D]');
  allCateItem[0].classList.add('text-white');
};
dynamicCata();

// get dynamic all category content

const getCards = async (id) => {
  const cardWraper = document.getElementById('cardWraper');
  const promise = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const response = await promise.json();
  const cards = response.data;

  cardWraper.innerHTML = '';
  const error = document.querySelector('.errorWraper');
  if (cards.length === 0) {
    error.classList.remove('hidden');
  } else {
    for (const card of cards) {
      const div = document.createElement('div');
      div.classList = 'singleCard space-y-4 w-full sm:w-fit';
      const secound = parseInt(card.others.posted_date);
      const hour = Math.floor(secound / 3600);
      const minutes = Math.floor((secound - hour * 3600) / 60);
      div.innerHTML = `
    <div class="cardImg relative w-full sm:w-[300px] md:w-[352px] lg:w-[310px] h-[200px]">
      <img src="${card.thumbnail}" class="w-full h-full rounded-lg">
      ${
        secound
          ? `<span class='bg-[#171717] rounded text-[10px] text-white py-1 px-[5px] absolute right-4 bottom-2'>
            ${hour}hrs ${minutes} min ago
          </span>`
          : ''
      }
    </div>
    <div class="cardText flex gap-4">
      <div class="cardProfile w-10">
        <img src="${
          card.authors[0].profile_picture
        }" class="w-full h-10 object-cover rounded-full">
      </div>
      <div class="cardTextContent space-y-2">
        <div class="title">
          <p class="w-full md:w-[260px] font-bold text-[#171717]">${
            card.title
          }</p>
        </div>
        <div class="nameBadge flex gap-2">
          <p class="text-[#171717B2]">${card.authors[0].profile_name}</p>
          ${
            card.authors[0].verified
              ? '<img src="./images/badge.svg" alt="badge">'
              : ''
          }
        </div>
        <div class="views">
          <p class="text-[#171717B2]"><span>${card.others.views}</span> view</p>
        </div>
      </div>
    </div>`;
      cardWraper.append(div);
    }
    error.classList.add('hidden');
  }
};
// data loaded by categories
const loadAsCate = (id) => {
  getCards(id);
  const allCateItem = document.querySelectorAll('.cateItem');
  const activeId = document.getElementById(id);
  for (const item of allCateItem) {
    item.classList.remove('bg-[#FF1F3D]');
    item.classList.remove('text-white');
    item.classList.add('bg-[#CBCBCB]');
    item.classList.add('text-[#252525]');
  }
  activeId.classList.add('bg-[#FF1F3D]');
  activeId.classList.add('text-white');
};
// initial all data loaded
getCards(1000);
