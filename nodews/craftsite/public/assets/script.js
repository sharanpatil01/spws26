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

const savedTheme = localStorage.getItem('craftsite-theme')
const useDarkTheme = savedTheme ? savedTheme === 'dark' : true
const themeButton = document.querySelector('[data-theme-toggle]')

function applyTheme(isDark) {
  document.body.classList.toggle('dark-theme', isDark)
  if (themeButton) {
    themeButton.innerHTML = isDark ? '<span aria-hidden="true">☀</span>' : '<span aria-hidden="true">◐</span>'
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode')
    themeButton.setAttribute('aria-pressed', String(isDark))
  }
  localStorage.setItem('craftsite-theme', isDark ? 'dark' : 'light')
}

applyTheme(useDarkTheme)

themeButton?.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('dark-theme'))
})
