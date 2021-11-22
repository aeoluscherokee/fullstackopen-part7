describe('BlogLists app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('submit');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('abswan');
      cy.get('#password').type('nawsba');
      cy.contains('submit').click();
      cy.contains('logout');
      cy.contains('create new blog');
      cy.contains('Canonical string reduction Edsger W. Dijkstra');
      cy.contains('First class tests Robert C. Martin');
      cy.contains('React patterns Michael Chan');
      cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra');
      cy.contains('Type wars Robert C. Martin');
      cy.contains('TDD harms architecture Robert C. Martin');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('absw');
      cy.get('#password').type('nawsb');
      cy.contains('submit').click();
      cy.contains('invalid username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('abswan');
      cy.get('#password').type('nawsba');
      cy.contains('submit').click();
    });
    it('a blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('I will live until tomorrow comes');
      cy.get('#author').type('Aeolus Cheokee');
      cy.get('#url').type('http://aeolus.me/act/1');
      cy.contains('submit').click();
      cy.contains(
        'a new blog I will live until tomorrow comes by Aeolus Cheokee added'
      );
      cy.contains('I will live until tomorrow comes Aeolus Cheokee');
    });
    it('user can like a blog', function () {
      cy.contains('view').click();
      cy.contains('likes 12');
      cy.contains('Like').click();
      cy.contains('likes 13');
    });
    it('correct user can delete a blog', function () {
      cy.contains('view').click();
      cy.contains('Alan Blackswan');
      cy.contains('remove').click();
      cy.contains('a blog Canonical string reduction has been deleted').click();
    });
    it('Incorrect user cannot delete a blog', function () {
      cy.contains('view').click();
      cy.get('button').should('contain', 'remove');
      cy.contains('hide').click();
      cy.get('button').then((buttons) => {
        cy.wrap(buttons[7]).click();
      });
      cy.get('button').should('not.contain', 'remove');
    });
  });

  describe('Likes', function () {
    beforeEach(function () {
      cy.get('#username').type('abswan');
      cy.get('#password').type('nawsba');
      cy.contains('submit').click();
      cy.contains('view').click();
      cy.contains('view').click();
      cy.contains('view').click();
      cy.contains('view').click();
      cy.contains('view').click();
      cy.contains('view').click();
    });
    it('blogs are ordered according to amount of likes', function () {
      cy.get('.likeEl').should((likes) => {
        const expectedOrder = [12, 10, 7, 5, 2, 0];
        const likesCount = likes
          .map((id, like) => Number(like.innerHTML))
          .get();
        expect(likesCount).to.eql(expectedOrder);
      });
    });
    it('blogs order are updated when like button is clicked', function () {
      cy.get('.likeButton').then((buttons) => {
        cy.wrap(buttons[5]).click();
        cy.wait(500);
        cy.wrap(buttons[5]).click();
        cy.wait(500);
        cy.wrap(buttons[5]).click();
        cy.wait(500);
        cy.wrap(buttons[5]).click();
        cy.wait(500);
        cy.wrap(buttons[5]).click();
        cy.wait(500);
        cy.wrap(buttons[5]).click();
        cy.wait(500);
      });
      cy.get('.likeEl').should((likes) => {
        const expectedOrder = [12, 10, 7, 6, 5, 2];
        const likesCount = likes
          .map((id, like) => Number(like.innerHTML))
          .get();
        expect(likesCount).to.eql(expectedOrder);
      });
    });
  });
});
