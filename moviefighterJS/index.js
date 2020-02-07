
const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params : {
      apikey: '97c9f238',
      s: searchTerm
    }
  })
  console.log(response.data);
  if(response.data.Error){return[];}
  return response.data.Search
}

const root = document.querySelector('.autocomplete')
root.innerHTML = `
<label><b>Search For a Movie </b></label>
<input class="input"/>
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
  </div>
</div>
`


const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

const closeDrop = () => {
  dropdown.classList.remove('is-active')
}
const onInput = async event => {
  resultsWrapper.innerHTML = ''

  if (event.target.value.length >= 3){
  const movies = await fetchData(event.target.value)
  dropdown.classList.add('is-active')
  
  if(!movies.length){
    closeDrop() 
    return
  }

  for (let movie of movies) {
    const option = document.createElement('a');
    option.classList.add('dropdown-item')
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

    option.innerHTML = `
    <img src='${imgSrc}'/>
    <p>${movie.Title}  (${movie.Year})</p>
    `;
    resultsWrapper.appendChild(option)
  }
  
}
};
input.addEventListener('input', debounce(onInput), 500);
document.addEventListener('click', event => {
  if (!root.contains(event.target)) {
    closeDrop()
  }
})
