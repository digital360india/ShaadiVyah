"use client";
import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "@/firebase/firebase"; // Adjust the path as needed
import {
  setDoc,
  doc,
  addDoc,
  collection,
  getDoc,
  updateDoc,
  arrayUnion,
  average,
} from "firebase/firestore";
import Space100px from "./Space100px";
import Space25px from "./Space25px";
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function Review({ id, title }) {
  const [active, setActive] = useState(true);

  const [showView, setShowView] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewsDisplayed, setReviewsDisplayed] = useState(6);
  const [overallRating, setOverallRating] = useState(0);
  const [ratingsDistribution, setRatingsDistribution] = useState([]);
  function handleActive() {
    setActive(!active);
  }

  function handleViewMore() {
    setReviewsDisplayed(userReviews.length);
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "consumers", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      console.log("User signed in and data saved:", user);
      setUser(user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        onClick={() => handleRatingChange(index + 1)}
        className={`cursor-pointer ${
          rating > index ? "text-yellow-500" : "text-gray-400"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 15.39l-3.76 2.27l.99-4.28l-3.32-2.88l4.38-.37L12 6.09l1.71 4.04l4.38.37l-3.32 2.88l.99 4.28M22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.45 4.73L5"
        />
      </svg>
    ));
  };

  const handleSubmitReview = async () => {
    if (!user) {
      signInWithGoogle();
    }
    if (!reviewText.trim()) {
      console.error("Review text is required");
      return;
    }
    if (!rating) {
      console.error("Review text is required");
      return;
    }

    const reviewData = {
      displayName: user.displayName,
      reviewText: reviewText.trim(),
      photoURL: user.photoURL,
      rating: rating,
      createdAt: new Date(),
    };

    try {
      const userReviewDocRef = doc(db, "users", id);
      const userReviewDocSnap = await getDoc(userReviewDocRef);

      if (userReviewDocSnap.exists()) {
        await updateDoc(userReviewDocRef, {
          reviews: arrayUnion(reviewData),
        });
      } else {
        await setDoc(userReviewDocRef, {
          userId: user.uid,
          reviews: [reviewData],
        });
      }

      setReviewText("");
      fetchUserReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const fetchUserReviews = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", id));
      if (userDoc.exists()) {
        setUserReviews(userDoc.data().reviews || []);
        console.log(userDoc.data().reviews);
        if (userDoc.data().reviews.length > 0) {
          const totalReviews = userDoc.data().reviews.length;
          let totalRating = 0;
          let ratingCounts = [0, 0, 0, 0, 0];

          userDoc.data().reviews.forEach((review) => {
            totalRating += review.rating;
            console.log(review.rating);
            ratingCounts[review.rating - 1]++;
          });

          const avgRating = totalRating / totalReviews;
          setOverallRating(avgRating);

          const userReviewDocRef = doc(db, "users", id);
          const userReviewDocSnap = await getDoc(userReviewDocRef);

          if (userReviewDocSnap.exists()) {
            await updateDoc(userReviewDocRef, {
              totalRating: totalRating,
              averageRating: avgRating,
            });
          } else {
            await setDoc(userReviewDocRef, {
              userId: user.uid,
              totalRating: totalRating,

              averageRating: avgRating,
            });
          }
          setRatingsDistribution(
            ratingCounts.map((count) =>
              totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(2) : "0"
            )
          );
        }
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, []);

  useEffect(() => {
    if (userReviews.length > 3) {
      if (userReviews.length < 7) setShowView(false);
    } else {
      setShowView(false);
    }
  }, [userReviews]);

  return (
    <div className="  my-12  space-y-4 xl:mx-[100px] lg:mx-[80px] md:mx-[40px] mx-6 font-Merriweather-Sans">
      <div className="  flex flex-col gap-4  py-4   ">
        <p className="text-[30px] font-semibold text-[#4A4A4A] font-Merriweather">
          Reviews For{" "}
          <span className="text-[#A11C5C] font-normal customGabriola">
            {title}
          </span>
        </p>
        <div className="flex flex-col lg:flex-row    justify-between ">
          <div className=" py-4 px-10  ">
            <div className="flex flex-col justify-start items-start">
              <p className="text-[40px]">{overallRating.toFixed(1)}</p>
              <div className="flex">
                {" "}
                {[...Array(Math.round(overallRating) || 0)].map((_, index) => (
                  <svg
                    key={index}
                    className="text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                    />
                  </svg>
                ))}
              </div>
              {/* Render half star if applicable */}
              {/* {overallRating % 1 !== 0 && (
                <svg
                  className="text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 15.39l-3.76 2.27l.99-4.28l-3.32-2.88l4.38-.37L12 6.09l1.71 4.04l4.38.37l-3.32 2.88l.99 4.28M22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.45 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03z"
                  />
                </svg>
              )} */}
              <p className="text-[15px]">Average Rating</p>
              <p className="text-[15px]">
                Overall {userReviews.length} reviews{" "}
              </p>
            </div>
            <Space25px />
            <div className="flex gap-4">
              <div className="flex flex-col items-start gap-4 justify-start">
                {ratingsDistribution.map((percentage, index) => (
                  <div className="flex gap-4 md:gap-2" key={index}>
                    <p className="text-[15px] flex justify-start items-center gap-1">
                      <div>{index + 1}</div>
                      <FaStar className="text-yellow-300" />
                    </p>
                    <div className="w-[200px] h-[20px] rounded-md bg-white border">
                      <div
                        className="rounded-l-md h-[18px] bg-[#C9184A]"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-[15px]">{percentage}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-4  mt-5 lg:mt-0 md:w-[500px] ">
            <div className="p-10  rounded-xl text-[#4A4A4A] flex flex-col gap-4">
              <p className="text-lg font-Merriweather">Review for {title}</p>
              <p className="text-[12px]">
                Share your thoughts with other customers
              </p>
              <textarea
                className="w-full p-12 rounded-lg text-[#4A4A4A]"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              <div className="flex gap-4 mt-2">{renderStars()}</div>
              <div className="flex gap-4">
                <button
                  className="lg:min-w-[150px] w-[150px] border border-[#A11C5C] rounded-3xl text-[#A11C5C] p-2"
                  onClick={handleSubmitReview}
                >
                  Add Photos {user ? <p>{user.displayName}</p> : <></>}
                </button>
                <button
                  className="lg:min-w-[150px] w-[150px] bg-[#A11C5C] rounded-3xl text-white p-2"
                  onClick={handleSubmitReview}
                >
                  Submit {user ? <p>{user.displayName}</p> : <></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {userReviews.length > 0 ? (
        <div>
          <div className=" font-Merriweather-Sans   ">
            <p className="font-semibold text-[35px] my-10 font-Merriweather">
              Customer Reviews
            </p>
            <div className=" flex flex-wrap  gap-4 justify-evenly">
              {userReviews.slice(0, reviewsDisplayed).map((review, index) => {
                return (
                  <div
                    className="bg-white h-auto w-full rounded-md px-2 py-2"
                    key={index}
                  >
                    <div className="flex h-[65px] w-[full] px-1 border-b-2 border-[#d1d0d0]  items-center  gap-4 justify-start">
                      <img
                        className="rounded-[50%] h-[40px] w-[40px]"
                        src={review.photoURL || "/logo.png"}
                        alt=""
                      />
                      <div className="flex justify-between items-start   w-full">
                        <div className="">
                          {" "}
                          <p className="text-sm"> {review.displayName}</p>
                          <p className="text-[10px] flex items-center gap-1">
                            <img src="/icons/tickred.svg" alt="tick" />
                            {review.displayName}
                          </p>
                        </div>
                        <div className="flex ">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="text-yellow-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M3.0697 14.7998C2.92202 14.7998 2.77808 14.7533 2.65846 14.6667C2.44801 14.514 2.33952 14.2573 2.37671 14L3.02682 9.44737L0.474511 6.89501C0.289091 6.70954 0.222896 6.43599 0.303011 6.18626C0.382901 5.93674 0.595751 5.75295 0.854251 5.71027L4.70241 5.06802L6.64312 1.18742C6.76338 0.949905 7.00688 0.800085 7.2731 0.799805C7.53959 0.801265 7.78213 0.953915 7.89872 1.19355L9.75633 5.01027L13.6919 5.71114C13.9486 5.75674 14.1586 5.94117 14.237 6.18976C14.3157 6.43875 14.2489 6.71081 14.0638 6.89501L11.5115 9.44737L12.1625 14C12.1994 14.2587 12.0891 14.5165 11.8763 14.6685C11.6645 14.8207 11.3855 14.8423 11.1527 14.7245L7.3186 12.782L3.37944 14.7271C3.28322 14.775 3.17718 14.7998 3.0697 14.7998Z"
                                fill="#C9184A"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {" "}
                      <p className="text-gray-400 text-sm flex gap-2">
                        <span> Reviewed on </span>
                        <span>
                          {" "}
                          {new Date(
                            review.createdAt.seconds * 1000
                          ).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                    <div className="p-2 text-sm text-[#1B1B1B]">
                      {review.reviewText}
                    </div>
                  </div>
                );
              })}
            </div>
            {userReviews.length > reviewsDisplayed && (
              <button
                onClick={handleViewMore}
                className="text-[#C9184A] border border-[#C9184A] rounded-3xl text-[14px] font-semibold mt-4 flex justify-center items-center w-[170px] p-3 "
              >
                View more
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full md:w-[150px] flex justify-between items-center text-[#C9184A] border border-[#C9184A] rounded-3xl text-[14px] lg:text-[18px] ">
          <p className="    p-3  ">Write a review</p>
          <p className="p-3 lg:hidden">&gt;</p>
        </div>
      )}
    </div>
  );
}
