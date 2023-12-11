import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  const { cat, img, desc, title } = card;

  return (
    <Link to={`/gigs?cat=${cat}`}>
      <div className="catCard">
        <img src={img} alt="" />
        <span className="desc">{desc}</span>
        <span className="title">{title}</span>
      </div>
    </Link>
  );
}

export default CatCard;
