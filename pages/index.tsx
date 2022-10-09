import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    axios
      .post("/api/events", {
        community: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
        // address: "0xAD2d2CDE7CA8d116d545099405C1FDFc57B6FD9e",
      })
      .then((res) => console.log(res.data));
  }, []);

  return <div className="w-full px-2">Home page</div>;
}
