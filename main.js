#!/usr/bin/env node
const request = require("request")
const process = require("process")

function extractIdFromUrl(url) {
  var match = url.match(/id(\d+)/)
  if (match) {
    return match[1];
  }
  else {
    return null; // 123456
  }
}

const applePodcastLookupUrlTemplate = id => `https://itunes.apple.com/lookup?id=${id}&entity=podcast`

function fetchAppleUrl(url, cb) {
  request(url, (err, data) => {
    if (err) {
      return cb(err, null);
    } else {
      const json = JSON.parse(data.body)
      cb(null, json.results[0]);
    }
  })
}

function main() {
  const podcastToFetch = process.argv[2]

  if (podcastToFetch) {
    const id = extractIdFromUrl(podcastToFetch)

    if (id) {
      fetchAppleUrl(applePodcastLookupUrlTemplate(id), (err, data) => {
        if (err) {
          console.log("no url given")
        } else {
          console.log(`${data.feedUrl}`)
        };
      })
    }
  }
}

main()
