import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const ReviewPage = () => {

  const { productId } = useParams();
  const productIdNum = Number(productId);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const fetchReviews = async () => {
    try {

      const res = await axios.get(
        `http://localhost:2007/api/r/reviews/${productIdNum}`
      );

      setReviews(res.data.result);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (productIdNum) {
      fetchReviews();
    }
  }, [productIdNum]);

  const submitReview = async () => {
    try {

      await axios.post(
        "http://localhost:2007/api/r/addreview",
        {
          productId: productIdNum,
          rating,
          comment
        },
        { withCredentials: true }
      );

      setComment("");
      setRating(5);

      fetchReviews();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>

      <h3>Product Reviews</h3>

      {reviews.length === 0 && <p>No reviews yet</p>}

      {reviews.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid #eee",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
          }}
        >
          <strong>{r.name}</strong>
          <p>⭐ {r.rating} / 5</p>
          <p>{r.comment}</p>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>

        <h4>Add Review</h4>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>5 ⭐</option>
          <option value={4}>4 ⭐</option>
          <option value={3}>3 ⭐</option>
          <option value={2}>2 ⭐</option>
          <option value={1}>1 ⭐</option>
        </select>

        <br />

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", marginTop: "10px" }}
        />

        <button
          onClick={submitReview}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>

      </div>

    </div>
  );
};

export default ReviewPage;