import puppeteer from 'puppeteer'

const handler = async function handler(req, res) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:5000')
  await page.pdf({ path: 'josefaidt_resume.pdf', format: 'a4' })

  await browser.close()
  res.send('ok')
}

export default handler
