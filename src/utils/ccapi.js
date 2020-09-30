const puppeteer = require('puppeteer')

const ccapi = async (callback)=>{

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.codechef.com/contests');

    var contestList  = await page.$$eval('tbody' , (e)=>{
        if(e[2])
        return e[2].innerHTML;
        else 
        return 'error';
    })
    
    callback(contestList)

  await browser.close();

}

module.exports = ccapi

