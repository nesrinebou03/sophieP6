document.querySelector('#button-second-modal').addEventListener('click', () => {
    document.querySelector('#modal').style.display = 'none';
    document.querySelector('#modal2').style.display = 'flex';
})

document.querySelector('#left-arrow').addEventListener('click', () => {
    document.querySelector('#modal').style.display = 'flex';
    document.querySelector('#modal2').style.display = 'none';
})

document.querySelector('#close-first-modal').addEventListener('click', () => {
    document.querySelector('#modal').style.display = 'none';
})

document.querySelector('#close-second-modal').addEventListener('click', () => {
    document.querySelector('#modal2').style.display = 'none';
})