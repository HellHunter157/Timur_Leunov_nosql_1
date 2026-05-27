авдання 1 — Аналіз запиту та індексація
Explain без індексу

Без індексу MongoDB використовувала COLLSCAN, тобто повне сканування всієї колекції.
Це повільно, оскільки база даних перевіряє кожен документ.

Запит:

db.tracks.find({
  track_genre: "pop",
  "audio_features.danceability": { $gte: 0.7 }
}).sort({ popularity: -1 })

Створений індекс:

db.tracks.createIndex({
  track_genre: 1,
  "audio_features.danceability": 1,
  popularity: -1
});
Explain після створення індексу

Після створення індексу MongoDB почала використовувати IXSCAN замість COLLSCAN.

Це означає, що пошук виконується через індекс, а не через перегляд усіх документів колекції.

Також зменшилась кількість перевірених документів (docsExamined) та час виконання запиту (executionTimeMillis).

Як зрозуміти, що індекс використовується

У результаті explain() з’являються:

"stage": "IXSCAN"

або

"inputStage": {
   "stage": "IXSCAN"
}

Також у полі indexName видно назву використаного індексу.

Завдання 2 — Індекс для інших полів

Було створено складений індекс:

db.tracks.createIndex({
  "audio_features.instrumentalness": 1,
  "audio_features.speechiness": 1,
  explicit: 1
});

Після виконання explain() MongoDB також використовує IXSCAN, що підтверджує роботу індексу.

Завдання 3 — Покривний запит

Запит:

db.tracks.find({
  track_genre: "pop",
  popularity: { $gte: 70 }
});

Цей запит не є покривним (covered query), тому що MongoDB повертає весь документ, а не лише поля з індексу.

Для covered query всі поля запиту та всі поля результату повинні знаходитися в індексі.

Оскільки MongoDB за замовчуванням повертає весь документ, їй доводиться звертатися до колекції (FETCH stage).
