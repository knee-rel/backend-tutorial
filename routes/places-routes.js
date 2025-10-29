const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Rizal Library",
    description: "Main library",
    location: { lat: 14.6406, lng: 121.0747 },
    address: "Ateneo, QC",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Quezon Memorial Circle",
    description: "QC shrine & park",
    location: { lat: 14.6515, lng: 121.0537 },
    address: "Ellipse Rd, QC",
    creator: "u2",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    const error = new Error("Could not find a place for the provided id.");
    error.code = 404;
    throw error;
  }

  res.json({ place }); // => { place } => { place: place }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    const error = new Error("Could not find a place for the provided user id.");
    error.code = 404;
    return next(error);
  }

  res.json({ place });
});

module.exports = router;
