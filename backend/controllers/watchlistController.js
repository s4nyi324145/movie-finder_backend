import pool from "../config/db.js";

export const getWatchlistByMovie = async (req, res) => {
    const { movieId } = req.params;
    const userId = req.user.user_id;
  
    try {
      const [rows] = await pool.query(
        "SELECT movie_id FROM watchlist WHERE movie_id = ? && user_id = ?",
        [movieId, userId]
      );
  
      if (rows.length === 0) {
        return res.status(200).json(null); 
      }
      
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

export const addWatchList = async(req,res) =>{

    const user_id = req.user.user_id
    const {movie_id, type} = req.body;

    try {
        await pool.query("INSERT INTO watchlist (watchlist_id, user_id, movie_id, status, privacy, updated_at,type) VALUES (NULL, ?, ?, 'planned', 'public', CURRENT_TIMESTAMP(),?)",[user_id,movie_id,type])
        res.status(201).json({ message: "Movie added to the watchlist" });
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteWatchlist = async(req,res) =>{
  const user_id = req.user.user_id
  const {movieId} = req.params

  try {
     const result = await pool.query("DELETE FROM `watchlist` WHERE user_id = ? && movie_id = ?", [user_id,movieId])
     res.status(204).end()
  } catch (error) {
    res.status(500).json(error)
  }

}

export const getWatchlistByUser = async (req,res) =>{

  const userId = req.user.user_id;

  try {
    const [rows] = await pool.query(
      "SELECT movie_id, status, type FROM watchlist WHERE  user_id = ? ORDER BY watchlist_id DESC",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(200).json("Üres"); 
    }
    console.log(rows)
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
  
export const updateStatus = async (req,res) =>{

  const user_id = req.user.user_id
  const {movie_id} = req.params
  const {status} = req.body

  try {
    const result = await  pool.query("UPDATE watchlist SET status = ? WHERE movie_id = ? && user_id = ?;",[status,movie_id,user_id])
    res.status(201).end()
  } catch (error) {
    res.status(500).json(error)
  }
}