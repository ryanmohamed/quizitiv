# [Quizitiv](https://quizitiv.netlify.app)
### XP based quiz platform.
![Demo Image](https://i.ibb.co/RTSLr40/Screen-Shot-2023-05-08-at-9-13-08-PM.png)
---
> Quizitiv is a typical CRUD application built on an MVC architecture. 
> The platform is targeted towards younger students of all kinds, and emphasizes reward/progress based learning.
--- 
> Log in with a method of your choosing and have a profile associated with all quizzes taken, and created. 
> **Gain XP** by taking quizzes in the community and unlock **hidden features** throughout the site. Whether that be games or theme changes. 
---
### Tech Stack
**Front-end [View]**
 1. Next13
 2. Typescript React
 3. Tailwind CSS
 
**Back-end [Model/Controller]**
 1. Firebase
 2. Sinatra/Ruby
--- 
### Dev Log 🚧
**05-08-2023 9:08PM**
  - [x] ~~Poor user experience when submitting a wrong answer.~~Not based.~~(Show correct answer after submission)~~
  - [x] ~~App retains theme when user logs out.~~
  - [x] ~~Optimize search bar, harness query power.~~ Firestore doesn't incorporate a way to use a LIKE query as in SQL. The closest solution without altering the database structure is a case-sensitive prefix search which was recently pushed. A possible database redundancy to fix this is to include a subjectTags field, and include a lowered and trimmed version of each string in the subject field of the quiz. Then query against that array of strings.
  - [ ] Failing redirect on quiz creation.
  - [ ] Implement some kind of caching system on the server side, harness the power of Next.js.
---
