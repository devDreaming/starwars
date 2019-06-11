import './scss/style.scss';
import axios from 'axios';


let search = document.querySelector('.search');
let input = document.querySelector('input')
const nameInput = document.querySelector("#name")
const birthInput = document.querySelector("#birthyear")
const eyecolorInput = document.querySelector("#eyecolor")

search.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e)
    getResults(input.value)
})


async function getResults(query) {
    try {
        const res = await axios(`https://swapi.co/api/people/${query}`)
        const name = res.data.name
        const birthyear = res.data.birth_year
        const eyecolor = res.data.eye_color
        nameInput.innerHTML = name
        birthInput.innerHTML = birthyear
        eyecolorInput.innerHTML = eyecolor
        input.value = ''
    } catch (error) {
        alert(error)
    }
    
}


