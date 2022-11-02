/* eslint-disable no-undef */

describe('Blog app', () => {
  const user = {
    username: 'juan',
    password: 'password',
    name: 'Juan P. Dela Cruz',
  }

  const blog1 = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  }

  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  }

  beforeEach(() => {
    cy.request('POST', 'http://127.0.0.1:3003/api/testing/reset')
    cy.request('POST', 'http://127.0.0.1:3003/api/users', user)
  })

  it('Login form is shown', () => {
    cy.visit('http://127.0.0.1:3000').then(
      async () => await cy.contains('log in to application')
    )
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.visit('http://127.0.0.1:3000')
        .then(async () => {
          await cy.get('input[name=username]').type(user.username)
          await cy.get('input[name=password]').type(user.password)
          await cy.get('#login-btn').click()
        })
        .then(async () => {
          await cy.contains(`${user.name} logged in`)
          await cy.get('.success').should('be.visible')
          await cy
            .get('[data-testid="success-msg"]')
            .should('contain', 'login successful')
        })
    })

    it('fails with wrong credentials e.g. password', () => {
      cy.visit('http://127.0.0.1:3000')
        .then(async () => {
          await cy.get('input[name=username]').type(user.username)
          await cy.get('input[name=password]').type('secret')
          await cy.get('#login-btn').click()
          await cy.contains('invalid username or password!')
        })
        .then(async () => {
          await cy.get('.error').should('be.visible')
          await cy
            .get('[data-testid="error-msg"]')
            .should('contain', 'invalid username or password!')
        })
    })

    it('fails with wrong credentials e.g. username', () => {
      cy.visit('http://127.0.0.1:3000')
        .then(async () => {
          await cy.get('input[name=username]').type('username')
          await cy.get('input[name=password]').type(user.password)
          await cy.get('#login-btn').click()
          await cy.contains('invalid username or password!')
        })
        .then(async () => {
          await cy.get('.error').should('be.visible')
          await cy
            .get('[data-testid="error-msg"]')
            .should('contain', 'invalid username or password!')
        })
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:3000').then(async () => {
        await cy.get('input[name=username]').type(user.username)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
        await cy
          .get('[data-testid="success-msg"]')
          .should('contain', 'login successful')
      })
    })

    it('a blog can be created with correct inputs', () => {
      cy.get('[data-testid="_createBlogBtn"]')
        .click()
        .then(async () => {
          await cy.get('#title').type(blog.title)
          await cy.get('#author').type(blog.author)
          await cy.get('#url').type(blog.url)
          await cy.get('#create').click()
        })
        .then(async () => {
          await cy.get('.success').should('be.visible')
          await cy
            .get('[data-testid="success-msg"]')
            .should('contain', `a new blog ${blog.title} by ${blog.author}`)
        })
    })

    it('a user can add likes to a blog and arrange the blogs in descending order based on the number of likes', () => {
      cy.get('[data-testid="_createBlogBtn"]')
        .click()
        .then(async () => {
          await cy.get('#title').type(blog.title)
          await cy.get('#author').type(blog.author)
          await cy.get('#url').type(blog.url)
          await cy.get('#create').click()
          await cy.get('[data-testid="view"]').click()
          await cy.get('#_likes').contains('0')
          await cy.get('[data-testid="addLike"]').click()
          await cy.get('#_likes').contains('1')
        })
        .then(async () => {
          await cy.get('[data-testid="addLike"]').click()
        })
        .then(async () => {
          await cy.get('[data-testid="addLike"]').click()
        })
        .then(async () => {
          await cy.get('[data-testid="addLike"]').click()
          await cy.get('.success').should('be.visible')
        })
        .then(async () => {
          await cy.get('[data-testid="hide"]').click()
          await cy.get('[data-testid="_createBlogBtn"]').click()
        })
        .then(async () => {
          await cy.get('#title').type(blog1.title)
          await cy.get('#author').type(blog1.author)
          await cy.get('#url').type(blog1.url)
        })
        .then(async () => {
          await cy.get('#create').click()
        })
        .then(async () => {
          await cy.get('.success').should('be.visible')
        })
        .then(async () => {
          await cy
            .get('[data-testid="blog"]')
            .eq(0)
            .should('contain', blog.title)
          await cy
            .get('[data-testid="blog"]')
            .eq(1)
            .should('contain', blog1.title)
        })
    })

    it('user can delete a blog created', () => {
      cy.get('[data-testid="_createBlogBtn"]')
        .click()
        .then(async () => {
          await cy.get('#title').type(blog.title)
          await cy.get('#author').type(blog.author)
          await cy.get('#url').type(blog.url)
          await cy.get('#create').click()
          await cy.get('[data-testid="view"]').click()
          await cy.get('[data-testid="removeBtn"]').click()
          await cy.get('[data-testid="logoutBtn"]').click()
        })
    })
  })
})
