let premiosGlobal = []

fetch('premios.json')
  .then(res => res.json())
  .then(data => {

    premiosGlobal = data

    renderPremios(data)

    activarBuscador()

  })

/* RENDER */

function renderPremios(data){

  const contenedor = document.getElementById('premios-list')

  contenedor.innerHTML = ''

  data.forEach(cat => {

    if(cat.premios.length === 0) return

    const div = document.createElement('div')

    div.classList.add('categoria')

    const titulo = document.createElement('h2')

    titulo.innerHTML = `
      🎯 ${cat.puntos}P
    `

    div.appendChild(titulo)

    const ul = document.createElement('ul')

    cat.premios.forEach(premio => {

      const li = document.createElement('li')

      li.innerHTML = `
        <span>🏆</span>
        ${premio}
      `

      ul.appendChild(li)

    })

    div.appendChild(ul)

    contenedor.appendChild(div)

  })

}

/* BUSCADOR */

function activarBuscador(){

  const buscador = document.getElementById('buscador')

  buscador.addEventListener('input', () => {

    const texto = buscador.value.toLowerCase()

    const filtrados = premiosGlobal
      .map(cat => {

        const premiosFiltrados = cat.premios.filter(p =>
          p.toLowerCase().includes(texto)
        )

        return {
          puntos: cat.puntos,
          premios: premiosFiltrados
        }

      })
      .filter(cat => cat.premios.length > 0)

    renderPremios(filtrados)

  })

}
