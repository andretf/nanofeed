const fs = require('fs');
const fsReadFile = require('util').promisify(fs.readFile)
const fsWriteFile = require('util').promisify(fs.writeFile)
const dir = __dirname.split('/').slice(0, -1).join('/')
const version = currentVersion()
const year = new Date().getFullYear()

console.info(`The new version is ${version} and the year is ${year}.`)

update('package.json', data => {
  data.version = version
  return data
})

update('uglify.json', data => {
  data.output.preamble = `/* nanofeed ${version} | MIT License | (c) 2016-${year} https://github.com/andretf/nanofeed */`
  return data
})

update('src/header', data => updateVersion(updateYear(data)))
update('LICENSE', data => updateYear(data))

// --------
async function update(file, transformation) {
  let data = (await fsReadFile(dir + '/' + file)).toString()
  let updated = data

  try {
    updated = JSON.stringify(transformation(JSON.parse(data)), null, 2)
  } catch (ex) {
    updated = transformation(data)
  }

  if (data === updated) {
    console.info(file + ': nothing to change.')
    return
  }

  await fsWriteFile(dir + '/' + file, updated, 'utf8')
  console.info(file + ': updated.')
}

function currentVersion() {
  if (process.argv[2]) return process.argv[2]

  let version = require(dir + '/package.json').version.split('.')
  const last = parseInt(version.pop()) + 1
  version.push(last)
  return version.join('.')
}

function updateYear(data) {
  return data.replace(/2016-?\d{0,4}/, '2016-' + year)
}

function updateVersion(data) {
  return data.replace(/\d+\.\d+\.\d+/, version)
}
