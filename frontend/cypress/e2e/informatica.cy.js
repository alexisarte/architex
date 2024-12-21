describe('Informatica UNLP Website Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.info.unlp.edu.ar/')
  })

  it('buscar ingreso en el sitio', () => {
    const newItem = 'ingreso'
    cy.get('#is-search-input-0').type(`${newItem}{enter}`, { force: true })
    cy.get('#post-24810 > div:nth-child(1) > h2:nth-child(3) > a:nth-child(1)').should(($a) => {
      const text = $a.text().trim()
      expect(text).to.match(/Ingreso 2025 | Inscripción para estudiar en Informática/)
    })
  })

  it('verificar contenido de una página específica', () => {
    cy.visit('https://www.info.unlp.edu.ar/expo-ciencia-2/')
    cy.get('.page-title > h2:nth-child(1)').should('contain.text', 'Expo Ciencia')
  })
})  