const docUrl = 'https://docs.google.com/document/d/e/2PACX-1vTMOmshQe8YvaRXi6gEPKKlsC6UpFJSMAk4mQjLm_u1gmHdVVTaeh7nBNFBRlui0sTZ-snGwZM4DBCT/pub'

async function getData(url) {
    const response = await fetch(url)
    const html = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    const trEls = doc.querySelectorAll('table tr')
    const trArray = Array.from(trEls)
    const characterData = trArray.map(tr => tr.querySelector('td'))
    console.log(characterData)
}

function getTableDataValue(td) {
    const paragraphSpanEl = td.querySelector('p span')
}

getData(docUrl)