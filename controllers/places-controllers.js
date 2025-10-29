const { v7: uuid } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Rizal Library',
    description: 'Main academic library at Ateneo.',
    location: { lat: 14.6406, lng: 121.0747 },
    address: 'Ateneo de Manila University, Katipunan Ave, QC',
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Quezon Memorial Circle',
    description: 'Iconic park and shrine in QC.',
    location: { lat: 14.6515, lng: 121.0537 },
    address: 'Ellipse Rd, Diliman, QC',
    creator: 'u2'
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }

  res.json({ place }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  // const title = req.body.title;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
