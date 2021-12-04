describe('delivery page display correctly', function() {
  before(function() {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredientsList.json'});
  });

  it('should open burgerVendor component by default', function() {
    cy.contains('Соберите бургер');
  });
}); 