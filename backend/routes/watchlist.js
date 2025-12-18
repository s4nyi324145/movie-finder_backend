import express from "express"
import { getWatchlistByMovie, addWatchList, deleteWatchlist, getWatchlistByUser, updateStatus } from "../controllers/watchlistController.js"
import { authRequired } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/movie/:movieId", authRequired, getWatchlistByMovie)
router.post("/movie", authRequired, addWatchList)
router.delete("/movie/:movieId",authRequired,deleteWatchlist)
router.get("/movie",authRequired, getWatchlistByUser)
router.put("/movie/:movie_id", authRequired, updateStatus)

export default router