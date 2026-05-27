use("spotify")
db.tracks.find({
"audio_features.danceability": { $gt: 0.7 },
"audio_features.energy": { $gt: 0.7 },
"duration_ms": { $gt: 180000, $lt: 300000  }
}).toArray();




db.tracks.aggregate([
    { $unwind: "$artists" },
    {
group: {
_id: "$artists",
count: { $sum: 1 },
minPop: { $min: "$popularity" }
    }
},
{
$match: {
 count: { $gte: 3 },
minPop: { $gte: 60 }
}
}
]).toArray();





db.tracks.find({
"audio_features.loudness ": { $lt: -10 },
"audio_features.speechiness": { $lt: 0.1 },
"audio_features.instrumentalness": { $gt: 120 }
}).toArray();





















