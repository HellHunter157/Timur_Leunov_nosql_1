db.tracks.aggregate([
{
$project: {
mood: { $cond: [
{$and: [
{ $gt: ["$audio_features.valence", 0.5] },
{ $gt: ["$audio_features.energy", 0.5] }
 ]},
"happy",
"sad"
 ]}}}
]).toArray();
        











