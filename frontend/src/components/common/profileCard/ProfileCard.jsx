import React, { useEffect, useState } from "react";
import cover from "../../../../public/images/cover.png";
import avathar from "../../../../public/images/avatar-placeholder.png";
import { Link, useParams } from "react-router-dom";
import {
  followUnfollow,
  getCurrentUser,
} from "../../../service/api/userProfileController/userProfile";

// function ProfileCard({ FollowingUser, follow }) {
//   const { id } = useParams();
//   const [isFollowing, setFollowing] = useState(
//     follow === "following" ? true : false
//   );
//   const [followOrUnfollow, setFollow] = useState(false);
//   const [isUserAlreadyFollowing, setUserAlreadyFollowing] = useState(false);
//   const [followBack, setFollowBack] = useState(false);
//   const [currentUserIsUser, setCurrentUser] = useState(false);
//   const followUser = async () => {
//     // setFollowing(!isFollowing);
//     setFollow(!followOrUnfollow);
//     const responce = await followUnfollow(FollowingUser?._id);
//   };
//   const getUser = async () => {
//     const responce = await getCurrentUser();
//     if (responce.status !== "SUCCESS") {
//     }
//     responce.data._id === id
//       ? setUserAlreadyFollowing(true)
//       : setUserAlreadyFollowing(false);
//     responce.data?.followers.includes(FollowingUser._id)
//       ? setFollowBack(true)
//       : setFollowBack(false); //follow back
//     responce.data?.following.includes(FollowingUser._id)
//       ? setFollow(true)
//       : setFollow(false); // following
//     responce.data?._id === followUser._id
//       ? setCurrentUser(true)
//       : setCurrentUser(false);

//       console.log(responce.data._id === FollowingUser._id )
//   };
//   useState(() => {
//     getUser();
//   },[]);
//   return (
//     <div className="card w-[200px] shadow-xl bg-gray-900 rounded-lg">
//       <Link to={`/profile/${FollowingUser?._id}`}>
//         <figure className="pt-3">
//           {FollowingUser?.profileImg ? (
//             <>
//               <img
//                 src={FollowingUser?.profileImg}
//                 alt="Shoes"
//                 className="rounded-full w-16 h-16 object-cover"
//               />
//             </>
//           ) : (
//             <>
//               <img
//                 src={avathar}
//                 alt="Shoes"
//                 className="rounded-full w-16 h-16"
//               />
//             </>
//           )}
//         </figure>
//       </Link>
//       <div className="flex flex-col justify-center items-center text-center">
//         <h2 className="">{FollowingUser?.fullName}</h2>
//         <span className="opacity-65">@{FollowingUser?.username}</span>
//         <div className="card-actions pb-3 pt-2">
//           {!currentUserIsUser && (
//             <>
//               {isUserAlreadyFollowing ? (
//                 <>
//                   {isFollowing ? (
//                     <>
//                       {followOrUnfollow ? (
//                         <>
//                           <div
//                             className="md:w-[100px] w-[80px] border-2 md:p-2  rounded-full text-center hover:cursor-pointer"
//                             onClick={followUser}
//                           >
//                             <span>Following</span>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <div
//                             className="md:w-[100px] w-[80px] bg-white md:p-2  rounded-full text-center hover:cursor-pointer"
//                             onClick={followUser}
//                           >
//                             <span className="text-black">Follow</span>
//                           </div>
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       <div
//                         className="md:w-[100px] w-[80px] bg-white md:p-2  rounded-full text-center hover:cursor-pointer"
//                         onClick={followUser}
//                       >
//                         <span className="text-black">Remove</span>
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <>
//                   {followOrUnfollow ? (
//                     <>
//                       <div
//                         className="md:w-[100px] w-[80px] border-2 md:p-2  rounded-full text-center hover:cursor-pointer"
//                         onClick={followUser}
//                       >
//                         <span>Following</span>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {followBack ? (
//                         <>
//                           <>
//                             <div
//                               className="md:w-[100px] w-[80px] bg-white md:p-2  rounded-full text-center hover:cursor-pointer"
//                               onClick={followUser}
//                             >
//                               <span className="text-black text-md">
//                                 Follow Back
//                               </span>
//                             </div>
//                           </>
//                         </>
//                       ) : (
//                         <>
//                           <>
//                             <div
//                               className="md:w-[100px] w-[80px] bg-white md:p-2  rounded-full text-center hover:cursor-pointer"
//                               onClick={followUser}
//                             >
//                               <span className="text-black">Follow</span>
//                             </div>
//                           </>
//                         </>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
function ProfileCard({ FollowingUser, follow }) {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(follow === "following");
  const [followOrUnfollow, setFollowOrUnfollow] = useState(false);
  const [isUserAlreadyFollowing, setIsUserAlreadyFollowing] = useState(false);
  const [followBack, setFollowBack] = useState(false);
  const [currentUserIsUser, setCurrentUserIsUser] = useState(false);

  const followUser = async () => {
    setFollowOrUnfollow(!followOrUnfollow);
    await followUnfollow(FollowingUser._id);
  };

  const getUser = async () => {
    const response = await getCurrentUser();
    if (response.status !== "SUCCESS") return;

    const currentUser = response.data;
    setCurrentUserIsUser(currentUser._id === FollowingUser._id);
    setIsUserAlreadyFollowing(
      currentUser.followers.includes(FollowingUser._id)
    );
    setFollowBack(currentUser.followers.includes(FollowingUser._id));
    setFollowOrUnfollow(currentUser.following.includes(FollowingUser._id));
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderFollowButton = () => {
    if (currentUserIsUser) return null;

    if (isUserAlreadyFollowing) {
      return isFollowing ? (
        <div
          className={`md:w-[100px] w-[80px] md:p-2 rounded-full text-center hover:cursor-pointer ${
            followOrUnfollow ? "border-2" : "bg-white"
          }`}
          onClick={followUser}
        >
          <span className={`${followOrUnfollow ? "" : "text-black"}`}>
            {followOrUnfollow ? "Following" : "Follow"}
          </span>
        </div>
      ) : (
        <div
          className="md:w-[100px] w-[80px] bg-white md:p-2 rounded-full text-center hover:cursor-pointer"
          onClick={followUser}
        >
          <span className="text-black">Remove</span>
        </div>
      );
    }

    return (
      <div
        className={`md:w-[100px] w-[80px] md:p-2 rounded-full text-center hover:cursor-pointer ${
          followOrUnfollow ? "border-2" : "bg-white"
        }`}
        onClick={followUser}
      >
        <span className={`${followOrUnfollow ? "" : "text-black"}`}>
          {followBack ? "Follow Back" : "Following"}
        </span>
      </div>
    );
  };

  return (
    <div className="card w-[200px] shadow-xl bg-gray-900 rounded-lg">
      <Link to={`/profile/${FollowingUser._id}`}>
        <figure className="pt-3">
          <img
            src={FollowingUser.profileImg || avathar}
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover"
          />
        </figure>
      </Link>
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="">{FollowingUser.fullName}</h2>
        <span className="opacity-65">@{FollowingUser.username}</span>
        <div className="card-actions pb-3 pt-2">{renderFollowButton()}</div>
      </div>
    </div>
  );
}
export default ProfileCard;
