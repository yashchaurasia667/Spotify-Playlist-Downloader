import { FaFolder } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const DownloadTile = ({
  title = "Enter title",
  downloadPath = "path to download",
  coverPath = "path to album cover",
}) => {
  return (
    <div>
      <div className="h-[100px] rounded-lg bg-[#242424] px-6 py-4 flex justify-between items-center">
        <div className="flex gap-x-8">
          <img src={coverPath} alt="cover" className="rounded-lg" />
          <p className="text-lg font-semibold">{title}</p>
        </div>
        <div className="flex gap-x-6">
          <button>
            <FaFolder size={25} className="text-purple-200" />
          </button>
          <button>
            <RxCross2 size={25} className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadTile;
