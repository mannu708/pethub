import Pet from '../models/petModel.js';

export const getAllPets = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Force show only approved pets unless specified (or if it's an admin bypass)
    if (queryObj.approvalStatus === 'all') {
      delete queryObj.approvalStatus;
    } else if (!queryObj.approvalStatus) {
      queryObj.approvalStatus = 'approved';
    }

    let query = Pet.find(queryObj);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.limit) {
      const limit = req.query.limit * 1;
      query = query.limit(limit);
    }

    const pets = await query;

    res.status(200).json({
      status: 'success',
      results: pets.length,
      data: {
        pets,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getPendingPets = async (req, res) => {
  try {
    const pets = await Pet.find({ approvalStatus: 'pending' }).sort('-createdAt');
    res.status(200).json({
      status: 'success',
      results: pets.length,
      data: {
        pets,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const adminUpdatePetStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid status',
      });
    }

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: status },
      { new: true, runValidators: true }
    );

    if (!pet) {
      return res.status(404).json({
        status: 'fail',
        message: 'No pet found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        pet,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        pet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const createPet = async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        pet: newPet,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        pet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
