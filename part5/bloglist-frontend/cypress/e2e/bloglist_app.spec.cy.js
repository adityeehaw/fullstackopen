
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'NewUser',
      username: 'newuser',
      password: 'user'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const lewser = {
      name: 'SecondUser',
      username: 'seconduser',
      password: 'user2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', lewser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('newuser')
      cy.get('#password').type('user')
      cy.get('#login-button').click()
      cy.contains('newuser is Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('newuser')
      cy.get('#password').type('bam')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {

      cy.login({ username: 'newuser', password: 'user' })

      // cy.get('#username').type('newuser')
      // cy.get('#password').type('user')
      // cy.get('#login-button').click()

      // cy.request('POST', 'http://localhost:3003/api/login', {
      //   username: 'newuser',
      //   password: 'user'
      // }).then(({ body }) => {
      //   localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      //   cy.visit('http://localhost:3000')
      // })
    })

    it('A blog can be created', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('Extreme Title')
      cy.get('#author').type('Extreme Author')
      cy.get('#url').type('Extreme Url')
      cy.get('#create').click()

      cy.contains('Extreme Title')
      cy.contains('Extreme Author')
      cy.get('.blog').should('have.length', 1)
    })

    it('Blog can be liked', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('Extreme Title')
      cy.get('#author').type('Extreme Author')
      cy.get('#url').type('Extreme Url')
      cy.get('#create').click()

      cy.contains('View').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })
    it('User can delete own post', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('Extreme Title')
      cy.get('#author').type('Extreme Author')
      cy.get('#url').type('Extreme Url')
      cy.get('#create').click()

      cy.contains('View').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'Extreme Url')
    })

    // it('Other user cannot remove post', function() {
    //   cy.get('#create-new-blog').click()
    //   cy.get('#title').type('Extreme Title')
    //   cy.get('#author').type('Extreme Author')
    //   cy.get('#url').type('Extreme Url')
    //   cy.get('#create').click()
    //   cy.contains('logout').click()

    //   // cy.get('#username').type('seconduser')
    //   // cy.get('#password').type('user2')
    //   // cy.get('#login-button').click()

    //   cy.login({ username: 'seconduser', password: 'user2' })

    //   cy.contains('View').click()
    //   cy.get('html').should('not.contain', '#remove')
    // })
  })
  it('other users cannot remove post', function(){
    cy.login({ username: 'newuser', password: 'user' })
    cy.Blog({ title: 'some', author: 'somebody', url: 'anyone', likes: '61' })
    cy.contains('logout').click()
    cy.login({ username: 'seconduser', password: 'user2' })
    cy.contains('View').click()
    cy.get('html').should('not.contain', '#remove')
  })

  it('blogs in a sorted order', function() {
    cy.login({ username: 'newuser', password: 'user' })
    cy.Blog({ title: 'some', author: 'somebody', url: 'anyone', likes: '61' })
    cy.Blog({ title: 'body', author: 'anybody', url: 'anyone', likes: '10' })
    cy.Blog({ title: 'once', author: 'everybody', url: 'anyone', likes: '26' })
    cy.Blog({ title: 'told', author: 'nobody', url: 'anyone', likes: '87' })

    cy.get('.blog').eq(0).should('contain', 'told')
    cy.get('.blog').eq(1).should('contain', 'some')
    cy.get('.blog').eq(2).should('contain', 'once')
    cy.get('.blog').eq(3).should('contain', 'body')
  })
})