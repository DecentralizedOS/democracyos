const express = require('express')
// Requires status messages from http-status lib
const {
  OK,
  CREATED,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR
} = require('http-status')
// Requires winston lib for log
const { log } = require('../../main/logger')
// Requires CRUD apis
const Post = require('../db-api/posts')

const router = express.Router()

router.route('/')
  // POST route
  .post(async (req, res, next) => {
    try {
      await Post.create(req.body)
      res.status(CREATED).end()
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR)
    }
  })
  // GET ALL posts
  .get(async (req, res, next) => {
    try {
      const results = await Post.list({ limit: req.query.limit, page: req.query.page })

      // Sends the given results with status 200
      res.status(OK).json({
        results: results.docs,
        pagination: {
          count: results.total,
          page: results.page,
          limit: results.limit
        }
      })
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })

router.route('/:id')
  // GET a post with a given ID
  .get(async (req, res, next) => {
    try {
      const post = await Post.get(req.params.id)
      res.status(OK).json(post)
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })
  // UPDATE a post with a given ID
  .put(async (req, res, next) => {
    try {
      await Post.update({ id: req.params.id, user: req.body })
      res.status(NO_CONTENT).end()
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })
  // DELETE  a post with a given ID
  .delete(async (req, res, next) => {
    try {
      await Post.remove(req.params.id)
      res.status(NO_CONTENT).end()
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })

// Exports all the functions
module.exports = router
