// Fetches languages from the API, and returns them as an array of objects
// If error, notify user and return empty array
function fetchLanguagesFromApi() {
  return fetch('https://api.scripty.org/languages').then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`${response.status} ${response.statusText}`)
    }
  }).then(data => {
    return data
  }).catch(error => {
    console.error(error)
    alert('Something went wrong when fetching languages from the API: ' + error + '. Please try again later.')
    return []
  })
}

// Insert the list of languages into a table with id `languages_table`
function insertLanguagesIntoTable(languages) {
  const table = document.getElementById('languages_table')
  languages.forEach(language => {
    const row = table.insertRow()
    row.insertCell().innerText = language["english"]
    row.insertCell().innerHTML = language["native"]
  })
}

fetchLanguagesFromApi().then(languages => {
  insertLanguagesIntoTable(languages)
}).catch(error => {
  console.error(error)
  alert('Something went wrong when fetching languages from the API: ' + error + '. Please try again later.')
})
