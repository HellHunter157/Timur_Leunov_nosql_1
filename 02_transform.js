




Use("Spotify")
db.drop()
db.tracks.aggregate([
    { $addFields: {
"artists": { $split: ["$artists", ";"] },
"audio_features": {
"danceability": "$danceability",
"energy": "$energy",
"tempo": "$tempo",
 "loudness": "$loudness"
  } }
    },
    {out : "tracks"}
]).toArray()
                
                








