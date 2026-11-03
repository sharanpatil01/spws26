const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

const cards = document.querySelectorAll('.product-card')
cards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `translateY(-8px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`
  })
  card.addEventListener('mouseleave', () => { card.style.transform = '' })
})

const menuTranslations = {
  '/home': { en: 'Home', hi: 'मुखपृष्ठ' },
  '/learning': { en: 'Learning', hi: 'शिक्षा' },
  '/ideas': { en: 'Ideas', hi: 'विचार' },
  '/classifieds': { en: 'Classifieds', hi: 'विज्ञापन' },
  '/wealth': { en: 'Wealth', hi: 'धन-संपत्ति' },
  '/future': { en: 'Future', hi: 'भविष्य' },
  '/driving': { en: 'Driving', hi: 'ड्राइविंग' },
  '/chess': { en: 'Chess', hi: 'शतरंज' },
  '/stories': { en: 'Stories', hi: 'कहानियाँ' },
  '/about-me': { en: 'About Me', hi: 'मेरे बारे में' }
}

const savedLanguage = localStorage.getItem('craftsite-language')
const useHindi = savedLanguage === 'hi'
const themeButton = document.querySelector('[data-theme-toggle]')
let languageButton = null

function applyLanguage(isHindi) {
  document.documentElement.lang = isHindi ? 'hi' : 'en'

  document.querySelectorAll('.nav-links a, footer a').forEach((link) => {
    const path = link.getAttribute('href')
    const translation = menuTranslations[path]
    if (translation) link.textContent = isHindi ? translation.hi : translation.en
  })

  if (languageButton) {
    languageButton.innerHTML = `<span aria-hidden="true">${isHindi ? 'EN' : 'हिं'}</span>`
    languageButton.setAttribute('aria-label', isHindi ? 'Switch to English' : 'हिंदी में बदलें')
    languageButton.setAttribute('aria-pressed', String(isHindi))
    languageButton.title = isHindi ? 'English / अंग्रेज़ी' : 'Hindi / हिंदी'
  }

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    const isDark = document.body.classList.contains('dark-theme')
    button.setAttribute('aria-label', isHindi
      ? (isDark ? 'हल्का मोड चालू करें' : 'गहरा मोड चालू करें')
      : (isDark ? 'Switch to light mode' : 'Switch to dark mode'))
  })

  localStorage.setItem('craftsite-language', isHindi ? 'hi' : 'en')
}

if (themeButton) {
  languageButton = document.createElement('button')
  languageButton.className = 'nav-button language-button'
  languageButton.type = 'button'
  languageButton.dataset.languageToggle = ''
  themeButton.before(languageButton)

  languageButton.addEventListener('click', () => {
    applyLanguage(document.documentElement.lang !== 'hi')
  })
}

const savedTheme = localStorage.getItem('craftsite-theme')
const useDarkTheme = savedTheme ? savedTheme === 'dark' : true

function applyTheme(isDark) {
  document.body.classList.toggle('dark-theme', isDark)
  if (themeButton) {
    themeButton.innerHTML = isDark ? '<span aria-hidden="true">☀</span>' : '<span aria-hidden="true">◐</span>'
    const isHindi = document.documentElement.lang === 'hi'
    themeButton.setAttribute('aria-label', isHindi
      ? (isDark ? 'हल्का मोड चालू करें' : 'गहरा मोड चालू करें')
      : (isDark ? 'Switch to light mode' : 'Switch to dark mode'))
    themeButton.setAttribute('aria-pressed', String(isDark))
  }
  localStorage.setItem('craftsite-theme', isDark ? 'dark' : 'light')
}

applyTheme(useDarkTheme)
applyLanguage(useHindi)

themeButton?.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('dark-theme'))
})
