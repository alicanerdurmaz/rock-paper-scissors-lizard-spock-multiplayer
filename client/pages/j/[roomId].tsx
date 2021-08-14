import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { joinRoom } from "../../src/api/api";
import Spinner from "../../src/components/Spinner";
import { usePlayerContext } from "../../src/context/PlayerContext";
import { routes } from "../../src/utils/routes";

export default function JoinPage() {
  const router = useRouter();
  const { player } = usePlayerContext();

  useEffect(() => {
    const roomId = router.query?.roomId;

    if (!player || !roomId) return;

    const joinRoomHandler = async () => {
      const { err } = await joinRoom({
        roomId: roomId as string,
        playerId: player.playerId,
      });

      if (err) {
        console.error(err);
        router.push("/404");
        return;
      }

      router.push(`${routes.room}/${roomId}`);
    };

    joinRoomHandler();
  }, [player, router]);

  return <Spinner />;
}
