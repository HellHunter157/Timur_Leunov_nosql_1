

use("spotify");


db.tracks.find({
  track_genre: "pop",
  "audio_features.danceability": { $gte: 0.7 }
})
.sort({ popularity: -1 })
.explain("executionStats");


db.tracks.createIndex({
  track_genre: 1,
  "audio_features.danceability": 1,
  popularity: -1
});



db.tracks.find({
  track_genre: "pop",
  "audio_features.danceability": { $gte: 0.7 }
})
.sort({ popularity: -1 })
.explain("executionStats");




db.tracks.createIndex({
  "audio_features.instrumentalness": 1,
  "audio_features.speechiness": 1,
  explicit: 1
});

db.tracks.find({
  "audio_features.instrumentalness": { $gt: 0.5 },
  "audio_features.speechiness": { $lt: 0.1 },
  explicit: false
})
.explain("executionStats");