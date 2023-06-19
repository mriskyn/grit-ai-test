const { Transaction, Library } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();

    return res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.create = async (req, res) => {
  const user = req.user;
  const { returnAt, LibraryId } = req.body;
  try {
    const isAnyTransaction = await Transaction.findOne({
      where: { UserId: user.id, status: "on borrow" },
    });
    if (isAnyTransaction) {
      return res.status(400).json({
        message: "Please return the book before create new transaction",
      });
    }

    const library = await Library.findByPk(LibraryId);

    if (!library) {
      return res.status(404).json({
        message: "Library not found",
      });
    }

    library.quantity -= 1;

    if (library.quantity < 0) {
      return res.status(400).json({
        message: "Insuficent Book's quantity",
      });
    }

    const input = {
      UserId: parseInt(user.id),
      LibraryId: parseInt(LibraryId),
      returnAt,
    };

    await Transaction.create(input);
    library.save();

    return res.status(201).json({
      message: `Book ${library.name} sucessfully borrowed`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateReturn = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const transaction = await Transaction.findOne({
      where: { id, status: "on borrow" },
    });

    if (!transaction) {
      return res.json({ message: "Transaction not found" });
    }

    const library = await Library.findByPk(parseInt(transaction.LibraryId));

    if (!library) {
      return res.json({ message: "Library not found" });
    }

    library.quantity += 1;

    if (new Date() >= transaction.returnAt) {
      transaction.isLateReturn = false;
    } else {
      transaction.isLateReturn = true;
    }

    transaction.status = "returned";

    transaction.save();
    library.save();

    return res.json({
      message: `Book ${library.book_name} successfully returned`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
