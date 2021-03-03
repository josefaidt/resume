const { spawn } = require('child_process')
const puppeteer = require('puppeteer')

async function main() {
  const devServer = spawn('yarn', ['dev'])
  devServer.stdout.on('data', async data => {
    if (String(data).startsWith('ready')) {
      console.info('Next.js server ready')
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto('http://localhost:3000')
      console.info('Creating PDF')
      await page.pdf({ path: 'josefaidt_resume.pdf', format: 'a4' })
      devServer.kill()
      await browser.close()
      console.info('done!')
      process.exit()
    }
  })
}

main()
