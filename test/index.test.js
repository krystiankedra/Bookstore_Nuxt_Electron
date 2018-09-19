import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

let nuxt = null

test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir
  config.dev = false
  config.mode = 'universal'
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h4 class="alert-heading">Bootcamp Bookstore</h4>'))
})

test('Route / exits and render HTML with Tag applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('h4')
  t.not(element, null)
  t.is(element.textContent, 'Bootcamp Bookstore')
  t.is(element.className, 'alert-heading')
})

test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.mb-0')
  t.not(element, null)
  t.is(element.textContent, "Whenever you need to, be sure to use it's Vuex, VueResource, NuxtJs, VueJs")
  t.is(element.className, 'mb-0')
})

test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.nav-link')
  t.not(element, null)
  t.is(element.textContent, 'Home')
})

test('my example passing test', t => {
	t.pass();
});

test('Checking value in input', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const inputTitle = window.document.querySelector('.col-sm-offset-2')
  t.is(inputTitle, null)
})

test.after('Closing server', t => {
  nuxt.close()
})