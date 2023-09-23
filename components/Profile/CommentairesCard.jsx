import Image from "next/image";
import StarRating from '../StarRating';

const OffresCard = ( { commentaire } ) => {

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
        <div className="flex items-center">
            <div className="rounded-full bg-gray-800 ml-3">
                <Image className="w-8 h-8 rounded-full" src={commentaire.user.avatar} width="5" height="5" alt="user photo" />
            </div>
            <div className="ml-3">
                <h1 className="font-bold">{commentaire.user.fullName}</h1>
            </div>
            <div className="ml-3">
                <StarRating rating={commentaire.user.rating} />
            </div>
        </div>
        <div className="px-5 pb-5">
            <div className="flex justify-between items-center text-xl font-semibold text-gray-900 dark:text-white pt-3 mt-5">
                {commentaire.content}
            </div>
        </div>
      </div>
    </div>
  );
};

export default OffresCard;