
globalThis.addEventListener("scroll", function () {
	const nav = globalThis.document.querySelector("nav")
	nav.classList.toggle("sticky", globalThis.scrollY > 0)
})
/* Selecting the nav element and assigning it to the variable nav. */
const menu = globalThis.document.querySelector(".menu")
const openMenuBtn = globalThis.document.querySelector(".open-menu")
const closeMenuBtn = globalThis.document.querySelector(".close-menu")

function toggleMenu() {
	menu.classList.toggle("menu_opened")
}

openMenuBtn.addEventListener("click", toggleMenu)
closeMenuBtn.addEventListener("click", toggleMenu)

const menuLinks = globalThis.document.querySelectorAll(".menu a[href^=\"#\"]")

const observer = new globalThis.IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			const id = entry.target.getAttribute("id")
			const menuLink = globalThis.document.querySelector(`.menu a[href="#${id}"]`)

			if (entry.isIntersecting) {
				globalThis.document.querySelector(".menu a.selected").classList.remove("selected")
				menuLink.classList.add("selected")
			}
		})
	},
	{ rootMargin: "-30% 0px -70% 0px" }
)

menuLinks.forEach((menuLink) => {
	menuLink.addEventListener("click", function () {
		menu.classList.remove("menu_opened")
	})

	const hash = menuLink.getAttribute("href")
	const target = globalThis.document.querySelector(hash)
	if (target) {
		observer.observe(target)
	}
})
