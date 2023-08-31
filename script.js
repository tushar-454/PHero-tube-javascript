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
    class="bg-[#CBCBCB] rounded py-3 px-5 text-[#252525] text-xl font-medium active:bg-[#A5A5A5]" onclick="loadAsCate(${category.category_id})">${category.category}</button>`;
    catagoryWraper.append(div);
  }
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
  for (const card of cards) {
    const div = document.createElement('div');
    const secound = parseInt(card.others.posted_date);
    const hour = Math.floor(secound / 3600);
    const minutes = Math.floor((secound - hour * 3600) / 60);
    div.innerHTML = `<div class="singleCard space-y-4 w-fit">
    <div class="cardImg relative">
      <img src="${
        card.thumbnail
      }" class="w-full h-[200px] sm:w-[312px] object-cover rounded-lg">
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
        }" class="w-10 h-10 object-cover rounded-full">
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
    </div>
  </div>`;
    cardWraper.append(div);
  }
};
// data loaded by categories
const loadAsCate = (id) => {
  getCards(id);
};
// initial all data loaded
getCards(1000);
