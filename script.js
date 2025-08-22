const googleDocUrl =
  "https://docs.google.com/document/d/e/2PACX-1vTMOmshQe8YvaRXi6gEPKKlsC6UpFJSMAk4mQjLm_u1gmHdVVTaeh7nBNFBRlui0sTZ-snGwZM4DBCT/pub"

async function fetchHtmlStringData(url) {
  try {
    const response = await fetch(url)
    return await response.text()
  } catch (error) {
    throw new Error("Cannot fetch HTML string data.")
  }
}

function parseHtml(htmlStringData) {
  try {
    const parser = new DOMParser()
    return parser.parseFromString(htmlStringData, "text/html")
  } catch (error) {
    throw new Error("Cannot parse HTML string data.")
  }
}

function collectDataFromDom(dom) {
  try {
    const tableEl = dom.querySelector("table")
    //   get rows not including the header row
    const tableRowEls = Array.from(tableEl.querySelectorAll("tr")).slice(1)
    const characterDataArray = tableRowEls.map((row) => {
      const cells = row.querySelectorAll("td p span")

      const characterDataObject = {
        "x-coordinate": parseInt(cells[0].innerText),
        character: cells[1].innerText,
        "y-coordinate": parseInt(cells[2].innerText),
      }

      return characterDataObject
    })
    console.log(characterDataArray)
  } catch (error) {
    throw new Error("Cannot collect data from DOM.")
  }
}

function displayMessage(characterData) {}

async function decodeSecretMessage(docUrl) {
  try {
    const htmlStringData = await fetchHtmlStringData(docUrl)
    const domDocument = parseHtml(htmlStringData)
    const dataFromDom = collectDataFromDom(domDocument)
    displayMessage(dataFromDom)
  } catch (error) {
    console.error("There is an error decoding the message.")
  }
}

decodeSecretMessage(googleDocUrl)
