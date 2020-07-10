## How to run

To run project in local development use the command `npm run dev`.

To run in production mode use command `npm run start`.

# Install :
`$ npm install express mongoose`

`$ npm install --save-dev nodemon`

`$ npm install dotenv`

`$ npm install -D eslint`

`$ npx eslint --init`
 -   ▸ To check syntax, find problems, and enforce code style
 -   ▸ CommonJS (require/exports)
 -   ▸ None of these
 -   ? Does your project use TypeScript? ‣ No 
 -   ? Where does your code run? Node
 -   ? How would you like to define a style for your project? … 
 -       ▸ Use a popular style guide
 -   ? Which style guide do you want to follow? … 
 -       ▸ Airbnb: https://github.com/airbnb/javascript
 -   ? What format do you want your config file to be in? … 
 -       ▸ JavaScript
 -   ✔ Would you like to install them now with npm? · / Yes

`$ npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier`

`$ npm install --save-dev husky lint-staged`

    - in package.json

        "husky": {
            "hooks": {
            "pre-commit": "lint-staged",
            "pre-push": "lint-staged"
            }
            },
            "lint-staged": {
            "*.js": [
            "prettier --write",
            "eslint"
            ]
        }


`$ npm install --save passport passport-local`

`$ npm install --save bcrypt`

`$ npm install --save express-session`

`$ npm install --save connect-mongo`




# Tools: 
- Markdown guide (syntax) [Markdown](https://www.markdownguide.org/basic-syntax/)
