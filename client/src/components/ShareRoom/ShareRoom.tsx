import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const ShareRoom = () => {
  const [origin, setOrigin] = useState(
    typeof window === "undefined" ? "" : window.location.origin
  );
  const router = useRouter();

  const roomUrl = `${origin}/j/${router.query.roomId}`;

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const copyToClipboard = () => {
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.writeText(roomUrl).then(
            function () {
              console.log("clipboard successfully set");
            },
            function () {
              console.log("clipboard write failed");
            }
          );
        }
      })
      .catch(() => {
        console.log("clipboard permission failed");
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl">Invite a friend, settle your dispute !</h2>
      <h3 className="text-xl mt-2">Send this URL to your friend, then wait.</h3>

      <div className="mt-8">
        <button
          disabled={!roomUrl}
          onClick={copyToClipboard}
          className="p-4 bg-gray-300 rounded-md shadow-sm "
        >
          {roomUrl ? roomUrl : "Loading..."}
        </button>
        <div className="text-xs text-gray-500 mt-1">click to copy</div>
      </div>
    </div>
  );
};

export default ShareRoom;
