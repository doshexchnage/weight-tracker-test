import { useLocation } from "react-router-dom";
import Card from "../components/card";

export default function Main() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center text-stone-50">
        No user data found!
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-stone-800 p-6">
      <Card user={user} />
    </div>
  );
}
