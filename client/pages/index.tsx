import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { connectRoom } from "../src/api/api";
import Spinner from "../src/components/Spinner";
import { usePlayerContext } from "../src/context/PlayerContext";
import { routes } from "../src/utils/routes";

export default function HomePage() {
  const router = useRouter();
  const { player } = usePlayerContext();

  useEffect(() => {
    if (!player) return;

    const connectRoomHandler = async () => {
      const { roomId, err } = await connectRoom(player.playerId);

      if (err) {
        console.error(err);
        router.push("/404");
        return;
      }

      router.push(`${routes.room}/${roomId}`);
    };

    connectRoomHandler();
  }, [player, router]);

  return <Spinner />;
}
