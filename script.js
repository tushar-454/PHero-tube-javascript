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
    class="bg-[#CBCBCB] rounded py-3 px-5 text-[#252525] text-xl font-medium active:bg-[#A5A5A5]">${category.category}</button>`;
    catagoryWraper.append(div);
  }
};
dynamicCata();

// get dynamic all category content

const getCards = async (id) => {
  const promise = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const response = await promise.json();
  const cards = response.data;
  console.log(cards);
};

getCards(1000);
