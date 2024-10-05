import DownloadTile from "./DownloadTile.js";

const Downloads = () => {
  // const handleSubmit = async (e: SubmitEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("api", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name }),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (error) {
  //     throw new Error(`Something went wrong... ${error}`);
  //   }
  // };
  return (
    <div className="px-4 py-10">
      <h1 className="font-bold text-4xl mb-4 text-purple-500">Downloads</h1>
      <div className="mt-20">
        <DownloadTile title="Test Tile" coverPath="/vite.svg" />
      </div>
    </div>
  );
};

export default Downloads;
