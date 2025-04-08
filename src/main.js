import './style.css'


const words = [
    "planet", "jumble", "castle", "rocket", "garden", "sunset", "branch", "circle", "button", "flight",
    "forest", "bridge", "silver", "camera", "hunter", "glider", "window", "target", "pencil", "drawer",
    "singer", "pirate", "gadget", "cookie", "wallet", "pepper", "mirror", "anchor", "puzzle", "orange",
    "shadow", "fabric", "stream", "moment", "ribbon", "bucket", "quartz", "velvet", "wander", "shovel",
    "danger", "travel", "chorus", "bishop", "rocket", "bubble", "bright", "rescue", "vacuum", "object",
    "bishop", "winter", "jumper", "remote", "sprint", "harbor", "turkey", "drawer", "circle", "grapes",
    "folder", "tomato", "ticket", "reward", "chorus", "castle", "muscle", "magnet", "dollar", "random",
    "freeze", "vision", "silent", "clocks", "orange", "turtle", "mirror", "planet", "travel", "wizard",
    "glimpse", "capture", "venture", "journey", "holiday", "plastic", "diamond", "fantasy", "archive", "balance",
    "curious", "justice", "fortune", "graphic", "impress", "marshal", "network", "passion", "respect", "texture"
];


class GuessApp {
    scrambledWordView = document.querySelector('#word-display')
    numOfTrialsView = document.querySelector('#num-of-trials')
    trialProgressView = document.querySelector('#trial-progress')
    mistakesView = document.querySelector('#mistakes')
    inputView = document.querySelector('#input-display')
    randomBtn = document.querySelector('#random')
    resetBtn = document.querySelector('#reset')

    constructor() {
        this.state = {}
        this.resetState()

        this.inputView.addEventListener('keyup', (event) => {

            if (event.key === this.state.word[this.state.guessed.length]) {
                this.state.guessed += event.key

                if(this.state.guessed === this.state.word) {
                    alert('🎉 Success')
                    this.resetState()
                    this.updateUI()
                }

            } else {
                if(this.state.numOfTries >= 5) {
                    let current = this.inputView.children[this.state.guessed.length]
                    current.disabled = true
                    current.focus(false)
                    this.resetState()
                    return
                } else {
                    this.state.numOfTries++
                    this.state.wrongCharacters.push(event.key)
                }
            }
            this.updateUI()
        })



        this.randomBtn.addEventListener('click', () => {
            this.resetState()
            this.updateUI()
        })

        this.resetBtn.addEventListener('click', () => {
            this.resetState(this.state.word)
            this.updateUI()
        })

        this.updateUI()
    }

    resetState(word) {
        this.state = {}
        this.state.word = word ? word : GuessApp.getRandomWord()
        this.state.scrambledWord = GuessApp.getScrambledWord(this.state.word)
        this.state.numOfTries = 0
        this.state.wrongCharacters = []
        this.state.guessed = ""
    }

    /*
        It updates the UI based on the current state
     */
    updateUI() {
        this.scrambledWordView.textContent = `${this.state.scrambledWord}`
        this.numOfTrialsView.textContent = `Tries (${this.state.numOfTries}/5):`
        this.mistakesView.textContent = `Mistakes: ${this.state.wrongCharacters.join(', ')}`
        this.trialProgressView.innerHTML = ''
        this.inputView.innerHTML = ''

        for (let i = 0; i < 5; i++) {
            let trialProgress = document.createElement('span')

            if ((i - this.state.numOfTries) < 0) {
                trialProgress.classList.add("completed")
            }
            this.trialProgressView.appendChild(trialProgress)
        }

        for(let i = 0; i < this.state.word.length; i++) {
            let input = document.createElement("input")
            input.type = 'text'
            input.maxLength = 1
            input.value = this.state.guessed[i] ? this.state.guessed[i] : "-"
            input.disabled = true


            input.addEventListener('focus', () => {
                input.value = ''
            })

            this.inputView.appendChild(input)
        }

        let current = this.inputView.children[this.state.guessed.length]
        current.disabled = false
        current.classList.add('current')
        current.focus()

    }


    static getRandomWord() {
        return words[Math.floor(Math.random() * words.length)]
    }


    static getScrambledWord(word) {
        const chars = word.split('');

        for (let i = chars.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }

        return chars.join('');
    }
}


const app = new GuessApp()
