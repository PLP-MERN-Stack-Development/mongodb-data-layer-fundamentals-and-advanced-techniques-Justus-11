// Task 2: Basic CRUD Operations

// Find all books in a specific genre (Fiction)
db.books.find({ genre: "Fiction" });

// Find books published after a certain year (1950)
db.books.find({ published_year: { $gt: 1950 } });

// Find books by a specific author (George Orwell)
db.books.find({ author: "George Orwell" });

// Update the price of a specific book (update '1984' to 15.99)
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
);

// Delete a book by its title (delete 'Moby Dick')
db.books.deleteOne({ title: "Moby Dick" });


// Task 3: Advanced Queries

// Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// Use projection to return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sorting by price
db.books.find().sort({ price: 1 });   // Ascending
db.books.find().sort({ price: -1 });  // Descending

// Pagination (5 books per page)
// Page 1
db.books.find().limit(5);
// Page 2
db.books.find().skip(5).limit(5);


// Task 4: Aggregation Pipelines

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $subtract: ["$published_year", { $mod: ["$published_year", 10] }]
      }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);


// Task 5: Indexing

// Create an index on title
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Use explain() to show performance improvement
db.books.find({ title: "1984" }).explain("executionStats");
