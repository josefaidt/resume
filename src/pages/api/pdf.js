import puppeteer from 'puppeteer'

let handler = function (req, res) {
  res.send('This route is only for development and testing purposes')
}

if (process.env.NODE_ENV !== 'production') {
  handler = async function handler(req, res) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    await page.pdf({ path: 'josefaidt_resume.pdf', format: 'a4' })

    await browser.close()
    res.send('ok')
  }
}

export default handler
