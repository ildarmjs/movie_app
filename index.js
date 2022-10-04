// Titles:  https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

async function loadMovies(searchTerm) {
	const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`
	const res = await fetch(`${URL}`)
	const data = await res.json()
	text.value = ''
	const movieRow = document.querySelector('.movie__row')
	movieRow.innerHTML = ''

	data.Search.forEach((movie, idx) => {
		const div = document.createElement('div')
		div.className = 'movie__col'
		div.innerHTML = `

                <div class="movie__image">
                    <img src="${movie.Poster}" alt="">
                </div>
                <div class="movie__description">
                    <div class="movie__title">${movie.Title}</div>
                    <div class="movie__year"><span>Year:</span>${movie.Year}</div>
                    <button id="details" class="movie__button" data-idx="${movie.imdbID}">Details</button>

                </div>

        `

		movieRow.append(div)
	})
	const header = document.querySelector('.header')
	const details = document.querySelectorAll('#details')

	details.forEach(btn => {
		btn.addEventListener('click', async event => {
			event.preventDefault()
			console.log(btn.dataset.idx)

			try {
				const URL = `http://www.omdbapi.com/?i=${btn.dataset.idx}&apikey=fc1fef96`
				const res = await fetch(`${URL}`)
				const data = await res.json()
				let div = document.createElement('div')
				div.className = 'modal'
				div.style.display = 'block'
				movieRow.style.display = 'none'
				header.style.display = 'none'
				document.body.style.backgroundColor = 'rgb(0, 0, 0, 0.8)'
				div.innerHTML = `
							<div class="modal__row">
								<div class="modal__col">
									<div class="modal__image">
										<img src="${data.Poster}" alt="">
									</div>
								</div>
								<div class="modal__col">
									<div class="modal__description">
										<div class="modal__title modal-item"><span>Title:</span> ${data.Title}</div>
										<div class="modal__year modal-item"><span>Released:</span> ${data.Title}</div>
										<div class="modal__genre modal-item"><span>Genre:</span> ${data.Genre}</div>
										<div class="modal__country modal-item"><span>Country:</span> ${data.Country}</div>
										<div class="modal__director modal-item"><span>Director:</span> ${data.Director}</div>
										<div class="modal__writer modal-item"><span>Writer:</span> ${data.Writer}</div>
										<div class="modal__actors modal-item"><span>Actors:</span> ${data.Actors}</div>
										<div class="modal__awards modal-item"><span>Awards:</span> ${data.Awards}</div>
									</div>
									<div class="modal__btn">
										<button id="close">Close</button>
									</div>
								</div>
							</div> 
							
				`
				document.body.append(div)
				const closeModal = document.querySelectorAll('#close')
				closeModal.forEach(btn => {
					btn.addEventListener('click', event => {
						div.style.display = 'none'
						movieRow.style.display = 'flex'
						header.style.display = 'flex'
						document.body.style.backgroundColor = 'rgb(0, 0, 0, 0.4)'
					})
				})
			} catch (err) {
				console.log('Произошла ошибка в запросе\n', err)
			}
		})
	})
}

const form = document.querySelector('#form')
const text = document.querySelector('#text')
const movieRow = document.querySelector('.movie__row')

form.addEventListener('submit', event => {
	event.preventDefault()
	loadMovies(text.value)
})
