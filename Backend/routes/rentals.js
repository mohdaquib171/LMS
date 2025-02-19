// routes/rentals.js
const router = require('express').Router();
const Rental = require('../models/Rental');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Rent a book
router.post('/:bookId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    if (book.quantity < 1) return res.status(400).json({ msg: 'Book not available' });

    // Check if user already rented this book
    const existingRental = await Rental.findOne({
      userId: req.user.id,
      bookId: req.params.bookId
    });

    if (existingRental) {
      return res.status(400).json({ msg: 'You already rented this book' });
    }

    const rental = new Rental({
      userId: req.user.id,
      bookId: req.params.bookId
    });

    book.quantity -= 1;
    await book.save();
    await rental.save();

    res.json({ msg: 'Book rented successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's rented books
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const rentals = await Rental.find({ userId: req.user.id })
      .populate('bookId', 'name author');
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Return a book
router.post('/return/:bookId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    // First find the rental using both userId and bookId
    const rental = await Rental.findOne({
      userId: req.user.id,
      bookId: req.params.bookId
    });

    if (!rental) {
      return res.status(404).json({ msg: 'Rental not found' });
    }

    // Find the book and update its quantity
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Update book quantity
    book.quantity += 1;
    await book.save();

    // Delete the rental
    await Rental.findByIdAndDelete(rental._id);

    res.json({ msg: 'Book returned successfully' });
  } catch (err) {
    console.error('Return book error:', err); // Add this for debugging
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;