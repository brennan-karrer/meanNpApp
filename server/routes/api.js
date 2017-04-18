const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = 'mongodb://admin:admin@ds011893.mlab.com:11893/videoplayer'
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
  if (err) {
    console.error('Error! ' + err);
  }
});

/**
 * Return a list of all videos in the collection
 */
router.get('/videos', function(req, res) {
  console.log('Get request for all videos');

  Video.find({})
    .exec(function(err, videos) {
      if (err) {
        console.error('Error retrieving videos');
      } else {
        res.json(videos);
      }
    });
});

/**
 * Return a specific video based on its ID
 */
router.get('/videos/:id', function(req, res) {
  console.log('Get request for a single video with id: ' + req.params.id);

  Video.findById(req.params.id)
    .exec(function(err, video) {
      if (err) {
        console.error('Error retrieving video with id: ' + req.params.id);
      } else {
        res.json(video);
      }
    });
});

/**
 * Insert a new video
 */
router.post('/video', function(req, res) {
  console.log('Post a video');

  var newVideo = new Video({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description
  });

  newVideo.save(function(err, insertedVideo) {
    if (err) {
      console.error('Error saving video');
    } else {
      res.json(insertedVideo);
    }
  });
});

/**
 * Update a specific video based on its ID
 */
router.put('/video/:id', function(req, res) {
  console.log('Update video with id: ' + req.params.id);

  Video.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description
    }
  },
  {
    new: true
  },
  function(err, updatedVideo) {
    if (err) {
      res.send('Error updating video with id: ' + req.params.id);
    } else {
      res.json(updatedVideo);
    }
  })
});

/**
 * Delete a specific video based on its ID
 */
router.delete('/video/:id', function(req, res) {
  console.log('Delete video with id: ' + req.params.id);

  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
    if (err) {
      res.send('Error deleting video with id: ' + req.params.id);
    } else {
      res.json(deletedVideo);
    }
  });
});



module.exports = router;
