/* eslint-disable quotes */
const sample = {
  blogs: [{
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',

  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  }],
}

const postLogin = {
  "message": "login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJveWQiLCJpZCI6IjYzNWFhMDVhNmVkMjQxYmFkMmVkMjFiZCIsImlhdCI6MTY2NzIxOTc4OCwiZXhwIjoxNjY3MjIzMzg4fQ.x0lGMvQ1ak3pdV2txjQ6Jfv3YEZJ-mnKyGClxpxeoTo",
  "username": "boyd",
  "name": "Boyd F. Montgomery",
  "id": "635aa05a6ed241bad2ed21bd"
}


const helper = {
  sample, postLogin
}

export default helper